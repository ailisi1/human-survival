/* 本地联调用的假 Worker，跑起来别关：
     node worker/dev-server.mjs
   然后用浏览器打开 http://localhost:8080/worker/test-page.html
   （8080 是你自己起的静态服务端口，见 worker/README.md） */

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
      console.log("    KV →", String(v));
    },
  },
  /* 联调时清空白名单，否则浏览器发来的 Origin 会被挡 */
  ALLOW_HOSTS: "",
};

const PORT = 8791;

http
  .createServer(async (req, res) => {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const noBody = ["GET", "HEAD", "OPTIONS"].includes(req.method);
    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: noBody ? undefined : Buffer.concat(chunks),
    });
    const out = await worker.fetch(request, env);
    const headers = {};
    out.headers.forEach((v, k) => (headers[k] = v));
    const body = await out.text();
    console.log(`${req.method} ${req.url} → ${out.status} ${body}`);
    res.writeHead(out.status, headers);
    res.end(body);
  })
  .listen(PORT, () => console.log(`假 Worker 已起：http://localhost:${PORT}`));
