/* 生在何朝 · 共同底本（九续）：出身的门（下）
 * 士、商、农、佃、贱。
 * 这一卷接上半卷写「门里门外」：读书人家的书、商户人家的账、
 * 编户农的田、佃户的租、贱籍的籍。有的门进得去，有的门一生都在门上。
 * 记事体。钱数写在 hint 里。id 一律以 cb. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 读书人家 ══════════ */

    {
      id: "cb.g.jiaxue", cat: "学问", title: "一箱书", age: [6, 13], weight: 17, once: true,
      class: ["gentry"],
      text: [
        "阁楼上有一只旧箱，里头是祖上留下的书。纸脆，翻的时候要托着。",
        "父亲说：这些书，你祖父读过三遍。到你这一辈，别断了。"
      ],
      options: [
        { text: "一本一本地读", hint: "学识 +7；身体 −2", effects: [{ k: "knowledge", v: 7 }, { k: "body", v: -2 }], setFlag: ["literate"] },
        { text: "先读有批注的那几本", hint: "学识 +5；得祖上之法", effects: [{ k: "knowledge", v: 5 }], setFlag: ["literate"], then: "批注是朱笔，写得很小。有几处写着：此说非是。你从此知道，书也是可以不信的。" },
        { text: "把书搬去卖了", hint: "银钱 +6；声望 −6", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -6 }], then: "收书的人翻了翻，说这些不值钱，只肯按纸价称。你搬了三趟。" }
      ]
    },

    {
      id: "cb.g.zushu", cat: "学问", title: "族塾", age: [7, 15], weight: 15, once: true,
      class: ["gentry"],
      text: [
        "族塾的先生是族里请的，束脩从祭田里出。一间厢房，十一条板凳。",
        "先生先教认字，再教对句。他手里有一根竹片。"
      ],
      options: [
        { text: "每日第一个到", hint: "学识 +6；声望 +2", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 2 }] },
        { text: "带着族中幼弟一起读", hint: "学识 +4；族中记你的好", effects: [{ k: "knowledge", v: 4 }, { k: "favor", v: 5 }] },
        { text: "翻墙去河边", hint: "身体 +5；学识 −2", effects: [{ k: "body", v: 5 }, { k: "knowledge", v: -2 }], then: "河边的芦苇有一人多高。你在那里躺过一个夏天，什么都没读。" }
      ]
    },

    {
      id: "cb.g.jieshu", cat: "学问", title: "借书", age: [12, 24], weight: 12,
      class: ["gentry"],
      text: [
        "邻县一家有藏书，据说有几千卷。他家不借外人，只肯换。",
        "你要拿什么去换，得自己想办法。"
      ],
      options: [
        { text: "抄一部自家的书去换", hint: "学识 +6；身体 −3", effects: [{ k: "knowledge", v: 6 }, { k: "body", v: -3 }] },
        { text: "拿两匹绢去", hint: "银钱 −5；学识 +4", effects: [{ k: "silver", v: -5 }, { k: "knowledge", v: 4 }] },
        { text: "上门去求，只求在人家书房里看三天", hint: "声望 +1；学识 +5", effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: 1 }], then: "三天里你只睡了六个时辰。第三日天黑，主人家来催，你把书合上，记住了页码。" }
      ]
    },

    {
      id: "cb.g.qingyi", cat: "文事", title: "乡评", age: [18, 34], weight: 10,
      class: ["gentry"],
      text: [
        "乡里在议一个人：做过官，回来置了三百亩田，族里有人说他的钱不干净。",
        "有人来问你一句话。你的话，在这乡里有些分量。"
      ],
      options: [
        { text: "说句公道话", hint: "声望 +6；得罪一族", effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 6 }] },
        { text: "不置可否", hint: "无得失", effects: [{ k: "luck", v: 1 }], then: "你说：我不深知。这四个字，后来两边都不认你是自己人。" },
        { text: "跟着众人骂", hint: "声望 +3；心里不安", effects: [{ k: "fame", v: 3 }, { k: "luck", v: -1 }] }
      ]
    },

    {
      id: "cb.g.xuetian", cat: "宗族", title: "学田", age: [24, 55], weight: 10,
      class: ["gentry"],
      text: [
        "族里的学田，被一户强势的族人占去种了三年，租一粒没交。",
        "族塾的先生去年就辞了馆。"
      ],
      options: [
        { text: "联名告官", hint: "官声 +5；族中翻脸", effects: [{ k: "official", v: 5 }, { k: "grudge", v: 8 }, { k: "fame", v: 4 }] },
        { text: "自家出钱把族塾撑起来", hint: "银钱 −10；声望 +9", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 9 }] },
        { text: "不管，让子弟各回各家", hint: "银钱 +2；族中散了", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -6 }] }
      ]
    },

    {
      id: "cb.g.daibi", cat: "文事", title: "代笔", age: [20, 58], weight: 11,
      class: ["gentry"],
      text: [
        "有人上门，请你写一封信。信是写给县里的，说的事不太干净。",
        "他把一小锭银子放在桌角，用茶碗压着。"
      ],
      options: [
        { text: "写", hint: "银钱 +6；日后或牵连", effects: [{ k: "silver", v: 6 }, { k: "grudge", v: 4 }] },
        { text: "不写", hint: "声望 +3；得罪人", effects: [{ k: "fame", v: 3 }, { k: "favor", v: -3 }] },
        { text: "写，但留一份底稿", hint: "银钱 +5；多一层保命的", effects: [{ k: "silver", v: 5 }, { k: "knowledge", v: 2 }, { k: "luck", v: 1 }], then: "底稿夹在一本不常翻的书里。你希望这一辈子都不用去翻它。" }
      ]
    },

    {
      id: "cb.g.jiafa", cat: "宗族", title: "家法", age: [15, 45], weight: 9,
      class: ["gentry"],
      text: [
        "族里出了件事：一个后生与寡嫂有了往来。族老在祠堂等着。",
        "按家法，要沉塘。按律，罪不至死。"
      ],
      options: [
        { text: "照家法办", hint: "声望 +5；夜里难睡", effects: [{ k: "fame", v: 5 }, { k: "luck", v: -2 }] },
        { text: "送去官府，按律断", hint: "官声 +6；族中恨你", effects: [{ k: "official", v: 6 }, { k: "grudge", v: 9 }] },
        { text: "连夜让他走", hint: "声望 −4；救一条命", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 6 }], then: "他从后门走的，只带了一双鞋。二十年后有人从南边带话回来，说他做了生意，还活着。" }
      ]
    },

    {
      id: "cb.g.hunyin", cat: "家族", title: "门户", age: [16, 27], weight: 13, once: true,
      class: ["gentry"],
      text: [
        "一家是同行，书香，聘礼要得薄；一家是商户，陪嫁很厚。",
        "母亲说：书能读，饭也要吃。"
      ],
      options: [
        { text: "娶书香人家的", hint: "学识 +5；银钱 −4", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"] },
        { text: "娶商户的女儿", hint: "银钱 +14；声望 −5", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -5 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }], setFlag: ["married"], then: "陪嫁抬了十六抬。族里有人算了算，说你这一房从此不必愁了。" },
        { text: "都不娶，先中一个再说", hint: "学识 +3；母亲发愁", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "cb.g.huozai", cat: "天灾", title: "书湿了", age: [10, 50], weight: 8, once: true,
      class: ["gentry"],
      text: [
        "六月里一场大雨，屋顶漏了。水顺着梁淌下来，正滴在书箱上。",
        "等发现的时候，最上头那几本已经粘成一叠。"
      ],
      options: [
        { text: "一页一页揭开，晾在院里", hint: "学识 +3；身体 −2", effects: [{ k: "knowledge", v: 3 }, { k: "body", v: -2 }], then: "晾了七天。有几页的字化开了，像被人哭过。" },
        { text: "先把书搬走，屋顶以后再说", hint: "学识 +4；身体 −4", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -4 }] },
        { text: "认了，剩下几本重新抄", hint: "银钱 −4；学识 +5", effects: [{ k: "silver", v: -4 }, { k: "knowledge", v: 5 }] }
      ]
    },

    /* ══════════ 商户 ══════════ */

    {
      id: "cb.m.hang", cat: "市井", title: "入行", age: [16, 32], weight: 15, once: true,
      class: ["merchant"],
      text: [
        "要在这条街上做买卖，得先入{{行|同业行会}}。入行要交一笔行用，还要两个同行作保。",
        "行首说：入了行，价钱有行里的规矩；出了事，行里替你说话。"
      ],
      options: [
        { text: "交钱入行", hint: "银钱 −8；日后有靠", effects: [{ k: "silver", v: -8 }, { k: "favor", v: 6 }, { k: "official", v: 3 }] },
        { text: "不入，自己在城外摆摊", hint: "银钱 +4；处处受限", effects: [{ k: "silver", v: 4 }, { k: "official", v: -4 }] },
        { text: "入了行，再给行首送一份礼", hint: "银钱 −11；行里好说话", effects: [{ k: "silver", v: -11 }, { k: "favor", v: 9 }] }
      ]
    },

    {
      id: "cb.m.hemai", cat: "官府", title: "和买", age: [22, 58], weight: 12,
      class: ["merchant"],
      text: [
        "衙门要一批货，按官价买。官价只有市价的一半。",
        "差役说：这是给你面子，别家想供还供不上。"
      ],
      options: [
        { text: "照价供上", hint: "银钱 −10；官声 +7", effects: [{ k: "silver", v: -10 }, { k: "official", v: 7 }], then: "货款拖了八个月才发下来，发的还是旧钱。" },
        { text: "推说货不够", hint: "银钱 +2；官声 −5", effects: [{ k: "silver", v: 2 }, { k: "official", v: -5 }, { k: "grudge", v: 4 }] },
        { text: "供上，但货里掺一成次品", hint: "银钱 −4；日后被查出来", effects: [{ k: "silver", v: -4 }, { k: "grudge", v: 7 }] }
      ]
    },

    {
      id: "cb.m.ya", cat: "市井", title: "牙", age: [20, 55], weight: 11,
      class: ["merchant"],
      text: [
        "有人来请你做{{牙人|居间说合的中间人}}：一头是北边的客商，一头是本地的粮行。",
        "说成了，抽两分。说砸了，两头都怪你。"
      ],
      options: [
        { text: "接这趟", hint: "银钱 +9；结怨的机会", effects: [{ k: "silver", v: 9 }, { k: "grudge", v: 4 }] },
        { text: "接，但只做中人，不担保", hint: "银钱 +6；稳当", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 2 }] },
        { text: "不接", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "cb.m.zhe", cat: "市井", title: "赊账", age: [24, 62], weight: 11,
      class: ["merchant"],
      text: [
        "账上有一笔三年未清的赊账：老主顾，欠四十两。他家去年刚办了丧事。",
        "伙计说：这账再不要，就成死账了。"
      ],
      options: [
        { text: "上门去要", hint: "银钱 +8；名声难看", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -6 }] },
        { text: "免了，把账划掉", hint: "银钱 −4；声望 +8", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 8 }], then: "他儿子后来在你铺里做了十年伙计，一文钱没多要过。" },
        { text: "折一半，让他慢慢还", hint: "银钱 +3；两家留了情", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 5 }] }
      ]
    },

    {
      id: "cb.m.fenhao", cat: "营生", title: "分号", age: [28, 60], weight: 10,
      class: ["merchant"],
      text: [
        "外县的生意做起来了，要有人去坐镇。托外人，怕卷了货走；托自家人，怕压不住伙计。",
        "你手上只有一个人选是稳的：你弟弟。"
      ],
      options: [
        { text: "让弟弟去", hint: "银钱 +12；日后分家难断", effects: [{ k: "silver", v: 12 }, { k: "grudge", v: 4 }] },
        { text: "雇个老伙计，给股", hint: "银钱 +9；可靠但分利", effects: [{ k: "silver", v: 9 }, { k: "favor", v: 4 }] },
        { text: "不开了，守着本铺", hint: "银钱 +3；安稳", effects: [{ k: "silver", v: 3 }, { k: "body", v: 3 }] }
      ]
    },

    {
      id: "cb.m.zidi", cat: "家族", title: "子弟", age: [30, 60], weight: 12, once: true,
      class: ["merchant"],
      text: [
        "儿子读书读得进去。先生说：这孩子可以考。",
        "可商籍之家去考，要脱籍，脱了籍就不许再经商。铺子交给谁。"
      ],
      options: [
        { text: "让他去考，铺子另找人管", hint: "银钱 −6；声望 +8", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 8 }], setFlag: ["literate"] },
        { text: "让他学着管账", hint: "银钱 +8；学识 +2", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 2 }] },
        { text: "两头都占：白日读书，夜里看账", hint: "学识 +4；身体 −4", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -4 }], then: "他十八岁那年瘦得脱了形。先生说：这样读，读不长的。" }
      ]
    },

    {
      id: "cb.m.juanshu", cat: "官府", title: "报效", age: [26, 62], weight: 10,
      class: ["merchant"],
      text: [
        "衙门修城墙，缺钱。有人递话：出得多，可以给一个散衔。",
        "散衔不管事，只穿一件衣服，见官不跪。"
      ],
      options: [
        { text: "出钱换个衔", hint: "银钱 −14；官声 +9", effects: [{ k: "silver", v: -14 }, { k: "official", v: 9 }, { k: "fame", v: 5 }] },
        { text: "出一点，不图衔", hint: "银钱 −6；官声 +4", effects: [{ k: "silver", v: -6 }, { k: "official", v: 4 }] },
        { text: "一文不出", hint: "官声 −6；省下钱", effects: [{ k: "official", v: -6 }, { k: "silver", v: 3 }] }
      ]
    },

    {
      id: "cb.m.lushang", cat: "营生", title: "货在道上", age: [20, 58], weight: 12,
      class: ["merchant"],
      text: [
        "一批货走了二十天，该到没到。同行的两批都到了。",
        "伙计天天去渡口看。"
      ],
      options: [
        { text: "再等", hint: "赌这一趟", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 18 }], lose: [{ k: "silver", v: -12 }],
            winNote: "第二十六天货到了。船在浅滩搁了四天，货一点没少。那一年的价正好涨了。",
            loseNote: "货被扣在关下，说是漏了税。交了罚钱，货也只回来一半。" } },
        { text: "带钱去沿路打点", hint: "银钱 −9；货能回来", effects: [{ k: "silver", v: -9 }, { k: "official", v: 2 }] },
        { text: "认了，另补一批货", hint: "银钱 −12；主顾不断", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 5 }] }
      ]
    },

    {
      id: "cb.m.huipiao", cat: "营生", title: "会票", age: [30, 62], weight: 9,
      class: ["merchant"],
      text: [
        "往远处运银子，路上不干净。同行都用{{会票|在甲地存银、乙地取银的凭据}}。",
        "兑铺的抽头不低，可路上丢一次，三年白干。"
      ],
      options: [
        { text: "都用会票", hint: "银钱 −5；路上安稳", effects: [{ k: "silver", v: -5 }, { k: "luck", v: 2 }] },
        { text: "自己押银子走", hint: "银钱 +4；身体 −5", effects: [{ k: "silver", v: 4 }, { k: "body", v: -5 }] },
        { text: "一半会票，一半现银", hint: "银钱 −2；两头都留着", effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 2 }] }
      ]
    },

    /* ══════════ 编户农 ══════════ */

    {
      id: "cb.f.tianfu", cat: "赋役", title: "田赋", age: [18, 66], weight: 14,
      class: ["farmer"],
      text: [
        "秋粮下来了，册上写着：田十五亩，应纳若干。",
        "里正说：今年加了一成，是上头的。"
      ],
      options: [
        { text: "照数交清", hint: "存粮 −6 石；不惹事", effects: [{ k: "grain", v: -6 }, { k: "official", v: 3 }] },
        { text: "求里正宽几日", hint: "银钱 −2；欠着", effects: [{ k: "silver", v: -2 }, { k: "grain", v: -3 }] },
        { text: "说没有，硬扛", hint: "存粮 −1 石；挨一顿", effects: [{ k: "grain", v: -1 }, { k: "body", v: -4 }, { k: "fame", v: 3 }], then: "差役把门板卸走了一块。屋里从此冬天进风。" }
      ]
    },

    {
      id: "cb.f.qu", cat: "乡里", title: "修渠", age: [20, 62], weight: 11,
      class: ["farmer"],
      text: [
        "村东的水渠淤了三年。上头的田有水，下头的田看着。",
        "要修，得按亩出人；不出人的，出粮。"
      ],
      options: [
        { text: "出人，挑四十天土", hint: "身体 −6；田里得益", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: 2 }] },
        { text: "出粮，让别家出力", hint: "存粮 −4 石", effects: [{ k: "grain", v: -4 }, { k: "field_wet", v: 1 }] },
        { text: "不出，也不修", hint: "声望 −4；田里缺水", effects: [{ k: "fame", v: -4 }, { k: "grain", v: -3 }] }
      ]
    },

    {
      id: "cb.f.huangong", cat: "乡里", title: "换工", age: [14, 62], weight: 12,
      class: ["farmer", "tenant"],
      text: [
        "麦收三天就要完，人手不够。邻家来帮一天，日后你也要还一天。",
        "有借有还，村里才转得动。"
      ],
      options: [
        { text: "去帮，日后还", hint: "声望 +4；有个人情", effects: [{ k: "fame", v: 4 }, { k: "favor", v: 3 }] },
        { text: "雇短工，出钱", hint: "银钱 −3；干净利落", effects: [{ k: "silver", v: -3 }] },
        { text: "谁也不帮，自己慢慢割", hint: "存粮 −2 石；人缘薄", effects: [{ k: "grain", v: -2 }, { k: "fame", v: -3 }] }
      ]
    },

    {
      id: "cb.f.niu", cat: "生计", title: "耕牛", age: [16, 66], weight: 11,
      class: ["farmer", "tenant"],
      text: [
        "牛老了，犁一天要歇两天。买一头壮的要十二两，家里只有七两。",
        "卖了老牛，能凑一半。"
      ],
      options: [
        { text: "借钱买壮牛", hint: "欠债；日后加倍出力", effects: [{ k: "silver", v: -4 }, { k: "debt", v: { amt: 8, rate: 0.03, dueYears: 2 } }] },
        { text: "卖老牛，先换人拉犁", hint: "银钱 +3；身体 −7", effects: [{ k: "silver", v: 3 }, { k: "body", v: -7 }] },
        { text: "跟邻家合用一头", hint: "声望 +3；误农时", effects: [{ k: "fame", v: 3 }, { k: "grain", v: -3 }] }
      ]
    },

    {
      id: "cb.f.fenjia", cat: "宗族", title: "分家", age: [22, 46], weight: 12, once: true,
      class: ["farmer", "tenant"],
      text: [
        "兄弟两个都成了家，一口锅里搅不开。请了族中长辈来写分书。",
        "田十五亩，屋五间，牛一头。怎么分，长辈先看你。"
      ],
      options: [
        { text: "田屋对半分，牛归兄长", hint: "声望 +5；本分", effects: [{ k: "fame", v: 5 }, { k: "field_wet", v: -2 }] },
        { text: "要田不要屋", hint: "田多；日后要盖房", effects: [{ k: "field_wet", v: 2 }, { k: "silver", v: -4 }] },
        { text: "要现钱，田屋都让", hint: "银钱 +9；日后无根", effects: [{ k: "silver", v: 9 }, { k: "field_wet", v: -3 }] }
      ]
    },

    {
      id: "cb.f.jieliang", cat: "生计", title: "青黄不接", age: [18, 62], weight: 13, when: { maxGrain: 5 },
      class: ["farmer", "tenant", "base"],
      text: [
        "去年存的粮吃到三月见底，新麦还要四十天。",
        "富户肯借，借一石，秋后还一石五。"
      ],
      options: [
        { text: "借两石", hint: "存粮 +2 石；欠债", effects: [{ k: "grain", v: 2 }, { k: "debt", v: { amt: 3, rate: 0.05, dueYears: 1 } }] },
        { text: "不借，挖野菜掺着吃", hint: "身体 −6；不欠人", effects: [{ k: "body", v: -6 }] },
        { text: "去镇上做短工换粮", hint: "身体 −4；存粮 +2 石", effects: [{ k: "body", v: -4 }, { k: "grain", v: 2 }] }
      ]
    },

    /* ══════════ 佃作 ══════════ */

    {
      id: "cb.t.zu", cat: "赋役", title: "交租", age: [14, 66], weight: 15,
      class: ["tenant"],
      text: [
        "租是四六分：田里收十石，主家拿六石。今年只收了七石。",
        "主家的管事拿着斗来了，站在场院上。"
      ],
      options: [
        { text: "照数交", hint: "存粮 −4 石；留个好名声", effects: [{ k: "grain", v: -4 }, { k: "favor", v: 4 }] },
        { text: "求减一成", hint: "存粮 −3 石；主家不悦", effects: [{ k: "grain", v: -3 }, { k: "grudge", v: 4 }] },
        { text: "把瘪谷掺进去", hint: "存粮 −2 石；被看出来", effects: [{ k: "grain", v: -2 }, { k: "grudge", v: 6 }, { k: "fame", v: -4 }] }
      ]
    },

    {
      id: "cb.t.zhu", cat: "人际", title: "主家", age: [16, 62], weight: 11,
      class: ["tenant"],
      text: [
        "主家的老太太做寿，佃户都要去磕头，各家随一份礼。",
        "礼薄了，来年租子不好说话。"
      ],
      options: [
        { text: "随一份厚的", hint: "银钱 −4；租上好说话", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 6 }] },
        { text: "随一份薄的", hint: "银钱 −1", effects: [{ k: "silver", v: -1 }] },
        { text: "不去", hint: "声望 −4；来年难过", effects: [{ k: "fame", v: -4 }, { k: "grudge", v: 5 }] }
      ]
    },

    {
      id: "cb.t.kangzu", cat: "世变", title: "抗租", age: [20, 56], weight: 9, once: true,
      class: ["tenant"],
      text: [
        "今年颗粒无收，全村商量着不交。有人在祠堂前敲了锣。",
        "主家已经报了官。"
      ],
      options: [
        { text: "跟着不交", hint: "存粮留着；或有牢狱", effects: [{ k: "grain", v: 3 }, { k: "fame", v: 5 }],
          gamble: { winChance: 0.4, win: [{ k: "favor", v: 6 }], lose: [{ k: "body", v: -10 }, { k: "silver", v: -6 }],
            winNote: "主家退了半步，减了三成，还免了今年的利息。村里人说：这回是撑住了。",
            loseNote: "带头的人被锁走了三个。你在堂上挨了板子，回来躺了一个月。" } },
        { text: "偷偷先交了", hint: "存粮 −4 石；村里骂你", effects: [{ k: "grain", v: -4 }, { k: "fame", v: -8 }, { k: "favor", v: 4 }] },
        { text: "连夜把家里粮藏起来", hint: "存粮 +2 石；心里不安", effects: [{ k: "grain", v: 2 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "cb.t.zhuan", cat: "生计", title: "转佃", age: [22, 62], weight: 10,
      class: ["tenant"],
      text: [
        "有人愿意出一笔{{顶首|承佃时付给原佃户的钱}}，接你手上的这块田。",
        "这田你种了十二年。田埂是你一锹一锹培起来的。"
      ],
      options: [
        { text: "接了钱，转出去", hint: "银钱 +10；从此无田可种", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -3 }] },
        { text: "不转，自己种", hint: "身体 −4；田还在", effects: [{ k: "body", v: -4 }, { k: "favor", v: 3 }] },
        { text: "转一半，留一半", hint: "银钱 +5；两头都顾", effects: [{ k: "silver", v: 5 }, { k: "grain", v: -2 }] }
      ]
    },

    {
      id: "cb.t.tao", cat: "世变", title: "逃", age: [18, 52], weight: 8, once: true,
      class: ["tenant"],
      text: [
        "邻村有十几户连夜走了，说是去山里开荒，不上册，不交租。",
        "走的人把门板都拆走了。"
      ],
      options: [
        { text: "跟着走", hint: "身体 −8；从此不在册上", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }, { k: "field_wet", v: 2 }] },
        { text: "留下", hint: "声望 +3；租照旧", effects: [{ k: "fame", v: 3 }] },
        { text: "去告发他们", hint: "银钱 +4；村里恨你", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -10 }, { k: "official", v: 5 }] }
      ]
    },

    {
      id: "cb.t.hun", cat: "家族", title: "娶亲", age: [18, 32], weight: 12, once: true, sex: "male",
      class: ["tenant", "base"], when: { maxSilver: 12 },
      text: [
        "说亲的人来了两趟，最后都没成。对方要的聘礼，你家拿不出。",
        "母亲说：要不，去邻村问一家更穷的。"
      ],
      options: [
        { text: "借钱包一份聘礼", hint: "银钱 −8；欠债", effects: [{ k: "silver", v: -8 }, { k: "debt", v: { amt: 6, rate: 0.04, dueYears: 2 } }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"] },
        { text: "娶个寡妇，不要聘礼", hint: "声望 −4；成家", effects: [{ k: "fame", v: -4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 26 } }], setFlag: ["married"] },
        { text: "不娶了", hint: "声望 −3；一人过", effects: [{ k: "fame", v: -3 }, { k: "body", v: 2 }] }
      ]
    },

    /* ══════════ 贱籍 ══════════ */

    {
      id: "cb.b.ming", cat: "家族", title: "名字", age: [8, 20], weight: 14, once: true,
      class: ["base"],
      text: [
        "你家的名字不在民册上，在另一本册上。那本册子叫{{贱籍|各类不得应举、不得与良民通婚的户籍}}。",
        "父亲说：这本册子，传了四代了。"
      ],
      options: [
        { text: "问能不能改", hint: "学识 +3；挨了一巴掌", effects: [{ k: "knowledge", v: 3 }, { k: "body", v: -2 }], then: "父亲打完就后悔了。他坐下来，说：改不了。改一次，要三代人的钱。" },
        { text: "记下册上的字", hint: "学识 +5；心里存了事", effects: [{ k: "knowledge", v: 5 }], then: "你把那几行字描在手心，晚上在被子里一遍遍默。第二天手上都是墨。" },
        { text: "不问，下地干活", hint: "身体 +5", effects: [{ k: "body", v: 5 }] }
      ]
    },

    {
      id: "cb.b.zhu", cat: "人际", title: "主家", age: [10, 60], weight: 13,
      class: ["base"],
      text: [
        "主家要人去城里送一趟东西，来回六天。这样的差事，一向是派给你家的。",
        "母亲说：路上小心，别多话。"
      ],
      options: [
        { text: "去，路上不多话", hint: "身体 −5；主家信你", effects: [{ k: "body", v: -5 }, { k: "favor", v: 6 }] },
        { text: "去，顺手捎一点自家的东西去卖", hint: "银钱 +4；被发现就完了", effects: [{ k: "silver", v: 4 }, { k: "luck", v: -2 }] },
        { text: "求母亲去推掉", hint: "声望 −3；少一趟腿", effects: [{ k: "fame", v: -3 }, { k: "body", v: 2 }] }
      ]
    },

    {
      id: "cb.b.tuoji", cat: "世变", title: "脱籍", age: [16, 45], weight: 10, once: true,
      class: ["base"],
      text: [
        "有人肯替你办脱籍：从贱籍改到民籍，代价是三十两，加一份冒认的文书。",
        "办成了，你就是另一个人；办不成，罪加一等。"
      ],
      options: [
        { text: "凑钱办", hint: "银钱 −14；赌一生", effects: [{ k: "silver", v: -14 }],
          gamble: { winChance: 0.42, win: [{ k: "fame", v: 10 }, { k: "official", v: 4 }], lose: [{ k: "body", v: -10 }, { k: "fame", v: -8 }],
            winNote: "新册上有了你的名字。你捧着那张纸看了半宿，忽然哭了。",
            loseNote: "文书是假的。你在县前挨了板子，回来时那条街的人都在看你。" } },
        { text: "不办，把这份钱留着", hint: "银钱 +6；认了", effects: [{ k: "silver", v: 6 }] },
        { text: "先让儿子去念书", hint: "学识 +4；日后或有一条路", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 3 }] }
      ]
    },

    {
      id: "cb.b.peishen", cat: "生计", title: "身价", age: [18, 48], weight: 11,
      class: ["base"],
      text: [
        "主家说你父亲当年是花八两银子买的，如今要你补一张身契，写十二两。",
        "多出来的四两，算是这些年的饭钱。"
      ],
      options: [
        { text: "按手印", hint: "银钱 −1；从此身契在人手里", effects: [{ k: "silver", v: -1 }, { k: "fame", v: -3 }] },
        { text: "求减一些", hint: "银钱 −1；主家不悦", effects: [{ k: "silver", v: -1 }, { k: "grudge", v: 4 }] },
        { text: "不按，宁可挨打", hint: "身体 −8；不认这张纸", effects: [{ k: "body", v: -8 }, { k: "fame", v: 4 }] }
      ]
    },

    {
      id: "cb.b.shu", cat: "生计", title: "赎身", age: [20, 52], weight: 9, once: true,
      class: ["base"],
      text: [
        "主家松了口：二十两，可以赎身出户。",
        "二十两是你八年的工钱。"
      ],
      options: [
        { text: "赎", hint: "银钱 −14；从此是良民", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 8 }, { k: "official", v: 3 }] },
        { text: "再等两年，凑够了再赎", hint: "银钱 +3；人在原处", effects: [{ k: "silver", v: 3 }] },
        { text: "不赎，把钱留给家里", hint: "声望 +5；身契还在", effects: [{ k: "fame", v: 5 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "cb.b.zisun", cat: "家族", title: "子孙", age: [26, 55], weight: 11,
      class: ["base"],
      text: [
        "儿子到了读书的年纪。先生说这孩子记性好，可惜——他停在这里没往下说。",
        "你替他接了一句：可惜在册上。"
      ],
      options: [
        { text: "还是送去读，读一天算一天", hint: "银钱 −4；学识 +4", effects: [{ k: "silver", v: -4 }, { k: "knowledge", v: 4 }] },
        { text: "让他学一门手艺", hint: "银钱 +5；身体 +2", effects: [{ k: "silver", v: 5 }, { k: "body", v: 2 }] },
        { text: "想法子冒籍去考", hint: "赌一回；成了改一家人的命", effects: [{ k: "silver", v: -6 }],
          gamble: { winChance: 0.3, win: [{ k: "fame", v: 12 }], lose: [{ k: "fame", v: -10 }, { k: "body", v: -8 }],
            winNote: "他中了。榜上那个姓，是你们家借来的。",
            loseNote: "被人告了。孩子被枷在县前三天，回来就不怎么说话了。" } }
      ]
    },

    {
      id: "cb.b.hun", cat: "家族", title: "不通婚", age: [16, 30], weight: 12, once: true,
      class: ["base"],
      text: [
        "有人替你说了一门亲，对方是良民家的女儿。她家临到下定，反悔了。",
        "媒人回话说：他家说，不能把女儿送进那本册子里。"
      ],
      options: [
        { text: "认了，另找一门同样的", hint: "声望 +2；成家", effects: [{ k: "fame", v: 2 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 18 } }], setFlag: ["married"] },
        { text: "多出聘礼，再求一次", hint: "银钱 −9；或成", effects: [{ k: "silver", v: -9 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"] },
        { text: "不娶了", hint: "声望 −2；一个人过", effects: [{ k: "fame", v: -2 }, { k: "body", v: 2 }] }
      ]
    },

    {
      id: "cb.b.chu", cat: "世变", title: "出户", age: [22, 58], weight: 8, once: true,
      class: ["base"],
      text: [
        "主家散了。老主人死了，儿子们分了产，用不着这些人了。",
        "管家说：各人自寻生路去罢。"
      ],
      options: [
        { text: "去城里找活", hint: "身体 −6；银钱 +4", effects: [{ k: "body", v: -6 }, { k: "silver", v: 4 }] },
        { text: "投另一家", hint: "声望 −2；有个落脚处", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 3 }] },
        { text: "上山开荒", hint: "身体 −8；田 +2 亩", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: 2 }] }
      ]
    }

  );

})(window.PACK_BASE);
