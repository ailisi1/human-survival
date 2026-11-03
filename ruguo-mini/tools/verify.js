/* 小程序版回归：在 node 里把 core/ 的两份模块当普通 CommonJS 跑
 *
 * 只测引擎与数据（页面渲染靠微信开发者工具，node 测不了）。
 * 检查四件事：
 *   1. pack.js / engine.js 能被 require，条数与网页版一致
 *   2. 随机跑 N 局，每局都能走到 settle，不卡死
 *   3. 四种卡（二选一 / 多选 / 剧情 / 事件+连锁）都能触发
 *   4. 20 个结局称号都出得来，没有一个垄断
 *
 * 用法：node ruguo-mini/tools/verify.js
 */
const path = require("path");
const RUGO = require(path.resolve(__dirname, "../core/engine.js"));
const data = require(path.resolve(__dirname, "../core/pack.js"));

const N = 400;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const modes = { card: 0, multi: 0, beat: 0, event: 0, chain: 0 };
const titles = {};
let ages = [];
let regretMin = 1e9;
let regretMax = 0;
let stuck = 0;

for (let i = 0; i < N; i++) {
  const seed = Math.floor(Math.random() * 0x7fffffff);
  const s = RUGO.newState(seed);
  RUGO.start(s);

  let guard = 0;
  while (!RUGO.isDone(s)) {
    if (guard++ > 300) {
      stuck++;
      break;
    }
    if (RUGO.isEvent(s) || RUGO.isChain(s)) {
      if (RUGO.isChain(s)) modes.chain++;
      else modes.event++;
      const card = RUGO.currentCard(s);
      RUGO.pickEventOption(s, pick(card.options).key);
      RUGO.nextCard(s);
      continue;
    }
    if (RUGO.isMulti(s) && !s.picked) {
      modes.multi++;
      const card = RUGO.currentCard(s);
      const keys = card.items.map((it) => it.key);
      const chosen = [];
      while (chosen.length < card.pickCount && keys.length) {
        const k = keys.splice(Math.floor(Math.random() * keys.length), 1)[0];
        chosen.push(k);
      }
      RUGO.pickMulti(s, chosen);
      continue;
    }
    const beat = RUGO.currentBeat(s);
    if (beat) {
      modes.beat++;
      RUGO.pickBeat(s, Math.random() < 0.5 ? "A" : "B");
      continue;
    }
    if (s.picked) {
      RUGO.nextCard(s);
      continue;
    }
    modes.card++;
    const card = RUGO.currentCard(s);
    RUGO.pickOption(s, pick(card.options).key);
  }

  if (RUGO.isDone(s)) {
    const r = RUGO.settle(s);
    titles[r.title] = (titles[r.title] || 0) + 1;
    ages.push(r.age);
    regretMin = Math.min(regretMin, r.regrets.length);
    regretMax = Math.max(regretMax, r.regrets.length);
  }
}

const all = Object.keys(titles);
const missing = (RUGO.ALL_TITLES || []).filter((t) => !titles[t]);

console.log("数据条数");
console.log("  开局题 :", data.PACK_START.length);
console.log("  随机事件 :", (data.PACK_EVENTS || []).length);
console.log("  连锁局 :", (data.PACK_CHAINS || []).length);
console.log("");
console.log("跑 " + N + " 局");
console.log("  卡住 :", stuck);
console.log("  四类卡触发次数 :", JSON.stringify(modes));
console.log("  岁数范围 :", Math.min.apply(null, ages) + " ~ " + Math.max.apply(null, ages));
console.log("  放弃清单条数 :", regretMin + " ~ " + regretMax);
console.log("  称号覆盖 :", all.length + " / " + (RUGO.ALL_TITLES || []).length);
if (missing.length) console.log("  未出现 :", missing.join("、"));
const top = Object.keys(titles).sort((a, b) => titles[b] - titles[a])[0];
console.log("  最多 :", top, (titles[top] / N * 100).toFixed(1) + "%");
