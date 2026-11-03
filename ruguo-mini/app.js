/* 如果当时 · 小程序入口
 *
 * 一局游戏的状态（state）里有函数（rng）和题目对象引用，没法 JSON 序列化，
 * 所以不落 storage，只挂在 globalData 上在页面之间传。
 * 小程序是单进程的，redirectTo 不会销毁 globalData，够用。
 *
 * 需要跨次启动保留的只有两样：结局收藏（字符串数组）、最后一次的人生码。
 * 这两样走 wx.storage，和网页版的 localStorage 行为对齐。
 */
App({
  globalData: {
    state: null,       // 引擎状态（进行中的一局）
    seed: 0,           // 本局种子，用于「人生码」
    report: null,      // settle 出来的结算报告
    isNewTitle: false, // 这局的称号是不是第一次拿到
  },
});
