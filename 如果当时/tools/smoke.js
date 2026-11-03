/* 如果当时 · 引擎冒烟测试
 * 用法：node tools/smoke.js [局数]
 * 验证：引擎能走完整局（岔路 + 事件 + 连锁局），四维数值在 0~100 内，无死循环。
 */
var path = require("path");
var fs = require("fs");
global.window = global;

/* 数据文件清单以 index.html 为准：新增题库 / 事件包后，测试自动覆盖 */
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
var N = parseInt(process.argv[2] || "1000", 10);

var errors = 0, titles = {}, typeCounts = { card: 0, event: 0, chain: 0 };
var statOutOfRange = 0;

function pickMultiRandom(s, card) {
  var keys = card.items.map(function (it) { return it.key; });
  for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(s.rng() * (i + 1));
    var t = keys[i]; keys[i] = keys[j]; keys[j] = t;
  }
  return keys.slice(0, card.pickCount);
}

for (var i = 0; i < N; i++) {
  var s = RUGO.newState(i);
  RUGO.start(s);
  var guard = 0;
  while (!RUGO.isDone(s) && guard < 500) {
    var card = RUGO.currentCard(s);
    if (!card) break;

    if (RUGO.isEvent(s) || RUGO.isChain(s)) {
      // 事件/连锁局：选第一个选项
      typeCounts[RUGO.isChain(s) ? "chain" : "event"]++;
      RUGO.pickEventOption(s, card.options[0].key);
      RUGO.nextCard(s);
    } else if (!s.picked) {
      typeCounts.card++;
      if (RUGO.isMulti(s)) {
        RUGO.pickMulti(s, pickMultiRandom(s, card));
      } else {
        RUGO.pickOption(s, s.rng() < 0.5 ? "A" : "B");
      }
    } else {
      var beat = RUGO.currentBeat(s);
      if (beat) { RUGO.pickBeat(s, s.rng() < 0.5 ? "A" : "B"); }
      else { RUGO.nextCard(s); }
    }
    guard++;
  }

  if (!RUGO.isDone(s)) { errors++; continue; }

  // 校验数值范围
  ["money", "health", "social", "happy"].forEach(function (k) {
    var v = s.stats[k];
    if (v < 0 || v > 100) statOutOfRange++;
  });

  var r = RUGO.settle(s);
  titles[r.title] = (titles[r.title] || 0) + 1;

  // 反向人生：验证能算出一个合法结局
  var rev = RUGO.settleReverse(s);
  if (!rev || !rev.title) { errors++; continue; }
  ["money", "health", "social", "happy"].forEach(function (k) {
    var v = rev.stats[k];
    if (v < 0 || v > 100) statOutOfRange++;
  });
  if (i === 0) {
    console.log("样例反向人生:", rev.title, "| 数值", JSON.stringify(rev.stats));
  }
}

console.log("跑局数:", N);
console.log("错误数:", errors);
console.log("数值越界数:", statOutOfRange);
console.log("题型命中:", JSON.stringify(typeCounts));
console.log("称号分布:", JSON.stringify(titles));
process.exit(errors > 0 || statOutOfRange > 0 ? 1 : 0);
