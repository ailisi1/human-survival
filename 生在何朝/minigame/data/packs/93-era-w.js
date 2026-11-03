/* 生在何朝 · 各朝专有事件 卷廿三：元、明、清（技艺与物产）
 * 这一卷写「市镇与远洋」：棉从南来，青花从波斯来，白银从海外来。
 * 手艺做到了极处，就成了外销的货；货一出去，一家人的日子就系在海上。
 * 前缀 y10. / m10. / qi9.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = (B.eraEvents.yuan || []).concat([

    {
      id: "y10.cotton", cat: "营生", title: "木棉", age: [12, 55], weight: 15,
      text: [
        "{{木棉|棉花，元代自南方推广，取代麻苎}}种到这边来了。弹棉、纺线、织布，一妇一日可成一匹。",
        "棉布比麻暖，比丝贱。从前穿麻的人，如今穿棉。"
      ],
      options: [
        { text: "学纺棉", hint: "银钱 +6；手艺新", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 3 }] },
        { text: "种棉五亩", hint: "粮 −6；日后有布", effects: [{ k: "grain", v: -6 }, { k: "silver", v: 8 }] },
        { text: "贩棉布到北边", hint: "银钱 +11；路远", effects: [{ k: "silver", v: 11 }, { k: "body", v: -5 }] }
      ]
    },

    {
      id: "y10.bluewhite", cat: "营生", title: "青花", age: [16, 55], weight: 14,
      text: [
        "景德镇的窑，用波斯来的{{苏麻离青|元代青花所用的进口钴料}}画花，烧出来蓝得发黑，带铁锈斑。",
        "画工一日画三十只碗。画坏一只，白瓷就废了。"
      ],
      options: [
        { text: "细画大器", hint: "银钱 +12；废得多", effects: [{ k: "silver", v: 12 }, { k: "fame", v: 5 }] },
        { text: "画日用碗，走量", hint: "银钱 +7", effects: [{ k: "silver", v: 7 }] },
        { text: "画外销的定制花样", hint: "银钱 +14；要照图", effects: [{ k: "silver", v: 14 }, { k: "knowledge", v: 3 }] }
      ]
    },

    {
      id: "y10.nashishi", cat: "营生", title: "织金", age: [16, 55], weight: 12,
      text: [
        "{{纳失失|元代织金锦，以金线织入}}是织金锦：金线作纬，织一片，光晃眼。",
        "金线是官给的。领多少，交多少，一两不许短。"
      ],
      options: [
        { text: "老实织，照数交", hint: "银钱 +6；不得脱籍", effects: [{ k: "silver", v: 6 }, { k: "official", v: 3 }] },
        { text: "刮下一点金屑", hint: "银钱 +10；罪重", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 6 }] },
        { text: "逃出匠籍", hint: "身体 −8；成逃人", effects: [{ k: "body", v: -8 }, { k: "luck", v: 3 }] }
      ]
    },

    {
      id: "y10.seacanal", cat: "军旅", title: "海运", age: [18, 55], weight: 12,
      text: [
        "南粮北运，走海路：从刘家港出海，绕过成山，入直沽。一年运三百万石。",
        "海上风大。船工说：这条路上，年年要沉几条船。"
      ],
      options: [
        { text: "做海船水手", hint: "银钱 +9；身体 −8", effects: [{ k: "silver", v: 9 }, { k: "body", v: -8 }] },
        { text: "在岸上管账", hint: "银钱 +6；安稳", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 2 }] },
        { text: "自己造一条船，承运", hint: "银钱 −14；或大赚或沉", effects: [{ k: "silver", v: -14 }],
          gamble: { winChance: 0.55, win: [{ k: "silver", v: 34 }], lose: [{ k: "silver", v: -8 }, { k: "body", v: -8 }],
            winNote: "船到直沽，粮一石不短。这一趟的脚价，够盖三间瓦房。",
            loseNote: "过了成山，起了东北风。船板裂开，粮全泡了。" } }
      ]
    },

    {
      id: "y10.distill", cat: "市井", title: "烧酒", age: [18, 60], weight: 11,
      text: [
        "用{{蒸馏|以甑蒸酒取露，得高度酒}}之法，酒能烧得极烈，一点就着，叫烧酒。",
        "北方冷，喝这个暖身。可喝多了，打老婆、打孩子，一村都听得见。"
      ],
      options: [
        { text: "开烧锅", hint: "银钱 +10；本钱大", effects: [{ k: "silver", v: 10 }, { k: "body", v: -3 }] },
        { text: "只酿低度酒", hint: "银钱 +5；卖得慢", effects: [{ k: "silver", v: 5 }] },
        { text: "自家喝，不卖", hint: "身体 −4；心里松快", effects: [{ k: "body", v: -4 }, { k: "luck", v: 1 }] }
      ]
    },

    {
      id: "y10.movabletype", cat: "文事", title: "活字", age: [18, 60], weight: 10, when: { minKnowledge: 12 },
      text: [
        "{{活字|元代王祯创木活字，转轮排字}}印书，一字一模，排一版用毕拆开，字还可用。",
        "可汉字太多，检字费时。印大部头合算，印小册子不如刻板。"
      ],
      options: [
        { text: "造一副木活字", hint: "银钱 −10；日后大利", effects: [{ k: "silver", v: -10 }, { k: "knowledge", v: 6 }, { k: "luck", v: 3 }] },
        { text: "只做刻板", hint: "银钱 +7", effects: [{ k: "silver", v: 7 }] },
        { text: "把法子写成书", hint: "银钱 +3；名声传下去", effects: [{ k: "silver", v: 3 }, { k: "fame", v: 6 }, { k: "knowledge", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 明 ══════════ */
  B.eraEvents.ming = (B.eraEvents.ming || []).concat([

    {
      id: "m10.jingdezhen", cat: "营生", title: "官窑", age: [16, 55], weight: 15,
      text: [
        "景德镇有官窑，烧御器。一窑不成，再烧；一器不合式，砸了重做。",
        "窑工是匠籍，世世不得改业。烧坏的瓷器堆成山，叫作{{瓷山}}。"
      ],
      options: [
        { text: "在官窑做画工", hint: "银钱 +8；受管", effects: [{ k: "silver", v: 8 }, { k: "official", v: 3 }] },
        { text: "在民窑做活，接外销", hint: "银钱 +12；活多", effects: [{ k: "silver", v: 12 }, { k: "body", v: -5 }] },
        { text: "逃出匠籍", hint: "身体 −9；脱籍", effects: [{ k: "body", v: -9 }, { k: "luck", v: 2 }] }
      ]
    },

    {
      id: "m10.suxiu", cat: "营生", title: "苏绣", age: [12, 55], weight: 13,
      text: [
        "苏州人家，女儿七八岁就拿针。一幅绣，要绣一年，绣到眼睛坏掉。",
        "一幅好的绣，能换十亩地；绣的人，一辈子没穿过绸。"
      ],
      options: [
        { text: "接大件，细绣", hint: "银钱 +13；身体 −7", effects: [{ k: "silver", v: 13 }, { k: "body", v: -7 }] },
        { text: "绣日用件，走量", hint: "银钱 +6", effects: [{ k: "silver", v: 6 }] },
        { text: "带几个徒弟，抽成", hint: "银钱 +10；名声起", effects: [{ k: "silver", v: 10 }, { k: "fame", v: 4 }] }
      ]
    },

    {
      id: "m10.cottoncloth", cat: "市井", title: "松江布", age: [14, 60], weight: 13,
      text: [
        "松江的布，细密如绫，天下有名。一匹布换一石米，销到北边、销到海外。",
        "纺纱的人一日纺四两，织布的人一日织一匹。"
      ],
      options: [
        { text: "全家纺织", hint: "银钱 +7；身体 −5", effects: [{ k: "silver", v: 7 }, { k: "body", v: -5 }] },
        { text: "开个布庄收布", hint: "银钱 +11；压本", effects: [{ k: "silver", v: 11 }, { k: "favor", v: 3 }] },
        { text: "贩布到边镇", hint: "银钱 +14；路上有税", effects: [{ k: "silver", v: 14 }, { k: "body", v: -6 }] }
      ]
    },

    {
      id: "m10.ink", cat: "文事", title: "徽墨", age: [16, 60], weight: 11,
      text: [
        "徽州的墨，桐油烟、松烟，和以麝香、冰片，捣十万杵，入模成锭。",
        "一块好墨，值银子一两。读书人一辈子用不了几块，可人人要一块。"
      ],
      options: [
        { text: "做墨，供士人", hint: "银钱 +9；名声好", effects: [{ k: "silver", v: 9 }, { k: "fame", v: 4 }] },
        { text: "做墨，供官府", hint: "银钱 +7；有定额", effects: [{ k: "silver", v: 7 }, { k: "official", v: 3 }] },
        { text: "掺假，多赚", hint: "银钱 +12；名声坏", effects: [{ k: "silver", v: 12 }, { k: "fame", v: -7 }] }
      ]
    },

    {
      id: "m10.lacquer", cat: "营生", title: "漆器", age: [16, 55], weight: 10,
      text: [
        "漆器要上一层层漆，一层干三日，一件器物上二十层，半年才成。",
        "剔红最费工：漆堆到百层，再一刀一刀剔出花纹。"
      ],
      options: [
        { text: "做剔红，接富家订单", hint: "银钱 +14；身体 −6", effects: [{ k: "silver", v: 14 }, { k: "body", v: -6 }] },
        { text: "做素漆日用器", hint: "银钱 +7", effects: [{ k: "silver", v: 7 }] },
        { text: "做外销的描金箱", hint: "银钱 +11；照洋样", effects: [{ k: "silver", v: 11 }, { k: "knowledge", v: 2 }] }
      ]
    },

    {
      id: "m10.shipyard", cat: "营生", title: "宝船坞", age: [18, 55], weight: 11,
      text: [
        "龙江的船坞，造过下西洋的大船，长四十四丈，九桅十二帆。",
        "如今不许出海了。坞里只剩修船的活，老匠人还在，图纸收在库里。"
      ],
      options: [
        { text: "修船，混口饭", hint: "银钱 +7", effects: [{ k: "silver", v: 7 }] },
        { text: "偷看旧图纸，学着造", hint: "知识 +6；有禁", effects: [{ k: "knowledge", v: 6 }, { k: "luck", v: -2 }] },
        { text: "转做内河船", hint: "银钱 +9；稳", effects: [{ k: "silver", v: 9 }] }
      ]
    },

    {
      id: "m10.silver", cat: "市井", title: "白银", age: [18, 60], weight: 11,
      text: [
        "{{一条鞭法|明代赋役折银征收}}之后，赋税都折银。可银子从哪来？要从海外来。",
        "市上银贵钱贱，一石米从前值银三钱，如今值五钱。"
      ],
      options: [
        { text: "把粮折银纳", hint: "银钱 −6；不惹事", effects: [{ k: "silver", v: -6 }] },
        { text: "囤银，等更贵", hint: "银钱 +8；押得准", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -1 }] },
        { text: "替人兑银，抽佣", hint: "银钱 +7；要验成色", effects: [{ k: "silver", v: 7 }, { k: "knowledge", v: 3 }] }
      ]
    }
  ]);

  /* ══════════ 清 ══════════ */
  B.eraEvents.qing = (B.eraEvents.qing || []).concat([

    {
      id: "qi9.exportware", cat: "市井", title: "外销瓷", age: [16, 60], weight: 14,
      text: [
        "洋商拿图样来，要按他们的样子画：纹章、圣经故事、西洋花草。",
        "画工没见过那些人，画得怪，可洋商要的就是这个。"
      ],
      options: [
        { text: "照图样画", hint: "银钱 +13；要学新样", effects: [{ k: "silver", v: 13 }, { k: "knowledge", v: 3 }] },
        { text: "画传统花样，卖与内销", hint: "银钱 +8", effects: [{ k: "silver", v: 8 }] },
        { text: "替洋商验货、抽佣", hint: "银钱 +10；通夷语", effects: [{ k: "silver", v: 10 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "qi9.thirteen", cat: "市井", title: "十三行", age: [20, 60], weight: 13,
      text: [
        "广州的洋货行，只许几家做。洋船到港，货要经他们手，税也要经他们手。",
        "行商的牌照值钱，也烫手——洋商欠了税，要行商垫。"
      ],
      options: [
        { text: "入行，做行商", hint: "银钱 +16；或有赔累", effects: [{ k: "silver", v: 16 }, { k: "luck", v: -2 }] },
        { text: "做行里的伙计", hint: "银钱 +9；见识广", effects: [{ k: "silver", v: 9 }, { k: "knowledge", v: 3 }] },
        { text: "私下与洋商交易", hint: "银钱 +14；犯禁", effects: [{ k: "silver", v: 14 }, { k: "grudge", v: 7 }] }
      ]
    },

    {
      id: "qi9.piaohao", cat: "市井", title: "票号", age: [20, 60], weight: 12,
      text: [
        "{{票号|经营汇兑的金融机构，晋商最盛}}一纸汇票，此地存银，彼地取银，凭的是字号，不是官印。",
        "走货的人不再背着银子跑几千里。"
      ],
      options: [
        { text: "在票号做学徒", hint: "银钱 +8；知识 +5", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 5 }] },
        { text: "自己开一号，本小", hint: "银钱 −14；日后厚利", effects: [{ k: "silver", v: -14 }, { k: "luck", v: 3 }] },
        { text: "用票号汇银，省得被劫", hint: "银钱 −3；路上安稳", effects: [{ k: "silver", v: -3 }, { k: "luck", v: 2 }] }
      ]
    },

    {
      id: "qi9.tea", cat: "营生", title: "茶路", age: [18, 60], weight: 12,
      text: [
        "南方的茶，走水路到广州，再出海；也走陆路北上，经张家口到恰克图，换皮毛。",
        "一条茶路，走半年。茶砖压得紧，路上不怕潮。"
      ],
      options: [
        { text: "贩茶北上", hint: "银钱 +13；身体 −7", effects: [{ k: "silver", v: 13 }, { k: "body", v: -7 }] },
        { text: "在本地设茶庄收茶", hint: "银钱 +9；稳", effects: [{ k: "silver", v: 9 }] },
        { text: "压茶砖，专供边贸", hint: "银钱 +11；要本钱", effects: [{ k: "silver", v: 11 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "qi9.cloisonne", cat: "营生", title: "景泰蓝", age: [16, 55], weight: 10,
      text: [
        "铜胎上掐丝，填珐琅釉，烧三次，磨三次，镀金一次。一件要两个月。",
        "这东西原本是宫里用的，如今王公、富商也摆。"
      ],
      options: [
        { text: "做细工，供内府", hint: "银钱 +12；名声高", effects: [{ k: "silver", v: 12 }, { k: "fame", v: 5 }] },
        { text: "做小件，卖与市人", hint: "银钱 +8", effects: [{ k: "silver", v: 8 }] },
        { text: "减一道磨工，赶活", hint: "银钱 +10；釉面糙", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -3 }] }
      ]
    },

    {
      id: "qi9.banprint", cat: "文事", title: "刻书", age: [16, 60], weight: 10,
      text: [
        "官刻、坊刻、家刻，三种书坊。刻一部书，先要访好本子，再校，再刻。",
        "有时一部书里有一句犯忌的话，刻工要自己删掉，删错了要命。"
      ],
      options: [
        { text: "老实刻，不删", hint: "知识 +5；有祸", effects: [{ k: "knowledge", v: 5 }, { k: "luck", v: -3 }] },
        { text: "自己先删干净", hint: "银钱 +7；书不全", effects: [{ k: "silver", v: 7 }, { k: "knowledge", v: 2 }] },
        { text: "只刻医书、农书", hint: "银钱 +8；安稳", effects: [{ k: "silver", v: 8 }, { k: "favor", v: 3 }] }
      ]
    }
  ]);

})(window.PACK_BASE);
