/* 生成 favicon.ico（根目录）。
 *
 *   node portal/make-favicon.js
 *
 * 不引第三方库：直接写 ICO 的 BMP 位图格式（32×32、32 位 BGRA）。
 * 图案是"人间三卷"的印章式 logo：宣纸底、朱印、三条卷线。
 * 改图案后重跑一次即可，产物只有 4KB 左右。
 */
const fs = require("fs");
const path = require("path");

const W = 32, H = 32;

/* 颜色（RGB） */
const PAPER = [245, 239, 226];   // 宣纸
const SEAL  = [158, 43, 37];     // 朱印
const WHITE = [245, 239, 226];   // 印内留白（与纸同色，像阴刻）

function px(x, y) {
  // 背景：整块宣纸
  let c = PAPER;
  // 朱印：居中方章，带 1px 圆角（四角让开）
  const x0 = 5, y0 = 5, x1 = 26, y1 = 26;
  const inX = x >= x0 && x <= x1, inY = y >= y0 && y <= y1;
  const corner = (x < x0 + 1 || x > x1 - 1) && (y < y0 + 1 || y > y1 - 1);
  if (inX && inY && !corner) {
    c = SEAL;
    // 三条横线（三卷）：y = 10、15、20，各占三格宽
    for (const lineY of [10, 15, 20]) {
      if (y === lineY && x >= x0 + 4 && x <= x1 - 4) c = WHITE;
    }
  }
  return c;
}

/* ICO：头部 + 目录项 + BITMAPINFOHEADER + 像素（BGRA，自下而上）+ AND 掩码 */
const dibSize = 40;
const xorSize = W * H * 4;
const andRow = Math.ceil(W / 32) * 4;          // 1bpp 掩码，行按 4 字节对齐
const andSize = andRow * H;
const dataSize = dibSize + xorSize + andSize;

const buf = Buffer.alloc(6 + 16 + dataSize);

/* ICONDIR */
buf.writeUInt16LE(0, 0);          // reserved
buf.writeUInt16LE(1, 2);          // type: icon
buf.writeUInt16LE(1, 4);          // count

/* 目录项 */
buf[6] = W; buf[7] = H;           // 32×32
buf[8] = 0; buf[9] = 0;           // 色板 0、保留
buf.writeUInt16LE(1, 10);         // 平面
buf.writeUInt16LE(32, 12);        // 位深
buf.writeUInt32LE(dataSize, 14);  // 数据大小
buf.writeUInt32LE(22, 18);        // 偏移 = 6 + 16

/* BITMAPINFOHEADER（高度 ×2：XOR + AND） */
const o = 22;
buf.writeUInt32LE(40, o);
buf.writeInt32LE(W, o + 4);
buf.writeInt32LE(H * 2, o + 8);
buf.writeUInt16LE(1, o + 12);
buf.writeUInt16LE(32, o + 14);
buf.writeUInt32LE(0, o + 20);     // BI_RGB
buf.writeUInt32LE(xorSize + andSize, o + 20 + 4);

/* 像素：BGRA，自下而上，全不透明 */
let p = o + 40;
for (let y = H - 1; y >= 0; y--) {
  for (let x = 0; x < W; x++) {
    const [r, g, b] = px(x, y);
    buf[p++] = b; buf[p++] = g; buf[p++] = r; buf[p++] = 255;
  }
}

/* AND 掩码：全 0（不透明） */
p = o + 40 + xorSize;
for (let i = 0; i < andSize; i++) buf[p++] = 0;

const out = path.join(__dirname, "..", "favicon.ico");
fs.writeFileSync(out, buf);
console.log("写出 " + out + "（" + buf.length + " 字节）");
