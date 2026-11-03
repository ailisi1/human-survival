/* 生在何朝 · 文事补卷
 * 10 条（c13.*），挂给「隋唐 / 宋 / 元明清」三个时段。
 *
 * 为什么补：文事原 25 条，命中占 1.0%，倍数 0.60 —— 也是写了见不着的题材。
 * 缺的是「书」这件事的另一面：禁、狱、刻、藏、卖、校。
 * 原有的「刻书」「书坊」「活字」「抄书」偏技艺，这一卷偏处境。
 */
(function (B) {
  "use strict";
  B.periods = B.periods || {};

  var WENSHI = [

    {
      id: "c13.shujin", cat: "文事", title: "书禁", age: [20, 65], weight: 13,
      when: { minKnowledge: 20 },
      text: [
        "官府下文，禁{{私史|民间私修的史书，多记当代事，历来为朝廷所忌}}、禁{{妖书|内容涉谶纬、预言、惑众的书}}，限一个月内缴销。",
        "你家里有一部前朝人写的笔记，记的是本朝开国那几年的事。"
      ],
      options: [
        {
          text: "缴了",
          hint: "学识 −4；无祸",
          effects: [{ k: "knowledge", v: -4 }],
          then: "你把书送到县衙，书吏翻了翻，扔进一口大筐。那筐里已经堆了半人高。后来这些书在院后烧了一天一夜。"
        },
        {
          text: "把忌讳的几页撕了，剩下的留着",
          hint: "学识 +3；风险在身",
          effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: -2 }],
          then: "你撕了十七页，剩下的重新装订。往后每回翻到缺页的地方，你都记得那上面写的是什么。"
        },
        {
          text: "整部砌进墙里",
          hint: "学识 +5；日后或有大祸",
          effects: [{ k: "knowledge", v: 5 }],
          schedule: [{ inYears: 6, effects: [{ k: "fame", v: -10 }, { k: "body", v: -5 }], note: "墙里的书被邻人告发，你被枷了三日。" }],
          then: "你用油布裹了三层，砌进灶房后墙。砌完那天晚上，你在院里坐到半夜。"
        }
      ]
    },
    {
      id: "c13.zhiyu", cat: "文事", title: "字狱", age: [25, 70], weight: 11,
      when: { minKnowledge: 35 },
      text: [
        "你十年前写的一首诗被人翻出来了。其中有「清风不识字，何事乱翻书」两句。",
        "有人告到府里，说是讥讽。"
      ],
      options: [
        {
          text: "认罪，求从轻",
          hint: "声望 −16；银钱 −12；保住命",
          effects: [{ k: "fame", v: -16 }, { k: "silver", v: -12 }, { k: "body", v: -6 }],
          then: "你在堂上跪了三个时辰，一句一句解释那两句诗。判下来：革去功名，杖四十，流三百里。你活下来了。"
        },
        {
          text: "辩到底，说只是写景",
          hint: "赌命",
          effects: [{ k: "fame", v: 4 }],
          gamble: { deathChance: 0.35, cause: "文字狱", winChance: 0.3, win: [{ k: "fame", v: 8 }], lose: [{ k: "fame", v: -20 }, { k: "body", v: -12 }], winNote: "府官是个明白人，把案子压了下来，只罚了钱。", loseNote: "判了斩监候。你在狱里蹲了两年，秋审没勾，改流。" }
        },
        {
          text: "连夜把诗稿全烧了",
          hint: "学识 −6；此后不敢写",
          effects: [{ k: "knowledge", v: -6 }, { k: "body", v: -3 }, { k: "fame", v: 2 }],
          then: "你烧了一夜。此后再没写过一句诗。有人问你为什么，你说：不会写。"
        }
      ]
    },
    {
      id: "c13.wenhui", cat: "文事", title: "文会", age: [18, 60], weight: 12,
      when: { minKnowledge: 18 },
      text: [
        "城南几个人凑了个{{文会|士子定期聚会，作诗论文，也互通消息、互相延誉}}，每月初一十五，轮流做东。",
        "有人来请你入会。"
      ],
      options: [
        {
          text: "入会，场场都到",
          hint: "银钱 −4；交游 +10；学识 +4",
          effects: [{ k: "silver", v: -4 }, { k: "favor", v: 10 }, { k: "knowledge", v: 4 }],
          then: "两年里你写了七十多首诗。有一首被人传抄出去，署的是别人的名字。你没争。"
        },
        {
          text: "入会，只带耳朵",
          hint: "交游 +6；学识 +6",
          effects: [{ k: "favor", v: 6 }, { k: "knowledge", v: 6 }],
          then: "你从不先开口，只听。听了三年，你把这一带谁有真本事、谁是空架子，摸得清清楚楚。"
        },
        {
          text: "不入，自己在家读",
          hint: "学识 +8；一个人",
          effects: [{ k: "knowledge", v: 8 }, { k: "favor", v: -4 }],
          then: "你说自己不擅长应酬。他们在会上偶尔提起你，说那人书读得多，就是怪。"
        }
      ]
    },
    {
      id: "c13.runbi", cat: "文事", title: "润笔", age: [22, 65], weight: 12,
      when: { minKnowledge: 28 },
      text: [
        "县里一个富户死了母亲，要做一篇墓志。中人来说：{{润笔|作文写字的酬劳}}给八两。",
        "你没见过那位老太太。"
      ],
      options: [
        {
          text: "写，按套路写足好话",
          hint: "银钱 +8；声望 −2",
          effects: [{ k: "silver", v: 8 }, { k: "fame", v: -2 }],
          then: "你写了「温恭俭素、教子有方」，写了八百字。富户很满意，另送了一匹绢。你一辈子没去过那个村。"
        },
        {
          text: "写，但先去问邻里她是什么人",
          hint: "银钱 +6；声望 +6；费时",
          effects: [{ k: "silver", v: 6 }, { k: "fame", v: 6 }, { k: "body", v: -2 }],
          then: "你跑了三天，问出她年轻时守过寡、救过两个孩子。文章里写了这两件事。富户读完哭了，说这才是我娘。"
        },
        {
          text: "不写，这种钱不挣",
          hint: "声望 +4；银钱 0",
          effects: [{ k: "fame", v: 4 }],
          then: "你说我不认识她，写不出。中人愣了一下，说：现在谁还讲究这个。后来这活给了别人。"
        }
      ]
    },
    {
      id: "c13.cangshu", cat: "文事", title: "藏书", age: [25, 70], weight: 10,
      when: { minKnowledge: 30, minSilver: 10 },
      text: [
        "有人要卖一批书，三百余卷，多是少见的本子。要价三十两。",
        "你手上只有十二两。"
      ],
      options: [
        {
          text: "卖田买书",
          hint: "水田 −4；学识 +12",
          effects: [{ k: "field_wet", v: -4 }, { k: "knowledge", v: 12 }, { k: "fame", v: 4 }],
          then: "书拉回来装了三车。你用了两个月给它们编号、上架、写签。此后二十年，这一带读书人都来你家借书。"
        },
        {
          text: "只挑十几种买",
          hint: "银钱 −10；学识 +6",
          effects: [{ k: "silver", v: -10 }, { k: "knowledge", v: 6 }],
          then: "你挑了十四种，都是别人不要的残本。后来其中一种，是天下孤本。"
        },
        {
          text: "不买，抄一遍",
          hint: "身体 −6；学识 +8",
          effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 8 }],
          then: "你借来抄了四个月，抄满七个本子。抄完那天手腕抬不起来，但那些字进了你的脑子，不是纸上。"
        }
      ]
    },
    {
      id: "c13.sishu", cat: "文事", title: "私刻", age: [25, 70], weight: 10,
      when: { minKnowledge: 30, minSilver: 8 },
      text: [
        "你想把自己这些年写的诗文刻出来。刻一部要八两，印二百部。",
        "刻工说：这种书没人买，多半是送人。"
      ],
      options: [
        {
          text: "刻，印二百部送人",
          hint: "银钱 −8；声望 +8",
          effects: [{ k: "silver", v: -8 }, { k: "fame", v: 8 }, { k: "knowledge", v: 3 }],
          then: "书刻得不错，纸是竹纸。你送出去一百六十部，剩下的堆在屋里。十年后有人拿着这部书来找你，说读过三遍。"
        },
        {
          text: "刻一种实用的，好卖",
          hint: "银钱 −5；回本有赚",
          effects: [{ k: "silver", v: -5 }, { k: "fame", v: 3 }],
          then: "你刻了一部《四民便用》，讲怎么写信、怎么算账、怎么写契。一年卖光，又印了一版。"
        },
        {
          text: "不刻，写给自己看",
          hint: "学识 +4",
          effects: [{ k: "knowledge", v: 4 }],
          then: "你把稿子重新誊了一遍，装成一个本子。封面没写字。你死后三十年，这个本子被人从旧书摊上买走。"
        }
      ]
    },
    {
      id: "c13.beitie", cat: "文事", title: "碑帖", age: [18, 65], weight: 9,
      when: { minKnowledge: 22 },
      text: [
        "山里有块前朝的碑，字极好。有人出四两，请你带他去拓。",
        "拓碑要用纸墨拍打，碑在露天，一回拓不了几张。"
      ],
      options: [
        {
          text: "带他去拓",
          hint: "银钱 +4；碑受损；声望 −3",
          effects: [{ k: "silver", v: 4 }, { k: "fame", v: -3 }, { k: "knowledge", v: 4 }],
          then: "拓了六张。第三张的时候，碑上的字掉了一个角。你们把土填回去，走了。"
        },
        {
          text: "自己先拓，再带他去",
          hint: "学识 +6；银钱 +2",
          effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: 2 }],
          then: "你拓了三张，留下两张。后来那块碑被人砸了，你的拓片成了孤本。"
        },
        {
          text: "不带，报官保护",
          hint: "声望 +6；得罪人",
          effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 5 }],
          then: "县里派人来立了块木牌：禁止拓摹。那人走的时候说：你这人，读书读傻了。碑后来一直完好。"
        }
      ]
    },
    {
      id: "c13.jiaoshu", cat: "文事", title: "校书", age: [22, 70], weight: 9,
      when: { minKnowledge: 35 },
      text: [
        "你手上这部旧书错字极多，抄手抄错了上百处。",
        "校一遍要三个月，校错了就是贻误后人。"
      ],
      options: [
        {
          text: "校，一年校一部",
          hint: "学识 +10；身体 −5",
          effects: [{ k: "knowledge", v: 10 }, { k: "body", v: -5 }, { k: "fame", v: 4 }],
          then: "你校了十一年，校完七部。每部后面写一行小字：某某年某月某校于灯下。没有人知道那是谁。"
        },
        {
          text: "只标出可疑处，不改原文",
          hint: "学识 +6",
          effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 3 }],
          then: "你在眉上写满小字，一个也不动原文。后来这书传下去，读者说：这个本子最可靠。"
        },
        {
          text: "不校，直接抄一部",
          hint: "学识 +2",
          effects: [{ k: "knowledge", v: 2 }],
          then: "你抄了一遍，错的地方照抄。这部书往后又传了三代，错的地方还是那几个。"
        }
      ]
    },
    {
      id: "c13.shusi", cat: "文事", title: "书肆", age: [20, 70], weight: 10,
      text: [
        "县前街有间书肆要盘出去，连书带货，要价二十两。",
        "卖书不挣钱，卖纸笔墨才挣钱。"
      ],
      options: [
        {
          text: "盘下来，兼卖笔墨",
          hint: "银钱 −20；日后有进项",
          effects: [{ k: "silver", v: -20 }, { k: "fame", v: 5 }, { k: "knowledge", v: 4 }],
          then: "前半年只够糊口。后来县学的人都在你这儿买纸，一年能做二十四两。你在柜台后头看了三十年的书，不花钱。"
        },
        {
          text: "只盘书，不盘铺面",
          hint: "银钱 −6；学识 +6",
          effects: [{ k: "silver", v: -6 }, { k: "knowledge", v: 6 }],
          then: "你把书拉回家，挑出好的留下，剩下的按斤卖了废纸。掌柜看着那堆书被抬走，什么也没说。"
        },
        {
          text: "不盘，这行当要赔",
          hint: "什么也没变",
          effects: [],
          then: "铺子被一个山西人盘了。他把书架拆了，改成卖绸缎。三年后那条街上一本书也买不到。"
        }
      ]
    },
    {
      id: "c13.bianshu", cat: "文事", title: "编书", age: [30, 70], weight: 8,
      when: { minKnowledge: 40 },
      text: [
        "府里要修一部方志，聘你去做分纂，一年十二两。",
        "修志讲究「不虚美、不隐恶」，可出钱的是本地几家大族。"
      ],
      options: [
        {
          text: "照实写",
          hint: "声望 +8；得罪大族",
          effects: [{ k: "fame", v: 8 }, { k: "grudge", v: 10 }, { k: "knowledge", v: 6 }],
          then: "你把某族祖上那桩侵占田产的事写进了《杂记》。书刻出来，那家人在县里闹了半年，要毁版。"
        },
        {
          text: "该隐的隐，该写的写",
          hint: "银钱 +4；声望 +3",
          effects: [{ k: "silver", v: 4 }, { k: "fame", v: 3 }, { k: "knowledge", v: 6 }],
          then: "你把大族的丑事写成「某某年间，田界有争，后和」。后人读到这里，懂的人自然懂。"
        },
        {
          text: "只做分内，不多写一字",
          hint: "银钱 +6；书成了空文",
          effects: [{ k: "silver", v: 6 }, { k: "fame", v: -2 }],
          then: "你抄了三年旧档，一个字没添。志书刻出来，厚厚八册，没有一句真话。"
        }
      ]
    }

  ];

  ["suitang", "song", "yuanmingqing"].forEach(function (p) {
    if (!B.periods[p]) return;
    B.periods[p].events = (B.periods[p].events || []).concat(WENSHI);
  });

})(window.PACK_BASE);
