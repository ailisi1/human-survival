/* 生在何朝 · 共同底本（七续）：江湖与游民
 * 丐头、镖客、纤夫、仵作、稳婆、人牙、渡口、脚行、游僧、盗墓、刽子手。
 * 这一卷写「不在册上的人」：他们没有田，没有籍，靠一条路、一门偏门活着。
 * 记事体。钱数写在 hint 里。
 * id 一律以 c9. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    {
      id: "c9.beg", cat: "市井", title: "丐头", age: [6, 60], weight: 14, when: { maxSilver: 8 },
      text: [
        "这条街上的乞儿有头。讨来的要交三成，逢年过节另算。交了，就有个睡的地方，被人打时有人出头。",
        "不交，明天这条街就不是你的了。"
      ],
      options: [
        { text: "交三成", hint: "银钱 +2；有人护着", effects: [{ k: "silver", v: 2 }, { k: "favor", v: 4 }] },
        { text: "不交，自己讨", hint: "银钱 +4；挨打", effects: [{ k: "silver", v: 4 }, { k: "body", v: -5 }] },
        { text: "去城外讨，不进城", hint: "银钱 +1；少挨打", effects: [{ k: "silver", v: 1 }, { k: "body", v: -3 }] }
      ]
    },

    {
      id: "c9.biaoju", cat: "职业", title: "走镖", age: [18, 50], weight: 13, when: { minMartial: 20 },
      text: [
        "镖局接了趟活：三十车货，从本省走到口外，脚价二百两。",
        "出城的时候喊镖号，一路喊过去，是告诉道上有人的：这趟货有人保。"
      ],
      options: [
        { text: "接，跟着走一趟", hint: "银钱 +12；身体 −8", effects: [{ k: "silver", v: 12 }, { k: "body", v: -8 }, { k: "martial", v: 5 }] },
        { text: "只押短程", hint: "银钱 +6；风险小", effects: [{ k: "silver", v: 6 }] },
        { text: "不接，这趟路上不干净", hint: "无得失", effects: [{ k: "luck", v: 2 }] }
      ]
    },

    {
      id: "c9.qianfu", cat: "职业", title: "拉纤", age: [16, 50], weight: 12,
      text: [
        "上水船要靠人拉。一条纤绳，八个人，赤脚踩在卵石上，一步一俯。",
        "滩上有一段叫「鬼见愁」。过那段，要加钱。"
      ],
      options: [
        { text: "拉，加钱的滩也拉", hint: "银钱 +6；身体 −9", effects: [{ k: "silver", v: 6 }, { k: "body", v: -9 }] },
        { text: "只在平水段拉", hint: "银钱 +3；身体 −4", effects: [{ k: "silver", v: 3 }, { k: "body", v: -4 }] },
        { text: "改去船上撑篙", hint: "银钱 +5；身体 −5", effects: [{ k: "silver", v: 5 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "c9.wuzuo", cat: "官府", title: "仵作", age: [18, 60], weight: 11,
      text: [
        "县里出了人命，要验尸。仵作不是官，是役，子孙不许应考。",
        "尸首在河边泡了三日。吏站在十步之外，捂着鼻子。"
      ],
      options: [
        { text: "照实报伤", hint: "声望 +3；得罪凶家", effects: [{ k: "fame", v: 3 }, { k: "grudge", v: 5 }] },
        { text: "照吏的意思报", hint: "银钱 +8；心里过不去", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -2 }] },
        { text: "辞了这份役", hint: "银钱 −3；脱了贱籍", effects: [{ k: "silver", v: -3 }, { k: "luck", v: 2 }] }
      ]
    },

    {
      id: "c9.midwife", cat: "职业", title: "稳婆", age: [20, 60], weight: 12, when: { sex: "female" },
      text: [
        "半夜有人来拍门，说媳妇难产。你抓起布包就走。",
        "屋里点着两盏灯。产妇已经不出声，接生婆的手一摸，就知道是横的。"
      ],
      options: [
        { text: "硬接下来", hint: "或母子俱存；或一尸两命", effects: [{ k: "body", v: -4 }],
          gamble: { winChance: 0.6, win: [{ k: "fame", v: 8 }, { k: "silver", v: 6 }], lose: [{ k: "fame", v: -9 }, { k: "grudge", v: 6 }],
            winNote: "天亮的时候，孩子哭了。产妇的娘跪下来给你磕头。",
            loseNote: "孩子出来了，是死的。产妇也没止住血。屋里静得可怕。" } },
        { text: "说转不过来，让另请人", hint: "名声损；不担干系", effects: [{ k: "fame", v: -5 }] },
        { text: "保大人，舍孩子", hint: "银钱 +3；妇人记你一辈子", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 4 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "c9.humanbroker", cat: "市井", title: "人牙", age: [20, 60], weight: 11,
      text: [
        "荒年卖人。牙人从中说合，抽一成。男的一口价，女的分年纪。",
        "今日领来的是个十二三岁的丫头，瘦，一直看着她娘。"
      ],
      options: [
        { text: "做这买卖", hint: "银钱 +12；名声坏", effects: [{ k: "silver", v: 12 }, { k: "fame", v: -8 }] },
        { text: "只做长工的中人", hint: "银钱 +5；还过得去", effects: [{ k: "silver", v: 5 }] },
        { text: "自己出钱把她买下，放回去", hint: "银钱 −14；心里安", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 6 }, { k: "luck", v: 3 }] }
      ]
    },

    {
      id: "c9.ferry", cat: "市井", title: "渡口", age: [16, 60], weight: 12,
      text: [
        "河上没有桥，只有一条渡船。船老大收钱，一人一文，货另算。",
        "水大的时候，船到河心就打旋。船老大说：都坐稳，别动。"
      ],
      options: [
        { text: "撑船摆渡", hint: "银钱 +5；身体 −4", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "水大就不开", hint: "银钱 +2；人怨", effects: [{ k: "silver", v: 2 }, { k: "favor", v: -3 }] },
        { text: "凑钱修桥", hint: "银钱 −10；一村便当", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }, { k: "favor", v: 6 }] }
      ]
    },

    {
      id: "c9.ganghead", cat: "市井", title: "脚行", age: [16, 50], weight: 12,
      text: [
        "码头上扛包，一包二百斤。脚行有把头，活由他分，钱也由他分。",
        "今日来了新客，把头说要抽四成。老的抽三成。"
      ],
      options: [
        { text: "认了四成", hint: "银钱 +4；身体 −6", effects: [{ k: "silver", v: 4 }, { k: "body", v: -6 }] },
        { text: "跟把头争", hint: "银钱 +7；或有伤", effects: [{ k: "silver", v: 7 }, { k: "body", v: -8 }, { k: "favor", v: 4 }] },
        { text: "去别的码头", hint: "银钱 +3；重新起头", effects: [{ k: "silver", v: 3 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "c9.monkgate", cat: "方外", title: "挂单", age: [14, 65], weight: 10,
      text: [
        "游方僧到寺里挂单，要验度牒。有牒的住三日，无牒的不留。",
        "你的牒在路上丢了。天要黑了，山门外下着雨。"
      ],
      options: [
        { text: "在门外檐下坐一夜", hint: "身体 −6；心定", effects: [{ k: "body", v: -6 }, { k: "luck", v: 2 }] },
        { text: "拿钱求知客", hint: "银钱 −3；住下", effects: [{ k: "silver", v: -3 }] },
        { text: "假冒有牒，混进去", hint: "有饭吃；被查出则逐", effects: [{ k: "grain", v: 6 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "c9.ritual", cat: "方外", title: "斋醮", age: [18, 65], weight: 10,
      text: [
        "有人家做斋，请道士设坛，三日三夜，超度亡人。坛上要念、要唱、要步罡。",
        "做一场，得钱八两。做的人知道，亡人听不见。"
      ],
      options: [
        { text: "老实做三日", hint: "银钱 +8；身体 −5", effects: [{ k: "silver", v: 8 }, { k: "body", v: -5 }] },
        { text: "缩成一日", hint: "银钱 +7；主家不满", effects: [{ k: "silver", v: 7 }, { k: "fame", v: -4 }] },
        { text: "只收半价，做足三日", hint: "银钱 +4；名声起", effects: [{ k: "silver", v: 4 }, { k: "fame", v: 6 }] }
      ]
    },

    {
      id: "c9.boneset", cat: "方外", title: "正骨", age: [18, 65], weight: 10,
      text: [
        "有人从房上跌下来，腿断了，骨头戳在外头。抬到你这里。",
        "接骨不难，难的是接完不发疽。"
      ],
      options: [
        { text: "接，用药敷", hint: "或好或坏", effects: [{ k: "fame", v: 3 }],
          gamble: { winChance: 0.65, win: [{ k: "silver", v: 7 }, { k: "fame", v: 4 }], lose: [{ k: "fame", v: -6 }, { k: "grudge", v: 4 }],
            winNote: "四十日后，他能下地走了，虽然瘸。",
            loseNote: "第三日伤口发黑，人烧得说胡话。第五日没了。" } },
        { text: "只上夹板，不开药", hint: "银钱 +3；稳", effects: [{ k: "silver", v: 3 }] },
        { text: "让抬去城里找官医", hint: "无得失", effects: [{ k: "fame", v: 2 }] }
      ]
    },

    {
      id: "c9.bandjoin", cat: "世变", title: "入伙", age: [16, 45], weight: 11,
      text: [
        "山上的寨子缺人。来的说：入伙要交投名状，下山做一件，从此回不去。",
        "寨里有饭吃。山下没有。"
      ],
      options: [
        { text: "入伙", hint: "有饭吃；成了贼", effects: [{ k: "grain", v: 10 }, { k: "martial", v: 6 }, { k: "grudge", v: 8 }] },
        { text: "不入，下山讨饭", hint: "身体 −6；清白", effects: [{ k: "body", v: -6 }, { k: "fame", v: 2 }] },
        { text: "报官，领赏", hint: "银钱 +6；山寨记恨", effects: [{ k: "silver", v: 6 }, { k: "official", v: 4 }, { k: "grudge", v: 9 }] }
      ]
    },

    {
      id: "c9.sellgirl", cat: "家族", title: "娼门", age: [10, 40], weight: 9, when: { sex: "female" },
      text: [
        "家里揭不开锅，有人来说：城里的院子要人，先给十两，往后按月给。",
        "契上写的是「雇」。你娘按了手印，手一直抖。"
      ],
      options: [
        { text: "去", hint: "银钱 +10；从此不由己", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -6 }, { k: "body", v: -5 }] },
        { text: "不去，逃到外县", hint: "身体 −7；清白的穷", effects: [{ k: "body", v: -7 }, { k: "luck", v: 2 }] },
        { text: "去，但立死契外的活契", hint: "银钱 +6；留一线", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 3 }] }
      ]
    },

    {
      id: "c9.peddler", cat: "营生", title: "货郎", age: [14, 60], weight: 12,
      text: [
        "一副担子，两头是箱：针线、胭脂、木梳、小儿玩的鼓。走村串巷，摇个拨浪鼓。",
        "村里的女人一年见不到几次外人，见了货郎，能说半个时辰的话。"
      ],
      options: [
        { text: "走村，货换粮", hint: "银钱 +5；粮 +6", effects: [{ k: "silver", v: 5 }, { k: "grain", v: 6 }, { k: "body", v: -5 }] },
        { text: "兼收土产，转卖城里", hint: "银钱 +9；两头跑", effects: [{ k: "silver", v: 9 }, { k: "body", v: -6 }] },
        { text: "在镇上租个摊", hint: "银钱 +4；安定", effects: [{ k: "silver", v: 4 }] }
      ]
    },

    {
      id: "c9.letter", cat: "职业", title: "信客", age: [18, 60], weight: 10, when: { minKnowledge: 6 },
      text: [
        "跑一趟远路，替人带信、带银。带银抽二厘，带信不收钱。",
        "银要缝在衣里。路上有人专门劫跑单帮的。"
      ],
      options: [
        { text: "接，带上", hint: "银钱 +7；身体 −6", effects: [{ k: "silver", v: 7 }, { k: "body", v: -6 }] },
        { text: "只带信，不带银", hint: "银钱 +3；安稳", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 3 }] },
        { text: "替人写家书，收笔资", hint: "银钱 +4；知识 +2", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 2 }] }
      ]
    },

    {
      id: "c9.execution", cat: "官府", title: "法场", age: [12, 70], weight: 10,
      text: [
        "今日西市处决。人挤了半条街，卖吃食的也来了。",
        "被绑的那人你认得，是隔壁村的，去年还来借过牛。"
      ],
      options: [
        { text: "去看", hint: "心里堵；见识人情", effects: [{ k: "luck", v: -1 }, { k: "knowledge", v: 2 }] },
        { text: "不去", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "去替他收尸", hint: "声望 +3；被人指认", effects: [{ k: "fame", v: 3 }, { k: "grudge", v: 4 }] }
      ]
    },

    {
      id: "c9.grave", cat: "世变", title: "盗墓", age: [16, 50], weight: 9, when: { maxSilver: 6 },
      text: [
        "荒年里，有人去刨古墓。墓里有铜器、有玉、有陪葬的钱。",
        "带头的人说：这活不难，就是夜里怕。"
      ],
      options: [
        { text: "跟着去", hint: "银钱 +9；或有塌方", effects: [{ k: "silver", v: 9 }],
          gamble: { winChance: 0.75, win: [{ k: "silver", v: 8 }], lose: [{ k: "body", v: -16 }], deathChance: 0.3, cause: "塌方",
            loseNote: "坑道塌了。你被人拖出来的时候，腿是软的，另一个人还在里头。" } },
        { text: "不去，宁可饿", hint: "身体 −5；心不亏", effects: [{ k: "body", v: -5 }, { k: "luck", v: 2 }] },
        { text: "报与乡里", hint: "名声好；被人恨", effects: [{ k: "fame", v: 4 }, { k: "favor", v: -5 }] }
      ]
    },

    {
      id: "c9.saltsmuggle", cat: "世变", title: "盐枭", age: [18, 50], weight: 10,
      text: [
        "私盐的队伍，一走三十人，挑担，带刀。前面有人探路，后面有人断后。",
        "一趟走得快，能赚二十两。被缉着，按律是死。"
      ],
      options: [
        { text: "跟队走一趟", hint: "银钱 +14；或有缉", effects: [{ k: "silver", v: 14 }, { k: "body", v: -8 }] },
        { text: "只做探路的", hint: "银钱 +8；危险", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -2 }] },
        { text: "不干", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c9.oath", cat: "人际", title: "结拜", age: [14, 45], weight: 11,
      text: [
        "三个人在庙里烧了香，磕了头，说以后同生共死。",
        "其中一个，你其实不太信得过。可香已经烧了。"
      ],
      options: [
        { text: "认这个兄弟", hint: "交情深；日后有事", effects: [{ k: "favor", v: 8 }, { k: "luck", v: 1 }] },
        { text: "认，但留一手", hint: "交情浅；不吃亏", effects: [{ k: "favor", v: 3 }, { k: "knowledge", v: 2 }] },
        { text: "事后疏远", hint: "人情散", effects: [{ k: "favor", v: -4 }] }
      ]
    },

    {
      id: "c9.debtman", cat: "世变", title: "讨债", age: [18, 45], weight: 10,
      text: [
        "有人欠了钱不还。债主雇你去要，要回来抽三成。",
        "欠债的是个寡妇，家里有一个锅、两个孩子。"
      ],
      options: [
        { text: "照要", hint: "银钱 +5；声名坏", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -5 }] },
        { text: "只搬走值钱的，留口粮", hint: "银钱 +3；还过得去", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 2 }] },
        { text: "自己垫上，说没要着", hint: "银钱 −5；心里安", effects: [{ k: "silver", v: -5 }, { k: "luck", v: 3 }] }
      ]
    },

    {
      id: "c9.wrestle", cat: "市井", title: "擂台", age: [16, 40], weight: 9, when: { minMartial: 25 },
      text: [
        "庙会上摆擂台，赢的得钱五贯，还有一匹红。输了，自己走回去。",
        "台上那人膀大腰圆，已经赢了七场。"
      ],
      options: [
        { text: "上台", hint: "或得钱，或被打", effects: [{ k: "fame", v: 4 }],
          gamble: { winChance: 0.4, win: [{ k: "silver", v: 8 }, { k: "fame", v: 8 }], lose: [{ k: "body", v: -12 }, { k: "fame", v: -3 }],
            winNote: "你把他摔在台上。台下的人喊得比打雷响。",
            loseNote: "他一只手就把你提起来了。你落地的时候，听见自己肋骨响。" } },
        { text: "在台下摆摊卖膏药", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }] },
        { text: "押注买他赢", hint: "银钱 +3；稳", effects: [{ k: "silver", v: 3 }] }
      ]
    },

    {
      id: "c9.porridge", cat: "天灾", title: "施粥", age: [10, 70], weight: 11,
      text: [
        "城外设了粥厂，一日两顿，一人一勺。排队的从厂门口排到河边。",
        "粥稀，能照见人。有人说：喝了这个，也只能多活十日。"
      ],
      options: [
        { text: "去排队", hint: "粮 +4；身体 −3", effects: [{ k: "grain", v: 4 }, { k: "body", v: -3 }] },
        { text: "插队，抢在前头", hint: "粮 +7；被人打", effects: [{ k: "grain", v: 7 }, { k: "body", v: -5 }, { k: "fame", v: -4 }] },
        { text: "去粥厂帮工，换两勺", hint: "粮 +6；身体 −5", effects: [{ k: "grain", v: 6 }, { k: "body", v: -5 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "c9.boatgang", cat: "职业", title: "船帮", age: [16, 55], weight: 10,
      text: [
        "水上的船户结帮：一帮十几条船，走同一条水，遇事一起应付。",
        "入帮要摆酒、要认师父。不入帮的船，靠不了好码头。"
      ],
      options: [
        { text: "入帮", hint: "银钱 −3；有靠山", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 7 }] },
        { text: "不入，自己跑", hint: "银钱 +2；常被挤", effects: [{ k: "silver", v: 2 }, { k: "favor", v: -3 }] },
        { text: "替帮里跑腿，混个脸熟", hint: "银钱 +3；见识", effects: [{ k: "silver", v: 3 }, { k: "favor", v: 3 }] }
      ]
    },

    {
      id: "c9.watchnight", cat: "乡里", title: "更夫", age: [20, 65], weight: 10,
      text: [
        "夜里打更，一夜五更，一更一梆。冬天夜里，梆子冻得粘手。",
        "这一夜三更，你看见巷口有个人影，翻墙进去了。"
      ],
      options: [
        { text: "喊起来", hint: "声望 +4；或有报复", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 4 }] },
        { text: "装作没看见", hint: "无得失；心里不安", effects: [{ k: "luck", v: -1 }] },
        { text: "敲梆子从那条巷走过去", hint: "把人惊走", effects: [{ k: "favor", v: 3 }, { k: "luck", v: 2 }] }
      ]
    },

    {
      id: "c9.shadow", cat: "方外", title: "师婆", age: [20, 65], weight: 9,
      text: [
        "有人病了，请师婆来看。烧纸、念咒、跳一阵，说是撞了邪。",
        "药钱他们舍不得，香火钱倒是肯出。"
      ],
      options: [
        { text: "照做，收香火钱", hint: "银钱 +7；病不好则挨骂", effects: [{ k: "silver", v: 7 }, { k: "luck", v: -2 }] },
        { text: "看完说该请郎中", hint: "银钱 +2；名声正", effects: [{ k: "silver", v: 2 }, { k: "fame", v: 5 }] },
        { text: "两样都做，先跳后开方", hint: "银钱 +6；费神", effects: [{ k: "silver", v: 6 }, { k: "body", v: -3 }] }
      ]
    },

    {
      id: "c9.banker", cat: "市井", title: "押宝", age: [18, 55], weight: 9,
      text: [
        "庙会上的赌摊，一副宝盒，四个方位，押中一赔三。",
        "摊主的手法，你看了半天，看出来了：他手指一动，宝就换了向。"
      ],
      options: [
        { text: "押，赌一把", hint: "或赢或输", effects: [{ k: "silver", v: -3 }],
          gamble: { winChance: 0.3, win: [{ k: "silver", v: 9 }], lose: [{ k: "silver", v: -4 }],
            winNote: "开了，是你押的那一方。摊主脸色变了变，数钱给你。",
            loseNote: "开了，不是。你把最后几文推过去，站起来走了。" } },
        { text: "自己摆一个摊", hint: "银钱 +10；被人砸", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 6 }] },
        { text: "走开", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c9.watercarry", cat: "营生", title: "挑水", age: [12, 55], weight: 10,
      text: [
        "城里的水要买。一口井，被人包了，挑水卖，一担一文。",
        "从井到人家，二里路，一天挑二十担。"
      ],
      options: [
        { text: "挑水卖", hint: "银钱 +4；身体 −6", effects: [{ k: "silver", v: 4 }, { k: "body", v: -6 }] },
        { text: "包一口井，雇人挑", hint: "银钱 −8；日后收钱", effects: [{ k: "silver", v: -8 }, { k: "luck", v: 2 }] },
        { text: "替人淘井", hint: "银钱 +6；井下有险", effects: [{ k: "silver", v: 6 }, { k: "body", v: -7 }] }
      ]
    },

    {
      id: "c9.nightsoil", cat: "营生", title: "粪夫", age: [14, 60], weight: 9,
      text: [
        "城里的粪要人收。收了卖给城外种菜的，一年也有几两银。",
        "这行是贱业。做这行的，子孙不许应考。"
      ],
      options: [
        { text: "做这行", hint: "银钱 +6；人嫌", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -5 }] },
        { text: "包几个坊，转卖", hint: "银钱 +9；有争", effects: [{ k: "silver", v: 9 }, { k: "grudge", v: 3 }] },
        { text: "不干，去扛包", hint: "银钱 +3；身体 −5", effects: [{ k: "silver", v: 3 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "c9.headsman", cat: "职业", title: "行刑", age: [20, 55], weight: 8,
      text: [
        "这活没人愿干。可工钱高：斩一名，得银二两，还有家属塞的钱——求一刀干脆。",
        "师父说：刀要斜着下，人才不疼。"
      ],
      options: [
        { text: "接这活", hint: "银钱 +10；名声坏", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -7 }, { k: "luck", v: -2 }] },
        { text: "只做别的杂役", hint: "银钱 +3", effects: [{ k: "silver", v: 3 }] },
        { text: "收了钱，给个痛快", hint: "银钱 +6；心里稳", effects: [{ k: "silver", v: 6 }, { k: "luck", v: 1 }] }
      ]
    },

    {
      id: "c9.morgue", cat: "乡里", title: "义庄", age: [18, 65], weight: 9,
      text: [
        "客死的人，尸首停在义庄，等家里来接。等不来的，就埋在义冢。",
        "今年停了三具，都没人接。"
      ],
      options: [
        { text: "出钱埋了", hint: "银钱 −5；名声好", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 6 }, { k: "luck", v: 2 }] },
        { text: "替他们写信回家", hint: "银钱 −2；知识 +2", effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 2 }, { k: "favor", v: 4 }] },
        { text: "不管，与自己无关", hint: "无得失", effects: [{ k: "luck", v: -1 }] }
      ]
    }

  );

})(window.PACK_BASE);
