/* 生在何朝 · 天下
 * 势力、军备、官职、势与起兵。
 * 各朝"世界长什么样"在 js/eras-*.js 里，这里只管算法。
 */
window.SHZ = window.SHZ || {};
(function (S) {
  "use strict";

  function powerOf(f, year) {
    const pts = f.power;
    if (!pts || !pts.length) return 0;
    if (year <= pts[0][0]) return pts[0][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (year >= a[0] && year <= b[0]) {
        const t = (year - a[0]) / Math.max(1, b[0] - a[0]);
        return Math.round(a[1] + (b[1] - a[1]) * t);
      }
    }
    return pts[pts.length - 1][1];
  }

  S.factionsAt = function (eraId, year) {
    const b = S.bookOf(eraId);
    if (!b) return [];
    return b.factions
      .map(function (f) {
        return { id: f.id, name: f.name, kind: f.kind, color: f.color, desc: f.desc, power: powerOf(f, year) };
      })
      .filter(function (f) { return f.power > 3; })
      .sort(function (a, b2) { return b2.power - a.power; });
  };

  S.armyAt = function (eraId, year) {
    const b = S.bookOf(eraId);
    if (!b || !b.army || !b.army.pts.length) return null;
    const pts = b.army.pts;
    let a = pts[0], c = pts[pts.length - 1];
    for (let i = 0; i < pts.length - 1; i++) {
      if (year >= pts[i].year && year <= pts[i + 1].year) { a = pts[i]; c = pts[i + 1]; break; }
    }
    const t = c.year === a.year ? 0 : (year - a.year) / (c.year - a.year);
    const units = a.v.map(function (v, i) {
      const w = c.v[i] == null ? v : c.v[i];
      return Math.round((v + (w - v) * t) * 10) / 10;
    });
    return {
      segs: b.army.segs.map(function (s, i) { return { k: s.k, n: s.n, v: units[i] || 0 }; }),
      units: units,
      total: Math.round(units.reduce(function (x, y) { return x + y; }, 0) * 10) / 10
    };
  };

  S.officesOf = function (eraId) {
    const b = S.bookOf(eraId);
    return b ? b.offices : { central: [], local: [], military: [] };
  };

  /* ══ 势力值 ════════════════════════════════════════
   * 一个数字，用来判断"你够不够格做点大事"。
   * 私兵与所辖官军是主项，声望、官品、田产是辅项。
   */
  const GRADE_W = [0, 34, 28, 22, 17, 12, 9, 6, 4, 2];

  S.forceOf = function (s) {
    return Math.round((s.troops || 0) + (s.command || 0) * 0.3);
  };

  S.mightOf = function (s) {
    const f = S.forceOf(s);
    const g = GRADE_W[Math.max(0, Math.min(9, s.grade || 0))] || 0;
    const pack = (S.getPack && S.getPack(s.era)) || {};
    const div = (pack.prices && pack.prices.might_div) || 2000;
    return Math.round(
      f / 40 + (s.fame || 0) * 0.25 + g +
      ((s.field_wet || 0) + (s.field_dry || 0)) / 25 +
      (s.silver || 0) / div +
      (s.ledger && s.ledger.rebelWin ? 20 : 0)
    );
  };

  /* 朝局乱不乱：由各朝自己登记的年表决定 */
  S.unrestAt = function (eraId, year) {
    const b = S.bookOf(eraId);
    if (!b || !b.unrest) return 0;
    for (const u of b.unrest) if (year >= u[0] && year <= u[1]) return u[2];
    return 0;
  };

  /* 起兵的胜算：兵、势、军心、年景、气运。封顶三成五，
   * 因为历史上真能坐上去的，本来就极少。 */
  S.rebelChance = function (s) {
    const force = S.forceOf(s);
    const might = S.mightOf(s);
    const p = 0.01 + force / 20000 + might / 700 +
      S.unrestAt(s.era, s.year) +
      ((s.morale || 50) - 50) / 400 + (s.luck || 0) * 0.008;
    return Math.max(0.02, Math.min(0.35, p));
  };

  /* 起兵门槛：兵不满千二，不足以称事 */
  S.canRebel = function (s) {
    if (s.dead || s.flags.indexOf("rebelAsked") >= 0 || s.flags.indexOf("rebelWin") >= 0) return false;
    if (s.age < 21) return false;
    const f = S.forceOf(s);
    if (f < 1200) return false;
    if ((s.grade || 0) === 0 && f < 2200) return false;
    return S.mightOf(s) >= 50;
  };
})(window.SHZ);
