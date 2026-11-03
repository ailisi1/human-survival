/* 生在何朝 · 各朝专有事件 卷十五：西晋、东晋、南北朝、隋
 * 这四朝有一件事是共通的：人往两个方向跑——往大族家里跑，往寺院里跑。
 * 跑出去的人不缴税、不当差，剩下的就得替他们缴。
 * 所以这一卷写的是「谁在册上」这件事落到具体一户人家时的滋味。
 * 前缀 wj8. / ej8. / ns8. / su8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 西晋 ══════════ */
  B.eraEvents.wjin = (B.eraEvents.wjin || []).concat([

    {
      id: "wj8.qingtan", cat: "文事", title: "清谈", age: [16, 45], weight: 13, when: { minKnowledge: 30 },
      years: [265, 316],
      text: [
        "{{清谈|魏晋士人以老庄为宗，执麈尾谈论玄理}}。城里的名士每旬一会。",
        "他们谈「有无」「言意」，谈得高兴了，连饭都忘了吃。",
        "有人邀你去。他说：「你的口齿，可以去坐一坐。」"
      ],
      options: [
        { text: "去", hint: "学识 +5；声望 +4", effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "你说了半炷香，被人一句「未达其旨」驳了回来。满座都不看你。" }, then: "你去了。座上九个人，麈尾一挥，从午后谈到掌灯。" },
        { text: "不去，做实务", hint: "学识 +2；官位 +3", effects: [{ k: "knowledge", v: 2 }, { k: "official", v: 3 }], then: "你没去。你在衙门里核了三年的田簿。同僚说你「俗」。" },
        { text: "去，只坐着听", hint: "学识 +3", effects: [{ k: "knowledge", v: 3 }], then: "你去了，一言不发地坐了一下午。临走时，主人说：「你倒是沉得住气。」" }
      ]
    },
    {
      id: "wj8.sili", cat: "官府", title: "门生", age: [18, 55], weight: 12,
      years: [265, 316],
      text: [
        "{{门生|魏晋时投靠权贵为门生，供役使，可免官役}}。州里的别驾有门生三十人。",
        "他们说：「来我家做门生，赋役全免。就是有事要应。」",
        "应的事，是迎来送往、看家护院。"
      ],
      options: [
        { text: "去做门生", hint: "免赋役；银钱 +3；声望 −4", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -4 }], setFlag: ["mensheng"], then: "你去了。别驾家的门生住在西厢，一天两顿，有事就喊。" },
        { text: "不去，自己扛赋役", hint: "银钱 −3；身体 −3", effects: [{ k: "silver", v: -3 }, { k: "body", v: -3 }], then: "你没去。那年缴了三匹绢、服了二十天役。" },
        { text: "只把次子送去", hint: "银钱 +2；骨肉分离", effects: [{ k: "silver", v: 2 }, { k: "favor", v: -4 }], then: "次子去了。他十岁，做的是端茶送水的活。" }
      ]
    },
    {
      id: "wj8.shuidui", cat: "营生", title: "水碓", age: [20, 60], weight: 12,
      years: [265, 316],
      text: [
        "{{水碓|利用水力舂米的机械}}。河上有人架了一台，一天能舂三十石。",
        "架碓的是城里的王家。他们说：用碓舂米，一石收三升。",
        "你家的米，一直是人力舂的。"
      ],
      options: [
        { text: "用碓舂", hint: "银钱 −1；省力", effects: [{ k: "silver", v: -1 }, { k: "body", v: 3 }], then: "你把米挑到河边。碓一上一下，一个时辰就完了。" },
        { text: "自己舂", hint: "身体 −6", effects: [{ k: "body", v: -6 }], then: "你自己舂。一石米，舂一天，胳膊抬不起来。" },
        { text: "也架一台，替人舂", need: { minSilver: 6 }, hint: "银钱 −6；营生", effects: [{ k: "silver", v: -6 }, { k: "knowledge", v: 3 }], gamble: { winChance: 0.55, win: [{ k: "silver", v: 4 }], lose: [{ k: "silver", v: -4 }], loseNote: "王家说河是他家的。碓被拆了，木料抬走。" }, then: "你在自家河段架了一台。花了六两银子，请木匠做了二十天。" }
      ]
    },
    {
      id: "wj8.foshi", cat: "方外", title: "佛图", age: [16, 60], weight: 12,
      years: [290, 316],
      text: [
        "{{佛图澄|西域僧人，西晋末入中原传法}}的弟子到了县里，在城外立了个精舍。",
        "他说：来听经的，给一碗粥。",
        "粥是真的。听的人一天比一天多。"
      ],
      options: [
        { text: "去听", hint: "学识 +3；善缘", effects: [{ k: "knowledge", v: 3 }, { k: "luck", v: 3 }], then: "你去了。他讲的经你多半不懂，但那碗粥是热的。" },
        { text: "捐两亩田给精舍", hint: "田 −2；声望 +5", effects: [{ k: "field_wet", v: -2 }, { k: "fame", v: 5 }], then: "你捐了两亩。僧人在地上画了个圈，说这是你的功德。" },
        { text: "不去，怕是邪教", hint: "无得无失", effects: [], then: "你没去。三年后，县里一半的人家都供了佛像。" }
      ]
    },
    {
      id: "wj8.hunsang", cat: "宗族", title: "厚葬", age: [20, 65], weight: 12,
      years: [265, 316],
      text: [
        "{{厚葬|魏晋门阀讲究丧葬排场，倾家治丧}}。族里的一位长辈死了。",
        "他家的儿子说：要办三十天，请僧道，做俑人，砌大坟。",
        "钱不够，要在族里摊。"
      ],
      options: [
        { text: "出一份", hint: "银钱 −5；声望 +4", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }], then: "你出了五两。三十天的丧事办下来，他家卖了二十亩田。" },
        { text: "劝他简办", hint: "声望 −4；省银", effects: [{ k: "fame", v: -4 }], then: "你在族会上说了。他儿子脸都白了，说：「我父亲一辈子要脸。」" },
        { text: "不出", hint: "声望 −6", effects: [{ k: "fame", v: -6 }], then: "你没出。出殡那天，你站在人群最后。" }
      ]
    },
    {
      id: "wj8.zongmiao", cat: "宗族", title: "祭田", age: [20, 60], weight: 11,
      years: [265, 316],
      text: [
        "族里有一块祭田，二十亩，租入供四时祭祀。",
        "今年管祭田的族人说：田租不够，要各家再添。",
        "有人私下说，那二十亩的租，一半进了他家。"
      ],
      options: [
        { text: "去查账", hint: "声望 +4；结怨", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "账查了，看不出问题。族里反说你好事。" }, then: "你把十年的租簿翻了一遍。有三年的数是同一个笔迹改的。" },
        { text: "照添", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你添了二两。祭祀那天，供桌上多了一只羊。" },
        { text: "不说话", hint: "无得无失", effects: [], then: "你什么也没说。此后十年，祭田的租一直不够。" }
      ]
    },
    {
      id: "wj8.binghu", cat: "军旅", title: "世兵", age: [16, 45], weight: 13, sex: "male",
      years: [280, 316],
      text: [
        "{{世兵制|魏晋兵家子弟世代为兵，另立兵籍，不属郡县}}。你家的兵籍，从祖父那一辈就有。",
        "兵家子弟，不得为吏，不得与民户通婚。",
        "今年点兵，你父亲五十三，你十六。"
      ],
      options: [
        { text: "替父亲去", hint: "身体 −8；孝名", effects: [{ k: "body", v: -8 }, { k: "fame", v: 5 }, { k: "martial", v: 4 }], then: "你去了。父亲送你到营门口，说：「兵家的孩子，命就是这样。」" },
        { text: "花钱脱兵籍", need: { minSilver: 8 }, hint: "银钱 −8；转民户", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 3 }], then: "你花八两，把兵籍改成了民籍。改籍那天，书吏说：「这钱不好挣。」" },
        { text: "逃籍", hint: "身体 −10；或有捕", effects: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.08, cause: "捕亡" }, then: "你往南跑了。兵籍上你的名字，一直没销。" }
      ]
    },
    {
      id: "wj8.tuntian", cat: "赋役", title: "军屯", age: [18, 55], weight: 12, sex: "male",
      years: [280, 316],
      text: [
        "{{军屯|魏晋以兵士或募民屯田，收成充军粮}}。州里的军屯要人，一户出丁，给田三十亩，收成六成归军。",
        "屯在城北，有渠。",
        "管屯的校尉说：「去了，就不用服别的役了。」"
      ],
      options: [
        { text: "去屯田", hint: "田 +12；粮 −6", effects: [{ k: "field_wet", v: 12 }, { k: "grain", v: -6 }], then: "你去了。三十亩屯田，一年收六十石，交三十六石。" },
        { text: "不去，照旧服役", hint: "身体 −5；银钱 −2", effects: [{ k: "body", v: -5 }, { k: "silver", v: -2 }], then: "你没去。那年服了四十天役，修城墙。" },
        { text: "去，但只领十亩", hint: "田 +4；身体 −3", effects: [{ k: "field_wet", v: 4 }, { k: "body", v: -3 }], then: "你只领了十亩。校尉在册上写了个「半」字。" }
      ]
    }
  ]);

  /* ══════════ 东晋 ══════════ */
  B.eraEvents.ejin = (B.eraEvents.ejin || []).concat([

    {
      id: "ej8.liuminShuai", cat: "世变", title: "流民帅", age: [18, 55], weight: 13,
      years: [317, 420],
      text: [
        "{{流民帅|东晋时统领流民武装的首领，多被授官以羁縻}}。北边来的一位，带着两千多户，驻在城外。",
        "朝廷给了他一个将军的名号，不给粮。",
        "他派人来村里借粮，说明年还。"
      ],
      options: [
        { text: "借给他", hint: "粮 −8；或有报", effects: [{ k: "grain", v: -8 }, { k: "favor", v: 6 }], gamble: { winChance: 0.5, win: [{ k: "grain", v: 6 }], lose: [], loseNote: "第二年他自己也断了粮。还粮的事，没人再提。" }, then: "你借了八石。他亲自来道谢，说话带着北边的口音。" },
        { text: "不借", hint: "或有掠", effects: [], gamble: { winChance: 0.55, win: [], lose: [{ k: "grain", v: -10 }, { k: "body", v: -6 }], loseNote: "他的人夜里来了。粮被搬空，你被打了一顿。" }, then: "你说家里也紧。来人看了你一眼，走了。" },
        { text: "跟他走，做他的部曲", hint: "身体 −6；银钱 +4", effects: [{ k: "body", v: -6 }, { k: "silver", v: 4 }, { k: "troops", v: 4 }], then: "你跟着他走了。他的队伍里，一半是流民，一半是逃兵。" }
      ]
    },
    {
      id: "ej8.zhuangyuan", cat: "家族", title: "庄园", age: [18, 60], weight: 14,
      years: [317, 420],
      text: [
        "{{庄园|东晋士族占山护泽，建别墅，役使佃客部曲}}。谢家的庄，从山脚到湖边，三十里。",
        "庄里有田、有果园、有窑、有磨。庄里的人，一辈子不出庄。",
        "庄头说：「来我庄上，有屋有田，不缴官税。」"
      ],
      options: [
        { text: "入庄为佃客", hint: "免官税；身属庄", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -5 }], setFlag: ["kehu"], then: "你入了庄。庄头给了你三间土屋、十五亩田。租六成。" },
        { text: "不入，做自耕农", hint: "银钱 −3；身体 −4", effects: [{ k: "silver", v: -3 }, { k: "body", v: -4 }], then: "你没入。那年缴了口税、服了役，还自己修了渠。" },
        { text: "入庄，但要求写入庄籍", hint: "声望 +3；或有不认", effects: [{ k: "fame", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "庄头说：「庄上不立这个。」你的名字，只在他家的簿上。" }, then: "你说要写一张契。庄头笑了，说：「你倒是仔细。」" }
      ]
    },
    {
      id: "ej8.huiyuan", cat: "方外", title: "白莲", age: [16, 60], weight: 12,
      years: [380, 420],
      text: [
        "{{慧远|东晋高僧，居庐山，结白莲社}}在庐山讲经，说念佛可生西方。",
        "去听的人，有官，有农，有逃役的。",
        "同村的老周去了，回来就不一样了，一天念几千声佛。"
      ],
      options: [
        { text: "也去听", hint: "学识 +3；luck +3", effects: [{ k: "knowledge", v: 3 }, { k: "luck", v: 3 }], then: "你走了一百多里到庐山。山上的雾很大，讲堂里坐满了人。" },
        { text: "跟着念佛", hint: "身体 −2；心定", effects: [{ k: "body", v: -2 }, { k: "luck", v: 4 }], then: "你每天念一千声。念了三个月，夜里睡得着了。" },
        { text: "不去，家里离不开", hint: "无得无失", effects: [], then: "你没去。老周后来在山上住了下来，再没回来。" }
      ]
    },
    {
      id: "ej8.dutian", cat: "赋役", title: "度田", age: [20, 60], weight: 13,
      years: [330, 420],
      text: [
        "{{度田收租|东晋成帝时按田亩收租，亩税三升}}。今年重新丈量。",
        "量出来，你家有田十九亩，比旧籍多四亩。",
        "量田的吏说：「多的四亩，从今年起纳。」"
      ],
      options: [
        { text: "认了", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你认了。四亩多缴一斗二升，一年一年地缴。" },
        { text: "说那四亩是河滩", hint: "或有勘", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -4 }], loseNote: "吏去看了，说「滩上也种草」，照纳。" }, then: "你带他去看。那年水小，滩上确实只长草。" },
        { text: "把四亩记在亡父名下", hint: "或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -5 }], loseNote: "查户籍，亡父名下已除。田入官，还罚了钱。" }, then: "你把四亩记在亡父名下。簿上还留着他的名字。" }
      ]
    },
    {
      id: "ej8.qingshang", cat: "文事", title: "清商", age: [16, 50], weight: 11,
      years: [317, 420],
      text: [
        "{{清商乐|东晋南朝流行的汉族民间音乐，后被宫廷采用}}。城里来了乐人，唱南方的曲。",
        "一曲《子夜歌》，唱的是「宿昔不梳头，丝发披两肩」。",
        "听的人里，有哭的。"
      ],
      options: [
        { text: "去听", hint: "银钱 −0.5；学识 +2", effects: [{ k: "silver", v: -0.5 }, { k: "knowledge", v: 2 }], then: "你花二十文进了场。唱到第三曲，前排的一个老人站起来走了。" },
        { text: "学唱", hint: "学识 +3；声望 −2", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: -2 }], then: "你学了半年。后来在婚宴上唱过一次，主家给了五十文。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。那首歌在城里唱了三年。" }
      ]
    },
    {
      id: "ej8.beifuZhen", cat: "军旅", title: "京口", age: [18, 45], weight: 13, sex: "male",
      years: [380, 420],
      text: [
        "京口是北府兵的根。那里的人，家家有人当兵。",
        "你在京口有个远亲，捎信来：「来，这里有粮。」",
        "信上没说打仗的事。"
      ],
      options: [
        { text: "去京口", hint: "身体 −6；银钱 +4", effects: [{ k: "body", v: -6 }, { k: "silver", v: 4 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.1, cause: "战阵" }, then: "你去了京口。亲戚给你找了个差事，在营里管马。" },
        { text: "不去，留在乡里", hint: "无得无失", effects: [], then: "你没去。那年京口出兵，回来的人少了一半。" },
        { text: "去，但只做民夫", hint: "身体 −8；粮 +4", effects: [{ k: "body", v: -8 }, { k: "grain", v: 4 }], then: "你去了，做运粮的民夫。一天两升米，走在队伍最后。" }
      ]
    },
    {
      id: "ej8.yishe", cat: "乡里", title: "义舍", age: [20, 60], weight: 11,
      years: [330, 420],
      text: [
        "路边有人立了义舍，供行人歇脚，舍里有粥。",
        "立舍的是个商人，说他早年逃难时，在路上饿过三天。",
        "他请人帮着看舍。"
      ],
      options: [
        { text: "去帮着看舍", hint: "粮 −4；声望 +8", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 8 }], then: "你看了两年舍。来歇脚的有官、有贼、有逃难的，你都给一碗粥。" },
        { text: "捐一石米", hint: "粮 −2；声望 +4", effects: [{ k: "grain", v: -2 }, { k: "fame", v: 4 }], then: "你捐了一石。商人在墙上写了你的名字，写得很小。" },
        { text: "不参与", hint: "无得无失", effects: [], then: "你没参与。那个义舍开了七年，后来塌了。" }
      ]
    },
    {
      id: "ej8.tuodi", cat: "官府", title: "侨郡", age: [20, 55], weight: 12, when: { minKnowledge: 25 },
      years: [317, 420],
      text: [
        "侨郡的太守缺一个主簿。",
        "这个郡在纸上，实地在别人的郡里。",
        "有人说：「去那里做官，管的是名册，不是人。」"
      ],
      options: [
        { text: "去", hint: "官位 +6；银钱 +2", effects: [{ k: "official", v: 6 }, { k: "silver", v: 2 }], then: "你去了。衙门三间屋，管着两千多户白籍的名字。" },
        { text: "不去", hint: "学识 +3", effects: [{ k: "knowledge", v: 3 }], then: "你没去。那个位子空了半年，后来给了一个流民帅的侄子。" },
        { text: "去，趁机把白籍改黄籍", hint: "官位 +4；或有查", effects: [{ k: "official", v: 4 }, { k: "silver", v: 4 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "official", v: -8 }, { k: "body", v: -6 }], loseNote: "土断的使者来了，查出改籍的事。革职，杖二十。" }, then: "你在簿上动了手脚，把三十多户改成了黄籍。每户收了两百文。" }
      ]
    }
  ]);

  /* ══════════ 南北朝 ══════════ */
  B.eraEvents.ns = (B.eraEvents.ns || []).concat([

    {
      id: "ns8.miefo", cat: "方外", title: "灭佛", age: [16, 60], weight: 15, once: true,
      years: [446, 578],
      text: [
        "{{三武灭佛|北魏太武帝、北周武帝等毁佛，僧尼还俗，寺产入官}}。诏下：沙门不敬王者者，诛。",
        "县里的寺院，三日之内要清空。",
        "寺里的僧人，站在门口，不知道往哪儿去。"
      ],
      options: [
        { text: "收留两个僧人", hint: "粮 −4；声望 +6；或有祸", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }], loseNote: "被查出窝藏僧尼。打了三十板，罚了钱。" }, then: "你把两个僧人藏在柴房。他们住了四十天，走的时候给你念了一段经。" },
        { text: "去寺里搬东西", hint: "银钱 +5；声望 −5", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -5 }], then: "你搬了两口铜钟、三箱经卷。铜钟熔了，铸了钱。" },
        { text: "关门，不管", hint: "无得无失", effects: [], then: "你关了门。第二天，寺里的铜佛被拉走了，用牛车。" }
      ]
    },
    {
      id: "ns8.junhu", cat: "军旅", title: "军户", age: [16, 45], weight: 14, sex: "male",
      years: [420, 589],
      text: [
        "{{军户|南北朝兵家另立户籍，世代为兵，免赋役而不免征战}}。你家的军籍，已经三代。",
        "军户的田，比民户少；军户的命，比民户贱。",
        "今年点兵，一户出一丁。"
      ],
      options: [
        { text: "去", hint: "身体 −8；免赋；或有死", effects: [{ k: "body", v: -8 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.15, cause: "战阵" }, then: "你去了。军户的营在城西，一共八百户，都是世代当兵的。" },
        { text: "花钱改民籍", need: { minSilver: 7 }, hint: "银钱 −7；转民户", effects: [{ k: "silver", v: -7 }, { k: "fame", v: 2 }], then: "你花七两改了籍。书吏说：「改了，往后就缴赋了。」" },
        { text: "逃", hint: "身体 −10；或有捕", effects: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.1, cause: "捕亡" }, then: "你往南跑了。军籍上你的名字，还留着。" }
      ]
    },
    {
      id: "ns8.cunwu", cat: "乡里", title: "坞", age: [16, 60], weight: 13,
      years: [420, 589],
      text: [
        "{{坞壁|魏晋南北朝时为自卫所筑的堡垒村落，多有宗主统领}}。北边乱，村里的族长要筑坞。",
        "坞墙三丈，四角有望楼。筑起来要一年。",
        "族长说：「筑了，兵来了能守；不筑，年年被抢。」"
      ],
      options: [
        { text: "出工筑坞", hint: "身体 −10；声望 +6", effects: [{ k: "body", v: -10 }, { k: "fame", v: 6 }], then: "你筑了一年墙。夯土的时候，一天要打三千下。" },
        { text: "出钱不出工", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你出了三两。族长收了钱，记了一笔。" },
        { text: "搬到坞里住，不入坞籍", hint: "银钱 −2；或有逐", effects: [{ k: "silver", v: -2 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -5 }], loseNote: "族长说：「不入籍，兵来了不开门。」你只好入了。" }, then: "你搬进坞里，租了两间屋。坞籍上没你的名字。" }
      ]
    },
    {
      id: "ns8.zuoyi", cat: "营生", title: "作役", age: [16, 55], weight: 12,
      years: [420, 589],
      text: [
        "{{作役|南北朝工匠轮番服役，称「作」}}。你是木匠，今年轮到赴州城作三个月。",
        "州城在修佛塔。",
        "管作的官说：「做完了，给一张免役的凭。」"
      ],
      options: [
        { text: "去做", hint: "身体 −8；学识 +4", effects: [{ k: "body", v: -8 }, { k: "knowledge", v: 4 }], then: "你在塔上做了三个月。学会了做斗拱，也学会了看图纸。" },
        { text: "纳钱代作", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你缴了二两。管作的官收了，说：「下回不许。」" },
        { text: "逃作", hint: "身体 −4；或有勾", effects: [{ k: "body", v: -4 }, { k: "fame", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -4 }], loseNote: "被勾出来，押去做，还多做了三个月。" }, then: "你说家里老人病重。管作的官说：「病好了再来。」" }
      ]
    },
    {
      id: "ns8.yixue", cat: "学问", title: "学馆", age: [10, 25], weight: 12,
      years: [450, 589],
      text: [
        "县里新立了学馆，由一位致仕的太守主讲。",
        "他讲《论语》，也讲《孝经》。学费是一年一石米。",
        "他说：「乱世里，读书没什么用。但不读，就一辈子是那样的人。」"
      ],
      options: [
        { text: "去读", hint: "学识 +6；粮 −3", effects: [{ k: "knowledge", v: 6 }, { k: "grain", v: -3 }], then: "你读了三年。太守讲书慢，一句能讲一天。" },
        { text: "不去，家里缺人", hint: "粮 +2；学识 −2", effects: [{ k: "grain", v: 2 }, { k: "knowledge", v: -2 }], then: "你没去。那年秋天，家里的收成不错。" },
        { text: "白天做工，晚上去听", hint: "身体 −6；学识 +4", effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 4 }], then: "你白天做木工，晚上去听。听了两年，太守说你「可教」。" }
      ]
    },
    {
      id: "ns8.shuili", cat: "乡里", title: "堰", age: [18, 60], weight: 13,
      years: [420, 589],
      text: [
        "村前的堰，是五十年前修的。今年塌了一段。",
        "堰里是一百多亩田。",
        "村里说：「按亩出工。」"
      ],
      options: [
        { text: "出工修堰", hint: "身体 −8；田 +3", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: 3 }], then: "你修了二十天堰。修好那天，村里杀了一头猪。" },
        { text: "出钱", need: { minSilver: 1 }, hint: "银钱 −1", effects: [{ k: "silver", v: -1 }], then: "你出了一百文。修堰的人里，有一半是雇来的。" },
        { text: "不去", hint: "田 −3；声望 −5", effects: [{ k: "field_wet", v: -3 }, { k: "fame", v: -5 }], then: "你没去。那年夏天旱，你家的田没浇上。" }
      ]
    },
    {
      id: "ns8.hunyin", cat: "家族", title: "门第婚", age: [15, 30], weight: 13,
      years: [420, 589],
      text: [
        "{{门第婚|南北朝士庶不婚，婚必门当户对}}。你家是寒门，邻村有一家士族，庶出的女儿二十了，还没嫁。",
        "媒人说：「他家愿意，但要你家出五十贯聘财。」",
        "五十贯，是你家三年的收成。"
      ],
      options: [
        { text: "凑聘财娶", hint: "银钱 −12；声望 +8；欠债", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 8 }, { k: "debt", v: { amt: 20, rate: 0.03, dueYear: 3 } }], setFlag: ["married"], then: "你娶了她。婚宴上，她家的亲戚坐了上席，一句话没跟你家的人说。" },
        { text: "不娶，找寒门人家", hint: "省银；声望 −2", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 4 }], setFlag: ["married"], then: "你娶了邻村铁匠的女儿。她会打铁，也会算账。" },
        { text: "入赘他家", hint: "声望 −6；银钱 +6", effects: [{ k: "fame", v: -6 }, { k: "silver", v: 6 }], setFlag: ["married"], then: "你入了赘。孩子生下来，姓她家的姓。" }
      ]
    },
    {
      id: "ns8.tongzi", cat: "市井", title: "钱陌", age: [18, 60], weight: 11,
      years: [420, 589],
      text: [
        "市上用的钱，论「陌」。一陌本该一百文，实际只给八十。",
        "官府收税，要足陌；民间交易，用短陌。",
        "商人说：「这是规矩。」"
      ],
      options: [
        { text: "照短陌用", hint: "银钱 +2", effects: [{ k: "silver", v: 2 }], then: "你买东西都用短陌。一百文的货，你给八十。" },
        { text: "缴税时凑足陌", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你缴税凑足陌。库吏数了三遍，说：「够了。」" },
        { text: "去衙门告商人用短陌", hint: "声望 +3；或有拖", effects: [{ k: "fame", v: 3 }], gamble: { winChance: 0.25, win: [], lose: [{ k: "silver", v: -3 }, { k: "fame", v: -4 }], loseNote: "衙门说「市例如此」。你还花了钱。" }, then: "你写了状子。衙门收了，压了三个月，判「照旧」。" }
      ]
    }
  ]);

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = (B.eraEvents.sui || []).concat([

    {
      id: "su8.juntian", cat: "赋役", title: "均田", age: [18, 60], weight: 16, sex: "male",
      years: [582, 618],
      text: [
        "{{均田|隋制：丁男受露田八十亩、永业田二十亩，妇人四十亩}}。",
        "里正来授田。村里可授的田，一户分不到三十亩。",
        "他说：「先记上，往后补。」"
      ],
      options: [
        { text: "记上，等补", hint: "田 +10；日后无补", effects: [{ k: "field_wet", v: 10 }, { k: "fame", v: 2 }], then: "册上写着你应受一百亩，实受三十亩。那七十亩，到他死也没补上。" },
        { text: "要足额，去远处领荒田", hint: "田 +30；身体 −8", effects: [{ k: "field_wet", v: 30 }, { k: "body", v: -8 }], then: "你往西走了六十里，领了五十亩荒田。开了三年，才开出二十亩。" },
        { text: "只受实有的，不多报", hint: "田 +6；省心", effects: [{ k: "field_wet", v: 6 }], then: "你说只要实有的。里正看了你一眼，说：「你这个人实在。」" }
      ]
    },
    {
      id: "su8.hanjia", cat: "官府", title: "含嘉仓", age: [18, 55], weight: 13,
      years: [605, 618],
      text: [
        "{{含嘉仓|隋唐洛阳大型官仓，储粮数百万石}}要人。一窖粮，五千石。",
        "守仓的斗子说：「来做事，一天两升米。」",
        "仓里的粮，比全县的人吃的还多。"
      ],
      options: [
        { text: "去仓里做工", hint: "身体 −6；粮 +4", effects: [{ k: "body", v: -6 }, { k: "grain", v: 4 }], then: "你在仓里做了半年。搬粮、翻晒、看鼠。仓里的粟，一窖一窖，看不到头。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。那年仓里丢了三百石，斗子被斩了两个。" },
        { text: "去，顺便记下仓里的数", hint: "学识 +3；或有险", effects: [{ k: "knowledge", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }], loseNote: "被人发现你在记数。打了二十板，赶出仓去。" }, then: "你记了三个月的进出数。仓里的帐，和实际对不上。" }
      ]
    },
    {
      id: "su8.daxing", cat: "赋役", title: "大兴城", age: [18, 55], weight: 15, sex: "male",
      years: [582, 605],
      text: [
        "{{大兴城|隋文帝建新都，后为唐长安城}}修了九年。",
        "今年征夫，一户一丁，做三个月。",
        "回来的人说：「城很大。城墙一丈厚。」"
      ],
      options: [
        { text: "去", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.12, cause: "工役" }, then: "你在城里做了三个月。搬砖、和泥、抬木。回来时，手上没有一块好皮。" },
        { text: "纳钱代役", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你缴了三两。县里雇了个流民去，他回来时瘦得认不出。" },
        { text: "逃役", hint: "身体 −8；或有捕", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.06, cause: "捕亡" }, then: "你躲进山里。家里被罚了一年的租。" }
      ]
    },
    {
      id: "su8.fo", cat: "方外", title: "复兴", age: [16, 60], weight: 12,
      years: [585, 618],
      text: [
        "{{隋文帝复兴佛法|文帝幼年养于尼寺，即位后广建寺塔，度僧尼}}。诏下：诸州各立一寺。",
        "县里的旧寺重修了，招僧五十。",
        "寺里的僧人说：「有度牒，免赋役。」"
      ],
      options: [
        { text: "出家", hint: "免赋役；离俗", effects: [{ k: "luck", v: 5 }, { k: "favor", v: -6 }, { k: "silver", v: 2 }], setFlag: ["seng"], then: "你剃了度。寺里给了你一间屋、一件僧衣、一本《法华经》。" },
        { text: "捐钱修寺", hint: "银钱 −3；声望 +5", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 5 }], then: "你捐了三两。寺里的碑上刻了你的名字。" },
        { text: "不入寺，照旧", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你没入。赋照缴，役照服。" }
      ]
    },
    {
      id: "su8.xiucai", cat: "科举", title: "秀才", age: [16, 35], weight: 12, when: { minKnowledge: 40 },
      years: [590, 618],
      text: [
        "{{秀才科|隋代科举常科之一，试方略策，取人极少}}。一州荐一人。",
        "州刺史亲自考，考的是方略。",
        "被荐的人，全州只一个。"
      ],
      options: [
        { text: "去应州考", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], gamble: { winChance: 0.2, win: [], lose: [{ k: "fame", v: -3 }], loseNote: "州考落选。刺史取了他外甥的同窗。" }, then: "你在州衙考了一天。题目问「安边之策」。" },
        { text: "不去，考进士", hint: "学识 +4", effects: [{ k: "knowledge", v: 4 }], then: "你没去。秀才科太难，进士科新开，取人多些。" },
        { text: "去，考前先谒刺史", hint: "官位 +6；或有物议", effects: [{ k: "official", v: 6 }, { k: "fame", v: -3 }], then: "你带了两匹绢去。刺史收了，说：「文章要自己写。」" }
      ]
    },
    {
      id: "su8.liuwai", cat: "官府", title: "流外", age: [18, 45], weight: 11, when: { minKnowledge: 20 },
      years: [590, 618],
      text: [
        "{{流外|隋唐官制中不入九品的胥吏}}。县里招书手，考的是写字和算。",
        "做了流外，一辈子不入品，但每月有俸。",
        "老书手说：「入了这一行，就别想出去。」"
      ],
      options: [
        { text: "去考", hint: "银钱 +3；官位 +3", effects: [{ k: "silver", v: 3 }, { k: "official", v: 3 }], then: "你考上了。每月俸钱一贯二百文，管一顿饭。" },
        { text: "不去，回家种田", hint: "无得无失", effects: [], then: "你没去。那个位子给了一个识字的屠户。" },
        { text: "去考，同时学律", hint: "学识 +4；官位 +5", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 5 }], then: "你考上了，还自学了《开皇律》。县里的刑名，渐渐都要问过你。" }
      ]
    },
    {
      id: "su8.shishu", cat: "市井", title: "市署", age: [18, 60], weight: 12,
      years: [590, 618],
      text: [
        "京城的东西两市，各有市署，管物价、度量、契税。",
        "开一个铺，要市署给帖。帖钱五百文。",
        "市署的人说：「给了帖，才许摆。」"
      ],
      options: [
        { text: "领帖开铺", need: { minSilver: 2 }, hint: "银钱 −1；营生", effects: [{ k: "silver", v: -1 }], gamble: { winChance: 0.6, win: [{ k: "silver", v: 5 }], lose: [{ k: "silver", v: -2 }], loseNote: "铺子开了三个月，没卖出多少。帖钱白花了。" }, then: "你领了帖，在西市租了个摊位，卖布。" },
        { text: "不领帖，沿街卖", hint: "银钱 +3；或有赶", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -4 }], loseNote: "市署的人来赶，货被没收了一半。" }, then: "你挑着担子沿街卖。一天走二十里。" },
        { text: "给市署的人做工", hint: "银钱 +2；学识 +2", effects: [{ k: "silver", v: 2 }, { k: "knowledge", v: 2 }], then: "你在市署帮着称东西、写契。学会了看秤。" }
      ]
    },
    {
      id: "su8.dingyi", cat: "家族", title: "析户", age: [20, 55], weight: 12,
      years: [590, 618],
      text: [
        "隋制：大功以下，皆令析籍，各为户头。",
        "你家兄弟三人，一直没分。",
        "里正说：「不分，就按一户算。一户一丁的役，你们三家出一个人就行；分了，三家各出一人。」"
      ],
      options: [
        { text: "不分", hint: "赋役合算；家中不宁", effects: [{ k: "silver", v: 3 }, { k: "favor", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -4 }], loseNote: "里正报了官，官府强令析籍，还罚了「合户」之罪。" }, then: "你们没分。三家人住一个院，共用一口锅。" },
        { text: "分", hint: "田 −8；各立门户", effects: [{ k: "field_wet", v: -8 }, { k: "fame", v: 2 }], then: "你们把田分了三份。你分到最远的那十亩，还有一头半的牛。" },
        { text: "分，但田不分，合着种", hint: "或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -5 }], loseNote: "查出「籍分产合」，罚了一年租。" }, then: "你们分了籍，田还是合着种。收成按三份分。" }
      ]
    }
  ]);

})(window.PACK_BASE);
