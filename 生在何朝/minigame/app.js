/* 生在何朝 · 小游戏流程
 *
 * 只管三件事：状态怎么走、顶栏怎么画、点击怎么分。
 * 每一屏长什么样交给 view/screens.js 与 view/realm.js。
 */
(function (G) {
  "use strict";

  var S = G.SHZ, K = G.KIT, C = K.C;

  var app = {
    ctx: null,
    W: 0, H: 0,
    /* 刘海屏安全区：safeT 是顶部让出的高度，safeB 是底部指示条，
       vh 是真正能放东西的高度。平板与旧安卓这两个值都是 0。
       capL / capB 是右上角微信胶囊的左沿与下沿，没胶囊时为 0。 */
    safeT: 0, safeB: 0, vh: 0, capL: 0, capB: 0,
    s: null,
    mode: "welcome",
    speed: 1,
    gap: 0,
    result: null,
    sim: null,
    page: null,
    hits: [],
    scroll: 0,
    realmTab: 0,
    realmRegion: null,
    realmFrom: null,
    drawStep: 0,
    timers: []
  };

  var HEAD_H = 92;      /* 仅作设计基准：实际高度由 hm() 按安全区与胶囊算出 */
  var REALM_H = 84;
  var CUR = null;   /* 宿主 */

  /* 顶栏实际占的高度 */
  function headH() { return hm().h; }
  function realmH() { return Math.max(REALM_H + app.safeT, (app.capB || 0) + 52); }

  /* ── 小工具 ─────────────────────────────── */
  function later(fn, ms) {
    var t = setTimeout(function () {
      app.timers = app.timers.filter(function (x) { return x !== t; });
      fn();
    }, ms);
    app.timers.push(t);
    return t;
  }
  function clearTimers() {
    app.timers.forEach(clearTimeout);
    app.timers = [];
  }

  /* 判词在引擎里（S.verseOf），网页版与小游戏共用一份。
     别在本地加重写分支——两边会走岔。 */
  function verse(s) {
    return S.verseOf(s);
  }

  /* ── 流程 ───────────────────────────────── */
  function startNew(eraId) {
    clearTimers();
    S.clear();
    app.s = S.newRun(undefined, eraId || null);
    app.sim = null;
    app.gap = 0;
    app.result = null;
    app.drawStep = 0;
    app.mode = "draw";
    app.scroll = 0;
    render();
    tickDraw();
  }

  function tickDraw() {
    app.drawStep++;
    render();
    if (app.drawStep <= 4) {
      later(tickDraw, 460);
    } else {
      later(function () {
        app.mode = "birth";
        app.scroll = 0;
        S.peek(app.s, app.s.queue[0] || {});
        render();
      }, 560);
    }
  }

  /* 抽到下一条真事件为止。平年不占一屏。 */
  function pullNext() {
    var s = app.s;
    var y0 = s.year, guard = 0;
    while (!s.dead && guard++ < 90) {
      if (s.queue.length) {
        if (s.queue[0].sys) { s.queue.shift(); continue; }
        break;
      }
      S.nextTurn(s);
    }
    app.gap = s.dead ? 0 : Math.max(0, s.year - y0);
    return !s.dead && s.queue.length > 0;
  }

  function wake() {
    pullNext();
    app.mode = app.s.dead ? "dead" : "event";
    app.scroll = 0;
    render();
    S.save(app.s);
  }

  function advance() {
    clearTimers();
    if (app.s.dead) { app.mode = "dead"; app.scroll = 0; render(); return; }
    pullNext();
    if (app.s.dead || !app.s.queue.length) { app.mode = "dead"; app.scroll = 0; render(); return; }
    app.mode = "event";
    app.scroll = 0;
    render();
    S.save(app.s);
  }

  function pick(i) {
    clearTimers();
    var ev = app.s.queue[0];
    var r = S.choose(app.s, i, ev);
    app.s.queue.shift();
    app.result = r;
    app.gap = 0;
    if (app.s.dead) app.sim = null;
    app.mode = app.result ? "result" : "event";
    app.scroll = 0;
    render();
    S.save(app.s);
    autoNext();
  }

  /* 倍速只加快过场，遇抉择必停 */
  function autoNext() {
    if (app.speed <= 1 || !app.s || app.s.dead || app.mode !== "result") return;
    later(function () {
      if (app.mode === "result") advance();
    }, Math.round(1250 / app.speed));
  }

  function resume() {
    var s = S.load();
    if (!s) return;
    clearTimers();
    app.s = s;
    app.sim = null;
    app.mode = s.dead ? "dead" : "event";
    app.scroll = 0;
    if (!s.dead && !s.queue.length) pullNext();
    render();
  }

  function go(mode) {
    clearTimers();
    app.mode = mode;
    app.scroll = 0;
    render();
  }

  function openRealm(tab) {
    /* 记下是从哪一屏进来的。结算页点进去的，退出来还得是结算页，
       不然那一屏的得失小结就被吞了。 */
    if (app.mode !== "realm") app.realmFrom = app.mode;
    app.realmTab = tab || 0;
    app.realmRegion = null;
    app.mode = "realm";
    app.scroll = 0;
    render();
  }

  function backFromRealm() {
    var m = app.realmFrom;
    if (!m || m === "realm" || m === "welcome" || m === "eras" || m === "draw" || m === "birth") {
      m = (app.s && app.s.dead) ? "dead" : "event";
    }
    go(m);
  }

  /* ── 顶栏与数值条 ───────────────────────── */
  /* 右上角有微信的胶囊按钮，它压在安全区往下约 38pt 的地方。
     所以顶栏分两带：第一带贴着胶囊放，但右边必须让开；
     第二带（数值条）整行落到胶囊下沿以下，否则最右那个数会被盖住。 */
  function hm() {
    var t = app.safeT;
    var capB = app.capB || 0;
    var r1 = t + 26;
    var r2 = Math.max(t + 54, capB + 10);
    return { r1: r1, r2: r2, h: r2 + 32 };
  }

  /* 记一个可点区。顶栏是画在 p.render 之后的，所以直接往 app.hits 里补；
     坐标一律用「画在哪就记在哪」，画与点共用一处分界，不许各算一套。 */
  function reg(x, y, w, h, act) {
    if (!app.hits) app.hits = [];
    app.hits.push({ x: x, y: y, w: w, h: h, act: act });
  }

  function drawHeader(ctx) {
    var s = app.s;
    if (!s || app.mode === "welcome" || app.mode === "eras" || app.mode === "draw") return;

    var m = hm();
    ctx.fillStyle = C.paper;
    ctx.fillRect(0, 0, app.W, m.h);

    /* 第一行：纪年 · 年岁 · 地方 */
    var ageTxt = s.dead ? "卒年 " + s.deathYear : (s.age === 0 ? "初生" : "你 " + S.cnNum(s.age) + " 岁");
    var line = S.reignText(s) + " · " + ageTxt;

    /* 两个钮的右边界让开胶囊 */
    var right = Math.min(app.W - 12, (app.capL || app.W) - 10);
    var bx2 = right - 30;          /* 天下 */
    var bx1 = bx2 - 8 - 34;        /* 倍速 */
    var maxW = Math.max(84, bx1 - 18 - 12);

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = K.font(13);
    ctx.fillStyle = C.ink2;
    while (K.strW(ctx, K.font(13), line) > maxW && line.length > 6) {
      line = line.slice(0, -2);
    }
    ctx.fillText(line, 18, m.r1);

    /* 右侧两个钮 */
    ctx.textAlign = "center";
    ctx.strokeStyle = C.line2;
    ctx.lineWidth = 1;
    K.roundRect(ctx, bx1, m.r1 - 13, 34, 26, 2);
    ctx.stroke();
    ctx.fillStyle = C.ink2;
    ctx.fillText(app.speed + "×", bx1 + 17, m.r1);

    K.roundRect(ctx, bx2, m.r1 - 13, 30, 26, 2);
    ctx.stroke();
    ctx.fillStyle = C.ink2;
    ctx.fillText("天下", bx2 + 15, m.r1);

    /* 两个钮的点击区比框大一圈：框高 26，手指按不准。
       左边这个宽 42 不要再多，否则会压到「天下」那一格上，
       点到边上会误触成换倍速。 */
    reg(bx1 - 6, m.r1 - 21, 42, 42, function () {
      app.speed = app.speed === 1 ? 2 : (app.speed === 2 ? 4 : 1);
      render();
    });
    reg(bx2 - 6, m.r1 - 21, 42, 42, function () { openRealm(0); });

    /* 第二行：数值 */
    var items = [
      { lab: "身体", v: String(Math.round(s.body)), r: s.body / 100 },
      { lab: "银", v: (Math.round(s.silver * 100) / 100).toFixed(1) },
      { lab: "田", v: String(s.field_wet + s.field_dry) },
      { lab: "粮", v: String(Math.round(s.grain)) },
      { lab: "识", v: String(Math.round(s.knowledge)), r: s.knowledge / 100 },
      { lab: "望", v: String(Math.round(s.fame)) }
    ];
    if ((s.troops || 0) > 0) items.push({ lab: "兵", v: String(s.troops) });
    if ((s.grade || 0) > 0) items.push({ lab: "品", v: String(s.grade) });

    var n = items.length;
    var cw = (app.W - 36) / n;
    /* 兵、品一出来就是七八格，同样的字号会挤成一团，得收小一档 */
    var vs = n >= 7 ? 13.5 : 15.5;
    for (var i = 0; i < n; i++) {
      var it = items[i];
      var x = 18 + cw * i;
      ctx.textAlign = "left";
      ctx.font = K.font(11);
      ctx.fillStyle = C.ink3;
      ctx.fillText(it.lab, x, m.r2);
      ctx.font = K.font(vs);
      ctx.fillStyle = (it.lab === "身体" && s.body < 35) ? C.zhu : C.ink;
      ctx.fillText(it.v, x, m.r2 + 18);
      if (it.r != null) {
        ctx.fillStyle = C.paper3;
        ctx.fillRect(x, m.r2 + 28, cw - 14, 2.5);
        ctx.fillStyle = s.body < 35 && it.lab === "身体" ? C.zhu : C.ink2;
        ctx.fillRect(x, m.r2 + 28, (cw - 14) * Math.max(0, Math.min(1, it.r)), 2.5);
      }
    }

    ctx.strokeStyle = C.line;
    ctx.beginPath();
    ctx.moveTo(0, m.h - 0.5);
    ctx.lineTo(app.W, m.h - 0.5);
    ctx.stroke();
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
  }

  /* ── 天下卡顶栏 ─────────────────────────── */
  var R_TABS = ["舆　图", "势　力", "军　备", "官　职", "本　朝"];
  function drawRealmHeader(ctx) {
    var t2 = realmH() - REALM_H;
    ctx.fillStyle = C.paper;
    ctx.fillRect(0, 0, app.W, realmH());
    ctx.save();
    ctx.translate(0, t2);

    /* 左上角明写一个「‹ 返」。原来只在右上角放「合上」两个字，
       又被胶囊挤到边上，根本看不出能退出。 */
    ctx.strokeStyle = C.line2;
    ctx.lineWidth = 1;
    K.roundRect(ctx, 14, 8, 48, 28, 3);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = K.font(13);
    ctx.fillStyle = C.zhu;
    ctx.fillText("‹ 返", 38, 22);
    reg(10, t2 + 2, 56, 42, function () { backFromRealm(); });

    /* 书眉居中 */
    ctx.textAlign = "center";
    ctx.font = K.font(13);
    ctx.fillStyle = C.ink2;
    ctx.fillText("天　下", app.W / 2, 22);

    var n = R_TABS.length;
    var tw = (app.W - 36) / n;
    for (var i = 0; i < n; i++) {
      var x = 18 + tw * i;
      var on = i === app.realmTab;
      ctx.textAlign = "center";
      ctx.font = K.font(12.5);
      ctx.fillStyle = on ? C.zhu : C.ink3;
      ctx.fillText(R_TABS[i], x + tw / 2, 60);
      if (on) {
        ctx.strokeStyle = C.zhu;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x + tw / 2 - 14, 74);
        ctx.lineTo(x + tw / 2 + 14, 74);
        ctx.stroke();
      }
      /* 一栏的点击区从标题下沿一直到底线，别只认那一行字 */
      (function (idx) {
        reg(x, t2 + 38, tw, 46, function () {
          app.realmTab = idx;
          app.realmRegion = null;
          app.scroll = 0;
          render();
        });
      })(i);
    }
    ctx.strokeStyle = C.line;
    ctx.beginPath();
    ctx.moveTo(0, 83.5);
    ctx.lineTo(app.W, 83.5);
    ctx.stroke();
    ctx.restore();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
  }

  /* 书眉：左边距竖排书名，像线装书的版心题名。
     一是好看，二是备案要求「截图内可见小游戏名」，每一屏都得有。 */
  function drawRunningTitle(ctx, top) {
    var chars = "生在何朝";
    ctx.font = K.font(9);
    ctx.fillStyle = "rgba(34,32,28,0.26)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < chars.length; i++) {
      ctx.fillText(chars[i], 9, top + 18 + i * 13);
    }
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
  }

  /* ── 渲染 ───────────────────────────────── */
  function render() {
    var ctx = app.ctx;
    if (!ctx) return;

    /* 整屏先铺一层纸色。小游戏的主画布不会自动擦除，上一帧的残影会留下来；
       顺便把底部指示条那一条也填上，免得画面下方缺一块。 */
    ctx.fillStyle = C.paper;
    ctx.fillRect(0, 0, app.W, app.H);

    var top = 0;
    if (app.mode === "realm") top = realmH();
    /* 结算页不画顶栏：碑上还挂着一排「身体 0、银 285」很怪，
       也挤掉了碑额的位置。整页从胶囊下沿起排。 */
    else if (app.mode === "dead") top = Math.max(app.safeT, (app.capB || 0) + 4);
    else if (app.s && app.mode !== "welcome" && app.mode !== "eras" && app.mode !== "draw") top = headH();
    /* 十九朝是顶格排的列表，标题与说明会钻到胶囊底下；让它整体让开。
       欢迎与抽签是竖排居中的，本来就落在胶囊下方，不必动。 */
    else if (app.mode === "eras") top = Math.max(app.safeT, (app.capB || 0) + 4);

    var vh = app.vh || app.H;
    var p = new K.Page({ ctx: ctx, W: app.W, H: vh, top: top, pad: 22 });

    if (app.mode === "welcome") G.SCREENS.welcome(p, app);
    else if (app.mode === "eras") G.SCREENS.eras(p, app);
    else if (app.mode === "draw") G.SCREENS.draw(p, app, app.drawStep);
    else if (app.mode === "birth") G.SCREENS.birth(p, app);
    else if (app.mode === "event") G.SCREENS.event(p, app);
    else if (app.mode === "result") G.SCREENS.result(p, app);
    else if (app.mode === "dead") G.SCREENS.dead(p, app);
    else if (app.mode === "realm") G.REALM.build(p, app);

    p.scroll = app.scroll;
    app.page = p;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, top, app.W, vh - top);
    ctx.clip();
    app.hits = p.render(app.scroll);
    ctx.restore();

    app.scroll = p.scroll;

    if (app.mode === "realm") drawRealmHeader(ctx);
    else if (app.mode !== "dead") drawHeader(ctx);

    if (app.s && app.mode !== "welcome" && app.mode !== "dead" &&
        app.mode !== "eras" && app.mode !== "draw") drawRunningTitle(ctx, top);

    /* 滚动条：长页才画，短页不画 */
    if (p.cy > vh) {
      var trackH = vh - top - 12;
      var th = Math.max(24, trackH * (vh - top) / p.cy);
      var ty = top + 6 + (trackH - th) * (app.scroll / Math.max(1, p.maxScroll()));
      ctx.fillStyle = C.paper3;
      ctx.fillRect(app.W - 4, ty, 2, th);
    }
  }

  /* ── 点击 ───────────────────────────────── */
  function tapAt(x, y) {
    /* 顶栏与天下卡页签的按钮，都在绘制时记进了 app.hits，
       这里不再另算一套坐标——原先那套是照设计稿写的固定数，
       遇上刘海屏或胶囊一错位就全点不中。 */

    /* 舆图：先按多边形判定点在哪一块，判不出来再走普通命中 */
    if (app.mode === "realm" && app.realmTab === 0 && G.REALM && G.REALM.pickRegion(app, x, y)) {
      render();
      return;
    }

    var hits = app.hits || [];
    for (var k = 0; k < hits.length; k++) {
      var h = hits[k];
      if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
        h.act();
        return;
      }
    }
  }

  /* ── 触摸 ───────────────────────────────── */
  var tY0 = 0, sY0 = 0, moved = 0, down = false;

  function onTouch(type, x, y) {
    if (type === "start") {
      down = true; tY0 = y; sY0 = app.scroll; moved = 0;
    } else if (type === "move") {
      if (!down) return;
      var dy = y - tY0;
      moved = Math.max(moved, Math.abs(dy));
      if (moved > 6 && app.page) {
        app.scroll = Math.max(0, Math.min(app.page.maxScroll(), sY0 - dy));
        render();
      }
    } else if (type === "end") {
      down = false;
      if (moved < 8) tapAt(x, y);
    }
  }

  /* ── 尺寸 ───────────────────────────────── */
  function resize(W, H, safeT, safeB) {
    app.W = W;
    app.H = H;
    if (safeT != null) app.safeT = safeT;
    if (safeB != null) app.safeB = safeB;
    app.vh = H - app.safeB;
    render();
  }

  /* 调试用：直接跳到某一屏，方便截图与自检。正式运行不会走到这里。 */
  app.__demo = function (mode, eraId, seed, tab) {
    clearTimers();
    S.clear();
    app.s = S.newRun(seed || 20261030, eraId || null);
    app.sim = null;
    app.gap = 0;
    app.result = null;
    app.scroll = 0;

    if (mode === "birth") {
      app.mode = "birth";
      S.peek(app.s, app.s.queue[0] || {});
    } else if (mode === "event") {
      app.mode = "event";
      pullNext();
    } else if (mode === "dead") {
      var guard = 0;
      while (!app.s.dead && guard++ < 260) {
        pullNext();
        if (app.s.dead) break;
        if (app.s.queue.length) {
          S.choose(app.s, 0, app.s.queue[0]);
          app.s.queue.shift();
        }
      }
      app.mode = "dead";
    } else if (mode === "realm") {
      app.mode = "realm";
      app.realmTab = tab || 0;
      app.realmRegion = null;
    } else if (mode === "eras") {
      app.mode = "eras";
    } else {
      app.mode = "welcome";
    }
    render();
  };

  /* 屏里要通过 app.xxx 回调，这里把内部函数挂上去 */
  app.startNew = startNew;
  app.tickDraw = tickDraw;
  app.wake = wake;
  app.advance = advance;
  app.pick = pick;
  app.resume = resume;
  app.go = go;
  app.openRealm = openRealm;
  app.verse = verse;
  app.render = render;

  G.APP = {
    boot: function (host) {
      CUR = host;
      app.ctx = host.ctx;
      app.W = host.W;
      app.H = host.H;
      app.safeT = host.safeT || 0;
      app.safeB = host.safeB || 0;
      app.capL = host.capL || 0;
      app.capB = host.capB || 0;
      app.vh = app.H - app.safeB;
      app.mode = "welcome";
      render();
    },
    resize: resize,
    touch: onTouch,
    get state() { return app; }
  };
})(typeof window !== "undefined" ? window : GameGlobal);
