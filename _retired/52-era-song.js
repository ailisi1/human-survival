/* 生在何朝 · 各朝专有事件 卷三：五代十国、辽、北宋、西夏、金、南宋 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 五代十国 ══════════ */
  B.eraEvents.wudai = [

    {
      id: "wd2.yabing", cat: "官府", title: "牙兵", age: [18, 55], weight: 18,
      text: [
        "节度使募本地壮者为牙兵，以为亲军。牙兵骄，往往逐帅、杀帅，自立新帅。",
        "军中传言：兵强则逐帅，帅强则叛上。"
      ],
      options: [
        { text: "入牙兵", hint: "武艺 +12；私兵 +22", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 22 }], then: "你入了牙兵。吃的是好粮，拿的是双饷。你也参加过一次逐帅，那次没有流血。" },
        { text: "不入，种田", hint: "田 +12 亩", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 4 }], then: "你没有入牙兵。你种田。兵来征粮，你给粮；兵来抓人，你躲进地窖。" },
        { text: "做牙兵的军吏", hint: "官职 +10；银钱 +8", effects: [{ k: "official", v: 10 }, { k: "silver", v: 8 }], then: "你管牙兵的粮饷。谁多谁少，你说了算。兵叫你「押衙」。" }
      ]
    },
    {
      id: "wd2.yanyun", cat: "世变", title: "燕云", era: "wudai", years: [936, 938], age: [12, 70], weight: 32, once: true,
      text: [
        "石敬瑭求援于契丹，许割卢龙一道及雁门关以北诸州，且请为父子。",
        "契丹册立为帝，国号晋。燕云十六州，自此不在中国。"
      ],
      options: [
        { text: "在割地之内，随地为契丹民", hint: "田产保；声望 −10", effects: [{ k: "fame", v: -10 }], then: "你所在的州，一纸文书就换了主。契丹的官来了，收税的法子跟从前一样，只是话听不懂。" },
        { text: "举家南迁", hint: "田产弃；声望 +8", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }, { k: "fame", v: 8 }], then: "你往南走。过了滹沱河，你回头看了一眼。此后再没有回去过。" },
        { text: "在契丹朝中做汉官", hint: "官职 +14；声望 −6", effects: [{ k: "official", v: 14 }, { k: "fame", v: -6 }], then: "你在契丹的南面官里做了一名汉官。管的是汉人的田赋、汉人的词讼。两边的话你都会说。" }
      ]
    },
    {
      id: "wd2.fengdao", cat: "官府", title: "长乐", age: [24, 65], weight: 12, when: { minKnowledge: 45 },
      text: [
        "冯道历仕四朝十君，自称「长乐老」。尝言：但知行好事，莫要问前程。",
        "有人问你：这样算不算无耻？"
      ],
      options: [
        { text: "学他，历仕诸朝", hint: "官职 +18；声望 −10", effects: [{ k: "official", v: 18 }, { k: "fame", v: -10 }], then: "你换了四个朝廷，一个官没丢。每一次换朝，你都把印交出去，再领回来。" },
        { text: "只事一朝，朝亡则归", hint: "声望 +14；官职 −10", effects: [{ k: "fame", v: 14 }, { k: "official", v: -10 }], then: "这个朝亡的时候，你把官服叠好，回了乡。此后二十年，没有再出来。" },
        { text: "隐居讲学", hint: "学识 +14；声望 +8", effects: [{ k: "knowledge", v: 14 }, { k: "fame", v: 8 }], then: "你在山里讲学。学生来了二十几个，后来有几个做了宰相。" }
      ]
    },
    {
      id: "wd2.guowei", cat: "官府", title: "革弊", era: "wudai", years: [951, 959], age: [18, 65], weight: 20, once: true,
      text: [
        "周主柴荣革弊：均田租、减徭役、毁佛寺三万三百三十六所，铜像铸钱。",
        "又整军，简汰老弱，选精壮为殿前诸班。"
      ],
      options: [
        { text: "投殿前军", hint: "武艺 +14；官职 +10", effects: [{ k: "martial", v: 14 }, { k: "official", v: 10 }], then: "你被选进了殿前诸班。选的时候，要拉三石弓，跑三十里。你过了。" },
        { text: "领还俗的田", hint: "田 +16 亩", effects: [{ k: "field_wet", v: 10 }, { k: "field_dry", v: 6 }], then: "寺毁了，田分了。你分到十六亩。田契上写的是官田，三年后归民。" },
        { text: "去铸铜像", hint: "银钱 +10；身体 −6", effects: [{ k: "silver", v: 10 }, { k: "body", v: -6 }], then: "你熔了三尊铜像。铜水流出来的时候，有人在旁边念经。" }
      ]
    },
    {
      id: "wd2.shiguo", cat: "官府", title: "偏安", age: [16, 65], weight: 14,
      text: [
        "十国割据江淮、两浙、闽、楚、南汉、前后蜀。地小，兵少，而赋税繁重。",
        "也有好处：几十年不打大仗。"
      ],
      options: [
        { text: "在两浙置田", hint: "田 +18 亩；银钱 −14", effects: [{ k: "field_wet", v: 12 }, { k: "field_dry", v: 6 }, { k: "silver", v: -14 }], then: "你在两浙买了田。这里的水利好，稻一年两熟，粮价也稳。" },
        { text: "做海上贸易", hint: "银钱 +20", effects: [{ k: "silver", v: 20 }], then: "你把瓷器、丝绸装船，往南洋去。船回来的时候，舱里是香料和象牙。" },
        { text: "去中原从军，求功名", hint: "武艺 +12；官职 +12", effects: [{ k: "martial", v: 12 }, { k: "official", v: 12 }], then: "你去了中原。中原的仗打得凶，但功名也在那里。", gamble: { deathChance: 0.26, cause: "战殁" } }
      ]
    },
    {
      id: "wd2.cha", cat: "官府", title: "榷茶", age: [18, 60], weight: 12,
      text: [
        "茶利甚厚。官置榷场，园户采茶输官，官给本钱，私卖者有罪。",
        "你家有几亩茶园。"
      ],
      options: [
        { text: "全数输官", hint: "银钱 −4；声望 +4", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 4 }], then: "你把茶全数交给了榷场。官给的价低，但给现钱。" },
        { text: "留下一半私卖", hint: "银钱 +14；风险", effects: [{ k: "silver", v: 14 }], then: "你把好茶留下了，卖给过路的商队。", gamble: { winChance: 0.66, win: [], lose: [{ k: "silver", v: -18 }, { k: "body", v: -10 }], winNote: "卖了三年，没人查。", loseNote: "被巡茶的查获。茶没入官，罚钱加杖。" } },
        { text: "改种桑，避榷", hint: "田 改；银钱 +6", effects: [{ k: "silver", v: 6 }, { k: "field_wet", v: -4 }], then: "你把茶园改了桑园。桑不榷。丝绸的利薄，但不用怕官。" }
      ]
    },
    {
      id: "wd2.diaoban", cat: "学问", title: "雕版", age: [16, 55], weight: 12,
      text: [
        "雕版印书，始于唐，盛于五代。印《九经》、印佛经、印历日。",
        "有人说：有了印本，书就便宜了。"
      ],
      options: [
        { text: "开一间印坊", need: { minSilver: 26 }, hint: "银钱 −26；长利", effects: [{ k: "silver", v: -26 }, { k: "fame", v: 8 }], then: "你刻了一套《九经》。刻了三年，刻坏了两千块板。印出来的书，一册卖三百钱。" },
        { text: "做刻工", hint: "银钱 +10；学识 +6", effects: [{ k: "silver", v: 10 }, { k: "knowledge", v: 6 }], then: "你替印坊刻板。刻了十年，你把《论语》刻了三遍，也背下了三遍。" },
        { text: "抄书，不印", hint: "学识 +8；银钱 +4", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: 4 }], then: "你还是抄书。抄一本得五百钱，比印的贵，但字是活的。" }
      ]
    },
    {
      id: "wd2.yingtian", cat: "官府", title: "营田", age: [18, 60], weight: 12,
      text: [
        "中原兵兴，田多荒。官府募民营田，给牛、给种，收其半。",
        "荒地很多，肯去的人少。"
      ],
      options: [
        { text: "应募营田", hint: "田 +20 亩；粮 +8 石", effects: [{ k: "field_wet", v: 12 }, { k: "field_dry", v: 8 }, { k: "grain", v: 8 }], then: "你领了牛和种，开了二十亩。头两年收的粮，一半归官，一半归你。" },
        { text: "不去，荒年太多", hint: "无变", effects: [], then: "你没有去。那片荒地，后来长满了蒿草，有半人高。" },
        { text: "招人去营田，自己做头", hint: "银钱 +12；声望 +8", effects: [{ k: "silver", v: 12 }, { k: "fame", v: 8 }], then: "你招了三十户人去营田。你管账，也管他们的口粮。三年后，那里成了一个村。" }
      ]
    },
    {
      id: "wd2.chaqiao", cat: "世变", title: "陈桥", era: "wudai", years: [960, 961], age: [12, 70], weight: 30, once: true,
      text: [
        "北汉结契丹入寇，殿前都点检赵匡胤率军北征。次陈桥驿，诸将以黄袍加其身。",
        "回师汴京，周恭帝禅位。国号宋。"
      ],
      options: [
        { text: "从龙，拥立", hint: "官职 +16；声望 +8", effects: [{ k: "official", v: 16 }, { k: "fame", v: 8 }], then: "你在陈桥。黄袍披上去的时候，天还没亮。回汴京的路上，没有打一仗。" },
        { text: "守周室，不仕新朝", hint: "声望 +14；官职 −20", effects: [{ k: "fame", v: 14 }, { k: "official", v: -20 }], then: "你把周的官印封好，交了出去。新朝留你，你不留。" },
        { text: "在乡里，看风向", hint: "无变", effects: [], then: "你在乡里等了一个月。等到的是一张告示：改元建隆，大赦。" }
      ]
    }
  ];

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = [

    {
      id: "l2.woluduo", cat: "官府", title: "宫分", age: [16, 55], weight: 14,
      text: [
        "天子有斡鲁朵：宫分户、宫卫骑军，世为天子私有，不隶州县。",
        "你所在的户，被编入了宫分。"
      ],
      options: [
        { text: "守宫分，世代供役", hint: "粮 +8 石；无田产", effects: [{ k: "grain", v: 8 }], then: "你成了宫分户。种的是宫帐的田，牧的是宫帐的马。你的儿子也是。" },
        { text: "逃出宫分，投州县", hint: "声望 −10；风险", effects: [{ k: "fame", v: -10 }], then: "你逃了。宫分户逃亡，抓回要黥面。", gamble: { winChance: 0.55, win: [{ k: "field_wet", v: 8 }], lose: [{ k: "body", v: -20 }, { k: "fame", v: -14 }], winNote: "你逃成了，在一个汉人的县里落了籍。", loseNote: "被抓回，黥了面，仍在宫分。" } },
        { text: "在宫分里做牧马人", hint: "武艺 +8；私兵 +10", effects: [{ k: "martial", v: 8 }, { k: "troops", v: 10 }], then: "你牧马。马群有三千匹，你认得每一匹的样子。你也会骑马，骑得比大多数契丹人好。" }
      ]
    },
    {
      id: "l2.touxia", cat: "官府", title: "头下", age: [20, 60], weight: 12,
      text: [
        "头下军州：诸王、外戚、大臣以所俘获或受赐者，筑城居之，谓之头下州。",
        "州中的汉人、渤海人，为头下户，纳租于主，不纳于国。"
      ],
      options: [
        { text: "做头下户，纳租于主", hint: "田 +10 亩；免国税", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }], then: "你成了头下户。主人是个契丹的驸马。他一年来两次，其余时候不管。" },
        { text: "逃入州县，做编户", hint: "声望 +6；风险", effects: [{ k: "fame", v: 6 }], then: "你逃进了州县。州县的官收了你的税，也认了你的籍。", gamble: { winChance: 0.62, win: [], lose: [{ k: "body", v: -14 }], winNote: "没有人来追。", loseNote: "主人派人来追，你被抓回，打了四十鞭。" } },
        { text: "替头下州管账", hint: "官职 +10；学识 +6", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 6 }], then: "你替头下州管账。州里三百户，谁家几口，纳几斗，都在你的簿上。" }
      ]
    },
    {
      id: "l2.nanmian", cat: "官府", title: "南北面", age: [22, 60], weight: 14, when: { minKnowledge: 35 },
      text: [
        "辽分南北面官：北面治宫帐、部族、属国之政；南面治汉人州县、租赋、军马之事。",
        "你是汉人，只能做南面官。"
      ],
      options: [
        { text: "做南面官，治汉民", hint: "官职 +14；声望 +6", effects: [{ k: "official", v: 14 }, { k: "fame", v: 6 }], then: "你在南面官里做到了刺史。管的是汉人的田赋、词讼。契丹的北面官不管你。" },
        { text: "学契丹语，求通南北", hint: "学识 +10；官职 +10", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 10 }], then: "你学了契丹语，写契丹小字。两边的大臣都要你传话。你成了「通事」。" },
        { text: "不做官，教士人读书", hint: "学识 +12；声望 +8", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 8 }], then: "你开了个塾，教汉人的孩子读经。契丹的官不来管，因为南面官说：这是读书人。" }
      ]
    },
    {
      id: "l2.nabo", cat: "官府", title: "捺钵", age: [16, 60], weight: 12,
      text: [
        "四时捺钵：春水、秋山、夏纳凉、冬坐冬。天子随水草而行，行在即朝廷。",
        "你要跟着走。"
      ],
      options: [
        { text: "随行，做随驾的汉官", hint: "官职 +10；身体 −6", effects: [{ k: "official", v: 10 }, { k: "body", v: -6 }], then: "你跟着走了四季。春在鱼儿泺，夏在永安山，秋在庆州，冬在广平淀。一年搬了四次家。" },
        { text: "留在大定府，守衙门", hint: "官职 +6；安稳", effects: [{ k: "official", v: 6 }], then: "你留在了城里。天子不在，城里的事情反而少了。" },
        { text: "不去，回乡种田", hint: "田 +12 亩", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 4 }], then: "你辞了官，回乡种田。契丹的官来征粮，你说：我现在是民。" }
      ]
    },
    {
      id: "l2.yanyun2", cat: "官府", title: "燕云", age: [18, 60], weight: 14,
      text: [
        "燕云十六州入辽已数十年。城中汉人，仍读汉书、行汉礼、应汉举。",
        "辽的南京（燕京），比汴京还像汉人的城。"
      ],
      options: [
        { text: "应辽的科举", hint: "官职 +14；学识 +8", effects: [{ k: "official", v: 14 }, { k: "knowledge", v: 8 }], then: "你中了辽的进士。同年里有契丹人，也有渤海人。放榜那天，大家在同一个棚下看榜。" },
        { text: "南归宋朝", hint: "田产弃；声望 +10", effects: [{ k: "field_wet", v: -12 }, { k: "fame", v: 10 }], then: "你往南走。过了白沟河，宋的边吏问你：从哪来。你说：燕京。他看了你很久。" },
        { text: "做生意，往来南北", hint: "银钱 +18；人脉 +12", effects: [{ k: "silver", v: 18 }, { k: "favor", v: 12 }], then: "你在榷场做买卖。南边的茶、北边的马，都经你的手。两边的话你都会说。" }
      ]
    },
    {
      id: "l2.chanyuan", cat: "世变", title: "澶渊", era: "liao", years: [1004, 1005], age: [12, 70], weight: 30, once: true,
      text: [
        "辽师南下，至澶州。宋主亲征，登城督战。辽将萧挞凛中伏弩死。",
        "两边议和：宋岁输银十万两、绢二十万匹，约为兄弟之国。"
      ],
      options: [
        { text: "在辽军中", hint: "武艺 +10；私兵 +16", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 16 }], then: "你在澶州城下。萧挞凛死的那天，军中一夜没睡。后来议和，大家都松了一口气。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "在宋军中守城", hint: "官职 +10；声望 +12", effects: [{ k: "official", v: 10 }, { k: "fame", v: 12 }], then: "你在城头。辽的箭射上来，钉在女墙上。议和之后，那些箭被拔下来，收进了库。" },
        { text: "在边地，做榷场生意", hint: "银钱 +24", effects: [{ k: "silver", v: 24 }], then: "和议之后，边市开了。你把南边的茶运到北边，一年走了四趟。" }
      ]
    },
    {
      id: "l2.nvzhen", cat: "世变", title: "女真", era: "liao", years: [1114, 1125], age: [12, 70], weight: 36, once: true,
      text: [
        "完颜阿骨打以二千五百人起兵，败辽军于宁江州。",
        "十年之间，辽之五京，尽为金有。天祚帝走夹山，终被执。"
      ],
      options: [
        { text: "从金", hint: "私兵 +30；声望 +6", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 6 }], then: "你投了金。金人用的是女真语，你听不懂，但你认得他们的刀。", gamble: { deathChance: 0.26, cause: "战殁" } },
        { text: "从辽，守城", hint: "官职 +12；声望 +12", effects: [{ k: "official", v: 12 }, { k: "fame", v: 12 }], then: "你守了上京。守了十七天，城破，你从北门走。", gamble: { deathChance: 0.3, cause: "城破" } },
        { text: "举家西走，投西夏", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -14 }, { k: "silver", v: -10 }], then: "你往西走，走了两个月，到了西夏。那里的官收了你，给了你几亩地。" }
      ]
    },
    {
      id: "l2.zika", cat: "官府", title: "打草谷", age: [16, 55], weight: 12, sex: "male",
      text: [
        "军行无粮，则四出抄掠，谓之「打草谷」。骑兵一人三马，去如风，来如雨。",
        "你被编入了这样的队。"
      ],
      options: [
        { text: "从军打草谷", hint: "私兵 +22；声望 −12", effects: [{ k: "troops", v: 22 }, { k: "fame", v: -12 }, { k: "silver", v: 10 }], then: "你跟着队里出去了三趟。第三趟，你在一户人家里看见一个小孩，蹲在灶边。你没有动他。" },
        { text: "不去，留在营里牧马", hint: "武艺 +6；声望 +2", effects: [{ k: "martial", v: 6 }, { k: "fame", v: 2 }], then: "你留在营里牧马。出去的人回来，马上挂着东西。你什么也没要。" },
        { text: "逃", hint: "声望 −10；身体 −8", effects: [{ k: "fame", v: -10 }, { k: "body", v: -8 }], then: "你在夜里逃了。逃了三天，遇上另一支队伍，被当成逃卒收了回去。" }
      ]
    },
    {
      id: "l2.qidanzi", cat: "学问", title: "契丹字", age: [14, 50], weight: 11,
      text: [
        "太祖制契丹大字，后又制小字。汉字、契丹字并行。",
        "官府的文书，两种字都要会。"
      ],
      options: [
        { text: "学契丹字", hint: "学识 +10；官职 +8", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 8 }], then: "你学了小字。小字的笔画简单，写得快，用来记军情。" },
        { text: "只学汉字", hint: "学识 +8", effects: [{ k: "knowledge", v: 8 }], then: "你只学汉字。汉人的文书多，字也够用。" },
        { text: "两种都学，做译吏", hint: "学识 +12；官职 +10", effects: [{ k: "knowledge", v: 12 }, { k: "official", v: 10 }], then: "你两种都学。枢密院的文书，一半经你译。你成了不能少的人，也成了不能走的人。" }
      ]
    }
  ];

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = [

    {
      id: "b2.beijiu", cat: "官府", title: "释兵权", era: "bsong", years: [961, 965], age: [20, 65], weight: 22, once: true,
      text: [
        "太祖与故人石守信等饮酒，曰：人孰不欲富贵，一旦以黄袍加汝身，虽欲不为，其可得乎。",
        "明日，皆称病请罢。赐赉甚厚。"
      ],
      options: [
        { text: "交出兵权，置田宅", hint: "田 +30 亩；银钱 +30；私兵 −20", effects: [{ k: "field_wet", v: 18 }, { k: "field_dry", v: 12 }, { k: "silver", v: 30 }, { k: "troops", v: -20 }], then: "你把兵符交了，换了一堆田契。此后的日子很好过，只是每年秋天，你还是会想起营里的鼓声。" },
        { text: "不交，暗中养士", hint: "私兵 +30；声望 −10", effects: [{ k: "troops", v: 30 }, { k: "fame", v: -10 }], then: "你没有全交。你留了三百人在庄上，名义上是佃户。", gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -20 }, { k: "official", v: -30 }], winNote: "没有人查。", loseNote: "被御史弹劾。你被贬到远郡，三百人散了。" } },
        { text: "求做文官", hint: "学识 +10；官职 +12", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 12 }], then: "你求改文资，做了知州。用印的时候，手有点生。" }
      ]
    },
    {
      id: "b2.gengshu", cat: "官府", title: "更戍", age: [18, 50], weight: 14, sex: "male",
      text: [
        "禁军更戍：分遣禁旅，戍守边城，三年一易。将不得专其兵，兵不得专其将。",
        "你三年换一个地方。"
      ],
      options: [
        { text: "应募为禁军", hint: "武艺 +10；私兵 +12；银钱 +6", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 12 }, { k: "silver", v: 6 }], then: "你入了禁军。三年换一戍，从河北到陕西，走过的地方比读过的书多。" },
        { text: "做乡兵，守本乡", hint: "私兵 +8；田产保", effects: [{ k: "troops", v: 8 }], then: "你做了乡兵。农闲时操练，农忙时种田。你守的是自己的村。" },
        { text: "不入军，去应举", hint: "学识 +10", effects: [{ k: "knowledge", v: 10 }], then: "你没有入军。你在家里读书，读了十年。本朝的兵很多，官也很多，读书做官是正路。" }
      ]
    },
    {
      id: "b2.keju", cat: "官府", title: "糊名", age: [18, 45], weight: 18, when: { minKnowledge: 40 },
      text: [
        "科举取士，糊名、誊录。考官不见其名，不见其字。",
        "有人说：这是最公平的法子。也有人说：这是最不讲情面的法子。"
      ],
      options: [
        { text: "应举", hint: "学识 +12", effects: [{ k: "knowledge", v: 12 }], then: "你进了考场。三天考三场，出来的时候，人瘦了一圈。", gamble: { winChance: 0.3, win: [{ k: "official", v: 26 }, { k: "fame", v: 20 }], lose: [{ k: "fame", v: -4 }], winNote: "你中了。唱名的时候，你在殿下听见自己的名字。", loseNote: "落第。你把考卷默写了一遍，看了很久，找不出哪里不好。" } },
        { text: "做塾师，教人应举", hint: "银钱 +12；学识 +8", effects: [{ k: "silver", v: 12 }, { k: "knowledge", v: 8 }], then: "你开了塾。教的是破题、承题、起讲。学生中了两个，你就出了名。" },
        { text: "不考，去做吏", hint: "官职 +10；银钱 +6", effects: [{ k: "official", v: 10 }, { k: "silver", v: 6 }], then: "你做了州县的书吏。本朝的官换得勤，吏不换。真正办事的是吏。" }
      ]
    },
    {
      id: "b2.jiaozi", cat: "市井", title: "交子", era: "bsong", years: [1023, 1100], age: [18, 65], weight: 18, once: true,
      text: [
        "蜀人患铁钱重，私为券，谓之交子，以便贸易。后归官办，置交子务。",
        "一贯交子，可兑铁钱一贯。"
      ],
      options: [
        { text: "用交子，不做现钱生意", hint: "银钱 +12", effects: [{ k: "silver", v: 12 }], then: "你把钱换成了交子。纸比铁轻，走远路方便。后来交子印多了，一贯只值七百文。" },
        { text: "囤铁钱，不信纸", hint: "银钱 +8", effects: [{ k: "silver", v: 8 }], then: "你把钱都换成了铁钱，堆在地窖里。铁钱很重，一万贯要三间屋子装。" },
        { text: "做交子铺的伙计", hint: "官职 +6；学识 +8", effects: [{ k: "official", v: 6 }, { k: "knowledge", v: 8 }], then: "你在交子铺里写券。券上的字号、印记、花押，错一处就是假。" }
      ]
    },
    {
      id: "b2.qingli", cat: "世变", title: "庆历", era: "bsong", years: [1043, 1045], age: [20, 65], weight: 22, once: true,
      text: [
        "范仲淹上《答手诏条陈十事》：明黜陟、抑侥幸、精贡举、择官长、均公田、厚农桑、修武备、减徭役、覃恩信、重命令。",
        "行了一年，罢。"
      ],
      options: [
        { text: "支持新政", hint: "声望 +14；官职 −8", effects: [{ k: "fame", v: 14 }, { k: "official", v: -8 }], then: "你在地方上推行了三条。新政罢的时候，那三条也罢了，但有一条留了下来。" },
        { text: "反对新政，守旧", hint: "官职 +10；声望 −6", effects: [{ k: "official", v: 10 }, { k: "fame", v: -6 }], then: "你在奏书里说新政「扰民」。新政罢了，你升了一级。" },
        { text: "不表态，只做事", hint: "官职 +4", effects: [{ k: "official", v: 4 }], then: "你没有表态。你在县里修了三条渠，谁也说不出不好。" }
      ]
    },
    {
      id: "b2.xinfa", cat: "世变", title: "新法", era: "bsong", years: [1069, 1085], age: [18, 70], weight: 32, once: true,
      text: [
        "王安石为参知政事，行新法：青苗、募役、保甲、市易、方田均税。",
        "青苗钱：春贷秋还，二分取息。"
      ],
      options: [
        { text: "推行新法", hint: "官职 +16；声望 −8", effects: [{ k: "official", v: 16 }, { k: "fame", v: -8 }], then: "你在县里推行青苗。春贷时家家来领，秋还时一半的人还不上。" },
        { text: "反对新法", hint: "声望 +14；官职 −12", effects: [{ k: "fame", v: 14 }, { k: "official", v: -12 }], then: "你上了三道奏书。第三道递上去之后，你被外放了。" },
        { text: "借青苗钱，扩种", hint: "银钱 +16；负债", effects: [{ k: "silver", v: 16 }, { k: "debt", v: { amt: 20, rate: 0.03, dueYears: 1 } }], then: "你借了青苗钱。那年收成好，你还上了。邻家没收成好的，田卖了。" }
      ]
    },
    {
      id: "b2.haoshuichuan", cat: "世变", title: "好水川", era: "bsong", years: [1041, 1042], age: [16, 65], weight: 22, once: true,
      text: [
        "西夏元昊寇边。宋军好水川之战大败，死者万余人。",
        "军中拾得夏人遗下的木匣，开之，鸽飞起，宋军遂乱。"
      ],
      options: [
        { text: "从军御夏", hint: "武艺 +12；官职 +10", effects: [{ k: "martial", v: 12 }, { k: "official", v: 10 }], then: "你在好水川。山上的鸽子飞起来的时候，你还不明白那是什么意思。", gamble: { deathChance: 0.34, cause: "战殁" } },
        { text: "运粮", hint: "身体 −10；银钱 +6", effects: [{ k: "body", v: -10 }, { k: "silver", v: 6 }], then: "你押粮到边。粮车到了，人也到了，前面败了，粮被退回来。" },
        { text: "在后方，不问边事", hint: "无变", effects: [], then: "你在后方。败报传来那天，城里关了三天门。" }
      ]
    },
    {
      id: "b2.huashigang", cat: "世变", title: "花石", era: "bsong", years: [1105, 1125], age: [14, 65], weight: 22, once: true,
      text: [
        "置应奉局于苏州，取浙中珍异以进。一石之费，动至数千缗。",
        "凡民家一木一石可玩者，即指为御前之物，撤屋抉墙而出。"
      ],
      options: [
        { text: "献一块奇石，求官", hint: "银钱 −20；官职 +16", effects: [{ k: "silver", v: -20 }, { k: "official", v: 16 }, { k: "fame", v: -10 }], then: "你把祖坟前的那块石头献了。石头运走的时候，连路都被压坏了两里。" },
        { text: "藏石于地窖", hint: "保住家产；风险", effects: [], then: "你把家里的几块好石埋了。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -16 }, { k: "silver", v: -24 }], winNote: "没有被搜出来。", loseNote: "被查出。应奉局的人拆了你的屋，墙倒下来砸伤了你。" } },
        { text: "举家避入山中", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -10 }, { k: "silver", v: -12 }], then: "你带着家人进了山。山里住了三年，出来时，村里的树都被砍去运石头了。" }
      ]
    },
    {
      id: "b2.jingkang", cat: "世变", title: "靖康", era: "bsong", years: [1126, 1127], age: [12, 70], weight: 40, once: true,
      text: [
        "金人分道南下，渡河。汴京城破。",
        "二帝北狩，宗室、后妃、工匠、乐人，凡三千余人，尽驱而北。"
      ],
      options: [
        { text: "从康王南渡", hint: "田产弃；官职 +8", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "official", v: 8 }], then: "你跟着康王过了江。江上风大，船小。回头看的时候，北岸已经看不见了。" },
        { text: "留在汴京，从金人", hint: "声望 −16；田产保", effects: [{ k: "fame", v: -16 }], then: "你留在了汴京。金人立了张邦昌，后来又立了刘豫。城还是那座城，旗换了三次。" },
        { text: "举家逃入山中", hint: "田产弃；身体 −10", effects: [{ k: "field_wet", v: -12 }, { k: "body", v: -10 }], then: "你带着家小躲进了山。山里没有粮，第一个冬天，你的小女儿没有熬过去。" }
      ]
    },
    {
      id: "b2.shibo", cat: "市井", title: "市舶", age: [20, 60], weight: 12,
      text: [
        "置市舶司于广州、泉州、明州。海舶入港，抽解十分之一，又博买其货。",
        "香料、犀角、象牙、珍珠，皆由此入。"
      ],
      options: [
        { text: "做出海生意", need: { minSilver: 30 }, hint: "银钱 −30；可能大赚", effects: [{ k: "silver", v: -30 }], then: "你把货装上了船。船往南去，去的是三佛齐。", gamble: { winChance: 0.58, win: [{ k: "silver", v: 90 }], lose: [{ k: "silver", v: -20 }, { k: "body", v: -12 }], winNote: "船回来了，货卖了三倍。", loseNote: "船遇到了风。货没了，人回来了。" } },
        { text: "在市舶司做书手", hint: "官职 +8；银钱 +10", effects: [{ k: "official", v: 8 }, { k: "silver", v: 10 }], then: "你在市舶司记簿。哪条船来，载什么货，抽了多少。数字很大，你的俸禄很小。" },
        { text: "在港边开客栈", hint: "银钱 +14；人脉 +10", effects: [{ k: "silver", v: 14 }, { k: "favor", v: 10 }], then: "你开了间客栈，专住海商。他们说的番话你听不懂，但他们给的钱是实在的。" }
      ]
    }
  ];

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = [

    {
      id: "x2.fanhan", cat: "官府", title: "番汉", age: [18, 60], weight: 16,
      text: [
        "西夏设番、汉两官：番官治党项部族，汉官治汉人州县。",
        "番官说党项话，写西夏字；汉官说汉话，写汉字。"
      ],
      options: [
        { text: "做番官", hint: "官职 +14；武艺 +6", effects: [{ k: "official", v: 14 }, { k: "martial", v: 6 }], then: "你做了番官。管的是部族，断案用的是习惯法，不是律令。" },
        { text: "做汉官", hint: "官职 +12；学识 +8", effects: [{ k: "official", v: 12 }, { k: "knowledge", v: 8 }], then: "你做了汉官。管的是州县，收的是田赋，断的是词讼。" },
        { text: "两边都做，做通事", hint: "银钱 +16；人脉 +12", effects: [{ k: "silver", v: 16 }, { k: "favor", v: 12 }], then: "你替番官和汉官传话。两边的话不一样，你得挑着说。" }
      ]
    },
    {
      id: "x2.wenzi", cat: "学问", title: "西夏字", age: [14, 45], weight: 14,
      text: [
        "始制西夏文字，形体方正，笔画繁复，与汉字并列。",
        "国中公文、佛经、碑刻，皆用此字。"
      ],
      options: [
        { text: "学西夏字", hint: "学识 +12；官职 +10", effects: [{ k: "knowledge", v: 12 }, { k: "official", v: 10 }], then: "你学了三年。西夏字有一千多个，笔画最繁的一个，有十九画。" },
        { text: "只学汉字", hint: "学识 +8", effects: [{ k: "knowledge", v: 8 }], then: "你只学汉字。汉人的书多，西夏字的书少。" },
        { text: "译汉文佛经为西夏文", hint: "学识 +16；声望 +10", effects: [{ k: "knowledge", v: 16 }, { k: "fame", v: 10 }], then: "你把《金刚经》译成了西夏文。译了四年。刻出来的时候，你在经末写了一行小字，是自己的名字。" }
      ]
    },
    {
      id: "x2.haoshuichuan2", cat: "世变", title: "好水川", era: "xxia", years: [1041, 1042], age: [14, 65], weight: 26, once: true,
      text: [
        "元昊以诱敌之计，败宋军于好水川。置鸽于匣中，宋军启匣，鸽起，伏兵四出。",
        "宋军死者万余人。"
      ],
      options: [
        { text: "从军，为铁鹞子", hint: "武艺 +14；私兵 +20", effects: [{ k: "martial", v: 14 }, { k: "troops", v: 20 }], then: "你是铁鹞子。人马皆披重甲，用钩索相连，虽死不坠。冲锋的时候，地都在响。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "在后方牧马", hint: "银钱 +8；身体 +2", effects: [{ k: "silver", v: 8 }, { k: "body", v: 2 }], then: "你在后方牧马。前线的消息传来时，你正在给一匹小马剪鬃。" },
        { text: "做向导，引宋军入伏", hint: "银钱 +14；声望 −8", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -8 }], then: "你领着宋军走了一条近路。走到谷底，你就不见了。" }
      ]
    },
    {
      id: "x2.quechang", cat: "市井", title: "榷场", age: [18, 60], weight: 14,
      text: [
        "与宋、金各置榷场。夏以青盐、马、驼毛、枸杞易宋之茶、绢、瓷。",
        "青盐是夏的命脉。宋禁之，则夏困。"
      ],
      options: [
        { text: "贩青盐", hint: "银钱 +20；风险", effects: [{ k: "silver", v: 20 }], then: "你把盐从盐池运到榷场。路上有宋的巡兵，也有夏的税吏。", gamble: { winChance: 0.7, win: [], lose: [{ k: "silver", v: -18 }, { k: "body", v: -10 }], winNote: "三年没有出事。", loseNote: "盐被宋兵截了。你逃回来，赔了本。" } },
        { text: "贩马", hint: "银钱 +16；武艺 +4", effects: [{ k: "silver", v: 16 }, { k: "martial", v: 4 }], then: "你把马赶到榷场。马是夏的强项，宋人买马，出的价高。" },
        { text: "在榷场做牙人", hint: "银钱 +12；人脉 +14", effects: [{ k: "silver", v: 12 }, { k: "favor", v: 14 }], then: "你做牙人，替两边讲价。讲成一笔，抽一成。两边的话你都会说。" }
      ]
    },
    {
      id: "x2.shuitian", cat: "营生", title: "水利", age: [20, 60], weight: 12,
      text: [
        "河西之地，赖汉唐旧渠：汉源、唐来、汉延诸渠，引黄河水灌田。",
        "渠坏则田荒。修渠要合数县之力。"
      ],
      options: [
        { text: "出资修渠", hint: "银钱 −18；田 +16 亩；声望 +10", effects: [{ k: "silver", v: -18 }, { k: "field_wet", v: 10 }, { k: "field_dry", v: 6 }, { k: "fame", v: 10 }], then: "你出了一份钱。渠修好了，水下来的时候，全村的人都站在渠边看。" },
        { text: "出力不出现", hint: "身体 −8；田 +10 亩", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }], then: "你去挖渠。挖了两个月，手上全是泡。水下来那天，你睡着了。" },
        { text: "不参与，自家的田靠天", hint: "无变", effects: [], then: "你没有参与。渠修好了，你家的田没有接上水，收成只有别人的一半。" }
      ]
    },
    {
      id: "x2.fosi", cat: "学问", title: "译经", age: [16, 55], weight: 11,
      text: [
        "西夏崇佛。自宋、吐蕃延请僧人，译经、建塔、刻碑。",
        "国中僧人有数千。"
      ],
      options: [
        { text: "出家为僧", hint: "学识 +12；免役", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 6 }, { k: "silver", v: 6 }], then: "你出了家。寺里有田，有经，有粥。僧人不服役，也不纳税。" },
        { text: "出资建塔", need: { minSilver: 26 }, hint: "银钱 −26；声望 +14", effects: [{ k: "silver", v: -26 }, { k: "fame", v: 14 }], then: "你建了一座砖塔，十三层。塔成那天，你在塔下站了很久。" },
        { text: "在家诵经，不剃度", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], then: "你在家诵经。会念几卷，也认几个字。田还是照种。" }
      ]
    },
    {
      id: "x2.tieyaozi", cat: "官府", title: "铁鹞子", age: [18, 45], weight: 12, sex: "male",
      text: [
        "铁鹞子者，夏之精骑。人马皆披甲，以钩索绞联，虽死马上不坠。",
        "选人极严，非壮健善骑者不得入。"
      ],
      options: [
        { text: "应选", hint: "武艺 +14；私兵 +16", effects: [{ k: "martial", v: 14 }, { k: "troops", v: 16 }], then: "你应了选。试骑、试射、试力。你过了。甲有四十斤，穿上之后，走路要人扶。" },
        { text: "不去，做步跋子", hint: "武艺 +8；私兵 +8", effects: [{ k: "martial", v: 8 }, { k: "troops", v: 8 }], then: "你做了步跋子，山地作战的步兵。翻山越岭，比马快。" },
        { text: "不入军", hint: "田 +10 亩", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }], then: "你没有入军。你在家种田。夏的兵不多，但个个能打，因为不能打的都去种田了。" }
      ]
    },
    {
      id: "x2.menggu", cat: "世变", title: "蒙古", era: "xxia", years: [1205, 1227], age: [12, 70], weight: 40, once: true,
      text: [
        "蒙古六征西夏。中兴府被围半年，城中粮尽，人相食。",
        "末主出降，旋即被杀。中兴府屠。"
      ],
      options: [
        { text: "守城", hint: "武艺 +14；声望 +16", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 16 }], then: "你守了五个月。城里的粮吃完了，先吃马，后吃别的。", gamble: { deathChance: 0.5, cause: "城破" } },
        { text: "降", hint: "声望 −20；可能活", effects: [{ k: "fame", v: -20 }], then: "你开了城门。蒙古的将看了你一眼，说了一句你听不懂的话。", gamble: { deathChance: 0.4, cause: "屠城" } },
        { text: "逃入山中", hint: "田产弃；身体 −14", effects: [{ k: "field_wet", v: -12 }, { k: "body", v: -14 }], then: "你逃进了祁连山。山里冷，但没有人杀你。你在山里过了三年，学会了吃草根。" }
      ]
    }
  ];

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = [

    {
      id: "j2.mengan", cat: "官府", title: "猛安谋克", age: [18, 55], weight: 18,
      text: [
        "猛安者千夫长，谋克者百夫长。三百户为谋克，十谋克为猛安。",
        "兵农合一，壮者皆兵，自备兵器马匹。"
      ],
      options: [
        { text: "入猛安谋克", hint: "武艺 +12；私兵 +18；田 +14 亩", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 18 }, { k: "field_wet", v: 8 }, { k: "field_dry", v: 6 }], then: "你入了谋克，分了三十亩地。平时种田，有事披甲。你的马是自己养的。" },
        { text: "做汉人，不入", hint: "田 +10 亩；赋重", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }, { k: "silver", v: -6 }], then: "你没有入。汉人的赋比猛安谋克重。你种同样的田，交更多的粮。" },
        { text: "入谋克，做到百夫长", hint: "官职 +14；私兵 +26", effects: [{ k: "official", v: 14 }, { k: "troops", v: 26 }], then: "你做到了谋克。管三百户，打起来能出三百人。你在马上点名的样子，被人记住了。" }
      ]
    },
    {
      id: "j2.nvzhenzi", cat: "学问", title: "女真字", age: [14, 50], weight: 11,
      text: [
        "完颜希尹依汉字、契丹字制女真大字，后又制小字。",
        "国中公文，女真字、汉字、契丹字三体并行。"
      ],
      options: [
        { text: "学女真字", hint: "学识 +10；官职 +10", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 10 }], then: "你学了女真小字。字形像汉字，但不是汉字。写起来快，认得的人少。" },
        { text: "学汉字", hint: "学识 +10", effects: [{ k: "knowledge", v: 10 }], then: "你学汉字。汉人的书多，法典、史书、诗文，都在汉文里。" },
        { text: "三体都学", hint: "学识 +14；官职 +12", effects: [{ k: "knowledge", v: 14 }, { k: "official", v: 12 }], then: "你三体都学。史馆修实录，三种文字的稿子都在你桌上。" }
      ]
    },
    {
      id: "j2.jingkang2", cat: "世变", title: "靖康", era: "jin", years: [1126, 1127], age: [14, 70], weight: 34, once: true,
      text: [
        "宗翰、宗望分道南下，破汴京。宋二帝出降。",
        "金人索金一千万锭、银二千万锭、帛一千万匹。城中括取殆尽。"
      ],
      options: [
        { text: "从军南下", hint: "私兵 +26；银钱 +20", effects: [{ k: "troops", v: 26 }, { k: "silver", v: 20 }], then: "你进了汴京。城里的东西，谁先拿到就是谁的。你拿了一箱书。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "留守北方，管汉地", hint: "官职 +14；学识 +6", effects: [{ k: "official", v: 14 }, { k: "knowledge", v: 6 }], then: "你留下来管新得的汉地。立了张邦昌，又废了。汉人的官换了几茬，吏没有换。" },
        { text: "在后方，不问军事", hint: "无变", effects: [], then: "你在后方。捷报传来，城里放了三天爆竹。" }
      ]
    },
    {
      id: "j2.hailing", cat: "世变", title: "南侵", era: "jin", years: [1161, 1162], age: [14, 70], weight: 26, once: true,
      text: [
        "海陵王完颜亮迁都燕京，复谋南侵。签发汉军，民大扰。",
        "采石之战，金军败。海陵为部下所杀。"
      ],
      options: [
        { text: "从军南下", hint: "武艺 +10；私兵 +18", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 18 }], then: "你过了淮河。采石江面上，宋的船比你们的大。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "被签发，半路逃", hint: "声望 −12；身体 −8", effects: [{ k: "fame", v: -12 }, { k: "body", v: -8 }], then: "你在半路逃了。逃回家里，家里的门已经被封了。" },
        { text: "在北方，拥立新主", hint: "官职 +16；声望 +8", effects: [{ k: "official", v: 16 }, { k: "fame", v: 8 }], then: "你在东京拥立了世宗。新主即位，你从一个小官变成了郎中。" }
      ]
    },
    {
      id: "j2.caishi", cat: "世变", title: "采石", era: "jin", years: [1161, 1162], age: [14, 65], weight: 22, once: true,
      text: [
        "虞允文以中书舍人犒师采石，见军无主，遂招诸将，勉以忠义。",
        "宋军以海鳅船冲金舟，金舟皆沉。"
      ],
      options: [
        { text: "在江上死战", hint: "武艺 +14；声望 +14", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 14 }], then: "你的船被撞沉了。你抱着一块木板，漂了半里，被自己人捞起来。", gamble: { deathChance: 0.4, cause: "溺死" } },
        { text: "退到北岸", hint: "声望 −10；保命", effects: [{ k: "fame", v: -10 }], then: "你退到了北岸。岸上的人比江里多，都在往北跑。" },
        { text: "降宋", hint: "声望 −16；官职 +8", effects: [{ k: "fame", v: -16 }, { k: "official", v: 8 }], then: "你降了宋。宋的官问你北边的事，你说了三天。家里人还在北边。" }
      ]
    },
    {
      id: "j2.hanhua2", cat: "官府", title: "汉制", era: "jin", years: [1150, 1200], age: [20, 65], weight: 14, once: true,
      text: [
        "金行汉制：设尚书省、置科举、修《泰和律》。女真子弟，亦令读汉文经史。",
        "有老女真说：这样下去，我们还认不认得自己。"
      ],
      options: [
        { text: "读汉文，应科举", hint: "学识 +14；官职 +12", effects: [{ k: "knowledge", v: 14 }, { k: "official", v: 12 }], then: "你读了汉文经史，中了进士。你的策论写得好，考官不知道你是女真还是汉人。" },
        { text: "守女真旧俗，习骑射", hint: "武艺 +14；官职 +6", effects: [{ k: "martial", v: 14 }, { k: "official", v: 6 }], then: "你没有读多少书。你的马术在部里第一。朝廷要用兵的时候，先想到的是你。" },
        { text: "两样都学", hint: "学识 +10；武艺 +10", effects: [{ k: "knowledge", v: 10 }, { k: "martial", v: 10 }], then: "你白天骑马，晚上读书。两样都不精，但两样都够用。" }
      ]
    },
    {
      id: "j2.tongjian", cat: "官府", title: "括地", age: [20, 60], weight: 12,
      text: [
        "通检推排：括民田、定物力，以均赋役。豪强隐田，往往查不出。",
        "吏来量你家的地。"
      ],
      options: [
        { text: "照实报", hint: "声望 +5", effects: [{ k: "fame", v: 5 }], then: "吏量了三天。量出来的数，比你报的多两亩。" },
        { text: "请吏吃饭，少报", need: { minSilver: 8 }, hint: "银钱 −8；银钱 +10", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -4 }], then: "吏在你家吃了一顿。簿上少写了八亩。往后每年的赋，轻了些。" },
        { text: "把田挂到猛安名下", hint: "免赋；依附", effects: [{ k: "favor", v: 12 }, { k: "fame", v: -8 }], then: "你把田挂到了一个猛安的名下。猛安的地不括。你每年给他送两成租。" }
      ]
    },
    {
      id: "j2.yehuling", cat: "世变", title: "野狐岭", era: "jin", years: [1211, 1215], age: [12, 70], weight: 34, once: true,
      text: [
        "蒙古南下，金军四十万于野狐岭。木华黎率敢死士冲之，金军大溃。",
        "自此金不能复振。"
      ],
      options: [
        { text: "从军御蒙", hint: "武艺 +12；私兵 +20", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 20 }], then: "你在野狐岭。四十万人挤在一条谷里，退不出来。", gamble: { deathChance: 0.4, cause: "战殁" } },
        { text: "守城", hint: "官职 +10；声望 +12", effects: [{ k: "official", v: 10 }, { k: "fame", v: 12 }], then: "你守了一座城。守了四个月，粮尽。开城的时候，你走在最前面。", gamble: { deathChance: 0.3, cause: "城破" } },
        { text: "举家南迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -14 }, { k: "silver", v: -12 }], then: "你往南走。走到黄河边，看见南岸的兵也在往南走。" }
      ]
    },
    {
      id: "j2.caizhou", cat: "世变", title: "蔡州", era: "jin", years: [1233, 1234], age: [12, 70], weight: 30, once: true,
      text: [
        "蒙古与宋合兵围蔡州。城中粮尽，人相食。",
        "末帝自缢于幽兰轩。金亡。"
      ],
      options: [
        { text: "守城至死", hint: "声望 +20；必死", effects: [{ k: "fame", v: 20 }], then: "你守到了最后一天。城破的时候，你把刀横在颈上。", gamble: { deathChance: 0.85, cause: "城破" } },
        { text: "降", hint: "声望 −18；活", effects: [{ k: "fame", v: -18 }], then: "你降了。蒙古的将让你去收尸。你收了三千具，埋在城北。" },
        { text: "逃出去", hint: "身体 −16；田产弃", effects: [{ k: "body", v: -16 }, { k: "field_wet", v: -10 }], then: "你从水门逃出去。外面是蒙古的营。你绕着走了一夜，走到了宋的界上。" }
      ]
    }
  ];

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = [

    {
      id: "ns2.shaoxing", cat: "世变", title: "绍兴", era: "nsong", years: [1141, 1142], age: [14, 70], weight: 28, once: true,
      text: [
        "宋金议和：东以淮水、西以大散关为界。宋岁贡银二十五万两、绢二十五万匹。",
        "岳飞下狱，死。韩世忠解兵柄，骑驴湖上。"
      ],
      options: [
        { text: "主和，受和议", hint: "官职 +12；声望 −10", effects: [{ k: "official", v: 12 }, { k: "fame", v: -10 }], then: "你在和议的文书上用了印。此后二十年，边上没有大仗。" },
        { text: "主战，上书", hint: "声望 +18；官职 −16", effects: [{ k: "fame", v: 18 }, { k: "official", v: -16 }], then: "你上了书，说和议不可恃。书留中不发。三个月后，你被外放到一个远县。" },
        { text: "不问朝政，回乡", hint: "田 +14 亩", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 6 }], then: "你回了乡。乡里的人问你岳飞的死，你说：不知道。此后二十年，你没有再谈过朝政。" }
      ]
    },
    {
      id: "ns2.yuefei", cat: "世变", title: "郾城", era: "nsong", years: [1140, 1141], age: [14, 65], weight: 26, once: true,
      text: [
        "岳飞大破金兀术于郾城，以麻札刀入阵，专斫马足。",
        "进军朱仙镇，距汴京四十五里。诏书一日十二道，促其班师。"
      ],
      options: [
        { text: "从岳家军", hint: "武艺 +14；私兵 +22", effects: [{ k: "martial", v: 14 }, { k: "troops", v: 22 }], then: "你在郾城。刀砍马腿的时候，马倒下来，人也倒下来。", gamble: { deathChance: 0.24, cause: "战殁" } },
        { text: "在后方运粮", hint: "银钱 +8；声望 +8", effects: [{ k: "silver", v: 8 }, { k: "fame", v: 8 }], then: "你押粮到朱仙镇。班师的那天，兵从你身边过，没有人说话。" },
        { text: "在家，不问军事", hint: "无变", effects: [], then: "你在家里。听说岳爷爷被杀了，你在门口坐了一夜。" }
      ]
    },
    {
      id: "ns2.caishi2", cat: "世变", title: "采石", era: "nsong", years: [1161, 1162], age: [14, 65], weight: 24, once: true,
      text: [
        "金主亮南侵，兵号六十万。虞允文犒师采石，见诸将无主，遂集诸军，勉以忠义。",
        "以海鳅船冲之，金舟尽沉。"
      ],
      options: [
        { text: "从虞允文守江", hint: "官职 +12；声望 +16", effects: [{ k: "official", v: 12 }, { k: "fame", v: 16 }], then: "你在采石。江上的船撞在一起，喊声盖过了水声。", gamble: { deathChance: 0.28, cause: "战殁" } },
        { text: "去犒军，做书手", hint: "官职 +8；学识 +6", effects: [{ k: "official", v: 8 }, { k: "knowledge", v: 6 }], then: "你跟着虞允文记功。记了两千三百人。有几个名字，你记了两次，因为他们的家属来了。" },
        { text: "举家避入内地", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -10 }, { k: "silver", v: -8 }], then: "你往内地走。走到临安，那里的人还在照常做生意。" }
      ]
    },
    {
      id: "ns2.kaixi", cat: "世变", title: "开禧", era: "nsong", years: [1206, 1208], age: [16, 65], weight: 22, once: true,
      text: [
        "韩侂胄主北伐，出师败绩。金人分道南下，至长江。",
        "杀侂胄，函首以畀金，复和。"
      ],
      options: [
        { text: "从军北伐", hint: "武艺 +12；私兵 +18", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 18 }], then: "你过了淮河。北边的城，一个也没攻下来。退的时候，路上全是溃兵。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "反对北伐，上书", hint: "声望 +12；官职 −10", effects: [{ k: "fame", v: 12 }, { k: "official", v: -10 }], then: "你上书说不可轻战。没有人听。败了之后，有人想起你的奏书。" },
        { text: "在家，不问", hint: "无变", effects: [], then: "你在家。败报传来那天，米价一天涨了三次。" }
      ]
    },
    {
      id: "ns2.duanping", cat: "世变", title: "端平", era: "nsong", years: [1234, 1235], age: [14, 70], weight: 22, once: true,
      text: [
        "宋与蒙古合兵灭金，复三京。入洛阳，蒙古兵至，宋军大溃。",
        "自此宋与蒙古接境，兵连祸结。"
      ],
      options: [
        { text: "从军入洛", hint: "武艺 +10；私兵 +16", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 16 }], then: "你进了洛阳。城里没有粮。蒙古的兵来了，你们退，一路退到淮河。", gamble: { deathChance: 0.34, cause: "战殁" } },
        { text: "反对入洛，言不可守", hint: "声望 +14；官职 −8", effects: [{ k: "fame", v: 14 }, { k: "official", v: -8 }], then: "你说三京不可守。败了之后，你的话被抄在邸报上，抄的人没有写你的名字。" },
        { text: "在后方，备边", hint: "官职 +10", effects: [{ k: "official", v: 10 }], then: "你在后方修城、积粮。此后四十年，这些城一座一座被攻破。" }
      ]
    },
    {
      id: "ns2.xiangyang", cat: "世变", title: "襄阳", era: "nsong", years: [1267, 1276], age: [12, 70], weight: 36, once: true,
      text: [
        "蒙古围襄阳五年。张顺、张贵以轻舟突破围，入城，皆战死。",
        "回回炮至，城破。"
      ],
      options: [
        { text: "守襄阳", hint: "武艺 +14；声望 +20", effects: [{ k: "martial", v: 14 }, { k: "fame", v: 20 }], then: "你守了三年。城里的粮吃完了，吃马；马吃完了，吃别的。", gamble: { deathChance: 0.55, cause: "城破" } },
        { text: "在后方运粮", hint: "身体 −12；声望 +10", effects: [{ k: "body", v: -12 }, { k: "fame", v: 10 }], then: "你押粮往襄阳去。船到江心，被截了。你跳了水，游了回来。" },
        { text: "举家南迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -12 }, { k: "silver", v: -10 }], then: "你往南走。走到福建，那里已经挤满了从江西、湖南来的人。" }
      ]
    },
    {
      id: "ns2.yashan", cat: "世变", title: "崖山", era: "nsong", years: [1279, 1280], age: [12, 70], weight: 30, once: true,
      text: [
        "宋军大败于崖山。陆秀夫负帝昺投海，后宫诸臣从死者甚众。",
        "七日，浮尸出于海十余万人。"
      ],
      options: [
        { text: "从死", hint: "声望 +24；必死", effects: [{ k: "fame", v: 24 }], then: "你上了船。船沉的时候，海是黑的。", gamble: { deathChance: 0.9, cause: "投海" } },
        { text: "降元", hint: "声望 −20；活", effects: [{ k: "fame", v: -20 }], then: "你降了。元将问你会做什么。你说会写字。他让你做了书吏。" },
        { text: "逃入海岛", hint: "身体 −14；田产弃", effects: [{ k: "body", v: -14 }, { k: "field_wet", v: -10 }], then: "你上了一艘小船，往南走。走了三天，到了一个渔村。你在那里住了下来，改了口音。" }
      ]
    },
    {
      id: "ns2.shibo2", cat: "市井", title: "市舶", age: [20, 60], weight: 14,
      text: [
        "市舶之利最厚。泉州、广州、明州，海舶辐辏。抽解之外，又有博买。",
        "泉州城南，番人聚居，有清净寺、有蕃学。"
      ],
      options: [
        { text: "出海贩货", need: { minSilver: 30 }, hint: "银钱 −30；可能大赚", effects: [{ k: "silver", v: -30 }], then: "你把瓷器和丝绸装上船，往三佛齐去。", gamble: { winChance: 0.6, win: [{ k: "silver", v: 95 }], lose: [{ k: "silver", v: -24 }, { k: "body", v: -10 }], winNote: "船回来了，货卖了三倍。", loseNote: "船遇到了风，货沉了。" } },
        { text: "在泉州开番货铺", hint: "银钱 +18；人脉 +12", effects: [{ k: "silver", v: 18 }, { k: "favor", v: 12 }], then: "你开了间铺子，卖香料、犀角、乳香。买主一半是官，一半是寺。" },
        { text: "做通事，替番商传话", hint: "银钱 +14；学识 +8", effects: [{ k: "silver", v: 14 }, { k: "knowledge", v: 8 }], then: "你学了几句番话，替番商报关。抽解的时候，你在旁边站着。" }
      ]
    },
    {
      id: "ns2.huizi", cat: "市井", title: "会子", era: "nsong", years: [1160, 1275], age: [18, 65], weight: 14, once: true,
      text: [
        "行在会子务印会子，一贯为一会。初行于两浙，后通行于诸路。",
        "印得多了，会子就轻了。"
      ],
      options: [
        { text: "用会子，方便携带", hint: "银钱 +10", effects: [{ k: "silver", v: 10 }], then: "你把钱换成了会子。轻便。十年后，一贯会子只值二百文。" },
        { text: "换金银，不信纸", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }], then: "你把钱都换成了金银，埋在院子里。你不识字，但你信手里的东西。" },
        { text: "做会子务的书手", hint: "官职 +8；学识 +6", effects: [{ k: "official", v: 8 }, { k: "knowledge", v: 6 }], then: "你在会子务写券。券上的字号，你写得比谁都正。" }
      ]
    },
    {
      id: "ns2.shuyuan", cat: "学问", title: "书院", age: [16, 55], weight: 14, when: { minKnowledge: 35 },
      text: [
        "朱熹集理学之大成，讲学于白鹿洞、岳麓。书院之设，遍于州郡。",
        "学规写着：父子有亲，君臣有义，夫妇有别，长幼有序。"
      ],
      options: [
        { text: "入书院读书", hint: "学识 +16；银钱 −8", effects: [{ k: "knowledge", v: 16 }, { k: "silver", v: -8 }], then: "你在书院住了六年。读的是《四书章句》，写的是时文。山长说你的文章「有根柢」。" },
        { text: "建一座书院", need: { minSilver: 34 }, hint: "银钱 −34；声望 +18", effects: [{ k: "silver", v: -34 }, { k: "fame", v: 18 }], then: "你建了一座书院，置了三十亩学田。此后一百年，那里出了七个进士。" },
        { text: "不读理学，治事功之学", hint: "学识 +10；官职 +8", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 8 }], then: "你读的是《通鉴》、是兵书、是河渠书。理学的先生说你「驳杂」。" }
      ]
    },
    {
      id: "ns2.weitian", cat: "营生", title: "圩田", age: [20, 60], weight: 12,
      text: [
        "江东水乡，筑堤围田，谓之圩田。圩大者千顷，小者数十亩。",
        "圩田不忧旱，只忧涝。堤一破，全圩皆没。"
      ],
      options: [
        { text: "筑圩开田", need: { minSilver: 24 }, hint: "银钱 −24；田 +30 亩", effects: [{ k: "silver", v: -24 }, { k: "field_wet", v: 20 }, { k: "field_dry", v: 10 }], then: "你筑了一道堤，围了三十亩。第一年种稻，收了三石一亩。" },
        { text: "在别人的圩里佃田", hint: "粮 +10 石", effects: [{ k: "grain", v: 10 }], then: "你佃了十亩圩田。租是五成。堤破的那一年，你什么也没收到，租还是要交。" },
        { text: "不筑圩，种山田", hint: "田 +10 亩；收薄", effects: [{ k: "field_dry", v: 8 }], then: "你在山坡上开了十亩。山田薄，一亩只收一石。但不怕水。" }
      ]
    }
  ];

})(window.PACK_BASE);
