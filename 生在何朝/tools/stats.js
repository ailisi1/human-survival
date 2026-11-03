/* 数据盘点：各朝事件条数、选项数、通用事件、配方等。
   node tools/stats.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
/* 自动扫目录：加了新卷不必回来改这里 */
const PACKS = path.join(ROOT, "data", "packs");
const files = fs.readdirSync(PACKS).filter((f) => f.endsWith(".js")).sort()
  .map((f) => "data/packs/" + f).concat(["data/ming.sample.js"]);
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
let bad = [];
for (const f of files) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { bad.push(f + " 不存在"); continue; }
  try { vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f }); }
  catch (e) { bad.push(f + " 报错: " + e.message); }
}
const P = ctx.window.PACK_BASE || {};
console.log("挂载：" + Object.keys(P).join(" "));
console.log("");
console.log("  朝代     事件  选项   平均选项");
console.log("  ──────────────────────────────");
let tot = 0, totOpt = 0;
const per = P.periods || {};
Object.keys(per).forEach((k) => {
  const ev = per[k].events || [];
  const opt = ev.reduce((n, e) => n + ((e.options || []).length), 0);
  tot += ev.length; totOpt += opt;
  console.log("  " + (k + "        ").slice(0, 8) +
    ("   " + ev.length).slice(-5) + ("     " + opt).slice(-5) +
    "    " + (ev.length ? (opt / ev.length).toFixed(1) : "-"));
});
console.log("  ──────────────────────────────");
console.log("  合计      " + tot + "   " + totOpt);
console.log("");
console.log("  通用 common: " + (P.common || []).length + " 条");
console.log("");
console.log("  各朝独有（eraEvents）");
console.log("  ──────────────────────────────");
const ee = P.eraEvents || {};
let et = 0, eo = 0;
Object.keys(ee).forEach((k) => {
  const ev = ee[k] || [];
  const opt = ev.reduce((n, e) => n + ((e.options || []).length), 0);
  et += ev.length; eo += opt;
  console.log("  " + (k + "        ").slice(0, 8) + ("   " + ev.length).slice(-5) + ("    " + opt).slice(-5));
});
console.log("  ──────────────────────────────");
console.log("  独有合计  " + et + " 条 / " + eo + " 选项");
console.log("");
console.log("  全部事件： " + (tot + et + (P.common || []).length) + " 条");
const recipes = P.recipes || (P.periods && P.periods.tang && P.periods.tang.recipes);
console.log("  配方: " + (recipes ? recipes.length : "见 js 目录"));
if (bad.length) { console.log(""); bad.forEach((b) => console.log("  ! " + b)); }
