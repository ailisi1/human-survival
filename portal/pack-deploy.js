#!/usr/bin/env node
/* ══════════════════════════════════════════════════
   人间三卷 · 部署打包
   ══════════════════════════════════════════════════
   用法：
     node portal/pack-deploy.js            生成 _deploy/
     node portal/pack-deploy.js --check    只检查 _deploy/ 是否完整，不重建

   做三件事：
     1. 把站点需要的文件复制到 _deploy/（排除截图存档、小程序工程、
        图标废稿、开发脚本、策划案这类线上用不到的东西）
     2. 校验：_deploy/ 里五个页面的每一个引用都能对上（中文名、大小写）
     3. 报体积与文件数，对照 Cloudflare Pages 免费档的限制

   为什么用「排除法」而不是「白名单」：
     白名单一旦漏一个数据包，线上就静默少内容；排除法漏了顶多多传几 MB，
     不会把站点弄坏。宁可多传，不可少传。
   ══════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "_deploy");

/* 目录名命中即整棵跳过 */
const SKIP_DIRS = new Set([
  ".workbuddy",
  "node_modules",
  ".git",
  "shots",        // 开发截图存档
  "tools",        // 回归测试、截图脚本
  "minigame",     // 微信小游戏工程，网页不引用
  "_ai-drafts",   // 图标设计废稿
  "_retired",     // 被重写稿顶掉的旧数据，仅供回溯
  "worker",       // 访问计数的 Cloudflare Worker，单独部署，不进网页产物
]);

/* 文件名/相对路径命中即跳过 */
const SKIP_FILES = new Set([
  ".DS_Store",
  "Thumbs.db",
  "portal/sync.js",
  "portal/sync.bat",
  "portal/pack-deploy.js",
  "portal/_og-card-src.html",  // 分享卡图的源文件，改字后重渲染 og-card.png 用，线上不需要
]);

const skipFile = (rel) => {
  const base = path.basename(rel);
  if (SKIP_FILES.has(rel) || SKIP_FILES.has(base)) return true;
  if (/\.md$/i.test(rel)) return true;        // 策划案 / README，线上不需要
  if (/^\./.test(base)) return true;          // 隐藏文件
  /* 生在何朝/assets/icon 是图标设计废稿（3 张 1024 png 约 1.9 MB，无任何引用），
     曾被整包传上去。真要做 PWA 时在这里换成白名单再放行。 */
  if (/assets\/icon\//.test(rel)) return true;
  /* 生在何朝/t_check.js 是手动测试残留，页面不引用 */
  if (rel === "生在何朝/t_check.js") return true;
  /* 项目根目录下划线开头的文件是临时探针（_probe*.js、_hit*.json 之类），
     曾经被整批传上去过，这里一律挡掉。下线文件放 _retired/ 即可。 */
  if (!rel.includes("/") && /^_/.test(base)) return true;
  return false;
};

/* 页面清单：部署后必须能打开这五个（404 是 Cloudflare Pages 的约定页，一并校验） */
const PAGES = [
  "index.html",
  "404.html",
  "穿越求生指南/index.html",
  "穿越求生指南/era.html",
  "生在何朝/index.html",
  "如果当时/index.html",
];

function walk(dir, rel = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      out.push(...walk(abs, r));
    } else {
      if (!skipFile(r)) out.push({ abs, rel: r, size: st.size });
    }
  }
  return out;
}

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  for (const n of fs.readdirSync(p)) {
    const q = path.join(p, n);
    if (fs.statSync(q).isDirectory()) rmrf(q);
    else fs.unlinkSync(q);
  }
  fs.rmdirSync(p);
}

function build() {
  rmrf(OUT);
  fs.mkdirSync(OUT, { recursive: true });
  const files = walk(ROOT);
  for (const f of files) {
    const dest = path.join(OUT, f.rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(f.abs, dest);
  }
  return files;
}

/* ---------- 校验：引用是否都对得上 ---------- */

function listAll(dir, rel = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (fs.statSync(abs).isDirectory()) out.push(...listAll(abs, r));
    else out.push(r);
  }
  return out;
}

function verify() {
  if (!fs.existsSync(OUT)) {
    console.error("✗ 还没有 _deploy/，先跑一次 node portal/pack-deploy.js");
    return false;
  }
  const all = listAll(OUT);
  const exact = new Set(all);
  const lower = new Map(all.map((f) => [f.toLowerCase(), f]));
  const problems = [];
  let checked = 0;

  for (const pg of PAGES) {
    if (!exact.has(pg)) {
      problems.push(`缺页面：${pg}`);
      continue;
    }
    const src = fs.readFileSync(path.join(OUT, pg), "utf8");
    const dir = path.dirname(pg);
    const tags = src.matchAll(/<(script|link|img)\b[^>]*?(?:src|href)\s*=\s*["']([^"']+)["']/g);
    for (const t of tags) {
      const ref = t[2];
      if (/^(https?:|data:|mailto:|javascript:|#)/.test(ref)) continue;
      checked++;
      const p = path
        .join(dir, ref)
        .replace(/\\/g, "/")
        .replace(/^\.\//, "");
      if (exact.has(p)) continue;
      if (lower.has(p.toLowerCase()))
        problems.push(`${pg} 引用「${ref}」大小写不符（线上会 404，实际是 ${lower.get(p.toLowerCase())}）`);
      else problems.push(`${pg} 引用「${ref}」找不到文件`);
    }
  }
  if (problems.length) {
    console.log("\n✗ 校验不通过：");
    problems.forEach((p) => console.log("   ·", p));
  } else {
    console.log(`\n✓ 校验通过：${PAGES.length} 个页面、${checked} 个引用全部命中`);
  }
  return problems.length === 0;
}

/* ---------- 主流程 ---------- */

const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  const ok = verify();
  process.exit(ok ? 0 : 1);
}

const t0 = Date.now();
const files = build();
const total = files.reduce((a, f) => a + f.size, 0);
const all = listAll(ROOT).length;

console.log("人间三卷 · 部署打包");
console.log("─".repeat(46));
console.log(`源目录      ${all} 个文件`);
console.log(`排除        ${all - files.length} 个（截图存档 / 小程序工程 / 图标废稿 / 开发脚本 / 策划案）`);
console.log(`打包        ${files.length} 个文件，${(total / 1048576).toFixed(1)} MB`);
console.log(`输出        ${OUT}`);

const biggest = files.slice().sort((a, b) => b.size - a.size)[0];
console.log(`最大单文件  ${(biggest.size / 1048576).toFixed(2)} MB  ${biggest.rel}`);

/* Cloudflare Pages 免费档：拖拽 ≤1000 文件、单文件 ≤25 MiB */
const FILE_CAP = 1000;
const SIZE_CAP = 25 * 1048576;
const okCount = files.length <= FILE_CAP;
const okSize = biggest.size <= SIZE_CAP;
console.log("\nCloudflare Pages 免费档（拖拽上传）");
console.log(`  文件数  ${files.length} / ${FILE_CAP}   ${okCount ? "✓" : "✗ 超了，改用 zip 或 Wrangler"}`);
console.log(`  单文件  ${(biggest.size / 1048576).toFixed(2)} / 25 MB   ${okSize ? "✓" : "✗ 超了"}`);

const ok = verify();
console.log(`\n用时 ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (!ok || !okCount || !okSize) process.exit(1);
console.log("下一步：把 _deploy 文件夹（或它的 zip）拖进 Cloudflare Pages 即可。");
