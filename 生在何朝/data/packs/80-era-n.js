/* 生在何朝 · 各朝专有事件 卷十四：北宋、金、南宋
 * 这三朝的经济最细：有交子、有钞法、有市舶、有学田。
 * 钱越轻，日子越难算——所以这一卷写的是「钱怎么变不值」这件事，
 * 落在具体的人手上，就是一石米多少钱、一年的租要不要提前缴。
 * 前缀 b8. / j8. / n8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = (B.eraEvents.bsong || []).concat([

    {
      id: "b8.zhitian", cat: "官府", title: "职田", age: [20, 60], weight: 13,
      years: [1000, 1127],
      text: [
        "{{职田|宋代按官品给吏禄之田，召佃收租}}。新知县到任，带来三十顷职田。",
        "你佃的那块地，正好在里头。",
        "县衙的人说：「租从五成加到七成。」"
      ],
      options: [
        { text: "认了", hint: "粮 −10", effects: [{ k: "grain", v: -10 }], then: "你缴了七成。新知县上任三个月，家里办了两场喜事。" },
        { text: "退佃，另找地", hint: "身体 −5；银钱 −2", effects: [{ k: "body", v: -5 }, { k: "silver", v: -2 }], then: "你把地退了。找了两个月，才在十里外租到六亩。" },
        { text: "去府里告", hint: "声望 +4；或有祸", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.25, win: [], lose: [{ k: "body", v: -8 }, { k: "grain", v: -6 }], loseNote: "府里说「佃户抗租」。你被打了十板，租照缴。" }, then: "你写了状子，递到府里。府里收了，说：「问一问。」" }
      ]
    },
    {
      id: "b8.jiaozi", cat: "市井", title: "交子", age: [18, 65], weight: 15,
      years: [1023, 1127],
      text: [
        "{{交子|北宋四川始行的纸币，后由官办交子务发行}}。一贯交子，作一贯钱用。",
        "今年又添印了。米价从一斗三十文涨到四十。",
        "你手里有十五贯交子，是卖了布得的。"
      ],
      options: [
        { text: "换成铜钱", hint: "银钱 −1；保值", effects: [{ k: "silver", v: -1 }, { k: "grain", v: 3 }], then: "你去交子务换钱，排了三天队。换出来的钱，装了两个钱袋。" },
        { text: "买粮囤着", hint: "粮 +12", effects: [{ k: "grain", v: 12 }], then: "你买了十二石米，堆在堂屋。米价后来又涨了。" },
        { text: "留着，等它更值钱", hint: "或有折", effects: [], gamble: { winChance: 0.3, win: [{ k: "silver", v: 3 }], lose: [{ k: "silver", v: -8 }], loseNote: "两年后交子折阅，一贯只作七百文。" }, then: "你把交子收在木匣里，埋在床下。" }
      ]
    },
    {
      id: "b8.hemao", cat: "赋役", title: "和买", age: [20, 60], weight: 15,
      years: [1050, 1127],
      text: [
        "{{和买|官府按户等摊派购买绢帛，后不给钱，成为变相赋税}}。今年摊到你家：绢十匹。",
        "官价一匹五百文，市价一匹一贯二百。",
        "里正说：「名义上是买，钱先欠着。」"
      ],
      options: [
        { text: "缴绢", hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "你缴了十匹。钱说日后给，此后再没人提。" },
        { text: "买绢来缴，自家的留着", hint: "银钱 −10；绢在手", effects: [{ k: "silver", v: -10 }], then: "你去镇上买了十匹次的。验绢的人看了看，说：「下等。」" },
        { text: "拖着", hint: "或有催", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -10 }], loseNote: "里正带人来催。你家织机被搬走了一台，抵了绢。" }, then: "你说绢还没下机。里正说：「上头的日子是月底。」" }
      ]
    },
    {
      id: "b8.chayin", cat: "营生", title: "茶引", age: [20, 60], weight: 13,
      years: [1050, 1127],
      text: [
        "{{榷茶|宋代茶由官榷，商人纳钱请引，凭引贩运}}。一张引，可贩茶一百斤。",
        "引价三贯。茶从山里买，一斤二十文。",
        "卖到北边，一斤八十文。"
      ],
      options: [
        { text: "请引贩茶", need: { minSilver: 4 }, hint: "银钱 −3；或有获", effects: [{ k: "silver", v: -3 }], gamble: { winChance: 0.6, win: [{ k: "silver", v: 8 }], lose: [{ k: "silver", v: -6 }], loseNote: "路上被查，说引与茶数不符。茶没官，罚了钱。" }, then: "你请了一张引，买了八十斤茶，雇了一头驴。" },
        { text: "贩私茶", hint: "银钱 +6；或有死", effects: [{ k: "silver", v: 6 }], gamble: { deathChance: 0.1, cause: "茶法" }, then: "你没请引，把茶装在柴车里。过了两道卡，都没查。" },
        { text: "给茶商背茶", hint: "身体 −6；银钱 +2", effects: [{ k: "body", v: -6 }, { k: "silver", v: 2 }], then: "你背了两个月茶，一天三十里。肩膀上的皮换了三层。" }
      ]
    },
    {
      id: "b8.shuyuan", cat: "学问", title: "书院", age: [10, 25], weight: 13,
      years: [1020, 1127],
      text: [
        "县里新修了一所书院，有学田三百亩。",
        "入院要考试，取三十人。束脩免，管饭。",
        "你父亲说：「去了，家里少一个劳力。」"
      ],
      options: [
        { text: "去考", hint: "学识 +5；家中少力", effects: [{ k: "knowledge", v: 5 }, { k: "favor", v: -3 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "fame", v: -2 }], loseNote: "没取上。三十个名额，来考的两百多。" }, then: "你考了三场。放榜那天，你的名字在第十九。" },
        { text: "不去，在家种田", hint: "身体 −2；粮 +4", effects: [{ k: "body", v: -2 }, { k: "grain", v: 4 }], then: "你没去。那年秋天，家里的收成比往年多了两石。" },
        { text: "白天种田，夜里去听讲", hint: "身体 −6；学识 +4", effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 4 }], then: "你白天种田，夜里走五里路去听课。听了两年，先生让你免费住进书院。" }
      ]
    },
    {
      id: "b8.wanghuo", cat: "乡里", title: "火禁", age: [18, 60], weight: 12,
      years: [1050, 1127],
      text: [
        "京城有{{望火楼|宋代消防设施，楼上有人瞭望，见火则报}}，每坊有军巡铺。",
        "我们这县城没有。",
        "入夜，更夫敲梆子喊：「小心火烛。」"
      ],
      options: [
        { text: "自己备水缸、麻搭", hint: "银钱 −2；或有救", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }], then: "你在院里放了两口缸，备了麻搭、斧头。三年后邻家起火，你用上了。" },
        { text: "跟着邻里凑钱设水铺", hint: "银钱 −3；声望 +6", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 6 }], then: "十二家凑了钱，买了水桶、梯子，雇了一个人夜里巡。" },
        { text: "不管", hint: "无得无失", effects: [], then: "你没管。那年冬天，南街烧了七间屋。" }
      ]
    },
    {
      id: "b8.zongzi", cat: "家族", title: "宗子", age: [14, 40], weight: 11,
      years: [1050, 1127],
      text: [
        "{{宗室|宋代皇族另立玉牒，给禄不任事}}。你家的远房，是太祖一系的五世孙。",
        "按例可请一名宗子恩泽，入宗学，给禄。",
        "族里说：「这个名分，给谁？」"
      ],
      options: [
        { text: "去争这个名分", hint: "声望 +4；或有物议", effects: [{ k: "fame", v: 4 }, { k: "silver", v: 4 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "fame", v: -6 }], loseNote: "玉牒所查了谱系，说你家这一支「失叙」。名分给了别人。" }, then: "你带着族谱去了宗正寺。谱上有你曾祖的名字，墨迹很淡。" },
        { text: "让给堂兄", hint: "声望 +6；favor +6", effects: [{ k: "fame", v: 6 }, { k: "favor", v: 6 }], then: "你让了。堂兄进了宗学，每月领禄米两石。他每年给你送一石。" },
        { text: "不去管这些", hint: "无得无失", effects: [], then: "你没去。族里争了半年，最后名分落在了一个从没见过面的族人手里。" }
      ]
    },
    {
      id: "b8.gongshi", cat: "官府", title: "公使钱", age: [25, 60], weight: 11, when: { minOfficial: 20 },
      years: [1000, 1127],
      text: [
        "{{公使钱|宋代给地方官的公用经费，用于宴请、馈赠、交通}}。你这一任，一年八百贯。",
        "州里的通判说：「这笔钱，账上要平。」",
        "前任是把一半用来迎送，一半入了私囊。"
      ],
      options: [
        { text: "照前任的规矩", hint: "银钱 +20；声望 −6", effects: [{ k: "silver", v: 20 }, { k: "fame", v: -6 }], then: "你照做了。年底账做得平，通判画了押。" },
        { text: "全用在公事上", hint: "银钱 −4；声望 +8", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 8 }], then: "你把钱用在修桥、赈饥、迎送。年底账上剩了三十贯，你交回州里。" },
        { text: "一半公用，一半留着应急", hint: "银钱 +8；声望 +2", effects: [{ k: "silver", v: 8 }, { k: "fame", v: 2 }], then: "你留了一半，记在一本私账上。那一年县里发水，你从这笔钱里出了二百贯。" }
      ]
    },
    {
      id: "b8.baozheng", cat: "赋役", title: "保正", age: [25, 60], weight: 13,
      years: [1070, 1127],
      text: [
        "{{保正|宋代保甲之长，催税、捕盗、应差，多由中户充任}}。轮到你做的这一年，村里欠税的还有十一户。",
        "欠的税，保正要垫。",
        "上一任保正，垫了三十贯，卖了两亩田。"
      ],
      options: [
        { text: "做，挨户去催", hint: "身体 −6；银钱 −4", effects: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -10 }], loseNote: "年底还有四户没缴。你垫了十贯。" }, then: "你跑了十一户。有七户缴了，四户说等秋后。" },
        { text: "花钱辞了", need: { minSilver: 5 }, hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "你花了五贯，让里正把名字换成了别人。" },
        { text: "做，但把欠户报上去", hint: "声望 −5；免垫", effects: [{ k: "fame", v: -5 }], then: "你把十一户的名字报给了县里。县里派了差役来，牵走了两头牛。" }
      ]
    },
    {
      id: "b8.yaren", cat: "市井", title: "牙人", age: [18, 60], weight: 12,
      years: [1000, 1127],
      text: [
        "{{牙人|宋代居间买卖的中间人，须领官帖}}。领一张帖，要五贯。",
        "做了牙人，买卖两头都抽一分。",
        "镇上有三个牙人，都是父子相传。"
      ],
      options: [
        { text: "领帖做牙人", need: { minSilver: 6 }, hint: "银钱 −5；营生", effects: [{ k: "silver", v: -5 }, { k: "knowledge", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -4 }], loseNote: "镇上的人不认生面孔。半年没做成几笔。" }, then: "你领了帖。头一笔是替人卖一头牛，抽了二百文。" },
        { text: "不领帖，私下帮人说合", hint: "银钱 +3；或有查", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -5 }, { k: "body", v: -4 }], loseNote: "私牙被查，罚了钱，还挨了板子。" }, then: "你私下替人讲价，抽五十文一次。做得小心。" },
        { text: "不做，老实种田", hint: "无得无失", effects: [], then: "你没做。镇上的牙人一年能挣二十贯。" }
      ]
    }
  ]);

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = (B.eraEvents.jin || []).concat([

    {
      id: "j8.wuli", cat: "赋役", title: "物力钱", age: [20, 60], weight: 15,
      years: [1160, 1234],
      text: [
        "{{物力钱|金代按民户物力（田、宅、畜、树）征钱，通检推排后定额}}。今年重定，你家定为中上等。",
        "一年的物力钱，八贯。",
        "你家只有十六亩田、一头牛。"
      ],
      options: [
        { text: "照缴", hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "你缴了八贯。缴完，家里只剩两贯过年。" },
        { text: "请重新推排", hint: "身体 −4；或有减", effects: [{ k: "body", v: -4 }], gamble: { winChance: 0.4, win: [{ k: "silver", v: 4 }], lose: [{ k: "silver", v: -4 }], loseNote: "推排官看了一遍，说「照旧」，还收了你二百文的手续。" }, then: "你递了状子。推排官来了，看了看牛，看了看屋，量了地。" },
        { text: "把牛卖了降等", hint: "银钱 +4；田 −2", effects: [{ k: "silver", v: 4 }, { k: "field_wet", v: -2 }], then: "你把牛卖了四贯。第二年推排，降了一等，物力钱少了三贯。" }
      ]
    },
    {
      id: "j8.qiaohu", cat: "家族", title: "驱口", age: [16, 60], weight: 14,
      years: [1120, 1234],
      text: [
        "{{驱口|金元时被俘或买来的人口，属主人所有，可买卖}}。城西的完颜家，有驱口二百。",
        "他家来买人。一个成年男子，二十贯。",
        "你家欠着债。"
      ],
      options: [
        { text: "卖了自家一个远房侄子", hint: "银钱 +8；声望 −10", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -10 }], then: "侄子十六岁。他被领走那天，回头看了你一眼，什么也没说。" },
        { text: "自己去", hint: "银钱 +6；身不由己", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -6 }], setFlag: ["qukou"], then: "你把自己卖了。完颜家给了二十贯，你留了十贯给家里。" },
        { text: "把田卖了还债", hint: "田 −8；银钱 +6", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: 6 }], then: "你卖了八亩田。债还了，地少了，人还在。" }
      ]
    },
    {
      id: "j8.chao", cat: "市井", title: "交钞", age: [18, 65], weight: 15,
      years: [1200, 1234],
      text: [
        "{{交钞|金代纸币，屡屡滥发，末年几成废纸}}。一贯钞，作一贯钱。",
        "今年印了新的，旧的作废，限一个月内换。",
        "一万文的钞，换新钞一千文。"
      ],
      options: [
        { text: "赶紧去换", hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "你排了四天队。换完，十年的积蓄剩了一成。" },
        { text: "换成实物", hint: "粮 +10；银钱 −2", effects: [{ k: "grain", v: 10 }, { k: "silver", v: -2 }], then: "你把钞全买了粮和布。粮价当时已经涨了五倍。" },
        { text: "不换，留着", hint: "或有尽失", effects: [], gamble: { winChance: 0.2, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "限期过了，旧钞一文不值。你用它们糊了墙。" }, then: "你把钞藏在箱底。你说，纸总还是纸。" }
      ]
    },
    {
      id: "j8.bianbao", cat: "军旅", title: "边堡", age: [18, 45], weight: 13, sex: "male",
      years: [1150, 1234],
      text: [
        "{{边堡|金代在北方边界筑堡戍守，以军户实之}}。要迁人去守，一户给田五十亩、钱十贯。",
        "堡在界壕边上，离这里七百里。",
        "去的人说，那里一年有半年下雪。"
      ],
      options: [
        { text: "应募去守边", hint: "田 +50；身体 −10", effects: [{ k: "field_wet", v: 12 }, { k: "silver", v: 10 }, { k: "body", v: -10 }], gamble: { deathChance: 0.12, cause: "边塞" }, then: "你带着一家迁了七百里。堡子里一共四十户，都是新迁来的。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。两年后听说，那个堡子被破了，四十户剩了九户。" },
        { text: "让次子去，家里留人", hint: "银钱 +5；骨肉分离", effects: [{ k: "silver", v: 5 }, { k: "favor", v: -8 }], then: "次子去了。他十九岁。三年后捎回来一封信，说不识字，是托人写的。" }
      ]
    },
    {
      id: "j8.sengdao", cat: "方外", title: "僧道", age: [16, 60], weight: 12,
      years: [1150, 1234],
      text: [
        "金有僧道，皆给度牒。一张度牒，十贯。",
        "有了度牒，免赋役。",
        "寺里的僧人说：「这也是条活路。」"
      ],
      options: [
        { text: "买一张度牒出家", need: { minSilver: 8 }, hint: "银钱 −8；免赋役；离俗", effects: [{ k: "silver", v: -8 }, { k: "luck", v: 5 }, { k: "favor", v: -6 }], then: "你剃了头。度牒上写着你的法名，还有一行小字：「永免差徭」。" },
        { text: "不买，缴赋役", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你照旧缴赋、照旧当差。寺里的钟每天响两次，你听着。" },
        { text: "送儿子去寺里做行者", hint: "银钱 +2；家中少一人", effects: [{ k: "silver", v: 2 }, { k: "favor", v: -5 }], then: "儿子去了寺里。做行者不给度牒，只给饭。他学了识字。" }
      ]
    },
    {
      id: "j8.kuang", cat: "营生", title: "铁冶", age: [18, 55], weight: 13, sex: "male",
      years: [1150, 1234],
      text: [
        "{{铁冶|金代官营或民营冶铁，匠户世代承业}}。城北有铁冶，招匠户。",
        "去了就是匠籍，子孙世代打铁。免赋，给粮。",
        "冶里有三百多人，一天出铁两千斤。"
      ],
      options: [
        { text: "入冶做匠", hint: "学识 +3；银钱 +4；入匠籍", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: 4 }], setFlag: ["jianghu"], then: "你入了冶。头三个月拉风箱，后来上砧。师傅说你的手稳。" },
        { text: "不入，种田", hint: "无得无失", effects: [], then: "你没去。冶里的匠户，一年能领八石粮。" },
        { text: "往冶里卖炭", hint: "银钱 +3；身体 −6", effects: [{ k: "silver", v: 3 }, { k: "body", v: -6 }], then: "你烧了两年炭。一窑出三十担，一担四十文。脸熏得比炭还黑。" }
      ]
    },
    {
      id: "j8.hanke", cat: "科举", title: "汉人进士", age: [17, 38], weight: 12, when: { minKnowledge: 35 },
      years: [1150, 1234],
      text: [
        "金的科举，女真、汉人分科。汉人考词赋、经义。",
        "一科取五十人，应考的三千。",
        "先生说：「你的文章，火候还差一分。」"
      ],
      options: [
        { text: "去考", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], gamble: { winChance: 0.14, win: [], lose: [{ k: "fame", v: -3 }, { k: "silver", v: -3 }], loseNote: "落第。你同乡的三个人，也都没中。" }, then: "你考了三场。第三场写策，题目问「边备」。" },
        { text: "再读三年", hint: "学识 +9；银钱 −3", effects: [{ k: "knowledge", v: 9 }, { k: "silver", v: -3 }], then: "你回家又读了三年。这三年里，你把《通鉴》读了两遍。" },
        { text: "不考了，去做吏", hint: "银钱 +4；官位 +4", effects: [{ k: "silver", v: 4 }, { k: "official", v: 4 }], then: "你去了县衙做司吏。一个月两贯，管一顿饭。" }
      ]
    },
    {
      id: "j8.nvzhenxue", cat: "学问", title: "女真学", age: [8, 20], weight: 11,
      years: [1170, 1234],
      text: [
        "{{女真学|金代所设学校，教女真字与翻译}}。县里有一所，收女真子弟，也收汉人愿学者。",
        "学了女真字，能去做译史。",
        "你父亲说：「学汉文，能做买卖；学女真字，能做官。」"
      ],
      options: [
        { text: "学女真字", hint: "学识 +6；官位 +4", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 4 }], then: "你学了四年。第一本读的是译过去的《论语》，读得很慢。" },
        { text: "学汉文", hint: "学识 +5；银钱 +2", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: 2 }], then: "你学了汉文。后来给商队记账，一年能挣五贯。" },
        { text: "两种都学", hint: "学识 +8；身体 −4", effects: [{ k: "knowledge", v: 8 }, { k: "body", v: -4 }], then: "你白天学女真字，晚上读汉文。两种都学得半通。" }
      ]
    },
    {
      id: "j8.qiandao", cat: "官府", title: "括地", age: [20, 60], weight: 14, once: true,
      years: [1215, 1233],
      text: [
        "{{括地|金末检括民间田地为军屯，夺民田以给军户}}。使者说：凡民田，皆入官，另拨薄田。",
        "你家十六亩，是三代开出来的。",
        "使者说：「拨给你北边的八亩沙地。」"
      ],
      options: [
        { text: "认了", hint: "田 −8；粮 −6", effects: [{ k: "field_wet", v: -8 }, { k: "grain", v: -6 }], then: "你认了。北边的八亩沙地，一亩收一斗半。你种了三年，才种出一点样子。" },
        { text: "去府里告", hint: "声望 +5；或有祸", effects: [{ k: "fame", v: 5 }], gamble: { winChance: 0.25, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], loseNote: "府里说「军需为重」。你被赶出来，还挨了十板。" }, then: "你写了状子。府里收了，压了两个月。" },
        { text: "把田契藏在亲戚家", hint: "或有查", effects: [{ k: "luck", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "查出藏匿田契，以「欺隐」论，罚了钱，田还是没保住。" }, then: "你把田契送到岳家。使者来查，你说契丢了。" }
      ]
    },
    {
      id: "j8.yizhuang", cat: "乡里", title: "义庄", age: [20, 60], weight: 11,
      years: [1180, 1234],
      text: [
        "族里要立义庄：置田百亩，租入用来赈族中贫者、助婚丧、供子弟读书。",
        "族长说：「每房出十贯。」",
        "你这一房，出不出得起，看今年。"
      ],
      options: [
        { text: "出十贯", need: { minSilver: 10 }, hint: "银钱 −10；声望 +8", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }], then: "你出了十贯。义庄置了百亩田，租簿上写着「三房某某捐」。" },
        { text: "出五贯", hint: "银钱 −5；声望 +4", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], then: "你出了五贯。族长记了半份。此后族中分粮，你家也是半份。" },
        { text: "不出", hint: "声望 −6", effects: [{ k: "fame", v: -6 }], then: "你没出。那年冬天族里赈粮，没有你家的名字。" }
      ]
    }
  ]);

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = (B.eraEvents.nsong || []).concat([

    {
      id: "n8.shixi", cat: "营生", title: "市舶", age: [18, 55], weight: 14,
      years: [1140, 1279],
      text: [
        "{{市舶司|宋代管理海外贸易的机构，抽解舶货}}。泉州港一年进来几百条船。",
        "一条船的货，抽解十分之一。",
        "船主说：「跟我跑一趟，回来分你一份。」"
      ],
      options: [
        { text: "上船", hint: "身体 −8；或有厚利", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.6, win: [{ k: "silver", v: 12 }], lose: [{ k: "silver", v: -4 }, { k: "body", v: -6 }], loseNote: "海上遇了风，货湿了一半。回来只分了四贯。", }, then: "你上了船。出海十七天，到了三佛齐。那里的胡椒，一斤二十文。" },
        { text: "在港上替人卸货", hint: "身体 −6；银钱 +3", effects: [{ k: "body", v: -6 }, { k: "silver", v: 3 }], then: "你在码头上扛了半年货。一天六十文，扛的是香药和象牙。" },
        { text: "不出海，在家种田", hint: "无得无失", effects: [], then: "你没去。那年回来的船，有三条没回来。" }
      ]
    },
    {
      id: "n8.xuetian", cat: "学问", title: "学田", age: [10, 30], weight: 12,
      years: [1140, 1279],
      text: [
        "{{学田|州县学校所置之田，租入供祭祀、养士}}。县学的学田有二百亩。",
        "入学不要束脩，还管一顿饭。",
        "但学额只有二十个。"
      ],
      options: [
        { text: "去考", hint: "学识 +5", effects: [{ k: "knowledge", v: 5 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "fame", v: -2 }], loseNote: "没取上。二十个名额，来考的六十多。" }, then: "你考了。题目是「论学田之利」。" },
        { text: "不入官学，去私塾", hint: "学识 +3；银钱 −2", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: -2 }], then: "你去了镇上的私塾。一年束脩两贯，先生姓陈，是个落第的举子。" },
        { text: "不入官学，去做学徒", hint: "银钱 +3；学识 −2", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: -2 }], then: "你去了药铺做学徒。三年不拿工钱，管饭。识了几百个药名。" }
      ]
    },
    {
      id: "n8.haitang", cat: "乡里", title: "海塘", age: [18, 60], weight: 13,
      years: [1140, 1279],
      text: [
        "{{海塘|江浙沿海防潮堤}}。今年潮大，塘塌了一段。",
        "塘里是三千亩田。塘外是海。",
        "县里说：「修塘，按亩出夫。」"
      ],
      options: [
        { text: "出夫修塘", hint: "身体 −10；田 +3", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: 3 }], then: "你抬了二十天石。塘修好了，插了柳枝做标记。" },
        { text: "出钱代役", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你出了二百文。修塘的人里，有一半是出钱雇来的。" },
        { text: "不出", hint: "田 −4；声望 −5", effects: [{ k: "field_wet", v: -4 }, { k: "fame", v: -5 }], then: "你没出。那年秋潮，你家的两亩田进了水。" }
      ]
    },
    {
      id: "n8.keyin", cat: "科举", title: "混补", age: [15, 30], weight: 12, when: { minKnowledge: 40 },
      years: [1140, 1279],
      text: [
        "{{太学混补|南宋太学招生之法，州学生可赴补试}}。今年太学补试，取三百人。",
        "应考的一万。",
        "你从州县学来，盘缠花了三贯。"
      ],
      options: [
        { text: "去补试", hint: "学识 +5；银钱 −3", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -3 }], gamble: { winChance: 0.12, win: [], lose: [{ k: "fame", v: -3 }], loseNote: "落第。一万取三百，你差了一点。" }, then: "你考了三场。考完在临安住了半个月，等榜。" },
        { text: "不去，回家教书", hint: "银钱 +4；学识 +3", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 3 }], then: "你回县里开了个学馆。学生八个，一年束脩十六贯。" },
        { text: "去补试，同时替人代笔挣钱", hint: "银钱 +3；或有查", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -10 }], loseNote: "替人代笔被查出。除名，三年不得应举。" }, then: "你白天应考，晚上替商人写书信。一封二十文。" }
      ]
    },
    {
      id: "n8.zhuangtian", cat: "赋役", title: "庄田", age: [18, 60], weight: 14,
      years: [1140, 1279],
      text: [
        "{{庄田|南宋权贵寺院所占大田庄，多免赋役}}。城外的明因寺，有庄田三千亩。",
        "寺里来招佃：租四成，免官差。",
        "村里的里正说：「你们去了，村里的差就摊在剩下的人头上。」"
      ],
      options: [
        { text: "去佃寺田", hint: "粮 −6；免差役", effects: [{ k: "grain", v: -6 }, { k: "silver", v: 2 }, { k: "fame", v: -4 }], then: "你佃了寺里十亩。租四成，不缴官税，不当差。里正从此见了你不说话。" },
        { text: "留在村里", hint: "银钱 −3；声望 +4", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 4 }], then: "你留下了。村里的差役重了三成，因为走了一半人。" },
        { text: "去佃，同时劝村里也去", hint: "声望 −6；粮 −4", effects: [{ k: "fame", v: -6 }, { k: "grain", v: -4 }], then: "你劝了六家。里正找上门，说：「你这是拆村。」" }
      ]
    },
    {
      id: "n8.keshu", cat: "文事", title: "刻书", age: [18, 55], weight: 12, when: { minKnowledge: 30 },
      years: [1140, 1279],
      text: [
        "{{刻书|宋代雕版印书业兴盛，书坊刻经史、文集、话本}}。城里的书坊招人写版。",
        "写一千字，给八十文。字要端正，一笔不许错。",
        "坊主说：「写错一个字，整版重刻。」"
      ],
      options: [
        { text: "去写版", hint: "学识 +4；银钱 +3", effects: [{ k: "knowledge", v: 4 }, { k: "silver", v: 3 }], then: "你写了半年。写完了一部《汉书》，手指上磨出了茧。" },
        { text: "自己刻一部书卖", need: { minSilver: 6 }, hint: "银钱 −5；或有获", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 10 }], lose: [{ k: "silver", v: -4 }], loseNote: "书刻出来，卖不动。堆在屋里，后来当了柴。" }, then: "你刻了一部《千家诗》。刻了一百二十版，卖了一年。" },
        { text: "不写，眼睛受不了", hint: "无得无失", effects: [], then: "你没去。书坊里的写工，四十岁眼睛就花了。" }
      ]
    },
    {
      id: "n8.zhongtian", cat: "营生", title: "圩田", age: [20, 60], weight: 13,
      years: [1140, 1279],
      text: [
        "{{圩田|江南围湖造田，筑堤挡水}}。湖边这片圩，是祖父那一辈围的。",
        "今年水大，堤出了个口子。",
        "圩里有你家八亩。"
      ],
      options: [
        { text: "去堵口子", hint: "身体 −10；田 +4", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: 4 }], then: "你和圩里十几户堵了三天。口子堵上时，水已经淹了两尺。" },
        { text: "先抢收", hint: "粮 +6；田 −3", effects: [{ k: "grain", v: 6 }, { k: "field_wet", v: -3 }], then: "你抢收了六成。堤后来塌了，冲走了三亩。" },
        { text: "把田退了，还湖", hint: "田 −8；粮 +3；声望 +3", effects: [{ k: "field_wet", v: -8 }, { k: "grain", v: 3 }, { k: "fame", v: 3 }], then: "你把八亩退了。那年水大，湖面宽了十里，圩里的人骂了你一冬。" }
      ]
    },
    {
      id: "n8.nongshu", cat: "学问", title: "农书", age: [18, 60], weight: 11,
      years: [1140, 1279],
      text: [
        "{{《陈旉农书》|南宋陈旉所著，记江南稻作与土地利用}}。县里的老农买了一本，说是好东西。",
        "书里讲施肥、讲轮作、讲秧田。",
        "老农说：「书上说的，跟我做的不一样。可书上说得有道理。」"
      ],
      options: [
        { text: "照着书上改", hint: "学识 +4；田 +3", effects: [{ k: "knowledge", v: 4 }, { k: "field_wet", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "grain", v: -5 }], loseNote: "那年雨水不对，照书做的田，收成少了两成。" }, then: "你按书上说的，把秧田分了三块，轮着施肥。第二年，收成多了两成。" },
        { text: "照旧法种", hint: "无得无失", effects: [], then: "你照旧法种。老农照书上改，第一年没成，第二年成了。" },
        { text: "借来抄一本", hint: "学识 +5；银钱 −0.5", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -0.5 }], then: "你借来抄了半个月。抄完，书上多了很多自己画的图。" }
      ]
    },
    {
      id: "n8.chaoyin", cat: "市井", title: "盐钞", age: [18, 60], weight: 12,
      years: [1140, 1279],
      text: [
        "{{盐钞|宋代商人纳钱领钞，凭钞支盐}}。一张钞，支盐三百斤。",
        "钞价三贯。盐在盐场支。",
        "今年钞多印了，盐场支不出来。"
      ],
      options: [
        { text: "买钞支盐", need: { minSilver: 4 }, hint: "银钱 −3；或有折", effects: [{ k: "silver", v: -3 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 6 }], lose: [{ k: "silver", v: -3 }], loseNote: "盐场说无盐可支，钞压在手里。半年后才支到一半。" }, then: "你买了钞，去盐场排了五天队，支到三百斤。" },
        { text: "把钞转手卖了", hint: "银钱 +2", effects: [{ k: "silver", v: 2 }], then: "你把钞卖给了镇上的盐商，赚了五百文。他后来压了半年才支到盐。" },
        { text: "不碰这行", hint: "无得无失", effects: [], then: "你没碰。那年钞贱，压死了一个盐商。" }
      ]
    },
    {
      id: "n8.xiangyue", cat: "乡里", title: "乡约", age: [20, 60], weight: 11,
      years: [1170, 1279],
      text: [
        "{{乡约|南宋民间自订的规约，讲睦邻、劝农、禁赌、恤贫}}。村里请先生来，要立一份。",
        "第一条：凡村中斗殴者，罚钱五百，入义仓。",
        "有人说：「罚了钱，谁管？没有官，谁听？」"
      ],
      options: [
        { text: "推先生做约正", hint: "声望 +5；或有争", effects: [{ k: "fame", v: 5 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "约正管了半年，管出了一肚子气，辞了。" }, then: "先生做了约正。第一次罚的是一个打老婆的，罚了五百文。" },
        { text: "只是应个名", hint: "无得无失", effects: [], then: "约立了，贴在祠堂墙上。半年后，纸被雨淋烂了。" },
        { text: "主张加一条：荒年互借", hint: "声望 +8；粮 −4", effects: [{ k: "fame", v: 8 }, { k: "grain", v: -4 }], then: "你提了这条。会上一半人反对，最后写进去了。那年冬天，三家借了粮。" }
      ]
    }
  ]);

})(window.PACK_BASE);
