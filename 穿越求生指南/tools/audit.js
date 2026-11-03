#!/usr/bin/env node
/* ══════════════════════════════════════════════════
   卷一 · 内容渲染审计
   ══════════════════════════════════════════════════
   用法：node tools/audit.js

   查的不是「代码有没有 bug」，是「数据能不能真的显示出来」：
     1. 清单登记的文件是否都在磁盘上，磁盘上的文件是否都登记了
     2. 每个时代有没有缺章（六章里空了几章）
     3. 每个块 type 是否有渲染器、cat 是否合法、section 是否指向真实章节
     4. 逐块真的跑一遍渲染器，看输出是不是空的
     5. 关键字段（items / rows / steps / 配方材料）是否为空
   ══════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

const ctx = {
  console,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (f) => f(),
  document: {
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => ({ style: {}, classList: { add() {}, remove() {} }, appendChild() {} }),
    body: { appendChild() {} },
    readyState: "complete",
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
};
vm.createContext(ctx);
/* 关键：浏览器里 window 就是全局对象，数据文件直接写 registerEra(...) 靠的是这个。
   沙箱里必须让 window 指回自己，否则 window.registerEra 不会变成全局函数。 */
ctx.window = ctx;
ctx.globalThis = ctx;

const run = (rel) => {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  vm.runInContext(src, ctx, { filename: rel });
};

/* ---------- 1. 清单 vs 磁盘 ---------- */

run("js/registry.js");
run("js/data-manifest.js");
const files = ctx.window.DATA_FILES || [];

const onDisk = [];
(function walk(dir, rel = "") {
  for (const n of fs.readdirSync(dir)) {
    const abs = path.join(dir, n);
    const r = rel ? `${rel}/${n}` : n;
    if (fs.statSync(abs).isDirectory()) walk(abs, r);
    else if (/\.js$/.test(n)) onDisk.push(r);
  }
})(path.join(ROOT, "data"), "data");

const listed = new Set(files);
const diskSet = new Set(onDisk);
const missing = files.filter((f) => !diskSet.has(f));
const unlisted = onDisk.filter((f) => !listed.has(f) && !f.includes("_template"));

console.log("卷一 · 内容渲染审计");
console.log("─".repeat(56));
console.log(`清单 ${files.length} 个文件 / 磁盘 ${onDisk.length} 个`);
if (missing.length) {
  console.log(`\n✗ 登记了但找不到文件（${missing.length}）：`);
  missing.forEach((f) => console.log("   ·", f));
}
if (unlisted.length) {
  console.log(`\n✗ 在磁盘上但没登记（不会加载，${unlisted.length}）：`);
  unlisted.forEach((f) => console.log("   ·", f));
}
if (!missing.length && !unlisted.length) console.log("✓ 清单与磁盘一致");

/* ---------- 2. 加载数据 ---------- */

run("js/core.js");
const C = ctx.window.GuideCore;

let loadErr = 0;
for (const f of files) {
  if (!diskSet.has(f)) continue;
  try {
    run(f);
  } catch (e) {
    loadErr++;
    console.log(`✗ 加载失败 ${f}：${e.message}`);
  }
}
if (loadErr) console.log(`\n✗ ${loadErr} 个数据文件加载失败`);

const ERAS = ctx.window.ERAS.slice().sort((a, b) => (a.order || 0) - (b.order || 0));

/* ---------- 3. 合法值 ---------- */

const RENDER_TYPES = ["text", "list", "steps", "recipe", "table", "callout", "checklist", "timeline"];
const CATS = C.CAT_ORDER;
/* 「失效的东西」只有当代六题有，标为可选：缺了不算问题，但不能当成必需章去报错。 */
const SECTION_IDS = ["land", "role", "power", "craft", "risk", "dead", "plan"];
const OPTIONAL_SEC = new Set(["dead"]);

/* ---------- 4. 逐时代逐块 ---------- */

const problems = [];
const stat = { blocks: 0, empty: 0, eras: ERAS.length };
const sectionCoverage = {}; // 每章有多少个时代是空的

SECTION_IDS.forEach((id) => (sectionCoverage[id] = []));

for (const era of ERAS) {
  if (!era.blocks || !era.blocks.length) {
    problems.push([era.id, "整个时代没有任何内容块"]);
    continue;
  }

  const groups = C.groupBlocks(era);
  const have = new Set(groups.map((g) => g.section.id));
  SECTION_IDS.forEach((id) => {
    if (!have.has(id)) sectionCoverage[id].push(era.id);
  });

  era.blocks.forEach((b, i) => {
    stat.blocks++;
    const where = `${era.id} #${i}`;

    if (!b || typeof b !== "object") {
      problems.push([where, "块不是对象"]);
      return;
    }
    if (!b.type) {
      problems.push([where, "缺 type"]);
      return;
    }
    if (RENDER_TYPES.indexOf(b.type) < 0) {
      problems.push([where, `未知 type「${b.type}」，渲染为空`]);
      return;
    }

    /* cat 合法性：不在表里会掉进第一章 */
    const cat = C.catOf(b);
    if (CATS.indexOf(cat) < 0) problems.push([where, `cat「${cat}」不在章节目录里，会被归到「落地须知」`]);

    /* section 合法性 */
    if (b.section && SECTION_IDS.indexOf(b.section) < 0)
      problems.push([where, `section「${b.section}」不是真实章节 id`]);

    /* 关键字段 */
    if (b.type === "list" || b.type === "steps" || b.type === "checklist") {
      if (!Array.isArray(b.items) || !b.items.length) problems.push([where, `${b.type} 的 items 为空`]);
    }
    if (b.type === "table") {
      if (!Array.isArray(b.rows) || !b.rows.length) problems.push([where, "table 的 rows 为空"]);
    }
    if (b.type === "recipe") {
      if (!b.name && !b.title) problems.push([where, "配方缺 name/title"]);
      const mats = b.materials || b.items;
      if (!Array.isArray(mats) || !mats.length) problems.push([where, "配方缺材料清单"]);
    }
    if (b.type === "timeline") {
      if (!Array.isArray(b.items) || !b.items.length) problems.push([where, "timeline 的 items 为空"]);
    }

    /* 真渲染一次 */
    let html = "";
    try {
      html = C.renderBlock(b, `${era.id}-b${i}`) || "";
    } catch (e) {
      problems.push([where, `渲染抛错：${e.message}`]);
      return;
    }
    const plain = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!plain) {
      stat.empty++;
      problems.push([where, `type=${b.type} 渲染结果为空`]);
    }
  });
}

/* ---------- 5. 报告 ---------- */

console.log(`\n时代 ${stat.eras} 个 · 内容块 ${stat.blocks} 条 · 渲染为空 ${stat.empty} 条`);

console.log("\n各章覆盖（★ = 有空缺的时代数）");
const secName = { land: "一 落地须知", role: "二 你是哪一种人", power: "三 政局与大事", craft: "四 能造什么", risk: "五 致命雷区", dead: "六 失效的东西", plan: "七 行动清单" };
for (const id of SECTION_IDS) {
  const miss = sectionCoverage[id];
  let mark = miss.length ? `  ★ ${miss.length} 个时代没有这一章` : "  ✓ 全有";
  if (OPTIONAL_SEC.has(id)) mark = miss.length ? `  · ${miss.length} 个时代没有（此章只在当代题里有，不算缺）` : "  ✓ 全有";
  console.log(`  ${secName[id].padEnd(14)}${mark}`);
  if (miss.length && miss.length <= 6) console.log(`      缺：${miss.join(" ")}`);
}

if (problems.length) {
  console.log(`\n✗ 问题 ${problems.length} 条：`);
  const byKind = {};
  for (const [where, msg] of problems) {
    const k = msg.replace(/「[^」]*」/g, "「…」");
    (byKind[k] = byKind[k] || []).push(where);
  }
  for (const k of Object.keys(byKind)) {
    console.log(`\n  [${byKind[k].length}] ${k}`);
    byKind[k].slice(0, 8).forEach((w) => console.log("      ", w));
    if (byKind[k].length > 8) console.log(`       …还有 ${byKind[k].length - 8} 条`);
  }
} else {
  console.log("\n✓ 没有发现渲染问题");
}

process.exit(problems.length || missing.length || unlisted.length ? 1 : 0);
