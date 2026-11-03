/* 如果当时 · 随机事件 + 连锁专属局 追加卷
 * 6 个随机事件（ev2.*）、3 个连锁局（chain-brother / chain-origin / chain-funeral）。
 * 三道新连锁的钥匙分别来自 q84（房本）、q82（身世）、q83（最后一面）。
 */

/* ===== 随机事件 ===== */
window.PACK_EVENTS = (window.PACK_EVENTS || []).concat([

  {
    id: "ev2.colleague",
    title: "老同事走了",
    scene: "四十六岁，心梗。前一天他还在群里发孩子的录取通知书。追悼会上，他工位上的绿萝被同事分了，一人一枝。",
    condition: { stat: "health", op: "lt", value: 75 },
    options: [
      { key: "A", title: "回去就体检", text: "别等出事才想起身体。", effects: { money: -6, health: 12, happy: -3 }, regret: "他工位上那盆绿萝" },
      { key: "B", title: "把该干的干完", text: "人各有命，活着的人还得过。", effects: { money: 6, health: -4, happy: -6 }, regret: "那句「改天聚」" }
    ]
  },

  {
    id: "ev2.teacher",
    title: "班主任打来电话",
    scene: "老师说孩子最近上课总走神，作业也交不齐。她顿了顿，说：家里是不是有什么事。你握着电话，一时不知道怎么答。",
    options: [
      { key: "A", title: "请假回去一趟", text: "先把孩子的事弄清楚。", effects: { money: -8, happy: 8, social: 4 }, regret: "那段没陪他的日子" },
      { key: "B", title: "让老师多管管", text: "我这边实在走不开。", effects: { money: 4, happy: -8, social: -4 }, regret: "老师那句「家里是不是有事」" }
    ]
  },

  {
    id: "ev2.letter",
    title: "一封旧信",
    scene: "整理旧物时翻出一封没寄出的信，是二十年前写给一个人的。信里写了很多当年不敢说的话。那个人，你现在还能联系上。",
    condition: { stat: "happy", op: "lt", value: 60 },
    options: [
      { key: "A", title: "寄出去", text: "迟了二十年，也算寄了。", effects: { happy: 10, social: 6 }, regret: "那二十年" },
      { key: "B", title: "烧了", text: "有些话，说完就轻了。", effects: { happy: -4, social: -2 }, regret: "那封没寄出的信" },
      { key: "C", title: "收起来", text: "留着，不为什么。", effects: { happy: 3 }, regret: "那个名字" }
    ]
  },

  {
    id: "ev2.neighbor",
    title: "楼上的独居老人",
    scene: "楼上那位老人三天没出门了。你敲门，没人应。物业说，他子女在国外，一年回来一次。",
    options: [
      { key: "A", title: "报警开门", text: "宁可多事一次。", effects: { money: -2, social: 12, happy: 6 }, regret: "那三天没人敲过的门" },
      { key: "B", title: "等等再说", text: "也许只是出门了。", effects: { social: -4, happy: -8 }, regret: "那句「等等再说」" }
    ]
  },

  {
    id: "ev2.recheck",
    title: "医院的复查提醒",
    scene: "手机响了一声，是医院的短信：您有一项检查结果需复诊。你盯着那条短信，想起上一次也是这样开头的。",
    condition: { stat: "health", op: "lt", value: 70 },
    options: [
      { key: "A", title: "马上挂号", text: "早一天知道，早一天准备。", effects: { money: -8, health: 10, happy: -6 }, regret: "等结果的走廊" },
      { key: "B", title: "先拖一拖", text: "忙完这阵子再说。", effects: { health: -6, happy: -4 }, regret: "那条没回的消息" }
    ]
  },

  {
    id: "ev2.transfer",
    title: "公司要搬去外地",
    scene: "总部要迁到另一个城市，愿意去的人保留岗位，不去的人按 N+1 走。孩子在这儿上小学，父母也在这儿。你只有一周时间答复。",
    options: [
      { key: "A", title: "跟着去", text: "工作要紧，家可以慢慢搬。", effects: { money: 14, social: -10, happy: -8 }, regret: "孩子转学那天" },
      { key: "B", title: "拿钱走人", text: "这年纪，重新找也不容易，但家在。", effects: { money: -10, social: 6, happy: 6 }, regret: "那份干了十几年的事" }
    ]
  }

]);

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = (window.PACK_CHAINS || []).concat([

  {
    id: "chain-brother",
    unlock: "brother",
    title: "房本上那个名字",
    scene: "很多年后，父亲走了。整理遗物时，你在他的抽屉最底层发现一份文件：那套房子的过户存根，签名是你的。你盯着那个名字，手一直没抖。",
    options: [
      { key: "A", title: "去找弟弟", text: "该说清楚的，说清楚。", effects: { money: 12, social: -6, happy: 4 }, regret: "那顿没吃完的饭" },
      { key: "B", title: "就当没看见", text: "父亲都走了，翻这些还有什么用。", effects: { money: -6, social: 4, happy: -8 }, regret: "父亲抽屉里那张存根" }
    ]
  },

  {
    id: "chain-origin",
    unlock: "origin",
    title: "县医院门口",
    scene: "你回了一趟老家，站在县医院门口。四十多年前的冬天，有人在这儿放下一个襁褓。现在这里改成了停车场，门口那棵树还在。",
    options: [
      { key: "A", title: "站一会儿", text: "不说话，就站着。", effects: { happy: 8, social: 2 }, regret: "那个冬天的早晨" },
      { key: "B", title: "去查当年的档案", text: "总得有个答案。", effects: { money: -6, social: 6, happy: -4 }, regret: "档案室里那些灰尘" }
    ]
  },

  {
    id: "chain-funeral",
    unlock: "funeral",
    title: "没去的那场",
    scene: "很多年后，你也到了他走的那个年纪。有天夜里你梦见那间病房，他坐在床边，还是年轻时候的样子，问你：你怎么才来。",
    options: [
      { key: "A", title: "醒着把话说完", text: "哪怕对着空气。", effects: { happy: 10 }, regret: "那三年谁都不肯先低头" },
      { key: "B", title: "第二天照常上班", text: "梦就是梦。", effects: { happy: -6, money: 3 }, regret: "梦里那句「你怎么才来」" }
    ]
  }

]);
