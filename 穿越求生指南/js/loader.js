/* =========================================================
   loader.js — 按 js/data-manifest.js 的顺序注入数据脚本
   ---------------------------------------------------------
   为什么不在每个 HTML 里手写一堆 <script>？
   因为现在有两个页面（index.html 目录页、era.html 详情页），
   手写两份清单迟早会不一致。这里用 document.write 在解析期
   同步写入 <script>，顺序严格保持、加载即完成，file:// 下也
   不需要 fetch，不存在 CORS 问题。

   新增内容时仍然只改一个地方：js/data-manifest.js 加一行路径。
   ========================================================= */

(function () {
  'use strict';
  var files = window.DATA_FILES || [];
  var buf = [];
  for (var i = 0; i < files.length; i++) {
    buf.push('<script src="' + files[i] + '"><\/script>');
  }
  if (buf.length) document.write(buf.join(''));
})();
