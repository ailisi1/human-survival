/* =========================================================
   home.js — 目录页（index.html）
   ---------------------------------------------------------
   只做一件事：把 window.ERAS 渲染成「按分组排列的时代卡片」。
   不含任何时代内容；所有文案都来自数据文件。
   ========================================================= */

(function () {
  'use strict';

  var C = window.GuideCore;

  var eras = [];
  var activeGroup = '全部';

  function counts(era) {
    var blocks = C.arrayOf(era.blocks);
    var recipe = 0, danger = 0, role = 0;
    blocks.forEach(function (b) {
      if (b.type === 'recipe') recipe++;
      if (b.type === 'callout' && (b.tone === 'danger' || b.tone === 'warn')) danger++;
      // 身份数 = 「你是哪一种人」章里列出的身份条目总数
      if (b.cat === '身份' && b.type === 'list') role += C.arrayOf(b.items).length;
    });
    return { all: blocks.length, recipe: recipe, danger: danger, role: role };
  }

  function searchText(era) {
    var parts = [era.name, era.fullName, era.years, era.intro, era.diffText, era.group, era.id];
    C.arrayOf(era.blocks).forEach(function (b) {
      parts.push(b.title, b.tag);
      (function walk(v) {
        if (v == null) return;
        if (typeof v === 'string') parts.push(v);
        else if (Array.isArray(v)) v.forEach(walk);
        else if (typeof v === 'object') Object.keys(v).forEach(function (k) { if (k !== '_id') walk(v[k]); });
      })(b);
    });
    return C.plain(parts.join(' ')).toLowerCase();
  }

  function card(era, seq) {
    var n = counts(era);
    var href = 'era.html?id=' + encodeURIComponent(era.id);
    return '<a class="card' + (era.modern ? ' card-modern' : '') + '" href="' + href + '"' +
        ' data-era="' + C.esc(era.id) + '" data-group="' + C.esc(era.group || '其他') + '">' +
        '<span class="card-no">' + C.pad2(seq) + '</span>' +
        '<span class="card-tag">' + (era.modern ? '当代 · 机遇' : '古代 · 生存') + '</span>' +
        '<h3 class="card-name">' + C.inline(era.name || era.id) + '</h3>' +
        (era.years ? '<p class="card-years">' + C.inline(era.years) + '</p>' : '') +
        (era.intro ? '<p class="card-intro">' + C.inline(era.intro) + '</p>' : '') +
        '<div class="card-foot">' +
          (era.difficulty ? '<span class="card-diff">难度 ' + C.difficultyDots(era.difficulty) + '</span>' : '') +
          '<span class="card-count">' + [
            n.all + ' 条',
            n.role ? n.role + ' 身份' : '',
            n.recipe ? n.recipe + ' 配方' : ''
          ].filter(Boolean).join(' · ') + '</span>' +
          '<span class="card-go">进入 →</span>' +
        '</div>' +
      '</a>';
  }

  function renderGroups() {
    var groups = [];
    eras.forEach(function (e) {
      var g = e.group || '其他';
      if (groups.indexOf(g) < 0) groups.push(g);
    });

    var seq = 0;
    var html = groups.map(function (g) {
      var list = eras.filter(function (e) { return (e.group || '其他') === g; });
      var cards = list.map(function (e) { seq++; return card(e, seq); }).join('');
      return '<section class="hub-group" data-group="' + C.esc(g) + '">' +
          '<div class="group-head">' +
            '<h2 class="group-title">' + C.esc(g) + '</h2>' +
            '<span class="group-count">' + list.length + ' 个时代</span>' +
            '<span class="group-rule"></span>' +
          '</div>' +
          '<div class="card-grid">' + cards + '</div>' +
        '</section>';
    }).join('');

    C.$('#groups').innerHTML = html;
    C.$$('.card').forEach(function (el, i) {
      var eraId = el.getAttribute('data-era');
      el._seq = i;
      el._text = searchText(window.ERA_MAP[eraId] || {});
    });
  }

  function renderChips() {
    var groups = [];
    eras.forEach(function (e) {
      var g = e.group || '其他';
      if (groups.indexOf(g) < 0) groups.push(g);
    });
    var all = ['全部'].concat(groups);
    C.$('#groupChips').innerHTML = all.map(function (g) {
      return '<button class="chip-btn' + (g === activeGroup ? ' on' : '') + '" data-group="' + C.esc(g) + '">' +
        C.esc(g) + '</button>';
    }).join('');
  }

  function apply() {
    var q = (C.$('#q').value || '').trim().toLowerCase();
    var shown = 0;

    C.$$('.card').forEach(function (el) {
      var okGroup = activeGroup === '全部' || el.getAttribute('data-group') === activeGroup;
      var okText = !q || (el._text || '').indexOf(q) >= 0;
      var ok = okGroup && okText;
      el.hidden = !ok;
      if (ok) shown++;
    });

    C.$$('.hub-group').forEach(function (sec) {
      sec.hidden = !sec.querySelector('.card:not([hidden])');
    });

    var hint = C.$('#qHint');
    if (q || activeGroup !== '全部') {
      hint.hidden = false;
      hint.textContent = shown ? ('筛出 ' + shown + ' 个时代' + (q ? '，关键词「' + q + '」' : '')) : '没有匹配的时代';
    } else {
      hint.hidden = true;
    }

    C.$('#empty').hidden = shown > 0;
    C.$('#qClear').hidden = !q;
  }

  function init() {
    eras = window.sortedEras();

    var blocks = 0, recipes = 0, groups = [];
    eras.forEach(function (e) {
      blocks += C.arrayOf(e.blocks).length;
      C.arrayOf(e.blocks).forEach(function (b) { if (b.type === 'recipe') recipes++; });
      var g = e.group || '其他';
      if (groups.indexOf(g) < 0) groups.push(g);
    });

    C.$('#heroStats').innerHTML =
      '<span class="pill"><b>' + eras.length + '</b> 个时代</span>' +
      '<span class="pill"><b>' + blocks + '</b> 条内容</span>' +
      '<span class="pill"><b>' + recipes + '</b> 份配方</span>' +
      '<span class="pill"><b>' + groups.length + '</b> 个分组</span>' +
      '<span class="pill">纯静态 · 双击即开</span>';

    C.$('#topStats').innerHTML =
      '<span class="stat"><b>' + eras.length + '</b>个时代</span>' +
      '<span class="stat"><b>' + recipes + '</b>份配方</span>';

    renderGroups();
    renderChips();
    apply();

    C.$('#q').addEventListener('input', apply);
    C.$('#qClear').addEventListener('click', function () {
      C.$('#q').value = '';
      apply();
      C.$('#q').focus();
    });
    C.$('#groupChips').addEventListener('click', function (ev) {
      var b = ev.target.closest('.chip-btn');
      if (!b) return;
      activeGroup = b.getAttribute('data-group');
      C.$$('.chip-btn').forEach(function (x) { x.classList.toggle('on', x === b); });
      apply();
    });

    document.addEventListener('keydown', function (ev) {
      var input = C.$('#q');
      if (ev.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        ev.preventDefault();
        input.focus();
        input.select();
      }
      if (ev.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        apply();
        input.blur();
      }
    });

    C.initChrome();
    console.log('[穿越求生指南] 目录页已渲染 ' + eras.length + ' 个时代 / ' + blocks + ' 条目');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
