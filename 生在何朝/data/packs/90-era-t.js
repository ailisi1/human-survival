/* 生在何朝 · 各朝专有事件 卷二十：秦、西汉、新、东汉、三国（技艺与物产）
 * 这一卷写「官工与私工」：物勒工名，铁盐在官，漆园有吏，织室有籍。
 * 手艺人在这个时代不是自由人，多半在册上。
 * 前缀 q8. / w8. / x10. / e8. / s8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 秦 ══════════ */
  B.eraEvents.qin = (B.eraEvents.qin || []).concat([

    {
      id: "q8.lacquer", cat: "营生", title: "漆园", age: [14, 55], weight: 14,
      text: [
        "县里有{{漆园|种漆树的官园}}，园有啬夫，园户按籍出力。割漆在夏，一刀斜划，汁流进竹筒。",
        "漆有毒。手上起疮，一年不消。老园户的手背，全是黑疤。"
      ],
      options: [
        { text: "老实割漆", hint: "银钱 +3；身体 −5", effects: [{ k: "silver", v: 3 }, { k: "body", v: -5 }] },
        { text: "偷卖一筒", hint: "银钱 +7；有罪", effects: [{ k: "silver", v: 7 }, { k: "grudge", v: 4 }] },
        { text: "求换个差事", hint: "银钱 −2；身体 +2", effects: [{ k: "silver", v: -2 }, { k: "body", v: 2 }, { k: "official", v: 2 }] }
      ]
    },

    {
      id: "q8.ironoffice", cat: "官府", title: "铁官", age: [16, 55], weight: 14,
      text: [
        "{{铁官|掌冶铁的官署}}设了作坊，农具、兵器都在里面打。匠人有籍，进出要验。",
        "私铸铁器是罪。可官器的价钱，比私铸的贵一倍，还钝。"
      ],
      options: [
        { text: "在官作坊做匠", hint: "银钱 +4；不得自由", effects: [{ k: "silver", v: 4 }, { k: "official", v: 3 }] },
        { text: "私下打几把锄头卖", hint: "银钱 +10；犯禁", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 7 }] },
        { text: "买了官器再转手", hint: "银钱 +6；压本", effects: [{ k: "silver", v: 6 }] }
      ]
    },

    {
      id: "q8.weavehouse", cat: "营生", title: "织室", age: [12, 45], weight: 12, when: { sex: "female" },
      text: [
        "官有织室，女工有籍。一日织帛若干，少了要罚，多了有赏。",
        "屋里三十张机，声音从早响到晚。有人说，织室的女子，一辈子听不见外面的鸟叫。"
      ],
      options: [
        { text: "多做，求赏", hint: "银钱 +4；身体 −6", effects: [{ k: "silver", v: 4 }, { k: "body", v: -6 }] },
        { text: "照数做，不多不少", hint: "银钱 +2；省力", effects: [{ k: "silver", v: 2 }] },
        { text: "托人说情，出织室", hint: "银钱 −6；得自由", effects: [{ k: "silver", v: -6 }, { k: "luck", v: 2 }] }
      ]
    },

    {
      id: "q8.markname", cat: "官府", title: "物勒工名", age: [16, 60], weight: 12,
      text: [
        "秦法：器物上要刻匠人的名字。器不好，按名问罪。",
        "这一批戈铸出来了，有一件的刃口歪了半分。监工说：刻你的名字。"
      ],
      options: [
        { text: "刻，认了", hint: "声望 +3；或有罚", effects: [{ k: "fame", v: 3 }, { k: "luck", v: -1 }] },
        { text: "把这一件熔了重铸", hint: "银钱 −2；不出事", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }] },
        { text: "刻别人的名字", hint: "脱了罪；埋祸", effects: [{ k: "luck", v: -3 }, { k: "grudge", v: 5 }] }
      ]
    },

    {
      id: "q8.tomb", cat: "营生", title: "烧俑", age: [16, 55], weight: 12,
      text: [
        "官府要烧一批俑，与真人等身，送到陵上去。陶要细，火要匀，脸不能有裂。",
        "窑口有吏点数。烧坏一个，赔一个。"
      ],
      options: [
        { text: "细做，一个不错", hint: "银钱 +5；耗时", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "赶数，裂了拿泥补", hint: "银钱 +6；日后露", effects: [{ k: "silver", v: 6 }, { k: "luck", v: -2 }] },
        { text: "辞了这活", hint: "无得失", effects: [{ k: "body", v: 2 }] }
      ]
    },

    {
      id: "q8.leather", cat: "营生", title: "造甲", age: [16, 55], weight: 11,
      text: [
        "秦军的甲是皮做的，一片一片缀起来，黑漆。一副甲要三个月。",
        "军中催得急，料是官给的，尺码是死的。裁错一片，自己赔。"
      ],
      options: [
        { text: "照尺裁，一片不错", hint: "银钱 +5；身体 −4", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "拼着用料，省下一片", hint: "银钱 +7；甲薄", effects: [{ k: "silver", v: 7 }, { k: "fame", v: -3 }] },
        { text: "改做民用皮具", hint: "银钱 +4；不催", effects: [{ k: "silver", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 西汉 ══════════ */
  B.eraEvents.whan = (B.eraEvents.whan || []).concat([

    {
      id: "w8.saltwell", cat: "营生", title: "井盐", age: [16, 55], weight: 14,
      text: [
        "蜀地凿井取卤，井深数十丈，用竹筒接卤上来，灶上煎。一口好井，能养三代人。",
        "凿井要几个人轮班，凿到石层，钻头断了就前功尽弃。"
      ],
      options: [
        { text: "合伙凿一口新井", hint: "银钱 −12；或成或废", effects: [{ k: "silver", v: -12 }],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 26 }, { k: "fame", v: 5 }], lose: [{ k: "silver", v: -4 }],
            winNote: "凿到第十三丈，卤水涌出来，是咸的。几个人蹲在井边哭。",
            loseNote: "凿到第十九丈，钻头断在里头。井废了，人还欠着钱。" } },
        { text: "在别人井上做灶丁", hint: "银钱 +4；身体 −6", effects: [{ k: "silver", v: 4 }, { k: "body", v: -6 }] },
        { text: "贩盐到山里", hint: "银钱 +8；走险路", effects: [{ k: "silver", v: 8 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "w8.smelt", cat: "营生", title: "冶铁", age: [18, 55], weight: 13, when: { minSilver: 6 },
      text: [
        "{{盐铁官营|汉武帝时盐铁收归官办}}之后，私营的冶铁成了大罪。可铁器的利太厚。",
        "山里有炭，有矿。招二十个人，起一座小高炉，一年能出十万斤。"
      ],
      options: [
        { text: "偷偷起炉", hint: "银钱 +18；随时有案", effects: [{ k: "silver", v: 18 }, { k: "grudge", v: 9 }] },
        { text: "报官，做官冶的包工", hint: "银钱 +8；受人管", effects: [{ k: "silver", v: 8 }, { k: "official", v: 4 }] },
        { text: "只烧炭卖给官冶", hint: "银钱 +5；稳", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "w8.brocade", cat: "营生", title: "蜀锦", age: [14, 50], weight: 12,
      text: [
        "成都的锦，天下有名。锦机比布机高一倍，两个人一上一下，一日不过几寸。",
        "一匹锦值钱，可织锦的人穿不起锦。"
      ],
      options: [
        { text: "在锦坊做织工", hint: "银钱 +5；身体 −5", effects: [{ k: "silver", v: 5 }, { k: "body", v: -5 }] },
        { text: "自家置一架机", hint: "银钱 −10；日后自卖", effects: [{ k: "silver", v: -10 }, { k: "luck", v: 2 }] },
        { text: "贩锦出关", hint: "银钱 +11；路上有盗", effects: [{ k: "silver", v: 11 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "w8.horse", cat: "军旅", title: "马政", age: [16, 55], weight: 12,
      text: [
        "朝廷要马。民间养马，可以抵役；马死了，要赔。",
        "你家分到一匹小马，三岁口。养得好是家产，养不好是债。"
      ],
      options: [
        { text: "精心养", hint: "银钱 −4；日后可抵役", effects: [{ k: "silver", v: -4 }, { k: "luck", v: 3 }] },
        { text: "报马死，把马卖了", hint: "银钱 +10；有查", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 6 }] },
        { text: "退给官，认罚", hint: "银钱 −6；脱身", effects: [{ k: "silver", v: -6 }] }
      ]
    },

    {
      id: "w8.paperearly", cat: "营生", title: "麻纸", age: [14, 55], weight: 10,
      text: [
        "麻头、破布、旧网，都是造纸的料。沤、蒸、舂、抄，晒在墙上。",
        "这种纸粗，写字要洇。可它便宜，比帛便宜二十倍。"
      ],
      options: [
        { text: "做粗纸，走量", hint: "银钱 +5", effects: [{ k: "silver", v: 5 }] },
        { text: "改进工序，做细些", hint: "银钱 −3；日后有名", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 5 }, { k: "knowledge", v: 4 }] },
        { text: "专供官府的文书用纸", hint: "银钱 +8；有定额", effects: [{ k: "silver", v: 8 }, { k: "official", v: 3 }] }
      ]
    },

    {
      id: "w8.brew", cat: "市井", title: "官酤", age: [18, 60], weight: 11,
      text: [
        "酒在汉朝是官卖的。朝廷开{{榷酤|酒专卖}}，民间酿酒要先领簿。",
        "也有不领的。村里人自酿自喝，吏来了就说是给老人做药引。"
      ],
      options: [
        { text: "领簿，明着酿", hint: "银钱 +5；课重", effects: [{ k: "silver", v: 5 }, { k: "official", v: 2 }] },
        { text: "私酿，藏在窖里", hint: "银钱 +9；被告发则重罚", effects: [{ k: "silver", v: 9 }, { k: "grudge", v: 5 }] },
        { text: "不酿，只卖官酒", hint: "银钱 +3", effects: [{ k: "silver", v: 3 }] }
      ]
    }
  ]);

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = (B.eraEvents.xin || []).concat([

    {
      id: "x10.sixguan", cat: "官府", title: "六筦", age: [16, 60], weight: 14,
      text: [
        "{{六筦|王莽时盐、铁、酒、铸钱、名山大泽、五均赊贷六项官管}}之令下：盐铁酒钱，山林川泽之利，都归官。",
        "你在河边捕鱼，吏来说：这张网要纳课。"
      ],
      options: [
        { text: "纳课，照捕", hint: "银钱 −3；还能过", effects: [{ k: "silver", v: -3 }] },
        { text: "夜里下网", hint: "银钱 +6；被抓则重", effects: [{ k: "silver", v: 6 }, { k: "grudge", v: 6 }] },
        { text: "弃网去佣工", hint: "银钱 +2；身体 −4", effects: [{ k: "silver", v: 2 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "x10.coin", cat: "市井", title: "钱法", age: [18, 65], weight: 12,
      text: [
        "钱法屡变。昨日的大钱，今日折作小钱；明日又出新钱，旧钱不许用。",
        "你箱底还压着三串旧钱。"
      ],
      options: [
        { text: "赶紧换成新钱", hint: "银钱 −4；落个安稳", effects: [{ k: "silver", v: -4 }] },
        { text: "囤着，等以后再变", hint: "或全废；或翻倍", effects: [{ k: "luck", v: -1 }],
          gamble: { winChance: 0.35, win: [{ k: "silver", v: 9 }], lose: [{ k: "silver", v: -5 }],
            winNote: "两年后又改钱法，旧钱准折，你箱底那三串成了六串。",
            loseNote: "半年后下诏：旧钱作废，不许行使。三串钱成了三串铜。" } },
        { text: "把旧钱熔了打器皿", hint: "银钱 +4；犯禁", effects: [{ k: "silver", v: 4 }, { k: "grudge", v: 4 }] }
      ]
    },

    {
      id: "x10.land", cat: "赋役", title: "王田", age: [18, 60], weight: 12,
      text: [
        "诏曰：天下田曰{{王田}}，奴婢曰私属，皆不得买卖。一家男口不满八人而田过一井者，分余田与九族。",
        "你家有田八十亩，口五。按新法，多出来的要交出去。"
      ],
      options: [
        { text: "照数交出", hint: "田 −20；免祸", effects: [{ k: "field_dry", v: -20 }, { k: "official", v: 3 }] },
        { text: "把田分记在亲族名下", hint: "田留住；日后争", effects: [{ k: "favor", v: 3 }, { k: "luck", v: -2 }] },
        { text: "不交，等着看", hint: "田留住；有案", effects: [{ k: "grudge", v: 7 }, { k: "fame", v: 2 }] }
      ]
    },

    {
      id: "x10.market", cat: "市井", title: "五均", age: [18, 65], weight: 11,
      text: [
        "{{五均|官设市官，评定物价、买卖滞货}}在市上设官。谷帛价贱，官收；贵，官卖。",
        "市官定的价，比市上的实价低三成。卖家不肯，买家也买不着。"
      ],
      options: [
        { text: "按官价卖", hint: "银钱 −3；不惹事", effects: [{ k: "silver", v: -3 }] },
        { text: "私下按市价成交", hint: "银钱 +6；违令", effects: [{ k: "silver", v: 6 }, { k: "grudge", v: 3 }] },
        { text: "自己不卖，替人牵线", hint: "银钱 +4；两头做人情", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "x10.iron", cat: "营生", title: "私铸", age: [20, 55], weight: 10,
      text: [
        "新朝的钱，一次比一次轻。铸钱的人，把旧钱熔了，掺铅，铸新钱，一斤变两斤。",
        "这事一旦做开，就停不下来——因为人人都在做。"
      ],
      options: [
        { text: "跟着做", hint: "银钱 +14；罪至死", effects: [{ k: "silver", v: 14 }, { k: "grudge", v: 8 }, { k: "luck", v: -3 }] },
        { text: "不做，改用谷帛交易", hint: "银钱 −2；稳妥", effects: [{ k: "silver", v: -2 }] },
        { text: "举报同乡", hint: "银钱 +6；乡里恨你", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -6 }, { k: "official", v: 4 }] }
      ]
    },

    {
      id: "x10.faminecraft", cat: "天灾", title: "荒年手艺", age: [18, 65], weight: 22, when: { maxGrain: 14 },
      text: [
        "连年不收，粮贵。手艺人这时候最难过——没人添新器，也没人添新衣。",
        "你把工具摊在地上，看了半天。"
      ],
      options: [
        { text: "把工具卖了换粮", hint: "银钱 +5；粮 +8；日后无本", effects: [{ k: "silver", v: 5 }, { k: "grain", v: 8 }, { k: "fame", v: -2 }] },
        { text: "挑担走远县讨活", hint: "银钱 +6；身体 −7", effects: [{ k: "silver", v: 6 }, { k: "body", v: -7 }] },
        { text: "改行去给人抬棺", hint: "银钱 +4；人嫌", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -3 }] }
      ]
    }
  ]);

  /* ══════════ 东汉 ══════════ */
  B.eraEvents.ehan = (B.eraEvents.ehan || []).concat([

    {
      id: "e8.paper", cat: "营生", title: "蔡侯纸", age: [16, 60], weight: 14,
      text: [
        "{{蔡伦|东汉和帝时人，以树肤、麻头、敝布、鱼网造纸}}进了新法子：树皮、麻头、破布、鱼网，都能造纸。",
        "纸比帛贱，比竹简轻。可读书人还是信帛，说纸不长久。"
      ],
      options: [
        { text: "学这法子，开坊", hint: "银钱 +9；身体 −4", effects: [{ k: "silver", v: 9 }, { k: "body", v: -4 }, { k: "knowledge", v: 3 }] },
        { text: "把法子献给官", hint: "名望高；赏不多", effects: [{ k: "fame", v: 8 }, { k: "official", v: 5 }] },
        { text: "继续做简牍", hint: "银钱 +3；行当日衰", effects: [{ k: "silver", v: 3 }, { k: "luck", v: -1 }] }
      ]
    },

    {
      id: "e8.watermill", cat: "营生", title: "水碓", age: [20, 60], weight: 12, when: { minSilver: 8 },
      text: [
        "河边立一架{{水碓|借水力舂米的装置}}，水推轮，轮带碓，一昼夜舂米三十石。",
        "人力舂米，一日不过一石。有了这架，村里人都来你家舂。"
      ],
      options: [
        { text: "收舂米钱", hint: "银钱 +9；有人眼红", effects: [{ k: "silver", v: 9 }, { k: "grudge", v: 4 }] },
        { text: "本村免费，外村收钱", hint: "银钱 +5；乡里称善", effects: [{ k: "silver", v: 5 }, { k: "favor", v: 6 }, { k: "fame", v: 3 }] },
        { text: "把碓租给富家", hint: "银钱 +7；省心", effects: [{ k: "silver", v: 7 }] }
      ]
    },

    {
      id: "e8.porcelain", cat: "营生", title: "青瓷", age: [16, 55], weight: 12,
      text: [
        "南边的窑，烧出来的东西又硬又亮，叩之有金石声，叫作瓷。",
        "釉要匀，火要到。釉厚了流，火低了青不起来。"
      ],
      options: [
        { text: "专烧青瓷，卖与豪家", hint: "银钱 +10；成品少", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 3 }] },
        { text: "烧粗瓷，卖与乡里", hint: "银钱 +5；走量", effects: [{ k: "silver", v: 5 }] },
        { text: "把窑卖给大户", hint: "银钱 +12；失了本业", effects: [{ k: "silver", v: 12 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "e8.paperwork", cat: "官府", title: "案比", age: [18, 60], weight: 11,
      text: [
        "{{案比|每年查验户口、年纪、形貌}}之期到了。吏要看你本人，看年纪对不对得上册。",
        "你家册上写你十五，其实十三。差两年，能少服两年役。"
      ],
      options: [
        { text: "照册上说", hint: "免役两年；有欺", effects: [{ k: "silver", v: 3 }, { k: "luck", v: -2 }] },
        { text: "照实报", hint: "声望 +3；役早两年", effects: [{ k: "fame", v: 3 }, { k: "body", v: -3 }] },
        { text: "塞钱给吏", hint: "银钱 −4；册上不动", effects: [{ k: "silver", v: -4 }, { k: "official", v: 3 }] }
      ]
    },

    {
      id: "e8.ironfarm", cat: "营生", title: "铁犁", age: [16, 60], weight: 12,
      text: [
        "{{铁犁|铸铁犁铧翻土，比木犁深一倍}}推行已久了。一具铁犁，抵两头牛。",
        "铁犁要钱，也要铁。有铁的地方，荒地也开得出来。"
      ],
      options: [
        { text: "买一具", hint: "银钱 −10；田 +6", effects: [{ k: "silver", v: -10 }, { k: "field_dry", v: 6 }] },
        { text: "几户合买", hint: "银钱 −4；田 +3", effects: [{ k: "silver", v: -4 }, { k: "field_dry", v: 3 }, { k: "favor", v: 3 }] },
        { text: "自己开荒，用木犁", hint: "身体 −7；田 +2", effects: [{ k: "body", v: -7 }, { k: "field_dry", v: 2 }] }
      ]
    },

    {
      id: "e8.silkroad", cat: "市井", title: "胡商", age: [18, 60], weight: 11,
      text: [
        "城西驿亭来了胡商，驼队四十匹，载着香料、琉璃、毛毡。他们要买缯帛。",
        "他们的秤和我们的不同，说话也不通，全靠一个通译。"
      ],
      options: [
        { text: "拿自家的帛去换", hint: "银钱 +8；换了怪东西", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 2 }] },
        { text: "做中人，抽佣", hint: "银钱 +6；两头照应", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 4 }] },
        { text: "不与他们打交道", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    }
  ]);

  /* ══════════ 三国 ══════════ */
  B.eraEvents.sg = (B.eraEvents.sg || []).concat([

    {
      id: "s8.brocade", cat: "营生", title: "锦官", age: [14, 55], weight: 14,
      text: [
        "蜀中的锦，是军国之用。{{锦官|掌织锦的官署}}设了城，织工有籍，一日出锦若干。",
        "锦卖到魏、吴，一匹换得粮十石。织锦的人，家里却常有断炊。"
      ],
      options: [
        { text: "在锦官城做织工", hint: "银钱 +6；身体 −5", effects: [{ k: "silver", v: 6 }, { k: "body", v: -5 }] },
        { text: "自家织，私卖", hint: "银钱 +11；有罪", effects: [{ k: "silver", v: 11 }, { k: "grudge", v: 6 }] },
        { text: "贩锦到吴", hint: "银钱 +13；路上有兵", effects: [{ k: "silver", v: 13 }, { k: "body", v: -6 }] }
      ]
    },

    {
      id: "s8.tuntian", cat: "军旅", title: "军屯", age: [16, 55], weight: 13,
      text: [
        "军中乏粮，令屯田。兵一半操练，一半种地，牛具官给，收成官六兵四。",
        "你分到三十亩，还有一头瘦牛。"
      ],
      options: [
        { text: "老实种", hint: "粮 +10；身体 −6", effects: [{ k: "grain", v: 10 }, { k: "body", v: -6 }] },
        { text: "藏些私粮", hint: "粮 +6；军法处置", effects: [{ k: "grain", v: 6 }, { k: "grudge", v: 5 }] },
        { text: "出钱免屯，专操练", hint: "银钱 −8；武功进", effects: [{ k: "silver", v: -8 }, { k: "martial", v: 6 }] }
      ]
    },

    {
      id: "s8.ship", cat: "营生", title: "船坞", age: [16, 55], weight: 12,
      text: [
        "江东的船坞，造{{蒙冲|蒙皮的快船}}、斗舰。一条船要用大木三百根，钉十万枚。",
        "船成下水，要请人看日子。沉过船的坞，人不敢用。"
      ],
      options: [
        { text: "在坞里做木工", hint: "银钱 +6；身体 −5", effects: [{ k: "silver", v: 6 }, { k: "body", v: -5 }] },
        { text: "接军中的急造", hint: "银钱 +10；催逼", effects: [{ k: "silver", v: 10 }, { k: "body", v: -8 }] },
        { text: "修民船，稳妥", hint: "银钱 +4", effects: [{ k: "silver", v: 4 }] }
      ]
    },

    {
      id: "s8.tool", cat: "营生", title: "区种", age: [16, 60], weight: 11,
      text: [
        "有人传{{区种法|挖小区深种、集中施肥的旱作法}}：不整片种，挖小区，一区一区下种、浇水、上粪。",
        "费力十倍，可旱年也有收。"
      ],
      options: [
        { text: "全田改区种", hint: "身体 −9；粮 +14", effects: [{ k: "body", v: -9 }, { k: "grain", v: 14 }] },
        { text: "试一亩", hint: "身体 −4；粮 +5", effects: [{ k: "body", v: -4 }, { k: "grain", v: 5 }] },
        { text: "照旧法种", hint: "粮 +4", effects: [{ k: "grain", v: 4 }] }
      ]
    },

    {
      id: "s8.saltiron", cat: "官府", title: "盐铁之利", age: [18, 60], weight: 11,
      text: [
        "三国各铸钱，各管盐铁。魏用谷帛，吴用大钱，蜀铸直百钱。",
        "你在市上卖布，收了三种钱，都不好用。"
      ],
      options: [
        { text: "只收谷帛", hint: "银钱 +3；笨重", effects: [{ k: "silver", v: 3 }, { k: "grain", v: 4 }] },
        { text: "折价收钱，快去换货", hint: "银钱 +6；忙", effects: [{ k: "silver", v: 6 }] },
        { text: "囤钱等涨", hint: "或赚或废", effects: [{ k: "luck", v: -1 }],
          gamble: { winChance: 0.4, win: [{ k: "silver", v: 10 }], lose: [{ k: "silver", v: -6 }],
            winNote: "秋后钱轻物贵，你把囤的钱换成了粮，赚了一笔。",
            loseNote: "又铸新钱，旧钱不许用。一箱钱成了废铜。" } }
      ]
    },

    {
      id: "s8.bow", cat: "营生", title: "造弩", age: [18, 55], weight: 10,
      text: [
        "军中要弩。弩的力在弦，弦的力在漆。一张好弩，射二百步。",
        "官给的料有时不齐。弦不够，就得掺麻。掺了麻的弩，射到一百步就软。"
      ],
      options: [
        { text: "照实做，不掺", hint: "银钱 +5；料亏自己补", effects: [{ k: "silver", v: 5 }, { k: "fame", v: 4 }] },
        { text: "掺麻凑数", hint: "银钱 +8；日后败露", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -3 }] },
        { text: "改做民用弓，卖给猎户", hint: "银钱 +4；不起眼", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 2 }] }
      ]
    }
  ]);

})(window.PACK_BASE);
