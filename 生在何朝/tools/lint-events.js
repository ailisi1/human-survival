/* 事件数据自检。加内容之后先跑这个，再跑平衡与回归。
 *
 *   node tools/lint-events.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const PACKS = path.join(ROOT, "data", "packs");

/* 按 index.html 的脚本顺序加载，不按文件名字母序。
 *
 * 为什么：10-qinhan / 20-weijin / 30-song / 40-yuanqing 四个老文件当年写的是
 * `P.periods.x.events = [...]`（直接赋值，不是 concat）。字母序里 103-keju.js
 * 排在 20-weijin.js 前面，于是新加的科举、文事被后加载的老文件整个覆盖掉——
 * 页面里明明有，lint 一条也数不到。运行时的真相只有一个：index.html。 */
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const files = [...html.matchAll(/<script\s+src="data\/packs\/([^"]+)"/g)].map((m) => m[1]);

const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(path.join(PACKS, f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.log("!! " + f + " 语法错：" + e.message); process.exit(1); }
}
const P = ctx.window.PACK_BASE;

/* 允许的字段值 —— 与 js/engine.js 里 switch 的分支一致 */
const EFFECTS = new Set(["body", "silver", "field_wet", "field_dry", "grain", "knowledge",
  "fame", "grudge", "favor", "official", "luck", "line", "troops", "command", "morale",
  "grade", "debt", "flag", "path", "kill", "martial", "addPerson", "killPerson"]);
/* 条件字段：**以 engine.js 的 testWhen 为准**。
   早先这里比引擎宽，写了 maxGrain / minGrade 这类字段不报错，引擎也不认，
   事件照抽，条件等于没写。两边必须同一份清单。 */
const NEEDS = new Set(["minAge", "maxAge", "minSilver", "maxSilver", "minKnowledge",
  "maxKnowledge", "minMartial", "maxMartial", "minBody", "maxBody", "minTroops",
  "minFame", "maxFame", "minFieldWet", "minFieldDry", "minField", "minGrain", "maxGrain",
  "minGrade", "maxGrade", "minOfficial", "maxOfficial", "minCommand", "minMorale", "hasPost", "postIn",
  "yearFrom", "yearTo", "yearMod", "debtExists", "lineIn", "classIn",
  "flagHas", "flagNot", "anyOf", "allOf", "sex"]);
const WHEN = NEEDS;

const CATS = new Set(["官府", "世变", "天下", "家族", "生计", "市井", "学问", "乡里",
  "军功", "军旅", "宗族", "家业", "身体", "科举", "营生", "方外", "文事", "大事",
  "天灾", "赋役", "人际", "职业"]);

/* 现代词黑名单：出现即改。古人也说「经济」，但不当 economy 用 */
/* 「人脉」不在列：它是既有数据里 favor 的提示名，已成约定，
   不算叙事用词。新写正文时仍该用「交游」「门路」。 */
const BANNED = ["资源", "效率", "战略", "好感度", "属性", "升级", "技能点",
  "经验值", "系统提示", "副本", "氪金", "充值", "玩家操控"];

let err = 0, warn = 0;
const ids = Object.create(null);
function E(where, msg) { err++; console.log("  ERR  " + where + "： " + msg); }
function W(where, msg) { warn++; console.log("  warn " + where + "： " + msg); }

function check(ev, where) {
  if (!ev.id) return E(where, "缺 id");
  /* 同一份定义可以挂给多个时段（科举、文事都是 suitang/song/yuanmingqing 各挂一份），
     所以「periods 之间」不算重复；同一池内重复、或与 common / eraEvents 相撞才算。 */
  const pool = (where.split("/")[0] || "");
  const prev = ids[ev.id];
  if (prev) {
    const prevPool = (prev.split("/")[0] || "");
    const bothPeriods = prevPool.indexOf("periods.") === 0 && pool.indexOf("periods.") === 0;
    if (!bothPeriods) {
      return E(where, "id 重复：" + ev.id + "（已在 " + prev + "）");
    }
  } else {
    ids[ev.id] = where;
  }

  if (!ev.cat || !CATS.has(ev.cat)) E(where, "cat 不认识：" + ev.cat);
  if (!ev.title) E(where, "缺 title");
  if (!Array.isArray(ev.text) || !ev.text.length) E(where, "text 为空");
  if (!Array.isArray(ev.options) || ev.options.length < 2) E(where, "选项少于 2 个");
  if (ev.age && (!Array.isArray(ev.age) || ev.age[0] > ev.age[1])) E(where, "age 区间反了");

  if (ev.when) {
    for (const k of Object.keys(ev.when)) {
      if (!WHEN.has(k)) E(where, "when 里有未知字段：" + k);
    }
  }

  (ev.options || []).forEach((o, i) => {
    const w2 = where + " 选项" + (i + 1);
    if (!o.text) E(w2, "缺 text");
    if (!o.hint) W(w2, "没写 hint（代价要写出来）");
    if (o.need) for (const k of Object.keys(o.need)) {
      if (!NEEDS.has(k)) E(w2, "need 里有未知字段：" + k);
    }
    (o.effects || []).forEach((e) => {
      if (!EFFECTS.has(e.k)) E(w2, "effects 里有未知原子：" + e.k);
    });
    /* schedule 与 gamble 里也有 effects，早先漏检，写错原子不报错 */
    (o.schedule || []).forEach((sc, j) => {
      (sc.effects || []).forEach((e) => {
        if (!EFFECTS.has(e.k)) E(w2 + " schedule" + (j + 1), "未知原子：" + e.k);
      });
      if (!sc.eventId && !(sc.effects || []).length) E(w2 + " schedule" + (j + 1), "既无 eventId 也无 effects");
    });
    if (o.gamble) {
      (o.gamble.win || []).concat(o.gamble.lose || []).forEach((e) => {
        if (!EFFECTS.has(e.k)) E(w2 + " gamble", "未知原子：" + e.k);
      });
    }
    if (o.kill === "self" && (o.effects || []).length) {
      /* 允许：先结算再死 */
    }
    if (o.gamble) {
      const g = o.gamble;
      const r = g.winChance != null ? g.winChance : g.loseChance;
      if (r != null && (typeof r !== "number" || r <= 0 || r >= 1)) E(w2, "gamble 胜率要在 (0,1) 之间");
      if (g.deathChance != null && (typeof g.deathChance !== "number" || g.deathChance <= 0 || g.deathChance > 1)) {
        E(w2, "gamble.deathChance 要在 (0,1] 之间");
      }
      if (g.winChance == null && g.loseChance == null && g.deathChance == null) {
        E(w2, "gamble 既没给胜率也没给死率");
      }
      if (!g.cause && g.deathChance) W(w2, "有死率但没写 cause");
    }
  });

  /* 现代词 */
  const blob = JSON.stringify(ev);
  for (const b of BANNED) {
    if (blob.indexOf(b) >= 0) E(where, "出现现代词「" + b + "」");
  }

  /* 小注每段最多两个 */
  (ev.text || []).forEach((t, i) => {
    const n = (t.match(/\{\{/g) || []).length;
    if (n > 2) W(where + " 第" + (i + 1) + "段", "小注 " + n + " 个，超过两个就不像人话了");
  });
}

console.log("扫描 " + files.length + " 卷…\n");

Object.keys(P.periods || {}).forEach((k) => {
  (P.periods[k].events || []).forEach((ev) => check(ev, "periods." + k + "/" + (ev.id || "?")));
});
(P.common || []).forEach((ev) => check(ev, "common/" + (ev.id || "?")));
Object.keys(P.eraEvents || {}).forEach((k) => {
  (P.eraEvents[k] || []).forEach((ev) => check(ev, "era:" + k + "/" + (ev.id || "?")));
});

const total = Object.keys(ids).length;
console.log("");
console.log("事件 " + total + " 条，错误 " + err + "，提醒 " + warn);
process.exit(err ? 1 : 0);
