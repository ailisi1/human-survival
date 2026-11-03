/* 生在何朝 · 各朝灾祸 卷二：五代、辽、北宋、西夏、金、南宋、元、明、清
 * 后半段的灾，多半是连着兵一起来的：先围城，后断粮，再发疫。
 * 这一卷就按这个次序写：城破了以后，人是饿死的、病死的，还是被杀死的，往往分不清。
 * 前缀 wd7. / l7. / b7. / xx7. / j7. / n7. / y7. / m7. / qi7.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 五代 ══════════ */
  B.eraEvents.wudai = (B.eraEvents.wudai || []).concat([

    {
      id: "wd7.huanghe", cat: "天灾", title: "河决", age: [14, 60], weight: 15,
      years: [930, 960],
      text: [
        "黄河又决了。这一次在滑州。",
        "五代五十三年，河决了十九次。堵了又决，决了又堵。",
        "县里不堵了，只让人往高处搬。"
      ],
      options: [
        { text: "搬上高坡", hint: "身体 −8；田 −8", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -8 }], then: "你在坡上搭了棚。第二年水退了，田里一层沙，挑了一年才挑完。" },
        { text: "在水里捞东西", hint: "银钱 +3；或有溺", effects: [{ k: "silver", v: 3 }], gamble: { deathChance: 0.1, cause: "溺" }, then: "水冲下来的有木料、有家具、有死人。你捞了三根梁，卖了八百文。" },
        { text: "去堵口，官府管饭", hint: "身体 −12；粮 +5", effects: [{ k: "body", v: -12 }, { k: "grain", v: 5 }], then: "你背了二十天的土。口子堵上那天，有人在堤上放了一串鞭炮。" }
      ]
    },
    {
      id: "wd7.qidan", cat: "世变", title: "契丹入汴", age: [14, 65], weight: 15, once: true,
      years: [946, 947],
      text: [
        "{{契丹入汴|947 年辽太宗耶律德光破汴梁，后晋亡}}。",
        "汴梁的城门开了。契丹兵进城，说要「打草谷」——就是抢。",
        "四野的村子，被搜了三天。"
      ],
      options: [
        { text: "把粮埋起来，人躲出去", hint: "粮 −4；或有搜", effects: [{ k: "grain", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], loseNote: "埋粮的地方被马蹄踩塌了。兵挖出来，还打断了你一条腿。" }, then: "你把粮埋在坟地里，一家人躲到十里外的亲戚家。回来时，屋空了，粮还在。" },
        { text: "献粮求安", hint: "粮 −12；保命", effects: [{ k: "grain", v: -12 }], then: "你把所有粮都搬出去，摆在院门口。带队的看了一眼，说：「这家人识相。」" },
        { text: "拿刀反抗", hint: "身体 −14；声望 +8", effects: [{ k: "body", v: -14 }, { k: "fame", v: 8 }], gamble: { deathChance: 0.2, cause: "兵祸" }, then: "你用铡刀砍了一个。第二个从背后刺来，你转身的时候晚了一步。" }
      ]
    }
  ]);

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = (B.eraEvents.liao || []).concat([

    {
      id: "l7.dahan", cat: "天灾", title: "大寒", age: [10, 60], weight: 14,
      years: [1000, 1125],
      text: [
        "那年冬天，雪下了一丈。",
        "部落的羊冻死了一半，马死了三分之一。",
        "族里说：「往南走，走到有草的地方。」"
      ],
      options: [
        { text: "跟着南迁", hint: "身体 −10；牲畜尽失", effects: [{ k: "body", v: -10 }, { k: "silver", v: -5 }], then: "你们赶着剩下的牲口往南走。走了十二天，雪停了，草露出来了。" },
        { text: "留下，把牲口宰了吃过冬", hint: "粮 +10；日后无畜", effects: [{ k: "grain", v: 10 }, { k: "silver", v: -6 }], schedule: [{ inYears: 1, effects: [{ k: "silver", v: -6 }], note: "开春没有牲口，地种不上。" }], then: "你宰了十七只羊、三匹马。肉埋在雪里，吃了整个冬天。" },
        { text: "去汉人的村子换粮", hint: "银钱 −4；粮 +6", effects: [{ k: "silver", v: -4 }, { k: "grain", v: 6 }], then: "你拿两张羊皮换了一斗粟。汉人的村子也在挨饿，价要得很高。" }
      ]
    },
    {
      id: "l7.nvzhen", cat: "世变", title: "女真起", age: [16, 60], weight: 15, once: true,
      years: [1114, 1125],
      text: [
        "{{完颜阿骨打起兵|1114 年起兵反辽，十年而辽亡}}。",
        "朝廷点兵，一次点了十万。",
        "部落里能上马的男人，都走了。"
      ],
      options: [
        { text: "应征", hint: "身体 −10；或有功", effects: [{ k: "body", v: -10 }, { k: "martial", v: 6 }], gamble: { deathChance: 0.2, cause: "战阵" }, then: "你跟着去了。第一仗在出河店，回来的人不到一半。" },
        { text: "把马献给军中，免了本人", hint: "银钱 −5；免役", effects: [{ k: "silver", v: -5 }], then: "你献了一匹好马。点兵的官说：「马留下，人回去。」" },
        { text: "带着家人往西走", hint: "身体 −10；家产尽弃", effects: [{ k: "body", v: -10 }, { k: "silver", v: -6 }], then: "你往西走，走到西夏边上。那里的人说的话，你听不懂。" }
      ]
    }
  ]);

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = (B.eraEvents.bsong || []).concat([

    {
      id: "b7.jingkang", cat: "世变", title: "靖康", age: [12, 65], weight: 19, once: true,
      years: [1126, 1127],
      text: [
        "{{靖康之难|1126 年金兵围汴京，次年城破，徽钦二帝北掳}}。",
        "城围了两个月。城里的粮吃完了，先吃马，后吃树皮，再后来，一斗米要十贯。",
        "城破那天，雪下得很大。"
      ],
      options: [
        { text: "在城里熬到城破", hint: "身体 −14；粮 −12", effects: [{ k: "body", v: -14 }, { k: "grain", v: -12 }], gamble: { deathChance: 0.2, cause: "围城" }, then: "你在城里熬了六十天。城破那日，你躲在米铺的地窖里，听见上面有人在搬东西。" },
        { text: "趁夜从水门出去", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.2, cause: "兵祸" }, then: "你从水门出去，顺着护城河游了半里。河面结着薄冰。" },
        { text: "把女儿藏进寺院", hint: "声望 −3；或保住", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 4 }], then: "你把女儿送到城西的尼寺，剃了头。她那年十四。" }
      ]
    },
    {
      id: "b7.hanhuang", cat: "天灾", title: "旱蝗", age: [10, 65], weight: 14,
      years: [1070, 1080],
      text: [
        "熙宁年间，旱了三年，蝗跟着来。",
        "新法正在行。免役钱、青苗钱，一样也不减。",
        "县里的告示说：「灾伤须验，验后蠲免。」"
      ],
      options: [
        { text: "报灾，等着验", hint: "身体 −6；或有蠲", effects: [{ k: "body", v: -6 }], gamble: { winChance: 0.4, win: [{ k: "silver", v: 4 }], lose: [{ k: "silver", v: -5 }], loseNote: "验灾的官说：「田里还有苗，不成灾。」钱照缴。" }, then: "你报了灾。等了两个月，验灾的官来了，在地头站了一炷香。" },
        { text: "借钱先缴上", hint: "银钱 +4；欠债", effects: [{ k: "silver", v: 4 }, { k: "debt", v: { amt: 15, rate: 0.03, dueYear: 1 } }], then: "你借了钱缴了免役钱。借据上写着三分利，一年为期。" },
        { text: "把田典了，去做佣工", hint: "田 −8；银钱 +6", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: 6 }], then: "你把八亩田典给了邻村的地主，自己去给他做长工。一年三贯，管饭。" }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx7.hanhuang", cat: "天灾", title: "旱", age: [10, 65], weight: 14,
      years: [1100, 1227],
      text: [
        "三年没下透雨。河渠的水，只够浇上游。",
        "下游的地，裂成了龟背。",
        "官府说：「渠水按亩分，先军后民。」"
      ],
      options: [
        { text: "夜里去上游偷水", hint: "粮 +4；或有争", effects: [{ k: "grain", v: 4 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "被巡渠的军士抓住。打了二十鞭，还罚了粮。" }, then: "你半夜挖开水口，浇了半亩。天亮前把口子堵回去。" },
        { text: "把地荒着，去做工", hint: "银钱 +3；田 −4", effects: [{ k: "silver", v: 3 }, { k: "field_wet", v: -4 }], then: "你去给渠上的军官做工，一天两升米。地荒了两年，长满了骆驼刺。" },
        { text: "举家迁到河边", hint: "身体 −6；田 +4", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: 4 }], then: "你在河边搭了个棚，开了四亩滩地。水是够的，但一场大水就能冲走。" }
      ]
    },
    {
      id: "xx7.pocheng", cat: "世变", title: "城破", age: [12, 65], weight: 17, once: true,
      years: [1226, 1227],
      text: [
        "{{西夏之亡|1227 年蒙古灭夏，中兴府围半年，城破}}。",
        "城围了半年。城里的粮吃完了，人吃人。",
        "守城的兵，一天比一天少。"
      ],
      options: [
        { text: "守到最后", hint: "身体 −16；或有死", effects: [{ k: "body", v: -16 }], gamble: { deathChance: 0.3, cause: "城破" }, then: "你守到城破那天。城墙上最后站着七个人，你是第六个。" },
        { text: "开城前一夜逃走", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.22, cause: "兵祸" }, then: "你从城墙的排水口爬出去。爬出去的时候，听见城里有人在唱一支歌。" },
        { text: "把家里的粮交出去，求活", hint: "粮 −14；保命", effects: [{ k: "grain", v: -14 }], then: "你把最后两斗粮交给守军。他们收了，给了你一张「守城有功」的条子。" }
      ]
    }
  ]);

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = (B.eraEvents.jin || []).concat([

    {
      id: "j7.bianyi", cat: "天灾", title: "汴京大疫", age: [8, 65], weight: 17, once: true,
      years: [1232, 1233],
      text: [
        "{{汴京大疫|1232 年汴京围城后大疫，五十日内死者九十余万}}。",
        "城围了几个月，解围之后，疫气起来了。",
        "一天死两千人。城门抬出去的棺，排到看不见头。"
      ],
      options: [
        { text: "闭门不出", hint: "粮 −10；身体 −4", effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }], gamble: { deathChance: 0.16, cause: "疫" }, then: "你把门堵死。五十天后开门，巷子里没人了。" },
        { text: "出城逃", hint: "身体 −12；或有染", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.2, cause: "疫" }, then: "你出了城，往南走。城外也是一样，路边躺着的人还没凉。" },
        { text: "去帮着埋尸", hint: "身体 −12；声望 +10", effects: [{ k: "body", v: -12 }, { k: "fame", v: 10 }], gamble: { deathChance: 0.2, cause: "疫" }, then: "你和二十几个人挖了七个大坑。坑挖得不够深，狗夜里会来刨。" }
      ]
    },
    {
      id: "j7.yehuling", cat: "世变", title: "野狐岭", age: [16, 50], weight: 15, once: true, sex: "male",
      years: [1211, 1213],
      text: [
        "{{野狐岭之战|1211 年蒙古破金军主力，金自此不能复振}}。",
        "四十万大军，在野狐岭崩了。",
        "逃回来的兵说：「不是打不过，是没人指挥。」"
      ],
      options: [
        { text: "应征补军", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.26, cause: "战阵" }, then: "你被补进溃军里，重新编了队。发了刀，也发了绳子——绳子是让逃兵自己捆的。" },
        { text: "举家往南逃", hint: "身体 −10；田弃", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: -6 }], then: "你往南走。走的都是往南走的人，田扔了，房子点了。" },
        { text: "留在本地，看风向", hint: "粮 −8；或有掠", effects: [{ k: "grain", v: -8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -6 }], loseNote: "蒙古兵来了，村里被搜了两遍。你被打断了三根肋骨。" }, then: "你留了下来。村里人走了一半，剩下的都在等。" }
      ]
    }
  ]);

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = (B.eraEvents.nsong || []).concat([

    {
      id: "n7.xiangyang", cat: "世变", title: "襄阳", age: [12, 65], weight: 18, once: true,
      years: [1268, 1273],
      text: [
        "{{襄阳围城|1268–1273 年元军围襄阳五年，城破}}。",
        "围了五年。城里的粮，靠汉水上的浮桥运；后来浮桥被烧了。",
        "第五年，城里开始吃人。"
      ],
      options: [
        { text: "守在城里", hint: "身体 −16；粮 −16", effects: [{ k: "body", v: -16 }, { k: "grain", v: -16 }], gamble: { deathChance: 0.26, cause: "围城" }, then: "你守了五年。第一年还有米，第三年吃糠，第五年，什么都吃。" },
        { text: "从水路突围", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.22, cause: "突围" }, then: "你们一百多条船，夜里顺流而下。天亮时，只剩十一条。" },
        { text: "投降，出城为民", hint: "声望 −10；保命", effects: [{ k: "fame", v: -10 }], then: "你出了城。元军没有杀民，只是把青壮挑出来，编进了军。" }
      ]
    },
    {
      id: "n7.linan", cat: "世变", title: "临安", age: [14, 65], weight: 15, once: true,
      years: [1276, 1279],
      text: [
        "{{临安降元|1276 年元军入临安，南宋朝廷降}}。",
        "城门开了，没有打。",
        "街上很安静。有人说：「这样也好。」"
      ],
      options: [
        { text: "留在城里，照旧过日子", hint: "无得无失", effects: [], then: "你留了下来。换了旗，换了官，市上的米价没变。" },
        { text: "跟着朝廷往南走", hint: "身体 −12；银钱 −6", effects: [{ k: "body", v: -12 }, { k: "silver", v: -6 }], gamble: { deathChance: 0.14, cause: "兵祸" }, then: "你跟着往南走，走到海上。船上挤了三百多人，吃的是生米。" },
        { text: "回乡种田，不问世事", hint: "田 +4；声望 −3", effects: [{ k: "field_wet", v: 4 }, { k: "fame", v: -3 }], then: "你回了乡。田荒了几年，你重新开出来。此后再没进过城。" }
      ]
    }
  ]);

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = (B.eraEvents.yuan || []).concat([

    {
      id: "y7.dadu", cat: "天灾", title: "大都疫", age: [8, 65], weight: 16, once: true,
      years: [1358, 1362],
      text: [
        "{{至正大疫|1358 年前后，南北大疫，河北死者相枕}}。",
        "大都城里，一天抬出去八九百。",
        "城门外的义冢，坑挖了又挖，挖到后来，土都是黑的。"
      ],
      options: [
        { text: "闭门不出", hint: "粮 −10；身体 −4", effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }], gamble: { deathChance: 0.14, cause: "疫" }, then: "你把门窗糊死，用艾草熏。三个月后开门，街上的人少了一半。" },
        { text: "往乡下躲", hint: "身体 −8；粮 −6", effects: [{ k: "body", v: -8 }, { k: "grain", v: -6 }], gamble: { deathChance: 0.1, cause: "疫" }, then: "你去了乡下的亲戚家。乡下也在死人，只是死得慢些。" },
        { text: "留在城里做工，工钱涨了", hint: "银钱 +6；或有染", effects: [{ k: "silver", v: 6 }], gamble: { deathChance: 0.2, cause: "疫" }, then: "抬棺的工钱涨到一天二百文。你抬了四十天。" }
      ]
    },
    {
      id: "y7.hongjin", cat: "世变", title: "红巾", age: [16, 60], weight: 16, once: true,
      years: [1351, 1368],
      text: [
        "{{红巾军起|1351 年韩山童、刘福通起事，天下大乱}}。",
        "头上裹红布的兵，从南边来。",
        "他们说要「复宋」。村里没人知道宋是什么样子。"
      ],
      options: [
        { text: "跟着走", hint: "身体 −8；银钱 +5；从此是乱军", effects: [{ k: "body", v: -8 }, { k: "silver", v: 5 }, { k: "troops", v: 5 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.18, cause: "战阵" }, then: "你裹了红布，跟着走了。队伍里有一半人连刀都没有，拿的是锄头。" },
        { text: "结寨自守", hint: "身体 −10；声望 +8", effects: [{ k: "body", v: -10 }, { k: "fame", v: 8 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.16, cause: "兵祸" }, then: "你在山上筑了寨，聚了三百多户。寨墙是土夯的，夜里有人轮值。" },
        { text: "往北逃", hint: "身体 −12；银钱 −5", effects: [{ k: "body", v: -12 }, { k: "silver", v: -5 }], then: "你往北走。北边也在打。走了半个月，你又往回走。" }
      ]
    }
  ]);

  /* ══════════ 明 ══════════ */
  B.eraEvents.ming = (B.eraEvents.ming || []).concat([

    {
      id: "m7.chongzhen", cat: "天灾", title: "崇祯大旱", age: [10, 65], weight: 18, once: true,
      years: [1628, 1644],
      text: [
        "{{崇祯大旱|1628–1644 年北方连年大旱，兼蝗、疫，民变四起}}。",
        "陕西、山西、河南，连着旱了七年。",
        "「崇祯元年，全陕天赤如血。」"
      ],
      options: [
        { text: "吃树皮草根，守着地", hint: "身体 −14；粮 −8", effects: [{ k: "body", v: -14 }, { k: "grain", v: -8 }], gamble: { deathChance: 0.16, cause: "饥" }, then: "你把能吃的都吃了。榆树皮、草根、观音土。拉不出来的时候，用树枝掏。" },
        { text: "跟着流民走", hint: "身体 −12；粮 −4", effects: [{ k: "body", v: -12 }, { k: "grain", v: -4 }], gamble: { deathChance: 0.18, cause: "饥" }, then: "你跟着流民走。走到哪儿都一样，到处是等着赈粮的人。" },
        { text: "投了流寇", hint: "身体 −8；银钱 +6；从此是贼", effects: [{ k: "body", v: -8 }, { k: "silver", v: 6 }, { k: "troops", v: 4 }, { k: "fame", v: -8 }], gamble: { deathChance: 0.18, cause: "战阵" }, then: "你投了队。队里说：「跟着走，有饭吃。」头一顿吃的是马肉。" }
      ]
    },
    {
      id: "m7.jingshi", cat: "天灾", title: "京师大疫", age: [8, 65], weight: 16, once: true,
      years: [1643, 1644],
      text: [
        "{{京师大疫|1643 年北京鼠疫流行，死者二十余万}}。",
        "先死的是老鼠。街上到处是死老鼠，扫了又出来。",
        "然后是收尸的人。再然后是守城的兵。"
      ],
      options: [
        { text: "闭门，用石灰撒门口", hint: "粮 −10；身体 −4", effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }], gamble: { deathChance: 0.16, cause: "疫" }, then: "你在门口撒了石灰，院里点了艾。两个月没出门。" },
        { text: "出城往南", hint: "身体 −10；或有染", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.14, cause: "疫" }, then: "你出了城。城门口没有守兵了，守兵都死了。" },
        { text: "去帮着收尸，一天二百文", hint: "银钱 +5；或有染", effects: [{ k: "silver", v: 5 }], gamble: { deathChance: 0.22, cause: "疫" }, then: "你和六个人拉一辆板车。一天拉四趟，一趟十具。" }
      ]
    }
  ]);

  /* ══════════ 清 ══════════ */
  B.eraEvents.qing = (B.eraEvents.qing || []).concat([

    {
      id: "qi7.dingwu", cat: "天灾", title: "丁戊奇荒", age: [8, 65], weight: 18, once: true,
      years: [1876, 1879],
      text: [
        "{{丁戊奇荒|1876–1879 年华北大旱，死者千万}}。",
        "山西、河南，两年没下透雨。",
        "「人相食」这三个字，在奏折里出现了十一次。"
      ],
      options: [
        { text: "守着家，等赈", hint: "身体 −16；粮 −10", effects: [{ k: "body", v: -16 }, { k: "grain", v: -10 }], gamble: { deathChance: 0.22, cause: "饥" }, then: "你守着。赈粮的车来得很慢，一村一村地分，分到你这时，车上剩的是糠。" },
        { text: "往关外走", hint: "身体 −14；或有存", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.2, cause: "饥" }, then: "你往北走，走了一个月，走到张家口外。那里有荒地，也有土匪。" },
        { text: "把地卖了换粮", hint: "田 −12；粮 +10", effects: [{ k: "field_wet", v: -12 }, { k: "grain", v: 10 }], then: "你卖了十二亩，换了两石杂粮。买主是城里的票号，他们收地收得很便宜。" }
      ]
    },
    {
      id: "qi7.sanfan", cat: "世变", title: "三藩", age: [14, 60], weight: 14, once: true,
      years: [1673, 1681],
      text: [
        "{{三藩之乱|1673–1681 年吴三桂等叛，战火遍及南方}}。",
        "兵从南边来，又从北边来。",
        "县里的官换了两回，旗子换了三回。"
      ],
      options: [
        { text: "躲进山里", hint: "身体 −10；粮 −8", effects: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], then: "你在山里住了两年。回来时，村里的祠堂被烧了，族谱也没了。" },
        { text: "留在村里，谁来了缴粮", hint: "粮 −12；保命", effects: [{ k: "grain", v: -12 }], then: "你缴了六次粮。最后一次，来的人已经不知道是哪一边的了。" },
        { text: "给官军做向导", hint: "银钱 +5；声望 −6", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.12, cause: "兵祸" }, then: "你带着一队人走小路，绕过了叛军的哨。带队的给了你一两银子。" }
      ]
    },
    {
      id: "qi7.changmao", cat: "世变", title: "长毛", age: [14, 60], weight: 15, once: true,
      years: [1851, 1864],
      text: [
        "{{太平天国|1851–1864 年，战火遍及十余省}}。",
        "「长毛」过境，官兵也过境。两边都要粮，两边都抓人。",
        "村口的老槐树上，挂过三面不同的旗。"
      ],
      options: [
        { text: "逃进城里", hint: "身体 −10；银钱 −4", effects: [{ k: "body", v: -10 }, { k: "silver", v: -4 }], gamble: { deathChance: 0.14, cause: "围城" }, then: "你带着一家进了县城。城里挤满了人，城外的田全荒了。" },
        { text: "留在村里", hint: "粮 −12；或有掠", effects: [{ k: "grain", v: -12 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -12 }, { k: "silver", v: -8 }], loseNote: "两边拉锯，村里被搜了四次。屋烧了，人被拉去挑担。" }, then: "你留了下来。田还在，粮没了，牛也没了。" },
        { text: "投湘军", hint: "身体 −8；银钱 +6", effects: [{ k: "body", v: -8 }, { k: "silver", v: 6 }, { k: "martial", v: 8 }], gamble: { deathChance: 0.2, cause: "战阵" }, then: "你投了营。一个月四两二钱，管饭。营官说：「打完了，给你田。」" }
      ]
    }
  ]);

})(window.PACK_BASE);
