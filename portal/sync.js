#!/usr/bin/env node
/* ============================================================
   人间三卷 · 数据核对 + 统计同步
   ------------------------------------------------------------
   用法：
     node portal/sync.js              核对 + 统计 + 写 portal/stats.js
     node portal/sync.js --check      只核对，不写文件（出错退出码 1）

   它做三件事：
     1. 核对：三站 data/ 目录里的每个文件，是否都挂进了各自的页面
        （三个站都是「在 index.html 里手写一行 <script>」的模式，
          漏挂 = 数据静默不加载，页面上看不出来）
     2. 统计：把三站的数据真正跑一遍，算出门户要显示的数字
     3. 写出 portal/stats.js，门户刷新即同步

   以后给某个站加了数据，只要跑一次这个脚本。
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const CHECK_ONLY = process.argv.includes("--check");
const problems = [];
const warnings = [];

/* ── 小工具 ───────────────────────────────────────── */

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

function walk(dir, filter, out = []) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return out;
  for (const name of fs.readdirSync(abs)) {
    const p = path.join(abs, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(path.join(dir, name), filter, out);
    else if (filter(name)) out.push(path.join(dir, name));
  }
  return out;
}

/* 从 HTML 里取出实际加载的 <script src> 列表（保持顺序） */
function scriptsOf(html) {
  return [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((m) => m[1]);
}

/* 在隔离上下文里跑一组 JS，返回那个上下文
   onStep：每跑完一个文件回调一次，用于「这个文件到底贡献了什么」，能抓到被后加载包顶掉的数据 */
function run(files, extraGlobals = {}, onStep = null) {
  const sandbox = {
    console,
    Math,
    Date,
    JSON,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    isNaN,
    parseInt,
    parseFloat,
    setTimeout,
    clearTimeout,
    localStorage: {
      _d: {},
      getItem(k) { return this._d[k] || null; },
      setItem(k, v) { this._d[k] = String(v); },
      removeItem(k) { delete this._d[k]; },
    },
    ...extraGlobals,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  for (const f of files) {
    const abs = path.join(ROOT, f);
    try {
      vm.runInContext(fs.readFileSync(abs, "utf8"), ctx, { filename: f });
    } catch (e) {
      problems.push(`跑不起来：${f} → ${e.message}`);
      return null;
    }
    if (typeof onStep === "function") onStep(f, sandbox);
  }
  return sandbox;
}

/* 详情页七章：必须与 穿越求生指南/js/core.js 里的 SECTIONS 保持一致。
   改那边的章结构时，这里跟着改，否则体检会误报。
   「失效的东西」只有当代六题有，标 optional，古代题缺这一章不算错。 */
const SECTIONS_ORDER = [
  { id: "land", name: "一·落地须知" },
  { id: "role", name: "二·你是哪一种人" },
  { id: "power", name: "三·政局大事" },
  { id: "craft", name: "四·能造什么" },
  { id: "risk", name: "五·致命雷区" },
  { id: "dead", name: "六·失效的东西", optional: true },
  { id: "plan", name: "七·行动清单" },
];
const SEC_OF = {
  落地: "land", 要点: "land", 提示: "land",
  身份: "role",
  机遇: "power", 时间线: "power", 对照表: "power",
  配方: "craft", 步骤: "craft",
  避坑: "risk",
  失效: "dead",
  行动清单: "plan",
};

function catOf(b) {
  if (b.cat) return b.cat;
  if (b.type === "recipe") return "配方";
  if (b.type === "checklist") return "行动清单";
  if (b.type === "timeline") return "时间线";
  if (b.type === "table") return "对照表";
  if (b.type === "steps") return "步骤";
  if (b.type === "callout") return b.tone === "danger" || b.tone === "warn" ? "避坑" : "提示";
  return "要点";
}

/* ══════════════════════════════════════════════════
   一、穿越求生指南
   ══════════════════════════════════════════════════ */

function checkChuanyue() {
  const SITE = "穿越求生指南";
  const out = { eras: 0, blocks: 0, recipes: 0, groups: 0, files: 0 };
  const html = fs.readFileSync(path.join(ROOT, SITE, "index.html"), "utf8");

  /* 1. 清单里的文件是否都存在 */
  const manifestSrc = fs.readFileSync(path.join(ROOT, SITE, "js/data-manifest.js"), "utf8");
  const listed = [...manifestSrc.matchAll(/'([^']+\.js)'/g)].map((m) => m[1]);
  if (!listed.length) problems.push(`${SITE}：data-manifest.js 里一条路径都没读到`);

  for (const f of listed) {
    if (!exists(`${SITE}/${f}`)) problems.push(`${SITE}：清单里的 ${f} 不存在（会 404 静默失效）`);
  }

  /* 2. data/ 下的文件是否都登记了 */
  const onDisk = walk(`${SITE}/data`, (n) => n.endsWith(".js"))
    .map(rel)
    .filter((p) => !p.includes("/_template/"));
  const listedSet = new Set(listed.map((p) => `${SITE}/${p}`));
  for (const f of onDisk) {
    if (!listedSet.has(f)) problems.push(`${SITE}：${f} 在磁盘上，却没写进 data-manifest.js（页面不会加载）`);
  }

  /* 3. 每个时代目录都必须有 meta.js */
  const dirs = fs
    .readdirSync(path.join(ROOT, SITE, "data"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "_template")
    .map((d) => d.name);
  for (const d of dirs) {
    if (!exists(`${SITE}/data/${d}/meta.js`)) problems.push(`${SITE}：data/${d}/ 缺 meta.js`);
  }
  out.dirs = dirs.length;

  /* 4. 真跑一遍，按站点自己的口径统计 */
  const files = [`${SITE}/js/registry.js`, ...listed.map((p) => `${SITE}/${p}`)];
  const ctx = run(files);
  if (ctx && ctx.ERAS) {
    const eras = ctx.sortedEras ? ctx.sortedEras() : ctx.ERAS;
    const groups = [];
    for (const e of eras) {
      out.blocks += Array.isArray(e.blocks) ? e.blocks.length : 0;
      for (const b of e.blocks || []) if (b.type === "recipe") out.recipes++;
      const g = e.group || "其他";
      if (!groups.includes(g)) groups.push(g);
    }
    out.eras = eras.length;
    out.groups = groups.length;
    out.files = listed.length;
    for (const e of eras) {
      if (!e.blocks || !e.blocks.length) problems.push(`${SITE}：时代「${e.name || e.id}」一条内容都没有`);
      if (!e.name) problems.push(`${SITE}：时代 ${e.id} 缺 name`);

      /* 七章齐全性：缺章会让人以为「这个时代没什么可看」。
         optional 的章（「失效的东西」）只有当代六题有，缺了不算错。 */
      const secs = new Set();
      for (const b of e.blocks || []) secs.add(b.section || SEC_OF[catOf(b)] || "land");
      const missing = SECTIONS_ORDER.filter((s) => !s.optional && !secs.has(s.id))
        .map((s) => s.name);
      if (missing.length) {
        warnings.push(`${SITE}：时代「${e.name || e.id}」缺 ${missing.join(" / ")} 章`);
      }
    }
    if (out.eras !== dirs.length) {
      warnings.push(`${SITE}：${dirs.length} 个数据目录，但注册出 ${out.eras} 个时代（有目录没写 meta 或 id 重复）`);
    }
  }
  return out;
}

/* ══════════════════════════════════════════════════
   二、生在何朝
   ══════════════════════════════════════════════════ */

function checkShengzai() {
  const SITE = "生在何朝";
  const out = { dynasties: 0, packs: 0, js: 0 };
  const html = fs.readFileSync(path.join(ROOT, SITE, "index.html"), "utf8");
  const scripts = scriptsOf(html);

  /* 1. 页面加载的每个脚本都要存在 */
  for (const s of scripts) {
    if (!exists(`${SITE}/${s}`)) problems.push(`${SITE}：index.html 引用的 ${s} 不存在`);
  }

  /* 2. data/packs 下的文件是否都挂上了 */
  const packs = fs
    .readdirSync(path.join(ROOT, SITE, "data/packs"))
    .filter((n) => n.endsWith(".js"));
  const mounted = new Set(scripts.filter((s) => s.startsWith("data/packs/")));
  for (const p of packs) {
    if (!mounted.has(`data/packs/${p}`)) {
      problems.push(`${SITE}：data/packs/${p} 没写进 index.html（整包事件不会触发）`);
    }
  }
  for (const m of mounted) {
    if (!packs.includes(path.basename(m))) problems.push(`${SITE}：index.html 引用了不存在的 ${m}`);
  }
  out.packs = packs.length;

  /* 3. js/ 下的脚本是否都挂上了（ui/engine 之类除外，只提醒） */
  const jsFiles = fs.readdirSync(path.join(ROOT, SITE, "js")).filter((n) => n.endsWith(".js"));
  const mountedJs = new Set(scripts.filter((s) => s.startsWith("js/")));
  for (const f of jsFiles) {
    if (!mountedJs.has(`js/${f}`)) warnings.push(`${SITE}：js/${f} 没在 index.html 里引用`);
  }
  out.js = jsFiles.length;

  /* 4. 政权数：直接读 S.ERAS */
  const ctx = run([`${SITE}/js/data.base.js`]);
  if (ctx && ctx.SHZ && Array.isArray(ctx.SHZ.ERAS)) out.dynasties = ctx.SHZ.ERAS.length;

  /* 5. 事件总数：把数据包按页面顺序跑一遍
   *    （只跑 data/packs，不跑引擎；引擎会做合并与改写，数出来不是"写了多少条"） */
  const packFiles = scripts.filter((s) => s.startsWith("data/packs/"));
  /* 逐文件快照：哪个包往池里写了几条、最后还剩几条。
     早点发现写法规格不一（有人 concat、有人直接 = 赋值）导致的整包被顶掉 */
  const contributed = new Map();
  const owner = new Map(); // era|id → 第一个写它的文件
  const clobber = [];
  let prevIds = new Set();
  const snapIds = (sb) => {
    const ev = (sb.PACK_BASE && sb.PACK_BASE.eraEvents) || {};
    const set = new Set();
    for (const era of Object.keys(ev)) for (const e of ev[era] || []) set.add(era + "|" + e.id);
    return set;
  };
  const pctx = run(
    packFiles.map((s) => `${SITE}/${s}`),
    {},
    (f, sb) => {
      const cur = snapIds(sb);
      const add = [...cur].filter((k) => !prevIds.has(k));
      if (add.length) {
        const set = contributed.get(f) || new Set();
        for (const k of add) set.add(k);
        contributed.set(f, set);
      }
      for (const k of add) owner.set(k, f);
      /* 反向：这个文件跑完，池里少了谁 —— 少了谁就是被它顶掉了（用了 = [ 而不是 concat） */
      const gone = [...prevIds].filter((k) => !cur.has(k));
      if (gone.length) {
        const byOwner = {};
        for (const k of gone) {
          const o = owner.get(k) || "未知";
          byOwner[o] = (byOwner[o] || 0) + 1;
        }
        for (const [o, n] of Object.entries(byOwner)) {
          if (n >= 3) clobber.push(`${o.replace(`${SITE}/`, "")} 的 ${n} 条被 ${f.replace(`${SITE}/`, "")} 顶掉`);
        }
      }
      prevIds = cur;
    }
  );
  const PB = pctx && pctx.PACK_BASE;
  if (PB) {
    const eraEv = PB.eraEvents || {};
    const alive = snapIds(pctx);
    for (const [f, ids] of contributed) {
      const lost = [...ids].filter((k) => !alive.has(k));
      if (lost.length === ids.size && ids.size >= 5) {
        problems.push(
          `${SITE}：${f.replace(`${SITE}/`, "")} 写入的 ${ids.size} 条事件全部被后加载的包顶掉（检查是否用了 \`= [\` 而不是 \`= (… || []).concat([\`）`
        );
      }
    }
    for (const c of clobber) {
      problems.push(`${SITE}：${c}（写法规格不一致：直接 \`= [\` 会把前面的包整个替换掉）`);
    }
    out.eraEvents = Object.values(eraEv).reduce((n, l) => n + (Array.isArray(l) ? l.length : 0), 0);
    out.common = Array.isArray(PB.common) ? PB.common.length : 0;
    /* 时段事件（P.periods.xxx.events）也是玩家能遇到的事件，一并算进去，否则门户数字偏小 */
    out.periodEvents = 0;
    for (const p of Object.values(PB.periods || {})) {
      if (Array.isArray(p.events)) out.periodEvents += p.events.length;
    }
    out.events = out.eraEvents + out.common + out.periodEvents;

    /* 事件 id 不能重：重了会被 usedEvents 当成同一条，抽过就不再出 */
    const seen = new Map();
    const dup = [];
    for (const [eraId, list] of Object.entries(eraEv)) {
      for (const e of list) {
        if (seen.has(e.id)) dup.push(`${e.id}（${seen.get(e.id)} / ${eraId}）`);
        else seen.set(e.id, eraId);
      }
    }
    for (const e of PB.common || []) {
      if (seen.has(e.id)) dup.push(`${e.id}（${seen.get(e.id)} / 通用）`);
      else seen.set(e.id, "通用");
    }
    if (dup.length) problems.push(`${SITE}：事件 id 重复 ${dup.length} 条（${dup.slice(0, 3).join("、")}…）`);

    /* 只给某个阶层看的事件，阶层名要写对，否则永远抽不到 */
    const CLS = ["royal", "noble", "official_mid", "gentry", "merchant", "farmer", "tenant", "base"];
    const badCls = [...(PB.common || []), ...Object.values(eraEv).flat()]
      .flatMap((e) => e.class || [])
      .filter((c) => CLS.indexOf(c) < 0);
    if (badCls.length) problems.push(`${SITE}：事件里的阶层名不存在（${[...new Set(badCls)].join("、")}）`);
  }
  return out;
}

/* ══════════════════════════════════════════════════
   三、如果当时
   ══════════════════════════════════════════════════ */

function checkRuguo() {
  const SITE = "如果当时";
  const out = { questions: 0, events: 0, chains: 0, titles: 0 };
  const html = fs.readFileSync(path.join(ROOT, SITE, "index.html"), "utf8");
  const scripts = scriptsOf(html);

  for (const s of scripts) {
    if (!exists(`${SITE}/${s}`)) problems.push(`${SITE}：index.html 引用的 ${s} 不存在`);
  }
  const dataFiles = fs.readdirSync(path.join(ROOT, SITE, "data")).filter((n) => n.endsWith(".js"));
  for (const f of dataFiles) {
    if (!scripts.includes(`data/${f}`)) problems.push(`${SITE}：data/${f} 没写进 index.html`);
  }

  /* 按页面里的顺序跑，不要按文件名顺序：后加载的数据包是 concat 到前面的，
   * 顺序错了统计会失真 */
  const ordered = scripts.filter((s) => s.startsWith("data/"));
  /* 顺手把引擎也跑起来，读结局称号数（引擎不碰 DOM，ui.js 才碰） */
  const engine = scripts.filter((s) => /^js\/engine\.js$/.test(s));
  const ctx = run(ordered.concat(engine).map((s) => `${SITE}/${s}`));
  if (ctx) {
    out.questions = Array.isArray(ctx.PACK_START) ? ctx.PACK_START.length : 0;
    out.events = Array.isArray(ctx.PACK_EVENTS) ? ctx.PACK_EVENTS.length : 0;
    const ch = ctx.PACK_CHAINS;
    out.chains = Array.isArray(ch) ? ch.length : ch && typeof ch === "object" ? Object.keys(ch).length : 0;
    out.titles = ctx.RUGO && Array.isArray(ctx.RUGO.ALL_TITLES) ? ctx.RUGO.ALL_TITLES.length : 0;
    if (!out.questions) problems.push(`${SITE}：开局题库读出来是 0 道`);
    const bad = (Array.isArray(ctx.PACK_START) ? ctx.PACK_START : []).filter((q) => {
      if (q.type === "multi") return !Array.isArray(q.items) || q.items.length < (q.pickCount || 2);
      return !Array.isArray(q.options) || q.options.length < 2;
    });
    if (bad.length) warnings.push(`${SITE}：${bad.length} 道题选项不足（${bad.slice(0, 3).map((q) => q.id).join("、")}…）`);
  }
  return out;
}

/* ══════════════════════════════════════════════════
   四、门户自身
   ══════════════════════════════════════════════════ */

function checkPortal() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const l of links) {
    if (/^(#|mailto:|data:|https?:)/.test(l)) continue;
    if (!exists(l)) problems.push(`门户：${l} 不存在`);
  }
  for (const site of ["穿越求生指南", "生在何朝", "如果当时"]) {
    if (!html.includes(`${site}/index.html`)) problems.push(`门户：没有指向 ${site} 的入口`);
    if (!exists(`${site}/index.html`)) problems.push(`门户：${site}/index.html 不存在`);
  }
}

/* ══════════════════════════════════════════════════
   主流程
   ══════════════════════════════════════════════════ */

const cy = checkChuanyue();
const sz = checkShengzai();
const rg = checkRuguo();
checkPortal();

const stats = {
  updated: new Date().toLocaleString("zh-CN", { hour12: false }).replace(/\//g, "-"),
  chuanyue: { eras: cy.eras, blocks: cy.blocks, recipes: cy.recipes, groups: cy.groups },
  shengzai: { dynasties: sz.dynasties, packs: sz.packs, events: sz.events },
  ruguo: { questions: rg.questions, events: rg.events, chains: rg.chains, titles: rg.titles },
};

const pad = (s, n) => {
  let w = 0;
  for (const ch of String(s)) w += /[\u4e00-\u9fff]/.test(ch) ? 2 : 1;
  return String(s) + " ".repeat(Math.max(0, n - w));
};

console.log("");
console.log("人间三卷 · 数据核对");
console.log("─".repeat(58));
console.log(`  ${pad("卷一 穿越求生指南", 20)} ${cy.eras} 个时代 · ${cy.blocks} 条内容 · ${cy.recipes} 份配方 · ${cy.groups} 个分组`);
console.log(`      ${pad("", 14)} 清单登记 ${cy.files} 个文件 / 磁盘 ${cy.dirs} 个时代目录`);
console.log(`  ${pad("卷二 生在何朝", 20)} ${sz.dynasties} 个政权 · ${sz.events} 条事件 · ${sz.packs} 个事件包`);
console.log(`  ${pad("卷三 如果当时", 20)} ${rg.questions} 道岔路 · ${rg.events} 个变数 · ${rg.chains} 个连锁局 · ${rg.titles} 种结局`);
console.log("─".repeat(58));

if (!problems.length) {
  console.log("  核对通过：数据文件与页面清单一致。");
} else {
  console.log(`  发现 ${problems.length} 处问题：`);
  problems.forEach((p, i) => console.log(`   ${i + 1}. ${p}`));
}
if (warnings.length) {
  console.log("");
  console.log(`  提醒（不影响运行）：`);
  warnings.forEach((w) => console.log(`   · ${w}`));
}

if (CHECK_ONLY) {
  console.log("");
  process.exit(problems.length ? 1 : 0);
}

const js =
  "/* 本文件由 node portal/sync.js 自动生成，请勿手改。\n" +
  ` * 生成时间：${stats.updated}\n` +
  " * 给某个站加了数据之后，重跑一次 sync.js 即可同步门户。\n" +
  " */\n" +
  "window.HUB_STATS = " +
  JSON.stringify(stats, null, 2) +
  ";\n";
fs.writeFileSync(path.join(ROOT, "portal/stats.js"), js, "utf8");

console.log("");
console.log(`  已写出 portal/stats.js（${stats.updated}）`);
console.log("  门户刷新即生效。");
console.log("");
process.exit(problems.length ? 1 : 0);
