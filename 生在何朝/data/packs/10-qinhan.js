/* 生在何朝 · 秦汉三国（时段事件 + 各朝大事）
 * 时段事件：戍边、军功爵、察举、盐铁、经学、奴婢、豪族
 */
(function (P) {
  "use strict";

  P.periods.qinhan.events = (P.periods.qinhan.events || []).concat([

    {
      id: "qh.x.border", cat: "官府", title: "戍边", age: [16, 42], weight: 16, once: true, sex: "male",
      text: [
        "县里发戍卒，册上有你的名字。去渔阳，戍期一年，自备衣粮。",
        "里正说：不想去，可以出钱雇人代戍，一月三百钱。"
      ],
      options: [
        { text: "自己去", hint: "身体 −6；武艺 +8，声望 +3", effects: [{ k: "body", v: -6 }, { k: "martial", v: 8 }, { k: "fame", v: 3 }], then: "塞上的风像刀。你学会了看烽火，也学会了在雪里睡觉。" },
        { text: "出钱雇人", hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "替你去的是个欠了债的汉子。他走的时候，你不敢看他的脸。" },
        { text: "逃亡", hint: "声望 −10；成为亡人", effects: [{ k: "fame", v: -10 }, { k: "body", v: -4 }], then: "你逃进山里。按律，亡人被捕，斩。此后的日子，你听见马蹄声就心跳。" }
      ]
    },
    {
      id: "qh.x.rank", cat: "军功", title: "首级", age: [18, 45], weight: 14, sex: "male",
      text: [
        "一仗打完，你手里提着一颗首级。按律，斩一甲士，赐爵一级，田一顷，宅九亩。",
        "同伍的人说：报上去，还是自己留着？"
      ],
      options: [
        { text: "报功请爵", hint: "声望 +8；田 +20 亩", effects: [{ k: "fame", v: 8 }, { k: "field_dry", v: 20 }, { k: "martial", v: 5 }], then: "爵书发下来，上面写着你的名字。你把那块木牍藏在枕下，睡了三年。" },
        { text: "卖给同伍的富人", hint: "银钱 +8；声望 −4", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -4 }], then: "他把首级报了上去，你得了一笔钱。这事你此后没跟人提过。" },
        { text: "埋了，不报", hint: "身体 −2；心中不安", effects: [{ k: "body", v: -2 }, { k: "luck", v: -2 }], then: "你在夜里挖了个坑。那人身上有一封没写完的家信。" }
      ]
    },
    {
      id: "qh.x.chaju", cat: "官府", title: "举孝廉", age: [20, 45], weight: 12, once: true,
      when: { minKnowledge: 20 },
      text: [
        "郡里要举孝廉，名额两人。太守的门下掾来说：你的名字在册上。",
        "只一条，得先见见太守。"
      ],
      options: [
        { text: "备礼去见", hint: "银钱 −12；声望 +14", need: { minSilver: 12 }, effects: [{ k: "silver", v: -12 }, { k: "fame", v: 14 }, { k: "official", v: 10 }], then: "太守问了几句经义，点点头。三个月后，你被授为郎官。" },
        { text: "空手去，只谈经义", hint: "声望 +8；成败难料", gamble: { winChance: 0.4, win: [{ k: "fame", v: 8 }, { k: "official", v: 8 }], lose: [{ k: "fame", v: -6 }], winNote: "太守和你谈到天黑，留你吃了饭。他说：这样的人，不该埋没。", loseNote: "太守听了半刻，说：回去读书罢。" } },
        { text: "推辞，让与别人", hint: "声望 +4；族中记你一功", effects: [{ k: "fame", v: 4 }], then: "你让给了同乡一个更穷的人。他后来做了县令，逢年过节都来看你。" }
      ]
    },
    {
      id: "qh.x.law", cat: "官府", title: "刀笔", age: [15, 32], weight: 12, once: true,
      text: [
        "县衙缺一个书佐。父辈说：识字不如识律，识律不如识人。",
        "去了，就要在衙门里站一辈子。"
      ],
      options: [
        { text: "去，学律令", hint: "学识 +6；人脉 +，声望 +2", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 2 }, { k: "official", v: 4 }], setFlag: ["literate"], then: "你抄了三年律条，闭着眼也能背出「盗采人桑葉臧」那一条。" },
        { text: "不去，回家种地", hint: "身体 +4", effects: [{ k: "body", v: 4 }], then: "父亲没说什么。那年的麦子长得很好。" }
      ]
    },
    {
      id: "qh.x.salt", cat: "家业", title: "盐铁", age: [22, 58], weight: 10,
      when: { minSilver: 25 },
      text: [
        "县里有盐井、铁冶，官营之后，煮盐铸铁都要领官器、纳官税。",
        "有人说：私煮一釜，利十倍。抓到了，罪至死。"
      ],
      options: [
        { text: "领官器，老实做", hint: "银钱 +14；安稳", effects: [{ k: "silver", v: 14 }, { k: "fame", v: 3 }], then: "官税重，但还是有赚。你把赚的银子换成了田。" },
        { text: "私煮私铸", hint: "银钱 +40；一旦事发，家破", gamble: { winChance: 0.55, win: [{ k: "silver", v: 40 }, { k: "fame", v: -6 }], lose: [{ k: "silver", v: -30 }, { k: "fame", v: -14 }, { k: "body", v: -8 }], winNote: "夜里开炉，天亮前运走。三年之间，你成了县里排得上号的人。", loseNote: "官差围了作坊。你从后墙逃走，货、器、炉全没了，还赔了三十两。" } },
        { text: "不碰", hint: "什么也没变", effects: [], then: "后来那家私煮的果然被抄了，一家七口没剩下几个。" }
      ]
    },
    {
      id: "qh.x.clan", cat: "家族", title: "大姓", age: [20, 55], weight: 12,
      text: [
        "族中一位长辈死了，没有儿子，留下八十亩田和一个寡妻。",
        "族里开会，说要「代为照管」。"
      ],
      options: [
        { text: "主张归寡妻", hint: "声望 +8；得罪族人", effects: [{ k: "fame", v: 8 }, { k: "grudge", v: 8 }], then: "寡妻在祠堂外跪了半个时辰。你说：田是她的。族老脸色很难看。" },
        { text: "由族中均分", hint: "田 +6 亩；声望 −2", effects: [{ k: "field_dry", v: 6 }, { k: "fame", v: -2 }], then: "你分到六亩。寡妻分到两亩，第二年就改嫁了。" },
        { text: "替她经营，收其租", hint: "银钱 +6/年；声望 −6", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -6 }], then: "你替她管了十年田。她死的时候，箱子里只有两件旧衣。" }
      ]
    },
    {
      id: "qh.x.slave", cat: "世变", title: "赎身", age: [12, 45], weight: 20, once: true,
      class: ["base"],
      text: [
        "主家要卖一批奴婢，你是其中之一。价十五两。",
        "有个老仆说：你可以求主家放你为庶人，只要替他白做五年。"
      ],
      options: [
        { text: "求放为庶人，白做五年", hint: "五年无银；终得自由", effects: [{ k: "fame", v: 6 }, { k: "body", v: -6 }], then: "第五年冬天，主人给了你一张放书。你把那张纸缝在衣里，睡了十年。" },
        { text: "跟着被卖，换个主家", hint: "身不由己；境遇难料", effects: [{ k: "body", v: -4 }], then: "新主家在邻县。你被改了名字，从此不再提旧事。" },
        { text: "逃", hint: "声望 −10；亡命", effects: [{ k: "fame", v: -10 }, { k: "body", v: -5 }, { k: "luck", v: -2 }], then: "你跑了三天三夜。律法写得明白：奴婢逃亡，黥面，没入官。" }
      ]
    },
    {
      id: "qh.x.xiongnu", cat: "军功", title: "击胡", age: [18, 45], weight: 12, sex: "male",
      text: [
        "边郡征兵，说匈奴入塞，杀掠吏民。",
        "去的人，回来一半。不去的人，今年要加倍出赋。"
      ],
      options: [
        { text: "应征", hint: "武艺 +10；可能战死", effects: [{ k: "martial", v: 10 }, { k: "fame", v: 5 }, { k: "body", v: -5 }], then: "你在塞外追了三天。回来时，你的马死了，你把鞍背在身上走回来的。", gamble: { deathChance: 0.12, cause: "战殁" } },
        { text: "出钱免行", hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "同村去了七个人，回来三个。" }
      ]
    },
    {
      id: "qh.x.classic", cat: "学问", title: "受经", age: [12, 28], weight: 14,
      text: [
        "郡里来了位经师，开坛讲《春秋》。听讲的人挤满了一院子。",
        "有人说：今文经讲微言大义，古文经讲名物训诂。你选哪一家？"
      ],
      options: [
        { text: "学今文，求大义", hint: "学识 +10；声望 +4", effects: [{ k: "knowledge", v: 10 }, { k: "fame", v: 4 }], then: "你学会了从一句话里读出三种意思。后来做官，这本事很有用。" },
        { text: "学古文，重训诂", hint: "学识 +12；名声不出乡里", effects: [{ k: "knowledge", v: 12 }], then: "你抄了半部《说文》。同辈笑你迂，你也不辩。" },
        { text: "不学，去干活", hint: "身体 +5；银钱 +1", effects: [{ k: "body", v: 5 }, { k: "silver", v: 1 }], then: "先生讲到第二年就走了。你后来只记得一句：学而时习之。" }
      ]
    },
    {
      id: "qh.x.tun", cat: "官府", title: "徙民", age: [18, 50], weight: 8,
      text: [
        "朝廷募民实边：愿去的，赐田五十亩，给牛具、种粮，三年免赋。",
        "故土难离，但这里的田已经不够分了。"
      ],
      options: [
        { text: "应募西行", hint: "田 +40 亩；身体 −6", effects: [{ k: "field_dry", v: 40 }, { k: "body", v: -6 }, { k: "fame", v: 2 }], then: "走了两个月才到。地平得望不到边，风一吹，全是沙。" },
        { text: "留下", hint: "什么也没变", effects: [], then: "那年村里走了七户。十年后回来探亲的只有一户。" }
      ]
    },
    {
      id: "qh.x.sellchild", cat: "世变", title: "卖子", age: [24, 60], weight: 9,
      when: { maxSilver: 3 },
      text: [
        "连年歉收，家里已经三天没开火。",
        "中人来说：有个无子的人家，愿意出四两银子，抱一个男孩去养。"
      ],
      options: [
        { text: "把儿子给他", hint: "银钱 +4；声望 −12；心中一生不安", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -12 }, { k: "body", v: -3 }], setFlag: ["soldChild"], then: "孩子被抱走时没哭，只是看着你。你转过身，听见他在叫爹。" },
        { text: "不卖，全家少吃", hint: "存粮 −3 石；身体 −6", effects: [{ k: "grain", v: -3 }, { k: "body", v: -6 }], then: "你们喝了两个月的稀粥。孩子活下来了，就是长不高。" },
        { text: "自己去给人做佣工", hint: "身体 −8；银钱 +2", effects: [{ k: "body", v: -8 }, { k: "silver", v: 2 }], then: "你在邻县扛了半年木头，肩膀磨破了三层皮。" }
      ]
    },
    {
      id: "qh.x.guest", cat: "市井", title: "门客", age: [18, 42], weight: 10, sex: "male",
      text: [
        "县中大姓养了几十号门客，管饭，逢年过节有赏。",
        "他们做的事，有时是看家护院，有时是别的。"
      ],
      options: [
        { text: "投在他门下", hint: "武艺 +6；私兵 +6，声望 −2", effects: [{ k: "martial", v: 6 }, { k: "troops", v: 6 }, { k: "fame", v: -2 }], then: "你穿上统一的短打。主人出门时，你们跟在后面，脚步要齐。" },
        { text: "不去", hint: "什么也没变", effects: [], then: "后来那家门客替主人打死了人，一夜间散了。你庆幸了很久。" }
      ]
    },
    {
      id: "qh.x.catch", cat: "官府", title: "捕盗", age: [18, 52], weight: 10, sex: "male",
      text: [
        "亭长带了两个人来，说附近有盗，要各里出丁协助搜捕。",
        "赏钱五百，死的减半。"
      ],
      options: [
        { text: "跟着去", hint: "武艺 +4；银钱 +1", effects: [{ k: "martial", v: 4 }, { k: "silver", v: 1 }, { k: "body", v: -3 }], then: "盗躲在一个枯井里。你们用绳子把他吊上来，他还活着。", gamble: { deathChance: 0.05, cause: "格斗" } },
        { text: "推说有病", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "亭长看了你一眼，什么也没说。此后有事，不再叫你。" }
      ]
    },
    {
      id: "qh.x.shrine", cat: "乡里", title: "社祭", age: [10, 65], weight: 8,
      text: [
        "春社，全里的人都到社树下。杀了一头牛，酒是各家凑的。",
        "巫祝在跳，说今年雨水好，也说东头那家要出事。"
      ],
      options: [
        { text: "出钱办社", hint: "银钱 −1；声望 +6", effects: [{ k: "silver", v: -1 }, { k: "fame", v: 6 }], then: "你出的钱最多，分肉时得了最好的一块。母亲把它炖了。" },
        { text: "跟着吃喝", hint: "身体 +2", effects: [{ k: "body", v: 2 }], then: "酒很浊，肉很硬。你吃到天黑，回家路上摔了一跤。" },
        { text: "不去", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "里正记了你的名字。此后分肉，总少你一份。" }
      ]
    },

    /* ── 秦 ── */
    {
      id: "qin.book", cat: "世变", title: "焚书", era: "qin", years: [-214, -212], age: [6, 65], weight: 30, once: true,
      text: [
        "郡里下来命令：非博士官所职，天下敢有藏《诗》《书》、百家语者，悉诣守尉杂烧之。",
        "有敢偶语《诗》《书》者弃市，以古非今者族。",
        "你家里有一箱书，是父亲留下的。"
      ],
      options: [
        { text: "烧了", hint: "学识 −6；家宅平安", effects: [{ k: "knowledge", v: -6 }, { k: "fame", v: 2 }], then: "你在院里烧了一夜。火光里，父亲的字一行一行卷起来，变黑。" },
        { text: "藏在墙里", hint: "学识 +2；一旦被告发，族", gamble: { winChance: 0.82, win: [{ k: "knowledge", v: 8 }, { k: "luck", v: 1 }], lose: [{ k: "fame", v: -20 }, { k: "body", v: -20 }, { k: "silver", v: -20 }], winNote: "你把书用油布包好，砌进夹墙。此后二十年，你没敢动过那面墙。", loseNote: "邻人告发。书被搜出来，你的父亲被押走，再没回来。" } },
        { text: "交给官府，换个差事", hint: "声望 +6；学识 −4", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: -4 }, { k: "official", v: 6 }], then: "郡守赏了你一匹布。你抱着布回家，路上没敢抬头。" }
      ]
    },
    {
      id: "qin.wall", cat: "官府", title: "长城", era: "qin", years: [-216, -207], age: [14, 45], weight: 30, once: true, sex: "male",
      text: [
        "征发的名册到了里门。北筑长城，南戍五岭，两处都要人。",
        "里正说：名字已经报上去了，去也得去，不去也得去。"
      ],
      options: [
        { text: "北上筑城", hint: "身体 −18；可能不回", effects: [{ k: "body", v: -18 }, { k: "martial", v: 4 }, { k: "fame", v: 2 }], then: "石头从山上抬下来，一块三百斤。同伍的人死了七个，埋在墙根下。", gamble: { deathChance: 0.14, cause: "役死" } },
        { text: "南下戍岭", hint: "身体 −14；瘟疫", effects: [{ k: "body", v: -14 }, { k: "fame", v: 1 }], then: "南边湿热，瘴气一起，营里天天抬人出去。你活下来了，落了病根。", gamble: { deathChance: 0.12, cause: "瘴疠" } },
        { text: "花钱买脱", hint: "银钱 −20", need: { minSilver: 20 }, effects: [{ k: "silver", v: -20 }, { k: "fame", v: -4 }], then: "钱给了，名字划了。村里被抓走的那批人，回来的只有两个。" }
      ]
    },
    {
      id: "qin.daze", cat: "世变", title: "大泽乡", era: "qin", years: [-209, -207], age: [14, 60], weight: 40, once: true,
      text: [
        "陈胜、吴广杀了将尉，诈称公子扶苏、项燕，起兵于蕲。",
        "旬日之间，附近各县的少年皆来投。有人问你：去不去？"
      ],
      options: [
        { text: "投军", hint: "武艺 +8；私兵 +10", effects: [{ k: "martial", v: 8 }, { k: "troops", v: 10 }, { k: "fame", v: 4 }], setFlag: ["rebelSide"], then: "你分到一把锄头磨成的刀。第一仗，你杀了第一个人，吐了。" },
        { text: "守家", hint: "存粮 −5 石；声望 −2", effects: [{ k: "grain", v: -5 }, { k: "fame", v: -2 }], then: "你把门闩加了两道。夜里听见狗叫，全家都坐起来。" },
        { text: "举族迁走", hint: "身体 −8；田产折损", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -3 }], then: "走了十几天，走到一个没有熟人的县。你从此不再提故乡。" }
      ]
    },
    {
      id: "qin.julu", cat: "世变", title: "巨鹿", era: "qin", years: [-208, -207], age: [14, 55], weight: 30, once: true,
      text: [
        "项羽渡河救赵，沉船，破釜甑，烧庐舍，持三日粮。",
        "诸侯军皆从壁上观。你的队伍也在壁上。"
      ],
      options: [
        { text: "跟着冲下去", hint: "武艺 +14；生死各半", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 10 }], then: "楚军一以当十，呼声动天。你跟着冲，脚下的地都是软的。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "留在壁上", hint: "声望 −6；保住性命", effects: [{ k: "fame", v: -6 }], then: "战后你去看战场，秦军的尸首堆到齐腰高。你吐了很久。" }
      ]
    },
    {
      id: "qin.ruin", cat: "世变", title: "入关", era: "qin", years: [-207, -206], age: [14, 65], weight: 30, once: true,
      text: [
        "刘邦自武关入，至霸上。秦王子婴素车白马，系颈以组，降于轵道旁。",
        "咸阳的火烧了三个月。宫室、府库、图籍，尽为灰烬。"
      ],
      options: [
        { text: "入咸阳，抢一份", hint: "银钱 +30；声望 −10", effects: [{ k: "silver", v: 30 }, { k: "fame", v: -10 }], then: "你抱着一匹锦跑出城门。那匹锦后来换了三亩地。" },
        { text: "闭门不出", hint: "家宅保全", effects: [{ k: "fame", v: 2 }], then: "你在家关了四十天门。开门时，街上安静得不像话。" },
        { text: "收拾图籍，藏起来", hint: "学识 +10；声望 +4", effects: [{ k: "knowledge", v: 10 }, { k: "fame", v: 4 }], then: "你从火里抢出两车简牍，埋在院子里。汉初求书，你挖出来献了。" }
      ]
    },

    /* ── 西汉 ── */
    {
      id: "whan.qi", cat: "世变", title: "七国", era: "whan", years: [-155, -153], age: [14, 65], weight: 40, once: true,
      text: [
        "吴王濞以诛晁错、清君侧为名，合楚、赵、胶西、胶东、菑川、济南六国反。",
        "兵数十万，西向长安。",
        "你们县在吴楚之间。"
      ],
      options: [
        { text: "应吴王之征", hint: "私兵 +15；败则族", effects: [{ k: "troops", v: 15 }, { k: "martial", v: 6 }], then: "吴军过境，你在道旁跪迎。三个月后，吴王的人头送到了长安。", gamble: { deathChance: 0.2, cause: "兵败" } },
        { text: "守城不从", hint: "身体 −5；声望 +8", effects: [{ k: "body", v: -5 }, { k: "fame", v: 8 }], then: "你们守了四十天。粮尽了，人还在。后来朝廷下了褒奖。" },
        { text: "带着家小躲进山里", hint: "田产折损；保命", effects: [{ k: "field_dry", v: -3 }, { k: "fame", v: -4 }], then: "山里住了半年。回来时，庄稼被踏成了平地，房子还在。" }
      ]
    },
    {
      id: "whan.xiongnu", cat: "军功", title: "从军", era: "whan", years: [-133, -118], age: [17, 45], weight: 24, sex: "male",
      text: [
        "朝廷大举击匈奴。卫青出上谷，公孙贺出云中，李广出雁门。",
        "募兵，去者赐爵、免赋。"
      ],
      options: [
        { text: "投军，跟着大将军", hint: "武艺 +12；声望 +8；生死难料", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 8 }], then: "大漠里走了十几天，找不到水。你把马尿喝了，活下来。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "运粮，不上阵", hint: "银钱 +4；身体 −6", effects: [{ k: "silver", v: 4 }, { k: "body", v: -6 }], then: "三十车粮，送到时剩十九车。路上倒毙的民夫比马多。" },
        { text: "不去", hint: "赋倍；声望 −2", effects: [{ k: "silver", v: -6 }, { k: "fame", v: -2 }], then: "你留在家里种地，赋加了一倍。听说李广迷了道，自刎了。" }
      ]
    },
    {
      id: "whan.saltiron", cat: "市井", title: "盐铁", era: "whan", years: [-120, -100], age: [20, 60], weight: 20, class: ["merchant"],
      text: [
        "朝廷行盐铁官营，募民自给费，因官器作煮盐，官与牢盆。",
        "又算缗告缗，中家以上大抵破。",
        "你的铺子在市中。"
      ],
      options: [
        { text: "与官府合作，领牢盆", hint: "银钱 +30；受制于官", effects: [{ k: "silver", v: 30 }, { k: "fame", v: 6 }], then: "你成了盐官下面的煮盐户。赚得不如从前，但没人来抄家。" },
        { text: "隐匿家产", hint: "银钱保住；一旦被告，家破", gamble: { winChance: 0.5, win: [{ k: "silver", v: 12 }], lose: [{ k: "silver", v: -60 }, { k: "fame", v: -16 }], winNote: "你把钱埋在后院，账面上只剩三间破屋。查了两次，都过去了。", loseNote: "邻人告缗，官府来抄。钱、货、宅子全没，你被罚戍边三年。" } },
        { text: "收手，买田", hint: "银钱 −40；水田 +20", effects: [{ k: "silver", v: -40 }, { k: "field_wet", v: 20 }], then: "你把铺子关了，买了二十亩地。有人说你胆小，你只是不再数钱。" }
      ]
    },
    {
      id: "whan.wugu", cat: "世变", title: "巫蛊", era: "whan", years: [-92, -86], age: [14, 70], weight: 30, once: true,
      text: [
        "长安城中巫蛊事起。木偶人埋在地下，说是咒天子。",
        "丞相公孙贺父子死狱中，诸邑公主、阳石公主皆坐诛。",
        "有人在你们巷子里挖。"
      ],
      options: [
        { text: "全家出城避一避", hint: "银钱 −8；保命", effects: [{ k: "silver", v: -8 }, { k: "body", v: -3 }], then: "你们在城外住了两个月。回来时，巷子里一半的院子空了。" },
        { text: "留在家里，不动", hint: "声望 +4；风险极大", effects: [{ k: "fame", v: 4 }], then: "官差来了，挖了院子，什么也没挖到。你站在旁边，手心全是汗。", gamble: { deathChance: 0.16, cause: "巫蛊" } },
        { text: "上告邻家埋偶", hint: "银钱 +6；造孽", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -10 }], then: "邻家三口被押走。他们的院子归了你。你后来再没进过那个院门。" }
      ]
    },
    {
      id: "whan.mang", cat: "世变", title: "居摄", era: "whan", years: [3, 8], age: [16, 65], weight: 24, once: true,
      text: [
        "王莽为大司马，迎立平帝。平帝崩，莽立两岁的孺子婴，自己居摄，称假皇帝。",
        "郡国到处献祥瑞，说是周公再来。",
        "县里要各乡上书劝进。"
      ],
      options: [
        { text: "署名劝进", hint: "声望 +6；日后新朝得用", effects: [{ k: "fame", v: 6 }, { k: "official", v: 6 }], then: "你的名字在劝进表上，排在很后面。新朝建立后，你被授了个小吏。" },
        { text: "称病不与", hint: "声望 −2；日后可称汉臣", effects: [{ k: "fame", v: -2 }], setFlag: ["hanLoyal"], then: "你关了门。县里来人问了两次，你都躺着。" },
        { text: "上书言时政之失", hint: "声望 +10；风险", effects: [{ k: "fame", v: 10 }, { k: "official", v: -10 }], then: "你的奏书被人传抄。三个月后，你被免了职，但名声起来了。", gamble: { deathChance: 0.08, cause: "下狱" } }
      ]
    },

    /* ── 新 ── */
    {
      id: "xin.tian", cat: "世变", title: "王田", era: "xin", years: [9, 14], age: [14, 70], weight: 34, once: true,
      text: [
        "新室下诏：更名天下田曰王田，奴婢曰私属，皆不得买卖。",
        "一家男口不满八而田过一井者，分余田与九族邻里。",
        "你家有田一百二十亩，男口五。"
      ],
      options: [
        { text: "如数分出去", hint: "田 −40 亩；声望 +8", effects: [{ k: "field_wet", v: -40 }, { k: "fame", v: 8 }], then: "你把田契一张张分给族人。他们接了，谁也没说谢。" },
        { text: "把田挂在族人名下", hint: "田保住；一旦被查，罪至死", gamble: { winChance: 0.65, win: [{ k: "silver", v: 6 }], lose: [{ k: "silver", v: -20 }, { k: "fame", v: -12 }, { k: "body", v: -8 }], winNote: "田分挂在三个兄弟名下，账面上你只剩二十亩。查了一次，过去了。", loseNote: "被人告发。田没入官，你受了笞刑，脊背上留了一辈子疤。" } },
        { text: "把田卖了，换成钱", hint: "银钱 +60；田清零", effects: [{ k: "silver", v: 60 }, { k: "field_wet", v: -80 }, { k: "field_dry", v: -40 }], then: "地不能买卖，你只能贱价典给人。半年后，钱也毛了。" }
      ]
    },
    {
      id: "xin.coin", cat: "市井", title: "改币", era: "xin", years: [10, 16], age: [14, 70], weight: 26,
      text: [
        "新室改币：钱法四变，五物六名二十八品。大钱重十二铢，值五十。",
        "民间私用旧钱，犯者抵罪。市上乱成一片。"
      ],
      options: [
        { text: "把旧钱都换成新钱", hint: "银钱折半", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 2 }], then: "换来的新钱，第二年又废了。你手里的钱，越换越少。" },
        { text: "藏旧钱，等风头过", hint: "赌一把", gamble: { winChance: 0.45, win: [{ k: "silver", v: 18 }], lose: [{ k: "silver", v: -14 }, { k: "fame", v: -6 }], winNote: "三年后旧钱又通行了。你埋在灶下的那一罐，成了全家的救命钱。", loseNote: "官差搜出旧钱，罚钱、罚役，还挨了十板。" } },
        { text: "以物易物，不用钱", hint: "银钱 −2；声望 +2", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }], then: "你用布换米，用米换盐。日子麻烦，但没被骗。" }
      ]
    },
    {
      id: "xin.green", cat: "世变", title: "绿林", era: "xin", years: [17, 22], age: [14, 60], weight: 34, once: true,
      text: [
        "荆州饥，民入野泽，掘凫茈而食。王匡、王凤为渠帅，众至五万。",
        "又有樊崇起于莒，以朱涂眉为识。",
        "你所在的县，已经三个月没发赈粮。"
      ],
      options: [
        { text: "入山投绿林", hint: "私兵 +20；武艺 +8", effects: [{ k: "troops", v: 20 }, { k: "martial", v: 8 }, { k: "fame", v: -4 }], then: "山里没粮，就去打县城。第一次攻城，你冲在最前面，因为后面的人也在推。", gamble: { deathChance: 0.14, cause: "战殁" } },
        { text: "守村，结寨自保", hint: "身体 −6；声望 +6", effects: [{ k: "body", v: -6 }, { k: "fame", v: 6 }, { k: "troops", v: 8 }], then: "你们在村口筑了土墙，轮流守夜。饥民来了给粥，贼来了就打。" },
        { text: "举家南逃", hint: "田产尽弃", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "body", v: -6 }], then: "一路南走，走到江边。回头看，北边的天是红的。" }
      ]
    },
    {
      id: "xin.kunyang", cat: "世变", title: "昆阳", era: "xin", years: [23, 23], age: [16, 50], weight: 40, once: true,
      text: [
        "莽发四十二万人围昆阳，旌旗辎重千里不绝。城中守军八千人。",
        "夜有流星坠营中，昼有云如坏山。",
        "刘秀率十三骑出城求援。"
      ],
      options: [
        { text: "随刘秀突围求援", hint: "武艺 +10；声望 +12", effects: [{ k: "martial", v: 10 }, { k: "fame", v: 12 }], then: "十三骑出南门，你不在其中，但你跟在后面。回来时，你带了两千人。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "守城", hint: "身体 −10；声望 +8", effects: [{ k: "body", v: -10 }, { k: "fame", v: 8 }], then: "守了二十多天，粮尽了。城破那天，大雨，滍水暴涨，莽军自相蹈藉。" },
        { text: "趁乱逃走", hint: "声望 −8；保住性命", effects: [{ k: "fame", v: -8 }], then: "你混在溃兵里往南跑。跑了三十里，回头看，昆阳的天是黑的。" }
      ]
    },

    /* ── 东汉 ── */
    {
      id: "ehan.dutian", cat: "官府", title: "度田", era: "ehan", years: [39, 42], age: [16, 65], weight: 26, once: true,
      text: [
        "诏下州郡，检核垦田顷亩及户口年纪，号为度田。",
        "刺史太守多为诈巧，不务实核。吏民遮道号呼。",
        "差役到了你们村，要重新丈量。"
      ],
      options: [
        { text: "实报田亩", hint: "赋增；声望 +6", effects: [{ k: "fame", v: 6 }, { k: "silver", v: -8 }], then: "丈量的人把你的田多算了三亩。你说不对，他说：你可以去郡里告。" },
        { text: "贿赂丈量的人", hint: "银钱 −5；田少报", effects: [{ k: "silver", v: -5 }, { k: "fame", v: -2 }], then: "你的田簿上少了十亩。同村的老实人，赋比你重一倍。" },
        { text: "聚众抗量", hint: "声望 +8；可能下狱", effects: [{ k: "fame", v: 8 }, { k: "body", v: -6 }], then: "你们把丈量绳剪了。郡里派兵来，抓了三个为首的去。", gamble: { deathChance: 0.06, cause: "械斗" } }
      ]
    },
    {
      id: "ehan.qiang", cat: "军功", title: "羌乱", era: "ehan", years: [107, 130], age: [17, 50], weight: 20, sex: "male",
      text: [
        "羌人反，断陇道，掠三辅。朝廷发兵十余万，转输者倍之。",
        "十余年间，用兵百亿，凉州几亡。"
      ],
      options: [
        { text: "应募从军", hint: "武艺 +10；银钱 +6", effects: [{ k: "martial", v: 10 }, { k: "silver", v: 6 }], then: "陇山上下，到处都是断了的车轴和死人。你学会了用羌人的刀。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "运粮", hint: "银钱 +3；身体 −8", effects: [{ k: "silver", v: 3 }, { k: "body", v: -8 }], then: "一石粮运到前线，路上要吃掉八斗。你运了三年，瘦得脱了形。" },
        { text: "迁往内地", hint: "田产折损；保命", effects: [{ k: "field_dry", v: -5 }, { k: "fame", v: -2 }], then: "你带着家人迁到三辅。凉州的老宅，走的时候没锁门。" }
      ]
    },
    {
      id: "ehan.danggu", cat: "世变", title: "党锢", era: "ehan", years: [166, 184], age: [16, 70], weight: 22, once: true,
      text: [
        "宦官诬告李膺等结党，诽讪朝廷。桓帝震怒，下诏捕党人，死者百余人。",
        "天下士人相标榜，以不与党人为耻。",
        "你曾在太学听过讲，名录上有你的名字。"
      ],
      options: [
        { text: "自首，入狱", hint: "声望 +16；生死难料", effects: [{ k: "fame", v: 16 }, { k: "body", v: -10 }], then: "狱中关了两年。同监的人一个个被带走，你是最后放出来的几个。", gamble: { deathChance: 0.22, cause: "狱死" } },
        { text: "逃亡，隐姓埋名", hint: "声望 +6；家产尽弃", effects: [{ k: "fame", v: 6 }, { k: "field_wet", v: -10 }, { k: "silver", v: -10 }], then: "你在江南一个镇上教书，改了姓。学生叫你先生，你有时会应错。" },
        { text: "上书自辩，与党人绝", hint: "声望 −10；保住家业", effects: [{ k: "fame", v: -10 }], then: "你的名字从党人碑上抹掉了。同乡的人见你，都绕道走。" }
      ]
    },
    {
      id: "ehan.huangjin", cat: "世变", title: "黄巾", era: "ehan", years: [184, 186], age: [14, 65], weight: 40, once: true,
      text: [
        "张角起于冀州，以太平道聚众三十余万，皆著黄巾为识。",
        "八州并起，燔烧官府，劫略聚邑。旬月之间，天下响应。",
        "你们县也有人头裹黄巾。"
      ],
      options: [
        { text: "从黄巾", hint: "私兵 +20；武艺 +6", effects: [{ k: "troops", v: 20 }, { k: "martial", v: 6 }, { k: "fame", v: -6 }], then: "你跟着攻了一个坞堡。堡里的人不出来，你们就放火。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "守坞堡自保", hint: "声望 +10；身体 −8", effects: [{ k: "fame", v: 10 }, { k: "body", v: -8 }, { k: "troops", v: 12 }], then: "你在坞里守了三个月，靠一口井和两囤粮。外面的人饿死了一半。" },
        { text: "投官军", hint: "武艺 +8；银钱 +8", effects: [{ k: "martial", v: 8 }, { k: "silver", v: 8 }, { k: "fame", v: 4 }], then: "官军杀了三万黄巾，报捷说十万。你分了五两赏钱，和一双靴子。" }
      ]
    },
    {
      id: "ehan.dongzhuo", cat: "世变", title: "董卓", era: "ehan", years: [189, 192], age: [14, 70], weight: 32, once: true,
      text: [
        "董卓入洛阳，废少帝，立陈留王。纵兵剽掠，谓之「搜牢」。",
        "后焚洛阳，迁长安，宫庙、官府、民居，一炬而尽。",
        "你住在洛阳城外。"
      ],
      options: [
        { text: "随朝廷西迁", hint: "身体 −8；家产折损", effects: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], then: "路上走了二十天，冻死、饿死的人倒在道旁，没人埋。" },
        { text: "东走投曹操", hint: "私兵 +12；武艺 +6", effects: [{ k: "troops", v: 12 }, { k: "martial", v: 6 }, { k: "fame", v: 4 }], then: "曹操在陈留起兵。你去的时候，他正在散家财募兵。" },
        { text: "留在家中守着", hint: "家产尽失；可能死", effects: [{ k: "silver", v: -20 }, { k: "field_wet", v: -6 }], then: "兵来了三次。第三次，你们家的门板也没有了。", gamble: { deathChance: 0.18, cause: "兵祸" } }
      ]
    },

    /* ── 三国 ── */
    {
      id: "sg.yiling", cat: "军功", title: "夷陵", era: "sg", years: [221, 223], age: [16, 50], weight: 30, once: true, sex: "male",
      text: [
        "刘备伐吴，自巫峡连营至夷陵，立数十屯。陆逊按兵不动，诸将皆以为怯。",
        "六月，逊命各持一把茅，以火攻，拔其营。"
      ],
      options: [
        { text: "随陆逊火攻", hint: "武艺 +12；声望 +10", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 10 }], then: "风大火急，四十余营一时俱燃。蜀军自相践踏，尸骸塞江。", gamble: { deathChance: 0.12, cause: "战殁" } },
        { text: "守后方粮道", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }], then: "前方火烧起来时，你在江边押粮。看着天边的红光，一夜没睡。" },
        { text: "躲进山里", hint: "声望 −6；保命", effects: [{ k: "fame", v: -6 }], then: "你在山里躲了七天。出来时，河谷里的水还是红的。" }
      ]
    },
    {
      id: "sg.wuzhang", cat: "世变", title: "五丈原", era: "sg", years: [234, 235], age: [14, 65], weight: 26, once: true,
      text: [
        "诸葛亮出斜谷，屯五丈原，与司马懿相持百余日。",
        "亮数挑战，懿不出。亮遣使送巾帼妇人之服，懿受之，问使者：诸葛公起居何如？",
        "八月，亮卒于军中。"
      ],
      options: [
        { text: "随军屯田，久驻", hint: "银钱 +6；学识 +4", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 4 }], then: "蜀军在渭南分兵屯田，百姓安堵。你学会了种关中的地。" },
        { text: "逃回汉中", hint: "声望 −8", effects: [{ k: "fame", v: -8 }, { k: "body", v: -4 }], then: "撤军那夜，杨仪与魏延争权，互相攻杀。你跟着大部队走，没敢回头看。" },
        { text: "留在关中落户", hint: "田 +10 亩；离开蜀", effects: [{ k: "field_dry", v: 10 }, { k: "fame", v: -4 }], then: "你在渭水边落了户。此后有人问起，你只说自己是关中人。" }
      ]
    },
    {
      id: "sg.shuhan", cat: "世变", title: "蜀亡", era: "sg", years: [263, 264], age: [16, 70], weight: 30, once: true,
      text: [
        "邓艾自阴平道行无人之地七百余里，凿山通道，裹毡推转而下。",
        "诸葛瞻战死于绵竹。后主舆榇自缚，诣军门降。",
        "成都城中，人心惶惶。"
      ],
      options: [
        { text: "随姜维诈降，谋复国", hint: "声望 +12；多半死", effects: [{ k: "fame", v: 12 }, { k: "martial", v: 6 }], then: "钟会谋反，事泄，军中大乱。姜维死时，剖腹，胆大如斗。", gamble: { deathChance: 0.4, cause: "兵变" } },
        { text: "闭门待命", hint: "家产保全", effects: [{ k: "fame", v: 2 }], then: "魏军入城，秋毫无犯。你在门口跪了两个时辰，然后回家吃饭。" },
        { text: "举家东迁", hint: "田产尽弃", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -6 }, { k: "body", v: -6 }], then: "你迁到汉中以东。一路听说蜀人皆愿内徙，三万家同日俱发。" }
      ]
    },
    {
      id: "sg.jindai", cat: "世变", title: "晋代魏", era: "sg", years: [265, 267], age: [16, 70], weight: 22, once: true,
      text: [
        "司马炎受魏禅，改元泰始。魏帝曹奂出居金墉城。",
        "朝中无人异议。",
        "你在魏国做了半辈子官。"
      ],
      options: [
        { text: "随众劝进", hint: "声望 +6；官位保住", effects: [{ k: "fame", v: 6 }, { k: "official", v: 8 }], then: "劝进表上有你的名字。新朝留任，你还是原来的官。" },
        { text: "称病归乡", hint: "声望 +4；仕途止", effects: [{ k: "fame", v: 4 }, { k: "official", v: -10 }], then: "你回了乡里，教几个孩子读书。有人问起魏朝的事，你只说记不清了。" },
        { text: "上书请留魏帝于邺", hint: "声望 +10；可能获罪", effects: [{ k: "fame", v: 10 }, { k: "official", v: -20 }], then: "奏书留中不发。三个月后，你被外放为远郡太守。", gamble: { deathChance: 0.06, cause: "下狱" } }
      ]
    },
    {
      id: "sg.wuwang", cat: "世变", title: "吴亡", era: "sg", years: [279, 281], age: [16, 70], weight: 26, once: true,
      text: [
        "王濬楼船下益州，金陵王气黯然收。",
        "吴主孙皓面缚舆榇，诣军门降。",
        "建业城中的官员，都在等一句话。"
      ],
      options: [
        { text: "降，交印绶", hint: "家产保全；声望 −4", effects: [{ k: "fame", v: -4 }, { k: "silver", v: -4 }], then: "你把官印放在案上，退到阶下。晋将看了你一眼，说：下去吧。" },
        { text: "举兵抗晋", hint: "私兵 +20；很可能死", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 10 }], then: "你据了一个县城，守了十七天。城破时，你的部下开了门。", gamble: { deathChance: 0.35, cause: "兵败" } },
        { text: "携家浮海", hint: "田产尽弃；南下", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }], then: "你上了船，往南走。海上走了七天，到了一个没听说过的地方。" }
      ]
    }
  ]);;
})(window.PACK_BASE);
