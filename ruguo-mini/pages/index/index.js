const RUGO = require("../../core/engine.js");
const store = require("../../utils/store.js");

const app = getApp();

Page({
  data: {
    collectText: "0 / 20",
    total: 0,
  },

  /* 从分享卡片进来会带 code：直接复活那一局，不用手动输码 */
  onLoad(options) {
    if (options && options.code) {
      const seed = RUGO.decodeCode(String(options.code));
      if (seed) this.begin(seed);
    }
  },

  onShow() {
    this.setData({
      collectText: store.countCollection() + " / " + RUGO.ALL_TITLES.length,
      total: RUGO.ALL_TITLES.length,
    });
  },

  onStart() {
    this.begin(Math.floor(Math.random() * 0x7fffffff));
  },

  /* 人生码：解码后用同一个种子重开，走出一模一样的开局 */
  onCode() {
    wx.showModal({
      title: "输入人生码",
      editable: true,
      placeholderText: "如 K3F9X2",
      confirmText: "重走这段人生",
      success: (res) => {
        if (!res.confirm) return;
        const code = String(res.content || "").trim();
        if (!code) return;
        const seed = RUGO.decodeCode(code);
        if (!seed) {
          wx.showToast({ title: "人生码不对", icon: "none" });
          return;
        }
        this.begin(seed);
      },
    });
  },

  onCollect() {
    wx.navigateTo({ url: "/pages/collect/collect" });
  },

  begin(seed) {
    const s = RUGO.newState(seed);
    RUGO.start(s);
    app.globalData.state = s;
    app.globalData.seed = seed;
    app.globalData.report = null;
    store.saveSeed(seed);
    wx.redirectTo({ url: "/pages/play/play" });
  },
});
