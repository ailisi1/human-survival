/* 如果当时 · 随机事件池 + 连锁专属局
 * 注入：window.PACK_EVENTS（随机事件）、window.PACK_CHAINS（连锁专属局）
 *
 * 随机事件结构：
 * {
 *   id, title, scene,
 *   condition: { stat:"health", op:"lt", value:30 }  // 可选，满足才触发
 *   options: [ { key, title, text, effects:{...}, regret } ]
 * }
 *
 * 连锁专属局结构：
 * {
 *   id, unlock:"debt",          // 对应选项 trigger.unlock
 *   title, scene,               // 专属局的标题与情境
 *   condition: {...},           // 可选，额外数值门槛
 *   options: [ { key, title, text, effects, regret } ]
 * }
 *
 * effects 四维：money/health/social/happy，扣加限制在 0~100。
 */

/* ===== 随机事件池 ===== */
window.PACK_EVENTS = [
  {
    id: "ev-lottery",
    title: "中了一张彩票",
    scene: "你随手买的一张彩票，居然中了个不大不小的奖。这笔意外之财，来得突然。",
    options: [
      { key: "A", title: "存起来", text: "留作后路，细水长流。", effects: { money: 12, happy: 3 } },
      { key: "B", title: "挥霍一把", text: "难得有钱，痛快花一次。", effects: { money: -2, happy: 15 } }
    ]
  },
  {
    id: "ev-sick",
    title: "一场大病",
    scene: "体检报告出来，医生神色凝重。这些年，你把身体熬得太狠了。",
    condition: { stat: "health", op: "lt", value: 60 },
    options: [
      { key: "A", title: "安心治疗", text: "花钱续命，别硬扛。", effects: { money: -18, health: 22, happy: -3 } },
      { key: "B", title: "咬牙硬扛", text: "工作不能停，扛一扛就过去了。", effects: { health: -15, money: 5 } }
    ]
  },
  {
    id: "ev-fired",
    title: "突然被裁",
    scene: "公司一夜之间收缩业务，你的名字出现在了裁员名单上。",
    condition: { stat: "money", op: "lt", value: 60 },
    options: [
      { key: "A", title: "拿赔偿另谋出路", text: "体面地走，重新开始。", effects: { money: 8, happy: -8, social: -3 } },
      { key: "B", title: "求领导留下", text: "拉下脸，先保住饭碗。", effects: { money: 3, social: -6, happy: -5 } }
    ]
  },
  {
    id: "ev-reunion",
    title: "一场老同学聚会",
    scene: "毕业多年的同学会，你犹豫要不要去。那些当年同一起跑线的人，如今境遇天差地别。",
    options: [
      { key: "A", title: "去", text: "看看大家，也看看自己。", effects: { social: 8, happy: 2, money: 0 } },
      { key: "B", title: "不去", text: "怕对比，也怕尴尬。", effects: { social: -5, happy: -3 } }
    ]
  },
  {
    id: "ev-raise",
    title: "一次跳槽的机会",
    scene: "猎头递来一份 offer，薪资翻倍，但要离开熟悉的环境，去一个陌生的城市重新开始。",
    options: [
      { key: "A", title: "接下 offer", text: "趁年轻，搏一把。", effects: { money: 15, social: -4, happy: -2 } },
      { key: "B", title: "婉拒", text: "安稳最重要，不折腾。", effects: { happy: 3, social: 2 } }
    ]
  },
  {
    id: "ev-parent",
    title: "父母病了",
    scene: "电话那头，母亲的声音虚弱。父亲住院了，你既担心人，也担心钱。",
    condition: { stat: "social", op: "gt", value: 30 },
    options: [
      { key: "A", title: "请假回家", text: "人比什么都重要。", effects: { money: -8, happy: 6, health: 2, social: 3 } },
      { key: "B", title: "寄钱回去", text: "人在外，只能尽力。", effects: { money: -12, happy: -4, social: 2 } }
    ]
  },
  {
    id: "ev-friend",
    title: "一个朋友开口借钱",
    scene: "多年的老朋友突然开口，想借一笔不小的钱。你心里清楚，这钱大概率有去无回。",
    condition: { stat: "money", op: "gt", value: 40 },
    options: [
      { key: "A", title: "借", text: "朋友有难，该帮就帮。", effects: { money: -10, social: 8, happy: 2 } },
      { key: "B", title: "婉拒", text: "救急不救穷，不能心软。", effects: { social: -6, happy: -2, money: 0 } }
    ]
  },
  {
    id: "ev-insomnia",
    title: "整夜失眠",
    scene: "连续几周，你夜里翻来覆去睡不着。白天的你，像个被抽干的人。",
    condition: { stat: "happy", op: "lt", value: 55 },
    options: [
      { key: "A", title: "去看医生", text: "身体不会骗人。", effects: { health: 6, happy: 5, money: -4 } },
      { key: "B", title: "硬撑着", text: "熬过这阵就好了。", effects: { health: -8, happy: -5 } }
    ]
  },
  {
    id: "ev-bonus",
    title: "一笔意外的年终奖",
    scene: "公司效益不错，你拿到了一笔比预期丰厚得多的年终奖。这笔钱，你想怎么用？",
    condition: { stat: "money", op: "gt", value: 35 },
    options: [
      { key: "A", title: "犒劳自己和家人", text: "辛苦一年，该享受一下。", effects: { money: -6, happy: 12, social: 3 } },
      { key: "B", title: "存起来", text: "落袋为安，未雨绸缪。", effects: { money: 12, happy: 2 } }
    ]
  },
  {
    id: "ev-review",
    title: "一次升职答辩",
    scene: "公司给了你一次晋升答辩的机会。过了，就是管理层；不过，可能还要再熬几年。",
    condition: { stat: "social", op: "gt", value: 45 },
    options: [
      { key: "A", title: "全力准备", text: "拼一次，搏个前程。", effects: { money: 15, social: 8, happy: 3 } },
      { key: "B", title: "顺其自然", text: "是你的跑不掉。", effects: { happy: 4, money: 2 } }
    ]
  },
  {
    id: "ev-friend2",
    title: "老友突然来借钱",
    scene: "一个许久不联系的老同学，突然开口借一笔钱。你心里清楚，这钱借出去，可能就收不回来了。",
    condition: { stat: "money", op: "gt", value: 50 },
    options: [
      { key: "A", title: "借给他", text: "念及旧情，能帮就帮。", effects: { money: -12, social: 8, happy: 2 } },
      { key: "B", title: "婉拒", text: "久不联系就借钱，不靠谱。", effects: { social: -6, happy: -1 } }
    ]
  },
  {
    id: "ev-hobby",
    title: "一个兴趣的召唤",
    scene: "你偶然接触到一个新的爱好，竟意外地着迷。可它既花时间，也花点钱。",
    options: [
      { key: "A", title: "投入进去", text: "生活需要点热爱。", effects: { happy: 10, money: -5, social: 3 } },
      { key: "B", title: "浅尝辄止", text: "别耽误正事。", effects: { happy: -2, money: 2 } }
    ]
  },
  {
    id: "ev-accident",
    title: "一场小意外",
    scene: "你在路上出了点小意外，受了点伤，也耽误了些事。",
    options: [
      { key: "A", title: "安心休养", text: "身体要紧，别硬扛。", effects: { health: 6, money: -4, happy: -2 } },
      { key: "B", title: "带伤继续", text: "这点小伤，不碍事。", effects: { health: -6, happy: -2 } }
    ]
  }
];

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = [
  {
    id: "chain-debt",
    unlock: "debt",
    title: "债务危机",
    scene: "当年那个选择欠下的债，终于追到了眼前。债主上门，催得你喘不过气。",
    options: [
      { key: "A", title: "拆东墙补西墙", text: "先还眼前的，后面的再说。", effects: { money: -15, happy: -10 }, regret: "那些被债务吞噬的日子" },
      { key: "B", title: "咬牙还清", text: "省吃俭用，一点点补上。", effects: { money: -20, happy: -5, health: -5 }, regret: "为还债熬掉的健康" }
    ]
  },
  {
    id: "chain-dream",
    unlock: "dream",
    title: "梦想的召唤",
    scene: "那个被你搁置已久的梦想，忽然又冒了出来。这一次，它近得几乎触手可及。",
    options: [
      { key: "A", title: "再搏一次", text: "不为别的，就为不留遗憾。", effects: { happy: 15, money: -10 }, regret: "又一次押上安稳去赌" },
      { key: "B", title: "埋进心底", text: "现实一点，别折腾了。", effects: { happy: -8, money: 5 }, regret: "那个再也没能实现的梦" }
    ]
  },
  {
    id: "chain-family",
    unlock: "family",
    title: "亲情的债",
    scene: "多年后你才明白，有些陪伴一旦错过，就再也补不回来。父母老了，而你远在天边。",
    options: [
      { key: "A", title: "放下一切回家", text: "有些事，现在不做就晚了。", effects: { happy: 12, money: -8, social: 5 }, regret: "那些没陪在身边的年" },
      { key: "B", title: "继续打拼", text: "等我出人头地，再好好孝顺。", effects: { money: 8, happy: -10 }, regret: "亏欠父母的时光" }
    ]
  },
  {
    id: "chain-health",
    unlock: "health",
    title: "身体的账单",
    scene: "你终于尝到了透支身体的苦果。躺在病床上，你才开始想，这一切到底值不值。",
    options: [
      { key: "A", title: "彻底休养", text: "命只有一条，钱可以再挣。", effects: { health: 25, money: -12 }, regret: "那些本该好好休息的日子" },
      { key: "B", title: "边治边扛", text: "放不下工作，也放不下钱。", effects: { health: 5, money: 3, happy: -5 }, regret: "被工作绑架的身体" }
    ]
  },
  {
    id: "chain-conscience",
    unlock: "conscience",
    title: "良心的拷问",
    scene: "当年那个让你动摇的机会，如今像一块石头压在心上。夜深人静时，它会回来问你：这钱，你花得安心吗？",
    options: [
      { key: "A", title: "坦白与弥补", text: "还债，才能睡得安稳。", effects: { happy: 15, money: -12 }, regret: "那段被良心折磨的日子" },
      { key: "B", title: "继续埋藏", text: "过去的事，就让它过去吧。", effects: { happy: -10, money: 5 }, regret: "那个永远无法坦然面对的自己" }
    ]
  },
  {
    id: "chain-hometown",
    unlock: "hometown",
    title: "家乡的回望",
    scene: "多年后，你站在人生的路口，回望那个曾经离开（或留下）的家乡。那里的灯火，还亮着吗？",
    options: [
      { key: "A", title: "回望与释然", text: "无论走或留，都是我的选择。", effects: { happy: 12, social: 5 }, regret: "那段关于去留的纠结" },
      { key: "B", title: "怅然若失", text: "如果当年选了另一条路……", effects: { happy: -8, money: 3 }, regret: "那条没走成的路" }
    ]
  }
];
