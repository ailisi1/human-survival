/* =========================================================
   era.js — 详情页（era.html?id=xxx）
   ---------------------------------------------------------
   「恭喜你穿越到 X」这一页的全部渲染逻辑：
     · 从 ?id= 取时代，找不到就给出可点击的兜底列表；
     · 顶部入境卡（年代 / 难度 / 一句氛围 / 简介 / 数据）；
     · 左侧本页目录，正文按五章分组渲染；
     · 上一站 / 下一站，键盘 ← → 可直接换时代。
   本文件不含任何时代内容。
   ========================================================= */

(function () {
  'use strict';

  var C = window.GuideCore;
  var eras = [];
  var era = null;

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(location.search || '');
    if (!m) return '';
    try { return decodeURIComponent(m[1].replace(/\+/g, ' ')); } catch (e) { return m[1]; }
  }

  function wantedId() {
    var id = param('id');
    if (!id && location.hash && location.hash.length > 1) {
      id = location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch (e) { /* 原样 */ }
    }
    return id;
  }

  function counts(e) {
    var blocks = C.arrayOf(e.blocks);
    var recipe = 0, danger = 0, role = 0;
    blocks.forEach(function (b) {
      if (b.type === 'recipe') recipe++;
      if (b.type === 'callout' && (b.tone === 'danger' || b.tone === 'warn')) danger++;
      if (b.cat === '身份' && b.type === 'list') role += C.arrayOf(b.items).length;
    });
    return { all: blocks.length, recipe: recipe, danger: danger, role: role };
  }

  /* ---------------- 未找到 ---------------- */

  function renderMissing(id) {
    document.title = '没有这个时代 · 穿越求生指南';
    var list = eras.map(function (e, i) {
      return '<a class="miss-item" href="era.html?id=' + encodeURIComponent(e.id) + '">' +
        '<span class="miss-no">' + C.pad2(i + 1) + '</span>' +
        '<span class="miss-name">' + C.inline(e.name || e.id) + '</span>' +
        '<span class="miss-years">' + C.inline(e.years || '') + '</span></a>';
    }).join('');

    C.$('#eraMain').innerHTML =
      '<section class="arrive arrive-missing">' +
        '<div class="arrive-kicker"><span class="arrive-no">404</span><span class="arrive-of">坐标丢了</span></div>' +
        '<h1 class="arrive-title">你落在了一片空白里</h1>' +
        '<p class="arrive-greet">没有找到' + (id ? '「' + C.esc(id) + '」' : '目标时代') +
          '这个坐标。可能是链接手改过，也可能这个时代还没写。</p>' +
      '</section>' +
      '<section class="sec"><div class="sec-head"><h2 class="sec-title">已收录的时代</h2></div>' +
        '<div class="miss-list">' + list + '</div></section>';

    C.$('#toc').hidden = true;
    C.$('#crumb').innerHTML = '<a href="index.html">全部时代</a>';
  }

  /* ---------------- 入境卡 ---------------- */

  function heroHtml(e, seq) {
    var n = counts(e);
    var name = e.fullName || e.name || e.id;
    var title = e.arriveTitle
      ? C.inline(e.arriveTitle).replace(/\n/g, '<br>')
      : '恭喜你，<br>穿越到<b>' + C.inline(name) + '</b>';

    return '<section class="arrive' + (e.modern ? ' arrive-modern' : '') + '">' +
        '<div class="arrive-kicker">' +
          '<span class="arrive-no">第 ' + C.pad2(seq) + ' 站</span>' +
          '<span class="arrive-of">共 ' + eras.length + ' 站</span>' +
          (e.group ? '<span class="arrive-group">' + C.esc(e.group) + '</span>' : '') +
        '</div>' +
        '<h1 class="arrive-title">' + title + '</h1>' +
        (e.years ? '<p class="arrive-years">' + C.inline(e.years) + '</p>' : '') +
        (e.greet ? '<p class="arrive-greet">' + C.inline(e.greet) + '</p>' : '') +
        (e.intro ? '<div class="arrive-intro">' + C.paras(e.intro) + '</div>' : '') +
        '<div class="arrive-stats">' +
          (e.difficulty ? '<span class="pill">生存难度 ' + C.difficultyDots(e.difficulty) + '</span>' : '') +
          (e.diffText ? '<span class="pill">' + C.inline(e.diffText) + '</span>' : '') +
          '<span class="pill"><b>' + n.all + '</b> 条内容</span>' +
          (n.role ? '<span class="pill"><b>' + n.role + '</b> 种身份</span>' : '') +
          '<span class="pill"><b>' + n.recipe + '</b> 份配方</span>' +
        '</div>' +
        '<span class="seal" aria-hidden="true"><i>入</i><i>境</i></span>' +
      '</section>';
  }

  /* ---------------- 正文 ---------------- */

  function sectionHtml(sec, blocks) {
    return '<section class="sec" id="sec-' + C.esc(sec.id) + '">' +
        '<div class="sec-head">' +
          '<span class="sec-no">' + C.esc(sec.no) + '</span>' +
          '<div class="sec-headtext">' +
            '<h2 class="sec-title">' + C.inline(sec.title) + '</h2>' +
            '<span class="sec-en">' + C.esc(sec.en) + '</span>' +
          '</div>' +
        '</div>' +
        (sec.desc ? '<p class="sec-desc">' + C.inline(sec.desc) + '</p>' : '') +
        '<div class="blocks">' + blocks.map(function (b) { return C.renderBlock(b, b._id); }).join('') + '</div>' +
      '</section>';
  }

  function tocHtml(groups) {
    var html = '<div class="toc-head">本页目录</div><div class="toc-body">';
    groups.forEach(function (g) {
      html += '<a class="toc-sec" href="#sec-' + C.esc(g.section.id) + '">' +
          '<span class="toc-no">' + C.esc(g.section.no) + '</span>' + C.inline(g.section.title) + '</a>';
      html += '<div class="toc-sub">' + g.blocks.filter(function (b) { return !!b.title; }).map(function (b) {
        return '<a class="toc-item" href="#' + C.esc(b._id) + '" data-target="' + C.esc(b._id) + '">' +
          C.esc(C.plain(b.title)) + '</a>';
      }).join('') + '</div>';
    });
    return html + '</div>';
  }

  function footHtml(prev, next) {
    function card(e, dir) {
      if (!e) return '<span class="next-card is-empty"></span>';
      return '<a class="next-card" href="era.html?id=' + encodeURIComponent(e.id) + '">' +
          '<span class="next-dir">' + dir + '</span>' +
          '<span class="next-name">' + C.inline(e.name || e.id) + '</span>' +
          '<span class="next-years">' + C.inline(e.years || '') + '</span></a>';
    }
    return '<nav class="era-foot">' +
        card(prev, '← 上一站') +
        '<a class="next-home" href="index.html">全部时代</a>' +
        card(next, '下一站 →') +
      '</nav>';
  }

  /* ---------------- 滚动高亮 ---------------- */

  function initSpy() {
    var links = C.$$('.toc-item');
    var secs = C.$$('.sec');
    if (!links.length || !secs.length) return;

    var ticking = false;
    function update() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var line = 130;
        var currentSec = null;
        secs.forEach(function (s) { if (s.getBoundingClientRect().top <= line) currentSec = s; });

        var current = null;
        links.forEach(function (a) {
          var t = document.getElementById(a.getAttribute('data-target'));
          if (t && t.getBoundingClientRect().top <= line + 40) current = a;
        });

        links.forEach(function (a) { a.classList.toggle('active', a === current); });
        C.$$('.toc-sec').forEach(function (a) {
          var id = (a.getAttribute('href') || '').replace(/^#/, '');
          a.classList.toggle('active', !!currentSec && currentSec.id === id);
        });

        var active = current || C.$('.toc-sec.active');
        if (active && window.innerWidth > 960) {
          var box = C.$('#toc');
          var r = active.getBoundingClientRect(), br = box.getBoundingClientRect();
          if (r.top < br.top + 40 || r.bottom > br.bottom - 40) {
            box.scrollTop += (r.top - br.top) - br.height / 2 + r.height / 2;
          }
        }
        ticking = false;
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------- 初始化 ---------------- */

  function init() {
    eras = window.sortedEras();
    var id = wantedId();
    era = id ? window.getEra(id) : eras[0];

    if (!era) {
      renderMissing(id);
      C.initChrome();
      return;
    }

    var seq = eras.indexOf(era) + 1;
    var prev = eras[seq - 2] || null;
    var next = eras[seq] || null;
    var groups = C.groupBlocks(era);

    document.title = '恭喜你穿越到' + (era.fullName || era.name || era.id) + ' · 穿越求生指南';

    C.$('#crumb').innerHTML =
      '<span class="crumb-no">' + C.pad2(seq) + ' / ' + C.pad2(eras.length) + '</span>' +
      '<span class="crumb-name">' + C.inline(era.name || era.id) + '</span>';

    C.$('#switch').innerHTML =
      (prev ? '<a class="sw" href="era.html?id=' + encodeURIComponent(prev.id) + '" title="' + C.esc(prev.name) + '">← ' +
        C.inline(prev.name) + '</a>' : '<span class="sw is-empty"></span>') +
      (next ? '<a class="sw" href="era.html?id=' + encodeURIComponent(next.id) + '" title="' + C.esc(next.name) + '">' +
        C.inline(next.name) + ' →</a>' : '<span class="sw is-empty"></span>');

    C.$('#toc').innerHTML = tocHtml(groups);

    C.$('#eraMain').innerHTML =
      heroHtml(era, seq) +
      groups.map(function (g) { return sectionHtml(g.section, g.blocks); }).join('') +
      footHtml(prev, next) +
      '<footer class="foot">' +
        '<p><b>穿越求生指南</b> · 你正在读第 ' + C.pad2(seq) + ' 站「' + C.esc(era.name || era.id) + '」。</p>' +
        '<p>本页内容全部来自 <code>data/' + C.esc(era.id) + '/</code> 下的 JS 数据文件；' +
        '新增内容只需加一个数据文件并在 <code>js/data-manifest.js</code> 里加一行。</p>' +
      '</footer>';

    C.initChrome();
    initSpy();

    // 键盘换时代
    document.addEventListener('keydown', function (ev) {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
      if (ev.key === 'ArrowLeft' && prev) location.href = 'era.html?id=' + encodeURIComponent(prev.id);
      if (ev.key === 'ArrowRight' && next) location.href = 'era.html?id=' + encodeURIComponent(next.id);
    });

    // 深链接（#qin-b3 / #sec-craft）
    if (location.hash && location.hash.length > 1 && location.search.indexOf('id=') >= 0) {
      var hid = location.hash.slice(1);
      try { hid = decodeURIComponent(hid); } catch (e) { /* 原样 */ }
      var t = document.getElementById(hid);
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: 'auto', block: 'start' }); }, 60);
    }

    console.log('[穿越求生指南] ' + era.name + '：' + C.arrayOf(era.blocks).length + ' 条 / ' + groups.length + ' 章');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
