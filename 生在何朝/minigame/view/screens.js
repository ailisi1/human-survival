/* 生在何朝 · 小游戏七屏
 * 与网页版 js/ui.js 逐屏对应，只换表现层：DOM 换成 canvas 排版。
 */
(function (G) {
  "use strict";

  var S = G.SHZ;
  var K = G.KIT;
  var C = K.C;
  var SC = {};

  function money(n) { return (Math.round(n * 100) / 100).toFixed(2); }

  /* 先换占位符，再拆行内样式。顺序不能反：{place} 里可能带括号 */
  function rich(str, s) { return K.parseRich(K.subst(str, s)); }

  /* ── 屏：欢迎 ─────────────────────────────── */
  SC.welcome = function (p, app) {
    var saved = S.load();
    p.space(Math.round(p.H * 0.14));
    p.text("生", { size: 54, align: "center", color: C.zhu, lh: 64 });
    p.space(18);
    p.text("生 在 何 朝", { size: 27, align: "center", lh: 40 });
    p.space(14);
    p.text("秦至清，十九个政权，二千一百余年。你无法选择生于哪朝、哪地、哪户人家。",
      { size: 14.5, align: "center", color: C.ink2, lh: 26 });
    p.space(6);
    p.text("睁眼之后，把这一生过完。", { size: 14.5, align: "center", color: C.ink2, lh: 26 });
    p.space(40);
    p.button("投　胎", { main: true, h: 58 }, function () { app.startNew(null); });
    p.space(12);
    if (saved) {
      p.button("继续上次", { h: 48 }, function () { app.resume(); });
      p.space(12);
    }
    p.button("看　十　九　朝", { h: 48 }, function () { app.go("eras"); });
    p.space(22);
    p.text("一局约三十次抉择 · 结局不可回退", { size: 12.5, align: "center", color: C.ink3, lh: 22 });
  };

  /* ── 屏：十九朝 ───────────────────────────── */
  SC.eras = function (p, app) {
    p.text("十 九 朝", { size: 22, align: "center", mt: 6, lh: 34 });
    p.text("点「生于此朝」，即从这一朝里随机抽年份、抽地方、抽家世。此处只是让你先看看都有哪些世道。",
      { size: 13, color: C.ink3, mt: 8, mb: 6, lh: 23 });

    S.ERAS.forEach(function (e) {
      var b = S.bookOf(e.id);
      var pack = S.getPack(e.id);
      if (!b || !pack) return;
      var first = b.parts[0] || { title: "", lines: [] };
      var yr = function (v) { return v < 0 ? "前 " + (-v) : String(v); };

      p.hr({ mt: 14, mb: 8 });
      p.text(e.name, { size: 18, lh: 30 });
      p.text(yr(e.from) + " — " + yr(e.to) + "　·　都 " + e.capital,
        { size: 13, color: C.ink3, lh: 22 });
      p.text(first.title, { size: 14, color: C.ink2, mt: 4, lh: 24 });
      p.text(first.lines[0] || "", { size: 13, color: C.ink3, lh: 22 });
      p.text(b.regions.length + " 区 · " + b.factions.length + " 家势力 · " + pack.events.length + " 条事件",
        { size: 12, color: C.ink3, mt: 4, lh: 20 });
      (function (id) {
        p.button("生 于 此 朝", { h: 42, mt: 6, mb: 4, size: 14.5 }, function () { app.startNew(id); });
      })(e.id);
    });

    p.space(20);
    p.button("回　去", { h: 48 }, function () { app.go("welcome"); });
  };

  /* ── 屏：抽签 ─────────────────────────────── */
  var DRAW_LINES = ["抽 朝 代", "抽 年 份", "抽 地 方", "抽 家 世"];
  SC.draw = function (p, app, step) {
    p.space(Math.round(p.H * 0.3));
    DRAW_LINES.forEach(function (t, i) {
      var on = i < step;
      p.text(t, {
        size: 20, align: "center", lh: 52,
        color: on ? C.ink : C.ink3
      });
    });
  };

  /* ── 屏：出生卡 ───────────────────────────── */
  SC.birth = function (p, app) {
    var s = app.s;
    var est = s.estate;
    var rmb = S.rmb(est.silver, (S.getPack(s.era) || {}).prices);
    var brief = S.eraBrief(s.era, s.year);

    p.space(10);
    p.text(s.eraName + "　" + S.reignText(s), { size: 13, color: C.ink3, lh: 24 });
    p.text(s.name, { size: 30, lh: 46, mt: 2 });
    p.text((s.sex === "female" ? "女" : "男") + "　·　" + s.place.full, { size: 14, color: C.ink2, lh: 24 });
    p.hr({ mt: 14, mb: 6 });

    /* 出身 */
    var h = (s.rank && s.rank !== "白身") ? s.rank : (s.fatherPost || "");
    var plain = (s.cls === "royal" || s.cls === "noble");
    p.kv("出身", s.clsName + (h ? "　" + (plain ? h : h + "之家") : ""), { size: 16, lh: 28 });

    /* 家产 */
    var land = "田 " + (s.field_wet + s.field_dry) + " 亩（水田 " + s.field_wet + " · 旱地 " + s.field_dry + "）";
    p.kv("家产", land, { size: 16, lh: 28 });
    p.kv("", "宅 " + est.house + "　奴婢 " + est.servants + " 人", { size: 16, lh: 26 });
    p.kv("", "银 " + money(est.silver) + " 两（约合今 " + rmb.toLocaleString() + " 元）", { size: 16, lh: 26 });
    p.kv("", "存粮 " + Math.round(est.grain) + " 石　藏书 " + est.books + " 卷", { size: 16, lh: 26 });
    if (s.troops) p.kv("", "家丁 " + s.troops + " 人（私兵，岁饷自给）", { size: 16, lh: 26 });
    if (s.debt) p.kv("", "欠债 " + s.debt.amt + " 两，月息三分", { size: 16, lh: 26 });

    p.kv("人脉", est.rel, { size: 16, lh: 28, mt: 4 });

    p.kv("家中", s.persons[0].rel + "　" + s.persons[0].name + "　" + s.persons[0].age + " 岁",
      { size: 16, lh: 26, mt: 4 });
    for (var i = 1; i < s.persons.length; i++) {
      var ps = s.persons[i];
      p.kv("", ps.rel + "　" + ps.name + "　" + ps.age + " 岁", { size: 16, lh: 26 });
    }

    if (brief) {
      p.hr({ mt: 16, mb: 10 });
      p.text(brief.name, { size: 16, lh: 28 });
      p.text(brief.span + "　都　" + brief.capital, { size: 13, color: C.ink3, lh: 22 });
      p.text(brief.title, { size: 14.5, mt: 6, lh: 26 });
      brief.lines.forEach(function (l) {
        p.text(l, { size: 14, color: C.ink2, lh: 24 });
      });
      p.button("看 舆 图 与 官 制", { h: 42, mt: 10, size: 14.5 }, function () { app.openRealm(0); });
    }

    p.space(14);
    var m = (S.getPack(s.era) || {}).money;
    p.text(s.clsNote + (m && m.note ? "　·　" + m.note : ""), { size: 12.5, color: C.ink3, lh: 21 });
    p.space(14);
    p.button("睁　眼", { main: true, h: 56 }, function () { app.wake(); });
  };

  /* ── 屏：回合 ─────────────────────────────── */
  SC.event = function (p, app) {
    var s = app.s;
    var ev = s.queue[0];
    if (!ev) { app.advance(); return; }
    S.peek(s, ev);

    if (app.gap > 0) {
      p.text("过 了 " + S.cnNum(app.gap) + " 年", { size: 12.5, align: "center", color: C.ink3, lh: 26, mt: 6 });
    }
    p.text(ev.title || "", { size: 18, lh: 32, mt: 6 });
    p.space(6);
    (ev.text || []).forEach(function (par) {
      p.text(rich(par, s), { size: 16, lh: 28, color: C.ink });
      p.space(8);
    });
    p.space(10);

    var vis = [];
    ev.options.forEach(function (o, i) {
      if (S.optionVisible(o, s)) vis.push({ o: o, i: i });
    });
    vis.forEach(function (x) {
      option(p, x.o, s, function () { app.pick(x.i); });
    });
  };

  /* 选项：正文 + 一行小字提示，描边不填充——纸上的字，不该压着一块色 */
  function option(p, o, s, act) {
    var size = 15.5;
    var font = K.font(size);
    var hintFont = K.font(12.5);
    var innerW = p.x1 - p.x0 - 28;
    var lines = rich(o.text, s);
    var wrapped = wrapCount(p.ctx, lines, font, innerW);
    var hintLines = o.hint ? wrapCount(p.ctx, rich(o.hint, s), hintFont, innerW) : 0;
    var h = 18 + wrapped * 26 + (hintLines ? hintLines * 20 + 4 : 0) + 14;

    p.box(h, function (ctx, y) {
      ctx.strokeStyle = C.line2;
      ctx.lineWidth = 1;
      K.roundRect(ctx, p.x0 + 0.5, y + 6.5, p.x1 - p.x0 - 1, h - 13, 2);
      ctx.stroke();

      var yy = y + 15;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      drawWrapped(ctx, rich(o.text, s), p.x0 + 14, yy, innerW, font, size, 26, C.ink);
      yy += wrapped * 26;
      if (hintLines) {
        yy += 4;
        drawWrapped(ctx, rich(o.hint, s), p.x0 + 14, yy, innerW, hintFont, 12.5, 20, C.ink3);
      }
    }, act);
    p.space(10);
  }

  /* 数行数：与 kit 的折行同一套规则，只是不落笔 */
  function wrapCount(ctx, runs, font, maxW) {
    var n = 0, w = 0;
    var HEAD = "，。、；：？！）」』】〉》”’,.;:?!)]}%";
    for (var r = 0; r < runs.length; r++) {
      var s = runs[r].t || "";
      for (var i = 0; i < s.length; i++) {
        var cw = K.strW(ctx, font, s[i]);
        if (w + cw > maxW && w > 0) {
          if (HEAD.indexOf(s[i]) >= 0) { w += cw; continue; }
          n++; w = 0;
        }
        w += cw;
      }
    }
    return n + 1;
  }

  function drawWrapped(ctx, runs, x, y, maxW, font, size, lh, color) {
    var lineW = 0, cx = x, cy = y;
    var HEAD = "，。、；：？！）」』】〉》”’,.;:?!)]}%";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    for (var r = 0; r < runs.length; r++) {
      var s = runs[r].t || "";
      for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        var cw = K.strW(ctx, font, ch);
        if (lineW + cw > maxW && lineW > 0) {
          if (HEAD.indexOf(ch) < 0) { cx = x; cy += lh; lineW = 0; }
        }
        ctx.font = font;
        ctx.fillStyle = runs[r].term ? C.zhu : color;
        ctx.fillText(ch, cx, cy);
        cx += cw; lineW += cw;
      }
    }
  }

  /* ── 屏：结果 ─────────────────────────────── */
  SC.result = function (p, app) {
    var r = app.result || {};
    var s = app.s;

    p.space(20);
    if (r.extra && r.extra.type === "roll") {
      p.text(r.extra.ok ? "成" : "不成", { size: 24, align: "center", color: r.extra.ok ? C.qing : C.zhu, lh: 44 });
    }

    var chips = (r.changes || []).map(function (c) {
      return { label: c.label + " " + c.text, up: c.v > 0 };
    });
    if (chips.length) p.chips(chips);
    else p.text("什么也没变", { size: 13, color: C.ink3, align: "center", lh: 24 });

    p.space(12);
    p.text(rich(r.text || "", s), { size: 16, lh: 29 });
    p.space(24);
    p.button(s.dead ? "看 此 一 生" : "继　续", { main: true, h: 56 }, function () { app.advance(); });
  };

  /* ── 屏：终局 ─────────────────────────────── */
  SC.dead = function (p, app) {
    var s = app.s;
    var born = s.birthYear || (s.year - s.age);
    var age = s.deathYear - born;
    var pct = S.percentile(s);

    if (!app.sim) app.sim = S.simulate(s, 240);
    var sim = app.sim;
    var pctOf = function (n) { return Math.round((n / sim.total) * 100); };

    /* 抬头 */
    var identity = (function () {
      if (s.ledger && s.ledger.founded) return "开国之君";
      if ((s.grade || 0) > 0) return (S.GRADE_TXT[s.grade] || "") + (s.post && s.post !== "无" ? "　" + s.post : "");
      if ((s.flags || []).indexOf("jinshi") >= 0) return "进士出身";
      if ((s.flags || []).indexOf("juren") >= 0) return "举人";
      if ((s.flags || []).indexOf("shengyuan") >= 0) return "生员";
      if (s.lineName) return s.lineName;
      return s.clsName;
    })();

    p.space(14);
    p.text(s.name, { size: 28, align: "center", lh: 44 });
    p.text(born + " — " + s.deathYear + "　享年 " + age, { size: 13, align: "center", color: C.ink2, lh: 24 });
    p.text(s.place.prov + " " + s.place.pref + " " + s.place.cty, { size: 13, align: "center", color: C.ink3, lh: 22 });
    p.space(8);
    p.text(identity, { size: 19, align: "center", lh: 32 });
    if (s.ledger && s.ledger.founded) {
      p.text("开　国", { size: 14.5, align: "center", color: C.zhu, lh: 26 });
    }
    p.text(s.cause, { size: 13, align: "center", color: C.ink3, lh: 24 });
    p.space(10);
    p.text(app.verse(s), { size: 14, align: "center", color: C.ink2, lh: 25 });

    /* 此一生 */
    p.hr({ mt: 20, mb: 8 });
    p.text("此 一 生", { size: 15.5, lh: 28 });
    p.text(S.lifeSummary(s), { size: 14.5, lh: 27, color: C.ink2 });

    /* 家产 · 兵势 */
    var est = s.estate || {};
    var land = s.field_wet + s.field_dry;
    var might = S.mightOf ? Math.round(S.mightOf(s)) : 0;
    p.hr({ mt: 18, mb: 8 });
    p.text("家 产 · 兵 势", { size: 15.5, lh: 28 });
    p.kv("田", land ? land + " 亩（水 " + s.field_wet + " · 旱 " + s.field_dry + "）" : "无寸土", { lh: 25, size: 14.5 });
    p.kv("宅", est.house || "—", { lh: 25, size: 14.5 });
    p.kv("银", money(s.silver) + " 两", { lh: 25, size: 14.5 });
    p.kv("粮", Math.round(s.grain) + " 石", { lh: 25, size: 14.5 });
    p.kv("书", (est.books || 0) + " 卷", { lh: 25, size: 14.5 });
    p.kv("奴婢", (est.servants || 0) + " 人", { lh: 25, size: 14.5 });
    if (s.debt) p.kv("欠债", money(s.debt.amt) + " 两（未偿）", { lh: 25, size: 14.5, color: C.zhu });
    p.space(4);
    p.kv("家丁", (s.troops || 0) + " 人", { lh: 25, size: 14.5 });
    p.kv("所辖官军", (s.command || 0) + " 人", { lh: 25, size: 14.5 });
    p.kv("军心", String(Math.round(s.morale || 50)), { lh: 25, size: 14.5 });
    p.kv("势力", String(might), { lh: 25, size: 14.5 });
    p.kv("品级", (s.grade || 0) > 0 ? S.GRADE_TXT[s.grade] : "无", { lh: 25, size: 14.5 });

    /* 子嗣 */
    var kids = (s.persons || []).filter(function (x) { return x.role === "child"; });
    var wife = (s.persons || []).filter(function (x) { return x.role === "wife"; })[0];
    var kin = [];
    if (wife) kin.push({ k: "妻", n: wife.name, s: wife.alive ? "在" : "先卒" });
    kids.forEach(function (k) { kin.push({ k: k.rel || "子", n: k.name, s: k.alive ? "存" : "殇" }); });

    p.hr({ mt: 18, mb: 8 });
    p.text("子 嗣", { size: 15.5, lh: 28 });
    if (kin.length) {
      kin.forEach(function (x) {
        p.text(x.k + "　" + x.n + "　" + x.s, {
          size: 14.5, lh: 24,
          color: (x.s === "在" || x.s === "存") ? C.ink2 : C.ink3
        });
      });
    } else {
      p.text("没有留下子女。", { size: 14.5, color: C.ink3, lh: 24 });
    }

    /* 一生 */
    var all = s.log || [];
    var logs = all.length > 10 ? all.slice(0, 3).concat([{ gap: true }]).concat(all.slice(-6)) : all;
    p.hr({ mt: 18, mb: 8 });
    p.text("一 生", { size: 15.5, lh: 28 });
    logs.forEach(function (l) {
      if (l.gap) { p.text("……", { size: 13, color: C.ink3, lh: 24 }); return; }
      p.text(l.year + "　" + l.text, { size: 13, color: C.ink2, lh: 23 });
    });

    /* 同代人 */
    p.hr({ mt: 18, mb: 8 });
    p.text("同 代 人", { size: 15.5, lh: 28 });
    p.text("你的寿命超过同时代 " + pct + "% 的人。", { size: 14.5, lh: 26, color: C.ink2 });

    /* 千局对照 */
    p.hr({ mt: 18, mb: 8 });
    p.text("一 千 个 和 你 一 样 的 人", { size: 15.5, lh: 28 });
    p.text(s.eraName + "　" + s.clsName + "　" + (s.sex === "female" ? "女" : "男") +
      "　同一开局，本地重跑 " + sim.total + " 次。", { size: 13, color: C.ink3, lh: 22 });

    var bars = [
      ["活到成年", sim.adult], ["娶嫁成家", sim.married], ["识字", sim.literate],
      ["有功名", sim.exam], ["做过官", sim.office], ["活过六十", sim.old60],
      ["起过兵", sim.rebel], ["坐过天下", sim.founded]
    ];
    p.space(4);
    bars.forEach(function (b) {
      p.bar(b[0], Math.max(0.02, b[1] / sim.total), b[1] + " 人");
    });
    p.text("中位寿命 " + sim.medianAge + " 岁。", { size: 13, color: C.ink3, mt: 8, lh: 22 });

    p.space(24);
    p.button("再 投 一 次", { main: true, h: 56 }, function () { app.startNew(null); });
    p.space(8);
    p.button("回 首 页", { h: 46 }, function () { app.go("welcome"); });
  };

  G.SCREENS = SC;
})(typeof window !== "undefined" ? window : GameGlobal);
