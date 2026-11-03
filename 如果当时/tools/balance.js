/* 如果当时 · 数值平衡检查
 * 用法：node tools/balance.js [局数，默认 3000]
 *
 * 回答三个问题：
 *   1. 题库的金钱净额是正是负——花钱的题太多，玩家会大量挤进「在贫困里打转」。
 *   2. 四维的实际分位数，用来校准结局称号的阈值。
 *   3. 称号分布有没有挤在某一格，以及哪些称号几乎收不到。
 *
 * 数据文件清单照例以 index.html 为准，新增题库后自动覆盖。
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
var STATS = ["money", "health", "social", "happy"];

function pad(s, n) {
  s = String(s);
  while (s.length < n) s += " ";
  return s;
}

/* ---------- 一、题库的金钱净额 ---------- */
function moneyOf(o) {
  return (o && o.effects && o.effects.money) || 0;
}

function sumCards(list) {
  var sum = 0, n = 0;
  list.forEach(function (c) {
    if (c.type === "multi") {
      c.items.forEach(function (it) { sum += moneyOf(it); n++; });
    } else {
      (c.options || []).forEach(function (o) { sum += moneyOf(o); n++; });
    }
  });
  return { sum: sum, n: n, avg: n ? sum / n : 0 };
}

function num(id) { return parseInt(id.slice(1), 10); }

var BATCH = [
  { name: "q01–q75 初版", test: function (id) { return num(id) <= 75; } },
  { name: "q76–q95 v0.9", test: function (id) { return num(id) >= 76 && num(id) <= 95; } },
  { name: "q96–q126 v1.0", test: function (id) { return num(id) >= 96; } }
];

console.log("═══ 一、题库金钱净额 ═══");
BATCH.forEach(function (b) {
  var list = global.PACK_START.filter(function (c) { return b.test(c.id); });
  if (!list.length) return;
  var r = sumCards(list);
  console.log(
    pad(b.name, 20) + pad(list.length + " 道", 8) +
    "合计 " + pad(r.sum, 6) + "每选项均值 " + r.avg.toFixed(2)
  );
});
var all = sumCards(global.PACK_START);
console.log(pad("全库", 20) + pad(global.PACK_START.length + " 道", 8) + "合计 " + pad(all.sum, 6) + "每选项均值 " + all.avg.toFixed(2));
console.log("");

/* ---------- 二、跑局 ---------- */
var titles = {}, stats = { money: [], health: [], social: [], happy: [] }, regretCount = [];
var errs = 0, oob = 0;

for (var g = 0; g < N; g++) {
  try {
    var s = RUGO.newState(g + 1);
    RUGO.start(s);
    var guard = 0;
    while (!RUGO.isDone(s) && guard++ < 500) {
      var card = RUGO.currentCard(s);
      if (!card) break;
      if (RUGO.isEvent(s) || RUGO.isChain(s)) {
        RUGO.pickEventOption(s, card.options[Math.floor(s.rng() * card.options.length)].key);
        RUGO.nextCard(s);
      } else if (!s.picked) {
        if (RUGO.isMulti(s)) {
          var keys = card.items.map(function (it) { return it.key; });
          for (var i2 = keys.length - 1; i2 > 0; i2--) {
            var j2 = Math.floor(s.rng() * (i2 + 1));
            var t2 = keys[i2]; keys[i2] = keys[j2]; keys[j2] = t2;
          }
          RUGO.pickMulti(s, keys.slice(0, card.pickCount));
        } else {
          RUGO.pickOption(s, s.rng() < 0.5 ? "A" : "B");
        }
      } else {
        var beat = RUGO.currentBeat(s);
        if (beat) RUGO.pickBeat(s, s.rng() < 0.5 ? "A" : "B");
        else RUGO.nextCard(s);
      }
    }
    if (!RUGO.isDone(s)) { errs++; continue; }
    STATS.forEach(function (k) {
      var v = s.stats[k];
      if (v < 0 || v > 100) oob++;
      stats[k].push(v);
    });
    var rep = RUGO.settle(s);
    titles[rep.title] = (titles[rep.title] || 0) + 1;
    regretCount.push(s.regrets.length);
  } catch (e) {
    errs++;
    if (errs <= 3) console.log("  ! " + e.message);
  }
}

function pct(arr, p) {
  var a = arr.slice().sort(function (x, y) { return x - y; });
  return a[Math.floor((a.length - 1) * p)];
}

console.log("═══ 二、四维分位数（" + N + " 局，选项随机）═══");
STATS.forEach(function (k) {
  console.log(
    pad(k, 8) +
    "p5 " + pad(pct(stats[k], 0.05), 5) +
    "p25 " + pad(pct(stats[k], 0.25), 5) +
    "p50 " + pad(pct(stats[k], 0.50), 5) +
    "p75 " + pad(pct(stats[k], 0.75), 5) +
    "p95 " + pct(stats[k], 0.95)
  );
});
console.log("放弃清单：中位 " + pct(regretCount, 0.5) + " 条 · 最多 " + Math.max.apply(null, regretCount) + " 条");
console.log("");

console.log("═══ 三、称号分布 ═══");
var names = Object.keys(titles).sort(function (a, b) { return titles[b] - titles[a]; });
var ALL = global.RUGO.ALL_TITLES || [];
console.log("覆盖 " + names.length + " / " + ALL.length + " 个称号");
names.forEach(function (k) {
  var n = titles[k];
  var p = n / N * 100;
  var bar = "";
  for (var i = 0; i < Math.round(p); i++) bar += "█";
  console.log(pad(k, 24) + pad(n, 6) + pad(p.toFixed(1) + "%", 7) + bar);
});
var missing = ALL.filter(function (t) { return !titles[t]; });
if (missing.length) console.log("\n⚠ 收不到的称号：" + missing.join("、"));
console.log("");

console.log("═══ 四、结论 ═══");
console.log(errs ? "✗ 报错 " + errs + " 次" : "✓ 0 报错");
console.log(oob ? "✗ 数值越界 " + oob + " 次" : "✓ 0 越界");
var top = names[0];
console.log(
  (titles[top] / N > 0.3 ? "⚠ " : "✓ ") +
  "最挤的称号「" + top + "」占 " + (titles[top] / N * 100).toFixed(1) + "%"
);
console.log(missing.length ? "✗ 有 " + missing.length + " 个称号收不到" : "✓ 全部称号可达");
process.exit(errs || oob || missing.length ? 1 : 0);
