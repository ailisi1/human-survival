/* 生在何朝 · 各朝专有事件 卷十七：秦、西汉、新、东汉、三国
 * 这一卷写「人被编进什么地方」：爵、籍、士家、宾客、质任。
 * 秦汉的编法是把人编进爵级与戍役；魏晋是把人编进主家的私门。
 * 编进去有个位置，位置上有代价。
 * 前缀 q9. / w9. / x9. / e9. / s9.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 秦 ══════════ */
  B.eraEvents.qin = (B.eraEvents.qin || []).concat([

    {
      id: "q9.fenyi", cat: "赋役", title: "分异", age: [16, 40], weight: 17, once: true,
      text: [
        "{{分异令|商鞅之法：民有二男以上不分异者，倍其赋}}。你家兄弟两个，都成了家，还住在一个院里。",
        "里正来量了院子，说：「一户两个壮男，赋要加倍。」"
      ],
      options: [
        { text: "分家另住", hint: "赋轻；银钱 −8", effects: [{ k: "silver", v: -8 }, { k: "favor", v: 2 }],
          then: "你在院墙东边起了两间土屋。兄弟俩从此各烧各的灶。" },
        { text: "不分，认加倍", hint: "银钱 −12；一家不散", effects: [{ k: "silver", v: -12 }, { k: "favor", v: 5 }] },
        { text: "把弟弟报成雇工", hint: "赋减；或有查", effects: [{ k: "silver", v: 4 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -10 }, { k: "body", v: -6 }],
            loseNote: "查户的人问了几句，弟弟答不上来。罚了钱，还挨了笞。" } }
      ]
    },

    {
      id: "q9.jue", cat: "军功", title: "爵", age: [17, 50], weight: 16,
      text: [
        "军功以首级计：斩一甲士，赐爵一级，田一顷，宅九亩，庶子一人。",
        "你的伍里已经有人升到{{上造|秦爵第二级}}，走在路上比旁人高一等。"
      ],
      options: [
        { text: "争首级", hint: "身体 −10；或有爵", effects: [{ k: "body", v: -10 }],
          gamble: { winChance: 0.45, win: [{ k: "grade", v: 1 }, { k: "fame", v: 6 }, { k: "silver", v: 6 }], lose: [{ k: "body", v: -8 }, { k: "fame", v: -2 }],
            loseNote: "你冲得比谁都前。回来时手里是空的，肩上多了一道口子。" } },
        { text: "守着自己的伍", hint: "无功；无伤", effects: [{ k: "fame", v: 1 }] },
        { text: "用钱买爵", hint: "银钱 −12；得一爵", effects: [{ k: "silver", v: -12 }, { k: "grade", v: 1 }],
          then: "爵是买来的，册上有，人心里不认。吃饭时没人挨着你坐。" }
      ]
    },

    {
      id: "q9.dichenqie", cat: "官府", title: "隶臣", age: [12, 60], weight: 12,
      text: [
        "族里有人犯了罪，按律「收孥」：妻子没入官，为{{隶臣妾|秦刑徒名，男为隶臣，女为隶妾}}。",
        "官府的文书上写着你家一个女眷的名字。"
      ],
      options: [
        { text: "拿钱赎", hint: "银钱 −14；人留住", effects: [{ k: "silver", v: -14 }, { k: "favor", v: 6 }] },
        { text: "让官府带走", hint: "家里少一人；免祸", effects: [{ k: "favor", v: -8 }, { k: "fame", v: -3 }],
          then: "她被带走那天，把头上的木簪拔下来，塞给了你妹妹。" },
        { text: "去替她", hint: "身体 −12；自己为隶", effects: [{ k: "body", v: -12 }, { k: "fame", v: 6 }, { k: "flag", v: "bond" }] }
      ]
    },

    {
      id: "q9.jiashu", cat: "军旅", title: "木牍", age: [18, 50], weight: 11,
      text: [
        "同伍的人收到一封木牍，是家里托人带来的。他不识字，请你念。",
        "上头写：母病，钱不够，问能不能再寄一点；另问，夏天的衣裳要不要做。"
      ],
      options: [
        { text: "照实念", hint: "他哭了一夜", effects: [{ k: "favor", v: 5 }, { k: "luck", v: -1 }] },
        { text: "把「母病」念成「母安」", hint: "他高兴；你心里沉", effects: [{ k: "favor", v: 3 }, { k: "luck", v: 1 }],
          then: "他笑着说：「那就好。」把木牍贴身收起来，收了一整个冬天。" },
        { text: "帮他写回信，多写一句「钱已寄」", hint: "银钱 −4；替他担了", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 7 }] }
      ]
    },

    {
      id: "q9.zhuixu", cat: "赋役", title: "赘子", age: [18, 40], weight: 10,
      text: [
        "秦法：{{赘婿|入赘女家者，秦时视为贱籍，常先发为戍卒}}与罪人同列，征发先及。",
        "你入赘三年，村里人都知道。今年征戍的名册下来，第一个是你。"
      ],
      options: [
        { text: "去", hint: "身体 −10；家里保住", effects: [{ k: "body", v: -10 }, { k: "favor", v: 3 }] },
        { text: "让妻子去求她父亲", hint: "或有转", effects: [{ k: "favor", v: -2 }],
          gamble: { winChance: 0.3, win: [{ k: "luck", v: 1 }], lose: [{ k: "body", v: -8 }],
            loseNote: "岳父说：「既入我家门，就替我家的役。」" } },
        { text: "逃", hint: "身体 −12；成亡人", effects: [{ k: "body", v: -12 }, { k: "flag", v: "fugitive" }, { k: "favor", v: -6 }] }
      ]
    },

    {
      id: "q9.nihu", cat: "官府", title: "匿户", age: [20, 55], weight: 11,
      text: [
        "县里要重新编户，各人自占：姓名、爵、家口、田宅、牛马，一样不许漏。",
        "你家有个弟弟，十五岁，还没上籍。上了，就要服役。"
      ],
      options: [
        { text: "老实上报", hint: "赋役重；免罪", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 2 }] },
        { text: "瞒下来", hint: "银钱 +4；或有罪", effects: [{ k: "silver", v: 4 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -8 }],
            loseNote: "案比时对了人，少一个。匿户之罪，罚作城旦。" } },
        { text: "报成残疾", hint: "免役；或有验", effects: [{ k: "fame", v: -2 }],
          gamble: { winChance: 0.5, win: [{ k: "silver", v: 3 }], lose: [{ k: "silver", v: -8 }, { k: "body", v: -5 }],
            loseNote: "医官让他走两步。他走得比谁都稳。" } }
      ]
    }
  ]);

  /* ══════════ 西汉 ══════════ */
  B.eraEvents.whan = (B.eraEvents.whan || []).concat([

    {
      id: "w9.fuji", cat: "赋役", title: "傅籍", age: [18, 25], weight: 17, once: true,
      text: [
        "男子二十而{{傅|登记入籍，始服徭役}}，六十而免。今年轮到你了。",
        "同时起的还有{{算赋|成人人口税，一算一百二十钱}}：十五至五十六，每人每年一百二十钱。"
      ],
      options: [
        { text: "照籍服役", hint: "银钱 −8；身体 −4", effects: [{ k: "silver", v: -8 }, { k: "body", v: -4 }] },
        { text: "入粟买复", hint: "银钱 −14；免役", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 3 }],
          then: "捐了六百石，得了{{五大夫|汉爵第九级，可免役}}。村里有人说你有本事。" },
        { text: "报小两岁", hint: "或有查", effects: [{ k: "silver", v: 4 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -10 }, { k: "body", v: -6 }],
            loseNote: "乡啬夫翻出旧籍，对了一回。多算两年赋，另加笞。" } }
      ]
    },

    {
      id: "w9.liangjia", cat: "军功", title: "良家子", age: [18, 35], weight: 13,
      text: [
        "{{良家子|家世清白、非医巫商贾者，汉选为郎、为骑士多出此}}从军，选入羽林，日给酒食，三年可补吏。",
        "你的家世查过了：父不为吏，家不经商，清白。"
      ],
      options: [
        { text: "去", hint: "身体 −6；有前程", effects: [{ k: "body", v: -6 }, { k: "martial", v: 8 }, { k: "official", v: 5 }],
          then: "入营第一天，发的是一匹粟色的马。马比你还瘦。" },
        { text: "不去，守着家里的田", hint: "无得失", effects: [{ k: "field_dry", v: 2 }] },
        { text: "托人举荐做郎", hint: "银钱 −10；或有门", effects: [{ k: "silver", v: -10 }, { k: "favor", v: 5 }],
          gamble: { winChance: 0.4, win: [{ k: "official", v: 8 }, { k: "fame", v: 5 }], lose: [{ k: "favor", v: -3 }],
            loseNote: "举荐的人收了钱，说：「今年名额满了。」" } }
      ]
    },

    {
      id: "w9.heqin", cat: "世变", title: "和亲", age: [14, 22], weight: 10, sex: "female",
      text: [
        "单于来求亲。宗室女不肯去，要找一个人代替，封为公主。",
        "选人的官吏到了县里，看的是容貌和家世。"
      ],
      options: [
        { text: "应选", hint: "远嫁；家里得赏", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 6 }, { k: "favor", v: -6 }],
          then: "车队出了雁门，走了两个月。你此后再没见过中原的树。" },
        { text: "藏起来", hint: "免；家里受责", effects: [{ k: "favor", v: -3 }, { k: "luck", v: 1 }] },
        { text: "让家里去说情", hint: "银钱 −8；或免", effects: [{ k: "silver", v: -8 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "favor", v: -4 }],
            loseNote: "说情的人回来，说：「已经定了。」" } }
      ]
    },

    {
      id: "w9.gengxu", cat: "赋役", title: "过更", age: [20, 55], weight: 12,
      text: [
        "戍边三日，是人人该服的。去不了，出钱三百，叫{{过更|以钱代役}}。",
        "今年轮到你。边在千里外，去一趟三个月。"
      ],
      options: [
        { text: "出钱代役", hint: "银钱 −6；留在家中", effects: [{ k: "silver", v: -6 }] },
        { text: "自己去", hint: "身体 −10；或有功", effects: [{ k: "body", v: -10 }, { k: "martial", v: 4 }],
          then: "走了二十三天到边。烽燧上的日子，除了风没别的。" },
        { text: "找人替", hint: "银钱 −3；或有争", effects: [{ k: "silver", v: -3 }],
          gamble: { winChance: 0.7, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -4 }],
            loseNote: "替的人半路跑了。名册上是你的名字。" } }
      ]
    },

    {
      id: "w9.maijue", cat: "官府", title: "卖爵", age: [20, 60], weight: 10,
      text: [
        "朝廷用兵，缺钱。诏令：入粟边郡六百石，赐爵二级；入奴婢，亦得爵。",
        "县门口贴了告示，围着一圈人看。"
      ],
      options: [
        { text: "入粟买爵", hint: "粮 −12；得爵免役", effects: [{ k: "grain", v: -12 }, { k: "grade", v: 2 }] },
        { text: "把家里的奴献上去", hint: "人少；得爵", effects: [{ k: "grade", v: 1 }, { k: "favor", v: -5 }],
          then: "献上去的那个人，走的时候回头看了你一眼。" },
        { text: "不买", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "w9.binke", cat: "宗族", title: "宾客", age: [18, 55], weight: 11,
      text: [
        "县里的大姓有田千亩，门下养着几十个宾客：管账的、跑腿的、看家的、替人出头的。",
        "有人来问：你去不去？去了，吃他家的饭，替他办事。"
      ],
      options: [
        { text: "去", hint: "银钱 +5；此后听人差遣", effects: [{ k: "silver", v: 5 }, { k: "favor", v: 6 }, { k: "flag", v: "retainer" }],
          then: "你住进他家的东厢。第一件差事是去邻县收一笔旧账。" },
        { text: "不去，自己种田", hint: "穷；自在", effects: [{ k: "fame", v: 2 }] },
        { text: "去，只做账房", hint: "学识 +5；银钱 +4", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = (B.eraEvents.xin || []).concat([

    {
      id: "x9.sishu", cat: "官府", title: "私属", age: [16, 60], weight: 15,
      text: [
        "新法：奴婢改称{{私属|王莽改奴婢曰私属，禁买卖}}，不得买卖。",
        "你家有两个婢，是父亲在世时买的。官府来问：是私属，还是良人？"
      ],
      options: [
        { text: "报为私属", hint: "保住人；不能卖", effects: [{ k: "favor", v: 4 }, { k: "silver", v: -3 }] },
        { text: "放为良人", hint: "少两个劳力；名声好", effects: [{ k: "fame", v: 7 }, { k: "favor", v: -4 }, { k: "grain", v: -6 }],
          then: "她们跪下来磕了头，第二天还是照旧起来烧火。只是不再叫你主人。" },
        { text: "偷偷卖掉", hint: "银钱 +8；或有告", effects: [{ k: "silver", v: 8 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -6 }],
            loseNote: "买主去官府过了契。查下来，是禁买卖的私属。" } }
      ]
    },

    {
      id: "x9.shendai", cat: "市井", title: "赊贷", age: [18, 60], weight: 11,
      text: [
        "{{五均赊贷|王莽设五均官，百姓祭祀丧纪可赊，欲治产业可贷，月息三分}}：办丧事可以赊，做生意可以贷，月息三分。",
        "你母亲刚过世，棺木钱还差八两。"
      ],
      options: [
        { text: "去赊", hint: "银钱 +8；月息三分", effects: [{ k: "silver", v: 8 }, { k: "debt", v: { amt: 10, rate: 0.03, dueYears: 2 } }],
          then: "五均官在册上写了你的名字，问：「几个月还？」你说：「一年。」" },
        { text: "卖田办丧", hint: "田 −3；无债", effects: [{ k: "field_dry", v: -3 }, { k: "fame", v: 4 }] },
        { text: "草草葬了", hint: "省下钱；族里说话", effects: [{ k: "fame", v: -5 }, { k: "silver", v: 2 }] }
      ]
    },

    {
      id: "x9.baohuo", cat: "市井", title: "宝货", age: [18, 65], weight: 11,
      text: [
        "新朝改币：金、银、龟、贝、钱、布，共{{五物六名二十八品|王莽币制，种类繁多，民间难以行用}}。",
        "昨日的一枚大钱，今日只作半枚用。市上的人都不肯收。"
      ],
      options: [
        { text: "把旧钱都换成新钱", hint: "银钱 −6；心里不定", effects: [{ k: "silver", v: -6 }] },
        { text: "藏起旧钱，以物易物", hint: "银钱 +3；市上难行", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -1 }],
          then: "你把两千旧钱埋在灶下。往后半年，买东西都用布和盐。" },
        { text: "趁乱收旧钱", hint: "银钱 −10；或有厚利", effects: [{ k: "silver", v: -10 }],
          gamble: { winChance: 0.35, win: [{ k: "silver", v: 14 }], lose: [{ k: "silver", v: -6 }],
            loseNote: "新钱越改越乱。你收的那一箱，最后连半箱都不值。" } }
      ]
    },

    {
      id: "x9.zhefa", cat: "军旅", title: "谪发", age: [16, 55], weight: 12,
      text: [
        "兵不够，诏令{{谪发|征发罪人、赘婿、贾人、有市籍者从军}}：罪人、赘婿、商人，一律发去边郡。",
        "你家做过几年小买卖，市籍还在。"
      ],
      options: [
        { text: "应发", hint: "身体 −10；离家", effects: [{ k: "body", v: -10 }, { k: "flag", v: "in_army" }] },
        { text: "花钱除市籍", hint: "银钱 −12；免行", effects: [{ k: "silver", v: -12 }] },
        { text: "逃进山", hint: "身体 −12；为亡人", effects: [{ k: "body", v: -12 }, { k: "fame", v: -4 }, { k: "flag", v: "fugitive" }] }
      ]
    },

    {
      id: "x9.liumin", cat: "天灾", title: "就食", age: [12, 65], weight: 11,
      text: [
        "关东大饥，流民几十万入关。官府设{{养赡|王莽时设养赡官，给流民粥食，吏多侵盗}}，粥里掺了土。",
        "你排了两天队，领到一碗。"
      ],
      options: [
        { text: "喝下去", hint: "身体 −4；撑着", effects: [{ k: "body", v: -4 }, { k: "grain", v: 3 }] },
        { text: "去抢粥棚", hint: "或有食；或被打", effects: [],
          gamble: { winChance: 0.4, win: [{ k: "grain", v: 6 }], lose: [{ k: "body", v: -10 }, { k: "fame", v: -3 }],
            loseNote: "守粥的兵拿棍子打过来。你抢到半勺，头上破了个口子。" } },
        { text: "带着家人往南走", hint: "身体 −8；或有活路", effects: [{ k: "body", v: -8 }],
          gamble: { winChance: 0.5, win: [{ k: "grain", v: 5 }], lose: [{ k: "body", v: -6 }, { k: "favor", v: -3 }],
            loseNote: "走到南阳，听说南边也饥。" } }
      ]
    },

    {
      id: "x9.gaomi", cat: "官府", title: "告坐", age: [18, 60], weight: 10,
      text: [
        "{{连坐|新法严苛，一家有罪，邻里连坐}}：邻家私铸钱，被人告了。你们一条巷子都要去问话。",
        "官差说：「知情不告者，同罪。」"
      ],
      options: [
        { text: "照实说", hint: "免罪；邻里怨", effects: [{ k: "favor", v: -6 }, { k: "official", v: 3 }] },
        { text: "说什么都不知道", hint: "或有罪", effects: [{ k: "favor", v: 3 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }],
            loseNote: "差役在巷口打了一个人。打到第三个人，有人说了。" } },
        { text: "拿钱打点", hint: "银钱 −8；保一巷", effects: [{ k: "silver", v: -8 }, { k: "favor", v: 6 }] }
      ]
    }
  ]);

  /* ══════════ 东汉 ══════════ */
  B.eraEvents.ehan = (B.eraEvents.ehan || []).concat([

    {
      id: "e9.mensheng", cat: "官府", title: "门生", age: [18, 50], weight: 15,
      text: [
        "郡太守举你为孝廉。按例，你是他的{{门生|举主与被举者的私属关系，终身相报}}。",
        "他去职回乡那年，你要去送，还要替他守三年心丧。"
      ],
      options: [
        { text: "尽门生之礼", hint: "三年不仕；交游根深", effects: [{ k: "favor", v: 8 }, { k: "fame", v: 5 }, { k: "silver", v: -5 }] },
        { text: "只去送一程", hint: "礼薄；两不得罪", effects: [{ k: "favor", v: 2 }, { k: "official", v: 1 }] },
        { text: "不去", hint: "被士林非议", effects: [{ k: "fame", v: -8 }, { k: "favor", v: -6 }],
          then: "乡里后来传一句话：「某人受举而不报。」你走到哪里都听得到。" }
      ]
    },

    {
      id: "e9.binke", cat: "宗族", title: "宾客", age: [16, 55], weight: 12,
      text: [
        "县中大姓有庄园，田连阡陌，宾客数百家。入了他的门，就不再应官府的徭役。",
        "他家的管事说：「来我家，吃穿不愁，只是要听调遣。」"
      ],
      options: [
        { text: "投他家", hint: "免役；人身归人", effects: [{ k: "grain", v: 8 }, { k: "favor", v: 5 }, { k: "flag", v: "retainer" }],
          then: "你成了他家册上的宾客。官府的徭役册上，你的名字被划掉了。" },
        { text: "不投，自己应役", hint: "身体 −6；自在", effects: [{ k: "body", v: -6 }, { k: "fame", v: 2 }] },
        { text: "投他家，但只做佃", hint: "粮 +5；租重", effects: [{ k: "grain", v: 5 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "e9.duLiao", cat: "军旅", title: "度辽", age: [18, 45], weight: 12,
      text: [
        "{{度辽营|东汉屯于五原的常备边军，多募罪人、减死一等者}}募兵：减死一等，发往五原。",
        "同村有人在那边待过，回来说：「冬天能把耳朵冻掉。」"
      ],
      options: [
        { text: "应募", hint: "身体 −10；银钱 +6", effects: [{ k: "body", v: -10 }, { k: "silver", v: 6 }, { k: "martial", v: 5 }] },
        { text: "不去", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "去，做斥候", hint: "身体 −8；或有功", effects: [{ k: "body", v: -8 }, { k: "martial", v: 8 }],
          gamble: { winChance: 0.5, win: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }], lose: [{ k: "body", v: -8 }],
            loseNote: "雪地里趴了一夜，回来时左脚的三根趾头黑了。" } }
      ]
    },

    {
      id: "e9.maiguan", cat: "官府", title: "西园", age: [25, 60], weight: 10,
      text: [
        "西园卖官：关内侯五百万，县令四百万，可以赊，到任后加倍还。",
        "你家有些积蓄。族里说：「买个县，三年就回本。」"
      ],
      options: [
        { text: "买", hint: "银钱 −14；有官身", effects: [{ k: "silver", v: -14 }, { k: "official", v: 10 }, { k: "grade", v: 2 }],
          then: "印是新的，县是穷的。到任第一天，主簿捧来一叠旧账。" },
        { text: "不买", hint: "无得失", effects: [{ k: "fame", v: 2 }] },
        { text: "买个小吏的缺", hint: "银钱 −6；有差事", effects: [{ k: "silver", v: -6 }, { k: "official", v: 5 }] }
      ]
    },

    {
      id: "e9.hunyue", cat: "家族", title: "逾制", age: [18, 60], weight: 10,
      text: [
        "县里办喜事，嫁妆排了三条街，鼓乐吹了两个时辰。有人报上去，说「逾制」。",
        "官府下文：婚嫁之费，依品秩为限；逾者，罚。"
      ],
      options: [
        { text: "照旧大办", hint: "银钱 −10；名声显", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 6 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -3 }],
            loseNote: "罚是罚了，但乡里都说你家办得体面。" } },
        { text: "俭办", hint: "银钱 −3；被人说小气", effects: [{ k: "silver", v: -3 }, { k: "fame", v: -2 }] },
        { text: "把钱折成田产陪嫁", hint: "田 +3；不招眼", effects: [{ k: "field_dry", v: 3 }, { k: "silver", v: -6 }] }
      ]
    },

    {
      id: "e9.hukou", cat: "赋役", title: "案比", age: [16, 60], weight: 11,
      text: [
        "每年八月{{案比|查验户口、貌阅年龄}}，人都要到县里站着，让吏看一遍。",
        "吏看你一眼，在册上写：「状」——就是相貌相符。"
      ],
      options: [
        { text: "照实", hint: "赋役如常", effects: [{ k: "silver", v: -3 }] },
        { text: "让老人替你去", hint: "或有查", effects: [{ k: "luck", v: 1 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -8 }, { k: "body", v: -4 }],
            loseNote: "吏看了两眼，说：「这不是册上的人。」" } },
        { text: "塞钱让吏写「老」", hint: "银钱 −4；免役", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 1 }] }
      ]
    }
  ]);

  /* ══════════ 三国 ══════════ */
  B.eraEvents.sg = (B.eraEvents.sg || []).concat([

    {
      id: "s9.shijia", cat: "军旅", title: "士家", age: [16, 50], weight: 16,
      text: [
        "{{士家|兵户，世代为兵，另立户籍，不得与民通婚}}之制：入了兵籍，子子孙孙都是兵。",
        "你的名字在兵籍上。父亲也是。祖父也是。"
      ],
      options: [
        { text: "认了", hint: "身体 −6；家口有粮", effects: [{ k: "body", v: -6 }, { k: "grain", v: 6 }, { k: "flag", v: "soldier_house" }] },
        { text: "想办法脱籍", hint: "银钱 −12；或有罪", effects: [{ k: "silver", v: -12 }],
          gamble: { winChance: 0.3, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -12 }, { k: "fame", v: -5 }],
            loseNote: "脱籍的事被人告了。按{{士亡法|兵士逃亡，妻子没为官奴婢}}，先收了你的妻子。" } },
        { text: "让儿子读书，谋个吏职", hint: "学识 +6；希望渺茫", effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -5 }] }
      ]
    },

    {
      id: "s9.tuntian", cat: "营生", title: "民屯", age: [16, 55], weight: 14,
      text: [
        "官府给牛、给种，垦荒田五十亩。收成{{官得六分，民得四分|曹魏民屯分成，用官牛者官六民四}}。",
        "屯田都尉说：「不尽力者，收回田与牛。」"
      ],
      options: [
        { text: "尽力种", hint: "粮 +14；身体 −8", effects: [{ k: "grain", v: 14 }, { k: "body", v: -8 }],
          then: "五十亩收了两百斛。交了一百二十斛，剩下的装满了两个囷。" },
        { text: "藏些私收", hint: "粮 +6；或有查", effects: [{ k: "grain", v: 6 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "grain", v: -10 }, { k: "body", v: -6 }],
            loseNote: "都尉带人来量了田，说：「亩数不对。」" } },
        { text: "把田转租给别人", hint: "粮 +5；清闲", effects: [{ k: "grain", v: 5 }, { k: "favor", v: -2 }] }
      ]
    },

    {
      id: "s9.zhiren", cat: "官府", title: "质任", age: [18, 55], weight: 12,
      text: [
        "{{质任|将领以家属为质，防其叛}}之制：你被授了军职，须送一个儿子到州府居住。",
        "名为「随军读书」，实为质。"
      ],
      options: [
        { text: "送长子去", hint: "得职；父子分离", effects: [{ k: "official", v: 5 }, { k: "favor", v: -6 }],
          then: "他走的时候十一岁，背着一个书箱。箱子里塞了两件旧衣。" },
        { text: "送侄子去", hint: "或有争", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 8 }] },
        { text: "辞官不受", hint: "无质；无前程", effects: [{ k: "fame", v: 3 }, { k: "official", v: -4 }] }
      ]
    },

    {
      id: "s9.guafu", cat: "家族", title: "配", age: [18, 55], weight: 10, sex: "female",
      text: [
        "丈夫死于军中。官府有令：阵亡将士之妻，由官府{{配|指官府将寡妇配与兵士为妻}}与军中无妻者。",
        "来提的是一个都伯，四十岁，脸上有刀疤。"
      ],
      options: [
        { text: "从", hint: "有人养；身不由己", effects: [{ k: "grain", v: 6 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 40 } }, { k: "favor", v: -3 }] },
        { text: "求回娘家", hint: "或有转", effects: [{ k: "favor", v: 2 }],
          gamble: { winChance: 0.35, win: [{ k: "favor", v: 5 }], lose: [{ k: "favor", v: -4 }, { k: "body", v: -4 }],
            loseNote: "官说：「军中无寡妇。」" } },
        { text: "逃", hint: "身体 −10；无家", effects: [{ k: "body", v: -10 }, { k: "flag", v: "runaway" }, { k: "favor", v: -6 }] }
      ]
    },

    {
      id: "s9.hudiao", cat: "赋役", title: "户调", age: [18, 60], weight: 12,
      text: [
        "{{租调制|每亩粟四升，户出绢二匹、绵二斤}}：田租按亩，户调按户。",
        "今年你家要交绢二匹、绵二斤。家里的蚕只结了一匹半的丝。"
      ],
      options: [
        { text: "买绢补足", hint: "银钱 −6；赋清", effects: [{ k: "silver", v: -6 }] },
        { text: "交次等的", hint: "或有退回", effects: [{ k: "silver", v: 3 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -4 }],
            loseNote: "收绢的吏把绢抖开，对着光看，说：「这不成匹。」当场打了你十板。" } },
        { text: "折成钱交", hint: "银钱 −5；吏不肯", effects: [{ k: "silver", v: -5 }, { k: "favor", v: -2 }] }
      ]
    },

    {
      id: "s9.buqu", cat: "军旅", title: "部曲", age: [20, 55], weight: 11,
      text: [
        "大族有{{部曲|私兵，属主将，不属国家}}三千，都是他家佃户出身，战时为兵，平时种田。",
        "你家的田挨着他家的庄子。管事来问：愿不愿意做部曲？"
      ],
      options: [
        { text: "做部曲", hint: "粮 +8；听人调遣", effects: [{ k: "grain", v: 8 }, { k: "martial", v: 6 }, { k: "flag", v: "retainer" }],
          then: "发了一把刀、一面小旗。旗上写着他家的姓。" },
        { text: "不做，保住自家的田", hint: "身体 −4；自在", effects: [{ k: "body", v: -4 }, { k: "fame", v: 2 }] },
        { text: "做，但求不出战", hint: "粮 +4；或仍被点", effects: [{ k: "grain", v: 4 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }],
            loseNote: "点兵那日，册上有你的名字。管事说：「部曲没有不出战的。」" } }
      ]
    }
  ]);

})(window.PACK_BASE);
