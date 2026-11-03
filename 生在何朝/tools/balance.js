/* 生死平衡诊断（Node）
 * node tools/balance.js [每朝局数]
 * 输出：寿命分位、死因构成、身体轨迹
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
/* 自动扫 packs：加了新卷不必回来改这里（早先是硬编码，新卷一直没被算进去） */
const PACKS = fs.readdirSync(path.join(ROOT, "data", "packs")).filter((f) => f.endsWith(".js")).sort();
const FILES = ["js/rng.js", "js/data.base.js", "js/geo.js", "js/era.dsl.js",
  "js/eras-1.js", "js/eras-2.js", "js/eras-3.js", "js/eras-4.js"]
  .concat(PACKS.map((f) => "data/packs/" + f))
  .concat(["data/ming.sample.js", "js/realm.js", "js/engine.js"]);

global.window = global;
global.localStorage = {
  _d: {}, getItem(k) { return this._d[k] || null; },
  setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; }
};
for (const f of FILES) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
}
const S = global.SHZ;

const N = parseInt(process.argv[2] || "300", 10);
const ONLY = process.argv[3] || null;

/* 确定性伪随机，别用 Math.random，否则每次跑数不一样 */
let rs = 12345;
function rnd() { rs = (rs * 1103515245 + 12345) & 0x7fffffff; return rs / 0x7fffffff; }

const q = (a, p) => a.slice().sort((x, y) => x - y)[Math.min(a.length - 1, Math.floor(a.length * p))];

function play(era, seed) {
  const s = S.newRun(seed, era);
  const trail = [];
  let guard = 0, lastBody = 0;
  while (!s.dead && guard++ < 90) {
    S.nextTurn(s);
    if (!s.dead) lastBody = s.body;
    while (s.queue.length) {
      const ev = s.queue.shift();
      if (!ev || !ev.options) break;
      if (s.age >= 20 && s.age <= 45 && trail.length < 40) trail.push(s.body);
      const opts = ev.options.map((o, i) => ({ o, i })).filter(x => S.optionVisible(x.o, s));
      if (!opts.length) continue;
      const pick = opts[Math.floor(rnd() * opts.length)];
      S.choose(s, pick.i, ev);
      if (!s.dead) lastBody = s.body;
      if (s.dead) break;
    }
  }
  const birth = s.birthYear || (s.year - s.age);
  return { age: s.deathYear - birth, cause: s.cause || "?", body: lastBody, trail };
}

const rows = [];
console.log("每朝 " + N + " 局\n");
console.log("朝".padEnd(10) + "  中位   p25   p75   25岁前亡  病殁占比  中年体均值");
console.log("─".repeat(72));

for (const era of S.ERAS) {
  if (ONLY && era.id !== ONLY) continue;
  const ages = [], early = [], causes = {}, bodies = [], trails = [];
  for (let i = 0; i < N; i++) {
    const r = play(era.id, (7000 + i * 613 + era.id.length * 97) >>> 0);
    ages.push(r.age);
    if (r.age < 25) early.push(1);
    causes[r.cause] = (causes[r.cause] || 0) + 1;
    if (r.trail.length) { trails.push(r.trail.reduce((a, b) => a + b, 0) / r.trail.length); }
  }
  const med = q(ages, 0.5);
  const sick = (causes["病殁"] || 0) / N + (causes["饥饿"] || 0) / N;
  console.log(
    era.name.padEnd(10) +
    String(med).padStart(5) +
    String(q(ages, 0.25)).padStart(6) +
    String(q(ages, 0.75)).padStart(6) +
    String((early.length / N * 100).toFixed(0) + "%").padStart(9) +
    String((sick * 100).toFixed(0) + "%").padStart(10) +
    String(trails.length ? (trails.reduce((a, b) => a + b, 0) / trails.length).toFixed(0) : "-").padStart(11)
  );
  rows.push({ id: era.id, med });
}

const worst = rows.slice().sort((a, b) => a.med - b.med)[0];
if (worst) console.log("\n最短：" + worst.id + " " + worst.med + " 岁");
