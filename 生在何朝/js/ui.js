/* 生在何朝 · 界面层 */
(function () {
  "use strict";
  const S = window.SHZ;

  const stage = document.getElementById("stage");
  const topbar = document.getElementById("topbar");
  const statsEl = document.getElementById("stats");

  let s = null;
  let ui = { mode: "welcome", result: null, drawStep: 0, sim: null, rtab: 0, rregion: null, gap: 0, speed: 1 };
  let drawTimer = null;
  let autoTimer = null;

  /* ── 工具 ─────────────────────────────────────── */
  const GRADE_TXT = { 0: "未入流", 1: "一品", 2: "二品", 3: "三品", 4: "四品",
                      5: "五品", 6: "六品", 7: "七品", 8: "八品", 9: "九品" };

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function fmtMoney(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }

  /* 把 {{词|注}} 与 {place} 之类占位符换成 HTML */
  function rich(str) {
    let out = esc(str);
    out = out.replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,
      (m, w, note) => '<em class="term" data-note="' + note + '">' + w + "</em>");
    if (s) {
      out = out.replace(/\{place\}/g, s.place.full)
        .replace(/\{reign\}/g, S.reignText(s))
        .replace(/\{name\}/g, s.name)
        .replace(/\{hometown_far\}/g, s.place.full);
    }
    return out;
  }

  /* ── 顶栏 ─────────────────────────────────────── */
  function renderTop() {
    if (!s || ui.mode === "welcome" || ui.mode === "eras") { topbar.innerHTML = ""; topbar.style.display = "none"; return; }
    topbar.style.display = "";
    const sexTxt = s.sex === "female" ? "女" : "男";
    topbar.innerHTML =
      '<span class="tb-reign">' + esc(S.reignText(s)) + "</span>" +
      '<span class="tb-sep">·</span>' +
      '<span class="tb-age">' + (s.dead ? "卒年 " + s.deathYear : (s.age === 0 ? "初生" : "你 " + S.cnNum(s.age) + " 岁")) + "</span>" +
      '<span class="tb-sep">·</span>' +
      '<span class="tb-place">' + esc(s.place.full) + "</span>" +
      '<span class="tb-sex">' + sexTxt + "</span>" +
      '<button class="tb-realm tb-spd" data-act="speed" title="时间流速">' + ui.speed + "×</button>" +
      '<button class="tb-realm" data-act="openRealm">天下</button>';
  }

  /* ── 状态条 ───────────────────────────────────── */
  function renderStats() {
    if (!s || ui.mode === "welcome" || ui.mode === "draw" || ui.mode === "dead") {
      statsEl.innerHTML = ""; statsEl.style.display = "none"; return;
    }
    statsEl.style.display = "";
    const items = [
      { k: "body", lab: "身体", v: Math.round(s.body), max: 100, bar: true },
      { k: "silver", lab: "银", v: fmtMoney(s.silver), unit: "两" },
      { k: "field", lab: "田", v: s.field_wet + s.field_dry, unit: "亩" },
      { k: "grain", lab: "粮", v: Math.round(s.grain), unit: "石" },
      { k: "knowledge", lab: "识", v: Math.round(s.knowledge), bar: true, max: 100 },
      { k: "fame", lab: "望", v: Math.round(s.fame) }
    ];
    if ((s.troops || 0) > 0) items.push({ k: "troops", lab: "兵", v: s.troops, unit: "人" });
    if ((s.martial || 0) > 0) items.push({ k: "martial", lab: "武", v: Math.round(s.martial), bar: true, max: 100 });
    if ((s.grade || 0) > 0) items.push({ k: "grade", lab: "品", v: GRADE_TXT[s.grade] || s.grade });
    statsEl.className = items.length > 6 ? "many" : "";
    statsEl.innerHTML = items.map(it => {
      const warn = (it.k === "body" && s.body < 35) ? " warn" : "";
      const bar = it.bar
        ? '<i class="sbar"><u style="width:' + Math.max(0, Math.min(100, (it.v / (it.max || 100)) * 100)) + '%"></u></i>'
        : "";
      return '<div class="stat' + warn + '">' +
        '<span class="s-lab">' + it.lab + "</span>" +
        '<span class="s-val">' + it.v + (it.unit ? '<small>' + it.unit + "</small>" : "") + "</span>" +
        bar + "</div>";
    }).join("");
  }

  /* ── 屏：欢迎 ─────────────────────────────────── */
  function screenWelcome() {
    const saved = S.load();
    stage.innerHTML =
      '<div class="welcome">' +
      '<div class="w-mark">生</div>' +
      '<h1>生 在 何 朝</h1>' +
      '<p class="w-sub">秦至清，十九个政权，二千一百余年。你无法选择生于哪朝、哪地、哪户人家。</p>' +
      '<p class="w-sub2">睁眼之后，把这一生过完。</p>' +
      '<div class="w-btns">' +
      '<button class="btn btn-main" data-act="newrun">投　胎</button>' +
      (saved ? '<button class="btn btn-ghost" data-act="resume">继续上次</button>' : "") +
      '<button class="btn btn-ghost" data-act="eras">看　十　九　朝</button>' +
      "</div>" +
      '<p class="w-note">一局约三十次抉择 · 结局不可回退</p>' +
      "</div>";
  }

  /* ── 屏：十九朝 ───────────────────────────────── */
  function screenEras() {
    const rows = S.ERAS.map(function (e) {
      const b = S.bookOf(e.id);
      const pack = S.getPack(e.id);
      if (!b || !pack) return "";
      const first = b.parts[0] || { title: "", lines: [] };
      return '<div class="era-card">' +
        '<div class="ec-h"><b>' + esc(e.name) + "</b>" +
        '<span>' + esc(e.from < 0 ? "前 " + (-e.from) : e.from) + " — " +
        esc(e.to < 0 ? "前 " + (-e.to) : e.to) + " · 都 " + esc(e.capital) + "</span></div>" +
        '<div class="ec-t">' + esc(first.title) + "</div>" +
        '<p class="ec-l">' + esc(first.lines[0] || "") + "</p>" +
        '<div class="ec-f"><span>' + b.regions.length + " 区 · " + b.factions.length +
        " 家势力 · " + pack.events.length + " 条事件</span>" +
        '<button class="ec-b" data-act="pickera" data-id="' + esc(e.id) + '">生于此朝</button></div>' +
        "</div>";
    }).join("");

    stage.innerHTML =
      '<div class="eras fadein">' +
      '<div class="er-head"><h2>十 九 朝</h2>' +
      '<p>点「生于此朝」，即从这一朝里随机抽年份、抽地方、抽家世。此处只是让你先看看都有哪些世道。</p></div>' +
      '<div class="er-list">' + rows + "</div>" +
      '<button class="btn btn-ghost" data-act="welcome">回　去</button>' +
      "</div>";
  }


  /* ── 屏：抽签 ─────────────────────────────────── */
  const DRAW_LINES = ["抽 朝 代", "抽 年 份", "抽 地 方", "抽 家 世"];

  function screenDraw() {
    ui.drawStep = 0;
    stage.innerHTML =
      '<div class="draw">' +
      DRAW_LINES.map((t, i) => '<div class="d-line" data-i="' + i + '">' + t + "</div>").join("") +
      "</div>";
    const tick = () => {
      const el = stage.querySelector('.d-line[data-i="' + ui.drawStep + '"]');
      if (el) el.classList.add("on");
      ui.drawStep++;
      if (ui.drawStep < DRAW_LINES.length) {
        drawTimer = setTimeout(tick, 480);
      } else {
        drawTimer = setTimeout(() => { ui.mode = "birth"; S.peek(s, s.queue[0] || {}); render(); }, 620);
      }
    };
    drawTimer = setTimeout(tick, 200);
  }

  /* ── 屏：出生卡 ───────────────────────────────── */
  function screenBirth() {
    const est = s.estate;
    const rmb = S.rmb(est.silver, (S.getPack(s.era) || {}).prices);
    const persons = s.persons.map(p =>
      p.rel + "　" + esc(p.name) + "　" + p.age + " 岁").join("<br>");
    const brief = S.eraBrief(s.era, s.year);

    stage.innerHTML =
      '<div class="birth fadein">' +
      '<div class="b-kicker">' + esc(s.eraName) + "　" + esc(S.reignText(s)) + "</div>" +
      '<div class="b-name">' + esc(s.name) + "</div>" +
      '<div class="b-sex">' + (s.sex === "female" ? "女" : "男") + "　·　" + esc(s.place.full) + "</div>" +
      '<div class="b-card">' +
      row("出身", esc(s.clsName) + (function () {
        const h = (s.rank && s.rank !== "白身") ? s.rank : (s.fatherPost || "");
        if (!h) return "";
        const plain = (s.cls === "royal" || s.cls === "noble");
        return "　" + esc(plain ? h : h + "之家");
      })()) +
      row("家产", "田 " + (s.field_wet + s.field_dry) + " 亩（水田 " + s.field_wet + " · 旱地 " + s.field_dry + "）<br>" +
        "宅 " + esc(est.house) + "　奴婢 " + est.servants + " 人<br>" +
        "银 " + fmtMoney(est.silver) + " 两（约合今 " + rmb.toLocaleString() + " 元）<br>" +
        "存粮 " + Math.round(est.grain) + " 石　藏书 " + est.books + " 卷" +
        (s.troops ? "<br>家丁 " + s.troops + " 人（私兵，岁饷自给）" : "") +
        (s.debt ? "<br>欠债 " + s.debt.amt + " 两，月息三分" : "")) +
      row("人脉", esc(est.rel)) +
      row("家中", persons) +
      "</div>" +
      (brief
        ? '<div class="b-era">' +
          '<div class="be-h"><b>' + esc(brief.name) + "</b>" +
          '<span>' + esc(brief.span) + "　都　" + esc(brief.capital) + "</span></div>" +
          '<div class="be-t">' + esc(brief.title) + "</div>" +
          brief.lines.map(l => "<p>" + esc(l) + "</p>").join("") +
          '<button class="be-more" data-act="openRealm">看 舆 图 与 官 制</button>' +
          "</div>"
        : "") +
      '<p class="b-note">' + esc(s.clsNote) +
      (function () {
        const m = (S.getPack(s.era) || {}).money;
        return m && m.note ? "　·　" + esc(m.note) : "";
      })() + "</p>" +
      '<button class="btn btn-main" data-act="wake">睁　眼</button>' +
      "</div>";

    function row(k, v) {
      return '<div class="b-row"><span class="b-k">' + k + '</span><span class="b-v">' + v + "</span></div>";
    }
  }

  /* ── 屏：事件 ─────────────────────────────────── */
  function screenEvent() {
    const ev = s.queue[0];
    if (!ev) { advance(); return; }
    S.peek(s, ev);

    const opts = ev.options.map((o, i) => ({ o: o, i: i })).filter(x => S.optionVisible(x.o, s));
    const body = (ev.text || []).map(p => "<p>" + rich(p) + "</p>").join("");

    stage.innerHTML =
      '<div class="event fadein">' +
      (ui.gap > 0 ? '<div class="e-gap">过 了 ' + S.cnNum(ui.gap) + ' 年</div>' : "") +
      '<div class="e-title">' + esc(ev.title) + "</div>" +
      '<div class="e-body">' + body + "</div>" +
      '<div class="e-opts">' +
      opts.map(x =>
        '<button class="opt" data-act="pick" data-i="' + x.i + '">' +
        '<span class="o-text">' + esc(x.o.text) + "</span>" +
        '<span class="o-hint">' + esc(x.o.hint || "") + "</span>" +
        "</button>"
      ).join("") +
      "</div></div>";
  }

  /* ── 屏：结果 ─────────────────────────────────── */
  function screenResult() {
    const r = ui.result;
    const chips = (r.changes || []).map(c =>
      '<span class="chip ' + (c.v > 0 ? "up" : "down") + '">' + c.label + " " + c.text + "</span>"
    ).join("");

    let roll = "";
    if (r.extra && r.extra.type === "roll") {
      roll = '<div class="e-roll">' + (r.extra.ok ? "成" : "不成") + "</div>";
    }

    stage.innerHTML =
      '<div class="result fadein">' +
      roll +
      (chips ? '<div class="chips">' + chips + "</div>" : '<div class="chips chips-empty">什么也没变</div>') +
      '<p class="r-text">' + rich(r.text || "") + "</p>" +
      '<button class="btn btn-main" data-act="next">' + (s.dead ? "看 此 一 生" : "继　续") + "</button>" +
      "</div>";

    scheduleAuto();
  }

  /* 倍速：结算页停一下，自动进下一条。遇抉择必停。 */
  function scheduleAuto() {
    clearTimeout(autoTimer);
    if (ui.speed <= 1 || !s || s.dead || ui.mode !== "result") return;
    autoTimer = setTimeout(function () {
      if (ui.mode === "result") advance();
    }, Math.round(1250 / ui.speed));
  }

  /* ── 屏：死亡回顾 ─────────────────────────────── */
  /* 判词只有一份，在 engine.js 的 verseOf 里。这里只是转手，
     别再往这里加分支——小游戏用的是同一份。 */
  function verseOf() {
    return S.verseOf(s);
  }

  function screenDead() {
    const born = s.birthYear || (s.year - s.age);
    const age = s.deathYear - born;
    const pct = S.percentile(s);
    const all = s.log || [];
    const logs = all.length > 10
      ? all.slice(0, 3).concat([{ gap: true }]).concat(all.slice(-6))
      : all;

    /* 千局对照：只跑一次，缓存在 ui.sim */
    if (!ui.sim) ui.sim = S.simulate(s, 240);
    const sim = ui.sim;
    const pctOf = n => Math.round((n / sim.total) * 100);

    /* 身份：一生终了时那个抬头 */
    const identity = (function () {
      if (s.ledger && s.ledger.founded) return "开国之君";
      if ((s.grade || 0) > 0) {
        return (GRADE_TXT[s.grade] || "") + (s.post && s.post !== "无" ? "　" + s.post : "");
      }
      if ((s.flags || []).indexOf("jinshi") >= 0) return "进士出身";
      if ((s.flags || []).indexOf("juren") >= 0) return "举人";
      if ((s.flags || []).indexOf("shengyuan") >= 0) return "生员";
      if (s.lineName) return s.lineName;
      return s.clsName;
    })();

    const est = s.estate || {};
    const land = s.field_wet + s.field_dry;
    const might = S.mightOf ? Math.round(S.mightOf(s)) : 0;

    const estateRows = [
      ["田", land ? land + " 亩" + (land ? "（水 " + s.field_wet + " · 旱 " + s.field_dry + "）" : "") : "无寸土"],
      ["宅", est.house || "—"],
      ["银", fmtMoney(s.silver) + " 两"],
      ["粮", Math.round(s.grain) + " 石"],
      ["书", (est.books || 0) + " 卷"],
      ["奴婢", (est.servants || 0) + " 人"]
    ];
    if (s.debt) estateRows.push(["欠债", fmtMoney(s.debt.amt) + " 两（未偿）"]);

    const powerRows = [
      ["家丁", (s.troops || 0) + " 人"],
      ["所辖官军", (s.command || 0) + " 人"],
      ["军心", Math.round(s.morale || 50)],
      ["势　力", might],
      ["品　级", (s.grade || 0) > 0 ? GRADE_TXT[s.grade] : "无"]
    ];

    const kids = (s.persons || []).filter(p => p.role === "child");
    const wife = (s.persons || []).filter(p => p.role === "wife")[0];
    const kin = [];
    if (wife) kin.push(["妻", wife.name, wife.alive ? "在" : "先卒"]);
    kids.forEach(k => kin.push([k.rel || "子", k.name, k.alive ? "存" : "殇"]));

    const bars = [
      ["活到成年", sim.adult],
      ["娶嫁成家", sim.married],
      ["识字", sim.literate],
      ["有功名", sim.exam],
      ["做过官", sim.office],
      ["活过六十", sim.old60],
      ["起过兵", sim.rebel],
      ["坐过天下", sim.founded]
    ].map(b => {
      const w = Math.max(2, pctOf(b[1]));
      return '<div class="gb"><span class="gb-lab">' + b[0] + "</span>" +
        '<span class="gb-bar"><u style="width:' + w + '%"></u></span>' +
        '<span class="gb-v">' + b[1] + " 人</span></div>";
    }).join("");

    stage.innerHTML =
      '<div class="dead fadein">' +
      '<div class="epitaph">' +
      '<div class="ep-name">' + esc(s.name) + "</div>" +
      '<div class="ep-date">' + born + " — " + s.deathYear + "　享年 " + age + "</div>" +
      '<div class="ep-where">' + esc(s.place.full) + "</div>" +
      '<div class="ep-id">' + esc(identity) + "</div>" +
      (s.ledger && s.ledger.founded ? '<div class="ep-fate">开　国</div>' : "") +
      '<div class="ep-cause">' + esc(s.cause) + "</div>" +
      '<div class="ep-verse">' + esc(verseOf()) + "</div>" +
      "</div>" +

      '<div class="sec"><h3>此 一 生</h3>' +
      '<p class="bio">' + esc(S.lifeSummary(s)) + "</p></div>" +

      '<div class="sec"><h3>家 产 · 兵 势</h3>' +
      '<div class="est-grid">' +
      '<dl class="est-dl">' + estateRows.map(r =>
        '<dt>' + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>").join("") + "</dl>" +
      '<dl class="est-dl">' + powerRows.map(r =>
        '<dt>' + r[0] + "</dt><dd>" + esc(String(r[1])) + "</dd>").join("") + "</dl>" +
      "</div></div>" +

      '<div class="sec"><h3>子 嗣</h3>' +
      (kin.length
        ? '<div class="kin">' + kin.map(k =>
            '<span class="kin-i"><em>' + k[0] + "</em>" + esc(k[1]) +
            '<i class="' + (k[2] === "在" || k[2] === "存" ? "ok" : "no") + '">' + k[2] + "</i></span>").join("") + "</div>"
        : '<p class="sec-note">没有留下子女。</p>') +
      "</div>" +

      '<div class="sec"><h3>一 生</h3><div class="timeline">' +
      logs.map(l => l.gap
        ? '<div class="tl tl-gap">……</div>'
        : '<div class="tl"><span class="tl-y">' + l.year + "</span>" + esc(l.text) + "</div>"
      ).join("") +
      "</div></div>" +

      '<div class="sec"><h3>同 代 人</h3>' +
      '<p class="sec-p">你的寿命超过同时代 <b>' + pct + "%</b> 的人。</p>" +
      '<div class="ages">' +
      stat("卒年", age) + stat("存田", land + " 亩") +
      stat("遗银", fmtMoney(s.silver) + " 两") + stat("声望", Math.round(s.fame)) +
      "</div></div>" +

      '<div class="sec"><h3>一 千 个 和 你 一 样 的 人</h3>' +
      '<p class="sec-p">' + esc(s.eraName + "　" + s.clsName + "　" + (s.sex === "female" ? "女" : "男")) +
      "　同一开局，本地重跑 " + sim.total + " 次。</p>" +
      '<div class="gbars">' + bars + "</div>" +
      '<p class="sec-note">中位寿命 ' + sim.medianAge + " 岁。</p>" +
      "</div>" +

      '<div class="dead-btns">' +
      '<button class="btn btn-main" data-act="newrun">再 投 一 次</button>' +
      "</div></div>";

    function stat(k, v) {
      return '<div class="ag"><span>' + k + "</span><b>" + v + "</b></div>";
    }
  }

  /* ── 天下卡 ───────────────────────────────────── */
  const realmEl = document.getElementById("realm");
  let realmOpen = false;

  function openRealm() {
    if (!s) return;
    realmOpen = true;
    ui.rregion = null;
    renderRealm();
  }
  function closeRealm() {
    realmOpen = false;
    if (realmEl) { realmEl.hidden = true; realmEl.innerHTML = ""; }
  }
  function renderRealm() {
    if (!realmOpen || !s || !realmEl) return;
    realmEl.hidden = false;
    const M = S.mapOf(s.era);
    const tabs = ["舆　图", "势　力", "军　备", "官　职", "本　朝"];
    realmEl.innerHTML =
      '<div class="realm-card">' +
      '<div class="r-head"><div>' +
      '<div class="r-title">天　下</div>' +
      '<div class="r-sub">' + esc(s.eraName) + "　" + esc(S.reignText(s)) +
      (M ? "　·　示意舆图，非按里至" : "") + "</div>" +
      "</div><button class=\"r-x\" data-act=\"closeRealm\">×</button></div>" +
      '<div class="r-tabs">' + tabs.map((t, i) =>
        '<button class="r-tab' + (ui.rtab === i ? " on" : "") + '" data-act="rtab" data-i="' + i + '">' + t + "</button>"
      ).join("") + "</div>" +
      '<div class="r-body">' + bodyFor(ui.rtab) + "</div>" +
      "</div>";
  }

  function bodyFor(i) {
    if (i === 1) return tabPower();
    if (i === 2) return tabArmy();
    if (i === 3) return tabOffice();
    if (i === 4) return tabEra();
    return tabMap();
  }

  /* 一、舆图
     图层自下而上：海 → 岸 → 地块 → 山川 → 水 → 长城 → 地名 → 都城 → 事迹 → 你 */
  function fx(v) { return Math.round(v * 10) / 10; }

  /* 山脉画成一串小尖，像旧地图上的山符。尖要疏、要矮，
     密了就成了锯齿波，看不出是山。 */
  function ridgePath(pts) {
    let d = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const n = Math.max(1, Math.round(len / 22));
      for (let k = 0; k < n; k++) {
        const x0 = a[0] + dx * (k / n), y0 = a[1] + dy * (k / n);
        const x1 = a[0] + dx * ((k + 1) / n), y1 = a[1] + dy * ((k + 1) / n);
        const h = Math.min(6.6, 2.4 + (len / n) * 0.2);
        d += "M" + fx(x0) + " " + fx(y0) +
          "L" + fx((x0 + x1) / 2) + " " + fx((y0 + y1) / 2 - h) +
          "L" + fx(x1) + " " + fx(y1);
      }
    }
    return d;
  }

  function tabMap() {
    const M = S.mapOf(s.era);
    if (!M) return '<p class="r-none">此朝舆图尚未录入。</p>';
    const founded = s.ledger && s.ledger.founded;

    /* 本朝画了哪几块 */
    const inEra = {};
    M.regions.forEach(r => { inEra[r.id] = 1; });

    /* 合并块：北直隶＝幽燕＋河北。本朝用了整块，就不再单画那两块；
       没用整块，就一律按拆开的画，整块丢掉，免得叠着描两遍。 */
    const skip = {};
    Object.keys(S.CELL_ALIAS || {}).forEach(k => {
      const parts = S.CELL_ALIAS[k];
      if (inEra[k]) parts.forEach(p => { skip[p] = 1; });
      else skip[k] = 1;
    });

    /* 底图 ＝ 本朝的块 ＋ 版图外的块。两块合起来才是整片大陆，
       少画一块，海岸线就断在那里，露出海色，看着像被刀切了。 */
    const drawn = Object.keys(S.GEO).filter(k => !skip[k]);
    const far = drawn.filter(k => !inEra[k]);
    const landD = drawn.map(k => S.GEO[k].path).join(" ");

    /* 画布按整片大陆收紧；右侧多留一点，海名才不至于被裁掉 */
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    drawn.forEach(k => {
      S.GEO[k].pts.split(" ").forEach(p => {
        const xy = p.split(",");
        const x = Number(xy[0]), y = Number(xy[1]);
        if (isNaN(x) || isNaN(y)) return;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      });
    });
    const padL = 20, padT = 24, padR = 70, padB = 26;
    const vx = x0 - padL, vy = y0 - padT;
    const vw = x1 - x0 + padL + padR, vh = y1 - y0 + padT + padB;
    const vb = fx(vx) + " " + fx(vy) + " " + fx(vw) + " " + fx(vh);

    const out = [];
    out.push('<rect class="sea" x="' + fx(vx) + '" y="' + fx(vy) +
      '" width="' + fx(vw) + '" height="' + fx(vh) + '"></rect>');

    /* 地块。先把整片描一圈岸，再逐块填色：内部接缝的描边会被邻块盖住，
       最后落在纸上的只剩最外一圈海岸。 */
    out.push('<g class="land" filter="url(#rsh)">');
    out.push('<path class="coast" d="' + landD + '"></path>');
    far.forEach(k => out.push('<path class="rg rg-void" d="' + S.GEO[k].path +
      '" data-act="region" data-id="' + k + '"></path>'));
    M.regions.forEach(r => {
      const own = founded ? "me" : S.regionOwner(s.era, r, s.year);
      out.push('<path class="rg rg-' + own + (ui.rregion === r.id ? " on" : "") +
        '" d="' + (S.GEO[r.id] || {}).path +
        '" data-act="region" data-id="' + r.id + '"></path>');
    });
    out.push("</g>");

    /* 山川 */
    const ter = [];
    (S.MOUNTAIN || []).forEach(m => ter.push('<path class="mt" d="' + ridgePath(m.p) + '"></path>'));
    (S.DESERT || []).forEach(m => ter.push('<path class="ds" d="M' +
      m.p.map(p => p[0] + " " + p[1]).join("L") + '"></path>'));
    out.push('<g class="ter">' + ter.join("") + "</g>");

    /* 水：先一道浅底，再一道细线 */
    const wv = [];
    M.water.forEach(w => {
      if (w.id === "yunhe") wv.push('<path class="rw dash" d="' + w.d + '"></path>');
      else wv.push('<path class="rw-b" d="' + w.d + '"></path><path class="rw" d="' + w.d + '"></path>');
    });
    out.push('<g class="wat">' + wv.join("") + "</g>");

    (M.walls || []).forEach(w => out.push('<path class="rwall" d="' + w.d + '"></path>'));

    /* 版图外的地名：淡一档，只为让人看出界外是何处 */
    out.push('<g class="flabs">' + far.map(k => {
      const nm = (S.CELL_FAR || {})[k];
      if (!nm) return "";
      const c = S.GEO[k].c;
      return '<text class="rf-lab" x="' + c[0] + '" y="' + c[1] +
        '" text-anchor="middle">' + esc(nm) + "</text>";
    }).join("") + "</g>");

    /* 政区名 */
    out.push('<g class="labs">' + M.regions.map(r =>
      '<text class="rg-lab" x="' + r.label[0] + '" y="' + r.label[1] + '" text-anchor="middle">' +
      esc(r.short) + "</text>").join("") + "</g>");

    /* 都城。方块底下垫一块纸色，压在政区名上也认得出。
       但名字重复的就别描第二遍 —— 北宋「开封」既是政区名又是都城名，
       两处叠着写，字挤成一团。改成一看见近旁有同名政区名，就只画方块。 */
    out.push('<g class="caps">' + M.capitals.map(function (c) {
      const dup = M.regions.some(function (r) {
        return r.short === c.name &&
          Math.abs(r.label[0] - c.x) < 18 && Math.abs(r.label[1] - c.y) < 28;
      });
      return '<g class="cap' + (c.main ? " main" : "") + '">' +
        '<circle class="ch" cx="' + c.x + '" cy="' + c.y + '" r="8"></circle>' +
        '<rect x="' + (c.x - 4.5) + '" y="' + (c.y - 4.5) + '" width="9" height="9"></rect>' +
        (dup ? "" :
          '<text x="' + (c.lx || (c.x + 9)) + '" y="' + (c.ly || (c.y + 4)) +
          '" text-anchor="' + (c.anchor || "middle") + '">' + esc(c.name) + "</text>") +
        "</g>";
    }).join("") + "</g>");

    /* 事迹 */
    out.push('<g class="mks">' + S.activeMarks(s.era, s.year).map(m =>
      '<g class="mk"><circle cx="' + m.x + '" cy="' + m.y + '" r="9"></circle>' +
      '<text x="' + m.x + '" y="' + (m.y + 3.2) + '" text-anchor="middle">' + esc(m.name) +
      "</text></g>").join("") + "</g>");

    /* 你在何处 */
    /* 出生地记的是"路/道/省 + 府 + 县"，政区图上记的是"府 + 简称"，
       两边对不上就点不出来：南宋临安、元朝大都路都是这么丢的。
       所以按府名、简称、前缀三个口径都试一次，再拿府名兜底。 */
    const P = s.place.prov, PF = s.place.pref;
    const myReg = M.regions.filter(r =>
      r.name === P || r.short === P || r.name.indexOf(P) === 0 || P.indexOf(r.name) === 0 ||
      (PF && (r.name === PF || r.name.indexOf(PF) === 0))
    )[0];
    if (myReg) {
      const px = myReg.label[0], py = myReg.label[1] + 13;
      out.push('<g class="you"><circle cx="' + px + '" cy="' + py + '" r="3.4"></circle>' +
        '<text x="' + (px + 6) + '" y="' + (py + 3.6) + '">你</text></g>');
    }

    /* 海名与注记。逐字摆，不转整段 —— 转过的字容易贴着画布边被切掉半边。 */
    const sx = fx(x1 + 34), sy = fx(vy + 132);
    out.push('<text class="sea-lab" x="' + sx + '" y="' + sy + '">' +
      '<tspan x="' + sx + '" dy="0">东</tspan>' +
      '<tspan x="' + sx + '" dy="17">海</tspan></text>');
    out.push('<text class="geo-note" x="' + fx(vx + 8) + '" y="' + fx(vy + vh - 8) +
      '">示意舆图　不按里至</text>');

    const sel = ui.rregion ? M.regions.filter(r => r.id === ui.rregion)[0] : null;
    const farSel = (!sel && ui.rregion && (S.CELL_FAR || {})[ui.rregion]) ? ui.rregion : null;
    let info = '<div class="r-info"><span class="ri-hint">点一处，看一处。方者为京师，朱圈为当日在闹事的地方。</span></div>';
    if (sel) {
      const own = founded ? "me" : S.regionOwner(s.era, sel, s.year);
      /* 他国之地，能叫出名字就叫名字；叫不出，才说"不在朝廷之手" */
      const fo = (own === "court" || own === "me") ? null
        : S.factionsAt(s.era, s.year).filter(f => f.id === own)[0];
      const owner = own === "me" ? "你" : own === "court" ? "朝廷"
        : (fo ? esc(fo.name) : "不在朝廷之手");
      info = '<div class="r-info"><b>' + esc(sel.name) + "</b>" +
        '<span class="ri-own">归　' + owner + "</span>" +
        "<p>" + esc(sel.note) + "</p></div>";
    } else if (farSel) {
      info = '<div class="r-info"><b>' + esc(S.CELL_FAR[farSel]) + "</b>" +
        '<span class="ri-own">不　在　版　图</span>' +
        "<p>此处在" + esc(s.eraName) + "的郡县之外，只标个大概，不注州县。</p></div>";
    }

    return '<svg class="r-map" viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
      '<defs><filter id="rsh" x="-12%" y="-12%" width="124%" height="124%">' +
      '<feDropShadow dx="0" dy="3" stdDeviation="3.4" flood-color="#3a3226" flood-opacity="0.15"/>' +
      "</filter></defs>" +
      out.join("") + "</svg>" +
      '<div class="r-legend">' +
      '<span><i class="lg lg-court"></i>朝廷所辖</span>' +
      '<span><i class="lg lg-other"></i>不在朝廷之手</span>' +
      '<span><i class="lg lg-me"></i>你的</span>' +
      '<span><i class="lg lg-void"></i>版图之外</span>' +
      '<span class="lg-t">□ 京师　△ 山　～ 水　● 你</span>' +
      "</div>" + info;
  }

  /* 五、本朝
     把这一朝的来龙去脉分段摆出来，人活在哪一段，那一段就点出来。
     读一遍，就知道自己撞上的是什么时候。 */
  function tabEra() {
    const b = S.bookOf(s.era);
    if (!b) return '<p class="r-none">此朝情形尚未录入。</p>';
    const cur = S.eraBrief(s.era, s.year);
    const rows = b.parts.map(p => {
      const now = cur && p.from === cur.from && p.to === cur.to;
      return '<div class="ep' + (now ? " now" : "") + '">' +
        '<div class="ep-h"><b>' + esc(p.title) + "</b>" +
        "<span>" + p.from + " — " + p.to + "</span></div>" +
        p.lines.map(l => "<p>" + esc(l) + "</p>").join("") +
        (now ? '<i class="ep-now">你眼下就在这一段</i>' : "") +
        "</div>";
    }).join("");

    return '<p class="r-lead">' + esc(b.name) + "　" + esc(b.span) +
      "　都　" + esc(b.capital) +
      (b.founder ? "　开国　" + esc(b.founder) : "") +
      "　钱曰" + esc(b.money) + "</p>" +
      '<div class="ep-list">' + rows + "</div>" +
      (b.taxNote ? '<p class="r-lead ep-t">赋役：' + esc(b.taxNote) + "</p>" : "");
  }

  /* 二、势力 */
  function tabPower() {
    const fs = S.factionsAt(s.era, s.year);
    if (!fs.length) return '<p class="r-none">此朝势力表尚未录入。</p>';
    const myMight = S.mightOf(s);
    const rows = fs.map(f =>
      '<div class="pw">' +
      '<div class="pw-h"><b>' + esc(f.name) + "</b>" +
      '<span class="pw-k">' + esc(f.kind) + "</span>" +
      '<span class="pw-v">' + f.power + "</span></div>" +
      '<div class="pw-bar"><u class="' + (f.color === "zhu" ? "zhu" : "") + '" style="width:' + f.power + '%"></u></div>' +
      '<p class="pw-d">' + esc(f.desc) + "</p></div>"
    ).join("");

    return '<p class="r-lead">此时天下，说话算数的有这几家。数为其势力，非兵数。</p>' +
      '<div class="pw-list">' + rows + "</div>" +
      '<div class="r-you">' +
      "<b>你</b><span>势力 " + myMight + "　·　兵 " + S.forceOf(s) + " 人</span>" +
      '<div class="pw-bar"><u class="me" style="width:' + Math.min(100, myMight) + '%"></u></div>' +
      '<p class="pw-d">' + (s.ledger && s.ledger.founded
        ? "天下是你的了。这些数字从此都听你的。"
        : (S.canRebel(s)
          ? "你手里的兵，已经够说那句话了。"
          : "势力过 50、兵过一千二，才够资格想起那句话（无官者须两千二）。")) + "</p></div>";
  }

  /* 三、军备 */
  function tabArmy() {
    const a = S.armyAt(s.era, s.year);
    if (!a) return '<p class="r-none">此朝军备表尚未录入。</p>';
    const wan = n => (Math.round(n * 10) / 10).toFixed(1);
    const segs = a.segs;
    const bar = segs.map((x, i) =>
      '<i class="ab ab-' + ("abcd"[i] || "d") +
      '" style="width:' + (a.total ? x.v / a.total * 100 : 0) + '%"></i>').join("");
    const list = segs.map(x =>
      '<div class="am"><span class="am-k">' + esc(x.k) + "</span>" +
      '<span class="am-v">' + wan(x.v) + " 万</span>" +
      '<span class="am-n">' + esc(x.n) + "</span></div>").join("");

    const mine = (s.troops || 0) + (s.command || 0);
    const all = a.total * 10000;
    const pct = all ? (mine / all * 100) : 0;
    const myBar = mine ? Math.max(2, Math.min(100, pct * 20)) : 0;

    return '<p class="r-lead">天下兵额，按当时实数估。' + s.year + " 年，合计约 " + wan(a.total) + " 万人。</p>" +
      '<div class="abar">' + bar + "</div>" +
      '<div class="am-list">' + list + "</div>" +
      '<div class="r-you"><b>你</b>' +
      '<span>私兵 ' + (s.troops || 0) + " 人　·　所辖官军 " + (s.command || 0) +
      " 人　·　军心 " + Math.round(s.morale || 50) + "</span>" +
      '<div class="pw-bar"><u class="me" style="width:' + myBar + '%"></u></div>' +
      '<p class="pw-d">' + (mine
        ? "你的兵占天下兵力的 " + pct.toFixed(2) + "%。" +
          ((s.troops || 0) > 0 ? "家丁是你自己养的，饷从你的银子里出；官军是朝廷的，饷断了就散。" : "")
        : "你手里没有兵。养兵要钱，也要一个由头。") + "</p></div>";
  }

  /* 四、官职 */
  function tabOffice() {
    const O = S.officesOf(s.era);
    if (!O || (!O.central.length && !O.military.length)) {
      return '<p class="r-none">此朝官制尚未录入。</p>';
    }
    const mine = (s.post || "") + (s.rank || "");
    const hit = o => mine && mine !== "无" &&
      (mine.indexOf(o.name) >= 0 || o.name.indexOf(mine) >= 0);

    const block = (title, arr) => '<div class="of-sec"><h4>' + title + "</h4><ul>" +
      arr.map(o => '<li class="' + (hit(o) ? "on" : "") + '">' +
        '<span class="of-n">' + esc(o.name) + "</span>" +
        '<span class="of-d">' + esc(o.note) + "</span></li>").join("") +
      "</ul></div>";

    return '<p class="r-lead">你现在：' + esc(s.post && s.post !== "无" ? s.post : "无官职") +
      ((s.grade || 0) > 0 ? "（" + (GRADE_TXT[s.grade] || "") + "）" : "") +
      (s.ledger && s.ledger.founded ? "　·　今上" : "") + "</p>" +
      '<div class="of-grid">' +
      block("中 枢", O.central) +
      block("地 方", O.local) +
      block("武 职", O.military) +
      "</div>" +
      '<p class="r-foot">品级不写在名上：官高未必权重，位卑亦可持柄。表中所列，是这一朝最有实权的位子。</p>';
  }

  /* ── 主渲染 ───────────────────────────────────── */
  function render() {
    renderTop();
    renderStats();
    if (ui.mode === "welcome") return screenWelcome();
    if (ui.mode === "eras") return screenEras();
    if (ui.mode === "draw") return screenDraw();
    if (ui.mode === "birth") return screenBirth();
    if (ui.mode === "event") return screenEvent();
    if (ui.mode === "result") return screenResult();
    if (ui.mode === "dead") return screenDead();
  }

  /* ── 流程 ─────────────────────────────────────── */
  function startNew(forceEra) {
    S.clear();
    s = S.newRun(undefined, forceEra || null);
    ui.sim = null;
    ui.gap = 0;
    ui.mode = "draw";
    render();
  }

  /* 抽到下一条真事件为止。平年不占一屏——否则一局要有十几次点"过下去"。 */
  function pullNext() {
    const y0 = s.year;
    let guard = 0;
    while (!s.dead && guard++ < 90) {
      if (s.queue.length) {
        if (s.queue[0].sys) { s.queue.shift(); continue; }
        break;
      }
      S.nextTurn(s);
    }
    ui.gap = s.dead ? 0 : Math.max(0, s.year - y0);
    return !s.dead && s.queue.length > 0;
  }

  /* 从出生卡进入第一个回合 */
  function wake() {
    pullNext();
    ui.mode = s.dead ? "dead" : "event";
    render();
    S.save(s);
  }

  /* 结果页之后 */
  function advance() {
    if (s.dead) { ui.mode = "dead"; render(); return; }
    pullNext();
    if (s.dead) { ui.mode = "dead"; render(); return; }
    if (!s.queue.length) { ui.mode = "dead"; render(); return; }
    ui.mode = "event";
    render();
    S.save(s);
  }

  function pick(i) {
    clearTimeout(autoTimer);
    const ev = s.queue[0];
    const r = S.choose(s, i, ev);
    s.queue.shift();
    ui.result = r;
    ui.gap = 0;
    if (s.dead) ui.sim = null;
    ui.mode = "result";
    render();
    S.save(s);
  }

  /* ── 事件绑定 ─────────────────────────────────── */
  document.addEventListener("click", function (e) {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const act = t.getAttribute("data-act");

    if (act === "newrun") return startNew();
    if (act === "eras") { ui.mode = "eras"; return render(); }
    if (act === "pickera") return startNew(t.getAttribute("data-id"));
    if (act === "welcome") { ui.mode = "welcome"; return render(); }
    if (act === "resume") {
      const saved = S.load();
      if (!saved) return startNew();
      s = saved; ui.sim = null;
      ui.mode = s.dead ? "dead" : (s.queue.length ? "event" : "birth");
      render();
      return;
    }
    if (act === "wake") return wake();
    if (act === "pick") return pick(parseInt(t.getAttribute("data-i"), 10));
    if (act === "next") return advance();
    if (act === "openRealm") return openRealm();
    if (act === "speed") {
      ui.speed = ui.speed === 1 ? 2 : ui.speed === 2 ? 4 : 1;
      renderTop();
      if (ui.mode === "result") scheduleAuto();
      return;
    }
    if (act === "closeRealm") return closeRealm();
    if (act === "rtab") {
      ui.rtab = parseInt(t.getAttribute("data-i"), 10);
      ui.rregion = null;
      return renderRealm();
    }
    if (act === "region") {
      const id = t.getAttribute("data-id");
      ui.rregion = ui.rregion === id ? null : id;
      return renderRealm();
    }
  });

  /* 点空白处关闭天下卡 */
  document.addEventListener("click", function (e) {
    if (e.target === realmEl) closeRealm();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeRealm();
  });

  /* 术语小注：点一下展开 */
  document.addEventListener("click", function (e) {
    const em = e.target.closest(".term");
    if (!em) return;
    em.classList.toggle("open");
  });

  /* 启动 */
  render();

  /* ── 调试入口（供自动化验收）─────────────────────
   * index.html?seed=123&auto=8   自动玩 8 回合
   * index.html?screen=birth      直接看出生卡
   */
  window.SHZ_UI = {
    get state() { return s; },
    render: render,
    play: function (turns, seed, era) {
      S.clear();
      s = S.newRun(seed || 1, era || null);
      ui.sim = null;
      ui.gap = 0;
      let steps = 0;
      while (!s.dead && steps < (turns || 6)) {
        if (!pullNext()) break;
        const ev = s.queue.shift();
        const opts = ev.options.map((o, i) => ({ o: o, i: i }))
          .filter(x => S.optionVisible(x.o, s));
        if (opts.length) S.choose(s, opts[0].i, ev);
        steps++;
      }
      if (!s.dead) pullNext();
      ui.mode = s.dead ? "dead" : "event";
      render();
      return s;
    },
    /* 把局面推到"够格起兵"，用来验收那一屏 */
    forceRebel: function (era) {
      if (!s) s = S.newRun(1, era || null);
      s.troops = 2400; s.command = 4000; s.grade = 2;
      s.fame = 62; s.age = 34;
      const u = (S.bookOf(s.era) || {}).unrest;
      s.year = (u && u.length ? u[u.length - 1][0] + 1 : (s.birthYear || s.year) + 34);
      s.flags = s.flags.filter(f => f !== "rebelAsked");
      s.turnIndex = Math.max(1, s.turnIndex);
      S.nextTurn(s);
      ui.mode = "event";
      render();
      return s;
    },
    /* 验收"坐过天下"的结局页 */
    forceFound: function (era) {
      if (!s) s = S.newRun(1, era || null);
      s.birthYear = s.birthYear || s.year;
      s.year = s.birthYear + 61;
      s.age = 61;
      s.dead = true; s.phase = "dead";
      s.deathYear = s.year; s.cause = "中风";
      s.ledger.founded = true; s.ledger.rebelWin = true;
      if (s.flags.indexOf("rebelWin") < 0) s.flags.push("rebelWin");
      s.grade = 0; s.fame = 100;
      s.troops = 3000; s.command = 6000; s.silver = 8200;
      s.field_wet = 240; s.field_dry = 120;
      s.log = [
        { year: s.birthYear + 22, age: 22, text: "招兵·报名，投军" },
        { year: s.birthYear + 29, age: 29, text: "参将·接印，先点兵" },
        { year: s.birthYear + 36, age: 36, text: "授印·受印" },
        { year: s.birthYear + 39, age: 39, text: "那句话·起兵" },
        { year: s.birthYear + 40, age: 40, text: "入京师" },
        { year: s.birthYear + 42, age: 42, text: "三年·封侯，收其兵" },
        { year: s.birthYear + 48, age: 48, text: "九年·立长" }
      ];
      ui.sim = null;
      ui.mode = "dead";
      render();
      return s;
    }
  };

  (function boot() {
    const q = new URLSearchParams(location.search);
    const seed = parseInt(q.get("seed") || "0", 10);
    const eraQ = q.get("era") || null;
    let started = false;
    if (q.get("screen") === "eras") {
      ui.mode = "eras";
      render();
      started = false;
    } else if (q.get("screen") === "birth") {
      S.clear();
      s = S.newRun(seed || 7, eraQ);
      ui.mode = "birth";
      render();
      started = true;
    } else if (q.get("rebel")) {
      window.SHZ_UI.forceRebel(eraQ);
      started = true;
    } else if (q.get("founded")) {
      window.SHZ_UI.forceFound(eraQ);
      started = true;
    } else if (q.get("auto")) {
      window.SHZ_UI.play(parseInt(q.get("auto"), 10) || 8, seed || 3, eraQ);
      started = true;
    } else if (q.get("wake")) {
      S.clear();
      s = S.newRun(seed || 3, eraQ);
      ui.sim = null;
      wake();
      started = true;
    }
    if (started && q.get("realm")) {
      if (q.get("troops")) s.troops = parseInt(q.get("troops"), 10) || 0;
      if (q.get("cmd")) s.command = parseInt(q.get("cmd"), 10) || 0;
      if (q.get("grade")) s.grade = parseInt(q.get("grade"), 10) || 0;
      if (q.get("year")) s.year = parseInt(q.get("year"), 10) || s.year;
      ui.rtab = parseInt(q.get("tab") || "0", 10) || 0;
      renderStats();
      openRealm();
      if (q.get("region")) { ui.rregion = q.get("region"); renderRealm(); }
    }
  })();
})();
