/* 把网页版的 js / data 同步到小游戏包，并重写两处文件清单。
 *
 * 小游戏不能跨目录 require，所以同一份数据得有两份拷贝。
 * 人手动拷迟早会漏，所以只认这个脚本：改完网页版，跑一次。
 *
 *   node tools/sync-minigame.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MG = path.join(ROOT, "minigame");

/* ── 一、拷 js（ui.js 是网页版专用的 DOM 渲染，小游戏不要） ── */
const JS_SKIP = new Set(["ui.js"]);
let jsN = 0;
for (const f of fs.readdirSync(path.join(ROOT, "js"))) {
  if (!f.endsWith(".js") || JS_SKIP.has(f)) continue;
  fs.copyFileSync(path.join(ROOT, "js", f), path.join(MG, "js", f));
  jsN++;
}

/* ── 二、拷 data（只拷 .js，packs 在下面单独处理） ── */
let dataN = 0;
for (const f of fs.readdirSync(path.join(ROOT, "data"))) {
  if (!f.endsWith(".js")) continue;
  fs.copyFileSync(path.join(ROOT, "data", f), path.join(MG, "data", f));
  dataN++;
}
const PACKS = path.join(ROOT, "data", "packs");
const packFiles = fs.readdirSync(PACKS).filter((f) => f.endsWith(".js")).sort();
fs.mkdirSync(path.join(MG, "data", "packs"), { recursive: true });
for (const f of packFiles) {
  fs.copyFileSync(path.join(PACKS, f), path.join(MG, "data", "packs", f));
}

/* ── 三、重写 game.js 的 require 清单 ── */
const GAME = path.join(MG, "game.js");
let gs = fs.readFileSync(GAME, "utf8");
const block = packFiles.map((f) => 'require("./data/packs/' + f + '");').join("\n");
if (!gs.includes("/* PACKS-BEGIN */")) {
  console.log("game.js 里找不到 /* PACKS-BEGIN */ 标记，先手动加一次");
  process.exit(1);
}
gs = gs.replace(/\/\* PACKS-BEGIN \*\/[\s\S]*?\/\* PACKS-END \*\//,
  "/* PACKS-BEGIN */\n" + block + "\n/* PACKS-END */");
fs.writeFileSync(GAME, gs);

/* ── 四、重写 web/index.html 的 script 清单 ── */
const HTML = path.join(MG, "web", "index.html");
let hs = fs.readFileSync(HTML, "utf8");
const tags = packFiles.map((f) => '<script src="../data/packs/' + f + '"></script>').join("\n");
if (!hs.includes("<!-- PACKS-BEGIN -->")) {
  console.log("web/index.html 里找不到 <!-- PACKS-BEGIN --> 标记，先手动加一次");
  process.exit(1);
}
hs = hs.replace(/<!-- PACKS-BEGIN -->[\s\S]*?<!-- PACKS-END -->/,
  "<!-- PACKS-BEGIN -->\n" + tags + "\n<!-- PACKS-END -->");
fs.writeFileSync(HTML, hs);

/* ── 五、重写**网页版** index.html 的 script 清单 ──
 * 这一段是补的：早先只同步小游戏，网页版 index.html 的清单没人管，
 * 停在 65-era-f。此后新写的 66、70–88 卷网页版根本没加载，
 * 于是「小程序里有、网站上没有」。清单必须由同一处生成。 */
const WEB = path.join(ROOT, "index.html");
let wsp = fs.readFileSync(WEB, "utf8");
const wtags = packFiles.map((f) => '<script src="data/packs/' + f + '"></script>').join("\n");
if (!wsp.includes("<!-- PACKS-BEGIN -->")) {
  console.log("网页版 index.html 里找不到 <!-- PACKS-BEGIN --> 标记，先手动加一次");
  process.exit(1);
}
wsp = wsp.replace(/<!-- PACKS-BEGIN -->[\s\S]*?<!-- PACKS-END -->/,
  "<!-- PACKS-BEGIN -->\n" + wtags + "\n<!-- PACKS-END -->");
fs.writeFileSync(WEB, wsp);

console.log("js " + jsN + " 个 / data " + dataN + " 个 / packs " + packFiles.length + " 卷（网页版清单已同步）");
