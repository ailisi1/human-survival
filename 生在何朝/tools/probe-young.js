/* 低龄死亡探针：看某个朝里十五岁前都死在什么上。
   node tools/probe-young.js [每朝局数] */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PACKS = fs.readdirSync(path.join(ROOT, "data", "packs")).filter(f => f.endsWith(".js")).sort();
const FILES = ["js/rng.js", "js/data.base.js", "js/geo.js", "js/era.dsl.js",
  "js/eras-1.js", "js/eras-2.js", "js/eras-3.js", "js/eras-4.js"]
  .concat(PACKS.map(f => "data/packs/" + f))
  .concat(["data/ming.sample.js", "js/realm.js", "js/engine.js"]);

global.window = global;
global.localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } };
for (const f of FILES) vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
const S = global.SHZ;

let rs = 987654;
const rnd = () => { rs = (rs * 1103515245 + 12345) & 0x7fffffff; return rs / 0x7fffffff; };
const N = parseInt(process.argv[2] || "400", 10);

const eras = Object.keys(S.PACKS ? {} : {}) ;
const list = S.ERA_LIST || Object.keys((S.getPack && {}) || {});
const ids = ["xin", "ehan", "sg", "wjin", "sui", "tang", "xxia", "jin", "qing"];

for (const era of ids) {
  const cause = {}, young = {};
  for (let i = 0; i < N; i++) {
    const s = S.newRun(2000 + i, era);
    let g = 0;
    while (!s.dead && g++ < 90) {
      S.nextTurn(s);
      while (s.queue.length) {
        const ev = s.queue.shift();
        if (!ev || !ev.options) break;
        const opts = ev.options.map((o, k) => ({ o, k })).filter(x => S.optionVisible(x.o, s));
        if (!opts.length) continue;
        const pick = opts[Math.floor(rnd() * opts.length)];
        S.choose(s, pick.k, ev);
        if (s.dead) break;
      }
    }
    const age = s.deathYear - (s.birthYear || (s.year - s.age));
    if (age < 15) { cause[s.cause] = (cause[s.cause] || 0) + 1; young[age] = (young[age] || 0) + 1; }
  }
  const tot = Object.values(cause).reduce((a, b) => a + b, 0);
  const top = Object.entries(cause).sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(x => x[0] + "×" + x[1]).join(" ");
  console.log(era.padEnd(6) + "早亡 " + String(tot).padStart(3) + "/" + N + "　" + top);
}
