#!/usr/bin/env node
/* ══════════════════════════════════════════════════
   卷二 · 事件可达性审计
   ══════════════════════════════════════════════════
   用法：node tools/audit.js [每朝局数，默认 420]

   回答一个问题：这 1448 条事件里，有哪些是「写进去了但玩家一辈子遇不到」的。

   做三件事：
     1. 全量跑局，记录每条事件被抽中的次数
     2. 对零命中的，静态诊断死因（年份/年龄/性别/阶层有没有可能凑齐）
     3. 查重复 id 与非法字段（这两种会让事件被静默吞掉）

   为什么不能只靠 lint：lint 按文件数条目，死数据照样数得进去。
   ══════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PER_ERA = Number(process.argv[2]) || 420;

/* ---------- 按页面顺序加载 ---------- */

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !/js\/ui\.js$/.test(s));

const ctx = {
  console,
  setTimeout,
  clearTimeout,
  Math,
  Date,
  JSON,
};
vm.createContext(ctx);
ctx.window = ctx;
ctx.globalThis = ctx;
ctx.document = { addEventListener() {}, querySelector: () => null, createElement: () => ({}) };
ctx.localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } };

const loadErr = [];
for (const f of scripts) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  } catch (e) {
    loadErr.push(`${f} → ${e.message}`);
  }
}
if (loadErr.length) {
  console.log("✗ 加载失败：");
  loadErr.forEach((x) => console.log("   ", x));
}

const S = ctx.SHZ;
const PACKS = ctx.PACK_BASE || {};

/* ---------- 收集全库事件（按来源文件） ---------- */

const dir = path.join(ROOT, "data/packs");
const srcOf = new Map(); // id -> 文件名
const metaOf = new Map(); // 唯一键 era|id -> 事件对象

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".js"))) {
  const txt = fs.readFileSync(path.join(dir, f), "utf8");
  for (const m of txt.matchAll(/^\s{0,10}id:\s*"([^"]+)"/gm)) {
    if (!srcOf.has(m[1])) srcOf.set(m[1], f);
  }
}

/* 真正生效的池：common + eraEvents + periods[].events */
const allEvents = [];
(PACKS.common || []).forEach((e) => allEvents.push({ e, from: "common" }));
for (const era of Object.keys(PACKS.eraEvents || {})) {
  (PACKS.eraEvents[era] || []).forEach((e) => allEvents.push({ e, from: era }));
}
for (const [pname, p] of Object.entries(PACKS.periods || {})) {
  (p.events || []).forEach((e) => allEvents.push({ e, from: "period:" + pname }));
}

console.log("卷二 · 事件可达性审计");
console.log("─".repeat(56));
console.log(`生效事件 ${allEvents.length} 条（common ${(PACKS.common || []).length} / eraEvents ${Object.keys(PACKS.eraEvents || {}).length} 朝 / periods ${Object.keys(PACKS.periods || {}).length} 段）`);

/* ---------- 重复 id ---------- */

const idPools = new Map();
for (const { e, from } of allEvents) {
  if (!idPools.has(e.id)) idPools.set(e.id, new Set());
  idPools.get(e.id).add(from);
}
/* 同一份定义可以挂给多个时段（科举、文事各挂三份），这是有意的；
   只有"落在不同性质的池子里"才算真重复。 */
const dupIds = [...idPools.entries()].filter(([, set]) => {
  const arr = [...set];
  if (arr.length < 2) return false;
  return !arr.every((f) => f.indexOf("period:") === 0);
});
if (dupIds.length) {
  console.log(`\n✗ 重复 id ${dupIds.length} 组（usedEvents 按 id 去重，同 id 只会出现一次）：`);
  dupIds.slice(0, 10).forEach(([k]) => console.log("   ·", k));
}

/* ---------- 跑局 ---------- */

const eras = S.ERAS.map((e) => e.id);
const hit = Object.create(null);
let runs = 0;
let dead = 0;

function playOne(seed, era) {
  const s = S.newRun(seed, era);
  const pick = S.rng((seed ^ 0x9e3779b9) >>> 0);   /* 选项也走种子，整轮可复现 */
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
  if (s.dead) dead++;
}

/* 种子必须散开。早先用 i*7919+13+era.length*101 这种等差种子，
   mulberry32 前几个输出对等差种子的相关性强，导致「出生年 × 地点」组合
   被系统性地排掉一部分（某段年份里从来没出现过直隶），
   于是把一批本来正常的事件误判成死内容。改用 FNV 哈希种字符串。 */
const t0 = Date.now();
for (const era of eras) {
  for (let i = 0; i < PER_ERA; i++) playOne(S.hashSeed(era + "#" + i), era);
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);

/* ---------- 结果分类 ---------- */

const never = [];
const rare = [];
const ok = [];
const RETIRED = S.RETIRED || {};
for (const { e, from } of allEvents) {
  if (RETIRED[e.id]) continue;   // 重复条目已主动关掉，不算死内容
  const n = hit[e.id] || 0;
  const rec = { id: e.id, from, n, e };
  if (n === 0) never.push(rec);
  else if (n < 5) rare.push(rec);
  else ok.push(rec);
}

console.log(`\n跑了 ${runs} 局（每朝 ${PER_ERA}），用时 ${secs}s`);
console.log(`  抽中过    ${ok.length} 条`);
console.log(`  极少见    ${rare.length} 条（<5 次）`);
console.log(`  从未出现  ${never.length} 条  ← 重点`);

/* ---------- 死因诊断 ---------- */

/* ERAS[].span 是给人读的字符串，形如 "618 — 907"、"−221 — −207"，要解析成数字 */
function parseSpan(txt) {
  if (!txt) return null;
  const m = String(txt).match(/(-?\d+)\s*[—–\-~至到]\s*(-?\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}
const bookSpan = {};
for (const e of S.ERAS) bookSpan[e.id] = parseSpan(e.span);

/* 每条事件到底会被哪些朝代加载？不在这里面 = 永远抽不到 */
const loadable = new Map(); // id -> 朝代数组
for (const era of eras) {
  const pack = S.getPack(era);
  if (!pack || !pack.events) continue;
  for (const e of pack.events) {
    if (!loadable.has(e.id)) loadable.set(e.id, []);
    loadable.get(e.id).push(era);
  }
}

/* 时段错位：era 属于 A 段，却写在 B 段数组里 */
const PERIOD_OF = S.PERIOD_OF || {};
const misplaced = [];
for (const p of Object.keys(PACKS.periods || {})) {
  for (const e of PACKS.periods[p].events || []) {
    if (e.era && PERIOD_OF[e.era] && PERIOD_OF[e.era] !== p) {
      misplaced.push({ id: e.id, era: e.era, want: PERIOD_OF[e.era], got: p });
    }
    if (e.era && !PERIOD_OF[e.era]) {
      misplaced.push({ id: e.id, era: e.era, want: "无效朝代 id", got: p });
    }
  }
}

function diagnose(rec) {
  const e = rec.e;
  const why = [];

  /* 最狠的一种：根本没有任何朝代加载它 */
  if (!loadable.has(e.id)) {
    why.push("★ 没有任何朝代的事件池会加载它（放错时段 / 写成了别的朝代的专有包）");
    return why.join("；");
  }

  if (e.hidden) why.push("标了 hidden（由引擎在特定时机直接塞进队列）");

  if (e.years) {
    const span = bookSpan[e.era] || null;
    const reach = loadable.get(e.id) || [];
    const anySpan = span || (reach.length ? bookSpan[reach[0]] : null);
    if (anySpan) {
      const overlap = Math.min(e.years[1], anySpan[1]) - Math.max(e.years[0], anySpan[0]);
      if (overlap < 0) why.push(`年份窗口 [${e.years}] 与本朝跨度 [${anySpan}] 无交集`);
      else if (overlap <= 4) why.push(`年份窗口只有 ${overlap + 1} 年可通过`);
    }
  }

  if (e.class && e.class.length) why.push(`限阶层 ${e.class.join("/")}`);
  if (e.line && e.line !== "*") why.push(`限出身 ${e.line}`);
  if (e.sex && e.sex !== "*") why.push(`限性别 ${e.sex}`);
  if (e.area) {
    /* 地名对不上是最隐蔽的一种死法：事件写了 area，城里却从来没有这个地名，
       条件永远不成立。判定要给"这条事件会被哪些朝加载"的并集，
       不能拿它所在的文件去猜。 */
    const reach = loadable.get(e.id) || [];
    const pool = new Set();
    for (const r of reach) {
      const b = S.bookOf(r);
      for (const p of (b && b.places) || []) pool.add(p.prov);
    }
    const ok = e.area.filter((a) => pool.has(a));
    if (!ok.length) why.push(`★ 限地区 ${e.area.join("/")} 全部不在本朝地名池（${[...pool].slice(0, 8).join("/")}…）`);
    else why.push(`限地区 ${ok.join("/")}`);
  }
  if (e.path && e.path.length) why.push(`限人生路径 ${e.path.join("/")}`);
  if (e.when) why.push("带额外条件 when");

  if (!why.length) why.push("条件无矛盾，可能是权重被挤（同窗口事件太多）");
  return why.join("；");
}

/* ---------- 静态可达性：这条事件理论上有没有可能被抽到 ----------
   角色年龄是离散的（回合计划决定），出生年落在朝跨度内。
   两者相加落在 years 窗口里，才算「存在可行组合」。
   组合数为 0 = 无论怎么玩都抽不到，这才是真死内容。 */

/* 回合计划分出的可达年龄 */
const REACH = (() => {
  const set = new Set([0]);
  let a = 0;
  for (const step of [1, 5, 4, 4, 1, 1]) { a += step; set.add(a); }   // birth→1→6→10→14→15→16
  for (let i = 0; i < 8; i++) { a += 1; set.add(a); }                  // → 24
  for (let i = 0; i < 6; i++) { a += 3; set.add(a); }                  // → 42
  for (let i = 0; i < 4; i++) { a += 4; set.add(a); }                  // → 58
  for (let i = 0; i < 3; i++) { a += 5; set.add(a); }                  // → 73
  return [...set].sort((x, y) => x - y);
})();

function spanNum(eraId) {
  const b = S.bookOf(eraId);
  const t = String((b && b.span) || "");
  const nums = [...t.matchAll(/(前\s*)?(\d+)/g)].map((m) => (m[1] ? -Number(m[2]) : Number(m[2])));
  return nums.length >= 2 ? [nums[0], nums[1]] : null;
}
const SPAN = {};
for (const e of S.ERAS) SPAN[e.id] = spanNum(e.id);

function feasibility(e) {
  const reach = loadable.get(e.id);
  if (!reach || !reach.length) return 0;
  const ages = REACH.filter((a) => (!e.age || (a >= e.age[0] && a <= e.age[1])));
  if (!ages.length) return 0;
  if (!e.years) return ages.length;  // 没有年份限定，年龄够就可能
  let n = 0;
  for (const era of reach) {
    const sp = SPAN[era];
    if (!sp) continue;
    for (let b = sp[0]; b <= sp[1]; b++) {
      for (const a of ages) if (b + a >= e.years[0] && b + a <= e.years[1]) n++;
    }
  }
  return n;
}

const impossible = [];
for (const { e, from } of allEvents) {
  if (e.hidden) continue;   // hidden 由引擎直接塞，不走抽取池
  if ((S.RETIRED || {})[e.id]) continue;
  const f = feasibility(e);
  if (f === 0) impossible.push({ id: e.id, from, e });
}

/* ---------- 选项可得性：事件弹出来了，会不会一个选项都点不了 ---------- */
const noOption = [];
for (const { e } of allEvents) {
  if (!e.options || !e.options.length) { noOption.push({ id: e.id, why: "没有 options" }); continue; }
  const allConditional = e.options.every((o) => o.need && Object.keys(o.need).length);
  if (allConditional) noOption.push({ id: e.id, why: "所有选项都带 need 条件，可能一个都显示不出来" });
}

console.log(`\n静态可达性（可达年龄 ${REACH.length} 个：${REACH.slice(0, 10).join(",")}…）`);
if (impossible.length) {
  console.log(`  ✗ 理论上抽不到 ${impossible.length} 条：`);
  impossible.slice(0, 20).forEach((r) => {
    const e = r.e;
    console.log(`     · ${r.id.padEnd(18)} years=${JSON.stringify(e.years)} age=${JSON.stringify(e.age)}`);
  });
  if (impossible.length > 20) console.log(`     …还有 ${impossible.length - 20} 条`);
} else {
  console.log("  ✓ 每一条都存在可行的（出生年 × 年龄）组合");
}

if (noOption.length) {
  console.log(`\n⚠ 选项可能有问题的 ${noOption.length} 条：`);
  noOption.slice(0, 10).forEach((r) => console.log(`     · ${r.id.padEnd(18)} ${r.why}`));
} else {
  console.log("  ✓ 每条事件都至少有一个无条件选项");
}

if (misplaced.length) {
  console.log(`\n✗ 时段错位 ${misplaced.length} 条（era 属于 A 段，却写在 B 段数组里，两边的局都不会加载它）：`);
  misplaced.forEach((m) => console.log(`    · ${m.id.padEnd(18)} era=${m.era} 应在 ${m.want}，实际在 ${m.got}`));
} else {
  console.log("\n✓ 没有时段错位");
}

if (never.length) {
  console.log("\n从未出现的事件：");
  const byFrom = {};
  for (const r of never) (byFrom[r.from] = byFrom[r.from] || []).push(r);
  for (const k of Object.keys(byFrom).sort()) {
    console.log(`\n  [${k}] ${byFrom[k].length} 条`);
    for (const r of byFrom[k].slice(0, 14)) {
      console.log(`    · ${r.id.padEnd(18)} ${String(r.e.title || "").padEnd(10)}  ${diagnose(r)}`);
    }
    if (byFrom[k].length > 14) console.log(`      …还有 ${byFrom[k].length - 14} 条`);
  }
}

if (rare.length) {
  console.log("\n极低频（<5 次，玩家几乎见不到）：");
  rare
    .sort((a, b) => a.n - b.n)
    .slice(0, 20)
    .forEach((r) => console.log(`    · ${r.id.padEnd(18)} ${r.n} 次   ${diagnose(r)}`));
}

/* ---------- 人均事件 ---------- */

const totalHit = Object.values(hit).reduce((a, b) => a + b, 0);
console.log(`\n人均抽到事件 ${(totalHit / runs).toFixed(1)} 条 / 局`);

const bad = never.length + dupIds.length;
process.exit(bad ? 1 : 0);
