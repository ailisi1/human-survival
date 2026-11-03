/* 生在何朝 · 引擎
 * 抽签 → 出生 → 回合 → 死亡 → 回顾
 * 全部随机走 SHZ.rng，保证种子可复现。
 */
window.SHZ = window.SHZ || {};
(function (S) {
  "use strict";

  /* ── 时段归属：十九朝归入五个时段，共用阶层、物价与基础事件 ── */
  const PERIOD_OF = {
    qin: "qinhan", whan: "qinhan", xin: "qinhan", ehan: "qinhan", sg: "qinhan",
    wjin: "weijin", ejin: "weijin", ns: "weijin",
    sui: "suitang", tang: "suitang",
    wudai: "song", liao: "song", bsong: "song", xxia: "song", jin: "song", nsong: "song",
    yuan: "yuanmingqing", ming: "yuanmingqing", qing: "yuanmingqing"
  };
  S.PERIOD_OF = PERIOD_OF;

  const PACK_CACHE = {};

  /* 一个朝代的完整数据包 = 本朝自有包（若有）+ 所属时段的阶层物价 + 通用事件 */
  S.getPack = function (eraId) {
    if (PACK_CACHE[eraId]) return PACK_CACHE[eraId];
    const book = S.bookOf(eraId);
    const B = window.PACK_BASE || { periods: {}, common: [] };
    const base = B.periods[PERIOD_OF[eraId]] || {};
    const own = window["PACK_" + String(eraId).toUpperCase()] || null;
    if (!book && !own && !base.classes) return null;

    const pack = {
      id: eraId,
      classes: (own && own.classes) || base.classes || [],
      estate: (own && own.estate) || base.estate || {},
      prices: (own && own.prices) || base.prices || { rice_per_shi: 0.6, might_div: 2000 },
      classText: (own && own.classText) || base.classText || {},
      money: (own && own.money) || base.money || { label: "两", note: "" },
      reigns: book ? book.reigns : ((own && own.reigns) || []),
      meta: (own && own.meta) || { id: eraId, name: book ? book.name : eraId },
      events: []
    };

    const evs = [];
    if (B.common && B.common.length) evs.push.apply(evs, B.common);
    if (base.events && base.events.length) evs.push.apply(evs, base.events);
    if (own && own.events && own.events.length) evs.push.apply(evs, own.events);
    /* 只此一朝有的事：分卷写在 data/packs/5x-era-*.js */
    const only = B.eraEvents && B.eraEvents[eraId];
    if (only && only.length) evs.push.apply(evs, only);
    pack.events = evs;

    PACK_CACHE[eraId] = pack;
    return pack;
  };

  /* ── 条件判定 ─────────────────────────────────── */
  function testWhen(w, s) {
    if (!w) return true;
    if (w.minAge != null && s.age < w.minAge) return false;
    if (w.maxAge != null && s.age > w.maxAge) return false;
    if (w.minSilver != null && s.silver < w.minSilver) return false;
    if (w.maxSilver != null && s.silver > w.maxSilver) return false;
    if (w.minKnowledge != null && s.knowledge < w.minKnowledge) return false;
    if (w.minMartial != null && (s.martial || 0) < w.minMartial) return false;
    if (w.minBody != null && s.body < w.minBody) return false;
    if (w.minTroops != null && (s.troops || 0) < w.minTroops) return false;
    if (w.minFame != null && s.fame < w.minFame) return false;
    /* 上限与其余下限：写事件时常用「穷到某个地步才抽得到」这种条件，
       早先只有 min 一侧，写了 max 不生效，事件照抽，等于没写 */
    if (w.maxBody != null && s.body > w.maxBody) return false;
    if (w.maxKnowledge != null && s.knowledge > w.maxKnowledge) return false;
    if (w.maxFame != null && s.fame > w.maxFame) return false;
    if (w.maxMartial != null && (s.martial || 0) > w.maxMartial) return false;
    if (w.minGrain != null && (s.grain || 0) < w.minGrain) return false;
    if (w.maxGrain != null && (s.grain || 0) > w.maxGrain) return false;
    if (w.minField != null && (s.field_wet + s.field_dry) < w.minField) return false;
    if (w.minFieldDry != null && s.field_dry < w.minFieldDry) return false;
    if (w.minGrade != null && (s.grade || 0) < w.minGrade) return false;
    if (w.maxGrade != null && (s.grade || 0) > w.maxGrade) return false;
    /* 官身：多数"做官"路径只加 official，不给品级（grade 只有少数事件写）。
       所以写"要求有官身"的条件必须用 minOfficial，不能用 minGrade —— 后者恒为 0。 */
    if (w.minOfficial != null && (s.official || 0) < w.minOfficial) return false;
    if (w.maxOfficial != null && (s.official || 0) > w.maxOfficial) return false;
    if (w.minCommand != null && (s.command || 0) < w.minCommand) return false;
    if (w.minMorale != null && (s.morale || 0) < w.minMorale) return false;
    if (w.hasPost === true && (!s.post || s.post === "无")) return false;
    if (w.hasPost === false && s.post && s.post !== "无") return false;
    if (w.postIn && w.postIn.indexOf(s.post) < 0) return false;
    if (w.yearFrom != null && s.year < w.yearFrom) return false;
    if (w.yearTo != null && s.year > w.yearTo) return false;
    if (w.sex && w.sex !== s.sex) return false;
    if (w.minFieldWet != null && s.field_wet < w.minFieldWet) return false;
    if (w.yearMod != null && s.year % w.yearMod !== 0) return false;
    if (w.debtExists === true && !s.debt) return false;
    if (w.debtExists === false && s.debt) return false;
    if (w.lineIn && w.lineIn.indexOf(s.line) < 0) return false;
    if (w.classIn && w.classIn.indexOf(s.cls) < 0) return false;
    if (w.flagHas) for (const f of w.flagHas) if (s.flags.indexOf(f) < 0) return false;
    if (w.flagNot) for (const f of w.flagNot) if (s.flags.indexOf(f) >= 0) return false;
    /* 组合条件：schema 里写了这两个，引擎早先没实现，写了等于没写 */
    if (w.anyOf && !w.anyOf.some((x) => testWhen(x, s))) return false;
    if (w.allOf && !w.allOf.every((x) => testWhen(x, s))) return false;
    return true;
  }
  S.testWhen = testWhen;

  /* 事件是否可抽 */
  function matchEvent(e, s) {
    if (e.hidden) return false;
    if (S.RETIRED && S.RETIRED[e.id]) return false;   // 同一件事的另一版，见 data.base.js
    if (e.once && s.usedEvents.indexOf(e.id) >= 0) return false;
    if (e.era && e.era !== s.era) return false;
    if (e.years && (s.year < e.years[0] || s.year > e.years[1])) return false;
    if (e.age && (s.age < e.age[0] || s.age > e.age[1])) return false;
    if (e.sex && e.sex !== "*" && e.sex !== s.sex) return false;
    if (e.class && e.class.length && e.class.indexOf(s.cls) < 0) return false;
    if (e.line && e.line !== "*" && e.line !== s.line) return false;
    if (e.area && e.area.length && e.area.indexOf(s.place.prov) < 0) return false;
    if (e.notArea && e.notArea.indexOf(s.place.prov) >= 0) return false;
    if (e.path && e.path.length && e.path.indexOf(s.path) < 0) return false;
    if (!testWhen(e.when, s)) return false;
    return true;
  }

  /* 选项是否可显示 */
  function optionVisible(o, s) {
    if (o.need && !testWhen(o.need, s)) return false;
    if (o.hide && testWhen(o.hide, s)) return false;
    return true;
  }
  S.optionVisible = optionVisible;

  /* ── 姓名与家世 ───────────────────────────────── */
  function makeName(rng, sex) {
    const sur = S.pick(rng, S.SURNAME);
    const giv = S.pick(rng, sex === "female" ? S.GIVEN_F : S.GIVEN_M);
    return { surname: sur, given: giv, full: sur + giv };
  }

  function makePlace(rng, eraId) {
    const b = S.bookOf(eraId);
    const pool = (b && b.places && b.places.length) ? b.places : null;
    if (pool) {
      const p = S.pick(rng, pool);
      const cty = S.pick(rng, p.cty);
      /* 「河南 河南府 偃师县」念着重复，省掉一层 */
      const parts = [p.prov];
      if (p.pref && p.pref !== p.prov) parts.push(p.pref);
      if (cty && cty !== p.pref) parts.push(cty + "县");
      return { prov: p.prov, pref: p.pref, cty: cty, full: parts.join(" ") };
    }
    const old = S.PLACES[eraId] || S.PLACES.ming;
    const prov = S.weighted(rng, old, x => x.w);
    const pref = S.weighted(rng, prov.pref, x => x.w);
    const cty = S.pick(rng, pref.cty);
    const head = pref.name.indexOf(prov.prov) === 0 ? pref.name : prov.prov + " " + pref.name;
    return { prov: prov.prov, pref: pref.name, cty: cty, full: head + " " + cty + "县" };
  }

  function buildEstate(rng, pack, cls) {
    const est = (pack.estate && pack.estate[cls.id]) || {};
    const rank = est.rank ? S.pick(rng, est.rank) : null;
    const post = est.post ? S.pick(rng, est.post) : null;
    const rel = est.rel ? S.pick(rng, est.rel) : null;

    const c = cls.init;
    return {
      rank: rank || "白身",
      post: post || "无",
      field_wet: Math.max(0, Math.round(c.field_wet * (0.6 + rng() * 0.9))),
      field_dry: Math.max(0, Math.round(c.field_dry * (0.6 + rng() * 0.9))),
      silver: S.r2(Math.max(0, c.silver * (0.5 + rng() * 1.2))),
      grain: S.r2(Math.max(0, c.grain * (0.5 + rng() * 1.1))),
      house: S.pick(rng, est.house || ["草房三间"]),
      servants: est.servants ? S.int(rng, est.servants[0], est.servants[1]) : 0,
      books: est.books ? S.int(rng, est.books[0], est.books[1]) : 0,
      troops: est.troops ? S.int(rng, est.troops[0], est.troops[1]) : 0,
      rel: rel || "族中无显者",
      debt: est.debt && S.chance(rng, 0.35) ? S.int(rng, 8, 40) : 0
    };
  }

  /* ── 开局：抽签 ───────────────────────────────── */
  S.newRun = function (seed, forceEra) {
    seed = seed || S.newSeed();
    const rng = S.rng(seed);

    const pool = S.ENABLED.filter(function (id) { return S.getPack(id) && S.bookOf(id); });
    const eraId = (forceEra && pool.indexOf(forceEra) >= 0) ? forceEra : S.pick(rng, pool);
    const era = S.ERAS.filter(e => e.id === eraId)[0];
    const pack = S.getPack(eraId);

    /* 年份：朝内按人口加权 */
    const span = era.to - era.from;
    let year = era.from;
    const cand = [];
    for (let y = era.from; y <= era.to; y++) cand.push({ y: y, w: S.popAt(eraId, y) });
    year = S.weighted(rng, cand, x => x.w).y;

    const place = makePlace(rng, eraId);

    const sex = rng() < 0.515 ? "male" : "female";
    const cls = S.pick(rng, pack.classes);
    const nm = makeName(rng, sex);
    const est = buildEstate(rng, pack, cls);

    const s = {
      seed: seed,
      era: eraId,
      eraName: era.name,
      year: year,
      age: 0,
      sex: sex,
      cls: cls.id,
      clsName: cls.name,
      clsNote: cls.note,
      place: place,
      surname: nm.surname,
      given: nm.given,
      name: nm.full,
      rank: est.rank,          /* 门第标签：世袭指挥使、举人……是家里给的，不是你的 */
      fatherPost: est.post,    /* 父辈现职：出生卡上写"父任知县"，不是"你是知县" */
      post: "无",              /* 本人的现职：出生时没有 */
      martial: 0,              /* 武艺：练出来的，与身体分开 */
      path: null,              /* 少时所择：文 / 武 / 商 / 农 / 女红 */
      pathName: null,

      body: Math.round(cls.init.body * (0.9 + rng() * 0.2)),
      silver: est.silver,
      field_wet: est.field_wet,
      field_dry: est.field_dry,
      grain: est.grain,
      knowledge: cls.init.knowledge,
      fame: cls.init.fame,

      grudge: 0, favor: 0, official: 0,
      luck: Math.round((rng() - 0.5) * 10),

      /* 兵与权 */
      troops: est.troops || 0,     /* 私兵、家丁：自己养，自己调 */
      command: 0,                  /* 所辖官军：朝廷的兵，跟你走不走另说 */
      morale: est.troops ? S.int(rng, 55, 75) : 50,
      grade: 0,                    /* 官品：1 一品 …… 9 九品，0 无官 */

      flags: [], flagsOn: {},
      dry: {},   /* 每件事"够格却没抽到"攒了几回合，见 pickEvents 的久候加权 */
      catFresh: {},  /* 每个题材还有几回合"刚讲过"，见 pickEvents 的同类降权 */
      catSeen: {},   /* 本局每个题材露过几次面，见 waitWeight 的题材欠账补偿 */
      persons: [],
      ledger: { battles: 0, rebelWin: false, founded: false },
      debt: est.debt ? { amt: est.debt, rate: 0.03, dueYear: year + 2 } : null,
      line: null, lineName: null,
      household: 4,

      estate: est,
      plan: S.buildPlan(),
      turnIndex: 0,      phase: "birth",
      queue: [],
      usedEvents: [],
      pending: [],
      log: [],
      dead: false,
      cause: "",
      deathYear: 0,
      lastSettle: null,
      seedText: seed
    };

    /* 家人：同姓，年龄自洽 */
    const fatherAge = S.int(rng, 23, 40);
    const motherAge = Math.max(17, fatherAge - S.int(rng, 0, 6));
    const maxSib = Math.max(1, Math.min(fatherAge, motherAge) - 16);

    s.persons.push({
      id: "fa", name: nm.surname + S.pick(rng, S.GIVEN_M),
      role: "father", rel: "父", age: fatherAge, alive: true
    });
    s.persons.push({
      id: "mo", name: S.pick(rng, S.SURNAME) + S.pick(rng, S.GIVEN_F),
      role: "mother", rel: "母", age: motherAge, alive: true
    });

    const sibs = S.int(rng, 0, 3);
    for (let i = 0; i < sibs; i++) {
      const sx = rng() < 0.5 ? "male" : "female";
      const given = S.pick(rng, sx === "male" ? S.GIVEN_M : S.GIVEN_F);
      s.persons.push({
        id: "sb" + i, name: nm.surname + given, role: "sibling",
        rel: sx === "male" ? "兄" : "姊", age: S.int(rng, 1, maxSib), alive: true
      });
    }
    s.household = 2 + sibs + 1;

    /* 出生快照：千局对照必须从"出生时"重跑，不能用死时的值 */
    s.birthYear = year;
    s.birth = {
      body: s.body, silver: s.silver, field_wet: s.field_wet,
      field_dry: s.field_dry, grain: s.grain,
      knowledge: s.knowledge, fame: s.fame
    };

    return s;
  };

  /* ── 年度静默结算 ─────────────────────────────── */
  function settleOneYear(s) {
    const p = (S.getPack(s.era) || {}).prices || { rice_per_shi: 0.6 };
    /* 乱世：兵力、赋税、收成、粮价，皆随朝局之年表而动 */
    const unrest = S.unrestAt(s.era, s.year);
    const crisis = unrest >= 0.12;

    /* 产出：自有田 + 佃耕/做工所得。乱世减产，但佃耕的保底仍在 */
    let produce = (s.field_wet * 1.7 + s.field_dry * 0.8) * (1 - unrest * 0.55);
    if (s.cls === "tenant") produce += crisis ? 5 : 9;   /* 佃耕所得，已扣租 */
    if (s.cls === "base") produce += crisis ? 4 : 7;     /* 当差、做工换来的口粮 */

    const eat = s.household * 1.8;
    /* 陈粮有损耗；超出仓廪的余粮会挑到集上卖掉 */
    s.grain = S.r2(s.grain * 0.9 + produce - eat);

    /* 缺粮：先拿银子买，买不起才饿 */
    if (s.grain < 0) {
      const need = -s.grain;
      const price = crisis ? p.rice_per_shi * 6 : p.rice_per_shi;
      const cost = S.r2(need * price);
      if (s.silver >= cost) {
        s.silver = S.r2(s.silver - cost);
      } else {
        const afford = Math.floor(Math.max(0, s.silver) / price);
        s.silver = S.r2(s.silver - afford * price);
        s.body -= 9;
        s.fame -= 2;
      }
      s.grain = 0;
    }

    /* 仓廪装不下的余粮，挑到集上换钱 */
    const CAP = 30;
    if (s.grain > CAP) {
      const surplus = s.grain - CAP;
      s.silver = S.r2(s.silver + surplus * p.rice_per_shi * 0.9);
      s.grain = CAP;
    }

    /* 赋税：乱世加征，如明末三饷、清末厘金 */
    const taxRate = 0.05 + unrest * 0.45;
    const tax = S.r2((s.field_wet + s.field_dry) * taxRate);
    s.silver = S.r2(s.silver - tax);

    /* 日常开销：盐、布、灯油、药、人情往来 */
    s.silver = S.r2(s.silver - s.household * 0.32);

    /* 养兵：家丁年饷银二两二钱，吃住另算。官军的饷由朝廷支给，
       但欠饷是常事，所以军心只降不升。 */
    if (s.troops > 0) {
      const pay = S.r2(s.troops * 2.2);
      const paid = Math.min(Math.max(0, s.silver), pay);
      s.silver = S.r2(s.silver - paid);
      if (paid < pay - 0.01) {
        s.morale = Math.max(0, s.morale - 9);
        const flee = Math.min(Math.floor(s.troops * 0.35), Math.ceil((pay - paid) / 4));
        s.troops -= flee;
        if (flee > 0) {
          s.log.push({ year: s.year, age: s.age, text: "欠饷，" + flee + " 名家丁散去" });
        }
      } else if (s.morale < 82) {
        s.morale = Math.min(82, s.morale + 1);
      }
    }
    if (s.command > 0) {
      if (unrest >= 0.06 && S.chance(S.rng(s.seed + s.year * 7), 0.3)) s.morale -= 3;
      s.morale = Math.max(0, s.morale);
    }
    /* 军心向 50 回落 */
    if (s.morale > 50) s.morale = Math.max(50, s.morale - 0.5);

    /* 缺粮 */
    if (s.grain < 0) {
      s.grain = 0;
      s.body -= 9;
      s.fame -= 2;
    }

    /* 欠银转债：账面不留负数，欠的一律并进债里 */
    foldDebt(s);

    /* 债到期 */
    if (s.debt) {
      s.debt.amt = S.r2(s.debt.amt * (1 + s.debt.rate));
      if (s.year >= s.debt.dueYear) {
        if (s.silver >= s.debt.amt) {
          s.silver = S.r2(s.silver - s.debt.amt);
          s.debt = null;
        } else {
          /* 卖田抵债 */
          const need = s.debt.amt - s.silver;
          const mu = Math.ceil(need / 6);
          s.field_wet = Math.max(0, s.field_wet - mu);
          s.silver = 0;
          s.debt = null;
          s.fame -= 8;
          if (mu > 0) s.log.push({ year: s.year, age: s.age, text: "卖田" + mu + "亩抵债" });
        }
      }
    }

    /* 身体自然衰减 */
    const decay = s.age >= 60 ? 1.8 : s.age >= 40 ? 1.2 : 0.6;
    s.body = Math.max(0, S.r2(s.body - decay));

    /* 休养：太平年、仓里有粮，身子自己会补回来一些。
       没有这一条，兵祸饥荒一次的伤就再也补不上，人到三十就死绝了。 */
    if (s.grain > 0 && s.body < 85) {
      s.body = Math.min(85, S.r2(s.body + 4.6));
    }

    /* 声望回落 */
    if (s.fame > 60) s.fame -= 0.5;

    s.household = 1 + s.persons.filter(x => x.alive && x.role !== "father" && x.role !== "mother").length;
    s.household = Math.max(1, s.household);
  }
  S.settleOneYear = settleOneYear;

  /* ── 抽事件 ───────────────────────────────────── */
  function quietEvent(s, rng) {
    const lines = [
      "这一年没什么大事。田里的活按节气走，该下种时下种，该收时收。",
      "这一年过得很快。你后来回想，几乎想不起什么。",
      "日子还是那样。早上起来，晚上睡下，中间的事做完就忘了。",
      "今年一切照旧。没有大喜，也没有大祸。"
    ];
    return {
      id: "sys.quiet." + s.year,
      cat: "平年",
      title: "照旧",
      text: [S.pick(rng, lines)],
      options: [{ text: "过下去", hint: "不作选择", effects: [] }],
      sys: true
    };
  }

  /* 应到：本局还没露过面、这一回合又够格的事件，必定递到面前。
     早先只让"窄窗 once"必到，其余仍交给加权抽签 —— 但同池常年两三百条、
     权重合计两三千，一条权重十几的事件每回合只占半个百分点，
     而它一辈子可能只够格两三个回合，乘起来期望不到一次，写进去等于没写。
     现在改成：够格就必到，一回合最多一条；其余位置仍由抽签决定，
     日常事件的随机感不变。 */
  const DUE_SPAN = 6;   /* 只在审计里用来区分"窄窗"，运行时不依赖 */

  /* 久候加权：一件事够格了却老是抽不着，每多等一回合就多一档权重。
     抽到即归零。应到之外的位置靠它把稀客慢慢推上来。
     上限从 4.2 倍降到 2.5 倍，原因是一次全库体检：
     只有"年龄窗口宽、无 once、无阶层限制"的常年事件能把 dry 吃满，
     而带年份窗口的事件被应到直接递走、dry 随即清零。
     两头一乘，宽窗常年事件的相对权重就成了窄窗事件的四倍多 ——
     天灾这类写到 [8,70] 的题材，命中占比冲到 11.9%（条数只占 4.1%），
     官府、赋役、大事反倒被压到条数的零头。加权是补救，不该反过来定调。 */
  function waitWeight(s, e) {
    const d = (s.dry && s.dry[e.id]) || 0;
    let w = Math.max(0.01, e.weight || 1) * (1 + Math.min(6, d) * 0.25);
    /* 同一题材刚讲过，先让一让。数据 Schema 8.1 里一直写着"类别新鲜度 ×0.4"，
       引擎里其实没实现 —— 写了等于没写。补在这里，乘在抽签权重上。
       只降权、不禁出：禁出会造死内容，降权不会。 */
    const f = s.catFresh && s.catFresh[e.cat || "—"];
    if (f) w *= 0.45;
    /* 题材欠账：本局这个题材露过几次面。
       起因是一次露出率体检 —— 官府 249 条在库里最厚，命中占比却只有一成五，
       折算下来不到条数该有的一半；赋役、生计、人际、职业同样偏冷。
       条件不是主因（官府 249 条里 196 条无条件），真正的原因是抽签结构：
       临期档只挑"离截止最近"的那条，而官府的事件年份窗口平均跨六十九年，
       永远排不到最前；世变的窗口平均只有十三年，次次都能挤进临期档。
       于是厚题材只能靠抽签分那点权重，一局三十回合露不了几次。
       补法照旧用"欠账"这个同构手段：一次没露 ×1.9，露过一次 ×1.4，两次 ×1.15，
       三次以上不补。它的好处是自限 —— 已经挤占的题材（学问、天下）几回合就把
       计数吃满，权重回落到 1.0，冷题材才一直挂在高位，慢慢把差距抹平。
       只补不急：从不禁出某类，禁出会造死内容。 */
    const seen = (s.catSeen && s.catSeen[e.cat || "—"]) || 0;
    if (seen === 0) w *= 1.9;
    else if (seen === 1) w *= 1.4;
    else if (seen === 2) w *= 1.15;
    return w;
  }

  function pickEvents(s, rng) {
    const pack = S.getPack(s.era);
    let pool = (pack.events || []).filter(e => matchEvent(e, s));
    /* 审计钩子：tools/why-dead.js 用它在沙箱外看"这一回合哪些事件够格" */
    if (S.onPool) S.onPool(pool, s);
    /* 最近九条出过的，先不重出；池子不够时再放开 */
    const rec = (s.usedEvents || []).slice(-9);
    const fresh = pool.filter(e => rec.indexOf(e.id) < 0);
    if (fresh.length >= 3) pool = fresh;
    if (!pool.length) return [quietEvent(s, rng)];

    const used = s.usedEvents || [];
    /* 临期优先，分两档。
       一档：有年份窗口的历史事件 —— 挑"离年份截止最近"的那条。这一回合不递，
             它这辈子就没机会了。判据必须是"还剩几年"，不能是"谁的截止年更早"；
             后者会让朝末的事件永远排在最后（昆阳在新朝二十三年，只有一年窗口）。
       二档：没有年份、只有年龄上下限的日常事件 —— 挑"离年龄上限最近"的那条。
             一档从缺时才启用。两档不能混着算：混起来一档的窄窗大事会被
             一大群同年到期的日常挤掉，实测反而多出二十三条死内容。 */
    const n = s.age >= 16 ? (rng() < 0.5 ? 4 : 3)
            : s.age >= 8 ? 2
            : 1;

    let bestRem = Infinity;
    let cands = [];
    for (let i = 0; i < pool.length; i++) {
      const e = pool[i];
      if (!e.years || used.indexOf(e.id) >= 0) continue;
      const rem = e.years[1] - s.year;
      if (rem < bestRem) { bestRem = rem; cands = [e]; }
      else if (rem === bestRem) cands.push(e);
    }
    /* 死线就在今年或明年，就不是"二选一"的事了：两条都递。
       秦、新这种只有十四年的朝，末年往往攒着好几件事，只给一条等于丢一半。 */
    let cap = bestRem <= 1 ? 2 : 1;
    const dueList = [];
    if (cands.length) {
      const c = cands.slice();
      while (dueList.length < cap && c.length) {
        dueList.push(c.splice(Math.floor(rng() * c.length), 1)[0]);
      }
    } else if (n >= 3) {
      /* 没有快到期的历史事件，就从"年龄窗口快关"的日常里挑一条。
         不这么挑，「续弦」这类一辈子只有末尾几年够格的事件永远轮不到：
         它没有年份窗口，进不了上一档；靠抽签又要跟两百多条分那三千的权重。
         但只在 n≥3 时启用 —— 幼年一回合只递一条，让二档占掉就成了一条道走到黑，
         头六年永远只见同一种事。 */
      let bestA = Infinity;
      let c2 = [];
      for (let i = 0; i < pool.length; i++) {
        const e = pool[i];
        if (e.years || used.indexOf(e.id) >= 0 || !e.age) continue;
        const rem = e.age[1] - s.age;
        if (rem < bestA) { bestA = rem; c2 = [e]; }
        else if (rem === bestA) c2.push(e);
      }
      if (c2.length) dueList.push(c2[Math.floor(rng() * c2.length)]);
    }
    /* 久候必到：一条事件这局里够格了十来回合、一次没露过面，就不再交给抽签赌。
       起因是一份零命中审计：s6.yantie（盐井，三国，限益州）在 7980 局里
       够格 269 次、抽中 0 次。同池常年三百三十三条、权重合计三千九，
       权重 18 的它每次只占半个百分点 —— 够格两百次，期望值也只有一次多。
       抬它的权重不行：抬一条，池子里其余三百多条各让一点，问题只是搬家。
       所以换成"攒够了就必到"：dry 已经顶到上限（12）还没露过面，直接递一次。
       上限挡在这里，是因为它只救"常在池子里却永远轮不上"的那几条，
       不会把随机性整体挪走。 */
    if (!dueList.length) {
      const stuck = pool.filter(e => used.indexOf(e.id) < 0 &&
        ((s.dry && s.dry[e.id]) || 0) >= 12);
      if (stuck.length) dueList.push(stuck[Math.floor(rng() * stuck.length)]);
    }
    /* 地方专属必到，单独占一格，不跟临期档抢位子。
       上面这条"久候必到"救不了地方事件：盐井这类条子一辈子只够格半回合
       （限益州，全朝十三道里的一道；再叠年龄），dry 攒不到 12 局就过完了。
       全库十四条带 area 的事件里，盐井够格 269 次一次没中，瓦子够格 234 次中 2 次。
       地方的事就该让本地人撞见 —— 所以干脆必到一次，且额外多给一格，
       不去挤那条"快到期了必须递"的历史大事。
       一个玩家一生最多碰上一两条，不至于把一局读成地方志。 */
    let bonus = 0;
    if (n >= 2) {
      const local = pool.filter(e => e.area && used.indexOf(e.id) < 0);
      if (local.length) {
        dueList.unshift(local[Math.floor(rng() * local.length)]);
        bonus = 1;
      }
    }
    const quota = n + bonus;
    const out = [];
    const taken = [];
    for (const d of dueList) {
      if (out.length >= quota) break;
      out.push(d);
      taken.push(d.id);
    }
    for (let i = out.length; i < quota && pool.length; i++) {
      const avail = pool.filter(e => taken.indexOf(e.id) < 0);
      if (!avail.length) break;
      const e = S.weighted(rng, avail, x => waitWeight(s, x));
      taken.push(e.id);
      out.push(e);
    }
    if (!s.dry) s.dry = {};
    for (const e of pool) {
      if (taken.indexOf(e.id) >= 0) s.dry[e.id] = 0;
      else s.dry[e.id] = Math.min(12, (s.dry[e.id] || 0) + 1);
    }
    /* 题材新鲜度：本回合递出去的题材，往后三回合降权。
       一局二十五到三十回合，同一题材连着来三四回，这一辈子就只剩那一样事了 ——
       补完天灾之后尤其明显：旱、蝗、水、霜各来一遍，看着像四件事，读着是一件事。 */
    if (!s.catFresh) s.catFresh = {};
    for (const k in s.catFresh) {
      if (s.catFresh[k] > 0) s.catFresh[k]--;
    }
    for (const e of out) s.catFresh[e.cat || "—"] = 3;
    if (!s.catSeen) s.catSeen = {};
    for (const e of out) {
      const k = e.cat || "—";
      s.catSeen[k] = (s.catSeen[k] || 0) + 1;
    }
    return out;
  }

  /* ── 兵到极处 ─────────────────────────────────────
   * 这不是随机池里的事件，是条件满足时必定递到面前的一句话。
   */
  function rebelEvent(s) {
    const force = S.forceOf(s);
    const off = (s.grade || 0) > 0 && (s.grade || 0) <= 4;
    const who = off ? "一个旧部" : (s.line === "military" ? "一个同袍" : "一个门客");

    const lines = [
      "夜里下雨。" + who + "把斗笠放在门槛外头，进来，站着不说话。",
      "你把灯挑亮了些，说：坐下说。",
      "他没坐。他说：「将军，天下苦已久矣。」"
    ];

    const un = S.unrestAt(s.era, s.year);
    const book = S.bookOf(s.era) || {};
    const state = "你手里有兵 " + force + " 人，银 " + Math.round(s.silver) +
      " 两，名声 " + Math.round(s.fame) + "。" + (book.name || "朝廷") + "那边，" +
      (un >= 0.14 ? "四方已乱，号令不出城外，州郡各自为政。" :
        un >= 0.06 ? "朝局不稳，人心浮动，边报一日三至。" :
          "眼下还算太平，兵甲尚整，此时举事，是以卵击石。");

    const ch = S.rebelChance(s);
    const read = ch < 0.06 ? "十死一生" : ch < 0.12 ? "不过一成" :
      ch < 0.2 ? "约两成" : ch < 0.28 ? "近三成" : "三成有余";

    return {
      id: "sys.rebel." + s.year,
      cat: "大事",
      title: "那 句 话",
      text: lines.concat([state]),
      options: [
        {
          text: "起兵",
          hint: "成败一次定。看着" + read + "；输了，不只是你一个人死",
          resolve: "rebel",
          then: ""
        },
        {
          text: "按兵不动",
          hint: "声望 −6。你只当没听见",
          effects: [{ k: "fame", v: -6 }],
          then: "你把那人送出门，回来照旧看账。那一夜没睡着。第二日照常升帐。"
        },
        {
          text: "上表自陈，请解兵柄",
          hint: "私兵散去四成；官声 +14，声望 +4",
          effects: [
            { k: "troops", v: -Math.round(force * 0.4) },
            { k: "official", v: 14 }, { k: "fame", v: 4 }
          ],
          then: "奏疏递上去。三个月后批回，只有三个字：「知道了。」你把兵册重新造了一遍，数字写得比实有少。"
        }
      ]
    };
  }
  S.rebelEvent = rebelEvent;

  /* ── 推进一回合 ───────────────────────────────── */
  S.nextTurn = function (s) {
    if (s.dead) return s;
    if (s.turnIndex >= s.plan.length) { die(s, "寿终"); return s; }
    const step = s.plan[s.turnIndex] || { span: 2 };

    /* 出生回合不推进年份 */
    if (step.tag !== "birth") {
      for (let i = 0; i < step.span; i++) {
        s.year += 1;
        s.age += 1;
        settleOneYear(s);

        /* 期到事件 */
        for (let k = s.pending.length - 1; k >= 0; k--) {
          if (s.year >= s.pending[k].atYear) {
            const pd = s.pending.splice(k, 1)[0];
            if (pd.effects) applyEffects(s, pd.effects);
            if (pd.eventId) {
              const ev = (S.getPack(s.era).events || []).filter(x => x.id === pd.eventId)[0];
              if (ev) s.queue.push(ev);
            }
            if (pd.note) s.log.push({ year: s.year, age: s.age, text: pd.note });
          }
        }

        /* 死亡判定 */
        let p = S.mortalityOf(s.age);
        if (s.body < 40) p *= 1.15;
        if (s.body < 20) p *= 1.5;
        if (s.body < 8) p *= 2.2;
        if (S.chance(S.rng(s.seed + s.year * 31 + s.age), p)) {
          die(s, S.causeOf(S.rng(s.seed + s.year * 17), s.age, s.sex));
          return s;
        }
        if (s.body <= 0) { die(s, "病殁"); return s; }
      }
    }

    s.turnIndex += 1;
    const rng = S.rng(s.seed + s.turnIndex * 7919 + s.year);
    const evs = pickEvents(s, rng);
    s.queue = s.queue.concat(evs);

    /* 兵到了这个份上，就有人来问你那句话了 */
    if (S.canRebel && S.canRebel(s)) {
      s.queue.unshift(rebelEvent(s));
      s.flags.push("rebelAsked");
      s.flagsOn["rebelAsked"] = s.year;
    }
    s.phase = "turn";
    s.lastSettle = {
      year: s.year, age: s.age,
      field: s.field_wet + s.field_dry,
      grain: s.grain
    };
    return s;
  };

  /* ── 效果 ─────────────────────────────────────── */
  function applyEffects(s, list) {
    if (!list) return;
    /* 伤损折半：数据里的身体惩罚写得重，是为了"看着疼"，
       真按原值扣，三十岁前就死绝了 */
    const HURT = 0.5;
    for (const ef of list) {
      const k = ef.k, v = ef.v;
      switch (k) {
        case "body": s.body = Math.max(0, Math.min(100, s.body + (v > 0 ? v : v * HURT))); break;
        case "silver": s.silver = S.r2(s.silver + v); break;
        case "field_wet": s.field_wet = Math.max(0, s.field_wet + v); break;
        case "field_dry": s.field_dry = Math.max(0, s.field_dry + v); break;
        case "grain": s.grain = Math.max(0, S.r2(s.grain + v)); break;
        case "knowledge": s.knowledge = Math.max(0, Math.min(100, s.knowledge + v)); break;
        case "martial": s.martial = Math.max(0, Math.min(100, (s.martial || 0) + v)); break;
        case "path": s.path = v; s.pathName = S.PATH_NAME[v] || v; break;
        case "fame": s.fame = Math.max(-50, Math.min(100, s.fame + v)); break;
        case "grudge": s.grudge = Math.max(0, Math.min(100, s.grudge + v)); break;
        case "favor": s.favor = Math.max(0, Math.min(100, s.favor + v)); break;
        case "official": s.official = Math.max(-50, Math.min(100, s.official + v)); break;
        case "luck": s.luck = Math.max(-10, Math.min(10, s.luck + v)); break;
        case "debt": s.debt = { amt: v.amt, rate: v.rate || 0.03, dueYear: s.year + (v.dueYears || 2) }; break;
        case "addPerson": {
          const used = {};
          s.persons.forEach(function (p) { used[p.name] = 1; });
          const rr = S.rng(s.seed + s.persons.length * 37 + s.year * 11);
          const isGirl = (v.rel === "女" || v.rel === "女儿");
          let nm = v.name;
          if (!nm || nm === "待取名") {
            let tries = 0;
            do {
              if (v.role === "wife") nm = S.pick(rr, S.SURNAME) + "氏";
              else if (v.role === "husband") nm = S.pick(rr, S.SURNAME) + S.pick(rr, S.GIVEN_M);
              else nm = s.surname + S.pick(rr, isGirl ? S.GIVEN_F : S.GIVEN_M);
              tries++;
            } while (used[nm] && tries < 14);
          }
          s.persons.push({
            id: "p" + (s.persons.length + 1), name: nm, role: v.role,
            rel: v.rel, age: v.age || 0, alive: true,
            sex: (isGirl || v.role === "wife") ? "female" : "male"
          });
          break;
        }
        case "killPerson":
          s.persons.forEach(x => { if (x.id === v) x.alive = false; });
          break;
        case "line": s.line = v; s.lineName = S.LINE_NAME[v] || v; break;
        case "flag": if (s.flags.indexOf(v) < 0) s.flags.push(v); s.flagsOn[v] = s.year; break;
        case "troops": s.troops = Math.max(0, Math.round((s.troops || 0) + v)); break;
        case "command": s.command = Math.max(0, Math.round((s.command || 0) + v)); break;
        case "morale": s.morale = Math.max(0, Math.min(100, (s.morale || 50) + v)); break;
        case "grade": s.grade = Math.max(0, Math.min(9, v)); break;
        case "kill": if (v === "self") die(s, s.cause || "卒");
          break;
      }
    }
  }
  S.applyEffects = applyEffects;

  S.LINE_NAME = {
    exam: "读书应考", farm: "种田", trade: "做买卖",
    military: "投军", clerk: "县衙书吏", office: "为官",
    royal: "宗室", monk: "方外"
  };

  S.PATH_NAME = {
    wen: "读书", wu: "习武", shang: "学买卖",
    nong: "务农", nv: "女红", yi: "学医"
  };

  function die(s, cause) {
    /* 临终这一下也要平账：欠的钱并进债里，账面不留负数 */
    foldDebt(s);
    s.dead = true;
    s.phase = "dead";
    s.cause = cause;
    s.deathYear = s.year;
    s.body = 0;
  }
  S.die = die;

  /* 花超了的钱一律并进债里。账面永不留负数——这是硬约束，
     任何加加减减之后都要过一遍。 */
  function foldDebt(s) {
    if (s.silver >= 0) return 0;
    const over = S.r2(-s.silver);
    if (!s.debt) s.debt = { amt: over, rate: 0.03, dueYear: s.year + 2 };
    else s.debt.amt = S.r2(s.debt.amt + over);
    s.silver = 0;
    return over;
  }
  S.foldDebt = foldDebt;

  /* ── 选择 ─────────────────────────────────────── */
  S.choose = function (s, optIndex, ev) {
    ev = ev || s.queue[0];
    const opt = ev.options[optIndex];
    const rng = S.rng(s.seed + s.year * 101 + s.turnIndex * 13 + optIndex);

    const res = { text: opt.then || "", changes: [], dead: false, extra: null };

    applyEffects(s, opt.effects);
    foldDebt(s);
    if (opt.kill === "self" && !s.dead) die(s, opt.cause || "卒");

    if (opt.setFlag) {
      for (const f of opt.setFlag) {
        if (s.flags.indexOf(f) < 0) s.flags.push(f);
        s.flagsOn[f] = s.year;
      }
    }

    /* 概率判定 */
    if (opt.resolve === "examPass" && opt.params) {
      const p = Math.min(opt.params.cap,
        opt.params.base + s.knowledge * (opt.params.perKnowledge || 0) + s.luck * 0.01);
      const ok = rng() < p;
      res.extra = { type: "roll", ok: ok, p: p };
      if (ok) {
        for (const f of (opt.params.onPass || [])) {
          if (s.flags.indexOf(f) < 0) s.flags.push(f);
          s.flagsOn[f] = s.year;
        }
        res.text += s.knowledge >= 40 ? "放榜那天，你的名字在前面。" : "放榜那天，你在最后一行找到了自己。";
      } else {
        res.text += "没有中。";
      }
    }

    /* 赌博 */
    if (opt.gamble) {
      const g = opt.gamble;
      let win;
      if (g.winChance != null) win = rng() < g.winChance;
      else win = !(rng() < (g.loseChance || 0.5));
      applyEffects(s, win ? (g.win || []) : (g.lose || []));
      res.extra = { type: "roll", ok: win, p: g.winChance };
      res.text = win ? (g.winNote || res.text) : (g.loseNote || res.text);
      /* 事件致死率打三折：数据里的 deathChance 是"当时人以为的风险"，
         真按字面算，一局下来要撞死好几次。三折之后，敢冒险仍有代价，
         但不至于把人变成掷骰子。 */
      if (g.deathChance && rng() < g.deathChance * 0.33) die(s, g.cause || "疫病");
    }

    /* 起兵：一次定生死 */
    if (opt.resolve === "rebel") {
      if (!s.ledger) s.ledger = { battles: 0, rebelWin: false, founded: false };
      const force = S.forceOf(s);
      const p = S.rebelChance(s);
      const ok = rng() < p;
      s.ledger.battles = (s.ledger.battles || 0) + 1;
      res.extra = { type: "roll", ok: ok, p: p };

      if (ok) {
        if (s.flags.indexOf("rebelWin") < 0) s.flags.push("rebelWin");
        s.flagsOn["rebelWin"] = s.year;
        s.ledger.rebelWin = true;
        s.ledger.founded = true;
        s.grade = 0;
        s.fame = 100;
        s.official = 0;
        s.troops = Math.round(force * 1.6);
        s.command = 6000;
        s.silver = S.r2(s.silver + 8000);
        s.pending.push({ atYear: s.year + 3, eventId: "c.rebel.after1", effects: null, note: null });
        s.pending.push({ atYear: s.year + 9, eventId: "c.rebel.after2", effects: null, note: null });
        const cap = String((S.bookOf(s.era) || {}).capital || "").split("·")[0].trim();
        res.text = "你在" + s.place.pref + "树旗。开府库，散仓粮，三日之内应者逾万。" +
          "官军三路来，一路降，两路溃。第二年开春，你进了" +
          (cap || "京城") +
          "。城里的官跪在道旁，没人抬头看你。";
      } else {
        const dieNow = rng() < 0.45;
        if (dieNow) {
          s.persons.forEach(function (p) { p.alive = false; });
          res.text = "第一仗你赢了。第二仗，你的部将开了西门。" +
            "官军入城，搜了三天。族中男丁尽诛，女眷没入教坊。";
          die(s, "兵败");
        } else {
          s.troops = 0; s.command = 0;
          s.field_wet = 0; s.field_dry = 0;
          s.silver = S.r2(Math.max(0, s.silver) * 0.2);
          s.fame = -30; s.grade = 0;
          s.flags.push("rebelFailed");
          res.text = "兵溃得比你想的快。你带着七个人往西走，走到第八天，剩下三个。" +
            "后来你在一座小县城的药铺里替人抓药，改了姓。田产抄没，宅子充公。" +
            "官府的通缉告示贴了五年，上面没有画像。";
        }
      }
    }

    /* 延迟后果 */
    if (opt.schedule) {
      for (const sc of opt.schedule) {
        s.pending.push({
          atYear: s.year + (sc.inYears || 1),
          eventId: sc.eventId || null,
          effects: sc.effects || null,
          note: sc.note || null
        });
      }
    }

    /* 赌局、起兵、延迟后果里都可能有减银，收尾再抹一遍平账 */
    foldDebt(s);
    if (s.body <= 0 && !s.dead) die(s, "病殁");

    res.dead = s.dead;
    res.changes = diffSnapshot(ev._snap, s);
    if (!ev.sys) {
      s.log.push({ year: s.year, age: s.age, eventId: ev.id, text: ev.title + "·" + opt.text });
    }
    s.usedEvents.push(ev.id);

    return res;
  };

  S.snapshot = function (s) {
    return {
      body: s.body, silver: s.silver, field_wet: s.field_wet,
      field_dry: s.field_dry, grain: s.grain, knowledge: s.knowledge,
      martial: s.martial || 0,
      fame: s.fame, troops: s.troops || 0
    };
  };

  function diffSnapshot(before, s) {
    if (!before) return [];
    const now = S.snapshot(s);
    const out = [];
    const LABEL = {
      body: "身体", silver: "银钱", field_wet: "水田",
      field_dry: "旱地", grain: "存粮", knowledge: "学识",
      martial: "武艺", fame: "声望", troops: "私兵"
    };
    const UNIT = { silver: " 两", field_wet: " 亩", field_dry: " 亩", grain: " 石", troops: " 人" };
    for (const k in now) {
      const d = S.r2(now[k] - before[k]);
      if (Math.abs(d) < 0.01) continue;
      out.push({
        k: k,
        label: LABEL[k],
        v: d,
        text: (d > 0 ? "+" : "") + (Number.isInteger(d) ? d : d.toFixed(2)) + (UNIT[k] || "")
      });
    }
    return out;
  }

  S.peek = function (s, ev) { ev._snap = S.snapshot(s); };

  /* ── 年号 ─────────────────────────────────────── */
  S.reignText = function (s) {
    const pack = S.getPack(s.era);
    if (!pack || !pack.reigns) return s.year + "年";
    for (const r of pack.reigns) {
      if (s.year >= r.from && s.year <= r.to) {
        const n = s.year - r.from + 1;
        return r.name + (n === 1 ? "元" : S.cnNum(n)) + "年（" + s.year + "）";
      }
    }
    return s.year + "年";
  };

  /* ── 存档 ─────────────────────────────────────── */
  const KEY = "shz.run.current.v1";

  S.save = function (s) {
    try {
      const copy = Object.assign({}, s);
      copy.queue = s.queue.filter(e => !e.sys);
      delete copy.plan;
      localStorage.setItem(KEY, JSON.stringify(copy));
    } catch (e) { /* 忽略 */ }
  };

  S.load = function () {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.era) return null;
      const pack = S.getPack(s.era);
      if (!pack) return null;
      s.plan = S.buildPlan();
      /* 旧存档回填新字段 */
      if (s.troops == null) s.troops = 0;
      if (s.command == null) s.command = 0;
      if (s.morale == null) s.morale = 50;
      if (s.grade == null) s.grade = 0;
      if (!s.dry) s.dry = {};
      if (!s.catFresh) s.catFresh = {};
      if (!s.catSeen) s.catSeen = {};
      if (!s.ledger) s.ledger = { battles: 0, rebelWin: false, founded: false };
      /* 回填事件对象 */
      s.queue = (s.queue || []).map(q => {
        if (typeof q === "string") return (pack.events || []).filter(e => e.id === q)[0];
        return (pack.events || []).filter(e => e.id === q.id)[0] || q;
      }).filter(Boolean);
      return s;
    } catch (e) { return null; }
  };

  S.clear = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
  };

  /* ── 一千个和你一样的人 ───────────────────────────
   * 本地纯函数，同一开局重跑 n 次，每次随机抉择。
   * 不涉及任何他人数据。
   */
  function cloneRun(s, seed) {
    const birth = s.birth || {};
    const bornYear = s.birthYear || (s.year - s.age);
    const copy = JSON.parse(JSON.stringify({
      era: s.era, year: bornYear, age: 0, sex: s.sex,
      cls: s.cls, clsName: s.clsName, clsNote: s.clsNote,
      place: s.place, surname: s.surname, given: s.given, name: s.name,
      rank: s.rank, post: s.post,
      body: birth.body != null ? birth.body : 70,
      silver: birth.silver != null ? birth.silver : 0,
      field_wet: birth.field_wet != null ? birth.field_wet : 0,
      field_dry: birth.field_dry != null ? birth.field_dry : 0,
      grain: birth.grain != null ? birth.grain : 0,
      knowledge: birth.knowledge != null ? birth.knowledge : 0,
      fame: birth.fame != null ? birth.fame : 0,
      troops: s.estate && s.estate.troops ? Math.round((s.estate.troops[0] + s.estate.troops[1]) / 2) : 0,
      command: 0, morale: 55, grade: 0,
      ledger: { battles: 0, rebelWin: false, founded: false },
      grudge: 0, favor: 0, official: 0, luck: 0,
      flags: [], flagsOn: {}, persons: s.persons, debt: null,
      line: null, lineName: null, household: s.household,
      estate: s.estate, turnIndex: 0, phase: "birth",
      queue: [], usedEvents: [], pending: [], log: [],
      dead: false, cause: "", deathYear: 0, lastSettle: null,
      birthYear: bornYear, birth: birth
    }));
    copy.seed = seed;
    copy.plan = S.buildPlan();
    return copy;
  }
  S.cloneRun = cloneRun;

  S.simulate = function (base, n) {
    n = n || 300;
    const out = { total: n, adult: 0, married: 0, literate: 0, exam: 0, office: 0, old60: 0, rebel: 0, founded: 0, ages: [] };
    const rngOf = S.rng(base.seed ^ 0x9e3779b9);
    const bornYear = base.birthYear || (base.year - base.age);

    for (let i = 0; i < n; i++) {
      const s = cloneRun(base, (base.seed + i * 9973) >>> 0);
      let guard = 0;
      while (!s.dead && guard++ < 60) {
        S.nextTurn(s);
        while (s.queue.length) {
          const ev = s.queue.shift();
          const opts = ev.options.map((o, idx) => ({ o: o, idx: idx }))
            .filter(x => optionVisible(x.o, s));
          if (!opts.length) continue;
          const pickIdx = opts[Math.floor(rngOf() * opts.length)].idx;
          S.choose(s, pickIdx, ev);
          if (s.dead) break;
        }
      }
      const age = s.deathYear - bornYear || s.age;
      out.ages.push(age);
      if (age >= 15) out.adult++;
      if (s.flags.indexOf("married") >= 0) out.married++;
      if (s.flags.indexOf("literate") >= 0 || s.path === "wen") out.literate++;
      if (s.flags.indexOf("shengyuan") >= 0 || s.flags.indexOf("juren") >= 0 || s.flags.indexOf("jinshi") >= 0) out.exam++;
      if (s.line === "office") out.office++;
      if (s.flags.indexOf("rebelAsked") >= 0) out.rebel++;
      if (s.ledger && s.ledger.founded) out.founded++;
      if (age >= 60) out.old60++;
    }
    out.ages.sort((a, b) => a - b);
    out.medianAge = out.ages[Math.floor(n / 2)] || 0;
    return out;
  };

  /* ── 一生总结 ─────────────────────────────────────
   * 给结算页用的一段白话。不是判词，是行状。
   */
  const GRADE_TXT = { 1: "一品", 2: "二品", 3: "三品", 4: "四品", 5: "五品",
                      6: "六品", 7: "七品", 8: "八品", 9: "九品" };
  S.GRADE_TXT = GRADE_TXT;

  S.lifeSummary = function (s) {
    const born = s.birthYear || (s.deathYear - s.age);
    const age = s.deathYear - born;
    const reign = function (y) { return S.reignText({ era: s.era, year: y }); };
    const has = function (f) { return (s.flags || []).indexOf(f) >= 0; };
    const kids = (s.persons || []).filter(function (x) { return x.role === "child"; });
    const spouse = (s.persons || []).filter(function (x) {
      return x.role === "wife" || x.role === "husband";
    })[0];
    const land = (s.field_wet || 0) + (s.field_dry || 0);
    const she = s.sex === "female";
    const p = [];

    const CLS = (S.getPack(s.era) || {}).classText || {
      royal: "宗室，生而受禄，也生而不得出仕、不得经商、不得离开封地",
      noble: "军功之家，祖上从龙，留了个世袭的职",
      official_mid: "父辈做官，家里有一任" + (s.fatherPost || "知县") + "的底子",
      gentry: "读书人家，有田，也有几箱书",
      merchant: "商家，铺子在县城里",
      farmer: "农家子弟",
      tenant: "佃户，租别人的地种，秋后分租",
      base: "军户，籍在卫所，世代当差"
    };
    const where = (s.place.pref.indexOf(s.place.prov) === 0
      ? s.place.pref : s.place.prov + s.place.pref) + s.place.cty;
    p.push(s.name + "，" + where + "人，生于" +
      reign(born) + "。家是" + (CLS[s.cls] || s.clsName) + "。");

    if (age < 6) {
      p.push(s.cause === "溺"
        ? "生下来第三天，祖母把她抱到院里。这一生只有三天。"
        : "只活了" + age + "年，没长成。");
      return p.join("");
    }

    const PATH = {
      wen: "七岁开蒙，先读《千字文》，再读《四书》，先生姓孙",
      wu: "不爱读书，爱弄枪棒，跟着街口的拳师学了几年",
      shang: "十一二岁进铺子学生意，先学看秤，后学看人",
      nong: "自小下地，扶犁、插秧、看天色",
      nv: "学的是针线、灶上的事，和怎么撑起一个家",
      yi: "跟着镇上的郎中认药，识得几百味"
    };
    if (s.path && PATH[s.path]) p.push(PATH[s.path] + "。");
    else if (has("literate") || has("shengyuan") || has("juren") || has("jinshi") || (s.knowledge || 0) >= 8) {
      p.push("跟着塾师识了几年字，能记账，能看契。");
    } else p.push("没进过学门，认得的字不够写一封家信。");

    const g = s.grade || 0;
    const gt = GRADE_TXT[g] || "";
    const PR = (S.getPack(s.era) || {}).prices || {};
    const RICH = (PR.rice_per_shi || 0.6) * 2500;
    let job;
    if (s.ledger && s.ledger.founded) {
      job = "后来提兵而起，一路打过去，坐上了那个位子";
    } else if (s.cls === "royal") {
      job = (CLS.royal || "宗室，生而受禄") + (g ? "，后来做到" + gt : "");
    } else if (has("jinshi")) {
      job = "中了进士，授了官" + (g ? "，最后官至" + gt : "");
    } else if (has("juren")) {
      job = "中了举人" + (g ? "，拣选授官，做到" + gt : "，三试不第，后来在家设馆教童生");
    } else if (has("shengyuan")) {
      job = "进了学，是个秀才" + (g ? "，后来援例入监，做了" + gt + "官" : "，一辈子没中举");
    } else if (s.line === "military") {
      job = "投了军，从行伍里熬出来" + (g ? "，做到" + gt + "武职" : "，始终是个兵");
    } else if (s.line === "trade" || s.cls === "merchant") {
      job = "做买卖" + (s.silver > RICH ? "，后来本钱厚了，也放贷" : "，赚的够吃，攒不下");
    } else if (s.line === "clerk") {
      job = "在县衙当书吏，管过钱粮，也管过刑名";
    } else if (land > 0) {
      job = "守着" + land + "亩地，一年两熟，看天吃饭";
    } else {
      job = "靠一双手吃饭，什么活都做过";
    }
    p.push(job + "。");

    if (has("rebelFailed")) p.push("起过一次兵，败了，改名换姓活下来。");

    if (spouse) {
      const sons = kids.filter(function (k) { return k.rel === "子"; }).length;
      const daus = kids.filter(function (k) { return k.rel === "女" || k.rel === "女儿"; }).length;
      let t = (she ? "嫁与" : "娶") + spouse.name;
      if (!kids.length) t += "，没有留下子女";
      else t += "，生" + (sons ? "子" + S.cnNum(sons) + "人" : "") +
        (sons && daus ? "、" : "") + (daus ? "女" + S.cnNum(daus) + "人" : "");
      p.push(t + "。");
    } else if (has("married")) {
      p.push(she ? "嫁过人。" : "成过家。");
    } else if (!she) {
      p.push("一生没有成家。");
    }

    if ((s.cls === "farmer" || s.cls === "tenant" || s.cls === "base") &&
        land === 0 && s.silver < RICH / 20 && age > 30 && !(s.ledger && s.ledger.founded)) {
      p.push("到死没有一寸自己的地。");
    } else if (s.silver > RICH) {
      p.push("晚年家里殷实，箱底压着" + Math.round(s.silver) + "两银子。");
    } else if (land >= 100) {
      p.push("手里有过" + land + "亩地，荒年也饿不着。");
    }

    p.push("卒于" + reign(s.deathYear) + "，年" + S.cnNum(age) + "，" + s.cause + "。");
    p.push(g > 0 || has("jinshi")
      ? "葬在祖茔，碑上刻着官职。"
      : "葬在村后的坡上，没有碑。");

    return p.join("");
  };

  /* ── 判词 ───────────────────────────────────────
   * 结算页碑上那一句。早先网页版与小游戏各写一份，都只有九种分支，
   * 玩过两局就重复。现在合成一份，放在引擎里：两端都调这个，
   * 改了这里就都改了，不会再出现「网页版有新词、小游戏还是旧词」。
   */
  S.verseOf = function (s) {
    const has = function (f) { return (s.flags || []).indexOf(f) >= 0; };
    const born = s.birthYear || (s.year - s.age);
    const age = s.deathYear - born;
    const cause = s.cause || "";
    const land = (s.field_wet || 0) + (s.field_dry || 0);
    const gt = S.GRADE_TXT[s.grade || 0] || "";
    const kids = (s.persons || []).filter(function (p) {
      return p.role === "child" && p.alive;
    });
    const spouse = (s.persons || []).filter(function (p) {
      return p.role === "wife" || p.role === "husband";
    })[0];
    const 兵 = /战|阵|城破|围城|守城|兵|乱|盗|屠|寨/.test(cause);
    const 疫 = /疫|痘|瘴/.test(cause);
    const 饥 = /饥|饿|殍|道殣/.test(cause);
    const 刑 = /狱|盐法|捕亡|役死/.test(cause);

    if (s.ledger && s.ledger.founded) {
      return "起于" + s.place.pref + "，终有天下。后来的人怎么议论，你已经听不见了。";
    }
    if (cause === "溺") return "祖母说，家里已经有两个姐姐了。";
    if (cause === "兵败") return "赢了第一仗。后面的事，史书上写着「伏诛」两个字。";
    if (age < 3) return "活了不到三年。名字是他爹随口起的，后来也没人再叫。";
    if (age < 6) return "这个名字，只在族谱上留了一行。";
    if (age < 12) return "还没长够岁数。碗柜上那只小碗，后来收了。";
    if (age < 16) return "还没来得及成人，就走了。";
    if (has("in_army") && 兵) return "死在阵上。尸首有没有背回来，家里到最后也没问清。";
    if (has("face_mark")) return "脸上刺的字到死没褪。孙子问起，他说是小时候摔的。";
    if (has("monk")) return "后来出了家。寺里的钟一天敲两次，敲了半辈子。";
    if (has("fugitive") || has("runaway")) return "一辈子在册外头。死的时候，用的还是假名。";
    if (has("captured")) return "被掳走过一回。回来之后话就少了，问他也不说。";
    if (has("jinshi") && gt) return "读书读出个样子，官做到" + gt + "。告老还乡那日，行李只有几箱书。";
    if (has("jinshi")) return "一生读书，总算读出个样子。";
    if (has("juren") && gt) return "中过举，做过" + gt + "官。不算大，可这一乡只出了他一个。";
    if (has("juren")) return "中过举，三试不第，后来在家设馆，教出一屋子的童生。";
    if (has("shengyuan") && gt) return "进过学，后来援例入监，做了" + gt + "官。族里说话，要请他坐上位。";
    if (has("shengyuan")) return "是个秀才，一辈子没中举。红白喜事，都请他去写对子。";
    if (has("smith") || has("carpenter")) return "一辈子的手艺，最后传给了徒弟，没传给儿子。";
    if (has("diviner")) return "替人看了一辈子吉凶，自己的日子没算准过。";
    if (has("partner")) return "和人合伙做过买卖。账清楚了，情分也淡了。";
    if (has("heir_clan") || has("adopted_heir")) return "过继来的儿子捧的灵。族谱上，他的名字写在另一支底下。";
    if (has("widowed") && age > 55) return "守了半辈子寡。村里人说她硬气，也有人说她命苦。";
    if (s.troops >= 200) return "手里有过" + Math.round(s.troops) + "人。这些人后来散了，也有的先死了。";
    if (s.debt && s.debt.amt > 60) return "死的时候还欠着" + Math.round(s.debt.amt) + "两。债主来吊过孝，顺便提了提账。";
    if (land >= 120) return "置下" + land + "亩地。荒年时，正是这些地把他救回来，也正是这些地让人惦记。";
    if (land === 0 && age > 40 && !has("jinshi") && !gt) return "到死没有一寸地。住的那间屋，是租的。";
    if (s.silver > 400) return "晚年家里殷实。银子铸成锭，藏在墙里，谁也没告诉。";
    if (s.fame >= 55) return "一乡的人都知道他。事办得公道，话说得直，也得罪过人。";
    if (s.grudge >= 55) return "结下的仇，比他活的岁数还长。出殡那日，有人在远处看着。";
    if (s.knowledge >= 55) return "读过不少书。没换来功名，换来一屋子纸和一屋子道理。";
    if (s.martial >= 55) return "一身力气，一把好手。老了之后，只剩下讲当年的事。";
    if (kids.length >= 4) return "生了" + kids.length + "个孩子。养活几个，他自己也记不清。";
    if (!spouse && !has("married") && age > 45) return "一辈子没成家。族里分东西，他那份总少一点。";
    if (spouse && !kids.length) return (s.sex === "female" ? "嫁过去" : "娶进门") + "，没有生养。老了靠侄儿照看。";
    if (s.sex === "female" && age > 60) return "一辈子在灶上、机前、井边。走的那天，手还是湿的。";
    if (age >= 80) return "活到八十往上，同辈的人全送走了。后来没人能跟他说话。";
    if (age >= 70) return "活得比同辈都久。最后几年，天天在门口坐着看人过。";
    if (age < 35 && 兵) return "乱世里的人，命不由己。";
    if (age < 40) return "走得太早，家里的事还没交出去。";
    if (疫) return "一场疫，一户一户地过。轮到他的时候，村里已经不敲锣了。";
    if (饥) return "荒年没熬过去。最后几天，吃的是树皮和观音土。";
    if (刑) return "死在官家的手里。家里去收尸，交了二百文。";
    if (兵) return "兵过境了三次。房子烧了两回，人只死了一个。";
    return "生逢其时也好，不逢其时也好，都过完了。";
  };

  /* 同代百分位：粗估，按明代分性别生命表拟合 */
  S.percentile = function (s) {
    const a = s.deathYear - (s.birthYear || (s.year - s.age));
    const table = [
      [5, 26], [15, 42], [25, 52], [35, 60], [45, 68],
      [55, 76], [65, 87], [75, 95], [85, 99]
    ];
    let prev = [0, 0];
    for (const pt of table) {
      if (a <= pt[0]) {
        const t = (a - prev[0]) / Math.max(1, pt[0] - prev[0]);
        return Math.round(prev[1] + (pt[1] - prev[1]) * t);
      }
      prev = pt;
    }
    return 99;
  };
})(window.SHZ);
