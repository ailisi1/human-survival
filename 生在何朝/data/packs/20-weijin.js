/* 生在何朝 · 魏晋至唐（时段事件 + 各朝大事） */
(function (P) {
  "use strict";

  /* ══════════ 魏晋南北朝 ══════════ */
  P.periods.weijin.events = (P.periods.weijin.events || []).concat([
    {
      id: "wj.x.pin", cat: "官府", title: "定品", age: [18, 45], weight: 22, once: true,
      text: [
        "州中正到了县里，要品第人物，定为九品，以付尚书选用。",
        "中正翻着谱牒，问你祖父做过什么官。"
      ],
      options: [
        { text: "报上祖上官阀", hint: "声望 +8；得品在上", need: { minKnowledge: 15 }, effects: [{ k: "fame", v: 8 }, { k: "official", v: 10 }], then: "中正点了点头，写下「二品」。你的名字进了簿子，可以候选。" },
        { text: "送钱求品", hint: "银钱 −15；得品在中", effects: [{ k: "silver", v: -15 }, { k: "official", v: 6 }], then: "钱装在食盒底下。中正看也没看，收下了。" },
        { text: "自陈才行，不求品第", hint: "声望 +4；入仕无门", effects: [{ k: "fame", v: 4 }], then: "中正说：才具是好的，可惜门户低了些。上品无寒门，这不是一句空话。" }
      ]
    },
    {
      id: "wj.x.marriage", cat: "家族", title: "门第", age: [16, 26], weight: 26, once: true,
      when: { flagHas: ["married"] },
      text: [
        "族中长辈说，你娶（嫁）的这户人家，门户不对。",
        "高门与寒门通婚，士林要笑话三代。"
      ],
      options: [
        { text: "认了，日子照过", hint: "声望 −6；夫妻和睦", effects: [{ k: "fame", v: -6 }, { k: "body", v: 3 }], then: "族里议论了几年，渐渐也不说了。你妻子从不在人前多话。" },
        { text: "离了，另娶高门", hint: "声望 +10；银钱 −20", need: { minSilver: 20 }, effects: [{ k: "fame", v: 10 }, { k: "silver", v: -20 }], then: "高门之女进门那天，宾客满堂。你没敢去看旧人的去处。" },
        { text: "搬出去，另立门户", hint: "声望 −10；田产分薄", effects: [{ k: "fame", v: -10 }, { k: "field_wet", v: -4 }], then: "你在城外买了两间屋。族谱上把你的名字写在边上，写得很小。" }
      ]
    },
    {
      id: "wj.x.buqu", cat: "家业", title: "投靠", age: [18, 50], weight: 16,
      class: ["tenant", "farmer", "base"],
      text: [
        "连年兵乱，赋役压得人喘不过气。邻村有人把田献给豪家，自己做部曲。",
        "做了部曲，就不隶州县，不服官役，但要听主人的。"
      ],
      options: [
        { text: "投到豪家为部曲", hint: "不纳官赋；身不由己", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -4 }, { k: "troops", v: 6 }], then: "你把田契交上去，主人给了你一头牛。此后官差来，你只说是某府的人。" },
        { text: "死守着自家田", hint: "赋役自担；声望 +4", effects: [{ k: "fame", v: 4 }, { k: "silver", v: -5 }], then: "差役每年都来。你卖了两亩地，还清了欠的租调。" }
      ]
    },
    {
      id: "wj.x.monk", cat: "方外", title: "出家", age: [12, 36], weight: 14, once: true,
      text: [
        "寺里来化缘，说度一人为僧，可免一门之役。",
        "母亲不愿意，父亲在算账。"
      ],
      options: [
        { text: "出家为僧", hint: "免役；学识 +8，声望 +4", effects: [{ k: "knowledge", v: 8 }, { k: "fame", v: 4 }, { k: "body", v: 2 }], then: "剃度那天，头发落在地上，你忽然觉得很轻。" },
        { text: "不出家，在家诵经", hint: "学识 +3；身体 +2", effects: [{ k: "knowledge", v: 3 }, { k: "body", v: 2 }], then: "你在家里供了一尊像，每日烧香。日子还是那样过。" }
      ]
    },
    {
      id: "wj.x.qingtan", cat: "学问", title: "清谈", age: [18, 45], weight: 14,
      when: { minKnowledge: 25 },
      text: [
        "几位名士在寺里清谈，执麈尾，辨「有无」「言意」。",
        "有人指名问你：圣人有情乎？"
      ],
      options: [
        { text: "答「圣人无情」", hint: "声望 +10；得罪一派人", effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 5 }], then: "满座默然，继而抚掌。当夜你的名字传遍了江左。" },
        { text: "答「圣人有情，但不累于情」", hint: "声望 +8；两不得罪", effects: [{ k: "fame", v: 8 }, { k: "knowledge", v: 3 }], then: "有人说你圆滑，也有人说你解得最好。" },
        { text: "不答，只坐着听", hint: "学识 +2", effects: [{ k: "knowledge", v: 2 }], then: "你听了两个时辰。散场时，麈尾上的毛落了一地。" }
      ]
    },
    {
      id: "wj.x.beizhen", cat: "军功", title: "北镇", age: [16, 45], weight: 14, sex: "male",
      text: [
        "北边六镇，镇兵世袭，守边陲，御柔然。",
        "镇上苦寒，粮饷常缺，而洛阳的贵人正在修寺造像。"
      ],
      options: [
        { text: "应募为镇兵", hint: "武艺 +10；身体 −6，声望 −2", effects: [{ k: "martial", v: 10 }, { k: "body", v: -6 }, { k: "fame", v: -2 }], then: "你在镇上守了五年。风把脸吹得像砂纸，朝廷的赏赐一次也没到。" },
        { text: "逃回内地", hint: "声望 −6；身体 −4", effects: [{ k: "fame", v: -6 }, { k: "body", v: -4 }], then: "你逃了。镇将派人追了三天，没追上。" }
      ]
    },
    {
      id: "wj.x.tujie", cat: "官府", title: "土断", age: [16, 60], weight: 12, once: true,
      text: [
        "朝廷行土断：侨置郡县的流民，一律以现居地为籍，编入当地。",
        "你家是侨户，籍在北方一个已经不存在的郡。"
      ],
      options: [
        { text: "就地落籍", hint: "赋役始及；田 +6 亩", effects: [{ k: "field_dry", v: 6 }, { k: "silver", v: -4 }], then: "你成了本地人。赋役从此有了着落，也有了名分。" },
        { text: "隐匿人口，不入新籍", hint: "银钱 +4；一旦被查，罚", gamble: { winChance: 0.6, win: [{ k: "silver", v: 8 }], lose: [{ k: "silver", v: -10 }, { k: "fame", v: -8 }], winNote: "你把两个弟弟藏在山里，籍上少了两人。查了三年，过去了。", loseNote: "被搜出隐口，一家罚钱，里正挨了板子。" } },
        { text: "投到士族门下为客", hint: "免赋；声望 −4", effects: [{ k: "fame", v: -4 }, { k: "silver", v: 3 }], then: "你挂在王家名下，不入县籍。县里的差役从此不来找你。" }
      ]
    },
    {
      id: "wj.x.wubao", cat: "世变", title: "坞堡", age: [18, 58], weight: 12,
      text: [
        "兵乱日甚，县里的城墙塌了一段，没人修。",
        "族老说：不如在村后山上筑个坞，有事就躲进去。"
      ],
      options: [
        { text: "出钱出力筑坞", hint: "银钱 −12；私兵 +14，声望 +8", effects: [{ k: "silver", v: -12 }, { k: "troops", v: 14 }, { k: "fame", v: 8 }], then: "坞筑成了，能容三百人。此后十年，附近的人都说你们村打不下来。" },
        { text: "不筑，听天由命", hint: "什么也没变", effects: [], then: "第二年兵过境，村里死了四十多口。" }
      ]
    },
    {
      id: "wj.x.wutian", cat: "家业", title: "授田", age: [20, 45], weight: 12,
      class: ["farmer", "tenant"],
      text: [
        "官府行均田：男夫十五以上，受露田四十亩、桑田二十亩。",
        "但村里的好地，早被大姓占了。"
      ],
      options: [
        { text: "领受荒田，自己开垦", hint: "田 +15 亩；身体 −6", effects: [{ k: "field_dry", v: 15 }, { k: "body", v: -6 }], then: "荒田里长满了荆条。你烧了三天，手上全是泡。" },
        { text: "给大姓做佃，租其田", hint: "银钱 +3；田 0", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -2 }], then: "租子五五分成。你种了三十亩，收的粮只够半年。" }
      ]
    },
    {
      id: "wj.x.temple", cat: "乡里", title: "造像", age: [25, 65], weight: 10,
      text: [
        "寺里募钱造像，说捐得多，名字刻在碑上，功德无量。",
        "村长已经捐了五两。"
      ],
      options: [
        { text: "捐五两，刻名", hint: "银钱 −5；声望 +8", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 8 }], then: "你的名字刻在碑的第三行。一千年后，那块碑还在。" },
        { text: "捐一斗米", hint: "存粮 −1 石；声望 +2", effects: [{ k: "grain", v: -1 }, { k: "fame", v: 2 }], then: "僧人合十道谢。你没好意思看碑。" }
      ]
    },

    /* ── 西晋 ── */
    {
      id: "wjin.bawang", cat: "世变", title: "八王", era: "wjin", years: [291, 306], age: [14, 65], weight: 34, once: true,
      text: [
        "赵王伦废惠帝自立，齐王冏、成都王颖、河间王颙举兵讨之。此后诸王迭相攻伐。",
        "洛阳城门，一月三易其主。",
        "你在城中。"
      ],
      options: [
        { text: "投成都王颖", hint: "私兵 +18；武艺 +6", effects: [{ k: "troops", v: 18 }, { k: "martial", v: 6 }], then: "邺城的兵最多。你在营里待了两年，见过四次易帅。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "闭门守家", hint: "家产折损；保命", effects: [{ k: "silver", v: -10 }, { k: "body", v: -4 }], then: "你把门堵死，从后墙出入。粮食吃完了，就吃城里的树皮。" },
        { text: "携家南渡", hint: "田产尽弃；南下", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -10 }, { k: "body", v: -6 }], then: "你过了江。江那边的人说话你听不懂，但天是蓝的。" }
      ]
    },
    {
      id: "wjin.liumin", cat: "世变", title: "流民", era: "wjin", years: [297, 306], age: [14, 60], weight: 22,
      text: [
        "关西大饥，流民入蜀者十余万口。朝廷令还乡，而路上无粮。",
        "李特兄弟在绵竹结营，赈济流民。"
      ],
      options: [
        { text: "随流民入蜀", hint: "身体 −8；田 0", effects: [{ k: "body", v: -8 }], then: "你们在绵竹搭了棚。李特给人分粮，也分刀。" },
        { text: "留在关中", hint: "存粮 −6 石", effects: [{ k: "grain", v: -6 }, { k: "fame", v: 2 }], then: "你留了下来。邻居走了大半，空屋没人住，你搬进了最大的一间。" }
      ]
    },
    {
      id: "wjin.yongjia", cat: "世变", title: "永嘉", era: "wjin", years: [311, 316], age: [14, 70], weight: 40, once: true,
      text: [
        "刘曜、石勒陷洛阳，百官士民死者三万余人，宫庙官府焚毁殆尽。",
        "怀帝被俘，押往平阳，令着青衣行酒。",
        "消息传到你们县。"
      ],
      options: [
        { text: "随宗室南渡", hint: "田产尽弃；保命", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "body", v: -6 }], then: "几百口人一起过江。船不够，有人抱着木板游过去，也有人没游过去。" },
        { text: "结坞自守", hint: "私兵 +20；声望 +8", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 8 }, { k: "body", v: -6 }], then: "你们的坞守了三年。胡骑来了七次，最后一次没有再来。" },
        { text: "降胡，求活", hint: "声望 −14；保命", effects: [{ k: "fame", v: -14 }, { k: "silver", v: 4 }], then: "你在胡将马前跪下。他让你做了个乡吏，管收粮。乡里人背后骂你。" }
      ]
    },

    /* ── 东晋十六国 ── */
    {
      id: "ejin.zuti", cat: "军功", title: "击楫", era: "ejin", years: [317, 321], age: [16, 55], weight: 26, once: true,
      text: [
        "祖逖渡江，中流击楫而誓：祖逖不能清中原而复济者，有如大江。",
        "他在淮阴冶铸兵器，募兵二千。",
        "你要不要跟？"
      ],
      options: [
        { text: "跟祖逖北伐", hint: "武艺 +12；声望 +12", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 12 }, { k: "troops", v: 10 }], then: "黄河以南，一度尽为晋有。祖逖死后，你守的那个县，又丢了。", gamble: { deathChance: 0.14, cause: "战殁" } },
        { text: "留在江南种田", hint: "田 +8 亩；安稳", effects: [{ k: "field_wet", v: 8 }, { k: "fame", v: 2 }], then: "你开了八亩湖田。有人说你没志气，你说：我只要吃饱。" }
      ]
    },
    {
      id: "ejin.feishui", cat: "世变", title: "淝水", era: "ejin", years: [383, 384], age: [16, 60], weight: 40, once: true,
      text: [
        "苻坚发兵九十万，号称百万，南下伐晋。",
        "晋以谢玄率北府兵八万拒之。",
        "两军夹淝水而阵。秦军后撤，让晋军渡河。"
      ],
      options: [
        { text: "在北府兵中，随谢玄冲阵", hint: "武艺 +14；声望 +16", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 16 }, { k: "troops", v: 12 }], then: "秦军一退不可止。你们追了三十里，缴获的辎重堆成了山。", gamble: { deathChance: 0.12, cause: "战殁" } },
        { text: "在秦军中，趁乱逃", hint: "身体 −8；声望 −6", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], then: "风声鹤唳，草木皆兵。你跑了一夜，鞋都跑丢了一只。" },
        { text: "在后方运粮", hint: "银钱 +5", effects: [{ k: "silver", v: 5 }, { k: "body", v: -3 }], then: "你押的粮，最后没送到前线。前方已经胜了。" }
      ]
    },
    {
      id: "ejin.sunen", cat: "世变", title: "孙恩", era: "ejin", years: [399, 402], age: [14, 60], weight: 24,
      text: [
        "孙恩自海岛起兵，以天师道聚众，旬日之中，众数十万。",
        "八郡响应，烧官府，杀长吏。",
        "你们县也有人在传符水。"
      ],
      options: [
        { text: "入其众", hint: "私兵 +16；声望 −8", effects: [{ k: "troops", v: 16 }, { k: "fame", v: -8 }, { k: "body", v: 3 }], then: "他们不惧死，说战死者成仙。你跟着攻了三个县。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "举家入城避难", hint: "银钱 −6；保命", effects: [{ k: "silver", v: -6 }], then: "城里挤满了人。米价涨了十倍，你把首饰都卖了。" },
        { text: "结乡勇自卫", hint: "武艺 +6；声望 +8", effects: [{ k: "martial", v: 6 }, { k: "fame", v: 8 }, { k: "troops", v: 8 }], then: "你们守住了一个渡口。孙恩的人没能过河。" }
      ]
    },
    {
      id: "ejin.huanxuan", cat: "世变", title: "桓玄", era: "ejin", years: [402, 405], age: [16, 65], weight: 20,
      text: [
        "桓玄入建康，废安帝，自立为帝，国号楚。",
        "刘裕起兵于京口，传檄讨之。"
      ],
      options: [
        { text: "投刘裕", hint: "武艺 +8；声望 +8", effects: [{ k: "martial", v: 8 }, { k: "fame", v: 8 }], then: "刘裕的兵不多，但很能打。你跟着他进了建康，看见桓玄的船停在江边，挂满了旗。" },
        { text: "观望", hint: "什么也没变", effects: [], then: "桓玄只做了半年皇帝就败了。你在家里等了半年，什么也没等到。" }
      ]
    },

    /* ── 南北朝 ── */
    {
      id: "ns.beifa", cat: "军功", title: "元嘉北伐", era: "ns", years: [450, 451], age: [16, 55], weight: 30, once: true,
      text: [
        "宋文帝遣王玄谟北伐，围滑台。军中多用大舸，欲以舟师取河南。",
        "围城二百余日，不下。魏太武帝亲率大军南下。"
      ],
      options: [
        { text: "在围城中", hint: "身体 −10；武艺 +8", effects: [{ k: "body", v: -10 }, { k: "martial", v: 8 }], then: "夜里魏军来了。宋军溃散，你在河里泡了一夜，抓着马尾巴过的河。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "随军运粮", hint: "银钱 +4", effects: [{ k: "silver", v: 4 }], then: "粮车走到半路，前方已经败了。你把粮卖了，赚了一笔。" },
        { text: "留在家中", hint: "魏军至江北，损失难料", effects: [{ k: "silver", v: -8 }, { k: "body", v: -4 }], then: "魏军到了长江北岸，声言渡江。建康戒严，你在城里关了三个月。" }
      ]
    },
    {
      id: "ns.liuzhen", cat: "世变", title: "六镇", era: "ns", years: [523, 526], age: [14, 60], weight: 28, once: true,
      text: [
        "六镇兵民起事，破六韩拔陵称王。镇将或被逐，或被杀。",
        "这些人守边几十年，朝廷迁都洛阳后，把他们忘在了塞上。"
      ],
      options: [
        { text: "从镇兵起事", hint: "私兵 +24；武艺 +10", effects: [{ k: "troops", v: 24 }, { k: "martial", v: 10 }, { k: "fame", v: -4 }], then: "你们攻下了武川镇。打开粮仓那天，有人哭了。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "南逃洛阳", hint: "身体 −8；田产尽弃", effects: [{ k: "body", v: -8 }, { k: "field_dry", v: -6 }], then: "你到了洛阳，才知道这里的人把你们叫「北人」，说话都带着轻蔑。" },
        { text: "降尔朱荣", hint: "武艺 +6；声望 +2", effects: [{ k: "martial", v: 6 }, { k: "fame", v: 2 }], then: "尔朱荣把降众收编。后来他在河阴杀了两千朝臣，你就在旁边站着。" }
      ]
    },
    {
      id: "ns.houjing", cat: "世变", title: "侯景", era: "ns", years: [548, 552], age: [14, 70], weight: 34, once: true,
      text: [
        "侯景围台城，百三十日。城中粮尽，人相食，死者十八九。",
        "梁武帝饿死净居殿。",
        "你在城中，或在城外。"
      ],
      options: [
        { text: "在城中守", hint: "身体 −18；声望 +12", effects: [{ k: "body", v: -18 }, { k: "fame", v: 12 }], then: "你吃过皮带、树皮、老鼠。城破那天，你已经站不起来了。", gamble: { deathChance: 0.3, cause: "饥疫" } },
        { text: "在城外从侯景", hint: "私兵 +20；声望 −12", effects: [{ k: "troops", v: 20 }, { k: "fame", v: -12 }], then: "你跟着侯景的兵进了城。抢了三家，分到一匹绢。" },
        { text: "逃往岭南", hint: "田产尽弃；保命", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "body", v: -6 }], then: "你往南走了两个月。江南千里绝烟，路上见不到活人。" }
      ]
    },
    {
      id: "ns.miefo", cat: "世变", title: "灭佛", era: "ns", years: [574, 578], age: [14, 70], weight: 22, once: true,
      text: [
        "周武帝下诏：断佛、道二教，经像悉毁，沙门道士并令还俗。",
        "寺产入官，充作军费。僧尼还俗者三百万。",
        "你们村的寺也在名单上。"
      ],
      options: [
        { text: "还俗，领田", hint: "田 +12 亩；学识 −4", effects: [{ k: "field_dry", v: 12 }, { k: "knowledge", v: -4 }], then: "你脱了僧衣，分到十二亩地。多年后你还会在夜里念经，念给自己听。" },
        { text: "藏经像于山中", hint: "学识 +8；一旦被查，罪重", gamble: { winChance: 0.7, win: [{ k: "knowledge", v: 10 }, { k: "fame", v: 6 }], lose: [{ k: "knowledge", v: -6 }, { k: "body", v: -10 }], winNote: "你把三尊像和两箱经卷藏进山洞。乱过之后，寺里重新迎了回去。", loseNote: "被人告发。像被砸了，你被罚做苦役一年。" } },
        { text: "奉命拆寺", hint: "银钱 +10；声望 −10", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -10 }], then: "你亲手把佛像的头敲下来。铜化了，铸成钱。你分到十两。" }
      ]
    },

    /* ── 隋 ── */
    {
      id: "sui.zhengliao", cat: "官府", title: "征辽", era: "sui", years: [611, 614], age: [16, 45], weight: 34, once: true, sex: "male",
      text: [
        "诏发天下兵，会于涿郡，伐高句丽。兵百一十三万，馈运者倍之。",
        "你们县要出五十人，三十辆车。"
      ],
      options: [
        { text: "应征", hint: "身体 −12；武艺 +6", effects: [{ k: "body", v: -12 }, { k: "martial", v: 6 }], then: "辽东城下，尸骸蔽野。你抬过同乡的尸首，抬了三天。", gamble: { deathChance: 0.24, cause: "战殁" } },
        { text: "出钱免役", hint: "银钱 −18", need: { minSilver: 18 }, effects: [{ k: "silver", v: -18 }, { k: "fame", v: -2 }], then: "钱交了。村里去的人，回来不到三成。" },
        { text: "逃亡", hint: "声望 −10；成为逃户", effects: [{ k: "fame", v: -10 }, { k: "body", v: -6 }], then: "你逃进太行山。山里已经有很多人，都是逃役的。" }
      ]
    },
    {
      id: "sui.wagang", cat: "世变", title: "瓦岗", era: "sui", years: [616, 618], age: [14, 55], weight: 28, once: true,
      text: [
        "李密据洛口仓，开仓赈饥，众至数十万。",
        "瓦岗军中，多是逃役的民、散去的兵。"
      ],
      options: [
        { text: "投瓦岗", hint: "私兵 +22；武艺 +8", effects: [{ k: "troops", v: 22 }, { k: "martial", v: 8 }], then: "洛口的粮堆得像山。你第一次吃饱，吃到吐。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "守着家", hint: "存粮 −5 石", effects: [{ k: "grain", v: -5 }, { k: "fame", v: 2 }], then: "乱兵来了三次。第三次，你给了他们两石米，他们把刀收了。" },
        { text: "随李渊起兵", hint: "私兵 +14；声望 +6", need: { minAge: 18 }, effects: [{ k: "troops", v: 14 }, { k: "fame", v: 6 }], then: "太原的兵南下，一路几乎没有抵抗。你进了长安，看见宫门大开。" }
      ]
    },
    {
      id: "sui.jiangdu", cat: "世变", title: "江都", era: "sui", years: [617, 619], age: [14, 70], weight: 24, once: true,
      text: [
        "炀帝幸江都，久不还京。从驾的骁果多是关中人，思乡，人心浮动。",
        "宇文化及等谋反，夜入宫。"
      ],
      options: [
        { text: "随骁果北归", hint: "身体 −8；私兵 +10", effects: [{ k: "body", v: -8 }, { k: "troops", v: 10 }], then: "一路北上，边走边散。到洛阳时，十停只剩三停。" },
        { text: "留在江都", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }], then: "江都换了主人。你在城里开了个小铺子，卖酒。" },
        { text: "南渡江东", hint: "田产尽弃；南下", effects: [{ k: "field_wet", v: -8 }, { k: "body", v: -4 }], then: "你过了江。江南未乱，稻田一片连着一片。" }
      ]
    },

    /* ── 唐 ── */
    {
      id: "tang.anshi", cat: "世变", title: "渔阳", era: "tang", years: [755, 757], age: [14, 65], weight: 40, once: true,
      text: [
        "安禄山反于范阳，以讨杨国忠为名，率十五万众南下。",
        "河北州县，望风而降。旬日之间，东京陷落。",
        "你在河北。"
      ],
      options: [
        { text: "从叛军", hint: "私兵 +22；声望 −12", effects: [{ k: "troops", v: 22 }, { k: "fame", v: -12 }, { k: "martial", v: 6 }], then: "你跟着进了洛阳。宫里的人还没跑完，库里的绢堆到了梁上。" },
        { text: "守城抗贼", hint: "身体 −14；声望 +16", effects: [{ k: "body", v: -14 }, { k: "fame", v: 16 }, { k: "troops", v: 10 }], then: "你们守了四十天。城破时，只剩一百多人。", gamble: { deathChance: 0.22, cause: "兵败" } },
        { text: "举家南逃", hint: "田产尽弃；身体 −8", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "body", v: -8 }], then: "南下的路上，到处是逃难的人。你走了两个月，到了襄阳。" }
      ]
    },
    {
      id: "tang.mawei", cat: "世变", title: "马嵬", era: "tang", years: [756, 757], age: [14, 70], weight: 24, once: true,
      text: [
        "玄宗幸蜀，至马嵬驿，将士饥疲，陈玄礼等杀杨国忠，围驿不散。",
        "帝命力士赐贵妃死。",
        "你在驿外的人群里。"
      ],
      options: [
        { text: "随军护驾入蜀", hint: "武艺 +6；声望 +4", effects: [{ k: "martial", v: 6 }, { k: "fame", v: 4 }], then: "蜀道难，走了四十天。到成都时，随行的兵只剩一半。" },
        { text: "投太子，北上灵武", hint: "私兵 +14；声望 +8", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 8 }], then: "太子在灵武即位，是为肃宗。你到得早，得了个出身。" },
        { text: "趁乱回乡", hint: "存粮 −4 石", effects: [{ k: "grain", v: -4 }], then: "你回了家。家里的门开着，屋里的东西都在，人不见了。" }
      ]
    },
    {
      id: "tang.jingyuan", cat: "世变", title: "泾原", era: "tang", years: [783, 785], age: [16, 60], weight: 22, once: true,
      text: [
        "泾原兵过长安，犒赏菲薄，遂哗变。德宗仓皇出奔奉天。",
        "朱泚被拥立为帝，据长安。"
      ],
      options: [
        { text: "从乱兵入宫库", hint: "银钱 +40；声望 −16", effects: [{ k: "silver", v: 40 }, { k: "fame", v: -16 }], then: "宫里能拿的都拿了。你抱着一卷字画跑出来，后来才知道那是颜真卿的字。" },
        { text: "随驾奉天", hint: "身体 −8；声望 +12", effects: [{ k: "body", v: -8 }, { k: "fame", v: 12 }], then: "奉天城小，粮尽，吃的是野菜和麦屑。守了四十天，援兵到了。" },
        { text: "躲在家里", hint: "家产折损", effects: [{ k: "silver", v: -10 }], then: "乱兵抢了三天。你家被翻了两次，第三次他们已经没什么可拿了。" }
      ]
    },
    {
      id: "tang.ganlu", cat: "世变", title: "甘露", era: "tang", years: [835, 836], age: [16, 65], weight: 18, once: true,
      text: [
        "文宗与李训、郑注谋诛宦官，诈称甘露降于金吾仗院，诱仇士良等往观。",
        "事泄，宦官率禁兵大杀朝臣，死者数千。",
        "你在中书省外。"
      ],
      options: [
        { text: "逃出城去", hint: "声望 −6；保命", effects: [{ k: "fame", v: -6 }, { k: "body", v: -4 }], then: "你跑出城门时，身后全是喊声。此后再没有回长安。" },
        { text: "藏于民家", hint: "银钱 −8；保命", effects: [{ k: "silver", v: -8 }], then: "那家主人把你藏在柴房里，藏了七天。走时你留下一块玉。" },
        { text: "出面自陈不预谋", hint: "声望 +4；风险极大", effects: [{ k: "fame", v: 4 }], then: "宦官看了你一眼，说：滚。你滚了。", gamble: { deathChance: 0.2, cause: "滥杀" } }
      ]
    },
    {
      id: "tang.huangchao", cat: "世变", title: "黄巢", era: "tang", years: [878, 884], age: [14, 65], weight: 26,
      text: [
        "黄巢转掠河南、淮南、浙东，入福建，陷广州，复北上。",
        "广明元年，陷洛阳，破潼关，入长安，称大齐皇帝。",
        "「冲天香阵透长安，满城尽带黄金甲。」"
      ],
      options: [
        { text: "从黄巢军", hint: "私兵 +26；声望 −10", effects: [{ k: "troops", v: 26 }, { k: "fame", v: -10 }], then: "长安城破那天，你跟着进了城。街上到处是黄金甲。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "随唐军勤王", hint: "武艺 +8；声望 +10", effects: [{ k: "martial", v: 8 }, { k: "fame", v: 10 }], then: "各镇的兵都来了。收复长安后，回纥兵在城里抢了三天，朝廷不管。" },
        { text: "举家入山", hint: "存粮 −8 石；保命", effects: [{ k: "grain", v: -8 }, { k: "body", v: -5 }], then: "山里住了两年。下山时，县里的人换了一半。" }
      ]
    },
    {
      id: "tang.zhuwen", cat: "世变", title: "白马", era: "tang", years: [905, 908], age: [16, 70], weight: 20, once: true,
      text: [
        "朱温杀宰相裴枢等朝臣三十余人于白马驿，投尸于河。",
        "又弑昭宗，立哀帝，终受禅，国号梁。",
        "唐祚至此而终。"
      ],
      options: [
        { text: "随众降梁", hint: "官位保住；声望 −10", effects: [{ k: "official", v: 6 }, { k: "fame", v: -10 }], then: "你换了朝服。新朝的官制，连仪注都还没来得及定。" },
        { text: "逃入山中，不仕二朝", hint: "声望 +10；家业尽弃", effects: [{ k: "fame", v: 10 }, { k: "silver", v: -12 }], then: "你在山里种了十年地。有人来请，你都说不识字。" },
        { text: "投河东李克用", hint: "私兵 +16；武艺 +6", effects: [{ k: "troops", v: 16 }, { k: "martial", v: 6 }], then: "河东的沙陀兵很强。你去了才知道，他们和梁人有几十年的仇。" }
      ]
    }
  ]);;

  /* ══════════ 隋唐 ══════════ */
  P.periods.suitang.events = (P.periods.suitang.events || []).concat([
    {
      id: "st.x.keju", cat: "科举", title: "应举", age: [16, 45], weight: 26, once: true,
      when: { minKnowledge: 25 },
      text: [
        "朝廷开科取士，有进士、明经二科。进士重诗赋，明经重帖经。",
        "人说：三十老明经，五十少进士。"
      ],
      options: [
        { text: "应进士科", hint: "难；中则声望大增", resolve: "examPass", params: { base: 0.06, perKnowledge: 0.008, cap: 0.55, onPass: ["jinshi"] }, effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -6 }], then: "" },
        { text: "应明经科", hint: "较易；中则为学官、县尉", gamble: { winChance: 0.35, win: [{ k: "knowledge", v: 4 }, { k: "fame", v: 10 }, { k: "official", v: 8 }], lose: [{ k: "knowledge", v: 2 }, { k: "fame", v: -2 }], winNote: "帖经十通其八，你中了明经。授了个县尉。", loseNote: "帖经不通，落第。你把行卷又抄了一遍。" } },
        { text: "不应举，去幕府", hint: "银钱 +8；交游广", effects: [{ k: "silver", v: 8 }, { k: "official", v: 4 }], then: "你在节度使幕中做了掌书记。刀笔之间，也见得着天下事。" }
      ]
    },
    {
      id: "st.x.fubing", cat: "军功", title: "府兵", age: [18, 42], weight: 18, once: true, sex: "male",
      text: [
        "你家在折冲府的名籍上。三丁取一，年二十入军，六十而免。",
        "府兵自备弓刀、粮食、麦饭，戍边一年，还要上番宿卫。"
      ],
      options: [
        { text: "应点入军", hint: "武艺 +12；身体 −6", effects: [{ k: "martial", v: 12 }, { k: "body", v: -6 }, { k: "fame", v: 4 }], then: "你在京城宿卫了三年。见过天子出行，也见过边关的雪。" },
        { text: "出钱雇人代番", hint: "银钱 −10", effects: [{ k: "silver", v: -10 }], then: "府兵之制渐坏，雇人代番的越来越多。你也是其中一个。" },
        { text: "逃籍", hint: "声望 −8；田产被夺", effects: [{ k: "fame", v: -8 }, { k: "field_dry", v: -4 }], then: "你逃了。官府把你的田收回，分给了别人。" }
      ]
    },
    {
      id: "st.x.juntian", cat: "家业", title: "受田", age: [18, 45], weight: 14,
      class: ["farmer", "tenant"],
      text: [
        "均田之制：丁男受田百亩，二十亩为永业，八十亩为口分。口分身死还官。",
        "但村里的田，早不够分了。"
      ],
      options: [
        { text: "领受口分田", hint: "田 +20 亩；赋役随之", effects: [{ k: "field_wet", v: 12 }, { k: "field_dry", v: 8 }], then: "你领了二十亩，其中八亩是荒地。你开了三年才种熟。" },
        { text: "不领，去做佃客", hint: "银钱 +3；免赋", effects: [{ k: "silver", v: 3 }], then: "你佃了寺里的田。寺里的租比官府的赋轻，但永远还不完。" }
      ]
    },
    {
      id: "st.x.xingjuan", cat: "科举", title: "行卷", age: [18, 38], weight: 14,
      when: { minKnowledge: 35 },
      text: [
        "举子应试之前，要把自己的诗文抄成卷轴，投给朝中显贵，谓之行卷。",
        "有人投了三十家，才有一家愿意见。"
      ],
      options: [
        { text: "投诗于宰相门下", hint: "银钱 −10；声望 +12", need: { minSilver: 10 }, effects: [{ k: "silver", v: -10 }, { k: "fame", v: 12 }], then: "宰相看了你的《感遇》，说：此人可教。第二年你中了。" },
        { text: "在寺观题诗，等识者", hint: "声望 +6", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: 2 }], then: "你在墙上题了二十首。有人抄走了，也有人抹掉了。" },
        { text: "不行卷，只凭考场", hint: "声望 −2；全凭本事", effects: [{ k: "fame", v: -2 }, { k: "knowledge", v: 3 }], then: "你进了考场。题目是《终南望余雪》，你写了四句就交卷。" }
      ]
    },
    {
      id: "st.x.hushang", cat: "市井", title: "西市", age: [20, 58], weight: 14, class: ["merchant"],
      text: [
        "长安西市，胡商云集。波斯邸、酒肆、质库，一街连着一街。",
        "有个粟特商人要合伙走一趟河西。"
      ],
      options: [
        { text: "合伙西行", hint: "银钱 −15；或大赚", gamble: { winChance: 0.6, win: [{ k: "silver", v: 45 }, { k: "knowledge", v: 4 }], lose: [{ k: "silver", v: -12 }, { k: "body", v: -6 }], winNote: "一年后他回来了，带回香料、玉石和两匹大宛马。", loseNote: "货在凉州被扣了，说是违禁。他留在西域没回来。" } },
        { text: "只在市里开店", hint: "银钱 +10", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 2 }], then: "你开了间香药铺。胡商来买，说的话你听不懂，比划着也能成交。" }
      ]
    },
    {
      id: "st.x.mubing", cat: "军功", title: "募兵", age: [20, 45], weight: 14, sex: "male",
      text: [
        "府兵既坏，边将改行募兵。应募者长住军中，家口随营。",
        "节度使给的钱比府兵多，也没有番期。"
      ],
      options: [
        { text: "应募为长征健儿", hint: "武艺 +14；私兵 +10", effects: [{ k: "martial", v: 14 }, { k: "troops", v: 10 }, { k: "silver", v: 6 }], then: "你成了职业兵。赏钱、战利、掳获，都是你的。节度使说：跟着我，有肉吃。" },
        { text: "留在家中", hint: "什么也没变", effects: [], then: "村里去应募的，后来很多跟着节度使反了。你幸而没有去。" }
      ]
    },
    {
      id: "st.x.seng", cat: "方外", title: "度牒", age: [12, 40], weight: 12, once: true,
      text: [
        "寺里可以买度牒，出了家，就免了赋役。",
        "一张度牒要十两银子，比一户人家一年的收成还多。"
      ],
      options: [
        { text: "买度牒出家", hint: "银钱 −10；免赋，学识 +6", need: { minSilver: 10 }, effects: [{ k: "silver", v: -10 }, { k: "knowledge", v: 6 }, { k: "fame", v: 4 }], then: "你剃了头，穿上僧衣。县里的差役从此不再上门。" },
        { text: "不出家", hint: "什么也没变", effects: [], then: "你看着寺里的钟楼，想了很多年。" }
      ]
    },
    {
      id: "st.x.yizhuang", cat: "家族", title: "义庄", age: [35, 65], weight: 10,
      when: { minSilver: 60 },
      text: [
        "族中有人说：何不置些族田，收租赡养孤寡、供子弟读书？",
        "这在中原叫义庄，在江南叫族田。"
      ],
      options: [
        { text: "捐田三十亩设义庄", hint: "田 −30 亩；声望 +18", effects: [{ k: "field_wet", v: -30 }, { k: "fame", v: 18 }], then: "义庄立了规矩，刻在石上。此后族中读书的人，一年比一年多。" },
        { text: "不捐，留给儿孙", hint: "声望 −2", effects: [{ k: "fame", v: -2 }], then: "你把田契锁进箱子。钥匙挂在自己腰上，直到死。" }
      ]
    },
    {
      id: "st.x.fanzhen", cat: "官府", title: "藩镇", age: [20, 55], weight: 14,
      text: [
        "河朔三镇，父死子继，赋税不入朝廷。",
        "节度使要募幕僚，管钱粮、掌书记。"
      ],
      options: [
        { text: "入幕为掌书记", hint: "银钱 +14；声望 +6", effects: [{ k: "silver", v: 14 }, { k: "fame", v: 6 }, { k: "official", v: 8 }], then: "你替节度使写奏表，写给朝廷的那些，和写给邻镇的那些，用词不一样。" },
        { text: "不入幕", hint: "什么也没变", effects: [], then: "你在家里读书。听说那一任节度使后来被部下杀了。" }
      ]
    },
    {
      id: "st.x.liangshui", cat: "官府", title: "两税", era: "tang", years: [780, 845], age: [20, 65], weight: 14, once: true,
      text: [
        "杨炎行两税法：户无主客，以见居为簿；人无丁中，以贫富为差。",
        "夏输无过六月，秋输无过十一月。租庸调皆并入两税。"
      ],
      options: [
        { text: "按亩纳钱", hint: "银钱 −8；免丁役", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 4 }], then: "税按田亩征，钱要折成绢帛。折价的权力在吏手里，他们说多少就是多少。" },
        { text: "隐匿田亩", hint: "银钱留住；被查则罚", gamble: { winChance: 0.6, win: [{ k: "silver", v: 6 }], lose: [{ k: "silver", v: -14 }, { k: "fame", v: -8 }], winNote: "你把三亩田写在族人名下。查了两年，过去了。", loseNote: "括户的来了，查出隐田，罚钱加罚役。" } }
      ]
    },

    /* ── 隋唐补卷 ────────────────────────────────── */
    {
      id: "st2.yunhe", cat: "官府", title: "开河", age: [16, 50], weight: 20, sex: "male",
      text: [
        "朝议开河，通南北漕运。沿河州县，按户出丁。",
        "里正说：一户一丁，自带口粮，去三个月。"
      ],
      options: [
        { text: "应役去", hint: "身体 −14；声望 +4；银钱 +2", effects: [{ k: "body", v: -14 }, { k: "fame", v: 4 }, { k: "silver", v: 2 }], then: "挖土、担泥、夯岸。河工一天两顿饭，饭里掺着糠。三个月后你回家了，人是走回来的。", gamble: { deathChance: 0.12, cause: "役死" } },
        { text: "出钱代役", need: { minSilver: 6 }, hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "钱交了，人没去。后来听说那一段河工塌过两次，埋了不少人。" },
        { text: "逃入山中", hint: "声望 −10；运气 −2", effects: [{ k: "fame", v: -10 }, { k: "luck", v: -2 }, { k: "body", v: -4 }], then: "你在山里躲了两个月，吃野果、喝泉水。回家时，家里的猪被官差牵走了。" }
      ]
    },
    {
      id: "st2.fangshi", cat: "乡里", title: "坊门", age: [14, 60], weight: 14,
      text: [
        "长安的坊，四门晨开夜闭。日暮鼓八百声，鼓绝门闭。",
        "你今晚在坊外，走回去要过三道街。"
      ],
      options: [
        { text: "赶在闭门前进坊", hint: "身体 −3；银钱 −1", effects: [{ k: "body", v: -3 }, { k: "silver", v: -1 }], then: "你一路小跑，进坊的时候鼓声刚停。坊门在身后合上，门吏看了你一眼。" },
        { text: "找个邸店住一夜", hint: "银钱 −2；学识 +1", effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 1 }], then: "邸店里住了七八个人，说的都是各地口音。有人在讲朝廷新下的诏令，讲得比官府贴的还细。" },
        { text: "翻墙进坊", hint: "身体 −5；运气 −1", effects: [{ k: "body", v: -5 }, { k: "luck", v: -1 }], then: "你翻墙时挂破了衣裳。落地听见武侯铺的人在敲梆子，赶紧贴墙走了。", gamble: { deathChance: 0.06, cause: "跌伤" } }
      ]
    },
    {
      id: "st2.huji", cat: "官府", title: "括户", age: [20, 65], weight: 16,
      text: [
        "朝廷派了括户使下来，查逃户、隐丁、漏田。",
        "县里的里正挨家挨户核人口，连刚生的孩子都要报。"
      ],
      options: [
        { text: "照实报了", hint: "银钱 −6；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "报了七口人。差役在本子上写完，说：以后添丁进口，十日内要报。你说知道了。" },
        { text: "藏了两个男丁", hint: "可能被查出", gamble: { winChance: 0.55, win: [{ k: "silver", v: 8 }], lose: [{ k: "silver", v: -16 }, { k: "fame", v: -10 }, { k: "body", v: -6 }], winNote: "你把两个弟弟藏在山里的亲戚家，报了个病亡。查了三个月，过去了。", loseNote: "邻家告了。差役把你带走，枷了三日，罚了两年的赋。" } },
        { text: "花钱走里正的门路", need: { minSilver: 3 }, hint: "银钱 −3；少报两口", effects: [{ k: "silver", v: -3 }, { k: "fame", v: -1 }], then: "里正收下钱，笔尖在纸上绕了一下。你家少报了两口，他也少交了两口的账。" }
      ]
    },
    {
      id: "st2.seng", cat: "方外", title: "僧尼", age: [14, 60], weight: 12,
      years: [840, 846],
      text: [
        "朝廷下令毁寺，僧尼还俗。天下寺院四千余所，只留两京各两所。",
        "铜像熔了铸钱，铁像熔了打农具。寺里的田，一律没官。"
      ],
      options: [
        { text: "还俗归家，领回寺田", hint: "田 +6 亩；学识 −4", effects: [{ k: "field_dry", v: 6 }, { k: "knowledge", v: -4 }], then: "你脱下僧衣，换上旧的短褐。手里攥着一把寺里分的铁锄，锄柄还是寺里的木头。" },
        { text: "藏起来，不肯还俗", hint: "声望 −6；可能被逮", effects: [{ k: "fame", v: -6 }, { k: "body", v: -5 }], then: "你躲在城外一间草庵里，半年不敢出门。后来风声过去，你也就不再提僧籍的事。", gamble: { deathChance: 0.14, cause: "下狱" } },
        { text: "趁乱收寺里的经卷", hint: "学识 +10；银钱 −2", effects: [{ k: "knowledge", v: 10 }, { k: "silver", v: -2 }], then: "你把几卷经书和两幅字塞进柴车底下，运回了家。藏在房梁上，一藏几十年。" }
      ]
    },
    {
      id: "st2.yabing", cat: "军功", title: "牙兵", age: [18, 45], weight: 16,
      text: [
        "镇里的牙兵，是节度使的亲兵。赏赐最厚，也最能废立主帅。",
        "牙兵招人，要身高力大的。"
      ],
      options: [
        { text: "投牙兵", hint: "武艺 +12；私兵 +14；声望 −3", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 14 }, { k: "fame", v: -3 }, { k: "line", v: "military" }], then: "你入了牙军。三年里换了两个节度使，都是牙兵拥立的。你都在场，都举了刀。", gamble: { deathChance: 0.14, cause: "兵变" } },
        { text: "做个普通戍卒", hint: "武艺 +6；身体 −4", effects: [{ k: "martial", v: 6 }, { k: "body", v: -4 }], then: "你在城头站了五年。看着牙兵进城、出城、又进城。你只管站你的岗。" },
        { text: "不去，回家种田", hint: "身体 +3；存粮 +2 石", effects: [{ k: "body", v: 3 }, { k: "grain", v: 2 }], then: "你从招兵的木牌前走过去。木牌上写着「月给钱三千」，字是新描的。" }
      ]
    },
    {
      id: "st2.shi", cat: "文事", title: "题壁", age: [16, 60], weight: 14,
      when: { minKnowledge: 25 },
      text: [
        "驿站的墙上，写满了过路人的诗。有的落款，有的不落。",
        "你手里有笔，墙上有空。"
      ],
      options: [
        { text: "题一首", hint: "声望 +8；学识 +2", effects: [{ k: "fame", v: 8 }, { k: "knowledge", v: 2 }], then: "你写了八句，落了自己的名字。三年后再过此驿，那面墙被重新粉过，诗没了。" },
        { text: "只抄别人的", hint: "学识 +5", effects: [{ k: "knowledge", v: 5 }], then: "你把壁上几首好诗抄在纸上，抄了满满一张。回家贴在床头，天天看。" },
        { text: "看看就走", hint: "运气 +1", effects: [{ k: "luck", v: 1 }], then: "你在墙前站了一刻钟，看那些名字：有的听过，有的没有。然后你走了。" }
      ]
    },
    {
      id: "st2.menli", cat: "家族", title: "门第", age: [15, 30], weight: 16, once: true,
      when: { flagNot: ["married"] },
      text: [
        "说亲的人来了，先问的不是人品，是郡望。",
        "崔卢李郑，这四姓的女儿，聘礼要十倍。"
      ],
      options: [
        { text: "攀一门高姓", need: { minSilver: 60 }, hint: "银钱 −60；声望 +16", effects: [{ k: "silver", v: -60 }, { k: "fame", v: 16 }], then: "婚事成了。女方家里来的人，进门先看你家的门楣，看了很久。此后族里排座次，你在前面。" },
        { text: "娶个门当户对的", hint: "银钱 −12；声望 +4", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }, { k: "flag", v: "married" }], then: "两家差不多，谈得很顺。成亲那天，来的人不多，闹到半夜。" },
        { text: "娶个寒门能干的", hint: "银钱 −4；家中得力", effects: [{ k: "silver", v: -4 }, { k: "body", v: 3 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 18 } }, { k: "flag", v: "married" }], then: "她进门第二天就下厨、喂鸡、把院子扫了三遍。族里的婶娘们说：这不是士族做派。你说：过日子够了。" }
      ]
    },
    {
      id: "st2.yan", cat: "官府", title: "盐铁", age: [20, 65], weight: 12,
      text: [
        "盐铁转运营运天下，盐价一年三涨。",
        "有盐商来找你，说要合股贩盐，走的是官盐的引。"
      ],
      options: [
        { text: "合股", need: { minSilver: 15 }, hint: "银钱 −15；或大赚", effects: [{ k: "silver", v: -15 }], gamble: { winChance: 0.6, win: [{ k: "silver", v: 40 }], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -6 }], winNote: "一船盐从淮南下河，卖到关中，利有三倍。你分了钱，一夜没睡。", loseNote: "盐在关津被扣，说是引票不符。货没了，人也差点进去。" } },
        { text: "自己贩私盐", hint: "银钱 +12；风险大", effects: [{ k: "silver", v: 12 }, { k: "fame", v: -4 }], then: "你从海边收盐，走小路运。一担能挣二百文。巡盐的来了就跑，跑不掉就认罚。", gamble: { deathChance: 0.14, cause: "格斗" } },
        { text: "不沾这个", hint: "声望 +2", effects: [{ k: "fame", v: 2 }], then: "你说：盐是官家的，碰不得。那人笑了笑，走了。三年后他成了县里的富户。" }
      ]
    },
    {
      id: "st2.cha", cat: "市井", title: "茶", age: [18, 60], weight: 12,
      text: [
        "茶从南方来，一路北上，价翻十倍。",
        "有人问你要不要收一季的茶。"
      ],
      options: [
        { text: "收茶，自己押运", need: { minSilver: 10 }, hint: "银钱 −10；或赚或赔", effects: [{ k: "silver", v: -10 }], gamble: { winChance: 0.55, win: [{ k: "silver", v: 30 }, { k: "fame", v: 4 }], lose: [{ k: "silver", v: -6 }, { k: "body", v: -6 }], winNote: "茶到了北边，卖给了军镇。军里的将校喝不惯，可是乐意拿它待客。", loseNote: "路上淋了雨，茶饼发了霉。你挑出没坏的，贱价处理了。" } },
        { text: "开个茶铺", hint: "银钱 −6；声望 +5", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 5 }], then: "你开了间茶铺，三文一碗。来的人多是些闲汉和走卒，坐一下午，说一整天的话。" },
        { text: "不碰", hint: "什么也没变", effects: [], then: "你还是种你的田。那一年茶价涨得厉害，你听人说了，也就听听。" }
      ]
    },
    {
      id: "st2.youxia", cat: "乡里", title: "游侠", age: [16, 35], weight: 12, once: true,
      text: [
        "城里有一伙少年，骑马、佩刀、喝酒，替人出头。",
        "他们请你入伙，说：有酒同喝，有难同当。"
      ],
      options: [
        { text: "入伙", hint: "武艺 +10；声望 +6；结怨", effects: [{ k: "martial", v: 10 }, { k: "fame", v: 6 }, { k: "grudge", v: 8 }], then: "你们替一个被夺了田的老汉出头，把当地一个恶少打了。此后在城里走，有人让路。", gamble: { deathChance: 0.12, cause: "格斗" } },
        { text: "只跟他们喝酒", hint: "银钱 −3；声望 +2", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }], then: "你喝过几场酒，没入伙。后来他们出了事，抓了三个，你不在其中。" },
        { text: "不往来", hint: "声望 −2", effects: [{ k: "fame", v: -2 }], then: "你说家里管得紧。他们笑了一阵，此后见了你，只点点头。" }
      ]
    },
    {
      id: "st2.qujiang", cat: "科举", title: "曲江", age: [18, 40], weight: 14, once: true,
      when: { minKnowledge: 40 },
      text: [
        "及第的进士，要在曲江池边赴宴。同年们凑钱，公卿来看，连宫里的乐工都来了。",
        "有人在这一天被选为东床。"
      ],
      options: [
        { text: "赴宴，广交同年", hint: "银钱 −8；声望 +14", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 14 }], then: "你换了新衣，坐在末席。散席时身上多了二十几张名刺，每一张都记着一个名字和一个官职。" },
        { text: "不去，回家读书", hint: "学识 +6；声望 −2", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: -2 }], then: "你在家里翻书。窗外有鼓乐声，听了一下午。后来那批同年里，出了两个宰相。" },
        { text: "赴宴，但不出头", hint: "声望 +5；银钱 −2", effects: [{ k: "fame", v: 5 }, { k: "silver", v: -2 }], then: "你坐在中间，喝酒、听诗、按时告退。有人记得你，也有人不记得。" }
      ]
    },
    {
      id: "st2.tuntian", cat: "家业", title: "营田", age: [20, 60], weight: 12,
      text: [
        "边镇的营田，招人开垦。三年免租，之后按亩纳粮。",
        "地在河边，土是好的，就是冷。"
      ],
      options: [
        { text: "领五十亩，举家迁去", hint: "田 +30 亩；身体 −8", effects: [{ k: "field_wet", v: 10 }, { k: "field_dry", v: 20 }, { k: "body", v: -8 }], then: "你在河边搭了土屋。第一年种黍，收成薄。第三年，打下的粮装满了两个窖。" },
        { text: "只领十亩试试", hint: "田 +10 亩；身体 −3", effects: [{ k: "field_dry", v: 10 }, { k: "body", v: -3 }], then: "你不敢全押。十亩地，一年两趟，来回二百里。收成不多，也不少。" },
        { text: "不去，太远", hint: "什么也没变", effects: [], then: "你留下了。后来那边成了镇，去的人都发了。你听说时，正在自家地里薅草。" }
      ]
    },
    {
      id: "st2.nubi", cat: "家族", title: "贱口", age: [20, 55], weight: 10,
      class: ["royal", "noble", "official_mid", "gentry", "merchant"],
      text: [
        "家里有两个部曲，是父辈时投来的，附在户籍之外。",
        "按律，良贱不婚，部曲的儿子还是部曲。"
      ],
      options: [
        { text: "放为良民", hint: "声望 +12；家中少两个劳力", effects: [{ k: "fame", v: 12 }, { k: "field_wet", v: -2 }], then: "你去县里替他们除了籍。他们跪下来磕头，磕了三个。此后逢年过节，还送些东西来。" },
        { text: "留着使唤", hint: "田产收益；声望 −4", effects: [{ k: "fame", v: -4 }, { k: "grain", v: 4 }], then: "他们照旧种地、挑水、看门。你不打骂，也不多说。他们叫你「郎君」。" },
        { text: "卖出去换钱", hint: "银钱 +14；声望 −12", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -12 }], then: "牙子来领人。那个年纪大的回头看了一眼院子，什么也没说。你站在门里，也没说。" }
      ]
    },
    {
      id: "st2.huang", cat: "世变", title: "蝗", age: [8, 70], weight: 12,
      text: [
        "蝗从东边来，遮了半天日头。落地之后，禾苗只剩下杆。",
        "有人说蝗是天谴，不许捕。"
      ],
      options: [
        { text: "带着人夜里烧火诱捕", hint: "身体 −6；存粮 +6 石", effects: [{ k: "body", v: -6 }, { k: "grain", v: 6 }], then: "你们在地头挖沟、烧火，蝗扑进火里，噼啪响。烧了三夜，救下了一半的田。" },
        { text: "不敢捕，跟着烧香", hint: "存粮 −8 石；声望 +2", effects: [{ k: "grain", v: -8 }, { k: "fame", v: 2 }], then: "县里设了坛，念了三天经。蝗虫吃完了这一片，往西去了。" },
        { text: "把蝗捉了吃", hint: "存粮 +3 石；身体 −3", effects: [{ k: "grain", v: 3 }, { k: "body", v: -3 }], then: "把蝗虫的翅膀揪了，下锅炒。焦的，有点香。孩子们抢着吃。" }
      ]
    },
    {
      id: "st2.huihu", cat: "世变", title: "蕃将", age: [18, 50], weight: 12,
      text: [
        "军中多蕃将，能战，也难制。",
        "一个胡人将校要招你入他帐下。"
      ],
      options: [
        { text: "入其帐下", hint: "武艺 +10；私兵 +12；声望 −3", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 12 }, { k: "fame", v: -3 }], then: "他待部下极厚，赏赐从不拖欠。喝酒时他拍你的肩，说：汉儿，你跟我打，能活。" , gamble: { deathChance: 0.14, cause: "战殁" } },
        { text: "辞了，仍在汉军", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], then: "你留在了原来的营里。那一年蕃将的兵在前面打，你的营在后面守粮道。" },
        { text: "干脆回家", hint: "身体 +3；田 +2 亩", effects: [{ k: "body", v: 3 }, { k: "field_dry", v: 2 }], then: "你把号衣叠好，交还了。回家那天，母亲杀了那只下蛋的鸡。" }
      ]
    },
    {
      id: "st2.liang", cat: "世变", title: "义仓", age: [25, 70], weight: 12,
      text: [
        "县里的义仓，本该积谷备荒。仓里的粮，年年被借去做别的用。",
        "今年荒，开仓一看，只剩下霉的。"
      ],
      options: [
        { text: "联名上书，请查仓", hint: "声望 +10；结怨", effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 12 }], then: "联名的人有三十几个。查了三个月，换了一个仓吏，粮还是没有。你在名单上排第四。" },
        { text: "自家出粮，先救眼前", hint: "存粮 −12 石；银钱 −4；声望 +14", effects: [{ k: "grain", v: -12 }, { k: "silver", v: -4 }, { k: "fame", v: 14 }], then: "你在门口支了锅。粥是稠的，排队的人从巷口排到巷尾。有人说：这家有良心。你听见了，不太敢受。" },
        { text: "忍下去，先顾自己", hint: "声望 −4；存粮 +2 石", effects: [{ k: "fame", v: -4 }, { k: "grain", v: 2 }], then: "你把门关上，煮了一锅稠粥。孩子吃的时候，你听见外面有人在哭。" }
      ]
    },
    {
      id: "st2.shu", cat: "文事", title: "抄书", age: [16, 55], weight: 12,
      when: { minKnowledge: 20 },
      text: [
        "寺里要雇人抄经，一部八百文，管饭。",
        "抄错一个字，要重来。"
      ],
      options: [
        { text: "接这活", hint: "银钱 +4；学识 +4；身体 −3", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 4 }, { k: "body", v: -3 }], then: "你抄了四十天。右手的中指起了茧，看东西开始发花。这一部经后来供在殿里，没人知道是谁抄的。" },
        { text: "抄些更值钱的：状子、书信", hint: "银钱 +7；声望 +2", effects: [{ k: "silver", v: 7 }, { k: "fame", v: 2 }], then: "你替人写状子。写得多了，就知道哪些话说出来有用，哪些说出来要挨板子。" },
        { text: "不抄，宁可下地", hint: "身体 +2", effects: [{ k: "body", v: 2 }], then: "你说眼睛吃不消。家里人说：读书人的活，怎么倒干不了。" }
      ]
    }
  ]);;

  /* ══════════ 修正：九条隋唐大事放错了数组 ══════════
     下面这九条的 era 是 sui / tang，但一直被写在 P.periods.weijin.events 里。
     而隋唐局加载的是 P.periods.suitang.events —— 于是它们在隋唐局里不存在；
     在魏晋局里虽然存在，又被 matchEvent 的 e.era !== s.era 挡掉。
     两头痛过，结果是一次都抽不到。这里挪回本该在的数组。 */
  (function () {
    var WRONG = [
      "sui.zhengliao", "sui.wagang", "sui.jiangdu",
      "tang.anshi", "tang.mawei", "tang.jingyuan",
      "tang.ganlu", "tang.huangchao", "tang.zhuwen"
    ];
    var w = P.periods.weijin.events || [];
    var moved = w.filter(function (e) { return WRONG.indexOf(e.id) >= 0; });
    if (!moved.length) return;
    P.periods.weijin.events = w.filter(function (e) { return WRONG.indexOf(e.id) < 0; });
    P.periods.suitang.events = (P.periods.suitang.events || []).concat(moved);
  })();
})(window.PACK_BASE);
