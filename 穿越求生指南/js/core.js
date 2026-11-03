/* =========================================================
   core.js — 公共层（目录页与详情页共用）
   ---------------------------------------------------------
   本文件【不含任何时代内容】：
     1. 文本工具：转义、行内标记、分段；
     2. 块渲染器：text / list / steps / recipe / table /
        callout / checklist / timeline；
     3. 分章规则：把 blocks 按类别归到「落地须知 / 政局与机遇 /
        能造什么 / 致命雷区 / 行动清单」五章；
     4. 复制、Toast、阅读进度、返回顶部。
   新增内容不需要改这里。
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- 文本工具 ---------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 行内标记：**加粗**、`代码`
  function inline(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  // 段落：空行分段，单换行变 <br>
  function paras(s) {
    return String(s == null ? '' : s)
      .split(/\n{2,}/)
      .filter(function (p) { return p.trim() !== ''; })
      .map(function (p) { return '<p>' + inline(p).replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  function plain(s) {
    return String(s == null ? '' : s).replace(/\*\*/g, '').replace(/`/g, '');
  }

  function arrayOf(v) { return Array.isArray(v) ? v : []; }

  function pad2(n) {
    n = String(n == null ? '' : n);
    return n.length < 2 ? '0' + n : n;
  }

  /* ---------------- 复制文案 ---------------- */

  function recipeText(b) {
    var L = ['【' + (b.title || '配方') + '】' + (b.tag ? ' · ' + b.tag : '')];
    if (b.time) L.push('耗时：' + plain(b.time));
    if (b.level) L.push('难度 / 成功率：' + plain(b.level));
    if (arrayOf(b.materials).length) {
      L.push('', '材料：');
      arrayOf(b.materials).forEach(function (m) { L.push('- ' + plain(m)); });
    }
    if (arrayOf(b.steps).length) {
      L.push('', '步骤：');
      arrayOf(b.steps).forEach(function (s, i) { L.push((i + 1) + '. ' + plain(s)); });
    }
    if (arrayOf(b.notes).length) {
      L.push('', '要点：');
      arrayOf(b.notes).forEach(function (n) { L.push('· ' + plain(n)); });
    }
    L.push('', '—— 来自《穿越求生指南》');
    return L.join('\n');
  }

  function stepsText(b) {
    var L = [(b.title || '步骤') + '：', ''];
    arrayOf(b.items).forEach(function (s, i) { L.push((i + 1) + '. ' + plain(s)); });
    L.push('', '—— 来自《穿越求生指南》');
    return L.join('\n');
  }

  function checklistText(b) {
    var L = [(b.title || '行动清单') + '：', ''];
    arrayOf(b.items).forEach(function (s) { L.push('[ ] ' + plain(s)); });
    L.push('', '—— 来自《穿越求生指南》');
    return L.join('\n');
  }

  /* ---------------- 块渲染 ---------------- */

  var COPY = {};   // blockId -> 待复制文本

  function head(b, copyLabel) {
    if (!b.title && !copyLabel) return '';
    var btn = copyLabel
      ? '<button class="copy" type="button" data-copy="' + esc(b._id) + '">' + esc(copyLabel) + '</button>'
      : '';
    return '<div class="blk-head">' +
      (b.title ? '<h3 class="blk-title">' + inline(b.title) + '</h3>' : '') +
      btn + '</div>';
  }

  var RENDER = {

    text: function (b) {
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b) + paras(b.text) + '</article>';
    },

    list: function (b) {
      var items = arrayOf(b.items).map(function (it) {
        if (it && typeof it === 'object') {
          return '<li>' + (it.t ? '<b>' + inline(it.t) + '</b>' : '') +
            (it.d ? (it.t ? '　' : '') + inline(it.d) : '') + '</li>';
        }
        return '<li>' + inline(it) + '</li>';
      }).join('');
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b) +
        '<ul class="blk-list">' + items + '</ul></article>';
    },

    steps: function (b) {
      COPY[b._id] = stepsText(b);
      var items = arrayOf(b.items).map(function (s) { return '<li>' + inline(s) + '</li>'; }).join('');
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b, '复制步骤') +
        '<ol class="blk-steps">' + items + '</ol></article>';
    },

    recipe: function (b) {
      COPY[b._id] = recipeText(b);
      var tags = [];
      if (b.tag) tags.push('<span><b>类别</b>　' + inline(b.tag) + '</span>');
      if (b.time) tags.push('<span><b>耗时</b>　' + inline(b.time) + '</span>');
      if (b.level) tags.push('<span><b>难度</b>　' + inline(b.level) + '</span>');
      var meta = tags.length ? '<div class="recipe-meta">' + tags.join('') + '</div>' : '';

      var mats = arrayOf(b.materials).map(function (m) { return '<li>' + inline(m) + '</li>'; }).join('');
      var steps = arrayOf(b.steps).map(function (s) { return '<li>' + inline(s) + '</li>'; }).join('');
      var notes = arrayOf(b.notes).map(function (n) { return '<li>' + inline(n) + '</li>'; }).join('');

      return '<article class="blk blk-recipe" id="' + esc(b._id) + '">' + head(b, '复制配方') + meta +
        '<div class="recipe-cols">' +
          (mats ? '<div class="recipe"><h4>材料 / 工具</h4><ul>' + mats + '</ul></div>' : '') +
          (steps ? '<div class="recipe"><h4>步骤</h4><ol>' + steps + '</ol></div>' : '') +
        '</div>' +
        (notes ? '<div class="notes"><h4>成败要点</h4><ul>' + notes + '</ul></div>' : '') +
        '</article>';
    },

    table: function (b) {
      var thead = arrayOf(b.head).map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('');
      var rows = arrayOf(b.rows).map(function (r) {
        return '<tr>' + arrayOf(r).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
      }).join('');
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b) +
        '<div class="tbl-wrap"><table><thead><tr>' + thead +
        '</tr></thead><tbody>' + rows + '</tbody></table></div></article>';
    },

    callout: function (b) {
      var tone = b.tone || 'info';
      var mark = b.mark || ({ danger: '危', warn: '慎', info: '注', good: '要' })[tone] || '注';
      return '<article class="blk blk-callout callout tone-' + esc(tone) + '" id="' + esc(b._id) + '">' +
        (b.title ? '<h3 class="callout-title"><span class="mark">' + esc(mark) + '</span>' + inline(b.title) + '</h3>' : '') +
        paras(b.text) + '</article>';
    },

    checklist: function (b) {
      COPY[b._id] = checklistText(b);
      var items = arrayOf(b.items).map(function (s) {
        return '<label class="check-item"><input type="checkbox"><span>' + inline(s) + '</span></label>';
      }).join('');
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b, '复制清单') +
        '<div class="checklist">' + items + '</div></article>';
    },

    timeline: function (b) {
      var items = arrayOf(b.items).map(function (it) {
        var t = (it && it.time) || '';
        var x = (it && it.text) || String(it || '');
        return '<li>' + (t ? '<time>' + inline(t) + '</time>' : '') + '<span>' + inline(x) + '</span></li>';
      }).join('');
      return '<article class="blk" id="' + esc(b._id) + '">' + head(b) +
        '<ul class="timeline">' + items + '</ul></article>';
    }
  };

  function renderBlock(b, id) {
    if (!b || typeof b !== 'object') return '';
    b._id = id;
    var fn = RENDER[b.type];
    if (!fn) {
      if (b.text) return RENDER.text(b);
      console.warn('未知内容块类型：', b.type);
      return '';
    }
    return fn(b);
  }

  /* ---------------- 分章 ---------------- */

  var CAT_ORDER = ['落地', '身份', '机遇', '要点', '步骤', '配方', '对照表', '时间线', '失效', '行动清单', '避坑', '提示'];

  function catOf(b) {
    if (b.cat) return b.cat;
    if (b.type === 'recipe') return '配方';
    if (b.type === 'checklist') return '行动清单';
    if (b.type === 'timeline') return '时间线';
    if (b.type === 'table') return '对照表';
    if (b.type === 'steps') return '步骤';
    if (b.type === 'callout') return (b.tone === 'danger' || b.tone === 'warn') ? '避坑' : '提示';
    return '要点';
  }

  // 一个时代页 = 五章。块按 cat 归章，章内保持数据文件里的原始顺序。
  var SECTIONS = [
    {
      id: 'land', no: '一', title: '落地须知', en: 'FIRST HOURS',
      desc: '睁开眼的第一小时、第一顿饭、第一个身份——先活过前三天，再谈别的。',
      cats: ['落地', '要点', '提示']
    },
    {
      id: 'role', no: '二', title: '你是哪一种人', en: 'WHO YOU ARE',
      desc: '同一个时代，不同的身份就是不同的命。先认领一种，再谈怎么活。',
      cats: ['身份']
    },
    {
      id: 'power', no: '三', title: '政局 · 大事 · 站队', en: 'POWER & TIMING',
      desc: '谁在台上、哪一年会出事、该提前押谁。这一章解决「提前投资」的问题。',
      cats: ['机遇', '时间线', '对照表']
    },
    {
      id: 'craft', no: '四', title: '以当时的水平能造什么', en: 'CRAFT & RECIPES',
      desc: '只用这个时代已有的材料、燃料与工具，你真的能复制出来的东西。',
      cats: ['配方', '步骤']
    },
    {
      id: 'risk', no: '五', title: '致命雷区', en: 'HOW YOU DIE',
      desc: '这个时代最容易把人弄死的几件事，往往不是战争。',
      cats: ['避坑']
    },
    /* 只有当代六题有这一章。古代题写"能造什么"，当代题要写"什么已经不管用了"——
       两章是一对：一边是从无到有，一边是从有到无。
       古代题没有这一章，groupBlocks 会跳过空章，不留白。 */
    {
      id: 'dead', no: '六', title: '失效的东西', en: 'WHAT NO LONGER WORKS',
      desc: '这个时代里，「以前那套」为什么突然不管用了。带着上一个时代的地图去找路，最容易走错。',
      cats: ['失效']
    },
    {
      id: 'plan', no: '七', title: '行动清单', en: 'DO THIS',
      desc: '不用思考，按顺序做。',
      cats: ['行动清单']
    }
  ];

  function groupBlocks(era) {
    var blocks = arrayOf(era.blocks);
    var buckets = {};
    var used = {};

    SECTIONS.forEach(function (s) { buckets[s.id] = []; });

    blocks.forEach(function (b, i) {
      b._id = era.id + '-b' + i;
      var secId = b.section;
      if (!secId) {
        var cat = catOf(b);
        for (var k = 0; k < SECTIONS.length; k++) {
          if (SECTIONS[k].cats.indexOf(cat) >= 0) { secId = SECTIONS[k].id; break; }
        }
      }
      if (!secId || !buckets[secId]) secId = 'land';
      buckets[secId].push(b);
      used[secId] = true;
    });

    var out = [];
    SECTIONS.forEach(function (s) {
      if (buckets[s.id].length) out.push({ section: s, blocks: buckets[s.id] });
    });
    return out;
  }

  /* ---------------- 难度点 ---------------- */

  function difficultyDots(n) {
    n = Math.max(0, Math.min(5, Number(n) || 0));
    var out = '';
    for (var i = 0; i < 5; i++) out += '<i class="' + (i < n ? 'on' : '') + '"></i>';
    return '<span class="dots">' + out + '</span>';
  }

  /* ---------------- Toast / 复制 ---------------- */

  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1900);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text, btn, label) {
    function done(ok) {
      if (!ok) { toast('复制失败，请手动选择文本'); return; }
      toast(label || '已复制到剪贴板');
      if (btn) {
        var old = btn.textContent;
        btn.textContent = '已复制';
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = old; btn.classList.remove('done'); }, 1500);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); })
        .catch(function () { done(legacyCopy(text)); });
    } else {
      done(legacyCopy(text));
    }
  }

  /* ---------------- 公共交互 ---------------- */

  function initChrome() {
    // 复制按钮（事件委托，自动适配任何新增内容）
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.copy');
      if (!btn) return;
      var id = btn.getAttribute('data-copy');
      if (COPY[id]) copyText(COPY[id], btn);
    });

    // 阅读进度
    var bar = $('#progressBar');
    var toTop = $('#toTop');

    function onScroll() {
      var doc = document.documentElement;
      var h = doc.scrollHeight - doc.clientHeight;
      var y = doc.scrollTop || document.body.scrollTop;
      if (bar) bar.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0).toFixed(2) + '%';
      if (toTop) toTop.hidden = y < 520;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ---------------- 对外接口 ---------------- */

  window.GuideCore = {
    $: $, $$: $$,
    esc: esc, inline: inline, paras: paras, plain: plain, pad2: pad2,
    arrayOf: arrayOf,
    renderBlock: renderBlock,
    groupBlocks: groupBlocks,
    catOf: catOf,
    CAT_ORDER: CAT_ORDER,
    difficultyDots: difficultyDots,
    toast: toast,
    copyText: copyText,
    initChrome: initChrome
  };
})();
