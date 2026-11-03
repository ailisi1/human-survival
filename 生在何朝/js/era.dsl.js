/* 生在何朝 · 朝代数据登记与紧凑解析
 * 十九个政权，每个一份"这一朝的世界长什么样"。
 * 为了写得下、看得清，数据用竖线分隔的短串，在载入时解析成对象。
 */
window.SHZ = window.SHZ || {};
(function (S) {
  "use strict";

  S.BOOK = {};

  function num(x) { return Number(String(x).trim()); }
  function split(s, sep) { return String(s).split(sep || "|").map(function (x) { return x.trim(); }); }

  /* 政权登记：id/名/起讫/都/开国者/币名/阶层改称 */
  S.book = function (o) {
    const B = {
      id: o.id, name: o.name, span: o.span, capital: o.capital,
      founder: o.founder || "", money: o.money || "两",
      classText: o.classText || null,
      clsName: o.clsName || null,
      taxNote: o.taxNote || "",
      rebelWord: o.rebelWord || "起兵",
      parts: [], reigns: [], regions: [], factions: [], marks: [],
      caps: [], places: [], offices: { central: [], local: [], military: [] }
    };

    /* 简介分段 */
    (o.brief || []).forEach(function (b) {
      B.parts.push({ from: b[0], to: b[1], title: b[2], lines: b[3] });
    });

    /* 年号："洪武|1368|1398|太祖" */
    (o.reigns || []).forEach(function (r) {
      const a = split(r);
      B.reigns.push({ name: a[0], from: num(a[1]), to: num(a[2]), emperor: a[3] || "" });
    });
    B.reigns.sort(function (x, y) { return x.from - y.from; });

    /* 政区："geo|名|简称|控制力|注|归属序列" */
    (o.regions || []).forEach(function (r) {
      const a = split(r);
      const g = S.GEO[a[0]];
      if (!g) { console.warn("未知地块", a[0], o.id); return; }
      B.regions.push({
        id: a[0], name: a[1], short: a[2] || a[1],
        ctl: a[3] === "" ? 1 : num(a[3]),
        pts: g.pts, label: g.c, note: a[4] || "",
        own: a[5] ? a[5].split(",").map(function (kv) {
          const p = split(kv, ":");
          return [num(p[0]), p[1]];
        }) : null
      });
    });

    /* 谁是"本朝"：多数朝写 court；辽、西夏、金、五代写成自家名号，
       各朝用 selfId 点明，多个用 + 连（五代：后梁后晋后汉皆朝廷）。
       不点明的，一律认 court。 */
    B.selfIds = o.selfId
      ? String(o.selfId).split("+").map(function (x) { return x.trim(); })
      : ["court"];

    /* 水系 */
    B.water = (o.water || ["huanghe", "changjiang"]).map(function (k) {
      const w = S.WATER[k];
      return w ? { id: k, name: w.name, d: w.d } : null;
    }).filter(Boolean);

    B.walls = o.walls ? [{ name: S.WALL.name, d: S.WALL.d }] : [];

    /* 京师："名|geo|dx,dy|是否正都|注" */
    (o.caps || []).forEach(function (c) {
      const a = split(c);
      const g = S.GEO[a[1]];
      if (!g) return;
      const off = (a[2] || "0,0").split(",");
      B.caps.push({
        name: a[0], x: g.c[0] + num(off[0]), y: g.c[1] + num(off[1]),
        lx: g.c[0] + num(off[0]), ly: g.c[1] + num(off[1]) - 9,
        anchor: "middle", main: a[3] === "1", note: a[4] || ""
      });
    });

    /* 势力："id|名|类|色|描述|年:值,年:值" */
    (o.factions || []).forEach(function (f) {
      const a = split(f);
      B.factions.push({
        id: a[0], name: a[1], kind: a[2], color: a[3] || "ink", desc: a[4],
        power: (a[5] || "0:0").split(",").map(function (kv) {
          const p = split(kv, ":");
          return [num(p[0]), num(p[1])];
        })
      });
    });

    /* 军备：分项名称 + 逐年实数（万） */
    if (o.army) {
      B.army = {
        segs: o.army.segs.map(function (s) {
          const a = split(s);
          return { k: a[0], n: a[1] || "" };
        }),
        pts: o.army.pts.map(function (p) {
          /* 写法有两种：「年|数,数,数」与「年:数,数,数」。都认。 */
          let a = split(p);
          if (a.length < 2) a = split(p, ":");
          const v = (a[1] || "").split(",").map(num);
          return { year: num(a[0]), v: v };
        }).sort(function (x, y) { return x.year - y.year; })
      };
    } else B.army = null;

    /* 官职："名|品|注" */
    ["central", "local", "military"].forEach(function (g) {
      (o.offices && o.offices[g] ? o.offices[g] : []).forEach(function (s) {
        const a = split(s);
        B.offices[g].push({ name: a[0], grade: num(a[1]), note: a[2] || "" });
      });
    });

    /* 地名池："州|府|县,县" */
    (o.places || []).forEach(function (p) {
      const a = split(p);
      B.places.push({ prov: a[0], pref: a[1] || a[0], cty: (a[2] || a[1] || a[0]).split(",") });
    });

    /* 事迹标记："字|geo|dx,dy|起|止|注" */
    (o.marks || []).forEach(function (m) {
      const a = split(m);
      const g = S.GEO[a[1]];
      if (!g) return;
      const off = (a[2] || "0,0").split(",");
      B.marks.push({
        name: a[0], x: g.c[0] + num(off[0]), y: g.c[1] + num(off[1]),
        from: num(a[3]), to: num(a[4]), color: "zhu", note: a[5] || ""
      });
    });

    /* 乱世加成："起|止|加成" */
    B.unrest = (o.unrest || []).map(function (u) {
      const a = split(u);
      return [num(a[0]), num(a[1]), num(a[2])];
    });

    S.BOOK[o.id] = B;
    return B;
  };

  /* ── 供引擎调用的取数接口 ─────────────────────── */
  S.bookOf = function (eraId) { return S.BOOK[eraId] || null; };

  S.eraBrief = function (eraId, year) {
    const b = S.BOOK[eraId];
    if (!b) return null;
    let part = b.parts[0] || { title: "", lines: [], from: year, to: year };
    for (const p of b.parts) if (year >= p.from && year <= p.to) part = p;
    return {
      name: b.name, span: b.span, capital: b.capital, founder: b.founder,
      title: part.title, lines: part.lines, from: part.from, to: part.to
    };
  };

  S.mapOf = function (eraId) {
    const b = S.BOOK[eraId];
    if (!b || !b.regions.length) return null;
    const owner = {};
    b.regions.forEach(function (r) { if (r.own) owner[r.id] = r.own; });
    return {
      w: 680, h: 470,
      regions: b.regions, water: b.water, walls: b.walls,
      capitals: b.caps, owner: owner, marks: b.marks,
      selfId: b.selfIds
    };
  };

  S.regionOwner = function (eraId, region, year) {
    const M = S.mapOf(eraId);
    if (!M) return "court";
    const seq = M.owner[region.id];
    if (!seq) return "court";
    let owner = "court";
    for (const it of seq) if (year >= it[0]) owner = it[1];
    /* 本朝名号一律折成 court */
    if ((M.selfId || []).indexOf(owner) >= 0) return "court";
    return owner;
  };

  S.activeMarks = function (eraId, year) {
    const b = S.BOOK[eraId];
    if (!b) return [];
    return b.marks.filter(function (m) { return year >= m.from && year <= m.to; });
  };
})(window.SHZ);
