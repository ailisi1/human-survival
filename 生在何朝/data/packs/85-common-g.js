/* 生在何朝 · 共同底本（七续）：军旅细节
 * 点行、行军、扎营、军粮、军法、首级、金创、攻城、溃散、抚恤。
 * 这一卷不写「去不去当兵」，写当上兵之后的那几个月：
 * 脚上的泡、腰上的牌、锅里的粥，以及第一次看见死人时的样子。
 * 记事体。杀人与被杀都记账，不抒情。
 * id 一律以 c7. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 点行 ══════════ */
    {
      id: "c7.dianxing", cat: "军旅", title: "点行", age: [15, 50], weight: 16,
      text: [
        "折冲府下了牒，你家出一丁。名册上有你的名字，年二十，身长五尺七寸。",
        "验身的人看你牙齿，看你手掌，看你的脚。然后在册上画一个圈。"
      ],
      options: [
        { text: "去", hint: "离家；身体 −4", effects: [{ k: "body", v: -4 }, { k: "flag", v: "in_army" }],
          then: "发了一杆枪、一件袄、一双鞋。鞋是旧的，前一个人没穿到换季。" },
        { text: "花钱雇人代役", hint: "银钱 −14；免行", effects: [{ k: "silver", v: -14 }, { k: "fame", v: -3 }],
          then: "替你的人姓王，三十岁，欠了赌债。他走的时候没回头。" },
        { text: "报称有病", hint: "或有验；或加罪", effects: [],
          gamble: { winChance: 0.4, win: [{ k: "luck", v: 1 }], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }],
            loseNote: "医官看了一眼，说：「装的。」打了二十板，还是去了。" } }
      ]
    },

    {
      id: "c7.cizi", cat: "军旅", title: "刺字", age: [15, 45], weight: 12,
      text: [
        "入伍要刺字。有的刺在手臂，有的刺在脸上。刺了，走到哪里都认得。",
        "拿针的人说：「忍着。刺歪了，将来不好看。」"
      ],
      options: [
        { text: "刺在手臂", hint: "身体 −3；留个印", effects: [{ k: "body", v: -3 }],
          then: "四个字，刺了半个时辰。后来结了疤，字糊了，只剩一片青。" },
        { text: "刺在脸上", hint: "身体 −5；逃不了", effects: [{ k: "body", v: -5 }, { k: "fame", v: -2 }, { k: "flag", v: "face_mark" }] },
        { text: "塞钱免刺", hint: "银钱 −3；脸上干净", effects: [{ k: "silver", v: -3 }] }
      ]
    },

    {
      id: "c7.xingjun", cat: "军旅", title: "行军", age: [15, 55], weight: 15,
      text: [
        "日行六十里，负重三十斤。第二天脚上起了泡，第三天泡破了。",
        "队正说：「不许停。停了就跟不上，跟不上就是逃兵。」"
      ],
      options: [
        { text: "咬牙跟上", hint: "身体 −8；留队", effects: [{ k: "body", v: -8 }, { k: "martial", v: 4 }] },
        { text: "把甲扔了", hint: "身体 −4；或有罚", effects: [{ k: "body", v: -4 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -5 }, { k: "fame", v: -3 }],
            loseNote: "点甲时少一副。队正抽了你十鞭，另罚一副的钱。" } },
        { text: "装病掉队", hint: "或有救；或按逃论", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "body", v: 4 }], lose: [{ k: "body", v: -12 }, { k: "fame", v: -6 }],
            loseNote: "收队的人回来找你，看见你坐在路边。按逃兵论，先打后押。" } }
      ]
    },

    {
      id: "c7.zhaying", cat: "军旅", title: "扎营", age: [15, 55], weight: 13,
      text: [
        "天黑前要扎好营。壕沟深五尺，鹿角摆三排，帐与帐之间留火道。",
        "你分到的是挖壕。土硬，一锹下去半寸。"
      ],
      options: [
        { text: "照规矩挖", hint: "身体 −7；营稳", effects: [{ k: "body", v: -7 }, { k: "command", v: 2 }] },
        { text: "挖浅些，早点睡", hint: "身体 −3；或有夜袭", effects: [{ k: "body", v: -3 }],
          gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -5 }],
            loseNote: "三更时有人摸营。壕太浅，挡不住。你醒来时刀已经在帐里。" } },
        { text: "替别人挖，收钱", hint: "银钱 +3；身体 −10", effects: [{ k: "silver", v: 3 }, { k: "body", v: -10 }] }
      ]
    },

    {
      id: "c7.gengdian", cat: "军旅", title: "更点", age: [15, 55], weight: 12,
      text: [
        "夜里分更，你分到三更到四更。营里静，只有更鼓和马鼻息。",
        "远处有一点火，动了一下，又灭了。"
      ],
      options: [
        { text: "报上去", hint: "或有功；或有扰", effects: [{ k: "command", v: 2 }],
          gamble: { winChance: 0.5, win: [{ k: "fame", v: 4 }], lose: [{ k: "fame", v: -2 }],
            loseNote: "队正看了半天，说：「是狼。」众人笑了半夜。" } },
        { text: "不理，靠着架子打个盹", hint: "身体 +2；或误事", effects: [{ k: "body", v: 2 }],
          gamble: { winChance: 0.75, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -4 }],
            loseNote: "你醒来时，队正站在你面前。他没说话，先打了一鞭。" } },
        { text: "自己摸过去看", hint: "身体 −4；或有获", effects: [{ k: "body", v: -4 }],
          gamble: { winChance: 0.4, win: [{ k: "fame", v: 5 }, { k: "silver", v: 3 }], lose: [{ k: "body", v: -10 }],
            loseNote: "是两匹走失的马。你牵回来，没人认领，也没人记功。" } }
      ]
    },

    {
      id: "c7.junliang", cat: "军旅", title: "军粮", age: [15, 55], weight: 14,
      text: [
        "每人每日米二升，盐三钱。今日伙夫说：粮车没到，先吃糒。",
        "糒是炒干的米，硬，嚼得腮帮子疼。水囊里只剩半囊。"
      ],
      options: [
        { text: "省着吃", hint: "身体 −4；留后手", effects: [{ k: "body", v: -4 }, { k: "grain", v: 2 }] },
        { text: "吃光", hint: "身体 +2；明日无粮", effects: [{ k: "body", v: 2 }, { k: "grain", v: -2 }] },
        { text: "去村里换", hint: "银钱 −4；或有抢", effects: [{ k: "silver", v: -4 }, { k: "body", v: 2 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -4 }, { k: "body", v: -5 }],
            loseNote: "村里人先跑了。你们进了三家，只找到半缸腌菜。" } }
      ]
    },

    {
      id: "c7.junfa", cat: "军旅", title: "军法", age: [15, 55], weight: 12,
      text: [
        "同伍有个人夜里跑了，被抓回来。军法：斩，全伍连坐，各杖二十。",
        "他跪在旗下，说家里有个瞎眼的娘。"
      ],
      options: [
        { text: "照法，不说话", hint: "无咎；心里记着", effects: [{ k: "body", v: -4 }, { k: "luck", v: -2 }],
          then: "刀落下去很快。之后两天，营里没人说话。" },
        { text: "替他求", hint: "或有转；自己担责", effects: [{ k: "body", v: -4 }],
          gamble: { winChance: 0.2, win: [{ k: "favor", v: 5 }, { k: "fame", v: 4 }], lose: [{ k: "body", v: -8 }, { k: "fame", v: -3 }],
            loseNote: "主将说：「军法不是人情。」求情的人加杖十下。" } },
        { text: "出钱替他赎", hint: "银钱 −14；或免死", effects: [{ k: "silver", v: -14 }, { k: "body", v: -4 }],
          gamble: { winChance: 0.35, win: [{ k: "favor", v: 8 }], lose: [{ k: "body", v: -4 }],
            loseNote: "钱收了，人还是斩了。钱没退。" } }
      ]
    },

    {
      id: "c7.shouji", cat: "军旅", title: "首级", age: [16, 55], weight: 13,
      text: [
        "战后清点，按首级记功。一颗首级，赏绢一匹，免役一年。",
        "你身边躺着一个刚死的敌人，二十来岁，怀里揣着一块饼。"
      ],
      options: [
        { text: "割了报功", hint: "银钱 +6；夜里睡不着", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 3 }, { k: "luck", v: -2 }],
          then: "你割的时候，他的眼睛是睁着的。你后来想起过很多次。" },
        { text: "不割", hint: "无功；心里安", effects: [{ k: "fame", v: -2 }, { k: "luck", v: 2 }] },
        { text: "割别人的，充自己的", hint: "银钱 +6；或有争", effects: [{ k: "silver", v: 6 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -6 }],
            loseNote: "两个人为同一颗首级吵起来。队正各打二十，赏钱充公。" } }
      ]
    },

    {
      id: "c7.jinshang", cat: "身体", title: "金创", age: [15, 60], weight: 13,
      text: [
        "一支箭射穿了你的左腿，箭杆断了，箭头还在里头。",
        "军医说：「挖出来，三天不能走；不挖，这条腿保不住。」"
      ],
      options: [
        { text: "挖", hint: "身体 −12；腿保住", effects: [{ k: "body", v: -12 }],
          then: "他让你咬住一根木棍。挖的时候你没叫，木棍咬断了。" },
        { text: "不挖，裹上", hint: "身体 −6；腿或废", effects: [{ k: "body", v: -6 }, { k: "martial", v: -6 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -6 }, { k: "fame", v: -3 }],
            loseNote: "半个月后伤口发黑，还是挖了。挖出来的箭头带着一块肉。" } },
        { text: "找营里那个老医的偏方", hint: "身体 −8；或有奇效", effects: [{ k: "body", v: -8 }, { k: "silver", v: -3 }],
          gamble: { winChance: 0.7, win: [{ k: "martial", v: 3 }], lose: [{ k: "body", v: -6 }],
            loseNote: "他用了草药敷，敷了七天，烧退了，腿短了半寸。" } }
      ]
    },

    {
      id: "c7.yingyi", cat: "军旅", title: "营疫", age: [15, 60], weight: 11,
      text: [
        "营里开始有人拉肚子，一天倒十几个。茅坑离水源只有二十步。",
        "队正说：「不许喝生水。」但井只有一个，几百人排队。"
      ],
      options: [
        { text: "烧开了喝", hint: "身体 −3；少病", effects: [{ k: "body", v: -3 }] },
        { text: "照喝生水", hint: "或有疫", effects: [],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -14 }, { k: "martial", v: -3 }],
            loseNote: "第三天你开始拉。拉到第七天，站不起来。" } },
        { text: "去帮伙夫烧水", hint: "身体 −5；全营少病", effects: [{ k: "body", v: -5 }, { k: "fame", v: 4 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "c7.gongcheng", cat: "军旅", title: "攻城", age: [16, 55], weight: 12,
      text: [
        "城不高，三丈。城上有弩。要先填壕，再推云梯。",
        "填壕的人先上，推梯的第二个，爬梯的第三个。你被排在填壕。"
      ],
      options: [
        { text: "按排位去", hint: "身体 −14；或有赏", effects: [{ k: "body", v: -14 }],
          gamble: { winChance: 0.5, win: [{ k: "fame", v: 5 }, { k: "silver", v: 5 }], lose: [{ k: "body", v: -8 }],
            loseNote: "壕填到一半，上面倒下滚油。你退回来，又冲了一次。" } },
        { text: "装死躺下", hint: "保住命；或按军法", effects: [],
          gamble: { winChance: 0.5, win: [{ k: "body", v: -4 }, { k: "fame", v: -3 }], lose: [{ k: "body", v: -10 }, { k: "fame", v: -8 }],
            loseNote: "督战队在你身后走过。有人踢了你一脚，你没动。第二脚踢在腰上，你叫了。" } },
        { text: "跟着推梯", hint: "身体 −10；或先登", effects: [{ k: "body", v: -10 }],
          gamble: { winChance: 0.35, win: [{ k: "fame", v: 8 }, { k: "silver", v: 8 }], lose: [{ k: "body", v: -10 }],
            loseNote: "梯子被推倒。你从半空摔下来，压在三具尸体上。" } }
      ]
    },

    {
      id: "c7.shoucheng", cat: "军旅", title: "守城", age: [16, 60], weight: 11,
      text: [
        "围了四十天。城里粮尽，先杀马，后吃树皮。城上的人要轮班，你在西墙。",
        "今日敌人在城外喊话：「开城，不杀。」"
      ],
      options: [
        { text: "守到底", hint: "身体 −12；粮 −10", effects: [{ k: "body", v: -12 }, { k: "grain", v: -10 }, { k: "fame", v: 5 }] },
        { text: "夜里缒城而下", hint: "或有生路", effects: [{ k: "body", v: -8 }],
          gamble: { winChance: 0.45, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -12 }, { k: "fame", v: -6 }],
            loseNote: "城下也有巡骑。你落地的声音惊动了他们。" } },
        { text: "跟着开城", hint: "民众多活；名声坏", effects: [{ k: "fame", v: -6 }, { k: "body", v: -4 }],
          then: "城门开了。进来的兵没有立刻杀，先把粮仓占了。" }
      ]
    },

    {
      id: "c7.chihou", cat: "军旅", title: "斥候", age: [18, 45], weight: 10,
      text: [
        "要三个人去前头看敌人的营在哪儿，看完了回来报。",
        "队正说：「你们两个跟我。」他看的是你和另一个新兵。"
      ],
      options: [
        { text: "去", hint: "身体 −6；或有功", effects: [{ k: "body", v: -6 }, { k: "martial", v: 4 }],
          gamble: { winChance: 0.55, win: [{ k: "fame", v: 6 }, { k: "silver", v: 4 }], lose: [{ k: "body", v: -10 }],
            loseNote: "你们摸到半山，被巡骑发现。跑回来时少了一个人。" } },
        { text: "推给新兵", hint: "苟全；队里不服", effects: [{ k: "fame", v: -4 }, { k: "favor", v: -3 }] },
        { text: "去，但先画一张图", hint: "身体 −8；报得准", effects: [{ k: "body", v: -8 }, { k: "command", v: 4 }, { k: "fame", v: 4 }] }
      ]
    },

    {
      id: "c7.kuisan", cat: "军旅", title: "溃", age: [16, 60], weight: 11,
      text: [
        "前军败了。败兵往后跑，撞翻了后军的阵。鼓还在敲，没人听。",
        "有人喊：「跑！」有人喊：「站住！」"
      ],
      options: [
        { text: "跟着跑", hint: "身体 −8；或能活", effects: [{ k: "body", v: -8 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -4 }],
            loseNote: "追兵的马快。跑出去三里，你听见身后的声音越来越近。" } },
        { text: "站住，收拢人", hint: "身体 −10；或有功", effects: [{ k: "body", v: -10 }, { k: "command", v: 5 }],
          gamble: { winChance: 0.35, win: [{ k: "fame", v: 8 }, { k: "official", v: 4 }], lose: [{ k: "body", v: -12 }],
            loseNote: "你收住了十几个人，但挡不住。最后是被人抬下来的。" } },
        { text: "躲进沟里", hint: "身体 −6；或被抓", effects: [{ k: "body", v: -6 }, { k: "fame", v: -2 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -8 }],
            loseNote: "沟里已经有三个人。搜了两遍，第三遍有人踩到了你的手。" } }
      ]
    },

    {
      id: "c7.fu", cat: "军旅", title: "俘", age: [16, 60], weight: 10,
      text: [
        "你被围在土坡上，箭没了，刀卷了。对面喊：「弃械不杀。」",
        "身边有人扔了刀。"
      ],
      options: [
        { text: "扔刀", hint: "活下来；此后为俘", effects: [{ k: "fame", v: -5 }, { k: "body", v: -6 }, { k: "flag", v: "captured" }],
          then: "他们用绳把你们串起来，一串二十个。走了七天，到了他们的营地。" },
        { text: "冲一次", hint: "身体 −14；或死", effects: [{ k: "body", v: -14 }, { k: "fame", v: 6 }],
          gamble: { winChance: 0.25, win: [{ k: "fame", v: 6 }], lose: [{ k: "body", v: -10 }],
            deathChance: 0.7, cause: "战殁",
            loseNote: "你冲了三步，被一杆长枪捅穿了肋下。倒下去的时候，天是白的。" } },
        { text: "装死", hint: "或有生路", effects: [],
          gamble: { winChance: 0.4, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -12 }],
            loseNote: "他们挨个补刀。刀到你身上时，你动了一下。" } }
      ]
    },

    {
      id: "c7.tun", cat: "军旅", title: "军屯", age: [18, 55], weight: 10,
      text: [
        "上头说：兵不够，粮也不够。从今年起，一半人种田，一半人守城，三年一轮。",
        "分给你的是三十亩荒地，一牛，一犁。"
      ],
      options: [
        { text: "种", hint: "粮 +16；身体 −8", effects: [{ k: "grain", v: 16 }, { k: "body", v: -8 }, { k: "field_dry", v: 3 }],
          then: "第一年收的粮交了七成。第二年，你学会了在渠边多开一垄。" },
        { text: "把地转给别人种，自己去守城", hint: "银钱 +4；不熟农事", effects: [{ k: "silver", v: 4 }] },
        { text: "报地荒，领空饷", hint: "银钱 +7；或有查", effects: [{ k: "silver", v: 7 }],
          gamble: { winChance: 0.65, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -6 }],
            loseNote: "点屯的人来了。地里长的是草，比人还高。" } }
      ]
    },

    {
      id: "c7.zizhong", cat: "军旅", title: "辎重", age: [16, 55], weight: 10,
      text: [
        "你被分去押辎重，车上装的是箭、盐、和主将的酒。",
        "路上泥深，车陷了。前军已经走远。"
      ],
      options: [
        { text: "卸货推车", hint: "身体 −8；车保住", effects: [{ k: "body", v: -8 }, { k: "command", v: 2 }] },
        { text: "轻装追赶，丢了车", hint: "或有罚", effects: [{ k: "body", v: -4 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -4 }],
            loseNote: "主将问：「酒呢？」没人答。押辎重的三个人各打三十。" } },
        { text: "偷偷卖一部分箭", hint: "银钱 +8；或有查", effects: [{ k: "silver", v: 8 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -6 }],
            loseNote: "交箭时数少了两捆。查了三天，查到车上。" } }
      ]
    },

    {
      id: "c7.kaoshang", cat: "军旅", title: "犒赏", age: [16, 55], weight: 11,
      text: [
        "打了胜仗，主将犒赏：每人酒半斤、肉一斤、钱二百。",
        "伙夫说：「酒只有一坛，人多。」"
      ],
      options: [
        { text: "分着喝", hint: "身体 +3；交情深", effects: [{ k: "body", v: 3 }, { k: "favor", v: 4 }] },
        { text: "把酒卖了换钱", hint: "银钱 +3；众人不快", effects: [{ k: "silver", v: 3 }, { k: "favor", v: -3 }] },
        { text: "留着，等伤的时候喝", hint: "存着；或有急用", effects: [{ k: "luck", v: 2 }] }
      ]
    },

    {
      id: "c7.xiaofan", cat: "市井", title: "营市", age: [16, 55], weight: 9,
      text: [
        "营外聚了些小贩，卖饼、卖酒、卖草鞋，也卖女人。",
        "有人来问你：要不要合伙，把营里的盐偷出来换饼。"
      ],
      options: [
        { text: "合伙", hint: "银钱 +6；或有查", effects: [{ k: "silver", v: 6 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -5 }],
            loseNote: "盐有数。查出少了三斤，三个人一起挨了鞭子。" } },
        { text: "自己买两个饼", hint: "银钱 −2；身体 +2", effects: [{ k: "silver", v: -2 }, { k: "body", v: 2 }] },
        { text: "去告", hint: "得赏；结怨", effects: [{ k: "silver", v: 3 }, { k: "grudge", v: 8 }] }
      ]
    },

    {
      id: "c7.jiadu", cat: "军旅", title: "军中赌", age: [16, 55], weight: 9,
      text: [
        "夜里围着火堆掷钱。押大小的、押单双的，一夜能输掉半年的饷。",
        "有人把家里的地契押上了。"
      ],
      options: [
        { text: "押一把", hint: "银钱 ±6", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 6 }], lose: [{ k: "silver", v: -6 }],
            loseNote: "开了单。你把腰带解下来，也押上了。" } },
        { text: "不赌，看着", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "做庄", hint: "银钱 +8；众人恨", effects: [{ k: "silver", v: 8 }, { k: "favor", v: -5 }] }
      ]
    },

    {
      id: "c7.hao", cat: "军旅", title: "号令", age: [16, 55], weight: 10,
      text: [
        "鼓三通，进；金一响，退。旗往左，左队出；旗往右，右队出。",
        "你在阵里，看不见旗，只听得见鼓。"
      ],
      options: [
        { text: "记熟号令", hint: "学识 +4；临阵不乱", effects: [{ k: "knowledge", v: 4 }, { k: "command", v: 3 }] },
        { text: "跟着旁边的人走", hint: "或错", effects: [],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -3 }],
            loseNote: "金响的时候旁边那个人没动。你也没动。回头时阵已经乱了。" } },
        { text: "盯着旗手", hint: "身体 −2；看得清", effects: [{ k: "body", v: -2 }, { k: "command", v: 2 }] }
      ]
    },

    {
      id: "c7.xiujia", cat: "军旅", title: "修甲", age: [16, 55], weight: 9,
      text: [
        "你的甲是旧的，右肩那一片缺了三块，用皮绳绑着。",
        "军械官说：「换新的，要交旧甲，再补三百文。」"
      ],
      options: [
        { text: "补钱换新", hint: "银钱 −4；身体少伤", effects: [{ k: "silver", v: -4 }, { k: "martial", v: 4 }] },
        { text: "自己修", hint: "身体 −3；甲还旧", effects: [{ k: "body", v: -3 }, { k: "martial", v: 2 }] },
        { text: "不修，就这么穿", hint: "省下钱；临阵吃亏", effects: [{ k: "martial", v: -4 }] }
      ]
    },

    {
      id: "c7.gongxian", cat: "军旅", title: "弓弦", age: [16, 55], weight: 9,
      text: [
        "下雨三日，弓弦松了。射出去的箭，飞不到五十步就落。",
        "老卒说：「弦要换牛筋的。麻绳的遇上雨就废。」"
      ],
      options: [
        { text: "换牛筋弦", hint: "银钱 −3；射得远", effects: [{ k: "silver", v: -3 }, { k: "martial", v: 5 }] },
        { text: "用麻绳凑合", hint: "省钱；射不准", effects: [{ k: "martial", v: -3 }] },
        { text: "把弓收了，用枪", hint: "改用长兵", effects: [{ k: "martial", v: 1 }, { k: "body", v: -2 }] }
      ]
    },

    {
      id: "c7.huqi", cat: "军旅", title: "火器", age: [18, 55], weight: 9,
      text: [
        "营里发了新家伙，叫「突火枪」，竹筒里装药和子窠，点着了能喷火。",
        "教的人说：「装药多了炸膛。少一点，打不远。」"
      ],
      options: [
        { text: "多装药", hint: "或有奇效；或炸", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "fame", v: 5 }, { k: "martial", v: 5 }], lose: [{ k: "body", v: -14 }, { k: "fame", v: -4 }],
            loseNote: "第一响就炸了。你的左手到冬天还没知觉。" } },
        { text: "照教的分量", hint: "稳当", effects: [{ k: "martial", v: 3 }] },
        { text: "不敢用，换回弓", hint: "保守；被人笑", effects: [{ k: "fame", v: -2 }, { k: "martial", v: 1 }] }
      ]
    },

    {
      id: "c7.xuejia", cat: "军旅", title: "家书", age: [16, 55], weight: 10,
      text: [
        "营里有人代写家书，一封五文。你想写，但不知道写什么。",
        "该告诉家里：人还在，钱寄回去了，还是别告诉他们上个月那场仗。"
      ],
      options: [
        { text: "写实情", hint: "银钱 −5；家里挂心", effects: [{ k: "silver", v: -5 }, { k: "favor", v: 4 }] },
        { text: "只写平安", hint: "银钱 −3；家里安心", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 2 }, { k: "fame", v: 1 }] },
        { text: "不写，把钱寄回去", hint: "银钱 −6；家里得钱", effects: [{ k: "silver", v: -6 }, { k: "favor", v: 3 }],
          then: "钱托同乡带回去。他在路上花了一半，到家只剩三成。你没问。" }
      ]
    },

    {
      id: "c7.fanghuan", cat: "军旅", title: "放归", age: [35, 65], weight: 10, once: true,
      text: [
        "仗打完了。上头说：年四十以上、有伤者，放归。",
        "你在册上。发的钱是六百文，另有一张「归农」的文书。"
      ],
      options: [
        { text: "回家种田", hint: "银钱 +5；身体 −4", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }, { k: "field_dry", v: 2 }],
          then: "走了十一天到家。门是新换的，院里那棵树高了一倍。" },
        { text: "留在营里做教头", hint: "银钱 +3；不回乡", effects: [{ k: "silver", v: 3 }, { k: "martial", v: 3 }, { k: "favor", v: -3 }] },
        { text: "去投别人的军", hint: "身体 −6；或有前程", effects: [{ k: "body", v: -6 }],
          gamble: { winChance: 0.4, win: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }], lose: [{ k: "body", v: -8 }],
            loseNote: "那支军三个月后就散了。你回到原来的路上，往回走。" } }
      ]
    }

  );

})(window.PACK_BASE);
