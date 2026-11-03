/* 本地自测：用 Node 起一个假 Worker，KV 用内存 Map 顶替。
   跑法：node worker/test-local.mjs
   不需要联网、不需要 Cloudflare 账号。 */

import http from "node:http";
import worker from "./index.js";

const store = new Map();
const env = {
  HIT: {
    async get(k) {
      return store.has(k) ? store.get(k) : null;
    },
    async put(k, v) {
      store.set(k, String(v));
    },
  },
  ALLOW_HOSTS: process.env.ALLOW_HOSTS || "",
};

const PORT = 8791;

const server = http.createServer(async (req, res) => {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const noBody = req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS";

  const request = new Request(`http://localhost:${PORT}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: noBody ? undefined : body,
  });

  const out = await worker.fetch(request, env);
  const headers = {};
  out.headers.forEach((v, k) => (headers[k] = v));
  res.writeHead(out.status, headers);
  res.end(await out.text());
});

let pass = 0;
let fail = 0;
function check(name, cond, extra = "") {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name} ${extra}`);
  }
}

async function call(path, opt = {}) {
  const r = await fetch(`http://localhost:${PORT}${path}`, opt);
  let j = null;
  try {
    j = await r.json();
  } catch (e) {}
  return { status: r.status, json: j, headers: r.headers };
}

server.listen(PORT, async () => {
  console.log("── 接口行为 ──");

  let r = await call("/hit", { method: "OPTIONS" });
  check("OPTIONS 预检返回 204", r.status === 204, `实际 ${r.status}`);
  check("预检带 CORS 头", !!r.headers.get("access-control-allow-origin"));

  r = await call("/hit", { method: "POST" });
  check("第一次上报 total=1", r.json && r.json.total === 1, JSON.stringify(r.json));
  check("第一次上报 today=1", r.json && r.json.today === 1);
  check("返回 no-store", (r.headers.get("cache-control") || "").includes("no-store"));

  r = await call("/hit", { method: "POST" });
  check("第二次上报 total=2", r.json && r.json.total === 2, JSON.stringify(r.json));

  r = await call("/stats");
  check("GET /stats 读到 2", r.json && r.json.total === 2, JSON.stringify(r.json));

  r = await call("/hit");
  check("GET /hit 返回 405", r.status === 405, `实际 ${r.status}`);

  r = await call("/nope");
  check("未知路径返回 404", r.status === 404, `实际 ${r.status}`);

  /* 跨天：手动把存储里的日期改成昨天，再上报一次，今日数应重置为 1 */
  const raw = JSON.parse(store.get("stat"));
  store.set("stat", JSON.stringify({ n: raw.n, d: "2000-01-01", dn: 99 }));
  r = await call("/hit", { method: "POST" });
  check("跨天后 today 重置为 1", r.json && r.json.today === 1, JSON.stringify(r.json));
  check("跨天后 total 继续累加", r.json && r.json.total === 3, JSON.stringify(r.json));

  /* 存储坏了不该 500 */
  store.set("stat", "{坏数据");
  r = await call("/stats");
  check("存储损坏时返回 0 而不是报错", r.json && r.json.total === 0, JSON.stringify(r.json));

  /* 存储写失败（模拟额度用完）应返回 ok:false 而不是抛错 */
  store.clear();
  const badEnv = {
    HIT: {
      async get() {
        return null;
      },
      async put() {
        throw new Error("KV write limit");
      },
    },
    ALLOW_HOSTS: "",
  };
  const req = new Request(`http://localhost:${PORT}/hit`, { method: "POST" });
  const out = await worker.fetch(req, badEnv);
  const j = await out.json();
  check("KV 写失败时优雅降级", out.status === 200 && j.ok === false, JSON.stringify(j));

  console.log("\n── 来源检查（ALLOW_HOSTS=renjian.pages.dev）──");
  /* 重新起一份带上白名单的判定，直接调 hostAllowed 的等价路径：
     这里换成新进程更麻烦，就走线上接口 —— 用一个临时服务 */
  const env2 = { ...env, ALLOW_HOSTS: "renjian.pages.dev,renjian.example.com" };
  store.clear();

  const mk = (host) =>
    new Request(`http://localhost:${PORT}/hit`, {
      method: "POST",
      headers: host ? { Referer: `https://${host}/` } : {},
    });

  let o = await worker.fetch(mk(""), env2);
  check("没有来源 → 拒绝", o.status === 403, `实际 ${o.status}`);

  o = await worker.fetch(mk("evil.com"), env2);
  check("陌生来源 → 拒绝", o.status === 403, `实际 ${o.status}`);

  o = await worker.fetch(mk("renjian.pages.dev"), env2);
  let jj = await o.json();
  check("白名单来源 → 通过", o.status === 200 && jj.ok === true, JSON.stringify(jj));

  o = await worker.fetch(mk("abc.renjian.pages.dev"), env2);
  jj = await o.json();
  check("预览子域 → 自动放行", o.status === 200 && jj.ok === true, JSON.stringify(jj));

  o = await worker.fetch(mk("renjian.example.com"), env2);
  jj = await o.json();
  check("自定义域名 → 通过", o.status === 200 && jj.ok === true, JSON.stringify(jj));

  /* CORS 是否按来源回填 */
  const corsReq = new Request(`http://localhost:${PORT}/stats`, {
    headers: { Origin: "https://renjian.pages.dev" },
  });
  o = await worker.fetch(corsReq, env2);
  check(
    "CORS 回填具体来源",
    o.headers.get("access-control-allow-origin") === "https://renjian.pages.dev",
    o.headers.get("access-control-allow-origin")
  );

  const corsBad = new Request(`http://localhost:${PORT}/stats`, {
    headers: { Origin: "https://evil.com" },
  });
  o = await worker.fetch(corsBad, env2);
  check(
    "陌生来源不给 CORS 头",
    o.headers.get("access-control-allow-origin") === "null",
    o.headers.get("access-control-allow-origin")
  );

  console.log(`\n${fail === 0 ? "全部通过" : "有失败"}：${pass} 通过 / ${fail} 失败`);
  server.close();
  process.exit(fail === 0 ? 0 : 1);
});
