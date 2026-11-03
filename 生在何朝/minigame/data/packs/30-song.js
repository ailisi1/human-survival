/* 生在何朝 · 五代至南宋（时段事件 + 各朝大事） */
(function (P) {
  "use strict";

  P.periods.song.events = [
    {
      id: "so.x.keju", cat: "科举", title: "解试", age: [16, 48], weight: 26, once: true,
      when: { minKnowledge: 25 },
      text: [
        "州里举行解试，取中的举子，明年春天到京师应省试。",
        "本州应试者三千，解额二十。"
      ],
      options: [
        { text: "闭门苦读三年再考", hint: "学识 +10；银钱 −8", effects: [{ k: "knowledge", v: 10 }, { k: "silver", v: -8 }], then: "你把《论语》抄了七遍。第四年，你在榜上看到了自己的名字。" },
        { text: "今年就去试", hint: "全凭本事", resolve: "examPass", params: { base: 0.04, perKnowledge: 0.009, cap: 0.5, onPass: ["juren"] }, effects: [{ k: "silver", v: -3 }], then: "" },
        { text: "去州学做斋长", hint: "学识 +4；银钱 +6", effects: [{ k: "knowledge", v: 4 }, { k: "silver", v: 6 }, { k: "fame", v: 4 }], then: "你管着二十个学生的功课。自己的书，反而读得更细了。" }
      ]
    },
    {
      id: "so.x.chaiyi", cat: "官府", title: "差役", age: [20, 58], weight: 18,
      text: [
        "县里按户等派差役。上户充里正、户长，中户充壮丁，下户不服役而纳钱。",
        "你们家今年被定为三等户。"
      ],
      options: [
        { text: "应役，做里正", hint: "赔钱；声望 +8", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 8 }], then: "里正要催税、要捕盗、要接待过路的官。三年做下来，你卖了两亩地。" },
        { text: "纳钱免役", hint: "银钱 −6；免役", effects: [{ k: "silver", v: -6 }], then: "钱交了，名字从役册上划掉。你从此不再去县衙。" },
        { text: "析户降等", hint: "田产分薄；声望 −4", effects: [{ k: "field_wet", v: -3 }, { k: "fame", v: -4 }], then: "你把家分成两户，户等降到四等。族里说你精明，也说你小气。" }
      ]
    },
    {
      id: "so.x.jiaozi", cat: "市井", title: "交子", age: [22, 55], weight: 14, class: ["merchant"],
      text: [
        "蜀中交子，以楮为券，可兑钱，也可携远。",
        "有十六户富商联合发行，谓之交子铺。"
      ],
      options: [
        { text: "入交子铺，出一份本钱", hint: "银钱 −15；日后或大赚", gamble: { winChance: 0.55, win: [{ k: "silver", v: 40 }], lose: [{ k: "silver", v: -18 }], winNote: "交子行于蜀中，你的本钱翻了近三倍。", loseNote: "有几家铺子滥发交子，兑不出来，争讼数年。你赔了不少。" } },
        { text: "只收交子，不发行", hint: "银钱 +6；学得汇兑", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 3 }], then: "你收交子，也兑交子。一张纸从成都到京师，比银子轻得多。" }
      ]
    },
    {
      id: "so.x.shibo", cat: "市井", title: "市舶", age: [22, 58], weight: 16,
      area: ["福建", "广东", "两浙", "浙东", "广南东", "福建路", "两浙路"],
      text: [
        "市舶司招徕海商，抽解之外，还有博买。",
        "有人邀你合伙造一艘船，往三佛齐去。"
      ],
      options: [
        { text: "合伙出海", hint: "银钱 −20；风浪难料", gamble: { winChance: 0.5, win: [{ k: "silver", v: 70 }, { k: "knowledge", v: 6 }], lose: [{ k: "silver", v: -20 }, { k: "body", v: -8 }], winNote: "船回来时，舱里是香料、象牙、珍珠。你一夜之间成了富户。", loseNote: "船在海上遇到风，回来时只剩半船货和一半人。" } },
        { text: "在岸上开牙行", hint: "银钱 +12", effects: [{ k: "silver", v: 12 }, { k: "fame", v: 2 }], then: "你替蕃商找买家，抽一分佣。日子过得不惊不险。" }
      ]
    },
    {
      id: "so.x.washe", cat: "市井", title: "瓦舍", age: [16, 45], weight: 12,
      text: [
        "城里的瓦舍勾栏，说书的、弄傀儡的、踢球的、相扑的，通宵不绝。",
        "有说《五代史》的，说到郭威起兵，满座叫好。"
      ],
      options: [
        { text: "常去听书", hint: "银钱 −2；学识 +3，声望 +2", effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 3 }, { k: "fame", v: 2 }], then: "你听了三年，把《五代史》听熟了一半。后来与人说话，常引其中故事。" },
        { text: "自己下场踢球", hint: "身体 +6；武艺 +3", effects: [{ k: "body", v: 6 }, { k: "martial", v: 3 }], then: "你在球场上跑了一个下午。回家时腿疼得抬不起来。" },
        { text: "不去，浪费钱", hint: "什么也没变", effects: [], then: "你路过瓦舍，听见里面哄笑，站了一会儿，还是走了。" }
      ]
    },
    {
      id: "so.x.shuyuan", cat: "学问", title: "书院", age: [12, 32], weight: 14, once: true,
      when: { minKnowledge: 15 },
      text: [
        "山中有书院，聚徒讲学，不收束脩，只供饭食。",
        "山长是位落第的举人，讲《春秋》讲得极好。"
      ],
      options: [
        { text: "入书院读书", hint: "学识 +12；离家", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 4 }], then: "你在山里读了五年。下山那年，山长送了你一部手抄的《通鉴》。" },
        { text: "不入，在家自学", hint: "学识 +5", effects: [{ k: "knowledge", v: 5 }], then: "你自己抄书，自己批注。有些地方看不懂，就一直空着。" }
      ]
    },
    {
      id: "so.x.baojia", cat: "官府", title: "保甲", age: [18, 50], weight: 12,
      text: [
        "行保甲法：十家为一保，五十家为一大保，十大保为一都保。",
        "每家出丁，农隙习武，夜里有盗则鸣鼓相救。"
      ],
      options: [
        { text: "应充保丁", hint: "武艺 +8；身体 −4", effects: [{ k: "martial", v: 8 }, { k: "body", v: -4 }, { k: "fame", v: 3 }], then: "你们每月聚一次，练弓、练枪。有人认真，有人只是来混饭。" },
        { text: "出钱免充", hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "钱交了。里正把你的名字写在册子后面，写得很小。" }
      ]
    },
    {
      id: "so.x.salt", cat: "市井", title: "盐", age: [22, 58], weight: 12,
      text: [
        "盐由官榷，商人纳钱请引，到指定盐场支盐，再到指定地面发卖。",
        "引价年年涨，私盐年年多。"
      ],
      options: [
        { text: "请引行盐", hint: "银钱 −20；稳中有赚", need: { minSilver: 20 }, effects: [{ k: "silver", v: 34 }, { k: "fame", v: 4 }], then: "你请了三百引，雇船运到上游。官盐贵，但没人敢查你。" },
        { text: "贩私盐", hint: "银钱 +40；一旦被获，徒三年", gamble: { winChance: 0.6, win: [{ k: "silver", v: 40 }], lose: [{ k: "silver", v: -25 }, { k: "body", v: -10 }, { k: "fame", v: -12 }], winNote: "私盐走小路，一夜之间就出了县界。三年下来，你置了两顷田。", loseNote: "巡盐的弓手截住了你的船。货没官，你被打了三十板，罚徒三年，花钱赎了。" } }
      ]
    },
    {
      id: "so.x.hunyin", cat: "家族", title: "论财", age: [16, 26], weight: 16, once: true,
      text: [
        "议亲的时候，两家先谈的不是人品，是妆奁和聘财。",
        "媒人说：如今嫁女，妆奁少了要被人笑。"
      ],
      options: [
        { text: "厚聘厚嫁，撑住体面", hint: "银钱 −25；声望 +10", need: { minSilver: 25 }, effects: [{ k: "silver", v: -25 }, { k: "fame", v: 10 }], then: "成亲那天，抬妆奁的队伍排了半条街。你父亲在门口站着，腰板很直。" },
        { text: "从简", hint: "声望 −4；省钱", effects: [{ k: "fame", v: -4 }, { k: "silver", v: -3 }], then: "两桌酒，一顶轿。有人在背后议论了半年。" },
        { text: "不结这门亲", hint: "什么也没变", effects: [], then: "亲事黄了。第二年，那家的女儿嫁了个盐商。" }
      ]
    },
    {
      id: "so.x.qiaochang", cat: "市井", title: "榷场", age: [22, 58], weight: 12,
      text: [
        "边境榷场，宋人以茶、绢、瓷，易北人之马、皮毛、盐。",
        "近年互市时开时闭，关一次，货就压一手。"
      ],
      options: [
        { text: "走榷场", hint: "银钱 −12；或大赚", gamble: { winChance: 0.58, win: [{ k: "silver", v: 30 }], lose: [{ k: "silver", v: -12 }, { k: "body", v: -4 }], winNote: "你换回二十匹好马。转手卖给军中，赚了一倍。", loseNote: "榷场忽然闭了。你的茶压在手里，发了霉。" } },
        { text: "不去，风险太大", hint: "什么也没变", effects: [], then: "你守着铺子。听说走榷场的人，有的发了，有的再没回来。" }
      ]
    },
    {
      id: "so.x.zhenji", cat: "乡里", title: "赈济", age: [30, 65], weight: 10,
      when: { minSilver: 40 },
      text: [
        "青黄不接，县里请富户出米赈济，平价粜卖，谓之「常平」。",
        "出得多的，朝廷给个官身。"
      ],
      options: [
        { text: "出米二百石", hint: "存粮 −10 石；声望 +16", effects: [{ k: "grain", v: -10 }, { k: "fame", v: 16 }, { k: "official", v: 4 }], then: "你在县前设了粜场。灾民排队，有人在队伍里给你磕头。" },
        { text: "只出五十石", hint: "存粮 −4 石；声望 +6", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 6 }], then: "五十石，救不了多少人，但总比没有好。" },
        { text: "囤粮待涨", hint: "银钱 +20；声望 −12", effects: [{ k: "silver", v: 20 }, { k: "fame", v: -12 }], then: "米价涨了三倍，你卖了。此后县里人提起你，都要加一句：那家囤过粮。" }
      ]
    },

    /* ── 五代十国 ── */
    {
      id: "wudai.yanyun", cat: "世变", title: "燕云", era: "wudai", years: [936, 938], age: [14, 65], weight: 30, once: true,
      text: [
        "石敬瑭借契丹兵灭后唐，事成，割幽、蓟、瀛、莫、涿、檀、顺、新、妫、儒、武、云、应、寰、朔、蔚十六州以酬。",
        "岁输帛三十万匹，称儿皇帝。",
        "你在燕云。"
      ],
      options: [
        { text: "随汉官南迁", hint: "田产尽弃；南下", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }, { k: "body", v: -5 }], then: "你过了白沟河。河那边是中原，河这边从此是别人的地。" },
        { text: "留在燕京，做契丹的官", hint: "官位保住；声望 −10", effects: [{ k: "official", v: 8 }, { k: "fame", v: -10 }], then: "契丹行南北面官，汉人仍用汉法。你在南面官里做了个县尹。" },
        { text: "结寨自守", hint: "私兵 +14；声望 +6", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 6 }], then: "你们守着一个山谷。契丹兵来了两次，都没进来。" }
      ]
    },
    {
      id: "wudai.ruibian", cat: "世变", title: "入汴", era: "wudai", years: [946, 948], age: [14, 70], weight: 26, once: true,
      text: [
        "契丹太宗入汴，改国号大辽。纵胡骑四出，谓之「打草谷」。",
        "中原州县，仓廪一空。",
        "你在汴州城外。"
      ],
      options: [
        { text: "聚众反抗", hint: "私兵 +20；很可能死", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 12 }], then: "你们夜里袭了一个营。第二天，附近的村子被烧了三个。", gamble: { deathChance: 0.24, cause: "兵祸" } },
        { text: "带着家小往南逃", hint: "田产折损；保命", effects: [{ k: "field_wet", v: -10 }, { k: "body", v: -6 }], then: "一路南逃。契丹人北归时，你才敢回来。" },
        { text: "献粮求安", hint: "存粮 −10 石；家宅保全", effects: [{ k: "grain", v: -10 }, { k: "fame", v: -4 }], then: "你牵了两头牛、十石米去营里。那个契丹将官拍了拍你的肩，说了句你听不懂的话。" }
      ]
    },
    {
      id: "wudai.gaoping", cat: "军功", title: "高平", era: "wudai", years: [954, 955], age: [16, 55], weight: 24, once: true, sex: "male",
      text: [
        "北汉与契丹合兵南下，周世宗亲征，战于高平。",
        "甫一接战，樊爱能、何徽引骑兵先遁，步兵数千解甲呼万岁。",
        "世宗亲自督战。"
      ],
      options: [
        { text: "随世宗死战", hint: "武艺 +14；声望 +16", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 16 }], then: "赵匡胤大呼陷阵，士卒皆奋。北汉兵大败，尸横山谷。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "跟着溃兵跑", hint: "声望 −12", effects: [{ k: "fame", v: -12 }], then: "你跑出十里，回头看见中军的大旗还在。你停下来了，但已经晚了。" }
      ]
    },
    {
      id: "wudai.chenqiao", cat: "世变", title: "陈桥", era: "wudai", years: [960, 961], age: [14, 70], weight: 30, once: true,
      text: [
        "契丹入寇，殿前都点检赵匡胤率军北征，至陈桥驿，将士哗变，以黄袍加其身。",
        "回师汴京，周恭帝禅位。",
        "你在军中，或在城中。"
      ],
      options: [
        { text: "拥立，从龙", hint: "官位有望；声望 +10", effects: [{ k: "fame", v: 10 }, { k: "official", v: 10 }, { k: "troops", v: 8 }], then: "你跪在驿门口，喊了一声万岁。此后论功，你得了个小使臣。" },
        { text: "守着旧主", hint: "声望 +6；仕途止", effects: [{ k: "fame", v: 6 }, { k: "official", v: -6 }], then: "你把周室的印交了上去。新朝没有为难你，只是不再用你。" },
        { text: "回家种地", hint: "什么也没变", effects: [], then: "兵变了，朝廷换了姓，你的田还是那几亩。" }
      ]
    },

    /* ── 辽 ── */
    {
      id: "liao.chanyuan", cat: "世变", title: "澶渊", era: "liao", years: [1004, 1005], age: [14, 65], weight: 30, once: true,
      text: [
        "萧太后与圣宗亲率大军南下，攻瀛州、祁州，直抵澶州。",
        "宋真宗渡河，登北城门楼，宋军呼万岁，声闻数十里。",
        "辽军前锋萧挞凛中伏弩死。"
      ],
      options: [
        { text: "在军中，力主再战", hint: "武艺 +8；声望 +6", effects: [{ k: "martial", v: 8 }, { k: "fame", v: 6 }], then: "太后没有听。和议成，宋岁输银十万两、绢二十万匹。你分到两匹绢。" },
        { text: "随军北归", hint: "身体 −6；银钱 +3", effects: [{ k: "body", v: -6 }, { k: "silver", v: 3 }], then: "回程比来时慢。一路上埋了不少人，都是自己人。" },
        { text: "留居汉地", hint: "田 +10 亩；离乡", effects: [{ k: "field_dry", v: 10 }, { k: "fame", v: -4 }], then: "你在宋地落了户。契丹话渐渐忘了，只在数羊的时候还会冒出一两句。" }
      ]
    },
    {
      id: "liao.chuhedian", cat: "世变", title: "出河店", era: "liao", years: [1114, 1116], age: [14, 65], weight: 30, once: true,
      text: [
        "完颜阿骨打起兵，以二千五百人破辽军于出河店。会大风起，尘埃蔽天，女真乘之，辽军大溃。",
        "辽人尝言：女真兵满万，则不可敌。至是始满万。"
      ],
      options: [
        { text: "从女真", hint: "私兵 +18；武艺 +10", effects: [{ k: "troops", v: 18 }, { k: "martial", v: 10 }], then: "女真的兵不多，但敢死。你跟着他们追了三百里。" },
        { text: "随辽军北撤", hint: "身体 −8；声望 −4", effects: [{ k: "body", v: -8 }, { k: "fame", v: -4 }], then: "一路上都是溃兵和丢弃的甲。你捡了一副好甲，后来卖了。" },
        { text: "躲进深山", hint: "存粮 −6 石", effects: [{ k: "grain", v: -6 }, { k: "body", v: -4 }], then: "山里冷。你们烧了两间空屋取暖，屋主早就跑了。" }
      ]
    },

    /* ── 北宋 ── */
    {
      id: "bsong.haoshuichuan", cat: "军功", title: "好水川", era: "bsong", years: [1041, 1042], age: [16, 55], weight: 26, once: true, sex: "male",
      text: [
        "宋军分道攻西夏，任福率军至好水川，粮尽，探路者回报：前面有夏军。",
        "山谷里忽然竖起夏军的大旗，伏兵四起。"
      ],
      options: [
        { text: "死战突围", hint: "武艺 +12；多半死", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 10 }], then: "任福身中十余箭，仍力战而死。你在他身边，没能冲出去。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "投降夏军", hint: "声望 −16；保命", effects: [{ k: "fame", v: -16 }, { k: "body", v: -4 }], then: "夏人没有杀降。你在西夏的营里种了三年地，后来悄悄跑回来。" },
        { text: "装死，夜里爬走", hint: "身体 −12；声望 +2", effects: [{ k: "body", v: -12 }, { k: "fame", v: 2 }], then: "你在尸堆里躺了一夜。天亮后，你爬出来，走了七天回到宋境。" }
      ]
    },
    {
      id: "bsong.fangla", cat: "世变", title: "花石纲", era: "bsong", years: [1119, 1122], age: [14, 65], weight: 24, once: true,
      text: [
        "朝廷设应奉局于苏州，搜求奇花异石，谓之花石纲。民家一石一木稍堪玩，即领健卒直入其家，用黄封表识。",
        "方腊起于睦州，以诛朱勔为名，东南大震。"
      ],
      options: [
        { text: "从方腊", hint: "私兵 +22；声望 −8", effects: [{ k: "troops", v: 22 }, { k: "fame", v: -8 }], then: "义军破了六州五十二县。你把家里的石头砸了，砸得很痛快。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "举家避入山中", hint: "田产折损；保命", effects: [{ k: "field_wet", v: -8 }, { k: "body", v: -4 }], then: "山里躲了半年。回来时，家里的石头被搬走了，房子还在。" },
        { text: "向应奉局献石求官", hint: "官位 +；声望 −14", effects: [{ k: "official", v: 8 }, { k: "fame", v: -14 }, { k: "silver", v: 10 }], then: "你献了一块太湖石，得了个差遣。乡里人从此不与你说话。" }
      ]
    },
    {
      id: "bsong.jingkang", cat: "世变", title: "靖康", era: "bsong", years: [1126, 1128], age: [14, 70], weight: 40, once: true,
      text: [
        "金兵破汴京，索金一千万锭、银二千万锭、帛一千万匹。府库空，乃括民财，括至倡优、僧道。",
        "二帝北狩，宗室、后妃、工匠、伎艺，尽驱而北。",
        "你在城中。"
      ],
      options: [
        { text: "随驾北迁", hint: "身体 −16；声望 +6", effects: [{ k: "body", v: -16 }, { k: "fame", v: 6 }], then: "北去的路上，冻死、饿死的人倒了一路。你活到了燕京，再没回来。", gamble: { deathChance: 0.24, cause: "道死" } },
        { text: "逃出城，南渡", hint: "田产尽弃；保命", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "body", v: -8 }], then: "你混在难民里出了城。回头时，汴京城头的火还没灭。" },
        { text: "留在城中，护着家", hint: "家产尽失；可能死", effects: [{ k: "silver", v: -30 }, { k: "body", v: -10 }], then: "金兵搜了七次。最后一次，连锅都拿走了。", gamble: { deathChance: 0.16, cause: "兵祸" } }
      ]
    },

    /* ── 西夏 ── */
    {
      id: "xxia.haoshuichuan", cat: "军功", title: "设伏", era: "xxia", years: [1041, 1042], age: [16, 55], weight: 24, once: true,
      text: [
        "宋军深入，夏军佯败，诱之至好水川。",
        "山谷中伏兵四起，宋军大败。"
      ],
      options: [
        { text: "在伏兵中", hint: "武艺 +12；赏赐", effects: [{ k: "martial", v: 12 }, { k: "silver", v: 8 }, { k: "fame", v: 8 }], then: "你在山上推石头。宋军挤在谷底，退不出去。" },
        { text: "在后方放牧", hint: "身体 +3", effects: [{ k: "body", v: 3 }], then: "你在远处看着烟尘。晚上，部落里分肉，你也分到一块。" }
      ]
    },
    {
      id: "xxia.menggu", cat: "世变", title: "围城", era: "xxia", years: [1209, 1227], age: [14, 70], weight: 34, once: true,
      text: [
        "蒙古兵围中兴府，引黄河水灌城。堤决，水反灌其营。",
        "城中粮尽，人相食。末帝出降。",
        "你在城中。"
      ],
      options: [
        { text: "守城到最后", hint: "身体 −20；声望 +14", effects: [{ k: "body", v: -20 }, { k: "fame", v: 14 }], then: "城破那天，蒙古兵屠城。你死在自家门口，手里还握着一把断刀。", gamble: { deathChance: 0.5, cause: "屠城" } },
        { text: "趁夜出城逃往西边", hint: "田产尽弃；保命", effects: [{ k: "field_wet", v: -10 }, { k: "body", v: -10 }], then: "你往西走，走到沙州。那里也快守不住了。" },
        { text: "降蒙古", hint: "声望 −18；保命", effects: [{ k: "fame", v: -18 }, { k: "body", v: -4 }], then: "你跪在营门外。蒙古将官看了你一眼，让人把你编进了工匠营。" }
      ]
    },

    /* ── 金 ── */
    {
      id: "jin.yehu", cat: "世变", title: "野狐岭", era: "jin", years: [1211, 1212], age: [14, 65], weight: 34, once: true,
      text: [
        "成吉思汗率蒙古军南下，金以四十万拒于野狐岭。",
        "木华黎率敢死士冲其中军，金军大溃，死者蔽野。",
        "此战之后，金之精锐尽失。"
      ],
      options: [
        { text: "在败军中逃生", hint: "身体 −14；声望 −4", effects: [{ k: "body", v: -14 }, { k: "fame", v: -4 }], then: "你跑了三天，跑回居庸关。关上的兵不让你进，说怕你是蒙古的探子。" },
        { text: "降蒙古", hint: "私兵 +10；声望 −14", effects: [{ k: "troops", v: 10 }, { k: "fame", v: -14 }], then: "蒙古人收降卒，编为汉军。你换了旗号，跟着往回打。" },
        { text: "死战", hint: "武艺 +10；声望 +14", effects: [{ k: "martial", v: 10 }, { k: "fame", v: 14 }], then: "你战到刀断了，用拳头。后来有人把你抬回去，说你是疯子。", gamble: { deathChance: 0.34, cause: "战殁" } }
      ]
    },
    {
      id: "jin.nanqian", cat: "世变", title: "南迁", era: "jin", years: [1214, 1216], age: [14, 70], weight: 26, once: true,
      text: [
        "宣宗决意南迁汴京。太学生上书谏，谓「宗庙社稷在此，奈何弃之」。",
        "不从。河北人心由是瓦解。",
        "你在中都。"
      ],
      options: [
        { text: "随驾南迁", hint: "身体 −6；家产折损", effects: [{ k: "body", v: -6 }, { k: "silver", v: -8 }], then: "车驾南去那天，中都的城门没关。留下的人站在街边，谁也不说话。" },
        { text: "留中都守家", hint: "风险极大；声望 +10", effects: [{ k: "fame", v: 10 }, { k: "silver", v: -6 }], then: "第二年，蒙古兵围中都。守了十个月，城破。", gamble: { deathChance: 0.3, cause: "城破" } },
        { text: "投河北义军", hint: "私兵 +16；武艺 +6", effects: [{ k: "troops", v: 16 }, { k: "martial", v: 6 }], then: "河北的义军各自结寨，谁也不服谁。你今天跟这家，明天跟那家。" }
      ]
    },
    {
      id: "jin.caizhou", cat: "世变", title: "蔡州", era: "jin", years: [1233, 1235], age: [14, 65], weight: 30, once: true,
      text: [
        "宋蒙联军围蔡州。城中粮尽，鞍靴甲革皆煮食。",
        "哀宗传位于承麟，自缢于幽兰轩。城破，承麟死于乱军。",
        "金亡。"
      ],
      options: [
        { text: "随哀宗死", hint: "声望 +16；必死", kill: "self", cause: "国亡", then: "你在幽兰轩外守到最后一刻。火起来的时候，你没有走。" },
        { text: "突围西走", hint: "身体 −16；保命", effects: [{ k: "body", v: -16 }, { k: "fame", v: 4 }], then: "你带着十几个人往西跑。跑到息州，才知道皇帝已经死了。", gamble: { deathChance: 0.2, cause: "追兵" } },
        { text: "降宋", hint: "声望 −12；保命", effects: [{ k: "fame", v: -12 }], then: "宋将收了你。后来你被编进宋军，调去守淮河。" }
      ]
    },

    /* ── 南宋 ── */
    {
      id: "nsong.yancheng", cat: "军功", title: "郾城", era: "nsong", years: [1140, 1141], age: [16, 55], weight: 30, once: true, sex: "male",
      text: [
        "岳飞北伐，大破金兀术于郾城。金以拐子马、铁浮图冲击，岳家军以麻札刀入阵，斫马足。",
        "将士皆曰：直抵黄龙府，与诸君痛饮。",
        "十二道金牌至。"
      ],
      options: [
        { text: "随军继续北进", hint: "武艺 +14；声望 +16", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 16 }, { k: "troops", v: 12 }], then: "大军已至朱仙镇。诏书一到，岳飞泣下：十年之力，废于一旦。", gamble: { deathChance: 0.14, cause: "战殁" } },
        { text: "留驻原地", hint: "身体 −4", effects: [{ k: "body", v: -4 }, { k: "fame", v: 2 }], then: "撤军那天，百姓拦在马前哭。你把一个孩子抱上马，后来他一直跟着你。" },
        { text: "转投张俊", hint: "声望 −10；官位 +", effects: [{ k: "fame", v: -10 }, { k: "official", v: 8 }], then: "张俊的军里，论功行赏更实在。岳飞下狱时，你没有说话。" }
      ]
    },
    {
      id: "nsong.caishi", cat: "世变", title: "采石", era: "nsong", years: [1161, 1162], age: [16, 60], weight: 24, once: true,
      text: [
        "金主亮南侵，兵至采石，欲渡江。宋军无主，散在江岸。",
        "虞允文至，召诸将，激以忠义，遂整军迎战。",
        "宋军以海鳅船冲金舟，金军大败。"
      ],
      options: [
        { text: "随虞允文死战", hint: "武艺 +12；声望 +16", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 16 }], then: "江上火光冲天。金舟不退，宋船直撞，水花溅起几丈高。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "在岸上守烽火", hint: "声望 +4", effects: [{ k: "fame", v: 4 }], then: "你一夜点了七次烽。天亮时，江面上漂着金军的旗。" },
        { text: "逃回临安", hint: "声望 −14", effects: [{ k: "fame", v: -14 }], then: "你跑回临安，说前方败了。三天后捷报到了，你被打了二十板。" }
      ]
    },
    {
      id: "nsong.xiangfan", cat: "世变", title: "襄阳", era: "nsong", years: [1268, 1274], age: [14, 70], weight: 30, once: true,
      text: [
        "蒙古围襄阳六年。城中拆屋为薪，缉麻为衣，撤屋为薪，人多饿死。",
        "吕文焕以城降。",
        "长江门户，从此洞开。"
      ],
      options: [
        { text: "守城到底", hint: "身体 −18；声望 +14", effects: [{ k: "body", v: -18 }, { k: "fame", v: 14 }], then: "六年里你吃过皮甲、煮过弓弦。城破那天，你坐在城头没走。", gamble: { deathChance: 0.34, cause: "城破" } },
        { text: "随吕文焕降", hint: "声望 −16；保命", effects: [{ k: "fame", v: -16 }], then: "吕文焕开城。蒙古人没有屠城，但把军器、粮秣全部收走。" },
        { text: "趁乱沿江而下", hint: "田产尽弃；南下", effects: [{ k: "field_wet", v: -10 }, { k: "body", v: -8 }], then: "你上了条小船，顺流而下。江面上到处是逃难的船。" }
      ]
    },
    {
      id: "nsong.yashan", cat: "世变", title: "崖山", era: "nsong", years: [1278, 1280], age: [14, 70], weight: 30, once: true,
      text: [
        "宋军结大舸千余，碇于海中，一字阵。元军以火攻，不克，乃断其汲道。",
        "宋军大败。陆秀夫负帝昺投海，从死者十余万。",
        "七日之后，海上浮尸十万。"
      ],
      options: [
        { text: "随陆秀夫投海", hint: "声望 +20；必死", kill: "self", cause: "蹈海", then: "你把妻子儿女推下海，然后自己走进去。水很凉，很快就不凉了。" },
        { text: "力战至死", hint: "武艺 +10；声望 +16", effects: [{ k: "martial", v: 10 }, { k: "fame", v: 16 }], then: "你砍断了三把刀。最后一把断了的时候，你被人从背后刺穿。", gamble: { deathChance: 0.5, cause: "战殁" } },
        { text: "降元", hint: "声望 −20；保命", effects: [{ k: "fame", v: -20 }, { k: "body", v: -6 }], then: "你被编入元军。此后三十年，你没有再提过自己是宋人。" }
      ]
    }
  ];
})(window.PACK_BASE);
