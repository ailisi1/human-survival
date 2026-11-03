/* 生在何朝 · 共同底本（五续）：市井生计
 * 行会、牙人、秤斗、印子钱、状纸、脚夫、学徒、工价。
 * 这一卷写的是「手艺人与买卖人」的一天：赚的是分文，赔的是本钱。
 * 记事体。钱数都写在 hint 里，不藏。
 * id 一律以 c5. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 入行 ══════════ */
    {
      id: "c5.hang", cat: "营生", title: "行例", age: [14, 45], weight: 16,
      text: [
        "城里百工各有行。要在这条街上摆摊，先得入行。",
        "行头说：入行钱二百文，逢年过节各有分例；入了行，价钱由行里定，客争不过；不入行，就地痞来掀你的摊子。"
      ],
      options: [
        { text: "交钱入行", hint: "银钱 −3；此后价稳", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 4 }],
          then: "行头在册上添了你的名字，说：「往后是自己人了。」" },
        { text: "不入，自己摆", hint: "银钱 +2；或被打", effects: [{ k: "silver", v: 2 }],
          gamble: { winChance: 0.55, win: [{ k: "fame", v: 1 }], lose: [{ k: "body", v: -6 }, { k: "silver", v: -2 }],
            loseNote: "来了三个人，掀了摊，踩烂了半筐货。" },
          then: "你把摊子摆在巷口，躲着行里的人。" },
        { text: "去给行头做工抵钱", hint: "身体 −5；免入行钱", effects: [{ k: "body", v: -5 }, { k: "favor", v: 2 }],
          then: "做了十天杂活，行头说：「算你入过了。」" }
      ]
    },

    {
      id: "c5.yaren", cat: "市井", title: "牙人", age: [18, 60], weight: 14,
      text: [
        "有客要买二十匹布，找不到织户；有织户织了二十匹，找不到客。中间要个人。",
        "牙人这行，靠的是一张嘴和一本册子，两头都不见面，只认你。"
      ],
      options: [
        { text: "做这一手，两头瞒价", hint: "银钱 +8；名声受损", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -4 }],
          then: "你从织户手里压了两成，卖给客时又加了一成。两边都谢你。" },
        { text: "做这一手，只取中资", hint: "银钱 +4；交游广", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 6 }],
          then: "客后来自己找上门，绕过了你，但下回还来。" },
        { text: "不做，本钱不够垫", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c5.cheng", cat: "市井", title: "秤", age: [16, 65], weight: 13,
      text: [
        "官定的秤摆在市口，一斤十六两。你手里这杆，是自己做的。",
        "一斤少半两，一年下来是几石粮。买的人看不出来，卖的人心里有数。"
      ],
      options: [
        { text: "换回足秤", hint: "银钱 −2；心里安", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }],
          then: "你把秤砣磨了磨，短的那头补上了。" },
        { text: "就这么用", hint: "银钱 +5；或有告发", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -3 }],
          gamble: { winChance: 0.75, win: [], lose: [{ k: "silver", v: -8 }, { k: "body", v: -4 }],
            loseNote: "有个老客回去自己称了，第二天带了两个人和一根扁担来。" } },
        { text: "两杆秤，看人换", hint: "银钱 +3；声望 −2", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -2 }],
          then: "生客用短的，熟客用长的。你记性得好。" }
      ]
    },

    {
      id: "c5.dian", cat: "营生", title: "典当", age: [16, 70], weight: 15,
      text: [
        "家里那件棉袄，是娘出嫁时带来的。当铺给三十文，月息三分，三个月不赎，就算死当。",
        "掌柜的不看你，只看货。"
      ],
      options: [
        { text: "当", hint: "银钱 +4；三个月内要赎", effects: [{ k: "silver", v: 4 }, { k: "debt", v: { amt: 4, rate: 0.03, dueYears: 1 } }],
          then: "票上写「棉袄一件，虫蛀」，其实没有虫蛀。" },
        { text: "当那口铁锅", hint: "银钱 +3；往后做饭难", effects: [{ k: "silver", v: 3 }, { k: "body", v: -3 }] },
        { text: "不当，去借", hint: "银钱 +5；利息更重", effects: [{ k: "silver", v: 5 }, { k: "debt", v: { amt: 6, rate: 0.08, dueYears: 1 } }] }
      ]
    },

    {
      id: "c5.yinzi", cat: "市井", title: "印子钱", age: [18, 65], weight: 14,
      text: [
        "借一千文，先扣一百，实得九百；每日还三十，还满四十日。",
        "这叫印子钱。放钱的人姓周，在本县放了二十年，没有一笔收不回来。"
      ],
      options: [
        { text: "借", hint: "银钱 +9；债滚得快", effects: [{ k: "silver", v: 9 }, { k: "debt", v: { amt: 12, rate: 0.12, dueYears: 1 } }],
          then: "周家的人每日来打一个印子。册子上空格不多了。" },
        { text: "借一半", hint: "银钱 +5；债轻些", effects: [{ k: "silver", v: 5 }, { k: "debt", v: { amt: 6, rate: 0.1, dueYears: 1 } }] },
        { text: "不借，另想办法", hint: "无得失", effects: [{ k: "luck", v: -1 }],
          then: "你把能卖的都数了一遍，还是不够。" }
      ]
    },

    {
      id: "c5.baoren", cat: "人际", title: "作保", age: [20, 65], weight: 13,
      text: [
        "同乡要借一笔钱，缺个保人。他找到你，说：「我若有失，你替我还。」",
        "保人这两个字，写在契尾，字比正文小，责任比正文大。"
      ],
      options: [
        { text: "保", hint: "交游广；或有代偿", effects: [{ k: "favor", v: 8 }],
          gamble: { winChance: 0.6, win: [{ k: "favor", v: 4 }], lose: [{ k: "silver", v: -10 }, { k: "favor", v: -8 }],
            loseNote: "他跑了。债主拿着契来找你，契尾上你的名字画了押。" } },
        { text: "不保，只借他一点", hint: "银钱 −4；不失交情", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 3 }] },
        { text: "推说不识字", hint: "交游减", effects: [{ k: "favor", v: -4 }],
          then: "他看了你一会儿，把契收起来了。往后路上遇见，只点头。" }
      ]
    },

    {
      id: "c5.zhuang", cat: "官府", title: "状纸", age: [16, 70], weight: 14,
      text: [
        "邻家占了你家三尺地，砌了墙。你去说，他说地是他祖上买的。",
        "要告，得先写状。状纸有状式，写错一个字，不受理。"
      ],
      options: [
        { text: "请讼师写", hint: "银钱 −6；或有胜", effects: [{ k: "silver", v: -6 }],
          gamble: { winChance: 0.55, win: [{ k: "favor", v: 4 }, { k: "fame", v: 2 }], lose: [{ k: "silver", v: -4 }, { k: "grudge", v: 6 }],
            loseNote: "官说「界址不明」，各打二十板，墙照旧。" } },
        { text: "自己写", hint: "银钱 −1；多半不受理", effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 2 }],
          gamble: { winChance: 0.25, win: [{ k: "favor", v: 3 }], lose: [{ k: "silver", v: -2 }],
            loseNote: "「状式不合」，掷还。" } },
        { text: "不告，把墙推了", hint: "身体 −6；结怨", effects: [{ k: "body", v: -6 }, { k: "grudge", v: 10 }, { k: "fame", v: 2 }],
          then: "你夜里推倒了三尺墙。第二天他家在墙根坐着骂了一整天。" }
      ]
    },

    {
      id: "c5.shuli", cat: "官府", title: "书吏", age: [18, 65], weight: 12,
      text: [
        "县里的书吏姓陈，管着鱼鳞册。你家的田在册上多写了一亩。",
        "他说：「改一字，纸笔钱一百。」"
      ],
      options: [
        { text: "给钱改", hint: "银钱 −3；税少", effects: [{ k: "silver", v: -3 }, { k: "fame", v: -1 }] },
        { text: "不给，就这么缴", hint: "银钱 −5；心中有气", effects: [{ k: "silver", v: -5 }, { k: "grudge", v: 4 }] },
        { text: "记住这个人", hint: "记恨", effects: [{ k: "grudge", v: 6 }, { k: "flag", v: "hate_clerk" }],
          then: "你记住了他姓陈，也记住了他左手少一指。" }
      ]
    },

    {
      id: "c5.jiaofu", cat: "营生", title: "脚夫", age: [15, 50], weight: 14,
      text: [
        "码头上卸一船米，三十个人，一天卸完，每人十八文。",
        "管事的说：「今天多卸一船，加六文。」"
      ],
      options: [
        { text: "卸两船", hint: "身体 −8；银钱 +5", effects: [{ k: "body", v: -8 }, { k: "silver", v: 5 }],
          then: "第二船卸完，天已经黑了。你挑着空担子回家，肩上是两道血印。" },
        { text: "只卸一船", hint: "银钱 +2", effects: [{ k: "silver", v: 2 }] },
        { text: "替人代卸，收他的钱", hint: "银钱 +6；身体 −10", effects: [{ k: "silver", v: 6 }, { k: "body", v: -10 }] }
      ]
    },

    {
      id: "c5.chuan", cat: "营生", title: "船户", age: [18, 60], weight: 12,
      text: [
        "你家的船跑一条水，装货、载客，一年到头在河上。",
        "这几天水涨，船家都不肯走。有客出三倍价钱，要过滩。"
      ],
      options: [
        { text: "过滩", hint: "银钱 +10；船或翻", effects: [{ k: "silver", v: 10 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -14 }, { k: "silver", v: -8 }],
            loseNote: "船在滩心横过来，货沉了一半，你抱着一块船板漂到下游。" } },
        { text: "等水落", hint: "这几日无钱", effects: [{ k: "silver", v: -2 }, { k: "luck", v: 1 }] },
        { text: "把船赁给别人跑", hint: "银钱 +5；船或有损", effects: [{ k: "silver", v: 5 }, { k: "flag", v: "boat_lent" }] }
      ]
    },

    {
      id: "c5.xuetu", cat: "营生", title: "学徒", age: [11, 20], weight: 16,
      text: [
        "铁匠铺收徒，三年为满。三年之内，吃师父的饭，不给工钱；三年之后，出师，器具自备。",
        "师父看了你的手，说：「手心不薄，能打。」"
      ],
      options: [
        { text: "拜师", hint: "身体 −6；学一门手艺", effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 8 }, { k: "flag", v: "smith" }],
          then: "头三个月只拉风箱。师父说：「风箱拉不匀，锤也打不匀。」" },
        { text: "学木作", hint: "身体 −4；学一门手艺", effects: [{ k: "body", v: -4 }, { k: "knowledge", v: 6 }, { k: "flag", v: "carpenter" }] },
        { text: "不学，去扛活", hint: "银钱 +4；无手艺", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "c5.gongjia", cat: "营生", title: "包工", age: [18, 60], weight: 13,
      text: [
        "有人要盖三间屋，包给你做，工钱十二两，料自备。",
        "算下来，用好料要十两，用次料七两。屋住三十年，还是十年，全在你手上。"
      ],
      options: [
        { text: "用好料", hint: "银钱 +2；名声好", effects: [{ k: "silver", v: 2 }, { k: "fame", v: 5 }],
          then: "梁是干的，柱是直的。房主来看，摸了摸梁，说：「厚道。」" },
        { text: "用次料", hint: "银钱 +5；或出事", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -2 }],
          gamble: { winChance: 0.7, win: [], lose: [{ k: "silver", v: -12 }, { k: "fame", v: -8 }, { k: "body", v: -5 }],
            loseNote: "第二年夏天，西间塌了半面墙，压死一头牛。" } },
        { text: "包给别人，自己抽头", hint: "银钱 +3；不担风险", effects: [{ k: "silver", v: 3 }, { k: "favor", v: -2 }] }
      ]
    },

    {
      id: "c5.xu", cat: "市井", title: "趁墟", age: [12, 70], weight: 13,
      text: [
        "逢三六九是墟日。四乡的人都来，卖鸡的、卖布的、卖药的、算命的，一条街挤得走不动。",
        "你带了一担菜，天没亮就占了地方。"
      ],
      options: [
        { text: "早点卖完回家", hint: "银钱 +3", effects: [{ k: "silver", v: 3 }, { k: "body", v: -2 }] },
        { text: "守到最后，贱价清了", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] },
        { text: "不卖，换盐和针线", hint: "银钱 −1；家里够用", effects: [{ k: "silver", v: -1 }, { k: "grain", v: 2 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "c5.mijia", cat: "市井", title: "米价", age: [16, 70], weight: 14,
      text: [
        "米一斗四十文，比上月贵了八文。卖米的说，秋后再看。",
        "你家里有五口人，一斗吃三天。"
      ],
      options: [
        { text: "先买两石囤着", hint: "银钱 −14；粮足", effects: [{ k: "silver", v: -14 }, { k: "grain", v: 20 }],
          then: "两石米堆在灶边。夜里你起来看了两回。" },
        { text: "少买，吃稀的", hint: "银钱 −5；身体 −3", effects: [{ k: "silver", v: -5 }, { k: "body", v: -3 }, { k: "grain", v: 6 }] },
        { text: "买糠掺着吃", hint: "银钱 −2；身体 −6", effects: [{ k: "silver", v: -2 }, { k: "body", v: -6 }, { k: "grain", v: 4 }] }
      ]
    },

    {
      id: "c5.tun", cat: "市井", title: "囤", age: [20, 65], weight: 12,
      text: [
        "北边打仗，粮道断了。县里的米一天一个价。",
        "有人劝你：把家里的粮封起来，等涨到八十文再卖。"
      ],
      options: [
        { text: "封起来等", hint: "银钱 +10；乡里怨", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -6 }, { k: "grudge", v: 5 }],
          then: "你家的门关了半个月。门外有人拍过，你没应。" },
        { text: "照原价卖一半", hint: "银钱 +4；乡里称善", effects: [{ k: "silver", v: 4 }, { k: "fame", v: 6 }, { k: "favor", v: 4 }] },
        { text: "全卖给官府", hint: "银钱 +6；得一句褒奖", effects: [{ k: "silver", v: 6 }, { k: "official", v: 3 }] }
      ]
    },

    {
      id: "c5.jia", cat: "市井", title: "假", age: [18, 65], weight: 12,
      text: [
        "有人送一批药材来，价钱只有市价一半。说是从南边直接来的。",
        "你捏了一片，闻了闻：色对，味淡。"
      ],
      options: [
        { text: "不接", hint: "无得失", effects: [{ k: "fame", v: 2 }] },
        { text: "接，掺着卖", hint: "银钱 +8；或有祸", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -3 }],
          gamble: { winChance: 0.65, win: [], lose: [{ k: "silver", v: -10 }, { k: "body", v: -4 }],
            loseNote: "有人吃了你的药，上吐下泻，抬到你家门口。" } },
        { text: "接，全烧了", hint: "银钱 −4；心里安", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 4 }],
          then: "一炉火烧了半夜，满巷都是苦味。" }
      ]
    },

    {
      id: "c5.changgong", cat: "营生", title: "长工", age: [14, 55], weight: 15,
      text: [
        "大户人家雇长工，一年工钱八两，管饭，住柴房。",
        "管事说：「做得好，年底另有赏；偷懒的，冬至就结账走人。」"
      ],
      options: [
        { text: "去做长工", hint: "银钱 +8；一年不自由", effects: [{ k: "silver", v: 8 }, { k: "body", v: -6 }],
          then: "天不亮起，天黑收工。一年里你只回过两次家。" },
        { text: "做短工，按日算", hint: "银钱 +5；闲时无钱", effects: [{ k: "silver", v: 5 }, { k: "body", v: -3 }] },
        { text: "租他家的田种", hint: "银钱 −2；粮多", effects: [{ k: "silver", v: -2 }, { k: "grain", v: 14 }, { k: "field_dry", v: 2 }] }
      ]
    },

    {
      id: "c5.lin", cat: "生计", title: "赁房", age: [16, 60], weight: 11,
      text: [
        "你要进城做事，得赁一间屋。房东要押一个月房租，另收「茶钱」。",
        "屋在巷子深处，一间半，月租一百二十文。"
      ],
      options: [
        { text: "赁下", hint: "银钱 −5；有个落脚处", effects: [{ k: "silver", v: -5 }, { k: "favor", v: 2 }] },
        { text: "与人合赁", hint: "银钱 −2；多有口角", effects: [{ k: "silver", v: -2 }, { k: "favor", v: -2 }] },
        { text: "住到城外破庙", hint: "银钱 0；身体 −4", effects: [{ k: "body", v: -4 }, { k: "luck", v: -1 }] }
      ]
    },

    {
      id: "c5.yi", cat: "市井", title: "卖艺", age: [12, 50], weight: 10,
      text: [
        "庙会上有人耍刀、吞火、走绳。一圈人围着，看完了有钱的扔两文，没钱的走开。",
        "班主说：「你身子软，学得会。学会了，一天挣的钱比扛活多。」"
      ],
      options: [
        { text: "学", hint: "身体 −8；银钱 +6", effects: [{ k: "body", v: -8 }, { k: "silver", v: 6 }, { k: "martial", v: 6 }],
          then: "头一个月，你天天摔。班主说：「摔够三百跤就会了。」" },
        { text: "只帮着收钱", hint: "银钱 +2", effects: [{ k: "silver", v: 2 }, { k: "favor", v: 2 }] },
        { text: "看一场就走", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c5.shuoshu", cat: "文事", title: "说书", age: [16, 70], weight: 10,
      text: [
        "茶肆里请人说书，一晚三十文。说的是前朝旧事，说到紧要处就停，等人给钱。",
        "掌柜的问你会不会。"
      ],
      options: [
        { text: "会，说三天", hint: "银钱 +4；交游广", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 5 }, { k: "knowledge", v: 3 }] },
        { text: "不会，去听", hint: "银钱 −1；长见识", effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 4 }] },
        { text: "把听来的改成自己的", hint: "银钱 +5；或有识者", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -1 }] }
      ]
    },

    {
      id: "c5.suanming", cat: "方外", title: "算命", age: [14, 70], weight: 10,
      text: [
        "街口有个瞎子，摆一张桌，一副卦。他说得准，说得人心里发凉。",
        "你路过，他忽然抬头：「这位相公，你今年有一道坎。」"
      ],
      options: [
        { text: "给钱问一卦", hint: "银钱 −2；心里有底", effects: [{ k: "silver", v: -2 }, { k: "luck", v: 2 }],
          then: "他说：「坎在秋后，过得去。」不肯多说。" },
        { text: "不听，走开", hint: "无得失", effects: [{ k: "luck", v: -1 }] },
        { text: "坐下来学他那一套", hint: "银钱 +3；学些门道", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: 3 }, { k: "flag", v: "diviner" }] }
      ]
    },

    {
      id: "c5.langzhong", cat: "身体", title: "郎中", age: [10, 75], weight: 14,
      text: [
        "家里有人病了三日，热不退。城里有三个郎中：一个要价高，一个要价低，一个是走方的。",
        "要价高的那个，据说给县太爷的夫人看过。"
      ],
      options: [
        { text: "请贵的", hint: "银钱 −10；或有救", effects: [{ k: "silver", v: -10 }],
          gamble: { winChance: 0.8, win: [{ k: "body", v: 4 }], lose: [{ k: "body", v: -6 }],
            loseNote: "他诊了脉，开了方，说：「看今夜。」" } },
        { text: "请走方的", hint: "银钱 −3；或有救", effects: [{ k: "silver", v: -3 }],
          gamble: { winChance: 0.55, win: [{ k: "body", v: 4 }], lose: [{ k: "body", v: -8 }],
            loseNote: "他留下三包药末，说：「汗出即愈。」汗没出。" } },
        { text: "不请，去庙里求", hint: "银钱 −1；听天由命", effects: [{ k: "silver", v: -1 }],
          gamble: { winChance: 0.5, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -10 }],
            loseNote: "香烧完了，人也没了。" } }
      ]
    },

    {
      id: "c5.siyan", cat: "市井", title: "私盐", age: [18, 55], weight: 11,
      text: [
        "官盐一斤三十文，私盐一斤十二文。贩私盐的挑着担子走小路，一担能赚三百文。",
        "被抓到，枷三个月，盐没官。"
      ],
      options: [
        { text: "贩一趟", hint: "银钱 +9；或有枷", effects: [{ k: "silver", v: 9 }],
          gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -10 }, { k: "fame", v: -4 }],
            loseNote: "在关津被拦下。枷了三个月，出来时脖子上磨掉一层皮。" } },
        { text: "只买私盐自家吃", hint: "银钱 +3；小利", effects: [{ k: "silver", v: 3 }] },
        { text: "去告发", hint: "银钱 +2；结怨", effects: [{ k: "silver", v: 2 }, { k: "grudge", v: 8 }, { k: "official", v: 2 }] }
      ]
    },

    {
      id: "c5.du", cat: "市井", title: "赌", age: [16, 60], weight: 12,
      text: [
        "巷尾有人摆摊赌大小，一注三文，赢了翻倍。",
        "你看了半个时辰，觉得看得出门道。"
      ],
      options: [
        { text: "押一注", hint: "银钱 ±5", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 5 }], lose: [{ k: "silver", v: -5 }],
            loseNote: "开了小。你把最后三文按在桌上，没敢再押。" } },
        { text: "押大的", hint: "银钱 ±10", effects: [],
          gamble: { winChance: 0.4, win: [{ k: "silver", v: 10 }], lose: [{ k: "silver", v: -10 }, { k: "grudge", v: 4 }],
            loseNote: "输了。庄家笑着把铜钱扫过去，说：「下回带够钱来。」" } },
        { text: "不赌，走", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c5.shiyi", cat: "市井", title: "拾遗", age: [8, 70], weight: 9,
      text: [
        "路上有个布包，打开是一只银镯，还有一张写着字的纸。",
        "四周没有人。"
      ],
      options: [
        { text: "站在原地等", hint: "或有谢礼", effects: [{ k: "body", v: -2 }],
          gamble: { winChance: 0.5, win: [{ k: "silver", v: 4 }, { k: "fame", v: 3 }], lose: [{ k: "luck", v: -1 }],
            loseNote: "等到天黑，没有人来。你把包交给了里正。" } },
        { text: "拿回家", hint: "银钱 +5；心里不安", effects: [{ k: "silver", v: 5 }, { k: "luck", v: -2 }],
          then: "镯子藏在米缸底下。你有一阵子不敢从那条路走。" },
        { text: "交给里正", hint: "名声好", effects: [{ k: "fame", v: 3 }, { k: "official", v: 1 }] }
      ]
    },

    {
      id: "c5.huoshi", cat: "市井", title: "火", age: [10, 70], weight: 10,
      text: [
        "半夜有人敲锣：「走水了！」",
        "火从街东头起，顺着风往西烧。你家在西头。"
      ],
      options: [
        { text: "先抢东西出来", hint: "银钱 −4；身体 −5", effects: [{ k: "silver", v: -4 }, { k: "body", v: -5 }],
          then: "你抱出两口箱子和一袋米，回来时屋顶已经塌了。" },
        { text: "去帮着拆屋断火路", hint: "身体 −8；乡里记恩", effects: [{ k: "body", v: -8 }, { k: "fame", v: 7 }, { k: "favor", v: 5 }] },
        { text: "带着家人往外跑", hint: "保住人；家当或尽", effects: [{ k: "luck", v: 1 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -12 }, { k: "grain", v: -10 }],
            loseNote: "火没烧到你家，但隔壁塌了，压坏了半面墙和一仓谷。" } }
      ]
    },

    {
      id: "c5.tonghang", cat: "人际", title: "同行", age: [18, 65], weight: 11,
      text: [
        "这条街上原来只有你一家磨坊，如今对门开了一家新的，价钱比你低两文。",
        "新开的那家，是县衙某位书吏的亲戚。"
      ],
      options: [
        { text: "跟着降价", hint: "银钱 −4；保住客", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 3 }] },
        { text: "不降，做细的", hint: "银钱 +2；客少些", effects: [{ k: "silver", v: 2 }, { k: "fame", v: 3 }],
          then: "你把面筛了三遍。老客说：「你家面白。」" },
        { text: "找人去捣他的磨", hint: "身体 −4；结怨深", effects: [{ k: "grudge", v: 12 }, { k: "fame", v: -5 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "c5.qianfa", cat: "市井", title: "钱色", age: [16, 70], weight: 10,
      text: [
        "市上用的铜钱，有新有旧。旧钱薄，一吊掺三成私铸的，称起来轻二两。",
        "收钱的人拿戥子称，称完摇头。"
      ],
      options: [
        { text: "只收足钱", hint: "银钱 −2；不吃亏", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }] },
        { text: "收下，转手花出去", hint: "银钱 +3；或被人识破", effects: [{ k: "silver", v: 3 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }],
            loseNote: "下家称了称，把钱摔回你面前。" } },
        { text: "自己熔了铸", hint: "银钱 +6；犯法", effects: [{ k: "silver", v: 6 }, { k: "flag", v: "coin_smuggle" }],
          gamble: { winChance: 0.7, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -8 }],
            loseNote: "炉子被人告了。官差来时，铜还在锅里。" } }
      ]
    },

    {
      id: "c5.qianzhang", cat: "生计", title: "欠账", age: [18, 70], weight: 12,
      text: [
        "年头欠下的账，到年尾该还了。债主上门，坐在门槛上不走。",
        "他说：「不还钱，就搬东西。」"
      ],
      options: [
        { text: "把粮折了还", hint: "粮 −14；债清", effects: [{ k: "grain", v: -14 }, { k: "silver", v: 6 }] },
        { text: "求宽到明年", hint: "利上加利", effects: [{ k: "debt", v: { amt: 8, rate: 0.1, dueYears: 1 } }, { k: "favor", v: -3 }] },
        { text: "让他搬", hint: "银钱 −6；家当少", effects: [{ k: "silver", v: -6 }, { k: "fame", v: -3 }],
          then: "他搬走了两口箱子、一张桌子、三只鸡。屋里空了一块。" }
      ]
    },

    {
      id: "c5.hegu", cat: "营生", title: "合股", age: [20, 65], weight: 10,
      text: [
        "有人邀你合股开一间铺子：他出本钱，你出手艺和人面，利对半分。",
        "契上写：「盈亏共之，退股须满三年。」"
      ],
      options: [
        { text: "合", hint: "银钱 +6；三年绑住", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 4 }, { k: "flag", v: "partner" }],
          then: "铺子开在十字街。头一个月，光是招牌就换了三回。" },
        { text: "只做工，不占股", hint: "银钱 +3；自由", effects: [{ k: "silver", v: 3 }] },
        { text: "不合", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c5.lao", cat: "身体", title: "老手", age: [40, 70], weight: 10, once: true,
      text: [
        "这些年做下来，手指头粗了，指节变了形，阴天就疼。",
        "徒弟说：「师父，这活让我来。」他做得快，但收口不齐。"
      ],
      options: [
        { text: "交给他，自己在旁看", hint: "身体 +3；名声或损", effects: [{ k: "body", v: 3 }],
          gamble: { winChance: 0.6, win: [{ k: "favor", v: 3 }], lose: [{ k: "fame", v: -4 }, { k: "silver", v: -4 }],
            loseNote: "一批货收口开裂，客退了回来。你把钱退了，没说是谁做的。" } },
        { text: "自己做到底", hint: "身体 −5；货好", effects: [{ k: "body", v: -5 }, { k: "fame", v: 4 }] },
        { text: "收手，把铺子盘出去", hint: "银钱 +8；此后无进项", effects: [{ k: "silver", v: 8 }],
          then: "盘铺那天，你把用了二十年的家伙什一件件擦干净，交给了下家。" }
      ]
    }

  );

})(window.PACK_BASE);
