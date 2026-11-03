const fs = require("fs");
const keep = JSON.parse(fs.readFileSync("./_keep.json", "utf8"));
const order = ["qin", "whan", "xin", "ehan", "sg", "wjin", "ejin", "ns", "sui", "tang", "wudai", "liao", "bsong", "xxia", "jin", "nsong", "yuan", "qing"];
const ERA_CN = {
  qin: "秦", whan: "西汉", xin: "新", ehan: "东汉", sg: "三国",
  wjin: "西晋", ejin: "东晋十六国", ns: "南北朝", sui: "隋", tang: "唐",
  wudai: "五代十国", liao: "辽", bsong: "北宋", xxia: "西夏", jin: "金",
  nsong: "南宋", yuan: "元", qing: "清"
};
let body = "";
let total = 0;
for (const era of order) {
  const list = keep[era];
  if (!list || !list.length) continue;
  total += list.length;
  body += `\n  /* ══════════ ${ERA_CN[era]} · ${list.length} 条 ══════════ */\n`;
  body += `  add("${era}", [\n`;
  body += list.map((s) => "    " + s.replace(/\n/g, "\n  ")).join(",\n");
  body += "\n  ]);\n";
}
const head = `/* 生在何朝 · 各朝专有事件 补遗卷（${total} 条）
 *
 * 50–53 号是「各朝专有事件」的最早一稿，60–63 号是后来重写的一稿。
 * 两者都用 \`B.eraEvents.x = [ ... ]\` 直接赋值，后加载者把前者整个顶掉，
 * 于是 50–53 的 182 条一个字都没跑过。
 *
 * 本卷只收「重写稿没有同朝同题」的部分（82 条里剔除 10 条同题，实收 ${total} 条），
 * 一律 concat 接在现有池后。id 沿用旧前缀（q2./w2./wd2./l2./b2./j2./ns2./y2./qi2.），
 * 与现行各包不撞。
 *
 * 规矩与 50–53 号一致：只写「只有这一朝才有的制度与事」，别朝不出现。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  function add(era, list) {
    B.eraEvents[era] = (B.eraEvents[era] || []).concat(list);
  }
${body}
})(window.PACK_BASE);
`;
fs.writeFileSync("生在何朝/data/packs/99-era-x.js", head);
console.log("写出", total, "条，", head.length, "字节");
