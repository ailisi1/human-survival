/* 结算页：一局人生的收尾
 *
 * 这一页只做四件事：报岁数、给称号、念放弃清单、把人生码交出去。
 * 不评分、不给建议——网页版也是这个原则。
 */
const RUGO = require("../../core/engine.js");

const app = getApp();

const STATS_META = [
  { key: "money", label: "钱", color: "#E8C268" },
  { key: "health", label: "健康", color: "#7DD9A6" },
  { key: "social", label: "人脉", color: "#7FB5E0" },
  { key: "happy", label: "幸福", color: "#E07866" },
];

Page({
  data: {
    age: 0,
    title: "",
    commentary: "",
    isNew: false,
    stats: [],
    regrets: [],
    code: "",
    startTitle: "",
  },

  onLoad() {
    const r = app.globalData.report;
    if (!r) {
      wx.redirectTo({ url: "/pages/index/index" });
      return;
    }
    const stats = STATS_META.map((m) => {
      const v = r.stats[m.key];
      const word = v >= 80 ? "丰沛" : v >= 60 ? "尚可" : v >= 40 ? "勉强" : "匮乏";
      return { label: m.label, val: v, word: word, color: m.color };
    });
    this.setData({
      age: r.age,
      title: r.title,
      commentary: r.commentary,
      isNew: !!app.globalData.isNewTitle,
      stats: stats,
      regrets: r.regrets || [],
      code: RUGO.encodeCode(app.globalData.seed || 0),
      startTitle: r.startTitle || "",
    });
  },

  onReplay() {
    const seed = Math.floor(Math.random() * 0x7fffffff);
    const s = RUGO.newState(seed);
    RUGO.start(s);
    app.globalData.state = s;
    app.globalData.seed = seed;
    app.globalData.report = null;
    wx.redirectTo({ url: "/pages/play/play" });
  },

  onCollect() {
    wx.navigateTo({ url: "/pages/collect/collect" });
  },

  onHome() {
    wx.reLaunch({ url: "/pages/index/index" });
  },

  onCopyCode() {
    wx.setClipboardData({
      data: this.data.code,
      success: () => wx.showToast({ title: "人生码已复制", icon: "none" }),
    });
  },

  /* 分享出去的是「人生码」，朋友点开就用同一个种子重开这一局 */
  onShareAppMessage() {
    return {
      title: "我这一生走了个「" + this.data.title + "」，你敢重走一次吗",
      path: "/pages/index/index?code=" + this.data.code,
    };
  },
});
