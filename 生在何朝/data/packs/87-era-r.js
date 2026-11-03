/* 生在何朝 · 各朝专有事件 卷十八：隋、唐、五代、辽、西夏
 * 这一卷写「籍」与「婚」：谁当色，谁通婚，谁从军，谁守边。
 * 隋唐的界限在门第与色役，五代的界限在兵与民，辽夏的界限在部族与汉人。
 * 每一条界限上都有人被拦在外头。
 * 前缀 t9. / wd9. / l9. / xx9.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = (B.eraEvents.sui || []).concat([

    {
      id: "t9.xiaoguo", cat: "军旅", title: "骁果", age: [18, 40], weight: 15,
      text: [
        "招募{{骁果|隋炀帝募勇健者为骁果，待遇优厚，从驾征伐}}：身长六尺，力能挽强弓者，给钱帛，免其家赋役。",
        "募兵的人看了你的身量，说：「留下。」"
      ],
      options: [
        { text: "应募", hint: "银钱 +8；身体 −8", effects: [{ k: "silver", v: 8 }, { k: "body", v: -8 }, { k: "martial", v: 8 }, { k: "flag", v: "in_army" }],
          then: "发了一匹黄马、一副明光甲。甲亮，穿在身上重得很。" },
        { text: "不应，家里离不开", hint: "无得失", effects: [{ k: "favor", v: 3 }] },
        { text: "应募，但求留守", hint: "钱少些；不上前线", effects: [{ k: "silver", v: 3 }, { k: "martial", v: 3 }] }
      ]
    },

    {
      id: "t9.fanshang", cat: "赋役", title: "番上", age: [20, 45], weight: 13,
      text: [
        "府兵{{番上|轮流到京师宿卫，按距离定番次}}：你在本府当值三月，去京师宿卫一月。",
        "来回的路，自己走；甲、粮、马，自己备。"
      ],
      options: [
        { text: "备齐去", hint: "银钱 −8；身体 −6", effects: [{ k: "silver", v: -8 }, { k: "body", v: -6 }, { k: "official", v: 3 }] },
        { text: "雇人代番", hint: "银钱 −12；免行", effects: [{ k: "silver", v: -12 }] },
        { text: "称病不去", hint: "或有罚", effects: [],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -10 }, { k: "fame", v: -4 }, { k: "body", v: -4 }],
            loseNote: "折冲府来查，病是假的。除名，罚一年赋。" } }
      ]
    },

    {
      id: "t9.dangse", cat: "宗族", title: "当色", age: [14, 25], weight: 12,
      text: [
        "{{当色为婚|唐代乐户、杂户、官户等贱口，只能同类通婚，不得与良人婚配}}：你家是乐户，册上写着。",
        "有良人家的儿子看中了你，托人来问。"
      ],
      options: [
        { text: "依色为婚，嫁同类", hint: "名正；一生如此", effects: [{ k: "favor", v: 3 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 22 } }] },
        { text: "私自嫁良人", hint: "或有罪；或有情", effects: [{ k: "favor", v: 6 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 24 } }],
          gamble: { winChance: 0.4, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -8 }, { k: "fame", v: -6 }],
            loseNote: "婚事被告到县里。判：「离之。」你被打了一顿，送回原籍。" } },
        { text: "出钱求除乐籍", hint: "银钱 −14；或有转", effects: [{ k: "silver", v: -14 }],
          gamble: { winChance: 0.35, win: [{ k: "fame", v: 5 }], lose: [{ k: "favor", v: -3 }],
            loseNote: "钱收了，籍没除。办事的人说：「再等等。」" } }
      ]
    },

    {
      id: "t9.yimin", cat: "官府", title: "徙民", age: [18, 60], weight: 11,
      text: [
        "诏令：徙天下富商及技艺之家数万户入东都，充实京师。",
        "你家的名在册上，限期一月。"
      ],
      options: [
        { text: "迁", hint: "银钱 −10；或有新机", effects: [{ k: "silver", v: -10 }, { k: "favor", v: 3 }],
          then: "车走了二十天。到洛阳时，落脚的地方是一片新翻的土。" },
        { text: "花钱脱籍", hint: "银钱 −12；留乡", effects: [{ k: "silver", v: -12 }] },
        { text: "让长子先去，家里后走", hint: "分两地；或有转", effects: [{ k: "favor", v: -3 }, { k: "silver", v: 3 }] }
      ]
    },

    {
      id: "t9.budao", cat: "官府", title: "捕盗", age: [16, 65], weight: 11,
      text: [
        "近日盗贼多，令下：盗一钱以上者，弃市；邻里不告者，连坐。",
        "邻家少年偷了人家一只瓜，被人拿住。"
      ],
      options: [
        { text: "照法告官", hint: "免连坐；乡里怨", effects: [{ k: "official", v: 3 }, { k: "favor", v: -8 }, { k: "grudge", v: 6 }] },
        { text: "替他掩下", hint: "或有罪", effects: [{ k: "favor", v: 5 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }],
            loseNote: "有人告到县里。连坐之罪，你和那少年一同枷了三日。" } },
        { text: "让他连夜走", hint: "救一人；自家担着", effects: [{ k: "favor", v: 6 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "t9.yimen", cat: "乡里", title: "义门", age: [18, 60], weight: 9,
      text: [
        "县里报上一户「义门」：五世同居，八百口人不分灶。诏令免其赋役，树牌坊。",
        "族里有人来劝：咱们也报一个。"
      ],
      options: [
        { text: "报", hint: "免役；家中难合", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 6 }, { k: "favor", v: -4 }],
          then: "牌坊立起来那天，三房的人为了分粮吵了一架，声音传到了牌坊底下。" },
        { text: "不报", hint: "各过各的", effects: [{ k: "favor", v: 3 }] },
        { text: "报，但先把家法立好", hint: "学识 +4；名声好", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 5 }, { k: "silver", v: 3 }] }
      ]
    }
  ]);

  /* ══════════ 唐 ══════════ */
  B.eraEvents.tang = (B.eraEvents.tang || []).concat([

    {
      id: "t9.maihun", cat: "家族", title: "卖婚", age: [16, 30], weight: 14,
      text: [
        "{{卖婚|唐代士族嫁女多索重聘，太宗、高宗屡诏禁之而不能止}}：山东旧族嫁女，聘财要五百贯。",
        "媒人说：「他家的门第在那儿。你若不要这个价，人家还看不上你。」"
      ],
      options: [
        { text: "照数纳聘", hint: "银钱 −14；门第好", effects: [{ k: "silver", v: -14 }, { k: "fame", v: 6 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }] },
        { text: "娶寒门女", hint: "银钱 −4；被族里轻看", effects: [{ k: "silver", v: -4 }, { k: "fame", v: -2 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 18 } }] },
        { text: "去告他家违诏", hint: "或有官赏；结大怨", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 12 }] }
      ]
    },

    {
      id: "t9.heti", cat: "赋役", title: "和籴", age: [18, 65], weight: 13,
      text: [
        "{{和籴|官府按价购粮，实为摊派，价低而不得不多卖}}：官府来买粮，价四十文一斗，市价七十。",
        "吏说：「不卖，就是抗令。」"
      ],
      options: [
        { text: "卖一半", hint: "粮 −12；银钱 +4", effects: [{ k: "grain", v: -12 }, { k: "silver", v: 4 }] },
        { text: "全卖", hint: "粮 −20；银钱 +6", effects: [{ k: "grain", v: -20 }, { k: "silver", v: 6 }, { k: "official", v: 2 }] },
        { text: "报说无粮", hint: "或有查", effects: [],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "grain", v: -14 }, { k: "body", v: -6 }],
            loseNote: "吏带人掀了你的仓。谷堆得比人高。" } }
      ]
    },

    {
      id: "t9.changzheng", cat: "军旅", title: "健儿", age: [18, 45], weight: 12,
      text: [
        "府兵已坏。节度使募{{长征健儿|职业兵，长期戍边，家属随军}}，给田、给粮，久任不换。",
        "应募的人说：「去了就是一辈子。」"
      ],
      options: [
        { text: "应募", hint: "银钱 +6；落户边地", effects: [{ k: "silver", v: 6 }, { k: "martial", v: 6 }, { k: "body", v: -5 }, { k: "flag", v: "in_army" }] },
        { text: "留在本州做团练", hint: "身体 −4；不出境", effects: [{ k: "body", v: -4 }, { k: "martial", v: 3 }] },
        { text: "不去，躲避征点", hint: "或有罚", effects: [],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }],
            loseNote: "点兵的人翻了三遍册子，还是把你翻出来了。" } }
      ]
    },

    {
      id: "t9.mufu", cat: "官府", title: "入幕", age: [20, 50], weight: 11,
      text: [
        "节度使幕府招人：掌书记、推官、巡官。入了幕，就算有了出身。",
        "有人替你引荐。幕主看了你的字，说：「可以。」"
      ],
      options: [
        { text: "入幕", hint: "银钱 +5；随幕主起落", effects: [{ k: "silver", v: 5 }, { k: "official", v: 8 }, { k: "favor", v: 5 }],
          then: "幕中政务杂，写字写到半夜。幕主说：「你写得比我稳。」" },
        { text: "不入，回家应举", hint: "学识 +6；无俸", effects: [{ k: "knowledge", v: 6 }] },
        { text: "入幕，但只掌文书", hint: "学识 +5；不涉兵事", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 4 }] }
      ]
    },

    {
      id: "t9.yingji", cat: "市井", title: "营妓", age: [16, 28], weight: 10, sex: "female",
      text: [
        "乐营里有{{营妓|唐代军镇乐营中的妓女，供宴饮歌舞，多籍没或买来}}，习歌舞，侍宴。",
        "你被卖进来那年十四。营将说：「学会一支舞，就有饭吃。」"
      ],
      options: [
        { text: "学歌舞，讨人欢喜", hint: "银钱 +6；身不由己", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 3 }, { k: "favor", v: -3 }] },
        { text: "攒钱赎身", hint: "银钱 −10；或有自由", effects: [{ k: "silver", v: -10 }],
          gamble: { winChance: 0.4, win: [{ k: "fame", v: 4 }], lose: [{ k: "favor", v: -4 }],
            loseNote: "钱交上去，籍没放。营将说：「再等两年。」" } },
        { text: "托人嫁出去", hint: "或有家；或不成", effects: [],
          gamble: { winChance: 0.45, win: [{ k: "addPerson", v: { role: "husband", rel: "夫", age: 26 } }, { k: "fame", v: 2 }], lose: [{ k: "favor", v: -3 }],
            loseNote: "来赎的人到了营门口，被拦下了。营将说：「她还欠着账。」" } }
      ]
    },

    {
      id: "t9.chaike", cat: "赋役", title: "差科", age: [18, 60], weight: 12,
      text: [
        "里正拿{{差科簿|唐代按户等轮流差派的簿册}}来点差：修渠、运粮、守门、送公文，按户等派。",
        "你家是九等户里的第六等。"
      ],
      options: [
        { text: "照派", hint: "身体 −8；免是非", effects: [{ k: "body", v: -8 }] },
        { text: "给里正送些东西，改派轻差", hint: "银钱 −5；差轻", effects: [{ k: "silver", v: -5 }, { k: "favor", v: 3 }] },
        { text: "称家里有老人要养", hint: "或有转；或不成", effects: [],
          gamble: { winChance: 0.5, win: [{ k: "favor", v: 3 }], lose: [{ k: "body", v: -6 }, { k: "fame", v: -2 }],
            loseNote: "里正说：「有老人的不止你一家。」" } }
      ]
    }
  ]);

  /* ══════════ 五代 ══════════ */
  B.eraEvents.wudai = (B.eraEvents.wudai || []).concat([

    {
      id: "wd9.yangzi", cat: "军旅", title: "义儿", age: [14, 40], weight: 15,
      text: [
        "{{义儿|五代藩镇多收养子为将，赐姓，视为亲子，亦为质}}：节度使收你为义儿，赐他的姓，编入{{义儿军|亲军}}。",
        "他说：「从今日起，你姓我的姓。」"
      ],
      options: [
        { text: "认", hint: "改姓；有前程", effects: [{ k: "official", v: 6 }, { k: "favor", v: 5 }, { k: "fame", v: -3 }],
          then: "你改了姓。回家祭祖时，祖父的牌位上写的还是旧姓。" },
        { text: "认，但不改姓", hint: "或有怒", effects: [{ k: "favor", v: -4 }, { k: "fame", v: 3 }] },
        { text: "不认", hint: "失机会；被人笑", effects: [{ k: "fame", v: -2 }] }
      ]
    },

    {
      id: "wd9.kuoma", cat: "军旅", title: "括马", age: [18, 60], weight: 12,
      text: [
        "军府{{括马|强征民间马匹充军}}：民间马匹，一律登记，战时征用。",
        "你家有一头驴，一头老马。吏说：「马要，驴也要。」"
      ],
      options: [
        { text: "交上去", hint: "银钱 −6；免祸", effects: [{ k: "silver", v: -6 }] },
        { text: "把马藏到山里", hint: "或有查", effects: [{ k: "silver", v: 3 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -10 }, { k: "body", v: -6 }],
            loseNote: "搜山的人找到了。马牵走，另罚一副鞍钱。" } },
        { text: "把驴报成马，马留下", hint: "或有验", effects: [{ k: "luck", v: 1 }],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 4 }], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }],
            loseNote: "吏看了看驴，又看了看你，笑了。笑完打了一顿。" } }
      ]
    },

    {
      id: "wd9.kuodi", cat: "赋役", title: "括籴", age: [18, 65], weight: 12,
      text: [
        "军粮不足，{{括籴|强征民间存粮，给价极低或竟不给}}：除口粮外，余粮尽数入官。",
        "吏带着斗来了，先看灶，再看仓。"
      ],
      options: [
        { text: "照数交", hint: "粮 −16；免祸", effects: [{ k: "grain", v: -16 }] },
        { text: "藏一部分在地窖", hint: "或有查", effects: [{ k: "grain", v: 4 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "grain", v: -14 }, { k: "body", v: -6 }],
            loseNote: "地窖的土是新翻的。吏看了一眼，让人挖开。" } },
        { text: "把粮换成钱藏起来", hint: "银钱 +5；粮空", effects: [{ k: "silver", v: 5 }, { k: "grain", v: -10 }] }
      ]
    },

    {
      id: "wd9.taohu", cat: "乡里", title: "逃户", age: [18, 60], weight: 11,
      text: [
        "村里的田荒了一半，人都走了，赋税还在册上。里正把逃户的税摊到留下的人头上。",
        "你家五口，今年要交十口的税。"
      ],
      options: [
        { text: "照摊", hint: "银钱 −12；留乡", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 3 }] },
        { text: "也逃", hint: "身体 −10；田荒", effects: [{ k: "body", v: -10 }, { k: "field_dry", v: -4 }, { k: "flag", v: "fugitive" }],
          then: "你带着家人往南走。走到第三个县，才知道天下都是这样。" },
        { text: "把逃户的田佃下来种", hint: "田 +4；税重", effects: [{ k: "field_dry", v: 4 }, { k: "silver", v: -6 }] }
      ]
    },

    {
      id: "wd9.didian", cat: "市井", title: "邸店", age: [20, 60], weight: 10,
      text: [
        "节度使设{{回图务|藩镇经营的商业机构，以邸店、贸易牟利}}，把军中的绢、盐拿出来卖，也放贷。",
        "管事来问：愿不愿意替他管一间邸店？"
      ],
      options: [
        { text: "管", hint: "银钱 +8；替他赚钱", effects: [{ k: "silver", v: 8 }, { k: "favor", v: 5 }],
          then: "邸店在城门边，往来的人多。账面上的钱，一半不是你的。" },
        { text: "不管，自己开一间小的", hint: "银钱 +4；要借钱", effects: [{ k: "silver", v: 4 }, { k: "debt", v: { amt: 6, rate: 0.05, dueYears: 1 } }] },
        { text: "管，但私留一成", hint: "银钱 +12；或有查", effects: [{ k: "silver", v: 12 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -8 }],
            loseNote: "账对不上。管事没报官，只是让你把手指留在桌上。" } }
      ]
    },

    {
      id: "wd9.yanfa", cat: "市井", title: "蚕盐", age: [18, 65], weight: 10,
      text: [
        "{{蚕盐|五代至宋，官按户配盐，折钱于夏秋税中征收}}：按户配盐，一斤作价三十文，钱在秋税里收。",
        "盐是粗的，带苦味。不要也不行。"
      ],
      options: [
        { text: "领了", hint: "银钱 −4；有盐", effects: [{ k: "silver", v: -4 }] },
        { text: "领了转卖", hint: "银钱 +2；或有查", effects: [{ k: "silver", v: 2 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -8 }, { k: "body", v: -4 }],
            loseNote: "私盐有禁。买你盐的人，是巡院的人。" } },
        { text: "说家里人口少，求减半", hint: "或有转", effects: [{ k: "favor", v: 2 }],
          gamble: { winChance: 0.45, win: [{ k: "silver", v: 2 }], lose: [{ k: "silver", v: -3 }, { k: "fame", v: -2 }],
            loseNote: "吏说：「户口册上五口。」" } }
      ]
    }
  ]);

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = (B.eraEvents.liao || []).concat([

    {
      id: "l9.woluduo", cat: "官府", title: "宫分", age: [16, 55], weight: 15,
      text: [
        "{{斡鲁朵|辽帝及后妃的宫帐，所属民户称宫分户，世代属宫，不服州县}}：你家的名字在宫分册上。",
        "宫分户不服州县，也不得自由迁徙。"
      ],
      options: [
        { text: "认了", hint: "粮 +6；不得迁徙", effects: [{ k: "grain", v: 6 }, { k: "favor", v: 2 }] },
        { text: "逃入州县", hint: "身体 −8；或有查", effects: [{ k: "body", v: -8 }],
          gamble: { winChance: 0.45, win: [{ k: "luck", v: 2 }], lose: [{ k: "body", v: -10 }, { k: "favor", v: -5 }],
            loseNote: "宫分的人追到州县，州县不敢留。你被带回去，脸上刺了字。" } },
        { text: "投到汉人州县做佃", hint: "粮 +4；两头不认", effects: [{ k: "grain", v: 4 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "l9.dacaogu", cat: "军旅", title: "打草谷", age: [16, 50], weight: 13,
      text: [
        "{{打草谷|辽军南下就粮，纵兵掠取民间财物人口}}：军令下来，南边就粮，各军自取。",
        "队里有人说：「去了，牛羊人口，都是自己的。」"
      ],
      options: [
        { text: "跟着去", hint: "银钱 +10；名声坏", effects: [{ k: "silver", v: 10 }, { k: "fame", v: -6 }, { k: "grudge", v: 5 }],
          then: "回来时，马上多了两匹绢、一口锅，还有一个不说话的男孩。" },
        { text: "只取粮，不掠人", hint: "粮 +8；心里过得去", effects: [{ k: "grain", v: 8 }, { k: "fame", v: 2 }] },
        { text: "不去", hint: "被同伍轻看", effects: [{ k: "fame", v: -3 }, { k: "favor", v: -3 }] }
      ]
    },

    {
      id: "l9.shixuan", cat: "官府", title: "世选", age: [18, 50], weight: 11,
      text: [
        "{{世选|辽代部族官多由某几家世袭选任，不历科举}}：部族令稳出缺，由族中几家推人。",
        "你家是其中一家，但排第三。"
      ],
      options: [
        { text: "去争", hint: "或有位；结怨", effects: [{ k: "official", v: 6 }],
          gamble: { winChance: 0.4, win: [{ k: "official", v: 5 }, { k: "fame", v: 5 }], lose: [{ k: "grudge", v: 10 }, { k: "favor", v: -4 }],
            loseNote: "推上去的是第二家。你家的人回来，一句话没说。" } },
        { text: "让给他们，换些实惠", hint: "银钱 +6；不结怨", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 4 }] },
        { text: "不去争，去学汉文", hint: "学识 +7；南面官或可", effects: [{ k: "knowledge", v: 7 }] }
      ]
    },

    {
      id: "l9.nanmian", cat: "官府", title: "南面", age: [18, 55], weight: 12,
      text: [
        "辽制分南北面：北面治部族，南面治汉人州县。南面官用汉人，行汉法，也收汉赋。",
        "你在汉人州县里，能读写。有人说：「去考南面官的令史。」"
      ],
      options: [
        { text: "去考", hint: "学识 +4；有差事", effects: [{ k: "knowledge", v: 4 }, { k: "official", v: 6 }, { k: "silver", v: 3 }] },
        { text: "不去，种田", hint: "身体 −3；自在", effects: [{ k: "body", v: -3 }, { k: "field_dry", v: 2 }] },
        { text: "去，但替汉人说话", hint: "民心；上峰不悦", effects: [{ k: "fame", v: 6 }, { k: "official", v: -3 }, { k: "favor", v: 4 }] }
      ]
    },

    {
      id: "l9.shengkou", cat: "世变", title: "生口", age: [14, 55], weight: 11,
      text: [
        "军前{{生口|俘获的人口，沦为奴婢，鬻于市}}：俘虏在市场上卖，一个壮男五匹绢，妇人三匹。",
        "有个妇人抱着孩子，一直看着你。"
      ],
      options: [
        { text: "买下她母子", hint: "银钱 −8；家里多两口", effects: [{ k: "silver", v: -8 }, { k: "favor", v: 5 }, { k: "grain", v: -6 }],
          then: "她跪下来磕头。你说：「不必。」她还是磕了三个。" },
        { text: "走开", hint: "无得失", effects: [{ k: "luck", v: -2 }] },
        { text: "买下转卖", hint: "银钱 +8；心里有愧", effects: [{ k: "silver", v: 8 }, { k: "fame", v: -4 }] }
      ]
    },

    {
      id: "l9.zhuozhang", cat: "官府", title: "著帐", age: [12, 50], weight: 9,
      text: [
        "{{著帐户|辽宫帐所属的奴户，供宫中役使}}：宫中要人，从各宫分户里抽。抽到谁家，谁家出人。",
        "抽到了你家一个女儿。"
      ],
      options: [
        { text: "送去", hint: "家里少一人；得赏", effects: [{ k: "silver", v: 5 }, { k: "favor", v: -6 }] },
        { text: "用另一个孩子替", hint: "换人；心里不安", effects: [{ k: "favor", v: -3 }, { k: "luck", v: -1 }] },
        { text: "花钱免", hint: "银钱 −10；人留住", effects: [{ k: "silver", v: -10 }, { k: "favor", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx9.makui", cat: "军旅", title: "麻魁", age: [16, 40], weight: 13, sex: "female",
      text: [
        "{{麻魁|西夏女兵之称}}：西夏军中用女兵，守堡、运粮，也有上阵的。",
        "点兵的人看了你的手，说：「能拉弓的，都算。」"
      ],
      options: [
        { text: "应点", hint: "身体 −8；有粮饷", effects: [{ k: "body", v: -8 }, { k: "grain", v: 6 }, { k: "martial", v: 6 }] },
        { text: "让丈夫去替", hint: "或有争", effects: [{ k: "favor", v: -3 }] },
        { text: "躲进山里", hint: "身体 −10；家被查", effects: [{ k: "body", v: -10 }, { k: "favor", v: -5 }] }
      ]
    },

    {
      id: "xx9.zhizi", cat: "官府", title: "质子", age: [14, 45], weight: 11,
      text: [
        "{{质子军|西夏以贵戚子弟为质，编为亲军，亦作人质}}：凡任官职者，须送子弟入质子军。",
        "你刚得了职，册上添了一个名字。"
      ],
      options: [
        { text: "送子去", hint: "得职；骨肉分离", effects: [{ k: "official", v: 5 }, { k: "favor", v: -5 }] },
        { text: "送侄儿去", hint: "或有怨", effects: [{ k: "official", v: 4 }, { k: "grudge", v: 8 }] },
        { text: "辞官", hint: "无质；家团圆", effects: [{ k: "favor", v: 6 }, { k: "official", v: -4 }] }
      ]
    },

    {
      id: "xx9.chujia", cat: "方外", title: "僧人", age: [14, 45], weight: 11,
      text: [
        "西夏崇佛，寺院有田、有奴，僧人免役。一户出一个僧人，家里就少一份差。",
        "寺里的师父说：「来，剃了度，就清净了。」"
      ],
      options: [
        { text: "出家", hint: "免役；一生在寺", effects: [{ k: "favor", v: 3 }, { k: "knowledge", v: 6 }, { k: "flag", v: "monk" }],
          then: "剃度那天，头发落在砖地上，扫起來有一小堆。" },
        { text: "不出家，只去做寺户", hint: "粮 +4；替寺种田", effects: [{ k: "grain", v: 4 }, { k: "favor", v: 1 }] },
        { text: "不出家，应役", hint: "身体 −6；自在", effects: [{ k: "body", v: -6 }, { k: "fame", v: 2 }] }
      ]
    },

    {
      id: "xx9.hanli", cat: "官府", title: "汉礼", age: [18, 55], weight: 10,
      text: [
        "朝中争「番礼」与「汉礼」：行番礼者用本族旧俗，行汉礼者用中原仪制。",
        "你在朝中当差，两边都来问你站哪边。"
      ],
      options: [
        { text: "站番礼", hint: "本族亲；汉官远", effects: [{ k: "favor", v: 5 }, { k: "official", v: 3 }] },
        { text: "站汉礼", hint: "学识 +5；或失势", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 4 }, { k: "favor", v: -3 }] },
        { text: "称病不朝", hint: "两不得罪；也无功", effects: [{ k: "body", v: -2 }, { k: "luck", v: 1 }] }
      ]
    },

    {
      id: "xx9.baozhai", cat: "军旅", title: "堡寨", age: [16, 55], weight: 11,
      text: [
        "边上有堡寨，驻兵五十，屯田自给。守堡的官说：「来，给你十亩地，一间屋。」",
        "堡外二十里就是宋人的寨。"
      ],
      options: [
        { text: "去守堡", hint: "田 +4；身体 −6", effects: [{ k: "field_dry", v: 4 }, { k: "body", v: -6 }, { k: "martial", v: 4 }],
          then: "堡墙是夯土的，一人多高。夜里能听见对面寨里的更鼓。" },
        { text: "不去，留在城里", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "去，兼做边贸", hint: "银钱 +7；或有禁", effects: [{ k: "silver", v: 7 }],
          gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -8 }, { k: "body", v: -6 }],
            loseNote: "私下交易被查。货没了，人也被捆了三日。" } }
      ]
    },

    {
      id: "xx9.quechang", cat: "市井", title: "榷场", age: [18, 60], weight: 10,
      text: [
        "宋夏议和，开{{榷场|官方互市口岸}}：宋人以茶、帛换夏人的马、盐、青白盐。",
        "场里抽税，一分货抽一分。"
      ],
      options: [
        { text: "去榷场做买卖", hint: "银钱 +8；或有争", effects: [{ k: "silver", v: 8 }],
          gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -3 }],
            loseNote: "为一批茶的价格和宋商吵起来。场官各罚一半。" } },
        { text: "在场外私下换", hint: "银钱 +10；犯禁", effects: [{ k: "silver", v: 10 }],
          gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -12 }, { k: "body", v: -8 }],
            loseNote: "巡兵来了。私市之货一律没官，人枷半月。" } },
        { text: "替榷场做脚夫", hint: "银钱 +3；身体 −4", effects: [{ k: "silver", v: 3 }, { k: "body", v: -4 }] }
      ]
    }
  ]);

})(window.PACK_BASE);
