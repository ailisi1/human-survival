/* 生在何朝 · 各朝专有事件 卷十九：北宋、南宋、金、元、明
 * 这一卷写「谁被签、谁被括、谁被优免」：宋的青苗与市易，金的签军与括地，
 * 元的站户与驱口，明的卫所与匠班。
 * 官府要做一件事，先得有人出钱、出人、出命。这一卷写的就是被出的那一方。
 * 前缀 b9. / n9. / j9. / y9. / m9.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = (B.eraEvents.bsong || []).concat([

    {
      id: "b9.qingmiao", cat: "赋役", title: "青苗", age: [18, 60], weight: 15,
      text: [
        "{{青苗钱|王安石新法，春贷钱于民，秋收时加息二分归还}}：春间贷钱，秋收还，息二分。",
        "县里的吏说：「贷与不贷，都听你。」册子翻开，笔悬在上头。"
      ],
      options: [
        { text: "贷", hint: "银钱 +8；秋还十分", effects: [{ k: "silver", v: 8 }, { k: "debt", v: { amt: 10, rate: 0.05, dueYears: 1 } }] },
        { text: "不贷", hint: "无债；吏不悦", effects: [{ k: "favor", v: -4 }, { k: "fame", v: 2 }],
          then: "吏在册上写「不愿」。写完看了你一眼，把册子合上了。" },
        { text: "替邻里一并贷了", hint: "银钱 +10；秋天要替人还", effects: [{ k: "silver", v: 10 }, { k: "debt", v: { amt: 14, rate: 0.06, dueYears: 1 } }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "b9.changping", cat: "天灾", title: "常平", age: [16, 65], weight: 12,
      text: [
        "{{常平仓|官仓，丰年籴、歉年粜，以平粮价}}开仓了，一斗三十五文，比市上便宜十文。",
        "仓前挤了三百人，每人限二斗。"
      ],
      options: [
        { text: "排队买", hint: "银钱 −4；粮 +8", effects: [{ k: "silver", v: -4 }, { k: "grain", v: 8 }, { k: "body", v: -2 }] },
        { text: "多排两趟", hint: "银钱 −8；粮 +16", effects: [{ k: "silver", v: -8 }, { k: "grain", v: 16 }, { k: "body", v: -5 }] },
        { text: "买来转卖", hint: "银钱 +5；被人指骂", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -5 }] }
      ]
    },

    {
      id: "b9.shiyi", cat: "市井", title: "市易", age: [20, 60], weight: 11,
      text: [
        "{{市易务|官营商业机构，平价收购滞销货物，也向商人放贷}}：货卖不出去，可以卖给市易务；要本钱，可以向它借。",
        "你手里压着三百匹绢，卖不动。"
      ],
      options: [
        { text: "卖给市易务", hint: "银钱 +6；价低", effects: [{ k: "silver", v: 6 }] },
        { text: "向它借钱囤着", hint: "银钱 +8；息重", effects: [{ k: "silver", v: 8 }, { k: "debt", v: { amt: 10, rate: 0.08, dueYears: 1 } }] },
        { text: "自己降价卖", hint: "银钱 +4；不欠人", effects: [{ k: "silver", v: 4 }] }
      ]
    },

    {
      id: "b9.jinjun", cat: "军旅", title: "禁军", age: [18, 40], weight: 12,
      text: [
        "禁军募兵，刺字于面，月粮二石，春冬衣各一。三年一{{更戍|轮换驻防，兵不识将}}。",
        "募兵的人说：「脸上刺了字，这辈子就是兵了。」"
      ],
      options: [
        { text: "应募", hint: "粮 +8；面上有字", effects: [{ k: "grain", v: 8 }, { k: "martial", v: 6 }, { k: "fame", v: -3 }, { k: "flag", v: "in_army" }] },
        { text: "不应", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "应募，做教头", hint: "粮 +6；教人武艺", effects: [{ k: "grain", v: 6 }, { k: "martial", v: 8 }] }
      ]
    },

    {
      id: "b9.enyin", cat: "官府", title: "恩荫", age: [16, 45], weight: 10,
      text: [
        "{{恩荫|父祖官位得荫子孙入仕，不必科举}}：你父亲有一官半职，按例可荫一子。",
        "荫来的官，多半是监当、主簿一类，品低，但到底是官。"
      ],
      options: [
        { text: "受荫入官", hint: "有官身；被人轻", effects: [{ k: "official", v: 7 }, { k: "fame", v: -3 }],
          then: "到任那天，同僚问：「相公哪一科？」你说：「荫。」他就不问了。" },
        { text: "不受荫，去应举", hint: "学识 +6；前途未定", effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 3 }] },
        { text: "把荫让给弟弟", hint: "兄弟记恩", effects: [{ k: "favor", v: 6 }, { k: "fame", v: 4 }] }
      ]
    },

    {
      id: "b9.taixue", cat: "文事", title: "上书", age: [16, 40], weight: 9,
      text: [
        "太学生上书言事，是这些年常有的事。有人因此得官，也有人因此被遣送回乡。",
        "同舍的人写了一份，要联名。"
      ],
      options: [
        { text: "署名", hint: "或有名；或得罪", effects: [{ k: "fame", v: 4 }, { k: "official", v: 2 }],
          gamble: { winChance: 0.45, win: [{ k: "official", v: 5 }, { k: "fame", v: 6 }], lose: [{ k: "fame", v: -4 }, { k: "knowledge", v: -2 }],
            loseNote: "书上去，人被遣归。行李是同学帮着收拾的。" } },
        { text: "不署名", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "自己另写一份", hint: "学识 +5；或有识者", effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: 2 }] }
      ]
    }
  ]);

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = (B.eraEvents.nsong || []).concat([

    {
      id: "n9.huizi", cat: "市井", title: "会子", age: [18, 65], weight: 14,
      text: [
        "{{会子|南宋纸币，以楮纸印造，可兑铜钱，后多滥发而贬值}}：一贯会子，作钱一贯用。",
        "官府又印了一批。市上的人说：「纸多了，钱就少了。」"
      ],
      options: [
        { text: "照收", hint: "银钱 +3；或有折", effects: [{ k: "silver", v: 3 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -6 }],
            loseNote: "三个月后会子跌到七百文一贯。你手里那叠，薄了一层。" } },
        { text: "只收铜钱", hint: "买卖难做", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }] },
        { text: "拿会子去换米", hint: "粮 +8；快出手", effects: [{ k: "grain", v: 8 }, { k: "silver", v: -2 }] }
      ]
    },

    {
      id: "n9.yibing", cat: "军旅", title: "忠义", age: [16, 50], weight: 12,
      text: [
        "{{忠义军|南宋民间抗敌武装，官府给名号而不给粮}}：官府给一面旗、一个名号，粮自己筹。",
        "乡里推你出来领头。"
      ],
      options: [
        { text: "领", hint: "身体 −8；有名望", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }, { k: "martial", v: 5 }, { k: "troops", v: 200 }] },
        { text: "推给别人", hint: "免祸；被人轻", effects: [{ k: "fame", v: -3 }] },
        { text: "领，但先把粮凑齐", hint: "银钱 −10；队伍稳", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 6 }, { k: "troops", v: 300 }, { k: "morale", v: 10 }] }
      ]
    },

    {
      id: "n9.xuetian", cat: "文事", title: "书院", age: [12, 45], weight: 10,
      text: [
        "县里重修书院，有学田百亩，供生徒饭食。招生二十人，考一场。",
        "先生说：「进来了，读三年，未必中举；不进来，一辈子就这样。」"
      ],
      options: [
        { text: "去考", hint: "学识 +8；或有出身", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -3 }] },
        { text: "不去，帮家里种田", hint: "粮 +6", effects: [{ k: "grain", v: 6 }] },
        { text: "去书院做工，旁听", hint: "学识 +4；身体 −4", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "n9.haichuan", cat: "营生", title: "海船", age: [18, 50], weight: 10,
      text: [
        "泉州有海船出海，一去两年，回来一趟能赚十倍。去的人，二十个回来十二个。",
        "船主在招人：水手、火长、通事。"
      ],
      options: [
        { text: "上船", hint: "银钱 +12；或有不返", effects: [{ k: "silver", v: 12 }, { k: "body", v: -6 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -14 }, { k: "silver", v: -4 }],
            deathChance: 0.5, cause: "溺于海",
            loseNote: "风起时船在浪里横过来。你抓住一根桅，抓了一夜。" } },
        { text: "不入海，在岸上做驳运", hint: "银钱 +4；平安", effects: [{ k: "silver", v: 4 }, { k: "body", v: -3 }] },
        { text: "入海，只跑近洋", hint: "银钱 +6；风险小", effects: [{ k: "silver", v: 6 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "n9.baiyue", cat: "赋役", title: "白役", age: [18, 60], weight: 12,
      text: [
        "县衙缺人，不用正役，用{{白役|不在编制、无工食的差役，由百姓轮充}}：不给工食，只给一张牌。",
        "有这张牌，可以下乡催粮，也可以顺手要点东西。"
      ],
      options: [
        { text: "应白役", hint: "银钱 +5；乡里怨", effects: [{ k: "silver", v: 5 }, { k: "favor", v: -5 }, { k: "official", v: 3 }] },
        { text: "应白役，不取分文", hint: "名声好；白干活", effects: [{ k: "fame", v: 6 }, { k: "body", v: -4 }] },
        { text: "花钱免", hint: "银钱 −6；清净", effects: [{ k: "silver", v: -6 }] }
      ]
    },

    {
      id: "n9.xuetang", cat: "乡里", title: "义庄", age: [25, 65], weight: 9,
      text: [
        "族里有人做官发了财，捐田三百亩立{{义庄|族中共有田产，赡养族人、供子弟读书}}。",
        "管事说：「凡族中子弟，读书的给米，婚丧的给钱。但要在谱上。」"
      ],
      options: [
        { text: "入庄领米", hint: "粮 +10；受族中管", effects: [{ k: "grain", v: 10 }, { k: "favor", v: -2 }] },
        { text: "不入，自己挣", hint: "自在；无米", effects: [{ k: "fame", v: 3 }] },
        { text: "捐一点进去", hint: "银钱 −6；族中敬重", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 6 }, { k: "favor", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = (B.eraEvents.jin || []).concat([

    {
      id: "j9.qianjun", cat: "军旅", title: "签军", age: [16, 50], weight: 16,
      text: [
        "{{签军|金代按户签发汉人丁壮从军，一家有丁即签}}：每户一丁，签发出征。",
        "签的人说：「不去，就以逃论。」"
      ],
      options: [
        { text: "去", hint: "身体 −10；家里少一丁", effects: [{ k: "body", v: -10 }, { k: "flag", v: "in_army" }] },
        { text: "以钱免", hint: "银钱 −12；留家", effects: [{ k: "silver", v: -12 }] },
        { text: "让老父去", hint: "免己；父或死", effects: [{ k: "favor", v: -8 }, { k: "fame", v: -4 }],
          then: "他六十岁了，走的时候背着一床被。三个月后消息传回来。" }
      ]
    },

    {
      id: "j9.kuodi", cat: "赋役", title: "括地", age: [20, 60], weight: 13,
      text: [
        "{{括地|金代拘刷民田分给猛安谋克户，名为「括地」，实为夺田}}：民田溢于旧额者，尽数入官，分给女真户。",
        "你家的田，在册上多了二十亩。"
      ],
      options: [
        { text: "认了，交出", hint: "田 −4；免祸", effects: [{ k: "field_dry", v: -4 }] },
        { text: "说那二十亩是荒地新垦", hint: "或有转", effects: [],
          gamble: { winChance: 0.4, win: [{ k: "field_dry", v: 1 }], lose: [{ k: "field_dry", v: -5 }, { k: "body", v: -6 }],
            loseNote: "量地的人说：「新垦的也要括。」地没了，人挨了打。" } },
        { text: "把田记到亲戚名下", hint: "或有查", effects: [{ k: "field_dry", v: 2 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "field_dry", v: -5 }, { k: "silver", v: -8 }],
            loseNote: "亲戚把田卖了。你去争，官说：「契上是他的名字。」" } }
      ]
    },

    {
      id: "j9.tongjian", cat: "赋役", title: "通检", age: [20, 65], weight: 12,
      text: [
        "{{通检推排|金代清查民户物力，按贫富定赋役等级}}：官来查物力：田、牛、屋、树，一样一样数。",
        "数到你家院里的那棵枣树，吏也记上了。"
      ],
      options: [
        { text: "照实", hint: "赋重；免罪", effects: [{ k: "silver", v: -6 }] },
        { text: "把牛报给邻家", hint: "或有查", effects: [{ k: "silver", v: 4 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -10 }, { k: "body", v: -5 }],
            loseNote: "邻家也被查了。两家的册子一对，就都露了。" } },
        { text: "请吏喝酒", hint: "银钱 −3；等降一等", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 3 }] }
      ]
    },

    {
      id: "j9.qunu", cat: "世变", title: "驱奴", age: [14, 55], weight: 11,
      text: [
        "{{驱奴|金代俘虏或买卖所得的奴隶，世袭为奴，不得与良人通婚}}：军前掳来的人，鬻于市，称驱口。",
        "有个十几岁的少年，被绑在车辕上，一直看着地上。"
      ],
      options: [
        { text: "买下", hint: "银钱 −8；家里多一人", effects: [{ k: "silver", v: -8 }, { k: "favor", v: 5 }, { k: "grain", v: -4 }] },
        { text: "走开", hint: "无得失", effects: [{ k: "luck", v: -1 }] },
        { text: "买下，放为良人", hint: "银钱 −8；名声好", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 6 }, { k: "favor", v: 3 }] }
      ]
    },

    {
      id: "j9.keju", cat: "科举", title: "策论", age: [16, 40], weight: 10,
      text: [
        "金取士有词赋、经义、策论三科。汉人子弟多应词赋，女真子弟另有{{女真进士科|以女真文试策论}}。",
        "先生问你：「你考哪一科？」"
      ],
      options: [
        { text: "词赋", hint: "学识 +8；汉人常科", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -4 }] },
        { text: "策论", hint: "学识 +6；或有识者", effects: [{ k: "knowledge", v: 6 }, { k: "official", v: 3 }] },
        { text: "不考，去做吏", hint: "有差事；无出身", effects: [{ k: "official", v: 5 }, { k: "silver", v: 3 }] }
      ]
    },

    {
      id: "j9.mengAn", cat: "乡里", title: "村寨", age: [18, 60], weight: 10,
      text: [
        "猛安谋克户迁来，占了村东的地，另立村寨，不与你等往来。",
        "他们的牛吃了你家的苗。你去说，他们说：「牲畜不懂事。」"
      ],
      options: [
        { text: "忍了", hint: "粮 −4；不生事", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 2 }] },
        { text: "去官里告", hint: "或有理；或不成", effects: [{ k: "silver", v: -3 }],
          gamble: { winChance: 0.3, win: [{ k: "grain", v: 4 }], lose: [{ k: "body", v: -6 }, { k: "grudge", v: 6 }],
            loseNote: "官说：「各安其业。」你回来的路上，被人拦了一回。" } },
        { text: "把苗圈起来", hint: "银钱 −3；此后无事", effects: [{ k: "silver", v: -3 }, { k: "grain", v: 2 }] }
      ]
    }
  ]);

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = (B.eraEvents.yuan || []).concat([

    {
      id: "y9.zhanhu", cat: "赋役", title: "站户", age: [18, 60], weight: 15,
      text: [
        "{{站户|元代驿站所属民户，出马、出夫、供驿传，世代不得改籍}}：你家的名字在站户册上。",
        "驿站要马，要车，要人。来往的使臣住下就吃，吃了就走。"
      ],
      options: [
        { text: "照当", hint: "银钱 −10；免他役", effects: [{ k: "silver", v: -10 }, { k: "favor", v: 2 }] },
        { text: "买马应付", hint: "银钱 −14；撑得住", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 4 }] },
        { text: "逃役", hint: "身体 −10；或有查", effects: [{ k: "body", v: -10 }, { k: "flag", v: "fugitive" }],
          gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -10 }],
            loseNote: "站官追到邻县。逃站之罪，杖七十，仍归本站。" } }
      ]
    },

    {
      id: "y9.qukou", cat: "世变", title: "驱口", age: [14, 55], weight: 12,
      text: [
        "{{驱口|元代俘虏奴婢，主人可买卖，其所生子女仍为驱口}}：市面上卖人，一口价：壮男十五两，妇人十两。",
        "你手里有二十两。"
      ],
      options: [
        { text: "买一个做工", hint: "银钱 −10；粮 +6", effects: [{ k: "silver", v: -10 }, { k: "grain", v: 6 }, { k: "favor", v: -2 }] },
        { text: "买下放良", hint: "银钱 −10；名声好", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 7 }],
          then: "放良的文书要花钱另办。办完，他站在门口，不知道该往哪里去。" },
        { text: "不买", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "y9.tanma", cat: "军旅", title: "探马赤", age: [16, 50], weight: 12,
      text: [
        "{{探马赤军|元代以蒙古、色目及签发汉军组成的先锋、镇戍部队}}：签汉军入探马赤，往前锋，先接敌。",
        "点的人说：「前锋最险，赏也最厚。」"
      ],
      options: [
        { text: "入前锋", hint: "身体 −12；银钱 +8", effects: [{ k: "body", v: -12 }, { k: "silver", v: 8 }, { k: "martial", v: 6 }] },
        { text: "求改镇戍", hint: "银钱 −8；少险", effects: [{ k: "silver", v: -8 }, { k: "body", v: -4 }] },
        { text: "不去，纳钱代役", hint: "银钱 −14；留家", effects: [{ k: "silver", v: -14 }] }
      ]
    },

    {
      id: "y9.keju", cat: "科举", title: "复科", age: [16, 40], weight: 10,
      text: [
        "{{延祐复科|元仁宗延祐二年恢复科举，分蒙古、色目与汉人、南人两榜}}：停了多年的科举重开。",
        "有人说：「汉人南人一榜，名额少，考的人也少。」"
      ],
      options: [
        { text: "去考", hint: "学识 +8；银钱 −5", effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -5 }] },
        { text: "去做吏", hint: "有差事；无出身", effects: [{ k: "official", v: 5 }, { k: "silver", v: 4 }] },
        { text: "去学蒙古文，谋个译史", hint: "学识 +5；出路稳", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 4 }] }
      ]
    },

    {
      id: "y9.she", cat: "乡里", title: "社长", age: [30, 65], weight: 10,
      text: [
        "{{社|元代五十家为一社，设社长，劝农、治水利、察非违}}：五十家推一个社长。",
        "推的是你。"
      ],
      options: [
        { text: "做", hint: "有面子；担责任", effects: [{ k: "fame", v: 5 }, { k: "official", v: 3 }, { k: "body", v: -4 }] },
        { text: "推掉", hint: "清闲；被人轻", effects: [{ k: "fame", v: -2 }] },
        { text: "做，先修渠", hint: "身体 −6；全社得利", effects: [{ k: "body", v: -6 }, { k: "fame", v: 7 }, { k: "grain", v: 8 }] }
      ]
    },

    {
      id: "y9.siyuan", cat: "方外", title: "寺院", age: [14, 55], weight: 9,
      text: [
        "寺里有田千顷，有佃户，有铺面。僧人免差发，住持说话比县官还管用。",
        "住持说：「来做个寺户，差发就免了。」"
      ],
      options: [
        { text: "做寺户", hint: "免差发；田归寺", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 2 }, { k: "flag", v: "temple_tenant" }] },
        { text: "不做，自己应差", hint: "身体 −6；自在", effects: [{ k: "body", v: -6 }, { k: "fame", v: 2 }] },
        { text: "把田施给寺里，换一个长生位", hint: "田 −3；心里安", effects: [{ k: "field_dry", v: -3 }, { k: "fame", v: 5 }, { k: "luck", v: 2 }] }
      ]
    }
  ]);

  /* ══════════ 明 ══════════ */
  B.eraEvents.ming = (B.eraEvents.ming || []).concat([

    {
      id: "m9.weisuo", cat: "军旅", title: "勾军", age: [16, 50], weight: 15,
      text: [
        "卫所军户世袭。这一户的军丁逃了，按{{勾军|军户缺丁，官府到原籍勾补}}之例，要从原籍再勾一人。",
        "原籍的册上，写的是你家祖上的名字。"
      ],
      options: [
        { text: "去补", hint: "身体 −10；离家", effects: [{ k: "body", v: -10 }, { k: "grain", v: 6 }, { k: "flag", v: "in_army" }] },
        { text: "花钱雇人代役", hint: "银钱 −14；留家", effects: [{ k: "silver", v: -14 }] },
        { text: "举家逃", hint: "身体 −12；田荒", effects: [{ k: "body", v: -12 }, { k: "field_dry", v: -4 }, { k: "flag", v: "fugitive" }],
          then: "走了七天，到了一个不认识的县。此后填籍，都填「客籍」。" }
      ]
    },

    {
      id: "m9.jiangban", cat: "赋役", title: "匠班", age: [16, 55], weight: 12,
      text: [
        "匠户分{{轮班|匠户按班次赴京服役，一班三月}}与住坐。你家是轮班匠，三年一班，一班三月。",
        "这一班轮到了。路费自备，役中无工钱。"
      ],
      options: [
        { text: "赴班", hint: "身体 −8；银钱 −6", effects: [{ k: "body", v: -8 }, { k: "silver", v: -6 }] },
        { text: "输银代班", hint: "银钱 −8；留家做工", effects: [{ k: "silver", v: -8 }] },
        { text: "让弟弟去", hint: "有怨；自己留", effects: [{ k: "favor", v: -5 }] }
      ]
    },

    {
      id: "m9.haijin", cat: "市井", title: "海禁", age: [18, 55], weight: 11,
      text: [
        "{{海禁|明初「片板不许下海」，禁民间海外贸易}}：片板不许下海。",
        "可海边的人世代以海为田。有船主来问：走不走一趟？"
      ],
      options: [
        { text: "走一趟", hint: "银钱 +12；或有缉", effects: [{ k: "silver", v: 12 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -12 }],
            loseNote: "被巡海的水寨拦住。船没了，人枷了三个月。" } },
        { text: "不走，在岸上晒盐", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] },
        { text: "去告官领赏", hint: "银钱 +6；乡里恨", effects: [{ k: "silver", v: 6 }, { k: "favor", v: -10 }, { k: "grudge", v: 8 }] }
      ]
    },

    {
      id: "m9.mingzhuang", cat: "乡里", title: "民壮", age: [18, 45], weight: 11,
      text: [
        "县里编{{民壮|明代地方民兵，由民户佥点，冬春操练}}：每里出十人，农隙操练，有警调守。",
        "你被点上了。兵器自备。"
      ],
      options: [
        { text: "去", hint: "身体 −6；习得武艺", effects: [{ k: "body", v: -6 }, { k: "martial", v: 6 }, { k: "fame", v: 2 }] },
        { text: "出银雇替", hint: "银钱 −6；留家", effects: [{ k: "silver", v: -6 }] },
        { text: "去，做个头目", hint: "身体 −8；有面子", effects: [{ k: "body", v: -8 }, { k: "fame", v: 5 }, { k: "command", v: 3 }] }
      ]
    },

    {
      id: "m9.touxian", cat: "赋役", title: "投献", age: [20, 60], weight: 12,
      text: [
        "秀才以上有{{优免|明代士绅按品级优免自身及若干丁田的徭役}}。有田的人把田「投献」到士绅名下，避了差役，也丢了田。",
        "有人来劝：把田记在举人老爷名下，每年给他三成租。"
      ],
      options: [
        { text: "投献", hint: "免差役；田不属己", effects: [{ k: "silver", v: 6 }, { k: "field_dry", v: -4 }] },
        { text: "不投，自己应役", hint: "身体 −6；田还是自己的", effects: [{ k: "body", v: -6 }, { k: "fame", v: 3 }] },
        { text: "投一半", hint: "银钱 +3；两头留一手", effects: [{ k: "silver", v: 3 }, { k: "field_dry", v: -2 }] }
      ]
    },

    {
      id: "m9.shushou", cat: "官府", title: "书手", age: [18, 55], weight: 10,
      text: [
        "县衙的{{书手|衙门中抄写文册的吏役，多由民户佥充}}缺人，要一家出人应役，一年一换。",
        "应了，认得衙门里的人；不应，要出银。"
      ],
      options: [
        { text: "应役", hint: "学识 +4；有门路", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 4 }, { k: "silver", v: 2 }] },
        { text: "出银免", hint: "银钱 −6；清净", effects: [{ k: "silver", v: -6 }] },
        { text: "应役，趁机改自家册子", hint: "银钱 +6；或有罪", effects: [{ k: "silver", v: 6 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -6 }],
            loseNote: "改的字被对出来了。革役之外，还枷了一个月。" } }
      ]
    }
  ]);

})(window.PACK_BASE);
