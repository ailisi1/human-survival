/* =========================================================
   registry.js — 注册表（必须先于任何数据文件加载）
   ---------------------------------------------------------
   一个时代的全部信息都在 window.ERAS 里，形如：
     { id, order, group, name, years, difficulty, intro, blocks: [] }

   registerEra 支持【同一 id 多次调用并合并】：
     · 元信息字段：后写覆盖先写（通常只在 meta.js 写一次）
     · blocks：追加（所以一个时代可以拆成任意多个主题文件）
   ========================================================= */

window.ERAS = [];
window.ERA_MAP = {};

window.registerEra = function (patch) {
  if (!patch || !patch.id) {
    console.error('registerEra: id required');
    return;
  }

  if (!window.ERA_MAP[patch.id]) {
    window.ERA_MAP[patch.id] = { id: patch.id, blocks: [] };
    window.ERAS.push(window.ERA_MAP[patch.id]);
  }

  var era = window.ERA_MAP[patch.id];

  // 元信息：除 id / blocks 之外的所有字段都合并进来（后写覆盖先写）
  Object.keys(patch).forEach(function (k) {
    if (k === 'id' || k === 'blocks') return;
    if (patch[k] !== undefined) era[k] = patch[k];
  });

  // 内容块：追加
  if (Array.isArray(patch.blocks)) {
    era.blocks = era.blocks.concat(patch.blocks);
  }
};

/* 便捷方法：按 id 取时代 / 按 order 排序后的列表 */
window.getEra = function (id) {
  return window.ERA_MAP[id] || null;
};

window.sortedEras = function () {
  return window.ERAS.slice().sort(function (a, b) {
    return (Number(a.order) || 9999) - (Number(b.order) || 9999);
  });
};
