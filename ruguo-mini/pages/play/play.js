/* 岔路页：一个页面走完一局
 *
 * 引擎里一共有四种「卡」，这里用 mode 区分渲染，但推进逻辑统一在 paint() 里：
 *   card  —— 二选一岔路（带 gain / lose 两句话）
 *   multi —— 多选限选，勾满 pickCount 才能确认
 *   beat  —— 选完岔路后的连锁剧情，一拍一拍走
 *   event —— 随机事件 / 跨关卡连锁局
 *
 * paint() 是唯一入口，每次交互后重算一遍该显示什么。
 * 这样不必关心「上一拍是第几拍」这类状态，引擎自己记着。
 */
const RUGO = require("../../core/engine.js");
const store = require("../../utils/store.js");

const app = getApp();

const STATS_META = [
  { key: "money", label: "钱", color: "#E8C268" },
  { key: "health", label: "健康", color: "#7DD9A6" },
  { key: "social", label: "人脉", color: "#7FB5E0" },
  { key: "happy", label: "幸福", color: "#E07866" },
];

Page({
  data: {
    mode: "",
    label: "",
    age: 20,
    pct: 0,
    stats: [],
    kicker: "",
    title: "",
    scene: "",
    opts: [],
    multi: null,
    picked: 0,
    pickCount: 0,
    chain: false,
    isBeat: false,
  },

  onLoad() {
    if (!app.globalData.state) {
      wx.redirectTo({ url: "/pages/index/index" });
      return;
    }
    this.paint();
  },

  /* ---------- 唯一渲染入口 ---------- */
  paint() {
    const s = app.globalData.state;
    if (!s) {
      wx.redirectTo({ url: "/pages/index/index" });
      return;
    }
    if (RUGO.isDone(s)) {
      this.toEnd();
      return;
    }

    const card = RUGO.currentCard(s);
    if (RUGO.isEvent(s) || RUGO.isChain(s)) {
      this.paintEvent(s, card);
      return;
    }
    if (RUGO.isMulti(s) && !s.picked) {
      this.paintMulti(s, card);
      return;
    }
    const beat = RUGO.currentBeat(s);
    if (beat) {
      this.paintBeat(s, beat);
      return;
    }
    if (s.picked) {
      /* 这一题的剧情走完了，抽下一张 */
      const next = RUGO.nextCard(s);
      if (!next || RUGO.isDone(s)) {
        this.toEnd();
        return;
      }
      this.paint();
      return;
    }
    this.paintCard(s, card);
  },

  /* ---------- 公共头部 ---------- */
  head(s, label) {
    const total = s.deck.length || 1;
    const pct = Math.round((Math.min(s.deckIndex, total) / total) * 100);
    const stats = STATS_META.map((m) => {
      const v = s.stats[m.key];
      return { label: m.label, val: v, color: m.color, w: v + "%" };
    });
    this.setData({ label: label, age: s.life.age, pct: pct, stats: stats });
  },

  /* ---------- 二选一岔路 ---------- */
  paintCard(s, card) {
    const opts = card.options.map((o) => ({
      key: o.key,
      tag: o.key,
      side: o.key === "A" ? "gain" : "lose",
      sideLabel: o.key === "A" ? "得到" : "失去",
      title: o.title,
      gain: o.gain || "",
      lose: o.lose || "",
      text: "",
    }));
    this.head(s, "第 " + (s.deckIndex + 1) + " / " + s.deck.length + " 个岔路");
    this.setData({
      mode: "card",
      kicker: "人生的下一个岔路口",
      title: card.title,
      scene: card.scene || "",
      opts: opts,
      multi: null,
      chain: false,
      isBeat: false,
    });
  },

  /* ---------- 多选限选 ---------- */
  paintMulti(s, card) {
    const items = card.items.map((it) => ({
      key: it.key,
      name: it.name,
      desc: it.desc || "",
      tag: it.tag || "",
      on: false,
    }));
    this.head(s, "第 " + (s.deckIndex + 1) + " / " + s.deck.length + " 个岔路");
    this.setData({
      mode: "multi",
      kicker: "只能留下 " + card.pickCount + " 样 · 其余将被放弃",
      title: card.title,
      scene: card.scene || "",
      opts: [],
      multi: items,
      picked: 0,
      pickCount: card.pickCount,
      chain: false,
      isBeat: false,
    });
  },

  /* ---------- 连锁剧情 ---------- */
  paintBeat(s, beat) {
    const keys = Object.keys(beat.choice);
    const opts = keys.map((k) => {
      const c = beat.choice[k];
      return { key: k, title: c.title, text: c.text || "", side: "", sideLabel: "", tag: "" };
    });
    this.head(s, s.picked.follow.title || "接着往下");
    this.setData({
      mode: "beat",
      kicker: "这一念之后",
      title: "",
      scene: beat.scene || "",
      opts: opts,
      multi: null,
      chain: false,
      isBeat: true,
    });
  },

  /* ---------- 随机事件 / 连锁局 ---------- */
  paintEvent(s, card) {
    const isChain = RUGO.isChain(s);
    const opts = card.options.map((o) => ({
      key: o.key,
      title: o.title,
      text: o.text || "",
      side: "",
      sideLabel: "",
      tag: "",
    }));
    this.head(s, isChain ? "命运的回响" : "命运事件");
    this.setData({
      mode: "event",
      kicker: isChain ? "当年的选择回来了" : "命运的小插曲",
      title: card.title,
      scene: card.scene || "",
      opts: opts,
      multi: null,
      chain: isChain,
      isBeat: false,
    });
  },

  /* ---------- 交互 ---------- */
  onPick(e) {
    const s = app.globalData.state;
    const key = e.currentTarget.dataset.key;
    if (this.data.mode === "card") {
      RUGO.pickOption(s, key);
    } else if (this.data.mode === "beat") {
      RUGO.pickBeat(s, key);
    } else {
      RUGO.pickEventOption(s, key);
      const next = RUGO.nextCard(s);
      if (!next || RUGO.isDone(s)) {
        this.toEnd();
        return;
      }
    }
    this.paint();
  },

  /* 多选：只改本地勾选状态，不进引擎 */
  onToggle(e) {
    const key = e.currentTarget.dataset.key;
    const items = this.data.multi.slice();
    let hit = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === key) {
        hit = i;
        break;
      }
    }
    if (hit < 0) return;

    if (items[hit].on) {
      items[hit] = Object.assign({}, items[hit], { on: false });
    } else {
      let n = 0;
      for (let i = 0; i < items.length; i++) if (items[i].on) n++;
      if (n >= this.data.pickCount) {
        wx.vibrateShort && wx.vibrateShort({ type: "light" });
        return;
      }
      items[hit] = Object.assign({}, items[hit], { on: true });
    }
    let picked = 0;
    for (let i = 0; i < items.length; i++) if (items[i].on) picked++;
    this.setData({ multi: items, picked: picked });
  },

  onConfirm() {
    const s = app.globalData.state;
    const keys = this.data.multi.filter((it) => it.on).map((it) => it.key);
    if (keys.length !== this.data.pickCount) return;
    RUGO.pickMulti(s, keys);
    this.paint();
  },

  /* ---------- 结算 ---------- */
  toEnd() {
    const s = app.globalData.state;
    if (!s) {
      wx.redirectTo({ url: "/pages/index/index" });
      return;
    }
    const report = RUGO.settle(s);
    app.globalData.report = report;
    app.globalData.isNewTitle = store.unlockTitle(report.title);
    app.globalData.state = null;
    wx.redirectTo({ url: "/pages/end/end" });
  },
});
