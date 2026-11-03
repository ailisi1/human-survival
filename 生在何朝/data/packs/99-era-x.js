/* 生在何朝 · 各朝专有事件 补遗卷（72 条）
 *
 * 50–53 号是「各朝专有事件」的最早一稿，60–63 号是后来重写的一稿。
 * 两者都用 `B.eraEvents.x = [ ... ]` 直接赋值，后加载者把前者整个顶掉，
 * 于是 50–53 的 182 条一个字都没跑过。
 *
 * 本卷只收「重写稿没有同朝同题」的部分：182 条里剔除 110 条同题废稿，实收 72 条，
 * 一律 concat 接在现有池后。id 沿用旧前缀（q2./w2./wd2./l2./b2./j2./ns2./y2./qi2.），
 * 与现行各包不撞。
 *
 * 规矩与 50–53 号一致：只写「只有这一朝才有的制度与事」，别朝不出现。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  function add(era, list) {
    B.eraEvents[era] = (B.eraEvents[era] || []).concat(list);
  }

  /* ══════════ 秦 · 4 条 ══════════ */
  add("qin", [
    {
        id: "q2.zheshu", cat: "官府", title: "谪戍", age: [18, 50], weight: 12,
        text: [
          "有诏：谪治狱吏不直者，筑长城；尝逋亡人、赘婿、贾人，略取陆梁地。",
          "你的名字在谪籍上。往北，或者往南，都没有归期。"
        ],
        options: [
          { text: "北去筑城", hint: "身体 −12；武艺 +6", effects: [{ k: "body", v: -12 }, { k: "martial", v: 6 }], then: "你在阴山下夯土。冬天土冻得像石头，要用火烧过才能夯。同伍的人死了七个。" },
          { text: "南戍五岭", hint: "身体 −8；染瘴", effects: [{ k: "body", v: -8 }, { k: "luck", v: -1 }], then: "南边的林子密得看不见天。第一年，队里死了三成，都是发热死的。" },
          { text: "以钱赎", need: { minSilver: 20 }, hint: "银钱 −20；免戍", effects: [{ k: "silver", v: -20 }], then: "赎钱交上去，名字从谪籍上划了。你回家那天，母亲在门口坐了一夜。" }
        ]
      },
    {
        id: "q2.mingtian", cat: "营生", title: "自实田", age: [20, 60], weight: 13,
        text: [
          "令黔首自实田：各人把自家的田亩数报官，官为定籍。",
          "报多了多缴，报少了，查出来要罚。"
        ],
        options: [
          { text: "照实报", hint: "声望 +5", effects: [{ k: "fame", v: 5 }], then: "你把三十七亩全报了上去。定籍的吏用尺量了一遍，量出来是三十五亩。" },
          { text: "报少五亩", hint: "银钱 +6；声望 −5", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -5 }], then: "少报的五亩，租税都归自己。此后每年秋后，你都比别人多剩两石粟。" },
          { text: "报多十亩，换个爵", hint: "声望 +8；赋重", effects: [{ k: "fame", v: 8 }, { k: "silver", v: -8 }], then: "田多者得爵。你得了公士，能衣绣、能佩剑。可多报的十亩，年年要缴租。" }
        ]
      },
    {
        id: "q2.daze", cat: "世变", title: "大泽乡", era: "qin", years: [-209, -208], age: [10, 70], weight: 40, once: true,
        text: [
          "戍卒九百人屯大泽乡，会天大雨，道不通，度已失期。失期，法皆斩。",
          "陈胜、吴广杀尉，揭竿。郡县少年，皆往从之。"
        ],
        options: [
          { text: "从。反正是死", hint: "私兵 +30；声望 +12", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 12 }, { k: "body", v: -6 }], then: "你斩了一根木棍，跟着人群走。走了三个月，你手下有了百来人。", gamble: { deathChance: 0.28, cause: "战殁" } },
          { text: "守家，不走", hint: "身体 −4；粮被征", effects: [{ k: "body", v: -4 }, { k: "grain", v: -8 }], then: "你把门关了三道。兵过境，粮被搜走一半。人没死，田还在。" },
          { text: "举族避入山中", hint: "田产弃；声望 −6", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "fame", v: -6 }], then: "你带着一家老小进了山。在山里住了一年半，靠野菜和溪鱼。出来时，村里一半的房子没了屋顶。" }
        ]
      },
    {
        id: "q2.julu", cat: "世变", title: "巨鹿", era: "qin", years: [-208, -207], age: [10, 70], weight: 34, once: true,
        text: [
          "章邯围巨鹿，诸侯皆壁上观。项羽渡河，皆沉船，破釜甑，持三日粮。",
          "九战，秦军大破。秦之亡，自此始。"
        ],
        options: [
          { text: "投楚军", hint: "武艺 +10；私兵 +20", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 20 }], then: "你跟着项羽的兵过了河。沉船那天，你把自己的船也凿了。", gamble: { deathChance: 0.3, cause: "战殁" } },
          { text: "降", hint: "声望 −10；保住性命", effects: [{ k: "fame", v: -10 }], then: "你放下了兵器。二十万秦卒后来在新安被坑了。你因为会写字，被留在营里做文书，活了下来。" },
          { text: "逃回乡里", hint: "身体 −8；声望 −6", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], then: "你脱了甲，往南走了十一天。到家时，乡里已经换了旗。" }
        ]
      }
  ]);

  /* ══════════ 西汉 · 5 条 ══════════ */
  add("whan", [
    {
        id: "w2.suanfu", cat: "官府", title: "算赋", age: [16, 60], weight: 16,
        text: [
          "民年十五以上至五十六，出赋钱，人百二十为一算。商贾与奴婢，倍算。",
          "乡啬夫拿着算簿挨户来收。"
        ],
        options: [
          { text: "照数纳", hint: "银钱 −5；声望 +3", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 3 }], then: "一百二十钱，装了半小袋。啬夫点完，在簿上画了个勾。" },
          { text: "少报两口人", hint: "银钱 +4；声望 −5", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -5 }], then: "你把小的两个孩子没报。此后十年，他们在家里的名字跟在外面不一样。" },
          { text: "让老的报「老免」", hint: "银钱 +3；需打点", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -3 }], then: "老人过了五十六，本不该再纳。你让他多报了两岁。他不太愿意，还是报了。" }
        ]
      },
    {
        id: "w2.wuzhu", cat: "市井", title: "五铢", age: [18, 65], weight: 12,
        text: [
          "废半两，行五铢钱。钱面有「五铢」二字，重如其文。",
          "市上还有旧钱在流，一枚旧钱能换两枚新钱，也有人不肯收。"
        ],
        options: [
          { text: "把旧钱都换成新钱", hint: "银钱 −2；安心", effects: [{ k: "silver", v: -2 }], then: "你在市上换了一整天。换完把钱串起来，挂在梁上，夜里听见铜碰铜的声音。" },
          { text: "收旧钱，等它涨", hint: "银钱 +8；风险", effects: [{ k: "silver", v: 8 }], then: "你收了三百枚旧钱。三年后官禁愈严，旧钱贱了，你赔了一半。" },
          { text: "自己盗铸", hint: "银钱 +14；重罪", effects: [{ k: "silver", v: 14 }], then: "你削薄了钱肉，一枚当两枚用。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -20 }, { k: "fame", v: -16 }], winNote: "没人看出来。", loseNote: "有人告发。盗铸者弃市，你因为年幼减死，输作左校。" } }
        ]
      },
    {
        id: "w2.qiguo", cat: "世变", title: "七国", era: "whan", years: [-154, -153], age: [10, 70], weight: 32, once: true,
        text: [
          "晁错请削诸侯地。吴王濞合楚、赵、胶西、胶东、菑川、济南，举兵反，名「请诛晁错」。",
          "天下震动。郡县都要表态。"
        ],
        options: [
          { text: "从朝廷，守城", hint: "官职 +8；声望 +6", effects: [{ k: "official", v: 8 }, { k: "fame", v: 6 }], then: "你守了一座小城，守了四十天。周亚夫的兵到时，城里的粮还剩三日。", gamble: { deathChance: 0.18, cause: "守城" } },
          { text: "从吴王", hint: "私兵 +30；声望 +6", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 6 }], then: "你跟着吴王的兵往西走。走到梁国，被挡住了。三个月后，吴王败走，你烧了旗，回了乡。", gamble: { deathChance: 0.3, cause: "兵败" } },
          { text: "闭门不出", hint: "声望 −6；粮被抢", effects: [{ k: "fame", v: -6 }, { k: "grain", v: -10 }], then: "你把门堵了。两边的人都来要粮，你两边都给。给了就没人再来了。" }
        ]
      },
    {
        id: "w2.luntai", cat: "世变", title: "轮台", era: "whan", years: [-89, -88], age: [12, 70], weight: 18, once: true,
        text: [
          "诏曰：当今务在禁苛暴，止擅赋，力本农。修马复令以补缺，毋乏武备而已。",
          "这道诏书，后人叫它「轮台哀痛之诏」。"
        ],
        options: [
          { text: "回乡务农", hint: "田 +10 亩；身体 +4", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }, { k: "body", v: 4 }], then: "你放下了兵器，回家开荒。那几年，边郡的人陆续回来，荒了的田重新有了人走的路。" },
          { text: "仍在军中", hint: "武艺 +8；官职 +4", effects: [{ k: "martial", v: 8 }, { k: "official", v: 4 }], then: "你没有走。仗少了，兵还得有人带。你在边郡又待了十二年。" },
          { text: "上书言屯田之利", hint: "官职 +10；学识 +4", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 4 }], then: "你的奏书被采了一部分：拨了三千人在轮台屯田。第一年收的粟，不够种子。" }
        ]
      },
    {
        id: "w2.xiantian", cat: "官府", title: "限田", era: "whan", years: [-7, -5], age: [16, 70], weight: 16, once: true,
        text: [
          "丞相孔光、大司空何武奏：诸侯王、列侯、公主名田，皆有限；关内侯、吏民名田，毋过三十顷；奴婢毋过三十人。",
          "限田之议，行了几个月，又罢了。"
        ],
        options: [
          { text: "趁限令未罢，赶紧买田", hint: "田 +25 亩；银钱 −20", effects: [{ k: "field_wet", v: 15 }, { k: "field_dry", v: 10 }, { k: "silver", v: -20 }], then: "你在限令罢之前买了二十五亩。买完第二个月，令罢了，田价涨了一倍。" },
          { text: "把多的田分到族人名下", hint: "声望 +6；避限", effects: [{ k: "fame", v: 6 }], then: "你把田分写在三个族人名下，契约藏在祠堂的梁上。此后二十年，这些田名义上不是你的。" },
          { text: "上书支持限田", hint: "声望 +10；得罪豪家", effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 10 }], then: "你的奏书在郡里传抄。有人称你「有古大臣风」，也有人在市上拦住你的车，看了你很久。" }
        ]
      }
  ]);

  /* ══════════ 新 · 2 条 ══════════ */
  add("xin", [
    {
        id: "x2.xiongnu", cat: "世变", title: "易印", years: [9, 23], age: [14, 65], weight: 14, once: true,
        text: [
          "遣使匈奴，易单于故印，改「匈奴单于」为「降奴服于」，又分匈奴为十五单于。",
          "单于怒，遣兵入边。边郡的人先知道了。"
        ],
        options: [
          { text: "往内地迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: -6 }], then: "你举家往南走了三百里。走的时候，边上的烽火已经点了三天。" },
          { text: "留在边郡，投军", hint: "武艺 +10；私兵 +12", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 12 }], then: "你留下来了。边郡的兵不够，连种田的也被编了队。", gamble: { deathChance: 0.25, cause: "战殁" } },
          { text: "给匈奴人做通译", hint: "银钱 +14；声望 −12", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -12 }], then: "你通匈奴语，替两边传话。钱来得容易。乡里的人不跟你说话，但也没人敢动你。" }
        ]
      },
    {
        id: "x2.liumin", cat: "世变", title: "流民", years: [15, 23], age: [10, 70], weight: 20,
        text: [
          "连年旱蝗，关东人相食。流民入关者数十万，饿死者十七八。",
          "村口来了几车人，问有没有活干，只要一口饭。"
        ],
        options: [
          { text: "雇几个，管饭不给钱", hint: "田 +6 亩；粮 −8 石；声望 +4", effects: [{ k: "field_wet", v: 4 }, { k: "field_dry", v: 2 }, { k: "grain", v: -8 }, { k: "fame", v: 4 }], then: "你雇了四个人。他们干得比本村的人还卖力。冬天要给饭，粮食就不够。" },
          { text: "开粥棚，舍粥", hint: "粮 −14 石；声望 +16", effects: [{ k: "grain", v: -14 }, { k: "fame", v: 16 }], then: "你在村口支了两口大锅，舍了四十天。有人喝完粥就倒在路边死了。你叫人抬去埋了。" },
          { text: "关门，不放人进来", hint: "声望 −10；粮保住", effects: [{ k: "fame", v: -10 }], then: "你把门闩上。夜里有人拍门，拍了很久，后来不拍了。" }
        ]
      }
  ]);

  /* ══════════ 东汉 · 2 条 ══════════ */
  add("ehan", [
    {
        id: "e2.dongzhuo", cat: "世变", title: "董卓", era: "ehan", years: [189, 192], age: [14, 70], weight: 32, once: true,
        text: [
          "董卓入洛阳，废少帝，立陈留王。纵兵剽掠，谓之「搜牢」。",
          "又迁都长安，尽徙洛阳人数百万口。步骑驱蹙，饥饿寇掠，积尸盈路。"
        ],
        options: [
          { text: "随驾西迁", hint: "田产弃；声望 +6", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "fame", v: 6 }], then: "你跟着人群往西走。走了二十天，路上看见的车，多半是空的。" },
          { text: "留在洛阳，投关东兵", hint: "私兵 +24；声望 +12", effects: [{ k: "troops", v: 24 }, { k: "fame", v: 12 }], then: "关东兵到了洛阳，洛阳已经烧成白地。他们在废墟上摆了酒席。", gamble: { deathChance: 0.2, cause: "兵乱" } },
          { text: "避入荆州", hint: "田产折半；学识 +6", effects: [{ k: "field_wet", v: -8 }, { k: "knowledge", v: 6 }], then: "你往南走到荆州。那里没有兵，但有从北边来的几万人。地价一年涨了三倍。" }
        ]
      },
    {
        id: "e2.maiguan", cat: "官府", title: "卖官", years: [178, 189], age: [24, 65], weight: 12,
        text: [
          "开鸿都门，榜卖官爵。公千万，卿五百万。富者则先入钱，贫者到官而后倍输。",
          "有个县令的缺，标价四百万。"
        ],
        options: [
          { text: "买", need: { minSilver: 40 }, hint: "银钱 −40；官职 +20", effects: [{ k: "silver", v: -40 }, { k: "official", v: 20 }], then: "你买了那个缺。到任第一天，你就开始算：这四百万，几年能收回来。" },
          { text: "不买，等举荐", hint: "官职 +4", effects: [{ k: "official", v: 4 }], then: "你等了六年。六年里，那个位置换了四个人，都是买的。" },
          { text: "替人垫钱，做他的债主", hint: "银钱 −30；人脉 +20", effects: [{ k: "silver", v: -30 }, { k: "favor", v: 20 }], then: "你垫钱给一个同乡买了县丞。他到任后，县里的事你先知道。" }
        ]
      }
  ]);

  /* ══════════ 三国 · 5 条 ══════════ */
  add("sg", [
    {
        id: "s2.caochan", cat: "世变", title: "代汉", era: "sg", years: [220, 234], age: [14, 70], weight: 26, once: true,
        text: [
          "魏王丕受禅于汉，改元黄初。汉献帝封山阳公，奉汉正朔。",
          "四百年汉家天下，至此而终。"
        ],
        options: [
          { text: "劝进", hint: "官职 +10；声望 −4", effects: [{ k: "official", v: 10 }, { k: "fame", v: -4 }], then: "劝进表上有你的名字。新朝留任，你还是原来的官，只是印上的字换了。" },
          { text: "不仕新朝，归乡", hint: "声望 +12；官职 −20", effects: [{ k: "fame", v: 12 }, { k: "official", v: -20 }], then: "你把官印挂在梁上，回了乡。有人称你「汉之遗民」，你不接这个话。" },
          { text: "痛哭于汉庙", hint: "声望 +16；风险", effects: [{ k: "fame", v: 16 }], then: "你在汉的宗庙前哭了一场。围观的人很多。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -16 }, { k: "fame", v: -10 }], winNote: "没有人来抓你。", loseNote: "有司以「非所宜言」论罪，你被收系狱中三月。" } }
        ]
      },
    {
        id: "s2.wuzhangyuan", cat: "世变", title: "五丈原", era: "sg", years: [234, 235], age: [14, 70], weight: 28, once: true,
        text: [
          "丞相亮出斜谷，屯五丈原，分兵屯田，为久驻之计。",
          "司马懿坚守不出。相持百余日。八月，亮卒于军中。"
        ],
        options: [
          { text: "从蜀军北伐", hint: "武艺 +10；私兵 +16", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 16 }], then: "你在渭南屯田。丞相死后，全军退回汉中。你回头看了一眼北边的山。", gamble: { deathChance: 0.2, cause: "病殁" } },
          { text: "从魏军守渭", hint: "官职 +8；私兵 +12", effects: [{ k: "official", v: 8 }, { k: "troops", v: 12 }], then: "你守渭水北岸，不战。蜀军退后，营里的人都松了一口气，也有人觉得没意思。" },
          { text: "在家，不问南北", hint: "田 +8 亩", effects: [{ k: "field_wet", v: 5 }, { k: "field_dry", v: 3 }], then: "你在关中种田。两边的兵来回过，你的田被踩了两回，秋后还是收了。" }
        ]
      },
    {
        id: "s2.gaopingling", cat: "世变", title: "高平陵", era: "sg", years: [249, 250], age: [16, 70], weight: 28, once: true,
        text: [
          "大将军曹爽奉帝谒高平陵。司马懿闭城门，据武库，奏爽罪。",
          "爽犹豫不决，终曰：我亦不失作富家翁。遂降。旋夷三族。"
        ],
        options: [
          { text: "从司马氏", hint: "官职 +16；声望 −8", effects: [{ k: "official", v: 16 }, { k: "fame", v: -8 }], then: "你在城门上值守。曹爽的人头送来那天，你听见有人在墙角吐。" },
          { text: "从曹爽", hint: "声望 +12；风险", effects: [{ k: "fame", v: 12 }], then: "你劝曹爽起兵。他没有听。", gamble: { winChance: 0.35, win: [], lose: [{ k: "body", v: -30 }, { k: "fame", v: -10 }], winNote: "事成，你得了官。", loseNote: "三族之诛，你一门只剩一个在外的幼子。" } },
          { text: "闭门，谁也不从", hint: "声望 −4；保命", effects: [{ k: "fame", v: -4 }], then: "你关了门。那几日洛阳城里天天有人被押着过街。你从门缝里看，看了三天就不看了。" }
        ]
      },
    {
        id: "s2.shuhan", cat: "世变", title: "蜀亡", era: "sg", years: [263, 264], age: [12, 70], weight: 30, once: true,
        text: [
          "邓艾自阴平道行无人之地七百余里，凿山通道，裹毡推转而下。",
          "兵临成都，后主出降。蜀亡。"
        ],
        options: [
          { text: "守剑阁", hint: "武艺 +10；官职 +10", effects: [{ k: "martial", v: 10 }, { k: "official", v: 10 }], then: "你在剑阁守了两个月。后主降的诏书送到时，姜维把刀砍在石头上，砍出了火花。", gamble: { deathChance: 0.16, cause: "战殁" } },
          { text: "随军入蜀，取财货", hint: "银钱 +24；声望 −10", effects: [{ k: "silver", v: 24 }, { k: "fame", v: -10 }], then: "你跟着魏军进了成都。市上的东西，谁先拿到就是谁的。" },
          { text: "在蜀中，举家避乱", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: -8 }], then: "你带着家人往南走，走到犍为。那里的山里，已经住了不少从成都逃出来的人。" }
        ]
      },
    {
        id: "s2.nanzhong", cat: "官府", title: "南中", age: [18, 55], weight: 11,
        text: [
          "南中诸郡，夷汉杂居。雍闿、孟获相继而反。丞相南征，凡七虏七赦。",
          "你在南中做县吏。"
        ],
        options: [
          { text: "从丞相南征", hint: "武艺 +8；官职 +10", effects: [{ k: "martial", v: 8 }, { k: "official", v: 10 }], then: "你随军过了泸水。五月的瘴气，让队里死了三成人。你在其中活了下来。" },
          { text: "从夷人", hint: "私兵 +20；声望 +8", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 8 }], then: "你跟着孟获。第七次被擒之后，孟获说：丞相天威，南人不复反矣。你放下了刀。" },
          { text: "率县民守城", hint: "私兵 +14；声望 +10", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 10 }], then: "你守住了县城。城里汉夷各半，你两边都发了粮。" }
        ]
      }
  ]);

  /* ══════════ 西晋 · 2 条 ══════════ */
  add("wjin", [
    {
        id: "wj2.yinke", cat: "官府", title: "荫客", age: [20, 60], weight: 12,
        text: [
          "品官各以贵贱占田，又得荫其亲属，多者及九族，少者三世。",
          "你家有人在朝为五品官。族里的人都来投。"
        ],
        options: [
          { text: "广收族人", hint: "声望 +12；粮 −10 石", effects: [{ k: "fame", v: 12 }, { k: "grain", v: -10 }], then: "你收了三房远亲。院子里从此很挤，吃饭要开两桌。" },
          { text: "只收近支", hint: "声望 +4；粮 −4 石", effects: [{ k: "fame", v: 4 }, { k: "grain", v: -4 }], then: "你只收了兄弟几家。远房的来了，你给一斗米，让他们回去。" },
          { text: "不收，怕惹事", hint: "声望 −8", effects: [{ k: "fame", v: -8 }], then: "你把门关了。族里有人说你「贵而忘亲」。这话传了十年。" }
        ]
      },
    {
        id: "wj2.zhigui", cat: "学问", title: "纸贵", era: "wjin", years: [280, 300], age: [16, 50], weight: 10, when: { minKnowledge: 45 }, once: true,
        text: [
          "左思作《三都赋》，初出，时人未之重。后得皇甫谧作序，张载、刘逵注解，于是豪贵之家竞相传写。",
          "洛阳为之纸贵。"
        ],
        options: [
          { text: "也写一篇赋", hint: "学识 +12；声望 +8", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 8 }], then: "你写了一篇《乡赋》，写了十年。写完的时候，纸已经不贵了。" },
          { text: "抄《三都赋》去卖", hint: "银钱 +14；学识 +6", effects: [{ k: "silver", v: 14 }, { k: "knowledge", v: 6 }], then: "你抄了三十份，一份卖两百钱。抄到第十二份的时候，你把赋背下来了。" },
          { text: "不凑这个热闹", hint: "无变", effects: [], then: "你没有抄。二十年后你才读到，读的时候想：也不过如此。" }
        ]
      }
  ]);

  /* ══════════ 东晋十六国 · 3 条 ══════════ */
  add("ejin", [
    {
        id: "ej2.beifa", cat: "世变", title: "北伐", years: [320, 356], age: [16, 60], weight: 16,
        text: [
          "祖逖渡江，中流击楫而誓：祖逖不能清中原而复济者，有如大江。",
          "又有人北伐。过江的时候，都要说一句这样的话。"
        ],
        options: [
          { text: "从军北伐", hint: "武艺 +12；私兵 +18", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 18 }], then: "你跟着队伍过了江。北边的坞主来了又走，谁也不肯真出力。", gamble: { deathChance: 0.24, cause: "战殁" } },
          { text: "在后方供粮", hint: "银钱 −8；声望 +8", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 8 }], then: "你捐了三百石粮。运到前线，剩了两百四十石，一路上的损耗，你认了。" },
          { text: "不去，说北伐是空话", hint: "声望 −8；学识 +4", effects: [{ k: "fame", v: -8 }, { k: "knowledge", v: 4 }], then: "你说了一句：朝廷不想回去。这话传出去，有人点头，有人不接。" }
        ]
      },
    {
        id: "ej2.futu", cat: "学问", title: "译经", age: [18, 55], weight: 11, when: { minKnowledge: 40 },
        text: [
          "释道安在襄阳译经，立僧规。鸠摩罗什在长安，门下三千，译《般若》。",
          "有人请你去做笔受。"
        ],
        options: [
          { text: "去做笔受", hint: "学识 +16；声望 +8", effects: [{ k: "knowledge", v: 16 }, { k: "fame", v: 8 }], then: "你替译师记下汉文。一个梵词的译法，为了一字，争了三天。" },
          { text: "出家", hint: "学识 +12；田产弃", effects: [{ k: "knowledge", v: 12 }, { k: "field_wet", v: -8 }, { k: "fame", v: 6 }], then: "你剃了头。寺里有田，有经，有粥。你把家里的田捐了一半给寺。" },
          { text: "在家供养僧人", hint: "银钱 −14；声望 +12", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 12 }], then: "你在家里腾出三间屋，供养了五个僧人。他们住了七年，走的时候留下一部经。" }
        ]
      },
    {
        id: "ej2.beichao", cat: "世变", title: "胡主", age: [16, 65], weight: 14,
        text: [
          "石勒、苻坚、慕容垂，皆以胡族据中原。用汉人治汉人，读汉人的书，祭汉人的庙。",
          "你的县归了一个胡人的王。"
        ],
        options: [
          { text: "出仕，替他治民", hint: "官职 +16；声望 −10", effects: [{ k: "official", v: 16 }, { k: "fame", v: -10 }], then: "你做了他的县令。他不懂农事，问你一亩能收几斛。你答了，他点了点头。" },
          { text: "隐居不仕", hint: "声望 +10；田产保", effects: [{ k: "fame", v: 10 }], then: "你在山里教书。他派人来请了三次，你推了三次。第四次，他不请了。" },
          { text: "南奔", hint: "田产弃；学识 +4", effects: [{ k: "field_wet", v: -12 }, { k: "knowledge", v: 4 }], then: "你过了江。南边的人问你北边的事，你说了三天，最后只说了一句：回去不了了。" }
        ]
      }
  ]);

  /* ══════════ 南北朝 · 3 条 ══════════ */
  add("ns", [
    {
        id: "n2.hanhua", cat: "世变", title: "汉化", era: "ns", years: [493, 499], age: [12, 70], weight: 26, once: true,
        text: [
          "魏主迁都洛阳，改姓元氏。禁胡服，断北语，凡朝士皆须说汉话。",
          "三十岁以下，见在朝廷之人，语音不听仍旧。"
        ],
        options: [
          { text: "改姓，说汉话，读经", hint: "学识 +12；官职 +12", effects: [{ k: "knowledge", v: 12 }, { k: "official", v: 12 }], then: "你把姓改了。祖坟上的碑还是旧姓，你每次回去，都要看好一会儿。" },
          { text: "不改，回北边六镇", hint: "声望 +8；武艺 +8", effects: [{ k: "fame", v: 8 }, { k: "martial", v: 8 }], then: "你回了北边。北边的人说：洛阳的那些人，已经不算我们了。" },
          { text: "两面都应付", hint: "官职 +6；银钱 −6", effects: [{ k: "official", v: 6 }, { k: "silver", v: -6 }], then: "你在朝上说汉话，回家说胡话。两边都不全信你，但两边都用你。" }
        ]
      },
    {
        id: "n2.sishen", cat: "市井", title: "舍身", age: [18, 65], weight: 11,
        text: [
          "梁主三幸同泰寺舍身，群臣以钱一亿万奉赎。",
          "寺里有田，有奴，有库，有钱。"
        ],
        options: [
          { text: "捐田入寺", hint: "田 −10 亩；声望 +12", effects: [{ k: "field_wet", v: -6 }, { k: "field_dry", v: -4 }, { k: "fame", v: 12 }], then: "你捐了十亩。寺里给你在功德碑上刻了一行字，刻得很深。" },
          { text: "在寺里做净人", hint: "粮 +8 石；学识 +6", effects: [{ k: "grain", v: 8 }, { k: "knowledge", v: 6 }], then: "你在寺里种菜、舂米。闲时听僧讲经，听会了几段。" },
          { text: "不捐，说寺比官府还富", hint: "声望 −10；学识 +4", effects: [{ k: "fame", v: -10 }, { k: "knowledge", v: 4 }], then: "你在酒桌上说了一句。第二天，寺里的僧人上门，说要替你消业。" }
        ]
      },
    {
        id: "n2.hushi", cat: "市井", title: "互市", age: [18, 60], weight: 12,
        text: [
          "南北互市，于淮上置关。南货北运，北货南输，关吏抽税。",
          "有人邀你合伙走一趟。"
        ],
        options: [
          { text: "合伙走一趟", need: { minSilver: 16 }, hint: "银钱 −16；可能翻倍", effects: [{ k: "silver", v: -16 }], then: "你们把茶和绢运到淮北，换回马和皮。", gamble: { winChance: 0.6, win: [{ k: "silver", v: 40 }], lose: [{ k: "silver", v: -10 }, { k: "body", v: -12 }], winNote: "这一趟赚了三倍。", loseNote: "关吏扣了货，说你们「通敌」。罚了钱，还挨了打。" } },
          { text: "在淮上开个货栈", hint: "银钱 −12；长利", effects: [{ k: "silver", v: -12 }, { k: "favor", v: 10 }], then: "你开了个货栈，替南北商旅存货。抽一成。二十年后，你的儿子接手时，货栈有三进院子。" },
          { text: "不做，兵荒马乱", hint: "无变", effects: [], then: "你没有做。那年冬天，淮上的关闭了四个月。" }
        ]
      }
  ]);

  /* ══════════ 隋 · 1 条 ══════════ */
  add("sui", [
    {
        id: "su2.zudiao", cat: "官府", title: "租调", age: [18, 60], weight: 12,
        text: [
          "丁男一床，租粟三石，调绢二丈、绵三两。单丁及仆隶各半之。",
          "另有无妻者半床之租。"
        ],
        options: [
          { text: "照数输", hint: "银钱 −6；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "三石粟，二丈绢。你交完，仓里还剩六石，够吃到明年五月。" },
          { text: "把绢织薄一些", hint: "银钱 +4；声望 −4", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -4 }], then: "你把绢织薄了。验绢的吏拿尺量了量，说：差一点。你补了两尺。" },
          { text: "分户，装作单丁", hint: "银钱 +8；风险", effects: [{ k: "silver", v: 8 }], then: "你把户分了，自己算单丁，租减半。", gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -16 }, { k: "body", v: -8 }], winNote: "没有人查。", loseNote: "括户时查出。析户避税，罚钱加役。" } }
        ]
      }
  ]);

  /* ══════════ 唐 · 6 条 ══════════ */
  add("tang", [
    {
        id: "t2.fubing", cat: "官府", title: "府兵", era: "tang", years: [618, 740], age: [18, 50], weight: 16, once: true,
        text: [
          "折冲府六百三十四，关中之府居其四十。府兵三时务农，一时讲武。",
          "府兵自备弓刀、麦饭、九斗之粮。"
        ],
        options: [
          { text: "入府为兵", hint: "武艺 +12；私兵 +14；免租", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 14 }, { k: "silver", v: 6 }], then: "你入了折冲府。自备了一张弓、三十支箭、一把横刀。你的名字上了府籍。" },
          { text: "不入，务农", hint: "田 +12 亩", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 4 }], then: "你没有入府。你在家种田。府兵来征粮，你给。他们说：还是你们自在。" },
          { text: "入府，求边功", hint: "武艺 +14；官职 +10", effects: [{ k: "martial", v: 14 }, { k: "official", v: 10 }], then: "你去了安西。在龟兹守了四年，见过雪山和胡商的驼队。", gamble: { deathChance: 0.18, cause: "战殁" } }
        ]
      },
    {
        id: "t2.anshi", cat: "世变", title: "安史", era: "tang", years: [755, 763], age: [12, 70], weight: 40, once: true,
        text: [
          "安禄山以范阳、平卢、河东三镇之兵反，号二十万。",
          "渔阳鼙鼓动地来，惊破霓裳羽衣曲。"
        ],
        options: [
          { text: "从官军", hint: "官职 +12；武艺 +10", effects: [{ k: "official", v: 12 }, { k: "martial", v: 10 }], then: "你在潼关。关破那天，二十万人一夜散了。你往西跑，跑到陈仓。", gamble: { deathChance: 0.26, cause: "战殁" } },
          { text: "从叛军", hint: "私兵 +30；声望 −16", effects: [{ k: "troops", v: 30 }, { k: "fame", v: -16 }], then: "你跟着叛军进了洛阳。城里的宫室，被抢了三天。", gamble: { deathChance: 0.3, cause: "战殁" } },
          { text: "举家南迁", hint: "田产弃；学识 +4", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "knowledge", v: 4 }], then: "你往南走，走到江东。那里的山水，跟北方完全不一样。" }
        ]
      },
    {
        id: "t2.mawei", cat: "世变", title: "马嵬", era: "tang", years: [756, 757], age: [14, 70], weight: 24, once: true,
        text: [
          "六军不发，请诛杨国忠、杨贵妃。帝不得已，命力士引贵妃于佛堂，缢杀之。",
          "马嵬坡下泥土中，不见玉颜空死处。"
        ],
        options: [
          { text: "随驾入蜀", hint: "官职 +8；声望 +6", effects: [{ k: "official", v: 8 }, { k: "fame", v: 6 }], then: "你跟着到了成都。蜀道难，走了四十天。到了之后，你才知道长安已经收复。" },
          { text: "留在关中，投太子", hint: "官职 +14；声望 +10", effects: [{ k: "official", v: 14 }, { k: "fame", v: 10 }], then: "你留在了灵武，投了太子。一个新朝，从这里开始。" },
          { text: "回乡下，避乱", hint: "田产保；声望 −4", effects: [{ k: "fame", v: -4 }], then: "你回了乡。乡里的人问长安怎么样，你说：烧了一半。" }
        ]
      },
    {
        id: "t2.huichang", cat: "官府", title: "灭佛", era: "tang", years: [845, 846], age: [16, 70], weight: 18, once: true,
        text: [
          "会昌灭佛：天下寺四千六百余所，招提兰若四万余所，皆毁。僧尼二十六万余人还俗。",
          "寺田没入官，铜像铸钱。"
        ],
        options: [
          { text: "还俗，领田", hint: "田 +14 亩；学识 −6", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 6 }, { k: "knowledge", v: -6 }], then: "你还了俗，领了三口人的田。经卷上交，你偷偷留了一卷。" },
          { text: "还俗，去铸钱", hint: "银钱 +12；身体 −6", effects: [{ k: "silver", v: 12 }, { k: "body", v: -6 }], then: "你被派去熔铜像。熔化的时候，佛的脸先塌下去。" },
          { text: "逃入深山，保住僧籍", hint: "声望 +8；身体 −10", effects: [{ k: "fame", v: 8 }, { k: "body", v: -10 }], then: "你逃进了山。山里还有几十个不肯还俗的人。你们种了三年坡地。" }
        ]
      },
    {
        id: "t2.xishi", cat: "市井", title: "西市", age: [18, 60], weight: 12,
        text: [
          "长安西市，四方珍奇皆聚。胡商卖香药、宝石、驼马；汉商卖绢、瓷、茶。",
          "市署日中击鼓三百声而开市，日入前七刻击钲三百声而散。"
        ],
        options: [
          { text: "做胡商的行纪", hint: "银钱 +16；人脉 +10", effects: [{ k: "silver", v: 16 }, { k: "favor", v: 10 }], then: "你替粟特商人做保人，抽一成。你学会了几个胡语词，也学会了看宝石。" },
          { text: "开一间茶肆", hint: "银钱 −10；长利", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 6 }], then: "你在西市边上开了间茶肆。三教九流都来，说话的声音盖过了市鼓。" },
          { text: "贩瓷出海", hint: "银钱 −16；可能大赚", effects: [{ k: "silver", v: -16 }], then: "你把瓷器装上船，往南边去。", gamble: { winChance: 0.55, win: [{ k: "silver", v: 60 }], lose: [{ k: "silver", v: -20 }, { k: "body", v: -12 }], winNote: "船回来了，货卖了三倍。", loseNote: "船遇到风，货沉了。人回来了，只剩一条命。" } }
        ]
      },
    {
        id: "t2.tubo", cat: "世变", title: "吐蕃", era: "tang", years: [763, 764], age: [14, 70], weight: 22, once: true,
        text: [
          "吐蕃入大震关，陷兰、廓、河、鄯、洮、岷、秦、成、渭等州，尽取河西、陇右之地。",
          "十月，吐蕃入长安，立广武王承宏为帝，居十五日而去。"
        ],
        options: [
          { text: "从军御吐蕃", hint: "武艺 +12；官职 +8", effects: [{ k: "martial", v: 12 }, { k: "official", v: 8 }], then: "你在凤翔守了两年。吐蕃的骑兵来去如风，追不上。", gamble: { deathChance: 0.22, cause: "战殁" } },
          { text: "举家东迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -10 }, { k: "silver", v: -8 }], then: "你往东走。走到陕州，那里已经挤满了从西边来的人。" },
          { text: "留在河西，做了吐蕃的百姓", hint: "声望 −12；田产保", effects: [{ k: "fame", v: -12 }], then: "你留在了河西。吐蕃的官不收你的田，只要你交税、学说他们的话。" }
        ]
      }
  ]);

  /* ══════════ 五代十国 · 4 条 ══════════ */
  add("wudai", [
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
  ]);

  /* ══════════ 辽 · 2 条 ══════════ */
  add("liao", [
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
      }
  ]);

  /* ══════════ 北宋 · 5 条 ══════════ */
  add("bsong", [
    {
        id: "b2.beijiu", cat: "官府", title: "释兵权", era: "bsong", years: [961, 990], age: [10, 65], weight: 22, once: true,
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
  ]);

  /* ══════════ 西夏 · 4 条 ══════════ */
  add("xxia", [
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
  ]);

  /* ══════════ 金 · 6 条 ══════════ */
  add("jin", [
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
        id: "j2.jingkang2", cat: "世变", title: "靖康", era: "jin", years: [1126, 1127], age: [6, 70], weight: 34, once: true,
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
  ]);

  /* ══════════ 南宋 · 3 条 ══════════ */
  add("nsong", [
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
      }
  ]);

  /* ══════════ 元 · 7 条 ══════════ */
  add("yuan", [
    {
        id: "y2.daluhuachi", cat: "官府", title: "监临", age: [22, 60], weight: 14,
        text: [
          "诸路、府、州、县，皆置达鲁花赤，以蒙古人、色目人为之，掌印信，监临官属。",
          "你是汉人，做到知州，上头有一个达鲁花赤。"
        ],
        options: [
          { text: "恭顺事之", hint: "官职 +10", effects: [{ k: "official", v: 10 }], then: "凡事你先去问过达鲁花赤再办。他不识字，你说给他听，他点头，你就办。" },
          { text: "以事权相争", hint: "官职 −6；声望 +10", effects: [{ k: "official", v: -6 }, { k: "fame", v: 10 }], then: "你争过两次。第二次，他当着众官的面把印信摔在案上。你退了一步。" },
          { text: "与他结交，共分其利", hint: "银钱 +16；官职 +8", effects: [{ k: "silver", v: 16 }, { k: "official", v: 8 }], then: "你请他来家里吃过几回酒。此后的公事，两个人先在后堂说定。" }
        ]
      },
    {
        id: "y2.pumai", cat: "官府", title: "扑买", age: [24, 60], weight: 12,
        text: [
          "包税之法，谓之「扑买」：某人认纳一定之数，某地之税归其征收，余者归己。",
          "有个县的酒税，正在扑买。"
        ],
        options: [
          { text: "扑买一县酒税", need: { minSilver: 40 }, hint: "银钱 −40；可能大赚", effects: [{ k: "silver", v: -40 }], then: "你把酒税包了下来。此后的三年，你派人在每个路口设卡。", gamble: { winChance: 0.62, win: [{ k: "silver", v: 80 }, { k: "grudge", v: 14 }], lose: [{ k: "silver", v: -20 }, { k: "fame", v: -16 }], winNote: "三年下来，你赚了一倍。县里的人叫你的诨号。", loseNote: "酒卖不动，你赔了。上头还是按原数追。" } },
          { text: "不扑买，做酒户", hint: "银钱 +8；安稳", effects: [{ k: "silver", v: 8 }], then: "你只酿酒，不包税。酿一缸，卖一缸。包税的人来收，你给。" },
          { text: "上书言扑买之害", hint: "声望 +14；得罪", effects: [{ k: "fame", v: 14 }, { k: "grudge", v: 10 }], then: "你说：包税者必重敛。奏书递上去，没有人回。第二年，你在路上被人拦了一次。" }
        ]
      },
    {
        id: "y2.qiemaxue", cat: "官府", title: "怯薛", age: [18, 40], weight: 12, sex: "male",
        text: [
          "怯薛者，天子之宿卫。四怯薛，世袭其职，分番入直。",
          "入怯薛者，多为勋臣子弟，出路最好。"
        ],
        options: [
          { text: "求入怯薛", need: { minSilver: 30 }, hint: "银钱 −30；官职 +20", effects: [{ k: "silver", v: -30 }, { k: "official", v: 20 }], then: "你入了怯薛。值夜的时候站在帐外，天亮的时候，你已经知道今天要发哪几道旨。" },
          { text: "不入，做地方官", hint: "官职 +10", effects: [{ k: "official", v: 10 }], then: "你没有入怯薛。你在地方上做官。京里的消息，你要等半个月。" },
          { text: "入军籍，戍边", hint: "武艺 +12；私兵 +16", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 16 }], then: "你去了北边戍守。那边的风，跟中原不一样，刮起来没有声音。" }
        ]
      },
    {
        id: "y2.kuoma", cat: "官府", title: "括马", age: [18, 60], weight: 12,
        text: [
          "军兴则括马：凡民马，官取之，酬以低价，或竟不酬。",
          "吏来点你家的马。"
        ],
        options: [
          { text: "交出", hint: "银钱 −10；声望 +4", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 4 }], then: "你把马牵出去了。吏在马臀上烙了一个字。马回头看了你一眼。" },
          { text: "藏进山里", hint: "可能保住", effects: [], then: "你把马牵到山里，藏了半个月。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -12 }, { k: "silver", v: -16 }], winNote: "藏住了。", loseNote: "被查出。藏马者有罪，你挨了板子。" } },
          { text: "把马卖了，换成牛", hint: "银钱 +10；无马", effects: [{ k: "silver", v: 10 }, { k: "martial", v: -4 }], then: "你把马卖了，买了两头牛。牛不能打仗，但能犁地。" }
        ]
      },
    {
        id: "y2.xuanzheng", cat: "官府", title: "番僧", age: [18, 60], weight: 11,
        text: [
          "设宣政院，掌释教及吐蕃之事。帝师之命，与诏敕并行于西土。",
          "番僧入内地者，地方官不能治。"
        ],
        options: [
          { text: "供养番僧", need: { minSilver: 18 }, hint: "银钱 −18；声望 +8", effects: [{ k: "silver", v: -18 }, { k: "fame", v: 8 }], then: "你供了三个番僧住了一年。他们念的经你听不懂，但他们走的时候替你摩了顶。" },
          { text: "与之相争", hint: "声望 +10；风险", effects: [{ k: "fame", v: 10 }], then: "你拦了一个番僧的车。第二日，宣政院来了文书，问你「何故不敬」。", gamble: { winChance: 0.5, win: [], lose: [{ k: "official", v: -20 }, { k: "body", v: -10 }], winNote: "事情压下去了。", loseNote: "你被免官，罚了半年俸。" } },
          { text: "避而不见", hint: "无变", effects: [], then: "你避开了。番僧过境的时候，你关了衙门，说下乡劝农去了。" }
        ]
      },
    {
        id: "y2.linan", cat: "世变", title: "临安", era: "yuan", years: [1276, 1279], age: [6, 70], weight: 30, once: true,
        text: [
          "伯颜入临安，宋主出降。宫中图书、礼器、乐器，尽辇而北。",
          "江南之人，第一次看见这么多北方的马。"
        ],
        options: [
          { text: "降，做新朝的民", hint: "田产保；声望 −10", effects: [{ k: "fame", v: -10 }], then: "你没有走。新朝的官来收籍，你把名字报上去。此后的赋税，比宋朝重。" },
          { text: "从宋室南走", hint: "田产弃；声望 +14", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "fame", v: 14 }], then: "你跟着走了。走到崖山，走不下去了。" },
          { text: "隐居，不仕两朝", hint: "声望 +12；学识 +8", effects: [{ k: "fame", v: 12 }, { k: "knowledge", v: 8 }], then: "你隐居在乡下，画画、写字。有人来请你出仕，你说：我病了。这一病，病了三十年。" }
        ]
      },
    {
        id: "y2.zhengri", cat: "世变", title: "征日", era: "yuan", years: [1274, 1281], age: [10, 55], weight: 16,
        text: [
          "发兵征日本。第一次，船九百艘；第二次，船四千四百艘，兵十四万。",
          "遇飓风，船多覆。生还者十无二三。"
        ],
        options: [
          { text: "应征，渡海", hint: "武艺 +8；很可能不还", effects: [{ k: "martial", v: 8 }], then: "你上了船。海是灰的，天也是灰的。", gamble: { deathChance: 0.45, cause: "覆舟" } },
          { text: "在后方造船", hint: "身体 −10；银钱 +10", effects: [{ k: "body", v: -10 }, { k: "silver", v: 10 }], then: "你在沿海造船。船要造得快，用的是旧料。造出来的船，一下水就漏。" },
          { text: "出钱免行", need: { minSilver: 20 }, hint: "银钱 −20", effects: [{ k: "silver", v: -20 }], then: "你出了钱。船开的那天，你在岸上看着。回来的船，只有一半。" }
        ]
      }
  ]);

  /* ══════════ 清 · 8 条 ══════════ */
  add("qing", [
    {
        id: "qi2.qimin", cat: "官府", title: "旗民", age: [14, 65], weight: 16,
        text: [
          "旗民不交产，满汉不通婚。旗人有旗地、有饷银、有「铁杆庄稼」。",
          "你是汉人，住在旗营边上。"
        ],
        options: [
          { text: "入旗，求一份饷", need: { minSilver: 26 }, hint: "银钱 −26；粮 +12 石", effects: [{ k: "silver", v: -26 }, { k: "grain", v: 12 }], then: "你入了汉军旗。每月有饷，年节有赏。旗籍上的名字，从此不能改。" },
          { text: "不入旗，做买卖", hint: "银钱 +14", effects: [{ k: "silver", v: 14 }], then: "你没有入旗。你在旗营外卖酒卖肉。旗人的钱好赚，他们的饷银月月有。" },
          { text: "与旗人结亲", hint: "声望 +10；风险", effects: [{ k: "fame", v: 10 }], then: "你把女儿许给了一个旗人。旗民通婚，例有禁。你们没有声张。", gamble: { winChance: 0.65, win: [], lose: [{ k: "body", v: -14 }, { k: "fame", v: -16 }], winNote: "没有人追究。", loseNote: "被佐领查出。你被枷号三天，婚事作罢。" } }
        ]
      },
    {
        id: "qi2.bohong", cat: "官府", title: "鸿词", era: "qing", years: [1679, 1736], age: [24, 65], weight: 16, once: true, when: { minKnowledge: 45 },
        text: [
          "开博学鸿词科，召天下之士。各省荐举，不拘已仕未仕。",
          "被荐者入京，试于体仁阁。"
        ],
        options: [
          { text: "应荐入京", hint: "学识 +10；官职 +14", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 14 }], then: "你入了京。住在会同馆，吃的是官饭。殿试那天，题目是《璇玑玉衡赋》。", gamble: { winChance: 0.4, win: [{ k: "fame", v: 20 }], lose: [{ k: "official", v: -10 }], winNote: "你取了一等，入翰林。", loseNote: "你落了第，赐归。" } },
          { text: "不应荐，守前朝之节", hint: "声望 +16；官职 −20", effects: [{ k: "fame", v: 16 }, { k: "official", v: -20 }], then: "你推了。荐书来了三次，你推了三次。后来没有人再荐你。" },
          { text: "荐子侄，不自荐", hint: "声望 +8；人脉 +10", effects: [{ k: "fame", v: 8 }, { k: "favor", v: 10 }], then: "你把侄子荐了去。他中了，入了翰林。此后你家在省里说话有了分量。" }
        ]
      },
    {
        id: "qi2.siku", cat: "学问", title: "四库", era: "qing", years: [1773, 1782], age: [20, 70], weight: 20, once: true,
        text: [
          "开四库全书馆，征天下遗书。著录三千四百余种，存目六千七百余种。",
          "又寓禁于征：凡有违碍者，焚之，或删改之。"
        ],
        options: [
          { text: "献书", hint: "声望 +12；学识 +6", effects: [{ k: "fame", v: 12 }, { k: "knowledge", v: 6 }], then: "你献了家藏的三百种。馆里给了你一张回执，说：其中有十二种，不合，已焚。" },
          { text: "藏起违碍之书", hint: "学识 +8；风险", effects: [{ k: "knowledge", v: 8 }], then: "你把几部明的野史砌进了墙里。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -24 }, { k: "fame", v: -20 }], winNote: "没有查出来。", loseNote: "被人告发。藏书有违碍者，斩。你减等，流三千里。" } },
          { text: "入馆做校对", hint: "官职 +12；学识 +12", effects: [{ k: "official", v: 12 }, { k: "knowledge", v: 12 }], then: "你在馆里校书。每日校三卷，错一字罚俸。你校了六年，校了六百种。" }
        ]
      },
    {
        id: "qi2.guiliu", cat: "官府", title: "改流", era: "qing", years: [1726, 1735], age: [18, 60], weight: 18, once: true,
        text: [
          "改土归流：废土司，设流官。云南、贵州、广西、四川，土司次第改置。",
          "土司不肯交印，则有兵。"
        ],
        options: [
          { text: "随军入苗疆", hint: "武艺 +10；私兵 +18", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 18 }], then: "你进了苗疆。山高林密，路要人带。带了路的人，后来都封了官。", gamble: { deathChance: 0.2, cause: "瘴疠" } },
          { text: "去做流官", hint: "官职 +16；身体 −8", effects: [{ k: "official", v: 16 }, { k: "body", v: -8 }], then: "你做了苗疆的流官。任上三年，学会了说苗话，也学会了不提「改土」两个字。" },
          { text: "不去，留在内地", hint: "官职 +4", effects: [{ k: "official", v: 4 }], then: "你没有去。苗疆的事，你只在邸报上看到：某土司改流，某寨复叛。" }
        ]
      },
    {
        id: "qi2.yanglian", cat: "官府", title: "养廉", era: "qing", years: [1724, 1800], age: [24, 65], weight: 14, once: true,
        text: [
          "以耗羡归公，设养廉银。州县官于正俸之外，岁得数百两至数千两。",
          "养廉之外，陋规仍在。"
        ],
        options: [
          { text: "只取养廉，不取陋规", hint: "声望 +14；银钱 −8", effects: [{ k: "fame", v: 14 }, { k: "silver", v: -8 }], then: "你只取养廉银。衙门里的书吏、衙役要吃饭，你从自家的银子里补。三年下来，你赔了两千两。" },
          { text: "养廉陋规，一并收下", hint: "银钱 +26；声望 −12", effects: [{ k: "silver", v: 26 }, { k: "fame", v: -12 }], then: "你两样都收。三年任满，你带回了一万两。同僚说你会做官。" },
          { text: "把陋规革了，惹众怒", hint: "声望 +16；官位不保", effects: [{ k: "fame", v: 16 }, { k: "official", v: -16 }], then: "你把陋规革了。书吏辞了三个，衙役散了六个。第二年考课，你得了一个「才力不及」。" }
        ]
      },
    {
        id: "qi2.bailian", cat: "世变", title: "白莲", era: "qing", years: [1796, 1804], age: [12, 70], weight: 26, once: true,
        text: [
          "白莲教起于湖北、四川，蔓延五省。前后九年，耗饷二亿两。",
          "教中人说：弥勒下生，清朝将尽。"
        ],
        options: [
          { text: "从教起事", hint: "私兵 +30；声望 +6", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 6 }], then: "你入了教。教里的兄弟互称「掌柜」。山里的寨子，一个连着一个。", gamble: { deathChance: 0.34, cause: "战殁" } },
          { text: "从官军剿教", hint: "官职 +12；武艺 +8", effects: [{ k: "official", v: 12 }, { k: "martial", v: 8 }], then: "你跟着官军进山。山里的寨子烧了一座又一座。九年打下来，你从把总升到了参将。", gamble: { deathChance: 0.18, cause: "战殁" } },
          { text: "筑寨自守", hint: "私兵 +16；田产保", effects: [{ k: "troops", v: 16 }], then: "你筑了个寨，收了邻村的人。教的人来，你给粮；官军来，你也给粮。" }
        ]
      },
    {
        id: "qi2.wuxu", cat: "世变", title: "戊戌", era: "qing", years: [1898, 1899], age: [12, 70], weight: 26, once: true,
        text: [
          "诏定国是，行新政：废八股、设学堂、裁冗官、练新军。",
          "百日而败。六君子死，康梁走。"
        ],
        options: [
          { text: "从新政", hint: "声望 +16；风险", effects: [{ k: "fame", v: 16 }], then: "你在地方上办了学堂，废了八股。政变之后，学堂改回了书院。", gamble: { winChance: 0.45, win: [], lose: [{ k: "official", v: -26 }, { k: "body", v: -12 }], winNote: "你没有事。", loseNote: "你被革职，永不叙用。" } },
          { text: "反对新政", hint: "官职 +12；声望 −10", effects: [{ k: "official", v: 12 }, { k: "fame", v: -10 }], then: "你在折子里说新政「乱法」。政变之后，你的名字上了举荐的名单。" },
          { text: "不表态，看风向", hint: "无变", effects: [], then: "你没有表态。一百零三天里，你每天看邸报，看完就烧。" }
        ]
      },
    {
        id: "qi2.tielgan", cat: "市井", title: "旗饷", age: [18, 65], weight: 12,
        text: [
          "旗人有饷，谓之「铁杆庄稼」。不农不工不商，按月领银领米。",
          "到了末年，饷银打折，米也掺了沙。"
        ],
        options: [
          { text: "守着旗籍，领饷过日子", hint: "粮 +8 石；银钱 +4", effects: [{ k: "grain", v: 8 }, { k: "silver", v: 4 }], then: "你守着旗籍。饷银一月比一月少，你还是不肯去做工，因为旗下的人不做工。" },
          { text: "偷偷去做工", hint: "银钱 +16；声望 −10", effects: [{ k: "silver", v: 16 }, { k: "fame", v: -10 }], then: "你去做工，瞒着佐领。有一回在街上被同旗的人看见，你低下了头。" },
          { text: "脱离旗籍，自谋生路", hint: "银钱 −10；自由", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 6 }], then: "你出了旗。出旗之后，饷没有了，也没有人再管你做什么。" }
        ]
      }
  ]);

})(window.PACK_BASE);
