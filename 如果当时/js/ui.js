/* 如果当时 · 界面层（DOM 渲染）
 * 玩法：多岔路串行 + 四维数值 + 连锁触发 + 随机事件。
 * 引擎状态 → 页面渲染 → 点击。
 * 视觉：深紫黑底 + 顶部光晕 + 磨砂玻璃卡 + 金色/朱红/青绿
 */
(function (global) {
  "use strict";

  var RUGO = global.RUGO;
  var app = document.getElementById("app");
  var state = null;

  function mount(html) { app.innerHTML = html; }
  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- 结局收藏：localStorage 持久化 ---------- */
  var COLLECT_KEY = "rugo-collection-v1";

  function loadCollection() {
    try {
      var raw = localStorage.getItem(COLLECT_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function unlockTitle(title) {
    var list = loadCollection();
    if (list.indexOf(title) >= 0) return false; // 已解锁
    list.push(title);
    try { localStorage.setItem(COLLECT_KEY, JSON.stringify(list)); } catch (e) {}
    return true;
  }

  /* ---------- 四维数值条 ---------- */
  var STATS_META = [
    { key: "money", label: "钱", color: "#E8C268" },
    { key: "health", label: "健康", color: "#7DD9A6" },
    { key: "social", label: "人脉", color: "#7FB5E0" },
    { key: "happy", label: "幸福", color: "#E07866" }
  ];

  function renderStats() {
    var bars = STATS_META.map(function (m) {
      var v = state.stats[m.key];
      return (
        '<div class="stat">' +
        '  <div class="stat-label">' + m.label + "</div>" +
        '  <div class="stat-track"><div class="stat-fill" style="width:' + v + '%;background:' + m.color + '"></div></div>' +
        '  <div class="stat-val">' + v + "</div>" +
        "</div>"
      );
    }).join("");
    return '<div class="stats">' + bars + "</div>";
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    mount(
      '<div class="screen home">' +
      '  <div class="halo"></div>' +
      '  <div class="home-inner">' +
      '    <div class="emblem"><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="34" stroke="#E8C268" stroke-opacity="0.5" stroke-width="1.5" fill="none"/><circle cx="36" cy="36" r="26" stroke="#E8C268" stroke-opacity="0.25" stroke-width="1" fill="none"/><path d="M36 10 L40 32 L36 62 L32 32 Z" fill="#E8C268" fill-opacity="0.9"/></svg></div>' +
      '    <h1 class="title">如果当时</h1>' +
      '    <p class="subtitle">人生的岔路，你敢重走几次？</p>' +
      '    <p class="desc">五百万元，还是清华大学？<br>每一次选择，都在悄悄改写你的人生。<br>这里没有正确答案，只有你愿意放弃什么。</p>' +
      '    <button class="btn-gold" id="btn-start">开始新人生</button>' +
      '    <button class="btn-code" id="btn-code-open">输入人生码，重走朋友的路</button>' +
      '    <button class="btn-ghost" id="btn-collection">人生收藏 <span class="collect-count"></span></button>' +
      '    <p class="hint">约 10 分钟 · 一局人生</p>' +
      '  </div>' +
      '</div>'
    );
    document.getElementById("btn-start").addEventListener("click", startGame);
    document.getElementById("btn-code-open").addEventListener("click", showCodeInput);
    document.getElementById("btn-collection").addEventListener("click", renderCollection);
    // 显示已解锁计数
    var cnt = document.querySelector(".collect-count");
    if (cnt) {
      var unlocked = loadCollection().length;
      var total = RUGO.ALL_TITLES.length;
      cnt.textContent = unlocked + " / " + total;
    }
  }

  /* 输入人生码弹层 */
  function showCodeInput() {
    var overlay = document.createElement("div");
    overlay.className = "code-overlay";
    overlay.innerHTML =
      '<div class="code-dialog">' +
      '  <div class="code-dialog-title">输入人生码</div>' +
      '  <div class="code-dialog-sub">朋友分享的人生码，能复现他这一局的开局</div>' +
      '  <input class="code-input" id="code-input" maxlength="12" placeholder="如 K3F9X2" autocomplete="off">' +
      '  <div class="code-err" id="code-err"></div>' +
      '  <div class="code-dialog-btns">' +
      '    <button class="btn-ghost" id="code-cancel">取消</button>' +
      '    <button class="btn-gold" id="code-ok">重走这段人生</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById("code-cancel").addEventListener("click", function () { overlay.remove(); });
    document.getElementById("code-ok").addEventListener("click", function () {
      var raw = document.getElementById("code-input").value.trim();
      if (!raw) {
        document.getElementById("code-err").textContent = "请输入人生码";
        return;
      }
      var seed = RUGO.decodeCode(raw);
      overlay.remove();
      startGameWithSeed(seed);
    });
    document.getElementById("code-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") document.getElementById("code-ok").click();
    });
    setTimeout(function () {
      var inp = document.getElementById("code-input");
      if (inp) inp.focus();
    }, 50);
  }

  function startGame() {
    var seed = Math.floor(Math.random() * 1e9);
    startGameWithSeed(seed);
  }

  /* ---------- 人生收藏（结局图鉴屏） ---------- */
  var collectFilter = "all"; // all | got | locked

  function renderCollection(filter) {
    if (filter) collectFilter = filter;
    var unlocked = loadCollection();
    var titles = RUGO.ALL_TITLES;
    var hints = RUGO.TITLE_HINTS || [];
    var total = titles.length;
    var got = unlocked.length;

    var rows = titles.map(function (title, i) {
      return { title: title, hint: hints[i] || "", got: unlocked.indexOf(title) >= 0, i: i };
    });
    var shown = rows.filter(function (r) {
      if (collectFilter === "got") return r.got;
      if (collectFilter === "locked") return !r.got;
      return true;
    });

    var cards = shown.map(function (r) {
      var num = String(r.i + 1).padStart(2, "0");
      if (r.got) {
        return (
          '<div class="collect-card got">' +
          '  <div class="collect-num">' + num + "</div>" +
          '  <div class="collect-name">' + esc(r.title) + "</div>" +
          '  <div class="collect-state">已收入</div>' +
          "</div>"
        );
      }
      return (
        '<div class="collect-card locked">' +
        '  <div class="collect-num">' + num + "</div>" +
        '  <div class="collect-name">？</div>' +
        '  <div class="collect-hint">' + esc(r.hint) + "</div>" +
        "</div>"
      );
    }).join("");

    if (!shown.length) {
      cards = '<p class="collect-empty">' + (collectFilter === "got" ? "还没收进任何一个结局。先去活一局。" : "全都收齐了。") + "</p>";
    }

    var pct = Math.round((got / total) * 100);
    var tab = function (key, label, n) {
      return '<button class="collect-tab' + (collectFilter === key ? " on" : "") + '" data-filter="' + key + '">' +
        label + '<i>' + n + "</i></button>";
    };

    mount(
      '<div class="screen end">' +
      '  <div class="halo"></div>' +
      '  <div class="inner center">' +
      '    <div class="end-label">你走过的人生</div>' +
      '    <h2 class="end-title">人生收藏</h2>' +
      '    <p class="end-sub">' + total + ' 种活法，收到 ' + got + " 种。每一种，都有人真的这么过完了一辈子。</p>" +
      '    <div class="collect-progress">' +
      '      <div class="collect-bar"><div class="collect-fill" style="width:' + pct + '%"></div></div>' +
      '      <div class="collect-count-text">已解锁 ' + got + " / " + total + "　·　" + pct + "%</div>" +
      "    </div>" +
      '    <div class="collect-tabs">' +
      tab("all", "全部", total) + tab("got", "已得", got) + tab("locked", "未得", total - got) +
      "    </div>" +
      '    <div class="collect-grid">' + cards + "</div>" +
      '    <button class="btn-gold" id="btn-collect-back">返回</button>' +
      "  </div>" +
      "</div>"
    );

    Array.prototype.forEach.call(document.querySelectorAll(".collect-tab"), function (b) {
      b.addEventListener("click", function () { renderCollection(b.getAttribute("data-filter")); });
    });
    document.getElementById("btn-collect-back").addEventListener("click", renderHome);
  }

  function startGameWithSeed(seed) {
    state = RUGO.newState(seed);
    RUGO.start(state);
    renderCard();
  }

  /* ---------- 通用：进度 + 数值条的头部 ---------- */
  function renderHeader(idx, total, label) {
    var pct = Math.round((idx / total) * 100);
    return (
      '    <div class="progress-row">' +
      '      <span class="round">' + label + "</span>" +
      '      <span class="age">' + esc(state.life.age) + " 岁</span>" +
      "    </div>" +
      '    <div class="track"><div class="track-fill" style="width:' + pct + '%"></div></div>' +
      renderStats()
    );
  }

  /* ---------- 当前题（岔路抉择屏） ---------- */
  function renderCard() {
    var card = RUGO.currentCard(state);

    // 事件/连锁局分流
    if (RUGO.isEvent(state) || RUGO.isChain(state)) {
      renderEvent(card);
      return;
    }

    var total = state.deck.length;
    var idx = state.deckIndex;

    if (RUGO.isMulti(state)) {
      renderMulti(card, total, idx);
      return;
    }

    var opts = card.options.map(function (o) {
      var cls = o.key === "A" ? "opt-gain" : "opt-lose";
      var tag = o.key === "A" ? "得到" : "失去";
      return (
        '<div class="opt ' + cls + '" data-key="' + o.key + '">' +
        '  <div class="opt-head">' +
        '    <span class="opt-tag">' + o.key + "</span>" +
        '    <span class="opt-gain-label">' + tag + "</span>" +
        "  </div>" +
        '  <div class="opt-title">' + esc(o.title) + "</div>" +
        '  <div class="opt-text">' + esc(o.gain) + "<br>" + esc(o.lose) + "</div>" +
        "</div>"
      );
    }).join("");

    mount(
      '<div class="screen">' +
      '  <div class="halo"></div>' +
      '  <div class="inner">' +
      renderHeader(idx, total, "第 " + (idx + 1) + " / " + total + " 个岔路") +
      '    <div class="qcard">' +
      '      <div class="qkicker">人生的下一个岔路口</div>' +
      '      <div class="qtitle">' + esc(card.title) + "</div>" +
      '      <div class="qbody">' + esc(card.scene) + "</div>" +
      "    </div>" +
      '    <div class="opts">' + opts + "</div>" +
      "  </div>" +
      "</div>"
    );

    bindOptions(".opt");
  }

  /* ---------- 多选限选题（勾选 N 项） ---------- */
  function renderMulti(card, total, idx) {
    var pickCount = card.pickCount;

    var items = card.items.map(function (it) {
      return (
        '<div class="multi-item" data-key="' + it.key + '">' +
        '  <div class="multi-check"></div>' +
        '  <div class="multi-body">' +
        '    <div class="multi-name">' + esc(it.name) + "</div>" +
        '    <div class="multi-desc">' + esc(it.desc) + "</div>" +
        "  </div>" +
        '  <div class="multi-tag">' + esc(it.tag) + "</div>" +
        "</div>"
      );
    }).join("");

    mount(
      '<div class="screen">' +
      '  <div class="halo"></div>' +
      '  <div class="inner">' +
      renderHeader(idx, total, "第 " + (idx + 1) + " / " + total + " 个岔路") +
      '    <div class="qcard">' +
      '      <div class="qkicker">只能留下 ' + pickCount + ' 样 · 其余将被放弃</div>' +
      '      <div class="qtitle">' + esc(card.title) + "</div>" +
      '      <div class="qbody">' + esc(card.scene) + "</div>" +
      "    </div>" +
      '    <div class="multi-hint">已选 <span id="multi-count">0</span> / ' + pickCount + "</div>" +
      '    <div class="multi-list">' + items + "</div>" +
      '    <button class="btn-gold multi-confirm" id="multi-confirm" disabled>确认选择</button>' +
      "  </div>" +
      "</div>"
    );

    bindMulti();
  }

  function bindMulti() {
    var selected = [];
    var pickCount = RUGO.currentCard(state).pickCount;
    var confirmBtn = document.getElementById("multi-confirm");
    var countEl = document.getElementById("multi-count");

    function refresh() {
      countEl.textContent = selected.length;
      confirmBtn.disabled = selected.length !== pickCount;
    }

    var nodes = app.querySelectorAll(".multi-item");
    for (var i = 0; i < nodes.length; i++) {
      (function (node) {
        node.addEventListener("click", function () {
          var key = node.getAttribute("data-key");
          var pos = selected.indexOf(key);
          if (pos >= 0) {
            selected.splice(pos, 1);
            node.classList.remove("selected");
          } else {
            if (selected.length >= pickCount) return;
            selected.push(key);
            node.classList.add("selected");
          }
          refresh();
        });
      })(nodes[i]);
    }

    confirmBtn.addEventListener("click", function () {
      if (selected.length !== pickCount) return;
      RUGO.pickMulti(state, selected);
      renderBeat();
    });
  }

  /* ---------- 连锁剧情屏 ---------- */
  function renderBeat() {
    var beat = RUGO.currentBeat(state);
    if (!beat) {
      var next = RUGO.nextCard(state);
      if (next) { renderCard(); } else { finishGame(); }
      return;
    }

    var opts = Object.keys(beat.choice).map(function (k) {
      var c = beat.choice[k];
      return (
        '<div class="beat-opt" data-key="' + k + '">' +
        '  <div class="opt-title">' + esc(c.title) + "</div>" +
        '  <div class="opt-text">' + esc(c.text) + "</div>" +
        "</div>"
      );
    }).join("");

    var total = state.deck.length;
    var idx = state.deckIndex;

    mount(
      '<div class="screen">' +
      '  <div class="halo"></div>' +
      '  <div class="inner">' +
      renderHeader(idx, total, esc(state.picked.follow.title)) +
      '    <div class="qcard">' +
      '      <div class="qbody">' + esc(beat.scene) + "</div>" +
      "    </div>" +
      '    <div class="opts beat-opts">' + opts + "</div>" +
      "  </div>" +
      "</div>"
    );

    bindOptions(".beat-opt");
  }

  /* ---------- 事件屏 / 连锁局屏 ---------- */
  function renderEvent(card) {
    var isChain = RUGO.isChain(state);
    var kicker = isChain ? "命运的回响 · 当年的选择回来了" : "命运的小插曲";
    var total = state.deck.length;
    var idx = state.deckIndex;

    var opts = card.options.map(function (o) {
      return (
        '<div class="beat-opt ev-opt" data-key="' + o.key + '">' +
        '  <div class="opt-title">' + esc(o.title) + "</div>" +
        '  <div class="opt-text">' + esc(o.text) + "</div>" +
        "</div>"
      );
    }).join("");

    mount(
      '<div class="screen">' +
      '  <div class="halo"></div>' +
      '  <div class="inner">' +
      renderHeader(idx, total, "命运事件") +
      '    <div class="qcard ' + (isChain ? "qcard-chain" : "") + '">' +
      '      <div class="qkicker">' + kicker + "</div>" +
      '      <div class="qtitle">' + esc(card.title) + "</div>" +
      '      <div class="qbody">' + esc(card.scene) + "</div>" +
      "    </div>" +
      '    <div class="opts beat-opts">' + opts + "</div>" +
      "  </div>" +
      "</div>"
    );

    bindEventOptions();
  }

  function bindEventOptions() {
    var nodes = app.querySelectorAll(".ev-opt");
    for (var i = 0; i < nodes.length; i++) {
      (function (node) {
        node.addEventListener("click", function () {
          var key = node.getAttribute("data-key");
          RUGO.pickEventOption(state, key);
          var next = RUGO.nextCard(state);
          if (next) { renderCard(); } else { finishGame(); }
        });
      })(nodes[i]);
    }
  }

  function bindOptions(selector) {
    var nodes = app.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      (function (node) {
        node.addEventListener("click", function () {
          var key = node.getAttribute("data-key");
          if (selector === ".opt") {
            RUGO.pickOption(state, key);
            renderBeat();
          } else {
            RUGO.pickBeat(state, key);
            renderBeat();
          }
        });
      })(nodes[i]);
    }
  }

  /* ---------- 结局屏 ---------- */
  function finishGame() {
    var report = RUGO.settle(state);
    // 解锁结局称号（持久化到收藏图鉴）
    var isNew = unlockTitle(report.title);
    var regrets = report.regrets.map(function (r) {
      return '<div class="regret-item">' + esc(r) + "</div>";
    }).join("");

    // 四维数值的结局展示
    var statSummary = STATS_META.map(function (m) {
      var v = report.stats[m.key];
      var comment = v >= 80 ? "丰沛" : v >= 60 ? "尚可" : v >= 40 ? "勉强" : "匮乏";
      return (
        '<div class="end-stat">' +
        '  <span class="end-stat-label">' + m.label + "</span>" +
        '  <span class="end-stat-val" style="color:' + m.color + '">' + v + " · " + comment + "</span>" +
        "</div>"
      );
    }).join("");

    mount(
      '<div class="screen end">' +
      '  <div class="halo"></div>' +
      '  <div class="inner center">' +
      '    <div class="end-label">人生走完 · ' + esc(report.age) + " 岁</div>" +
      (isNew ? '    <div class="unlock-banner">✦ 新结局已收入「人生收藏」</div>' : "") +
      '    <h2 class="end-title">' + esc(report.title) + "</h2>" +
      '    <p class="end-sub">' + esc(report.commentary) + "</p>" +
      '    <div class="divider"></div>' +
      '    <div class="end-stats">' + statSummary + "</div>" +
      '    <div class="divider"></div>' +
      '    <div class="regret-card">' +
      '      <div class="regret-title">这一生，你放弃了</div>' +
      regrets +
      '      <div class="regret-tag">' + esc(report.regrets.length) + " 样放弃 · 总价值无法估量</div>" +
      "    </div>" +
      '    <button class="btn-ghost" id="btn-reverse">看看当年反着选，会怎样</button>' +
      '    <button class="btn-share" id="btn-share">分享这局人生</button>' +
      '    <button class="btn-gold" id="btn-replay">再活一次</button>' +
      '    <button class="btn-ghost" id="btn-restart">回到首页</button>' +
      "  </div>" +
      "</div>"
    );

    document.getElementById("btn-reverse").addEventListener("click", function () {
      renderReverse(report);
    });
    document.getElementById("btn-share").addEventListener("click", function () {
      showShareCode(report);
    });
    document.getElementById("btn-replay").addEventListener("click", startGame);
    document.getElementById("btn-restart").addEventListener("click", renderHome);
  }

  /* ---------- 分享：结局长图 + 人生码 ----------
   * 之前只能复制一串码，朋友拿到码还得自己再走一遍；
   * 现在直接出一张 1080×1440 的长图，标题、判词、四维、放弃几样都在上面。
   * 全部用 canvas 画，不依赖任何外部图片与字体文件，file:// 双击也能存。
   */
  function wrapText(g, text, x, y, maxW, lineH) {
    var line = "", cur = y;
    for (var i = 0; i < text.length; i++) {
      var t = line + text[i];
      if (g.measureText(t).width > maxW && line) {
        g.fillText(line, x, cur);
        line = text[i];
        cur += lineH;
      } else {
        line = t;
      }
    }
    if (line) { g.fillText(line, x, cur); cur += lineH; }
    return cur;
  }

  function buildPoster(report) {
    var W = 1080, H = 1440;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var SERIF = '"Source Han Serif CN","Noto Serif SC","Songti SC",serif';
    var SANS = '"Source Han Sans CN","Noto Sans SC","PingFang SC",sans-serif';

    g.fillStyle = "#050010";
    g.fillRect(0, 0, W, H);

    var halo = g.createRadialGradient(W / 2, -160, 0, W / 2, -160, 980);
    halo.addColorStop(0, "rgba(126,74,208,0.52)");
    halo.addColorStop(1, "rgba(5,0,16,0)");
    g.fillStyle = halo;
    g.fillRect(0, 0, W, H);

    g.strokeStyle = "rgba(232,194,104,0.28)";
    g.lineWidth = 2;
    g.strokeRect(46, 46, W - 92, H - 92);

    g.textAlign = "center";

    /* 眉标 */
    g.fillStyle = "rgba(232,194,104,0.75)";
    g.font = "26px " + SANS;
    g.fillText("如 果 当 时", W / 2, 172);

    g.fillStyle = "rgba(232,194,104,0.5)";
    g.font = "22px " + SANS;
    g.fillText("人 生 走 完 · " + report.age + " 岁", W / 2, 224);

    /* 结局名 */
    g.fillStyle = "#E8C268";
    g.font = "700 84px " + SERIF;
    g.fillText(report.title, W / 2, 400);

    /* 判词 */
    g.fillStyle = "#c9c1dc";
    g.font = "30px " + SERIF;
    wrapText(g, report.commentary, W / 2, 500, W - 220, 52);

    /* 四维 */
    var keys = ["money", "health", "social", "happy"];
    var labels = ["钱", "健康", "人脉", "幸福"];
    var colors = ["#E8C268", "#7DD9A6", "#7FB5E0", "#E07866"];
    var y0 = 700;
    for (var i = 0; i < 4; i++) {
      var yy = y0 + i * 92;
      var v = report.stats[keys[i]] || 0;
      g.textAlign = "left";
      g.fillStyle = "rgba(255,255,255,0.62)";
      g.font = "26px " + SANS;
      g.fillText(labels[i], 150, yy);
      /* 轨道 */
      g.fillStyle = "rgba(255,255,255,0.10)";
      g.fillRect(240, yy - 14, 640, 14);
      g.fillStyle = colors[i];
      g.fillRect(240, yy - 14, 640 * Math.max(0, Math.min(100, v)) / 100, 14);
      g.textAlign = "right";
      g.fillStyle = colors[i];
      g.font = "26px " + SANS;
      g.fillText(String(v), 930, yy);
      g.textAlign = "center";
    }

    /* 放弃 */
    g.fillStyle = "rgba(255,255,255,0.45)";
    g.font = "24px " + SANS;
    g.fillText("这一生，你放弃了 " + report.regrets.length + " 样东西", W / 2, 1148);
    if (report.regrets.length) {
      g.fillStyle = "rgba(224,120,102,0.85)";
      g.font = "22px " + SANS;
      var head = report.regrets.slice(0, 3).join(" · ");
      if (head.length > 34) head = head.slice(0, 34) + "…";
      g.fillText(head, W / 2, 1192);
    }

    /* 底 */
    g.fillStyle = "rgba(232,194,104,0.10)";
    g.fillRect(300, 1244, W - 600, 1);
    g.fillStyle = "rgba(255,255,255,0.35)";
    g.font = "22px " + SANS;
    g.fillText("人生码 " + RUGO.encodeCode(state.seed), W / 2, 1300);
    g.fillStyle = "rgba(232,194,104,0.55)";
    g.font = "22px " + SANS;
    g.fillText("#如果当时 · 人生的岔路，你敢重走几次", W / 2, 1348);

    return cv;
  }

  /* 分享弹层 */
  function showShareCode(report) {
    var code = RUGO.encodeCode(state.seed);
    var dataUrl = null;
    var cv = null;
    try {
      cv = buildPoster(report);
      dataUrl = cv.toDataURL("image/png");
    } catch (e) { dataUrl = null; }

    var overlay = document.createElement("div");
    overlay.className = "code-overlay";
    overlay.innerHTML =
      '<div class="code-dialog share-dialog">' +
      '  <div class="code-dialog-title">' + (dataUrl ? "存下这一生" : "你的人生码") + "</div>" +
      '  <div class="code-dialog-sub">' + (dataUrl
        ? "一张长图，发去哪儿都行。图上有人生码，朋友照着能重走你这一局。"
        : "把这串码发给朋友，他能复现你这一局的开局") + "</div>" +
      (dataUrl ? '  <img class="share-poster" src="' + dataUrl + '" alt="人生结局长图">' : "") +
      '  <div class="code-display" id="code-display">' + code + "</div>" +
      '  <div class="code-caption">#如果当时 · ' + esc(report.title) + "</div>" +
      '  <div class="code-dialog-btns">' +
      '    <button class="btn-ghost" id="share-close">关闭</button>' +
      (dataUrl ? '    <button class="btn-ghost" id="share-save">存图</button>' : "") +
      '    <button class="btn-gold" id="share-copy">复制人生码</button>' +
      "  </div>" +
      "</div>";
    document.body.appendChild(overlay);

    document.getElementById("share-close").addEventListener("click", function () { overlay.remove(); });
    document.getElementById("share-copy").addEventListener("click", function () {
      copyText(code);
      var b = document.getElementById("share-copy");
      b.textContent = "已复制";
      setTimeout(function () { b.textContent = "复制人生码"; }, 1500);
    });
    var saveBtn = document.getElementById("share-save");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = "如果当时-" + report.title + "-" + report.age + "岁.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        saveBtn.textContent = "已存";
        setTimeout(function () { saveBtn.textContent = "存图"; }, 1500);
      });
    }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- 反向人生屏：你的人生 vs 另一种人生 ---------- */
  function renderReverse(report) {
    var rev = RUGO.settleReverse(state);

    function statRow(m, v) {
      var comment = v >= 80 ? "丰沛" : v >= 60 ? "尚可" : v >= 40 ? "勉强" : "匮乏";
      return (
        '<div class="end-stat">' +
        '  <span class="end-stat-label">' + m.label + "</span>" +
        '  <span class="end-stat-val" style="color:' + m.color + '">' + v + "</span>" +
        "</div>"
      );
    }

    var myStats = STATS_META.map(function (m) { return statRow(m, report.stats[m.key]); }).join("");
    var revStats = STATS_META.map(function (m) { return statRow(m, rev.stats[m.key]); }).join("");

    var revRegrets = rev.regrets.slice(0, 4).map(function (r) {
      return '<div class="regret-item">' + esc(r) + "</div>";
    }).join("");
    if (rev.regrets.length > 4) {
      revRegrets += '<div class="regret-item" style="color:#6B6B6B">……还有 ' + (rev.regrets.length - 4) + " 样</div>";
    }

    mount(
      '<div class="screen end">' +
      '  <div class="halo"></div>' +
      '  <div class="inner center">' +
      '    <div class="end-label">如果当年，你反着选</div>' +
      '    <h2 class="end-title">另一种人生</h2>' +
      '    <p class="end-sub">把这一生每一步都反过来，命运会把你带向哪？</p>' +
      '    <div class="divider"></div>' +
      '    <div class="versus">' +
      '      <div class="vs-card vs-mine">' +
      '        <div class="vs-head">你的人生</div>' +
      '        <div class="vs-title">' + esc(report.title) + "</div>" +
      '        <div class="vs-age">' + esc(report.age) + " 岁</div>" +
      '        <div class="vs-stats">' + myStats + "</div>" +
      "      </div>" +
      '      <div class="vs-arrow">⟷</div>' +
      '      <div class="vs-card vs-alt">' +
      '        <div class="vs-head">另一种人生</div>' +
      '        <div class="vs-title">' + esc(rev.title) + "</div>" +
      '        <div class="vs-age">' + esc(rev.age) + " 岁</div>" +
      '        <div class="vs-stats">' + revStats + "</div>" +
      "      </div>" +
      "    </div>" +
      '    <div class="regret-card">' +
      '      <div class="regret-title">另一种人生里，你放弃了</div>' +
      revRegrets +
      "    </div>" +
      '    <button class="btn-gold" id="btn-replay2">再活一次</button>' +
      '    <button class="btn-ghost" id="btn-back2">回到我的结局</button>' +
      "  </div>" +
      "</div>"
    );

    document.getElementById("btn-replay2").addEventListener("click", startGame);
    document.getElementById("btn-back2").addEventListener("click", function () { finishGame(); });
  }

  /* ---------- 启动 ---------- */
  /* 调试钩子：只给 tools 下的截图脚本用。页面不设 __RUGO_DEBUG__ 就不暴露任何东西。 */
  if (global.__RUGO_DEBUG__) {
    global.RUGO_UI = {
      renderCollection: renderCollection,
      showShareCode: showShareCode,
      finishGame: finishGame,
      renderCard: renderCard,
      setState: function (s) { state = s; }
    };
  }
  renderHome();
})(window);
