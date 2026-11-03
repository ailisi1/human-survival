/* 生在何朝 · 小游戏排版内核
 *
 * 只使用 canvas 2D 接口，不碰 DOM、不碰 SVG。
 * 小游戏里 ctx 来自 wx.createCanvas()，浏览器预览里来自 <canvas>，同一份代码。
 *
 * 设计思路：屏是「一串竖排的操作」。每屏先排版算出总高与每块的位置，
 * 再只画落在屏幕内的那几块，因此万言长页也不掉帧；点击命中按同一份坐标判断。
 */
(function (G) {
  "use strict";

  var C = {
    paper: "#f3efe3",
    paper2: "#faf7ee",
    paper3: "#ebe5d5",
    ink: "#22201c",
    ink2: "#494436",
    ink3: "#6f6a5b",
    zhu: "#9c2b1e",
    qing: "#2f5d50",
    line: "rgba(34, 32, 28, 0.13)",
    line2: "rgba(34, 32, 28, 0.26)"
  };

  /* 设备上未必有宋体，退到系统衬线；中文衬线缺失时自动落到黑体，版面仍成立 */
  var SERIF = "'Songti SC','Source Han Serif SC','Noto Serif CJK SC','STSong','SimSun',serif";

  /* 行首禁则：这些字不出现在行首。行尾禁则同理 */
  var HEAD_FORBID = "，。、；：？！）」』】〉》”’,.;:?!)]}%";
  var TAIL_FORBID = "（「『【〈《“‘([{";

  /* ── 字宽缓存 ─────────────────────────────────
     逐字量宽再相加，比整串量准（中文等宽，拉丁字差在字偶距，肉眼看不出来），
     而且能缓存，长段落排版不至于卡。 */
  var wcache = Object.create(null);
  function charW(ctx, font, ch) {
    var k = font + "|" + ch;
    var v = wcache[k];
    if (v === undefined) {
      ctx.font = font;
      v = ctx.measureText(ch).width;
      wcache[k] = v;
    }
    return v;
  }

  function strW(ctx, font, str) {
    var w = 0;
    for (var i = 0; i < str.length; i++) w += charW(ctx, font, str[i]);
    return w;
  }

  /* ── 行内样式解析：{{词|注}} ─────────────────── */
  function parseRich(str) {
    var runs = [], re = /\{\{([^|}]+)\|([^}]+)\}\}/g, last = 0, m;
    while ((m = re.exec(str))) {
      if (m.index > last) runs.push({ t: str.slice(last, m.index) });
      runs.push({ t: m[1], term: true, note: m[2] });
      last = m.index + m[0].length;
    }
    if (last < str.length) runs.push({ t: str.slice(last) });
    return runs;
  }

  /* ── 占位符：{place} {reign} {name} ─────────────
     网页版在 rich() 里替换，canvas 版同样要换，否则正文里会露出花括号。 */
  function subst(str, s) {
    if (!s) return String(str);
    var S2 = G.SHZ || (typeof SHZ !== "undefined" ? SHZ : null);
    return String(str)
      .replace(/\{place\}/g, s.place ? s.place.full : "")
      .replace(/\{reign\}/g, S2 && S2.reignText ? S2.reignText(s) : "")
      .replace(/\{name\}/g, s.name || "")
      .replace(/\{hometown_far\}/g, s.place ? s.place.full : "");
  }

  /* ── 折行 ─────────────────────────────────────── */
  function wrap(ctx, runs, font, maxW) {
    var lines = [], line = [], buf = "", w = 0;

    function flush() {
      if (buf) { line.push({ t: buf, term: cur.term, note: cur.note }); buf = ""; }
    }
    function newline() {
      flush();
      lines.push(line);
      line = [];
      w = 0;
    }

    var cur = { term: false, note: null };
    for (var r = 0; r < runs.length; r++) {
      var run = runs[r];
      cur = run;
      var s = run.t || "";
      for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        var cw = charW(ctx, font, ch);
        /* 换行：超宽就换。但标点不出现在行首——宁可让这一行多挤出半个字 */
        if (w + cw > maxW && (buf.length || line.length)) {
          if (HEAD_FORBID.indexOf(ch) >= 0) {
            buf += ch; w += cw;
            continue;
          }
          /* 也别把开引号留在行尾 */
          if (buf.length && TAIL_FORBID.indexOf(buf[buf.length - 1]) >= 0) {
            var lastCh = buf[buf.length - 1];
            buf = buf.slice(0, -1);
            flush();
            newline();
            buf = lastCh;
            w = charW(ctx, font, lastCh);
          } else {
            newline();
          }
        }
        buf += ch;
        w += cw;
      }
      flush();
    }
    flush();
    if (line.length) lines.push(line);
    return lines.length ? lines : [[]];
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ── 页 ─────────────────────────────────────── */
  function Page(opt) {
    this.ctx = opt.ctx;
    this.W = opt.W;
    this.H = opt.H;
    this.pad = opt.pad == null ? 22 : opt.pad;
    this.x0 = this.pad;
    this.x1 = this.W - this.pad;
    this.cy = opt.top || 0;
    this.ops = [];
    this.scroll = 0;
  }

  Page.prototype.add = function (op) {
    op.y = this.cy;
    this.cy += op.h;
    this.ops.push(op);
    return op;
  };

  /* 空白 */
  Page.prototype.space = function (h) {
    return this.add({ t: "none", h: h || 12 });
  };

  /* 横线 */
  Page.prototype.hr = function (o) {
    o = o || {};
    var self = this;
    var mt = o.mt == null ? 16 : o.mt, mb = o.mb == null ? 16 : o.mb;
    return this.add({
      t: "hr", h: mt + mb + 1,
      draw: function (ctx, y, W) {
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(self.x0, y + mt + 0.5);
        ctx.lineTo(self.x1, y + mt + 0.5);
        ctx.stroke();
      }
    });
  };

  /* 段落。str 可以是字符串，也可以是 [{t,term}] 段数组 */
  Page.prototype.text = function (str, o) {
    o = o || {};
    var self = this;
    var size = o.size || 16;
    var font = (o.bold ? "bold " : "") + size + "px " + SERIF;
    var lh = o.lh || Math.round(size * 1.74);
    var mt = o.mt || 0, mb = o.mb || 0;
    var x = o.x != null ? o.x : this.x0;
    var maxW = o.w != null ? o.w : (this.x1 - this.x0);
    var runs = typeof str === "string" ? parseRich(str) : str;
    var lines = wrap(this.ctx, runs, font, maxW);
    var align = o.align || "left";
    var color = o.color || C.ink;

    return this.add({
      t: "text", h: lines.length * lh + mt + mb,
      draw: function (ctx, y) {
        ctx.font = font;
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        var yy = y + mt;
        for (var li = 0; li < lines.length; li++) {
          var ln = lines[li];
          var xx = x;
          if (align === "center") {
            var tw0 = 0;
            for (var q = 0; q < ln.length; q++) tw0 += strW(ctx, font, ln[q].t);
            xx = x + (maxW - tw0) / 2;
          } else if (align === "right") {
            var tw1 = 0;
            for (var q2 = 0; q2 < ln.length; q2++) tw1 += strW(ctx, font, ln[q2].t);
            xx = x + maxW - tw1;
          }
          for (var ri = 0; ri < ln.length; ri++) {
            var run = ln[ri];
            var tw = strW(ctx, font, run.t);
            ctx.font = font;
            ctx.fillStyle = run.term ? C.zhu : color;
            ctx.fillText(run.t, xx, yy);
            if (run.term) {
              ctx.save();
              ctx.strokeStyle = "rgba(156,43,30,0.5)";
              ctx.lineWidth = 1;
              ctx.setLineDash([2, 2]);
              ctx.beginPath();
              ctx.moveTo(xx, yy + size + 1.5);
              ctx.lineTo(xx + tw, yy + size + 1.5);
              ctx.stroke();
              ctx.restore();
            }
            xx += tw;
          }
          yy += lh;
        }
      }
    });
  };

  /* 按钮 */
  Page.prototype.button = function (label, o, act) {
    o = o || {};
    var self = this;
    var h = o.h || 50;
    var mt = o.mt || 0, mb = o.mb || 0;
    var x = o.x != null ? o.x : this.x0;
    var w = o.w != null ? o.w : (this.x1 - this.x0);
    var size = o.size || 17;
    var font = size + "px " + SERIF;

    return this.add({
      t: "btn", h: h + mt + mb, act: act,
      box: { x: x, top: mt, w: w, h: h },
      draw: function (ctx, y) {
        var top = y + mt;
        if (o.main) {
          ctx.fillStyle = C.ink;
          roundRect(ctx, x, top, w, h - 6, 2);
          ctx.fill();
          ctx.fillStyle = C.paper2;
        } else {
          ctx.strokeStyle = o.zhu ? C.zhu : C.line2;
          ctx.lineWidth = 1;
          roundRect(ctx, x + 0.5, top + 0.5, w - 1, h - 7, 2);
          ctx.stroke();
          ctx.fillStyle = o.zhu ? C.zhu : C.ink2;
        }
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x + w / 2, top + (h - 6) / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
      }
    });
  };

  /* 键值两列：左窄右宽，右列自动折行 */
  Page.prototype.kv = function (k, v, o) {
    o = o || {};
    var self = this;
    var kw = o.kw || 58;
    var size = o.size || 15;
    var lh = o.lh || 26;
    var font = size + "px " + SERIF;
    var vx = this.x0 + kw;
    var vw = this.x1 - vx;
    var lines = wrap(this.ctx, typeof v === "string" ? parseRich(v) : v, font, vw);
    var mt = o.mt == null ? 0 : o.mt, mb = o.mb == null ? 0 : o.mb;

    return this.add({
      t: "kv", h: Math.max(lines.length * lh, lh) + mt + mb,
      draw: function (ctx, y) {
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.font = size + "px " + SERIF;
        ctx.fillStyle = C.ink3;
        ctx.fillText(k, self.x0, y + mt + (lh - size) / 2);
        var yy = y + mt;
        for (var i = 0; i < lines.length; i++) {
          var xx = vx;
          var ln = lines[i];
          for (var r = 0; r < ln.length; r++) {
            var run = ln[r];
            ctx.font = font;
            ctx.fillStyle = run.term ? C.zhu : (o.color || C.ink2);
            ctx.fillText(run.t, xx, yy + (lh - size) / 2);
            xx += strW(ctx, font, run.t);
          }
          yy += lh;
        }
      }
    });
  };

  /* 数值条 */
  Page.prototype.bar = function (label, ratio, right, o) {
    o = o || {};
    var self = this;
    var size = o.size || 13;
    var h = o.h != null ? o.h : 26;
    /* 别用 ||：传 0 是「标签区留空」，会被 || 顶成默认值，
       条就从半腰里起头，左边空一截，看着像划错了线。 */
    var lw = o.lw != null ? o.lw : 74;
    var rw = o.rw != null ? o.rw : 62;
    var bx = this.x0 + lw;
    var bw = this.x1 - bx - rw;

    return this.add({
      t: "bar", h: h,
      draw: function (ctx, y) {
        var mid = y + h / 2;
        ctx.font = size + "px " + SERIF;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillStyle = C.ink2;
        if (label) ctx.fillText(label, self.x0, mid);
        /* 条压到 4 高、颜色也放淡：原来又高又深，横贯整行像一道删除线，
           反倒盖过了它自己那行字。 */
        ctx.fillStyle = "rgba(34,32,28,0.07)";
        ctx.fillRect(bx, mid - 2, bw, 4);
        var w = Math.max(1, Math.min(1, ratio || 0)) * bw;
        ctx.fillStyle = o.zhu ? "rgba(156,43,30,0.70)" : "rgba(73,68,54,0.52)";
        ctx.fillRect(bx, mid - 2, w, 4);
        if (right != null) {
          ctx.textAlign = "right";
          ctx.fillStyle = C.ink3;
          ctx.fillText(String(right), self.x1, mid);
          ctx.textAlign = "left";
        }
        ctx.textBaseline = "top";
      }
    });
  };

  /* 小标签行（结果页的增减、子嗣等） */
  Page.prototype.chips = function (items, o) {
    o = o || {};
    var self = this;
    var size = o.size || 12;
    var padX = 8, gapX = 6, h = 26;
    var rows = [[]], x = this.x0;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var w = strW(this.ctx, size + "px " + SERIF, it.label) + padX * 2;
      if (x + w > this.x1 && rows[rows.length - 1].length) {
        rows.push([]);
        x = this.x0;
      }
      rows[rows.length - 1].push({ it: it, w: w, x: x });
      x += w + gapX;
    }

    return this.add({
      t: "chips", h: rows.length * (h - 4) + 8,
      draw: function (ctx, y) {
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        for (var r = 0; r < rows.length; r++) {
          for (var j = 0; j < rows[r].length; j++) {
            var c = rows[r][j];
            var yy = y + 4 + r * (h - 4);
            ctx.fillStyle = c.it.up ? "rgba(47,93,80,0.10)" : "rgba(156,43,30,0.09)";
            roundRect(ctx, c.x, yy, c.w, h - 8, 2);
            ctx.fill();
            ctx.font = size + "px " + SERIF;
            ctx.fillStyle = c.it.up ? C.qing : C.zhu;
            ctx.fillText(c.it.label, c.x + padX, yy + (h - 8) / 2);
          }
        }
        ctx.textBaseline = "top";
      }
    });
  };

  /* 自定义块：fn(ctx, y, page) */
  Page.prototype.box = function (h, fn, act) {
    return this.add({
      t: "box", h: h, draw: fn, act: act,
      box: act ? { x: this.x0, top: 0, w: this.x1 - this.x0, h: h } : null
    });
  };

  /* ── 绘制 ─────────────────────────────────────── */
  Page.prototype.render = function (scrollY, onHit) {
    var ctx = this.ctx;
    this.scroll = Math.max(0, Math.min(this.maxScroll(), scrollY || 0));
    ctx.fillStyle = C.paper;
    ctx.fillRect(0, 0, this.W, this.H);

    this.hits = [];
    for (var i = 0; i < this.ops.length; i++) {
      var op = this.ops[i];
      var y = op.y - this.scroll;
      if (y + op.h < 0) continue;
      if (y > this.H) break;
      if (op.draw) op.draw(ctx, y, this.W);
      if (op.act && op.box) {
        this.hits.push({
          act: op.act,
          x: op.box.x, y: y + op.box.top,
          w: op.box.w, h: op.box.h
        });
      }
    }
    return this.hits;
  };

  Page.prototype.maxScroll = function () {
    return Math.max(0, this.cy - this.H);
  };

  G.KIT = {
    C: C,
    SERIF: SERIF,
    Page: Page,
    parseRich: parseRich,
    subst: subst,
    strW: strW,
    roundRect: roundRect,
    font: function (size, bold) {
      return (bold ? "bold " : "") + size + "px " + SERIF;
    }
  };
})(typeof window !== "undefined" ? window : GameGlobal);
