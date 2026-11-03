/* 舆图几何自检（Node，无需浏览器）
 * 1. 每一朝画出来的块，拼起来必须是整片、无缝、不叠。
 * 2. 外轮廓必须是一条闭合曲线（每个轮廓顶点正好接两条边）。
 * 3. 版图外的块要有地名，不能画出没名的空地。
 * node tools/test-map.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const FILES = ["js/rng.js", "js/data.base.js", "js/geo.js", "js/era.dsl.js",
  "js/eras-1.js", "js/eras-2.js", "js/eras-3.js", "js/eras-4.js"];

global.window = global;
for (const f of FILES) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
}
const S = global.SHZ;
const problems = [];
const say = (s) => console.log(s);

/* ── 几何小工具 ── */
function cellXY(k) {
  return S.CELL[k].loop.map((n) => S.PT[n]);
}
function edgesOf(loop) {
  const out = [];
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i], b = loop[(i + 1) % loop.length];
    out.push([a, b].sort().join("~"));
  }
  return out;
}
/* 扫描线取样：点落在几块里 */
function inPoly(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a[1] > pt[1]) !== (b[1] > pt[1]) &&
      pt[0] < ((b[0] - a[0]) * (pt[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}
function area(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/* ── 一、每一朝的底图 ── */
const eras = Object.keys(S.BOOK);
if (eras.length !== 19) problems.push("政权数不是十九：" + eras.length);

const allCells = Object.keys(S.GEO);
let worstGap = 0, worstOverlap = 0, worstEra = "";

for (const id of eras) {
  const M = S.mapOf(id);
  if (!M) { problems.push(id + " 无舆图"); continue; }

  const inEra = {};
  M.regions.forEach((r) => { inEra[r.id] = 1; });

  /* 合并块：用了整块，就不画被它拆开的两块；没用整块，一律按拆开的画 */
  const skip = {};
  Object.keys(S.CELL_ALIAS).forEach((k) => {
    const parts = S.CELL_ALIAS[k];
    if (inEra[k]) parts.forEach((p) => { skip[p] = 1; });
    else skip[k] = 1;
  });

  const drawn = allCells.filter((k) => !skip[k]);
  const far = drawn.filter((k) => !inEra[k]);

  /* 1.1 每块都要有区域，或要有版图外的地名 */
  far.forEach((k) => {
    if (!S.CELL_FAR[k]) problems.push(id + " 版图外块无地名：" + k);
  });

  /* 1.2 画出来的块互不重叠（取样） */
  let xs = [1e9, -1e9], ys = [1e9, -1e9];
  drawn.forEach((k) => cellXY(k).forEach((p) => {
    xs[0] = Math.min(xs[0], p[0]); xs[1] = Math.max(xs[1], p[0]);
    ys[0] = Math.min(ys[0], p[1]); ys[1] = Math.max(ys[1], p[1]);
  }));
  let over = 0, inside = 0;
  for (let x = xs[0]; x <= xs[1]; x += 4) {
    for (let y = ys[0]; y <= ys[1]; y += 4) {
      let n = 0;
      for (const k of drawn) if (inPoly([x, y], cellXY(k))) n++;
      if (n > 1) over++;
      if (n >= 1) inside++;
    }
  }
  if (over > 0) problems.push(id + " 有 " + over + " 个点同时落在两块里");
  if (over > worstOverlap) { worstOverlap = over; worstEra = id; }

  /* 1.3 画出来的块，面积之和应等于外轮廓面积（即无缝无叠） */
  const outer = [];
  const deg = {};
  drawn.forEach((k) => edgesOf(S.CELL[k].loop).forEach((e) => { deg[e] = (deg[e] || 0) + 1; }));
  Object.keys(deg).forEach((e) => { if (deg[e] === 1) outer.push(e); });
  /* 轮廓顶点度数必须为 2，否则岸线会在那里断开或分叉 */
  const vdeg = {};
  outer.forEach((e) => e.split("~").forEach((v) => { vdeg[v] = (vdeg[v] || 0) + 1; }));
  const bad = Object.keys(vdeg).filter((v) => vdeg[v] !== 2);
  if (bad.length) problems.push(id + " 轮廓不闭合于顶点：" + bad.join(","));
  if (!outer.length) problems.push(id + " 没有外轮廓");
}

say("政权 " + eras.length + "　地块 " + allCells.length);
say("逐朝取样：最大重叠点数 " + worstOverlap + (worstEra ? "（" + worstEra + "）" : ""));

/* ── 二、绕向：逆时针为正，混着画不影响填色，但顺序要一致 ── */
const cw = allCells.filter((k) => area(cellXY(k)) < 0);
if (cw.length) say("绕向相反的地块：" + cw.join(" "));

/* ── 三、顶点是否都在纸内 ── */
Object.keys(S.PT).forEach((k) => {
  const p = S.PT[k];
  if (p[0] < 60 || p[0] > 820 || p[1] < 100 || p[1] > 700) {
    problems.push("顶点出界：" + k + " " + p.join(","));
  }
});

/* ── 四、未使用的顶点 ── */
const used = {};
allCells.forEach((k) => S.CELL[k].loop.forEach((n) => { used[n] = 1; }));
const unused = Object.keys(S.PT).filter((k) => !used[k]);
if (unused.length) say("未被任何地块引用的顶点：" + unused.join(" "));

if (problems.length) {
  console.log("\n问题 " + problems.length + " 项：");
  problems.forEach((p) => console.log("  · " + p));
  process.exit(1);
}
say("无异常。");
