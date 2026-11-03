/* 生在何朝 · 各朝专有事件 卷八：东汉、三国
 * 东汉补的是门第与举主，三国补的是兵与粮——乱世里，这两样比什么都实在。
 * 前缀 e6. / s6.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 东汉 ══════════ */
  B.eraEvents.ehan = (B.eraEvents.ehan || []).concat([

    {
      id: "e6.shangji", cat: "官府", title: "上计", age: [22, 55], weight: 13, when: { minKnowledge: 28 },
      text: [
        "岁终，郡国遣{{上计吏|郡国每年遣吏赴京，呈户口、垦田、钱谷之数}}赴京，条陈一岁之事。",
        "太守选人，点了你的名。"
      ],
      options: [
        { text: "去", hint: "身体 −5；或得赏识", effects: [{ k: "body", v: -5 }, { k: "official", v: 8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -6 }], loseNote: "数对不上，被尚书台驳了回来。太守脸上不好看。" }, then: "车走了二十天。到京师那日，你在{{司徒府|三公之一，掌四方民事}}门外站了一个时辰，才轮到递册。" },
        { text: "推给别人", hint: "声望 −3；免了奔波", effects: [{ k: "fame", v: -3 }], then: "你说家中老母病重。太守准了，另派了一个主簿去。" },
        { text: "去，把数做实", hint: "身体 −7；声望 +8", effects: [{ k: "body", v: -7 }, { k: "fame", v: 8 }, { k: "official", v: 5 }], then: "你在驿舍里核了三夜的簿子，把虚报的四百户改了回来。太守知道后，骂了你一句「死心眼」。" }
      ]
    },
    {
      id: "e6.mendi", cat: "家族", title: "门第", age: [14, 26], weight: 14, once: true,
      text: [
        "有人来提亲，对方是县里的著姓。",
        "媒人说得很直：他们家肯低就，是看你有才；但你家的门第，往后不许提。" 
      ],
      options: [
        { text: "应下", hint: "声望 +8；族中受气", effects: [{ k: "fame", v: 8 }, { k: "favor", v: -6 }, { k: "silver", v: 5 }], setFlag: ["married"], then: "成亲那日，女方的车马比你家宅子还长。你母亲站在门口，一直没敢往前站。" },
        { text: "回绝", hint: "声望 −4；骨气", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 4 }], then: "你父亲说，你这一拒，往后县里没人敢来提了。但他说这话时，眼里有点亮。" },
        { text: "应下，但要以妻礼不以妾礼", hint: "声望 +4；或谈不成", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 6 }], lose: [{ k: "fame", v: -6 }], loseNote: "媒人拂袖而去。此后三年，无人提亲。" }, then: "你把话说明白了。媒人愣了一会儿，说要回去问。" }
      ]
    },
    {
      id: "e6.juying", cat: "科举", title: "举主", age: [20, 50], weight: 13, when: { minFame: 15 },
      text: [
        "你被太守举为{{茂才|东汉避光武讳，改秀才为茂才}}。按例，举主与举子有君臣之分。",
        "三年后，太守因赃下狱。"
      ],
      options: [
        { text: "上书为举主辩", hint: "声望 +12；或有牵连", effects: [{ k: "fame", v: 12 }, { k: "grudge", v: 8 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "official", v: -10 }, { k: "body", v: -8 }], loseNote: "朝廷说你结党。官丢了，人被遣回原籍。" }, then: "你在宫门外跪了半日。守门的郎官看了你几次，没赶你走。" },
        { text: "不闻不问", hint: "官职保住；声望 −10", effects: [{ k: "fame", v: -10 }, { k: "official", v: 3 }], then: "你什么也没做。后来同僚说起此事，你只低头喝茶。" },
        { text: "私下送去钱粮", hint: "银钱 −8；情义两全", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 6 }, { k: "favor", v: 8 }], then: "你托人送了两车粮到他家。他儿子在门口磕了一个头，什么也没说。" }
      ]
    },
    {
      id: "e6.yaoyan", cat: "世变", title: "童谣", age: [12, 65], weight: 12,
      text: [
        "市上孩子唱：{{「千里草，何青青」|董卓未败时的童谣，暗拆「董」字}}。",
        "唱的人不懂，听的人心里都明白。"
      ],
      options: [
        { text: "跟着唱", hint: "声望 +2；或有祸", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -4 }], loseNote: "有吏来查。抓了三个唱的，罚了钱，打了一顿。" }, then: "你和几个孩子在巷口唱了半日。后来这首歌传遍了整个州。" },
        { text: "叫孩子别唱", hint: "声望 +4；或得罪邻人", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 4 }], then: "你把他们赶走了。孩子的母亲在门口骂了一句，说你管得宽。" },
        { text: "记下来，说给别人听", hint: "声望 +6；或有祸", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: 2 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "body", v: -10 }], loseNote: "话传到不该去的地方。有人夜里来敲门，把你带走问了两天。" }, then: "你把这句写在了简上。多年之后再看，纸都黄了，字还认得出。" }
      ]
    },
    {
      id: "e6.zhishi", cat: "生计", title: "织室", age: [12, 45], weight: 12, sex: "female",
      text: [
        "郡里有织室，招女工，管饭，按件给钱。",
        "一天织三丈，手快的一日能织四丈。"
      ],
      options: [
        { text: "去", hint: "银钱 +4；身体 −5", effects: [{ k: "silver", v: 4 }, { k: "body", v: -5 }], then: "手指头第一年就磨出了茧，后来茧上又磨出茧。冬天织机的声音，睡着都听得见。" },
        { text: "在家里织，交官", hint: "银钱 +2；自由些", effects: [{ k: "silver", v: 2 }, { k: "body", v: -3 }], then: "你把机子搬回了家。白天做家务，夜里织到三更，油灯点得省。" },
        { text: "不织，去做别的", hint: "银钱 +1；身体无损", effects: [{ k: "silver", v: 1 }], then: "你去帮人舂米、看孩子、割草。挣得零碎，但不必整日坐在机前。" }
      ]
    },
    {
      id: "e6.shishu", cat: "学问", title: "家法", age: [12, 30], weight: 12, when: { minKnowledge: 20 },
      text: [
        "你家三代传《欧阳尚书》，有{{家法|汉代经学世家世代相传的章句训诂}}，不传外人。",
        "邻县有人带着十匹绢来，要拜入门下。"
      ],
      options: [
        { text: "收下，破例传他", hint: "银钱 +10；族中不满", effects: [{ k: "silver", v: 10 }, { k: "favor", v: -6 }, { k: "knowledge", v: 4 }], then: "他学了三年，后来做了郡吏。族里的叔父说你把家法卖了。" },
        { text: "不收，家法不可外传", hint: "声望 +6；银钱不收", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: 3 }], then: "你把绢退回去，说：「这不是钱的事。」那人走时，把绢留在了门槛上。" },
        { text: "收下，但只教章句不教大义", hint: "银钱 +10；学识 +2", effects: [{ k: "silver", v: 10 }, { k: "knowledge", v: 2 }], then: "你教他背，不讲。他背了一年，问了一句为什么，你说：「先背。」" }
      ]
    },
    {
      id: "e6.fuyao", cat: "市井", title: "服妖", age: [16, 60], weight: 10,
      text: [
        "城里忽然流行一种窄袖短衣，士人说是{{服妖|古以奇装异服为妖，谓其乱常}}。",
        "县里下文，禁穿。可街上穿的人越来越多。"
      ],
      options: [
        { text: "不穿，守旧制", hint: "声望 +4；被同辈笑", effects: [{ k: "fame", v: 4 }, { k: "favor", v: -3 }], then: "你仍旧穿宽袍大袖。年轻人在背后笑你，你听见了，没回头。" },
        { text: "照穿", hint: "声望 −4；在年轻人里吃得开", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 6 }], then: "窄袖方便，做事利索。你穿了一个月，觉得自己走路都快了些。" },
        { text: "穿，但外面套回旧式外袍", hint: "两边都不得罪", effects: [{ k: "fame", v: 1 }, { k: "favor", v: 3 }, { k: "silver", v: -2 }], then: "里头窄袖，外头宽袍。街上、衙门里都过得去，只是天热时难受。" }
      ]
    },
    {
      id: "e6.huanglao", cat: "方外", title: "方术", age: [18, 65], weight: 11,
      text: [
        "有个方士在县里支了摊，说他能{{辟谷|不食五谷，只服气与药，方士常以此夸人}}，也能治百病。",
        "求他的人排到街口。"
      ],
      options: [
        { text: "花钱求一丸药", hint: "银钱 −5；或有验", effects: [{ k: "silver", v: -5 }], gamble: { winChance: 0.3, win: [{ k: "body", v: 4 }], lose: [{ k: "body", v: -6 }], loseNote: "药吃了三天，泻得站不住。" }, then: "药丸是黑的，有一股焦味。他说，服后七日不可食谷。" },
        { text: "不信，走开", hint: "无得失", effects: [], then: "你从他摊前走过。他叫住你，说你眉间有黑气。你没理。" },
        { text: "揭穿他", hint: "声望 +6；或被人恨", effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }, { k: "fame", v: -6 }], loseNote: "他叫了几个弟子，把你围在街角。" }, then: "你当众问他：既已辟谷，为何每夜去后巷吃饭？围观的人笑了。" }
      ]
    },
    {
      id: "e6.qianDu", cat: "世变", title: "迁都", age: [12, 70], weight: 16, once: true, years: [190, 191],
      text: [
        "董卓议迁都长安。洛阳数百万人，限期西行。",
        "官军在街上放火，烧的是自家的宫室与民房。"
      ],
      options: [
        { text: "跟着往西走", hint: "身体 −14；或活下来", effects: [{ k: "body", v: -14 }, { k: "silver", v: -5 }], gamble: { deathChance: 0.18, cause: "兵乱" }, then: "走了二十天。路上有车翻在沟里的，没人去扶。你回头看过一次，洛阳那边的天是红的。" },
        { text: "往东投奔别处", hint: "身体 −12；离开故土", effects: [{ k: "body", v: -12 }, { k: "fame", v: -4 }], gamble: { deathChance: 0.15, cause: "兵乱" }, then: "你带着一家人往东。走到陈留，身上的钱只剩一半。" },
        { text: "留下，躲进山里", hint: "身体 −10；粮 −8", effects: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], then: "山里有野果，也有别的人。你在山洞里住了三个月，出来时洛阳已经是一片焦土。" }
      ]
    },
    {
      id: "e6.diannong", cat: "官府", title: "劝农", age: [22, 60], weight: 11,
      text: [
        "太守下{{劝农书|郡守春耕时颁文劝课农桑}}，要各县报垦田数。",
        "报多了，租就重；报少了，官要问罪。"
      ],
      options: [
        { text: "照实报", hint: "声望 +4；得罪上司", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], then: "你把实数据报上去。太守把册子摔在案上，说你这县不求上进。" },
        { text: "多报三成", hint: "官职 +4；来年租重", effects: [{ k: "official", v: 4 }, { k: "fame", v: -6 }], then: "太守夸了你一句。第二年秋，按虚数起租，县里逃了十几户。" },
        { text: "照实报，另附一纸说明荒田", hint: "声望 +6；公文写得长", effects: [{ k: "fame", v: 6 }, { k: "knowledge", v: 2 }], then: "你在册后附了一纸，写明哪几乡去年被水、哪几乡人逃。太守看了，没再说什么。" }
      ]
    },
    {
      id: "e6.zupu", cat: "宗族", title: "修谱", age: [35, 70], weight: 10,
      text: [
        "族里要修谱。有人提出，把二百年前那位做过{{二千石|郡守一级，秩二千石}}的祖先接在本支之下。",
        "可族中老人说，那一支早断了。"
      ],
      options: [
        { text: "接上", hint: "声望 +8；族中有人不服", effects: [{ k: "fame", v: 8 }, { k: "grudge", v: 6 }], then: "谱上添了一行小字，把两支接了起来。此后你家出门，别人称呼前头多了个「某氏」。", },
        { text: "不接，照实修", hint: "声望 −2；心里安稳", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 4 }], then: "谱修成了薄薄一册，从头到尾都是种田的。老人摸着谱说，这样好，睡得着。" },
        { text: "接上，但注明「疑」", hint: "两全", effects: [{ k: "fame", v: 4 }, { k: "favor", v: 2 }], then: "你在行末写了一个「疑」字。族人问这是什么意思，你说：万一有人来查，也好说话。" }
      ]
    },
    {
      id: "e6.yizhuang", cat: "宗族", title: "义庄", age: [30, 65], weight: 10, when: { minSilver: 30 },
      text: [
        "族中提议置{{义庄|族中共置之田，租入以赡贫族}}，买田二十亩，租给族里最穷的几户种。",
        "钱要各家摊，你家摊得最多。"
      ],
      options: [
        { text: "出钱", hint: "银钱 −20；声望 +12", effects: [{ k: "silver", v: -20 }, { k: "fame", v: 12 }, { k: "favor", v: 10 }], setFlag: ["yizhuang"], then: "田买了，契上写的是族名。第一年租入的粟，接济了七户人家。" },
        { text: "少出些", hint: "银钱 −6；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "你说家中也紧。族老没说什么，把数改了。此后再议族事，你的话轻了些。" },
        { text: "不出，说养不起别人", hint: "声望 −8", effects: [{ k: "fame", v: -8 }, { k: "favor", v: -6 }], then: "你说自家孩子还吃不饱。这话没错，但族里记了很久。" }
      ]
    }

  ]);

  /* ══════════ 三国 ══════════ */
  B.eraEvents.sg = (B.eraEvents.sg || []).concat([

    {
      id: "s6.zhengding", cat: "军旅", title: "征丁", age: [16, 45], weight: 16, sex: "male",
      text: [
        "军府下牒，一户抽一丁。你家有两个男丁。",
        "吏说，抽谁由你家自己定，定不出来就两个都带走。"
      ],
      options: [
        { text: "自己去", hint: "身体 −10；家中保住劳力", effects: [{ k: "body", v: -10 }, { k: "fame", v: 6 }], gamble: { deathChance: 0.16, cause: "战殁" }, then: "你走那天，弟弟送到村口。你让他回去，他站着没动，直到看不见。" },
        { text: "让弟弟去", hint: "声望 −6；少一人种田", effects: [{ k: "fame", v: -6 }, { k: "favor", v: -8 }], gamble: { deathChance: 0.16, cause: "战殁" }, then: "弟弟十六岁，还没长开。他走的时候，母亲给他缝了三双鞋。" },
        { text: "花钱免一人", need: { minSilver: 12 }, hint: "银钱 −12；一人免役", effects: [{ k: "silver", v: -12 }, { k: "official", v: 4 }], then: "钱交了，牒上划掉一个名字。吏说，明年要是再抽，可就不认这个了。" }
      ]
    },
    {
      id: "s6.junliang", cat: "军旅", title: "军粮", age: [18, 60], weight: 15,
      text: [
        "大军过境，就地征粮。",
        "你家的粮刚收上场，还摊在院里晒。"
      ],
      options: [
        { text: "全交", hint: "粮 −12；保住家", effects: [{ k: "grain", v: -12 }, { k: "fame", v: 4 }], then: "军吏写了一张{{借券|军中征粮给券，战后可兑，多不兑}}给你。你把券收进匣子，此后再没拿出来过。" },
        { text: "藏一半", hint: "粮 −5；或有祸", effects: [{ k: "grain", v: -5 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], loseNote: "军吏翻出了藏粮，说你通敌。挨了一顿打，粮还是全拉走了。" }, then: "你连夜把粟挑到后山，埋在沟里。上面盖了柴。" },
        { text: "跟着运粮，抵作征额", hint: "粮 −4；身体 −8", effects: [{ k: "grain", v: -4 }, { k: "body", v: -8 }, { k: "fame", v: 6 }], then: "你推着车走了七天。回来时瘦了一圈，但家里的粮保住了一半。" }
      ]
    },
    {
      id: "s6.tunzhong", cat: "世变", title: "冢中", age: [18, 55], weight: 11, sex: "male",
      text: [
        "军中缺钱，有校尉带人去掘前朝的冢。",
        "他说，死人用不着这些东西。"
      ],
      options: [
        { text: "跟着去", hint: "银钱 +25；声望 −10", effects: [{ k: "silver", v: 25 }, { k: "fame", v: -10 }, { k: "luck", v: -6 }], then: "墓道里的水没到腰。你们点了火把进去，金银堆里有几具没有烂完的骨头。" },
        { text: "不去", hint: "声望 +4；得罪校尉", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], then: "你说家里有事。校尉看了你一眼，此后派给你的都是最苦的差事。" },
        { text: "去，但只取铜器不取葬物", hint: "银钱 +10；心里过得去", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -2 }], then: "你搬了几件铜器出来，把棺盖重新合上。走的时候，你在墓道口拜了一拜。" }
      ]
    },
    {
      id: "s6.qingtán", cat: "学问", title: "清谈", age: [20, 50], weight: 12, when: { minKnowledge: 35 },
      text: [
        "几位名士在竹林下清谈，说的是{{有无之辨|魏晋玄学命题，出《老子》《庄子》}}。",
        "有人请你入座。"
      ],
      options: [
        { text: "入座，与之辩", hint: "学识 +6；声望 +8", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -6 }], loseNote: "你说了三句，被人一句话问住。场面冷了片刻。" }, then: "你说了半个时辰。有人点头，有人摇扇。散时天黑了，谁也没说服谁。" },
        { text: "不入，说这是空谈", hint: "声望 −4；落个实在", effects: [{ k: "fame", v: -4 }, { k: "knowledge", v: 2 }], then: "你说天下未定，谈这个做什么。有人笑了笑，说你俗。" },
        { text: "坐着听，不开口", hint: "学识 +3；无得失", effects: [{ k: "knowledge", v: 3 }], then: "你听了一下午。回去的路上想，他们说的那些，好像都有道理，又好像都没有用。" }
      ]
    },
    {
      id: "s6.jiangxiang", cat: "军旅", title: "降将", age: [22, 60], weight: 12,
      text: [
        "敌军一员将官来降，带了两百人。",
        "主帅问你：用，还是不用？"
      ],
      options: [
        { text: "用，给他原部", hint: "兵 +200；或有反复", effects: [{ k: "troops", v: 200 }, { k: "command", v: 200 }], gamble: { winChance: 0.65, win: [], lose: [{ k: "troops", v: -200 }, { k: "body", v: -10 }], loseNote: "三个月后，他带着人又回去了，还带走了你的布防。" }, then: "你把印交给他。他跪下磕了头，说此生不背。" },
        { text: "用，但打散其部", hint: "command +80；稳妥", effects: [{ k: "command", v: 80 }, { k: "fame", v: 4 }], then: "两百人分入三营。他做了别部司马，手下没有一个是旧部。" },
        { text: "不用，遣散", hint: "声望 −4；少二百兵", effects: [{ k: "fame", v: -4 }], then: "你给了粮，让他们走。他走时回头看了一眼，什么也没说。" }
      ]
    },
    {
      id: "s6.yantie", cat: "生计", title: "盐井", age: [20, 60], weight: 18, area: ["益州", "蜀", "蜀郡", "巴"],
      text: [
        "蜀中凿盐井，深数十丈，以{{火井|天然气，蜀中煮盐用之}}煮卤。",
        "凿井的钱要几家合出，凿不出盐，钱就白花了。"
      ],
      options: [
        { text: "合钱凿井", need: { minSilver: 15 }, hint: "银钱 −15；或大获", effects: [{ k: "silver", v: -15 }], gamble: { winChance: 0.55, win: [{ k: "silver", v: 60 }], lose: [], loseNote: "凿到四十丈，还是石头。钱花光了，井填了。" }, then: "凿了两年。第三年春天，卤水涌出来，颜色像淡茶。" },
        { text: "不凿，去做运盐的活", hint: "银钱 +6；身体 −5", effects: [{ k: "silver", v: 6 }, { k: "body", v: -5 }], then: "你挑盐走山路，一趟八十里。肩膀上的皮，旧的破了新的又长。" },
        { text: "买现成的盐井份子", need: { minSilver: 25 }, hint: "银钱 −25；年年分利", effects: [{ k: "silver", v: -25 }, { k: "official", v: 3 }], then: "你买了半份井。每年分盐三百斤，卖出去，比种田强。" }
      ]
    },
    {
      id: "s6.chuan", cat: "生计", title: "船", age: [20, 55], weight: 11, area: ["扬州", "吴", "吴郡", "会稽", "荆州"],
      text: [
        "江上往来，全靠船。你家有一条旧船，能载二十石。",
        "军府要征船运粮，给的价钱是市价的一半。"
      ],
      options: [
        { text: "应征", hint: "银钱 +6；船或有损", effects: [{ k: "silver", v: 6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -18 }], loseNote: "船在滩上撞漏了。修船的钱，比运费多三倍。" }, then: "你把船交出去，跟着押运。江上风大，夜里靠岸，人睡在船板上。" },
        { text: "藏船，说已经卖了", hint: "银钱 +3；或有罪", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -10 }], loseNote: "军吏在下游找到了你的船。人挨了打，船也没了。" }, then: "你把船撑进芦苇荡，用树枝盖住。心里想，等这阵过去再说。" },
        { text: "应征，另要一份官凭", hint: "银钱 +10；日后可免一役", effects: [{ k: "silver", v: 10 }, { k: "official", v: 5 }], then: "你要了一张盖印的凭。后来征丁，你拿凭去说，吏看了半天，把你划掉了。" }
      ]
    },
    {
      id: "s6.liumin", cat: "世变", title: "流民", age: [16, 65], weight: 13,
      text: [
        "北边来了一群流民，几百口，聚在城外。",
        "官府不许入城，也不许走。他们就住在城墙根下。"
      ],
      options: [
        { text: "施粥", need: { minGrain: 4 }, hint: "粮 −4；声望 +10", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 10 }, { k: "favor", v: 6 }], then: "你在墙根下支了两口锅。第一天来了一百多人，第二天三百。第三天粮没了。" },
        { text: "雇几个人做工", hint: "银钱 −3；得劳力", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 5 }, { k: "field_wet", v: 1 }], then: "你挑了六个壮实的，管饭，不给钱。他们干了半个月，把水渠修通了。" },
        { text: "闭门，不管", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你把门关了。夜里听见墙外有孩子哭，哭了很久，后来就不哭了。" }
      ]
    },
    {
      id: "s6.shishou", cat: "官府", title: "守城", age: [18, 60], weight: 14,
      text: [
        "敌军围城，城中粮可支两月。",
        "守将说：要守，就得把城外的房子全烧了，免得敌人据为掩体。"
      ],
      options: [
        { text: "烧", hint: "声望 −6；城可守", effects: [{ k: "fame", v: -6 }, { k: "body", v: -6 }], gamble: { deathChance: 0.14, cause: "城破" }, then: "你亲手点着了自己家的屋檐。火烧起来的时候，你女人跪在地上，没哭出声。" },
        { text: "不烧，只拆", hint: "声望 +4；费时", effects: [{ k: "fame", v: 4 }, { k: "body", v: -10 }], gamble: { deathChance: 0.16, cause: "城破" }, then: "你们拆了三天，把木料搬进城当滚木。敌人来时，城外只剩一片地基。" },
        { text: "带家人出城，不守了", hint: "离开；或有兵祸", effects: [{ k: "fame", v: -12 }, { k: "body", v: -6 }], gamble: { deathChance: 0.18, cause: "兵乱" }, then: "夜里吊下城墙。走了五里，回头看，城头的火把还是那么多。" }
      ]
    },
    {
      id: "s6.xiangdang", cat: "乡里", title: "乡党", age: [25, 60], weight: 10,
      text: [
        "同乡在外做官的，托你照看他在老家的老母。",
        "他说，日后必有回报。"
      ],
      options: [
        { text: "照看", hint: "银钱 −4；人情记下", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 10 }, { k: "fame", v: 4 }], then: "你每月送一石米过去。老太太话不多，每次都送到门口，看你走远。" },
        { text: "推说家中也难", hint: "无得失", effects: [], then: "你说自家也紧。他点点头，说理解。此后书信就少了。" },
        { text: "照看，并把她接到自家住", hint: "银钱 −8；声望 +10", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 10 }, { k: "favor", v: 12 }], then: "老太太住了三年，走的时候把一支簪子留给了你女儿。" }
      ]
    },
    {
      id: "s6.tuntian2", cat: "生计", title: "佃军田", age: [18, 60], weight: 12,
      text: [
        "军府有屯田，租牛、租种，收成官民各半。",
        "比佃豪家的田略强，但逃不掉。"
      ],
      options: [
        { text: "领田种", hint: "粮 +8；身不由己", effects: [{ k: "grain", v: 8 }, { k: "body", v: -5 }], then: "你领了三十亩。牛是官家的，犁是官家的，连种子也是借的。" },
        { text: "不领，仍旧佃私田", hint: "粮 +3；自由些", effects: [{ k: "grain", v: 3 }], then: "私田租重，但主家不管你去哪。荒年能走，屯田不能走。" },
        { text: "领田，并报一份垦荒", hint: "田 +6；或有许多辛苦", effects: [{ k: "field_dry", v: 6 }, { k: "body", v: -10 }], then: "你把河滩上的荒地也报了。割草、翻土、挑肥，第一年只收了三成。" }
      ]
    },
    {
      id: "s6.zangyi", cat: "家族", title: "葬仪", age: [30, 75], weight: 10, once: true, when: { minSilver: 12 },
      text: [
        "老人病重，医生说也就是这几日了。",
        "族里问：棺用何木，葬在何处，要不要请人做{{碑|墓前立石，汉魏间渐行}}。"
      ],
      options: [
        { text: "厚葬", hint: "银钱 −25；声望 +10", effects: [{ k: "silver", v: -25 }, { k: "fame", v: 10 }], then: "棺是柏木的，坟前立了碑。送葬的队伍排出二里地，回来的人都说体面。" },
        { text: "薄葬", hint: "银钱 −5；声望 −2", effects: [{ k: "silver", v: -5 }, { k: "fame", v: -2 }], then: "棺是杉木的，坟在祖坟边上，没有碑。有人说你吝啬，你没解释。" },
        { text: "依遗言，不立碑、不起坟", hint: "银钱 −1；声望 −6", effects: [{ k: "silver", v: -1 }, { k: "fame", v: -6 }, { k: "knowledge", v: 2 }], then: "老人临走前说过，死了就埋了，别立石头。你照做了。多年后，你自己也找不到那座坟了。" }
      ]
    }

  ]);

})(window.PACK_BASE);
