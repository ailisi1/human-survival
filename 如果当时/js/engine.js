/* 如果当时 · 引擎核心（纯逻辑，无 DOM，可复用于小游戏）
 *
 * 玩法：多岔路串行 + 四维数值 + 连锁触发 + 随机事件
 *   1. 抽一道开局题（二选一 / 多选限选）定人生起点
 *   2. 走完它的连锁剧情（2 拍抉择）
 *   3. 岔路之间可能插入随机事件（数值变化）
 *   4. 某些选择触发"连锁专属局"（跨关卡回响）
 *   5. 四维数值（钱/健康/人脉/幸福）反过来影响剧情走向与结局
 *   6. 走满 MAX_CARDS 道题 → 结算人生报告 + 放弃清单
 *
 * 四维数值：
 *   money（钱）/ health（健康）/ social（人脉）/ happy（幸福）
 *   初始各 50，选项/事件的 effects 扣加（0~100 区间）
 *
 * 数据来源（均为 window 注入）：
 *   PACK_START  — 开局题题库（二选一 + 多选限选）
 *   PACK_EVENTS — 随机事件池
 *   PACK_CHAINS — 连锁专属局（trigger 解锁）
 */
(function (global) {
  "use strict";

  /* ---------- 常量 ---------- */
  var MAX_CARDS = 6;          // 一局要走的岔路题数（约 10 分钟）
  var EVENT_CHANCE = 0.30;    // 每道岔路之间插入随机事件的概率
  var STATS = ["money", "health", "social", "happy"];

  /* ---------- 人生码：seed ↔ 短码（可分享、可复现） ---------- */
  // 用一套避开易混淆字符的 base32 字符集，码更干净可读
  var CODE_ALPHA = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // 32 个字符，无 0/O/1/I

  function encodeCode(seed) {
    var n = (seed >>> 0);
    var s = "";
    do {
      s = CODE_ALPHA[n % 32] + s;
      n = Math.floor(n / 32);
    } while (n > 0);
    // 补到至少 6 位，保证码有辨识度
    while (s.length < 6) s = CODE_ALPHA[0] + s;
    return s;
  }

  function decodeCode(code) {
    var s = String(code || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
    var n = 0;
    for (var i = 0; i < s.length; i++) {
      var idx = CODE_ALPHA.indexOf(s[i]);
      if (idx < 0) continue; // 容错：跳过非法字符（如 0/O/1/I 会被上方 replace 保留，这里忽略）
      n = n * 32 + idx;
    }
    return n >>> 0;
  }

  /* ---------- 种子可复现随机数（mulberry32） ---------- */
  function makeRng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- 条件判断（结构化，不用 eval） ---------- */
  // cond: { stat:"health", op:"lt", value:30 }  或 { flag:"debt" }
  function checkCond(s, cond) {
    if (!cond) return true;
    if (cond.flag) { return !!s.flags[cond.flag]; }
    if (cond.stat && cond.op) {
      var v = s.stats[cond.stat];
      switch (cond.op) {
        case "lt": return v < cond.value;
        case "lte": return v <= cond.value;
        case "gt": return v > cond.value;
        case "gte": return v >= cond.value;
        case "eq": return v === cond.value;
      }
    }
    return true;
  }

  /* ---------- 应用效果（四维扣加，限制 0~100） ---------- */
  function applyEffects(s, effects) {
    if (!effects) return;
    STATS.forEach(function (k) {
      if (effects[k] !== undefined) {
        s.stats[k] = Math.max(0, Math.min(100, s.stats[k] + effects[k]));
      }
    });
  }

  /* ---------- 兜底：无显式 effects 的选项，按语义给默认数值 ---------- */
  function resolveEffects(card, opt) {
    if (opt && opt.effects) return opt.effects;
    // 多选 item 已有 effects 时走显式；无则给温和默认
    if (!opt) return null;
    var title = (card.title || "") + (opt.title || "");
    var fx = { money: 0, health: 0, social: 0, happy: 0 };
    if (/五百万|钱|首付|全款|高薪|买房|囤|财富|金条|现金|赔偿|彩票|offer|借/.test(title)) {
      fx.money = opt.key === "A" ? 8 : -6;
    }
    if (/健康|加班|病|身体|惜命|熬夜|失眠|药|治疗/.test(title)) {
      fx.health = opt.key === "A" ? -6 : 8;
    }
    if (/爱情|婚姻|结婚|家人|父母|亲情|朋友|同学|人脉|相亲|二胎|孩子/.test(title)) {
      fx.social = opt.key === "A" ? 5 : -4;
    }
    if (/梦想|自由|追梦|热爱|青春|幸福|快乐|诗/.test(title)) {
      fx.happy = opt.key === "A" ? 6 : -5;
    }
    // 全 0 则给一个极温和的倾向值，避免完全无感
    if (fx.money === 0 && fx.health === 0 && fx.social === 0 && fx.happy === 0) {
      fx.happy = opt.key === "A" ? 3 : -2;
    }
    return fx;
  }

  /* ---------- 全局状态 ---------- */
  function newState(seed) {
    var s = {
      seed: seed,
      rng: makeRng(seed),
      deck: [],          // 本局要走的题目队列（已打乱）
      deckIndex: 0,      // 当前走到第几道题
      card: null,        // 当前题目（可能是岔路题，也可能是事件/连锁局）
      cardKind: null,    // "card" | "event" | "chain"
      picked: null,      // 当前题选的选项
      beatIndex: 0,      // 当前连锁剧情走到的拍下标
      regrets: [],       // 放弃清单（累积）
      flags: {},         // 连锁触发标记（如 { debt: true }）
      doneChains: {},    // 已触发的连锁局（防重复）
      stats: { money: 50, health: 50, social: 50, happy: 50 },
      life: {            // 结算用的倾向数值
        age: 22,
        dream: 0,
        love: 0
      },
      // 本局选择路径记录（供"反向人生"重放）
      path: [],          // [{ kind:"card"|"beat"|"event", key|keys, cardId, optTitle }]
      done: false
    };
    return s;
  }

  /* ---------- 开局：洗牌 + 抽第一道题 ---------- */
  function start(s) {
    var deck = global.PACK_START.slice();
    for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(s.rng() * (i + 1));
      var tmp = deck[i]; deck[i] = deck[j]; deck[j] = tmp;
    }
    if (deck.length > MAX_CARDS) {
      deck = deck.slice(0, MAX_CARDS);
    } else {
      while (deck.length < MAX_CARDS) {
        deck = deck.concat(global.PACK_START.slice());
      }
      deck = deck.slice(0, MAX_CARDS);
    }
    s.deck = deck;
    s.deckIndex = 0;
    s.life.age = 20 + Math.floor(s.rng() * 8); // 20-27 岁开局
    s.card = deck[0];
    s.cardKind = "card";
    return s.card;
  }

  /* ---------- 当前题 ---------- */
  function currentCard(s) { return s.card; }

  /* ---------- 当前题类型 ---------- */
  function isMulti(s) {
    return s.cardKind === "card" && s.card && s.card.type === "multi";
  }
  function isEvent(s) { return s.cardKind === "event"; }
  function isChain(s) { return s.cardKind === "chain"; }

  /* ---------- 选当前题选项（二选一，进入连锁剧情） ---------- */
  function pickOption(s, key) {
    var card = s.card;
    var opt = null;
    for (var i = 0; i < card.options.length; i++) {
      if (card.options[i].key === key) { opt = card.options[i]; break; }
    }
    s.picked = opt;
    s.beatIndex = 0;
    s.regrets.push(opt.follow.regret);
    applyEffects(s, resolveEffects(card, opt));
    // 连锁触发
    if (opt.trigger) {
      s.flags[opt.trigger.unlock] = true;
      if (opt.trigger.regret) s.regrets.push(opt.trigger.regret);
    }
    s.path.push({ kind: "card", key: key, cardId: card.id, optTitle: opt.title });
    return opt;
  }

  /* ---------- 多选题：勾选 N 项，未选项记入放弃清单 ---------- */
  function pickMulti(s, keys) {
    var card = s.card;
    if (!isMulti(s)) return null;

    var selected = {};
    for (var i = 0; i < keys.length; i++) { selected[keys[i]] = true; }

    var dropped = [];
    for (var j = 0; j < card.items.length; j++) {
      if (!selected[card.items[j].key]) { dropped.push(card.items[j]); }
    }
    for (var k = 0; k < dropped.length; k++) {
      s.regrets.push(dropped[k].name);
    }

    // tag 推算 dream/love + 多选 effects
    var tags = { self: 0, feeling: 0 };
    var totalEffects = {};
    for (var m = 0; m < keys.length; m++) {
      var item = findItem(card, keys[m]);
      if (!item) continue;
      var tag = item.tag;
      if (isSelfTag(tag)) tags.self += 1;
      else if (isFeelingTag(tag)) tags.feeling += 1;
      if (item.effects) {
        STATS.forEach(function (k) {
          if (item.effects[k]) totalEffects[k] = (totalEffects[k] || 0) + item.effects[k];
        });
      }
    }

    s.picked = { follow: card.follow, multiKeys: keys.slice() };
    s.beatIndex = 0;
    s.life.dream += tags.self;
    s.life.love += tags.feeling;
    applyEffects(s, totalEffects);
    // 多选连锁触发（可选）
    if (card.trigger) {
      s.flags[card.trigger.unlock] = true;
      if (card.trigger.regret) s.regrets.push(card.trigger.regret);
    }
    s.path.push({ kind: "multi", keys: keys.slice(), cardId: card.id });
    return s.picked;
  }

  function isSelfTag(tag) {
    return ["野心", "自我", "梦想", "自由", "方向", "成就", "转折", "成长",
      "起点", "打拼", "精神", "表达"].indexOf(tag) >= 0;
  }
  function isFeelingTag(tag) {
    return ["情感", "至亲", "纯真", "炽热", "幸福", "感恩", "和解", "遗憾",
      "善意", "慰藉", "陪伴"].indexOf(tag) >= 0;
  }

  function findItem(card, key) {
    for (var i = 0; i < card.items.length; i++) {
      if (card.items[i].key === key) return card.items[i];
    }
    return null;
  }

  /* ---------- 当前剧情节拍 ---------- */
  function currentBeat(s) {
    if (!s.picked) return null;
    var beats = s.picked.follow.beats;
    if (s.beatIndex >= beats.length) return null;
    return beats[s.beatIndex];
  }

  /* ---------- 选剧情节拍选项，推进 ---------- */
  function pickBeat(s, key) {
    var beat = currentBeat(s);
    if (!beat) return null;
    var choice = beat.choice[key];
    if (key === "A") { s.life.dream += 1; }
    else { s.life.love += 1; }
    if (choice.effects) applyEffects(s, choice.effects);
    else applyEffects(s, resolveEffects(s.card, choice));
    if (choice.trigger) {
      s.flags[choice.trigger.unlock] = true;
      if (choice.trigger.regret) s.regrets.push(choice.trigger.regret);
    }
    s.beatIndex += 1;
    s.path.push({ kind: "beat", key: key, cardId: s.card.id });
    return choice;
  }

  /* ---------- 连锁剧情是否走完（该题是否结束） ---------- */
  function isCardDone(s) {
    return s.picked && s.beatIndex >= s.picked.follow.beats.length;
  }

  /* ---------- 事件/连锁局：选选项推进（事件也有小抉择） ---------- */
  function pickEventOption(s, key) {
    var ev = s.card;
    var opt = null;
    for (var i = 0; i < ev.options.length; i++) {
      if (ev.options[i].key === key) { opt = ev.options[i]; break; }
    }
    if (opt) applyEffects(s, opt.effects);
    if (opt && opt.regret) s.regrets.push(opt.regret);
    if (opt) s.path.push({ kind: "event", key: key, cardId: s.card.id });
    return opt;
  }

  /* ---------- 进入下一步：先检查连锁局，再插随机事件，再进下一题 ---------- */
  function nextCard(s) {
    // 1. 优先：检查是否有满足条件的连锁局待触发
    var chain = findPendingChain(s);
    if (chain) {
      s.doneChains[chain.id] = true;
      s.card = chain;
      s.cardKind = "chain";
      s.picked = null;
      s.beatIndex = 0;
      s.life.age += 1;
      return s.card;
    }

    // 2. 随机事件：岔路之间按概率插入
    if (s.cardKind === "card" && s.rng() < EVENT_CHANCE) {
      var ev = drawEvent(s);
      if (ev) {
        s.card = ev;
        s.cardKind = "event";
        s.picked = null;
        s.beatIndex = 0;
        return s.card;
      }
    }

    // 3. 进入下一道岔路题
    s.deckIndex += 1;
    if (s.deckIndex >= s.deck.length) {
      s.done = true;
      s.card = null;
      s.picked = null;
      s.cardKind = null;
      return null;
    }
    s.card = s.deck[s.deckIndex];
    s.cardKind = "card";
    s.picked = null;
    s.beatIndex = 0;
    s.life.age += 6 + Math.floor(s.rng() * 8); // 每道题间隔 6-13 岁
    return s.card;
  }

  /* ---------- 找满足条件的连锁局 ---------- */
  function findPendingChain(s) {
    var chains = global.PACK_CHAINS || [];
    for (var i = 0; i < chains.length; i++) {
      var c = chains[i];
      if (s.flags[c.unlock] && !s.doneChains[c.id] && checkCond(s, c.condition)) {
        return c;
      }
    }
    return null;
  }

  /* ---------- 抽随机事件（满足 condition 才可触发） ---------- */
  function drawEvent(s) {
    var events = global.PACK_EVENTS || [];
    var candidates = [];
    for (var i = 0; i < events.length; i++) {
      if (checkCond(s, events[i].condition)) candidates.push(events[i]);
    }
    if (candidates.length === 0) return null;
    return candidates[Math.floor(s.rng() * candidates.length)];
  }

  /* ---------- 事件/连锁局是否处理完（选完即进入下一步） ---------- */
  function isCardDone(s) {
    if (s.cardKind === "card") {
      return s.picked && s.beatIndex >= s.picked.follow.beats.length;
    }
    // 事件/连锁局：选完选项就算完成
    return s.picked !== null;
  }

  /* ---------- 是否整局结束 ---------- */
  function isDone(s) { return s.done; }

  /* ---------- 结算：人生报告 ---------- */
  function settle(s) {
    var o = s.life;
    var title = computeTitle(s);

    var age = s.life.age + Math.floor(s.rng() * 20); // 走完约 55-90 岁
    return {
      title: title,
      age: age,
      startTitle: s.deck[0].title,
      regrets: s.regrets.slice(),
      stats: {
        money: s.stats.money,
        health: s.stats.health,
        social: s.stats.social,
        happy: s.stats.happy
      },
      commentary: makeCommentary(s, age)
    };
  }

  /* ---------- 反向人生：把本局每一步选择反过来，重放出一个平行结局 ---------- */
  function settleReverse(s) {
    // 用一个全新的、种子不同的状态，重放本局路径，但每一步"反着选"
    var r = newState((s.seed ^ 0x5F3759DF) >>> 0);
    r.deck = s.deck.slice();
    r.deckIndex = s.deckIndex;
    r.life.age = 20; // 从同一开局年龄出发（用原 seed 无法完全复刻 age，取近似）

    // 逐条反向重放 s.path
    for (var i = 0; i < s.path.length; i++) {
      var step = s.path[i];
      if (step.kind === "card") {
        var card = findCardById(r, step.cardId);
        if (!card || !card.options) continue;
        var other = card.options[0].key === step.key ? card.options[1] : card.options[0];
        r.picked = other;
        r.regrets.push(other.follow.regret);
        applyEffects(r, resolveEffects(card, other));
        if (other.trigger) { r.flags[other.trigger.unlock] = true; if (other.trigger.regret) r.regrets.push(other.trigger.regret); }
        // 反向也走它的连锁剧情（beat 反选）
        for (var b = 0; b < other.follow.beats.length; b++) {
          var beat = other.follow.beats[b];
          var bk = (b % 2 === 0) ? "B" : "A"; // 与原局相反（简化：交替反向）
          var bc = beat.choice[bk];
          if (bk === "A") r.life.dream += 1; else r.life.love += 1;
          if (bc.effects) applyEffects(r, bc.effects);
        }
      } else if (step.kind === "multi") {
        var mcard = findCardById(r, step.cardId);
        if (!mcard || !mcard.items) continue;
        // 反向：选"原局未选"的那些项
        var origKeys = {};
        step.keys.forEach(function (k) { origKeys[k] = true; });
        var revKeys = [];
        mcard.items.forEach(function (it) { if (!origKeys[it.key]) revKeys.push(it.key); });
        // 若反向后数量不是 pickCount，则补齐到 pickCount
        while (revKeys.length < mcard.pickCount) { revKeys.push(mcard.items[revKeys.length].key); }
        revKeys = revKeys.slice(0, mcard.pickCount);
        // 记录反向放弃 + tag 倾向 + effects
        var selected = {};
        revKeys.forEach(function (k) { selected[k] = true; });
        mcard.items.forEach(function (it) {
          if (!selected[it.key]) r.regrets.push(it.name);
          else {
            if (it.effects) applyEffects(r, it.effects);
            if (isSelfTag(it.tag)) r.life.dream += 1;
            else if (isFeelingTag(it.tag)) r.life.love += 1;
          }
        });
        r.picked = { follow: mcard.follow };
        for (var bb = 0; bb < mcard.follow.beats.length; bb++) {
          var mbeat = mcard.follow.beats[bb];
          var mbk = (bb % 2 === 0) ? "B" : "A";
          var mbc = mbeat.choice[mbk];
          if (mbk === "A") r.life.dream += 1; else r.life.love += 1;
          if (mbc.effects) applyEffects(r, mbc.effects);
        }
      } else if (step.kind === "event") {
        var ecard = findEventById(r, step.cardId);
        if (!ecard || !ecard.options) continue;
        var eother = ecard.options[0].key === step.key ? ecard.options[1] : ecard.options[0];
        if (eother.effects) applyEffects(r, eother.effects);
        if (eother.regret) r.regrets.push(eother.regret);
      }
    }

    var title = computeTitle(r);
    var age = r.life.age + 40 + Math.floor(s.rng() * 20);
    return {
      title: title,
      age: age,
      stats: { money: r.stats.money, health: r.stats.health, social: r.stats.social, happy: r.stats.happy },
      regrets: r.regrets.slice(),
      commentary: makeCommentary(r, age)
    };
  }

  function findCardById(s, id) {
    for (var i = 0; i < global.PACK_START.length; i++) {
      if (global.PACK_START[i].id === id) return global.PACK_START[i];
    }
    return null;
  }
  function findEventById(s, id) {
    var pools = [global.PACK_EVENTS, global.PACK_CHAINS];
    for (var p = 0; p < pools.length; p++) {
      if (!pools[p]) continue;
      for (var i = 0; i < pools[p].length; i++) {
        if (pools[p][i].id === id) return pools[p][i];
      }
    }
    return null;
  }

  /* 全部结局称号（收集图鉴用，顺序即图鉴顺序）
   * ────────────────────────────────────────────────
   * 早先只有 8 个，且阈值是按"理想数值"拍的：
   *   health ≤ 8 实际一局也出不来（健康 p5 = 38），
   *   money ≥ 75 && social ≥ 65 又只占 0.9%，
   *   结果 34.7% 的局挤在"平凡而滚烫"、27.3% 挤在"追梦人"，图鉴收不满也收不匀。
   * 现按实跑 3000 局的四分位重定阈值，20 个称号都能出，且没有一个垄断。
   * 判定顺序＝稀有在前、兜底在后；改阈值前先跑 tools/smoke.js 看分布。
   */
  var ALL_TITLES = [
    "被生活熬垮的人",
    "一个人走到了最后",
    "在贫困里打转的人",
    "燃尽的人",
    "什么都有，什么都缺一点",
    "谁也没辜负，除了自己",
    "谁都不欠，谁也不亲",
    "世俗意义上的赢家",
    "被爱的人",
    "把日子过成了诗",
    "没白活这一趟",
    "重新开始的人",
    "一路向前的追梦人",
    "重情重义的守灯人",
    "半途而废的人",
    "把遗憾收进抽屉的人",
    "从不肯将就的人",
    "过得并不快乐的人",
    "稳稳当当的一生",
    "平凡而滚烫的一生"
  ];

  /* 图鉴里给未解锁项的线索（一句话说清怎么走到那儿） */
  var TITLE_HINTS = [
    "把身体耗到底，别的都不管",
    "一路只顾自己，最后身边没人",
    "钱始终没攒下来",
    "钱赚到了，身体赔进去了",
    "钱够了，可日子没滋味",
    "为别人活了一辈子，自己没快活过",
    "什么都自己扛，谁也不靠",
    "有钱，也有人",
    "有人一直站在你这边",
    "身体和心情都好，钱也不缺",
    "每一件小事都让你高兴",
    "跌过，又重新起了一局",
    "一直朝着想去的地方走",
    "守住了最想守的人",
    "什么都想要，什么都没抓牢",
    "遗憾不少，但日子还过得去",
    "不肯将就，也不后悔",
    "钱和身体都还行，就是不快乐",
    "四样都不缺，也都不多",
    "不坏，也不特别，就这样过完了"
  ];

  /* 称号：先看极端（人已被某一项压垮），再看组合，最后看倾向 */
  function computeTitle(s) {
    var o = s.life, st = s.stats;
    var reg = s.regrets.length;
    var chains = Object.keys(s.flags || {}).length;

    /* ── 一、被某一项压垮 ── */
    if (st.health <= 34) return "被生活熬垮的人";
    if (st.social <= 20) return "一个人走到了最后";
    if (st.money <= 8) return "在贫困里打转的人";

    /* ── 二、代价换来的东西 ── */
    if (st.money >= 58 && st.health <= 42) return "燃尽的人";
    if (st.money >= 62 && st.happy < 34) return "什么都有，什么都缺一点";
    if (o.love > o.dream + 3 && st.happy < 42) return "谁也没辜负，除了自己";
    if (o.dream > o.love + 3 && st.social < 38) return "谁都不欠，谁也不亲";

    /* ── 三、都拿到了 ── */
    if (st.money >= 70 && st.social >= 58) return "世俗意义上的赢家";
    if (st.happy >= 78 && st.health >= 58) return "把日子过成了诗";
    if (st.social >= 68 && o.love >= o.dream) return "被爱的人";
    if (st.happy >= 86) return "没白活这一趟";

    /* ── 四、过程 ── */
    if (chains >= 3) return "重新开始的人";
    if (o.dream > o.love + 2) return "一路向前的追梦人";
    if (o.love > o.dream + 2) return "重情重义的守灯人";
    if (reg >= 22) return "半途而废的人";
    if (reg >= 18 && st.happy >= 52) return "把遗憾收进抽屉的人";
    if (reg <= 13 && st.happy >= 58) return "从不肯将就的人";

    /* ── 五、兜底 ── */
    if (st.happy <= 14) return "过得并不快乐的人";
    var mid = 0;
    ["money", "health", "social", "happy"].forEach(function (k) {
      if (st[k] >= 40 && st[k] <= 62) mid++;
    });
    if (mid >= 3) return "稳稳当当的一生";
    return "平凡而滚烫的一生";
  }

  /* 每个称号配一句结尾判词（不再用一套通用话套二十个结局） */
  var TITLE_COMMENTARY = {
    "被生活熬垮的人": "你把身体一路押了出去，换了些别的。可有些东西，押出去就赎不回来。",
    "一个人走到了最后": "你谁都靠得住，就是没让谁靠得住你。走到最后这段路，只有你一个人。",
    "在贫困里打转的人": "钱不是一切。可缺了钱，很多想做的事都停在「想想」上。",
    "燃尽的人": "你确实挣到了。只是每次照镜子，都像在看另一个人。",
    "什么都有，什么都缺一点": "你把该拿的都拿到了，然后发现，清单上漏了「高兴」这一项。",
    "谁也没辜负，除了自己": "父母、伴侣、孩子，你都顾到了。只有那个二十岁的你，一直没被问过一次。",
    "谁都不欠，谁也不亲": "你没有欠过谁，也没有麻烦过谁。这很干净，也很冷。",
    "世俗意义上的赢家": "同学聚会上，你是被介绍的那一个。回家路上，车里很安静。",
    "被爱的人": "你没什么惊天动地的成就。只是走到哪儿，都有人给你留一盏灯。",
    "把日子过成了诗": "你没赢过谁，也没输给谁。你有过一个能安心睡觉的夜晚，很多次。",
    "没白活这一趟": "说不上哪里特别好。可你确实，每一天都想过一遍。",
    "重新开始的人": "你推翻过自己，然后真的重来了一回。这比一次都没输过难得多。",
    "一路向前的追梦人": "你一直朝着想去的方向走。有些路，选了本身就算赢。",
    "重情重义的守灯人": "你守住了最想守的东西。这世间，情义最难得。",
    "半途而废的人": "很多事你开了头，没走完。可你也确实走过，不是站在原地。",
    "把遗憾收进抽屉的人": "遗憾你都留着，一件没扔。偶尔翻出来看看，然后关上抽屉去做饭。",
    "从不肯将就的人": "你拒绝了很多「也还行」。所以得到的不多，但每一样都是你要的。",
    "过得并不快乐的人": "你走了很远，路上把自己弄丢了一回。后来找回来的，不太像原来那个。",
    "稳稳当当的一生": "没大起，没大落。回头看，日子是一条平直的线，没什么可说，也没什么好悔。",
    "平凡而滚烫的一生": "你在得与失之间反复掂量。其实没有对错，只有你愿意为什么买单。"
  };

  function makeCommentary(s) {
    var t = computeTitle(s);
    return TITLE_COMMENTARY[t] || "你在得与失之间反复掂量。其实没有对错，只有你愿意为什么买单。";
  }

  /* ---------- 导出 ---------- */
  global.RUGO = {
    newState: newState,
    start: start,
    currentCard: currentCard,
    isMulti: isMulti,
    isEvent: isEvent,
    isChain: isChain,
    pickOption: pickOption,
    pickMulti: pickMulti,
    pickEventOption: pickEventOption,
    currentBeat: currentBeat,
    pickBeat: pickBeat,
    isCardDone: isCardDone,
    nextCard: nextCard,
    isDone: isDone,
    settle: settle,
    settleReverse: settleReverse,
    encodeCode: encodeCode,
    decodeCode: decodeCode,
    checkCond: checkCond,
    makeRng: makeRng,
    ALL_TITLES: ALL_TITLES,
    TITLE_HINTS: TITLE_HINTS
  };
})(window);
