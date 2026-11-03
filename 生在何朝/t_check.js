(function (B) {
  B.common = [];
  B.common.push(
    {
      id: "c4.famine.sign", cat: "天灾", title: "兆头", age: [10, 70], weight: 15,
      text: [
        "春上就不下雨。井里的水一寸一寸往下落，落到井绳不够长。",
        "村口的老槐树叶子黄了，是五月。",
        "里正说：「都省着吃。」"
      ],
      options: [
        { text: "把种子留下一半", hint: "粮 −4；秋后还能种", effects: [{ k: "grain", v: -4 }], then: "你把一半的种子装进陶罐，埋在灶后。另一半下了锅。" },
        { text: "把种子全吃了", hint: "粮 −2；秋后无从下种", effects: [{ k: "grain", v: -2 }], schedule: [{ inYears: 1, effects: [{ k: "grain", v: -14 }], note: "秋后无种可下，田里长满草。" }], then: "种子煮成糊，一家人吃了七天。这是那年最后一次吃饱。" },
        { text: "去镇上买粮", need: { minSilver: 3 }, hint: "银钱 −3；粮 +6", effects: [{ k: "silver", v: -3 }, { k: "grain", v: 6 }], then: "镇上的粮价已经涨了三成。你买了六斗，回来的路上被人拦住问了价。" }
      ]
    },
    {
      id: "c4.famine.locust", cat: "天灾", title: "蝗", age: [8, 70], weight: 14,
      text: [
        "蝗从北边来。先是天边一片灰，后是声音，像下雨。",
        "落到地里，禾苗在两个时辰里只剩杆。",
        "老人们敲着铜盆往地里赶。赶不走，蝗飞起来，又落下去。"
      ],
      options: [
        { text: "跟着去赶", hint: "身体 −6；粮 −6", effects: [{ k: "body", v: -6 }, { k: "grain", v: -6 }], then: "你在地里赶了三天，嗓子喊哑了。秋收时，一亩只收了三斗。" },
        { text: "挖沟烧火", hint: "身体 −8；粮 −3", effects: [{ k: "body", v: -8 }, { k: "grain", v: -3 }], then: "你在地头挖了一条长沟，沟里堆了柴，烧了一夜。沟里的蝗堆了半尺厚。" },
        { text: "去庙里求", hint: "银钱 −1；粮 −10", effects: [{ k: "silver", v: -1 }, { k: "grain", v: -10 }], then: "你去了土地庙，供了三升米。蝗吃完了一块地，又飞到下一块。" }
      ]
    },
    {
      id: "c4.famine.flood", cat: "天灾", title: "水", age: [10, 70], weight: 15,
      text: [
        "河决了。水是从半夜来的，先听见声音，后看见水。",
        "你抱着孩子往坡上跑。回头看，屋顶只剩一个尖。",
        "天亮时，水还在涨。"
      ],
      options: [
        { text: "守在坡上等水退", hint: "身体 −8；粮 −6", effects: [{ k: "body", v: -8 }, { k: "grain", v: -6 }], then: "你们在坡上坐了三天，吃生的谷子。水退后，屋里积了三尺泥。" },
        { text: "往县城去", hint: "身体 −6；银钱 −3", effects: [{ k: "body", v: -6 }, { k: "silver", v: -3 }], then: "你带着一家往县城走。城门外搭了棚，一天施一次粥。" },
        { text: "游回去抢粮", hint: "粮 +4；或有死", effects: [{ k: "grain", v: 4 }], gamble: { deathChance: 0.12, cause: "溺" }, then: "你会水。游回去，从梁上摸下两袋谷子，绑在背上又游了回来。" }
      ]
    },
    {
      id: "c4.famine.bark", cat: "天灾", title: "树皮", age: [5, 70], weight: 16, when: { maxGrain: 4 },
      text: [
        "粮吃完了。先是糠，后是野菜，再后来是树皮。",
        "榆树的皮最好，磨成粉，掺一点糠，能蒸成团子。",
        "村东的榆树，已经被剥到一人高。"
      ],
      options: [
        { text: "也去剥", hint: "身体 −8；粮 +2", effects: [{ k: "body", v: -8 }, { k: "grain", v: 2 }], then: "你剥了一筐榆皮，磨了三天。团子咽下去，肚子胀得像鼓。" },
        { text: "去挖观音土", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.15, cause: "胀死" }, then: "白泥挖回来，掺水捏成饼。吃下去不饿，但是拉不出来。" },
        { text: "去镇上讨", hint: "身体 −6；银钱 +1", effects: [{ k: "body", v: -6 }, { k: "silver", v: 1 }], then: "你在镇上的米铺门口跪了一天，讨到半升碎米。" }
      ]
    },
    {
      id: "c4.famine.sellfield", cat: "天灾", title: "卖田", age: [20, 65], weight: 15, when: { maxGrain: 8 },
      text: [
        "镇上的富户知道村里缺粮。他派人来，说一亩田换四斗米。",
        "平常年景，一亩田值十石。",
        "来的人说：「不换也行，明年这时候，还是这个价。」"
      ],
      options: [
        { text: "卖两亩", hint: "田 −2；粮 +8", effects: [{ k: "field_wet", v: -2 }, { k: "grain", v: 8 }], then: "你卖了两亩最靠河的。契上写「永卖」，你的手印按得很重。" },
        { text: "一亩也不卖", hint: "粮 −6；身体 −8", effects: [{ k: "grain", v: -6 }, { k: "body", v: -8 }], then: "你把来人赶走了。那年冬天，你家吃了三个月的糠。" },
        { text: "把田典给他，说好赎回", hint: "田 −4；粮 +10；或有失", effects: [{ k: "field_wet", v: -4 }, { k: "grain", v: 10 }], gamble: { winChance: 0.4, win: [], lose: [], loseNote: "三年后你凑不出赎银，田归了他。" }, then: "典契上写着三年。三年后的事，谁也说不准。" }
      ]
    },
    {
      id: "c4.famine.sellchild", cat: "天灾", title: "卖", age: [22, 55], weight: 12, when: { maxGrain: 5, flagNot: ["sold_child"] },
      text: [
        "人市在县城西门外。男孩五斗米，女孩三斗。",
        "你带着最小的那个去了。她七岁，不知道要去做什么。",
        "牙人说：「这个瘦，两斗半。」"
      ],
      options: [
        { text: "卖了", hint: "粮 +5；声望 −12", effects: [{ k: "grain", v: 5 }, { k: "fame", v: -12 }, { k: "favor", v: -10 }], setFlag: ["sold_child"], schedule: [{ inYears: 12, effects: [{ k: "silver", v: 3 }], note: "有人送来三两银子，说是当年那个孩子托人捎的。" }], then: "她被一个穿绸的妇人领走了。走的时候回头看了你一眼，没有哭。" },
        { text: "带回去", hint: "粮 −4；身体 −6", effects: [{ k: "grain", v: -4 }, { k: "body", v: -6 }], then: "你把她带回了家。路上她一直牵着你的衣角。那年冬天，家里少了一个人的口粮，多了一个人的力气。" },
        { text: "卖给邻村，还能见着", hint: "粮 +4；声望 −8", effects: [{ k: "grain", v: 4 }, { k: "fame", v: -8 }], setFlag: ["sold_child"], then: "邻村的李家领走了她，做童养媳。隔一条河，你还能看见她挑水。" }
      ]
    },
    {
      id: "c4.famine.porridge", cat: "乡里", title: "粥棚", age: [12, 70], weight: 14,
      text: [
        "县里的善堂在城隍庙前设了粥棚。一天一次，一人一勺。",
        "排队的有三百多人。",
        "管粥的说：「插队的，一天不给。」"
      ],
      options: [
        { text: "老实排队", hint: "身体 −4；粮 +3", effects: [{ k: "body", v: -4 }, { k: "grain", v: 3 }], then: "你从辰时排到午时，领到一勺。粥很稀，碗底能看见人影。" },
        { text: "插到前头去", hint: "粮 +5；声望 −4", effects: [{ k: "grain", v: 5 }, { k: "fame", v: -4 }], then: "你挤到前面。后面有人骂，有人推。你端着碗走了。" },
        { text: "去帮粥棚挑水，换两份", hint: "身体 −6；粮 +5", effects: [{ k: "body", v: -6 }, { k: "grain", v: 5 }], then: "你挑了十天水，一天两份粥。管粥的是个老秀才，他说：「你这个人，还肯出力。」" }
      ]
    },
    {
      id: "c4.famine.lender", cat: "生计", title: "印子钱", age: [20, 60], weight: 13,
      text: [
        "借一石，还一石五。三个月为期，过期再滚。",
        "放钱的是镇上的王掌柜，他的账本记了三十多户。",
        "他说：「不借也行，我看着你家那几亩地。」"
      ],
      options: [
        { text: "借一石", hint: "粮 +8；欠债", effects: [{ k: "grain", v: 8 }, { k: "debt", v: { amt: 12, rate: 0.03, dueYear: 1 } }], then: "你按了手印。王掌柜把钱串好，说：「明年这时候，我来收。」" },
        { text: "借三石", hint: "粮 +20；债重", effects: [{ k: "grain", v: 20 }, { k: "debt", v: { amt: 45, rate: 0.04, dueYear: 1 } }], then: "三石粮，够吃到秋。账本上，你的名字排在第一页。" },
        { text: "不借", hint: "粮 −6；身体 −6", effects: [{ k: "grain", v: -6 }, { k: "body", v: -6 }], then: "你没借。王掌柜笑了笑，说：「有骨气。」" }
      ]
    },
    {
      id: "c4.famine.rain", cat: "天灾", title: "终于下雨", age: [10, 70], weight: 12,
      text: [
        "六月十九，下雨了。",
        "雨下了两天两夜。村里的人都站在屋檐下看，没有人说话。",
        "有人在雨里跪下来，磕头。"
      ],
      options: [
        { text: "赶紧下种", hint: "身体 −8；田 +3", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: 3 }], then: "雨一停你就下了地。种的是荞麦，七十天能收。那年秋天，收了三成。" },
        { text: "先去修房", hint: "银钱 −2；身体 −4", effects: [{ k: "silver", v: -2 }, { k: "body", v: -4 }], then: "屋顶漏了两个月。你上房补瓦，补了两天。地里的活，晚了下种。" },
        { text: "去庙里还愿", hint: "银钱 −1；声望 +4", effects: [{ k: "silver", v: -1 }, { k: "fame", v: 4 }], then: "你买了一炷香，去土地庙磕了头。庙里的泥像，半边脸被雨淋掉了。" }
      ]
    },
    {
      id: "c4.famine.winter", cat: "天灾", title: "冬天", age: [8, 70], weight: 14,
      text: [
        "那年冬天特别冷。河冻了三尺，能走车。",
        "家里的柴烧完了，被子只有一床。",
        "隔壁的老夫妇，三天没开门。"
      ],
      options: [
        { text: "去敲隔壁的门", hint: "身体 −4；声望 +6", effects: [{ k: "body", v: -4 }, { k: "fame", v: 6 }], then: "门是从里头闩着的。你撬开，两个人都硬了，抱在一起。" },
        { text: "拆了篱笆烧", hint: "身体 −2；田 −1", effects: [{ k: "body", v: -2 }, { k: "field_wet", v: -1 }], then: "你把院子的篱笆拆了烧。烧了十天。开春要重扎，又得砍树。" },
        { text: "一家人挤一床被", hint: "身体 −6；省柴", effects: [{ k: "body", v: -6 }], then: "五个人挤一床被，脚对着脚。半夜有人冻醒，就起来添一把柴。" }
      ]
    },
    {
      id: "c4.famine.tax", cat: "赋役", title: "灾年照征", age: [20, 65], weight: 15,
      text: [
        "灾是灾，税是税。",
        "县里的告示写着：本年的税粮，照旧例征。",
        "里正说：「报灾的文书递上去了，批不批，不知道。粮，先备着。」"
      ],
      options: [
        { text: "照缴", hint: "粮 −12；声望 +3", effects: [{ k: "grain", v: -12 }, { k: "fame", v: 3 }], then: "你把最后十二石缴了。缴完，缸里只剩一层糠。" },
        { text: "跟着村里一起去县里报灾", hint: "身体 −5；或有减免", effects: [{ k: "body", v: -5 }], gamble: { winChance: 0.45, win: [{ k: "grain", v: 6 }], lose: [{ k: "body", v: -6 }, { k: "fame", v: -4 }], loseNote: "县令说「聚众」，把为首的三个关了三日。" }, then: "村里去了六十多人，跪在县衙门口。县令出来看了一次，进去了。" },
        { text: "把粮藏起来，说被抢了", hint: "粮 +8；或有查", effects: [{ k: "grain", v: 8 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -8 }], loseNote: "查出来粮在地窖里。以「欺官」论，打了板子，粮没了一半。" }, then: "你报了盗。县里来了两个差役，看了看，说：「贼倒是挑了时候。」" }
      ]
    },

    /* ══════════ 疫 ══════════ */
    {
      id: "c4.plague.first", cat: "天灾", title: "时疫", age: [8, 70], weight: 15,
      text: [
        "先是村东的一户，三天死了两口。",
        "然后是村西。再然后，抬棺的人也不够了。",
        "里正说：「疫气传人，门户各闭。」"
      ],
      options: [
        { text: "闭门不出", hint: "身体 −4；粮 −6", effects: [{ k: "body", v: -4 }, { k: "grain", v: -6 }], then: "你把门闩上，用泥把门缝糊了。两个月没出门，粮吃完了才开。" },
        { text: "去帮人抬棺", hint: "身体 −8；声望 +8；或有染", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }], gamble: { deathChance: 0.16, cause: "时疫" }, then: "你抬了十一口棺。第十二口的时候，你开始发热。" },
        { text: "带着家人往山里躲", hint: "身体 −6；粮 −4；或有存", effects: [{ k: "body", v: -6 }, { k: "grain", v: -4 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -10 }], loseNote: "山里冷，孩子病了一场。" }, then: "你在山里的破窑住了四十天。回来时，村里少了一半人。" }
      ]
    },
    {
      id: "c4.plague.doctor", cat: "身体", title: "药", age: [10, 70], weight: 13,
      text: [
        "你烧了五天，退不下去。",
        "镇上有个郎中，一副药三百文。他说：「这病，十个人里活三个。」",
        "家里还有一两银子。"
      ],
      options: [
        { text: "抓药", need: { minSilver: 1 }, hint: "银钱 −1；身体 +6", effects: [{ k: "silver", v: -1 }, { k: "body", v: 6 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -8 }], loseNote: "药吃完了，热还是没退。第七天，你自己退了。" }, then: "药是苦的，煎出来一碗黑水。喝下去，第二天出了一身汗。" },
        { text: "不抓药，硬扛", hint: "身体 −10", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.14, cause: "病" }, then: "你躺在床上，渴了就喝凉水。躺了十二天。" },
        { text: "请巫", hint: "银钱 −0.5；身体 −4；声望 +2", effects: [{ k: "silver", v: -0.5 }, { k: "body", v: -4 }, { k: "fame", v: 2 }], then: "巫在你床前跳了一夜，撒了米，烧了符。第二天，热退了一点。" }
      ]
    },
    {
      id: "c4.plague.well", cat: "乡里", title: "井", age: [14, 70], weight: 12,
      text: [
        "村里的井，水开始发臭。",
        "有人说，是上游埋了死人。",
        "全村四十多户，只有这一口井。"
      ],
      options: [
        { text: "淘井", hint: "身体 −8；声望 +8", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }], gamble: { deathChance: 0.06, cause: "疫" }, then: "你和五个人下到井底，把淤泥一桶一桶往上吊。井底有一只死猫，还有一只鞋。" },
        { text: "去河里挑水", hint: "身体 −5；粮 −2", effects: [{ k: "body", v: -5 }, { k: "grain", v: -2 }], then: "河在三里外。一天挑四趟，肩膀磨破了。" },
        { text: "照旧喝", hint: "或有疫", effects: [], gamble: { deathChance: 0.12, cause: "疫" }, then: "你照旧喝。水有一点味，煮开了就没了。" }
      ]
    },
    {
      id: "c4.plague.dead", cat: "家族", title: "收殓", age: [12, 70], weight: 14,
      text: [
        "家里死了一个。",
        "棺木要二两银子，请人抬棺要五百文。",
        "里正说：「疫死的人，三日之内必须出村。」"
      ],
      options: [
        { text: "买棺好好葬", need: { minSilver: 3 }, hint: "银钱 −3；声望 +5", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 5 }], then: "你买了一副薄棺，葬在村后的坡上。坟头立了一块木牌，写了名字。" },
        { text: "用草席裹了埋", hint: "银钱 −0.3；声望 −2", effects: [{ k: "silver", v: -0.3 }, { k: "fame", v: -2 }], then: "你用草席裹了，扛到乱葬岗。挖坑的时候，挖到了别人的骨头。" },
        { text: "交给官府的义冢", hint: "省银；尸骨无存", effects: [{ k: "fame", v: -3 }], then: "义冢在城西，坑是大坑，一层一层地放。你没去看。" }
      ]
    },
    {
      id: "c4.plague.lock", cat: "官府", title: "封锁", age: [14, 70], weight: 12,
      text: [
        "县里封了村。四门设卡，出入要验。",
        "封了二十天，村里的粮吃完了。",
        "有人翻墙出去，被抓回来，绑在村口示众。"
      ],
      options: [
        { text: "守着", hint: "粮 −10；身体 −6", effects: [{ k: "grain", v: -10 }, { k: "body", v: -6 }], then: "你家最后十石粮，吃了二十天。每天两顿改一顿。" },
        { text: "翻墙出去", hint: "或有捕获", effects: [{ k: "grain", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -6 }], loseNote: "被卡上的人抓住，绑在村口晒了一天，还罚了钱。" }, then: "你半夜翻墙出去，到邻村换了四斗米，天亮前回来。" },
        { text: "贿赂守卡的", need: { minSilver: 2 }, hint: "银钱 −2；来去自如", effects: [{ k: "silver", v: -2 }, { k: "grain", v: 3 }], then: "你给守卡的差役二百文。他收了钱，把栅栏挪开一条缝。" }
      ]
    },
    {
      id: "c4.plague.survive", cat: "身体", title: "活下来", age: [8, 70], weight: 10,
      text: [
        "疫过去了。",
        "村里原来四十三户，现在二十九户。",
        "你在村口站了半天，看见的都是熟面孔，只是少了很多。"
      ],
      options: [
        { text: "把没人种的地接下来", hint: "田 +8；声望 −3", effects: [{ k: "field_wet", v: 8 }, { k: "fame", v: -3 }], then: "你接了四户的田。契是里正写的，写着「无主，暂佃」。暂了十二年，也没人来要。" },
        { text: "把孤儿领回家", hint: "粮 −6；声望 +10", effects: [{ k: "grain", v: -6 }, { k: "fame", v: 10 }, { k: "favor", v: 8 }], then: "你领了两个，一个八岁，一个五岁。他们不怎么说话，吃饭很快。" },
        { text: "什么也不做", hint: "无得无失", effects: [], then: "你回屋，把门关上。那年秋天，村里的田荒了一半。" }
      ]
    },
    {
      id: "c4.plague.quarantine", cat: "家族", title: "分房", age: [16, 60], weight: 12,
      text: [
        "你的儿子发热了。",
        "按村里的规矩，疫者移出正屋，另住一处。",
        "他十二岁，烧得说胡话。"
      ],
      options: [
        { text: "把他移出去", hint: "身体 −2；或有失", effects: [{ k: "body", v: -2 }, { k: "favor", v: -6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "favor", v: -12 }], loseNote: "他一个人死在柴房里。第二天早上，身子已经凉了。" }, then: "你把他抱到柴房，铺了草，留了一盏灯。每天送两次饭，放在门口。" },
        { text: "留在正屋，自己照顾", hint: "身体 −8；或有染", effects: [{ k: "body", v: -8 }, { k: "favor", v: 10 }], gamble: { deathChance: 0.1, cause: "疫" }, then: "你守了他七天。第七天夜里，他的热退了。你摸着他的额头，坐了一夜。" },
        { text: "去请郎中，不管钱", need: { minSilver: 3 }, hint: "银钱 −3；身体 −4", effects: [{ k: "silver", v: -3 }, { k: "body", v: -4 }, { k: "favor", v: 8 }], then: "郎中来了，看了舌苔，开了三副药。他说：「这孩子的命，看今晚。」" }
      ]
    },
    {
      id: "c4.plague.cattle", cat: "天灾", title: "牛瘟", age: [12, 70], weight: 11,
      text: [
        "牛先病。先是那头老黄牛不吃草，第二天，邻家的牛也倒了。",
        "一村十七头牛，十天内死了十一头。",
        "没有牛，开春的田怎么翻。"
      ],
      options: [
        { text: "把死牛埋了", hint: "身体 −4；银钱 −2", effects: [{ k: "body", v: -4 }, { k: "silver", v: -2 }], then: "你挖了个深坑，把牛埋了。埋的时候，你摸了它的角。" },
        { text: "剥皮卖肉", hint: "银钱 +3；声望 −6", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -8 }], loseNote: "买肉的人吃了也病。找上门来，砸了锅。" }, then: "你把牛皮剥了，肉分给村里人。有人说：「这肉吃着不对味。」" },
        { text: "和人合牛", hint: "银钱 −4；田保住", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 6 }], then: "你和邻家合买了一头牛，轮流用。开春翻地，两家排着来。" }
      ]
    },
    {
      id: "c4.plague.smallpox", cat: "身体", title: "痘", age: [1, 10], weight: 13,
      text: [
        "村里出了痘。先是两个孩子，后来是一片。",
        "出过痘的人不会再出。没出过的，都在等。",
        "你身上开始起红点。"
      ],
      options: [
        { text: "熬着", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.2, cause: "痘" }, then: "你烧了九天。第九天，痘出了，一身都是。你活下来了，脸上留了麻点。" },
        { text: "请人挑痘", hint: "银钱 −1；身体 −6", effects: [{ k: "silver", v: -1 }, { k: "body", v: -6 }], gamble: { deathChance: 0.08, cause: "痘" }, then: "来人用针在你臂上挑了一下，取的是别人的痘浆。你烧了三天，出了一层轻痘。" },
        { text: "家里人把你隔开", hint: "身体 −10；或有失", effects: [{ k: "body", v: -10 }, { k: "favor", v: -6 }], then: "你被放在柴房里，一天两次饭。你听见外面有人在哭，不知道是谁。" }
      ]
    },
    {
      id: "c4.plague.rumor", cat: "乡里", title: "谣言", age: [14, 70], weight: 11,
      text: [
        "有人说，这场疫是有人在井里下了药。",
        "村西的刘家，是外来户，最容易被指。",
        "有人已经围到他家门口了。"
      ],
      options: [
        { text: "跟着去", hint: "声望 +2；良心不安", effects: [{ k: "fame", v: 2 }, { k: "grudge", v: 5 }], then: "你站在人群后面。刘家的门被砸开了，他被拖出来打了一顿。" },
        { text: "去劝散", hint: "声望 +6；或有伤", effects: [{ k: "fame", v: 6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }], loseNote: "有人回身推了你一把，你被撞在地上，挨了两脚。" }, then: "你站在门口，说：「他家的孩子也死了两个。」人群静了一会儿，散了。" },
        { text: "去给刘家报信", hint: "声望 −4；或有报", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 8 }], schedule: [{ inYears: 2, effects: [{ k: "grain", v: 6 }], note: "刘家搬走前，把两亩地托给你种。" }], then: "你半夜绕到后墙，敲了三下。他们连夜走了。" }
      ]
    },

    /* ══════════ 乱 ══════════ */
    {
      id: "c4.war.soldiers", cat: "世变", title: "过兵", age: [12, 70], weight: 16,
      text: [
        "兵过境。一支队伍，从早上走到天黑。",
        "他们要吃，要水，要柴，要女人。",
        "带队的人说：「我们是官军。」"
      ],
      options: [
        { text: "把粮交出去", hint: "粮 −10；保住人", effects: [{ k: "grain", v: -10 }], then: "兵丁把粮装走。有个年轻的兵，临走塞给你半块饼。" },
        { text: "举家躲进地窖", hint: "粮 −4；或有搜", effects: [{ k: "grain", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], loseNote: "兵丁在地窖口坐了下来，听见了底下的动静。" }, then: "你们七口人在地窖里蹲了两天，孩子哭，就用布堵住嘴。" },
        { text: "去给兵丁挑水", hint: "身体 −6；银钱 +2", effects: [{ k: "body", v: -6 }, { k: "silver", v: 2 }], then: "你挑了一天水。都头给了你二十文，说：「你这人还算识相。」" }
      ]
    },
    {
      id: "c4.war.deserter", cat: "世变", title: "逃兵", age: [14, 70], weight: 13,
      text: [
        "村里来了三个逃兵。他们脱了甲，坐在土地庙里。",
        "其中一个腿上中了箭，箭杆还插着。",
        "他说：「给我们一口吃的，我们明天就走。」"
      ],
      options: [
        { text: "给他们吃的", hint: "粮 −4；声望 +5；或有祸", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 5 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "追兵到了。村里被搜了一遍，你被打了二十鞭。" }, then: "你给了他们两天的干粮。第二天早上，土地庙里空了，地上有一摊血。" },
        { text: "报给里正", hint: "声望 −6；银钱 +2", effects: [{ k: "fame", v: -6 }, { k: "silver", v: 2 }], then: "里正带了人来。三个人被绑走，那个中箭的，走不动，被拖着走。" },
        { text: "赶他们走", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "你拿着扁担站在庙门口。他们看了看，互相扶着走了。" }
      ]
    },
    {
      id: "c4.war.bandit", cat: "世变", title: "盗", age: [14, 70], weight: 15,
      text: [
        "夜里，十几个人进了村。",
        "他们有刀，有火把。先把村口的两户点了。",
        "有人在喊：「粮拿出来，人不杀。」"
      ],
      options: [
        { text: "把粮拿出来", hint: "粮 −12；保住命", effects: [{ k: "grain", v: -12 }], then: "你把粮搬出去。他们装了两车。走时把一根火把扔在草堆上，你扑了半夜才灭。" },
        { text: "躲在柴堆后", hint: "粮 −6；或有死", effects: [{ k: "grain", v: -6 }], gamble: { deathChance: 0.1, cause: "盗" }, then: "你趴在柴堆后面。火光照过来两次，都没照到你。" },
        { text: "拿锄头和他们拼", hint: "身体 −12；声望 +10", effects: [{ k: "body", v: -12 }, { k: "fame", v: 10 }], gamble: { deathChance: 0.16, cause: "盗" }, then: "你打倒了第一个。第二个从侧面砍来，你躲开了，刀削掉了半个耳朵。" }
      ]
    },
    {
      id: "c4.war.refugee", cat: "世变", title: "流民", age: [14, 70], weight: 14,
      text: [
        "村口来了一群流民，四十多个，都是北边过来的。",
        "他们身上没有粮，只有锅和被子。",
        "里正说：「不许进村。进了，就赶不走了。」"
      ],
      options: [
        { text: "给他们一锅粥", hint: "粮 −5；声望 +8", effects: [{ k: "grain", v: -5 }, { k: "fame", v: 8 }], then: "你在村口支了一口锅，煮了三锅粥。四十个人，一人半碗。" },
        { text: "跟着里正赶人", hint: "声望 −6", effects: [{ k: "fame", v: -6 }], then: "你们拿着棍子把人往南赶。有个女人抱着孩子跑慢了，被推倒在水沟里。" },
        { text: "留下两个做长工", hint: "银钱 −2；田 +2", effects: [{ k: "silver", v: -2 }, { k: "field_wet", v: 2 }, { k: "favor", v: 4 }], then: "你留了一对兄弟，管饭不给工钱。他们种地很卖力，从来不说话。" }
      ]
    },
    {
      id: "c4.war.siege", cat: "世变", title: "围城", age: [10, 70], weight: 13,
      text: [
        "城被围了。",
        "先是吃马，然后吃树皮，再然后，街上有人卖肉，不说是什麼肉。",
        "城墙上一天要死二十个人。"
      ],
      options: [
        { text: "守着自家", hint: "身体 −14；粮 −14", effects: [{ k: "body", v: -14 }, { k: "grain", v: -14 }], gamble: { deathChance: 0.18, cause: "围城" }, then: "你把门窗都钉死。第七十天，城开了。" },
        { text: "应募上城", hint: "身体 −12；声望 +10", effects: [{ k: "body", v: -12 }, { k: "fame", v: 10 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.22, cause: "守城" }, then: "你被编到西城墙。守了四十三天，箭射完了就用石头。" },
        { text: "想办法出城", hint: "身体 −10；或有死", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.2, cause: "出城" }, then: "你从水门出去，夜里，顺着一根绳子下到护城河。" }
      ]
    },
    {
      id: "c4.war.conscript", cat: "军旅", title: "拉夫", age: [15, 55], weight: 16, sex: "male",
      text: [
        "路上来了一队人，见男丁就抓。",
        "你被抓住了。他们给你一根绳子，让你背粮。",
        "同行的一个说：「背到营里，就放你走。」"
      ],
      options: [
        { text: "跟着走", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.12, cause: "拉夫" }, then: "你背了六天的粮。到营里，他们说：「再背一趟。」" },
        { text: "半路逃走", hint: "身体 −8；或有捕", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -4 }], loseNote: "被抓回来，打了三十棍，还是得背。" }, then: "你在夜里钻进高粱地。趴了一夜，天亮时听见有人喊你的名字。" },
        { text: "说自己会写字，求做文书", need: { minKnowledge: 25 }, hint: "学识 +2；身体 −4", effects: [{ k: "knowledge", v: 2 }, { k: "body", v: -4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }], loseNote: "队里已经有两个文书。你还是被派去背粮。" }, then: "你在地上写了两个字。队里的小校看了，说：「跟我来。」" }
      ]
    },
    {
      id: "c4.war.village", cat: "世变", title: "屠", age: [12, 70], weight: 8,
      text: [
        "来的人不是官军，也不是盗。",
        "他们从早上杀到中午。村口的水沟里流的是红的。",
        "你趴在一堆谷草下面。"
      ],
      options: [
        { text: "一动不动", hint: "身体 −10；或有死", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.22, cause: "兵祸" }, then: "你在谷草下趴了一天一夜。有人从你背上踩过去两次。" },
        { text: "趁乱往山里跑", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.18, cause: "兵祸" }, then: "你跑出去三十步，听见后面有人喊。你没回头，一直跑到山里。" },
        { text: "抱着孩子躲进井里", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.12, cause: "溺" }, then: "你抱着孩子下到井里，水到胸口。孩子在怀里发抖，你捂住他的嘴。" }
      ]
    },
    {
      id: "c4.war.bones", cat: "乡里", title: "收骨", age: [14, 70], weight: 12,
      text: [
        "兵走了。村里剩下十七个人。",
        "地里、路上、井里，都是尸首。",
        "里正说：「不埋，明年要发疫。」"
      ],
      options: [
        { text: "去埋", hint: "身体 −10；声望 +10", effects: [{ k: "body", v: -10 }, { k: "fame", v: 10 }], gamble: { deathChance: 0.08, cause: "疫" }, then: "你埋了三十七个人。挖坑的时候，把认识的和不认识的，分了两片。" },
        { text: "只埋自家人", hint: "身体 −4；声望 −2", effects: [{ k: "body", v: -4 }, { k: "fame", v: -2 }], then: "你只埋了自己的。剩下的，官府后来派了人来，挖了个大坑。" },
        { text: "离开这个村子", hint: "身体 −6；田弃", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: -6 }], then: "你收拾了两件衣服，往南走。走的时候，没有回头看。" }
      ]
    },
    {
      id: "c4.war.weapon", cat: "乡里", title: "刀", age: [16, 60], weight: 12,
      text: [
        "路边有一把刀，是兵丢的。",
        "刀不长，一只半，刃上有缺口，还有没擦干净的东西。",
        "你把它捡起来了。"
      ],
      options: [
        { text: "带回家藏着", hint: "martial +6；或有祸", effects: [{ k: "martial", v: 6 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -4 }], loseNote: "被人告了私藏兵器。刀被收走，你被打了二十板。" }, then: "你把刀用布裹了，藏在房梁上。夜里睡不着的时候，你会上去摸一摸。" },
        { text: "卖了", hint: "银钱 +2", effects: [{ k: "silver", v: 2 }], then: "你把刀卖给镇上的铁匠，二百文。他把刀扔进炉子里，化了。" },
        { text: "扔掉", hint: "无得无失", effects: [], then: "你把刀扔进了河里。看着它沉下去，你站了一会儿。" }
      ]
    },
    {
      id: "c4.war.leader", cat: "世变", title: "有人立寨", age: [18, 60], weight: 12,
      text: [
        "邻县有个人聚了三千人，占了山，立了寨。",
        "他贴出告示：来投的，给田、给粮、给刀。",
        "村里已经去了十几个。"
      ],
      options: [
        { text: "去投", hint: "身体 −6；银钱 +5；从此是贼", effects: [{ k: "body", v: -6 }, { k: "silver", v: 5 }, { k: "troops", v: 5 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.12, cause: "战阵" }, then: "你上了山。寨里有三千多人，一半是流民，一半是逃兵。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。后来听说，那个寨子被官军破了，三千人剩了八百。" },
        { text: "给寨里送粮，换个照应", hint: "粮 −6；或有庇", effects: [{ k: "grain", v: -6 }, { k: "luck", v: 4 }], then: "你送了两车粮上山。寨主说：「你这村，我不动。」" }
      ]
    },
    {
      id: "c4.war.horse", cat: "世变", title: "马", age: [14, 70], weight: 11,
      text: [
        "一匹军马倒在村口的沟里，后腿断了。",
        "马上有鞍，鞍下有袋，袋里有干粮和一块银牌。",
        "它还在喘气。"
      ],
      options: [
        { text: "杀了分肉", hint: "粮 +6；或有祸", effects: [{ k: "grain", v: 6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], loseNote: "马主找来了。村里被打了一顿，肉都吐了出来。" }, then: "你和三家人分了这匹马。马肉很硬，煮了一夜。" },
        { text: "把银牌和鞍藏了，马放走", hint: "银钱 +4；或有查", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -10 }], loseNote: "马走回了营里。营里的人顺着马找来了。" }, then: "你把银牌塞进怀里，把马牵到路口，抽了一鞭。它一瘸一拐地走了。" },
        { text: "守着，等主人来", hint: "声望 +4；或有赏", effects: [{ k: "fame", v: 4 }, { k: "silver", v: 2 }], then: "你在沟边守了两天。第三天，来了三个骑兵。他们给了你一斗盐。" }
      ]
    },
    {
      id: "c4.war.aftermath", cat: "家族", title: "少了谁", age: [12, 70], weight: 12,
      text: [
        "乱过去了。",
        "你数了数家里的人。少了一个。",
        "你不记得最后一次见他是什么时候。"
      ],
      options: [
        { text: "去找", hint: "身体 −8；或有消息", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.35, win: [{ k: "favor", v: 10 }], lose: [{ k: "body", v: -6 }], loseNote: "找了三个月，问了几十个人，没有消息。" }, then: "你往北找了三个县。在第三个县的难民营里，有人记得见过一个像他的人。" },
        { text: "立个牌位", hint: "银钱 −1；声望 +3", effects: [{ k: "silver", v: -1 }, { k: "fame", v: 3 }], then: "你在堂屋立了个牌位，写着名字，没有写生卒。每年清明，上一炷香。" },
        { text: "不再提", hint: "身体 −2", effects: [{ k: "body", v: -2 }], then: "家里从此不再提这个名字。吃饭的时候，那个位置空着，也没有人坐。" }
      ]
    },
    {
      id: "c4.war.tax", cat: "赋役", title: "军饷", age: [20, 65], weight: 13,
      text: [
        "打仗要钱。县里派下军饷，按亩摊。",
        "一亩摊二百文。你家十七亩。",
        "里正说：「这是借。日后朝廷会还。」"
      ],
      options: [
        { text: "缴", hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你缴了三贯四百文。借据是一张黄纸，写着「俟库帑稍充，即行给还」。" },
        { text: "缴一半，说家里没有", hint: "银钱 −2；或有催", effects: [{ k: "silver", v: -2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "差役来了，把家里的锅端走了。" }, then: "你缴了一半。里正记了一笔，说：「剩下的，年底再说。」" },
        { text: "把田报少三亩", hint: "银钱 +2；或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -6 }], loseNote: "军饷是按旧籍摊的，瞒不过。加倍追缴。" }, then: "你报了十四亩。里正翻了翻旧册，看了看你，没说话。" }
      ]
    }
  );
})({});
