/* 生在何朝 · 各朝专有事件 卷十二：元、明、清
 * 这一卷只写一件事：人是怎么被「编」起来的。
 * 元编诸色户计，明编里甲黄册，清编保甲与丁口。
 * 每一次编，都有人被编进去，也一定有人没被编进去——那才是要命的地方。
 * 前缀 y6. / m6. / qi6.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = (B.eraEvents.yuan || []).concat([

    {
      id: "y6.huji", cat: "官府", title: "诸色户计", age: [16, 60], weight: 17, once: true,
      years: [1271, 1368],
      text: [
        "{{诸色户计|元代按职业将民户分为军、匠、灶、儒、僧、医等户，世代相承}}。造籍的吏问：「你家做什么的？」",
        "你父亲种田，也打铁。",
        "吏说：「只能算一样。定了，子孙都改不了。」"
      ],
      options: [
        { text: "报民户", hint: "纳粮当差；子孙仍为民", effects: [{ k: "silver", v: -2 }], then: "吏写了「民户」二字。此后的赋役，都按民户算。" },
        { text: "报匠户", hint: "免粮；世代为官府做工", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: 2 }], setFlag: ["jianghu"], then: "吏写了「铁匠户」。你父亲的手艺，从此不是你自己的了，是官府的。" },
        { text: "报儒户", need: { minKnowledge: 30 }, hint: "免差役；须应试", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -6 }, { k: "silver", v: -4 }], loseNote: "考试不合格，儒户被革，改入民户，还追缴了三年的差役。" }, then: "吏写了「儒户」。你得每三年应一次试，考不过就革。" }
      ]
    },
    {
      id: "y6.kecha", cat: "赋役", title: "科差", age: [18, 60], weight: 16,
      years: [1271, 1368],
      text: [
        "{{科差|元代按户征收丝料、包银、俸钞，与税粮并行}}。今年丝料一斤六两，包银四两。",
        "你家没有桑树。",
        "里正说：「没丝，折银。一斤丝折一两二钱。」"
      ],
      options: [
        { text: "折银缴", need: { minSilver: 4 }, hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "你缴了六两银子。缴完，家里剩不到一两。" },
        { text: "去邻县买丝来缴", hint: "银钱 −4；身体 −4", effects: [{ k: "silver", v: -4 }, { k: "body", v: -4 }], then: "你走了三天，买回两斤丝。路上遇雨，丝湿了一半，晒了很久。" },
        { text: "拖着，等上面减免", hint: "或有催征", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.35, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -8 }], loseNote: "催征的人来了。你被拴在里正家的廊柱上，等家里人借钱来赎。" }, then: "你说年成不好。里正说：「上头没有减免的话。」" }
      ]
    },
    {
      id: "y6.she", cat: "乡里", title: "社", age: [20, 65], weight: 14,
      years: [1278, 1368],
      text: [
        "{{社制|元至元七年立社，五十家为一社，择年高晓农事者为社长，劝课农桑}}。本村合了五十二家。",
        "社长姓刘，六十岁，种了一辈子地。他要选人一起去修渠。",
        "他说：「渠修好了，五十家都能浇上。谁不去，谁家最后浇。」"
      ],
      options: [
        { text: "去修渠", hint: "身体 −6；田 +3", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: 3 }], then: "渠修了二十天。通水那天，社长站在渠头，把第一股水放进了最下游那家的地。" },
        { text: "出钱不出力", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你出了二百文。社长收了，什么也没说。" },
        { text: "不去，也不出钱", hint: "声望 −6；浇水排最后", effects: [{ k: "fame", v: -6 }], then: "你没去。那年夏天旱，你家的地最后浇水，稻子矮了半尺。" }
      ]
    },
    {
      id: "y6.daluhuachi", cat: "官府", title: "达鲁花赤", age: [20, 60], weight: 13,
      years: [1271, 1368],
      text: [
        "{{达鲁花赤|元代各级官署所置监临官，由蒙古人或色目人充任，掌实权}}。县里的达鲁花赤是个三十来岁的蒙古人，不会说汉话。",
        "县令是汉人，会说话，不管事。",
        "今年要修学宫。县令答应了，达鲁花赤不点头。"
      ],
      options: [
        { text: "去求达鲁花赤", hint: "学识 +3；或有折辱", effects: [{ k: "knowledge", v: 3 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "fame", v: -6 }, { k: "body", v: -4 }], loseNote: "你在衙门外站了三天。第四天，被差役赶走了。" }, then: "你找了个通译，把修学宫的意思说给他听。他听完，问了一句：「有什么用？」" },
        { text: "自己凑钱修", hint: "银钱 −6；声望 +8", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 8 }], then: "你联络了七家乡绅，凑了三十贯，把学宫修了。达鲁花赤没管，县令来题了一块匾。" },
        { text: "算了", hint: "学识 −2", effects: [{ k: "knowledge", v: -2 }], then: "学宫的事没人再提。三年后，屋顶塌了一角。" }
      ]
    },
    {
      id: "y6.sike", cat: "科举", title: "四等", age: [17, 40], weight: 14, when: { minKnowledge: 35 },
      years: [1315, 1368],
      text: [
        "{{四等人|元代分蒙古、色目、汉人、南人四等，科举各有名额，考试内容亦异}}。你是南人，考的是三场：经疑、古赋、策。",
        "同场有个蒙古人，只考两场，题目也短。",
        "监试的官说：「名额是分定的。南人取二十五。」"
      ],
      options: [
        { text: "照规矩考", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], gamble: { winChance: 0.15, win: [], lose: [{ k: "fame", v: -3 }, { k: "silver", v: -4 }], loseNote: "落第。南人二十五名，应考的两千多。" }, then: "你考了三场，写了九篇。出场时，手抖得端不住碗。" },
        { text: "改籍为汉人", need: { minSilver: 5 }, hint: "银钱 −5；或有查", effects: [{ k: "silver", v: -5 }, { k: "official", v: 6 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "fame", v: -14 }, { k: "body", v: -8 }], loseNote: "改籍事发。除名，永不叙用，还挨了杖。" }, then: "你把籍贯改到了江北。江北的汉人，名额多十个。" },
        { text: "不考了，去做吏", hint: "银钱 +3；官位 +4", effects: [{ k: "silver", v: 3 }, { k: "official", v: 4 }], then: "你去了路总管府做令史。南人做吏，一辈子升不到五品。" }
      ]
    },
    {
      id: "y6.zhanchi", cat: "赋役", title: "站户", age: [18, 60], weight: 14,
      years: [1271, 1368],
      text: [
        "{{站赤|元代驿站，站户出马、出夫，供往来使臣饮食}}。你被佥为站户。",
        "站户免赋税，但要自备马匹、车具、床帐、饮食，供过路的使臣。",
        "上一户站户，三年赔了两百贯，逃了。"
      ],
      options: [
        { text: "当站户", hint: "免赋；银钱 −5；或有赔累", effects: [{ k: "silver", v: -5 }, { k: "martial", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -10 }], loseNote: "一年过了七拨使臣，马死了两匹。你卖了田补上。" }, then: "你领了站牌。头一个月，过了三拨使臣，吃了你家十只鸡。" },
        { text: "出钱求免", need: { minSilver: 5 }, hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "你把五两银子送给提领。他说：「你这份，我另找人。」" },
        { text: "逃到别路去", hint: "身体 −8；田弃", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -6 }], then: "你带着家人逃到邻路。田扔了，房也扔了。三年后，官府还是查到了你的名字。" }
      ]
    },
    {
      id: "y6.quyuan", cat: "文事", title: "书会", age: [18, 50], weight: 12, when: { minKnowledge: 30 },
      years: [1290, 1368],
      text: [
        "{{书会|宋元民间艺人组织，编戏文、话本}}。城里的书会缺一个写词的。",
        "会里的老先生说：「写得好，一本戏给你两贯。写不好，白写。」",
        "他给你一个题目：《宦门子弟错立身》。"
      ],
      options: [
        { text: "写", hint: "学识 +5；银钱 +3", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: 3 }], then: "你写了十二折。戏在庙台上演了三场，看的人挤到了街口。" },
        { text: "写，但不用真名", hint: "学识 +4；声望 −2", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: -2 }], then: "你署了个假名。戏演得很红，没人知道是谁写的。你坐在台下听，听了三场。" },
        { text: "不写，怕辱没门楣", hint: "声望 +3；学识 −2", effects: [{ k: "fame", v: 3 }, { k: "knowledge", v: -2 }], then: "你推了。老先生说：「读书人不肯写戏，戏就只能由不读书的人写。」" }
      ]
    },
    {
      id: "y6.huanghe", cat: "天灾", title: "河工", age: [18, 60], weight: 15,
      years: [1340, 1368],
      text: [
        "{{至正河变|1344 年黄河决白茅堤，至正十一年贾鲁治河，征民夫十五万}}。今年征夫，一户一丁。",
        "工地上一天给两升米。",
        "同去的邻家汉子说：「石头底下压着的，是前一批人的骨头。」"
      ],
      options: [
        { text: "去", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }, { k: "grain", v: 3 }], gamble: { deathChance: 0.14, cause: "河工" }, then: "你在工地上挑了八个月的土。回来时，人瘦了一圈，牙掉了两颗。" },
        { text: "出钱雇人", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你雇了邻村一个无地的。他去了，回来时咳血，第二年死了。" },
        { text: "逃去投红巾", hint: "身体 −8；从此是反贼", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }, { k: "troops", v: 4 }], setFlag: ["hongjin"], then: "你半路逃了，投了挖河民夫里传教的那一伙。他们头上裹红布。" }
      ]
    }
  ]);

  /* ══════════ 明 ══════════ */
  B.eraEvents.ming = (B.eraEvents.ming || []).concat([

    {
      id: "m6.lijia", cat: "赋役", title: "里甲", age: [20, 60], weight: 17, once: true,
      years: [1381, 1644],
      text: [
        "{{里甲|明制：一百一十户为里，十户为甲，轮流应役，十年一周}}。今年造{{黄册|明代户口册，以黄纸为面}}，你家编在第三甲。",
        "里长说：「轮到你家当甲首。这一甲的税粮，你先垫，收齐了再还你。」",
        "上一任甲首，垫了八石，收回来五石。"
      ],
      options: [
        { text: "当甲首", hint: "银钱 −5；或有赔补", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -10 }], loseNote: "有两户逃了，欠的粮由甲首赔。你卖了半亩地。" }, then: "你接了甲首的牌子。这一甲十户，两户是寡妇，一户是绝户。" },
        { text: "出钱求免", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }, { k: "fame", v: -3 }], then: "你把四两银子给了里长。他把你家排到了最末一年。" },
        { text: "分家，拆成两户", hint: "田 −5；或有查", effects: [{ k: "field_wet", v: -5 }, { k: "fame", v: -2 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "查黄册，兄弟未析产而另立户。罚粮，还追了一年差役。" }, then: "你把田分了五亩给弟弟，另立一户。两家从此各当各的差。" }
      ]
    },
    {
      id: "m6.liangzhang", cat: "官府", title: "粮长", age: [25, 60], weight: 14,
      years: [1381, 1550],
      text: [
        "{{粮长|明代负责催征、解运税粮的富户，多由大户充任}}。今年轮到你家做粮长。",
        "一万石粮，从县里运到南京。路上损耗、脚价、过闸的钱，都归粮长。",
        "上一任粮长做了三年，家产去了一半。"
      ],
      options: [
        { text: "接", hint: "声望 +8；银钱 −8", effects: [{ k: "fame", v: 8 }, { k: "silver", v: -8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -8 }], loseNote: "船在瓜洲翻了。一万石粮，赔了三千石，还挨了杖。" }, then: "你接了解运的公文。船队一共四十七条船，走在运河上像一条长龙。" },
        { text: "花钱改派别人", need: { minSilver: 6 }, hint: "银钱 −6；声望 −4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }], then: "你花六两，让里长把名字改成了别人。那人后来赔了两百石。" },
        { text: "把家产分给三个儿子", hint: "田 −12；降为中户", effects: [{ k: "field_wet", v: -12 }, { k: "fame", v: -3 }], then: "你把田分给三个儿子，自己只留四亩。粮长的差，轮不到了。" }
      ]
    },
    {
      id: "m6.junhu", cat: "军旅", title: "军户", age: [16, 45], weight: 15, sex: "male",
      years: [1370, 1644],
      text: [
        "{{军户|明代卫所兵另立军籍，世代为军，不得脱籍}}。你家在军籍上，已经是第四代。",
        "卫所来勾军：一户出一丁，去卫所屯田守城。",
        "你父亲说：「我这一辈去了三个，回来一个。」"
      ],
      options: [
        { text: "自己去", hint: "身体 −8；免民粮", effects: [{ k: "body", v: -8 }, { k: "martial", v: 5 }, { k: "silver", v: 2 }], then: "你去了卫所。卫所在山里，屯田八十亩，十个人种。城墙是土夯的，塌了一段没人修。" },
        { text: "花钱雇人代军", need: { minSilver: 5 }, hint: "银钱 −5；或有勾补", effects: [{ k: "silver", v: -5 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -8 }], loseNote: "雇的人逃了。卫所来勾补，你还是得去，还多罚了钱。" }, then: "你雇了个流民顶名。他拿着你的名字去了卫所，你自己的名字，还在册上。" },
        { text: "逃籍，远走他乡", hint: "身体 −8；家产尽弃", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -6 }], gamble: { deathChance: 0.08, cause: "勾军" }, then: "你带着家人往西走。军籍逃了，一辈子不能回乡。" }
      ]
    },
    {
      id: "m6.yitiaobian", cat: "赋役", title: "一条鞭", age: [20, 65], weight: 18, once: true,
      years: [1581, 1644],
      text: [
        "{{一条鞭法|1581 年张居正推行，赋役合并，按亩征银，差役折银雇募}}。自此不派力役，一概征银。",
        "你家有田十七亩。一亩征银三分五厘，共五钱九分五。",
        "里正说：「银要足色。碎银、铜钱，一概不收。」"
      ],
      options: [
        { text: "缴银", hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "你把银锭拿到银匠铺剪开，称了又称。缴完，你手里只剩一堆碎银。" },
        { text: "卖粮换银", hint: "粮 −12；银钱 −3", effects: [{ k: "grain", v: -12 }, { k: "silver", v: -3 }], then: "秋收后米价低，一石只卖四钱。你卖了十二石，才凑够。" },
        { text: "求里正收铜钱", hint: "声望 −3；或多缴", effects: [{ k: "silver", v: -8 }, { k: "fame", v: -3 }], then: "里正说：「收钱要折耗。」一千文作八钱算。你多缴了两钱。" }
      ]
    },
    {
      id: "m6.bagu", cat: "科举", title: "八股", age: [16, 40], weight: 15, when: { minKnowledge: 35 },
      years: [1487, 1644],
      text: [
        "{{八股|明代科举定式，破题、承题、起讲、入手、起股、中股、后股、束股}}。先生把格式写在纸上，贴在墙上。",
        "他说：「意思不重要，格式要紧。格式错了，文章再好也不取。」",
        "你写了三年，已经能一看题目就破题。"
      ],
      options: [
        { text: "照着格式做到底", hint: "学识 +7", effects: [{ k: "knowledge", v: 7 }], gamble: { winChance: 0.18, win: [], lose: [{ k: "fame", v: -3 }, { k: "silver", v: -4 }], loseNote: "落第。主考批了「平」字。" }, then: "你把《四书》的每一句都做了一遍破题，做了两千多条。" },
        { text: "格式照做，内容写自己的", hint: "学识 +5；或有黜", effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: 3 }], gamble: { winChance: 0.12, win: [], lose: [{ k: "fame", v: -8 }], loseNote: "主考批了「语多怪僻」，黜落，还贴了榜示。" }, then: "你的文章里有几句是自己想的。主考看了很久。" },
        { text: "不考了，去写时文卖", hint: "银钱 +5；学识 +3", effects: [{ k: "silver", v: 5 }, { k: "knowledge", v: 3 }], then: "你编了一部时文选，一年卖了两百部。读书人来买，都叫你「先生」。" }
      ]
    },
    {
      id: "m6.jianghu", cat: "营生", title: "轮班", age: [16, 55], weight: 13,
      years: [1390, 1560],
      text: [
        "{{轮班匠|明代匠户每三年赴京服役三月，后改纳银代役}}。你家是木匠户。",
        "今年轮到赴京。路上来回四个月，服役三个月。",
        "工部的吏说：「不去的，纳银一两八钱。」"
      ],
      options: [
        { text: "赴京", hint: "身体 −10；银钱 +2", effects: [{ k: "body", v: -10 }, { k: "silver", v: 2 }, { k: "knowledge", v: 3 }], then: "你走了四个月到京师。在工部做了三个月窗棂，学会了一种新的榫。" },
        { text: "纳银代役", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你缴了一两八钱。这一年在家做了七副棺材，挣了四两。" },
        { text: "逃役", hint: "身体 −6；或有勾", effects: [{ k: "body", v: -6 }, { k: "fame", v: -5 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -8 }], loseNote: "被勾出，押到京师补役，还多做了三个月。" }, then: "你没去。三年后再轮，你还是没去。" }
      ]
    },
    {
      id: "m6.zonglu", cat: "宗族", title: "族田", age: [20, 60], weight: 13,
      years: [1450, 1644],
      text: [
        "{{族田|宗族共有的田产，其租用于祭祀、助学、赈济}}。族里要置田，每房出银。",
        "族长说：「出了的，子弟能进族塾；不出，将来不入祠。」",
        "你有一子，八岁。"
      ],
      options: [
        { text: "出银置田", hint: "银钱 −5；声望 +6", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 6 }, { k: "knowledge", v: 3 }], then: "你出了五两。族田置了二十亩。你儿子第二年进了族塾，束脩免了。" },
        { text: "不出", hint: "省银；日后不入祠", effects: [{ k: "fame", v: -5 }], then: "你说家里紧。族长记了一笔。那年冬天祭祖，你家没分到胙肉。" },
        { text: "出银，但要写进碑上", hint: "银钱 −5；声望 +8", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 8 }], then: "你出了五两，要求在祠堂的石碑上刻名。族长看了你一眼，说：「刻。」" }
      ]
    },
    {
      id: "m6.kuangshui", cat: "官府", title: "矿监", age: [20, 60], weight: 15,
      years: [1596, 1620],
      text: [
        "{{矿监税使|万历年间遣宦官为矿监税使，四处括取，民不堪命}}。今年来了一个，住在县里的书院。",
        "他说你家屋后的山有矿脉，要开挖。",
        "挖了矿，山就废了。你家三代的坟，都在那山上。"
      ],
      options: [
        { text: "出钱打点", need: { minSilver: 6 }, hint: "银钱 −6；保住山", effects: [{ k: "silver", v: -6 }], then: "你送了六两。矿监的人收了，说：「这山看着也没什么。」" },
        { text: "让他们挖", hint: "银钱 +4；坟山毁", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -6 }], then: "他们挖了三个月，挖出一个深坑，什么也没有。你家的坟，迁了两座。" },
        { text: "纠集族人去拦", hint: "声望 +8；或有祸", effects: [{ k: "fame", v: 8 }, { k: "body", v: -6 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }], loseNote: "矿监调了兵。族人被打散了七个，你被拿进县狱关了两个月。" }, then: "族里来了一百多人，站在山脚下。矿监的人在山上看了半天，没下来。" }
      ]
    }
  ]);

  /* ══════════ 清 ══════════ */
  B.eraEvents.qing = (B.eraEvents.qing || []).concat([

    {
      id: "qi6.tanding", cat: "赋役", title: "摊丁", age: [20, 65], weight: 18, once: true,
      years: [1723, 1850],
      text: [
        "{{摊丁入亩|雍正年间将丁银摊入田赋，地多者多纳，无地者不纳}}。自此不再按人丁征银。",
        "你家有田二十四亩，五口人。",
        "里正说：「往后只按田算。人多的，占便宜；田多的，吃亏。」"
      ],
      options: [
        { text: "认了，按田纳", hint: "银钱 −7", effects: [{ k: "silver", v: -7 }, { k: "fame", v: 3 }], then: "你家二十四亩，一年纳银一两八钱。比以前按丁纳的，多了三钱。" },
        { text: "把田典出去一半", hint: "田 −12；银钱 +8", effects: [{ k: "field_wet", v: -12 }, { k: "silver", v: 8 }], then: "你把十二亩典给了镇上的当铺，说好五年。五年后，赎回的只有八亩。" },
        { text: "去县里说自家田瘦", hint: "或有减", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.35, win: [{ k: "silver", v: 3 }], lose: [{ k: "silver", v: -3 }], loseNote: "县里派人来看，说「中等田」，照旧。" }, then: "你带人去看地，抓了一把土。来的书吏说：「土是瘦，可你没报荒。」" }
      ]
    },
    {
      id: "qi6.baojia", cat: "官府", title: "保甲", age: [18, 60], weight: 15,
      years: [1650, 1900],
      text: [
        "{{保甲|清代十户为牌，十牌为甲，十甲为保，门牌上写丁口职业}}。今年换门牌。",
        "牌头拿着新牌来，要写清：几口人、做什么的、有没有外来亲戚。",
        "他说：「写不清的，算窝藏。」"
      ],
      options: [
        { text: "一一写清", hint: "声望 +3；或有牵连", effects: [{ k: "fame", v: 3 }], then: "你写了五口，都是种田。牌头把门牌钉在门框上，钉得很正。" },
        { text: "少写一个外来的表弟", hint: "省事；或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "表弟在外头惹了事，查出他没上册。你被带去县里问了两日。" }, then: "你没写表弟。他在你家住了半年，白天不出门。" },
        { text: "花钱买个「绅」字", need: { minSilver: 8 }, hint: "银钱 −8；门牌不同", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 5 }], then: "你捐了个监生。门牌上写的是「绅」，牌头来的时候，说话客气了些。" }
      ]
    },
    {
      id: "qi6.qiji", cat: "家族", title: "旗籍", age: [16, 50], weight: 12,
      years: [1650, 1800],
      text: [
        "{{旗籍|清代八旗户籍，另立档册，不归州县管辖}}。你家在镶白旗的包衣档里。",
        "主家要放一批包衣出旗，自谋生路。",
        "管事的说：「出旗的，从此是民人，不再吃旗粮，也不再归主家管。」"
      ],
      options: [
        { text: "出旗为民", hint: "免主家差役；失旗粮", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }], then: "你出了旗。名字从包衣档上划掉，写进了县里的民册。此后再没人叫你「旗下人」。" },
        { text: "留在旗下", hint: "有旗粮；仍属主家", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -3 }], then: "你留下了。每年领四两旗粮，也要给主家当差。" },
        { text: "花钱捐个旗籍", need: { minSilver: 10 }, hint: "银钱 −10；身价不同", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }], then: "你捐了个旗籍。此后的差役，县里管不到你头上。" }
      ]
    },
    {
      id: "qi6.juanna", cat: "科举", title: "捐纳", age: [18, 50], weight: 14,
      years: [1670, 1900],
      text: [
        "{{捐纳|清代卖官鬻爵之制，纳银可得监生、知县等衔}}。今年开捐，知县一千二百两，监生一百零八两。",
        "你有两百两，是三代攒下的。",
        "捐了监生，能下场考；捐了知县，能实任。"
      ],
      options: [
        { text: "捐监生", need: { minSilver: 11 }, hint: "银钱 −11；可应乡试", effects: [{ k: "silver", v: -11 }, { k: "knowledge", v: 4 }, { k: "fame", v: 6 }], then: "你捐了监生。监照是一张大纸，上面盖着户部和国子监的印。" },
        { text: "捐知县", need: { minSilver: 14 }, hint: "银钱 −14；官位 +14", effects: [{ k: "silver", v: -14 }, { k: "official", v: 14 }, { k: "fame", v: 4 }], then: "你捐了个知县，分发到江西。到任那天，衙门的门房问你要「到任规」。" },
        { text: "不捐，攒着买田", hint: "田 +10", effects: [{ k: "field_wet", v: 10 }], then: "你用两百两买了十亩水田。田契上写着「永卖」，你按了手印。" }
      ]
    },
    {
      id: "qi6.dingce", cat: "赋役", title: "编审", age: [20, 60], weight: 14,
      years: [1650, 1712],
      text: [
        "五年一编审。今年查丁，十六以上、六十以下，皆入丁册。",
        "你家长子十六，正好够。",
        "里正说：「入了丁，一年一钱五分银子。不入，日后查出来，加倍。」"
      ],
      options: [
        { text: "照实入丁", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }], then: "长子入了丁册。那年他十六，缴了一钱五分。" },
        { text: "报成十五", hint: "省银；或有查", effects: [{ k: "silver", v: 1 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -4 }, { k: "fame", v: -5 }], loseNote: "五年后再审，年龄对不上。补缴并罚。" }, then: "你报了他十五。他个子高，里正看了两眼。" },
        { text: "送他去当学徒", hint: "学识 +3；家中少一劳力", effects: [{ k: "knowledge", v: 3 }, { k: "favor", v: -3 }], then: "你把他送到镇上的药铺做学徒。三年不拿工钱，管饭。" }
      ]
    },
    {
      id: "qi6.yaren", cat: "官府", title: "到任规", age: [22, 60], weight: 13, when: { minGrade: 1 },
      years: [1700, 1900],
      text: [
        "你补了实缺，到任。",
        "门房递上一张单子：上司的节礼、同僚的公宴、书吏的工食、衙役的工食。",
        "师爷说：「这些，一年要八百两。您的俸禄，一年四十五两。」"
      ],
      options: [
        { text: "照收陋规", hint: "银钱 +30；声望 −6", effects: [{ k: "silver", v: 30 }, { k: "fame", v: -6 }, { k: "grudge", v: 4 }], then: "你收了。钱粮的火耗、词讼的规费、契税的加平，一样一样都收。" },
        { text: "只收火耗，其余免", hint: "银钱 +10；声望 +4", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 4 }], then: "你只收了火耗。师爷说：「这样下去，衙役要跑。」" },
        { text: "一概不收，自己贴", hint: "银钱 −10；声望 +10", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 10 }], then: "你把家里的钱贴进去，贴了两年。第三年，师爷走了。" }
      ]
    },
    {
      id: "qi6.tuntian", cat: "军旅", title: "兵饷", age: [18, 45], weight: 13, sex: "male",
      years: [1850, 1900],
      text: [
        "{{湘军淮军|咸丰以后，团练起而代八旗绿营，兵饷自筹}}。营官在村里招人。",
        "他说：「一个月四两二钱，管饭。战死给三十两烧埋银。」",
        "四两二钱，是种田一年的收成。"
      ],
      options: [
        { text: "投营", hint: "银钱 +6；身体 −6；或战死", effects: [{ k: "silver", v: 6 }, { k: "body", v: -6 }, { k: "martial", v: 8 }], gamble: { deathChance: 0.18, cause: "战阵" }, then: "你投了营。营官姓鲍，把你们一百二十人编成一哨，练了二十天就开拔。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。村里的年轻人走了一半，田里只剩下老人和女人。" },
        { text: "去营里做伙夫", hint: "身体 −3；银钱 +3", effects: [{ k: "body", v: -3 }, { k: "silver", v: 3 }], then: "你在营里做饭。一天两顿，一百二十人的饭，用三口大锅。" }
      ]
    },
    {
      id: "qi6.yangwu", cat: "世变", title: "洋货", age: [18, 60], weight: 12,
      years: [1842, 1900],
      text: [
        "五口通商之后，洋布进来了。一匹洋布，三百二十文；土布，五百文。",
        "你家的织机，一年出二十匹。",
        "镇上的布店说：「土布卖不动了。」"
      ],
      options: [
        { text: "改织洋纱", hint: "银钱 +4；手艺变", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 2 }], then: "你买了洋纱来织。纱细，织得快，一匹卖四百。织出来的布，比土布薄。" },
        { text: "继续织土布", hint: "银钱 −4；守住手艺", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 3 }], then: "你继续织土布。这一年，二十匹只卖出去八匹。" },
        { text: "把织机卖了", hint: "银钱 +3；失一门手艺", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: -3 }], then: "你把织机卖了三两银子。买主是邻村的，他说：「这机子好，可惜没人用了。」" }
      ]
    }
  ]);

})(window.PACK_BASE);
