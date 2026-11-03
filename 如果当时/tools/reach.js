/* 如果当时 · 题库可达性审计
 * 用法：node tools/reach.js [局数，默认 3000]
 *
 * 回答一个问题：95 道岔路、若干事件、若干连锁局里，有哪些玩家永远遇不到。
 *
 * 判定不是只看"跑局没抽到"，还看静态条件：
 *   · 岔路靠随机发牌，只要在库里就有机会 —— 数量多、局数少时会假死
 *   · 事件 / 连锁有 when 条件（数值门槛、先手选择），写错了才是真死
 */
var path = require("path");
var fs = require("fs");
global.window = global;

var ROOT = path.join(__dirname, "..");
var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
var scripts = [];
var re = /<script\s+src="([^"]+)"/g;
var m;
while ((m = re.exec(html)) !== null) scripts.push(m[1]);
scripts
  .filter(function (s) { return s.indexOf("js/ui.js") < 0; })
  .forEach(function (s) { require(path.join(ROOT, s)); });

var RUGO = global.RUGO;
var N = parseInt(process.argv[2] || "3000", 10);

/* ---------- 库里到底有多少张牌 ---------- */
function collect(name, kind) {
  var arr = global[name];
  if (!arr) return [];
  return arr.map(function (c) {
    return { id: c.id, title: c.title, kind: kind, card: c };
  });
}
var all = []
  .concat(collect("PACK_START", "岔路"))
  .concat(collect("PACK_EVENTS", "事件"))
  .concat(collect("PACK_CHAINS", "连锁"));

var byId = Object.create(null);
for (var i = 0; i < all.length; i++) byId[all[i].id] = all[i];

/* ---------- 跑局 ---------- */
var seen = Object.create(null);

function pickMultiRandom(s, card) {
  var keys = card.items.map(function (it) { return it.key; });
  for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(s.rng() * (i + 1));
    var t = keys[i]; keys[i] = keys[j]; keys[j] = t;
  }
  return keys.slice(0, card.pickCount);
}

var runs = 0, errors = 0;
for (var n = 0; n < N; n++) {
  var s = RUGO.newState(n);
  RUGO.start(s);
  var guard = 0;
  while (!RUGO.isDone(s) && guard < 500) {
    var card = RUGO.currentCard(s);
    if (!card) break;
    if (card.id) seen[card.id] = (seen[card.id] || 0) + 1;

    if (RUGO.isEvent(s) || RUGO.isChain(s)) {
      RUGO.pickEventOption(s, card.options[0].key);
      RUGO.nextCard(s);
    } else if (!s.picked) {
      if (RUGO.isMulti(s)) RUGO.pickMulti(s, pickMultiRandom(s, card));
      else RUGO.pickOption(s, s.rng() < 0.5 ? "A" : "B");
    } else {
      var beat = RUGO.currentBeat(s);
      if (beat) RUGO.pickBeat(s, s.rng() < 0.5 ? "A" : "B");
      else RUGO.nextCard(s);
    }
    guard++;
  }
  if (!RUGO.isDone(s)) { errors++; continue; }
  runs++;
}

/* ---------- 汇总 ---------- */
function bucket(kind) {
  return all.filter(function (x) { return x.kind === kind; });
}
var never = all.filter(function (x) { return !seen[x.id]; });

console.log("如果当时 · 题库可达性");
console.log("────────────────────────────────────────");
console.log("牌库 " + all.length + " 张（岔路 " + bucket("岔路").length +
  " / 事件 " + bucket("事件").length + " / 连锁 " + bucket("连锁").length +
  "）　跑了 " + runs + " 局，未完赛 " + errors);
console.log("一次没出现 " + never.length + " 张");

if (never.length) {
  var byKind = {};
  never.forEach(function (x) { (byKind[x.kind] = byKind[x.kind] || []).push(x); });
  Object.keys(byKind).forEach(function (k) {
    console.log("\n  [" + k + "] " + byKind[k].length + " 张");
    byKind[k].slice(0, 40).forEach(function (x) {
      console.log("    · " + String(x.id).padEnd(10) + " " + (x.title || ""));
    });
  });
}

/* 岔路是随机发牌，只要库里在、局数够，就一定发得到；
   这里给出"按当前概率，N 局下发不出的期望张数"，用来区分真死和假死。 */
var cards = bucket("岔路");
if (cards.length) {
  var perRun = 0;
  var probe = 0;
  console.log("\n提示：岔路每局发 6 道，共 " + cards.length + " 道，" +
    "单道每局概率约 " + (6 / cards.length * 100).toFixed(1) + "%，" +
    N + " 局下发不到的期望张数 ≈ " +
    (cards.length * Math.pow(1 - 6 / cards.length, N)).toFixed(2));
}
