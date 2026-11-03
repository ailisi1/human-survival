/* 生在何朝 · 元明清（时段事件 + 元、清大事）
 * 明的数据包自成一体，见 data/ming.sample.js
 */
(function (P) {
  "use strict";

  P.periods.yuanmingqing.events = (P.periods.yuanmingqing.events || []).concat([
    {
      id: "yq.x.keju", cat: "科举", title: "八股", age: [16, 48], weight: 26, once: true,
      when: { minKnowledge: 25 },
      text: [
        "科举以四书命题，作文必依朱子《章句集注》，体用八股：破题、承题、起讲、入手、起股、中股、后股、束股。",
        "村里人说：读熟三百篇，中个秀才不难；中举人，要看命。"
      ],
      options: [
        { text: "应县试、府试、院试", hint: "学识 +6；中了便是生员", resolve: "examPass", params: { base: 0.25, perKnowledge: 0.012, cap: 0.75, onPass: ["shengyuan"] }, effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 6 }], then: "" },
        { text: "去应乡试", hint: "难；中则为举人", need: { minKnowledge: 35 }, resolve: "examPass", params: { base: 0.05, perKnowledge: 0.008, cap: 0.5, onPass: ["juren"] }, effects: [{ k: "silver", v: -6 }], then: "" },
        { text: "不考了，去坐馆", hint: "银钱 +8；声望 +4", effects: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }], then: "你在镇上教十几个孩子。每年束脩八两，管一顿饭。" }
      ]
    },
    {
      id: "yq.x.junhu", cat: "官府", title: "军户", age: [18, 42], weight: 14, class: ["base"],
      text: [
        "军户世袭，一丁入伍，余丁帮贴。逃一丁，勾一丁，勾至绝户，则族中赔补。",
        "今年轮到你家出丁。"
      ],
      options: [
        { text: "应役入伍", hint: "武艺 +10；身体 −6", effects: [{ k: "martial", v: 10 }, { k: "body", v: -6 }, { k: "silver", v: 2 }], then: "你去了卫所。账上五百人，实际到操的一百二十。" },
        { text: "出银雇人代役", hint: "银钱 −10", effects: [{ k: "silver", v: -10 }], then: "雇的是个流民。他拿了银子，去了三个月就逃了，官府又来勾你。" },
        { text: "举家逃亡", hint: "声望 −10；成为逃户", effects: [{ k: "fame", v: -10 }, { k: "body", v: -6 }], then: "你们逃进山里，改了籍。此后三代，不敢回乡。" }
      ]
    },
    {
      id: "yq.x.yitiao", cat: "官府", title: "一条鞭", age: [20, 62], weight: 14,
      text: [
        "赋役合并，计亩征银，差役折银，官为雇募。",
        "从此交税不用出人，只用出银。"
      ],
      options: [
        { text: "按亩纳银", hint: "银钱 −8；免力役", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 3 }], then: "银子要成色好，要火耗。吏说你的银子成色差，多收了一钱。" },
        { text: "把田挂到士绅名下", hint: "银钱 +6；一旦被查，田没官", gamble: { winChance: 0.62, win: [{ k: "silver", v: 8 }], lose: [{ k: "field_wet", v: -8 }, { k: "fame", v: -10 }], winNote: "田挂在举人名下，赋税全免。你每年给他两石米作谢礼。", loseNote: "清丈田亩，查出诡寄。田没入官，你还挨了罚。" } },
        { text: "去城里做工，不种地了", hint: "银钱 +5；田减", effects: [{ k: "silver", v: 5 }, { k: "field_dry", v: -4 }], then: "你把手里的田佃了出去，进城做了织工。城里的日子，也不轻松。" }
      ]
    },
    {
      id: "yq.x.gongjiang", cat: "市井", title: "匠籍", age: [16, 50], weight: 12, class: ["base"],
      text: [
        "匠户世代承役，轮班赴京，或存留本府织造、烧造。",
        "今年轮到你赴京，路费自备。"
      ],
      options: [
        { text: "赴京应役", hint: "学识 +4；身体 −8", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -8 }, { k: "silver", v: 4 }], then: "你在工部营缮所干了半年，学会了几样别处学不到的手艺。" },
        { text: "出银代役", hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "银子交了，名字划了。你在家继续做自己的活。" },
        { text: "私下接活，多做一份", hint: "银钱 +10；一旦被查，罚", gamble: { winChance: 0.7, win: [{ k: "silver", v: 12 }], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -6 }], winNote: "你夜里替人做活，攒了一笔钱，后来赎了匠籍。", loseNote: "被同行告发，罚银、加役。" } }
      ]
    },
    {
      id: "yq.x.haijin", cat: "市井", title: "海禁", age: [20, 58], weight: 14,
      area: ["福建", "广东", "浙江", "福建布政司", "广东布政司", "浙江布政司", "福建路"],
      text: [
        "朝廷禁海：片板不许下海。沿海居民内迁三十里，界外房屋焚毁。",
        "但海上贸易的利，是田里的十倍。"
      ],
      options: [
        { text: "内迁，弃了海边的田", hint: "田产折损；保命", effects: [{ k: "field_dry", v: -8 }, { k: "fame", v: 2 }], then: "你搬进了界内。海边的房子被烧了，烧的时候你站在远处看。" },
        { text: "私下出海", hint: "银钱 −15；或大赚", gamble: { winChance: 0.55, win: [{ k: "silver", v: 60 }], lose: [{ k: "silver", v: -15 }, { k: "fame", v: -12 }, { k: "body", v: -6 }], winNote: "一船丝、一船瓷，换回了满舱白银。你在月港边上买了宅子。", loseNote: "被水师截住。船没官，人下狱，家里花钱才把你赎出来。" } },
        { text: "给海商做伙计", hint: "银钱 +8；人脉广", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 3 }], then: "你不下海，只替人管账、找货、打点关节。海上的事，你知道得比谁都多。" }
      ]
    },
    {
      id: "yq.x.dianpu", cat: "家业", title: "典当", age: [22, 60], weight: 12,
      when: { minSilver: 40 },
      text: [
        "县里的典当铺要盘出去，连铺面、当底、人脉，一共二百两。",
        "当铺的利，一年能有三分。"
      ],
      options: [
        { text: "盘下来", hint: "银钱 −100；年入 +20", need: { minSilver: 100 }, effects: [{ k: "silver", v: -100 }, { k: "fame", v: 6 }, { k: "official", v: 4 }], then: "你成了当铺东家。来当东西的人，眼睛都不敢抬。你学会了不看他们的脸。" },
        { text: "入伙，占三成", hint: "银钱 −40；年入 +6", effects: [{ k: "silver", v: -40 }, { k: "fame", v: 2 }], then: "你不问账，只等分红。三年后，合伙人跑了，铺子归了你。" },
        { text: "不碰", hint: "什么也没变", effects: [], then: "你继续种地。后来那家当铺被官府查了，说是违例取利。" }
      ]
    },
    {
      id: "yq.x.tuanlian", cat: "军功", title: "团练", age: [24, 58], weight: 12,
      text: [
        "地方不靖，知县请各乡办团练：按亩出丁，自备器械，农隙操练。",
        "办得好，可保一方；办得不好，就是白养一群闲汉。"
      ],
      options: [
        { text: "出面办团练", hint: "银钱 −15；私兵 +24", effects: [{ k: "silver", v: -15 }, { k: "troops", v: 24 }, { k: "fame", v: 8 }, { k: "martial", v: 4 }], then: "你练了三百乡勇。此后县里的大事，知县都要先问你一句。" },
        { text: "出钱不出人", hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "钱出了，团练的名册上没你的名字。" },
        { text: "不参与", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "团练办起来了。后来为首的那人被诬谋反，家产抄没。" }
      ]
    },
    {
      id: "yq.x.juanna", cat: "官府", title: "捐纳", age: [18, 45], weight: 12,
      text: [
        "朝廷开捐例：纳银若干，可得监生、县丞、甚至知县。",
        "有人说：这是正途之外的一条路。也有人说：这是把官卖了。"
      ],
      options: [
        { text: "捐个监生", hint: "银钱 −60；声望 +10", need: { minSilver: 60 }, effects: [{ k: "silver", v: -60 }, { k: "fame", v: 10 }, { k: "official", v: 6 }], setFlag: ["literate"], then: "你有了监生的名分，可以入国子监读书，也可以候个差事。" },
        { text: "捐个县丞", hint: "银钱 −150；做官", need: { minSilver: 150 }, effects: [{ k: "silver", v: -150 }, { k: "official", v: 14 }, { k: "fame", v: 12 }], then: "你被分发到邻县做县丞。上任那天，你在衙门口站了很久。" },
        { text: "不捐", hint: "什么也没变", effects: [], then: "你说：官是捐来的，坐着也不安稳。" }
      ]
    },
    {
      id: "yq.x.huiguan", cat: "市井", title: "会馆", age: [22, 58], weight: 10,
      class: ["merchant"],
      text: [
        "同乡的商人在城里建了会馆，供同乡落脚、存货、议事。",
        "会馆要推一位董事，管账、管规矩。"
      ],
      options: [
        { text: "应下董事", hint: "银钱 −12；声望 +12", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 12 }, { k: "knowledge", v: 3 }], then: "你管了三年会馆。同乡的纠纷、货价的高低、官府的打点，都从你这里过。" },
        { text: "只出钱，不当董事", hint: "银钱 −5；声望 +4", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], then: "会馆的碑上刻着你的名字，捐银五两。" }
      ]
    },
    {
      id: "yq.x.kaohuang", cat: "家业", title: "垦荒", age: [18, 55], weight: 12,
      class: ["farmer", "tenant"],
      text: [
        "山里有荒地，官府招民开垦，三年免赋，发给印照。",
        "但山里没有水，要自己修陂塘。"
      ],
      options: [
        { text: "进山开荒二十亩", hint: "田 +20 亩；身体 −8", effects: [{ k: "field_dry", v: 20 }, { k: "body", v: -8 }], then: "你烧山、开土、修塘，三年才种上。第四年，一场山洪冲了一半。" },
        { text: "留在平地佃种", hint: "银钱 +3", effects: [{ k: "silver", v: 3 }], then: "你继续佃田。山里的荒地，后来归了别家。" }
      ]
    },

    /* ── 元 ── */
    {
      id: "yuan.hongjin", cat: "世变", title: "红巾", era: "yuan", years: [1351, 1358], age: [14, 65], weight: 34, once: true,
      text: [
        "韩山童倡言：弥勒下生，明王出世。刘福通起于颍州，以红巾为号。",
        "贾鲁治河，发民夫十五万， soldiers 监之，民怨沸腾。",
        "颖州的火，烧了半年。"
      ],
      options: [
        { text: "从红巾", hint: "私兵 +24；武艺 +8", effects: [{ k: "troops", v: 24 }, { k: "martial", v: 8 }, { k: "fame", v: -4 }], then: "你头裹红巾，跟着攻县城。开仓那天，饥民挤塌了仓门。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "结寨自保", hint: "私兵 +14；声望 +8", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 8 }, { k: "body", v: -4 }], then: "你在村后筑了土寨，收了二百多户。红巾来了给粮，官军来了也給粮。" },
        { text: "往南逃", hint: "田产尽弃", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }, { k: "body", v: -6 }], then: "你过了江。江南还没乱，稻田一片一片，只是没有你的。" }
      ]
    },
    {
      id: "yuan.hejue", cat: "世变", title: "河决", era: "yuan", years: [1344, 1352], age: [14, 70], weight: 24,
      text: [
        "黄河决白茅堤、金堤，曹、濮、济、兖皆被水。",
        "朝廷命贾鲁治河，发民夫十五万，军士二万，自黄陵冈至白茅堤，二百八十里。",
        "你被点了夫。"
      ],
      options: [
        { text: "应夫役", hint: "身体 −14；银钱 +2", effects: [{ k: "body", v: -14 }, { k: "silver", v: 2 }], then: "挑土、打桩、下埽。夜里睡在堤上，有人再没醒过来。", gamble: { deathChance: 0.1, cause: "役死" } },
        { text: "出钱免夫", hint: "银钱 −8", need: { minSilver: 8 }, effects: [{ k: "silver", v: -8 }], then: "钱交了。河工上的人，后来很多成了红巾。" },
        { text: "逃夫", hint: "声望 −8；成为逃户", effects: [{ k: "fame", v: -8 }, { k: "body", v: -4 }], then: "你逃进山里。工地上流传着一句话：石人一只眼，挑动黄河天下反。" }
      ]
    },
    {
      id: "yuan.beifa", cat: "世变", title: "北伐", era: "yuan", years: [1367, 1369], age: [14, 70], weight: 30, once: true,
      text: [
        "朱元璋命徐达、常遇春北伐，檄文曰：驱逐胡虏，恢复中华，立纲陈纪，救济斯民。",
        "大军自淮入河，直趋大都。",
        "元帝北走。"
      ],
      options: [
        { text: "从明军", hint: "武艺 +10；私兵 +12", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 12 }, { k: "fame", v: 6 }], then: "你跟着进了大都。城里的蒙古人、色目人，一夜间都改了汉姓。" },
        { text: "随元帝北走", hint: "身体 −12；声望 −6", effects: [{ k: "body", v: -12 }, { k: "fame", v: -6 }], then: "你跟着车驾出了居庸关。塞外的风，比关内硬得多。" },
        { text: "留在城中，换衣冠", hint: "家产保全；声望 −2", effects: [{ k: "fame", v: -2 }, { k: "silver", v: -4 }], then: "你把辫子散了，换上汉人的衣冠。新朝的官吏来登记户口，你报了汉人。" }
      ]
    },

    /* ── 清 ── */
    {
      id: "qing.tifa", cat: "世变", title: "剃发", era: "qing", years: [1645, 1681], age: [14, 70], weight: 40, once: true,
      text: [
        "朝廷令下：京城内外，限十日尽行剃发。遵依者为我国之民，迟疑者同逆命之寇。",
        "留头不留发，留发不留头。这道令此后三十余年反复申严，州县一年查一次。",
        "县里的告示又贴在衙门口。"
      ],
      options: [
        { text: "剃了", hint: "保命；声望 −4", effects: [{ k: "fame", v: -4 }, { k: "body", v: 2 }], then: "剃头挑子摆在街口。剃的时候，你闭上了眼。" },
        { text: "不剃，抗令", hint: "声望 +14；城破则屠", effects: [{ k: "fame", v: 14 }, { k: "body", v: -8 }], then: "城里的人推你为首。守了二十天，城破。", gamble: { deathChance: 0.42, cause: "屠城" } },
        { text: "逃入山中，带发为僧", hint: "学识 +4；家产尽弃", effects: [{ k: "knowledge", v: 4 }, { k: "field_wet", v: -10 }, { k: "fame", v: 2 }], then: "你在山里剃了头，做了和尚。好歹，头发是自己在剃。" }
      ]
    },
    {
      id: "qing.sanfan", cat: "世变", title: "三藩", era: "qing", years: [1673, 1681], age: [14, 65], weight: 28, once: true,
      text: [
        "吴三桂起兵于云南，称天下都招讨兵马大元帅，传檄四方。耿精忠、尚之信应之。",
        "三藩之兵，一度据江南半壁。"
      ],
      options: [
        { text: "从吴三桂", hint: "私兵 +20；败则族", effects: [{ k: "troops", v: 20 }, { k: "martial", v: 6 }], then: "你跟着反了。三年后，吴三桂在衡州称帝，五个月就死了。", gamble: { deathChance: 0.24, cause: "兵败" } },
        { text: "守城不从", hint: "身体 −6；声望 +10", effects: [{ k: "body", v: -6 }, { k: "fame", v: 10 }], then: "你们守了八个月。城里的粮吃完了，吃马；马吃完了，吃树皮。" },
        { text: "举家避入乡间", hint: "田产折损", effects: [{ k: "field_dry", v: -6 }, { k: "fame", v: -2 }], then: "你在乡下躲了六年。乱平之后回来，县里的人换了一半。" }
      ]
    },
    {
      id: "qing.yapian", cat: "世变", title: "夷船", era: "qing", years: [1839, 1843], age: [14, 70], weight: 30, once: true,
      text: [
        "钦差林则徐至广州，收缴鸦片二万余箱，于虎门海滩销毁。",
        "英人以兵船犯沿海，陷定海，至天津，又南下攻吴淞、镇江。",
        "江宁条约成：开五口，割香港，赔款二千一百万圆。"
      ],
      options: [
        { text: "投军抗英", hint: "武艺 +8；声望 +14", effects: [{ k: "martial", v: 8 }, { k: "fame", v: 14 }], then: "你们的炮打不到他们的船。他们的炮，能打到你们的城墙。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "往内地避乱", hint: "田产折损；保命", effects: [{ k: "field_wet", v: -8 }, { k: "body", v: -4 }], then: "你往西走了三百里。听说海边的炮台，一天就丢了。" },
        { text: "与洋商做生意", hint: "银钱 +30；声望 −10", effects: [{ k: "silver", v: 30 }, { k: "fame", v: -10 }, { k: "knowledge", v: 4 }], then: "你会说几句洋泾浜英语。茶、丝、瓷，从你手里过。" }
      ]
    },
    {
      id: "qing.taiping", cat: "世变", title: "长毛", era: "qing", years: [1851, 1865], age: [14, 70], weight: 34, once: true,
      text: [
        "洪秀全起于金田，称太平天国，蓄发易服，所过焚庙毁像。",
        "两年而下金陵，定为天京。",
        "官军称之「长毛」。"
      ],
      options: [
        { text: "从太平军", hint: "私兵 +26；声望 −10", effects: [{ k: "troops", v: 26 }, { k: "fame", v: -10 }, { k: "martial", v: 6 }], then: "你入了营。男女分馆，夫妻不得同居。天条十款，犯者斩。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "办团练抵抗", hint: "私兵 +18；声望 +12", effects: [{ k: "troops", v: 18 }, { k: "fame", v: 12 }], then: "你们守着县城。城破三次，夺回三次。最后一次，城里的井都填满了。" },
        { text: "逃往上海租界", hint: "银钱 −10；保命", effects: [{ k: "silver", v: -10 }, { k: "knowledge", v: 4 }], then: "租界里洋人巡捕站岗，长毛不来。你在那里学会了看报纸。" }
      ]
    },
    {
      id: "qing.yihetuan", cat: "世变", title: "拳民", era: "qing", years: [1899, 1901], age: [14, 70], weight: 26, once: true,
      text: [
        "义和拳起于山东，谓刀枪不入，焚教堂、杀教民。",
        "慈禧太后召之入京，称义民。八国联军入京，两宫西狩。",
        "辛丑条约：赔款四亿五千万两。"
      ],
      options: [
        { text: "入坛练拳", hint: "武艺 +10；声望 −8", effects: [{ k: "martial", v: 10 }, { k: "fame", v: -8 }], then: "设坛、焚香、念咒。你练了三个月，师父说你已经刀枪不入。你不太信。" , gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "入教，求洋人庇护", hint: "银钱 +8；声望 −14", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -14 }, { k: "knowledge", v: 4 }], then: "神父给你取了洋名。拳民烧教堂时，你躲在钟楼里。" },
        { text: "举家避往乡下", hint: "家产折损；保命", effects: [{ k: "silver", v: -8 }, { k: "body", v: -4 }], then: "你在乡下躲了一年。回城时，街上的教堂只剩半面墙。" }
      ]
    },
    {
      id: "qing.xinhai", cat: "世变", title: "辛亥", era: "qing", years: [1911, 1913], age: [14, 70], weight: 34, once: true,
      text: [
        "武昌新军举义，一夜而据督署。各省响应，纷纷独立。",
        "清廷起用袁世凯，北洋军南下，而南北议和。",
        "宣统三年十二月，诏书逊位。"
      ],
      options: [
        { text: "投革命军", hint: "私兵 +16；声望 +12", effects: [{ k: "troops", v: 16 }, { k: "fame", v: 12 }], then: "你剪了辫子，戴上革命军的臂章。城里的人看着你们，眼神复杂。" },
        { text: "随清室退居", hint: "声望 −8；保命", effects: [{ k: "fame", v: -8 }, { k: "silver", v: -6 }], then: "你收了旗，交了印。回家的路上，辫子还盘在帽子里。" },
        { text: "观望", hint: "什么也没变", effects: [], then: "你在家里等了三个月。等到的是一张新的告示，上面写着「中华民国」。" }
      ]
    },

    /* ── 元清补卷 ────────────────────────────────── */
    {
      id: "yq2.seji", cat: "官府", title: "户计", era: "yuan", age: [16, 60], weight: 16, once: true,
      text: [
        "本朝定诸色户计：民户、军户、匠户、站户、儒户、僧户、医户、盐户……各以色定籍。",
        "父亲是什么籍，儿子就是什么籍。改籍要经官，多半改不成。"
      ],
      options: [
        { text: "守着本籍，安分过", hint: "声望 +4；身体 +2", effects: [{ k: "fame", v: 4 }, { k: "body", v: 2 }], then: "你在本行里待了一辈子。同行的人彼此通婚，渐渐成了一村一姓。" },
        { text: "花钱钻营，改个轻的户", need: { minSilver: 25 }, hint: "银钱 −25；学识 +4", effects: [{ k: "silver", v: -25 }, { k: "knowledge", v: 4 }], then: "你把军户改成了儒户。改籍的文书办了一年，办成那天，你在县门口站了很久。" },
        { text: "逃籍，躲进山里", hint: "声望 −10；田产尽失", effects: [{ k: "fame", v: -10 }, { k: "field_wet", v: -4 }, { k: "body", v: -6 }], then: "你逃了。官府的名册上你的名字还在，赋税照旧算在你那一户上。族人替你垫了三年，此后不再替你说话。" }
      ]
    },
    {
      id: "yq2.qukou", cat: "世变", title: "驱口", era: "yuan", age: [8, 60], weight: 12,
      text: [
        "军中掳来的人口，叫作驱口。主人得卖买之，与牛马同。",
        "有人牙子在村口，问要不要买两个人。"
      ],
      options: [
        { text: "买两个，开荒种地", need: { minSilver: 20 }, hint: "银钱 −20；田 +8 亩", effects: [{ k: "silver", v: -20 }, { k: "field_dry", v: 8 }, { k: "fame", v: -4 }], then: "买来的两个人，一老一少，说是父子。他们在地头搭了个窝棚，夜里不说话。" },
        { text: "不买", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], then: "你说家里养不起。牙子牵着人走了，往东去了。那年冬天很冷，你没敢问他们后来怎么样。" },
        { text: "买下来，放他们走", need: { minSilver: 20 }, hint: "银钱 −20；声望 +14", effects: [{ k: "silver", v: -20 }, { k: "fame", v: 14 }], then: "你替他们除了籍，给了一点钱，让他们往南去。老头跪下磕头，磕到地上有血。" }
      ]
    },
    {
      id: "yq2.zhanyi", cat: "官府", title: "站赤", era: "yuan", age: [16, 50], weight: 12,
      text: [
        "你这一户是站户，须得自备马匹、饮食，供往来使臣乘驿。",
        "使臣过境，一日数起，马跑死了要自家补。"
      ],
      options: [
        { text: "照应付着", hint: "银钱 −10；声望 +4", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 4 }], then: "你养了两匹马，一匹使臣骑，一匹备用。三年里跑死了四匹。你没抱怨过。" },
        { text: "买马、雇人，撑个体面", need: { minSilver: 20 }, hint: "银钱 −20；声望 +10；官职 +4", effects: [{ k: "silver", v: -20 }, { k: "fame", v: 10 }, { k: "official", v: 4 }], then: "你把驿站办得比别处齐整。往来的人记住了你的名字，有人在京里替你说了句话。" },
        { text: "推说马病，应付不过去", hint: "声望 −8；身体 −6", effects: [{ k: "fame", v: -8 }, { k: "body", v: -6 }], then: "使臣在你家等到半夜，没有马。第二天你被带去站官面前，挨了十七板。" }
      ]
    },
    {
      id: "yq2.chaoyin", cat: "市井", title: "钞", era: "yuan", age: [20, 65], weight: 12,
      text: [
        "朝廷行纸钞，禁金银交易。钞面上的字写得清楚：与银同。",
        "可市面上，钞一年比一年毛，米价一年比一年高。"
      ],
      options: [
        { text: "把银子埋起来", hint: "银钱 −6；日后有靠", effects: [{ k: "silver", v: -6 }], then: "你把银子分成三份，埋在灶下、树下、坟边。此后钞越发越滥，你的米还在。" },
        { text: "照着用钞，不藏", hint: "银钱 −8；声望 +2", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 2 }], then: "你按官府的话办事。到了年底，同样一石米，要的钞是年初的三倍。" },
        { text: "干换钞的买卖", hint: "银钱 +14；风险", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -4 }], then: "你低价收钞，等着它涨，或者低价收银，等人急着换。这门生意做三年，够吃十年。", gamble: { deathChance: 0.1, cause: "下狱" } }
      ]
    },
    {
      id: "yq2.quandi", cat: "世变", title: "圈地", era: "qing", age: [8, 60], weight: 14,
      text: [
        "旗人入关，近京五百里内的田地，划给了八旗。",
        "差官拿着绳子来量，量到谁家，谁家的地就成了「圈地」。"
      ],
      options: [
        { text: "认了，搬到别处去", hint: "田 −8 亩；身体 −6", effects: [{ k: "field_wet", v: -4 }, { k: "field_dry", v: -4 }, { k: "body", v: -6 }], then: "你带着全家往南走了二百里，在一个山坳里落了脚。祖坟还在那边，此后就没再去过。" },
        { text: "拿地契去县里争", hint: "声望 +6；可能被拿", effects: [{ k: "fame", v: 6 }, { k: "body", v: -5 }], then: "县官看了你的地契，说：这是旗人的事，我管不了。你把地契拿回来，纸都揉软了。", gamble: { deathChance: 0.1, cause: "狱死" } },
        { text: "投到旗下，做个带地投充", hint: "田留住；声望 −8", effects: [{ k: "fame", v: -8 }, { k: "silver", v: 6 }], then: "你把地投在一位旗人名下，自己成了他的家人。地还在你手里种，只是每年要交一份租子，还要听差遣。" }
      ]
    },
    {
      id: "yq2.taoren", cat: "官府", title: "逃人", era: "qing", age: [18, 65], weight: 12,
      text: [
        "旗下有家人逃了。逃人法严：窝藏者死，邻佑流徙。",
        "有人半夜来敲门，说是要借宿一晚。"
      ],
      options: [
        { text: "不开门", hint: "声望 −3；运气 +1", effects: [{ k: "fame", v: -3 }, { k: "luck", v: 1 }], then: "你在门后站了很久。外面的人敲了三次，然后走了。第二天听说，村东头有人被牵连。" },
        { text: "留下他，给一顿饭", hint: "声望 +6；风险极大", effects: [{ k: "fame", v: 6 }, { k: "grain", v: -1 }], then: "他吃了两碗饭，说了声谢，天不亮就走了。你把他用过的碗洗了三遍。", gamble: { deathChance: 0.16, cause: "流徙" } },
        { text: "报官领赏", hint: "银钱 +8；声望 −14", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -14 }, { k: "grudge", v: 14 }], then: "差役来把人锁走了。赏钱是当场给的，三两只。此后村里没人再跟你说话。" }
      ]
    },
    {
      id: "yq2.tanding", cat: "官府", title: "摊丁", era: "qing", age: [20, 70], weight: 14, once: true,
      years: [1712, 1780],
      text: [
        "朝廷定了：以康熙五十年的人丁数为额，此后滋生人丁，永不加赋。",
        "丁银摊入地亩，有田的多出，无田的不出。"
      ],
      options: [
        { text: "有田，照亩纳银", hint: "银钱 −10；家中添丁不再加赋", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 4 }], then: "你家的田纳得比以前多。可是此后添了几个孩子，县里不再来要丁银。你算了一夜，觉得还是划算。" },
        { text: "无田，从此不必出丁银", hint: "银钱 +6；声望 +4", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 4 }], then: "里正把册子重造了一遍，你那一栏的丁银划掉了。那一年你第一次攒下了钱。" },
        { text: "趁势多买几亩田", need: { minSilver: 40 }, hint: "银钱 −40；田 +12 亩", effects: [{ k: "silver", v: -40 }, { k: "field_wet", v: 12 }], then: "地价还没涨上来。你买了十二亩，写在自己名下。二十年后，这十二亩的地价翻了四倍。" }
      ]
    },
    {
      id: "yq2.baojia", cat: "官府", title: "保甲", era: "qing", age: [18, 70], weight: 14,
      text: [
        "十户为牌，十牌为甲，十甲为保。一家有犯，九家连坐。",
        "县里要推你做个甲长。"
      ],
      options: [
        { text: "应下甲长", hint: "声望 +8；银钱 −4；结怨", effects: [{ k: "fame", v: 8 }, { k: "silver", v: -4 }, { k: "grudge", v: 8 }], then: "你管着十户人的门牌、丁口、出入。上头要什么，你就去催。族中有人说你替官家办事。" },
        { text: "推给别家", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你说自己不识字。里正看了你一眼，把册子合上了。后来那一家做了甲长，做得很难。" },
        { text: "花钱买个清静", need: { minSilver: 5 }, hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "钱递过去，名字就换成了别人。你每年多出五两，换来一年没人上门。" }
      ]
    },
    {
      id: "yq2.wenziyu", cat: "官府", title: "文祸", era: "qing", age: [25, 70], weight: 8,
      text: [
        "有人把你十年前写的一篇文章翻了出来，说里面有不敬的字。",
        "字是你写的。你记得当时只是随手。"
      ],
      options: [
        { text: "自首，认罪求宽", hint: "声望 −16；身体 −10；保命", effects: [{ k: "fame", v: -16 }, { k: "body", v: -10 }, { k: "silver", v: -20 }], then: "你在县里跪了三天，认了「愚昧无知」。罚了钱，革了功名，人保住了。" },
        { text: "烧掉所有文稿，死不认", hint: "声望 −8；风险大", effects: [{ k: "fame", v: -8 }, { k: "knowledge", v: -6 }], then: "你把书稿全烧了，灰埋在菜地里。审了半年，说证据不足。此后你很多年不写字。", gamble: { deathChance: 0.2, cause: "狱死" } },
        { text: "托人打点", need: { minSilver: 40 }, hint: "银钱 −40；声望 +2", effects: [{ k: "silver", v: -40 }, { k: "fame", v: 2 }], then: "银子从县里一路递上去。案子最后以「查无实据」了结。你烧了那篇文章，也烧了那支笔。" }
      ]
    },
    {
      id: "yq2.cao", cat: "营生", title: "漕", era: "qing", age: [18, 60], weight: 12,
      text: [
        "漕船北上，一船载米四百石。船户、水手、纤夫，各有各的帮。",
        "有人问你：上不上船。"
      ],
      options: [
        { text: "上船做水手", hint: "银钱 +6；身体 −10", effects: [{ k: "silver", v: 6 }, { k: "body", v: -10 }, { k: "martial", v: 4 }], then: "过闸、拉纤、下水堵漏。走一趟四个月，回来时人黑了一层。船上死过一个，扔进河里，连名字都没留下。", gamble: { deathChance: 0.1, cause: "溺死" } },
        { text: "在岸上做纤夫", hint: "银钱 +3；身体 −12", effects: [{ k: "silver", v: 3 }, { k: "body", v: -12 }], then: "一天拉三十里，绳子勒在肩膀上，磨出一层硬皮。你学会了唱号子，也学会了在号子里偷懒。" },
        { text: "不去，太险", hint: "什么也没变", effects: [], then: "你说家里走不开。那一年漕船在清口翻了两艘，死了四十多人，名字贴在码头上。" }
      ]
    },
    {
      id: "yq2.lougui", cat: "官府", title: "陋规", era: "qing", age: [25, 70], weight: 12,
      text: [
        "你在衙门里当差。上头的规矩是明的，下头的规矩是暗的。",
        "今年轮到你去收一项「常例」。"
      ],
      options: [
        { text: "照收，大家都有", hint: "银钱 +12；声望 −6", effects: [{ k: "silver", v: 12 }, { k: "fame", v: -6 }], then: "钱收上来了，分作七份：上司三份，同僚两份，你两份。你把自己那两份包好，回家放进柜子。" },
        { text: "少收些，留个余地", hint: "银钱 +5；声望 +6", effects: [{ k: "silver", v: 5 }, { k: "fame", v: 6 }], then: "你只收了六成。上司问起，你说：那年景不好。他看了你一眼，没再问。" },
        { text: "一文不收", hint: "银钱 −6；声望 +14；结怨", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 14 }, { k: "grudge", v: 12 }], then: "你把钱退了。百姓给你送了块匾，同僚三个月不同你说话。年底考评，你被写了「迂」。", gamble: { deathChance: 0.08, cause: "下狱" } }
      ]
    },
    {
      id: "yq2.yanghang", cat: "市井", title: "洋行", era: "qing", age: [20, 60], weight: 10,
      years: [1757, 1842],
      text: [
        "番舶到广州，只在十三行交易。行商代纳关税，也代担风险。",
        "有洋商要订一批茶，先付定银。"
      ],
      options: [
        { text: "接这单", need: { minSilver: 20 }, hint: "银钱 −20；或大赚", effects: [{ k: "silver", v: -20 }], gamble: { winChance: 0.6, win: [{ k: "silver", v: 60 }, { k: "knowledge", v: 5 }], lose: [{ k: "silver", v: -10 }, { k: "fame", v: -6 }], winNote: "茶按时交了，银子按洋钱算。你第一次见到银元，上面的头像侧着脸。", loseNote: "茶晚了半个月，洋商扣了三成。你赔了钱，还得罪了行里的同行。" } },
        { text: "只在行里做个伙计", hint: "银钱 +8；学识 +4", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 4 }], then: "你替行商记账，学着算洋钱和银两的差价。你学会了几个番话的词：茶、丝、好、不要。" },
        { text: "不碰洋务", hint: "声望 +2", effects: [{ k: "fame", v: 2 }], then: "你说：跟番人打交道，说不清。后来行商倒了几家，你庆幸过一阵。" }
      ]
    },
    {
      id: "yq2.jiaoan", cat: "世变", title: "教案", era: "qing", age: [20, 70], weight: 10,
      years: [1860, 1900],
      text: [
        "村里有人入了教。入了教，就不再出庙捐、不参与迎神。",
        "族中人说这是背祖。教士说这是条约里写着的。"
      ],
      options: [
        { text: "出面调停，两头劝", hint: "声望 +10；身体 −4", effects: [{ k: "fame", v: 10 }, { k: "body", v: -4 }], then: "你在祠堂和教堂之间跑了二十趟。最后议定：入教的人出钱，不出人。两边都不满意，可是没有打起来。" },
        { text: "跟着族人去砸教堂", hint: "声望 +6；招祸", effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 10 }], then: "你们砸了窗、烧了门。三个月后，县里来了公文，要赔银四百两，摊在全村。", gamble: { deathChance: 0.14, cause: "械斗" } },
        { text: "自己也去听讲", hint: "学识 +6；声望 −10", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: -10 }], then: "你去了三次。教士讲的话你半懂不懂，可是他给你治了腿上的疮。族里从此不再叫你吃席。" }
      ]
    }
  ]);;
})(window.PACK_BASE);
