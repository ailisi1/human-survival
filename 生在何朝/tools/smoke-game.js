/* 小游戏冒烟测试：在 Node 里假装成小游戏环境，把包整个加载一遍，
 * 每一朝都跑一局完整人生（出生→抉择→死亡→重开），顺带把天下五页翻遍。
 * 目的只有一个：上传之前确认不会一启动就白屏、不会跑到某一朝卡住。
 *
 *   node tools/smoke-game.js            只跑随机一局
 *   node tools/smoke-game.js --all      十九朝逐朝跑
 *   node tools/smoke-game.js tang       只跑唐朝
 */
const path = require("path");

const ROOT = path.join(__dirname, "..", "minigame");
const ERAS = ["qin", "whan", "xin", "ehan", "sg", "wjin", "ejin", "ns", "sui", "tang",
  "wudai", "liao", "bsong", "xxia", "jin", "nsong", "yuan", "ming", "qing"];

/* ── 假 canvas ─────────────────────────────── */
const CALLS = Object.create(null);
function noop() {}

function makeCtx() {
  const t = {
    measureText: (s) => ({ width: String(s).length * 13 }),
    createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }),
    createPattern: () => ({}),
    getImageData: () => ({ data: [] }),
    putImageData: noop,
    setLineDash: noop,
    canvas: { width: 1170, height: 2532 }
  };
  return new Proxy(t, {
    get(o, k) {
      if (k in o) {
        const v = o[k];
        if (typeof v === "function") {
          return function (...a) { CALLS[k] = (CALLS[k] || 0) + 1; return v.apply(o, a); };
        }
        return v;
      }
      return function () { CALLS[k] = (CALLS[k] || 0) + 1; };
    },
    set(o, k, v) { o[k] = v; return true; }
  });
}

/* ── 假 wx ─────────────────────────────────── */
const store = Object.create(null);
const wx = {
  getWindowInfo: () => ({
    windowWidth: 390, windowHeight: 844, pixelRatio: 2.75,
    safeArea: { top: 44, bottom: 810, left: 0, right: 390, width: 390, height: 766 }
  }),
  getSystemInfoSync: () => wx.getWindowInfo(),
  getMenuButtonBoundingClientRect: () => ({ left: 296, top: 48, right: 383, bottom: 80, width: 87, height: 32 }),
  createCanvas: () => ({ width: 0, height: 0, getContext: () => makeCtx() }),
  getStorageSync: (k) => (k in store ? store[k] : ""),
  setStorageSync: (k, v) => { store[k] = v; },
  removeStorageSync: (k) => { delete store[k]; },
  onTouchStart: noop, onTouchMove: noop, onTouchEnd: noop, onTouchCancel: noop,
  onHide: noop, onShow: noop
};

/* 小游戏里 GameGlobal 就是全局对象，属性可以直接裸写访问（`APP`、`window`）。
   Node 里要同样的效果，只能借用 globalThis——所以这里直接用 global。 */
try { delete globalThis.localStorage; } catch (e) {}
globalThis.window = globalThis;
globalThis.global = globalThis;
globalThis.GameGlobal = globalThis;
globalThis.wx = wx;

console.log("加载小游戏包…");
require(path.join(ROOT, "game.js"));

const APP = globalThis.APP;
const SHZ = globalThis.SHZ;
if (!APP || !SHZ) { console.log("FAIL APP / SHZ 未挂上"); process.exit(1); }
if (typeof APP.boot !== "function") { console.log("FAIL APP.boot 缺失"); process.exit(1); }

/* --plain 模拟无刘海、无胶囊的老机型 */
const PLAIN = process.argv.includes("--plain");
APP.boot({
  ctx: makeCtx(), W: 390, H: PLAIN ? 844 : 844, dpr: PLAIN ? 2 : 2.75,
  safeT: PLAIN ? 0 : 44, safeB: PLAIN ? 0 : 34,
  capL: PLAIN ? 0 : 296, capB: PLAIN ? 0 : 80
});
const a = APP.state;

/* 跑一局：遇到抉择选第一个，每 15 次切进天下卡翻五页。 */
function runOne(era) {
  a.startNew(era);
  if (!a.s) throw new Error("startNew 之后没有 state");
  if (era && a.s.era !== era) throw new Error("抽到的朝不对：" + a.s.era);

  let guard = 0, picks = 0, realmSwaps = 0, lastRealm = -1;
  while (guard++ < 6000) {
    const m = a.mode;
    if (m === "dead") break;
    if (m === "event") {
      if (picks > 0 && picks % 15 === 0 && lastRealm !== picks) { lastRealm = picks; a.openRealm(0); continue; }
      a.pick(0); picks++; continue;
    }
    if (m === "realm") {
      for (let i = 0; i < 5; i++) { a.openRealm(i); realmSwaps++; }
      a.go("event"); continue;
    }
    if (m === "draw" || m === "birth") { a.go("event"); continue; }
    if (typeof a.advance === "function") { a.advance(); continue; }
    break;
  }
  if (a.mode !== "dead") throw new Error("跑不到死亡，卡在 " + a.mode);

  /* 结算页与重开也要过一遍 */
  const n = CALLS.fillText || 0;
  a.render();
  if ((CALLS.fillText || 0) <= n) throw new Error("结算页没画出文字");
  return { age: a.s.age, picks, realmSwaps };
}

const arg = process.argv[2] || "";
const list = arg === "--all" ? ERAS : (arg ? [arg] : [null]);

let bad = 0;
console.log("");
console.log("  朝      寿命  抉择  天下页  结果");
console.log("  ──────────────────────────────────");
for (const era of list) {
  const t0 = Date.now();
  try {
    const r = runOne(era);
    const name = era || (a.s && a.s.era) || "随机";
    console.log("  " + (name + "      ").slice(0, 6) +
      ("   " + r.age).slice(-4) +
      ("      " + r.picks).slice(-6) +
      ("     " + r.realmSwaps).slice(-6) +
      "  ok " + (Date.now() - t0) + "ms");
  } catch (e) {
    bad++;
    console.log("  " + (era || "随机").padEnd(6) + " FAIL  " + e.message);
  }
}

console.log("");
if (bad) { console.log(bad + " 朝异常"); process.exit(1); }
console.log((list.length > 1 ? list.length + " 朝" : "本局") + "跑通");

/* ── 点击回归 ─────────────────────────────────
 * 这一节专治「按不到」。刘海屏（safeT=44）与胶囊（capB=80）都在，
 * 按钮画在哪，就得能点在哪。原先的硬编码坐标在这里会全线失手。 */
function tap(x, y) { APP.touch("start", x, y); APP.touch("end", x, y); }

console.log("");
console.log("  点击回归（" + (PLAIN ? "无刘海 / 无胶囊" : "刘海 44 / 胶囊下沿 80") + "）");
console.log("  ──────────────────────────────────");

const touchBad = [];
function ck(name, cond, note) {
  console.log("  " + (cond ? "ok  " : "FAIL") + " " + name + (cond ? "" : "  ← " + (note || "")));
  if (!cond) touchBad.push(name);
}

a.startNew("ming");
a.go("event");

/* 顶栏两个钮：高 42 的那两个 */
let bars = a.hits.filter((r) => r.h === 42 && r.y < 200);
ck("event 屏记到了顶栏两个钮", bars.length >= 2, "只找到 " + bars.length + " 个");

const realmBtn = bars.sort((p, q) => q.x - p.x)[0];
ck("「天下」钮落在屏幕内", realmBtn && realmBtn.x > 200 && realmBtn.y > 0, JSON.stringify(realmBtn));

if (realmBtn) {
  tap(realmBtn.x + realmBtn.w / 2, realmBtn.y + realmBtn.h / 2);
  ck("点「天下」进得去", a.mode === "realm", "实际停在 " + a.mode);
}

if (a.mode === "realm") {
  /* 左上「返」 */
  const back = a.hits.filter((r) => r.h === 42 && r.x < 100)[0];
  ck("天下卡左上角有「返」", !!back, "没记到返回区");
  tap(back.x + back.w / 2, back.y + back.h / 2);
  ck("点「返」回得来", a.mode === "event", "实际停在 " + a.mode);
}

/* 五个页签 */
a.openRealm(0);
const tabs = a.hits.filter((r) => r.h === 46);
ck("五个页签都记了点击区", tabs.length === 5, "只找到 " + tabs.length + " 个");
if (tabs.length === 5) {
  const t2 = tabs.sort((p, q) => p.x - q.x)[2];
  tap(t2.x + t2.w / 2, t2.y + t2.h / 2);
  ck("点第三栏切到「军备」", a.realmTab === 2, "实际是第 " + a.realmTab + " 栏");
}

/* 舆图地块 */
a.openRealm(0);
if (a.mapBox) {
  const bx = a.mapBox;
  tap(bx.x + bx.w * 0.55, bx.y + bx.h * 0.55);
  ck("点舆图能选中地块", !!a.realmRegion, "没选中");
}

console.log("");
if (touchBad.length) { console.log(touchBad.length + " 项点击异常"); process.exit(1); }
console.log("点击全部通过");
