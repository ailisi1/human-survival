/* 把《如果当时》的网页版数据与引擎打成小程序可 require 的模块
 *
 * 为什么不用 eval / new Function：小程序环境对动态代码执行不友好，审核也敏感。
 * 这里做的是纯文本拼接——数据文件本来就是普通 JS 赋值语句，拼好后加一句
 * `var window = {};` 就能原样跑，输出的是一份静态源码。
 *
 * 关键：必须按 index.html 里的 script 顺序拼。
 * pack-more*.js 里全是 (window.PACK_X || []).concat([...])，
 * 顺序错了会少内容，且不报错。
 *
 * 用法：node 如果当时/tools/build-mini.js
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..");
const OUT = path.resolve(SRC, "..", "ruguo-mini", "core");

/* 1. 从 index.html 读加载顺序，别手写清单 */
const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
const dataFiles = [...html.matchAll(/src="(data\/pack-[a-z0-9-]+\.js)"/g)].map((m) => m[1]);
if (!dataFiles.length) throw new Error("index.html 里没找到 data/pack-*.js");

/* 2. 拼数据包 */
const parts = [
  "/* 自动生成，勿手改。源：如果当时/data/pack-*.js（按 index.html 顺序）",
  "   重新生成：node 如果当时/tools/build-mini.js */",
  "var window = {};",
  "",
];
let bytes = 0;
for (const rel of dataFiles) {
  const code = fs.readFileSync(path.join(SRC, rel), "utf8");
  bytes += Buffer.byteLength(code);
  parts.push("/* ===== " + rel + " ===== */", code.trim(), "");
}
parts.push("module.exports = window;", "");

const packCode = parts.join("\n");
fs.writeFileSync(path.join(OUT, "pack.js"), packCode, "utf8");

/* 3. 引擎：把 IIFE 的入参从 window 换成数据包对象 */
let engine = fs.readFileSync(path.join(SRC, "js", "engine.js"), "utf8");
const tail = engine.lastIndexOf("})(window);");
if (tail < 0) throw new Error("engine.js 结尾不是 })(window); 无法自动转换");
engine =
  "/* 自动生成，勿手改。源：如果当时/js/engine.js\n" +
  "   只做了两件事：IIFE 的入参由 window 换成数据包；末尾导出 RUGO */\n" +
  'var __data = require("./pack.js");\n' +
  engine.replace(/\}\)\(window\);\s*$/, "})(__data);") +
  "\nmodule.exports = __data.RUGO;\n";
fs.writeFileSync(path.join(OUT, "engine.js"), engine, "utf8");

/* 4. 报数，顺手按池子核对条数，少内容能当场看出来 */
const vm = require("vm");
const ctx = { module: { exports: {} }, console };
vm.createContext(ctx);
vm.runInContext(packCode + "\n;__r = { start: window.PACK_START, events: window.PACK_EVENTS || [], chains: window.PACK_CHAINS || [] };", ctx);
const r = vm.runInContext("__r", ctx);

console.log("数据文件 " + dataFiles.length + " 个 / " + (bytes / 1024).toFixed(0) + " KB");
console.log("  开局题 PACK_START : " + r.start.length);
console.log("  随机事件 PACK_EVENTS : " + r.events.length);
console.log("  连锁局 PACK_CHAINS : " + r.chains.length);
console.log("  pack.js " + (Buffer.byteLength(packCode) / 1024).toFixed(0) + " KB");
console.log("  engine.js " + (Buffer.byteLength(engine) / 1024).toFixed(0) + " KB");
