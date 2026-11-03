/* 生在何朝 · 各朝专有事件 卷十：隋、唐、五代
 * 隋补括户与进士科的起点，唐补租庸调到两税法的转折，五代补军镇之下的日子。
 * 制度不写成条文，写成一个户、一个人被条文按住时的具体处境。
 * 前缀 su6. / t6. / wd6.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = (B.eraEvents.sui || []).concat([

    {
      id: "su6.dasuo", cat: "官府", title: "貌阅", age: [16, 60], weight: 16, once: true,
      years: [585, 609],
      text: [
        "{{大索貌阅|隋代检括户口之法，验人相貌与户籍年龄是否相符}}。吏来验人，看脸，看牙，看手上的茧。",
        "你家簿上写着兄弟三人，实际只有两人。第三个是早年夭的，名字一直没销。",
        "吏说：「叫出来，我要看人。」"
      ],
      options: [
        { text: "说实话，三弟早亡", hint: "赋役减一口；或有追究", effects: [{ k: "fame", v: 2 }, { k: "silver", v: -2 }], then: "吏在簿上划掉了那个名字，说：「冒名者，罚一年租。」你缴了。" },
        { text: "找个人顶替", hint: "银钱 −4；保住三人的口分", effects: [{ k: "silver", v: -4 }, { k: "field_wet", v: 6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -12 }, { k: "silver", v: -8 }], loseNote: "顶替的是邻村的瘌痢头，吏一眼看出。全家罚三年，里正也吃了挂落。" }, then: "你找了外村的瘌痢头，给了他四两银子。他站在吏面前，很自然地叫了一声哥。" },
        { text: "自己去认罪", hint: "声望 −5；免于重罚", effects: [{ k: "fame", v: -5 }], then: "你自己说了。吏看了你一会儿，说：「老实人。」只罚了半年租。" }
      ]
    },
    {
      id: "su6.jinshi", cat: "科举", title: "进士", age: [16, 32], weight: 14, once: true,
      years: [607, 618],
      text: [
        "{{进士科|隋大业二年始置，以试策取士}}初开。州里荐了三人，你是其中一个。",
        "另外两个，一个是郡丞的侄子，一个是本地大族的子弟。",
        "考的是时务策。你从没写过。"
      ],
      options: [
        { text: "去考", hint: "身体 −4；学识 +6", effects: [{ k: "body", v: -4 }, { k: "knowledge", v: 6 }], gamble: { winChance: 0.22, win: [], lose: [{ k: "fame", v: -3 }], loseNote: "榜下没有你的名字。郡丞的侄子中了。" }, then: "你在考场里坐了整整一天。题目问的是「何以安民」，你写到天黑，写了三千字。" },
        { text: "让给家里的弟弟", hint: "声望 +4；学识 −2", effects: [{ k: "fame", v: 4 }, { k: "knowledge", v: -2 }], then: "你把荐书给了弟弟。他去了，也没中。回来那天，他不敢看你。" },
        { text: "考前先去拜主考", hint: "官位 +6；或有物议", effects: [{ k: "official", v: 6 }, { k: "fame", v: -4 }], then: "你备了两匹绢。主考收下了，说了句「文章自己写」。榜上，你在第三。" }
      ]
    },
    {
      id: "su6.zuyong", cat: "赋役", title: "租调力役", age: [18, 60], weight: 16, sex: "male",
      years: [582, 618],
      text: [
        "{{租调力役|隋制：丁男一床，租粟三石，调绢二丈、绵三两；役每年二十日}}。",
        "今年修运河，役期从二十日加到了一百二十日。",
        "县里说：「不去者，输庸。一日折绢三尺。」"
      ],
      options: [
        { text: "去服役", hint: "身体 −12；或有死伤", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.12, cause: "劳役" }, then: "你被编到汴州段。挖河的人排成一条线，从早到晚，只听见铁锹声。" },
        { text: "输庸折绢", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "三百六十尺绢，折了十二匹。你把绢交上去，手抖了一下。" },
        { text: "逃役，躲进山里", hint: "身体 −8；家中顶罪", effects: [{ k: "body", v: -8 }, { k: "fame", v: -8 }], gamble: { deathChance: 0.06, cause: "捕役" }, then: "你躲进南山。第八天，家里托人捎来话：父亲被带走了。" }
      ]
    },
    {
      id: "su6.yicang", cat: "乡里", title: "义仓", age: [20, 65], weight: 13,
      years: [585, 618],
      text: [
        "{{义仓|隋代置于乡里的粮仓，丰年纳粟，歉年赈给}}。里正说，上户纳一石，中户七斗，下户四斗。",
        "你家算中户。",
        "去年旱，义仓开过一回，一家分了二斗。"
      ],
      options: [
        { text: "照数纳", hint: "粮 −7", effects: [{ k: "grain", v: -7 }, { k: "fame", v: 3 }], then: "你挑了七斗粟去仓里。仓吏用斗刮平，刮得很仔细。" },
        { text: "报成下户", hint: "粮 −4；或有核", effects: [{ k: "grain", v: -4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -6 }, { k: "grain", v: -3 }], loseNote: "里正知道你家的田数，说你装穷。补纳，还加了一成。" }, then: "你说家里只有八亩田。里正看了看你家的牛，没说话，记了下户。" },
        { text: "不纳", hint: "声望 −6；日后无赈", effects: [{ k: "fame", v: -6 }], schedule: [{ inYears: 3, effects: [{ k: "grain", v: -12 }], note: "大旱，义仓放粮，册上无你。" }], then: "你说仓里的粮从来分不到自己头上。里正说：「那就不记你了。」" }
      ]
    },
    {
      id: "su6.fubing", cat: "军旅", title: "鹰扬", age: [18, 40], weight: 13, sex: "male",
      years: [590, 618],
      text: [
        "{{鹰扬府|隋代府兵基层组织，隶十二卫}}点兵。凡军户，二十岁入府，六十免。",
        "你家是军户。父亲服役了三十七年，去年才免。",
        "点兵的名册上，写着你的名字。"
      ],
      options: [
        { text: "入府", hint: "身体 −5；martial +6；免租调", effects: [{ k: "body", v: -5 }, { k: "martial", v: 6 }, { k: "silver", v: 2 }], then: "你领了弓一刀一。刀是父亲用过的，刀柄上还留着他磨出的凹。" },
        { text: "出钱免军籍", need: { minSilver: 8 }, hint: "银钱 −8；此后纳租调", effects: [{ k: "silver", v: -8 }], then: "你把八两银子递过去。书吏在册上写了「愿纳资免」，笔尖顿了顿。" },
        { text: "替父亲去边镇", hint: "身体 −10；声望 +5", effects: [{ k: "body", v: -10 }, { k: "fame", v: 5 }], gamble: { deathChance: 0.1, cause: "边塞" }, then: "父亲已经免了，你替他去了。走的那天，他送到村口，什么也没说。" }
      ]
    },
    {
      id: "su6.maoyue", cat: "官府", title: "团貌", age: [19, 60], weight: 14,
      years: [590, 618],
      text: [
        "{{团貌|每年造籍前，将人丁集于一处，当面验看形貌}}。今年在村口的祠堂。",
        "全村的男人站成三排。吏一个一个看过去，看身高，看胡须，看有没有瘸。",
        "你的堂弟十七，还差一年成丁。他长得高。"
      ],
      options: [
        { text: "让堂弟往前站，混作成丁", hint: "家中多一丁；赋役加重", effects: [{ k: "fame", v: -3 }, { k: "silver", v: -3 }], then: "吏看了他一眼，写了「中男，貌壮」。此后的租调，多算了一个人。" },
        { text: "把堂弟往后拉", hint: "免了一丁之赋；或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "fame", v: -6 }, { k: "silver", v: -4 }], loseNote: "吏认得你家。说：「去年就这么高。」补算了一年。" }, then: "你把他拉到最后一排。他低着头，个子还是比旁边的人高半头。" },
        { text: "照实报", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], then: "你报了「中男，十七」。吏点点头。堂弟松了一口气。" }
      ]
    },
    {
      id: "su6.jiuDeng", cat: "家族", title: "九等", age: [20, 60], weight: 13,
      text: [
        "{{九等户|隋唐按资产分户为九等，据以定赋役轻重}}。县里来定户等。",
        "定等的吏在你家院子里转了一圈，看了看牛，看了看屋，看了看你母亲的棺木——那是十年前备下的。",
        "他在册上写了一个字，你看不清是四还是五。"
      ],
      options: [
        { text: "塞钱求降一等", need: { minSilver: 2 }, hint: "银钱 −2；赋役减一等", effects: [{ k: "silver", v: -2 }, { k: "fame", v: -2 }], then: "你把二两银子塞进他袖子。他把「四」改成了「五」，改得很轻。" },
        { text: "什么也不做", hint: "无得无失", effects: [], then: "他走了。册上定的是四等。此后的差役，比五等重三成。" },
        { text: "把棺木挪到柴房", hint: "身体 −3；或降一等", effects: [{ k: "body", v: -3 }], gamble: { winChance: 0.5, win: [], lose: [], loseNote: "吏早看过一眼，挪了也没用。" }, then: "你把棺木挪进柴房，用草席盖住。吏来时，正屋空了一大块。" }
      ]
    },
    {
      id: "su6.mokan", cat: "乡里", title: "石人", age: [16, 60], weight: 11,
      years: [605, 618],
      text: [
        "县里要立一块碑，颂郡守的德政。石料从南山运来，要一百二十人拉。",
        "里正点了你的名：「三天，管饭。」",
        "同去的老石匠说：「这石头拉到了，刻的是他的名字，不是我们的。」"
      ],
      options: [
        { text: "去拉石头", hint: "身体 −8；管饭", effects: [{ k: "body", v: -8 }, { k: "grain", v: 2 }], then: "一百二十人拉着石头走了三天。绳子勒进肩膀，磨破了又结痂。" },
        { text: "出钱雇人", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你雇了邻村一个闲汉。他回来说，石头比想象中重。" },
        { text: "在路上偷偷凿坏石面", hint: "声望 +3；或有追究", effects: [{ k: "fame", v: 3 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "夜里凿石被人看见。打了三十板，赔了石料钱。" }, then: "你半夜起来，在石头背面凿了几下。那个位置，将来会刻上生卒。" }
      ]
    }
  ]);

  /* ══════════ 唐 ══════════ */
  B.eraEvents.tang = (B.eraEvents.tang || []).concat([

    {
      id: "t6.zuyongdiao", cat: "赋役", title: "庸", age: [18, 60], weight: 17, sex: "male",
      years: [624, 780],
      text: [
        "{{租庸调|唐前期的赋役之法：租粟二石，调绢二丈，庸者每日折绢三尺}}。丁男岁役二十日，不役者输庸。",
        "今年县里要修堰，役三十日。",
        "里正说：「三十日以外的十日，算庸，可以折绢。」"
      ],
      options: [
        { text: "去修堰", hint: "身体 −9；省下折绢", effects: [{ k: "body", v: -9 }, { k: "silver", v: 2 }], then: "你在堰上抬了三十天石头。收工时，堰里的水第一次漫过了那片旱地。" },
        { text: "全折成绢", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "三十日的役，折了十八匹绢。你把绢堆在堂屋，堆得像一堵墙。" },
        { text: "让妻子去替", hint: "声望 −4；家中少一劳力", effects: [{ k: "fame", v: -4 }, { k: "favor", v: -3 }], then: "她去了。堰上不要女人，她在那儿站了一天，被赶了回来，绢照缴。" }
      ]
    },
    {
      id: "t6.xingjuan", cat: "科举", title: "行卷", age: [17, 34], weight: 15, when: { minKnowledge: 35 },
      years: [680, 905],
      text: [
        "{{行卷|唐代举子将所作诗文投献权贵，求其荐举}}。你要去长安，先得有人替你说话。",
        "父亲说：「把你写得最好的三十篇抄出来，一家一家送。」",
        "你抄了七天。抄到第二十篇时，觉得每一句都不像自己写的。"
      ],
      options: [
        { text: "去投权贵之门", hint: "银钱 −5；学识 +4；或有知遇", effects: [{ k: "silver", v: -5 }, { k: "knowledge", v: 4 }], gamble: { winChance: 0.3, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "三十篇投出去，只回来两句客气话。" }, then: "你在长安住了半年，投了十一家。有七家连门房都没让进。" },
        { text: "埋头再读三年", hint: "学识 +8；银钱 −2", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -2 }], then: "你在寺里借了一间屋，读了三年。读完了《文选》，又读了一遍。" },
        { text: "托同乡的进士引荐", need: { minFame: 20 }, hint: "声望 −3；官位 +6", effects: [{ k: "fame", v: -3 }, { k: "official", v: 6 }], then: "同乡姓崔，开元十五年的进士。他看了你的卷子，说：「文可以，人太直。」还是替你写了一封。" }
      ]
    },
    {
      id: "t6.mingjing", cat: "科举", title: "明经", age: [16, 40], weight: 14,
      years: [630, 905],
      text: [
        "{{明经|唐代科举常科之一，试帖经、墨义，较进士易中}}。进士科一年取二三十人，明经取一百多。",
        "先生劝你：「你的记性好，读明经，三年可中。进士，十年也未必。」",
        "你父亲想让你考进士。"
      ],
      options: [
        { text: "从先生，考明经", hint: "学识 +5；易中，官位低", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 6 }], then: "你把《礼记》《左传》背得滚瓜烂熟。放榜那年，你在第一百零四名。" },
        { text: "从父亲，考进士", hint: "学识 +7；难中", effects: [{ k: "knowledge", v: 7 }, { k: "fame", v: 3 }], gamble: { winChance: 0.14, win: [], lose: [{ k: "fame", v: -5 }, { k: "silver", v: -4 }], loseNote: "落第。你在长安又住了三年，钱花完了才回家。" }, then: "你选了进士。父亲把家里仅有的两匹马卖了一匹，给你做盘缠。" },
        { text: "两科都不考，去做幕僚", hint: "银钱 +4；官位 +4", effects: [{ k: "silver", v: 4 }, { k: "official", v: 4 }], then: "你去了河东节度使的幕府，管文书。一个月四贯钱，管吃住。" }
      ]
    },
    {
      id: "t6.shenyan", cat: "官府", title: "身言书判", age: [22, 50], weight: 13, when: { minKnowledge: 30 },
      years: [660, 905],
      text: [
        "{{铨选|唐代选官，以身、言、书、判四事试之}}。你考中了，但要等选。",
        "吏部的郎中说：「你的身、言、书都可以。判，写三件案子。」",
        "判，是拟判词。你没做过官，没判过案。"
      ],
      options: [
        { text: "照律文写", hint: "学识 +4；官位 +8", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 8 }], then: "你按《永徽律》一条一条写。郎中说：「太严，但没写错。」" },
        { text: "写得宽一点", hint: "声望 +4；官位 +5", effects: [{ k: "fame", v: 4 }, { k: "official", v: 5 }], then: "三件案子，你都判了减一等。郎中说：「你的心软，做县尉怕是不够。」" },
        { text: "托人打听考官喜好", need: { minSilver: 4 }, hint: "银钱 −4；官位 +12", effects: [{ k: "silver", v: -4 }, { k: "official", v: 12 }], then: "你打听到郎中喜好骈体。三件判词，你写成了六朝文的样子。他看得很高兴。" }
      ]
    },
    {
      id: "t6.tuanmao", cat: "官府", title: "貌阅", age: [20, 60], weight: 13,
      years: [640, 780],
      text: [
        "三年一造籍。今年{{貌阅|唐制，造籍时验人形貌，以防诈冒}}，吏要看人。",
        "你的父亲五十九，明年六十，就该免役了。",
        "吏翻着簿子说：「五十九？看着像五十。」"
      ],
      options: [
        { text: "请吏照实记", hint: "声望 +2；父亲再役一年", effects: [{ k: "fame", v: 2 }, { k: "silver", v: -2 }], then: "吏记了「五十九」。父亲又役了一年。他回来时，腰弯了。" },
        { text: "塞钱请改六十", need: { minSilver: 2 }, hint: "银钱 −2；父亲免役", effects: [{ k: "silver", v: -2 }, { k: "favor", v: 4 }], then: "吏把「五十九」改成了「六十」。父亲从此不再服役。他活到七十三。" },
        { text: "让父亲装老", hint: "身体 −2；或有验", effects: [{ k: "body", v: -2 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -6 }, { k: "silver", v: -3 }], loseNote: "吏要看牙。父亲的牙太齐了。诈老，罚了一年租。" }, then: "父亲弓着背，走路一步一停。吏看了很久，说：「行吧。」" }
      ]
    },
    {
      id: "t6.liangshui", cat: "赋役", title: "两税", age: [18, 65], weight: 18, once: true,
      years: [780, 805],
      text: [
        "{{两税法|780 年杨炎推行，废租庸调，按资产定户等，分夏秋两次征收}}。户无主客，以见居为簿；人无丁中，以贫富为差。",
        "县里来重定户等。",
        "你家有田三十亩、牛一头、屋五间。按新法，这些都算资产。"
      ],
      options: [
        { text: "照实报资产", hint: "税重；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "你家定为三等。夏税缴绢六匹，秋税缴粟十二石。此后再不服役。" },
        { text: "把牛报成邻家的", hint: "银钱 +4；或有查", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -8 }, { k: "silver", v: -10 }], loseNote: "邻家不认。查出隐产，罚了两倍。" }, then: "你把牛牵到邻家过了一夜。定等那天，你家只有田和屋。" },
        { text: "把田分记在三个儿子名下", hint: "税减；或有并户", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -3 }], schedule: [{ inYears: 4, effects: [{ k: "silver", v: -8 }], note: "县里查并户，把三户合为一户，补征四年。" }], then: "你把三十亩田分记在三子名下，一户十亩，都成了下等。" }
      ]
    },
    {
      id: "t6.mubing", cat: "军旅", title: "募兵", age: [18, 40], weight: 14, sex: "male",
      years: [737, 907],
      text: [
        "{{募兵|开元二十五年，废府兵，改募长征健儿}}。应募者给田宅，家口随军。",
        "招兵的人说：「来了就是职业兵，一辈子吃这碗饭。」",
        "府兵制已经废了。你父亲那一辈的军籍，如今不管用了。"
      ],
      options: [
        { text: "应募", hint: "身体 −5；银钱 +3；从此是兵", effects: [{ k: "body", v: -5 }, { k: "silver", v: 3 }, { k: "martial", v: 8 }], setFlag: ["changzheng"], then: "你领了口粮、军衣、一把陌刀。刀很重，要两只手才举得起来。" },
        { text: "不去，留在乡里", hint: "赋役加重", effects: [{ k: "silver", v: -3 }], then: "你留了下来。此后十年，赋役一年比一年重，因为兵要钱。" },
        { text: "应募，做军中书手", need: { minKnowledge: 30 }, hint: "学识 +3；官位 +5", effects: [{ k: "knowledge", v: 3 }, { k: "official", v: 5 }], then: "你被分去做书手，管全军的粮账。一个月多五百文，不用上阵。" }
      ]
    },
    {
      id: "t6.jiedushi", cat: "世变", title: "藩镇", age: [18, 60], weight: 15,
      years: [755, 907],
      text: [
        "{{藩镇|安史之乱后，节度使拥兵自重，赋税不入朝廷}}。我们这一州，赋税不往长安送，送往镇里。",
        "镇里的留后说：「朝廷的诏书，你们不必看。」",
        "邻县不缴，被派了五百兵去。"
      ],
      options: [
        { text: "缴给镇里", hint: "银钱 −5；保一时平安", effects: [{ k: "silver", v: -5 }], then: "你把绢和粟送到镇里。收粮的军校数了数，说：「今年多缴了两成，我记着。」" },
        { text: "偷偷缴给朝廷", hint: "声望 +6；或有祸", effects: [{ k: "fame", v: 6 }], gamble: { winChance: 0.35, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -12 }], loseNote: "押运的人被截住了。你被带到镇里，打了一顿，家产抄没一半。" }, then: "你托人把绢运往长安。走的是小路，绕了四百里。" },
        { text: "两边都不缴，拖着", hint: "银钱 +4；两边得罪", effects: [{ k: "silver", v: 4 }, { k: "grudge", v: 6 }], then: "你说年成不好。镇里来催过两次，朝廷的使者来催过一次，都空手回去。" }
      ]
    },
    {
      id: "t6.huji", cat: "家族", title: "分家", age: [20, 55], weight: 13,
      text: [
        "{{别籍异财|唐律：祖父母、父母在，子孙不得别籍异财}}。你要分家，得父母同意。",
        "你有兄弟三人，田三十亩。合着过，一年到头吵；分开过，一人十亩，谁都活不好。",
        "父亲说：「我还没死。」"
      ],
      options: [
        { text: "不分，忍着", hint: "声望 +4；家中不宁", effects: [{ k: "fame", v: 4 }, { k: "favor", v: -4 }], then: "你没分。此后十年，一大家人挤在一个院子里，谁家的鸡下了蛋都要吵。" },
        { text: "请族老来说", hint: "银钱 −2；分成三份", effects: [{ k: "silver", v: -2 }, { k: "field_wet", v: -8 }], then: "族老来了三个。田分三份，你分到最远的那十亩，还有一口破锅。" },
        { text: "偷偷另立户", hint: "田 +10；或有罪", effects: [{ k: "field_wet", v: 10 }, { k: "fame", v: -6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "被兄弟告了。依律徒一年，纳赎免刑。" }, then: "你在镇上另立了一户。父亲知道后，三个月没跟你说话。" }
      ]
    },
    {
      id: "t6.huangce", cat: "赋役", title: "手实", age: [20, 60], weight: 13,
      years: [640, 780],
      text: [
        "每年造籍，先要各户自报{{手实|唐代户口登记的第一步，户主自报家口田宅}}。",
        "里正发下一张纸：「田几亩，牛几头，奴几人，一并写上。写少了，日后查出，加倍。」",
        "你家有一头牛、十二亩田，还有一个雇工。"
      ],
      options: [
        { text: "照实写", hint: "赋役照实；声望 +3", effects: [{ k: "fame", v: 3 }, { k: "silver", v: -2 }], then: "你写了「田十二亩，牛一头，雇工一人」。里正说：「这样写，我放心。」" },
        { text: "牛不写", hint: "银钱 +3；或有查", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "三年后大括，牛在圈里。补税并罚。" }, then: "你没写牛。牛还在圈里，只是不敢牵出去耕地。" },
        { text: "把雇工写成亲戚", hint: "免一人之赋；或有核", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -2 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -6 }, { k: "silver", v: -4 }], loseNote: "里正认得那个雇工，他姓周，你家姓李。" }, then: "你写「表弟李三」。里正看了那雇工一眼，没说什么。" }
      ]
    }
  ]);

  /* ══════════ 五代 ══════════ */
  B.eraEvents.wudai = (B.eraEvents.wudai || []).concat([

    {
      id: "wd6.yabing", cat: "军旅", title: "牙兵", age: [17, 45], weight: 16, sex: "male",
      years: [907, 960],
      text: [
        "{{牙兵|节度使亲军，骄横难制，常废立主帅}}。镇里有三千牙兵，吃双份粮。",
        "牙兵的一个都头路过你家门口，说：「你家这个儿子，跟我走。」",
        "他不是在问。"
      ],
      options: [
        { text: "跟着走", hint: "身体 −4；银钱 +4；从此是牙兵", effects: [{ k: "body", v: -4 }, { k: "silver", v: 4 }, { k: "martial", v: 6 }], then: "你跟着他走了。营里有酒有肉，也有半夜的刀声。" },
        { text: "跪下来求他放过", hint: "声望 −5；身体 −3", effects: [{ k: "fame", v: -5 }, { k: "body", v: -3 }], then: "你跪在门口。他看了你一会儿，踢了你一脚，走了。" },
        { text: "把家里的钱都给他", need: { minSilver: 4 }, hint: "银钱 −4；保住儿子", effects: [{ k: "silver", v: -4 }], then: "你把四两银子包在布里递过去。他掂了掂，说：「这钱不够买一条命，但够了。」" }
      ]
    },
    {
      id: "wd6.kuotian", cat: "赋役", title: "括田", age: [20, 60], weight: 15,
      years: [907, 960],
      text: [
        "{{括田|五代诸朝清查隐田，以增赋税}}。使者带着弓手来量田，量出的数，比旧籍多三成。",
        "多出来的三成，要补缴三年的租。",
        "使者的书吏说：「不缴的，田入官。」"
      ],
      options: [
        { text: "补缴", hint: "银钱 −8；田保住", effects: [{ k: "silver", v: -8 }], then: "你卖了半年的存粮，又借了两贯。补缴完，田契上盖了新印。" },
        { text: "把多出的三成田献给寺院", hint: "田 −4；免了补缴", effects: [{ k: "field_wet", v: -4 }, { k: "luck", v: 3 }], then: "你把河那边四亩献给了寺里。使者来查，那四亩已挂在寺名下，量不得了。" },
        { text: "抗着不缴", hint: "或有强制", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "field_wet", v: -10 }, { k: "body", v: -8 }], loseNote: "弓手来了。田入官，你被押着在田头站了一天。" }, then: "你说这田是祖上传下来的，量错了。使者说：「那你写状子。」" }
      ]
    },
    {
      id: "wd6.niupi", cat: "赋役", title: "牛皮钱", age: [18, 60], weight: 14,
      years: [907, 960],
      text: [
        "{{牛皮钱|五代时牛皮官买，民间不得私藏，后折钱征收}}。凡农家死牛，皮要缴官，缴不出就纳钱。",
        "你家的老牛前日死了。",
        "吏说：「皮呢？没有皮，纳五百文。」"
      ],
      options: [
        { text: "纳钱", need: { minSilver: 1 }, hint: "银钱 −1", effects: [{ k: "silver", v: -1 }], then: "你数了五百文。吏把钱串好，看了看院里那张还没剥的皮，没说话。" },
        { text: "把皮藏起来，说被狗拖走了", hint: "省了钱；或有查", effects: [{ k: "silver", v: 1 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -4 }, { k: "fame", v: -5 }], loseNote: "邻家告了。搜出牛皮，罚了两千文。" }, then: "你把皮埋在屋后的粪堆下。吏在院里转了一圈，走了。" },
        { text: "把皮送给都头", hint: "声望 −2；日后有靠", effects: [{ k: "favor", v: 6 }, { k: "fame", v: -2 }], then: "你把皮送到都头家里。他收下了，说：「往后有事，来找我。」" }
      ]
    },
    {
      id: "wd6.quqian", cat: "市井", title: "曲钱", age: [20, 60], weight: 12,
      years: [907, 960],
      text: [
        "{{曲钱|五代官府垄断酒曲，民间酿酒须买官曲}}。一斤曲，官价三十文；私曲，罚。",
        "你家每年自酿两缸酒，一缸过年，一缸待客。",
        "今年乡里新设了曲务，说凡酿者，先买官曲。"
      ],
      options: [
        { text: "买官曲", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你买了五斤官曲。酿出来的酒，味道比往年的淡。" },
        { text: "照旧自己制曲", hint: "银钱 +1；或有查", effects: [{ k: "silver", v: 1 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -5 }, { k: "body", v: -6 }], loseNote: "曲务的人闻着味找上门。酒缸砸了，人被带走关了七天。" }, then: "你照旧用老曲。酒香飘到巷口，你赶紧把门关上。" },
        { text: "不酿了", hint: "省了麻烦；过年无酒", effects: [{ k: "favor", v: -2 }], then: "那年过年，桌上只有一碗热水。孩子们看着别人家的灯。" }
      ]
    },
    {
      id: "wd6.chaoting", cat: "世变", title: "换朝", age: [16, 70], weight: 15,
      years: [907, 960],
      text: [
        "十三年里换了五个朝廷。今年又换了。",
        "县里的官没换，里正没换，税也没少。只是城门上的旗换了颜色。",
        "有人问你：「如今是什么年号？」"
      ],
      options: [
        { text: "说新朝的年号", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], then: "你说了新朝的年号。问的人点点头，说：「记着了，明年还换。」" },
        { text: "说旧朝的年号", hint: "或有祸", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "被人告了，说心怀旧朝。关了半个月，纳钱才放。" }, then: "你说了旧年号。问的人看了你一眼，走了。" },
        { text: "说不记得了", hint: "无人追究", effects: [], then: "你说不记得了。那人笑了：「也好，省得记。」" }
      ]
    },
    {
      id: "wd6.liumin", cat: "世变", title: "流民", age: [16, 65], weight: 15,
      years: [920, 960],
      text: [
        "北边打过来了，流民一波一波往南。",
        "昨夜有人在村口的土地庙里生了火。今早去看，一家五口，三个还活着。",
        "里正说：「不许留。上头有令。」"
      ],
      options: [
        { text: "偷偷给他们一斗米", hint: "粮 −3；声望 +5", effects: [{ k: "grain", v: -3 }, { k: "fame", v: 5 }], then: "你把米放在庙门口，敲了两下墙就走了。回头看时，一个小孩正抱着米袋。" },
        { text: "照着里正的话，赶他们走", hint: "声望 −4；保住自己", effects: [{ k: "fame", v: -4 }], then: "你拿着扁担站在庙门口。那个男人看了你很久，抱起孩子走了。" },
        { text: "带回家，说是远亲", hint: "粮 −6；或有牵连", effects: [{ k: "grain", v: -6 }, { k: "favor", v: 8 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -6 }], loseNote: "查出来是流民。你被罚了钱，那家人被押走了。" }, then: "你把他们带回家，说是姑母家的表兄。村里人没见过你姑母。" }
      ]
    }
  ]);

})(window.PACK_BASE);
