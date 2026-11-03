/* 生在何朝 · 题材露出率诊断
 * 用法：node tools/cat-ratio.js [每朝局数，默认 120]
 *
 * 回答一个 audit 答不出的问题：某一类事件写了那么多条，为什么玩家见不到。
 *
 * 它同时记两个数：
 *   机会占比 —— 每一回合，把此刻「够格」的事件按题材数一遍，除以总够格数。
 *              这个数代表「如果纯随机抽，它应该占多少」。
 *   命中占比 —— 实际抽出来的事件按题材数一遍。
 *
 * 两个数一除，就是露出倍数：
 *   < 0.6  写了但见不到（权重偏低，或被临期优先/新鲜度挤掉）
 *   ≈ 1    正常
 *   > 2    正在挤占别的题材
 *
 * 注意：这是「够格数」口径，不是「权重和」口径。两者一起看才能分辨
 * 是"条件太窄"（够格数少）还是"权重太低"（够格多但抽不到）。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PER_ERA = Number(process.argv[2]) || 120;

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !/js\/ui\.js$/.test(s));

const ctx = { console, setTimeout, clearTimeout, Math, Date, JSON };
vm.createContext(ctx);
ctx.window = ctx;
ctx.globalThis = ctx;
ctx.document = { addEventListener() {}, querySelector: () => null, createElement: () => ({}) };
ctx.localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } };

for (const f of scripts) {
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.log("!! " + f + "：" + e.message); process.exit(1); }
}
const S = ctx.SHZ;

/* 与 engine.js 的 matchEvent 同一份逻辑（那边没导出，这里照着写一遍） */
function eligible(e, s) {
  if (e.hidden) return false;
  if (S.RETIRED && S.RETIRED[e.id]) return false;
  if (e.once && s.usedEvents.indexOf(e.id) >= 0) return false;
  if (e.era && e.era !== s.era) return false;
  if (e.years && (s.year < e.years[0] || s.year > e.years[1])) return false;
  if (e.age && (s.age < e.age[0] || s.age > e.age[1])) return false;
  if (e.sex && e.sex !== "*" && e.sex !== s.sex) return false;
  if (e.class && e.class.length && e.class.indexOf(s.cls) < 0) return false;
  if (e.line && e.line !== "*" && e.line !== s.line) return false;
  if (e.area && e.area.length && e.area.indexOf(s.place.prov) < 0) return false;
  if (e.notArea && e.notArea.indexOf(s.place.prov) >= 0) return false;
  if (e.path && e.path.length && e.path.indexOf(s.path) < 0) return false;
  if (!S.testWhen(e.when, s)) return false;
  return true;
}

const oppN = Object.create(null);   /* 够格的条次数 */
const oppW = Object.create(null);   /* 够格的权重和 */
const hitN = Object.create(null);   /* 实际抽中次数 */
let turns = 0;

const eras = S.ERAS.map((e) => e.id);
for (const era of eras) {
  const pack = S.getPack(era);
  if (!pack) continue;
  for (let i = 0; i < PER_ERA; i++) {
    const s = S.newRun(S.hashSeed(era + "#ratio#" + i), era);
    const pick = S.rng((S.hashSeed(era + "#ratio#" + i) ^ 0x9e3779b9) >>> 0);
    let guard = 0;
    while (!s.dead && guard++ < 90) {
      /* 先数够格池 */
      turns++;
      for (const e of pack.events) {
        if (!eligible(e, s)) continue;
        const c = e.cat || "?";
        oppN[c] = (oppN[c] || 0) + 1;
        oppW[c] = (oppW[c] || 0) + (e.weight || 1);
      }
      S.nextTurn(s);
      let g2 = 0;
      while (s.queue.length && g2++ < 20) {
        const ev = s.queue.shift();
        if (!ev || !ev.options) break;
        hitN[ev.cat || "?"] = (hitN[ev.cat || "?"] || 0) + 1;
        const opts = ev.options.map((o, i2) => ({ o, i: i2 })).filter((x) => S.optionVisible(x.o, s));
        if (!opts.length) continue;
        S.choose(s, opts[Math.floor(pick() * opts.length)].i, ev);
        if (s.dead) break;
      }
    }
  }
}

const totOpp = Object.values(oppN).reduce((a, b) => a + b, 0);
const totHit = Object.values(hitN).reduce((a, b) => a + b, 0);

function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s + " "; }

console.log("题材露出率诊断 · " + eras.length + " 朝 × " + PER_ERA + " 局 · " + turns + " 回合\n");
console.log(pad("题材", 8) + pad("条数", 6) + pad("机会占比", 10) + pad("命中占比", 10) + pad("倍数", 8) + "判断");
console.log("─".repeat(62));

const rows = Object.keys(oppN).map((c) => {
  const po = oppN[c] / totOpp;
  const ph = (hitN[c] || 0) / totHit;
  return { c, n: oppN[c], po, ph, r: ph / po };
}).sort((a, b) => a.r - b.r);

const low = [];
for (const r of rows) {
  let tag = "";
  if (r.r < 0.6) { tag = "★ 见不到"; low.push(r); }
  else if (r.r < 0.85) tag = "偏低";
  else if (r.r > 2) tag = "挤占";
  console.log(
    pad(r.c, 8) + pad(r.n, 6) +
    pad((r.po * 100).toFixed(1) + "%", 10) +
    pad((r.ph * 100).toFixed(1) + "%", 10) +
    pad(r.r.toFixed(2), 8) + tag
  );
}

console.log("\n够格总次数 " + totOpp + " · 实际抽中 " + totHit);
if (low.length) {
  console.log("\n露出最低的 " + low.length + " 类：" + low.map((r) => r.c + "(" + r.r.toFixed(2) + ")").join("、"));
}
