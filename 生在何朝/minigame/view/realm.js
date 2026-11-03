/* 生在何朝 · 天下卡（小游戏版）
 *
 * 舆图不用 SVG：共用顶点直接 lineTo 连成多边形，
 * 外圈用「先把每块描一遍粗边、再填色盖住」的办法，只留下一条海岸线。
 * 所有绘制都在同一个 scale 变换里完成，文字按 1/scale 反算字号，
 * 免得图和字两套坐标对不上。
 */
(function (G) {
  "use strict";

  var S = G.SHZ, K = G.KIT, C = K.C;
  var R = {};

  var MAP_X0 = 84, MAP_Y0 = 116, MAP_W = 718, MAP_H = 578;

  var OWN_COLOR = {
    court: "#ece2c6",
    me: "#b9cdbb",
    jianzhou: "#cdb59c", rebels: "#cdb59c", mongol: "#cdb59c", japon: "#cdb59c",
    liao: "#c0a88e", xia: "#c0a88e", huihu: "#c0a88e", menggu: "#c0a88e",
    taiping: "#c0a88e", foreign: "#c0a88e",
    wu: "#d9c6a6", shu: "#d9c6a6", liang: "#d9c6a6", jin: "#d9c6a6",
    han: "#d9c6a6", wuyue: "#d9c6a6", jingnan: "#d9c6a6",
    zhao: "#d9c6a6", yan: "#d9c6a6", dai: "#d9c6a6", wei: "#d9c6a6"
  };
  var VOID_COLOR = "#dcd8cf";

  function ownerColor(o) {
    if (o === "me") return OWN_COLOR.me;
    if (o === "court") return OWN_COLOR.court;
    return OWN_COLOR[o] || VOID_COLOR;
  }

  /* ── 路径解析（只认 M L C Q Z） ────────────── */
  function tracePath(ctx, d, ox, oy) {
    var t = d.match(/[MLCQZ]|-?\d*\.?\d+/g) || [];
    var i = 0, cmd = null;
    ctx.beginPath();
    while (i < t.length) {
      var k = t[i];
      if (/[MLCQZ]/.test(k)) {
        cmd = k; i++;
        if (cmd === "Z") ctx.closePath();
        continue;
      }
      if (cmd === "M") {
        ctx.moveTo(+t[i] - ox, +t[i + 1] - oy); i += 2; cmd = "L";
      } else if (cmd === "L") {
        ctx.lineTo(+t[i] - ox, +t[i + 1] - oy); i += 2;
      } else if (cmd === "C") {
        ctx.bezierCurveTo(+t[i] - ox, +t[i + 1] - oy, +t[i + 2] - ox, +t[i + 3] - oy,
          +t[i + 4] - ox, +t[i + 5] - oy);
        i += 6;
      } else if (cmd === "Q") {
        ctx.quadraticCurveTo(+t[i] - ox, +t[i + 1] - oy, +t[i + 2] - ox, +t[i + 3] - oy);
        i += 4;
      } else { i++; }
    }
  }

  function loopPath(ctx, loop) {
    ctx.beginPath();
    for (var i = 0; i < loop.length; i++) {
      var pt = S.PT[loop[i]];
      if (!pt) continue;
      var X = pt[0] - MAP_X0, Y = pt[1] - MAP_Y0;
      if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
    }
    ctx.closePath();
  }

  /* ── 舆图 ───────────────────────────────── */
  function tabMap(p, app) {
    var s = app.s;
    var M = S.mapOf(s.era);
    if (!M) { p.text("此朝舆图尚未录入。", { size: 14, color: C.ink3, mt: 20 }); return; }

    var founded = s.ledger && s.ledger.founded;
    var cx = p.x0, cw = p.x1 - p.x0;
    var ch = Math.round(cw * MAP_H / MAP_W);
    var scale = cw / MAP_W;
    var FS = function (n) { return n / scale; };   /* 字号反算 */

    var inEra = {};
    M.regions.forEach(function (r) { inEra[r.id] = 1; });

    /* 合并块：用了北直隶就不画幽燕、河北，反之亦然 */
    var skip = {};
    Object.keys(S.CELL_ALIAS || {}).forEach(function (key) {
      var parts = S.CELL_ALIAS[key];
      if (inEra[key]) parts.forEach(function (q) { skip[q] = 1; });
      else if (parts.some(function (q) { return inEra[q]; })) skip[key] = 1;
    });

    var cells = [];
    Object.keys(S.CELL).forEach(function (id) {
      if (skip[id]) return;
      var reg = null;
      for (var i = 0; i < M.regions.length; i++) {
        if (M.regions[i].id === id) { reg = M.regions[i]; break; }
      }
      var own = reg ? (founded ? "me" : S.regionOwner(s.era, reg, s.year)) : "void";
      cells.push({ id: id, own: own, reg: reg, loop: S.CELL[id].loop });
    });

    var box = p.box(ch + 4, function (ctx, y) {
      ctx.save();
      ctx.translate(cx, y);
      ctx.scale(scale, scale);

      /* 海 */
      ctx.fillStyle = "#dde5e4";
      ctx.fillRect(0, 0, MAP_W, MAP_H);

      /* 岸：先整片描粗边 */
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(52,46,36,0.40)";
      ctx.lineWidth = 4;
      cells.forEach(function (c) { loopPath(ctx, c.loop); ctx.stroke(); });

      /* 再填色，盖住内部接缝 */
      cells.forEach(function (c) {
        loopPath(ctx, c.loop);
        ctx.fillStyle = ownerColor(c.own);
        ctx.fill();
        ctx.strokeStyle = "rgba(34,32,28,0.24)";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      /* 水系 */
      (M.water || []).forEach(function (w) {
        if (!w || !w.d) return;
        ctx.lineCap = "round";
        tracePath(ctx, w.d, MAP_X0, MAP_Y0);
        ctx.strokeStyle = "#d2e2e4";
        ctx.lineWidth = 4.2;
        ctx.stroke();
        tracePath(ctx, w.d, MAP_X0, MAP_Y0);
        ctx.strokeStyle = "#7f9ea6";
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      /* 长城：只在明朝画 */
      if (M.walls && M.walls.length) {
        tracePath(ctx, M.walls[0].d, MAP_X0, MAP_Y0);
        ctx.strokeStyle = "rgba(78,68,50,0.62)";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      /* 政区名（含版图外地名）。
         首都附近不画政区名——两个字叠在一起，谁也读不清，让位给都城。 */
      var capPos = (M.capitals || []).map(function (c) { return [c.x, c.y]; });
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      cells.forEach(function (c) {
        var label, name, far = false;
        if (c.reg) { label = c.reg.label; name = c.reg.short; }
        else { label = (S.CELL[c.id] || {}).c; name = (S.CELL_FAR || {})[c.id]; far = true; }
        if (!label || !name) return;
        for (var q = 0; q < capPos.length; q++) {
          var dx = label[0] - capPos[q][0], dy = label[1] - capPos[q][1];
          if (dx * dx + dy * dy < 40 * 40) return;
        }
        var X = label[0] - MAP_X0, Y = label[1] - MAP_Y0;
        ctx.font = FS(far ? 9.5 : 10.5) + "px " + K.SERIF;
        ctx.lineWidth = FS(2.4);
        ctx.strokeStyle = C.paper;
        ctx.strokeText(name, X, Y);
        ctx.fillStyle = far ? "rgba(34,32,28,0.34)" : "rgba(34,32,28,0.78)";
        ctx.fillText(name, X, Y);
      });

      /* 都城：方块居中，名字放在方块上方——写在右侧会压住政区名 */
      (M.capitals || []).forEach(function (c) {
        var X = c.x - MAP_X0, Y = c.y - MAP_Y0;
        var sz = 4.5;
        ctx.fillStyle = C.paper2;
        ctx.fillRect(X - sz, Y - sz, sz * 2, sz * 2);
        ctx.strokeStyle = C.ink;
        ctx.lineWidth = FS(1.2);
        ctx.strokeRect(X - sz, Y - sz, sz * 2, sz * 2);

        var name = c.name;
        ctx.font = FS(c.main ? 10.5 : 9.5) + "px " + K.SERIF;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var ly = Y - (c.main ? 12 : 11);
        /* 底下垫一块纸色，压住底下的政区名，免得两个字叠在一起 */
        var tw = ctx.measureText(name).width;
        ctx.fillStyle = "rgba(243,239,227,0.86)";
        ctx.fillRect(X - tw / 2 - 2, ly - FS(6), tw + 4, FS(12));
        ctx.fillStyle = C.ink;
        ctx.fillText(name, X, ly);
        ctx.textBaseline = "middle";
      });

      /* 海名 */
      ctx.font = FS(11) + "px " + K.SERIF;
      ctx.fillStyle = "rgba(88,120,124,0.62)";
      ctx.fillText("东", MAP_W - 16, MAP_H - 54);
      ctx.fillText("海", MAP_W - 16, MAP_H - 36);

      /* 角注 */
      ctx.textAlign = "left";
      ctx.font = FS(9.5) + "px " + K.SERIF;
      ctx.fillStyle = "rgba(34,32,28,0.42)";
      ctx.fillText("示意舆图　不按里至", 10, MAP_H - 10);

      ctx.restore();
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
    });

    app.mapBox = { x: cx, y: box.y, w: cw, h: ch };

    p.space(10);

    /* 选中说明 */
    var sel = app.realmRegion ? M.regions.filter(function (r) { return r.id === app.realmRegion; })[0] : null;
    if (sel) {
      var own = founded ? "me" : S.regionOwner(s.era, sel, s.year);
      var owner;
      if (own === "me") owner = "你";
      else if (own === "court") owner = "朝廷";
      else {
        var fo = S.factionsAt(s.era, s.year).filter(function (f) { return f.id === own; })[0];
        owner = fo ? fo.name : "不在朝廷之手";
      }
      p.text(sel.name, { size: 16, lh: 28, mt: 2 });
      p.text("归　" + owner, { size: 12.5, color: C.zhu, lh: 22 });
      p.text(sel.note, { size: 13.5, color: C.ink2, lh: 24 });
    } else {
      p.text("点一处，看一处。方者为京师。", { size: 12, color: C.ink3, lh: 22 });
    }

    /* 图例 */
    p.space(6);
    var legend = [
      { c: OWN_COLOR.court, t: "朝廷所辖" },
      { c: VOID_COLOR, t: "版图之外" },
      { c: OWN_COLOR.me, t: "你的" }
    ];
    p.box(24, function (ctx, y) {
      var x = p.x0;
      ctx.textBaseline = "middle";
      legend.forEach(function (l) {
        ctx.fillStyle = l.c;
        ctx.fillRect(x, y + 8, 10, 10);
        ctx.strokeStyle = C.line2;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(x, y + 8, 10, 10);
        ctx.font = K.font(11);
        ctx.fillStyle = C.ink3;
        ctx.fillText(l.t, x + 15, y + 13);
        x += 15 + K.strW(ctx, K.font(11), l.t) + 18;
      });
      ctx.textBaseline = "top";
    });
  }

  /* 点舆图选地块 */
  R.pickRegion = function (app, sx, sy) {
    var M = S.mapOf(app.s.era);
    var b = app.mapBox;
    if (!M || !b) return false;

    var screenY = b.y - app.scroll;
    if (sx < b.x || sx > b.x + b.w) return false;
    if (sy < screenY || sy > screenY + b.h) return false;

    var scale = b.w / MAP_W;
    var mx = (sx - b.x) / scale + MAP_X0;
    var my = (sy - screenY) / scale + MAP_Y0;

    var hit = null;
    M.regions.forEach(function (r) {
      var cell = S.CELL[r.id];
      if (cell && inPoly(mx, my, cell.loop)) hit = r.id;
    });
    if (hit) { app.realmRegion = hit; return true; }
    return false;
  };

  function inPoly(x, y, loop) {
    var inside = false;
    for (var i = 0, j = loop.length - 1; i < loop.length; j = i++) {
      var a = S.PT[loop[i]], b = S.PT[loop[j]];
      if (!a || !b) continue;
      if ((a[1] > y) !== (b[1] > y) &&
        x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
    }
    return inside;
  }

  /* ── 势力 ───────────────────────────────── */
  function tabPower(p, app) {
    var s = app.s;
    var fs = S.factionsAt(s.era, s.year);
    if (!fs.length) { p.text("此朝势力表尚未录入。", { size: 14, color: C.ink3, mt: 20 }); return; }

    p.text("此时天下，说话算数的有这几家。数为其势力，非兵数。",
      { size: 12.5, color: C.ink3, mt: 8, lh: 22 });
    p.space(6);
    fs.forEach(function (f) {
      p.text(f.name + "　" + f.kind, { size: 15, lh: 22, color: f.color === "zhu" ? C.zhu : C.ink });
      p.bar("", f.power / 100, String(f.power), { h: 10, lw: 0, rw: 36, zhu: f.color === "zhu" });
      p.text(f.desc, { size: 12.5, color: C.ink3, lh: 21 });
      p.space(8);
    });

    var might = Math.round(S.mightOf(s));
    p.hr({ mt: 10, mb: 8 });
    p.text("你", { size: 15, lh: 26 });
    p.text("势力 " + might + "　·　兵 " + S.forceOf(s) + " 人", { size: 13, color: C.ink2, lh: 22 });
    p.bar("", Math.min(1, might / 100), String(might), { h: 10, lw: 0, rw: 36 });
    p.text(s.ledger && s.ledger.founded
      ? "天下是你的了。这些数字从此都听你的。"
      : (S.canRebel(s) ? "你手里的兵，已经够说那句话了。"
        : "势力过 50、兵过一千二，才够资格想起那句话（无官者须两千二）。"),
      { size: 12.5, color: C.ink3, lh: 21 });
  }

  /* ── 军备 ───────────────────────────────── */
  function tabArmy(p, app) {
    var s = app.s;
    var a = S.armyAt(s.era, s.year);
    if (!a) { p.text("此朝军备表尚未录入。", { size: 14, color: C.ink3, mt: 20 }); return; }
    var wan = function (n) { return (Math.round(n * 10) / 10).toFixed(1); };

    p.text("天下兵额，按当时实数估。" + s.year + " 年，合计约 " + wan(a.total) + " 万人。",
      { size: 12.5, color: C.ink3, mt: 8, lh: 22 });

    p.space(8);
    p.box(14, function (ctx, y) {
      var x = p.x0, w = p.x1 - p.x0;
      var cols = ["#8c7a5e", "#a39170", "#b9a888", "#cdbfa2"];
      a.segs.forEach(function (sg, i) {
        var sw = (a.total ? sg.v / a.total : 0) * w;
        ctx.fillStyle = cols[i] || cols[3];
        ctx.fillRect(x, y + 3, Math.max(1, sw), 8);
        x += sw;
      });
    });

    p.space(8);
    a.segs.forEach(function (sg) {
      p.kv(sg.k, wan(sg.v) + " 万　" + sg.n, { lh: 24, size: 13 });
    });

    var mine = (s.troops || 0) + (s.command || 0);
    var all = a.total * 10000;
    var pct = all ? mine / all * 100 : 0;

    p.hr({ mt: 12, mb: 8 });
    p.text("你", { size: 15, lh: 26 });
    p.text("私兵 " + (s.troops || 0) + " 人　·　所辖官军 " + (s.command || 0) +
      " 人　·　军心 " + Math.round(s.morale || 50), { size: 13, color: C.ink2, lh: 22 });
    if (mine) {
      /* 网页版这条是把占比放大二十倍画的：占半成即满格，否则永远看不出差别 */
      p.bar("", Math.max(0.02, Math.min(1, pct / 5)), "", { h: 10, lw: 0, rw: 0 });
    }
    p.text(mine
      ? "你的兵占天下兵力的 " + pct.toFixed(2) + "%。" +
        ((s.troops || 0) > 0 ? "家丁是你自己养的，饷从你的银子里出；官军是朝廷的，饷断了就散。" : "")
      : "你手里没有兵。养兵要钱，也要一个由头。",
      { size: 12.5, color: C.ink3, lh: 21 });
  }

  /* ── 官职 ───────────────────────────────── */
  function tabOffice(p, app) {
    var s = app.s;
    var O = S.officesOf(s.era);
    if (!O || (!O.central.length && !O.military.length)) {
      p.text("此朝官制尚未录入。", { size: 14, color: C.ink3, mt: 20 });
      return;
    }
    var mine = (s.post || "") + (s.rank || "");
    var hit = function (o) {
      return mine && mine !== "无" && (mine.indexOf(o.name) >= 0 || o.name.indexOf(mine) >= 0);
    };

    p.text("你现在：" + (s.post && s.post !== "无" ? s.post : "无官职") +
      ((s.grade || 0) > 0 ? "（" + (S.GRADE_TXT[s.grade] || "") + "）" : "") +
      (s.ledger && s.ledger.founded ? "　·　今上" : ""),
      { size: 13, color: C.ink2, mt: 8, lh: 24 });

    var block = function (title, arr) {
      if (!arr.length) return;
      p.hr({ mt: 14, mb: 6 });
      p.text(title, { size: 13.5, color: C.ink3, lh: 24 });
      arr.forEach(function (o) {
        var on = hit(o);
        p.text(o.name, { size: 14.5, color: on ? C.zhu : C.ink, lh: 24 });
        p.text(o.note, { size: 12.5, color: C.ink3, lh: 20, mb: 5 });
      });
    };
    block("中 枢", O.central);
    block("地 方", O.local);
    block("武 职", O.military);

    p.space(12);
    p.text("品级不写在名上：官高未必权重，位卑亦可持柄。表中所列，是这一朝最有实权的位子。",
      { size: 12, color: C.ink3, lh: 21 });
  }

  /* ── 本朝 ───────────────────────────────── */
  function tabEra(p, app) {
    var s = app.s;
    var b = S.bookOf(s.era);
    if (!b) { p.text("此朝情形尚未录入。", { size: 14, color: C.ink3, mt: 20 }); return; }
    var cur = S.eraBrief(s.era, s.year);

    p.text(b.name + "　" + b.span + "　都　" + b.capital +
      (b.founder ? "　开国　" + b.founder : "") + "　钱曰" + b.money,
      { size: 12.5, color: C.ink3, mt: 8, lh: 22 });

    b.parts.forEach(function (part) {
      var now = cur && part.from === cur.from && part.to === cur.to;
      p.hr({ mt: 14, mb: 6 });
      p.text(part.title + "　" + part.from + " — " + part.to, {
        size: 14.5, lh: 24, color: now ? C.zhu : C.ink
      });
      part.lines.forEach(function (l) {
        p.text(l, { size: 13, color: C.ink2, lh: 22 });
      });
      if (now) p.text("你眼下就在这一段", { size: 11.5, color: C.zhu, lh: 20 });
    });

    if (b.taxNote) {
      p.hr({ mt: 14, mb: 6 });
      p.text("赋役：" + b.taxNote, { size: 12.5, color: C.ink3, lh: 22 });
    }
  }

  R.build = function (p, app) {
    if (app.realmTab === 0) tabMap(p, app);
    else if (app.realmTab === 1) tabPower(p, app);
    else if (app.realmTab === 2) tabArmy(p, app);
    else if (app.realmTab === 3) tabOffice(p, app);
    else tabEra(p, app);
    p.space(30);
  };

  G.REALM = R;
})(typeof window !== "undefined" ? window : GameGlobal);
