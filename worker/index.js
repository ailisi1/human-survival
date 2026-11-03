/* ══════════════════════════════════════════════════
   人间三卷 · 访问计数（Cloudflare Worker + KV）
   ══════════════════════════════════════════════════
   接口：
     POST /hit     计数 +1，返回 { total, today }
     GET  /stats   只读，返回 { total, today }

   存储：KV 里只有一个 key —— "stat"，值是
     { "n": 累计人数, "d": "YYYY-MM-DD", "dn": 当日人数 }
   每次 /hit 只写一次 KV，为的是省免费额度（KV 免费 1000 写/天）。

   想要更细的分析（来源、页面、地区、设备），
   去 Cloudflare 后台开 Web Analytics，那个不要钱也不用写代码。
   这个 Worker 只负责「页面上那个数字」。
   ══════════════════════════════════════════════════ */

const KEY = "stat";

/* 东八区日期。用 sv-SE 这个 locale 是因为它正好输出 YYYY-MM-DD */
function todayCN() {
  try {
    return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
  } catch (e) {
    return new Date().toISOString().slice(0, 10);
  }
}

async function readStat(env) {
  const raw = await env.HIT.get(KEY);
  if (!raw) return { n: 0, d: todayCN(), dn: 0 };
  try {
    const o = JSON.parse(raw);
    return {
      n: Number(o.n) || 0,
      d: String(o.d || ""),
      dn: Number(o.dn) || 0,
    };
  } catch (e) {
    return { n: 0, d: todayCN(), dn: 0 };
  }
}

async function bump(env) {
  const s = await readStat(env);
  const d = todayCN();
  const next = {
    n: s.n + 1,
    d: d,
    dn: s.d === d ? s.dn + 1 : 1,
  };
  await env.HIT.put(KEY, JSON.stringify(next));
  return next;
}

/* ---------- 来源检查 ----------
   只挡「没有来源」和「来源不在白名单」的请求，挡不住有心刷数字的人。
   目的不是防刷，是不让随便一段脚本就把数字顶上去。
   ALLOW_HOSTS 用逗号分隔，例如：
     renjian.pages.dev,renjian.example.com
   不设置则不做检查（方便本地调试）。 */
function refererHost(request) {
  const r = request.headers.get("Referer") || "";
  const o = request.headers.get("Origin") || "";
  const src = r || o;
  if (!src) return "";
  try {
    return new URL(src).hostname.toLowerCase();
  } catch (e) {
    return "";
  }
}

function hostAllowed(request, env) {
  const list = (env.ALLOW_HOSTS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!list.length) return true;
  const host = refererHost(request);
  if (!host) return false;
  /* 允许写主域，子域自动放行（xxx.pages.dev 预览域名） */
  return list.some((h) => host === h || host.endsWith("." + h) || h.endsWith("." + host));
}

function corsHeaders(request, env) {
  const list = (env.ALLOW_HOSTS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  let allow = "*";
  if (list.length && origin) {
    try {
      const h = new URL(origin).hostname.toLowerCase();
      const ok = list.some((x) => h === x.toLowerCase() || h.endsWith("." + x.toLowerCase()));
      allow = ok ? origin : "null";
    } catch (e) {
      allow = "null";
    }
  }
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, extra) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== "/hit" && url.pathname !== "/stats") {
      return json({ ok: false, error: "not found" }, 404, cors);
    }

    if (url.pathname === "/hit" && request.method !== "POST") {
      return json({ ok: false, error: "use POST" }, 405, cors);
    }

    if (!hostAllowed(request, env)) {
      return json({ ok: false, error: "forbidden" }, 403, cors);
    }

    try {
      if (url.pathname === "/hit") {
        const s = await bump(env);
        return json({ ok: true, total: s.n, today: s.dn }, 200, cors);
      }
      const s = await readStat(env);
      return json({ ok: true, total: s.n, today: s.dn }, 200, cors);
    } catch (e) {
      /* KV 写超了额度之类，别让页面报错，返回一个空结果让前端保持隐藏 */
      return json({ ok: false, error: "storage" }, 200, cors);
    }
  },
};
