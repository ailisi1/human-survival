/* 生在何朝 · 各朝专有事件 卷廿二：五代、辽、西夏、北宋、金、南宋（技艺与物产）
 * 这一卷写「宋人的手艺」：瓷、纸、茶、船。也写北边的马具、毡、盐与冷锻。
 * 宋的技术不只在书上，它落在市镇的作坊里，一年出一批，卖到海外。
 * 前缀 wd10. / l10. / xx10. / b10. / j10. / n10.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 五代 ══════════ */
  B.eraEvents.wudai = (B.eraEvents.wudai || []).concat([

    {
      id: "wd10.celadon", cat: "营生", title: "秘色", age: [16, 55], weight: 14,
      text: [
        "吴越的窑，烧一种青瓷，釉色如湖水，专供中原朝廷，臣下不得用，叫作{{秘色|越窑贡瓷，庶民不得使用}}。",
        "一年只烧一窑贡物，其余的都砸了——不许流到民间。"
      ],
      options: [
        { text: "照规矩，余者砸了", hint: "银钱 −3；守得住", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 4 }] },
        { text: "藏几只私卖", hint: "银钱 +15；罪不小", effects: [{ k: "silver", v: 15 }, { k: "grudge", v: 8 }] },
        { text: "改烧民用青瓷", hint: "银钱 +7；无风险", effects: [{ k: "silver", v: 7 }] }
      ]
    },

    {
      id: "wd10.nineclassics", cat: "文事", title: "刻九经", age: [18, 60], weight: 12, when: { minKnowledge: 14 },
      text: [
        "国子监要刻印九经，颁行天下。刻工三百人，一板一板刻下去。",
        "刻成之后，读书人不必再抄书。抄书的人，从此没饭吃。"
      ],
      options: [
        { text: "做刻工", hint: "银钱 +6；知识 +5", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 5 }, { k: "body", v: -4 }] },
        { text: "改行卖书", hint: "银钱 +9；本钱重", effects: [{ k: "silver", v: 9 }] },
        { text: "继续抄书", hint: "银钱 −3；行当日衰", effects: [{ k: "silver", v: -3 }, { k: "knowledge", v: 2 }] }
      ]
    },

    {
      id: "wd10.taxgrain", cat: "赋役", title: "省耗", age: [18, 65], weight: 11,
      text: [
        "纳粮有{{省耗|收粮时多收的损耗，实为加税}}：一石加二斗，说是路上损耗。",
        "今年的斗，比去年的又大了一圈。"
      ],
      options: [
        { text: "照纳", hint: "粮 −12；不惹事", effects: [{ k: "grain", v: -12 }] },
        { text: "求改用官斗量", hint: "粮 −8；吏不悦", effects: [{ k: "grain", v: -8 }, { k: "official", v: -3 }, { k: "fame", v: 3 }] },
        { text: "塞钱，少纳两石", hint: "银钱 −4；粮 −6", effects: [{ k: "silver", v: -4 }, { k: "grain", v: -6 }] }
      ]
    },

    {
      id: "wd10.sword", cat: "营生", title: "吴钩", age: [18, 55], weight: 10,
      text: [
        "江南的刀，轻而利，是水战用的。刀身有星纹，是反复折叠打出来的。",
        "军中来订三千把，限期三个月。"
      ],
      options: [
        { text: "接，日夜打", hint: "银钱 +12；身体 −9", effects: [{ k: "silver", v: 12 }, { k: "body", v: -9 }] },
        { text: "接一半，另雇人", hint: "银钱 +7；质量参差", effects: [{ k: "silver", v: 7 }, { k: "fame", v: -3 }] },
        { text: "推了，怕交不出", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "wd10.sichuan", cat: "市井", title: "蜀中", age: [18, 60], weight: 10,
      text: [
        "蜀中不遭兵，市面还在。锦、纸、茶、盐，都从这里出去。",
        "只是路难走：出川一条江，一条栈道。"
      ],
      options: [
        { text: "走栈道贩货", hint: "银钱 +11；身体 −7", effects: [{ k: "silver", v: 11 }, { k: "body", v: -7 }] },
        { text: "走水路", hint: "银钱 +9；有覆舟", effects: [{ k: "silver", v: 9 }, { k: "luck", v: -2 }] },
        { text: "在本地开铺", hint: "银钱 +6；稳", effects: [{ k: "silver", v: 6 }] }
      ]
    }
  ]);

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = (B.eraEvents.liao || []).concat([

    {
      id: "l10.harness", cat: "营生", title: "马具", age: [14, 55], weight: 14,
      text: [
        "契丹人的家当在马背上：鞍、辔、镫、鞭。一副好鞍，要用三年做。",
        "鞍桥要合身形，不合的鞍，骑一日磨一层皮。"
      ],
      options: [
        { text: "细做一副", hint: "银钱 +8；名声起", effects: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }] },
        { text: "做粗货，走量", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }] },
        { text: "给军中做", hint: "银钱 +10；催得紧", effects: [{ k: "silver", v: 10 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "l10.felt", cat: "营生", title: "毡帐", age: [12, 55], weight: 12,
      text: [
        "羊毛擀毡，铺水、卷起、用脚踩，踩一日出一张。毡做成帐，冬里挡风。",
        "毡帐是家。迁徙时拆开，驮在车上，一个时辰就能立起来。"
      ],
      options: [
        { text: "做帐，卖与部族", hint: "银钱 +7；身体 −5", effects: [{ k: "silver", v: 7 }, { k: "body", v: -5 }] },
        { text: "做毡片，卖与汉地", hint: "银钱 +6；走商道", effects: [{ k: "silver", v: 6 }] },
        { text: "只做自家用的", hint: "身体 +3；银钱少", effects: [{ k: "body", v: 3 }] }
      ]
    },

    {
      id: "l10.iron", cat: "官府", title: "铁冶", age: [18, 55], weight: 11,
      text: [
        "辽东有铁。头下军州的冶户，一年出铁若干，多余的才许卖。",
        "冶户是世袭的，父死子继，不得改业。"
      ],
      options: [
        { text: "老实做冶户", hint: "银钱 +5；不得脱籍", effects: [{ k: "silver", v: 5 }, { k: "official", v: 2 }] },
        { text: "私卖余铁", hint: "银钱 +11；有罪", effects: [{ k: "silver", v: 11 }, { k: "grudge", v: 5 }] },
        { text: "逃入汉地", hint: "身体 −8；脱籍", effects: [{ k: "body", v: -8 }, { k: "luck", v: 3 }] }
      ]
    },

    {
      id: "l10.cart", cat: "营生", title: "造车", age: [16, 55], weight: 11,
      text: [
        "草原上的车，轮高辐密，过草甸不陷。一辆车要两匹马拖。",
        "迁徙的时候，车队长得看不见头。"
      ],
      options: [
        { text: "造车卖与部族", hint: "银钱 +8；木料难找", effects: [{ k: "silver", v: 8 }, { k: "body", v: -4 }] },
        { text: "修车，走村串帐", hint: "银钱 +5；跑得多", effects: [{ k: "silver", v: 5 }, { k: "favor", v: 4 }] },
        { text: "改牧马", hint: "银钱 +4；自由", effects: [{ k: "silver", v: 4 }, { k: "body", v: 2 }] }
      ]
    },

    {
      id: "l10.salt", cat: "市井", title: "盐池", age: [18, 60], weight: 10,
      text: [
        "北边有盐池，取卤晒盐，不用煎，成本最低。盐一出，南边的盐就卖不动。",
        "边市上，一斗盐换一匹布。"
      ],
      options: [
        { text: "贩盐到边市", hint: "银钱 +10；路上有卡", effects: [{ k: "silver", v: 10 }, { k: "body", v: -4 }] },
        { text: "在池上做工", hint: "银钱 +5；日晒", effects: [{ k: "silver", v: 5 }, { k: "body", v: -5 }] },
        { text: "囤盐等冬", hint: "银钱 +8；押本", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -1 }] }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx10.salt", cat: "市井", title: "青白盐", age: [16, 60], weight: 14,
      text: [
        "西夏的盐池，出的盐青白两色，粒大味厚。宋人禁盐，可边民照旧买。",
        "盐一斗，换茶一斤。"
      ],
      options: [
        { text: "贩盐换茶", hint: "银钱 +9；被查则没", effects: [{ k: "silver", v: 9 }, { k: "grudge", v: 3 }] },
        { text: "在池上晒盐", hint: "银钱 +5；身体 −5", effects: [{ k: "silver", v: 5 }, { k: "body", v: -5 }] },
        { text: "替官府管盐账", hint: "银钱 +6；识字要紧", effects: [{ k: "silver", v: 6 }, { k: "official", v: 3 }] }
      ]
    },

    {
      id: "xx10.coldforge", cat: "营生", title: "冷锻", age: [18, 55], weight: 13,
      text: [
        "西夏的甲，冷锻而成：不加热，一锤一锤打，打到最后，铁色发青，箭射上去是个白点。",
        "一副甲三年成。宋人得了这种甲，拆开看，也学不会。"
      ],
      options: [
        { text: "专做甲，卖与军", hint: "银钱 +12；身体 −7", effects: [{ k: "silver", v: 12 }, { k: "body", v: -7 }] },
        { text: "做甲片，零卖", hint: "银钱 +7；稳", effects: [{ k: "silver", v: 7 }] },
        { text: "把法子卖给宋商", hint: "银钱 +16；罪重", effects: [{ k: "silver", v: 16 }, { k: "grudge", v: 9 }] }
      ]
    },

    {
      id: "xx10.script", cat: "文事", title: "番文", age: [14, 60], weight: 12, when: { minKnowledge: 8 },
      text: [
        "国中自有文字，笔画繁，一字一义。官府文书、佛经，都用这种字。",
        "印经要刻板，刻工要识字。识字的人少，刻工更少。"
      ],
      options: [
        { text: "学这种字", hint: "知识 +8；银钱少", effects: [{ k: "knowledge", v: 8 }, { k: "official", v: 3 }] },
        { text: "做刻工", hint: "银钱 +7；知识 +3", effects: [{ k: "silver", v: 7 }, { k: "knowledge", v: 3 }] },
        { text: "学汉文，做通译", hint: "银钱 +9；两头吃香", effects: [{ k: "silver", v: 9 }, { k: "favor", v: 3 }] }
      ]
    },

    {
      id: "xx10.camel", cat: "营生", title: "驼队", age: [18, 60], weight: 11,
      text: [
        "沙漠里走货，靠骆驼。一队三十匹，驮绢、驮茶、驮铁。",
        "走一趟三个月。回来的时候，人少一两个，是常有的事。"
      ],
      options: [
        { text: "跟队走一趟", hint: "银钱 +13；身体 −9", effects: [{ k: "silver", v: 13 }, { k: "body", v: -9 }] },
        { text: "出骆驼，抽份子", hint: "银钱 +8；不出门", effects: [{ k: "silver", v: 8 }] },
        { text: "留在城里做中人", hint: "银钱 +6；见识广", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "xx10.canal", cat: "乡里", title: "汉渠", age: [18, 65], weight: 10,
      text: [
        "河套的渠，从汉朝就有了。渠水一放，一片地都能种稻。",
        "渠要年年修。修渠的夫，按户出。"
      ],
      options: [
        { text: "出夫修渠", hint: "身体 −7；田 +5", effects: [{ k: "body", v: -7 }, { k: "field_wet", v: 5 }] },
        { text: "出钱免夫", hint: "银钱 −7；田 +3", effects: [{ k: "silver", v: -7 }, { k: "field_wet", v: 3 }] },
        { text: "不修，靠天", hint: "田 0；省力", effects: [{ k: "body", v: 2 }] }
      ]
    }
  ]);

  /* ══════════ 北宋 ══════════ */
  B.eraEvents.bsong = (B.eraEvents.bsong || []).concat([

    {
      id: "b10.rukiln", cat: "营生", title: "汝窑", age: [16, 55], weight: 14,
      text: [
        "{{汝窑|北宋官窑，为宫廷烧瓷，釉色天青}}为宫中烧器，釉色如雨过天青，带细开片。",
        "一窑只取几件，其余打碎埋掉——不许有一件流出去。"
      ],
      options: [
        { text: "照规矩，余者埋了", hint: "银钱 −4；名声正", effects: [{ k: "silver", v: -4 }, { k: "fame", v: 6 }] },
        { text: "藏两件", hint: "银钱 +16；事发则死", effects: [{ k: "silver", v: 16 }, { k: "grudge", v: 8 }, { k: "luck", v: -3 }] },
        { text: "改烧民用器", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }] }
      ]
    },

    {
      id: "b10.jiaozi", cat: "市井", title: "交子", age: [18, 60], weight: 13,
      text: [
        "{{交子|四川商人发行的纸币，后归官办}}一张，可换钱一贯。轻，好带，商人爱用。",
        "只是印得多了，就换不出钱来。"
      ],
      options: [
        { text: "收交子，图方便", hint: "银钱 +5；或有折", effects: [{ k: "silver", v: 5 }, { k: "luck", v: -2 }] },
        { text: "收钱，不收交子", hint: "银钱 +3；客少", effects: [{ k: "silver", v: 3 }] },
        { text: "低价收旧交子，等换", hint: "银钱 +9；押官信", effects: [{ k: "silver", v: 9 }, { k: "luck", v: -1 }] }
      ]
    },

    {
      id: "b10.tea", cat: "营生", title: "团茶", age: [16, 60], weight: 12,
      text: [
        "{{龙凤团茶|北宋贡茶，压成饼，印龙凤纹}}：茶压成饼，印上龙凤，一斤值金二两。",
        "采茶要在天明前，露水未干时。芽要一枪一旗。"
      ],
      options: [
        { text: "做贡茶", hint: "银钱 +10；催得死", effects: [{ k: "silver", v: 10 }, { k: "body", v: -6 }] },
        { text: "做散茶，卖与常人", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }] },
        { text: "贩茶到边市换马", hint: "银钱 +12；路远", effects: [{ k: "silver", v: 12 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "b10.ship", cat: "营生", title: "船坞", age: [18, 55], weight: 12,
      text: [
        "明州的船坞造海船，有龙骨，有隔舱，一舱破了，别的舱还是干的。",
        "出海的船，要能扛风。木要选老的，钉要选铁的，缝要填桐油灰与麻。"
      ],
      options: [
        { text: "造海船，卖与商", hint: "银钱 +12；压本", effects: [{ k: "silver", v: 12 }, { k: "body", v: -5 }] },
        { text: "造内河船", hint: "银钱 +6；快", effects: [{ k: "silver", v: 6 }] },
        { text: "自造一船，跑海商", hint: "银钱 −10；或大赚或沉", effects: [{ k: "silver", v: -10 }],
          gamble: { winChance: 0.5, win: [{ k: "silver", v: 40 }, { k: "fame", v: 6 }], lose: [{ k: "silver", v: -6 }, { k: "body", v: -6 }],
            winNote: "船回港那天，舱里是香料和犀角。一条船的利，够买三十亩地。",
            loseNote: "船没回来。有人说在海上遇了风，也有人说遇了盗。" } }
      ]
    },

    {
      id: "b10.books", cat: "文事", title: "书坊", age: [16, 60], weight: 11,
      text: [
        "杭州、建阳的书坊，刻书卖书。一部大书，刻板三百片，卖五百部才回本。",
        "书坊也刻话本、刻医书、刻历书——读书人少，买书的人多。"
      ],
      options: [
        { text: "刻经史", hint: "银钱 +7；卖得慢", effects: [{ k: "silver", v: 7 }, { k: "fame", v: 4 }] },
        { text: "刻话本", hint: "银钱 +10；被人轻看", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -3 }] },
        { text: "刻医书、历书", hint: "银钱 +9；到处卖得动", effects: [{ k: "silver", v: 9 }, { k: "knowledge", v: 2 }] }
      ]
    },

    {
      id: "b10.sugar", cat: "营生", title: "糖冰", age: [16, 55], weight: 10,
      text: [
        "{{糖霜|宋代冰糖，四川遂宁为盛}}之法传开了：蔗汁熬浓，插竹片，盖上瓦，七日成霜。",
        "一瓮糖霜，值绢一匹。"
      ],
      options: [
        { text: "开坊做糖霜", hint: "银钱 +11；要本钱", effects: [{ k: "silver", v: 11 }, { k: "body", v: -4 }] },
        { text: "种蔗卖给糖坊", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }, { k: "grain", v: -4 }] },
        { text: "贩糖霜到北方", hint: "银钱 +13；路上受潮", effects: [{ k: "silver", v: 13 }, { k: "luck", v: -2 }] }
      ]
    }
  ]);

  /* ══════════ 金 ══════════ */
  B.eraEvents.jin = (B.eraEvents.jin || []).concat([

    {
      id: "j10.armor", cat: "军旅", title: "铁浮屠", age: [18, 55], weight: 13,
      text: [
        "重甲骑兵，人马都披甲，三马相连，冲锋时如墙推进，叫作{{铁浮屠}}。",
        "一副马甲，要用铁四十斤，皮二十张，匠人做半年。"
      ],
      options: [
        { text: "做马甲", hint: "银钱 +12；身体 −7", effects: [{ k: "silver", v: 12 }, { k: "body", v: -7 }] },
        { text: "修甲", hint: "银钱 +6；天天有活", effects: [{ k: "silver", v: 6 }] },
        { text: "做轻甲，卖与步卒", hint: "银钱 +8；量大", effects: [{ k: "silver", v: 8 }] }
      ]
    },

    {
      id: "j10.salt", cat: "官府", title: "盐引", age: [18, 60], weight: 11,
      text: [
        "盐由官卖，商人领{{引|盐的运销凭证}}，到指定地方支盐，到指定地方卖。",
        "引有定额，多一两是私盐。"
      ],
      options: [
        { text: "领引，照规矩卖", hint: "银钱 +7；受制", effects: [{ k: "silver", v: 7 }, { k: "official", v: 3 }] },
        { text: "夹带私盐", hint: "银钱 +12；有查", effects: [{ k: "silver", v: 12 }, { k: "grudge", v: 5 }] },
        { text: "把引转卖", hint: "银钱 +9；不劳而获", effects: [{ k: "silver", v: 9 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "j10.paper", cat: "营生", title: "北纸", age: [16, 55], weight: 10,
      text: [
        "金的纸，不如南边细。可北边读书人也多，纸不够用。",
        "有人用旧账纸、废公文回槽重造，造出来的纸带墨点。"
      ],
      options: [
        { text: "做新纸", hint: "银钱 +6；成本高", effects: [{ k: "silver", v: 6 }] },
        { text: "回槽造还魂纸", hint: "银钱 +8；纸带墨点", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -2 }] },
        { text: "专供官署", hint: "银钱 +9；有定额", effects: [{ k: "silver", v: 9 }, { k: "official", v: 4 }] }
      ]
    },

    {
      id: "j10.horse", cat: "营生", title: "群牧", age: [16, 60], weight: 11,
      text: [
        "金人以马为命。群牧所养马，一匹马的草料，抵三个人吃。",
        "马要跑，要养在草地上；圈在厩里的马，两年就废了。"
      ],
      options: [
        { text: "领养官马", hint: "银钱 −4；日后可抵役", effects: [{ k: "silver", v: -4 }, { k: "luck", v: 3 }] },
        { text: "自家养几匹，卖与军中", hint: "银钱 +9；草料贵", effects: [{ k: "silver", v: 9 }, { k: "body", v: -4 }] },
        { text: "做马蹄铁", hint: "银钱 +5；活轻", effects: [{ k: "silver", v: 5 }] }
      ]
    },

    {
      id: "j10.thunder", cat: "军旅", title: "火器", age: [20, 55], weight: 10,
      text: [
        "军中有铁罐，装火药，点着扔出去，声如雷，叫{{震天雷}}。",
        "配药是险事。药坊炸过两次，死了七个人。"
      ],
      options: [
        { text: "在药坊配药", hint: "银钱 +10；或炸死", effects: [{ k: "silver", v: 10 }, { k: "body", v: -5 }],
          gamble: { winChance: 0.8, win: [], lose: [{ k: "body", v: -14 }], deathChance: 0.5, cause: "药炸",
            loseNote: "药碾子一响，屋顶就没了。你被掀到墙根，耳朵三个月听不见。" } },
        { text: "铸铁罐", hint: "银钱 +7；稳妥", effects: [{ k: "silver", v: 7 }] },
        { text: "不干，换个营生", hint: "银钱 −2；保命", effects: [{ k: "silver", v: -2 }] }
      ]
    }
  ]);

  /* ══════════ 南宋 ══════════ */
  B.eraEvents.nsong = (B.eraEvents.nsong || []).concat([

    {
      id: "n10.longquan", cat: "营生", title: "龙泉", age: [16, 55], weight: 14,
      text: [
        "龙泉的窑，烧厚釉青瓷，釉厚如堆脂，出窑时带粉青、梅子青。",
        "一窑装三千件，烧三日，耗柴十万斤。"
      ],
      options: [
        { text: "烧厚釉精品", hint: "银钱 +11；成品少", effects: [{ k: "silver", v: 11 }, { k: "fame", v: 5 }] },
        { text: "烧日用器，贩到海外", hint: "银钱 +13；量大", effects: [{ k: "silver", v: 13 }, { k: "body", v: -4 }] },
        { text: "替窑主做工", hint: "银钱 +5；身体 −5", effects: [{ k: "silver", v: 5 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "n10.seatrade", cat: "市井", title: "市舶", age: [20, 60], weight: 13,
      text: [
        "泉州、明州的市舶司，抽解十分之一。海船回来，货要报，税要交。",
        "一船香料、象牙、犀角，抽解之后还是厚利。"
      ],
      options: [
        { text: "照实报货", hint: "银钱 +12；安稳", effects: [{ k: "silver", v: 12 }, { k: "official", v: 3 }] },
        { text: "藏一部分不报", hint: "银钱 +18；有查没", effects: [{ k: "silver", v: 18 }, { k: "grudge", v: 7 }] },
        { text: "替舶商做通译", hint: "银钱 +8；见识广", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 4 }] }
      ]
    },

    {
      id: "n10.kesi", cat: "营生", title: "缂丝", age: [14, 55], weight: 12,
      text: [
        "{{缂丝|以通经断纬织成的丝织品，如画}}：小梭一梭一梭织，纬断而经连，织出来像画。",
        "一幅缂丝，一年织不完。"
      ],
      options: [
        { text: "接大件，慢慢织", hint: "银钱 +14；身体 −6", effects: [{ k: "silver", v: 14 }, { k: "body", v: -6 }] },
        { text: "织小件，卖与富人", hint: "银钱 +8", effects: [{ k: "silver", v: 8 }] },
        { text: "改织绢，走量", hint: "银钱 +6；手艺荒", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "n10.bamboopaper", cat: "营生", title: "竹纸", age: [16, 55], weight: 11,
      text: [
        "南方的竹，三年可伐。嫩竹沤烂，捣成浆，抄成纸，比麻纸细，比皮纸贱。",
        "印书的人爱用竹纸——便宜，字也吃得进墨。"
      ],
      options: [
        { text: "开槽做竹纸", hint: "银钱 +9；要水", effects: [{ k: "silver", v: 9 }, { k: "body", v: -4 }] },
        { text: "贩纸给书坊", hint: "银钱 +8", effects: [{ k: "silver", v: 8 }] },
        { text: "做加工纸，洒金、染色", hint: "银钱 +10；本钱高", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 3 }] }
      ]
    },

    {
      id: "n10.compass", cat: "营生", title: "针路", age: [18, 60], weight: 11,
      text: [
        "海船上有了{{指南针|以磁针水浮或悬丝指方向}}，阴天也能辨向。船工把针路一条一条记下来。",
        "针路是本钱，写在簿子上，不轻易给人看。"
      ],
      options: [
        { text: "学针路，做火长", hint: "银钱 +11；知识 +6", effects: [{ k: "silver", v: 11 }, { k: "knowledge", v: 6 }] },
        { text: "抄针路卖钱", hint: "银钱 +13；被人恨", effects: [{ k: "silver", v: 13 }, { k: "grudge", v: 6 }] },
        { text: "做磁针，卖与船家", hint: "银钱 +7", effects: [{ k: "silver", v: 7 }] }
      ]
    },

    {
      id: "n10.waterpower", cat: "营生", title: "水排", age: [18, 60], weight: 10,
      text: [
        "水排以水推轮，轮带风箱，鼓风入炉，一日出铁千斤，抵百人。",
        "水排要建在急流处。上游一截，别人就转不动。"
      ],
      options: [
        { text: "建水排，自己炼铁", hint: "银钱 −12；日后大利", effects: [{ k: "silver", v: -12 }, { k: "luck", v: 3 }] },
        { text: "给铁坊做水排", hint: "银钱 +10；有手艺", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 3 }] },
        { text: "守着上游，向人收费", hint: "银钱 +8；结怨", effects: [{ k: "silver", v: 8 }, { k: "grudge", v: 5 }] }
      ]
    }
  ]);

})(window.PACK_BASE);
