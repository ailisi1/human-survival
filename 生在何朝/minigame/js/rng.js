/* 生在何朝 · 随机与工具
 * 所有随机必须走这里，因为"千局对照"要求同一种子可复现。
 */
window.SHZ = window.SHZ || {};
(function (S) {
  "use strict";

  /* mulberry32：小而稳的种子随机 */
  S.rng = function (seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  S.hashSeed = function (str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  S.newSeed = function () {
    return (Math.random() * 0xFFFFFFFF) >>> 0;
  };

  /* 等概率取一 */
  S.pick = function (rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  };

  /* 加权取一：items = [{w: 数字, ...}] 或配合 wfn */
  S.weighted = function (rng, items, wfn) {
    let total = 0;
    for (const it of items) total += wfn ? wfn(it) : it.w;
    let r = rng() * total;
    for (const it of items) {
      r -= (wfn ? wfn(it) : it.w);
      if (r <= 0) return it;
    }
    return items[items.length - 1];
  };

  S.int = function (rng, a, b) {
    return a + Math.floor(rng() * (b - a + 1));
  };

  S.chance = function (rng, p) {
    return rng() < p;
  };

  /* 数值取整到两位 */
  S.r2 = function (n) {
    return Math.round(n * 100) / 100;
  };

  /* 银两 → 今值。各朝汇率不同，由 pack.prices 提供 */
  S.rmb = function (silver, prices) {
    if (!prices) return 0;
    const per = (prices.silver_to_cash || 700) * (prices.cash_to_rmb || 0.9);
    return Math.round(Math.abs(silver) * per);
  };

  /* 中文数字（用于年号、岁数） */
  const CN = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  S.cnNum = function (n) {
    if (n < 0) return "负" + S.cnNum(-n);
    if (n < 10) return CN[n];
    if (n < 20) return "十" + (n % 10 ? CN[n % 10] : "");
    if (n < 100) {
      const t = Math.floor(n / 10), u = n % 10;
      return CN[t] + "十" + (u ? CN[u] : "");
    }
    return String(n);
  };
})(window.SHZ);
