/* 十九朝回归测试（Node，无需浏览器）
 * node tools/test-eras.js [每朝局数]
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

/* 脚本清单以 index.html 为准：新增数据包后，测试自动覆盖，不用再手改这份清单。
 * ui.js 依赖 DOM，跳过；engine / realm 等纯逻辑照常载入。 */
const FILES = (function () {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  return [...html.matchAll(/<script\s+src="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => !/js\/ui\.js$/.test(s));
})();

global.window = global;
global.localStorage = {
  _d: {}, getItem(k) { return this._d[k] || null; },
  setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; }
};

for (const f of FILES) {
  const code = fs.readFileSync(path.join(ROOT, f), "utf8");
  try { vm.runInThisContext(code, { filename: f }); }
  catch (e) { console.error("载入失败 " + f + "：" + e.message); process.exit(1); }
}

const S = global.SHZ;
const N = parseInt(process.argv[2] || "200", 10);
const errors = [];
let grandChoices = 0, grandRuns = 0;

function playRun(era, seed) {
  const s = S.newRun(seed, era);
  const evs = new Set();
  let choices = 0, guard = 0;
  while (!s.dead && guard++ < 80) {
    S.nextTurn(s);
    while (s.queue.length) {
      const ev = s.queue.shift();
      if (!ev || !ev.options) { errors.push(era + " 空事件"); break; }
      evs.add(ev.id);
      const opts = ev.options.map((o, i) => ({ o, i })).filter(x => S.optionVisible(x.o, s));
      if (!opts.length) continue;
      const pick = opts[Math.floor(Math.random() * opts.length)];
      S.choose(s, pick.i, ev);
      choices++;
      if (s.dead) break;
    }
  }
  if (!s.dead) errors.push(era + " 未在 80 回合内结束");
  for (const k of ["silver", "body", "grain", "fame"]) {
    if (!isFinite(s[k])) errors.push(era + " " + k + " 非数：" + s[k]);
  }
  if (s.silver < -1) errors.push(era + " 负银：" + s.silver);
  return { age: s.deathYear - (s.birthYear || s.year - s.age), choices, evs: evs.size, s };
}

console.log("每朝 " + N + " 局\n");
console.log("朝".padEnd(14) + "区域 势力 官职 事件  中位寿命  抉择  触及事件  人均遗银");
console.log("─".repeat(78));

for (const era of S.ERAS) {
  const b = S.bookOf(era.id);
  const pack = S.getPack(era.id);
  if (!b) { errors.push(era.id + " 无朝代数据"); continue; }
  if (!pack) { errors.push(era.id + " 无数据包"); continue; }
  if (!b.regions.length) errors.push(era.id + " 无政区");
  if (!b.factions.length) errors.push(era.id + " 无势力");
  if (!b.offices.central.length) errors.push(era.id + " 无官职");
  if (!b.places.length) errors.push(era.id + " 无地名");
  if (pack.events.length < 20) errors.push(era.id + " 事件过少：" + pack.events.length);

  const ages = [], chs = [], evc = [], sil = [];
  for (let i = 0; i < N; i++) {
    const r = playRun(era.id, (1000 + i * 37 + era.id.length * 11) >>> 0);
    ages.push(r.age); chs.push(r.choices); evc.push(r.evs); sil.push(r.s.silver);
    grandChoices += r.choices; grandRuns++;
  }
  const med = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  console.log(
    era.name.padEnd(12) +
    String(b.regions.length).padStart(3) +
    String(b.factions.length).padStart(4) +
    String(b.offices.central.length + b.offices.local.length + b.offices.military.length).padStart(5) +
    String(pack.events.length).padStart(5) +
    String(med(ages)).padStart(9) +
    String(med(chs)).padStart(7) +
    String(med(evc)).padStart(10) +
    String(Math.round(med(sil))).padStart(11)
  );
}

console.log("─".repeat(78));
console.log("总抉择：" + grandChoices + "，人均 " + (grandChoices / grandRuns).toFixed(1));
if (errors.length) {
  const uniq = [...new Set(errors)];
  console.log("\n问题 " + uniq.length + " 项：");
  uniq.slice(0, 40).forEach(e => console.log("  · " + e));
} else {
  console.log("\n无异常。");
}
