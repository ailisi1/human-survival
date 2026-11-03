/* 人生收藏：20 种活法的图鉴
 *
 * 未解锁的只显示序号和一句模糊提示，不剧透；
 * 已解锁的只存称号名——和网页版一样，不记是哪一局、什么时候、数值多少。
 */
const RUGO = require("../../core/engine.js");
const store = require("../../utils/store.js");

Page({
  data: {
    filter: "all",
    tabs: [],
    rows: [],
    got: 0,
    total: 0,
    pct: 0,
    empty: "",
  },

  onShow() {
    this.build(this.data.filter || "all");
  },

  build(filter) {
    const unlocked = store.loadCollection();
    const titles = RUGO.ALL_TITLES || [];
    const hints = RUGO.TITLE_HINTS || [];
    const total = titles.length;
    let got = 0;
    const all = titles.map((t, i) => {
      const has = unlocked.indexOf(t) >= 0;
      if (has) got++;
      return {
        num: (i + 1 < 10 ? "0" : "") + (i + 1),
        title: t,
        hint: hints[i] || "",
        got: has,
      };
    });

    let rows = all;
    if (filter === "got") rows = all.filter((r) => r.got);
    if (filter === "locked") rows = all.filter((r) => !r.got);

    let empty = "";
    if (!rows.length) {
      empty = filter === "got" ? "还没收进任何一个结局。先去活一局。" : "全都收齐了。";
    }

    this.setData({
      filter: filter,
      rows: rows,
      got: got,
      total: total,
      pct: total ? Math.round((got / total) * 100) : 0,
      empty: empty,
      tabs: [
        { key: "all", label: "全部", n: total },
        { key: "got", label: "已得", n: got },
        { key: "locked", label: "未得", n: total - got },
      ],
    });
  },

  onTab(e) {
    this.build(e.currentTarget.dataset.f);
  },

  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.reLaunch({ url: "/pages/index/index" });
    }
  },
});
