/* 生在何朝 · 各朝专有事件 卷十一：北宋、辽、西夏、金、南宋
 * 这一卷的主题是「谁在册上，谁不在册上」。
 * 宋靠户等与差役把人分层，辽金靠猛安谋克与头下把人口连人带地一起搬，
 * 西夏夹在中间，靠榷场和蕃汉两套文字活着。
 * 前缀 b6. / l6. / xx6. / j6. / n6.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = (B.eraEvents.bsong || []).concat([

    {
      id: "b6.chaiyi", cat: "赋役", title: "差役", age: [20, 60], weight: 17, sex: "male",
      years: [960, 1085],
      text: [
        "{{差役|宋前期按户等轮差，上户充里正、户长，中户充壮丁}}。里正一职，押税、催粮、赔补欠数。",
        "本村的里正轮到你父亲。他五十六了。",
        "前任里正说：「我做了三年，赔了四十贯。」"
      ],
      options: [
        { text: "替父亲去做", hint: "身体 −6；银钱 −4；或有赔补", effects: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -12 }], loseNote: "三户逃了，欠的税由里正补。你把家里的牛卖了。" }, then: "你接了里正的牌子。头一件差事，是催三家欠税的。" },
        { text: "出钱免役", need: { minSilver: 6 }, hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "你缴了免役钱。差役的名册上，你家的名字划掉了。" },
        { text: "分家，把户等降下来", hint: "田 −8；户等降一中", effects: [{ k: "field_wet", v: -8 }, { k: "fame", v: -3 }], then: "你把田分记在两个儿子名下，自己只留八亩。户等从二等降到四等，差役轮不到了。" }
      ]
    },
    {
      id: "b6.mianyi", cat: "赋役", title: "免役", age: [20, 60], weight: 16, once: true,
      years: [1070, 1085],
      text: [
        "{{免役法|王安石新法，废差役，改按户等出钱募人充役}}。上户输钱，下户减半，单丁女户免。",
        "你家的户等是三等，一年该输免役钱八贯。",
        "里正说：「这是新法。不输的，依上户论。」"
      ],
      options: [
        { text: "输钱", hint: "银钱 −8；从此不服差役", effects: [{ k: "silver", v: -8 }], then: "你缴了八贯。此后十年，再没人来叫你去应差。" },
        { text: "把田典给邻家，降户等", hint: "田 −6；银钱 +4", effects: [{ k: "field_wet", v: -6 }, { k: "silver", v: 4 }], then: "你把六亩田典给了邻家，说好三年赎回。三年后，你家赎回的只有四亩。" },
        { text: "说家里单丁", hint: "免钱；或有查", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "silver", v: -12 }, { k: "fame", v: -6 }], loseNote: "户籍上有兄弟二人。诈称单丁，加倍追缴。" }, then: "你说家中只有你一个男丁。里正翻了翻簿子，嗯了一声。" }
      ]
    },
    {
      id: "b6.baojia", cat: "军旅", title: "保甲", age: [18, 50], weight: 14, sex: "male",
      years: [1071, 1085],
      text: [
        "{{保甲法|十家为一保，五保为一大保，农隙习武}}。凡保丁，五日一操。",
        "操练在村口的打谷场。教头是禁军下来的，手里一根木棍。",
        "他说：「练得好，将来能补军。练不好，也是要上阵的。」"
      ],
      options: [
        { text: "认真操练", hint: "身体 −5；martial +6", effects: [{ k: "body", v: -5 }, { k: "martial", v: 6 }], then: "你练了两年。刀、枪、弓，都摸过。教头说你的马步扎得稳。" },
        { text: "出钱请人代操", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你雇了村里的闲汉。他每次操练都去，练完还能领一份干粮。" },
        { text: "称病不去", hint: "身体 −2；或有罚", effects: [{ k: "body", v: -2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -4 }, { k: "body", v: -6 }], loseNote: "保长报了上去。罚钱，还被打了一顿。" }, then: "你说腰疼。保长来看了两次，第二次没进门。" }
      ]
    },
    {
      id: "b6.huming", cat: "科举", title: "糊名", age: [17, 35], weight: 15, when: { minKnowledge: 40 },
      years: [1000, 1127],
      text: [
        "{{糊名誊录|宋代科举糊去举子姓名，另命书吏誊抄试卷，以防作弊}}。你的字，考官看不见了。",
        "原先你写得一手好字，先生说过，这一笔字能抵二十分。",
        "如今誊录官抄完，你的卷子跟别人的一模一样。"
      ],
      options: [
        { text: "把文章写扎实", hint: "学识 +6；或有中", effects: [{ k: "knowledge", v: 6 }], gamble: { winChance: 0.28, win: [], lose: [{ k: "fame", v: -3 }, { k: "silver", v: -3 }], loseNote: "落第。你的文章，考官连评语都没写。" }, then: "你不再琢磨字。你把《孟子》读了七遍，读到能背。" },
        { text: "托人打听誊录官", need: { minSilver: 4 }, hint: "银钱 −4；或有弊", effects: [{ k: "silver", v: -4 }, { k: "official", v: 8 }], gamble: { winChance: 0.3, win: [], lose: [{ k: "fame", v: -14 }, { k: "body", v: -6 }], loseNote: "科场案发，牵连者皆下狱。你被打了二十杖，终身不得应举。" }, then: "你打听到誊录所的一个书吏。他答应在抄的时候，把一处典故抄错，作为暗记。" },
        { text: "不再考，去做塾师", hint: "银钱 +4；学识 +3", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 3 }], then: "你回村开了个学馆。学生十二个，一年束脩二十四贯。" }
      ]
    },
    {
      id: "b6.mokan", cat: "官府", title: "磨勘", age: [25, 55], weight: 12, when: { minOfficial: 20 },
      years: [990, 1127],
      text: [
        "{{磨勘|宋代官员考课迁转之法，三年一勘，验其资历与功过}}。你任满三年，该转一官。",
        "吏部的人说：「你的历子（考课簿）上，有一年缺了考词。」",
        "缺的那一年，你在丁忧。"
      ],
      options: [
        { text: "据实申明丁忧", hint: "官位 −2；转官延一年", effects: [{ k: "official", v: -2 }], then: "你申明了。吏部说：「丁忧不在此例，但须补一份保状。」你找了三个同僚作保。" },
        { text: "请上司补一份考词", need: { minFame: 30 }, hint: "声望 −3；官位 +6", effects: [{ k: "fame", v: -3 }, { k: "official", v: 6 }], then: "上司姓王，替你把那一年的考词补上了，写的是「居丧尽礼」。" },
        { text: "塞钱给吏部书吏", need: { minSilver: 5 }, hint: "银钱 −5；官位 +10", effects: [{ k: "silver", v: -5 }, { k: "official", v: 10 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "fame", v: -12 }, { k: "official", v: -10 }], loseNote: "书吏被查，供出了你。降一官，调远郡。" }, then: "你把五两银子递过去。他看了看，把历子塞进了另一摞。" }
      ]
    },
    {
      id: "b6.fangtian", cat: "赋役", title: "方田", age: [22, 60], weight: 13,
      years: [1072, 1085],
      text: [
        "{{方田均税|丈量土地，按土质分五等定税，以纠隐田与税不均}}。方田官带着绳和竿来了。",
        "你家十二亩，旧籍上写的是下等，一亩纳三升。",
        "方田官量完，说：「你这块地，是二等。」"
      ],
      options: [
        { text: "认了", hint: "赋税加重；银钱 −4", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 3 }], then: "十二亩全改二等，一亩纳八升。你一年多缴六斗。" },
        { text: "请他把土质再看一遍", hint: "学识 +2；或有减免", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.4, win: [{ k: "silver", v: 3 }], lose: [{ k: "silver", v: -2 }], loseNote: "方田官重看了一遍，说还是二等，还多算了半分地。" }, then: "你带他走到地头，抓了一把土给他看。他捏了捏，说是沙壤。" },
        { text: "请他喝酒", need: { minSilver: 2 }, hint: "银钱 −2；或降等", effects: [{ k: "silver", v: -2 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -6 }], loseNote: "酒喝了，等没降。方田官说：「法度在此。」" }, then: "你在镇上的酒铺请了他一顿，花了二百文。" }
      ]
    }
  ]);

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = (B.eraEvents.liao || []).concat([

    {
      id: "l6.nanbeimian", cat: "官府", title: "两面官", age: [16, 60], weight: 15,
      years: [950, 1125],
      text: [
        "{{南北面官|辽制：北面官治契丹及诸游牧，南面官治汉人、渤海人}}。你是汉人，归南面官管。",
        "今年南面官要人去做县主簿。北面官也要人去看马。",
        "两边都来点你的名。"
      ],
      options: [
        { text: "去南面官处做书吏", hint: "学识 +4；官位 +6", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 6 }], then: "你在南面官的衙门里抄了三年公文。写的是汉字，用的是唐制。" },
        { text: "去北面官处牧马", hint: "身体 −5；martial +6", effects: [{ k: "body", v: -5 }, { k: "martial", v: 6 }], then: "你去了北面的牧场。那里的规矩是契丹话，你学了半年才会数马。" },
        { text: "两家都推掉", hint: "声望 −6；赋役加重", effects: [{ k: "fame", v: -6 }, { k: "silver", v: -2 }], then: "你说家中老母病重。两边都没再找你，只是你家的赋，从此没人替你说话。" }
      ]
    },
    {
      id: "l6.touxia", cat: "家族", title: "头下", age: [15, 55], weight: 14,
      years: [930, 1125],
      text: [
        "{{头下军州|辽代贵族以俘获或受赐人口所建之州，其民属领主}}。城西的韩家有一所。",
        "韩家说：「来我这儿，给你一头牛、十亩地。不缴官税，只缴我家的。」",
        "邻村已经去了九户。"
      ],
      options: [
        { text: "去投韩家", hint: "免官税；从此属人", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -5 }], setFlag: ["touxia"], then: "你领了一头牛、十亩地。韩家的管事在簿上记了你的名字，写在「头下户」一栏。" },
        { text: "不去", hint: "缴官税；身体 −3", effects: [{ k: "silver", v: -3 }, { k: "body", v: -3 }], then: "你没去。当年的官税缴了，役也服了。" },
        { text: "把大儿子送去做家奴", hint: "银钱 +4；骨肉分离", effects: [{ k: "silver", v: 4 }, { k: "favor", v: -8 }], then: "大儿子那年十一。韩家给了四两银子、两头羊。他走的时候，抱了一下你。" }
      ]
    },
    {
      id: "l6.woluduo", cat: "军旅", title: "宫卫", age: [16, 45], weight: 12, sex: "male",
      years: [940, 1125],
      text: [
        "{{斡鲁朵|辽代皇帝与皇后的宫卫，有兵有民，随行营移动}}。今年点宫卫，抽正户为{{著帐户|宫卫所属人户}}。",
        "被抽中的人，从此随捺钵四时迁徙，不常在家。",
        "名单上有你。"
      ],
      options: [
        { text: "去", hint: "身体 −8；银钱 +3；常年在外", effects: [{ k: "body", v: -8 }, { k: "silver", v: 3 }, { k: "martial", v: 5 }], then: "你跟着宫卫走了。春水、秋山，一年搬四次家。你妻子后来跟人走了。" },
        { text: "以马代役", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你献了一匹三岁的马。点兵的官看了看马的牙口，在册上画了个圈。" },
        { text: "让弟弟顶替", hint: "声望 −4；家中少一人", effects: [{ k: "fame", v: -4 }, { k: "favor", v: -6 }], then: "弟弟去了。三年后回来一次，脸黑了一层，说的话你听不太懂了。" }
      ]
    },
    {
      id: "l6.nabo", cat: "市井", title: "捺钵", age: [18, 60], weight: 12,
      years: [950, 1125],
      text: [
        "{{捺钵|辽帝四时行营，春水秋山，随行有市}}。今年春捺钵到了我们这条河。",
        "皇帝的行帐一扎，周围就生出市来：卖皮的、卖铁的、卖茶的，还有说书的。",
        "里正说：「去摆个摊，一天能挣二百文。」"
      ],
      options: [
        { text: "去摆摊", hint: "身体 −4；银钱 +4", effects: [{ k: "body", v: -4 }, { k: "silver", v: 4 }], then: "你卖了十二天。最好的一天，卖了三百二十文。收摊那日，行帐拔了，河滩上只剩车辙。" },
        { text: "去给行帐送柴", hint: "银钱 +2；身体 −6", effects: [{ k: "silver", v: 2 }, { k: "body", v: -6 }], then: "你送了十天柴。宫卫的人给钱很痛快，也打过人。你看见一个送水的被打断了腿。" },
        { text: "不去，在家种地", hint: "无得无失", effects: [], then: "你没去。那年春天，村里的年轻人都去了，田里只有老人。" }
      ]
    },
    {
      id: "l6.shengbian", cat: "世变", title: "边上", age: [16, 60], weight: 15,
      years: [960, 1125],
      text: [
        "辽与宋以白沟为界。界河两边，一边用宋钱，一边用辽钱，都认。",
        "你住在界河边上。今年宋人过来抢了一次，辽人过去抢了一次。",
        "两边抢的是同一批人。"
      ],
      options: [
        { text: "搬到南边去", hint: "田 −6；银钱 −3", effects: [{ k: "field_wet", v: -6 }, { k: "silver", v: -3 }], then: "你把田卖了，搬到南边六十里。新地方的地是沙地，一亩收不到两斗。" },
        { text: "留下，两边都交钱", hint: "银钱 −5；保平安", effects: [{ k: "silver", v: -5 }], then: "你给宋的巡检送了钱，也给辽的详稳送了钱。两边都收，都说「这是我们的人」。" },
        { text: "纠集村人自守", hint: "身体 −8；声望 +8", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.1, cause: "边上" }, then: "你把村里的青壮编了队，一共四十七人，用锄头、猎弓、木栅。守了两年。" }
      ]
    },
    {
      id: "l6.qidanwen", cat: "学问", title: "契丹字", age: [10, 30], weight: 11,
      years: [950, 1125],
      text: [
        "朝廷颁下{{契丹大字|辽太祖命人依汉字笔画所制}}。凡上衙门递状，须用契丹字或汉字，二者皆可。",
        "你认得汉字，不认契丹字。",
        "衙门的书吏说：「不会写，找人代写，一份三十文。」"
      ],
      options: [
        { text: "学契丹字", hint: "学识 +5；银钱 −1", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -1 }], then: "你跟着一个老书吏学了半年。契丹字比汉字少，但每个字都长得像汉字。" },
        { text: "花钱找人代写", hint: "银钱 −1", effects: [{ k: "silver", v: -1 }], then: "你每次递状都找人代写。代写的那个人，后来做了县里的书手。" },
        { text: "不学了，只画押", hint: "学识 −3；省事", effects: [{ k: "knowledge", v: -3 }], then: "你此后所有的文书，都只画一个押。押画得很像一只鸟。" }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx6.jianjun", cat: "军旅", title: "监军司", age: [16, 45], weight: 16, sex: "male",
      years: [1038, 1227],
      text: [
        "{{监军司|西夏分十二监军司，各统部落兵}}。你属左厢神勇军。",
        "点兵时，一人自备马、弓、箭三十支、粮一月。",
        "你没有马。"
      ],
      options: [
        { text: "买马入伍", need: { minSilver: 6 }, hint: "银钱 −6；martial +8", effects: [{ k: "silver", v: -6 }, { k: "martial", v: 8 }], then: "你买了一匹五岁的青马。卖马的人说：「这马在沙里跑得快。」" },
        { text: "做步卒", hint: "身体 −6；martial +4", effects: [{ k: "body", v: -6 }, { k: "martial", v: 4 }], then: "你被编在步卒队里，拿一张步弓、一把短刀。步卒走在马队后面，吃马队的土。" },
        { text: "出钱免", need: { minSilver: 8 }, hint: "银钱 −8；赋役加重", effects: [{ k: "silver", v: -8 }, { k: "fame", v: -3 }], then: "你缴了八两。监军司的官说：「不出人也行，那就多出粮。」" }
      ]
    },
    {
      id: "xx6.fanhan", cat: "学问", title: "蕃学", age: [8, 20], weight: 13,
      years: [1040, 1227],
      text: [
        "{{蕃学|西夏所设学校，教授西夏文，译汉籍为蕃书}}。县里新设了一所。",
        "先生说：「学蕃文，将来能做官；学汉文，只能记账。」",
        "你父亲想让你学汉文。"
      ],
      options: [
        { text: "学蕃文", hint: "学识 +6；官位 +4", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 4 }], then: "你学了三年蕃文。第一本读完的是译过来的《孝经》，字歪歪扭扭，读起来很慢。" },
        { text: "学汉文", hint: "学识 +5；银钱 +2", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: 2 }], then: "你学了汉文。学成后，给商队记账，一年能挣四两。" },
        { text: "两种都学", hint: "学识 +8；身体 −4", effects: [{ k: "knowledge", v: 8 }, { k: "body", v: -4 }], then: "你白天学蕃文，晚上学汉文。学了五年，两种都能读，两种都写不好。" }
      ]
    },
    {
      id: "xx6.quechang", cat: "市井", title: "榷场", age: [18, 60], weight: 14,
      years: [1050, 1227],
      text: [
        "{{榷场|宋夏边境的官方互市，宋人以茶、帛易夏人之马、盐}}。今年重开。",
        "你有一匹老马、三十斤盐。",
        "场里的牙人说：「茶最好卖。有茶，什么都能换。」"
      ],
      options: [
        { text: "贩盐过去", hint: "银钱 +5；或有夺", effects: [{ k: "silver", v: 5 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "路上遇了劫道的。盐没了，人被砍了一刀。" }, then: "你把三十斤盐背过界。宋人给的价是这边的三倍。" },
        { text: "贩马过去", hint: "银钱 +8；失一马", effects: [{ k: "silver", v: 8 }, { k: "martial", v: -2 }], then: "老马卖了十二贯。回程你走路，走了三天。" },
        { text: "留在场里做牙人", hint: "银钱 +3；学识 +2", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: 2 }], then: "你在场里替人讲价，抽一分佣。旺季一天能挣一百五十文。" }
      ]
    },
    {
      id: "xx6.xueyuan", cat: "赋役", title: "抄粮", age: [18, 60], weight: 13,
      years: [1040, 1227],
      text: [
        "西夏{{抄|西夏赋税之法，按亩征粮，另有力役}}。今年每亩纳一斗二升。",
        "你家有旱地二十亩。旱地一年收三斗，纳一斗二升。",
        "里正说：「不缴的，牵牛。」"
      ],
      options: [
        { text: "照缴", hint: "粮 −14", effects: [{ k: "grain", v: -14 }, { k: "fame", v: 2 }], then: "你缴了二十四斗。缸底能看见。" },
        { text: "报成荒地", hint: "粮 −8；或有勘", effects: [{ k: "grain", v: -8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "grain", v: -10 }, { k: "body", v: -6 }], loseNote: "勘灾的官来看，地里长着粟。牵走了牛，还打了人。" }, then: "你把河边那八亩报成荒地。里正去看了一眼，说：「草长得比粟高。」" },
        { text: "去求寺院出面", hint: "粮 −10；声望 −2", effects: [{ k: "grain", v: -10 }, { k: "fame", v: -2 }, { k: "luck", v: 2 }], then: "寺里的僧人替你说了句话，减了四斗。你给寺里添了二斤油。" }
      ]
    },
    {
      id: "xx6.hanren", cat: "家族", title: "汉户", age: [16, 60], weight: 12,
      years: [1040, 1227],
      text: [
        "你是汉户，住在夏人的村子里。种同样的地，缴同样的粮。",
        "村里分水，先给蕃户，后给汉户。",
        "今年轮到你家最后。水流到地里时，只剩一指深。"
      ],
      options: [
        { text: "忍着", hint: "粮 −6", effects: [{ k: "grain", v: -6 }], then: "你等到最后。一亩地只浇了半边，秋天收了一半。" },
        { text: "夜里去把水口挖开", hint: "粮 +4；或有争", effects: [{ k: "grain", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], loseNote: "被巡水的人抓住，打了一顿，还赔了水钱。" }, then: "你半夜起来，把水口挖宽了两尺。天亮之前，地浇透了。" },
        { text: "去衙门告", hint: "声望 +4；或有拖", effects: [{ k: "fame", v: 4 }, { k: "silver", v: -2 }], gamble: { winChance: 0.3, win: [], lose: [{ k: "fame", v: -4 }, { k: "silver", v: -3 }], loseNote: "状子递上去，压了半年。最后判的是「照旧例」。" }, then: "你写了状子，画了押。衙门收了，说：「等着。」" }
      ]
    },
    {
      id: "xx6.shouzhuo", cat: "世变", title: "坚壁", age: [16, 70], weight: 14,
      years: [1080, 1227],
      text: [
        "蒙古兵来了。西夏的城，一座一座地破。",
        "{{坚壁清野|战时尽收城外人口粮秣入城，使敌无所掠}}。官让城外的百姓都进城。",
        "城里的粮，只够三个月。"
      ],
      options: [
        { text: "进城", hint: "粮 −8；或有疫", effects: [{ k: "grain", v: -8 }, { k: "body", v: -6 }], gamble: { deathChance: 0.14, cause: "围城" }, then: "你带着一家进了城。城里挤了三万人，井边排到半夜。" },
        { text: "往南逃", hint: "身体 −10；家产尽弃", effects: [{ k: "body", v: -10 }, { k: "silver", v: -6 }], gamble: { deathChance: 0.16, cause: "乱兵" }, then: "你往南走。走了十天，路上没有水，只有车辙和死人。" },
        { text: "躲进山里", hint: "身体 −8；粮 −4", effects: [{ k: "body", v: -8 }, { k: "grain", v: -4 }], then: "你在山里挖了个窑洞，住了两个月。出来时，城已经破了。" }
      ]
    }
  ]);

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = (B.eraEvents.jin || []).concat([

    {
      id: "j6.mouke", cat: "军旅", title: "谋克", age: [16, 45], weight: 16, sex: "male",
      years: [1115, 1234],
      text: [
        "{{猛安谋克|金代女真兵民合一之制，三百户为谋克，十谋克为猛安}}。你是谋克里的一个正户。",
        "今年点兵，凡丁壮皆出。一谋克出甲兵百人。",
        "谋克勃堇说：「不去者，夺其地。」"
      ],
      options: [
        { text: "出丁入伍", hint: "身体 −6；martial +6；免赋", effects: [{ k: "body", v: -6 }, { k: "martial", v: 6 }, { k: "silver", v: 2 }], then: "你领了甲、弓、刀。甲是祖上传的，铁片用皮条串着，重六十斤。" },
        { text: "出钱雇人代", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你雇了一个汉人。他没有甲，只带了一把刀。" },
        { text: "把地卖了，降为佃户", hint: "田 −10；免兵役", effects: [{ k: "field_wet", v: -10 }, { k: "silver", v: 6 }, { k: "fame", v: -6 }], then: "你把十亩地卖给了谋克勃堇。他收了地，说：「你以后种我的地。」" }
      ]
    },
    {
      id: "j6.tuipai", cat: "赋役", title: "推排", age: [20, 60], weight: 15, once: true,
      years: [1160, 1234],
      text: [
        "{{通检推排|金代清查民户物力，据以定赋役}}。使者来推排，看牛、看树、看屋、看坟。",
        "你家的祖坟有十二棵松树。",
        "使者说：「松树也算物力。」"
      ],
      options: [
        { text: "认了，一并报上", hint: "赋役加重；银钱 −4", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 2 }], then: "十二棵松树算了三十贯物力。你家从三等升到二等，赋重了三成。" },
        { text: "夜里把松树砍了", hint: "免物力；失祖荫", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -6 }], then: "你砍了九棵，留下三棵最老的。使者来数，只数出三棵。" },
        { text: "说树是族里的公产", hint: "或有核", effects: [{ k: "fame", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }], loseNote: "族里没人替你作证。物力照算，还加了隐漏之罚。" }, then: "你说这十二棵树是族中共有的。使者说：「那把族老叫来。」" }
      ]
    },
    {
      id: "j6.nvzhenke", cat: "科举", title: "女真进士", age: [17, 35], weight: 12, when: { minKnowledge: 35 },
      years: [1173, 1234],
      text: [
        "{{女真进士科|金世宗大定十三年始设，以女真字试策论}}。你是女真户，识女真字。",
        "汉人考汉文经义，你考女真字策论。",
        "先生说：「这一科取人少，但中了就比汉人进士高一等。」"
      ],
      options: [
        { text: "去考", hint: "学识 +6；官位 +8", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 8 }], gamble: { winChance: 0.3, win: [], lose: [{ k: "fame", v: -3 }], loseNote: "落第。取人只十五个。" }, then: "你在考场里用女真字写策论。写完，自己读了一遍，觉得比汉文写得顺。" },
        { text: "改考汉文进士", hint: "学识 +8；或有物议", effects: [{ k: "knowledge", v: 8 }, { k: "fame", v: -3 }], gamble: { winChance: 0.18, win: [], lose: [{ k: "fame", v: -4 }, { k: "silver", v: -3 }], loseNote: "落第。同族的人说你「学汉儿」。", }, then: "你把女真字收起来，读了十年汉文。读到最后，女真字写得比汉文差了。" },
        { text: "不考，去做译史", hint: "银钱 +4；官位 +4", effects: [{ k: "silver", v: 4 }, { k: "official", v: 4 }], then: "你去了枢密院做译史，把汉文公文译成女真字。一个月三贯。" }
      ]
    },
    {
      id: "j6.qianjun", cat: "军旅", title: "签军", age: [18, 50], weight: 15, sex: "male",
      years: [1150, 1234],
      text: [
        "南边要打，北边也要打。金朝{{签军|金末强制征发汉人丁壮入伍}}，凡汉户，三丁抽一。",
        "你家三丁：你、弟弟、父亲。父亲五十八。",
        "签军的吏说：「三丁抽一。你自己挑。」"
      ],
      options: [
        { text: "自己去", hint: "身体 −10；家中保住劳力", effects: [{ k: "body", v: -10 }, { k: "fame", v: 4 }], gamble: { deathChance: 0.12, cause: "战阵" }, then: "你去了。发了一把刀，一件纸甲。队里一半是汉人，一半是契丹人。" },
        { text: "让弟弟去", hint: "声望 −5；家中少一人", effects: [{ k: "fame", v: -5 }, { k: "favor", v: -8 }], then: "弟弟去了。头一仗在野狐岭，回来的人不到三成。" },
        { text: "花钱买一名替身", need: { minSilver: 6 }, hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -12 }, { k: "body", v: -8 }], loseNote: "替身中途跑了。查出来，你被押去充军。" }, then: "你花六两雇了一个流民。他拿着你的名字去了，从此没消息。" }
      ]
    },
    {
      id: "j6.menganke", cat: "家族", title: "汉户", age: [16, 60], weight: 13,
      years: [1150, 1234],
      text: [
        "{{猛安谋克户|女真军户，占田不纳赋，多役使汉人佃种}}。你家是汉户，租种谋克户的地。",
        "今年谋克户要加租：从四成加到六成。",
        "他说：「地是我的，租是我定的。」"
      ],
      options: [
        { text: "认了", hint: "粮 −10", effects: [{ k: "grain", v: -10 }], then: "你交了六成。剩下的四成，够吃到开春。" },
        { text: "退佃，另找地种", hint: "银钱 −3；或有荒", effects: [{ k: "silver", v: -3 }, { k: "body", v: -5 }], then: "你把地退了。找了三个月，才在二十里外租到八亩沙地。" },
        { text: "去县里告", hint: "声望 +5；或有祸", effects: [{ k: "fame", v: 5 }], gamble: { winChance: 0.3, win: [], lose: [{ k: "body", v: -8 }, { k: "grain", v: -8 }], loseNote: "县令是女真人。判你「诬告」，打了二十板，租照加。" }, then: "你写了状子递到县里。县令看了半天，说：「我问问。」" }
      ]
    },
    {
      id: "j6.bianmin", cat: "世变", title: "南迁", age: [16, 70], weight: 16, once: true,
      years: [1214, 1234],
      text: [
        "蒙古兵破了中都。朝廷南迁汴京。",
        "{{贞祐南迁|1214 年金宣宗迁都汴京，河北大乱}}。河北的百姓，跟着走的，被弃在道上；不走的，被兵杀。",
        "你站在岔路口。"
      ],
      options: [
        { text: "跟着南迁", hint: "身体 −10；银钱 −5", effects: [{ k: "body", v: -10 }, { k: "silver", v: -5 }], gamble: { deathChance: 0.15, cause: "道殣" }, then: "你跟着队伍走。走了四十天，到黄河边时，一起走的人少了一半。" },
        { text: "留在河北，结寨自守", hint: "身体 −8；声望 +8", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }, { k: "martial", v: 6 }], gamble: { deathChance: 0.2, cause: "兵祸" }, then: "你在村后的山上筑了个寨，聚了二百多户。寨墙是三丈高的土墙，墙根埋着削尖的木桩。" },
        { text: "往南逃，不去汴京", hint: "身体 −12；家产尽弃", effects: [{ k: "body", v: -12 }, { k: "silver", v: -6 }], then: "你没跟着官府走。你带着家人往南，走到淮河边才停下。" }
      ]
    }
  ]);

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = (B.eraEvents.nsong || []).concat([

    {
      id: "n6.jingjie", cat: "赋役", title: "经界", age: [22, 60], weight: 16, once: true,
      years: [1142, 1200],
      text: [
        "{{经界法|1142 年李椿年推行，重新丈量土地、核实税籍}}。凡田，皆须立砧基簿，画图形、记四至。",
        "你家的田，旧籍上是十二亩。丈量出来，是十七亩。",
        "经界官说：「多的五亩，从哪一年起缴？」"
      ],
      options: [
        { text: "认这五亩，从头补缴", hint: "银钱 −10", effects: [{ k: "silver", v: -10 }], then: "你补缴了六年的税，一共十贯。砧基簿上，画着你家田的形状，四至写得清楚。" },
        { text: "说这五亩是河滩，不常种", hint: "或有勘", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "经界官量了河滩，说「可以种」。补缴之外，还加了三分。" }, then: "你带他去看河滩。那年水大，滩上确实只长草。" },
        { text: "把五亩挂在亡兄名下", hint: "税减；或有查", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -10 }, { k: "fame", v: -8 }], loseNote: "查户籍，亡兄绝户无嗣。田入官，还罚了钱。" }, then: "你把五亩挂在亡兄名下。他死了七年，户籍一直没销。" }
      ]
    },
    {
      id: "n6.yiyi", cat: "赋役", title: "义役", age: [22, 60], weight: 13,
      years: [1150, 1279],
      text: [
        "{{义役|南宋民户合资买田，以田租雇人充役，以代差役之苦}}。村里凑了三十贯，买了十二亩田。",
        "这十二亩的租，雇一个人应差。",
        "里正说：「你家出三贯。」"
      ],
      options: [
        { text: "出三贯", hint: "银钱 −3；此后免差", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 3 }], then: "你出了三贯。此后十年，村里再没人被差役逼得卖田。" },
        { text: "不出，仍自行应差", hint: "身体 −6；省钱", effects: [{ k: "body", v: -6 }, { k: "silver", v: 3 }], then: "你没出钱。第二年轮到你家应差，去县里押了三个月粮。" },
        { text: "多出两贯，做个头人", hint: "银钱 −5；声望 +6", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 6 }], then: "你出了五贯，做了义役的管事。田契、租簿，都由你收着。" }
      ]
    },
    {
      id: "n6.baowu", cat: "官府", title: "保伍", age: [18, 60], weight: 13,
      years: [1130, 1279],
      text: [
        "{{保伍|南宋以五家为保，互相纠察，有盗则鸣鼓相援}}。你家编在第三保。",
        "保内有人犯了盗，依例同保连坐。",
        "保长来说：「昨夜西头的老周偷了邻村的牛。」"
      ],
      options: [
        { text: "报官", hint: "声望 +4；乡里结怨", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], then: "你去了县里。老周被带走了，他家的三个孩子，站在门口看着你。" },
        { text: "压下来，让他把牛还回去", hint: "声望 −3；保住一保", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 6 }], then: "你夜里去了老周家。他跪下来，说牛是给孩子换药的。第二天，牛回到了邻村。" },
        { text: "什么也不管", hint: "或有连坐", effects: [], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -5 }, { k: "body", v: -4 }], loseNote: "事发了。同保各罚钱，你被叫去县里问了一日。" }, then: "你装作不知道。三天后，邻村的人自己找上门来。" }
      ]
    },
    {
      id: "n6.huiZi", cat: "市井", title: "会子", age: [18, 65], weight: 15,
      years: [1160, 1279],
      text: [
        "{{会子|南宋纸币，由行在会子务发行}}。一贯会子，作一贯钱用。",
        "今年又印了一批。米价从一贯二斗，涨到一贯一斗。",
        "你手里有二十贯会子，是卖了田得的。"
      ],
      options: [
        { text: "换成铜钱", hint: "银钱 −2；保值", effects: [{ k: "silver", v: -2 }, { k: "grain", v: 4 }], then: "你把会子换成铜钱，贴了两贯的贴水。铜钱很重，你分了三处埋。" },
        { text: "拿去买米囤着", hint: "粮 +18；占地方", effects: [{ k: "grain", v: 18 }], then: "你买了十八石米，堆在堂屋。米价后来涨了三成。" },
        { text: "留着会子，等它涨", hint: "或有折", effects: [], gamble: { winChance: 0.3, win: [{ k: "silver", v: 4 }], lose: [{ k: "silver", v: -10 }], loseNote: "三年后会子折阅，一贯只作六百文。" }, then: "你把会子收在瓦罐里，埋在灶下。" }
      ]
    },
    {
      id: "n6.zhongqian", cat: "赋役", title: "和籴", age: [22, 65], weight: 15,
      years: [1130, 1279],
      text: [
        "{{和籴|官府按价购粮，实为摊派，价常低于市价}}。今年军前要粮，县里派下三百石。",
        "摊到你家，是八石。官价一石八百文，市价一千五。",
        "里正说：「这是和籴，不是白拿。」"
      ],
      options: [
        { text: "照数缴", hint: "粮 −8；银钱 +1", effects: [{ k: "grain", v: -8 }, { k: "silver", v: 1 }], then: "你缴了八石，领了六贯四百文。市价该是十二贯。" },
        { text: "买粮来缴，留下自家的", hint: "银钱 −6；粮保住", effects: [{ k: "silver", v: -6 }], then: "你去镇上买了八石。买的时候，米价已经涨了。" },
        { text: "拖着不缴", hint: "或有催", effects: [{ k: "fame", v: -4 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "grain", v: -10 }, { k: "body", v: -6 }], loseNote: "县里派人来搜仓。粮被搬空，你被带去关了三天。" }, then: "你说家里没粮。里正说：「军前的粮，你敢拖？」" }
      ]
    },
    {
      id: "n6.nandu", cat: "世变", title: "南渡", age: [10, 70], weight: 17, once: true,
      years: [1127, 1145],
      text: [
        "{{靖康之变|1127 年金兵破汴京，徽钦二帝北狩}}。中原的人，一批一批往南。",
        "你也在其中。",
        "长江边上，船家要一人一两银子。"
      ],
      options: [
        { text: "付钱上船", need: { minSilver: 3 }, hint: "银钱 −3；身家全弃", effects: [{ k: "silver", v: -3 }, { k: "body", v: -5 }], then: "你把田契扔在岸边，上了船。船到南岸，你跪下来，捧了一把土。" },
        { text: "沿江走，不走水路", hint: "身体 −12；或死于道", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.16, cause: "道殣" }, then: "你沿着江往西走。走了两个月，草鞋穿了四双。" },
        { text: "留在江北，等事定", hint: "身体 −8；家产或尽", effects: [{ k: "body", v: -8 }, { k: "silver", v: -8 }], then: "你留了下来。金兵过后，村里少了七十口人，屋还在。" }
      ]
    }
  ]);

})(window.PACK_BASE);
