/* 从 50–53 里抽出「60–63 没有同朝同题」的事件，生成补遗卷 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = "生在何朝";
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const FILES = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((m) => m[1]);
global.window = global;
global.localStorage = { _d: {}, getItem: () => null, setItem: () => {} };
global.document = { addEventListener() {}, createElement: () => ({}) };
for (const f of FILES) {
  if (/js\/ui\.js$/.test(f)) continue;
  try {
    vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
  } catch (e) {}
}
// 此刻池里是 60-63 之后的版本；另存 60-63 自己的标题集合
const neoTitle = {};
const ev = global.PACK_BASE.eraEvents;
for (const era of Object.keys(ev)) neoTitle[era] = new Set((ev[era] || []).map((x) => x.title));

/* ---- 源码切分：按顶层 { } 取出事件对象 ---- */
function splitEvents(src, startIdx) {
  const out = [];
  let i = startIdx,
    depth = 0,
    objStart = -1,
    inStr = null,
    esc = false,
    inLine = false,
    inBlock = false;
  for (; i < src.length; i++) {
    const c = src[i],
      n = src[i + 1];
    if (inLine) {
      if (c === "\n") inLine = false;
      continue;
    }
    if (inBlock) {
      if (c === "*" && n === "/") {
        inBlock = false;
        i++;
      }
      continue;
    }
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === "/" && n === "/") {
      inLine = true;
      i++;
      continue;
    }
    if (c === "/" && n === "*") {
      inBlock = true;
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "{") {
      if (depth === 0) objStart = i;
      depth++;
      continue;
    }
    if (c === "}") {
      depth--;
      if (depth === 0 && objStart >= 0) {
        out.push(src.slice(objStart, i + 1));
        objStart = -1;
      }
      continue;
    }
    if (c === "]" && depth === 0) break;
  }
  return out;
}

function grab(file) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const res = [];
  const re = /B\.eraEvents\.([a-z]+)\s*=\s*\[/g;
  let m;
  while ((m = re.exec(src))) {
    const era = m[1];
    const objs = splitEvents(src, m.index + m[0].length);
    res.push({ era, objs });
  }
  return res;
}

const keep = {};
const dropped = [];
for (const f of ["data/packs/50-era-qh.js", "data/packs/51-era-wj.js", "data/packs/52-era-song.js", "data/packs/53-era-yq.js"]) {
  for (const { era, objs } of grab(f)) {
    for (const o of objs) {
      const t = (o.match(/title:\s*"([^"]+)"/) || [])[1];
      if (!t) {
        console.log("无标题跳过", f, o.slice(0, 40));
        continue;
      }
      if (neoTitle[era] && neoTitle[era].has(t)) {
        dropped.push(era + "·" + t);
        continue;
      }
      (keep[era] = keep[era] || []).push(o);
    }
  }
}
let total = 0;
for (const era of Object.keys(keep)) {
  console.log(era.padEnd(6), keep[era].length, "条独有");
  total += keep[era].length;
}
console.log("保留", total, "条；剔除同名", dropped.length, "条");
fs.writeFileSync("./_keep.json", JSON.stringify(keep));
fs.writeFileSync("./_dropped.json", JSON.stringify(dropped));
