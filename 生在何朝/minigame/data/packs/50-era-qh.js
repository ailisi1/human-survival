/* 生在何朝 · 各朝专有事件 卷一：秦、西汉、新、东汉、三国
 * 只此一朝有的制度与事，别朝不出现。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 秦 ══════════ */
  B.eraEvents.qin = [

    {
      id: "q2.fuji", cat: "官府", title: "傅籍", age: [15, 18], weight: 20, once: true, sex: "male",
      text: [
        "男子十七而傅，著于名籍。从此有徭役，有兵役，有口赋。",
        "里典拿着竹简来，问你今年几何。"
      ],
      options: [
        { text: "实报", hint: "声望 +3；从此有役", effects: [{ k: "fame", v: 3 }], then: "你的名字刻在简上。那年秋天，你第一次被派去修渠，抬了四十天土。" },
        { text: "报小两岁", hint: "声望 −6；被查出则罚", effects: [{ k: "fame", v: -6 }], then: "少报了两岁。里典看了你一眼，把简卷起来，什么也没说。此后两年，你见了里典就绕道走。" },
        { text: "请里典喝酒", need: { minSilver: 2 }, hint: "银钱 −2；声望 +6", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 6 }], then: "一斗酒，一只鸡。里典把简上的年岁写错了，写成了十五。他写字的时候，眼睛看着别处。" }
      ]
    },
    {
      id: "q2.xiaozhuan", cat: "学问", title: "书同文", age: [8, 20], weight: 14, once: true,
      text: [
        "天下初定，书同文，车同轨。废六国异形之字，一律用小篆。",
        "教书的老人说：以后写字，只认一种。"
      ],
      options: [
        { text: "苦学小篆", hint: "学识 +10", effects: [{ k: "knowledge", v: 10 }], then: "你摹了三年。笔画的收尾，要匀，要圆，要像一根吊着的线。你后来做了书吏。" },
        { text: "学隶书，写得快", hint: "学识 +6；为吏之资", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 3 }], then: "隶书是狱吏们私下用的，笔画直，写得快。县里的文书都用它。你因此得了份抄写的差事。" },
        { text: "不学，照旧写自家的字", hint: "学识 −4；声望 −4", effects: [{ k: "knowledge", v: -4 }, { k: "fame", v: -4 }], then: "你还是写齐地的旧字。后来去县里办事，吏不肯收你的状子，说：这字谁认得。" }
      ]
    },
    {
      id: "q2.chidao", cat: "官府", title: "驰道", age: [17, 45], weight: 15,
      text: [
        "诏修驰道，自咸阳通天下。道广五十步，三丈而树，厚筑其外。",
        "郡里发民夫，一里出十人，自带口粮。"
      ],
      options: [
        { text: "应役去", hint: "身体 −8；银钱 −2", effects: [{ k: "body", v: -8 }, { k: "silver", v: -2 }], then: "夯土要夯到三遍。你抬了半年土，肩上的皮破了又结，结了又破。" },
        { text: "出钱雇人代役", need: { minSilver: 8 }, hint: "银钱 −8", effects: [{ k: "silver", v: -8 }], then: "替你的是个外乡人。他走的时候说，这钱够他家里吃一冬。第二年他没回来。" },
        { text: "称病", hint: "声望 −8；官吏来验", effects: [{ k: "fame", v: -8 }, { k: "body", v: -3 }], then: "医官来验，说你没病。罚了兩副甲的钱，又在县狱里关了十天。" }
      ]
    },
    {
      id: "q2.lishan", cat: "官府", title: "骊山", age: [17, 50], weight: 12,
      text: [
        "骊山徒七十万，分作宫室、陵墓两处。刑徒不足，则以徭役补之。",
        "里中传言，去了骊山的人，十个里回来三个。"
      ],
      options: [
        { text: "去。役满可归", hint: "身体 −14；声望 +4", effects: [{ k: "body", v: -14 }, { k: "fame", v: 4 }], then: "你在骊山待了十四个月。运石、凿山、夜里点着火把干活。回来时，你的头发白了一半。" },
        { text: "半路逃", hint: "成亡人；声望 −14", effects: [{ k: "fame", v: -14 }, { k: "body", v: -6 }], then: "你趁夜逃进林子。按律，亡人得而杀之。此后的年岁，你没有户籍，没有田，只有一个假名。" },
        { text: "使钱打点，改作轻役", need: { minSilver: 14 }, hint: "银钱 −14；身体 −4", effects: [{ k: "silver", v: -14 }, { k: "body", v: -4 }], then: "你被派去看守工具。一样是骊山，一样回不了家，只是不用抬石头。" }
      ]
    },
    {
      id: "q2.shangji", cat: "官府", title: "上计", age: [24, 55], weight: 12, when: { minKnowledge: 25 },
      text: [
        "岁终，郡守遣吏诣京师上计：户口、垦田、钱谷、盗贼，皆著于簿。",
        "你的上司把一卷簿子交给你，说：这一趟，别出错。"
      ],
      options: [
        { text: "照实上计", hint: "声望 +8；官职 +6", effects: [{ k: "fame", v: 8 }, { k: "official", v: 6 }], then: "簿子上的数目不好看，但都是真的。丞相府的掾史翻了很久，抬头说：你们郡，倒是老实。" },
        { text: "把户口写多一些", hint: "官职 +10；来年对不上", effects: [{ k: "official", v: 10 }, { k: "fame", v: -6 }], then: "多写了三千户。那年考课你列上等。第二年，朝廷按簿征赋，郡里交不出，你被追责。" },
        { text: "把垦田写少一些", hint: "银钱 +10；声望 −4", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -4 }], then: "少报了两千顷。少报的田，租税进了郡里的私库，也进了你的袖子里。" }
      ]
    },
    {
      id: "q2.fenshu", cat: "世变", title: "焚书", years: [213, 212], age: [12, 60], weight: 26, once: true,
      text: [
        "令下：非博士官所职，天下敢有藏《诗》《书》、百家语者，悉诣守尉杂烧之。",
        "有敢偶语《诗》《书》者弃市。所不去者，医药、卜筮、种树之书。"
      ],
      options: [
        { text: "烧了", hint: "学识 −8；平安", effects: [{ k: "knowledge", v: -8 }], then: "你把两箱简抱到院子里，一本一本丢进火里。烧到《尚书》的时候，你没敢看。" },
        { text: "藏进夹墙", hint: "学识 +6；风险", effects: [{ k: "knowledge", v: 6 }], then: "你在屋后夹墙里砌了个洞，把简用油布裹了塞进去。此后二十年，你每次经过那面墙，脚步都会轻一点。", gamble: { winChance: 0.82, win: [{ k: "fame", v: 4 }], lose: [{ k: "fame", v: -20 }, { k: "body", v: -10 }], winNote: "墙一直没有塌。", loseNote: "邻人告发。吏来拆墙，简被拖到市上烧了，你被判城旦。" } },
        { text: "改抄成律令杂说", hint: "学识 +3；声望 +3", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: 3 }], then: "你把《诗》抄进了《田律》的夹行里。这样的书，吏不会翻。" }
      ]
    },
    {
      id: "q2.zheshu", cat: "官府", title: "谪戍", age: [18, 50], weight: 12,
      text: [
        "有诏：谪治狱吏不直者，筑长城；尝逋亡人、赘婿、贾人，略取陆梁地。",
        "你的名字在谪籍上。往北，或者往南，都没有归期。"
      ],
      options: [
        { text: "北去筑城", hint: "身体 −12；武艺 +6", effects: [{ k: "body", v: -12 }, { k: "martial", v: 6 }], then: "你在阴山下夯土。冬天土冻得像石头，要用火烧过才能夯。同伍的人死了七个。" },
        { text: "南戍五岭", hint: "身体 −8；染瘴", effects: [{ k: "body", v: -8 }, { k: "luck", v: -1 }], then: "南边的林子密得看不见天。第一年，队里死了三成，都是发热死的。" },
        { text: "以钱赎", need: { minSilver: 20 }, hint: "银钱 −20；免戍", effects: [{ k: "silver", v: -20 }], then: "赎钱交上去，名字从谪籍上划了。你回家那天，母亲在门口坐了一夜。" }
      ]
    },
    {
      id: "q2.mingtian", cat: "营生", title: "自实田", age: [20, 60], weight: 13,
      text: [
        "令黔首自实田：各人把自家的田亩数报官，官为定籍。",
        "报多了多缴，报少了，查出来要罚。"
      ],
      options: [
        { text: "照实报", hint: "声望 +5", effects: [{ k: "fame", v: 5 }], then: "你把三十七亩全报了上去。定籍的吏用尺量了一遍，量出来是三十五亩。" },
        { text: "报少五亩", hint: "银钱 +6；声望 −5", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -5 }], then: "少报的五亩，租税都归自己。此后每年秋后，你都比别人多剩两石粟。" },
        { text: "报多十亩，换个爵", hint: "声望 +8；赋重", effects: [{ k: "fame", v: 8 }, { k: "silver", v: -8 }], then: "田多者得爵。你得了公士，能衣绣、能佩剑。可多报的十亩，年年要缴租。" }
      ]
    },
    {
      id: "q2.lianzuo", cat: "官府", title: "连坐", age: [18, 60], weight: 11,
      text: [
        "令民为什伍，而相牧司连坐。一家有罪，九家举发；不举发，十家连坐。",
        "你邻家昨夜有人翻墙出去，没有回来。"
      ],
      options: [
        { text: "去告", hint: "声望 +6；邻里侧目", effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 8 }], then: "你去亭里说了。那家人被带走，回来的是他妻子，一个人。此后村里没人再跟你借东西。" },
        { text: "装作不知", hint: "声望 −4；邻里相亲", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 8 }], then: "你什么也没说。后来那家的妻子给你送了一篮枣，说：谢你没说。" },
        { text: "替他遮掩，说他病在床上", hint: "可能被查出", effects: [{ k: "favor", v: 12 }], then: "你跟亭长说他病了三天。亭长看了你一眼，走了。", gamble: { winChance: 0.7, win: [{ k: "fame", v: 4 }], lose: [{ k: "body", v: -12 }, { k: "fame", v: -12 }], winNote: "亭长信了。", loseNote: "亭长第二日又来，掀开被子，是空的。你被带去打了三十板。" } }
      ]
    },
    {
      id: "q2.shqiu", cat: "世变", title: "沙丘", era: "qin", years: [210, 211], age: [14, 70], weight: 30, once: true,
      text: [
        "始皇崩于沙丘。赵高、李斯矫诏，立胡亥，赐扶苏死。",
        "消息传到郡里，已经是两个月后。官府只说：新君即位，大赦。"
      ],
      options: [
        { text: "照旧过日子", hint: "无变", effects: [], then: "你照旧种田、应役。新君即位，赋役比从前更重，别的没什么不同。" },
        { text: "上书贺新君", hint: "官职 +6；声望 +4", effects: [{ k: "official", v: 6 }, { k: "fame", v: 4 }], then: "贺表递上去，得了一句「忠」。那年冬天你被派去督运军粮，路上冻掉了两个脚趾。" },
        { text: "私下说这不是始皇的意思", hint: "声望 +6；可能获罪", effects: [{ k: "fame", v: 6 }], then: "你在酒桌上说了一句。同桌的人没接话。第二天，亭长来问：昨夜你说了什么。", gamble: { winChance: 0.62, win: [], lose: [{ k: "body", v: -18 }, { k: "fame", v: -10 }], winNote: "亭长问完就走了。", loseNote: "有人告了。你在狱里待了四十天，出来时瘦得脱了形。" } }
      ]
    },
    {
      id: "q2.daze", cat: "世变", title: "大泽乡", era: "qin", years: [209, 210], age: [16, 70], weight: 40, once: true,
      text: [
        "戍卒九百人屯大泽乡，会天大雨，道不通，度已失期。失期，法皆斩。",
        "陈胜、吴广杀尉，揭竿。郡县少年，皆往从之。"
      ],
      options: [
        { text: "从。反正是死", hint: "私兵 +30；声望 +12", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 12 }, { k: "body", v: -6 }], then: "你斩了一根木棍，跟着人群走。走了三个月，你手下有了百来人。", gamble: { deathChance: 0.28, cause: "战殁" } },
        { text: "守家，不走", hint: "身体 −4；粮被征", effects: [{ k: "body", v: -4 }, { k: "grain", v: -8 }], then: "你把门关了三道。兵过境，粮被搜走一半。人没死，田还在。" },
        { text: "举族避入山中", hint: "田产弃；声望 −6", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "fame", v: -6 }], then: "你带着一家老小进了山。在山里住了一年半，靠野菜和溪鱼。出来时，村里一半的房子没了屋顶。" }
      ]
    },
    {
      id: "q2.julu", cat: "世变", title: "巨鹿", era: "qin", years: [207, 208], age: [14, 70], weight: 34, once: true,
      text: [
        "章邯围巨鹿，诸侯皆壁上观。项羽渡河，皆沉船，破釜甑，持三日粮。",
        "九战，秦军大破。秦之亡，自此始。"
      ],
      options: [
        { text: "投楚军", hint: "武艺 +10；私兵 +20", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 20 }], then: "你跟着项羽的兵过了河。沉船那天，你把自己的船也凿了。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "降", hint: "声望 −10；保住性命", effects: [{ k: "fame", v: -10 }], then: "你放下了兵器。二十万秦卒后来在新安被坑了。你因为会写字，被留在营里做文书，活了下来。" },
        { text: "逃回乡里", hint: "身体 −8；声望 −6", effects: [{ k: "body", v: -8 }, { k: "fame", v: -6 }], then: "你脱了甲，往南走了十一天。到家时，乡里已经换了旗。" }
      ]
    }
  ];

  /* ══════════ 西汉 ══════════ */
  B.eraEvents.whan = [

    {
      id: "w2.suanfu", cat: "官府", title: "算赋", age: [16, 60], weight: 16,
      text: [
        "民年十五以上至五十六，出赋钱，人百二十为一算。商贾与奴婢，倍算。",
        "乡啬夫拿着算簿挨户来收。"
      ],
      options: [
        { text: "照数纳", hint: "银钱 −5；声望 +3", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 3 }], then: "一百二十钱，装了半小袋。啬夫点完，在簿上画了个勾。" },
        { text: "少报两口人", hint: "银钱 +4；声望 −5", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -5 }], then: "你把小的两个孩子没报。此后十年，他们在家里的名字跟在外面不一样。" },
        { text: "让老的报「老免」", hint: "银钱 +3；需打点", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -3 }], then: "老人过了五十六，本不该再纳。你让他多报了两岁。他不太愿意，还是报了。" }
      ]
    },
    {
      id: "w2.chaju", cat: "官府", title: "孝廉", age: [20, 50], weight: 14, when: { minKnowledge: 30 },
      text: [
        "郡国岁举孝廉，各一人。举者，多以德称，而德之可见者，不过乡里的几句话。",
        "郡吏来问：里中谁可举？"
      ],
      options: [
        { text: "举自己", hint: "官职 +14；声望 +6", effects: [{ k: "official", v: 14 }, { k: "fame", v: 6 }], then: "你的事迹被写成一行字：「事亲孝，居乡谨」。这一行字，抵得上十年苦读。", gamble: { winChance: 0.66, win: [], lose: [{ k: "fame", v: -14 }, { k: "official", v: -6 }], winNote: "你被举了。", loseNote: "同年有人举了族里的子弟，把你压了下去。你还得再等三年。" } },
        { text: "举族中长者", hint: "声望 +10；人脉 +6", effects: [{ k: "fame", v: 10 }, { k: "favor", v: 6 }], then: "你举了族里的三叔。他被举后做了县令，把你儿子带在身边教书。" },
        { text: "举邻里一个穷书生", hint: "声望 +14", effects: [{ k: "fame", v: 14 }], then: "那人后来做了刺史。他到任的第一件事，是派人给你送来一车粟。附信只有六个字：当年，多谢。" }
      ]
    },
    {
      id: "w2.yantie", cat: "官府", title: "盐铁", age: [20, 65], weight: 14,
      text: [
        "盐铁官营。煮盐、冶铁，皆归大司农，敢私煮私铸者，釱左趾，没入其器物。",
        "你家有一口盐井，或者一座小铁炉。"
      ],
      options: [
        { text: "交给官府，自家去领工钱", hint: "银钱 −6；平安", effects: [{ k: "silver", v: -6 }], then: "器物充官，你成了官营作坊里的匠。工钱不高，但旱涝都有。" },
        { text: "夜里私煮", hint: "银钱 +16；风险", effects: [{ k: "silver", v: 16 }], then: "你在山里搭了个灶，只夜里烧。盐出了，托人往南边卖。", gamble: { winChance: 0.68, win: [], lose: [{ k: "body", v: -16 }, { k: "silver", v: -20 }], winNote: "三年没被查到。", loseNote: "盐官查到了。器物没收，你被釱了左趾，走路从此一瘸一拐。" } },
        { text: "转去做别的营生", hint: "银钱 +4；学识 +3", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 3 }], then: "你把炉子拆了，改种桑养蚕。丝绸的利薄，但不用怕官。" }
      ]
    },
    {
      id: "w2.wuzhu", cat: "市井", title: "五铢", age: [18, 65], weight: 12,
      text: [
        "废半两，行五铢钱。钱面有「五铢」二字，重如其文。",
        "市上还有旧钱在流，一枚旧钱能换两枚新钱，也有人不肯收。"
      ],
      options: [
        { text: "把旧钱都换成新钱", hint: "银钱 −2；安心", effects: [{ k: "silver", v: -2 }], then: "你在市上换了一整天。换完把钱串起来，挂在梁上，夜里听见铜碰铜的声音。" },
        { text: "收旧钱，等它涨", hint: "银钱 +8；风险", effects: [{ k: "silver", v: 8 }], then: "你收了三百枚旧钱。三年后官禁愈严，旧钱贱了，你赔了一半。" },
        { text: "自己盗铸", hint: "银钱 +14；重罪", effects: [{ k: "silver", v: 14 }], then: "你削薄了钱肉，一枚当两枚用。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -20 }, { k: "fame", v: -16 }], winNote: "没人看出来。", loseNote: "有人告发。盗铸者弃市，你因为年幼减死，输作左校。" } }
      ]
    },
    {
      id: "w2.heqin", cat: "世变", title: "和亲", era: "whan", years: [-200, -130], age: [14, 60], weight: 14, once: true,
      text: [
        "匈奴数为边患。朝廷以宗室女为公主，嫁单于，岁奉絮缯酒米。",
        "边郡的人说：这和亲，是把女儿送去换几年不打仗。"
      ],
      options: [
        { text: "以为耻，投军击胡", hint: "武艺 +10；私兵 +10", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 10 }], then: "你去了边郡，从一个什长做起。第一次出塞，你看见草原上没有边。", gamble: { deathChance: 0.22, cause: "战殁" } },
        { text: "在家，不问边事", hint: "无变", effects: [], then: "边事离你很远。你在家种田，秋后照旧纳租。" },
        { text: "托人把女儿送进宫里做家人子", hint: "声望 +6；女儿入宫", effects: [{ k: "fame", v: 6 }, { k: "silver", v: -8 }], then: "女儿进了宫，做了家人子，一辈子没见过皇帝。每年托人捎一次信，信里只说：好。" }
      ]
    },
    {
      id: "w2.qiguo", cat: "世变", title: "七国", era: "whan", years: [-154, -153], age: [12, 70], weight: 32, once: true,
      text: [
        "晁错请削诸侯地。吴王濞合楚、赵、胶西、胶东、菑川、济南，举兵反，名「请诛晁错」。",
        "天下震动。郡县都要表态。"
      ],
      options: [
        { text: "从朝廷，守城", hint: "官职 +8；声望 +6", effects: [{ k: "official", v: 8 }, { k: "fame", v: 6 }], then: "你守了一座小城，守了四十天。周亚夫的兵到时，城里的粮还剩三日。", gamble: { deathChance: 0.18, cause: "守城" } },
        { text: "从吴王", hint: "私兵 +30；声望 +6", effects: [{ k: "troops", v: 30 }, { k: "fame", v: 6 }], then: "你跟着吴王的兵往西走。走到梁国，被挡住了。三个月后，吴王败走，你烧了旗，回了乡。", gamble: { deathChance: 0.3, cause: "兵败" } },
        { text: "闭门不出", hint: "声望 −6；粮被抢", effects: [{ k: "fame", v: -6 }, { k: "grain", v: -10 }], then: "你把门堵了。两边的人都来要粮，你两边都给。给了就没人再来了。" }
      ]
    },
    {
      id: "w2.tuien", cat: "官府", title: "推恩", years: [-127, -120], age: [20, 65], weight: 12, once: true,
      text: [
        "令诸侯王分封子弟为列侯。王之国，自此分而小之。",
        "你是王的次子，本无尺寸之封。"
      ],
      options: [
        { text: "请封", hint: "田 +20 亩；声望 +6", effects: [{ k: "field_wet", v: 12 }, { k: "field_dry", v: 8 }, { k: "fame", v: 6 }], then: "你得了三十里之地，做了侯。侯国很小，但有自己的租税、自己的家吏。" },
        { text: "不请，随兄过活", hint: "声望 +3；受制于兄", effects: [{ k: "fame", v: 3 }], then: "你留在兄长家里，吃他的饭，看他的脸色。他待你不薄，只是从不肯把田契给你看。" },
        { text: "上书愿以封地让兄", hint: "声望 +14", effects: [{ k: "fame", v: 14 }], then: "奏书传开，人称你「让」。朝廷给了你一个虚号，从此你在郡里说话有分量。" }
      ]
    },
    {
      id: "w2.wugu", cat: "世变", title: "巫蛊", era: "whan", years: [-91, -90], age: [12, 70], weight: 30, once: true,
      text: [
        "巫蛊事起。木偶人埋于宫中，掘地得之。丞相公孙贺父子死，卫氏灭。",
        "太子据起兵，兵败，走湖县。京师闭门，搜蛊十日。"
      ],
      options: [
        { text: "闭门，连亲戚也不见", hint: "声望 −4；保命", effects: [{ k: "fame", v: -4 }], then: "你把门关了二十天。每天听见街上有车马声，就以为是来抓人的。" },
        { text: "去官府自陈无蛊", hint: "可能被诬", effects: [], then: "你在廷尉府门前跪了一天，没有吏肯接你的状。", gamble: { winChance: 0.55, win: [{ k: "fame", v: 8 }], lose: [{ k: "body", v: -20 }, { k: "silver", v: -20 }], winNote: "有人记下了你的名字，说你清白。", loseNote: "你说不清自己那几日在哪里。狱吏用铁钳夹你的手指，夹到第三根，你认了。" } },
        { text: "举家出城，投亲于乡", hint: "田产弃一部分；平安", effects: [{ k: "field_wet", v: -6 }, { k: "silver", v: -6 }], then: "你连夜出城，往乡下去。走到第三天，听说城里又杀了三百人。" }
      ]
    },
    {
      id: "w2.luntai", cat: "世变", title: "轮台", era: "whan", years: [-89, -88], age: [16, 70], weight: 18, once: true,
      text: [
        "诏曰：当今务在禁苛暴，止擅赋，力本农。修马复令以补缺，毋乏武备而已。",
        "这道诏书，后人叫它「轮台哀痛之诏」。"
      ],
      options: [
        { text: "回乡务农", hint: "田 +10 亩；身体 +4", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }, { k: "body", v: 4 }], then: "你放下了兵器，回家开荒。那几年，边郡的人陆续回来，荒了的田重新有了人走的路。" },
        { text: "仍在军中", hint: "武艺 +8；官职 +4", effects: [{ k: "martial", v: 8 }, { k: "official", v: 4 }], then: "你没有走。仗少了，兵还得有人带。你在边郡又待了十二年。" },
        { text: "上书言屯田之利", hint: "官职 +10；学识 +4", effects: [{ k: "official", v: 10 }, { k: "knowledge", v: 4 }], then: "你的奏书被采了一部分：拨了三千人在轮台屯田。第一年收的粟，不够种子。" }
      ]
    },
    {
      id: "w2.xiantian", cat: "官府", title: "限田", era: "whan", years: [-7, -5], age: [16, 70], weight: 16, once: true,
      text: [
        "丞相孔光、大司空何武奏：诸侯王、列侯、公主名田，皆有限；关内侯、吏民名田，毋过三十顷；奴婢毋过三十人。",
        "限田之议，行了几个月，又罢了。"
      ],
      options: [
        { text: "趁限令未罢，赶紧买田", hint: "田 +25 亩；银钱 −20", effects: [{ k: "field_wet", v: 15 }, { k: "field_dry", v: 10 }, { k: "silver", v: -20 }], then: "你在限令罢之前买了二十五亩。买完第二个月，令罢了，田价涨了一倍。" },
        { text: "把多的田分到族人名下", hint: "声望 +6；避限", effects: [{ k: "fame", v: 6 }], then: "你把田分写在三个族人名下，契约藏在祠堂的梁上。此后二十年，这些田名义上不是你的。" },
        { text: "上书支持限田", hint: "声望 +10；得罪豪家", effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 10 }], then: "你的奏书在郡里传抄。有人称你「有古大臣风」，也有人在市上拦住你的车，看了你很久。" }
      ]
    },
    {
      id: "w2.taixue", cat: "学问", title: "太学", age: [14, 30], weight: 12, when: { minKnowledge: 35 },
      text: [
        "兴太学，置五经博士。博士弟子五十人，能通一艺以上，补文学掌故。",
        "郡里选人去长安。选上了，食宿由官给。"
      ],
      options: [
        { text: "去长安", hint: "学识 +14；银钱 −10", effects: [{ k: "knowledge", v: 14 }, { k: "silver", v: -10 }], then: "你在长安住了五年。住的是太学旁的客舍，冬天冻得握不住笔。第五年，你通了两经。" },
        { text: "在家从师", hint: "学识 +8；银钱 −4", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -4 }], then: "你跟着乡里的老儒读。他没有官，只有一屋子书和一肚子不合时宜。" },
        { text: "不读经，学律令", hint: "学识 +5；官职 +8", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 8 }], then: "你学了律令，做了狱吏。同僚多是读书人出身，他们看不起你，但有案子还得问你。" }
      ]
    },
    {
      id: "w2.ling", cat: "官府", title: "徙陵", age: [18, 60], weight: 11,
      text: [
        "诏徙郡国豪杰及訾三百万以上于茂陵。名为奉陵，实为削其乡里之根。",
        "吏来点你的家赀。"
      ],
      options: [
        { text: "应徙", hint: "田产折半；声望 +6", effects: [{ k: "field_wet", v: -8 }, { k: "field_dry", v: -6 }, { k: "silver", v: -6 }, { k: "fame", v: 6 }], then: "你举家迁到茂陵。新地方的地贵，人也不认得你。十年后，你在那里又置了一份家业。" },
        { text: "分家，把赀产散给族人", hint: "银钱 −10；声望 +8", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }], then: "你把家产分作五份，各房一份，自己只留薄田。吏再来点，不足三百万，免徙。" },
        { text: "使钱改名籍", need: { minSilver: 20 }, hint: "银钱 −20；留乡", effects: [{ k: "silver", v: -20 }], then: "你把户籍改到了妻族名下。吏来点名，说这户没有你。你留下了，但此后再不能以本姓立契。" }
      ]
    }
  ];

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = [

    {
      id: "x2.wangtian", cat: "世变", title: "王田", years: [9, 12], age: [12, 70], weight: 34, once: true,
      text: [
        "更名天下田曰「王田」，奴婢曰「私属」，皆不得卖买。男口不盈八而田过一井者，分余田予九族邻里乡党。",
        "你家的田，在簿上忽然不姓自家了。"
      ],
      options: [
        { text: "献田", hint: "田 −20 亩；声望 +8", effects: [{ k: "field_wet", v: -12 }, { k: "field_dry", v: -8 }, { k: "fame", v: 8 }], then: "你把多余的田献了。献田的文书上要按手印，你按的时候手很稳。" },
        { text: "隐瞒不报", hint: "保住田；风险", effects: [], then: "你把田契埋在后院。三年后王田制罢了，田还是你的。", gamble: { winChance: 0.7, win: [], lose: [{ k: "body", v: -14 }, { k: "field_wet", v: -10 }], winNote: "没有人来查。", loseNote: "有人告了。你被罚作苦役一年，田没入官。" } },
        { text: "把田分给佃户，各立户", hint: "田 −10 亩；声望 +12", effects: [{ k: "field_wet", v: -6 }, { k: "field_dry", v: -4 }, { k: "fame", v: 12 }], then: "你把田分给了七户佃家，各立户籍。他们从此叫你「东家」，不叫「主人」。" }
      ]
    },
    {
      id: "x2.sishu", cat: "世变", title: "私属", years: [9, 14], age: [10, 70], weight: 18, once: true,
      text: [
        "奴婢曰「私属」，不得卖买。有卖买者，田没入官，奴婢为庶人。",
        "你家里有三口奴婢，是父亲那辈买下的。"
      ],
      options: [
        { text: "放为庶人", hint: "声望 +12；失三口人", effects: [{ k: "fame", v: 12 }, { k: "silver", v: -4 }], then: "你给他们除了籍，各给了两亩田。老头走的时候哭了，说：我在这家四十年。" },
        { text: "照旧留着，只不卖", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你没有卖，也没有放。名册上写着「私属」，实际上还是从前的样子。" },
        { text: "卖了，趁还没禁严", hint: "银钱 +18；声望 −14", effects: [{ k: "silver", v: 18 }, { k: "fame", v: -14 }], then: "你赶在禁令之前脱了手。买主是个远郡的商人。后来听说，那三口人被转卖了两次。" }
      ]
    },
    {
      id: "x2.wujun", cat: "官府", title: "五均", years: [10, 20], age: [18, 65], weight: 16, once: true,
      text: [
        "于长安及五都立五均官，市平物价：物贵则官卖之，物贱则官买之。又令民以钱贷官，月息三分。",
        "市上的米价，从此由官定。"
      ],
      options: [
        { text: "按官价卖粮", hint: "银钱 −6；声望 +4", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }], then: "官价低于市价。你把粮卖给官，少得了几百钱。市平官在簿上记了你的名字。" },
        { text: "私下卖高价", hint: "银钱 +12；风险", effects: [{ k: "silver", v: 12 }], then: "你把粮运到邻县卖。市平官不知道。", gamble: { winChance: 0.65, win: [], lose: [{ k: "silver", v: -16 }, { k: "body", v: -10 }], winNote: "没有人追究。", loseNote: "被市平官查获。粮没入官，你被罚了三个月劳役。" } },
        { text: "向官借贷，扩种", hint: "银钱 +20；负债", effects: [{ k: "silver", v: 20 }, { k: "debt", v: { amt: 24, rate: 0.03, dueYears: 3 } }], then: "你借了两万钱，月息三分。扩种了二十亩。第一年收成好，第二年蝗虫来了。" }
      ]
    },
    {
      id: "x2.gaibi", cat: "市井", title: "改币", years: [9, 14], age: [16, 65], weight: 18,
      text: [
        "罢五铢钱，行大钱：错刀一值五千，契刀一值五百，大泉一值五十。",
        "市上一片乱。昨日的一枚钱，今日只顶半枚。"
      ],
      options: [
        { text: "赶紧把手里的钱换成粮", hint: "粮 +12 石", effects: [{ k: "grain", v: 12 }], then: "你换了十二石粟，堆在屋后。三个月后，粟价涨了三倍，你换对了。" },
        { text: "留着钱，等币制回改", hint: "银钱 −10", effects: [{ k: "silver", v: -10 }], then: "币制没有改回来。你手里的钱，一年后只值原来的三成。" },
        { text: "私铸大泉", hint: "银钱 +20；重罪", effects: [{ k: "silver", v: 20 }], then: "你铸了三百枚大泉，一枚当五十用。", gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -24 }, { k: "fame", v: -20 }], winNote: "用了半年，没人查。", loseNote: "有人告发。铸钱者弃市，你减死一等，徙合浦。" } }
      ]
    },
    {
      id: "x2.gaiming", cat: "官府", title: "改名", years: [9, 20], age: [12, 70], weight: 12,
      text: [
        "改郡县名，改官名。长安曰常安，太守曰大尹，县令曰宰。",
        "一年之内，改了三次。吏写文书，常常写错。"
      ],
      options: [
        { text: "照新名写", hint: "官职 +5；学识 +3", effects: [{ k: "official", v: 5 }, { k: "knowledge", v: 3 }], then: "你把新名背得极熟。有一次上头问起旧名，你答不上来，被记了一过。" },
        { text: "两面都记，写时用新名", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], then: "你在簿子的边角上用淡墨写了旧名。后来这些边角，成了别人查旧事唯一的凭据。" },
        { text: "照旧名写", hint: "声望 −6；被斥", effects: [{ k: "fame", v: -6 }], then: "你写了旧名。文书被退回来三次，第三次上头批了四个字：不晓事体。" }
      ]
    },
    {
      id: "x2.xiongnu", cat: "世变", title: "易印", years: [9, 11], age: [14, 65], weight: 14, once: true,
      text: [
        "遣使匈奴，易单于故印，改「匈奴单于」为「降奴服于」，又分匈奴为十五单于。",
        "单于怒，遣兵入边。边郡的人先知道了。"
      ],
      options: [
        { text: "往内地迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: -6 }], then: "你举家往南走了三百里。走的时候，边上的烽火已经点了三天。" },
        { text: "留在边郡，投军", hint: "武艺 +10；私兵 +12", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 12 }], then: "你留下来了。边郡的兵不够，连种田的也被编了队。", gamble: { deathChance: 0.25, cause: "战殁" } },
        { text: "给匈奴人做通译", hint: "银钱 +14；声望 −12", effects: [{ k: "silver", v: 14 }, { k: "fame", v: -12 }], then: "你通匈奴语，替两边传话。钱来得容易。乡里的人不跟你说话，但也没人敢动你。" }
      ]
    },
    {
      id: "x2.lvlin", cat: "世变", title: "绿林", era: "xin", years: [17, 22], age: [14, 70], weight: 32, once: true,
      text: [
        "荆州饥，民入野泽，掘凫茈而食之。王匡、王凤聚众数百，藏于绿林山中。",
        "不到一年，众至七八千。"
      ],
      options: [
        { text: "入山从之", hint: "私兵 +26；声望 +10", effects: [{ k: "troops", v: 26 }, { k: "fame", v: 10 }, { k: "body", v: -6 }], then: "你带着两个同乡进了山。山里没有粮，先抢的是官仓。", gamble: { deathChance: 0.24, cause: "战殁" } },
        { text: "留在乡里，给山中送粮", hint: "银钱 −6；人脉 +10", effects: [{ k: "silver", v: -6 }, { k: "favor", v: 10 }], then: "你每半月往山里送一次粮。来回走夜路，走了两年，没被人发现。" },
        { text: "组织乡里自守", hint: "私兵 +14；声望 +8", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 8 }], then: "你把乡里的青壮编了队，筑了土墙。乱兵来了两回，都没进村。" }
      ]
    },
    {
      id: "x2.kunyang", cat: "世变", title: "昆阳", era: "xin", years: [23, 24], age: [14, 70], weight: 36, once: true,
      text: [
        "王莽发四十二万人围昆阳。城中兵不满万。",
        "夜有流星坠营中，昼有云如坏山。当营而陨，不及地尺而散。"
      ],
      options: [
        { text: "在城中守", hint: "武艺 +12；声望 +12", effects: [{ k: "martial", v: 12 }, { k: "fame", v: 12 }], then: "你在城头守了四十余日。箭射完了，用瓦。", gamble: { deathChance: 0.3, cause: "守城" } },
        { text: "在外接应", hint: "私兵 +20；声望 +8", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 8 }], then: "你跟着三千敢死士从城西水上冲阵。那天下了大雨，滍水暴涨，淹死的人比杀死的人多。", gamble: { deathChance: 0.22, cause: "战殁" } },
        { text: "称病不往", hint: "声望 −10；保命", effects: [{ k: "fame", v: -10 }], then: "你没有去。昆阳的消息传来时，你在家里磨一把镰刀，磨了很久。" }
      ]
    },
    {
      id: "x2.liumin", cat: "世变", title: "流民", years: [15, 23], age: [10, 70], weight: 20,
      text: [
        "连年旱蝗，关东人相食。流民入关者数十万，饿死者十七八。",
        "村口来了几车人，问有没有活干，只要一口饭。"
      ],
      options: [
        { text: "雇几个，管饭不给钱", hint: "田 +6 亩；粮 −8 石；声望 +4", effects: [{ k: "field_wet", v: 4 }, { k: "field_dry", v: 2 }, { k: "grain", v: -8 }, { k: "fame", v: 4 }], then: "你雇了四个人。他们干得比本村的人还卖力。冬天要给饭，粮食就不够。" },
        { text: "开粥棚，舍粥", hint: "粮 −14 石；声望 +16", effects: [{ k: "grain", v: -14 }, { k: "fame", v: 16 }], then: "你在村口支了两口大锅，舍了四十天。有人喝完粥就倒在路边死了。你叫人抬去埋了。" },
        { text: "关门，不放人进来", hint: "声望 −10；粮保住", effects: [{ k: "fame", v: -10 }], then: "你把门闩上。夜里有人拍门，拍了很久，后来不拍了。" }
      ]
    }
  ];

  /* ══════════ 东汉 ══════════ */
  B.eraEvents.ehan = [

    {
      id: "e2.dutian", cat: "官府", title: "度田", era: "ehan", years: [39, 41], age: [16, 65], weight: 26, once: true,
      text: [
        "诏下州郡检核垦田顷亩及户口年纪。刺史太守多为诈巧，不务实核。",
        "吏带着绳尺上门。量出来的数，跟你报的不一样。"
      ],
      options: [
        { text: "认了量出来的数", hint: "田 −8 亩；声望 +4", effects: [{ k: "field_wet", v: -5 }, { k: "field_dry", v: -3 }, { k: "fame", v: 4 }], then: "吏量得比你家簿上少八亩。你没有争。第二年赋税按新数算，轻了些。" },
        { text: "请吏喝酒，把数往上抬", need: { minSilver: 6 }, hint: "银钱 −6；声望 +8", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 8 }], then: "吏在你家吃了一顿饭，把数往上添了五亩。添的是荒地，不用缴租，但能显家底。" },
        { text: "聚族抗拒", hint: "私兵 +16；声望 −10", effects: [{ k: "troops", v: 16 }, { k: "fame", v: -10 }], then: "族里三百口人拿着锄头站在田埂上。吏退了。第二年，郡里派了兵来。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -16 }, { k: "silver", v: -20 }], winNote: "兵没有来。", loseNote: "兵来了。带头的三个人被斩，你被罚钱赎罪。" } }
      ]
    },
    {
      id: "e2.chenwei", cat: "学问", title: "谶纬", age: [16, 60], weight: 12,
      text: [
        "本朝以赤伏符受命，故重谶纬。《河图》《洛书》与经同尊。",
        "有人说：不通谶，不得为博士。"
      ],
      options: [
        { text: "学谶纬", hint: "学识 +10；官职 +6", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: 6 }], then: "你背了三百条谶语。有一条说「刘氏复兴」，你背到这里，心里动了一下。" },
        { text: "只治经，不治谶", hint: "学识 +6；仕途受阻", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: -6 }], then: "你把《春秋》读得很熟。举孝廉时，郡里问你谶，你说不知。那一年没有举上。" },
        { text: "造一条谶，替人说好话", hint: "银钱 +12；风险", effects: [{ k: "silver", v: 12 }], then: "你编了一句七字的谶，卖给了一个想做官的人。", gamble: { winChance: 0.62, win: [], lose: [{ k: "body", v: -20 }, { k: "fame", v: -20 }], winNote: "没有人查出来。", loseNote: "有人认出是你编的。造谶者弃市，你减死徙边。" } }
      ]
    },
    {
      id: "e2.shangshu", cat: "官府", title: "尚书台", age: [24, 60], weight: 12, when: { minKnowledge: 45 },
      text: [
        "事归台阁。尚书令、尚书仆射以下六人，天下之事皆经其手。三公之权，自此轻。",
        "你在尚书台做了一名令史。"
      ],
      options: [
        { text: "勤于案牍，不与人争", hint: "官职 +8；身体 −4", effects: [{ k: "official", v: 8 }, { k: "body", v: -4 }], then: "你每日看文书到三更。台里的灯，你走得最晚。三年后，尚书令记住了你的名字。" },
        { text: "结好宦官", hint: "官职 +14；声望 −10", effects: [{ k: "official", v: 14 }, { k: "fame", v: -10 }], then: "你替中常侍办了几件事，办得很干净。从此凡是难办的文书，都先经你手。" },
        { text: "依附外戚", hint: "官职 +12；风险", effects: [{ k: "official", v: 12 }], then: "你投在大将军门下。大将军倒的那一年，你在家里等了三个月，没有等到人来拿你。", gamble: { winChance: 0.6, win: [], lose: [{ k: "official", v: -30 }, { k: "body", v: -14 }], winNote: "你躲过去了。", loseNote: "你被免官，下狱三个月。" } }
      ]
    },
    {
      id: "e2.qingyi", cat: "学问", title: "清议", age: [20, 60], weight: 12, when: { minKnowledge: 40 },
      text: [
        "太学生三万余人，各以乡里、师门相标榜。臧否人物，谓之「清议」。",
        "被清议所贬者，往往终身不齿。"
      ],
      options: [
        { text: "参与清议，评点时政", hint: "声望 +14；得罪权贵", effects: [{ k: "fame", v: 14 }, { k: "grudge", v: 10 }], then: "你在太学外的槐树下说了半天。第二天，你的话被抄在纸上，贴到了宫门口的墙上。" },
        { text: "不参与", hint: "声望 −4；平安", effects: [{ k: "fame", v: -4 }], then: "你只是听着。听的人后来大多出了事，你没有。" },
        { text: "替被议者说话", hint: "声望 +10；人脉 +12", effects: [{ k: "fame", v: 10 }, { k: "favor", v: 12 }], then: "你替一个被骂作「贪浊」的郡守辩了几句。后来他复了官，把你的儿子举了孝廉。" }
      ]
    },
    {
      id: "e2.danggu", cat: "世变", title: "党锢", era: "ehan", years: [166, 169], age: [14, 70], weight: 36, once: true,
      text: [
        "宦官诬告李膺等结党，诽讪朝廷。天子震怒，下郡国逮捕党人，布告天下。",
        "名士相次入狱，死者百余人。"
      ],
      options: [
        { text: "自投狱中", hint: "声望 +20；身体 −20", effects: [{ k: "fame", v: 20 }, { k: "body", v: -20 }], then: "你自己走进了狱门。同狱的人都是熟面孔。后来你活着出来了，但名字上了党籍，终身不得为官。" },
        { text: "逃亡，隐姓埋名", hint: "声望 +8；田产弃", effects: [{ k: "fame", v: 8 }, { k: "field_wet", v: -8 }, { k: "silver", v: -10 }], then: "你改了姓，在南方的山里教了十几年书。学生只知道你姓陈。" },
        { text: "上书自辩，与党人绝", hint: "官职 +6；声望 −16", effects: [{ k: "official", v: 6 }, { k: "fame", v: -16 }], then: "你在奏书里说自己与党人从无往还。奏书准了。此后再没有人请你赴宴。" }
      ]
    },
    {
      id: "e2.qiang", cat: "世变", title: "羌乱", years: [107, 170], age: [14, 65], weight: 20,
      text: [
        "羌人反，断陇道。前后用兵十余年，费钱四百余亿。",
        "边郡的男子，多半被征去陇西。"
      ],
      options: [
        { text: "应征", hint: "武艺 +10；身体 −8", effects: [{ k: "martial", v: 10 }, { k: "body", v: -8 }], then: "你在陇西待了三年。羌人的马快，追不上；退的时候，他们追你。", gamble: { deathChance: 0.24, cause: "战殁" } },
        { text: "出钱雇人代役", need: { minSilver: 14 }, hint: "银钱 −14", effects: [{ k: "silver", v: -14 }], then: "你雇了同村的一个后生。他去了半年，回来时少了一条胳膊。" },
        { text: "举家内迁", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }], then: "你迁到了关中。陇西的宅子空着，十年后回去看，屋顶没了，墙还在。" }
      ]
    },
    {
      id: "e2.taixue", cat: "学问", title: "太学", age: [14, 28], weight: 12, when: { minKnowledge: 35 },
      text: [
        "太学讲堂长十丈，广三丈，弟子三万余人。",
        "三万人在一处读书，争的是谁的声音大。"
      ],
      options: [
        { text: "从名师受业", hint: "学识 +14；银钱 −8", effects: [{ k: "knowledge", v: 14 }, { k: "silver", v: -8 }], then: "你拜在一位博士门下。他家门外排着的学生，从早上排到黄昏。你排了三天，才轮上一次问。" },
        { text: "抄书卖钱，顺便读书", hint: "学识 +8；银钱 +8", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: 8 }], then: "你在市上替人抄经。抄一遍能得三百钱，抄的时候自然就记住了。" },
        { text: "不入学，回家治田", hint: "田 +10 亩", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 4 }], then: "你回家了。太学的名声很响，但三万人里，能做官的不到百人。" }
      ]
    },
    {
      id: "e2.huangjin", cat: "世变", title: "黄巾", era: "ehan", years: [184, 186], age: [12, 70], weight: 40, once: true,
      text: [
        "太平道张角以符水治病，十余年间，众徒数十万，连结郡国。",
        "讹言：「苍天已死，黄天当立，岁在甲子，天下大吉。」"
      ],
      options: [
        { text: "从黄巾", hint: "私兵 +32；声望 +10", effects: [{ k: "troops", v: 32 }, { k: "fame", v: 10 }, { k: "body", v: -8 }], then: "你在额上缠了黄巾。跟着队伍走的时候，你觉得天下真能换一次。", gamble: { deathChance: 0.3, cause: "战殁" } },
        { text: "从官军", hint: "武艺 +10；官职 +8", effects: [{ k: "martial", v: 10 }, { k: "official", v: 8 }], then: "你跟着皇甫嵩的兵。长社一战，火烧黄巾，你看见了烧焦的旗。", gamble: { deathChance: 0.18, cause: "战殁" } },
        { text: "筑堡自守", hint: "私兵 +18；田产保", effects: [{ k: "troops", v: 18 }], then: "你没从任何一边。你带着族人筑了个土堡，收了邻村的人。堡里有粮，墙不高，但守住了。" }
      ]
    },
    {
      id: "e2.zhoumu", cat: "官府", title: "州牧", era: "ehan", years: [188, 190], age: [20, 65], weight: 20, once: true,
      text: [
        "改刺史为州牧，选列卿、尚书为州牧，各以本秩居任。州任之重，自此始。",
        "有人劝你：这个位置，可以自己做主了。"
      ],
      options: [
        { text: "受州牧之任，练兵马", hint: "私兵 +40；官职 +12", effects: [{ k: "troops", v: 40 }, { k: "official", v: 12 }], then: "你接了这个州。三年里，你练了两万兵，收了三年的租。朝廷的诏书，你挑着办。" },
        { text: "推辞，只做郡守", hint: "声望 +6；平安", effects: [{ k: "fame", v: 6 }], then: "你推了。做郡守的第五年，州牧换了三个，你还在原来的位置上。" },
        { text: "受任，然后举兵自立", hint: "私兵 +60；声望 +16", effects: [{ k: "troops", v: 60 }, { k: "fame", v: 16 }], then: "你把旗换了。周边三郡来攻，你守住了。", gamble: { winChance: 0.45, win: [], lose: [{ k: "troops", v: -40 }, { k: "body", v: -20 }], winNote: "你成了一方之主。", loseNote: "三郡合兵，你败了，退到山里。" } }
      ]
    },
    {
      id: "e2.dongzhuo", cat: "世变", title: "董卓", era: "ehan", years: [189, 192], age: [14, 70], weight: 32, once: true,
      text: [
        "董卓入洛阳，废少帝，立陈留王。纵兵剽掠，谓之「搜牢」。",
        "又迁都长安，尽徙洛阳人数百万口。步骑驱蹙，饥饿寇掠，积尸盈路。"
      ],
      options: [
        { text: "随驾西迁", hint: "田产弃；声望 +6", effects: [{ k: "field_wet", v: -10 }, { k: "field_dry", v: -8 }, { k: "fame", v: 6 }], then: "你跟着人群往西走。走了二十天，路上看见的车，多半是空的。" },
        { text: "留在洛阳，投关东兵", hint: "私兵 +24；声望 +12", effects: [{ k: "troops", v: 24 }, { k: "fame", v: 12 }], then: "关东兵到了洛阳，洛阳已经烧成白地。他们在废墟上摆了酒席。", gamble: { deathChance: 0.2, cause: "兵乱" } },
        { text: "避入荆州", hint: "田产折半；学识 +6", effects: [{ k: "field_wet", v: -8 }, { k: "knowledge", v: 6 }], then: "你往南走到荆州。那里没有兵，但有从北边来的几万人。地价一年涨了三倍。" }
      ]
    },
    {
      id: "e2.maiguan", cat: "官府", title: "卖官", years: [178, 189], age: [24, 65], weight: 12,
      text: [
        "开鸿都门，榜卖官爵。公千万，卿五百万。富者则先入钱，贫者到官而后倍输。",
        "有个县令的缺，标价四百万。"
      ],
      options: [
        { text: "买", need: { minSilver: 40 }, hint: "银钱 −40；官职 +20", effects: [{ k: "silver", v: -40 }, { k: "official", v: 20 }], then: "你买了那个缺。到任第一天，你就开始算：这四百万，几年能收回来。" },
        { text: "不买，等举荐", hint: "官职 +4", effects: [{ k: "official", v: 4 }], then: "你等了六年。六年里，那个位置换了四个人，都是买的。" },
        { text: "替人垫钱，做他的债主", hint: "银钱 −30；人脉 +20", effects: [{ k: "silver", v: -30 }, { k: "favor", v: 20 }], then: "你垫钱给一个同乡买了县丞。他到任后，县里的事你先知道。" }
      ]
    }
  ];

  /* ══════════ 三国 ══════════ */
  B.eraEvents.sg = [

    {
      id: "s2.tuntian", cat: "官府", title: "屯田", age: [18, 60], weight: 16,
      text: [
        "募民屯田许下，得谷百万斛。州郡例置田官，所在积谷。",
        "屯田客种官田，用官牛者，官六民四；用私牛者，官民各半。"
      ],
      options: [
        { text: "应募为屯田客", hint: "粮 +14 石；无田产", effects: [{ k: "grain", v: 14 }, { k: "field_wet", v: 2 }], then: "你成了屯田客。分到三十亩，一半的谷要交给官。比起流离，这算是有个着落。" },
        { text: "不附屯田，自耕私田", hint: "田 +8 亩；赋重", effects: [{ k: "field_wet", v: 5 }, { k: "field_dry", v: 3 }, { k: "silver", v: -4 }], then: "你守着自家的几亩薄田。私田的赋比屯田重，但田是自己的。" },
        { text: "去军中做屯田都尉的吏", hint: "官职 +8；学识 +4", effects: [{ k: "official", v: 8 }, { k: "knowledge", v: 4 }], then: "你替都尉管簿册：谁家几口，用官牛几头，该交几斛。数目错一笔，要自己补。" }
      ]
    },
    {
      id: "s2.shijia", cat: "官府", title: "质任", age: [16, 55], weight: 12, sex: "male",
      text: [
        "士家之制：兵士妻子皆聚居邺都，名为「质任」。士死，妻不得改嫁，配与同籍。",
        "你的名字在士籍上。"
      ],
      options: [
        { text: "安于士籍，世代为兵", hint: "武艺 +8；私兵 +10", effects: [{ k: "martial", v: 8 }, { k: "troops", v: 10 }], then: "你父亲是兵，你是兵，儿子也是。你只在换防的那几年，出过邺城。" },
        { text: "花钱脱籍", need: { minSilver: 30 }, hint: "银钱 −30；改民籍", effects: [{ k: "silver", v: -30 }, { k: "fame", v: 4 }], then: "你把名字从士籍上抹了。办成那天，你在城县门口站着，忽然不知道往哪里走。" },
        { text: "逃籍", hint: "声望 −12；亡命", effects: [{ k: "fame", v: -12 }, { k: "body", v: -6 }], then: "你逃了。士家逃亡，罪及妻子。你的妻子被配给了别人，你从此没再见过她。" }
      ]
    },
    {
      id: "s2.jiupin", cat: "官府", title: "九品", age: [20, 55], weight: 14,
      text: [
        "州郡皆置中正，以定其选。区别人物，第其高下，定为九品。",
        "中正来家，问你的家世、德行、才具。"
      ],
      options: [
        { text: "备厚礼见中正", need: { minSilver: 18 }, hint: "银钱 −18；官职 +16", effects: [{ k: "silver", v: -18 }, { k: "official", v: 16 }], then: "中正把你看作「上品」。你父亲的名字，他听过。" },
        { text: "以才学自陈", hint: "学识 +6；官职 +6", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 6 }], then: "你把自己的文章呈上去。中正读了两遍，定为中上。他说：寒素至此，已是难得。" },
        { text: "不去，闭门读书", hint: "学识 +10；官职 −4", effects: [{ k: "knowledge", v: 10 }, { k: "official", v: -4 }], then: "你没有去。九品定了别人。此后二十年，你写了三本书，没有一本刻出来。" }
      ]
    },
    {
      id: "s2.caochan", cat: "世变", title: "代汉", era: "sg", years: [220, 221], age: [14, 70], weight: 26, once: true,
      text: [
        "魏王丕受禅于汉，改元黄初。汉献帝封山阳公，奉汉正朔。",
        "四百年汉家天下，至此而终。"
      ],
      options: [
        { text: "劝进", hint: "官职 +10；声望 −4", effects: [{ k: "official", v: 10 }, { k: "fame", v: -4 }], then: "劝进表上有你的名字。新朝留任，你还是原来的官，只是印上的字换了。" },
        { text: "不仕新朝，归乡", hint: "声望 +12；官职 −20", effects: [{ k: "fame", v: 12 }, { k: "official", v: -20 }], then: "你把官印挂在梁上，回了乡。有人称你「汉之遗民」，你不接这个话。" },
        { text: "痛哭于汉庙", hint: "声望 +16；风险", effects: [{ k: "fame", v: 16 }], then: "你在汉的宗庙前哭了一场。围观的人很多。", gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -16 }, { k: "fame", v: -10 }], winNote: "没有人来抓你。", loseNote: "有司以「非所宜言」论罪，你被收系狱中三月。" } }
      ]
    },
    {
      id: "s2.yiling", cat: "世变", title: "夷陵", era: "sg", years: [221, 223], age: [14, 70], weight: 32, once: true,
      text: [
        "先主伐吴，自巫峡建平连围至夷陵界，立数十屯。",
        "吴将陆逊按兵不战，相守七八月，而后火烧连营。"
      ],
      options: [
        { text: "在蜀军中", hint: "武艺 +10；私兵 +18", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 18 }], then: "你在山上扎营。那夜风很大，火从下面烧上来，一路烧到山顶。", gamble: { deathChance: 0.34, cause: "战殁" } },
        { text: "在吴军中", hint: "武艺 +12；官职 +8", effects: [{ k: "martial", v: 12 }, { k: "official", v: 8 }], then: "你跟着陆逊的火攻冲上去。烧了四十余营，追到马鞍山。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "在后方运粮", hint: "银钱 +8；身体 −6", effects: [{ k: "silver", v: 8 }, { k: "body", v: -6 }], then: "你在后面押粮。前面败下来的消息传来，你把粮车掉头，走了三天三夜。" }
      ]
    },
    {
      id: "s2.wuzhangyuan", cat: "世变", title: "五丈原", era: "sg", years: [234, 235], age: [14, 70], weight: 28, once: true,
      text: [
        "丞相亮出斜谷，屯五丈原，分兵屯田，为久驻之计。",
        "司马懿坚守不出。相持百余日。八月，亮卒于军中。"
      ],
      options: [
        { text: "从蜀军北伐", hint: "武艺 +10；私兵 +16", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 16 }], then: "你在渭南屯田。丞相死后，全军退回汉中。你回头看了一眼北边的山。", gamble: { deathChance: 0.2, cause: "病殁" } },
        { text: "从魏军守渭", hint: "官职 +8；私兵 +12", effects: [{ k: "official", v: 8 }, { k: "troops", v: 12 }], then: "你守渭水北岸，不战。蜀军退后，营里的人都松了一口气，也有人觉得没意思。" },
        { text: "在家，不问南北", hint: "田 +8 亩", effects: [{ k: "field_wet", v: 5 }, { k: "field_dry", v: 3 }], then: "你在关中种田。两边的兵来回过，你的田被踩了两回，秋后还是收了。" }
      ]
    },
    {
      id: "s2.gaopingling", cat: "世变", title: "高平陵", era: "sg", years: [249, 250], age: [16, 70], weight: 28, once: true,
      text: [
        "大将军曹爽奉帝谒高平陵。司马懿闭城门，据武库，奏爽罪。",
        "爽犹豫不决，终曰：我亦不失作富家翁。遂降。旋夷三族。"
      ],
      options: [
        { text: "从司马氏", hint: "官职 +16；声望 −8", effects: [{ k: "official", v: 16 }, { k: "fame", v: -8 }], then: "你在城门上值守。曹爽的人头送来那天，你听见有人在墙角吐。" },
        { text: "从曹爽", hint: "声望 +12；风险", effects: [{ k: "fame", v: 12 }], then: "你劝曹爽起兵。他没有听。", gamble: { winChance: 0.35, win: [], lose: [{ k: "body", v: -30 }, { k: "fame", v: -10 }], winNote: "事成，你得了官。", loseNote: "三族之诛，你一门只剩一个在外的幼子。" } },
        { text: "闭门，谁也不从", hint: "声望 −4；保命", effects: [{ k: "fame", v: -4 }], then: "你关了门。那几日洛阳城里天天有人被押着过街。你从门缝里看，看了三天就不看了。" }
      ]
    },
    {
      id: "s2.shuhan", cat: "世变", title: "蜀亡", era: "sg", years: [263, 264], age: [12, 70], weight: 30, once: true,
      text: [
        "邓艾自阴平道行无人之地七百余里，凿山通道，裹毡推转而下。",
        "兵临成都，后主出降。蜀亡。"
      ],
      options: [
        { text: "守剑阁", hint: "武艺 +10；官职 +10", effects: [{ k: "martial", v: 10 }, { k: "official", v: 10 }], then: "你在剑阁守了两个月。后主降的诏书送到时，姜维把刀砍在石头上，砍出了火花。", gamble: { deathChance: 0.16, cause: "战殁" } },
        { text: "随军入蜀，取财货", hint: "银钱 +24；声望 −10", effects: [{ k: "silver", v: 24 }, { k: "fame", v: -10 }], then: "你跟着魏军进了成都。市上的东西，谁先拿到就是谁的。" },
        { text: "在蜀中，举家避乱", hint: "田产弃；平安", effects: [{ k: "field_wet", v: -8 }, { k: "silver", v: -8 }], then: "你带着家人往南走，走到犍为。那里的山里，已经住了不少从成都逃出来的人。" }
      ]
    },
    {
      id: "s2.nanzhong", cat: "官府", title: "南中", age: [18, 55], weight: 11,
      text: [
        "南中诸郡，夷汉杂居。雍闿、孟获相继而反。丞相南征，凡七虏七赦。",
        "你在南中做县吏。"
      ],
      options: [
        { text: "从丞相南征", hint: "武艺 +8；官职 +10", effects: [{ k: "martial", v: 8 }, { k: "official", v: 10 }], then: "你随军过了泸水。五月的瘴气，让队里死了三成人。你在其中活了下来。" },
        { text: "从夷人", hint: "私兵 +20；声望 +8", effects: [{ k: "troops", v: 20 }, { k: "fame", v: 8 }], then: "你跟着孟获。第七次被擒之后，孟获说：丞相天威，南人不复反矣。你放下了刀。" },
        { text: "率县民守城", hint: "私兵 +14；声望 +10", effects: [{ k: "troops", v: 14 }, { k: "fame", v: 10 }], then: "你守住了县城。城里汉夷各半，你两边都发了粮。" }
      ]
    },
    {
      id: "s2.shanyue", cat: "官府", title: "山越", age: [18, 55], weight: 11,
      text: [
        "山越据险，不纳租赋。吴数遣将讨之，掳其精壮为兵，弱者补户。",
        "你所在的县，年年要出「讨山越」的兵。"
      ],
      options: [
        { text: "应募讨山越", hint: "武艺 +10；私兵 +16", effects: [{ k: "martial", v: 10 }, { k: "troops", v: 16 }], then: "你进了山。山里的路，走三天不见一个村子。抓到的人，一半编了兵。", gamble: { deathChance: 0.2, cause: "战殁" } },
        { text: "给山越通风报信", hint: "声望 −8；人脉 +14", effects: [{ k: "fame", v: -8 }, { k: "favor", v: 14 }], then: "你提前一夜去山口，说了官军的路线。此后再进山，有人给你留一坛酒。" },
        { text: "在县里管粮，不从前线", hint: "银钱 +8；官职 +4", effects: [{ k: "silver", v: 8 }, { k: "official", v: 4 }], then: "你管着运往山里的粮。粮车过岭的时候，你总要亲自看一遍绳结。" }
      ]
    }
  ];

})(window.PACK_BASE);
