/* 生在何朝 · 各朝专有事件 卷二：西晋、东晋十六国、南北朝、隋、唐 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 西晋 ══════════ */
  B.eraEvents.wjin = [

    {
      id: "wj2.zhantian", cat: "官府", title: "占田", era: "wjin", years: [280, 300], age: [16, 65], weight: 20, once: true,
      text: [
        "平吴之后，行户调式：男子一人占田七十亩，女子三十亩。丁男课田五十亩，丁女二十亩。",
        "田不是给的，是许你占的。占得着占不着，看乡里。"
      ],
      options: [
        { text: "照额占满", hint: "田 +30 亩；赋重", effects: [{ k: "field_wet", v: 18 }, { k: "field_dry", v: 12 }, { k: "silver", v: -6 }], then: "你按着额占了七十亩。其中有二十亩是荒地，开了三年才熟。" },
        { text: "少占些，赋轻", hint: "田 +12 亩；银钱 +6", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 4 }, { k: "silver", v: 6 }], then: "你只占了三十亩。课田的租按丁算，不按亩算，占多了反而不划算。" },
        { text: "替豪家占田，做荫客", hint: "田 0；依附于人", effects: [{ k: "favor", v: 12 }, { k: "fame", v: -6 }], then: "你把名字挂在了一个大姓的荫客簿上。从此不纳国赋，只纳主人的租。" }
      ]
    },
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
      id: "wj2.doufu", cat: "市井", title: "斗富", age: [22, 60], weight: 12, when: { minSilver: 30 },
      text: [
        "石崇与王恺争豪。恺以饴澳釜，崇以蜡代薪；恺作紫丝布步障四十里，崇作锦步障五十里。",
        "有人请你赴这样的宴。"
      ],
      options: [
        { text: "赴宴，也跟着比", hint: "银钱 −30；声望 +14", effects: [{ k: "silver", v: -30 }, { k: "fame", v: 14 }], then: "你把家里最好的屏风搬了去。比完了，你在回家的车上算了一笔账，算到半夜。" },
        { text: "赴宴，只看不比", hint: "声望 +6；学识 +4", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: 4 }], then: "你坐在末座，看了一晚上。回家后你写了一篇《俭论》，没有人读。" },
        { text: "不去", hint: "声望 −6", effects: [{ k: "fame", v: -6 }], then: "你推说有病。此后请客的名单上，你的名字就少了。" }
      ]
    },
    {
      id: "wj2.bawang", cat: "世变", title: "八王", era: "wjin", years: [291, 306], age: [12, 70], weight: 38, once: true,
      text: [
        "贾后杀杨骏，废太子。赵王伦起兵，废贾后，自立。齐王冏、成都王颖、河间王颙、长沙王乂，迭相攻杀。",
        "十六年间，洛阳城门开闭数十次。"
      ],
      options: [
        { text: "投一王，求富贵", hint: "官职 +14；私兵 +20", effects: [{ k: "official", v: 14 }, { k: "troops", v: 20 }], then: "你投了一位王。他败的那天，你换了衣服，从后门走。", gamble: { deathChance: 0.3, cause: "兵乱" } },
        { text: "举族南迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }, { k: "silver", v: -10 }], then: "你往南走。走到长江边，回头看，北边的天是灰的。" },
        { text: "筑坞自守", hint: "私兵 +26；声望 +8", effects: [{ k: "troops", v: 26 }, { k: "fame", v: 8 }], then: "你在山里筑了个坞。坞里有井，有仓，有三百户人。乱兵来了两回，没攻下来。" }
      ]
    },
    {
      id: "wj2.yongjia", cat: "世变", title: "永嘉", era: "wjin", years: [311, 316], age: [12, 70], weight: 40, once: true,
      text: [
        "刘曜、石勒陷洛阳，纵兵大掠，发掘陵墓，焚宫庙。怀帝被执，后遇害。",
        "长安亦破。中原士民，十不存一。"
      ],
      options: [
        { text: "随琅琊王南渡", hint: "田产弃；学识 +6", effects: [{ k: "field_wet", v: -14 }, { k: "field_dry", v: -10 }, { k: "knowledge", v: 6 }], then: "你过了江。江那边的人管你们叫「侨人」。你们在空地上立了个郡名，跟北边的一样。" },
        { text: "留在北方，投胡族政权", hint: "官职 +10；声望 −12", effects: [{ k: "official", v: 10 }, { k: "fame", v: -12 }], then: "你留下来了，在石勒的朝里做了一个文官。同僚有一半是汉人，读一样的书，说两种话。" },
        { text: "举族入坞，据险自保", hint: "私兵 +30；田产半弃", effects: [{ k: "troops", v: 30 }, { k: "field_wet", v: -8 }], then: "你带着二百户人上了山。山上没有田，只有石头和泉。你们靠存粮和劫掠撑了六年。" }
      ]
    },
    {
      id: "wj2.xirong", cat: "官府", title: "徙戎", age: [24, 60], weight: 12, when: { minKnowledge: 40 },
      text: [
        "关中之人百余万口，率其少多，戎狄居半。有议者请徙之还本域。",
        "朝廷议了十年，没有徙。"
      ],
      options: [
        { text: "上《徙戎论》", hint: "声望 +16；得罪", effects: [{ k: "fame", v: 16 }, { k: "grudge", v: 10 }], then: "你写了三千言。奏书递上去，留中不发。二十年后，有人翻出这篇文字，说：早有人说过。" },
        { text: "主张怀柔，抚之", hint: "声望 +8；人脉 +10", effects: [{ k: "fame", v: 8 }, { k: "favor", v: 10 }], then: "你在郡里给羌人分了田，免了三年租。他们那年没有反。" },
        { text: "不置可否", hint: "官职 +4", effects: [{ k: "official", v: 4 }], then: "你没有表态。朝里两派都不得罪你，也都不记得你。" }
      ]
    },
    {
      id: "wj2.qingtan", cat: "学问", title: "清谈", age: [18, 55], weight: 12,
      text: [
        "何晏、王弼倡玄学，以《老》《庄》《易》为三玄。士人执麈尾，谈有无、言意、才性。",
        "有人邀你去参加一场谈会。"
      ],
      options: [
        { text: "去，与人辩难", hint: "学识 +12；声望 +10", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 10 }], then: "你辩了半夜，赢了。散场时天已亮，你在门口站了一会儿，忽然觉得心里空。" },
        { text: "去，只坐着听", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], then: "你听了一晚上，一句话没说。回去的路上，你想清楚了一个问题：他们说的，跟田里的收成没有关系。" },
        { text: "不去，治实务", hint: "官职 +8；学识 +3", effects: [{ k: "official", v: 8 }, { k: "knowledge", v: 3 }], then: "你在家里算租税。那年你管的县，户口增了两成。" }
      ]
    },
    {
      id: "wj2.bazhou", cat: "官府", title: "罢兵", era: "wjin", years: [280, 290], age: [20, 60], weight: 12, once: true,
      text: [
        "诏罢州郡兵，大郡置武吏百人，小郡五十人。",
        "州郡无兵，而诸王各拥重镇之众。"
      ],
      options: [
        { text: "解甲归田", hint: "田 +12 亩；武艺 −6", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 4 }, { k: "martial", v: -6 }], then: "你把甲挂在墙上。挂了十六年，甲上的皮绳烂了。" },
        { text: "投诸王府为部曲", hint: "私兵 +22；声望 −4", effects: [{ k: "troops", v: 22 }, { k: "fame", v: -4 }], then: "你成了一个王的部曲。吃他的粮，听他的话。后来他败了，你换了主人。" },
        { text: "做武吏，留五十人", hint: "官职 +8；私兵 +8", effects: [{ k: "official", v: 8 }, { k: "troops", v: 8 }], then: "你留任武吏，管着五十个人。五十个人守一个郡，守不住什么，但能守住县衙。" }
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
    },
    {
      id: "wj2.hukou", cat: "官府", title: "户调", age: [18, 60], weight: 12,
      text: [
        "户调之式：丁男之户，岁输绢三匹、绵三斤；女及次丁男为户者半输。",
        "绢要量幅宽，绵要验干湿。"
      ],
      options: [
        { text: "照数输", hint: "银钱 −6；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "绢织得紧，绵晒得干。收绢的吏捏了捏，点了头。" },
        { text: "织得稀一些", hint: "银钱 +4；声望 −5", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -5 }], then: "你把绢织得稀了半寸。吏没有细看，收下了。此后你家的绢，年年都稀半寸。" },
        { text: "折钱代输", hint: "银钱 −8；省事", effects: [{ k: "silver", v: -8 }], then: "你折了钱。吏收了钱，说这样省事。后来折钱的价一年比一年高。" }
      ]
    }
  ];

  /* ══════════ 东晋十六国 ══════════ */
  B.eraEvents.ejin = [

    {
      id: "ej2.qiao", cat: "官府", title: "侨置", age: [16, 65], weight: 16,
      text: [
        "南渡之后，以旧郡名置郡于江南，谓之「侨置」。侨人著白籍，不税不役。",
        "你在江南的村子里，还叫北方那个县的名字。"
      ],
      options: [
        { text: "守侨籍，不税不役", hint: "银钱 +8；无田", effects: [{ k: "silver", v: 8 }], then: "你白籍在身，不纳租。可你没有田，只能佃别人的地种。" },
        { text: "著本土黄籍，纳租占田", hint: "田 +14 亩；赋重", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 6 }, { k: "silver", v: -8 }], then: "你改了黄籍，占了田。从此有田有赋，也有了一个说得清的地方。" },
        { text: "来回两边，做侨旧之间的中人", hint: "银钱 +14；人脉 +12", effects: [{ k: "silver", v: 14 }, { k: "favor", v: 12 }], then: "你替侨人办事，也替土著办事。两边都叫你「通事」。" }
      ]
    },
    {
      id: "ej2.tuduan", cat: "官府", title: "土断", era: "ejin", years: [364, 413], age: [16, 70], weight: 26, once: true,
      text: [
        "大阅户口，令侨人著本土之籍，谓之「土断」。王公以下，皆以见居为断。",
        "土断之后，白籍作废，租赋按黄籍征。"
      ],
      options: [
        { text: "应土断，著籍", hint: "田 +10 亩；银钱 −6", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }, { k: "silver", v: -6 }], then: "你著了本地籍。籍上写的县，跟你出生那个县同名，但不是同一个。" },
        { text: "隐匿不报，仍作侨人", hint: "银钱 +8；风险", effects: [{ k: "silver", v: 8 }], then: "你没有报。括户的来了两次，你躲在山里。", gamble: { winChance: 0.65, win: [], lose: [{ k: "body", v: -12 }, { k: "silver", v: -16 }], winNote: "躲过去了。", loseNote: "被括出。隐户之罪，罚钱加役一年。" } },
        { text: "投大族为荫户", hint: "免赋；依附", effects: [{ k: "favor", v: 14 }, { k: "fame", v: -8 }], then: "你把名字写进了大族的家籍。官府查不到你，主家替你挡了。此后你种的地，租给主家。" }
      ]
    },
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
      id: "ej2.feishui", cat: "世变", title: "淝水", era: "ejin", years: [383, 384], age: [12, 70], weight: 38, once: true,
      text: [
        "苻坚发兵八十七万，号百万，南下。京师震恐。",
        "谢安命谢玄率八千人拒之。安与人围棋，竟日，客问，答曰：小儿辈遂已破贼。"
      ],
      options: [
        { text: "从北府兵", hint: "武艺 +12；官职 +10", effects: [{ k: "martial", v: 12 }, { k: "official", v: 10 }], then: "你在淝水岸边。秦军后退让地，一退就乱了。你们趁乱渡水，追了三十里。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "在秦军中", hint: "私兵 +20；声望 −10", effects: [{ k: "troops", v: 20 }, { k: "fame", v: -10 }], then: "你在秦军里。退的时候，后面的人推前面的人，自己踩死的人比被杀的多。", gamble: { deathChance: 0.3, cause: "溃败" } },
        { text: "在乡里，等消息", hint: "无变", effects: [], then: "你在家里等。先听说秦兵百万，后听说秦兵败了。村里的人一夜之间改了口。" }
      ]
    },
    {
      id: "ej2.sunen", cat: "世变", title: "孙恩", era: "ejin", years: [399, 402], age: [12, 70], weight: 28, once: true,
      text: [
        "孙恩以五斗米道聚众，自海岛攻会稽。八郡一时俱起，杀长吏以应之。",
        "旬日之中，众数十万。"
      ],
      options: [
        { text: "从孙恩", hint: "私兵 +28；声望 +8", effects: [{ k: "troops", v: 28 }, { k: "fame", v: 8 }], then: "你跟着人群攻了县城。城里的官署烧了三天。后来孙恩投海，他的党徒说他成了水仙。", gamble: { deathChance: 0.28, cause: "战殁" } },
        { text: "守县拒之", hint: "官职 +10；武艺 +8", effects: [{ k: "official", v: 10 }, { k: "martial", v: 8 }], then: "你守了县城。城外的人越来越多，城里的粮越来越少。守到第十九天，援兵到了。", gamble: { deathChance: 0.2, cause: "守城" } },
        { text: "举家浮海", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -10 }, { k: "silver", v: -12 }], then: "你上了船，往南边去。海上走了五天，到了一个岛上。岛上有淡水，没有官。" }
      ]
    },
    {
      id: "ej2.wubu", cat: "官府", title: "坞堡", age: [20, 60], weight: 12,
      text: [
        "北方大乱，豪族各筑坞自守。坞有墙、有楼、有井、有仓，坞主得治其众。",
        "有人请你入坞。"
      ],
      options: [
        { text: "入坞为坞主的部曲", hint: "私兵 +18；依附", effects: [{ k: "troops", v: 18 }, { k: "favor", v: 8 }], then: "你入了坞。坞里三百户，按人头分粮。你分到了一份，也分到了一杆枪。" },
        { text: "自筑一坞", need: { minSilver: 30 }, hint: "银钱 −30；私兵 +40", effects: [{ k: "silver", v: -30 }, { k: "troops", v: 40 }, { k: "fame", v: 10 }], then: "你在山口筑了个小坞。墙一丈二，四角有楼。邻村的人来投，你收了七十户。" },
        { text: "不入坞，四处流亡", hint: "身体 −10；声望 −8", effects: [{ k: "body", v: -10 }, { k: "fame", v: -8 }], then: "你没有入坞。你走了三个州，做了六年雇工。你活下来了，但没有一寸地是你的。" }
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
      id: "ej2.lanting", cat: "学问", title: "兰亭", era: "ejin", years: [353, 356], age: [16, 60], weight: 12, once: true,
      text: [
        "永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。",
        "群贤毕至，少长咸集。有人当场写字。"
      ],
      options: [
        { text: "赴会，写字", hint: "学识 +10；声望 +14", effects: [{ k: "knowledge", v: 10 }, { k: "fame", v: 14 }], then: "你写了一张。写完之后，你自己看了很久，觉得这一张比从前写的都好。" },
        { text: "赴会，作诗", hint: "学识 +12；声望 +10", effects: [{ k: "knowledge", v: 12 }, { k: "fame", v: 10 }], then: "你作了两首。诗没有传下来，字也没有。" },
        { text: "不去", hint: "无变", effects: [], then: "你没有去。后来听说那天的诗集，有人写了序。序比诗有名。" }
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
    },
    {
      id: "ej2.jiupin2", cat: "官府", title: "门第", age: [18, 55], weight: 12,
      text: [
        "上品无寒门，下品无势族。谱牒之学的书，比经书还重要。",
        "有人来问你的家世。"
      ],
      options: [
        { text: "伪造谱牒，攀附高门", hint: "官职 +14；风险", effects: [{ k: "official", v: 14 }], then: "你把家谱往上添了四代，添了一个西晋的太守。", gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -24 }, { k: "official", v: -14 }], winNote: "没有人查。", loseNote: "被谱学名家看破，当众斥为「伪谱」。你一家从此不得通婚于士族。" } },
        { text: "安于寒门，以吏途进", hint: "官职 +6；学识 +4", effects: [{ k: "official", v: 6 }, { k: "knowledge", v: 4 }], then: "你从县吏做起，做了二十年，做到郡丞。你的儿子还是寒门。" },
        { text: "以军功求进", hint: "武艺 +10；官职 +8", effects: [{ k: "martial", v: 10 }, { k: "official", v: 8 }], then: "你从了军。军功可以换官，但换不来门第。士族嫁女，还是不肯给你。" }
      ]
    }
  ];

  /* ══════════ 南北朝 ══════════ */
  B.eraEvents.ns = [

    {
      id: "n2.juntian", cat: "官府", title: "均田", era: "ns", years: [485, 500], age: [16, 65], weight: 22, once: true,
      text: [
        "北魏行均田：男夫十五以上，受露田四十亩，妇人二十亩。奴婢依良。牛一头受田三十亩，限四牛。",
        "露田不得卖买，老死还官。"
      ],
      options: [
        { text: "受田，勤耕", hint: "田 +25 亩；粮 +10 石", effects: [{ k: "field_wet", v: 15 }, { k: "field_dry", v: 10 }, { k: "grain", v: 10 }], then: "你受了六十亩。地在村东，靠河。头三年，你把它养熟了。" },
        { text: "多报奴婢、牛数，多受田", hint: "田 +40 亩；风险", effects: [{ k: "field_wet", v: 24 }, { k: "field_dry", v: 16 }], then: "你多报了两头牛、三个奴婢。地受下来了，赋税也跟着上来。", gamble: { winChance: 0.62, win: [], lose: [{ k: "field_wet", v: -20 }, { k: "body", v: -10 }], winNote: "没有人查。", loseNote: "括户时查出虚报，田没入官，罚役一年。" } },
        { text: "不受田，去城里做工", hint: "银钱 +12；无田", effects: [{ k: "silver", v: 12 }], then: "你没有受田。你在城里的作坊做铁器，一月得三百钱。老了以后，你什么也没有。" }
      ]
    },
    {
      id: "n2.sanzhang", cat: "官府", title: "三长", era: "ns", years: [486, 495], age: [20, 65], weight: 16, once: true,
      text: [
        "立三长：五家立一邻长，五邻立一里长，五里立一党长。三长皆取乡人强谨者。",
        "有人推你当里长。"
      ],
      options: [
        { text: "当里长", hint: "官职 +10；声望 +8", effects: [{ k: "official", v: 10 }, { k: "fame", v: 8 }], then: "你管二十五家。谁家添了口，谁家死了牛，都要报。报错一笔，要自己补。" },
        { text: "推辞", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你推了。里长换了别人。那人三年后因为漏报户口被免。" },
        { text: "当三长，顺便替族人隐田", hint: "银钱 +10；风险", effects: [{ k: "silver", v: 10 }], then: "你把族里三户的田隐了。此后每年秋，族里给你送两石粟。", gamble: { winChance: 0.68, win: [], lose: [{ k: "body", v: -14 }, { k: "fame", v: -16 }], winNote: "没有查出来。", loseNote: "被查出。三长隐户，罪加一等，你被撤职论罪。" } }
      ]
    },
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
      id: "n2.liuzhen", cat: "世变", title: "六镇", era: "ns", years: [523, 528], age: [12, 70], weight: 32, once: true,
      text: [
        "六镇之兵，本为国之爪牙。迁都之后，镇户不得预清流，仕途止于军主。",
        "破六韩拔陵起于沃野，诸镇皆应。"
      ],
      options: [
        { text: "从六镇起兵", hint: "私兵 +34；声望 +10", effects: [{ k: "troops", v: 34 }, { k: "fame", v: 10 }], then: "你在怀朔起兵。二十年守边的人，一朝成了贼。", gamble: { deathChance: 0.32, cause: "战殁" } },
        { text: "从朝廷讨六镇", hint: "官职 +12；武艺 +8", effects: [{ k: "official", v: 12 }, { k: "martial", v: 8 }], then: "你跟着尔朱荣的兵。二十万人降了，后来被坑在河阴。你在坑的这边。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "举家南迁避乱", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -12 }, { k: "silver", v: -12 }], then: "你往南走。走到黄河边，看见南岸的兵也在往南走。" }
      ]
    },
    {
      id: "n2.houjing", cat: "世变", title: "侯景", era: "ns", years: [548, 552], age: [12, 70], weight: 34, once: true,
      text: [
        "侯景以河南十三州降梁，旋反。渡江围台城，百余日，城破。",
        "梁主饿死。江南大乱，人相食。"
      ],
      options: [
        { text: "从侯景", hint: "私兵 +30；声望 −14", effects: [{ k: "troops", v: 30 }, { k: "fame", v: -14 }], then: "你跟着侯景的兵进了台城。城里的宫室，烧了七天。", gamble: { deathChance: 0.3, cause: "兵乱" } },
        { text: "勤王，攻侯景", hint: "官职 +12；声望 +14", effects: [{ k: "official", v: 12 }, { k: "fame", v: 14 }], then: "你从荆州带兵东下。到的时候，台城已经破了三个月。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "举族避入山中", hint: "田产弃；身体 −8", effects: [{ k: "field_wet", v: -14 }, { k: "body", v: -8 }], then: "你带着族人进了山，住了两年。出来时，村里没有一间完整的屋子。" }
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
      id: "n2.fubing", cat: "官府", title: "府兵", era: "ns", years: [550, 580], age: [18, 55], weight: 16, once: true,
      text: [
        "宇文泰立府兵：六柱国、十二大将军、二十四开府。兵农分离，府兵另立军籍。",
        "入了军籍，可免租调，但世代为兵。"
      ],
      options: [
        { text: "入军籍", hint: "武艺 +12；私兵 +16；免租", effects: [{ k: "martial", v: 12 }, { k: "troops", v: 16 }, { k: "silver", v: 6 }], then: "你入了军籍。从此不纳租调，只出人出马。你的儿子也是。" },
        { text: "不入，务农", hint: "田 +14 亩", effects: [{ k: "field_wet", v: 8 }, { k: "field_dry", v: 6 }], then: "你没有入军籍。你种田，纳租。军府的人来征粮，你给。" },
        { text: "入军籍，做到府兵军主", hint: "官职 +14；私兵 +26", effects: [{ k: "official", v: 14 }, { k: "troops", v: 26 }], then: "你从队正做到军主，管一百人。你的名字上了军府的簿。" }
      ]
    },
    {
      id: "n2.yuanjia", cat: "官府", title: "元嘉", era: "ns", years: [424, 450], age: [14, 65], weight: 14, once: true,
      text: [
        "元嘉之治：役宽务简，氓庶繁息。三十年间，百姓有余。",
        "市上的米，一斗不过三十钱。"
      ],
      options: [
        { text: "多置田产", hint: "田 +20 亩；银钱 −16", effects: [{ k: "field_wet", v: 12 }, { k: "field_dry", v: 8 }, { k: "silver", v: -16 }], then: "你在太平年月里买了二十亩。地价便宜，因为你不知道这太平还能有几年。" },
        { text: "送子读书", hint: "学识 +12；银钱 −10", effects: [{ k: "knowledge", v: 12 }, { k: "silver", v: -10 }], then: "你把儿子送进了学馆。他读了七年，通了三经，后来做了县学教谕。" },
        { text: "存粮，不置产", hint: "粮 +24 石", effects: [{ k: "grain", v: 24 }], then: "你把钱都换成了粮，存在地窖里。后来元嘉末年兵起，粮价比田价涨得快。" }
      ]
    },
    {
      id: "n2.zaoxiang", cat: "学问", title: "造像", age: [20, 60], weight: 12,
      text: [
        "云冈、龙门，凿窟造像。王公以下，各舍财为一像，谓之「功德」。",
        "石工说：造一尊小像，二十千钱。"
      ],
      options: [
        { text: "造一尊小像", need: { minSilver: 24 }, hint: "银钱 −24；声望 +12", effects: [{ k: "silver", v: -24 }, { k: "fame", v: 12 }], then: "你在龛侧刻了一行小字：为亡父母。刻完，你在崖下坐了一下午。" },
        { text: "去石窟做石工", hint: "银钱 +12；身体 −6", effects: [{ k: "silver", v: 12 }, { k: "body", v: -6 }], then: "你在龙门凿了六年石头。冬天手上裂的口子，结了痂又裂。" },
        { text: "什么也不做", hint: "无变", effects: [], then: "你没有造像。你说：我连自己的父母都养不活。" }
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
  ];

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = [

    {
      id: "su2.maoyue", cat: "官府", title: "貌阅", era: "sui", years: [583, 609], age: [14, 65], weight: 22,
      text: [
        "大索貌阅：阅其貌以验老小之实。若一人不实，则官司解职，乡正里长皆远流配。",
        "吏来验人，看脸，看身高，看牙。"
      ],
      options: [
        { text: "照实", hint: "声望 +5", effects: [{ k: "fame", v: 5 }], then: "吏看了你的脸，又看了看簿上的年岁，点了点头。" },
        { text: "让老的小的都躲出去", hint: "银钱 +8；风险", effects: [{ k: "silver", v: 8 }], then: "你把两个弟弟藏在了邻村。吏点名时，你说他们死了。", gamble: { winChance: 0.66, win: [], lose: [{ k: "body", v: -14 }, { k: "silver", v: -18 }], winNote: "躲过去了。", loseNote: "被邻村的人告发。你被罚，里长被流。" } },
        { text: "替里长办事，做貌阅的书手", hint: "官职 +10；学识 +4", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 4 }], then: "你替里长写簿。写谁该纳税，写谁老了。你写得很小心。" }
      ]
    },
    {
      id: "su2.keju", cat: "官府", title: "进士", era: "sui", years: [607, 618], age: [16, 50], weight: 18, once: true, when: { minKnowledge: 35 },
      text: [
        "始建进士科。试策，取文章。",
        "这是第一次，读书人可以不必经人举荐，凭一场考试做官。"
      ],
      options: [
        { text: "应考", hint: "学识 +10；可能中式", effects: [{ k: "knowledge", v: 10 }], then: "你进了考场。题目问的是治河。你写了三千字。", gamble: { winChance: 0.35, win: [{ k: "official", v: 20 }, { k: "fame", v: 16 }], lose: [{ k: "fame", v: -6 }], winNote: "你中了。名字写在榜上，你自己看了三遍。", loseNote: "没有中。榜下站了两个时辰，回去了。" } },
        { text: "不考，走门荫", hint: "官职 +8", effects: [{ k: "official", v: 8 }], then: "你的父亲是官。你补了一个小官，不必考。" },
        { text: "教人应考，做塾师", hint: "银钱 +10；学识 +6", effects: [{ k: "silver", v: 10 }, { k: "knowledge", v: 6 }], then: "你开了一个塾，专教策论。学生来了七个，中了两个。" }
      ]
    },
    {
      id: "su2.yunhe", cat: "官府", title: "运河", era: "sui", years: [605, 610], age: [16, 55], weight: 26, once: true,
      text: [
        "发河南、淮北诸郡民，前后百余万，开通济渠。又开永济渠、江南河。",
        "渠广四十步，两岸为御道，植柳。"
      ],
      options: [
        { text: "应役开河", hint: "身体 −16；银钱 +4", effects: [{ k: "body", v: -16 }, { k: "silver", v: 4 }], then: "你在渠上待了八个月。挖出来的土，堆成了两岸的堤。同伍的人死了两个。", gamble: { deathChance: 0.1, cause: "役中病殁" } },
        { text: "出钱免役", need: { minSilver: 12 }, hint: "银钱 −12", effects: [{ k: "silver", v: -12 }], then: "你出了钱。免役的钱，够买两头牛。你还是出了。" },
        { text: "逃役", hint: "声望 −12；亡命", effects: [{ k: "fame", v: -12 }, { k: "body", v: -8 }], then: "你逃了。逃役者斩，你躲进山里，靠采药过了两年。" }
      ]
    },
    {
      id: "su2.gaoli", cat: "世变", title: "征辽", era: "sui", years: [612, 614], age: [16, 55], weight: 30, once: true,
      text: [
        "发天下兵，会于涿郡，号二百万。馈运者倍之。",
        "辽东之役，三次。第一次，渡辽水者三十万五千，还者二千七百。"
      ],
      options: [
        { text: "应征", hint: "武艺 +10；身体 −10", effects: [{ k: "martial", v: 10 }, { k: "body", v: -10 }], then: "你过了辽水。回来的时候，你们一队一百人，剩了九个。", gamble: { deathChance: 0.35, cause: "辽东" } },
        { text: "运粮", hint: "身体 −12；银钱 +6", effects: [{ k: "body", v: -12 }, { k: "silver", v: 6 }], then: "你推着粮车走了两千里。到涿郡时，车上的粮只剩一半，另一半在路上吃了。" },
        { text: "逃亡", hint: "声望 −14；成亡人", effects: [{ k: "fame", v: -14 }, { k: "body", v: -6 }], then: "你在半路逃了。逃兵遇赦不赦。此后你没有名字，只有一个诨号。" }
      ]
    },
    {
      id: "su2.wagang", cat: "世变", title: "瓦岗", era: "sui", years: [611, 618], age: [14, 70], weight: 34, once: true,
      text: [
        "翟让据瓦岗，单雄信、徐世勣往从之。开仓赈饥，附者日众。",
        "李密后来，取瓦岗为主，号魏公。"
      ],
      options: [
        { text: "投瓦岗", hint: "私兵 +34；声望 +12", effects: [{ k: "troops", v: 34 }, { k: "fame", v: 12 }], then: "你上了瓦岗。山上开了仓，饥民排队领粮，排了十里。", gamble: { deathChance: 0.28, cause: "战殁" } },
        { text: "守乡里", hint: "私兵 +16；声望 +6", effects: [{ k: "troops", v: 16 }, { k: "fame", v: 6 }], then: "你没有上山。你带着村里的人筑了墙，收了三年粮。" },
        { text: "投官军", hint: "官职 +10；武艺 +8", effects: [{ k: "official", v: 10 }, { k: "martial", v: 8 }], then: "你在张须陀的军中。跟瓦岗打了三年，互有胜负。", gamble: { deathChance: 0.22, cause: "战殁" } }
      ]
    },
    {
      id: "su2.jiangdu", cat: "世变", title: "江都", era: "sui", years: [616, 619], age: [12, 70], weight: 26, once: true,
      text: [
        "帝幸江都，不复还京。从驾骁果多关中人，久客思归，逃亡相继。",
        "宇文化及因众心，弑帝于江都。"
      ],
      options: [
        { text: "从骁果，随宇文化及北上", hint: "私兵 +22；声望 −10", effects: [{ k: "troops", v: 22 }, { k: "fame", v: -10 }], then: "你们往北走，想回关中。走到童山，被李密截住，打了一场，死了很多。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "留在江南", hint: "田 +10 亩；平安", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }], then: "你留在了江南。这里的田好，水多，一年两熟。你没有再回过北方。" },
        { text: "投唐", hint: "官职 +12；声望 +8", effects: [{ k: "official", v: 12 }, { k: "fame", v: 8 }], then: "你投了唐。唐的吏问你从前做过什么，你说了，他写在簿上，说：留下吧。" }
      ]
    },
    {
      id: "su2.sansheng", cat: "官府", title: "三省", era: "sui", years: [581, 618], age: [22, 60], weight: 12, when: { minKnowledge: 45 },
      text: [
        "置尚书、门下、内史三省。尚书省事无不总，门下省掌封驳，内史省掌制令。",
        "你在尚书省做都事。"
      ],
      options: [
        { text: "勤于职守", hint: "官职 +10；身体 −4", effects: [{ k: "official", v: 10 }, { k: "body", v: -4 }], then: "你每日校文书到深夜。有一道诏书，你改了一个字，救了一个县的人。" },
        { text: "依附权臣", hint: "官职 +16；风险", effects: [{ k: "official", v: 16 }], then: "你依附了杨素。他倒之后，你被贬到边郡。", gamble: { winChance: 0.5, win: [], lose: [{ k: "official", v: -30 }, { k: "body", v: -10 }], winNote: "你没事。", loseNote: "被牵连，免官下狱。" } },
        { text: "求外放，做刺史", hint: "官职 +8；私兵 +12", effects: [{ k: "official", v: 8 }, { k: "troops", v: 12 }], then: "你求了个外放，做了一州刺史。在地方上，你说的话比在尚书省管用。" }
      ]
    },
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
    },
    {
      id: "su2.kaihuang", cat: "官府", title: "开皇", era: "sui", years: [581, 600], age: [12, 65], weight: 14, once: true,
      text: [
        "开皇之治：轻徭薄赋，仓廪充实。长安太仓之粟，陈陈相因，至于红腐不可食。",
        "天下户口，倍于周齐。"
      ],
      options: [
        { text: "趁太平多垦荒", hint: "田 +18 亩", effects: [{ k: "field_wet", v: 10 }, { k: "field_dry", v: 8 }], then: "你开了十八亩荒地。地是官给的，三年不纳租。三年后，地熟了。" },
        { text: "送子读书，考进士", hint: "学识 +10", effects: [{ k: "knowledge", v: 10 }], then: "你送儿子去读书。他读了十年，正赶上进士科初立。" },
        { text: "贩粮，趁仓满价低", hint: "银钱 +14", effects: [{ k: "silver", v: 14 }], then: "你趁粮贱时收了二百石。第二年关中大旱，你卖了一半，赚了两倍。" }
      ]
    }
  ];

  /* ══════════ 唐 ══════════ */
  B.eraEvents.tang = [

    {
      id: "t2.zuyong", cat: "官府", title: "租庸调", age: [18, 60], weight: 16,
      text: [
        "租：每丁岁纳粟二石。庸：岁役二十日，不役则纳绢三尺。调：随乡土所产，绢二丈、绵三两。",
        "有田则有租，有身则有庸，有户则有调。"
      ],
      options: [
        { text: "照数纳", hint: "银钱 −5；声望 +4", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], then: "你把粟、绢、庸钱分三处放好，一样一样交给里正。" },
        { text: "以庸代役，多纳绢", hint: "银钱 −8；身体 +4", effects: [{ k: "silver", v: -8 }, { k: "body", v: 4 }], then: "你多纳了六尺绢，免了二十日役。那二十天，你在家里修了屋顶。" },
        { text: "逃户，躲进山里", hint: "声望 −12；田产弃", effects: [{ k: "fame", v: -12 }, { k: "field_wet", v: -8 }], then: "你逃了。逃户的田，三年后归了邻家。你在山里种了六年坡地。" }
      ]
    },
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
      id: "t2.jinshi", cat: "官府", title: "行卷", age: [18, 45], weight: 16, when: { minKnowledge: 40 },
      text: [
        "进士科重诗赋。举子未试之前，以所作投于公卿，谓之「行卷」。",
        "有人替你引荐了一位主司。"
      ],
      options: [
        { text: "投行卷，附厚礼", need: { minSilver: 20 }, hint: "银钱 −20；中式之望", effects: [{ k: "silver", v: -20 }], then: "你把诗抄在最好的纸上，连同二十两银子一起送去。", gamble: { winChance: 0.48, win: [{ k: "official", v: 24 }, { k: "fame", v: 18 }], lose: [{ k: "fame", v: -6 }], winNote: "你中了。雁塔题名，你写了三遍自己的名字。", loseNote: "没有中。主司把你的诗还了回来，说：再读书。" } },
        { text: "不投，只凭考场", hint: "学识 +10", effects: [{ k: "knowledge", v: 10 }], then: "你没有投卷。你进了考场，写了三首。", gamble: { winChance: 0.22, win: [{ k: "official", v: 22 }, { k: "fame", v: 20 }], lose: [{ k: "fame", v: -4 }], winNote: "你中了，而且是那一榜最有名的。", loseNote: "没有中。" } },
        { text: "不考，做幕僚", hint: "官职 +10；学识 +6", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 6 }], then: "你入了节度使的幕。写檄文、算军粮。做得好，也能升。" }
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
      id: "t2.liangshui", cat: "官府", title: "两税", era: "tang", years: [780, 800], age: [20, 65], weight: 20, once: true,
      text: [
        "杨炎行两税法：户无主客，以见居为簿；人无丁中，以贫富为差。",
        "夏输无过六月，秋输无过十一月。"
      ],
      options: [
        { text: "照两税纳钱", hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "从前纳粟纳绢，如今要纳钱。你把粮卖了换钱，卖的时候粮价正低。" },
        { text: "把田产折给大户，做客户", hint: "田 −12 亩；免差", effects: [{ k: "field_wet", v: -8 }, { k: "field_dry", v: -4 }, { k: "favor", v: 10 }], then: "你把田名义上折给了大户，自己成了客户。两税按户等算，你成了下等。" },
        { text: "做税吏", hint: "官职 +12；银钱 +8", effects: [{ k: "official", v: 12 }, { k: "silver", v: 8 }], then: "你做了征税的吏。按户等定税，谁家几等，你说了算。" }
      ]
    },
    {
      id: "t2.fanzhen", cat: "官府", title: "藩镇", age: [22, 60], weight: 14,
      text: [
        "河朔三镇，父子相承，赋税不入朝廷。节度使得自置吏、自募兵。",
        "有人请你入幕。"
      ],
      options: [
        { text: "入幕，做掌书记", hint: "官职 +14；学识 +8", effects: [{ k: "official", v: 14 }, { k: "knowledge", v: 8 }], then: "你替节度使写表。表是给朝廷的，话是自己这边的。写多了，你就明白了两边的关系。" },
        { text: "不入，去京中应举", hint: "学识 +10；官职 +6", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 6 }], then: "你去了长安。长安的官看不起藩镇的幕僚，说他们是「河北的笔」。" },
        { text: "入幕，掌兵", hint: "私兵 +30；武艺 +10", effects: [{ k: "troops", v: 30 }, { k: "martial", v: 10 }], then: "你掌了一营兵。节度使死后，他的儿子继位，你还是在营里。" }
      ]
    },
    {
      id: "t2.ganlu", cat: "世变", title: "甘露", era: "tang", years: [835, 836], age: [14, 70], weight: 24, once: true,
      text: [
        "李训、郑注谋诛宦官，诈称金吾厅事后石榴树夜有甘露。",
        "宦官至，见幕下有兵，惊走。事败，宰相以下死者千余人。"
      ],
      options: [
        { text: "在朝中，随宰相", hint: "声望 +12；风险", effects: [{ k: "fame", v: 12 }], then: "你在含元殿外。事败之后，你混在人群里出了宫门。", gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -30 }, { k: "fame", v: -10 }], winNote: "你活着走出了宫门。", loseNote: "你被搜出。当日死者千余，你在其中。" } },
        { text: "依附宦官", hint: "官职 +16；声望 −14", effects: [{ k: "official", v: 16 }, { k: "fame", v: -14 }], then: "你替神策军办事。事败之后，宦官更重，你的位置也更稳。" },
        { text: "称病在家", hint: "无变", effects: [], then: "你称病。第二天听说死了很多人，你在家里点了三炷香。" }
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
      id: "t2.huangchao", cat: "世变", title: "黄巢", era: "tang", years: [878, 884], age: [12, 70], weight: 34, once: true,
      text: [
        "黄巢屡举进士不第，遂反。转掠大江南北，号「冲天大将军」。",
        "广明元年，入长安，称帝，国号大齐。"
      ],
      options: [
        { text: "从黄巢", hint: "私兵 +32；声望 −8", effects: [{ k: "troops", v: 32 }, { k: "fame", v: -8 }], then: "你跟着进了长安。长安的米价涨到一斗三十千，人吃人。", gamble: { deathChance: 0.3, cause: "兵乱" } },
        { text: "从官军，守城", hint: "官职 +12；武艺 +8", effects: [{ k: "official", v: 12 }, { k: "martial", v: 8 }], then: "你守了一座县城。守到粮尽，城破了。你从城墙上跳下去，摔断了一条腿。", gamble: { deathChance: 0.26, cause: "城破" } },
        { text: "举家入蜀", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -14 }, { k: "silver", v: -10 }], then: "你带着家人走了蜀道。走到剑门，你回头看，看不见北边了。" }
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
  ];

})(window.PACK_BASE);
