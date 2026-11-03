/* 生在何朝 · 微信小游戏入口
 *
 * 引擎与数据原样来自网页版：那些文件都是 IIFE 挂 window.SHZ，一个 DOM 也不碰。
 * 小游戏里没有 window / localStorage，这里补两样东西就够了。
 */

var G = GameGlobal;
G.window = G;
G.global = G;

/* ── localStorage 垫片 ─────────────────────────
   引擎的存档走 localStorage，小游戏里没有。补一层 wx storage，
   键名与网页版一致，将来若做迁移，读出来的是同一份东西。 */
if (typeof G.localStorage === "undefined") {
  G.localStorage = {
    getItem: function (k) {
      try {
        var v = wx.getStorageSync(k);
        return (v === "" || v === null || v === undefined) ? null : v;
      } catch (e) { return null; }
    },
    setItem: function (k, v) {
      try { wx.setStorageSync(k, v); } catch (e) {}
    },
    removeItem: function (k) {
      try { wx.removeStorageSync(k); } catch (e) {}
    }
  };
}

/* ── 引擎与数据 ─────────────────────────────── */
require("./js/rng.js");
require("./js/data.base.js");
require("./js/geo.js");
require("./js/era.dsl.js");
require("./js/eras-1.js");
require("./js/eras-2.js");
require("./js/eras-3.js");
require("./js/eras-4.js");

/* PACKS-BEGIN */
require("./data/packs/00-base.js");
require("./data/packs/01-common-b.js");
require("./data/packs/10-qinhan.js");
require("./data/packs/20-weijin.js");
require("./data/packs/30-song.js");
require("./data/packs/40-yuanqing.js");
require("./data/packs/50-era-qh.js");
require("./data/packs/51-era-wj.js");
require("./data/packs/52-era-song.js");
require("./data/packs/53-era-yq.js");
require("./data/packs/60-era-a.js");
require("./data/packs/61-era-b.js");
require("./data/packs/62-era-c.js");
require("./data/packs/63-era-d.js");
require("./data/packs/64-era-e.js");
require("./data/packs/65-era-f.js");
require("./data/packs/66-common-c.js");
require("./data/packs/70-era-g.js");
require("./data/packs/71-era-h.js");
require("./data/packs/72-era-i.js");
require("./data/packs/73-era-j.js");
require("./data/packs/74-era-k.js");
require("./data/packs/75-era-l.js");
require("./data/packs/76-common-d.js");
require("./data/packs/77-disaster-a.js");
require("./data/packs/78-disaster-b.js");
require("./data/packs/79-era-m.js");
require("./data/packs/80-era-n.js");
require("./data/packs/81-era-o.js");
require("./data/packs/82-era-p.js");
require("./data/packs/83-common-e.js");
require("./data/packs/84-common-f.js");
require("./data/packs/85-common-g.js");
require("./data/packs/86-era-q.js");
require("./data/packs/87-era-r.js");
require("./data/packs/88-era-s.js");
require("./data/packs/89-common-h.js");
require("./data/packs/90-era-t.js");
require("./data/packs/91-era-u.js");
require("./data/packs/92-era-v.js");
require("./data/packs/93-era-w.js");
require("./data/packs/94-common-i.js");
/* PACKS-END */
require("./data/ming.sample.js");

require("./js/realm.js");
require("./js/engine.js");

/* ── 视图 ───────────────────────────────────── */
require("./view/kit.js");
require("./view/screens.js");
require("./view/realm.js");
require("./app.js");

/* ── 画布 ───────────────────────────────────── */
/* getWindowInfo 是新接口，老基础库没有，退回 getSystemInfoSync。
   两者都带 safeArea，用来避开刘海与底部指示条。 */
function winInfo() {
  if (typeof wx.getWindowInfo === "function") {
    try { return wx.getWindowInfo(); } catch (e) {}
  }
  return wx.getSystemInfoSync();
}

var info = winInfo();
var dpr = info.pixelRatio || 2;
var W = info.windowWidth;
var H = info.windowHeight;

/* safeArea 是「还能正常显示」的那块区域在整屏里的位置。
   H 与 safeArea.bottom 都以屏幕顶为原点，相减就是底部要让出的高度。 */
var sa = info.safeArea || null;
var safeT = sa ? Math.max(0, Math.round(sa.top)) : 0;
var safeB = sa ? Math.max(0, Math.round(H - sa.bottom)) : 0;

/* 右上角的胶囊按钮：它不算在 safeArea 里，但会把顶栏右边的字和钮盖住。
   拿它的左沿与下沿，顶栏据此把右边让出来、并把数值条挪到它下面。 */
var capL = 0, capB = 0;
try {
  var mb = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
  if (mb && mb.left > 0 && mb.bottom > 0) {
    capL = Math.round(mb.left);
    capB = Math.round(mb.bottom);
  }
} catch (e) {}

var canvas = wx.createCanvas();
canvas.width = Math.round(W * dpr);
canvas.height = Math.round(H * dpr);

/* 不少安卓机的 pixelRatio 是 2.75 / 3.5 这种小数。若照 dpr 缩放，
   字就会落在半个像素上，笔画发毛。按取整后的实际比例缩放才对得上像素栅格。 */
var ctx = canvas.getContext("2d");
ctx.scale(canvas.width / W, canvas.height / H);

APP.boot({ ctx: ctx, W: W, H: H, dpr: dpr, safeT: safeT, safeB: safeB, capL: capL, capB: capB });

/* ── 触摸 ───────────────────────────────────── */
function pt(e) {
  var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
  return t ? { x: t.clientX, y: t.clientY } : { x: 0, y: 0 };
}

wx.onTouchStart(function (e) { var q = pt(e); APP.touch("start", q.x, q.y); });
wx.onTouchMove(function (e) { var q = pt(e); APP.touch("move", q.x, q.y); });
wx.onTouchEnd(function (e) { var q = pt(e); APP.touch("end", q.x, q.y); });
wx.onTouchCancel(function (e) { var q = pt(e); APP.touch("end", q.x, q.y); });

/* 切到后台时存一次，回来还在原处 */
wx.onHide(function () {
  var s = APP.state.s;
  if (s) SHZ.save(s);
});
