/* 如果当时 · 随机事件 + 连锁专属局 追加卷九
 * 4 个随机事件（ev3.*）、2 个连锁局（chain-divorce / chain-care）。
 * 两道新连锁的钥匙：divorce 来自 q101（离婚时那套房），care 来自 q115–q117（照护）。
 */

/* ===== 随机事件 ===== */
window.PACK_EVENTS = (window.PACK_EVENTS || []).concat([

  {
    id: "ev3.audit",
    title: "财务让你补个签字",
    scene: "一张对账单推到你面前，金额对得上，日期不对。财务说：就差你这一笔，月底要关账。她说话的时候，笔帽一直没盖上。",
    options: [
      { key: "A", title: "不签，让她说明白", text: "这一笔到底怎么来的。", effects: { money: -3, social: -4, happy: 6 }, regret: "月底那场没开的会" },
      { key: "B", title: "签了", text: "反正金额是对的。", effects: { money: 5, social: 4, happy: -7 }, regret: "那支没盖笔帽的笔" },
      { key: "C", title: "说回去想想", text: "拖两天再说。", effects: { money: -1, happy: 2 }, regret: "拖过去的那两天" }
    ]
  },

  {
    id: "ev3.oldphoto",
    title: "母亲塞给你一张旧照片",
    scene: "照片发黄，边角卷起来。上面是个二十来岁的姑娘，站在一台拖拉机旁边笑。背面用铅笔写着一个名字，不是她现在的名字。她把照片塞进你手里，说：别给你爸看见。",
    condition: { stat: "happy", op: "lt", value: 70 },
    options: [
      { key: "A", title: "问她这是谁", text: "她给你了，就是想说。", effects: { happy: 9, social: 5 }, regret: "照片背面那个名字" },
      { key: "B", title: "收起来，不问", text: "有些人一辈子不愿意提。", effects: { happy: -2, social: -2 }, regret: "她递照片时那只手" }
    ]
  },

  {
    id: "ev3.cough",
    title: "咳了三个月，纸上有点红",
    scene: "一开始是夜里咳，后来白天也咳。今天早上擤鼻子，纸上有血丝。你把它揉成团扔了，出门赶地铁。公司这周在过审。",
    condition: { stat: "health", op: "lt", value: 65 },
    options: [
      { key: "A", title: "这周就去查", text: "过审有别人，命只有一条。", effects: { money: -7, health: 11, happy: -4 }, regret: "CT 室门口那排椅子" },
      { key: "B", title: "过完这阵再说", text: "可能就是上火。", effects: { health: -9, money: 3, happy: -5 }, regret: "那个被揉掉的纸团" }
    ]
  },

  {
    id: "ev3.deposit",
    title: "十年前的房东打来电话",
    scene: "一个陌生号码，接起来是十年前那个房东。他说整理旧账，发现当年少退了你七百块押金。他现在腿脚不好，让儿子微信转给你。",
    options: [
      { key: "A", title: "收下，回个电话谢他", text: "七百块不多，十年了还记着。", effects: { money: 1, social: 8, happy: 6 }, regret: "那个记了十年的小本子" },
      { key: "B", title: "说不用了", text: "就七百块。", effects: { money: -1, social: 4, happy: 3 }, regret: "他说腿脚不好的那句" },
      { key: "C", title: "问他现在住哪，去看看", text: "顺路的事。", effects: { money: -3, social: 10, happy: 8 }, regret: "老楼里那间空了的屋子" }
    ]
  }

]);

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = (window.PACK_CHAINS || []).concat([

  {
    id: "chain-divorce",
    unlock: "divorce",
    title: "孩子婚礼上，你们坐在同一桌",
    scene: "二十多年过去，孩子结婚。司仪在台上说「请双方父母上台」，你和她在楼梯口碰上。她老了不少，头发染过，还是能看出发根那一截白。她说：你先上。",
    options: [
      { key: "A", title: "一起上", text: "孩子这辈子就这一次。", effects: { money: -4, social: 10, happy: 9 }, regret: "楼梯口那句「你先上」" },
      { key: "B", title: "让她先，你在后面跟着", text: "这么多年了，还是错开走。", effects: { social: -4, happy: -6 }, regret: "台上错开的那两步" }
    ]
  },

  {
    id: "chain-care",
    unlock: "care",
    title: "轮到你了",
    scene: "你也到了那个年纪。洗澡的时候脚下打滑，扶住墙才没摔。孩子在另一个城市，一周打一次电话，每次都说：要不你搬过来吧。你每次都说：这边挺好。",
    options: [
      { key: "A", title: "搬过去", text: "离得近，总有人搭把手。", effects: { money: -8, social: 9, happy: 4 }, regret: "老房子里那面扶惯了的墙" },
      { key: "B", title: "留在原地", text: "这屋子我熟。", effects: { money: 2, social: -7, happy: 5 }, regret: "孩子那句「这边挺好」" }
    ]
  }

]);
