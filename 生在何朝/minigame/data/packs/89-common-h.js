/* 生在何朝 · 共同底本（六续）：技艺与物产
 * 织、染、铁、窑、木、石、酿、纸、墨、船、医、账。
 * 这一卷写「手上功夫」：一门手艺怎么学、怎么用、怎么传，又能换几斗米。
 * 记事体。钱数写在 hint 里，不藏。
 * id 一律以 c8. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 织与染 ══════════ */
    {
      id: "c8.weave", cat: "营生", title: "织机", age: [12, 55], weight: 15,
      text: [
        "家里那架织机是祖母的，木轴磨得发亮。一日能织一丈二，快的人一丈五。",
        "布织成了，要拿去{{布行|收布转卖的铺子}}换钱。行的秤是他们的，价的也是他们定的。"
      ],
      options: [
        { text: "卖给布行", hint: "银钱 +3；价由人行", effects: [{ k: "silver", v: 3 }],
          then: "行里看了布面，说「粗了一点」，抹了三文。" },
        { text: "自己扛到集上零卖", hint: "银钱 +5；站一天", effects: [{ k: "silver", v: 5 }, { k: "body", v: -3 }] },
        { text: "留着自家穿衣", hint: "银钱 0；冬里不冷", effects: [{ k: "body", v: 3 }] }
      ]
    },

    {
      id: "c8.silk", cat: "营生", title: "缫丝", age: [10, 50], weight: 13,
      text: [
        "蚕老了，上簇，结茧。茧采下来，要当日缫，迟一日就出蛾，丝就断了。",
        "灶上水滚，茧在锅里翻。手伸下去，一根一根找头。八根合一丝，缠上{{丝车|卷丝的轮}}。"
      ],
      options: [
        { text: "连缫三夜", hint: "银钱 +7；身体 −6", effects: [{ k: "silver", v: 7 }, { k: "body", v: -6 }] },
        { text: "缫两日就卖茧", hint: "银钱 +4；省力", effects: [{ k: "silver", v: 4 }, { k: "body", v: -1 }] },
        { text: "留一筐做种", hint: "银钱 +3；明年有蚕", effects: [{ k: "silver", v: 3 }, { k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c8.dye", cat: "营生", title: "染", age: [14, 55], weight: 12,
      text: [
        "染坊里三口大缸，一口靛，一口茜，一口皂。手伸进去，出来是青的，半年洗不掉。",
        "主家送来一匹白布，要染月白。月白最难，浅一分不成，深一分就成灰。"
      ],
      options: [
        { text: "试三遍再下缸", hint: "银钱 −2；颜色正", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }] },
        { text: "照老方子一次下", hint: "银钱 +4；或有色差", effects: [{ k: "silver", v: 4 }],
          then: "出缸之后，主家看了半晌，说：「也行。」" },
        { text: "多下靛，染深些", hint: "银钱 +3；布硬", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -2 }] }
      ]
    },

    /* ══════════ 火与土 ══════════ */
    {
      id: "c8.forge", cat: "营生", title: "打铁", age: [14, 50], weight: 14,
      text: [
        "铁匠铺在街口，风箱一拉，火苗蹿起半人高。你十四岁上砧，先拉三年风箱。",
        "师父说：铁有脾气。红的时候软，白的时候脆，黄的时候正好——只看一眼，就得下锤。"
      ],
      options: [
        { text: "老实拉风箱三年", hint: "身体 −3；学得稳", effects: [{ k: "body", v: -3 }, { k: "martial", v: 4 }] },
        { text: "偷偷自己打", hint: "身体 −6；或废一块铁", effects: [{ k: "body", v: -6 }, { k: "martial", v: 8 }, { k: "silver", v: -2 }] },
        { text: "不学了，去扛包", hint: "银钱 +2；手上没功夫", effects: [{ k: "silver", v: 2 }] }
      ]
    },

    {
      id: "c8.kiln", cat: "营生", title: "开窑", age: [16, 55], weight: 13,
      text: [
        "窑火烧了三天三夜。看火的人不许睡，火色由红转白，再由白转青，就是熟了。",
        "开窑在清早。一窑三百件，成的能有几成，全看这一夜的风。"
      ],
      options: [
        { text: "守着看到天亮", hint: "身体 −6；成器多", effects: [{ k: "body", v: -6 }, { k: "silver", v: 9 }] },
        { text: "交给徒弟看", hint: "身体 0；或有夹生", effects: [{ k: "silver", v: 4 }, { k: "luck", v: -1 }] },
        { text: "多添柴，宁可过火", hint: "银钱 −3；器厚实", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }, { k: "silver", v: 6 }] }
      ]
    },

    {
      id: "c8.wood", cat: "营生", title: "木作", age: [15, 55], weight: 13,
      text: [
        "木匠的活分粗细。粗的做门、做梁；细的做箱、做几。最细的是寿材。",
        "东家来订一副{{寿材|棺材}}，说老人还硬朗，不急，慢慢做。木料要干透，缝要严，不许用一颗钉。"
      ],
      options: [
        { text: "用整板，不用拼", hint: "银钱 −4；主家记情", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 6 }, { k: "fame", v: 3 }] },
        { text: "拼板省料", hint: "银钱 +5；缝里看得出", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -3 }] },
        { text: "推了，不接这活", hint: "无得失；避晦气", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c8.stone", cat: "营生", title: "石作", age: [16, 50], weight: 11,
      text: [
        "山里有石宕，采出来的青石做碑、做础、做桥。石匠一年到头一身白灰。",
        "县里要修桥，工食一日两升米。宕上的老人说：石头认人，砸伤的总是新来的。"
      ],
      options: [
        { text: "去修桥", hint: "银钱 +4；身体 −7", effects: [{ k: "silver", v: 4 }, { k: "body", v: -7 }] },
        { text: "在宕上凿碑", hint: "银钱 +3；身上干净些", effects: [{ k: "silver", v: 3 }, { k: "body", v: -3 }, { k: "knowledge", v: 2 }] },
        { text: "学刻字", hint: "知识 +6；出活慢", effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: 1 }] }
      ]
    },

    /* ══════════ 吃食 ══════════ */
    {
      id: "c8.wine", cat: "营生", title: "酒曲", age: [18, 60], weight: 12,
      text: [
        "酿酒先制曲。曲不好，粮再好也是酸的。三伏天把曲块码在屋里，捂出黄毛，就是成了。",
        "酒熟了要卖。可酒是有{{榷|专卖}}的：官榷的地方，私酿一斗，罚得比偷粮重。"
      ],
      options: [
        { text: "报官纳课，明着卖", hint: "银钱 +5；课重", effects: [{ k: "silver", v: 5 }, { k: "official", v: 2 }] },
        { text: "私酿，夜里卖", hint: "银钱 +10；有查", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 4 }] },
        { text: "只酿自家喝", hint: "身体 +3；不惹事", effects: [{ k: "body", v: 3 }] }
      ]
    },

    {
      id: "c8.oil", cat: "营生", title: "榨油", age: [18, 55], weight: 11,
      text: [
        "油槽是一整根老树挖的。菜籽炒熟，上甑蒸透，裹成饼，一块一块塞进槽里。",
        "撞杆三百斤，四个人抱着撞。撞一下，油顺着槽口流下来，一线。"
      ],
      options: [
        { text: "做撞手", hint: "银钱 +3；身体 −6", effects: [{ k: "silver", v: 3 }, { k: "body", v: -6 }] },
        { text: "管炒籽", hint: "银钱 +2；火候靠眼", effects: [{ k: "silver", v: 2 }, { k: "body", v: -3 }] },
        { text: "自家种菜籽来换油", hint: "粮 −8；油 +6", effects: [{ k: "grain", v: -8 }, { k: "silver", v: 3 }] }
      ]
    },

    {
      id: "c8.sugar", cat: "营生", title: "糖霜", age: [16, 55], weight: 10,
      text: [
        "甘蔗榨汁，熬成{{糖霜|冰糖}}，是细活。火大了焦，火小了不成霜。",
        "一锅汁熬到起鱼眼泡，倒进瓦盆，插上纸捻，盖上棉被，七日不动。开盆那日，霜结在捻上。"
      ],
      options: [
        { text: "守着七日不揭", hint: "银钱 +8；熬坏一锅", effects: [{ k: "silver", v: 8 }, { k: "silver", v: -2 }] },
        { text: "熬成红糖就卖", hint: "银钱 +4；价低一半", effects: [{ k: "silver", v: 4 }] },
        { text: "把法子教给邻家，换工", hint: "银钱 +2；人情厚", effects: [{ k: "silver", v: 2 }, { k: "favor", v: 5 }] }
      ]
    },

    {
      id: "c8.bean", cat: "营生", title: "磨坊", age: [12, 55], weight: 12,
      text: [
        "磨坊里一盘石磨，一头驴。豆子泡一夜，磨成浆，滤、煮、点卤，压成豆腐。",
        "天不亮就要起来。豆腐卖的是早市，日头一高就酸。"
      ],
      options: [
        { text: "每日三更起", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] },
        { text: "只做酱，不做豆腐", hint: "银钱 +3；周转慢", effects: [{ k: "silver", v: 3 }, { k: "grain", v: -3 }] },
        { text: "接了官府的差，供驿舍", hint: "银钱 +5；账难收", effects: [{ k: "silver", v: 5 }, { k: "official", v: 2 }] }
      ]
    },

    /* ══════════ 纸与墨 ══════════ */
    {
      id: "c8.paper", cat: "营生", title: "抄纸", age: [14, 55], weight: 11,
      text: [
        "纸坊在水边。麻、竹、树皮，沤、煮、舂、抄。抄纸用一张竹帘，一荡一提，纸就成了一层。",
        "冬日水冷，手裂开口子。老师傅说：抄纸的手，都不像手。"
      ],
      options: [
        { text: "学抄薄纸", hint: "知识 +3；银钱 +5", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: 5 }] },
        { text: "抄厚纸，做包装", hint: "银钱 +3；省力", effects: [{ k: "silver", v: 3 }] },
        { text: "改行去卖纸", hint: "银钱 +6；身体好", effects: [{ k: "silver", v: 6 }] }
      ]
    },

    {
      id: "c8.print", cat: "营生", title: "刻字", age: [16, 60], weight: 12, when: { minKnowledge: 10 },
      text: [
        "书坊要印一部书，先得刻板。梨木锯成板，刨平，写上反字，一刀一刀刻。",
        "一日刻三百字算快。刻错一个字，整块板要刨掉重来。"
      ],
      options: [
        { text: "慢慢刻，不出错", hint: "银钱 +4；交期误", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 4 }] },
        { text: "赶工", hint: "银钱 +7；或刻坏", effects: [{ k: "silver", v: 7 }, { k: "luck", v: -1 }] },
        { text: "自己攒钱印一部", hint: "银钱 −10；名声起", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }, { k: "knowledge", v: 5 }] }
      ]
    },

    {
      id: "c8.ink", cat: "营生", title: "制墨", age: [16, 55], weight: 9,
      text: [
        "烧松取烟，烟要轻，落在窑顶那一层最好。和胶、捣三万杵，压进模子。",
        "墨成，阴干百日。急不得，一急就裂。"
      ],
      options: [
        { text: "照古法捣三万杵", hint: "银钱 +6；身体 −4", effects: [{ k: "silver", v: 6 }, { k: "body", v: -4 }] },
        { text: "少捣些，赶春节", hint: "银钱 +8；墨脆", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -4 }] },
        { text: "做墨送读书人", hint: "银钱 −2；交游广", effects: [{ k: "silver", v: -2 }, { k: "favor", v: 6 }, { k: "knowledge", v: 2 }] }
      ]
    },

    /* ══════════ 器物 ══════════ */
    {
      id: "c8.boat", cat: "营生", title: "修船", age: [16, 55], weight: 11,
      text: [
        "船用三年就要上坡。刮旧灰，嵌麻丝，抹桐油灰，一遍一遍。",
        "船底有一条缝，指甲盖宽。船主说：不算什么，出不了事。你蹲下去看，缝里已经透了光。"
      ],
      options: [
        { text: "照实说，整条挖补", hint: "银钱 +6；船主嫌贵", effects: [{ k: "silver", v: 6 }, { k: "favor", v: -3 }, { k: "fame", v: 4 }] },
        { text: "抹厚灰盖住", hint: "银钱 +4；心里不安", effects: [{ k: "silver", v: 4 }, { k: "luck", v: -2 }] },
        { text: "不做这活", hint: "无得失", effects: [{ k: "favor", v: -2 }] }
      ]
    },

    {
      id: "c8.bamboo", cat: "营生", title: "篾匠", age: [10, 55], weight: 11,
      text: [
        "一根毛竹，剖成四开，再剖成十六，薄得能透光。编筐、编席、编笼。",
        "篾在手里要软。老人说：手上没有十年的口子，篾不听你的。"
      ],
      options: [
        { text: "编细席，卖价高", hint: "银钱 +5；身体 −4", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "编粗筐，走量", hint: "银钱 +3；手不废", effects: [{ k: "silver", v: 3 }] },
        { text: "挑到远处去卖", hint: "银钱 +7；身体 −5", effects: [{ k: "silver", v: 7 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "c8.leather", cat: "营生", title: "硝皮", age: [16, 55], weight: 9,
      text: [
        "皮子进来是硬的，带血。泡硝、刮肉、晾、揉。作坊在下风，一条街都知道这里做什么。",
        "做一双靴，工钱三十文。做一副甲，工钱三百，可甲不常有。"
      ],
      options: [
        { text: "做靴，细做", hint: "银钱 +4；名声好", effects: [{ k: "silver", v: 4 }, { k: "fame", v: 2 }] },
        { text: "接军中的皮甲", hint: "银钱 +9；催得急", effects: [{ k: "silver", v: 9 }, { k: "body", v: -5 }] },
        { text: "换到上风头住", hint: "银钱 −4；身体 +3", effects: [{ k: "silver", v: -4 }, { k: "body", v: 3 }] }
      ]
    },

    {
      id: "c8.copper", cat: "营生", title: "补锅", age: [14, 60], weight: 10,
      text: [
        "挑一副担子走村：一头小炉，一头风箱。补一口锅五文，配一把锁十文。",
        "锅底裂了，要先钻眼，再用铜钉铆住。铆得好，能用三年。"
      ],
      options: [
        { text: "走村串巷一年", hint: "银钱 +6；身体 −5", effects: [{ k: "silver", v: 6 }, { k: "body", v: -5 }] },
        { text: "在镇上租个摊", hint: "银钱 +3；有定处", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 3 }] },
        { text: "私铸铜钱", hint: "银钱 +14；有死罪", effects: [{ k: "silver", v: 14 }, { k: "grudge", v: 8 }, { k: "luck", v: -3 }] }
      ]
    },

    {
      id: "c8.tile", cat: "营生", title: "脱坯", age: [14, 55], weight: 10,
      text: [
        "砖瓦是泥做的。取土、踩泥、脱坯、晾干、入窑。一窑砖要烧七日，熄火后焖三日。",
        "官府要修城，要砖十万。工价压得低，可量大。"
      ],
      options: [
        { text: "接官砖", hint: "银钱 +7；催逼紧", effects: [{ k: "silver", v: 7 }, { k: "body", v: -6 }] },
        { text: "自己烧，零卖", hint: "银钱 +4；卖得慢", effects: [{ k: "silver", v: 4 }] },
        { text: "把窑租出去", hint: "银钱 +5；闲下来", effects: [{ k: "silver", v: 5 }, { k: "body", v: 2 }] }
      ]
    },

    {
      id: "c8.umbrella", cat: "营生", title: "伞", age: [12, 55], weight: 9,
      text: [
        "油纸伞：竹骨三十六根，糊纸，刷桐油，晒三日。一把伞卖二十文，雨天能卖四十。",
        "会做伞的人，看天吃饭——天越坏，生意越好。"
      ],
      options: [
        { text: "梅雨前多做五百把", hint: "银钱 +8；押天时", effects: [{ k: "silver", v: 8 }, { k: "luck", v: 1 }] },
        { text: "只做零活", hint: "银钱 +3；不压本", effects: [{ k: "silver", v: 3 }] },
        { text: "兼修伞", hint: "银钱 +5；跑得勤", effects: [{ k: "silver", v: 5 }, { k: "body", v: -3 }] }
      ]
    },

    {
      id: "c8.rope", cat: "营生", title: "打绳", age: [10, 60], weight: 9,
      text: [
        "麻要沤过，剥皮，劈成细缕。三股合一股，摇车转，绳就成了。",
        "绳有绳的用处：船缆要粗，牛绳要软，弓弦要韧——一样的麻，三样的做法。"
      ],
      options: [
        { text: "专做船缆", hint: "银钱 +5；费力", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "做细绳，卖与铺子", hint: "银钱 +3；清闲", effects: [{ k: "silver", v: 3 }] },
        { text: "接官差的绳，供军", hint: "银钱 +7；有定额", effects: [{ k: "silver", v: 7 }, { k: "official", v: 1 }] }
      ]
    },

    /* ══════════ 医与算 ══════════ */
    {
      id: "c8.med", cat: "方外", title: "出诊", age: [18, 65], weight: 12, when: { minKnowledge: 12 },
      text: [
        "半夜有人敲门，说家里孩子抽风。你提了药箱就走，路上还在想是哪一经的病。",
        "到了，孩子已经不出声。屋里七八个人看着你。"
      ],
      options: [
        { text: "针下去，先定惊", hint: "或救回；名声起", effects: [{ k: "fame", v: 6 }, { k: "body", v: -3 }],
          gamble: { winChance: 0.55, win: [{ k: "fame", v: 6 }, { k: "silver", v: 5 }], lose: [{ k: "fame", v: -8 }, { k: "grudge", v: 6 }],
            loseNote: "针拔出来，孩子没醒。屋里有人哭，有人不说话。" } },
        { text: "说治不了，转身走", hint: "名声损；不担干系", effects: [{ k: "fame", v: -5 }, { k: "luck", v: 1 }] },
        { text: "开个稳方，收了诊金就走", hint: "银钱 +3；心里明白", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -1 }] }
      ]
    },

    {
      id: "c8.herb", cat: "方外", title: "采药", age: [14, 60], weight: 10,
      text: [
        "山上有药。柴胡、半夏、葛根，都在阴坡。真贵的是野生的人参、天麻，一年碰不上一回。",
        "采药要认路。云雾一起，山就变了样子。"
      ],
      options: [
        { text: "往深处走", hint: "身体 −8；或得贵药", effects: [{ k: "body", v: -8 }, { k: "silver", v: 12 }] },
        { text: "在近坡采常见的", hint: "银钱 +3；稳妥", effects: [{ k: "silver", v: 3 }, { k: "body", v: -2 }] },
        { text: "带个伴一起去", hint: "银钱 +5；分一半", effects: [{ k: "silver", v: 5 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "c8.abacus", cat: "营生", title: "盘账", age: [16, 60], weight: 12, when: { minKnowledge: 8 },
      text: [
        "腊月里盘账。一年的进出都在这本流水上，一笔一笔对。",
        "东家坐在旁边，不说话。你自己先看出来了：有三十两，对不上。"
      ],
      options: [
        { text: "照实说", hint: "声望 +4；得罪人", effects: [{ k: "fame", v: 4 }, { k: "favor", v: -4 }, { k: "silver", v: 3 }] },
        { text: "悄悄补上，替人掩了", hint: "交情深；自己垫钱", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 7 }] },
        { text: "把这一笔挪到下年", hint: "账面平；悬着", effects: [{ k: "luck", v: -2 }, { k: "silver", v: 2 }] }
      ]
    },

    {
      id: "c8.scale", cat: "市井", title: "秤", age: [16, 60], weight: 11,
      text: [
        "做买卖离不了秤。官秤一年一校，校一次要交钱。",
        "有人来买你的旧秤，出价不低，说要拿去「用」。你听懂了——他要的是那杆能压三分的秤。"
      ],
      options: [
        { text: "卖给他", hint: "银钱 +8；日后有案", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -3 }] },
        { text: "不卖，把秤劈了", hint: "银钱 0；名声正", effects: [{ k: "fame", v: 5 }] },
        { text: "报与官市的吏", hint: "银钱 −1；结怨", effects: [{ k: "silver", v: -1 }, { k: "official", v: 3 }, { k: "grudge", v: 5 }] }
      ]
    },

    /* ══════════ 渔猎屠宰 ══════════ */
    {
      id: "c8.fish", cat: "营生", title: "下网", age: [12, 60], weight: 12,
      text: [
        "夜里下网，天亮起。水面上一层白气，网绳上结着霜。",
        "这一网沉。拉起来，一半是鱼，一半是水草。也有别的：一只破鞋，一截烂木。"
      ],
      options: [
        { text: "赶早市卖鲜", hint: "银钱 +4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] },
        { text: "腌了慢慢卖", hint: "银钱 +6；要盐", effects: [{ k: "silver", v: 6 }, { k: "silver", v: -2 }] },
        { text: "留一半自家吃", hint: "身体 +4；银钱 +2", effects: [{ k: "body", v: 4 }, { k: "silver", v: 2 }] }
      ]
    },

    {
      id: "c8.slice", cat: "营生", title: "杀猪", age: [16, 60], weight: 10,
      text: [
        "腊月二十三，杀年猪。四个人按住，一刀进去，血接在盆里，撒盐，搅。",
        "猪叫的时候，半个村子都听得见。孩子们在门口看，大人不来。"
      ],
      options: [
        { text: "干这一行，工钱实在", hint: "银钱 +5；人嫌晦气", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -3 }] },
        { text: "只帮工，不主刀", hint: "银钱 +3", effects: [{ k: "silver", v: 3 }] },
        { text: "把下水留给主家", hint: "银钱 +2；人情好", effects: [{ k: "silver", v: 2 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "c8.saltfield", cat: "营生", title: "盐场", age: [16, 55], weight: 10,
      text: [
        "海边一片盐田，刮泥、淋卤、煎盐。灶上大锅，卤水熬到起白花，铲出来就是盐。",
        "盐是官家的。煎出来的盐，一粒不许私卖——私卖一斤，杖八十。"
      ],
      options: [
        { text: "老老实实交官", hint: "银钱 +3；被克扣", effects: [{ k: "silver", v: 3 }, { k: "official", v: 2 }] },
        { text: "留一担私卖", hint: "银钱 +11；有查", effects: [{ k: "silver", v: 11 }, { k: "grudge", v: 5 }] },
        { text: "逃出盐场", hint: "身体 −8；成逃户", effects: [{ k: "body", v: -8 }, { k: "luck", v: 2 }] }
      ]
    },

    /* ══════════ 杂艺 ══════════ */
    {
      id: "c8.paint", cat: "营生", title: "画匠", age: [16, 60], weight: 9,
      text: [
        "庙里要重妆神像。旧的刮掉，打底，上色，贴金。一笔错了，整面墙重来。",
        "主事的和尚说：脸要慈。你画到第三稿，他仍说：不够慈。"
      ],
      options: [
        { text: "再画一稿", hint: "银钱 −2；成名", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 6 }, { k: "knowledge", v: 3 }] },
        { text: "照他说的改，交差", hint: "银钱 +6；手艺平平", effects: [{ k: "silver", v: 6 }] },
        { text: "接私活，给人家画影", hint: "银钱 +7；跑得多", effects: [{ k: "silver", v: 7 }, { k: "body", v: -3 }] }
      ]
    },

    {
      id: "c8.geomancy", cat: "方外", title: "看地", age: [20, 65], weight: 9, when: { minKnowledge: 14 },
      text: [
        "有人家死了人，请你去看地。罗盘一摆，山向水口，说得头头是道。",
        "其实好地就那么几处，早被人占了。剩下的，看你嘴里怎么讲。"
      ],
      options: [
        { text: "照实说，这地平常", hint: "声望 +3；银钱少", effects: [{ k: "fame", v: 3 }, { k: "silver", v: 2 }] },
        { text: "说这是块吉地", hint: "银钱 +8；心里有愧", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -1 }] },
        { text: "推说看不了", hint: "无得失", effects: [{ k: "favor", v: -3 }] }
      ]
    },

    {
      id: "c8.tailor", cat: "营生", title: "裁衣", age: [12, 55], weight: 11,
      text: [
        "裁缝量体，不只用尺：肩宽、背厚、走路的样子，都要看。衣要跟人，不是人跟衣。",
        "县里老爷要做一身常服，布料是自家带来的，多一寸不给。"
      ],
      options: [
        { text: "省着裁，正好够", hint: "银钱 +5；不敢出错", effects: [{ k: "silver", v: 5 }, { k: "body", v: -3 }] },
        { text: "多留一寸在缝里", hint: "银钱 +3；日后可放", effects: [{ k: "silver", v: 3 }, { k: "fame", v: 3 }] },
        { text: "不接官家的活", hint: "无得失", effects: [{ k: "favor", v: -2 }] }
      ]
    },

    {
      id: "c8.apprentice", cat: "职业", title: "收徒", age: [30, 65], weight: 10, when: { minAge: 30 },
      text: [
        "有人托中人来说，要把儿子送来学手艺。孩子十三岁，瘦，眼睛很亮。",
        "学徒三年没工钱，管饭；出师要摆酒，谢师。也有的徒弟，学到一半就跑了。"
      ],
      options: [
        { text: "收下", hint: "银钱 −3；日后有靠", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 6 }] },
        { text: "收，但要立字据", hint: "银钱 −2；稳妥", effects: [{ k: "silver", v: -2 }, { k: "favor", v: 3 }, { k: "knowledge", v: 1 }] },
        { text: "不收，教不动了", hint: "身体 +2", effects: [{ k: "body", v: 2 }] }
      ]
    },

    {
      id: "c8.handdown", cat: "家业", title: "传艺", age: [45, 75], weight: 10, when: { minAge: 45 },
      text: [
        "手上的活，到该交出去的时候了。儿子不肯学，说要去城里做买卖；女婿倒是肯。",
        "手艺传给谁，就是把这辈子的饭碗交给谁。"
      ],
      options: [
        { text: "教儿子，逼他学", hint: "父子生隙；手艺留住", effects: [{ k: "favor", v: -6 }, { k: "fame", v: 3 }] },
        { text: "传女婿", hint: "族里不服；有靠", effects: [{ k: "favor", v: 4 }, { k: "fame", v: -3 }] },
        { text: "带个外人当徒弟", hint: "名声好；儿子恨", effects: [{ k: "fame", v: 6 }, { k: "favor", v: -5 }] }
      ]
    }

  );

})(window.PACK_BASE);
