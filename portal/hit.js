/* ══════════════════════════════════════════════════
   人间三卷 · 到访人数（前端）
   ══════════════════════════════════════════════════
   显示在页脚的 [data-hit] 元素上，例如「已有 1,234 人到访」。

   三种情况一律什么都不做（元素保持隐藏，不报错、不占位）：
     · 还没配置 ENDPOINT
     · 用 file:// 双击打开的本地文件
     · 请求失败（离线、Worker 挂了、额度用完）

   去重：同一浏览器同一天只上报一次（localStorage 记日期），
   所以这个数是「按日去重的人次」，不是 PV。要看 PV 去 Cloudflare 后台。
   ══════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── 唯一需要改的一行 ──
     把 worker/ 部署到 Cloudflare 之后，填它给你的地址（结尾不要斜杠）：
       https://renjian-hit.你的子域.workers.dev
     也可以在页面里事先写 window.HUB_HIT_ENDPOINT 覆盖（本地联调用）。 */
  var ENDPOINT =
    window.HUB_HIT_ENDPOINT || "https://renjian-hit.YOUR-SUBDOMAIN.workers.dev";

  var DAY_KEY = "hub.hit.day";
  var NUM_KEY = "hub.hit.num";

  function $(sel) {
    return document.querySelector(sel);
  }

  function fmt(n) {
    n = Number(n) || 0;
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function todayStr() {
    var d = new Date();
    /* 用本地时区，跟 Worker 的东八区可能差几小时，无所谓——
       这只是「今天报过没有」的判断，不影响总数 */
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function show(n) {
    var el = $("[data-hit]");
    if (!el) return;
    if (!n || n < 1) return;
    el.textContent = "已有 " + fmt(n) + " 人到访";
    el.hidden = false;
    el.classList.add("is-on");
  }

  function request(method, path) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 4000) : null;

    return fetch(ENDPOINT + path, {
      method: method,
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (timer) clearTimeout(timer);
        return j && j.ok && typeof j.total === "number" ? j.total : null;
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        return null;
      });
  }

  function boot() {
    if (!ENDPOINT || ENDPOINT.indexOf("YOUR-SUBDOMAIN") >= 0) return;
    if (location.protocol === "file:") return;

    var today = todayStr();
    var seen = "";
    var cached = "";
    try {
      seen = localStorage.getItem(DAY_KEY) || "";
      cached = localStorage.getItem(NUM_KEY) || "";
    } catch (e) {}

    /* 今天已经报过：直接读数字；否则上报一次 */
    var p;
    if (seen === today) {
      p = request("GET", "/stats");
      /* 顺手先把上次的数字显示出来，请求回来再更新，避免闪烁 */
      if (cached) show(Number(cached));
    } else {
      p = request("POST", "/hit");
    }

    p.then(function (n) {
      if (n === null) return;
      show(n);
      try {
        localStorage.setItem(NUM_KEY, String(n));
        if (seen !== today) localStorage.setItem(DAY_KEY, today);
      } catch (e) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
