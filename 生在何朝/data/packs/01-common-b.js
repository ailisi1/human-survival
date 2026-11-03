/* 生在何朝 · 共同底本（续卷）
 * 与 00-base.js 同属一套跨朝通用事件，另立一文件只为好改、好查。
 * 上卷童幼少年，中卷成人营生，下卷晚岁。
 * id 一律以 c2. 打头，免得与前卷相撞。
 * 文字规矩：浅近白话打底，关键处用当时词汇并加小注；不抒情，不解释。
 */
window.PACK_BASE.common.push(

  /* ══════════ 童幼 ══════════ */
  {
    id: "c2.child.fever", cat: "身体", title: "高热", age: [1, 6], weight: 22, once: true,
    text: [
      "夜里烧起来，额头烫手。母亲拿湿布敷，敷了半夜，不见退。",
      "天快亮时，你开始说胡话。"
    ],
    options: [
      { text: "去请郎中", need: { minSilver: 1 }, hint: "银钱 −1.5；身体 −2", effects: [{ k: "silver", v: -1.5 }, { k: "body", v: -2 }], then: "药灌下去，吐了两次。第三天早上，你要水喝。母亲端着碗，手一直抖。" },
      { text: "烧符，灌符水", hint: "身体 −6；赌的是命", effects: [{ k: "body", v: -6 }], then: "符纸烧成灰，和着水灌下去。母亲在床前跪了一夜，没起来。", gamble: { deathChance: 0.18, cause: "惊风" } },
      { text: "拿被子捂着，硬扛", hint: "身体 −8；可能落下病根", effects: [{ k: "body", v: -8 }], then: "烧了四天，自己退了。此后你怕冷，一到秋天就咳。", gamble: { deathChance: 0.2, cause: "惊风" } }
    ]
  },
  {
    id: "c2.child.fall", cat: "身体", title: "跌断", age: [4, 12], weight: 16, once: true,
    text: [
      "你从树上掉下来，左胳膊撑在地上。听见了一声不是自己的响。",
      "胳膊歪着，抬不起来。"
    ],
    options: [
      { text: "请接骨的", need: { minSilver: 2 }, hint: "银钱 −2；身体 −3", effects: [{ k: "silver", v: -2 }, { k: "body", v: -3 }], then: "接骨的把胳膊拉了三次，疼得你叫不出声。长好之后，能弯，不能举高。" },
      { text: "两块木板扎起来", hint: "身体 −8", effects: [{ k: "body", v: -8 }], then: "找了两块木板，用布条绑上。三个月后拆开，胳膊有点歪，不碍事。" },
      { text: "忍着，不说", hint: "身体 −10；声望 −2", effects: [{ k: "body", v: -10 }, { k: "fame", v: -2 }], then: "你怕挨骂，一直没说。母亲洗衣裳时看见你袖子里的血，坐在地上哭了。" }
    ]
  },
  {
    id: "c2.child.school_choice", cat: "家族", title: "束脩", age: [5, 12], weight: 20, once: true,
    when: { minKnowledge: 0 },
    text: [
      "村里请了个先生，在祠堂厢房开蒙。一年束脩一石米，另送节礼。",
      "父亲算了半宿，说：念得起，就是地里少个帮手。"
    ],
    options: [
      { text: "去念", need: { minSilver: 2 }, hint: "银钱 −2；学识 +8", effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 8 }], then: "你念了两年。《千字文》背得下来，写字还是歪的。先生说你心不静。" },
      { text: "只站在窗外听", hint: "学识 +3；身体 −2", effects: [{ k: "knowledge", v: 3 }, { k: "body", v: -2 }], then: "你把先生念的句子记在心里，回家用树枝在地上写。写满了一场院。" },
      { text: "不念，跟着下地", hint: "身体 +3；学识 −1", effects: [{ k: "body", v: 3 }, { k: "knowledge", v: -1 }], then: "父亲说：念书不顶饭吃。你跟着他的犁走，一天下来腰疼得睡不着。" }
    ]
  },
  {
    id: "c2.child.bully", cat: "乡里", title: "沟里", age: [6, 14], weight: 14,
    text: [
      "村里几个大孩子把你按在沟里，说你父兄没用。",
      "泥灌进嘴里，有股腥味。"
    ],
    options: [
      { text: "爬起来打回去", hint: "身体 −4；武艺 +3，声望 +3", effects: [{ k: "body", v: -4 }, { k: "martial", v: 3 }, { k: "fame", v: 3 }], then: "你打输了，也咬了对方一口。第二天他母亲找上门，你被父亲打了一顿。" },
      { text: "回家告诉父亲", hint: "声望 +2；家中生事", effects: [{ k: "fame", v: 2 }], then: "父亲去了他家。回来时什么都没说。你不知道他们说了什么，也不敢问。" },
      { text: "忍着，爬起来拍干净", hint: "声望 −3；身体 −2", effects: [{ k: "fame", v: -3 }, { k: "body", v: -2 }], then: "你从沟里爬出来，把衣裳上的泥拍干净，回家。此后见了他们就绕道走。" }
    ]
  },
  {
    id: "c2.child.temple", cat: "家族", title: "寄名", age: [2, 10], weight: 9, once: true,
    text: [
      "算命的说你命硬，与家里相克，须得寄在方外几年。",
      "母亲信了，父亲不信，但也没拦。"
    ],
    options: [
      { text: "送去寺里做小行者", hint: "学识 +5；身体 +2", effects: [{ k: "knowledge", v: 5 }, { k: "body", v: 2 }], then: "寺里吃素，天不亮就起来扫地。三年后你还俗，会背两卷经，认得几百字。" },
      { text: "只认个挂名师父", hint: "银钱 −2；运气 +1", effects: [{ k: "silver", v: -2 }, { k: "luck", v: 1 }], then: "你每年正月初一去磕头，给师父送一双鞋。这层关系后来不咸不淡地留着。" },
      { text: "不去", hint: "声望 −2；身体 −2", effects: [{ k: "fame", v: -2 }, { k: "body", v: -2 }], then: "母亲抱着你不放。那年家里确实出了事：那头牛死了。她一直记着。" }
    ]
  },
  {
    id: "c2.child.adopt", cat: "家族", title: "过继", age: [3, 14], weight: 7, once: true,
    when: { maxSilver: 400 },
    text: [
      "伯父无子。族中长辈来说：把你过继过去，承他那一房的香火。",
      "过继过去，那边的田产、房屋，日后都是你的。"
    ],
    options: [
      { text: "过继", hint: "田 +3 亩，银钱 +20；声望 −2", effects: [{ k: "field_wet", v: 3 }, { k: "silver", v: 20 }, { k: "fame", v: -2 }], then: "你改了口，叫他爹。亲娘站在人群后面，没说话。此后你两头都去，两头都不算自家人。" },
      { text: "不肯，留在本房", hint: "声望 +4；日后分产吃亏", effects: [{ k: "fame", v: 4 }], then: "母亲说：儿子不能给出去。族中长辈脸色很难看。此后分东西，总少你家一份。" },
      { text: "拖，等伯父再娶", hint: "运气 −1", effects: [{ k: "luck", v: -1 }], then: "伯父第二年果然续了弦，生了个儿子。族里再没人提这件事，但伯母看见你就低头。" }
    ]
  },
  {
    id: "c2.child.wolf", cat: "世变", title: "狼", age: [5, 14], weight: 7,
    text: [
      "村外的麦地里，有人看见狼。先是丢了两只羊，后来丢了一个孩子。",
      "天黑后，家家关门，灶膛里的火不敢灭。"
    ],
    options: [
      { text: "跟着大人守夜", hint: "身体 −4；声望 +5，武艺 +2", effects: [{ k: "body", v: -4 }, { k: "fame", v: 5 }, { k: "martial", v: 2 }], then: "你们在麦场点了三堆火，敲了一夜铜盆。狼没来。" },
      { text: "躲在屋里不出门", hint: "身体 −2；声望 −2", effects: [{ k: "body", v: -2 }, { k: "fame", v: -2 }], then: "你在炕上躺了半个月。狼最后是被邻村的人打死的，皮挂在树上。" },
      { text: "跟人去掏狼窝", hint: "武艺 +4；可能失手", effects: [{ k: "martial", v: 4 }, { k: "fame", v: 4 }], then: "洞里有四只小的。你们把它们摔死了。母狼当夜回来，在村口叫到天亮。", gamble: { deathChance: 0.16, cause: "兽伤" } }
    ]
  },
  {
    id: "c2.child.hunger", cat: "世变", title: "粥薄", age: [2, 12], weight: 16,
    text: [
      "官家在村口设了粥棚。粥是照得见人影的那种，一勺下去，米粒数得清。",
      "队排得很长，没有人说话。"
    ],
    options: [
      { text: "天天去排", hint: "身体 −3；存粮 +2 石", effects: [{ k: "body", v: -3 }, { k: "grain", v: 2 }], then: "你每天去排两次。有一次挤倒了，被人踩了手背，落了块疤。" },
      { text: "跟人去挖野菜、剥树皮", hint: "身体 −5；存粮 +4 石", effects: [{ k: "body", v: -5 }, { k: "grain", v: 4 }], then: "榆树皮磨成粉，掺在糠里。吃下去拉不出来，肚子胀得像鼓。" },
      { text: "把粥让给小的", hint: "身体 −8；声望 +6", effects: [{ k: "body", v: -8 }, { k: "fame", v: 6 }], then: "你把碗推给弟弟，说自己吃过了。他吃得很快，没抬头。" }
    ]
  },
  {
    id: "c2.child.zhuazhou", cat: "家族", title: "抓周", age: [1, 1], weight: 30, once: true,
    text: [
      "满周岁，家里在桌上摆了一圈东西：笔、算盘、小刀、麦穗、铜钱，还有一本旧历书。",
      "亲戚围在旁边看。"
    ],
    options: [
      { text: "抓笔", hint: "学识 +3；父亲脸色一松", effects: [{ k: "knowledge", v: 3 }], then: "父亲笑了一声，说：好。他把笔收进柜子里，说等你长大再给你。" },
      { text: "抓算盘", hint: "学识 +1；银钱 +2", effects: [{ k: "knowledge", v: 1 }, { k: "silver", v: 2 }], then: "母亲说：做买卖也好，饿不着。父亲没接话。" },
      { text: "抓刀，或者麦穗", hint: "武艺 +2；身体 +2", effects: [{ k: "martial", v: 2 }, { k: "body", v: 2 }], then: "有人说这是武相，有人说这是庄稼命。父亲说：都行，能活就行。" }
    ]
  },
  {
    id: "c2.child.sister_marry", cat: "家族", title: "姊嫁", age: [6, 15], weight: 12, once: true,
    text: [
      "姐姐要出嫁了。婆家在三十里外，是个有田的人家。",
      "嫁妆抬出去那天，母亲一直站在门里，没到门口。"
    ],
    options: [
      { text: "跟着送亲", hint: "声望 +3；学识 +1", effects: [{ k: "fame", v: 3 }, { k: "knowledge", v: 1 }], then: "你走在队伍最后。一路上她没哭，拜堂的时候也没哭。回来时你才发现，她的床空了。" },
      { text: "不去，留在家里干活", hint: "身体 +2", effects: [{ k: "body", v: 2 }], then: "你在场上打了一天豆子。晚上回来，桌上有她留下的半包糖。" },
      { text: "舍不得，抱着她哭", hint: "声望 −1；身体 −1", effects: [{ k: "fame", v: -1 }, { k: "body", v: -1 }], then: "她把你推开，说：不许哭，哭了人家看不起。她自己眼睛是红的。" }
    ]
  },
  {
    id: "c2.child.mother_sick", cat: "家族", title: "母亲病", age: [5, 18], weight: 12, once: true,
    text: [
      "母亲病了。先是咳嗽，后来咳出血。",
      "父亲把供在柜顶的那只银簪拿下来，去了城里。"
    ],
    options: [
      { text: "日夜守着", hint: "身体 −6；声望 +6", effects: [{ k: "body", v: -6 }, { k: "fame", v: 6 }], then: "你端水、熬药、倒便盆。她好起来之后，跟人说：这个孩子孝。你听着，不太自在。" },
      { text: "跟着去抓药，学认药", hint: "学识 +4；身体 −3", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -3 }], then: "药铺的先生一边抓一边念药名。你记住了二十几味：当归、白芍、甘草、柴胡。" },
      { text: "照常下地，家里总要有人干活", hint: "身体 +1；声望 −4", effects: [{ k: "body", v: 1 }, { k: "fame", v: -4 }], then: "父亲没说什么。可是那年冬天，他看你的眼神变了。" }
    ]
  },
  {
    id: "c2.child.eyes", cat: "身体", title: "眼花", age: [7, 14], weight: 10, once: true,
    text: [
      "你夜里在油灯下看字，看得久了，眼前发花，字在纸上爬。",
      "白天还好，到了黄昏就模糊。"
    ],
    options: [
      { text: "少看些，白天再念", hint: "学识 −2；身体 +4", effects: [{ k: "knowledge", v: -2 }, { k: "body", v: 4 }], then: "白天在树下念，晚上早睡。眼睛慢慢好了，书却落下不少。" },
      { text: "硬看", hint: "学识 +5；身体 −5", effects: [{ k: "knowledge", v: 5 }, { k: "body", v: -5 }], then: "你把灯芯挑得更长，凑近去看。此后一辈子，远处的人脸你都不太认得清。" },
      { text: "找个方子，泡水洗眼", hint: "银钱 −1；身体 +2", effects: [{ k: "silver", v: -1 }, { k: "body", v: 2 }], then: "用菊花和桑叶煮水，早晚洗。洗了两个月，清爽些了，也不知是药效还是自己好的。" }
    ]
  },

  /* ══════════ 少年 ══════════ */
  {
    id: "c2.teen.apprentice", cat: "营生", title: "学徒", age: [12, 18], weight: 24, once: true,
    text: [
      "城里一家铺子要收学徒。三年没有工钱，管饭，管住。",
      "铺子的掌柜是你父亲绕了三层关系认识的。"
    ],
    options: [
      { text: "去，学记账", hint: "学识 +8；银钱 +1", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: 1 }], then: "师父严厉，打骂是常事。三年里你学会了打算盘、记账，也学会了看人脸色。" },
      { text: "拜匠人学手艺", hint: "武艺 +3；身体 +3；银钱 +2", effects: [{ k: "martial", v: 3 }, { k: "body", v: 3 }, { k: "silver", v: 2 }], then: "削了三年的木料，第四年才准你上梁。手上全是口子，冬天裂开，一沾水就疼。" },
      { text: "留在家里种地", hint: "身体 +4；存粮 +3 石", effects: [{ k: "body", v: 4 }, { k: "grain", v: 3 }], then: "家里缺人手。父亲没说什么，那晚多给了你半个饼。" }
    ]
  },
  {
    id: "c2.teen.brideprice", cat: "家族", title: "聘礼", age: [14, 20], weight: 18, once: true, sex: "male",
    when: { flagNot: ["married"] },
    text: [
      "说定了一门亲。聘礼要八两，家里凑了五两，还差三两。",
      "媒人三天来一趟，每趟都坐一会儿就走，话越说越客气。"
    ],
    options: [
      { text: "借，先把人娶进来", hint: "债务 3 两；声望 +4", effects: [{ k: "debt", v: { amt: 3, rate: 0.04, dueYears: 2 } }, { k: "fame", v: 4 }], then: "钱是跟族中一位堂伯借的。他把钱数了两遍，说：日子是过出来的，不是省出来的。" },
      { text: "去女家求减", hint: "银钱 −4；声望 −4", effects: [{ k: "silver", v: -4 }, { k: "fame", v: -4 }], then: "女家的母亲说了些难听的话。婚还是成了，可这门亲戚，此后一直不冷不热。" },
      { text: "退了这门亲", hint: "声望 −8；银钱 −2", effects: [{ k: "fame", v: -8 }, { k: "silver", v: -2 }], then: "你退了亲。那家的女儿第二年许给了邻县。媒人从此不再上你家的门。" }
    ]
  },
  {
    id: "c2.teen.dowry", cat: "家族", title: "嫁妆", age: [13, 19], weight: 18, once: true, sex: "female",
    text: [
      "家里为你备嫁妆。母亲把她当年的那只箱子擦了一遍，说：这辈子就这些了。",
      "箱底压着两匹布、一只银簪、四双鞋。"
    ],
    options: [
      { text: "说够了，不多要", hint: "声望 +6", effects: [{ k: "fame", v: 6 }], then: "母亲愣了一下，然后把箱子锁上。她转过身去，肩膀动了动。" },
      { text: "再要一副银镯", hint: "银钱 −3；声望 −2", effects: [{ k: "silver", v: -3 }, { k: "fame", v: -2 }], then: "母亲把镯子给了你。后来你才知道，那是她自己的嫁妆，压了二十几年。" },
      { text: "自己攒些，贴补家用", hint: "身体 −3；银钱 +3", effects: [{ k: "body", v: -3 }, { k: "silver", v: 3 }], then: "你接了些针线活，夜里做。一晚上能绣半只鞋面，挣三文钱。" }
    ]
  },
  {
    id: "c2.teen.friend", cat: "乡里", title: "集上", age: [15, 26], weight: 16,
    text: [
      "你在集上认识一个人。他请了你一碗酒，说起话来，句句合你的心意。",
      "他说他姓什么，你没听清，也就没再问。"
    ],
    options: [
      { text: "结交，常来往", hint: "银钱 −2；声望 +5", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 5 }], then: "后来他做了些不干净的生意。你没跟他做，也没去告发。这份交情就这么半生不熟地留着。" },
      { text: "敬他，但不深交", hint: "声望 +2；运气 +1", effects: [{ k: "fame", v: 2 }, { k: "luck", v: 1 }], then: "你敬酒、说话、送他出门，然后不再去找他。他后来又来过两次，见你不热，就不来了。" },
      { text: "跟他做一趟", hint: "银钱 +7；武艺 +3；有风险", effects: [{ k: "silver", v: 7 }, { k: "martial", v: 3 }], then: "一趟下来分了不少。你不知道那批货是什么来路，也没问。", gamble: { deathChance: 0.14, cause: "械斗" } }
    ]
  },
  {
    id: "c2.teen.militia", cat: "官府", title: "团练", age: [15, 32], weight: 14,
    text: [
      "县里办团练，每户出一丁。里正拿着册子挨家走，笔尖在纸上停一下，就是一个人的名字。",
      "轮到你家了。"
    ],
    options: [
      { text: "应名去", hint: "武艺 +5；声望 +4；身体 −4", effects: [{ k: "martial", v: 5 }, { k: "fame", v: 4 }, { k: "body", v: -4 }], then: "每月操练两次，农忙时也照练。教头是个老兵，骂人很难听，教的东西很实在。", gamble: { deathChance: 0.1, cause: "械斗" } },
      { text: "出钱雇人代役", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你出了四两，雇了个光棍去。他去了三回，第四回就跑了。" },
      { text: "躲，说在外做工", hint: "声望 −4；运气 −1", effects: [{ k: "fame", v: -4 }, { k: "luck", v: -1 }], then: "里正心里有数，记了一笔。此后有事，你家总排在后面。" }
    ]
  },
  {
    id: "c2.teen.runaway", cat: "家族", title: "夜走", age: [14, 22], weight: 10, once: true,
    text: [
      "你又跟父亲吵了一架。他把碗摔了，说你要是不愿意在这个家待，就走。",
      "门开着，外面很黑。"
    ],
    options: [
      { text: "真的走", hint: "银钱 −2；运气 +2，声望 −2", effects: [{ k: "silver", v: -2 }, { k: "luck", v: 2 }, { k: "fame", v: -2 }], then: "你走到县城，在码头扛了两天包。第三天，你在街口看见父亲。他没叫你，只是远远地跟着你走了一段。" },
      { text: "跪下认错", hint: "声望 +3；身体 −2", effects: [{ k: "fame", v: 3 }, { k: "body", v: -2 }], then: "你跪在院子里。父亲抽了半宿的烟，最后说了一句：起来吧，地上凉。" },
      { text: "不说话，也不走", hint: "身体 −3；声望 −2", effects: [{ k: "body", v: -3 }, { k: "fame", v: -2 }], then: "你在门槛上坐到天亮。父亲也坐着。两个人一句话没说，第二天照常下地。" }
    ]
  },
  {
    id: "c2.teen.exam", cat: "官府", title: "县试", age: [15, 26], weight: 16, once: true,
    when: { minKnowledge: 20 },
    text: [
      "县里开考。要两名廪生作保，还要一份履历，写明三代名字、籍贯、有无过犯。",
      "保金、纸笔、饭食，加起来要一两多。"
    ],
    options: [
      { text: "去考", need: { minSilver: 1.5 }, hint: "银钱 −1.5；学识 +4", effects: [{ k: "silver", v: -1.5 }, { k: "knowledge", v: 4 }], then: "考了三场。出来时腿是软的。榜贴在西墙，你从头看到尾，又从尾看到头。", gamble: { winChance: 0.4, winNote: "榜上有你的名字。父亲回来时买了两斤肉，一句话没说，把肉放在灶上。", loseNote: "没有中。你把落卷抄了一遍，找出十七处错。" } },
      { text: "不考，先垫底子", hint: "学识 +6；声望 −1", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: -1 }], then: "你把《四书》从头抄了一遍。抄到「君子喻于义」那句，停了一会儿。" },
      { text: "托人捐个名色", need: { minSilver: 30 }, hint: "银钱 −30；声望 +8", effects: [{ k: "silver", v: -30 }, { k: "fame", v: 8 }], then: "钱送出去，文书下来。你有了个名色，穿得比从前体面，走到县衙门口，没人拦你。" }
    ]
  },
  {
    id: "c2.teen.field_edge", cat: "乡里", title: "田界", age: [13, 24], weight: 12,
    text: [
      "邻家犁地，犁过了界，占去半尺宽的一条。",
      "父亲让你去看。你到地里，那条新翻的土色比旁边深，一直通到地头。"
    ],
    options: [
      { text: "当场把界石挖出来", hint: "声望 +4；与人结怨", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], then: "界石还在，埋在三尺下。邻家的老头站在地头看着，说：年轻人，地是种不完的。" },
      { text: "回去告诉父亲，由他出面", hint: "声望 −1；家中生事", effects: [{ k: "fame", v: -1 }], then: "父亲拎着锄去了。两人在地头争了半个时辰，最后各让三寸。晚上他对你说：地可以少，气不能短。" },
      { text: "算了，半尺地不值当", hint: "银钱 +1；声望 −3", effects: [{ k: "silver", v: 1 }, { k: "fame", v: -3 }], then: "你没说话。第二年，那条地又宽了一尺。" }
    ]
  },
  {
    id: "c2.teen.soldier_want", cat: "营生", title: "想投军", age: [15, 24], weight: 12, once: true,
    text: [
      "营里在招人。招兵的官坐在一张矮桌后头，桌上放着一把尺，量身高。",
      "排队的多是些吃不上饭的年轻人。"
    ],
    options: [
      { text: "投军", hint: "武艺 +6；私兵 +6；身体 −3", effects: [{ k: "martial", v: 6 }, { k: "troops", v: 6 }, { k: "body", v: -3 }, { k: "line", v: "military" }], then: "你领了一杆枪、一身号衣。号衣是旧的，袖口有别人洗不掉的褐色。", gamble: { deathChance: 0.16, cause: "战殁" } },
      { text: "回家种地", hint: "身体 +2；存粮 +2 石", effects: [{ k: "body", v: 2 }, { k: "grain", v: 2 }], then: "你从队伍边上走过去。招兵的官喊了一声：那个高个的。你没回头。" },
      { text: "去做随军挑夫", hint: "银钱 +2；身体 −5", effects: [{ k: "silver", v: 2 }, { k: "body", v: -5 }], then: "不用打仗，只管担。一天走六十里，晚上睡在车底下。你见过太多死人，从此不怕了。" }
    ]
  },
  {
    id: "c2.teen.sick_parent", cat: "家族", title: "侍疾", age: [14, 30], weight: 12, once: true,
    text: [
      "父亲倒下了。先是腿肿，后来起不来身。",
      "家里的话，一下子都压到你身上。"
    ],
    options: [
      { text: "请医，卖粮也要治", hint: "银钱 −4；存粮 −5 石；声望 +8", effects: [{ k: "silver", v: -4 }, { k: "grain", v: -5 }, { k: "fame", v: 8 }], then: "郎中来了五趟，开的方子一次比一次贵。父亲多活了三年，最后是在睡梦里走的。" },
      { text: "自己伺候，不请医", hint: "身体 −8；声望 +4", effects: [{ k: "body", v: -8 }, { k: "fame", v: 4 }], then: "你替他翻身、擦洗、喂饭。他有时认得你，有时不认得。半年后他走了，你瘦了十斤。" },
      { text: "听天由命，照常过日子", hint: "声望 −6；身体 +2", effects: [{ k: "fame", v: -6 }, { k: "body", v: 2 }], then: "你照常下地、吃饭、睡觉。族里的人背后议论，你听见了，没接话。" }
    ]
  },

  /* ══════════ 成人 ══════════ */
  {
    id: "c2.adult.water", cat: "乡里", title: "争水", age: [20, 60], weight: 18,
    text: [
      "天旱，渠里的水只够灌一半的田。上游的村子把水口堵了。",
      "你们村的人扛着锄头去了。对面也来了人，手里拿着同样的东西。"
    ],
    options: [
      { text: "带头去扒水口", hint: "身体 −6；声望 +8，武艺 +2", effects: [{ k: "body", v: -6 }, { k: "fame", v: 8 }, { k: "martial", v: 2 }], then: "两村在渠边对峙了一天，最后各让一步，轮流浇。你在前面站了两个时辰，腿都麻了。", gamble: { deathChance: 0.1, cause: "械斗" } },
      { text: "去县里告", hint: "银钱 −3；声望 +3", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 3 }], then: "县里判了「轮灌」，贴了告示。第一年照办，第二年就没人看了。" },
      { text: "自家挑水，惹不起", hint: "身体 −5；存粮 −3 石", effects: [{ k: "body", v: -5 }, { k: "grain", v: -3 }], then: "你从三里外的河里挑水，一天四趟。那年你家的田比谁家都薄。" }
    ]
  },
  {
    id: "c2.adult.harvest", cat: "家业", title: "抢收", age: [18, 65], weight: 20,
    when: { minFieldWet: 1 },
    text: [
      "麦子熟了。西边的天压得很低，风里有土腥味。",
      "这种云，半个时辰就能落雹子。"
    ],
    options: [
      { text: "全家下地，连夜割", hint: "身体 −8；存粮 +6 石", effects: [{ k: "body", v: -8 }, { k: "grain", v: 6 }], then: "割到后半夜，雹子下来了，砸在背上像石头。抢回大半，余下的泡在泥里。" },
      { text: "雇短工", need: { minSilver: 3 }, hint: "银钱 −3；存粮 +8 石", effects: [{ k: "silver", v: -3 }, { k: "grain", v: 8 }], then: "来了七个人，一天割完。领头的说：你家的麦子长得好。他抹了一把脸上的汗。" },
      { text: "等天晴，明天再割", hint: "存粮 −6 石；身体 +1", effects: [{ k: "grain", v: -6 }, { k: "body", v: 1 }], then: "雹子下了一刻钟。第二天麦子倒了一片，割下来的都是芽麦，磨的面发黑。" }
    ]
  },
  {
    id: "c2.adult.corvee", cat: "官府", title: "夫役", age: [16, 55], weight: 20, sex: "male",
    text: [
      "县里修河堤，派夫役。一县出五百人，做四十天，自带干粮。",
      "里正说：不去也行，出钱。"
    ],
    options: [
      { text: "自己去", hint: "身体 −10；声望 +5；银钱 +2", effects: [{ k: "body", v: -10 }, { k: "fame", v: 5 }, { k: "silver", v: 2 }], then: "挑土、打桩、下埽。夜里睡在堤上，有人再没醒过来。四十天后你回家了，瘦了一圈。", gamble: { deathChance: 0.08, cause: "役死" } },
      { text: "出钱雇人代役", need: { minSilver: 5 }, hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "钱给了里正，他记在册上。后来你听说，那批人里死了十一个。" },
      { text: "报病，不去", hint: "声望 −6；运气 −1", effects: [{ k: "fame", v: -6 }, { k: "luck", v: -1 }], then: "你报了病。里正来家里看了一眼，看了看你的脸，没说什么，走了。" }
    ]
  },
  {
    id: "c2.adult.salt", cat: "市井", title: "盐", age: [20, 65], weight: 14,
    text: [
      "盐又涨价了。官盐一斤要三十文，私盐只要十二文。",
      "有人半夜敲门，问：要不要盐。"
    ],
    options: [
      { text: "买私盐", hint: "银钱 +3；运气 −1", effects: [{ k: "silver", v: 3 }, { k: "luck", v: -1 }], then: "你买了二十斤，藏在地窖里。吃了一年。那盐发苦，可是比官盐便宜一半多。" },
      { text: "买官盐，认这个价", hint: "银钱 −3；声望 +2", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }], then: "你去盐店排队，看着伙计用秤。他把秤砣往里一推，你没吭声。" },
      { text: "报官，说有私盐贩", hint: "银钱 +6；声望 −8", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -8 }, { k: "grudge", v: 10 }], then: "差役抓了三个人，赏了你六两。半个月后，你家的柴垛在夜里烧了。" }
    ]
  },
  {
    id: "c2.adult.market", cat: "市井", title: "囤货", age: [20, 60], weight: 12,
    when: { minSilver: 12 },
    text: [
      "听说北边打仗，粮价要涨。",
      "眼下粮价低，仓里有银子的人都在买。"
    ],
    options: [
      { text: "买粮囤着", hint: "银钱 −12；存粮 +14 石", effects: [{ k: "silver", v: -12 }, { k: "grain", v: 14 }], then: "你买了十四石，堆在西屋。三个月后粮价涨了一倍，你卖了一半，剩下一半自家吃。" },
      { text: "把钱留着", hint: "银钱 +1", effects: [{ k: "silver", v: 1 }], then: "你没买。后来粮价确实涨了，落了两个月又落回去。你没赚，也没赔。" },
      { text: "借钱多买", need: { minSilver: 4 }, hint: "债务 15 两；存粮 +30 石", effects: [{ k: "debt", v: { amt: 15, rate: 0.05, dueYears: 2 } }, { k: "grain", v: 30 }], then: "你把家里的银子全押上，又借了十五两。仓里堆满了。你夜里睡着，梦见粮价跌了。" }
    ]
  },
  {
    id: "c2.adult.guest", cat: "乡里", title: "投宿", age: [20, 65], weight: 12,
    text: [
      "天快黑时，有个人来敲门，说要借宿一晚。他背着一个长条包袱，鞋上全是泥。",
      "母亲说过：留宿外人不吉利。"
    ],
    options: [
      { text: "留下他，给一顿饭", hint: "存粮 −2 石；声望 +5；运气 +2", effects: [{ k: "grain", v: -2 }, { k: "fame", v: 5 }, { k: "luck", v: 2 }], then: "他话很少，吃得很快。走时留下一句话：日后若有难处，去南边找一个姓周的。你后来一直没去。" },
      { text: "给点干粮，让他走", hint: "存粮 −1 石；声望 +1", effects: [{ k: "grain", v: -1 }, { k: "fame", v: 1 }], then: "他接过饼，道了谢，走进黑里。你关门时，听见他的脚步声往东去了。" },
      { text: "不开门", hint: "运气 −2；声望 −2", effects: [{ k: "luck", v: -2 }, { k: "fame", v: -2 }], then: "他在门外站了一会儿，然后走了。第二天早上，门口的石阶上有一个脚印，很深的泥。" }
    ]
  },
  {
    id: "c2.adult.gamble_den", cat: "市井", title: "赌局", age: [18, 50], weight: 10, sex: "male",
    text: [
      "后巷的屋里，几个人围着一张桌子，桌上扣着三只碗。",
      "有人赢了一叠钱，脸都红了。"
    ],
    options: [
      { text: "下场赌两把", hint: "输赢不定", effects: [], then: "", gamble: { winChance: 0.42, win: [{ k: "silver", v: 8 }, { k: "fame", v: 2 }], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -2 }], winNote: "你赢了两把就收了手。出门时，有人在后面骂你。", loseNote: "你把身上的钱都输光了。回家路上，你把腰带也解下来看了看。" } },
      { text: "站着看，不下注", hint: "学识 +1；运气 +1", effects: [{ k: "knowledge", v: 1 }, { k: "luck", v: 1 }], then: "你看了一个时辰，看出了门道：庄家的手，每次开碗前都会停一下。" },
      { text: "劝人散了", hint: "声望 +4；与人结怨", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 8 }], then: "你说：都是有家有口的人。有人站起来走了，有人瞪了你一眼。" }
    ]
  },
  {
    id: "c2.adult.wine", cat: "乡里", title: "醉", age: [18, 60], weight: 12,
    text: [
      "族中办喜事，酒是自家酿的，很烈。",
      "有人起哄，说你能喝。"
    ],
    options: [
      { text: "喝到底", hint: "身体 −6；声望 +5", effects: [{ k: "body", v: -6 }, { k: "fame", v: 5 }], then: "你喝到第三坛，桌子开始转。第二天醒来在柴房里，身上盖着一张破席子。族里笑了半年。" },
      { text: "喝两碗就推了", hint: "声望 −1；身体 +1", effects: [{ k: "fame", v: -1 }, { k: "body", v: 1 }], then: "你说：明天要下地。有人说你无趣。你端着碗，笑了笑。" },
      { text: "趁乱说了几句真话", hint: "声望 −6；运气 +1", effects: [{ k: "fame", v: -6 }, { k: "luck", v: 1 }, { k: "grudge", v: 8 }], then: "你把憋了几年的话说了。说完之后屋里很静。第二天，有人不再跟你打招呼。" }
    ]
  },
  {
    id: "c2.adult.rumor", cat: "乡里", title: "谣言", age: [20, 65], weight: 12,
    text: [
      "村里丢了东西，有人说是你家的人拿的。",
      "话是怎么起的，你不知道；传到第三个人嘴里时，已经成了你亲手拿的。"
    ],
    options: [
      { text: "到祠堂前，当众说清", hint: "声望 +8；与人结怨", effects: [{ k: "fame", v: 8 }, { k: "grudge", v: 10 }], then: "你跪在祠堂前起誓。有人信了，有人低头不说话。这件事此后没人再提。" },
      { text: "不理，照常过日子", hint: "声望 −5；身体 +1", effects: [{ k: "fame", v: -5 }, { k: "body", v: 1 }], then: "你不解释。三年后，真正拿东西的人自己说漏了嘴。可你的名声，没回来多少。" },
      { text: "去县里告他诬告", hint: "银钱 −4；声望 +5", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 5 }], then: "县里问了两堂，判他赔你两石米。他赔了，从此两家不来往。" }
    ]
  },
  {
    id: "c2.adult.soldier_pay", cat: "世变", title: "索饷", age: [16, 70], weight: 12,
    text: [
      "一队兵过境，住进了村里。带队的说要「借」些粮饷。",
      "「借」这个字，他说得很轻。"
    ],
    options: [
      { text: "照数给", hint: "银钱 −8；存粮 −4 石", effects: [{ k: "silver", v: -8 }, { k: "grain", v: -4 }], then: "他们把粮装上车，走时带队的人写了张字条，按了个手印。字条后来没处去兑。" },
      { text: "藏起粮，说家里也断了顿", hint: "声望 −3；可能被搜", effects: [{ k: "fame", v: -3 }, { k: "body", v: -6 }], then: "他们翻了院子，砸了两口缸。走时把你推在地上，用刀背拍了你一下。", gamble: { deathChance: 0.12, cause: "兵祸" } },
      { text: "请他们喝酒，周旋", need: { minSilver: 3 }, hint: "银钱 −3；声望 +4", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 4 }], then: "你陪他们喝到半夜，说了不少好话。第二天他们走了，粮一粒没动。" }
    ]
  },
  {
    id: "c2.adult.midwife", cat: "家族", title: "临盆", age: [19, 45], weight: 22, sex: "male",
    when: { flagHas: ["married"] },
    text: [
      "妻子发动了。稳婆进去，出来，又进去。",
      "屋里传出声音，一声比一声低。"
    ],
    options: [
      { text: "请大夫，保大人", need: { minSilver: 4 }, hint: "银钱 −4；声望 +6", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 6 }], then: "大夫来得很快。孩子没保住，妻子活下来了。她躺了两个月，一直没说话。", gamble: { deathChance: 0.04, cause: "产育" } },
      { text: "听稳婆的，顺其自然", hint: "身体 −2；听天由命", effects: [{ k: "body", v: -2 }], then: "稳婆让烧热水、拿布。天快亮时，孩子生下来了，哭声很响。" },
      { text: "烧香许愿", hint: "银钱 −2；声望 +2", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }], then: "你在院子里跪着，磕了一百个头。天亮时，稳婆出来说：恭喜，是个儿子。" }
    ]
  },
  {
    id: "c2.adult.tax_press", cat: "官府", title: "催科", age: [20, 70], weight: 18,
    text: [
      "差役来催税。手里拿着串票，站在门口不进来，也不走。",
      "他说：上头有期限，我也是当差吃饭。"
    ],
    options: [
      { text: "如数交了", hint: "银钱 −10", effects: [{ k: "silver", v: -10 }], then: "钱数完，他在票上盖了印。走时他说：明年别再拖了。你说：尽力。" },
      { text: "求宽限几日", hint: "声望 −3；债务 +6 两", effects: [{ k: "fame", v: -3 }, { k: "debt", v: { amt: 6, rate: 0.05, dueYears: 1 } }], then: "他答应了，条件是你得给他一份「脚钱」。你借了六两，把这一关过了。" },
      { text: "硬顶，说没有", hint: "身体 −8；声望 +4", effects: [{ k: "body", v: -8 }, { k: "fame", v: 4 }], then: "他叫了两个人来，把你带到县里关了一夜。第二天族里凑钱赎你出来。" }
    ]
  },
  {
    id: "c2.adult.charity", cat: "乡里", title: "施粥", age: [25, 70], weight: 12,
    when: { minSilver: 20 },
    text: [
      "城外聚集了几百号流民。官府不管，士绅们凑了些钱。",
      "有人来问你：出不出。"
    ],
    options: [
      { text: "出一份，开棚施粥", hint: "银钱 −15；声望 +14", effects: [{ k: "silver", v: -15 }, { k: "fame", v: 14 }], then: "粥棚支了二十天。你每天去看一次，看米下锅、看队排得直不直。有人给你磕头，你躲开了。" },
      { text: "少出一点，意思到了", hint: "银钱 −5；声望 +5", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 5 }], then: "你出了五两，没去看。名单上你的名字排在中间，不大不小。" },
      { text: "不出，自家也紧", hint: "声望 −6；银钱 +1", effects: [{ k: "fame", v: -6 }, { k: "silver", v: 1 }], then: "你把门关了三天。第四天开门，城外的粥棚已经撤了，地上剩一层黑印子。" }
    ]
  },
  {
    id: "c2.adult.moneylend", cat: "家业", title: "放债", age: [25, 65], weight: 12,
    when: { minSilver: 40 },
    text: [
      "邻村有户人家要卖田葬父，缺钱，来问你借。",
      "借据上写着：月息三分，以田为押。"
    ],
    options: [
      { text: "借，照规矩收息", hint: "银钱 −20；日后回收", effects: [{ k: "silver", v: -20 }, { k: "fame", v: -2 }], schedule: [{ inYears: 2, effects: [{ k: "silver", v: 30 }], note: "借出的钱，连本带利收了回来" }], then: "他在借据上按了手印，很重，红得像血。两年后他把钱还清了，一句话没多说。" },
      { text: "借，不收息", hint: "银钱 −20；声望 +12", effects: [{ k: "silver", v: -20 }, { k: "fame", v: 12 }], schedule: [{ inYears: 3, effects: [{ k: "silver", v: 20 }], note: "无息借出的钱，人家一分不少地还了" }], then: "你把「月息三分」划了。他看了半天，问：当真？你说：当真。" },
      { text: "不借", hint: "声望 −4；银钱 +1", effects: [{ k: "fame", v: -4 }, { k: "silver", v: 1 }], then: "你说家里也周转不开。他站了一会儿，走了。后来听说他把田卖了，卖了贱价。" }
    ]
  },
  {
    id: "c2.adult.child_sick", cat: "家族", title: "幼儿病", age: [22, 50], weight: 16,
    when: { flagHas: ["married"] },
    text: [
      "孩子病了，一直哭，哭到没力气。",
      "伸手一摸，头烫。"
    ],
    options: [
      { text: "连夜去请郎中", need: { minSilver: 2 }, hint: "银钱 −2；声望 +5", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 5 }], then: "郎中半夜来的，提着灯。他摸了脉，开了方子，说：今晚熬过去就没事。你把药熬了一夜。" },
      { text: "用土方：葱白、姜、酒擦身", hint: "身体 −3；看运气", effects: [{ k: "body", v: -3 }], then: "你用布蘸酒，一遍一遍擦他的胸口和脚心。天快亮时，他睡着了。", gamble: { deathChance: 0.12, cause: "痘疹" } },
      { text: "抱着他，一夜不睡", hint: "身体 −6；声望 +3", effects: [{ k: "body", v: -6 }, { k: "fame", v: 3 }], then: "你抱着他在屋里走，走了一夜。天亮时你的胳膊抬不起来了，他退了烧。" }
    ]
  },
  {
    /* 上限原本是 60，但「老伴」那条要到 50 岁以后才可能触发，
       两头一夹，丧偶的人基本都过了 60，这条永远抽不到。放宽到 75。 */
    id: "c2.adult.second_wife", cat: "家族", title: "续弦", age: [30, 75], weight: 10, sex: "male",
    when: { flagHas: ["widowed"] },
    text: [
      "妻子走了三年。家里没人管，孩子没人看。",
      "族中长辈说：该再娶一个了。"
    ],
    options: [
      { text: "续弦，娶个能持家的", hint: "银钱 −12；声望 +4", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 26 } }], then: "新妇进门那天，前妻的孩子躲在灶间不出来。她进去，蹲下，说了很久的话。" },
      { text: "不娶，自己带", hint: "身体 −6；声望 +6", effects: [{ k: "body", v: -6 }, { k: "fame", v: 6 }], then: "你学会了缝补、做饭、给孩子梳头。手上添了些针眼。族里有人说你傻。" },
      { text: "纳个妾，不办正礼", hint: "银钱 −20；声望 −4", effects: [{ k: "silver", v: -20 }, { k: "fame", v: -4 }, { k: "addPerson", v: { role: "concubine", rel: "妾", age: 19 } }], then: "没有花轿，没有吹打。她进门时低着头，进门之后一直低着头。" }
    ]
  },
  {
    id: "c2.adult.sellchild", cat: "世变", title: "卖儿", age: [22, 55], weight: 9,
    text: [
      "荒年第三个月，家里最后一点粮也吃完了。",
      "有人牙子来过，说男孩五两，女孩三两。"
    ],
    options: [
      { text: "卖一个，换全家活命", hint: "银钱 +5；声望 −12", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -12 }, { k: "body", v: 2 }], then: "牙子把钱数给你，领人走。孩子回头看了你一眼，没哭。你也没哭。此后每逢年节，你都会多摆一副碗筷。" },
      { text: "不卖，一家人一起饿", hint: "身体 −12；声望 +8", effects: [{ k: "body", v: -12 }, { k: "fame", v: 8 }], then: "你们挖野菜、剥树皮、煮皮带。那年冬天，家里少了两个人，但没人被卖出去。" },
      { text: "把孩子送人，不要钱", hint: "银钱 −2；声望 +4", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 4 }], then: "你把孩子送给了一户没儿女的人家，说：不图别的，让他活着。此后你不再去那个村子。" }
    ]
  },
  {
    id: "c2.adult.bigland", cat: "家业", title: "置产", age: [28, 60], weight: 12,
    when: { minSilver: 60 },
    text: [
      "邻村的地要卖，二十亩，连着一片水塘。",
      "卖主急着用钱，价压得很低。"
    ],
    options: [
      { text: "买下", hint: "银钱 −55；田 +20 亩", effects: [{ k: "silver", v: -55 }, { k: "field_wet", v: 8 }, { k: "field_dry", v: 12 }], then: "文书过了户，你在田埂上走了一圈。走到水塘边，你蹲下来，捧了口水喝。" },
      { text: "只买水塘边的好地", hint: "银钱 −30；田 +10 亩", effects: [{ k: "silver", v: -30 }, { k: "field_wet", v: 10 }], then: "你只要了靠水的那十亩。卖主松了口气，说：会挑。" },
      { text: "不买，钱留着", hint: "银钱 +2；声望 −2", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -2 }], then: "你没买。三年后那地被别人买走，转手涨了一倍。你听说时，正在场上晒谷。" }
    ]
  },
  {
    id: "c2.adult.temple_fair", cat: "乡里", title: "庙会", age: [12, 60], weight: 10,
    text: [
      "庙会。戏台搭在庙前，唱的是本地的调子。",
      "人挤得走不动，香灰浮在光里。"
    ],
    options: [
      { text: "看戏，看到散场", hint: "银钱 −2；声望 +3；学识 +1", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }, { k: "knowledge", v: 1 }], then: "你站在人堆里看了三个时辰脚不觉得疼。散场时天已经黑了，路上全是提灯的人。" },
      { text: "摆个摊，赚一天的钱", hint: "银钱 +4；身体 −3", effects: [{ k: "silver", v: 4 }, { k: "body", v: -3 }], then: "你卖了一天的汤饼。收摊时数钱，数出三十几文，还有一枚不知谁给的假钱。" },
      { text: "去庙里上香，求个平安", hint: "银钱 −1；运气 +2", effects: [{ k: "silver", v: -1 }, { k: "luck", v: 2 }], then: "你跪在蒲团上，想了半天该求什么，最后什么也没求。出来时，香还燃着。" }
    ]
  },
  {
    id: "c2.adult.beggar", cat: "乡里", title: "门口", age: [10, 70], weight: 10,
    text: [
      "一个乞丐站在门口。衣裳不算太破，只是脚上没有鞋。",
      "他不说话，就那么站着。"
    ],
    options: [
      { text: "给一碗饭", hint: "存粮 −1 石；声望 +3；运气 +1", effects: [{ k: "grain", v: -1 }, { k: "fame", v: 3 }, { k: "luck", v: 1 }], then: "他接过碗，蹲在门槛外吃完，把碗放在地上，磕了个头。碗是干净的。" },
      { text: "给两个钱，让他走", hint: "银钱 −0.5；声望 +1", effects: [{ k: "silver", v: -0.5 }, { k: "fame", v: 1 }], then: "他把钱收进袖子里，说了一声「好人有好报」，转身走了。" },
      { text: "关门", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "你把门关上，在门后站了一会儿。听见他在外面站了很久才走。" }
    ]
  },
  {
    id: "c2.adult.bad_doctor", cat: "身体", title: "庸医", age: [25, 70], weight: 12,
    text: [
      "你身上不舒服，拖了两个月。",
      "街口有个郎中，招牌上写着「世代儒医」，门口排着队。"
    ],
    options: [
      { text: "去排队，抓他的药", hint: "银钱 −3；身体 −2", effects: [{ k: "silver", v: -3 }, { k: "body", v: -2 }], then: "他搭了脉，说了些听不懂的话，开了二十几味药。吃到第五剂，你自己停了。" },
      { text: "找相识的老郎中", hint: "银钱 −2；身体 +4", effects: [{ k: "silver", v: -2 }, { k: "body", v: 4 }], then: "老郎中骂了一句庸医，开了四味药。吃下去，第二天就能起炕了。" },
      { text: "不治，养着", hint: "身体 −6；银钱 +1", effects: [{ k: "body", v: -6 }, { k: "silver", v: 1 }], then: "你少吃饭，多睡觉。半年后好了，也不知是怎么好的。此后天一冷，那地方就隐隐地疼。" }
    ]
  },
  {
    id: "c2.adult.old_friend", cat: "乡里", title: "故人", age: [30, 70], weight: 10,
    text: [
      "路上遇见一个旧相识。当年一起念书、一起下河。",
      "他瘦了很多，衣裳倒是体面的。"
    ],
    options: [
      { text: "请他回家吃饭", hint: "银钱 −2；声望 +4；运气 +2", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 4 }, { k: "luck", v: 2 }], then: "酒过三巡，他说起这些年的遭遇，说到一半停了。你没问。第二天他走时，在桌上留了一小锭银子。" },
      { text: "站着说几句就散", hint: "声望 +1", effects: [{ k: "fame", v: 1 }], then: "说了些天冷天热、收成好坏。分手时互相作了个揖，走的方向不一样。" },
      { text: "装作没认出", hint: "声望 −4；运气 −1", effects: [{ k: "fame", v: -4 }, { k: "luck", v: -1 }], then: "你低下头走过去。走出十几步回头看，他也正回头。两个人都装作没看见。" }
    ]
  },

  /* ══════════ 晚岁 ══════════ */
  {
    id: "c2.old.retire", cat: "家族", title: "交家", age: [50, 72], weight: 18, once: true,
    when: { flagHas: ["married"] },
    text: [
      "你五十几了。田里的活，儿子已经做得比你利索。",
      "族中有人提：该把家交给下一辈了。"
    ],
    options: [
      { text: "交，从此不管事", hint: "田 −8 亩（分产）；身体 +6；声望 +6", effects: [{ k: "field_wet", v: -5 }, { k: "field_dry", v: -3 }, { k: "body", v: 6 }, { k: "fame", v: 6 }], then: "你把田契、账本、钥匙都摆到桌上，一样一样交。交完了，你忽然不知道明天该做什么。" },
      { text: "交一半，留一半", hint: "田 −4 亩；身体 +3", effects: [{ k: "field_wet", v: -3 }, { k: "field_dry", v: -1 }, { k: "body", v: 3 }], then: "你把远的那几块交了，近的留着。儿子没说什么，媳妇的脸色不太好看。" },
      { text: "不交，还撑得住", hint: "身体 −4；声望 −2", effects: [{ k: "body", v: -4 }, { k: "fame", v: -2 }], then: "你照旧天不亮就起。有一回在地里站久了，直不起腰，是孙子把你扶回来的。" }
    ]
  },
  {
    id: "c2.old.tomb", cat: "家族", title: "择地", age: [48, 74], weight: 14, once: true,
    text: [
      "你开始想坟地的事。",
      "风水先生说：这块地背山面水，主后代兴旺。要价八两。"
    ],
    options: [
      { text: "买下，请人看日子", hint: "银钱 −8；声望 +6", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 6 }], then: "地买下了，界石立了。你站在那块地上看了一会儿，觉得风确实比别处柔。" },
      { text: "就在祖坟边上添一穴", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], then: "祖坟边上还有地方。你跟族中长辈说了一声，他点头：本该如此。" },
      { text: "不管这些", hint: "银钱 +1；声望 −3", effects: [{ k: "silver", v: 1 }, { k: "fame", v: -3 }], then: "你说：人死了就死了。族里有人摇头，说你不懂规矩。子孙后来还是照规矩办了。" }
    ]
  },
  {
    id: "c2.old.genealogy", cat: "家族", title: "修谱", age: [45, 75], weight: 14, once: true,
    text: [
      "族中要修谱。二十几年没修了，上一辈的名字有的都记不全。",
      "公推几个人主事，有人提了你的名字。"
    ],
    options: [
      { text: "应下来，出钱出力", hint: "银钱 −10；声望 +14", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 14 }], then: "你跑了几十个村子，问了上百个老人。谱成那天，你在祠堂里把自己那一支的名字描了一遍，很慢。" },
      { text: "出钱，不管事", hint: "银钱 −6；声望 +6", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 6 }], then: "钱出了，事没管。谱上你那一支写得简略，只有生卒和子嗣。" },
      { text: "推了", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你说自己不识字、不懂规矩。后来谱修成了，你翻到自己的名字，看了一会儿，合上了。" }
    ]
  },
  {
    id: "c2.old.will", cat: "家族", title: "遗言", age: [55, 80], weight: 16, once: true,
    text: [
      "你病了一场，起来后觉得不如从前。",
      "该说的话，该分的东西，早晚要有个交代。"
    ],
    options: [
      { text: "请族中长辈来，当面分明白", hint: "声望 +10；家中无争", effects: [{ k: "fame", v: 10 }], then: "你把田、房、钱，一项一项说清，请人写在纸上，按了手印。儿子们都在，谁也没说话。" },
      { text: "只跟长子交代", hint: "声望 +4；日后有争", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 10 }], then: "你把长子叫到床前，说了半个时辰。他出去时脸色很沉。你知道，另外两个不会服。" },
      { text: "什么也不说，随他们去", hint: "声望 −6", effects: [{ k: "fame", v: -6 }], then: "你想：说了也没用。你死后第三年，兄弟几个为两亩地打了一架，闹到县里。" }
    ]
  },
  {
    id: "c2.old.friend_die", cat: "乡里", title: "先走", age: [50, 80], weight: 12,
    text: [
      "同年的人，一个一个走了。",
      "这一回是你从小一起长大的那个。"
    ],
    options: [
      { text: "去吊唁，守到出殡", hint: "身体 −3；声望 +6", effects: [{ k: "body", v: -3 }, { k: "fame", v: 6 }], then: "你在他家坐了两天。他的儿子叫你一声伯，你就哭了。回来路上，你走得很慢。" },
      { text: "送一份礼，不去", hint: "银钱 −2；声望 +2", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }], then: "你托人带了礼去。那天你在家里坐了一整天，什么也没做。" },
      { text: "去看看他家的难处", hint: "银钱 −5；声望 +8；运气 +1", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 8 }, { k: "luck", v: 1 }], then: "他家的儿子还小，欠着债。你替他们还了一半。他儿子跪下来，你把他拉起来，说：你爹当年也帮过我。" }
    ]
  },
  {
    id: "c2.old.teeth", cat: "身体", title: "牙", age: [45, 78], weight: 14,
    text: [
      "牙疼了半个月。夜里疼得睡不着，用凉水含着。",
      "腮帮子肿起来，说话漏风。"
    ],
    options: [
      { text: "找牙匠拔了", hint: "银钱 −2；身体 +4", effects: [{ k: "silver", v: -2 }, { k: "body", v: 4 }], then: "牙匠用一根线、一把钳。拔出来的时候，你听见了根断的声音。血流了一手巾。" },
      { text: "忍着，含花椒", hint: "身体 −6", effects: [{ k: "body", v: -6 }], then: "你嘴里含了半月的花椒，麻了就换。后来那颗牙自己掉了，掉在饭碗里。" },
      { text: "吃些软的，不管它", hint: "身体 −3；银钱 +1", effects: [{ k: "body", v: -3 }, { k: "silver", v: 1 }], then: "你改吃粥、吃烂面。此后很多年，你没再咬过硬的东西。" }
    ]
  },
  {
    id: "c2.old.grandson", cat: "家族", title: "孙儿", age: [48, 78], weight: 16,
    text: [
      "孙子五岁了，整天跟在你后面。",
      "他问你：爷爷，你小时候是什么样的？"
    ],
    options: [
      { text: "跟他讲从前的事", hint: "声望 +4；身体 +2", effects: [{ k: "fame", v: 4 }, { k: "body", v: 2 }], then: "你讲了半个下午：荒年、兵过、你父亲怎么死的。他听得眼睛发亮，其实一句也没听懂。" },
      { text: "教他认字、打算盘", hint: "学识 +2；声望 +6", effects: [{ k: "knowledge", v: 2 }, { k: "fame", v: 6 }], then: "你用树枝在地上写。他学得快，第三天就会写自己的名字。你看着他写，忽然想起自己第一次拿笔。" },
      { text: "让他自己去玩", hint: "身体 +2", effects: [{ k: "body", v: 2 }], then: "你说：去玩吧。他跑出去，一会儿又跑回来，还是站在你旁边。" }
    ]
  },
  {
    id: "c2.old.spouse_die", cat: "家族", title: "老伴", age: [50, 82], weight: 20, once: true,
    when: { flagHas: ["married"] },
    text: [
      "她走的那天，天气很好。",
      "早上还起来扫了院子。中午说累，躺下，就没再起来。"
    ],
    options: [
      { text: "守灵七日，寸步不离", hint: "身体 −8；声望 +8", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }, { k: "flag", v: "widowed" }], then: "你在灵前坐了七天。亲戚来劝，你不走。出殡那天，你自己扶着棺，走完了那段路。" },
      { text: "照规矩办完，然后一个人过", hint: "身体 −4；声望 +4", effects: [{ k: "body", v: -4 }, { k: "fame", v: 4 }, { k: "flag", v: "widowed" }], then: "事办得体面。来的人都说，你是个明白人。晚上人都散了，你在灶前坐了很久，灶是冷的。" },
      { text: "把她的东西都收起来", hint: "身体 −2；运气 −1", effects: [{ k: "body", v: -2 }, { k: "luck", v: -1 }, { k: "flag", v: "widowed" }], then: "你把她的衣裳、梳子、针线，都装进那只旧箱子，锁上，放到床底下。此后你再没打开过。" }
    ]
  },
  {
    id: "c2.old.body_fail", cat: "身体", title: "起不来", age: [62, 88], weight: 18,
    text: [
      "有一天下台阶，腿一软，坐到了地上。",
      "不疼，就是起不来。"
    ],
    options: [
      { text: "让人扶去医馆", need: { minSilver: 3 }, hint: "银钱 −3；身体 +5", effects: [{ k: "silver", v: -3 }, { k: "body", v: 5 }], then: "郎中说是气血不足，开了几味补药。吃了两个月，能拄着拐走了。" },
      { text: "在床上躺着，慢慢养", hint: "身体 −8；声望 +2", effects: [{ k: "body", v: -8 }, { k: "fame", v: 2 }], then: "你躺了半年。孙子每天端饭进来，坐在床边陪你。你能起来时，天已经冷了。" },
      { text: "不服老，硬撑着下地", hint: "身体 −12；声望 +4", effects: [{ k: "body", v: -12 }, { k: "fame", v: 4 }], then: "你扶着墙走到地里，坐在地头看了一下午。回来时发烧，烧了三天。", gamble: { deathChance: 0.12, cause: "跌伤" } }
    ]
  }
);
