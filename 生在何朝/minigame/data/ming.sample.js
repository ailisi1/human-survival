/* 生在何朝 · 明朝样例数据包（20 条）
 * 用途：验证文风、数值与历史细节。不是完整数据包。
 * 加载方式：<script src="data/ming.sample.js"></script>，挂到 window.PACK_MING
 */

window.PACK_MING = {

  meta: {
    id: "ming",
    name: "明",
    years: [1368, 1644],
    capital: ["南京", "北京"],
    note: "洪武元年至崇祯十七年，凡二百七十六年"
  },

  /* 年号表：用于把公元年转成"万历十四年" */
  reigns: [
    { name: "洪武", from: 1368, to: 1398, emperor: "太祖" },
    { name: "建文", from: 1399, to: 1402, emperor: "惠帝" },
    { name: "永乐", from: 1403, to: 1424, emperor: "成祖" },
    { name: "洪熙", from: 1425, to: 1425, emperor: "仁宗" },
    { name: "宣德", from: 1426, to: 1435, emperor: "宣宗" },
    { name: "正统", from: 1436, to: 1449, emperor: "英宗" },
    { name: "景泰", from: 1450, to: 1456, emperor: "代宗" },
    { name: "天顺", from: 1457, to: 1464, emperor: "英宗" },
    { name: "成化", from: 1465, to: 1487, emperor: "宪宗" },
    { name: "弘治", from: 1488, to: 1505, emperor: "孝宗" },
    { name: "正德", from: 1506, to: 1521, emperor: "武宗" },
    { name: "嘉靖", from: 1522, to: 1566, emperor: "世宗" },
    { name: "隆庆", from: 1567, to: 1572, emperor: "穆宗" },
    { name: "万历", from: 1573, to: 1620, emperor: "神宗" },
    { name: "泰昌", from: 1620, to: 1620, emperor: "光宗" },
    { name: "天启", from: 1621, to: 1627, emperor: "熹宗" },
    { name: "崇祯", from: 1628, to: 1644, emperor: "思宗" }
  ],

  /* 八个阶层，等概率抽取 */
  classes: [
    {
      id: "royal", name: "宗室", weight: 1,
      init: { body: 78, silver: 800, field_wet: 0, field_dry: 0, grain: 200, knowledge: 30, fame: 45 },
      note: "宗禄按时支给，锦衣玉食，但不得经商、不得出仕、不得擅离封地"
    },
    {
      id: "noble", name: "勋贵", weight: 1,
      init: { body: 76, silver: 1200, field_wet: 60, field_dry: 40, grain: 300, knowledge: 25, fame: 50 },
      note: "世袭武职或公侯之后，家世即资本"
    },
    {
      id: "official_mid", name: "官吏", weight: 1,
      init: { body: 75, silver: 180, field_wet: 25, field_dry: 15, grain: 60, knowledge: 45, fame: 35 },
      note: "五六七品，不上不下"
    },
    {
      id: "gentry", name: "士绅", weight: 1,
      init: { body: 76, silver: 120, field_wet: 40, field_dry: 20, grain: 80, knowledge: 40, fame: 40 },
      note: "有生员以上功名，或退职家居，服徭役可免"
    },
    {
      id: "merchant", name: "商贾", weight: 1,
      init: { body: 74, silver: 600, field_wet: 10, field_dry: 5, grain: 40, knowledge: 20, fame: 15 },
      note: "有钱而无地位，子弟多走捐监一途"
    },
    {
      id: "farmer", name: "自耕农", weight: 1,
      init: { body: 75, silver: 8, field_wet: 8, field_dry: 12, grain: 14, knowledge: 0, fame: 10 },
      note: "有田二三十亩，赋役的直接承担者"
    },
    {
      id: "tenant", name: "佃农", weight: 1,
      init: { body: 72, silver: 2, field_wet: 0, field_dry: 0, grain: 4, knowledge: 0, fame: 5 },
      note: "佃人之田，岁输其半"
    },
    {
      id: "base", name: "贱籍", weight: 1,
      init: { body: 68, silver: 1, field_wet: 0, field_dry: 0, grain: 2, knowledge: 0, fame: 0 },
      note: "军户、匠户、灶户、乐户，世代不得脱籍"
    }
  ],

  /* 物价表：万历中，北直隶 */
  prices: {
    unit: "两",
    rice_per_shi: 0.6,
    rice_per_shi_crisis: 4.5,
    field_wet_per_mu: 12,
    field_dry_per_mu: 2.5,
    tuition_year: 3,
    labor_year: 4,
    labor_day: 0.03,
    silver_to_cash: 700,
    cash_to_rmb: 0.9,
    jinshi_bribe: 200,
    coffin: 3,
    doctor_visit: 0.5
  },

  /* 家世生成池：按阶层抽爵位、职位、人脉、宅院、奴婢、藏书 */
  estate: {
    royal: {
      rank: ["亲王世子", "郡王", "镇国将军", "辅国将军", "奉国中尉"],
      post: ["宗人府仪宾", "无职（宗禁，不得出仕）"],
      rel: ["宗人府有旧", "王府长史是远亲"],
      house: ["王府别院", "五进大宅"],
      servants: [12, 40], books: [300, 1200], troops: [8, 30]
    },
    noble: {
      rank: ["世袭指挥使", "世袭千户", "世袭百户", "伯爵之后"],
      post: ["京营把总", "卫指挥佥事", "锦衣卫校尉"],
      rel: ["父执在兵部", "与国公家有旧"],
      house: ["四进宅院"], servants: [6, 20], books: [80, 400], troops: [12, 60]
    },
    official_mid: {
      rank: [],
      post: ["知县", "县丞", "教谕", "典史", "州同知", "卫经历"],
      rel: ["座主为御史", "舅家在府衙当差"],
      house: ["三进院落"], servants: [2, 8], books: [100, 500], troops: [0, 6]
    },
    gentry: {
      rank: [],
      post: ["生员", "举人", "退职知县", "府学训导"],
      rel: ["族中有举人", "与知县有旧"],
      house: ["三进院落"], servants: [1, 6], books: [120, 600], troops: [0, 8]
    },
    merchant: {
      rank: [],
      post: ["盐商", "布商", "典当掌柜", "漕运船户"],
      rel: ["姻亲在钞关", "与牙行相熟"],
      house: ["砖瓦大院"], servants: [3, 12], books: [20, 120], troops: [2, 14]
    },
    farmer: {
      rank: [],
      post: ["本户", "里长", "粮长"],
      rel: ["族中无显者", "邻村有表亲"],
      house: ["土坯草房五间"], servants: [0, 0], books: [0, 3], troops: [0, 0]
    },
    tenant: {
      rank: [],
      post: ["佃户", "长工"],
      rel: ["族中无显者"],
      house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0]
    },
    base: {
      rank: [],
      post: ["军户余丁", "匠户", "灶户", "乐户", "奴婢"],
      rel: ["世代当差", "主家姓周"],
      house: ["营房一间"], servants: [0, 0], books: [0, 0], troops: [0, 0]
    }
  },

  events: [

    /* ── 出生 ────────────────────────────────────────── */
    {
      id: "ming.birth.drowned",
      cat: "世变",
      title: "生三日",
      era: "ming",
      age: [0, 0],
      class: ["farmer", "tenant", "base"],
      sex: "female",
      weight: 12,
      once: true,
      text: [
        "你生下来第三天，祖母抱着你走到院里。",
        "屋里已经有两个姐姐了。"
      ],
      options: [
        {
          text: "……",
          hint: "这一局到此为止",
          kill: "self",
          cause: "溺",
          then: "水缸边沿很滑。"
        }
      ],
      epitaph: {
        name: "无名",
        line: "生三日而卒",
        verse: "祖母说，家里已经有两个姐姐了。"
      }
    },

    {
      id: "ming.birth.name",
      cat: "家族",
      title: "起名",
      era: "ming",
      age: [0, 0],
      class: [],
      weight: 100,
      once: true,
      text: [
        "{reign}，你生在{place}。",
        "接生的是邻村的稳婆，收了三十文钱。父亲翻了三天的{{《字汇》|明代通行字书，梅膺祚编}}，还是没定下名字。"
      ],
      options: [
        {
          text: "按族谱排行",
          hint: "声望 +4；族中长辈记下了你这一房",
          effects: [{ k: "fame", v: 4 }],
          then: "名字写进了族谱，占了一行。"
        },
        {
          text: "取个贱名",
          hint: "身体 +4；乡里叫得顺口，但也叫得轻贱",
          effects: [{ k: "body", v: 4 }, { k: "fame", v: -2 }],
          then: "村口的人从此都喊你这个名字。"
        },
        {
          text: "父亲想让你读书，取个文气的",
          hint: "学识 +2；多花了两文钱请塾师看过字",
          effects: [{ k: "knowledge", v: 2 }, { k: "silver", v: -0.02 }],
          then: "父亲把这两个字念了三遍，念得很慢。"
        }
      ]
    },

    /* ── 幼年 ────────────────────────────────────────── */
    {
      id: "ming.infant.illness",
      cat: "身体",
      title: "出痘",
      era: "ming",
      age: [1, 6],
      class: [],
      weight: 25,
      once: true,
      text: [
        "村里开始有人出痘{{出痘|天花。明代幼儿多不能免，是幼年夭折的首要死因}}。先是东头李家的二小子，三天后，你身上也起了红点。",
        "母亲用艾草熏了屋子，父亲去镇上请了郎中，诊金五分银，药钱另算。"
      ],
      options: [
        {
          text: "请郎中，抓药",
          hint: "银钱 −0.5 两；身体 +8，但家中口粮要紧一紧",
          effects: [{ k: "silver", v: -0.5 }, { k: "body", v: 8 }, { k: "grain", v: -0.5 }],
          then: "七天后热退了。你脸上留了两个麻点。"
        },
        {
          text: "不请郎中，求神",
          hint: "银钱 −0.05 两；身体 −12，赌的是命",
          effects: [{ k: "silver", v: -0.05 }, { k: "body", v: -6 }],
          then: "母亲在痘神像前跪了一夜。你活下来了，瘦得只剩一把骨头。",
          gamble: { deathChance: 0.18, cause: "痘疹" }
        },
        {
          text: "送去邻村隔离",
          hint: "身体 −6；家中少一张嘴，但你会一个人在柴房里待十二天",
          effects: [{ k: "body", v: -3 }, { k: "fame", v: 2 }, { k: "grain", v: 0.5 }],
          then: "十二天里，只有母亲每天来送一碗粥，隔着门。"
        }
      ]
    },

    /* ── 开蒙 ────────────────────────────────────────── */
    {
      id: "ming.child.school",
      cat: "家族",
      title: "蒙馆",
      era: "ming",
      age: [6, 9],
      class: ["farmer", "tenant", "gentry", "merchant", "official_mid"],
      weight: 40,
      once: true,
      text: [
        "今年麦收只有往年的七成。父亲蹲在门槛上抽旱烟，母亲在灶间数着口袋里的谷子。",
        "村东的私塾先生姓孙，是个落第的{{童生|未考取生员的读书人}}，在自家厢房开了间{{蒙馆|私塾}}。一年{{束脩|学费。明代蒙师一年约二三两银，或折米数石}}要三斗米。"
      ],
      options: [
        {
          text: "送去识字",
          hint: "存粮 −3 石；学识 +6。这个冬天要少吃一顿",
          effects: [{ k: "grain", v: -3 }, { k: "knowledge", v: 6 }],
          setFlag: ["literate"],
          then: "孙先生给你起了个学名。你第一次知道自己的名字可以写成两个字。"
        },
        {
          text: "跟着下地",
          hint: "身体 +4；学识不变。父亲松了口气",
          effects: [{ k: "body", v: 4 }, { k: "fame", v: 3 }],
          then: "七岁那年你学会了扶犁。父亲说你比他有出息。"
        },
        {
          text: "去镇上粮行看仓",
          hint: "银钱 +0.5 两；声望 −3，有人说这孩子学坏",
          effects: [{ k: "silver", v: 0.5 }, { k: "fame", v: -3 }, { k: "body", v: 2 }],
          then: "你在粮行学会了看斗、看秤，也学会了怎么在斗底垫一层谷壳。"
        }
      ]
    },

    {
      id: "ming.child.hired",
      cat: "家族",
      title: "帮工",
      era: "ming",
      age: [8, 13],
      class: ["tenant", "farmer", "base"],
      weight: 22,
      once: true,
      text: [
        "本村周家有一百二十亩田。周家老三来问，你愿不愿意去他家做短工{{短工|按日计佣的雇工，一日约二十文}}。",
        "一天二十文，管一顿饭。"
      ],
      options: [
        {
          text: "去。一天二十文",
          hint: "银钱 +0.6 两（一个月）；身体 −4",
          effects: [{ k: "silver", v: 0.6 }, { k: "body", v: -2 }],
          then: "一个月下来，你的手心磨出了三层茧。"
        },
        {
          text: "不去，在家帮父亲",
          hint: "身体 +3；家中不缺人手，也不多一文钱",
          effects: [{ k: "body", v: 3 }, { k: "fame", v: 3 }],
          then: "父亲什么也没说，第二天多给了你半个饼。"
        },
        {
          text: "去，但要多学本事",
          hint: "银钱 +0.3 两；学识 +3。工钱少了，但你偷偷看了账房的账",
          effects: [{ k: "silver", v: 0.3 }, { k: "knowledge", v: 3 }, { k: "body", v: -2 }],
          then: "你认得了一些字。也第一次知道，一石米进出一趟，能赚三分。"
        }
      ]
    },

    /* ── 荒年（核心样例） ─────────────────────────────── */
    {
      id: "ming.famine.sell_sister",
      cat: "天灾",
      title: "荒年",
      era: "ming",
      years: [1637, 1643],
      age: [10, 17],
      class: ["farmer", "tenant"],
      weight: 60,
      once: true,
      text: [
        "去年没下透雨，今年开春又起了蝗。家里的八亩水田裂成了龟背，一斗种下去，收了三升。",
        "父亲从集上回来，一句话没说，蹲在院子里抽了半宿旱烟。母亲把妹妹的旧衣裳翻出来，洗了。",
        "集上有人收人。十二岁的丫头，四两银子，往南边去。"
      ],
      options: [
        {
          text: "卖妹妹",
          hint: "银钱 +4 两；声望 −15。四两银子，够全家吃三个月",
          effects: [{ k: "silver", v: 4 }, { k: "fame", v: -15 }, { k: "grudge", v: 6 }],
          setFlag: ["sold_sister"],
          then: "走的那天，妹妹没哭。她回头看了你一眼，你低下了头。",
          schedule: [{ inYears: 10, eventId: "ming.memory.sister" }]
        },
        {
          text: "卖田五亩",
          hint: "水田 −5 亩（荒年田贱，只得银 7 两，丰年可卖五十两）",
          effects: [{ k: "field_wet", v: -5 }, { k: "silver", v: 7 }],
          setFlag: ["sold_field"],
          then: "买主是周家老三。他数银子的时候，一粒一粒地数。"
        },
        {
          text: "向周家借贷",
          hint: "银钱 +8 两；月息三分，两年后本息十二两",
          effects: [
            { k: "silver", v: 8 },
            { k: "debt", v: { amt: 8, rate: 0.03, dueYears: 2 } }
          ],
          then: "借约上按了你的手印。周家老三说，不急着还。"
        },
        {
          text: "举家逃荒",
          hint: "田产全部抛荒；身体 −25，全家流徙",
          effects: [
            { k: "field_wet", v: -8 }, { k: "body", v: -13 },
            { k: "silver", v: -1 }, { k: "fame", v: -5 }
          ],
          setFlag: ["refugee"],
          then: "你们往南走了十九天。路上埋了两个同乡。"
        }
      ]
    },

    /* ── 定亲 ────────────────────────────────────────── */
    {
      id: "ming.youth.betrothal",
      cat: "家族",
      title: "定亲",
      era: "ming",
      age: [13, 17],
      sex: "male",
      class: [],
      weight: 55,
      once: true,
      when: { flagNot: ["married"] },
      text: [
        "媒人来了三趟。头两趟说的是邻村张家的女儿，第三趟换了人。",
        "母亲说，张家要{{聘财|男方给女家的彩礼}}八两，另加两匹布。"
      ],
      options: [
        {
          text: "应下张家",
          hint: "银钱 −8 两；家眷 +1。门当户对，日子照旧",
          effects: [{ k: "silver", v: -8 }, { k: "addPerson", v: { name: "张氏", role: "wife", rel: "妻", age: 16 } }],
          setFlag: ["married"],
          then: "成亲那天下了雨。新房的瓦漏了一处，摆了三个盆接水。"
        },
        {
          text: "攀一门高亲",
          hint: "银钱 −25 两；声望 +12。若攀不上，钱也要不回来",
          effects: [{ k: "silver", v: -25 }, { k: "fame", v: 12 }, { k: "grudge", v: 8 }],
          setFlag: ["married", "married_up"],
          then: "对方父亲是县里的典史{{典史|知县属官，掌缉捕、狱囚，未入流}}。他看了你一眼，说了句「再看看」。",
          schedule: [{ inYears: 1, eventId: "ming.memory.marriage_up" }]
        },
        {
          text: "再等两年",
          hint: "不花钱；但乡里会议论你家里小气",
          effects: [{ k: "fame", v: -4 }],
          then: "媒人走的时候，脸色不太好看。"
        }
      ]
    },

    /* ── 择业分岔 ────────────────────────────────────── */
    {
      id: "ming.youth.fork",
      cat: "家族",
      title: "十六岁",
      era: "ming",
      age: [16, 16],
      class: [],
      weight: 100,
      once: true,
      text: [
        "十六岁了，村里和你同岁的，都已经定了去处。",
        "父亲把话说得很短：家里能给的，就这些。"
      ],
      options: [
        {
          text: "读书应考",
          hint: "学识需 ≥ 12；每年束脩 3 两。十年不中，家中田产要卖一半",
          need: { minKnowledge: 12 },
          effects: [{ k: "line", v: "exam" }, { k: "silver", v: -3 }],
          then: "你去了县学旁边的书铺，抄书换钱，顺便听人讲时文。"
        },
        {
          text: "承家业，种田",
          hint: "身体 +6；田产收益从此归你打理",
          effects: [{ k: "line", v: "farm" }, { k: "body", v: 6 }, { k: "fame", v: 4 }],
          then: "父亲把地契交给你，一共七张，边角都磨圆了。"
        },
        {
          text: "去做买卖",
          hint: "银钱 −2 两做本钱；成败自负",
          need: { minSilver: 2 },
          effects: [{ k: "line", v: "trade" }, { k: "silver", v: -2 }],
          then: "你挑着两担布，跟人去了临清。"
        },
        {
          text: "投军",
          hint: "身体需 ≥ 60；从此命不由己",
          need: { minBody: 60 },
          effects: [{ k: "line", v: "military" }, { k: "body", v: 4 }],
          then: "招兵的把你的名字写在册子上，用的是一枝秃笔。"
        },
        {
          text: "入县衙做书吏",
          hint: "学识需 ≥ 8；无品级，但掌实权",
          need: { minKnowledge: 8 },
          effects: [{ k: "line", v: "clerk" }, { k: "knowledge", v: 2 }],
          then: "你在户房抄了三个月鱼鳞图册{{鱼鳞图册|登记田土形状、四至、业主的册子，形似鱼鳞}}。"
        }
      ]
    },

    /* ── 科举线 ──────────────────────────────────────── */
    {
      id: "ming.exam.tongshi",
      cat: "职业",
      title: "童试",
      era: "ming",
      age: [16, 24],
      line: "exam",
      weight: 70,
      when: { flagNot: ["shengyuan"] },
      text: [
        "县试、府试、院试，三场连考。院试由学道亲临，一场定终身。",
        "同去的有十七个人，年纪最大的四十一岁。"
      ],
      options: [
        {
          text: "照常去考",
          hint: "盘缠 0.3 两；学识越高越有把握",
          effects: [{ k: "silver", v: -0.3 }],
          then: "你答完了，卷子交上去，人像被抽空了一样。",
          resolve: "examPass",
          params: { base: 0.12, perKnowledge: 0.006, cap: 0.62, onPass: ["shengyuan"] }
        },
        {
          text: "花钱托人打点",
          hint: "银钱 −6 两；把握大增，但此事若泄，终身不得应考",
          need: { minSilver: 6 },
          effects: [{ k: "silver", v: -6 }, { k: "fame", v: -3 }, { k: "grudge", v: 4 }],
          setFlag: ["exam_bribe"],
          then: "你把这六两银子包在纸里，塞进了一个人的袖子。",
          resolve: "examPass",
          params: { base: 0.35, perKnowledge: 0.004, cap: 0.78, onPass: ["shengyuan"] }
        },
        {
          text: "不考了，回家",
          hint: "放弃功名之路；学识不再有用",
          effects: [{ k: "line", v: "farm" }, { k: "fame", v: -6 }],
          then: "你把书收进箱底。箱子后来一直没再打开。"
        }
      ]
    },

    {
      id: "ming.exam.xiangshi",
      cat: "职业",
      title: "乡试",
      era: "ming",
      age: [19, 45],
      line: "exam",
      weight: 80,
      when: { flagHas: ["shengyuan"], flagNot: ["juren"], yearMod: 3 },
      text: [
        "逢子、午、卯、酉年，秋八月，省城贡院。",
        "入场要搜检，解衣脱履。你带了三天的干粮、一床薄被、一支笔、一块墨。"
      ],
      options: [
        {
          text: "进场",
          hint: "盘缠 2 两；三场九日，出来时人瘦一圈",
          effects: [{ k: "silver", v: -2 }, { k: "body", v: -3 }],
          then: "第九日出场，你在贡院门口吐了。",
          resolve: "examPass",
          params: { base: 0.04, perKnowledge: 0.005, cap: 0.35, onPass: ["juren"] }
        },
        {
          text: "不去。差旅太贵",
          hint: "省下 2 两；再等三年",
          effects: [],
          then: "三年的时间，够一个孩子从会走到会跑。"
        }
      ]
    },

    {
      id: "ming.exam.huishii",
      cat: "职业",
      title: "会试",
      era: "ming",
      age: [20, 50],
      line: "exam",
      weight: 80,
      when: { flagHas: ["juren"], flagNot: ["jinshi"], yearMod: 3 },
      text: [
        "赴京会试。从大名府到北京，六百四十里，走了十二天。",
        "会试中者为{{贡士|会试录取者，再经殿试赐出身}}，殿试之后，才算是进士。"
      ],
      options: [
        {
          text: "赴京",
          hint: "盘缠 15 两；落第则原路返回，明年再等",
          effects: [{ k: "silver", v: -15 }, { k: "body", v: -4 }],
          then: "放榜那日，你在贡院墙下站到天黑。",
          resolve: "examPass",
          params: { base: 0.15, perKnowledge: 0.006, cap: 0.55, onPass: ["jinshi"] }
        },
        {
          text: "不去，等着选官",
          hint: "举人可授教谕、知县；但终身止于此",
          effects: [{ k: "line", v: "office" }, { k: "fame", v: 6 }],
          then: "吏部把你派去了一个你从没听过名字的县。"
        }
      ]
    },

    /* ── 仕途 ────────────────────────────────────────── */
    {
      id: "ming.office.appoint",
      cat: "职业",
      title: "授官",
      era: "ming",
      age: [22, 55],
      line: "office",
      weight: 70,
      once: true,
      text: [
        "吏部{{掣签|抽签决定分发何省，明代铨选之法}}，你抽中了{hometown_far}。",
        "知县正七品，岁俸九十石，折银不过三十两。可人人都知道，一任知县的常例，远不止这些。"
      ],
      options: [
        {
          text: "做个清官",
          hint: "官声 +20；银钱几乎不增，三年后考满或升或调",
          effects: [{ k: "official", v: 20 }, { k: "silver", v: 40 }, { k: "fame", v: 15 }],
          then: "你到任第一件事，是把衙门的门房撤了。"
        },
        {
          text: "随大流，收常例",
          hint: "银钱 +300 两；官声 −10，但上官喜欢",
          effects: [{ k: "silver", v: 300 }, { k: "official", v: -10 }, { k: "fame", v: 5 }],
          setFlag: ["corrupt"],
          then: "师爷教你怎么收，怎么分，怎么记账。你学得很快。"
        },
        {
          text: "狠捞一票，三年就走",
          hint: "银钱 +900 两；官声 −30，仇怨 +20。被参一本就完了",
          effects: [{ k: "silver", v: 900 }, { k: "official", v: -30 }, { k: "grudge", v: 20 }],
          setFlag: ["corrupt", "greedy"],
          then: "三年任满，你的箱笼装了十一车。",
          schedule: [{ inYears: 2, eventId: "ming.office.impeach" }]
        }
      ]
    },

    {
      id: "ming.office.tax",
      cat: "赋役",
      title: "催征",
      era: "ming",
      years: [1618, 1644],
      age: [25, 60],
      line: "office",
      weight: 60,
      text: [
        "上头催{{辽饷|万历四十六年起加征，用于辽东军费}}，限三个月解完。",
        "县里能收的已经收了。剩下的，都在那些实在拿不出的人家里。"
      ],
      options: [
        {
          text: "照章催，该打的打",
          hint: "如期解完；声望 −12，乡里记恨",
          effects: [{ k: "official", v: 12 }, { k: "fame", v: -12 }, { k: "grudge", v: 10 }],
          then: "你打了十七个人。有一个老者，抬回家三天就没了。"
        },
        {
          text: "自己垫一部分",
          hint: "银钱 −80 两；上官不悦，乡里称德",
          need: { minSilver: 80 },
          effects: [{ k: "silver", v: -80 }, { k: "official", v: -8 }, { k: "fame", v: 18 }],
          then: "你垫了八十两。这笔钱，你后来再没提过。"
        },
        {
          text: "拖着，等上头松口",
          hint: "官声 −15；若被参，轻则降调，重则革职",
          effects: [{ k: "official", v: -15 }],
          then: "你拖了两个月。上头派了人来查。",
          gamble: { loseChance: 0.45, effects: [{ k: "official", v: -25 }], note: "被参一本，降调" }
        }
      ]
    },

    /* ── 农桑线 ──────────────────────────────────────── */
    {
      id: "ming.farm.water",
      cat: "人际",
      title: "争水",
      era: "ming",
      age: [20, 60],
      line: "farm",
      weight: 45,
      text: [
        "六月大旱，渠里只剩一线水。上游是周家的田，他们把水口堵了。",
        "你家下游的十一亩，眼看要绝收。"
      ],
      options: [
        {
          text: "夜里去扒开",
          hint: "庄稼有救；若被拿住，要见官",
          effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 12 }],
          then: "你扒开了水口。天亮时，周家的人站在田埂上看着你。",
          gamble: { loseChance: 0.35, effects: [{ k: "silver", v: -5 }, { k: "body", v: -4 }], note: "被拿住，赔了五两" }
        },
        {
          text: "去县里告",
          hint: "讼费 3 两；官司打半年，田已经荒了",
          need: { minSilver: 3 },
          effects: [{ k: "silver", v: -3 }, { k: "grudge", v: 8 }],
          then: "状子递上去，知县批了四个字：着即勘明。"
        },
        {
          text: "认了，改种耐旱的",
          hint: "今年收成减半；但不用结仇",
          effects: [{ k: "grain", v: -6 }, { k: "knowledge", v: 2 }],
          then: "你改种了荞麦。收成不好，但没饿着。"
        }
      ]
    },

    {
      id: "ming.farm.tenants",
      cat: "人际",
      title: "佃户欠租",
      era: "ming",
      age: [30, 65],
      line: "farm",
      weight: 40,
      when: { minFieldWet: 30 },
      text: [
        "佃你田的十七户，今年有九户交不上租。领头的姓赵，说他婆娘病了。",
        "若不催，明年人人都学他。"
      ],
      options: [
        {
          text: "全数催齐",
          hint: "存粮 +18 石；声望 −10",
          effects: [{ k: "grain", v: 18 }, { k: "fame", v: -10 }, { k: "grudge", v: 8 }],
          then: "赵家的婆娘冬天没了。第二年，他家退了佃。"
        },
        {
          text: "免了这九户",
          hint: "存粮少收 18 石；声望 +15，日后招佃容易",
          effects: [{ k: "fame", v: 15 }, { k: "favor", v: 12 }],
          setFlag: ["lenient_landlord"],
          then: "赵家送来两只鸡。你没要，让他们留着下蛋。"
        },
        {
          text: "折半，记账上",
          hint: "存粮 +9 石；恩义 +8，但这笔账多半收不回来",
          effects: [{ k: "grain", v: 9 }, { k: "favor", v: 8 }, { k: "fame", v: 6 }],
          then: "账记在册子上。三年后你把那页撕了。"
        }
      ]
    },

    /* ── 商贾线 ──────────────────────────────────────── */
    {
      id: "ming.trade.salt",
      cat: "职业",
      title: "盐引",
      era: "ming",
      age: [25, 55],
      line: "trade",
      weight: 50,
      once: true,
      text: [
        "有人愿意让给你五十引{{盐引|运销食盐的凭证，一引约二百斤}}，作价一百二十两。",
        "运到河南，一引能卖四两。可路上要过三处税关，还要防私盐贩子。"
      ],
      options: [
        {
          text: "吃下",
          hint: "银钱 −120 两；顺利可赚 80 两，出事则血本无归",
          need: { minSilver: 120 },
          effects: [{ k: "silver", v: -120 }],
          then: "你押着盐车上了路。",
          gamble: {
            winChance: 0.6,
            win: [{ k: "silver", v: 200 }],
            lose: [{ k: "silver", v: 20 }],
            winNote: "到岸价好，你赚了八十两。",
            loseNote: "在卫辉被扣了两车。回来时只剩二十两。"
          }
        },
        {
          text: "只接十引，试水",
          hint: "银钱 −24 两；赚得少，但输得起",
          need: { minSilver: 24 },
          effects: [{ k: "silver", v: -24 }],
          then: "十引盐，你亲自押。",
          gamble: {
            winChance: 0.72,
            win: [{ k: "silver", v: 50 }],
            lose: [{ k: "silver", v: 4 }],
            winNote: "赚了二十六两。你第一次觉得，钱可以这样生钱。",
            loseNote: "赚的不多，扣掉盘缠几乎白跑。"
          }
        },
        {
          text: "不接",
          hint: "不担风险；也错过这条线",
          effects: [{ k: "knowledge", v: 1 }],
          then: "那人后来赔了个精光，在临清跳了河。"
        }
      ]
    },

    {
      id: "ming.trade.levy",
      cat: "赋役",
      title: "摊派",
      era: "ming",
      age: [28, 60],
      line: "trade",
      weight: 45,
      text: [
        "县里修城，要各家摊派。你家被摊了二百两。",
        "同街的几家，有的出五十，有的出三十。管事的说，你家的生意最大。"
      ],
      options: [
        {
          text: "照数交",
          hint: "银钱 −200 两；声望 +8，往后少麻烦",
          effects: [{ k: "silver", v: -200 }, { k: "fame", v: 8 }, { k: "official", v: 5 }],
          then: "你交了银子，管事的笑着送你到门口。"
        },
        {
          text: "托关系说情",
          hint: "花 40 两打点，摊派减到 80 两",
          need: { minSilver: 40 },
          effects: [{ k: "silver", v: -120 }, { k: "grudge", v: 3 }],
          then: "减了。但街上从此都知道，你和衙门有路子。"
        },
        {
          text: "拖，装穷",
          hint: "银钱不减；若被查实，翻倍罚",
          effects: [{ k: "fame", v: -6 }],
          then: "你把银子埋在后院。",
          gamble: { loseChance: 0.5, effects: [{ k: "silver", v: -400 }], note: "被查实，罚了四百两" }
        }
      ]
    },

    /* ── 军功线 ──────────────────────────────────────── */
    {
      id: "ming.military.enlist",
      cat: "职业",
      title: "点卯",
      era: "ming",
      years: [1618, 1644],
      age: [18, 45],
      line: "military",
      weight: 60,
      text: [
        "募兵的名册上有你的名字。月粮三斗，折银一钱八分。",
        "营里的老兵说，能按月发下来的，不到一半。"
      ],
      options: [
        {
          text: "老实当兵，按月领军粮",
          hint: "身体 +3；银钱几乎不增，但活得久",
          effects: [{ k: "body", v: 3 }, { k: "silver", v: 1 }],
          then: "你在营里待了三年，见过两次仗，都没轮到你上前。"
        },
        {
          text: "克扣新兵的口粮",
          hint: "银钱 +12 两；仇怨 +10，营里有人记着你",
          effects: [{ k: "silver", v: 12 }, { k: "grudge", v: 10 }, { k: "fame", v: -6 }],
          then: "你学会了怎么在斗上做手脚。新兵不敢说话。"
        },
        {
          text: "冒死挣功",
          hint: "身体 −15；可能升迁，也可能就此没了",
          effects: [{ k: "body", v: -8 }],
          then: "你把第一个爬上城头的人推了下去，自己爬了上去。",
          gamble: {
            winChance: 0.4,
            win: [{ k: "fame", v: 25 }, { k: "silver", v: 30 }],
            lose: [{ k: "body", v: -15 }],
            winNote: "你升了{{小旗|明代卫所最低一级军官，领十人}}。",
            loseNote: "你中了三箭，躺了四个月。"
          }
        }
      ]
    },

    /* ── 家族 ────────────────────────────────────────── */
    {
      id: "ming.family.divide",
      cat: "家族",
      title: "分家",
      era: "ming",
      age: [38, 58],
      class: [],
      weight: 55,
      once: true,
      text: [
        "父亲走了。丧事办了七天，{{丁忧|父母丧，须辞官守孝二十七个月}}的规矩，做官的还要报上去。",
        "留下的东西不多：田四十二亩，房十一间，银子三十七两。兄弟三人。"
      ],
      options: [
        {
          text: "均分",
          hint: "田 +14 亩，银 +12 两；兄弟情分保住",
          effects: [{ k: "field_wet", v: 9 }, { k: "field_dry", v: 5 }, { k: "silver", v: 12 }, { k: "favor", v: 10 }],
          then: "分家那天，三兄弟在堂屋里坐到天亮，谁也没先开口。"
        },
        {
          text: "争长房多分",
          hint: "田 +20 亩，银 +20 两；仇怨 +15，此后兄弟不相往来",
          effects: [{ k: "field_wet", v: 13 }, { k: "field_dry", v: 7 }, { k: "silver", v: 20 }, { k: "grudge", v: 15 }, { k: "fame", v: -12 }],
          setFlag: ["feud_brothers"],
          then: "族长拍了桌子。你拿到了你想要的。"
        },
        {
          text: "把自己的那份让给弟弟",
          hint: "田 −8 亩；声望 +20，恩义 +15",
          effects: [{ k: "fame", v: 20 }, { k: "favor", v: 15 }, { k: "field_wet", v: -8 }],
          setFlag: ["gave_up_share"],
          then: "弟弟跪下给你磕了头。这一跪，你记了三十年。"
        }
      ]
    },

    /* ── 世变 ────────────────────────────────────────── */
    {
      id: "ming.plague.1637",
      cat: "天灾",
      title: "大疫",
      era: "ming",
      years: [1637, 1643],
      age: [10, 80],
      class: [],
      weight: 70,
      once: true,
      text: [
        "旱了三年，蝗了两年，今年起了疫。{{疙瘩瘟|崇祯末年华北流行的鼠疫，患者腋下、股间生核}}",
        "村里一天抬出去七个人。路断人稀，城里开始烧尸。"
      ],
      options: [
        {
          text: "闭门不出，储水储粮",
          hint: "存粮 −10 石；身体 −8。最稳妥的一条",
          effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }],
          then: "你在家里待了四个月。出门那天，隔壁已经换了人家。"
        },
        {
          text: "带着家人往南逃",
          hint: "身体 −20；田产抛荒，但可能活下来",
          effects: [{ k: "body", v: -10 }, { k: "field_wet", v: -5 }, { k: "fame", v: -5 }],
          setFlag: ["refugee"],
          then: "路上你数着走。走到第八天，少了一个人。"
        },
        {
          text: "留下来照看乡邻",
          hint: "声望 +25；身体 −25，随时可能染上",
          effects: [{ k: "fame", v: 25 }, { k: "body", v: -13 }, { k: "favor", v: 20 }],
          then: "你熬药、抬人、写牌位。写了四十七个名字。",
          gamble: { deathChance: 0.22, cause: "疙瘩瘟" }
        }
      ]
    },

    {
      id: "ming.war.1644",
      cat: "世变",
      title: "甲申",
      era: "ming",
      years: [1644, 1644],
      age: [8, 80],
      class: [],
      weight: 100,
      once: true,
      text: [
        "三月十九，京师陷。传言皇上在煤山{{煤山|今北京景山}}自缢。",
        "四月，关外的兵入了关。县里换了旗号，衙门的匾额还没摘。"
      ],
      options: [
        {
          text: "留在原处，照旧过日子",
          hint: "身体 −10；一切照旧，只是皇帝换了人",
          effects: [{ k: "body", v: -5 }, { k: "fame", v: -4 }],
          then: "新朝的官来了，第一件事是重编户口。你把名字报了上去。"
        },
        {
          text: "南下投南明",
          hint: "身体 −30；家产多半带不走，但心里过得去",
          effects: [{ k: "body", v: -15 }, { k: "silver", v: -20 }, { k: "fame", v: 12 }],
          setFlag: ["south_ming"],
          then: "你走的时候，把祖宗的牌位包在包袱里。"
        },
        {
          text: "趁乱起事",
          hint: "身体 −40；成则一方之主，败则满门抄斩",
          effects: [{ k: "body", v: -20 }, { k: "grudge", v: 25 }],
          then: "你聚了两百人，占了县城七天。",
          gamble: {
            winChance: 0.12,
            win: [{ k: "silver", v: 800 }, { k: "fame", v: 40 }],
            lose: [{ k: "kill", v: "self" }],
            winNote: "七天里，你第一次坐在县衙的正堂上。",
            loseNote: "城破。你在其中。这一局到此为止。"
          }
        }
      ]
    },

    /* ── 跨十年回响（由 schedule 触发） ───────────────── */
    {
      id: "ming.memory.sister",
      cat: "人际",
      title: "十年",
      era: "ming",
      age: [20, 30],
      class: [],
      weight: 0,
      hidden: true,
      text: [
        "有人从南边回来，说在临清的院子里见过一个妇人，眉眼像你母亲。",
        "那人说，她问你还在不在。"
      ],
      options: [
        {
          text: "去寻",
          hint: "盘缠 8 两；可能寻到，可能白跑",
          need: { minSilver: 8 },
          effects: [{ k: "silver", v: -8 }],
          then: "你去了临清，问了三个院子。",
          gamble: {
            winChance: 0.35,
            win: [{ k: "fame", v: 20 }, { k: "favor", v: 10 }],
            lose: [{ k: "fame", v: -5 }],
            winNote: "你找到了她。她叫你的时候，声音和你母亲一样。",
            loseNote: "院子换了主人。没人知道她去了哪里。"
          }
        },
        {
          text: "不去",
          hint: "此事就此了结；仇怨 −5，但你会一直记得",
          effects: [{ k: "grudge", v: -5 }, { k: "fame", v: -3 }],
          then: "你没去。那年年末，你在族谱上给她留了一个空位。"
        }
      ]
    },

    /* ── 童年、少年 ───────────────────────────────── */
    {
      id: "ming.child.play",
      cat: "人际",
      title: "伴当",
      era: "ming",
      age: [5, 10],
      class: [],
      weight: 30,
      once: true,
      text: [
        "村西赵家的儿子比你大两岁，天天下河摸鱼，喊你一起去。",
        "母亲不让。说赵家那孩子，早晚要出事。"
      ],
      options: [
        {
          text: "去",
          hint: "身体 +5；声望 −3，母亲会骂你一顿",
          effects: [{ k: "body", v: 5 }, { k: "fame", v: -3 }, { k: "favor", v: 6 }],
          then: "你们摸了一篓鲫鱼。他分给你一半，你带回家说是自己摸的。"
        },
        {
          text: "不去，在家识字",
          hint: "学识 +4；少一个朋友",
          effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -1 }],
          then: "你在门槛上写他的名字，写错了三遍。"
        }
      ]
    },

    {
      id: "ming.teen.market",
      cat: "人际",
      title: "赶集",
      era: "ming",
      age: [10, 15],
      class: [],
      weight: 30,
      once: true,
      text: [
        "逢五有集。父亲让你挑两斗豆子去卖。",
        "集上有人讲{{三国|《三国志通俗演义》，嘉靖间已刊行}}，围了三十多人。也有牙人{{牙人|居间说合的中间商}}在收布。"
      ],
      options: [
        {
          text: "卖完就回",
          hint: "银钱 +0.25 两；什么也没多看",
          effects: [{ k: "silver", v: 0.25 }],
          then: "你把钱一文一文数了三遍，包在布里贴身放着。"
        },
        {
          text: "听书听到天黑",
          hint: "学识 +3；回去晚了，挨了一顿打",
          effects: [{ k: "knowledge", v: 3 }, { k: "body", v: -2 }, { k: "fame", v: -2 }],
          then: "你记住了关云长过五关。回家时豆子钱少了十文，不知掉在哪。"
        },
        {
          text: "跟着牙人看了一天",
          hint: "学识 +2，银钱 +0.1 两；你第一次知道什么叫「抽头」",
          effects: [{ k: "knowledge", v: 2 }, { k: "silver", v: 0.1 }],
          then: "一匹布从织户到客人手里，过了三道手，每道都抽一分。"
        }
      ]
    },

    /* ── 农桑线 ───────────────────────────────────── */
    {
      id: "ming.farm.first",
      cat: "职业",
      title: "当家第一年",
      era: "ming",
      age: [17, 24],
      line: "farm",
      weight: 60,
      once: true,
      text: [
        "父亲把地契交了给你。七张，边角都磨圆了。",
        "今年种什么，你说了算。"
      ],
      options: [
        {
          text: "照旧，一半稻一半麦",
          hint: "稳妥；收成随年景",
          effects: [{ k: "grain", v: 4 }, { k: "fame", v: 4 }],
          then: "父亲没说什么，只是每天早上仍要去田埂上转一圈。"
        },
        {
          text: "全种棉，卖钱",
          hint: "银钱 +6 两；若遇荒年，全家没粮吃",
          effects: [{ k: "silver", v: 6 }, { k: "grain", v: -6 }],
          setFlag: ["cash_crop"],
          then: "棉花卖得好。那年冬天，你家第一次买米吃。"
        },
        {
          text: "佃两亩给赵家，自己去做短工",
          hint: "银钱 +1.2 两；田少收，但手里有现钱",
          effects: [{ k: "silver", v: 1.2 }, { k: "grain", v: -3 }, { k: "body", v: -2 }],
          then: "你给别人种地，自己的地倒荒了半季。"
        }
      ]
    },

    {
      id: "ming.farm.buy",
      cat: "职业",
      title: "买田",
      era: "ming",
      age: [25, 58],
      line: "farm",
      weight: 45,
      when: { minSilver: 30 },
      text: [
        "邻村有人要卖田，水田六亩，要价七十二两。",
        "中人{{中人|居间作保的中间人}}说，这价不算贵，只是那家急着用钱。"
      ],
      options: [
        {
          text: "买下",
          hint: "银钱 −72 两，水田 +6 亩",
          need: { minSilver: 72 },
          effects: [{ k: "silver", v: -72 }, { k: "field_wet", v: 6 }, { k: "fame", v: 8 }],
          then: "立契、画押、请中人吃饭。你把新地契和旧的一起锁进箱子。"
        },
        {
          text: "压价到六十两",
          hint: "银钱 −60 两，水田 +6 亩；但乡里说你刻薄",
          need: { minSilver: 60 },
          effects: [{ k: "silver", v: -60 }, { k: "field_wet", v: 6 }, { k: "fame", v: -6 }, { k: "grudge", v: 6 }],
          then: "那家卖了。走的时候，妇人回头看了一眼那块地。"
        },
        {
          text: "不买，留着现银",
          hint: "不担风险；地价还会涨",
          effects: [{ k: "knowledge", v: 1 }],
          then: "三年后那块地涨到一百两。你偶尔还会想起这件事。"
        }
      ]
    },

    /* ── 家族 ─────────────────────────────────────── */
    {
      id: "ming.family.child",
      cat: "家族",
      title: "添丁",
      era: "ming",
      age: [18, 46],
      class: [],
      weight: 65,
      once: true,
      when: { flagHas: ["married"] },
      text: [
        "你有了孩子。",
        "稳婆说是男是女，报了价：男的一百文，女的对折。"
      ],
      options: [
        {
          text: "好好养",
          hint: "口粮负担加重；家眷 +1",
          effects: [
            { k: "addPerson", v: { name: "待取名", role: "child", rel: "子", age: 0 } },
            { k: "fame", v: 6 }, { k: "grain", v: -2 }
          ],
          then: "孩子满月那天，家里杀了一只鸡。"
        },
        {
          text: "请先生取名，办满月酒",
          hint: "银钱 −2 两；声望 +10",
          need: { minSilver: 2 },
          effects: [
            { k: "addPerson", v: { name: "待取名", role: "child", rel: "子", age: 0 } },
            { k: "silver", v: -2 }, { k: "fame", v: 10 }
          ],
          then: "来了三十几个人。礼金收了四两多。"
        },
        {
          text: "送与城里无子的人家",
          hint: "银钱 +3 两；家中不多一张嘴，但乡里会说",
          effects: [
            { k: "silver", v: 3 }, { k: "fame", v: -12 }, { k: "grudge", v: 5 }
          ],
          setFlag: ["gave_away_child"],
          then: "接人的婆子抱走时，孩子在襁褓里睡着了。"
        }
      ]
    },

    {
      id: "ming.family.parent_death",
      cat: "家族",
      title: "大故",
      era: "ming",
      age: [22, 52],
      class: [],
      weight: 50,
      once: true,
      text: [
        "父亲病了三冬，今年开春走了。",
        "棺木三两，做法事二两，请客八桌。{{丁忧|父母丧，须辞官守孝二十七个月}}，做官的还要报上去。"
      ],
      options: [
        {
          text: "尽力办",
          hint: "银钱 −8 两；声望 +12",
          effects: [{ k: "silver", v: -8 }, { k: "fame", v: 12 }, { k: "killPerson", v: "fa" }],
          then: "出殡那天下小雨。你走在最前面，鞋全湿了。"
        },
        {
          text: "简办",
          hint: "银钱 −2 两；声望 −8，族里会议论",
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: -8 }, { k: "killPerson", v: "fa" }],
          then: "两口薄棺，一场素席。族叔说了句「不像话」，你没接。"
        }
      ]
    },

    {
      id: "ming.family.concubine",
      cat: "家族",
      title: "纳妾",
      era: "ming",
      age: [30, 56],
      class: ["royal", "noble", "official_mid", "gentry", "merchant", "farmer"],
      weight: 30,
      once: true,
      when: { minSilver: 60, flagHas: ["married"] },
      text: [
        "妻只生了一个女儿。族里开始有人说话。",
        "媒人带来一个十九岁的，要价六十两。"
      ],
      options: [
        {
          text: "纳",
          hint: "银钱 −60 两；家眷 +1，妻从此不与你说笑",
          effects: [
            { k: "silver", v: -60 },
            { k: "addPerson", v: { name: "周氏", role: "concubine", rel: "妾", age: 19 } },
            { k: "fame", v: 6 }, { k: "grudge", v: 3 }
          ],
          then: "进门那天，妻在厨房待了一整天没出来。"
        },
        {
          text: "不纳",
          hint: "不花钱；族中议论，但家里清净",
          effects: [{ k: "fame", v: -4 }, { k: "favor", v: 4 }],
          then: "妻那晚给你多添了一碗汤。"
        }
      ]
    },

    /* ── 身体 ─────────────────────────────────────── */
    {
      id: "ming.body.labor",
      cat: "身体",
      title: "腰",
      era: "ming",
      age: [36, 62],
      class: [],
      weight: 40,
      once: true,
      text: [
        "腰疼了半年，弯下去就直不起来。",
        "镇上的郎中说，是劳损，要静养三个月。"
      ],
      options: [
        {
          text: "静养",
          hint: "身体 +10；三个月不做活，田里的事要雇人",
          effects: [{ k: "body", v: 10 }, { k: "silver", v: -3 }, { k: "grain", v: -2 }],
          then: "你躺了三个月。起来那天，走路像老了十岁。"
        },
        {
          text: "忍着，照旧下地",
          hint: "身体 −14；不花钱",
          effects: [{ k: "body", v: -7 }, { k: "grain", v: 2 }, { k: "fame", v: 4 }],
          then: "你贴着膏药下田。阴天疼得更厉害，一直疼到死。"
        },
        {
          text: "请郎中，抓药",
          hint: "银钱 −1.5 两；身体 +6",
          effects: [{ k: "silver", v: -1.5 }, { k: "body", v: 6 }],
          then: "药很苦。喝了二十副，能直起腰了，但再没干过重活。"
        }
      ]
    },

    {
      id: "ming.body.age",
      cat: "身体",
      title: "老",
      era: "ming",
      age: [66, 90],
      class: [],
      weight: 45,
      text: [
        "眼睛花了，耳朵也背。孙子跟你说话要凑到耳边喊。",
        "冬天一到就咳，咳到开春。"
      ],
      options: [
        {
          text: "把家事交出去",
          hint: "身体 +4；声望 −4，从此说话没人听",
          effects: [{ k: "body", v: 4 }, { k: "fame", v: -4 }, { k: "favor", v: 6 }],
          then: "你把钥匙交给长子。那一刻你才知道自己真的老了。"
        },
        {
          text: "还管着",
          hint: "身体 −6；声望 +6，家里还听你的",
          effects: [{ k: "body", v: -3 }, { k: "fame", v: 6 }],
          then: "你每天照样看账。看到最后一年，字已经认不清了。"
        }
      ]
    },

    /* ── 人际 / 讼事 ──────────────────────────────── */
    {
      id: "ming.legal.lawsuit",
      cat: "人际",
      title: "讼",
      era: "ming",
      age: [26, 62],
      class: [],
      weight: 14,
      text: [
        "地界被人往你家挪了三尺。你去说，对方说那三分地本就是他家的。",
        "告到县里，状纸要请人写，一两银；递上去要门包，五钱。"
      ],
      options: [
        {
          text: "告",
          hint: "讼费 1.5 两；赢了拿回地，输了白花",
          need: { minSilver: 1.5 },
          effects: [{ k: "silver", v: -1.5 }, { k: "grudge", v: 8 }],
          then: "知县批了「勘明」。差人来了两趟，每趟都要吃饭。",
          gamble: {
            winChance: 0.45,
            win: [{ k: "fame", v: 10 }, { k: "field_dry", v: 2 }],
            lose: [{ k: "fame", v: -8 }, { k: "field_dry", v: -1 }],
            winNote: "地量回来了，还多出两分。",
            loseNote: "地没要回来，倒赔了三分。"
          }
        },
        {
          text: "算了",
          hint: "不花钱；吃亏，但省事",
          effects: [{ k: "fame", v: -4 }, { k: "field_dry", v: -1 }],
          then: "你把界石往自家挪了半尺，算是找回一点。"
        },
        {
          text: "请族中长辈说和",
          hint: "银钱 −0.5 两；多半能保住面子",
          effects: [{ k: "silver", v: -0.5 }, { k: "favor", v: 6 }],
          then: "族叔出面，两家各让一步。地没全要回，人情还在。"
        }
      ]
    },

    /* ── 赋役 ─────────────────────────────────────── */
    {
      id: "ming.tax.extra",
      cat: "赋役",
      title: "加派",
      era: "ming",
      years: [1618, 1643],
      age: [16, 80],
      class: ["farmer", "tenant", "gentry", "merchant"],
      weight: 55,
      once: true,
      text: [
        "辽饷之外，又加了剿饷、练饷。每亩加征九厘。",
        "里长挨家挨户收，收不上来就在门口坐着不走。"
      ],
      options: [
        {
          text: "照数交",
          hint: "银钱 −(田亩×0.09)；不惹事",
          effects: [{ k: "silver", v: -6 }, { k: "fame", v: 3 }],
          then: "里长收了钱，在本子上画了个勾。"
        },
        {
          text: "把田挂在举人名下",
          hint: "免了加派；但从此田不完全是你的",
          effects: [{ k: "fame", v: -6 }, { k: "grudge", v: 5 }],
          setFlag: ["attached_land"],
          then: "{{投献|将田产伪托于士绅名下，以避赋役}}之后，田还是你种，契上换了姓。"
        },
        {
          text: "拖，等风头过去",
          hint: "身体 −8；被拿住要枷三日",
          effects: [{ k: "body", v: -4 }, { k: "fame", v: -4 }],
          then: "里长带人来了两趟。第三趟把你带到县里，枷了一天。"
        }
      ]
    },

    /* ── 仕途 ─────────────────────────────────────── */
    {
      id: "ming.office.promote",
      cat: "职业",
      title: "考满",
      era: "ming",
      age: [26, 62],
      line: "office",
      weight: 55,
      text: [
        "三年考满{{考满|明代官员三年一考，按称职、平常、不称职定黜陟}}。上官给的考语是「操守平常，才力有余」。",
        "这一句，能升也能留。"
      ],
      options: [
        {
          text: "打点吏部",
          hint: "银钱 −120 两；多半能升一级",
          need: { minSilver: 120 },
          effects: [{ k: "silver", v: -120 }, { k: "official", v: 10 }],
          then: "银子送出去了。三个月后，调令下来。",
          gamble: {
            winChance: 0.7,
            win: [{ k: "fame", v: 15 }, { k: "silver", v: 60 }],
            lose: [{ k: "official", v: -15 }],
            winNote: "升了。新衙门离家四百里。",
            loseNote: "银子收了，人没动。"
          }
        },
        {
          text: "凭本事等",
          hint: "官声 +12；升不升看运气",
          effects: [{ k: "official", v: 12 }],
          then: "你把这三年的案卷整理成四册，呈了上去。",
          gamble: {
            winChance: 0.35,
            win: [{ k: "fame", v: 12 }],
            lose: [],
            winNote: "上官看了案卷，把你调去了更紧要的缺。",
            loseNote: "考语照旧。你又留任三年。"
          }
        },
        {
          text: "辞官归里",
          hint: "声望 +8；从此没有俸禄",
          effects: [{ k: "fame", v: 8 }, { k: "line", v: "farm" }, { k: "body", v: 6 }],
          then: "你交了印。走出衙门时，天还早。"
        }
      ]
    },

    /* ── 商途 ─────────────────────────────────────── */
    {
      id: "ming.trade.credit",
      cat: "职业",
      title: "赊账",
      era: "ming",
      age: [24, 58],
      line: "trade",
      weight: 45,
      text: [
        "老主顾要赊三十两的货，说三个月后结。",
        "他做了十二年生意，从没短过账。可他儿子去年赌输了两百两。"
      ],
      options: [
        {
          text: "赊",
          hint: "三个月后多半能收回，也可能血本无归",
          effects: [],
          then: "你让伙计记了账。",
          gamble: {
            winChance: 0.62,
            win: [{ k: "silver", v: 38 }, { k: "favor", v: 8 }],
            lose: [{ k: "silver", v: -30 }, { k: "grudge", v: 6 }],
            winNote: "他准时结了，还多给了八两，说是利息。",
            loseNote: "三个月后，铺子关了，人也不见了。"
          }
        },
        {
          text: "只赊十两",
          hint: "风险小，赚得也少",
          effects: [],
          then: "他愣了一下，还是接了。",
          gamble: {
            winChance: 0.75,
            win: [{ k: "silver", v: 12 }],
            lose: [{ k: "silver", v: -10 }],
            winNote: "十两按时还了。",
            loseNote: "十两没了。"
          }
        },
        {
          text: "不赊，现银交易",
          hint: "得罪人；但账上干净",
          effects: [{ k: "fame", v: -3 }, { k: "grudge", v: 4 }],
          then: "他没说什么，从此再没来过。"
        }
      ]
    },

    /* ── 晚年 ─────────────────────────────────────── */
    {
      id: "ming.old.heir",
      cat: "家族",
      title: "立嗣",
      era: "ming",
      age: [52, 78],
      class: [],
      weight: 40,
      once: true,
      text: [
        "你没有儿子。族里盯着你这份家业，已经盯了很多年。",
        "族长说，从二房过继一个过来，名正言顺。"
      ],
      options: [
        {
          text: "过继二房的",
          hint: "家产有人继承；但那份田从此姓别人的名",
          effects: [{ k: "fame", v: 10 }, { k: "favor", v: 8 }, { k: "field_wet", v: -2 }],
          setFlag: ["adopted_heir"],
          then: "孩子在祠堂磕了头。你把他父亲的名字，从心里划掉了。"
        },
        {
          text: "立女儿的孩子",
          hint: "声望 −10；但家业留在自己人手里",
          effects: [{ k: "fame", v: -10 }, { k: "favor", v: 12 }],
          setFlag: ["heir_by_daughter"],
          then: "族里吵了三天。最后你在契上按了手印，没管他们说什么。"
        },
        {
          text: "不分，等死后再说",
          hint: "声望 −6；死后必起争端",
          effects: [{ k: "fame", v: -6 }, { k: "grudge", v: 8 }],
          then: "你把地契又数了一遍，锁回箱子。"
        }
      ]
    },

    /* ── 兵事 ────────────────────────────────────────── */
    {
      id: "ming.mil.enlist",
      cat: "生计",
      title: "招 兵",
      era: "ming",
      age: [16, 26],
      sex: "male",
      class: ["farmer", "tenant", "base", "merchant"],
      weight: 9,
      once: true,
      text: [
        "县前贴了告示：募兵，月粮一石，安家银二两。",
        "看的人围了三层，应的人没有几个。都知道去了不一定回得来。",
        "招兵的书办坐在条凳上，笔搁在册子上，等着有人报名字。"
      ],
      options: [
        {
          text: "报名，投军",
          hint: "身体 +4；从此走武职一路，刀口上讨功名",
          effects: [{ k: "line", v: "military" }, { k: "body", v: 4 }, { k: "troops", v: 3 }, { k: "fame", v: 3 }],
          then: "书办问你会不会写字。你说会两个。他就把你写在了第二页。"
        },
        {
          text: "替兄弟报名，换那二两安家银",
          hint: "银 +2 两；家中少一人吃饭；此事他会记一辈子",
          effects: [{ k: "silver", v: 2 }, { k: "grudge", v: 6 }, { k: "favor", v: -4 }],
          then: "兄弟走的那天没回头。你母亲在门口站到天黑。"
        },
        {
          text: "看一眼就走",
          hint: "什么也不变",
          effects: [],
          then: "你回家割了一下午的草。晚上听说上午报名的有十七个。"
        }
      ]
    },

    {
      id: "ming.mil.battle",
      cat: "兵事",
      title: "出 战",
      era: "ming",
      line: "military",
      age: [23, 56],
      weight: 14,
      text: [
        "军令下来了：明日卯时拔营。",
        "你在帐里磨刀。刀口有一处卷了，是春天那场仗留下的。",
        "队官进来，说先锋营还缺一个把总。问你去不去。"
      ],
      options: [
        {
          text: "去，领先锋",
          hint: "胜则功名双收，败则当场没命",
          gamble: {
            winChance: 0.42,
            win: [{ k: "fame", v: 20 }, { k: "troops", v: 40 }, { k: "body", v: -4 }, { k: "silver", v: 12 }],
            lose: [{ k: "body", v: -15 }, { k: "fame", v: 4 }, { k: "troops", v: -12 }],
            deathChance: 0.22,
            cause: "阵亡",
            winNote: "你带着三十七个人先登。城上的箭用完了，开始扔石头。石头也扔完了，就降了。",
            loseNote: "冲上去的时候队伍乱了。你被砍了一刀，倒在墙根，装死到天黑。"
          }
        },
        {
          text: "领后队，押粮",
          hint: "稳妥；功名分不到多少",
          effects: [{ k: "fame", v: 3 }, { k: "silver", v: 2 }, { k: "body", v: -1 }],
          then: "粮车走了十二天。你一路上只丢了两袋，上官记了你一功，很小的一功。"
        },
        {
          text: "拿出二十两，换个留守",
          hint: "银 −20 两；保住命，但营里都知道了",
          need: { minSilver: 20 },
          effects: [{ k: "silver", v: -20 }, { k: "fame", v: -6 }, { k: "official", v: -4 }],
          then: "你留下来看营。第三天前方传来消息：先锋营没了大半。"
        }
      ]
    },

    {
      id: "ming.mil.retinue",
      cat: "兵事",
      title: "家 丁",
      era: "ming",
      age: [24, 62],
      sex: "male",
      weight: 14,
      when: { minSilver: 40 },
      text: [
        "辽东回来的一个老兵，在村口坐了三天。他会使鸟铳，也会教人使。",
        "他说：给我几十个人，管饭，半年能练出来。练出来的人，只听你的。",
        "他又说：不过这话我只跟你说一遍。"
      ],
      options: [
        {
          text: "募三百人",
          hint: "银 −240 两；此后岁饷六百余两。这是私兵，不是官军",
          need: { minSilver: 240 },
          effects: [{ k: "silver", v: -240 }, { k: "troops", v: 300 }, { k: "fame", v: 8 }, { k: "official", v: -6 }],
          then: "三百人站在打谷场上，队排得不算齐。你从这头走到那头，走了一刻钟。"
        },
        {
          text: "先募八十人",
          hint: "银 −60 两；岁饷一百七十余两",
          need: { minSilver: 60 },
          effects: [{ k: "silver", v: -60 }, { k: "troops", v: 80 }, { k: "fame", v: 3 }],
          then: "八十个人，八个一队，队前插旗。旗是你家祠堂里取出来的旧旗。"
        },
        {
          text: "不留。养兵是杀头的罪",
          hint: "官声 +8；声望 +2",
          effects: [{ k: "official", v: 8 }, { k: "fame", v: 2 }],
          then: "你给了他两吊钱，让他往南走。他接钱的时候看了你一眼，什么也没说。"
        }
      ]
    },

    {
      id: "ming.mil.colonel",
      cat: "兵事",
      title: "参 将",
      era: "ming",
      line: "military",
      age: [26, 52],
      weight: 22,
      once: true,
      when: { minFame: 12 },
      text: [
        "总督的札付下来了：升你做{{参将|分守一城一堡，位在副总兵之下}}，守一座城。",
        "城不大，墙有三处塌了。册上的兵一千二，实到的七百。",
        "守备捧着印站在阶下，等你接。"
      ],
      options: [
        {
          text: "接印，先点兵",
          hint: "所辖官军 1200 人；官品至四品",
          effects: [{ k: "grade", v: 4 }, { k: "command", v: 1200 }, { k: "fame", v: 8 }, { k: "official", v: 6 }],
          then: "点完兵，你在册子上把那些空名一个个划了。书办在旁边看着，脸越来越白。"
        },
        {
          text: "接印，补足空额，余饷归己",
          hint: "所辖 900 人，另得私兵 120；官声 −8",
          effects: [{ k: "grade", v: 4 }, { k: "command", v: 900 }, { k: "troops", v: 120 }, { k: "official", v: -8 }, { k: "silver", v: 30 }],
          then: "你把空额留着，按月领饷。兵是朝廷的，钱是你自己的，这个道理你一学就会。"
        },
        {
          text: "推辞，说资历不够",
          hint: "声望 −4；不过没人再提这件事",
          effects: [{ k: "fame", v: -4 }, { k: "official", v: 4 }],
          then: "守备捧着印回去了。后来那座城在冬天丢的，守备战死。"
        }
      ]
    },

    {
      id: "ming.mil.general",
      cat: "兵事",
      title: "授 印",
      era: "ming",
      line: "military",
      age: [30, 68],
      weight: 50,
      once: true,
      when: { minFame: 18 },
      text: [
        "兵部的札子到了。授你{{总兵官|无品级，视所佩将军印，镇守一方}}，镇守一路。",
        "印是银的，重三斤。接了印，这一路的参将、守备、卫所，都归你节制。",
        "送札子的差官在门外等着回话，也等着赏钱。"
      ],
      options: [
        {
          text: "受印",
          hint: "官品至二品；所辖官军 4000 人",
          effects: [{ k: "grade", v: 2 }, { k: "command", v: 4000 }, { k: "fame", v: 15 }, { k: "official", v: 10 }, { k: "silver", v: -10 }],
          then: "你接了印，先把印在册子上按了一下。红泥很厚，字看不太清。"
        },
        {
          text: "受印，并以家丁补足兵额",
          hint: "所辖 3000 人，另得私兵 200；官声 −12（吃空额）",
          effects: [{ k: "grade", v: 2 }, { k: "command", v: 3000 }, { k: "troops", v: 200 }, { k: "official", v: -12 }, { k: "silver", v: 60 }],
          then: "册上写四千，实到三千一。差的那些饷，你按月领了，用来养自己的人。兵部知道，只是没人查。"
        },
        {
          text: "辞印，仍领本队",
          hint: "声望 −6；私兵 +120，但从此升不上去",
          effects: [{ k: "fame", v: -6 }, { k: "troops", v: 120 }, { k: "official", v: -6 }],
          then: "你说你只会带三百人。差官笑了笑，把札子收回袖子。此后十年，你的名字没再进过兵部的册子。"
        }
      ]
    },

    /* ── 开国之后 ────────────────────────────────────── */
    {
      id: "ming.rebel.after1",
      cat: "大事",
      title: "三 年",
      era: "ming",
      hidden: true,
      once: true,
      text: [
        "你坐了三年。",
        "当年跟着你起兵的人，如今有二十七个做了总兵，十四个做了布政使。",
        "他们开始在朝上争。争的不是政事，是你屁股底下那把椅子将来归谁。"
      ],
      options: [
        {
          text: "封侯，遣就藩，收其兵",
          hint: "声望 +6；私兵 +200；但人心自此不齐",
          effects: [{ k: "fame", v: 6 }, { k: "troops", v: 200 }, { k: "command", v: -800 }, { k: "grudge", v: 8 }],
          then: "你封了六个侯，都给了铁券。铁券上写着「免死」，字是金子做的，很小。"
        },
        {
          text: "杀几个立威",
          hint: "声望 −14；仇怨 +20；但朝上安静了",
          effects: [{ k: "fame", v: -14 }, { k: "grudge", v: 20 }, { k: "troops", v: -200 }, { k: "official", v: 6 }],
          then: "杀了两个，第三个自尽了。剩下的人第二天上朝，站得比从前整齐。"
        },
        {
          text: "不管，让他们争",
          hint: "仇怨 +10；什么也不变",
          effects: [{ k: "grudge", v: 10 }],
          then: "你每天照旧看奏疏。有一份弹劾折子压在最下面，压了两年。"
        }
      ]
    },

    {
      id: "ming.rebel.after2",
      cat: "大事",
      title: "九 年",
      era: "ming",
      hidden: true,
      once: true,
      text: [
        "第九年，有司上言：国本未定。",
        "你的儿子们都在等这句话。朝臣已经分成了两拨，各自替一拨人说话。",
        "史官在殿外站着，笔已经蘸了墨。"
      ],
      options: [
        {
          text: "立长",
          hint: "声望 +8；名分定了，事也定了",
          effects: [{ k: "fame", v: 8 }, { k: "grudge", v: 6 }],
          then: "你说了两个字。殿上的人一起跪下。史官写完，抬头看了你一眼，又低下头。"
        },
        {
          text: "立贤",
          hint: "声望 +4；此后十年，朝上不得安宁",
          effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 18 }],
          then: "「贤」是个没有尺子的字。此后十年，谁都在替自己量。"
        },
        {
          text: "不答",
          hint: "声望 −8；你把这件事留给了后人",
          effects: [{ k: "fame", v: -8 }, { k: "grudge", v: 10 }],
          then: "你把手按在案上，站起来走了。此后没人敢再问。"
        }
      ]
    }
,
    /* ══ 蒙养：往后想做什么 ═══════════════════════ */
    {
      id: "ming.child.fork_m",
      cat: "家族",
      title: "六 岁",
      era: "ming",
      age: [5, 8],
      sex: "male",
      class: [],
      weight: 300,
      once: true,
      when: { flagNot: ["path_set"] },
      text: [
        "你已经六岁，个子刚过灶台，能提半桶水。",
        "父亲和族里的三叔公在堂上坐了一晚。三叔公说：这孩子看着还算灵醒，别糟蹋了。父亲没接话，只是一直在捻烟叶。",
        "天亮时他叫你过去，问：往后想做什么。"
      ],
      options: [
        {
          text: "读书",
          hint: "学识 +8，银钱 −1.2 两；往后能不能考出去，看你自己",
          effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -1.2 }, { k: "path", v: "wen" }, { k: "fame", v: 3 }],
          setFlag: ["path_set", "literate"],
          then: "先生给你起了学名。第一课是「天地玄黄」，第二课是戒尺。"
        },
        {
          text: "练武",
          hint: "武艺 +10，身体 +6；读书的路就断了",
          effects: [{ k: "martial", v: 10 }, { k: "body", v: 6 }, { k: "path", v: "wu" }, { k: "fame", v: 1 }],
          setFlag: ["path_set"],
          then: "村里有个退下来的老兵，会几手刀法。你每天天不亮就去他院里站桩。"
        },
        {
          text: "学算盘",
          hint: "学识 +4，银钱 +0.3 两；先认得秤，再认得人",
          effects: [{ k: "knowledge", v: 4 }, { k: "silver", v: 0.3 }, { k: "path", v: "shang" }],
          setFlag: ["path_set"],
          then: "镇上粮行的账房教你打算盘，一天给两文钱，管一顿饭。"
        },
        {
          text: "下地",
          hint: "身体 +8，声望 +2；父亲松了口气",
          effects: [{ k: "body", v: 8 }, { k: "path", v: "nong" }, { k: "fame", v: 2 }],
          setFlag: ["path_set"],
          then: "七岁那年你学会了扶犁。父亲说你比他有出息，说这话时在笑。"
        }
      ]
    },

    {
      id: "ming.child.fork_f",
      cat: "家族",
      title: "六 岁",
      era: "ming",
      age: [5, 8],
      sex: "female",
      class: [],
      weight: 300,
      once: true,
      when: { flagNot: ["path_set"] },
      text: [
        "你已经六岁，会替母亲看着灶上的火。",
        "母亲说，女孩子家总要学一门能换饭吃的手艺。祖母在一边没说话，只是把你抱到膝上，量了量你的手。",
        "那天晚上，母亲问你：往后想学什么。"
      ],
      options: [
        {
          text: "识字",
          hint: "学识 +6，银钱 −0.8 两；乡里会说这丫头心野",
          effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -0.8 }, { k: "path", v: "wen" }, { k: "fame", v: 1 }],
          setFlag: ["path_set", "literate"],
          then: "你跟着族里的哥哥认字，认到「女」字时，先生说这个字要写得低一些。"
        },
        {
          text: "针线",
          hint: "银钱 +0.2 两，声望 +4；一双巧手，是一辈子的依靠",
          effects: [{ k: "silver", v: 0.2 }, { k: "path", v: "nv" }, { k: "fame", v: 4 }, { k: "body", v: 2 }],
          setFlag: ["path_set"],
          then: "你绣的第一件是荷包，母亲拿去集上卖了八文钱，回来给你买了糖。"
        },
        {
          text: "认药",
          hint: "学识 +5，银钱 −2 两；跟镇上的郎中学，日后能救人也救人",
          effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -2 }, { k: "path", v: "yi" }],
          setFlag: ["path_set"],
          then: "老郎中让你先认三百味药。你认到第七十味时，他能叫出你的名字了。"
        },
        {
          text: "跟着下地",
          hint: "身体 +6，声望 +2；家里少一张嘴吃饭",
          effects: [{ k: "body", v: 6 }, { k: "path", v: "nong" }, { k: "fame", v: 2 }],
          setFlag: ["path_set"],
          then: "你学会了插秧。水没过小腿，一站就是一天。"
        }
      ]
    },

    /* ══ 童年琐事 ═══════════════════════════════ */
    {
      id: "ming.child.bully",
      cat: "身体",
      title: "打 架",
      era: "ming",
      age: [7, 12],
      sex: "male",
      class: [],
      weight: 26,
      text: [
        "村东的刘家兄弟俩把你堵在田埂上。他们要你手里那半块饼。",
        "打起来了。你比他们小一岁，但你先动的手。"
      ],
      options: [
        {
          text: "打到他们不敢再来",
          hint: "身体 −6，声望 +6；你从此在这一片没人欺负",
          effects: [{ k: "body", v: -3 }, { k: "fame", v: 6 }, { k: "martial", v: 2 }],
          then: "你打断了刘家老二的一颗门牙。他娘来家里闹了三天，最后是族里出面压下去的。"
        },
        {
          text: "把饼给他们",
          hint: "存粮 −0.2 石；这一天你没吃东西",
          effects: [{ k: "grain", v: -0.2 }, { k: "fame", v: -2 }],
          then: "你看着他们吃完。晚饭时母亲问你饿不饿，你说不饿。"
        },
        {
          text: "跑",
          hint: "身体 +3；跑得快也是本事",
          effects: [{ k: "body", v: 3 }],
          then: "你跑了两里地，回头看没人追来。那天你第一次知道自己跑得很快。"
        }
      ]
    },

    {
      id: "ming.child.mother_sick",
      cat: "家族",
      title: "母亲病了",
      era: "ming",
      age: [6, 15],
      class: [],
      weight: 24,
      once: true,
      text: [
        "母亲咳了两个月，后来越咳越瘦。夜里能听见她在灶间压着声音咳。",
        "父亲请了三次郎中，每次诊金五分银。第三次，郎中从屋里出来，摇了摇头，说：慢慢养着吧。"
      ],
      options: [
        {
          text: "抓药，把家里的钱都拿出来",
          hint: "银钱 −4 两；身体...是她多活几年",
          need: { minSilver: 4 },
          effects: [{ k: "silver", v: -4 }, { k: "fame", v: 6 }, { k: "flag", v: "mother_saved" }],
          then: "母亲活了下来，但从此干不了重活。她后来常说，这条命是你买回来的。"
        },
        {
          text: "去山里采药",
          hint: "身体 −8；不花钱，赌一条命",
          effects: [{ k: "body", v: -4 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "fame", v: 4 }, { k: "flag", v: "mother_saved" }],
            winNote: "你在山崖边挖到了几株药草。母亲喝了半个月，咳得轻了。",
            loseNote: "你在山里淋了一夜的雨，回来自己先病了。母亲撑着起来给你熬姜汤。",
            lose: [{ k: "body", v: -3 }]
          }
        },
        {
          text: "去庙里求",
          hint: "银钱 −0.1 两；你在神像前跪了整夜",
          effects: [{ k: "silver", v: -0.1 }, { k: "fame", v: 1 }],
          then: "秋天母亲好了。你觉得是神显灵，父亲觉得是天转凉了。"
        }
      ]
    },

    {
      id: "ming.child.temple",
      cat: "世情",
      title: "庙 会",
      era: "ming",
      age: [7, 15],
      class: [],
      weight: 30,
      text: [
        "三月廿八，镇上有庙会。戏台搭在土地庙前，唱的是《琵琶记》。",
        "人挤得很。你在台下看见有人在人群里摸别人的荷包，也看见一个卖糖人的老头，一双手全是裂口。"
      ],
      options: [
        {
          text: "挤到台前看戏",
          hint: "学识 +2；知道什么叫「糟糠之妻不下堂」",
          effects: [{ k: "knowledge", v: 2 }, { k: "fame", v: 1 }],
          then: "散场时你还在想赵五娘。回家的路上你一句话也没说。"
        },
        {
          text: "喊人抓那个贼",
          hint: "声望 +5；也有人说你多事",
          effects: [{ k: "fame", v: 5 }, { k: "grudge", v: 3 }],
          then: "贼被按在地上，失主是个外乡人。他给你磕了一个头。"
        },
        {
          text: "去看卖艺的",
          hint: "武艺 +3；第一次见人耍枪",
          effects: [{ k: "martial", v: 3 }, { k: "body", v: 2 }],
          then: "那汉子把一杆枪舞得只剩风声。他收势时说：练这个没用，混口饭吃。"
        }
      ]
    },

    {
      id: "ming.child.uncle",
      cat: "家族",
      title: "族 叔",
      era: "ming",
      age: [8, 18],
      class: [],
      weight: 26,
      once: true,
      when: { minSilver: 3 },
      text: [
        "族里的四叔来了，坐下就叹气。他儿子赌输了钱，人家要牵他家的牛。",
        "四叔说：都是一个祖宗的，你爹当年还借过我两斗米。"
      ],
      options: [
        {
          text: "借给他",
          hint: "银钱 −5 两；这笔钱多半回不来",
          need: { minSilver: 5 },
          effects: [{ k: "silver", v: -5 }, { k: "favor", v: 12 }, { k: "fame", v: 4 }],
          then: "四叔走的时候，把腰弯得很低。三年后他病死，钱没还。"
        },
        {
          text: "不借",
          hint: "声望 −5，仇怨 +6；族里从此有了话柄",
          effects: [{ k: "fame", v: -5 }, { k: "grudge", v: 6 }],
          then: "四叔站起来，把凳子推回原处，说了句「知道了」。"
        },
        {
          text: "借，但要他拿地契来押",
          hint: "银钱 −5 两；两年后那块地归你",
          need: { minSilver: 5 },
          effects: [{ k: "silver", v: -5 }, { k: "fame", v: -3 }],
          schedule: [{ inYears: 2, effects: [{ k: "field_dry", v: 3 }], note: "四叔押的三亩旱地归了你" }],
          then: "他把地契拍在桌上，手在抖。你把它折好，收进箱底。"
        }
      ]
    },

    /* ══ 少年 ═══════════════════════════════════ */
    {
      id: "ming.teen.craft",
      cat: "职业",
      title: "学 手 艺",
      era: "ming",
      age: [12, 17],
      sex: "male",
      class: ["farmer", "tenant", "base"],
      weight: 40,
      once: true,
      when: { flagNot: ["path_set"] },
      text: [
        "镇上王木匠要收个徒弟。三年学徒，管饭，不给工钱，出师后一年能挣八两。",
        "父亲说：学会了，一辈子饿不死。母亲说：三年不给工钱，家里少一个劳力。"
      ],
      options: [
        {
          text: "去当学徒",
          hint: "声望 +3，学识 +2；三年后多一门手艺",
          effects: [{ k: "fame", v: 3 }, { k: "knowledge", v: 2 }, { k: "path", v: "shang" },
                    { k: "flag", v: "craft" }],
          setFlag: ["path_set"],
          schedule: [{ inYears: 3, effects: [{ k: "silver", v: 6 }, { k: "fame", v: 4 }], note: "学徒期满，出师了" }],
          then: "头一年你只做一件事：刨木头。刨到手上全是血泡，破了，结茧。"
        },
        {
          text: "留在家里种地",
          hint: "身体 +5；田里多一双手",
          effects: [{ k: "body", v: 5 }, { k: "path", v: "nong" }],
          setFlag: ["path_set"],
          then: "王木匠后来收了邻村的孩子。十年后那人盖起了砖房。"
        },
        {
          text: "去码头扛包",
          hint: "银钱 +1 两/年，身体 +3；挣的是现钱",
          effects: [{ k: "silver", v: 1 }, { k: "body", v: 3 }, { k: "path", v: "shang" }],
          setFlag: ["path_set"],
          then: "你一天扛八十包，晚上躺下就睡。腰从此不太好。"
        }
      ]
    },

    {
      id: "ming.teen.crush",
      cat: "世情",
      title: "动 心",
      era: "ming",
      age: [14, 19],
      sex: "male",
      class: [],
      weight: 50,
      once: true,
      when: { flagNot: ["married"] },
      text: [
        "邻村周家的女儿来走亲戚，在井台边打水。你挑着担子在那儿站了半天，水桶一直没提上来。",
        "回家路上，你把她回头那一眼想了很多遍。"
      ],
      options: [
        {
          text: "托媒人去问",
          hint: "银钱 −2 两；成不成看她家的意思",
          need: { minSilver: 2 },
          effects: [{ k: "silver", v: -2 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "flag", v: "married" },
                  { k: "addPerson", v: { name: "周氏", role: "wife", rel: "妻", age: 16 } },
                  { k: "fame", v: 4 }],
            winNote: "周家应了。聘财八两，布两匹。成亲那天她低着头，你也没敢看。",
            loseNote: "周家说已经许了人。媒人回来时，你在门口站了很久。"
          }
        },
        {
          text: "自己去找她说话",
          hint: "声望 −6；若被人看见，两家都没脸",
          effects: [{ k: "fame", v: -6 }],
          gamble: {
            winChance: 0.4,
            win: [{ k: "flag", v: "married" },
                  { k: "addPerson", v: { name: "周氏", role: "wife", rel: "妻", age: 16 } }],
            winNote: "你在河边等到她。她说了三句话就走了，其中一句是「你再来」。",
            loseNote: "她嫂子撞见了。第二天全村都知道了。你爹把你关在柴房里三天。",
            lose: [{ k: "fame", v: -8 }, { k: "grudge", v: 6 }]
          }
        },
        {
          text: "算了",
          hint: "什么也不发生；你会记得很久",
          effects: [{ k: "fame", v: 1 }],
          then: "第二年她嫁去了外县。你听说的时候正在地里，直起腰看了看天。"
        }
      ]
    },

    {
      id: "ming.teen.crush_f",
      cat: "世情",
      title: "说 亲",
      era: "ming",
      age: [14, 19],
      sex: "female",
      class: [],
      weight: 60,
      once: true,
      when: { flagNot: ["married"] },
      text: [
        "媒人来了。说的是县城里一户开杂货铺的，男人二十四岁，前头没娶过。",
        "母亲问你觉得怎么样。祖母说：这种事，你看一眼也看不出什么。"
      ],
      options: [
        {
          text: "应下",
          hint: "家里得聘财十二两；你从此是别人家的人",
          effects: [{ k: "silver", v: 12 }, { k: "flag", v: "married" },
                    { k: "addPerson", v: { name: "", role: "husband", rel: "夫", age: 24 } }],
          then: "上轿那天母亲没出来送。后来你妹妹说，她在灶间坐了一整天。"
        },
        {
          text: "想先见一面",
          hint: "声望 −4；祖母骂了一句「没规矩」",
          effects: [{ k: "fame", v: -4 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "silver", v: 12 }, { k: "flag", v: "married" },
                  { k: "addPerson", v: { name: "", role: "husband", rel: "夫", age: 24 } }],
            winNote: "在铺子后头见了一面。他手上有墨，说话时一直看着地。你觉得行。",
            loseNote: "男方听说要相看，觉得受了辱，退了这桩亲。祖母三个月没跟你说话。",
            lose: [{ k: "fame", v: -6 }, { k: "grudge", v: 5 }]
          }
        },
        {
          text: "回绝，留在家里帮衬",
          hint: "声望 −5；家里多一个劳力，也多个话柄",
          effects: [{ k: "fame", v: -5 }, { k: "body", v: 3 }],
          then: "媒人走时脸很难看。此后三年，再没人上门。"
        }
      ]
    },

    {
      id: "ming.teen.brothel",
      cat: "世情",
      title: "灯 船",
      era: "ming",
      age: [18, 36],
      sex: "male",
      class: ["gentry", "merchant", "official_mid", "noble", "royal"],
      weight: 26,
      area: ["南直隶", "浙江"],
      when: { minSilver: 15, flagHas: ["married"] },
      text: [
        "同行的朋友姓吴，家里开绸缎庄，他说今日他做东，拉你上船。",
        "灯船一只一只停在河心，船上有琵琶声。你看见一个女子倚在舱门口，手里一把团扇，扇面上画的是折枝梅。"
      ],
      options: [
        {
          text: "上船",
          hint: "银钱 −8 两；声望 −1，你会记住这个晚上",
          need: { minSilver: 8 },
          effects: [{ k: "silver", v: -8 }, { k: "fame", v: -1 }, { k: "knowledge", v: 2 },
                    { k: "flag", v: "brothel" }],
          then: "她问你读过书没有。你说读过。她说：那你替我写一首。你写了四句，她笑着说不像。"
        },
        {
          text: "在岸上等",
          hint: "什么也不发生；你听了一夜的琵琶",
          effects: [{ k: "knowledge", v: 1 }],
          then: "你在石阶上坐到三更。船走的时候，那盏灯灭了。"
        },
        {
          text: "掉头回家",
          hint: "声望 +2；吴家那位从此不太找你",
          effects: [{ k: "fame", v: 2 }, { k: "favor", v: -4 }],
          then: "你走到巷口回头看了一眼。后来你常常想起那一眼。"
        }
      ]
    },

    {
      id: "ming.teen.gang",
      cat: "世情",
      title: "街 面 上",
      era: "ming",
      age: [12, 19],
      sex: "male",
      class: ["farmer", "tenant", "base", "merchant"],
      weight: 26,
      once: true,
      text: [
        "街面上有几个人，年纪比你大两三岁，平日里替人跑腿收账，吃穿比你强。",
        "领头的姓赵，拍你肩膀说：跟着我们，一年下来，比种地强十倍。"
      ],
      options: [
        {
          text: "跟着他们",
          hint: "银钱 +3 两/年，声望 −8；这一行进来容易出去难",
          effects: [{ k: "silver", v: 3 }, { k: "fame", v: -8 }, { k: "grudge", v: 6 },
                    { k: "flag", v: "gang" }],
          schedule: [{ inYears: 4, eventId: "ming.gang.trouble" }],
          then: "第一次替人收账，你把人家的锅端走了。那家人有个小孩，一直在看你。"
        },
        {
          text: "不跟，也不得罪",
          hint: "声望 +2；你学会了怎么推",
          effects: [{ k: "fame", v: 2 }, { k: "knowledge", v: 1 }],
          then: "你说：我爹管得紧。赵某笑了笑，说行。"
        },
        {
          text: "当面拒绝",
          hint: "声望 +5，仇怨 +10；这条街以后不太平",
          effects: [{ k: "fame", v: 5 }, { k: "grudge", v: 10 }],
          then: "赵某没说话。半年后你家的柴垛半夜着了火。"
        }
      ]
    },

    {
      id: "ming.teen.recommend",
      cat: "职业",
      title: "荐 举",
      era: "ming",
      age: [15, 24],
      class: ["gentry", "official_mid", "noble", "merchant"],
      weight: 24,
      once: true,
      when: { minFame: 8 },
      text: [
        "父亲的老友在府衙当经历，说县里缺一个书办，问问你去不去。",
        "去了就是{{书办|衙门里掌文书的吏员，无品级，但熟门熟路能办事}}，一年工食银六两，另有许多说不清的进项。"
      ],
      options: [
        {
          text: "去",
          hint: "银钱 +6 两/年，学识 +4；从此在衙门里有一席",
          effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 4 }, { k: "fame", v: 6 },
                    { k: "line", v: "clerk" }],
          then: "你第一次摸到真正的案卷。上面的字比你想的潦草得多。"
        },
        {
          text: "不去，专心应考",
          hint: "学识 +5；走的是另一条路",
          effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: 2 }],
          then: "父亲的老友说：可惜。你说：再考一次。"
        },
        {
          text: "去，但只当个跳板",
          hint: "银钱 +4 两，学识 +3，声望 −2；有人会说你钻营",
          effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 3 }, { k: "fame", v: -2 },
                    { k: "line", v: "clerk" }, { k: "flag", v: "clerk_ladder" }],
          then: "你一边抄案卷，一边在灯下看书。同僚笑你，你不理。"
        }
      ]
    },
    /* ══ 天下大事 ═════════════════════════════════
     * 这些不随机掉，是那几年必到的。年份、地域都写死。
     */
    {
      id: "ming.great.tumu",
      cat: "大事",
      title: "土 木",
      era: "ming",
      years: [1449, 1449],
      age: [12, 70],
      area: ["北直隶", "山西", "山东"],
      weight: 400,
      once: true,
      text: [
        "七月，皇帝亲征瓦剌，八月，败于土木堡。",
        "消息传到县里是五天以后。有人说皇上被掳走了，有人说已经死了。街上的人先是愣着，然后开始关铺子。",
        "京师的兵不够，朝廷开始在各处募兵。"
      ],
      options: [
        {
          text: "应募从军",
          hint: "银钱 +3 两；此去多半回不来",
          effects: [{ k: "silver", v: 3 }, { k: "fame", v: 8 }, { k: "martial", v: 4 },
                    { k: "line", v: "military" }],
          gamble: {
            winChance: 0.55,
            win: [{ k: "command", v: 60 }],
            winNote: "你在德胜门外守了四十天。城没破，你活了，还带回一杆枪。",
            loseNote: "你所在的营在城外溃了。你躺在一处沟里，第二天才敢动。",
            lose: [{ k: "body", v: -15 }, { k: "fame", v: -4 }]
          }
        },
        {
          text: "举家往南避",
          hint: "银钱 −6 两；躲得过兵，躲不过一路的盘缠",
          effects: [{ k: "silver", v: -6 }, { k: "body", v: -3 }],
          then: "你们走到第三天，听说京师守住了。父亲说：回去吧。回去时家里的门被撬了。"
        },
        {
          text: "照旧过日子",
          hint: "什么也不做；这一年的税加了三成",
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: -2 }],
          then: "你把门闩加了一道。夜里听到马蹄声，全家都醒着。"
        }
      ]
    },

    {
      id: "ming.great.gengxu",
      cat: "大事",
      title: "庚 戌",
      era: "ming",
      years: [1550, 1550],
      age: [10, 70],
      area: ["北直隶"],
      weight: 400,
      once: true,
      text: [
        "八月，俺答的兵从古北口进来，一路烧到通州，围了京师三天。",
        "城外全是逃进来的人。有人在城门底下卖儿卖女，一个十二岁的丫头，三百文。",
        "官兵不敢出城。城墙上的人往下扔石头。"
      ],
      options: [
        {
          text: "上城帮着守",
          hint: "身体 −10，声望 +10；你摸到了真正的城砖",
          effects: [{ k: "body", v: -5 }, { k: "fame", v: 10 }, { k: "martial", v: 3 }],
          then: "你在城头搬了三天石头。看见远处一片火光，那是城外的人在烧自己的房子。"
        },
        {
          text: "买个人回来",
          hint: "银钱 −0.5 两，家中多一人；这事你后来不提",
          need: { minSilver: 1 },
          effects: [{ k: "silver", v: -0.5 },
                    { k: "addPerson", v: { name: "", role: "servant", rel: "婢", age: 12 } },
                    { k: "fame", v: -4 }],
          then: "你把她领回家。她一路上没说话，进门就跪下了。"
        },
        {
          text: "关门闭户",
          hint: "存粮 −2 石；三天后兵退了",
          effects: [{ k: "grain", v: -2 }, { k: "body", v: -2 }],
          then: "三天里你们吃的是存下的陈米。兵退后，城外的村子没了一半。"
        }
      ]
    },

    {
      id: "ming.great.wo",
      cat: "大事",
      title: "倭 至",
      era: "ming",
      years: [1553, 1566],
      age: [12, 75],
      area: ["浙江", "福建", "南直隶"],
      weight: 90,
      once: true,
      text: [
        "倭寇从海上来了。先是在松江、太仓一带登岸，后来一路烧到内地。",
        "县里的衙役跑了一半。有人说要练乡兵，有人说先把家眷送走。",
        "城外的稻田已经熟了，没人敢去割。"
      ],
      options: [
        {
          text: "结寨自保，练乡兵",
          hint: "银钱 −20 两，武艺 +6，声望 +12；从此你手里有人",
          need: { minSilver: 20 },
          effects: [{ k: "silver", v: -20 }, { k: "martial", v: 6 }, { k: "fame", v: 12 },
                    { k: "troops", v: 40 }, { k: "morale", v: 8 }],
          then: "你带着四十个乡民守住了村口。死了七个。剩下的三十三个从此听你的。"
        },
        {
          text: "带着全家往山里躲",
          hint: "田产荒废一年；人保住了，地里的稻烂了",
          effects: [{ k: "grain", v: -6 }, { k: "body", v: -4 }, { k: "fame", v: -2 }],
          then: "你们在山里住了两个月。回来时屋还在，稻子全烂在水里。"
        },
        {
          text: "送钱给倭首，求个平安",
          hint: "银钱 −30 两；管用，但乡里会记着",
          need: { minSilver: 30 },
          effects: [{ k: "silver", v: -30 }, { k: "fame", v: -10 }, { k: "grudge", v: 8 }],
          then: "那一队人拿了钱就走了。第二年他们又来了，认得了你家的门。"
        }
      ]
    },

    {
      id: "ming.great.yitiaobian",
      cat: "大事",
      title: "一 条 鞭",
      era: "ming",
      years: [1570, 1592],
      age: [14, 70],
      area: ["南直隶", "浙江", "江西", "福建"],
      weight: 70,
      once: true,
      text: [
        "巡抚下文，推行{{一条鞭法|把田赋、徭役、杂税并为一条，按亩折银征收}}：赋役合并，一概征银。",
        "里长挨家挨户来说，从今往后不用出夫了，多交银子就行。",
        "族里的老人在祠堂里骂：银子能当饭吃吗。"
      ],
      options: [
        {
          text: "按新法交银",
          hint: "银钱 −3 两；账清楚了，人也松快些",
          effects: [{ k: "silver", v: -3 }, { k: "fame", v: 3 }],
          then: "你第一次拿银子完税，衙门的库吏给你开了一张印票。你把它收在箱子里。"
        },
        {
          text: "把田挂到族中举人名下",
          hint: "银钱 +2 两/年；但田契从此不全是你的",
          need: { minFame: 15 },
          effects: [{ k: "silver", v: 2 }, { k: "fame", v: -6 }, { k: "grudge", v: 5 },
                    { k: "flag", v: "land_shelter" }],
          then: "举人老爷收了你的田契，说：都是一个祖宗的。你点头，心里知道不是。"
        },
        {
          text: "拖，能拖一年是一年",
          hint: "声望 −6；差人来了两趟",
          effects: [{ k: "fame", v: -6 }, { k: "grudge", v: 4 }],
          then: "差人第二次来，带走了你家的一口锅。"
        }
      ]
    },

    {
      id: "ming.great.open_sea",
      cat: "大事",
      title: "月 港",
      era: "ming",
      years: [1567, 1620],
      age: [16, 60],
      area: ["福建", "广东"],
      weight: 60,
      once: true,
      text: [
        "朝廷准了{{月港|漳州海澄的港口，隆庆元年开海，准贩东西二洋}}通番。",
        "码头上一夜之间多了几十条船。有人从吕宋回来，带了一袋子银元，说那边银子贱得像石头。",
        "本钱要三十两起。"
      ],
      options: [
        {
          text: "凑本钱出海",
          hint: "银钱 −30 两；回来能翻三倍，回不来就没了",
          need: { minSilver: 30 },
          effects: [{ k: "silver", v: -30 }],
          gamble: {
            winChance: 0.55,
            win: [{ k: "silver", v: 95 }, { k: "knowledge", v: 5 }, { k: "line", v: "trade" }],
            winNote: "十一个月后船回来了。你分到九十五两，还有一匹西洋布。",
            loseNote: "船没回来。有人说在海外遇了风，有人说被红毛番劫了。",
            lose: [{ k: "body", v: -5 }, { k: "grudge", v: 6 }]
          }
        },
        {
          text: "在岸上给船主做账",
          hint: "银钱 +8 两；不下海，只记账",
          effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 4 }, { k: "line", v: "trade" }],
          then: "你替三条船记账。看得多了，就知道哪一趟能赚，哪一趟是赌。"
        },
        {
          text: "不碰",
          hint: "什么也不发生；你看着别人的船出海",
          effects: [{ k: "fame", v: 1 }],
          then: "十年后，当年出海的那几个人里，有一个回来修了祠堂。"
        }
      ]
    },

    {
      id: "ming.great.mining_tax",
      cat: "大事",
      title: "矿 监",
      era: "ming",
      years: [1596, 1620],
      age: [14, 80],
      class: ["merchant", "gentry", "farmer", "official_mid"],
      weight: 80,
      once: true,
      text: [
        "朝廷派了{{矿监税使|万历二十四年起，宦官以开矿、收税为名分赴各地，扰民极烈}}下来。",
        "领头的是个太监，带二十几个人，住在县里的察院。第二天就贴出告示：凡有店铺、窑口、果园，一律报税。",
        "有人说你家祖坟那片地下面有矿脉。"
      ],
      options: [
        {
          text: "塞银子，求个清净",
          hint: "银钱 −25 两；他收了，但下个月还会来",
          need: { minSilver: 25 },
          effects: [{ k: "silver", v: -25 }, { k: "fame", v: -4 }],
          then: "银子是装在食盒里送进去的。他回了一句话：这家人懂事。"
        },
        {
          text: "带着乡邻去抗",
          hint: "声望 +14，仇怨 +18；打出人命，官府要拿人",
          effects: [{ k: "fame", v: 14 }, { k: "grudge", v: 18 }, { k: "body", v: -4 }],
          gamble: {
            winChance: 0.45,
            win: [{ k: "silver", v: 5 }, { k: "fame", v: 10 }],
            winNote: "几百人围了察院，砸了他的轿子。太监连夜走了，告示被人撕下来烧了。",
            loseNote: "官兵来了。为首的五个人被抓走，其中一个是你的邻居。",
            lose: [{ k: "fame", v: -6 }, { k: "grudge", v: 10 }, { k: "silver", v: -12 }]
          }
        },
        {
          text: "关铺子，把东西埋起来",
          hint: "银钱 −8 两；躲过这一阵，生意断了半年",
          effects: [{ k: "silver", v: -8 }, { k: "fame", v: -2 }],
          then: "你把值钱的东西埋在后院。半年后挖出来，霉了一半。"
        }
      ]
    },

    {
      id: "ming.great.korea",
      cat: "大事",
      title: "朝 鲜",
      era: "ming",
      years: [1592, 1598],
      age: [16, 55],
      sex: "male",
      area: ["山东", "浙江", "南直隶", "北直隶"],
      weight: 70,
      once: true,
      text: [
        "倭人犯朝鲜，朝廷发兵援救。各路调兵，县里也在征。",
        "告示贴在县衙门口：募敢战之士，月粮一石二斗，安家银二两。",
        "去的人回来说，那边冷，海上有雾，倭人的刀比我们的短，但快。"
      ],
      options: [
        {
          text: "应征",
          hint: "安家银 +2 两；生死看天",
          effects: [{ k: "silver", v: 2 }, { k: "fame", v: 8 }, { k: "martial", v: 6 },
                    { k: "line", v: "military" }],
          gamble: {
            winChance: 0.6,
            win: [{ k: "command", v: 120 }, { k: "fame", v: 8 }, { k: "silver", v: 8 }],
            winNote: "你在平壤城外打了半年。回来时少了两根手指，多了一面旗。",
            loseNote: "渡海那天风大。你没到岸上就病了，回来时人只剩一半。",
            lose: [{ k: "body", v: -18 }, { k: "fame", v: -4 }]
          }
        },
        {
          text: "出钱雇人代役",
          hint: "银钱 −12 两；命是自己的",
          need: { minSilver: 12 },
          effects: [{ k: "silver", v: -12 }, { k: "fame", v: -3 }],
          then: "你雇了邻村一个没成家的汉子。他第二年回来了，你的钱他一文没还。"
        },
        {
          text: "躲进山里",
          hint: "声望 −10；被拿住要治罪",
          effects: [{ k: "fame", v: -10 }, { k: "body", v: -2 }],
          then: "你在山里待了四十天。回家时，差人已经来过三趟。"
        }
      ]
    },

    {
      id: "ming.great.liaodong",
      cat: "大事",
      title: "辽 饷",
      era: "ming",
      years: [1618, 1643],
      age: [12, 80],
      weight: 90,
      once: true,
      text: [
        "辽东用兵，朝廷加派{{辽饷|万历四十六年起，每亩加征三厘五毫，后累加至九厘，全国普加}}。",
        "县里的告示写得很清楚：每亩加银九厘。一亩九厘，十亩九分，一百亩九钱。",
        "里长说：今年不交，明年连人一起算。"
      ],
      options: [
        {
          text: "照数交",
          hint: "银钱 −(田亩×0.009)；交完，家里就空了",
          effects: [{ k: "fame", v: 2 }],
          then: "你把银子数了三遍。库吏连看都没看，扫进斗里。"
        },
        {
          text: "卖几亩地抵",
          hint: "水田 −3 亩；荒年田贱，卖得心痛",
          effects: [{ k: "field_wet", v: -3 }, { k: "silver", v: 4 }, { k: "fame", v: -4 }],
          then: "买主是本村的富户，价钱压到四两一亩。你签了字，手心里全是汗。"
        },
        {
          text: "逃，田不要了",
          hint: "田产抛荒，身体 −14；从此是流民",
          effects: [{ k: "field_wet", v: -99 }, { k: "field_dry", v: -99 },
                    { k: "body", v: -7 }, { k: "fame", v: -10 }, { k: "flag", v: "refugee" }],
          then: "你带着一家老小往南走。走到第三个县，最小的那个孩子没了。"
        }
      ]
    },

    {
      id: "ming.great.drought",
      cat: "大事",
      title: "大 旱",
      era: "ming",
      years: [1630, 1643],
      age: [8, 80],
      area: ["陕西", "山西", "河南", "山东", "北直隶"],
      weight: 100,
      once: true,
      text: [
        "第四年没下透雨了。井见了底，河断了流，树皮被剥得精光。",
        "路上全是往南走的人。有人走着走着就倒下，没人扶。",
        "县里的仓开了三天，第四天说没粮了。"
      ],
      options: [
        {
          text: "跟着人流往南",
          hint: "田产全弃，身体 −20；活下来的机会大一些",
          effects: [{ k: "field_wet", v: -99 }, { k: "field_dry", v: -99 },
                    { k: "body", v: -10 }, { k: "flag", v: "refugee" }],
          then: "你走了两个月。路上卖了一个女儿，换了两斗米。"
        },
        {
          text: "守着家，等雨",
          hint: "存粮 −8 石，身体 −25；不走，是赌这场雨",
          effects: [{ k: "grain", v: -8 }, { k: "body", v: -13 }],
          gamble: {
            winChance: 0.45,
            win: [{ k: "fame", v: 8 }, { k: "flag", v: "kept_land" }],
            winNote: "第五年开春下了雨。你是村里少数还留着地的人。",
            loseNote: "第五年还是没雨。你埋了家里两口人，然后也走了。",
            lose: [{ k: "fame", v: -8 }, { k: "body", v: -6 }]
          }
        },
        {
          text: "投了流寇",
          hint: "银钱 +5 两，声望 −20；从此是贼",
          effects: [{ k: "silver", v: 5 }, { k: "fame", v: -20 }, { k: "martial", v: 8 },
                    { k: "troops", v: 30 }, { k: "flag", v: "bandit" }],
          then: "你跟着一队人破了两个寨子。分粮的时候，你抢到了一袋粟。"
        }
      ]
    },

    {
      id: "ming.great.shenjia",
      cat: "大事",
      title: "甲 申",
      era: "ming",
      years: [1643, 1644],
      age: [10, 80],
      area: ["北直隶", "山东", "河南", "山西"],
      weight: 500,
      once: true,
      text: [
        "三月，李自成的兵到了城外。",
        "城里的官跑了几个。米价一天三变，昨天一斗一百二十文，今天二百。街上有人在卖马，也有人在卖女儿。",
        "你家就在这城里。往南的门还开着。"
      ],
      options: [
        {
          text: "举家南逃",
          hint: "银钱 −15 两，身体 −12；家产带不走，人还在",
          effects: [{ k: "silver", v: -15 }, { k: "body", v: -6 },
                    { k: "field_wet", v: -99 }, { k: "field_dry", v: -99 },
                    { k: "flag", v: "fled_south" }],
          then: "出城那天在下雨。你回头看了一眼自家的门楼，然后就没再回头。"
        },
        {
          text: "留在城里，关上门",
          hint: "存粮 −4 石；赌的是新朝不要你的命",
          effects: [{ k: "grain", v: -4 }, { k: "body", v: -4 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "fame", v: -6 }, { k: "flag", v: "survived_1644" }],
            winNote: "城破了。兵在街上过了三天。你家的门被砸开，东西抢光，人还在。",
            loseNote: "城破了。有个兵在你家门口杀了人。你后来搬了三次家，还是记得那声。",
            lose: [{ k: "body", v: -9 }, { k: "fame", v: -10 }]
          }
        },
        {
          text: "开门迎降，献上家产",
          hint: "银钱 −(大半)，声望 −18；换一条命",
          effects: [{ k: "fame", v: -18 }, { k: "grudge", v: 12 }, { k: "flag", v: "surrendered" }],
          then: "你把银子抬到街上。领兵的看了你一眼，说：识时务。"
        },
        {
          text: "把家丁拉上城",
          hint: "要靠手里真有兵；输了是灭门",
          need: { minTroops: 20 },
          effects: [{ k: "fame", v: 20 }, { k: "body", v: -10 }],
          gamble: {
            winChance: 0.25,
            win: [{ k: "troops", v: 40 }, { k: "fame", v: 20 }, { k: "flag", v: "held_city" }],
            winNote: "你守住了西门七天。城最后还是破了，但你带着人从水道走了出去。",
            loseNote: "守了两天。第三天早上，你身边的人跑了一半。",
            lose: [{ k: "troops", v: -40 }, { k: "body", v: -13 }, { k: "fame", v: -10 }]
          }
        }
      ]
    },

    {
      id: "ming.great.manchu",
      cat: "大事",
      title: "北 兵",
      era: "ming",
      years: [1636, 1643],
      age: [10, 75],
      area: ["北直隶", "山东"],
      weight: 120,
      once: true,
      text: [
        "北边的兵又从长城口子进来了。这一次走得更深，一直到了济南。",
        "县里贴了闭城的告示。城外的人往城里挤，城门的守兵开始收钱，一个人五文。",
        "有人在传：他们是来找人的，不是来占地的。"
      ],
      options: [
        {
          text: "进城躲",
          hint: "银钱 −1 两（入门钱）；城里也未必安全",
          effects: [{ k: "silver", v: -1 }, { k: "body", v: -3 }],
          then: "你在城里挤了二十天。粮价涨到一斗三百文，你买了三次。"
        },
        {
          text: "往偏僻处走",
          hint: "身体 −10；房子可能没了",
          effects: [{ k: "body", v: -5 }],
          gamble: {
            winChance: 0.6,
            win: [{ k: "flag", v: "house_kept" }],
            winNote: "你回来时房子还在，只是门被卸了去当柴烧。",
            loseNote: "你回来时只剩一堵墙。灶还在，锅没了。",
            lose: [{ k: "grain", v: -10 }, { k: "silver", v: -10 }]
          }
        },
        {
          text: "留下看家",
          hint: "赌他们不进这个村",
          effects: [{ k: "fame", v: 3 }],
          gamble: {
            winChance: 0.5,
            win: [],
            winNote: "他们没来这个村。你在家里待了半个月，每天听着远处的动静。",
            loseNote: "来了七个兵。你躲在柴垛里，听见他们在堂屋翻东西。",
            lose: [{ k: "silver", v: -20 }, { k: "body", v: -8 }]
          }
        }
      ]
    },

    {
      id: "ming.great.ningwang",
      cat: "大事",
      title: "宁 王",
      era: "ming",
      years: [1519, 1519],
      age: [12, 70],
      area: ["江西"],
      weight: 400,
      once: true,
      text: [
        "宁王在南昌起兵，说是奉太后密旨，要入朝除奸。",
        "他的兵沿江而下，一路贴告示。县里有人偷偷议论，说这回是真要变了。",
        "朝廷的兵还在路上。"
      ],
      options: [
        {
          text: "跟着宁王",
          hint: "银钱 +8 两，声望 +6；若败，是谋逆",
          effects: [{ k: "silver", v: 8 }, { k: "fame", v: 6 }, { k: "grudge", v: 10 },
                    { k: "flag", v: "ning_follow" }],
          schedule: [{ inYears: 1, eventId: "ming.great.ningwang_after" }],
          then: "你替他管了三个月的粮。后来听说王阳明破了南昌。"
        },
        {
          text: "闭门不出",
          hint: "什么也不做；两边都不得罪",
          effects: [{ k: "fame", v: -2 }],
          then: "你家的门关了一个月。开门时，外面的官已经换了一茬。"
        },
        {
          text: "暗地给官军送信",
          hint: "声望 +10，仇怨 +14；若事泄，全家不保",
          effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 14 }, { k: "flag", v: "ning_spy" }],
          gamble: {
            winChance: 0.6,
            win: [{ k: "silver", v: 15 }, { k: "fame", v: 10 }],
            winNote: "官军按你送的信摸进了城。事后论功，你得了一面匾。",
            loseNote: "送信的人被宁王的兵拿住了。你连夜逃出城，家里被抄。",
            lose: [{ k: "silver", v: -30 }, { k: "body", v: -10 }, { k: "fame", v: -15 }]
          }
        }
      ]
    },

    {
      id: "ming.great.flood",
      cat: "大事",
      title: "河 决",
      era: "ming",
      years: [1489, 1642],
      age: [8, 80],
      area: ["河南", "山东", "南直隶"],
      weight: 60,
      once: true,
      text: [
        "黄河又决了口。水是从上游下来的，来的时候是半夜。",
        "有人喊了一声，全村都起来了。水已经漫过门槛。",
        "你抓到的第一件东西，是家里的族谱。"
      ],
      options: [
        {
          text: "先救人",
          hint: "身体 −12，声望 +12；你背出来两个孩子",
          effects: [{ k: "body", v: -6 }, { k: "fame", v: 12 }, { k: "grain", v: -6 }],
          then: "你把两个孩子送到坡上，回头去找第三个。水已经到腰了。"
        },
        {
          text: "先抢粮食",
          hint: "存粮 −3 石（只抢出一部分）；人各有各的算盘",
          effects: [{ k: "grain", v: -3 }, { k: "fame", v: -4 }, { k: "body", v: -3 }],
          then: "你抢出两袋麦子。隔壁的老太太在屋顶上喊了一夜。"
        },
        {
          text: "往上跑，什么也不管",
          hint: "身体 −4；你活下来了",
          effects: [{ k: "body", v: -2 }, { k: "fame", v: -6 }, { k: "grain", v: -4 }],
          then: "你跑到高处回头看，水已经平了屋顶。"
        }
      ]
    },
    /* ══ 营生 ═════════════════════════════════════ */
    {
      id: "ming.work.shop",
      cat: "职业",
      title: "开 铺",
      era: "ming",
      age: [18, 50],
      class: ["merchant", "gentry", "farmer", "official_mid"],
      weight: 30,
      once: true,
      when: { minSilver: 20 },
      text: [
        "镇上的十字街口有一间铺面要转，东家死了儿子，要回乡。",
        "作价二十五两，连货架带后面的小屋。",
        "妻子说：万一赔了呢。你没答。"
      ],
      options: [
        {
          text: "盘下来，卖杂货",
          hint: "银钱 −25 两；一年能挣十来两，也可能赔",
          need: { minSilver: 25 },
          effects: [{ k: "silver", v: -25 }, { k: "line", v: "trade" }, { k: "fame", v: 6 }],
          gamble: {
            winChance: 0.62,
            win: [{ k: "silver", v: 34 }, { k: "fame", v: 4 }],
            winNote: "第一年盘账，除去本钱，落了九两。妻子把钱缝进枕头。",
            loseNote: "赊出去的账收不回来，年底只余一堆欠条。",
            lose: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }]
          }
        },
        {
          text: "盘下来，改卖酒",
          hint: "银钱 −25 两；酒利厚，也招人",
          need: { minSilver: 25 },
          effects: [{ k: "silver", v: -25 }, { k: "line", v: "trade" }, { k: "grudge", v: 4 }],
          gamble: {
            winChance: 0.55,
            win: [{ k: "silver", v: 50 }, { k: "fame", v: 3 }],
            winNote: "酒香不怕巷子深。半年后，连县里的书办都来你这里吃酒。",
            loseNote: "隔壁也开了酒铺，价钱比你低两文。你的酒酸在缸里。",
            lose: [{ k: "silver", v: -8 }, { k: "body", v: -2 }]
          }
        },
        {
          text: "不盘，把钱放出去生息",
          hint: "银钱 +2 两/年；稳，也薄",
          effects: [{ k: "silver", v: 2 }, { k: "line", v: "trade" }],
          then: "你把银子借给了三户人家，月息二分。收得回来收不回来，看人。"
        }
      ]
    },

    {
      id: "ming.work.caravan",
      cat: "职业",
      title: "走 货",
      era: "ming",
      age: [18, 55],
      class: ["merchant", "gentry"],
      weight: 28,
      when: { minSilver: 30 },
      text: [
        "有人邀你合伙走一趟：贩布到临清，回头带枣和棉花。来回四个月。",
        "本钱三十两，回来能翻一倍。路上要过两个税关，还要防着山里的响马。"
      ],
      options: [
        {
          text: "走",
          hint: "银钱 −30 两；回来翻倍，回不来就没了",
          need: { minSilver: 30 },
          effects: [{ k: "silver", v: -30 }],
          gamble: {
            winChance: 0.6,
            win: [{ k: "silver", v: 62 }, { k: "knowledge", v: 4 }],
            winNote: "四个月后你回来了，瘦了一圈，银子多了一倍。",
            loseNote: "在清河县外遇了响马。货没了，人跑了出来。",
            lose: [{ k: "body", v: -8 }, { k: "fame", v: -4 }]
          }
        },
        {
          text: "只搭一小股",
          hint: "银钱 −10 两；赚得少，赔得也少",
          need: { minSilver: 10 },
          effects: [{ k: "silver", v: -10 }],
          gamble: {
            winChance: 0.6,
            win: [{ k: "silver", v: 20 }],
            winNote: "分到手二十两。不多，但踏实。",
            loseNote: "那一趟赔了。你分到三匹布，自己穿了一匹。",
            lose: [{ k: "grain", v: 2 }]
          }
        },
        {
          text: "不走，在家等",
          hint: "什么也不做",
          effects: [{ k: "fame", v: -1 }],
          then: "他们走了。回来时，有一个人的腿没了。"
        }
      ]
    },

    {
      id: "ming.work.irrigate",
      cat: "职业",
      title: "修 渠",
      era: "ming",
      age: [22, 60],
      class: ["farmer", "gentry", "tenant"],
      weight: 26,
      when: { minFieldWet: 5 },
      text: [
        "村东的水渠淤了三年。今年再不修，上游的地就要旱死。",
        "修渠要出人出力，还要占两家的地。族里开会，吵了一夜。"
      ],
      options: [
        {
          text: "出钱牵头修",
          hint: "银钱 −12 两，声望 +12；往后三年你的田不缺水",
          need: { minSilver: 12 },
          effects: [{ k: "silver", v: -12 }, { k: "fame", v: 12 }, { k: "favor", v: 10 },
                    { k: "flag", v: "canal" }],
          then: "渠修了四十天。通水那天，全村的人都站在田埂上看。"
        },
        {
          text: "出工，不出钱",
          hint: "身体 −8；你在渠里挖了二十天泥",
          effects: [{ k: "body", v: -4 }, { k: "fame", v: 5 }],
          then: "你挖了二十天。手上起了新的茧，旧的还没掉。"
        },
        {
          text: "不管，各人顾各人",
          hint: "声望 −6；上游的人记恨你",
          effects: [{ k: "fame", v: -6 }, { k: "grudge", v: 5 }],
          then: "那年夏天，你的田裂了。上游的水从别人的地里过，一滴也没到你这里。"
        }
      ]
    },

    {
      id: "ming.work.land_grab",
      cat: "世情",
      title: "夺 田",
      era: "ming",
      age: [20, 65],
      class: ["farmer", "tenant"],
      weight: 24,
      when: { minFieldWet: 3 },
      text: [
        "县里致仕的刘进士家要扩坟地，看中了你家靠河的那三亩。",
        "刘家的管家来说：按官价，一亩三两。你若不肯，他就提一句「你家去年的税好像没交齐」。"
      ],
      options: [
        {
          text: "卖",
          hint: "水田 −3 亩，银钱 +9 两；地没了，事也没了",
          effects: [{ k: "field_wet", v: -3 }, { k: "silver", v: 9 }, { k: "fame", v: -6 }],
          then: "你签了契。管家走时说：识相。你在田埂上坐到天黑。"
        },
        {
          text: "不卖，去告",
          hint: "银钱 −4 两（讼费）；告赢了地是你的，告输了连人也搭进去",
          need: { minSilver: 4 },
          effects: [{ k: "silver", v: -4 }, { k: "grudge", v: 10 }],
          gamble: {
            winChance: 0.35,
            win: [{ k: "fame", v: 14 }, { k: "flag", v: "won_case" }],
            winNote: "知县批了「不准」。刘家退了。你回家那天，村里有人给你送了鸡蛋。",
            loseNote: "知县把状子压下了。三个月后，你的地被判给了刘家，说是「自愿投献」。",
            lose: [{ k: "field_wet", v: -3 }, { k: "fame", v: -8 }, { k: "body", v: -5 }]
          }
        },
        {
          text: "把地挂到刘家门下，求个庇护",
          hint: "水田 −3 亩（名义），银钱 +2 两/年；从此是佃户",
          effects: [{ k: "field_wet", v: -3 }, { k: "silver", v: 2 }, { k: "fame", v: -10 },
                    { k: "flag", v: "land_shelter" }],
          then: "地还是你种，租子交给刘家。你从自耕农变成了佃户，只用了半天。"
        }
      ]
    },

    {
      id: "ming.work.corvee",
      cat: "赋役",
      title: "起 夫",
      era: "ming",
      age: [16, 58],
      sex: "male",
      class: ["farmer", "tenant", "base"],
      weight: 34,
      text: [
        "县里要修城墙，起夫三百。里长拿着册子来点名，点到你了。",
        "去的话，自带干粮，做四十天，一天给两文钱。不去，折银一两二钱。"
      ],
      options: [
        {
          text: "去",
          hint: "银钱 +0.08 两，身体 −14；四十天不在家",
          effects: [{ k: "silver", v: 0.08 }, { k: "body", v: -7 }, { k: "fame", v: 3 }],
          then: "你抬了四十天的石头。回来时，肩膀上的皮脱了一层。"
        },
        {
          text: "折银",
          hint: "银钱 −1.2 两；钱能买命",
          need: { minSilver: 1.2 },
          effects: [{ k: "silver", v: -1.2 }, { k: "fame", v: -2 }],
          then: "你把一两二钱银子交给里长。他说：你这人精明。"
        },
        {
          text: "逃役",
          hint: "声望 −8；被抓到要枷号示众",
          effects: [{ k: "fame", v: -8 }, { k: "grudge", v: 6 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "body", v: 2 }],
            winNote: "你在亲戚家躲了四十天。没人来找。",
            loseNote: "第十天被拿了回去。枷在县衙门口三天，路过的人都看。",
            lose: [{ k: "body", v: -10 }, { k: "fame", v: -10 }]
          }
        }
      ]
    },

    {
      id: "ming.work.bandit",
      cat: "世情",
      title: "遇 盗",
      era: "ming",
      age: [18, 70],
      class: [],
      weight: 20,
      when: { minSilver: 10 },
      text: [
        "你从集上回来，天已经黑了。半路上跳出三个人，手里拿着棍。",
        "为首的说：留下钱，不留命。"
      ],
      options: [
        {
          text: "给钱",
          hint: "银钱 −(身上大半)；破财免灾",
          effects: [{ k: "silver", v: -10 }, { k: "fame", v: -3 }],
          then: "你把褡裢扔过去。他们数了数，说了句「算你识相」。"
        },
        {
          text: "打",
          hint: "身体 −15；打赢了钱保住，打输了更惨",
          effects: [{ k: "body", v: -8 }],
          gamble: {
            winChance: 0.45,
            win: [{ k: "fame", v: 10 }, { k: "martial", v: 5 }, { k: "silver", v: 3 }],
            winNote: "你打断了其中一个的胳膊。另外两个跑了。你捡回了自己的褡裢，还多了一个。",
            loseNote: "三个人一起上。你醒来时天快亮了，身上什么也没有。",
            lose: [{ k: "silver", v: -18 }, { k: "body", v: -5 }]
          }
        },
        {
          text: "跑",
          hint: "身体 −6；跑得掉是命，跑不掉是另一种命",
          effects: [{ k: "body", v: -3 }],
          gamble: {
            winChance: 0.6,
            win: [],
            winNote: "你往田里跑，钻过两道篱笆。他们没追。",
            loseNote: "你被绊倒了。他们按住你，把鞋也扒走了。",
            lose: [{ k: "silver", v: -12 }, { k: "fame", v: -4 }]
          }
        }
      ]
    },

    {
      id: "ming.work.son_school",
      cat: "家族",
      title: "开 蒙",
      era: "ming",
      age: [26, 50],
      class: [],
      weight: 30,
      once: true,
      when: { minSilver: 3 },
      text: [
        "儿子六岁了。你带他去见塾师，先生看了看他的手，说：这手能握笔。",
        "束脩一年三两，另加节礼。"
      ],
      options: [
        {
          text: "供他读书",
          hint: "银钱 −3 两/年；这一条路你看不见尽头",
          effects: [{ k: "silver", v: -3 }, { k: "fame", v: 6 }, { k: "flag", v: "son_school" }],
          then: "你给他买了第一方砚。他磨墨磨了半宿，不肯睡。"
        },
        {
          text: "让他学门手艺",
          hint: "银钱 +1 两；三年出师，一辈子有饭吃",
          effects: [{ k: "silver", v: 1 }, { k: "fame", v: 2 }, { k: "flag", v: "son_craft" }],
          then: "你把他送到城里的铁匠铺。他走的时候没哭，你回头时哭了。"
        },
        {
          text: "留在家里种地",
          hint: "身体 +2；田里多一双手",
          effects: [{ k: "body", v: 2 }, { k: "flag", v: "son_farm" }],
          then: "他十岁就能扶犁。你看着他，想起自己十岁的时候。"
        }
      ]
    },

    {
      id: "ming.work.teach",
      cat: "职业",
      title: "设 馆",
      era: "ming",
      age: [22, 60],
      class: ["gentry", "official_mid"],
      weight: 30,
      once: true,
      when: { minKnowledge: 25, flagNot: ["juren"] },
      text: [
        "屡试不中，你在自家厢房开了个{{蒙馆|私塾}}，收了七个童生。",
        "一年束脩共四两二钱，另有节礼。学生从六岁到十四岁不等。"
      ],
      options: [
        {
          text: "安心教书",
          hint: "银钱 +4 两/年，声望 +8；一辈子清苦，也一辈子有人记得",
          effects: [{ k: "silver", v: 4 }, { k: "fame", v: 8 }, { k: "line", v: "exam" }],
          then: "你教了三十年。后来县里修志，你的名字在「儒林」一栏里，四个字。"
        },
        {
          text: "边教边考",
          hint: "学识 +6；心力交瘁，但还有一线",
          effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: 3 }, { k: "body", v: -3 }],
          then: "白天教人，夜里读书。油灯点到三更，第二天照样上堂。"
        },
        {
          text: "改行，去做幕",
          hint: "银钱 +15 两；给官员做师爷，比教书强",
          effects: [{ k: "silver", v: 15 }, { k: "knowledge", v: 4 }, { k: "line", v: "clerk" }],
          then: "你替一位知县管刑名。第一次判人杖二十，回去吐了。"
        }
      ]
    },

    {
      id: "ming.work.grain_hoard",
      cat: "职业",
      title: "囤 粮",
      era: "ming",
      age: [20, 65],
      class: ["merchant", "gentry", "farmer"],
      weight: 26,
      when: { minSilver: 15 },
      text: [
        "今年大熟，米价跌到三钱一石，是十年里最低的。",
        "仓里还空着一半。有人说，明年北边要打仗，粮价必涨。"
      ],
      options: [
        {
          text: "倾家囤粮",
          hint: "银钱 −(大半)，存粮 +；赌明年",
          effects: [{ k: "silver", v: -15 }, { k: "grain", v: 22 }],
          gamble: {
            winChance: 0.5,
            win: [{ k: "silver", v: 70 }],
            winNote: "第二年春天青黄不接，米价涨到八钱。你开仓，三天卖完。",
            loseNote: "第二年又是大熟。你的粮压在仓里，出了虫。",
            lose: [{ k: "grain", v: -10 }, { k: "fame", v: -4 }]
          }
        },
        {
          text: "少囤一点",
          hint: "银钱 −6 两，存粮 +8 石；不贪，也不亏",
          effects: [{ k: "silver", v: -6 }, { k: "grain", v: 8 }],
          then: "你囤了八石。后来涨了点，你卖了，赚了三两。"
        },
        {
          text: "趁贱卖给官府备仓",
          hint: "银钱 +2 两，声望 +6；官仓的人会记得你",
          effects: [{ k: "silver", v: 2 }, { k: "fame", v: 6 }, { k: "official", v: 4 }],
          then: "县丞在仓门口见了你一面，说：你是个好人。"
        }
      ]
    },

    {
      id: "ming.work.daughter",
      cat: "家族",
      title: "嫁 女",
      era: "ming",
      age: [30, 60],
      class: [],
      weight: 24,
      once: true,
      text: [
        "女儿十六了。来说亲的有三家：一家是城里的绸缎商，一家是乡下的秀才，一家是邻村的富农。",
        "妻子说秀才体面。祖母说商人有钱。"
      ],
      options: [
        {
          text: "许给秀才",
          hint: "声望 +12，银钱 −6 两（陪嫁）；他日或有出头",
          effects: [{ k: "fame", v: 12 }, { k: "silver", v: -6 }, { k: "flag", v: "daughter_scholar" }],
          then: "陪嫁是十二抬。女婿中了举人，是七年后的事。"
        },
        {
          text: "许给商人",
          hint: "银钱 +18 两（聘财）；乡里会说你卖女儿",
          effects: [{ k: "silver", v: 18 }, { k: "fame", v: -8 }],
          then: "聘财十八两。你收了，族里的老人在背后说了一句「不像话」。"
        },
        {
          text: "许给富农，离得近",
          hint: "银钱 +6 两，声望 +2；女儿能常回来看",
          effects: [{ k: "silver", v: 6 }, { k: "fame", v: 2 }, { k: "favor", v: 6 }],
          then: "嫁过去三天回门。她带了一篮子鸡蛋，说是自己家鸡下的。"
        }
      ]
    },

    /* ══ 回响 ═════════════════════════════════════ */
    {
      id: "ming.memory.marriage_up",
      cat: "家族",
      title: "回　话",
      era: "ming",
      age: [14, 30],
      hidden: true,
      weight: 1,
      text: [
        "典史家回了话：亲事可以议，但要再加十两，另要你家里出一份「谢媒」。",
        "他家的意思很明白：高攀，是要付钱的。"
      ],
      options: [
        {
          text: "再加十两",
          hint: "银钱 −10 两，声望 +8；这门亲事成了",
          need: { minSilver: 10 },
          effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 },
                    { k: "addPerson", v: { name: "典史之女", role: "wife", rel: "妻", age: 15 } },
                    { k: "flag", v: "married" }],
          then: "成亲那天来了半个县衙的人。你岳父在席上说：往后是一家人了。"
        },
        {
          text: "作罢",
          hint: "银钱 −10 两（前次的银子要不回来），声望 −3",
          effects: [{ k: "silver", v: -10 }, { k: "fame", v: -3 }],
          then: "你父亲去要过两趟，都被挡在门外。"
        }
      ]
    },

    {
      id: "ming.office.impeach",
      cat: "职业",
      title: "被 参",
      era: "ming",
      age: [24, 65],
      hidden: true,
      weight: 1,
      text: [
        "有人把你参了。折子上写的是「贪酷」，附了三条实据，其中两条是真的。",
        "巡抚的批语压了半个月，还没下来。"
      ],
      options: [
        {
          text: "打点上官，把事压下去",
          hint: "银钱 −80 两；压得住就压住了",
          need: { minSilver: 80 },
          effects: [{ k: "silver", v: -80 }, { k: "official", v: -6 }, { k: "grudge", v: 6 }],
          then: "银子送出去，折子留中不发。你在任上又待了两年。"
        },
        {
          text: "上疏自辩",
          hint: "官声 +12；也可能越辩越糟",
          effects: [{ k: "official", v: 12 }],
          gamble: {
            winChance: 0.4,
            win: [{ k: "fame", v: 10 }],
            winNote: "你的辩疏写得清楚，部里驳了原参。此后有人称你「硬」。",
            loseNote: "辩疏递上去，落了个「饰非」。革职为民。",
            lose: [{ k: "grade", v: 0 }, { k: "fame", v: -10 }, { k: "official", v: -20 }]
          }
        },
        {
          text: "辞官归里",
          hint: "官品归零，声望 +6；保全了体面",
          effects: [{ k: "grade", v: 0 }, { k: "fame", v: 6 }, { k: "official", v: 8 }],
          then: "你交了印，回乡下修了间书房。有人替你可惜，你自己不觉得。"
        }
      ]
    },

    {
      id: "ming.gang.trouble",
      cat: "世情",
      title: "收 账",
      era: "ming",
      age: [16, 34],
      hidden: true,
      weight: 1,
      text: [
        "赵某叫你带两个人去收一笔账。欠钱的是个寡妇，男人死了三年，留下两个孩子。",
        "赵某说：不给就搬东西。"
      ],
      options: [
        {
          text: "照做",
          hint: "银钱 +3 两，声望 −10；你会记很久",
          effects: [{ k: "silver", v: 3 }, { k: "fame", v: -10 }, { k: "grudge", v: 8 }],
          then: "你们搬走了她家的两口锅和一床被子。孩子一直在哭。"
        },
        {
          text: "自己垫钱，把账平了",
          hint: "银钱 −5 两，声望 +8；赵某会不高兴",
          need: { minSilver: 5 },
          effects: [{ k: "silver", v: -5 }, { k: "fame", v: 8 }, { k: "favor", v: -8 }],
          then: "你把银子给赵某，说是她凑的。赵某看了你一眼，没说话。"
        },
        {
          text: "不干了",
          hint: "声望 +5，仇怨 +12；这一行不是想退就退的",
          effects: [{ k: "fame", v: 5 }, { k: "grudge", v: 12 }, { k: "flag", v: "left_gang" }],
          then: "你把腰牌扔在桌上。赵某说：你想清楚了。"
        }
      ]
    },

    {
      id: "ming.great.ningwang_after",
      cat: "大事",
      title: "宁 王 败",
      era: "ming",
      age: [12, 70],
      hidden: true,
      weight: 1,
      text: [
        "宁王败了，被擒于鄱阳湖。朝廷的兵开始清查从逆的人。",
        "名单上有名字的，一律拿问。你听说邻县已经抓了三十几个。"
      ],
      options: [
        {
          text: "自首，说是被胁从",
          hint: "银钱 −30 两（赎罪），声望 −12；命保住了",
          need: { minSilver: 30 },
          effects: [{ k: "silver", v: -30 }, { k: "fame", v: -12 }, { k: "official", v: 6 }],
          then: "你在县衙跪了半日。知县批了「胁从罔治」，罚银三十两。"
        },
        {
          text: "逃",
          hint: "田产抄没，身体 −15；从此没有籍贯",
          effects: [{ k: "field_wet", v: -99 }, { k: "field_dry", v: -99 },
                    { k: "body", v: -8 }, { k: "fame", v: -20 }, { k: "flag", v: "fugitive" }],
          then: "你连夜走了。后来在邻省的一个镇上落脚，改了口音，改了姓。"
        },
        {
          text: "花钱找个替身",
          hint: "银钱 −45 两；有人替你顶了这个名字",
          need: { minSilver: 45 },
          effects: [{ k: "silver", v: -45 }, { k: "fame", v: -6 }, { k: "grudge", v: 10 }],
          then: "顶你名字的那个人被流了三千里。你后来每年给他家送两石米。"
        }
      ]
    },
    /* ══ 生养 ═════════════════════════════════════ */
    {
      id: "ming.family.child2",
      cat: "家族",
      title: "又 添 一 口",
      era: "ming",
      age: [24, 44],
      class: [],
      weight: 40,
      once: true,
      when: { flagHas: ["married"] },
      text: [
        "又有了。夜里发动的，稳婆来得慢，母亲在灶间烧了一夜的水。",
        "天亮时孩子出来了。稳婆说：是个男的。你听见屋里有人哭，也有人在笑。"
      ],
      options: [
        {
          text: "办满月",
          hint: "银钱 −2 两，声望 +8；礼金收得回来一部分",
          need: { minSilver: 2 },
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: 8 },
                    { k: "addPerson", v: { name: "", role: "child", rel: "子", age: 0 } }],
          then: "来了三十几个人。礼金四两二钱，扣掉酒席，还余一两。"
        },
        {
          text: "不办，省下钱",
          hint: "声望 −3；孩子照样养",
          effects: [{ k: "fame", v: -3 },
                    { k: "addPerson", v: { name: "", role: "child", rel: "子", age: 0 } }],
          then: "族里有人说你小气。你妻子说：日子是自己过的。"
        }
      ]
    },

    {
      id: "ming.family.birth_risk",
      cat: "身体",
      title: "临 盆",
      era: "ming",
      age: [18, 42],
      sex: "female",
      class: [],
      weight: 34,
      once: true,
      when: { flagHas: ["married"] },
      text: [
        "孩子足月了。稳婆来看过，说胎位不太正，但还能生。",
        "母亲把生产用的一应用物都备好了：草纸、旧布、剪刀、一盏油灯。",
        "她私下跟你说：若是不好，先保小的。你没答。"
      ],
      options: [
        {
          text: "请郎中在旁守着",
          hint: "银钱 −3 两；多一分活命的机会",
          need: { minSilver: 3 },
          effects: [{ k: "silver", v: -3 }, { k: "body", v: -4 },
                    { k: "addPerson", v: { name: "", role: "child", rel: "子", age: 0 } }],
          then: "生了一夜。天亮时孩子哭了，你也还醒着。"
        },
        {
          text: "照老规矩，只请稳婆",
          hint: "身体 −14；这是大多数人的命",
          effects: [{ k: "body", v: -7 },
                    { k: "addPerson", v: { name: "", role: "child", rel: "子", age: 0 } }],
          gamble: {
            winChance: 0.94,
            win: [],
            winNote: "生下来了。你在炕上躺了半个月才能下地。",
            loseNote: "血止不住。稳婆出去洗手，回来时没说话。",
            lose: [],
            deathChance: 0.06,
            cause: "产育"
          }
        },
        {
          text: "去庙里求，喝催生符水",
          hint: "银钱 −0.2 两，身体 −18；求个心安",
          effects: [{ k: "silver", v: -0.2 }, { k: "body", v: -9 }, { k: "fame", v: 2 },
                    { k: "addPerson", v: { name: "", role: "child", rel: "子", age: 0 } }],
          gamble: {
            winChance: 0.9,
            win: [],
            winNote: "符水喝了三碗。孩子是第二天早上生的，哭声很响。",
            loseNote: "孩子生下来了，你没挺过去。",
            lose: [],
            deathChance: 0.1,
            cause: "产育"
          }
        }
      ]
    },
    {
      id: "ming.child.grow",
      cat: "家族",
      title: "儿子长成了",
      era: "ming",
      age: [38, 62],
      class: [],
      weight: 28,
      once: true,
      when: { flagHas: ["married"] },
      text: [
        "儿子十六了，个子比你高半个头。他把一碗饭推到你面前，说：爹，我想出去闯。",
        "他说的是去城里，跟着一个远房表叔跑布。"
      ],
      options: [
        {
          text: "让他去",
          hint: "银钱 −5 两（本钱）；三年后或有出息",
          need: { minSilver: 5 },
          effects: [{ k: "silver", v: -5 }, { k: "fame", v: 4 }],
          schedule: [{ inYears: 3, effects: [{ k: "silver", v: 14 }, { k: "fame", v: 6 }], note: "儿子从城里回来，带回了十四两" }],
          then: "他走的那天背着一个小包袱。你送到村口，说了句：别学坏。"
        },
        {
          text: "留在家里",
          hint: "身体 +2；田里多个帮手",
          effects: [{ k: "body", v: 2 }, { k: "fame", v: -2 }],
          then: "他留下了。此后二十年，他一直在你身边，也一直在你底下。"
        },
        {
          text: "供他去考",
          hint: "银钱 −10 两；若有出息，是全家的事",
          need: { minSilver: 10 },
          effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }],
          gamble: {
            winChance: 0.3,
            win: [{ k: "fame", v: 20 }, { k: "flag", v: "son_pass" }],
            winNote: "他中了秀才。报喜的人来那天，你正在地里，鞋都没穿就跑回来了。",
            loseNote: "考了三场，一场没中。他后来不再提这件事。",
            lose: [{ k: "fame", v: -4 }]
          }
        }
      ]
    },
    /* ══ 中年 ═════════════════════════════════════ */
    {
      id: "ming.mid.lineage",
      cat: "家族",
      title: "族 议",
      era: "ming",
      age: [30, 60],
      class: ["gentry", "farmer", "merchant", "official_mid"],
      weight: 22,
      once: true,
      when: { minFame: 10 },
      text: [
        "族里要修祠堂。老的梁已经朽了，下雨天漏水。",
        "族长说，按房头摊钱，你这一房该出六两。有人不肯出，说祠堂漏了也不漏到自己头上。"
      ],
      options: [
        {
          text: "按数出",
          hint: "银钱 −6 两，声望 +10；族中从此拿你当体面人",
          need: { minSilver: 6 },
          effects: [{ k: "silver", v: -6 }, { k: "fame", v: 10 }, { k: "favor", v: 8 }],
          then: "上梁那天你在场。族长把第一块砖递给你。"
        },
        {
          text: "多出一份，把名字刻在碑上",
          hint: "银钱 −15 两，声望 +18；碑上有名，是要被子孙看的",
          need: { minSilver: 15 },
          effects: [{ k: "silver", v: -15 }, { k: "fame", v: 18 }, { k: "favor", v: 12 }],
          then: "碑上你的名字排在第三。你去看过两次，第二次是自己一个人去的。"
        },
        {
          text: "不出，说家里也紧",
          hint: "声望 −8，仇怨 +6；此后族中议事，没人叫你",
          effects: [{ k: "fame", v: -8 }, { k: "grudge", v: 6 }],
          then: "族长看了你一眼，说：知道了。"
        }
      ]
    },

    {
      id: "ming.mid.exam_again",
      cat: "职业",
      title: "再 考",
      era: "ming",
      age: [28, 50],
      class: ["gentry"],
      weight: 20,
      once: true,
      when: { flagHas: ["shengyuan"], flagNot: ["juren"] },
      text: [
        "又是{{乡试|每三年一次，逢子午卯酉年在省城}}之年。你三十几了，同案的人已经有人中了。",
        "盘缠要四两，路上来回一个月。妻子把嫁妆里的银镯子拿了出来。"
      ],
      options: [
        {
          text: "再去一次",
          hint: "银钱 −4 两，学识 +4；中了就换一条路",
          effects: [{ k: "silver", v: -4 }, { k: "knowledge", v: 4 }],
          resolve: "examPass",
          params: { base: 0.06, perKnowledge: 0.005, cap: 0.34, onPass: ["juren"] }
        },
        {
          text: "不考了，安心教书",
          hint: "声望 +4；承认自己到这为止",
          effects: [{ k: "fame", v: 4 }, { k: "line", v: "exam" }],
          then: "你把书箱收进柜子。此后三十年，你教别人去考。"
        },
        {
          text: "花钱捐个监生",
          hint: "银钱 −120 两；不必考，也有了出身",
          need: { minSilver: 120 },
          effects: [{ k: "silver", v: -120 }, { k: "fame", v: 10 }, { k: "grade", v: 8 },
                    { k: "flag", v: "jiansheng" }],
          then: "你捐了监生，授了一个八品的小官。有人说这是拿钱买的，你听见了，没反驳。"
        }
      ]
    },

    {
      id: "ming.mid.lend",
      cat: "职业",
      title: "讨 债",
      era: "ming",
      age: [30, 58],
      class: [],
      weight: 18,
      when: { minSilver: 40 },
      text: [
        "三年前借出去的那八两银子，对方一直没还。今年他家盖了新房。",
        "他见了你还是笑，说：明年，明年一定。"
      ],
      options: [
        {
          text: "上门去要",
          hint: "银钱 +8 两，仇怨 +8；钱要回来了，人也得罪了",
          effects: [{ k: "silver", v: 8 }, { k: "grudge", v: 8 }, { k: "fame", v: 2 }],
          then: "你把借据拍在他家桌上。他数了钱，一句话没说。"
        },
        {
          text: "算了",
          hint: "声望 +3；这钱就当买个清静",
          effects: [{ k: "fame", v: 3 }, { k: "silver", v: -8 }],
          then: "你走的时候，他送到门口，说：你是个厚道人。"
        },
        {
          text: "告到县里",
          hint: "银钱 −2 两（讼费），仇怨 +12；能不能判看衙门",
          need: { minSilver: 2 },
          effects: [{ k: "silver", v: -2 }, { k: "grudge", v: 12 }],
          gamble: {
            winChance: 0.55,
            win: [{ k: "silver", v: 10 }, { k: "fame", v: 6 }],
            winNote: "知县判了限期归还。他当堂数了钱，手在抖。",
            loseNote: "知县说「证据不足」。你回家路上想了一路，也没想明白。",
            lose: [{ k: "fame", v: -4 }]
          }
        }
      ]
    },

    {
      id: "ming.mid.son_wed",
      cat: "家族",
      title: "为 子 娶 亲",
      era: "ming",
      age: [40, 62],
      class: [],
      weight: 20,
      once: true,
      when: { flagHas: ["married"] },
      text: [
        "儿子二十了。来说亲的是镇上一户开油坊的，要聘财十六两，另要一副银首饰。",
        "妻子说：这价钱在县里算中等。"
      ],
      options: [
        {
          text: "应下",
          hint: "银钱 −16 两，声望 +8；家里添一口人",
          need: { minSilver: 16 },
          effects: [{ k: "silver", v: -16 }, { k: "fame", v: 8 }, { k: "favor", v: 10 }],
          then: "成亲那天摆了十二桌。你喝了两杯，就去后院坐着了。"
        },
        {
          text: "还价，压到十两",
          hint: "银钱 −10 两；省了钱，对方记住了",
          effects: [{ k: "silver", v: -10 }, { k: "fame", v: -3 }, { k: "grudge", v: 4 }],
          then: "媒人来回跑了四趟。最后是十两，首饰减了一副。"
        },
        {
          text: "再等等",
          hint: "声望 −4；儿子二十四岁还没成家",
          effects: [{ k: "fame", v: -4 }],
          then: "那家的女儿第二年许给了别人。你儿子从此不太跟你说话。"
        }
      ]
    },

    {
      id: "ming.mid.friend",
      cat: "世情",
      title: "故 人",
      era: "ming",
      age: [32, 62],
      class: [],
      weight: 20,
      once: true,
      text: [
        "一个多年不见的人找上门。你认出他是小时候一起在河里摸鱼的那个，姓周。",
        "他瘦得厉害，说是从北边逃回来的，家里没人了，想借点钱做个小本生意。"
      ],
      options: [
        {
          text: "留下他，管吃管住",
          hint: "银钱 −6 两，恩义 +14；多一个能托付事的人",
          need: { minSilver: 6 },
          effects: [{ k: "silver", v: -6 }, { k: "favor", v: 14 }, { k: "fame", v: 6 }],
          then: "他在你家住了半年，后来在镇上开了个磨坊。每年年节都来。"
        },
        {
          text: "给他二两，送他走",
          hint: "银钱 −2 两，声望 +2；尽了心，也就这样",
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }, { k: "favor", v: 4 }],
          then: "他接了钱，说了三声谢，走了。此后没再来过。"
        },
        {
          text: "装作不认得",
          hint: "声望 −6；他站在门口看了你很久",
          effects: [{ k: "fame", v: -6 }, { k: "favor", v: -10 }],
          then: "你说：你认错人了。他愣了一下，说：是我认错了。"
        }
      ]
    },

    {
      id: "ming.mid.land_buy",
      cat: "职业",
      title: "买 田",
      era: "ming",
      age: [28, 62],
      class: ["farmer", "gentry", "merchant"],
      weight: 24,
      when: { minSilver: 40 },
      text: [
        "邻村一户人要迁走，急着卖地，十二亩水田，一亩开价十两——比市价低两成。",
        "但地契上有两处写得不清楚，将来怕有麻烦。"
      ],
      options: [
        {
          text: "买",
          hint: "银钱 −120 两，水田 +12 亩；便宜有便宜的道理",
          need: { minSilver: 120 },
          effects: [{ k: "silver", v: -120 }, { k: "field_wet", v: 12 }, { k: "fame", v: 6 }],
          gamble: {
            winChance: 0.72,
            win: [],
            winNote: "地是好地。第二年收了四十石。",
            loseNote: "第二年他家侄子来告，说这地是族产，不能卖。官司打了两年，判了一半给他。",
            lose: [{ k: "field_wet", v: -6 }, { k: "silver", v: -8 }, { k: "fame", v: -6 }]
          }
        },
        {
          text: "只买一半，把契写清",
          hint: "银钱 −60 两，水田 +6 亩；稳一点",
          need: { minSilver: 60 },
          effects: [{ k: "silver", v: -60 }, { k: "field_wet", v: 6 }, { k: "fame", v: 4 }],
          then: "你请了里正作中，契上写明四至。后来果然没有麻烦。"
        },
        {
          text: "不买",
          hint: "什么也不做；钱还在手里",
          effects: [],
          then: "那块地让本村的富户买去了。三年后涨到一亩十四两。"
        }
      ]
    }
  ]
};
