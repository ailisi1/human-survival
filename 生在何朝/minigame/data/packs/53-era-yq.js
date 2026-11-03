/* 生在何朝 · 各朝专有事件 卷四：元、清
 * 明自有事件已有一百四十余条（data/ming.sample.js），不再重写。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = [

    {
      id: "y2.sideng", cat: "官府", title: "四等", age: [10, 65], weight: 22,
      text: [
        "本朝分四等：蒙古、色目、汉人、南人。汉人谓契丹、女真、高丽及北方汉人，南人谓宋之遗民。",
        "做官、科举、刑罚，各有差等。"
      ],
      options: [
        { text: "忍下，做好自家的事", hint: "声望 +4；身体 +2", effects: [{ k: "fame", v: 4 }, { k: "body", v: 2 }], then: "你不去争。你在本行里做事。日子过得下去，只是抬头看不见路。" },
        { text: "花钱改籍，冒作汉人", need: { minSilver: 24 }, hint: "银钱 −24；官职 +12", effects: [{ k: "silver", v: -24 }, { k: "official", v: 12 }], then: "你把籍改了，从南人改作汉人。改籍之后，你果然能考了。族里的人不再提这件事。" },
        { text: "教书，教南人的孩子", hint: "学识 +10；声望 +10", effects: [{ k: "knowledge", v: 10 }, { k: "fame", v: 10 }], then: "你开了个塾。学生都是南人。你教他们读经，也教他们不要抬头看天。" }
      ]
    },
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
      id: "y2.keju", cat: "官府", title: "复科", era: "yuan", years: [1313, 1360], age: [18, 50], weight: 18, once: true, when: { minKnowledge: 40 },
      text: [
        "本朝初废科举。延祐二年始复行，分左右榜：蒙古、色目为右榜，汉人、南人为左榜。",
        "两榜题目不同，取额也不同。"
      ],
      options: [
        { text: "应举左榜", hint: "学识 +12", effects: [{ k: "knowledge", v: 12 }], then: "你进了左榜的考场。题目是《四书》义一道，经义一道。你写了三千字。", gamble: { winChance: 0.28, win: [{ k: "official", v: 24 }, { k: "fame", v: 18 }], lose: [{ k: "fame", v: -4 }], winNote: "你中了。左榜取额少，中了的人，乡里要立牌坊。", loseNote: "没有中。左榜三年一次，你等了三年。" } },
        { text: "不应举，做吏", hint: "官职 +12；银钱 +8", effects: [{ k: "official", v: 12 }, { k: "silver", v: 8 }], then: "你做了吏。本朝的官多由吏升，科举那条路，走的人少。" },
        { text: "去书院讲学", hint: "学识 +14；声望 +10", effects: [{ k: "knowledge", v: 14 }, { k: "fame", v: 10 }], then: "你在书院讲学。学生问你为什么不考，你说：左榜三年一次，我考了两次。" }
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
      id: "y2.haicao", cat: "官府", title: "海漕", age: [18, 55], weight: 14,
      text: [
        "伯颜用朱清、张瑄之议，开海运：自刘家港入海，经黑水洋，至直沽。",
        "岁运粮三百万石。船户、水手，皆沿海之民。"
      ],
      options: [
        { text: "做船户，运漕粮", hint: "银钱 +16；身体 −8", effects: [{ k: "silver", v: 16 }, { k: "body", v: -8 }], then: "你跑了两趟。海上风大，船在浪里像一片叶子。", gamble: { deathChance: 0.12, cause: "覆舟" } },
        { text: "在直沽接粮", hint: "银钱 +12；人脉 +10", effects: [{ k: "silver", v: 12 }, { k: "favor", v: 10 }], then: "你在直沽接粮、入仓、转运。漕船到的时候，你三天三夜没睡。" },
        { text: "不做海运，走内河", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }], then: "你走内河。慢，但不怕风。运河上的闸，一年比一年难等。" }
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
      id: "y2.linan", cat: "世变", title: "临安", era: "yuan", years: [1276, 1279], age: [12, 70], weight: 30, once: true,
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
      id: "y2.zhengri", cat: "世变", title: "征日", era: "yuan", years: [1274, 1281], age: [16, 55], weight: 16,
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
  ];

  /* ══════════ 清 ══════════ */
  B.eraEvents.qing = [

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
      id: "qi2.yangwu", cat: "世变", title: "洋务", era: "qing", years: [1861, 1894], age: [16, 65], weight: 22, once: true,
      text: [
        "设总理各国事务衙门，办江南制造局、福州船政局、轮船招商局。",
        "洋人的机器，买来，拆开，照着做。"
      ],
      options: [
        { text: "入局做工匠", hint: "银钱 +14；学识 +10", effects: [{ k: "silver", v: 14 }, { k: "knowledge", v: 10 }], then: "你进了制造局。先学着看图纸，后来学着画。图纸上的字是洋文，你认了三年。" },
        { text: "出洋留学", need: { minSilver: 30 }, hint: "银钱 −30；学识 +18", effects: [{ k: "silver", v: -30 }, { k: "knowledge", v: 18 }], then: "你上了船，去了一个叫波士顿的地方。那里的房子有十层高，街上没有轿子。" },
        { text: "反对洋务，言其坏人心术", hint: "声望 +10；官职 −8", effects: [{ k: "fame", v: 10 }, { k: "official", v: -8 }], then: "你上了折子，说洋器不可学。折子留中。二十年后，你坐上了洋人的轮船。" }
      ]
    },
    {
      id: "qi2.wuxu", cat: "世变", title: "戊戌", era: "qing", years: [1898, 1899], age: [14, 70], weight: 26, once: true,
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
      id: "qi2.feikeju", cat: "官府", title: "废科举", era: "qing", years: [1905, 1911], age: [12, 60], weight: 20, once: true,
      text: [
        "诏停科举，自丙午科始，所有乡会试、岁科考一律停止。",
        "一千三百年之制，一朝而废。"
      ],
      options: [
        { text: "去上新学堂", hint: "学识 +14；银钱 −10", effects: [{ k: "knowledge", v: 14 }, { k: "silver", v: -10 }], then: "你进了新学堂。学的是算学、地理、格致。先生中有一个是日本人。" },
        { text: "在家，把八股文章烧了", hint: "学识 −6；声望 +4", effects: [{ k: "knowledge", v: -6 }, { k: "fame", v: 4 }], then: "你把三十年的窗课都烧了。烧了半夜。烧完，你在院子里坐着，坐到天亮。" },
        { text: "去省城考学堂，再求出路", hint: "官职 +10；学识 +8", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 8 }], then: "你考进了省城的师范学堂。毕业之后，你做了一名小学堂的教习。" }
      ]
    },
    {
      id: "qi2.juanna", cat: "官府", title: "捐纳", age: [24, 65], weight: 14,
      text: [
        "捐纳之例：输银于官，得官、得衔、得封典。知县一缺，价有定。",
        "本朝捐例，屡开屡停。"
      ],
      options: [
        { text: "捐一个知县", need: { minSilver: 50 }, hint: "银钱 −50；官职 +22", effects: [{ k: "silver", v: -50 }, { k: "official", v: 22 }], then: "你捐了个知县。到省之后，在省城等了十四个月，才补到缺。" },
        { text: "捐一个虚衔，图个体面", need: { minSilver: 16 }, hint: "银钱 −16；声望 +10", effects: [{ k: "silver", v: -16 }, { k: "fame", v: 10 }], then: "你捐了个五品衔。出门可以戴顶戴，见官可以不跪。" },
        { text: "不捐，说要靠本事", hint: "声望 +8；官职 −4", effects: [{ k: "fame", v: 8 }, { k: "official", v: -4 }], then: "你没有捐。你说：官可以捐，本事捐不来。这话在酒桌上被人笑了一回。" }
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
  ];

})(window.PACK_BASE);
