/* 代价对不对得上。
 *
 * 每条选项都要写 hint，hint 里的数字玩家会当真。
 * 改了 effects 忘了改 hint、或者反过来，都不会报错 —— 玩家看到的代价和实际扣的不是一回事。
 * 这个脚本把两边对齐着看：hint 里点了名又跟了数字的指标，effects 里必须有。
 *
 *   node tools/hint-check.js        全库
 *   node tools/hint-check.js c10    只看 c10 开头的
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PACKS = path.join(ROOT, "data", "packs");
const only = (process.argv[2] || "").trim();

const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of fs.readdirSync(PACKS).filter((x) => x.endsWith(".js")).sort()) {
  try { vm.runInContext(fs.readFileSync(path.join(PACKS, f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.log("!! " + f + " 语法错：" + e.message); process.exit(1); }
}
const B = ctx.window.PACK_BASE;

/* hint 里的中文指标名 → effects 的原子名。
   「田产」在 effects 里拆成 field_wet / field_dry，任一即可。 */
const MAP = {
  "身体": ["body"], "银钱": ["silver"], "粮": ["grain"],
  "学识": ["knowledge"], "武艺": ["martial"], "声望": ["fame"],
  "官身": ["official"], "交游": ["favor"], "怨恨": ["grudge"],
  "田产": ["field_wet", "field_dry"], "田": ["field_wet", "field_dry"]
};
/* 长名优先：先吃掉「田产」，剩下的「田」才不会被重复算 */
const NAMES = Object.keys(MAP).sort((a, b) => b.length - a.length);
const NUM = /^\s*[+＋\-−–—]\s*\d+/;
/* 「田产 +0」是在声明"这一项没变"，不是承诺代价，别算进来 */
const ZERO = /^\s*[+＋\-−–—]\s*0(?!\d)/;

function atomsOf(opt) {
  const out = new Set();
  const eat = (list) => (list || []).forEach((e) => e && e.k && out.add(e.k));
  eat(opt.effects);
  if (opt.gamble) { eat(opt.gamble.win); eat(opt.gamble.lose); }
  (opt.schedule || []).forEach((sc) => eat(sc.effects));
  return out;
}

const events = [];
events.push(...(B.common || []));
for (const k in B.eraEvents || {}) events.push(...(B.eraEvents[k] || []));
for (const k in B.periods || {}) events.push(...((B.periods[k] || {}).events || []));

let bad = 0, sites = 0, quiet = 0;
for (const ev of events) {
  if (only && !String(ev.id).startsWith(only)) continue;
  for (const o of ev.options || []) {
    if (!o.hint) continue;
    /* 选了就死的选项不查：人死了，声望、交游这些都没处落。
       这类 hint 写「声望 +16；必死」，前半句其实是给玩家看的评价，不是结算。 */
    if (o.kill === "self" || /必死/.test(o.hint)) continue;
    const atoms = atomsOf(o);
    const h = o.hint;
    const used = new Array(h.length).fill(false);
    const claimed = [];

    for (const cn of NAMES) {
      let from = 0, idx;
      while ((idx = h.indexOf(cn, from)) >= 0) {
        const end = idx + cn.length;
        /* 这个位置已被更长的名字占用（「田产」的「田」），跳过 */
        if (used.slice(idx, end).some(Boolean)) { from = end; continue; }
        for (let i = idx; i < end; i++) used[i] = true;
        /* 指标名后面紧跟一个带正负号的非零数字，才算在承诺代价 */
        const tail = h.slice(end, end + 8);
        if (NUM.test(tail) && !ZERO.test(tail)) claimed.push(cn);
        from = end;
      }
    }

    if (!claimed.length) { quiet++; continue; }
    sites += claimed.length;

    for (const cn of claimed) {
      const has = MAP[cn].some((k) => atoms.has(k));
      if (has) continue;
      bad++;
      console.log(`  ✗ ${ev.id}（${ev.title}）选项「${o.text}」`);
      console.log(`      hint：${o.hint}`);
      console.log(`      实扣：${[...atoms].join(" / ") || "（无）"}　← 少了「${cn}」`);
    }
  }
}

console.log("");
console.log(`核对 ${events.length} 条事件 · hint 点了数字的 ${sites} 处 · 对不上 ${bad} 处 · 只写话不写数的 ${quiet} 处`);
if (bad === 0) console.log("✓ hint 与实际扣减一致");
process.exit(bad ? 1 : 0);
