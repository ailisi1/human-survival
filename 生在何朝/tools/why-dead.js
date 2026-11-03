#!/usr/bin/env node
/* ══════════════════════════════════════════════════
   卷二 · 死内容死因分析
   ══════════════════════════════════════════════════
   用法：node tools/why-dead.js [每朝局数，默认 420]

   audit.js 只告诉你"哪些一次没抽到"，这个脚本回答"为什么"：
     够格次数 = 这条事件进入候选池的回合数（受 age / years / 性别 / 地区 / when 限制）
     抽取次数 = 真正被抽到并递到玩家面前的次数
     挤占权重 = 它进池那些回合里，同池其它事件权重之和（越大越难出头）

   三种死法的判据：
     够格 0        → 窗口死：条件永远凑不齐
     够格 >0 抽取 0 → 权重死：竞品太多，概率被摊薄
     抽取 >0 但少   → 稀客：只是少见，不算死
   ══════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PER_ERA = Number(process.argv[2]) || 420;

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
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  } catch (e) {
    console.log("✗ 加载失败", f, e.message);
  }
}

const S = ctx.SHZ;

/* ---------- 统计钩子 ---------- */

const inPool = Object.create(null);   /* 进池回合数 */
const poolW = Object.create(null);    /* 进池时同池权重合计（累加，最后除以次数） */
const poolN = Object.create(null);    /* 进池时的同池条目数 */
const hit = Object.create(null);

S.onPool = function (pool, s) {
  let sum = 0;
  const n = pool.length;
  for (const e of pool) sum += Math.max(0.01, e.weight || 1);
  for (const e of pool) {
    inPool[e.id] = (inPool[e.id] || 0) + 1;
    poolW[e.id] = (poolW[e.id] || 0) + sum;
    poolN[e.id] = (poolN[e.id] || 0) + n;
  }
};

/* ---------- 跑局 ---------- */

const eras = S.ERAS.map((e) => e.id);
let runs = 0;

function playOne(seed, era) {
  const s = S.newRun(seed, era);
  const pick = S.rng((seed ^ 0x9e3779b9) >>> 0);
  let guard = 0;
  while (!s.dead && guard++ < 90) {
    S.nextTurn(s);
    let g2 = 0;
    while (s.queue.length && g2++ < 20) {
      const ev = s.queue.shift();
      if (!ev || !ev.options) break;
      hit[ev.id] = (hit[ev.id] || 0) + 1;
      const opts = ev.options.map((o, i) => ({ o, i })).filter((x) => S.optionVisible(x.o, s));
      if (!opts.length) continue;
      S.choose(s, opts[Math.floor(pick() * opts.length)].i, ev);
      if (s.dead) break;
    }
  }
  runs++;
}

for (const era of eras) {
  for (let i = 0; i < PER_ERA; i++) playOne(S.hashSeed(era + "#" + i), era);
}

/* ---------- 按数据里的事件清单核对 ---------- */

const seen = new Set();
const all = [];
function add(list, from) {
  for (const e of list || []) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    all.push({ e, from });
  }
}
const B = ctx.PACK_BASE || {};
add(B.events, "common");
for (const k of Object.keys(B.eraEvents || {})) add(B.eraEvents[k], "era:" + k);
for (const k of Object.keys(B.periods || {})) add(B.periods[k].events, "period:" + k);

const RETIRED = S.RETIRED || {};
const dead = [];
const thin = [];
for (const { e, from } of all) {
  if (RETIRED[e.id]) continue;
  if (e.hidden) continue;                    /* hidden 由引擎直接塞，不进随机池 */
  const n = hit[e.id] || 0;
  const p = inPool[e.id] || 0;
  const rec = {
    id: e.id, from, n, p,
    avgPool: p ? (poolN[e.id] / p) : 0,
    avgW: p ? (poolW[e.id] / p) : 0,
    w: Math.max(0.01, e.weight || 1),
    e
  };
  if (n === 0) dead.push(rec);
  else if (n < 5) thin.push(rec);
}

console.log(`跑了 ${runs} 局（每朝 ${PER_ERA}），事件 ${all.length} 条`);
console.log(`  一次没抽到 ${dead.length} 条 / 少见(<5 次) ${thin.length} 条\n`);

function show(list, title) {
  if (!list.length) return;
  console.log(title);
  list.sort((a, b) => a.p - b.p);
  for (const r of list) {
    const share = r.avgW ? ((r.w / r.avgW) * 100).toFixed(1) : "—";
    const why = r.p === 0 ? "窗口死" : (r.p < 30 ? "窗口极窄" : "权重被挤");
    const yw = r.e.years ? (r.e.years[1] - r.e.years[0] + 1) + "年" : "常年";
    console.log(
      `  · ${r.id.padEnd(22)} 够格 ${String(r.p).padStart(5)} 次  抽中 ${String(r.n).padStart(3)} 次` +
      `  窗口 ${yw.padStart(4)}  同池均 ${r.avgPool.toFixed(0)} 条 / 权重 ${r.avgW.toFixed(0)}  占 ${String(share).padStart(5)}%` +
      `  〔${why}〕 ${r.e.title || ""}`
    );
  }
  console.log("");
}

show(dead, "一次没抽到：");
show(thin, "少见（<5 次）：");

/* ---------- 小结 ---------- */
const w0 = dead.filter((r) => r.p === 0).length;
const w1 = dead.filter((r) => r.p > 0).length;
console.log(`死因分布：窗口死 ${w0} 条 / 权重被挤 ${w1} 条`);
if (w0) console.log("  窗口死 → 改 age 或 years，让它有机会落在局内");
if (w1) console.log("  权重被挤 → 抬 weight，或给它更专属的 age/years 窗口");
