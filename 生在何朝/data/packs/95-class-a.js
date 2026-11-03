/* 生在何朝 · 共同底本（八续）：出身的门（上）
 * 宗室、勋贵、吏家。
 * 这一卷写「生在谁家」：同一年、同一场灾，封君之子与胥吏之子看见的是两个天下。
 * 各朝名目不同，行文只取其事，不举其名；必要处加小注。
 * 记事体。钱数写在 hint 里。id 一律以 ca. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 宗室 ══════════ */

    {
      id: "ca.r.zuce", cat: "家族", title: "租册", age: [7, 13], weight: 18, once: true,
      class: ["royal"],
      text: [
        "秋收过后，管事把租册捧到你父亲案上。一户一行：田几亩，租几斗，欠几斗。",
        "父亲叫你坐到旁边。他说：这上头的人名，你要认得。"
      ],
      options: [
        { text: "一行一行认下去", hint: "学识 +3；官声 +2", effects: [{ k: "knowledge", v: 3 }, { k: "official", v: 2 }], then: "你记住了三十七个名字。有一个后面画了个圈，父亲说，那是今年过不去的。" },
        { text: "只记住总数", hint: "银钱 +4", effects: [{ k: "silver", v: 4 }], then: "你把总数背了下来。父亲把册子合上，没说什么。" },
        { text: "问那些欠租的人怎么过冬", hint: "声望 +5；父亲不悦", effects: [{ k: "fame", v: 5 }, { k: "official", v: -2 }], then: "父亲说：你先学会收，再学会问。" }
      ]
    },

    {
      id: "ca.r.menke", cat: "官府", title: "门客", age: [14, 32], weight: 13,
      class: ["royal"],
      text: [
        "府里养着二十几个人。有会写字的，有会算的，有一个从北边来的，说是见过大阵仗。",
        "他们平时不干什么，只在有人登门的时候，站在廊下。"
      ],
      options: [
        { text: "跟北边来的那个学", hint: "武艺 +8；学识 +2", effects: [{ k: "martial", v: 8 }, { k: "knowledge", v: 2 }], then: "他教你骑马时怎么把身子压低。他说：跑的时候别看马头。" },
        { text: "跟会算的学算", hint: "学识 +4；银钱 +2", effects: [{ k: "knowledge", v: 4 }, { k: "silver", v: 2 }] },
        { text: "劝父亲裁掉一半", hint: "银钱 +10；结怨", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 6 }], then: "裁掉的那天，有个人在门口站了很久，才把包袱背上肩。" }
      ]
    },

    {
      id: "ca.r.gaozhuang", cat: "官府", title: "告状", age: [18, 55], weight: 10, once: true,
      class: ["royal"],
      text: [
        "有人递了一封书上去，说你家的爵是当年冒认的。",
        "父亲一夜没睡。天亮时叫你过去，说：无论问到你什么，你只说你不知道。"
      ],
      options: [
        { text: "照父亲说的，一概不知", hint: "赌这一家的爵", effects: [],
          gamble: { winChance: 0.58, win: [{ k: "official", v: 6 }], lose: [{ k: "official", v: -14 }, { k: "fame", v: -6 }],
            winNote: "查了半年，查无实据。文书发回来，爵照旧。父亲那天多喝了一杯。",
            loseNote: "旧诰上的印是真的，名字却对不上。爵削了，府门前的石狮搬走了。" } },
        { text: "把祖上的旧诰、旧契都翻出来", hint: "银钱 −10；或有转机", effects: [{ k: "silver", v: -10 }, { k: "official", v: 4 }, { k: "knowledge", v: 2 }], then: "箱子底压了六十年的纸，一张张摊在堂上。有一张的边角被虫蛀了。" },
        { text: "先送一份厚礼上去", hint: "银钱 −14；官声 +5", effects: [{ k: "silver", v: -14 }, { k: "official", v: 5 }, { k: "grudge", v: 3 }] }
      ]
    },

    {
      id: "ca.r.hunyin", cat: "家族", title: "门第", age: [15, 24], weight: 16, once: true,
      class: ["royal"],
      text: [
        "来提亲的也是一家有名目的。媒人说：两边门第相当，谁也不高攀谁。",
        "父亲问你一句：你自己怎么想。他说完就低头喝茶，好像并不等你的话。"
      ],
      options: [
        { text: "应下这门亲", hint: "银钱 −12（聘礼）；声望 +10", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 10 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"], then: "成亲那日，两家在门槛上让了三个来回。谁也不肯先进门。" },
        { text: "娶一个清白民家", hint: "声望 −8；银钱 +6", effects: [{ k: "fame", v: -8 }, { k: "silver", v: 6 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }], setFlag: ["married"], then: "族里半年没人和你家来往。她进门那天，只有她娘家人送到村口。" },
        { text: "再等", hint: "父亲不再问", effects: [{ k: "fame", v: -3 }], then: "那家第二年把女儿许给了别家。父亲此后没再提这一句。" }
      ]
    },

    {
      id: "ca.r.buke", cat: "科举", title: "不许应举", age: [16, 28], weight: 12, once: true,
      class: ["royal"],
      text: [
        "你想去考。族老把话说得很平：{{宗室|各朝名目不同；要之皆为有爵之家}}子弟，不许应举。",
        "他又添一句：真想要个出身，只有一条路——改姓，脱了这层皮。"
      ],
      options: [
        { text: "不去考，守在家里", hint: "声望 +4；学识 −2", effects: [{ k: "fame", v: 4 }, { k: "knowledge", v: -2 }], then: "你把书收了半箱。剩下的半箱，夜里还是翻。" },
        { text: "改姓去考", hint: "赌一回；中了是别家的功名", effects: [{ k: "knowledge", v: 3 }],
          gamble: { winChance: 0.42, win: [{ k: "fame", v: 10 }, { k: "official", v: 6 }], lose: [{ k: "fame", v: -10 }, { k: "official", v: -6 }],
            winNote: "榜上有你的名字，写的是另一个姓。你在人群里站了很久，没敢笑。",
            loseNote: "卷子被认出来了。主司批了四个字：冒籍，除名。族里从此把这件丑事挂在嘴边。" } },
        { text: "求族老通融", hint: "银钱 −8；官声 +3", effects: [{ k: "silver", v: -8 }, { k: "official", v: 3 }], then: "族老收了礼，说了三遍「难」。第二年，你还是在府里闲着。" }
      ]
    },

    {
      id: "ca.r.fenshu", cat: "宗族", title: "分书", age: [26, 60], weight: 11, once: true,
      class: ["royal"],
      text: [
        "族里定下日子分产。田、屋、铺子、坟山，都要写进{{分书|分家文书}}，一式三份。",
        "管事的笔在纸上停了一下，抬头看你父亲。"
      ],
      options: [
        { text: "按长幼分，不多要一分", hint: "声望 +8；银钱 −4", effects: [{ k: "fame", v: 8 }, { k: "silver", v: -4 }], then: "你分到最远的那几亩。族老说你「识大体」，这话他说了三遍。" },
        { text: "力争坟山与祖屋", hint: "银钱 +10；族中结怨", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 8 }, { k: "fame", v: -4 }] },
        { text: "只要现银，田屋都不要", hint: "银钱 +12；日后无根", effects: [{ k: "silver", v: 12 }, { k: "field_wet", v: -3 }], then: "银子装在两个坛子里抬走。族人说：这一房，从此就算出去了。" }
      ]
    },

    {
      id: "ca.r.zusi", cat: "宗族", title: "祭田", age: [20, 65], weight: 9,
      class: ["royal"],
      text: [
        "祠堂的祭田，今年被族里一户人家私卖了。",
        "族老说：那是祖宗留下的，卖不得。可买主也不是外人。"
      ],
      options: [
        { text: "出钱赎回", hint: "银钱 −12；族中服你", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 8 }, { k: "favor", v: 5 }] },
        { text: "告到官", hint: "官声 +4；族里恨你", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 7 }, { k: "fame", v: 3 }] },
        { text: "装作不知", hint: "无得失；心里记下", effects: [{ k: "luck", v: -2 }], then: "第二年祭祖，那一房的人照样站在前排，照样磕头。" }
      ]
    },

    {
      id: "ca.r.zhengma", cat: "军旅", title: "征马", age: [18, 60], weight: 8,
      class: ["royal"],
      text: [
        "朝廷要马。有爵之家，按爵位出马，出一匹，赏一匹的价。",
        "府里好马只有四匹。差役站在马厩门口，手里拿着册子。"
      ],
      options: [
        { text: "交最好的两匹", hint: "银钱 +6；官声 +6", effects: [{ k: "silver", v: 6 }, { k: "official", v: 6 }] },
        { text: "交两匹老的", hint: "银钱 +8；官声 −6", effects: [{ k: "silver", v: 8 }, { k: "official", v: -6 }], then: "差役摸了摸马牙，没说话，把册子合上走了。" },
        { text: "花钱买两匹充数", hint: "银钱 −10；不得罪人", effects: [{ k: "silver", v: -10 }, { k: "official", v: 2 }] }
      ]
    },

    {
      id: "ca.r.zuti", cat: "身体", title: "宗室的身子", age: [26, 62], weight: 8,
      class: ["royal"],
      text: [
        "你自小没受过累。走十里路，脚就肿；吹一夜风，就要躺三天。",
        "郎中说是「膏粱之疾」——吃得精，动得少。"
      ],
      options: [
        { text: "每天走五里", hint: "身体 +8；人笑你", effects: [{ k: "body", v: 8 }, { k: "fame", v: -2 }] },
        { text: "请人扶着走，慢慢来", hint: "身体 +4", effects: [{ k: "body", v: 4 }] },
        { text: "照旧在府里躺着", hint: "身体 −6；清闲", effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 2 }] }
      ]
    },

    /* ══════════ 勋贵 ══════════ */

    {
      id: "ca.n.yin", cat: "官府", title: "荫", age: [16, 26], weight: 16, once: true,
      class: ["noble"],
      text: [
        "父亲的名字在册上。按例，可以荫一个儿子。",
        "兄弟三个，都在等这句话。父亲把三个人叫到堂上，看了一遍，先看的是你大哥。"
      ],
      options: [
        { text: "争这个荫", hint: "官声 +8；兄弟生隙", effects: [{ k: "official", v: 8 }, { k: "grudge", v: 6 }], then: "名字报上去那天，大哥没来吃饭。此后十年，他见了你只点头。" },
        { text: "让给大哥", hint: "声望 +8；官声 −2", effects: [{ k: "fame", v: 8 }, { k: "official", v: -2 }], then: "父亲看了你一眼，那一眼里有别的东西。他什么都没说。" },
        { text: "不要荫，自己去考", hint: "学识 +5；赌日后", effects: [{ k: "knowledge", v: 5 }], then: "父亲把册子推回案角，说：你要走远路，我不拦。" }
      ]
    },

    {
      id: "ca.n.jiubu", cat: "军旅", title: "旧部", age: [20, 52], weight: 12,
      class: ["noble"],
      text: [
        "门外来了个人，穿得旧，自称跟过你父亲。他说得出你父亲左肩上的那块疤。",
        "他现在没有差事，家里五口人。"
      ],
      options: [
        { text: "留下，给他一口饭吃", hint: "银钱 −6；日后有用", effects: [{ k: "silver", v: -6 }, { k: "favor", v: 6 }, { k: "troops", v: 2 }] },
        { text: "给一笔钱，打发走", hint: "银钱 −3；不结怨", effects: [{ k: "silver", v: -3 }] },
        { text: "荐他去别家", hint: "声望 +3；官声 +2", effects: [{ k: "fame", v: 3 }, { k: "official", v: 2 }] }
      ]
    },

    {
      id: "ca.n.jiangdeng", cat: "宗族", title: "降等", age: [26, 62], weight: 12, once: true,
      class: ["noble"],
      text: [
        "承袭的时候，执事的人说：爵降一等。这是例。",
        "父亲留下的田，也要退出三成。退给谁，册上写着。"
      ],
      options: [
        { text: "照例退，不多话", hint: "官声 +6；银钱 −8", effects: [{ k: "official", v: 6 }, { k: "silver", v: -8 }, { k: "field_wet", v: -2 }] },
        { text: "托人求一个原等", hint: "银钱 −14；或有转机", effects: [{ k: "silver", v: -14 }],
          gamble: { winChance: 0.35, win: [{ k: "official", v: 8 }], lose: [{ k: "official", v: -6 }],
            winNote: "批下来了，写着「特准」。你在祠堂里把这张纸给父亲的牌位看了很久。",
            loseNote: "批语只有两个字：不准。退的田，一亩也没有少。" } },
        { text: "把田先记到族人名下", hint: "银钱 +6；日后有争", effects: [{ k: "silver", v: 6 }, { k: "grudge", v: 5 }] }
      ]
    },

    {
      id: "ca.n.dao", cat: "家族", title: "家传的刀", age: [9, 16], weight: 14, once: true,
      class: ["noble"],
      text: [
        "墙上挂着一把刀，刀鞘上的漆掉了大半。父亲说，那是祖上从阵上带回来的。",
        "他取下来给你看，刀口上有三个豁。"
      ],
      options: [
        { text: "问他那三个豁是怎么来的", hint: "学识 +4；声望 +3", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 3 }], then: "他讲了半个时辰，讲到最后一个人名时停住了，说：这个不讲了。" },
        { text: "拿出去磨", hint: "武艺 +6；父亲发火", effects: [{ k: "martial", v: 6 }, { k: "favor", v: -4 }], then: "磨刀的人说，这刀好，就是太旧了。父亲知道后，三天没跟你说话。" },
        { text: "照原样挂回去", hint: "声望 +2；家中的规矩", effects: [{ k: "fame", v: 2 }] }
      ]
    },

    {
      id: "ca.n.mingce", cat: "军旅", title: "名册", age: [12, 22], weight: 13, once: true,
      class: ["noble"],
      text: [
        "族里的祠堂有一本册子，记着历次出征没回来的人。",
        "你的名字还没写上去。册上你父亲那一行，后面空着一个位置。"
      ],
      options: [
        { text: "从头看到尾", hint: "学识 +3；心里有了分量", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: 3 }], then: "一共一百四十七个名字。有十九个，连生年都没写。" },
        { text: "问能不能不写", hint: "声望 −4；父亲沉默", effects: [{ k: "fame", v: -4 }] },
        { text: "把册子抄一份带走", hint: "学识 +5；身体 −2", effects: [{ k: "knowledge", v: 5 }, { k: "body", v: -2 }], then: "你抄了十一天。抄到最后一个名字时，手抖了一下。" }
      ]
    },

    {
      id: "ca.n.zidi", cat: "家族", title: "不成器的子弟", age: [22, 55], weight: 10,
      class: ["noble"],
      text: [
        "族里有个堂弟，赌输了三十两，债主找上门来。",
        "族老说：这一房的脸，不能丢在外头。"
      ],
      options: [
        { text: "替他还了", hint: "银钱 −12；族中服你", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 7 }] },
        { text: "不管，让他自己扛", hint: "银钱 +2；族中议论", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -5 }, { k: "grudge", v: 5 }] },
        { text: "把他送去军中", hint: "官声 +4；他恨你", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 5 }], then: "他走的那天回头看了你一眼。三年后有人带话回来，说他在边上有出息了。" }
      ]
    },

    {
      id: "ca.n.hunyin", cat: "家族", title: "门当户对", age: [16, 26], weight: 14, once: true,
      class: ["noble"],
      text: [
        "对方也是勋贵之家，只是近些年不显了。嫁妆厚，名声薄。",
        "母亲说：门第是门第，日子是日子。"
      ],
      options: [
        { text: "结这门亲", hint: "银钱 +10；声望 +4", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"] },
        { text: "娶个寒门读书人家的女儿", hint: "学识 +4；族中不喜", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: -5 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }], setFlag: ["married"] },
        { text: "不结，先立业", hint: "无得失", effects: [], then: "母亲叹了口气，把庚帖放回匣子。那匣子后来一直没再打开。" }
      ]
    },

    {
      id: "ca.n.dianmao", cat: "官府", title: "点卯", age: [18, 50], weight: 10,
      class: ["noble"],
      text: [
        "你在营里有名，却不必日日到。有人替你在册上画圈。",
        "替你画圈的人，今年来讨了一次赏。"
      ],
      options: [
        { text: "照旧给他", hint: "银钱 −4；省事", effects: [{ k: "silver", v: -4 }, { k: "official", v: 2 }] },
        { text: "从今日起自己去点卯", hint: "官声 +6；身体 −4", effects: [{ k: "official", v: 6 }, { k: "body", v: -4 }], then: "第一日你就迟了半刻，被记了一笔。" },
        { text: "换一个人替你", hint: "结怨 +6", effects: [{ k: "grudge", v: 6 }, { k: "silver", v: -2 }] }
      ]
    },

    /* ══════════ 吏家 ══════════ */

    {
      id: "ca.c.chaoxu", cat: "官府", title: "抄卷", age: [8, 15], weight: 17, once: true,
      class: ["official_mid"],
      text: [
        "父亲每晚在灯下抄案子。纸是官纸，字要写成一种体，一笔不能歪。",
        "他把一叠空纸推给你：先练这个「令」字。"
      ],
      options: [
        { text: "练到能写成一个样", hint: "学识 +6；手稳", effects: [{ k: "knowledge", v: 6 }], then: "三个月后，父亲把你的字混进他的卷里，上官没看出来。" },
        { text: "抄着抄着，把案子看懂了", hint: "学识 +8；官声 +3", effects: [{ k: "knowledge", v: 8 }, { k: "official", v: 3 }], then: "有一件案子，你看出了前后两处对不上。父亲看了半夜，第二天把卷子重写了。" },
        { text: "偷懒，只描个形", hint: "身体 +3；学识 +1", effects: [{ k: "body", v: 3 }, { k: "knowledge", v: 1 }] }
      ]
    },

    {
      id: "ca.c.lvling", cat: "官府", title: "律", age: [12, 24], weight: 14,
      class: ["official_mid"],
      text: [
        "衙门后堂有一间小屋，堆着律书。父亲说：这里头的字，认得一半就能吃饭，认得全了，能保命。",
        "你翻到一条：凡诈冒……后面被虫蛀了。"
      ],
      options: [
        { text: "一条一条硬记", hint: "学识 +7；身体 −3", effects: [{ k: "knowledge", v: 7 }, { k: "body", v: -3 }] },
        { text: "只记常用的几条", hint: "学识 +4；官声 +2", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 2 }] },
        { text: "抄成小册，随身带", hint: "银钱 −1；日后常翻", effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 5 }], then: "册子抄了四十六页。后来你翻得最烂的，是讲「失出」「失入」的那两页。" }
      ]
    },

    {
      id: "ca.c.dingzui", cat: "官府", title: "顶", age: [20, 52], weight: 11, once: true,
      class: ["official_mid"],
      text: [
        "上头那件事办坏了。追下来，要有人认。",
        "夜里，长官让人带话：你在衙里这些年，一向稳当。话没说完，你就明白了。"
      ],
      options: [
        { text: "认下来", hint: "银钱 +8；官声 −6", effects: [{ k: "silver", v: 8 }, { k: "official", v: -6 }, { k: "fame", v: 3 }],
          gamble: { winChance: 0.7, win: [{ k: "silver", v: 4 }], lose: [{ k: "body", v: -8 }, { k: "official", v: -8 }],
            winNote: "挨了二十板，革了差事。半年后长官又把你叫回去了，位置比原先高一点。",
            loseNote: "板子打完，人被抬回家。躺了两个月，差事没了，名字也从册上划了。" } },
        { text: "不认，把实情写出来", hint: "官声 +4；得罪上官", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 8 }, { k: "fame", v: 4 }], then: "呈子递上去，如石投水。此后你在衙里，事事都被挑出错来。" },
        { text: "连夜带着家小走", hint: "银钱 −8；成了逃人", effects: [{ k: "silver", v: -8 }, { k: "fame", v: -8 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "ca.c.changli", cat: "官府", title: "常例", age: [20, 58], weight: 12,
      class: ["official_mid"],
      text: [
        "来办事的人，在案角放下一小串钱，不多，也不说话。",
        "衙里人人如此。父亲当年也如此。"
      ],
      options: [
        { text: "照收", hint: "银钱 +5；官声 −3", effects: [{ k: "silver", v: 5 }, { k: "official", v: -3 }] },
        { text: "推回去，照章办", hint: "官声 +6；人怨", effects: [{ k: "official", v: 6 }, { k: "favor", v: -4 }], then: "那人愣了半天，把钱收回袖子里，走的时候在门口回头看了你一眼。" },
        { text: "收下，事办快些", hint: "银钱 +7；日后有把柄", effects: [{ k: "silver", v: 7 }, { k: "grudge", v: 5 }] }
      ]
    },

    {
      id: "ca.c.chushen", cat: "科举", title: "出身", age: [18, 32], weight: 13, once: true,
      class: ["official_mid"],
      text: [
        "有人劝你去考。也有人说：吏员之家，考不出来的——就算中了，也被人看不起。",
        "父亲在灯下算了一夜的账，第二天说：随你。"
      ],
      options: [
        { text: "去考", hint: "学识 +6；银钱 −6", effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -6 }], setFlag: ["literate"] },
        { text: "留在衙里，走吏的路", hint: "官声 +8", effects: [{ k: "official", v: 8 }], then: "你二十岁进衙，二十五岁能独当一面。来办事的人开始先找你，再找官。" },
        { text: "去做买卖", hint: "银钱 +10；家中不认", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -6 }] }
      ]
    },

    {
      id: "ca.c.bi", cat: "官府", title: "一支笔", age: [22, 58], weight: 10,
      class: ["official_mid"],
      text: [
        "一张田契，四至写错了一个字。改这一个字，这一片田就归了另一家。",
        "拿契来的人，是你的远亲。"
      ],
      options: [
        { text: "改", hint: "银钱 +12；有把柄在人手里", effects: [{ k: "silver", v: 12 }, { k: "grudge", v: 6 }] },
        { text: "不改，让他去打官司", hint: "官声 +6；亲戚翻脸", effects: [{ k: "official", v: 6 }, { k: "favor", v: -5 }] },
        { text: "照实报上去", hint: "官声 +8；结怨", effects: [{ k: "official", v: 8 }, { k: "grudge", v: 7 }], then: "田归了公。那年冬天，远亲家的孩子没来给你拜年。" }
      ]
    },

    {
      id: "ca.c.kaoshan", cat: "官府", title: "靠山", age: [26, 58], weight: 10, once: true,
      class: ["official_mid"],
      text: [
        "你的长官调走了。走得很急，行李只有两箱。",
        "新来的长官带来了自己的人。你这样的旧人，坐在原处，谁也不看你。"
      ],
      options: [
        { text: "留着不动，照旧办事", hint: "官声 +5；日子难过", effects: [{ k: "official", v: 5 }, { k: "silver", v: -3 }], then: "你的差事一年比一年轻，最后只剩下管钥匙。" },
        { text: "去新长官门上拜一次", hint: "银钱 −8；官声 +4", effects: [{ k: "silver", v: -8 }, { k: "official", v: 4 }] },
        { text: "自己辞了，回家", hint: "身体 +5；银钱 −4", effects: [{ k: "body", v: 5 }, { k: "silver", v: -4 }] }
      ]
    },

    {
      id: "ca.c.hunyin", cat: "家族", title: "同行", age: [16, 26], weight: 12, once: true,
      class: ["official_mid"],
      text: [
        "说的是另一家吏户的女儿。她父亲在隔壁县管仓。",
        "母亲说：同行知根底，日后好照应。"
      ],
      options: [
        { text: "应下", hint: "银钱 +4；官声 +3", effects: [{ k: "silver", v: 4 }, { k: "official", v: 3 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }], setFlag: ["married"] },
        { text: "娶个读书人家的", hint: "学识 +4；聘礼厚", effects: [{ k: "silver", v: -10 }, { k: "knowledge", v: 4 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"] },
        { text: "不娶，先攒钱", hint: "银钱 +6；母亲着急", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "ca.c.anshu", cat: "官府", title: "旧案", age: [30, 62], weight: 9,
      class: ["official_mid"],
      text: [
        "翻旧卷，翻出一件二十年前的案子。判得不对，当年的人早就死了。",
        "卷子末尾，有你父亲的签名。"
      ],
      options: [
        { text: "合上，放回去", hint: "无得失；夜里想起", effects: [{ k: "luck", v: -1 }], then: "你把卷子放回原处，位置一分不差。此后每次进库房，你都绕开那一格。" },
        { text: "重审，替死人翻过来", hint: "官声 +8；得罪一族", effects: [{ k: "official", v: 8 }, { k: "grudge", v: 9 }, { k: "fame", v: 6 }] },
        { text: "私下告诉那家的后人", hint: "声望 +5；官声 −3", effects: [{ k: "fame", v: 5 }, { k: "official", v: -3 }, { k: "favor", v: 5 }] }
      ]
    }

  );

})(window.PACK_BASE);
