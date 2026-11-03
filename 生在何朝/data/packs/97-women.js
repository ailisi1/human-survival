/* 生在何朝 · 妇人卷
 * ────────────────────────────────────────────────
 * 为什么单立一卷：
 *   全库 sex:"male" 的事件 97 条，sex:"female" 只有 21 条，而投胎女性占 48.5%。
 *   女子一生要过的关口与男子几乎不重合——缠足、议聘、坐产、乳哺、守节、
 *   典妻——这些若混在通用事件里，抽不到，等于没写。
 *
 * 写法：
 *   一律 sex:"female"；跨朝共用的用 years 卡住（如缠足自宋始盛，记 960 起）；
 *   分阶层的用 classIn（阶层 id：royal noble official_mid gentry merchant farmer tenant base）。
 *   记事体：写事实、写当时怎么说，不写评判。
 *
 * id 一律 w97. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 婴幼 ══════════ */

    {
      id: "w97.buju", cat: "家族", title: "不举", age: [0, 2], weight: 13, once: true,
      classIn: ["farmer", "tenant", "base"],
      text: [
        "你落地时是三更，哭得很响。",
        "接生的人说：「又是个女。」屋里静了一会儿。",
        "父亲在门外问了一句什么，没人应他。{{不举|不养育，指溺婴、弃婴。汉以来历朝屡禁，乡间仍常有}}两个字，在这一带不算新鲜事。"
      ],
      options: [
        { text: "哭得更响", hint: "身体 −8；或有意外", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }], deathChance: 0.22, cause: "溺", loseNote: "母亲后来说，那晚她把襁褓按在盆里，手抖了三次。" }, then: "你哭到天亮。母亲把你抱回床上，说：「留着吧，养大了能换一份聘礼。」" },
        { text: "被抱去别家", hint: "声望 −4；换一口活路", effects: [{ k: "fame", v: -4 }], then: "邻村一户人家没有女儿，抱了你去，说好「长大随你姓」。你从此不姓本家的姓。" },
        { text: "丢在路口", hint: "身体 −12；或有善人", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.35, cause: "弃" }, then: "天快亮时，一个赶早集的妇人听见了，把你裹进她的围裙里。" }
      ]
    },
    {
      id: "w97.name", cat: "家族", title: "名字", age: [4, 9], weight: 11, once: true, sex: "female",
      text: [
        "哥哥们有名，按辈分排，写在族谱上。",
        "你到六岁，人还只叫你「大妮」。再小的是「二妮」，往后还有三妮。",
        "母亲说：「女孩子家，叫什么都一样。」"
      ],
      options: [
        { text: "自己讨一个", hint: "学识 +2；声望 −1", effects: [{ k: "knowledge", v: 2 }, { k: "fame", v: -1 }], then: "你说你要叫「阿绣」。母亲笑了一下，此后真这么叫你。族谱上仍然没有你。" },
        { text: "认了这个称呼", hint: "无得失", effects: [], then: "你应了十几年。后来嫁了人，人家叫你「某家的」，再后来叫你「某某的娘」。你自己的名字，一辈子没用过几回。" },
        { text: "跟着哥哥认字，把自己的名字写出来", hint: "学识 +3；惹人说嘴", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: -2 }], when: { minKnowledge: 8 }, then: "你在地上用树枝写了一个「绣」字。父亲看见了，用脚抹掉，说：「女子识字，不是好事。」" }
      ]
    },
    {
      id: "w97.chanzu", cat: "身体", title: "缠足", age: [4, 8], weight: 17, once: true,
      sex: "female", years: [960, 1912],
      text: [
        "四尺长的白布，母亲在热水里浸过，拧干。",
        "她把你除大趾外的四个脚趾往脚心里折，一层层裹紧，最后用针线缝死。",
        "头三夜疼得睡不着。母亲说：「忍一忍。脚不小，嫁不出去。」{{三寸金莲|宋以后渐盛，明清最烈。缠足自四五千岁起，骨折筋挛，终身不良于行}}"
      ],
      options: [
        { text: "忍着", hint: "身体 −12；日后议婚有底气", effects: [{ k: "body", v: -12 }, { k: "flag", v: "boundFeet" }], then: "裹了三年，脚成了。站起来走不上半里路，得有人扶。母亲说：「这样就对了。」" },
        { text: "夜里偷偷拆开", hint: "身体 −5；母亲发现后重裹", effects: [{ k: "body", v: -5 }], then: "拆了四回，重裹了四回，一回比一回紧。第五回你没再拆。" },
        { text: "母亲心软，裹了个半大", hint: "身体 −5；议婚时被人挑", effects: [{ k: "body", v: -5 }, { k: "flag", v: "halfFeet" }], then: "脚没裹小，也没放开。后来媒人看了，说：「这脚，做正房是差些。」" }
      ]
    },
    {
      id: "w97.tianzu", cat: "身体", title: "大脚", age: [5, 9], weight: 9, once: true,
      sex: "female", years: [960, 1912],
      classIn: ["farmer", "tenant", "base"],
      text: [
        "村里同龄的女孩子都缠了脚，你没有。",
        "不是家里疼你，是田里要人。插秧、挑水、割稻，缠了脚做不了。",
        "孩子们追着你唱：「大脚婆，嫁不出。」"
      ],
      options: [
        { text: "由她们唱", hint: "身体 +4；声望 −3", effects: [{ k: "body", v: 4 }, { k: "fame", v: -3 }, { k: "flag", v: "freeFeet" }], then: "你挑起两桶水，从她们面前走过去。后来你一直能挑水，一直能下田。" },
        { text: "回家求母亲给缠", hint: "身体 −9；议婚时能说得上话", effects: [{ k: "body", v: -9 }, { k: "flag", v: "boundFeet" }], then: "母亲说：「缠了脚，田里的活谁做？」还是给你缠了。缠完第二年，你下不了水田。" },
        { text: "躲进山里，等这阵风过去", hint: "身体 −4；学识 +1", effects: [{ k: "body", v: -4 }, { k: "knowledge", v: 1 }], then: "你在山上待了半个月，认得了七种草药的叶子。回村时，唱的人已经换了新的词。" }
      ]
    },
    {
      id: "w97.yangnv", cat: "家族", title: "养女", age: [3, 9], weight: 9, once: true,
      sex: "female",
      text: [
        "媒婆领来一对夫妇，围着你看了三圈，捏了捏你的胳膊。",
        "他们留下一小袋米，两匹粗布。",
        "母亲在灶间没出来。父亲说：「去人家家里，比在家里强。」"
      ],
      options: [
        { text: "跟着走", hint: "银钱 +0.5；换一个去处", effects: [{ k: "silver", v: 0.5 }], then: "那家的灶台比家里的大，碗也多。你从洗碗做起，做了八年。" },
        { text: "抱住门框不放", hint: "身体 −6；声望 −2", effects: [{ k: "body", v: -6 }, { k: "fame", v: -2 }], then: "父亲一根一根掰你的手指。掰到第三根，你自己松了手。" },
        { text: "躲进柴房，等他们走", hint: "身体 −8；留下", effects: [{ k: "body", v: -8 }], then: "你在柴堆后头蹲到天黑。那家人走了，父亲三天没跟你说话，后来也没再提。" }
      ]
    },
    {
      id: "w97.shihua", cat: "学问", title: "窗外", age: [6, 13], weight: 10, once: true,
      sex: "female",
      text: [
        "塾里坐的是族中的男孩，一个月束脩二钱银。",
        "你抱着弟弟去上学，坐在门槛外等他散学。",
        "「关关雎鸠」，他们在里面念，你在外面跟着念。"
      ],
      options: [
        { text: "天天跟着念", hint: "学识 +6；被先生看见", effects: [{ k: "knowledge", v: 6 }], then: "先生出来倒水，看见你在门槛上用手指画字。他没说什么，第二天把门开了一条缝。" },
        { text: "求父亲让你也读", hint: "学识 +4；声望 −3", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: -3 }], then: "父亲说：「读书是要考功名的。你去考什么？」但他到底没拦你，只当没看见。" },
        { text: "算了，专心带弟弟", hint: "声望 +3；弟弟日后或念你的好", effects: [{ k: "fame", v: 3 }, { k: "flag", v: "raisedBrother" }], then: "你把弟弟背到十岁。他后来中了秀才，逢人说起，总要说一句「我姐姐背我上学」。" }
      ]
    },

    /* ══════════ 少女 ══════════ */

    {
      id: "w97.nvgong", cat: "生计", title: "女红", age: [8, 14], weight: 14, once: true, sex: "female",
      text: [
        "纺车是祖母留下的，木轴磨得发亮。",
        "一天纺四两线，手快的能纺六两。母亲说：「手上有活，到了人家家里才站得住。」",
        "纺到冬天，指头上全是裂口，蘸了油继续纺。"
      ],
      options: [
        { text: "下死力气学", hint: "身体 −5；银钱 +2", effects: [{ k: "body", v: -5 }, { k: "silver", v: 2 }, { k: "flag", v: "skillHand" }], then: "两年后，你纺的线能上织机，不捻不结。镇上收线的掌柜认得你的手。" },
        { text: "学刺绣，不做粗活", hint: "银钱 +1；学识 +2", effects: [{ k: "silver", v: 1 }, { k: "knowledge", v: 2 }, { k: "flag", v: "skillEmbroidery" }], then: "绣一幅帐檐要三个月。绣好了能卖一两二钱，比纺一年线还多。" },
        { text: "能应付就应付", hint: "身体 +1；日后受气", effects: [{ k: "body", v: 1 }], then: "线条粗细不匀。嫁过去第一年，婆婆当着人把你的活计抖开，说：「这家是怎么教的。」" }
      ]
    },
    {
      id: "w97.jiji", cat: "家族", title: "及笄", age: [14, 18], weight: 18, once: true, sex: "female",
      text: [
        "十五岁及笄。头发绾起来，插一根簪子，就算成年了。",
        "媒人来了三趟。说的是三十里外一户人家，有田二十亩，人是老实人。",
        "父母问你：「你自己看呢？」——这话问了，也等于没问。"
      ],
      options: [
        { text: "听父母的", hint: "声望 +4；银钱 +3", effects: [{ k: "fame", v: 4 }, { k: "silver", v: 3 }], then: "聘礼是八两银、四匹布、一对雁。你上了花轿，一路没掀盖头。" },
        { text: "托人打听那家的底细", hint: "学识 +2；或有退亲", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.5, win: [{ k: "fame", v: 2 }], lose: [{ k: "fame", v: -4 }], loseNote: "打听出来的话传了回去。那家说：「这样的媳妇，我们不敢要。」" }, then: "你托卖花的婆子去问。她回来说：那家的老太太厉害，前头一个媳妇是熬死的。" },
        { text: "说想再等两年", hint: "声望 −4；身体 +3", effects: [{ k: "fame", v: -4 }, { k: "body", v: 3 }], then: "母亲说：「再等两年，好人家都定完了。」你在家里又纺了两年线。" }
      ]
    },
    {
      id: "w97.pinli", cat: "家族", title: "聘礼", age: [14, 22], weight: 12, once: true, sex: "female",
      text: [
        "两家议了三个月，卡在聘礼上。",
        "男方出六两，父亲要十两。媒人来回跑了七趟，鞋底磨穿。",
        "父亲说：「不是卖女儿，是给她留个体面。」"
      ],
      options: [
        { text: "劝父亲让一步", hint: "声望 +2；成全这门亲", effects: [{ k: "fame", v: 2 }], then: "父亲最后收了七两。上轿那天，他把那七两全塞进了你的箱底。" },
        { text: "由父亲去争", hint: "银钱 +4；或有退亲", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -5 }], loseNote: "男方说：「既是这样，另找一家。」亲事散了，村里传了半年。" }, then: "父亲争到了九两。他高兴了三天，说这才是明媒正娶。" },
        { text: "自己说：不要聘礼", hint: "声望 −6；银钱 −2", effects: [{ k: "fame", v: -6 }, { k: "silver", v: -2 }], then: "两家的老人都沉了脸。婆婆后来一辈子记得这句话，一吵架就拿出来说。" }
      ]
    },
    {
      id: "w97.tongyang", cat: "家族", title: "童养媳", age: [8, 15], weight: 8, once: true,
      sex: "female", years: [960, 1912],
      classIn: ["farmer", "tenant", "base"],
      text: [
        "荒年，家里养不起。邻村一户人家愿收，说：「先接过去养着，长大给老三做媳妇。」",
        "不用聘礼，倒贴两斗米。",
        "走的那天，母亲给你梳了头，说：「到了那边，嘴要甜。」"
      ],
      options: [
        { text: "过去，认命", hint: "身体 −6；有一口饭吃", effects: [{ k: "body", v: -6 }, { k: "grain", v: 1 }], then: "你在那家洗衣、看孩子、喂猪。到十四岁圆房，没有花轿，摆了两桌。" },
        { text: "过去，但先把话说明白", hint: "声望 +2；或遭嫌", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -8 }], loseNote: "那家的老太太说：「还没进门就讲条件。」那年冬天，你的饭总比别人少半碗。" }, then: "你说：「我干活，不白吃。」老太太愣了一下，说这丫头有心。" },
        { text: "半路跑了", hint: "身体 −12；或死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.2, cause: "逃" }, then: "你趁送亲的人打盹，钻进了高粱地。走了两天，脚上全是血泡。" }
      ]
    },
    {
      id: "w97.caixuan", cat: "官府", title: "采选", age: [13, 18], weight: 5, once: true, sex: "female",
      when: { minFame: 10 },
      text: [
        "县里来了文书，选良家女入宫。",
        "里正领着人挨户看，看手、看牙、看走路的样子。",
        "看完了，在你家门口记了一笔。母亲当晚没睡。{{采选|历朝选宫女、选秀女。入选者入宫为婢，终身不出；落选者方能回家}}"
      ],
      options: [
        { text: "去", hint: "或有富贵；终身不出", effects: [{ k: "fame", v: 8 }], gamble: { winChance: 0.3, win: [{ k: "silver", v: 10 }], lose: [{ k: "body", v: -10 }], loseNote: "你在浣衣局洗了六年衣裳。宫里冬天水凉，手上冻疮没断过。" }, then: "你上了车。车帘放下的时候，母亲还站在门口，手举着没落下来。" },
        { text: "想办法落选", hint: "银钱 −5；身体 −4", effects: [{ k: "silver", v: -5 }, { k: "body", v: -4 }], then: "家里凑了钱，给经手的吏员。第二天文书上你的名字被划掉了，换成了邻村一个姑娘。" },
        { text: "故意生一场病", hint: "身体 −10；落选", effects: [{ k: "body", v: -10 }], then: "你在冷水里泡了半夜，第二天发起高热。来验的人捂着鼻子走了。" }
      ]
    },
    {
      id: "w97.chujia", cat: "方外", title: "庵里", age: [12, 22], weight: 6, once: true, sex: "female",
      text: [
        "家里兄弟姐妹多，嫁妆凑不出来。",
        "母亲说：「城外的庵里清净，去了不愁吃穿。」",
        "你知道那不是清净，是把你从这家的账上划掉。"
      ],
      options: [
        { text: "剃了", hint: "身体 −4；学识 +5", effects: [{ k: "body", v: -4 }, { k: "knowledge", v: 5 }, { k: "flag", v: "nun" }], then: "头发落在青砖上，一小堆。师父给你取了个法名，从此你有了一个别人给的名字。" },
        { text: "带发修行，仍住家里", hint: "声望 +2；不清净", effects: [{ k: "fame", v: 2 }, { k: "flag", v: "nunLay" }], then: "你搬进后院的偏房，吃素，念经，仍旧给家里洗衣做饭。族里说这是「守静」。" },
        { text: "宁嫁穷人，不做尼姑", hint: "银钱 −3；嫁人", effects: [{ k: "silver", v: -3 }, { k: "body", v: -3 }], then: "你嫁给了一个走乡的货郎。嫁妆只有一床被、两口箱。母亲哭着说：「苦是苦些。」" }
      ]
    },
    {
      id: "w97.huaiqin", cat: "宗族", title: "换亲", age: [14, 22], weight: 7, once: true, sex: "female",
      classIn: ["farmer", "tenant"],
      text: [
        "哥哥二十六了，还没娶上。家里出不起聘礼。",
        "三十里外有一家，情形一样：那边有女，这边有女。",
        "媒人说：「两家对换，谁也不出聘礼。」——说的是你，和哥哥。"
      ],
      options: [
        { text: "答应", hint: "声望 +4；哥哥娶上了", effects: [{ k: "fame", v: 4 }, { k: "flag", v: "swapMarriage" }], then: "同一天，两顶花轿在半路的桥上错过去。你掀帘看了一眼，那边轿里也掀了一下。" },
        { text: "不答应", hint: "声望 −6；哥哥或一辈子单身", effects: [{ k: "fame", v: -6 }], then: "哥哥在灶前坐了一夜。第二天他说：「不换就不换，我一个人过。」后来他真的一个人过到老。" },
        { text: "答应，但要求先见一面", hint: "学识 +2；或有转机", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.5, win: [{ k: "fame", v: 2 }], lose: [{ k: "body", v: -6 }], loseNote: "见面那天，那家的男人一句话没说，只盯着地看。你回去病了一场，婚事还是照办。" }, then: "你隔着篱笆看了他一眼。个子不高，手上有茧。你心想：能干活，就行。" }
      ]
    },

    /* ══════════ 婚后 ══════════ */

    {
      id: "w97.jinmen", cat: "家族", title: "三日入厨", age: [16, 24], weight: 15, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "成婚第三日，你要下厨做一顿饭，给全家吃。",
        "灶台比你家的高，锅比你家的深，柴是湿的。",
        "婆婆站在门口，不说话，看着。{{三日入厨|唐宋以来婚礼习俗，新妇婚后三日入厨作羹，示养舅姑}}"
      ],
      options: [
        { text: "做自己拿手的", hint: "声望 +5；银钱 −0.5", effects: [{ k: "fame", v: 5 }, { k: "silver", v: -0.5 }], then: "你做了一锅粟米饭，一盘腌菜炒鸡蛋。公公吃了两碗。婆婆说：「还行。」——这两个字，算是认了你。" },
        { text: "先问婆婆怎么做", hint: "声望 +3；学识 +1", effects: [{ k: "fame", v: 3 }, { k: "knowledge", v: 1 }], then: "婆婆说：「我们家的饭，盐要后放。」你记住了。此后二十年，你家的盐都后放。" },
        { text: "故意做坏一点", hint: "声望 −2；日后少派活", effects: [{ k: "fame", v: -2 }], then: "饭烧糊了。婆婆皱着眉吃完了，说：「以后灶上的事，还是我来。」你落了个清闲，也落了个「不会过日子」的名。" }
      ]
    },
    {
      id: "w97.ligui", cat: "家族", title: "立规矩", age: [18, 32], weight: 12, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "天不亮要起来。先给公婆倒夜壶，再烧水，再做饭。",
        "吃饭时你站在旁边添饭，等全家人吃完，你吃剩下的。",
        "婆婆说：「我当年也是这么过来的。」"
      ],
      options: [
        { text: "一句不吭，做满三年", hint: "身体 −8；声望 +6", effects: [{ k: "body", v: -8 }, { k: "fame", v: 6 }], then: "三年后，婆婆把米缸的钥匙交给了你。她说：「这家的日子，往后你管。」" },
        { text: "回娘家诉苦", hint: "身体 +2；声望 −4", effects: [{ k: "body", v: 2 }, { k: "fame", v: -4 }], then: "母亲听完，说：「谁家不是这样。」住了三天，把你送了回去。回去以后，婆婆的话更难听了。" },
        { text: "当着人的面顶一句", hint: "声望 −6；身体 +3", effects: [{ k: "fame", v: -6 }, { k: "body", v: 3 }], then: "你说：「我也是爹娘养的。」屋里静了。那年分家，你们这一房分到的是最远的三亩地。" }
      ]
    },
    {
      id: "w97.shengchan", cat: "身体", title: "产", age: [18, 42], weight: 19, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "阵痛从后半夜开始，到天亮还没生下来。",
        "稳婆烧了热水，把剪刀在火上过了一遍。",
        "婆婆在门外烧香。丈夫在院子里走来走去，鞋底磨着地。{{产难|古时产妇死亡率极高，难产、血崩、产褥热为三大死因}}"
      ],
      options: [
        { text: "咬牙用力", hint: "身体 −14；或平安", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.12, cause: "产难" }, then: "孩子落地时天已大亮。你听见哭声，才觉得自己还活着。" },
        { text: "叫稳婆想办法", hint: "银钱 −2；身体 −10", effects: [{ k: "silver", v: -2 }, { k: "body", v: -10 }], gamble: { deathChance: 0.06, cause: "血崩" }, then: "稳婆把手伸进去，转了胎位。你疼得咬破了嘴唇。孩子出来了，是个儿子。" },
        { text: "求神，喝催生符水", hint: "身体 −16；或有意外", effects: [{ k: "body", v: -16 }], gamble: { deathChance: 0.18, cause: "产难" }, then: "符水是香灰化的，喝下去胃里翻。孩子最后是自己出来的，你昏了两天。" }
      ]
    },
    {
      id: "w97.shengnv", cat: "家族", title: "又是个女儿", age: [20, 42], weight: 13, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "第二个也是女儿。",
        "婆婆看了一眼，转身出去了。丈夫说：「再生。」",
        "你抱着孩子，听见外头有人在跟邻居说话，声音压得很低。"
      ],
      options: [
        { text: "接着生", hint: "身体 −12；或有子", effects: [{ k: "body", v: -12 }], gamble: { winChance: 0.5, win: [{ k: "fame", v: 6 }], lose: [{ k: "body", v: -6 }], loseNote: "第三个还是女儿。那年冬天，家里多了一张嘴，少了一床被。" }, then: "第三胎是儿子。满月那天摆了酒，你坐在房里，听着外头的热闹。" },
        { text: "跟丈夫说：不生了", hint: "声望 −6；身体 +4", effects: [{ k: "fame", v: -6 }, { k: "body", v: 4 }], then: "丈夫摔了一个碗。此后他常不回家，婆婆逢人就说这家的媳妇「不贤」。" },
        { text: "把女儿送人，腾出奶水", hint: "声望 −3；银钱 +1", effects: [{ k: "fame", v: -3 }, { k: "silver", v: 1 }], then: "抱走的人是你娘家远亲。你喂了她三个月，最后一天，你把自己的手指塞进她嘴里，让她咬。" }
      ]
    },
    {
      id: "w97.naima", cat: "生计", title: "乳母", age: [20, 36], weight: 7, once: true, sex: "female",
      text: [
        "城里一户官人家要请乳母，一个月给一钱五分银，管饭。",
        "条件是不能带着自己的孩子。",
        "你的孩子刚满两个月，奶正足。"
      ],
      options: [
        { text: "去", hint: "银钱 +8；自己的孩子或养不活", effects: [{ k: "silver", v: 8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "你走后的第四个月，家里捎信来，说孩子没留住。" }, then: "你喂了人家的小姐三年。她学会说的第一句话是「娘」，是对着你说的。" },
        { text: "不去，自己喂", hint: "银钱 −3；身体 −5", effects: [{ k: "silver", v: -3 }, { k: "body", v: -5 }], then: "你留在家里。米缸见了底，你把粥熬得能照见人影，先紧着孩子吃。" },
        { text: "去，但要求每月回一次家", hint: "银钱 +6；两下都顾", effects: [{ k: "silver", v: 6 }, { k: "body", v: -4 }], then: "主家答应了。你每月走十二里路回家一趟，喂一次奶，第二天一早再走回去。" }
      ]
    },
    {
      id: "w97.qingnaima", cat: "家业", title: "请乳母", age: [20, 38], weight: 6,
      classIn: ["royal", "noble", "official_mid", "gentry", "merchant"],
      text: [
        "孩子生下来，你的奶不够。",
        "婆婆说：「请个乳母吧，别把孩子饿着。」",
        "牙婆领了三个来，站在院里，解开衣襟让人看。"
      ],
      options: [
        { text: "挑一个老实的", hint: "银钱 −6；孩子平安", effects: [{ k: "silver", v: -6 }], then: "挑了个话少的。她喂了孩子两年，走的时候，孩子抱着她的腿不撒手。" },
        { text: "自己喂，不请人", hint: "身体 −10；声望 +4", effects: [{ k: "body", v: -10 }, { k: "fame", v: 4 }], then: "你一夜起三回。婆婆说：「何必这样苦自己。」你没答。孩子长得结实。" },
        { text: "挑个奶水最足的，多给钱", hint: "银钱 −10；身体 +2", effects: [{ k: "silver", v: -10 }, { k: "body", v: 2 }], then: "那乳母吃得好，奶也足。孩子白胖。你总算睡了几夜整觉。" }
      ]
    },
    {
      id: "w97.dianqi", cat: "生计", title: "典妻", age: [20, 40], weight: 6, once: true,
      sex: "female", years: [1368, 1912], classIn: ["farmer", "tenant", "base"],
      text: [
        "丈夫欠了赌债，十二两。",
        "邻县有户人家，出二十两，要「典」一个女人去生儿子，期三年，期满归还。",
        "中人把契纸摊在桌上，说：「这是常事。」{{典妻|明清福建、浙江、江西一带的陋俗，立契典妻生子，期满赎回，所生子女归典主}}"
      ],
      options: [
        { text: "去了", hint: "银钱 +12；身体 −10", effects: [{ k: "silver", v: 12 }, { k: "body", v: -10 }], then: "你在那家住了三年，生了一个儿子。期满那天，孩子被抱走，你在门口站到天黑。" },
        { text: "死活不去", hint: "身体 −8；家里或散", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "fame", v: -5 }, { k: "silver", v: -4 }], loseNote: "债主搬走了家里的两张桌子、一口锅。丈夫从此没再跟你说过一句整话。" }, then: "你把契纸撕了。中人骂了一句走了。丈夫在灶前蹲了一夜，第二天一早就下地去了。" },
        { text: "去，但要中人写明「不生子则放归」", hint: "学识 +3；银钱 +8", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: 8 }], then: "你请人念了三遍契纸，才按手印。三年期满，你没生，回来了。丈夫说：「算你命好。」" }
      ]
    },
    {
      id: "w97.naqie", cat: "家族", title: "纳妾", age: [24, 48], weight: 10, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "丈夫从外面回来，先跟婆婆说了一炷香的话，才进你的屋。",
        "他说：「家里总要有人传后。」",
        "人是牙婆带来的，十七岁，站在廊下不敢抬头。"
      ],
      options: [
        { text: "受着，把家管好", hint: "声望 +5；银钱 −3", effects: [{ k: "fame", v: 5 }, { k: "silver", v: -3 }], then: "你把账、钥匙、米仓都攥在手里。妾生了儿子，孩子叫你「母亲」，叫她「姨娘」。" },
        { text: "闹一场", hint: "声望 −6；身体 −4", effects: [{ k: "fame", v: -6 }, { k: "body", v: -4 }], then: "你摔了两个碗，回了娘家。住了半月，哥哥说：「家里没有养闲人的地方。」你回去了。" },
        { text: "自己给丈夫挑一个", hint: "声望 +6；日后或养虎", effects: [{ k: "fame", v: 6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -5 }], loseNote: "你挑的那个，三年后得了宠。她开始在丈夫耳边说你的不是。" }, then: "你千挑万选，挑了个老实巴交的。进门那天，你亲自给她梳头。" }
      ]
    },
    {
      id: "w97.shougua", cat: "家族", title: "守", age: [22, 62], weight: 11, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "丈夫死在秋天，三十一岁。",
        "棺材抬出去那天，族里的老人说：「守着吧，孩子还小。」",
        "你今年二十六。往后还有四十年。"
      ],
      options: [
        { text: "守", hint: "声望 +8；身体 −8", effects: [{ k: "fame", v: 8 }, { k: "body", v: -8 }, { k: "flag", v: "widow" }], then: "你换下所有颜色鲜明的衣裳，此后四十年没再穿。族里在祠堂给你留了一个位置。" },
        { text: "再嫁", hint: "声望 −10；身体 +5", effects: [{ k: "fame", v: -10 }, { k: "body", v: 5 }, { k: "flag", v: "remarried" }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -6 }], loseNote: "婆家拦着不放人，说要走可以，孩子留下。你走了，孩子留下了。" }, then: "你嫁给了镇上开豆腐坊的。头一年，村里人背后叫你「那个改嫁的」。" },
        { text: "回娘家，带着孩子", hint: "银钱 −4；身体 −4", effects: [{ k: "silver", v: -4 }, { k: "body", v: -4 }, { k: "flag", v: "widow" }], then: "哥哥腾出一间柴房。你在里面住了十一年，直到儿子能下地。" }
      ]
    },
    {
      id: "w97.zaijia", cat: "家族", title: "再嫁", age: [22, 46], weight: 9, once: true,
      sex: "female", years: [-221, 960], when: { flagNot: ["nun"] },
      text: [
        "丈夫没了。娘家人来了，婆家人也来了。",
        "母亲说：「你还年轻，找一家吧。」",
        "这个年月，寡妇再嫁不算丑事。族里不拦，只问聘礼归谁。"
      ],
      options: [
        { text: "嫁", hint: "银钱 +6；声望 −2", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -2 }], then: "你嫁了。前头的孩子留在婆家。新丈夫待你不差，只是不许你提前头的事。" },
        { text: "不嫁，守着田", hint: "声望 +5；身体 −6", effects: [{ k: "fame", v: 5 }, { k: "body", v: -6 }], then: "你把那几亩田自己种了。邻居说这家的寡妇厉害，没人敢来欺。" },
        { text: "回娘家，帮着带侄儿", hint: "声望 +2；银钱 −2", effects: [{ k: "fame", v: 2 }, { k: "silver", v: -2 }], then: "你在娘家住了下来，把三个侄儿带到能走路。老了以后，他们叫你「姑婆」。" }
      ]
    },
    {
      id: "w97.heli", cat: "家族", title: "和离", age: [20, 42], weight: 6, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "成婚七年，话越说越少，后来不说了。",
        "婆家嫌你没生儿子，你嫌这家人刻薄。",
        "里正说：「要散，就写一纸和离书，两不相欠。」"
      ],
      options: [
        { text: "和离", hint: "声望 −8；身体 +5", effects: [{ k: "fame", v: -8 }, { k: "body", v: 5 }], then: "和离书上按了两个手印。你带走了自己的嫁妆，一口箱，一床被。" },
        { text: "忍着不离", hint: "身体 −8；声望 +3", effects: [{ k: "body", v: -8 }, { k: "fame", v: 3 }], then: "你留了下来。此后二十年，你们在一张桌上吃饭，一年说不上十句话。" },
        { text: "被休", hint: "声望 −14；身体 −4", effects: [{ k: "fame", v: -14 }, { k: "body", v: -4 }], then: "休书上是「七出」里的一条。你是被送回娘家的，路上没坐车，走回去的。" }
      ]
    },

    /* ══════════ 中年 ══════════ */

    {
      id: "w97.jingbiao", cat: "宗族", title: "旌表", age: [34, 64], weight: 7, once: true,
      sex: "female", years: [960, 1912],
      when: { flagHas: ["widow"] },
      text: [
        "你守了二十二年。",
        "族长说：「该报上去了。」报的是旌表节孝，县里核实，可免本户差役，还能立一座牌坊。",
        "族长又说：「牌坊立起来，族里也有光。」"
      ],
      options: [
        { text: "报", hint: "声望 +12；银钱 −4", effects: [{ k: "fame", v: 12 }, { k: "silver", v: -4 }, { k: "flag", v: "honored" }], then: "三年后牌坊立成了，两丈高，刻着你的姓氏。你去看过一次，看完就回来了。" },
        { text: "不报", hint: "声望 −4；身体 +4", effects: [{ k: "fame", v: -4 }, { k: "body", v: 4 }], then: "你说：「二十二年，不是给牌坊守的。」族长愣了半天，走了。" },
        { text: "报，但要求把名字刻上", hint: "学识 +3；或遭驳", effects: [{ k: "knowledge", v: 3 }], gamble: { winChance: 0.4, win: [{ k: "fame", v: 8 }], lose: [{ k: "fame", v: -3 }], loseNote: "县里说，节妇牌坊例书「某氏」，不书闺名。你的名字到底没刻上去。" }, then: "上头的批复只有四个字：「例不合，不准。」牌坊上终究只刻了一个「某氏」。" }
      ]
    },
    {
      id: "w97.zhengyi", cat: "宗族", title: "争产", age: [28, 66], weight: 20, once: true, sex: "female",
      when: { flagHas: ["widow"] },
      text: [
        "丈夫没有兄弟，也没有儿子。",
        "族里来了五个人，说：「这一房的田，该由族中另立一个嗣子来承。」",
        "嗣子是他们挑的，八岁，是族长的侄孙。"
      ],
      options: [
        { text: "认了，立这个嗣", hint: "声望 +4；田 −6", effects: [{ k: "fame", v: 4 }, { k: "field_wet", v: -6 }], then: "嗣子搬进来，叫你「母亲」。族里拿走六亩田，说是「祭田」。" },
        { text: "从娘家抱一个孩子来养", hint: "声望 −6；田保住", effects: [{ k: "fame", v: -6 }], then: "你把娘家侄儿接来，改姓。族里骂了三个月，田总算没动。" },
        { text: "去县衙告", hint: "银钱 −8；或有转机", effects: [{ k: "silver", v: -8 }], gamble: { winChance: 0.35, win: [{ k: "field_wet", v: 4 }], lose: [{ k: "field_wet", v: -10 }, { k: "fame", v: -6 }], loseNote: "县官说：「妇人干讼，本不该准。」田判归族中。" }, then: "你递了状子。县官传了族长来问话，问了两个时辰。判下来：田归你，但须立族中子为嗣。" }
      ]
    },
    {
      id: "w97.fugu", cat: "家族", title: "抚孤", age: [26, 52], weight: 12, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "孩子五岁，家里没有别的劳力。",
        "白天你在田里，晚上在织机前。孩子睡在机杼旁边。",
        "先生说他聪敏，该送去读书。束脩一年二两。"
      ],
      options: [
        { text: "供他读书", hint: "银钱 −10；或有出息", effects: [{ k: "silver", v: -10 }, { k: "flag", v: "sonStudied" }], gamble: { winChance: 0.4, win: [{ k: "fame", v: 14 }], lose: [{ k: "fame", v: -2 }], loseNote: "读了六年，没考上。他把书收进箱底，跟你下地去了。" }, then: "你卖了嫁妆里的银镯。他读了十年，中了秀才，回来在你面前跪了很久。" },
        { text: "让他学一门手艺", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }], then: "跟木匠学了三年。出师那天，他给你打了一张新床。" },
        { text: "带着他改嫁", hint: "声望 −8；身体 +3", effects: [{ k: "fame", v: -8 }, { k: "body", v: 3 }], then: "新家不肯供他读书，让他放牛。你夜里哭了半宿，第二天照样起来做饭。" }
      ]
    },
    {
      id: "w97.songzhuang", cat: "官府", title: "妇人告状", age: [24, 58], weight: 7, once: true, sex: "female",
      text: [
        "邻居占了你家三尺地，还打了你的儿子。",
        "你去县衙递状子，书吏看了一眼，说：「妇人告状，要有人保。」",
        "「回去找个男人来。」"
      ],
      options: [
        { text: "求族中长辈出面", hint: "声望 −3；或有转机", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.5, win: [{ k: "fame", v: 5 }], lose: [{ k: "silver", v: -3 }], loseNote: "长辈收了你的礼，去说了一趟，回来说：「算了吧，低头不见抬头见。」" }, then: "族叔去了。状子递上去，地量了，那三尺还了回来。" },
        { text: "花钱请人代写、代递", hint: "银钱 −5；或赢", effects: [{ k: "silver", v: -5 }], gamble: { winChance: 0.6, win: [{ k: "fame", v: 6 }], lose: [{ k: "silver", v: -3 }], loseNote: "讼师拿了钱，状子递上去就没下文了。你去问，门房说：「老爷忙。」" }, then: "讼师把状子写得又狠又准。开堂那天，邻居跪在下面不敢抬头。" },
        { text: "不告了，自己去把地界桩砸了", hint: "声望 −6；身体 −5", effects: [{ k: "fame", v: -6 }, { k: "body", v: -5 }], then: "你拎着锄头去，把桩子刨出来扔进沟里。邻居报了官，你被打了十板子。" }
      ]
    },
    {
      id: "w97.wenpo", cat: "营生", title: "稳婆", age: [32, 58], weight: 7, once: true, sex: "female",
      text: [
        "村里接生一直是刘婆。她去年瞎了一只眼。",
        "有人来敲你的门，说媳妇要生了，问你能不能去。",
        "你没接过生。你只接过三回猪崽。"
      ],
      options: [
        { text: "去", hint: "银钱 +3；或有失手", effects: [{ k: "silver", v: 3 }, { k: "fame", v: 2 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -8 }], loseNote: "孩子生下来了，产妇血崩。天亮时人没了。那家在门口泼了一盆水。" }, then: "你烧水、洗手、剪脐带。孩子哭出来的那一刻，你手抖得端不住盆。" },
        { text: "推了", hint: "无得失", effects: [], then: "你说不敢。那家去找了二十里外的接生婆，天亮才到。" },
        { text: "去，但先跟刘婆学两趟", hint: "银钱 −1；学识 +2", effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 2 }, { k: "flag", v: "midwife" }], then: "你跟着刘婆看了两回。她说：「手要轻，心要狠，别慌。」此后二十年，这一带的月子都是你守的。" }
      ]
    },
    {
      id: "w97.fangzhi", cat: "营生", title: "织房", age: [26, 56], weight: 10, once: true, sex: "female",
      text: [
        "镇上开了织房，收布，一匹细布给银二钱。",
        "一天能织一匹，手快的一匹半。",
        "织房的人说：「做得好的，往后常年收。」"
      ],
      options: [
        { text: "整日织", hint: "身体 −9；银钱 +7", effects: [{ k: "body", v: -9 }, { k: "silver", v: 7 }], then: "你一年织了三百匹。眼睛花了，腰也直不起来，但家里盖了三间新瓦房。" },
        { text: "织一半，剩下时间管家", hint: "银钱 +4；声望 +2", effects: [{ k: "silver", v: 4 }, { k: "fame", v: 2 }], then: "你把织机让给邻家姑娘使，收她两成工钱。她织，你验货、送货。" },
        { text: "不织，家里不缺这几个钱", hint: "身体 +3；银钱 −1", effects: [{ k: "body", v: 3 }, { k: "silver", v: -1 }], then: "你没有去。冬天灶上暖和，你坐在窗下做针线，听外头织机响。" }
      ]
    },

    /* ══════════ 晚年 ══════════ */

    {
      id: "w97.popo", cat: "家族", title: "你成了婆婆", age: [46, 68], weight: 12, once: true, sex: "female",
      when: { flagNot: ["nun"] },
      text: [
        "儿子娶了媳妇，进门第三日下厨。",
        "灶台是你用了三十年的，锅的深浅你熟。",
        "媳妇站在那儿，手不知道往哪放。你忽然想起自己那一天。"
      ],
      options: [
        { text: "照婆婆当年待你的样子待她", hint: "声望 +5；身体 −2", effects: [{ k: "fame", v: 5 }, { k: "body", v: -2 }], then: "你站在门口不说话，看着她。她手忙脚乱。你说：「盐要后放。」" },
        { text: "把钥匙给她", hint: "声望 +8；身体 +4", effects: [{ k: "fame", v: 8 }, { k: "body", v: 4 }], then: "你把米缸的钥匙搁在她手里，说：「你管罢，我老了。」她愣了很久，眼睛红了。" },
        { text: "什么都不说，回屋去", hint: "无得失", effects: [], then: "你回屋坐着，听见灶间锅铲响。响得不对，你也没出去。" }
      ]
    },
    {
      id: "w97.laonian", cat: "家族", title: "老", age: [60, 84], weight: 10, once: true, sex: "female",
      text: [
        "你七十了。牙掉了大半，眼睛还能穿针。",
        "儿子们分了家。轮到谁家，就在谁家吃饭，一月一换。",
        "这个月在大儿子家。媳妇端来的粥，比上个月稀。"
      ],
      options: [
        { text: "不说", hint: "身体 −6；声望 +2", effects: [{ k: "body", v: -6 }, { k: "fame", v: 2 }], then: "你把粥喝了。喝完了坐在门槛上晒太阳，晒到日头偏西。" },
        { text: "说一句", hint: "声望 −4；身体 +2", effects: [{ k: "fame", v: -4 }, { k: "body", v: 2 }], then: "你说：「这粥，能照见人了。」媳妇没接话，第二天换了干饭，脸色也换了。" },
        { text: "自己开火", hint: "银钱 −3；身体 +3", effects: [{ k: "silver", v: -3 }, { k: "body", v: 3 }], then: "你在柴房支了个小灶，自己煮。米是攒的，菜是院里种的。儿子来劝过两回，你没应。" }
      ]
    }
  );
})(window.PACK_BASE);
