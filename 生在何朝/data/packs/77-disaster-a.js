/* 生在何朝 · 各朝灾祸 卷一：秦、西汉、新、东汉、三国、西晋、东晋、南北朝、隋、唐
 * 通用卷写的是「荒、疫、乱」这三样东西长什么样，
 * 这一卷写的是各朝那一次具体是怎么发生的：哪一年、决了哪条河、死了多少人。
 * 史实只取时间与规模，不写人物褒贬。
 * 前缀 q7. / w7. / x7. / e7. / s7. / wj7. / ej7. / ns7. / su7. / t7.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 秦 ══════════ */
  B.eraEvents.qin = (B.eraEvents.qin || []).concat([

    {
      id: "q7.lishan", cat: "赋役", title: "骊山", age: [14, 50], weight: 16, sex: "male",
      years: [-212, -207],
      text: [
        "骊山下的工地上，人有七十万。",
        "你被编在第三队，运石。一块石，二百斤，从渭水边抬到半山。",
        "监工说：「一人一天三块。少一块，少一顿。」"
      ],
      options: [
        { text: "硬撑着抬", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.15, cause: "力役" }, then: "你抬了八个月。同队的一百二十人，最后剩六十一个。" },
        { text: "装病", hint: "身体 −6；或有罚", effects: [{ k: "body", v: -6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -12 }], loseNote: "监工验病，用杖戳你的腿。你动了，被打了二十杖，还是去抬。" }, then: "你躺在草棚里，听见外头石头落地的声音，一下一下。" },
        { text: "夜里逃", hint: "身体 −10；逃了就是亡人", effects: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.18, cause: "捕亡" }, then: "你趁夜往东走。秦法：亡人，抓回来是死。你没打算被抓回来。" }
      ]
    },
    {
      id: "q7.hanshi", cat: "天灾", title: "大饥", age: [10, 60], weight: 13,
      years: [-210, -207],
      text: [
        "关中大饥，米石千六百。",
        "人相食。邯郸、巨鹿之间，路上有饿死的人，衣服被人剥走了。",
        "县里的仓是满的。"
      ],
      options: [
        { text: "去县仓外跪着", hint: "身体 −8；或有粟", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.35, win: [{ k: "grain", v: 4 }], lose: [{ k: "body", v: -6 }, { k: "fame", v: -3 }], loseNote: "仓吏说：「仓是军粮，不放。」跪到第三天，被赶走了。" }, then: "你在仓外跪了一天。仓里的粟堆到梁上，门外的人一层一层。" },
        { text: "往南边逃荒", hint: "身体 −10；或有存", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.12, cause: "饥" }, then: "你往南走。走了十七天，看见一条河，河边有人在挖草根。" },
        { text: "入山，采野果", hint: "身体 −8；粮 −2", effects: [{ k: "body", v: -8 }, { k: "grain", v: -2 }], then: "山里也不剩什么。野果采完了就剥树皮，树皮剥完了，就挖一种发苦的根。" }
      ]
    }
  ]);

  /* ══════════ 西汉 ══════════ */
  B.eraEvents.whan = (B.eraEvents.whan || []).concat([

    {
      id: "w7.huzi", cat: "天灾", title: "瓠子", age: [16, 60], weight: 15, once: true,
      years: [-132, -109],
      text: [
        "黄河在{{瓠子|今河南濮阳西南，元光三年决口，泛滥二十余年}}决了。东南注巨野，通于淮泗。",
        "十六个郡泡在水里。",
        "县里说：「堵不住。往高处搬。」"
      ],
      options: [
        { text: "往高处搬", hint: "田 −8；身体 −6", effects: [{ k: "field_wet", v: -8 }, { k: "body", v: -6 }], then: "你搬到坡上，搭了个草棚。原来那八亩田，成了水底。" },
        { text: "留下来，在水里抢种", hint: "粮 +4；或有溺", effects: [{ k: "grain", v: 4 }], gamble: { deathChance: 0.1, cause: "溺" }, then: "水退一尺，你就下去种一尺。种的是荞麦，收了两斗。" },
        { text: "应募去堵口", hint: "身体 −12；或有功", effects: [{ k: "body", v: -12 }], gamble: { winChance: 0.4, win: [{ k: "fame", v: 8 }], lose: [{ k: "body", v: -8 }], loseNote: "堵了三个月，水一涨又开了。死了十七个。" }, then: "你背着柴草上了堤。堤上的人排成一里长，把柴一捆一捆往水里扔。" }
      ]
    },
    {
      id: "w7.wugu", cat: "世变", title: "巫蛊", age: [14, 60], weight: 13, once: true,
      years: [-91, -87],
      text: [
        "{{巫蛊之祸|征和二年，太子据被诬以巫蛊，长安死者数万}}。",
        "有人在夜里往各家门口埋木人。埋了之后，第二天就有吏来挖。",
        "你家的门槛下，被人挖出了一个。"
      ],
      options: [
        { text: "自己先报官，说是被人栽的", hint: "或有信；声望 −4", effects: [{ k: "fame", v: -4 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -12 }, { k: "silver", v: -8 }], loseNote: "吏说：「既是你报的，就是你埋的。」下狱，家中纳钱赎人。" }, then: "你抱着木人去了县里。县令看了看，说：「你倒老实。」" },
        { text: "把木人烧了，谁也不说", hint: "或有人告", effects: [], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -14 }, { k: "fame", v: -10 }], loseNote: "邻居看见你半夜烧东西，告了。拷问三日，全家下狱。" }, then: "你把木人塞进灶膛。火光里，那张木脸烧卷了。" },
        { text: "举家往乡下躲", hint: "身体 −6；田弃", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: -4 }], then: "你把门锁上，带着一家去了岳家的村子。住了半年，回来时邻居少了三户。" }
      ]
    }
  ]);

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = (B.eraEvents.xin || []).concat([

    {
      id: "x7.jingzhou", cat: "天灾", title: "荆州大饥", age: [12, 60], weight: 16, once: true,
      years: [17, 23],
      text: [
        "荆州大饥，人相食。",
        "野泽里有一种草，叫{{凫茈|荸荠，荒年掘以充饥}}，掘出来煮了能吃。挖的人挤满了泽边。",
        "泽边开始有人打起来。"
      ],
      options: [
        { text: "去挖凫茈", hint: "身体 −8；粮 +4", effects: [{ k: "body", v: -8 }, { k: "grain", v: 4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }], loseNote: "泽边为了几筐凫茈打起来。你的肋骨被打断了一根。" }, then: "你在泽里站了一天，挖了两筐。泥到膝盖，脚上全是蚂蟥。" },
        { text: "投绿林", hint: "身体 −6；银钱 +4；从此是贼", effects: [{ k: "body", v: -6 }, { k: "silver", v: 4 }, { k: "fame", v: -6 }, { k: "troops", v: 4 }], then: "你上了绿林山。山上有七八千人，都是没饭吃的。" },
        { text: "守着家，等赈", hint: "粮 −8；或有死", effects: [{ k: "grain", v: -8 }], gamble: { deathChance: 0.14, cause: "饥" }, then: "你守着。县里的仓早就空了，赈粮的文书在路上的时候，路上已经没人了。" }
      ]
    },
    {
      id: "x7.fubi", cat: "官府", title: "改币", age: [14, 60], weight: 13,
      years: [9, 23],
      text: [
        "{{五均六筦|王莽新制，官营盐铁酒，行五均赊贷，屡改币制}}。今年又改了钱法：旧钱作废，换新钱。",
        "一枚新钱，作旧钱五枚。",
        "你手里有八百旧钱，是卖了两年柴攒的。"
      ],
      options: [
        { text: "去换新钱", hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你排了一天队，八百旧钱换了一百六十新钱。买了二斗粟，剩不下什么。" },
        { text: "把钱埋起来，以物易物", hint: "银钱 −2；或有失", effects: [{ k: "silver", v: -2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }], loseNote: "私藏旧钱被查出，依律没官，还罚了钱。" }, then: "你把旧钱装进陶罐，埋在灶下。此后买东西，用布、用盐、用粟。" },
        { text: "拿旧钱去邻县买货", hint: "银钱 +2；或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "邻县也在换钱。有人认出旧钱，扭送官府。" }, then: "你推着一车布去了邻县。那边还没换钱，八百旧钱买了四匹布。" }
      ]
    }
  ]);

  /* ══════════ 东汉 ══════════ */
  B.eraEvents.ehan = (B.eraEvents.ehan || []).concat([

    {
      id: "e7.qiang", cat: "军旅", title: "羌乱", age: [16, 55], weight: 16, sex: "male",
      years: [107, 170],
      text: [
        "{{羌乱|东汉中后期羌人屡叛，凉州、三辅残破，用兵数十年}}。今年又反了。",
        "郡里点兵，一户出一丁。",
        "去的人说，凉州那边的仗，打的是山，不是人。"
      ],
      options: [
        { text: "去", hint: "身体 −12；或有功", effects: [{ k: "body", v: -12 }, { k: "martial", v: 6 }], gamble: { deathChance: 0.16, cause: "战阵" }, then: "你跟着队伍往西走了两个月。一路上的县，有一半是空的。" },
        { text: "出钱代役", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你缴了四两。郡里雇了个流民去，他走的时候，你把家里的旧鞋给了他。" },
        { text: "举家往东迁", hint: "田 −6；身体 −5", effects: [{ k: "field_wet", v: -6 }, { k: "body", v: -5 }], then: "你把田贱卖了，往东走了三百里。新地方的地，是别人的荒田。" }
      ]
    },
    {
      id: "e7.danggu", cat: "世变", title: "党锢", age: [18, 55], weight: 12, once: true, when: { minKnowledge: 30 },
      years: [166, 184],
      text: [
        "{{党锢之祸|166 年起，宦官诬士人结党，禁锢终身}}。诏下：党人父子兄弟，及五属，皆免官禁锢。",
        "你曾受业于一位被列入党籍的先生。",
        "吏来问：「你与他，有旧否？」"
      ],
      options: [
        { text: "说有旧", hint: "声望 +8；从此不得为官", effects: [{ k: "fame", v: 8 }, { k: "official", v: -8 }], then: "你说了「有」。吏在册上记了，说：「你这辈子，别想举孝廉了。」" },
        { text: "说没有", hint: "保住前程；或有愧", effects: [{ k: "official", v: 4 }, { k: "fame", v: -4 }], then: "你说只是同乡，不曾受业。吏走了。你回屋，把那几卷讲义烧了。" },
        { text: "把先生的讲义藏起来", hint: "或有搜", effects: [{ k: "knowledge", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -8 }], loseNote: "抄家时搜出。以「藏党人文字」论，下狱半年。" }, then: "你把讲义缝进被子里。此后二十年，没敢拿出来看。" }
      ]
    }
  ]);

  /* ══════════ 三国 ══════════ */
  B.eraEvents.sg = (B.eraEvents.sg || []).concat([

    {
      id: "s7.dayi", cat: "天灾", title: "大疫", age: [14, 60], weight: 17, once: true,
      years: [208, 234],
      text: [
        "{{建安大疫|建安年间疫气屡行，家家有僵尸之痛，室室有号泣之哀}}。",
        "一村一村地死。有的是整户没了，过了十天才有邻村的人来看。",
        "军中也疫。听说南边那一仗，死的多半不是战死的。"
      ],
      options: [
        { text: "闭户不出，等它过去", hint: "粮 −10；身体 −4", effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }], gamble: { deathChance: 0.12, cause: "疫" }, then: "你把门堵死，用醋熏屋子。两个月后开门，巷子里的草长到膝盖。" },
        { text: "去帮着掩埋", hint: "身体 −10；声望 +10", effects: [{ k: "body", v: -10 }, { k: "fame", v: 10 }], gamble: { deathChance: 0.16, cause: "疫" }, then: "你和三个人挖了一个大坑，埋了六十多具。回来的路上，谁也没说话。" },
        { text: "举家逃进深山", hint: "身体 −8；粮 −6", effects: [{ k: "body", v: -8 }, { k: "grain", v: -6 }], gamble: { winChance: 0.72, win: [], lose: [{ k: "body", v: -10 }], loseNote: "山里冷。母亲在那里病了一场，没药。" }, then: "你在山里住了半年，靠野果和溪水。回来时，村里只剩四户。" }
      ]
    },
    {
      id: "s7.tuntian", cat: "赋役", title: "屯田", age: [18, 55], weight: 14, sex: "male",
      years: [200, 280],
      text: [
        "{{屯田|曹操募民屯田许下，官给牛种，收成分割}}。官府给牛，给种，收成官六民四。",
        "自备牛的，官民各半。",
        "你没有牛。"
      ],
      options: [
        { text: "领官牛，交六成", hint: "粮 −8；有地种", effects: [{ k: "grain", v: -8 }, { k: "field_wet", v: 4 }], then: "你领了一头官牛、十亩地。秋收四十石，交了二十四石。" },
        { text: "不领牛，自己拉犁", hint: "身体 −12；粮 −4", effects: [{ k: "body", v: -12 }, { k: "grain", v: -4 }], then: "你和妻子拉犁。一天犁一亩，肩膀上的绳子勒出了血。" },
        { text: "不入屯田，去做佃客", hint: "银钱 −2；声望 −3", effects: [{ k: "silver", v: -2 }, { k: "fame", v: -3 }], then: "你去了当地大族家里做佃客。租是五成，但主家不管你的户籍。" }
      ]
    }
  ]);

  /* ══════════ 西晋 ══════════ */
  B.eraEvents.wjin = (B.eraEvents.wjin || []).concat([

    {
      id: "wj7.huang", cat: "天灾", title: "蝗旱", age: [10, 65], weight: 16,
      years: [290, 316],
      text: [
        "秦雍之旱，蝗。草木牛马毛鬣皆尽。",
        "先旱，后蝗。蝗吃完禾，吃草，吃到最后，连牛尾巴上的毛都啃。",
        "县里的井，打上来的水是浑的。"
      ],
      options: [
        { text: "举家往南", hint: "身体 −10；田 −6", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: -6 }], gamble: { deathChance: 0.1, cause: "饥" }, then: "你往南走了二十天。路上的人都在往南走，谁也不看谁。" },
        { text: "守着，挖井", hint: "身体 −12；粮 −8", effects: [{ k: "body", v: -12 }, { k: "grain", v: -8 }], then: "你在院里挖井，挖了四丈，出水了。水是浑的，但能喝。" },
        { text: "去大户家做工换粮", hint: "身体 −6；粮 +4", effects: [{ k: "body", v: -6 }, { k: "grain", v: 4 }], then: "你给城里的荀家挑了两个月水。管两顿饭，一天半升米。" }
      ]
    },
    {
      id: "wj7.liumin", cat: "世变", title: "流民", age: [14, 60], weight: 14,
      years: [298, 316],
      text: [
        "略阳、天水六郡的流民，十万余口，入汉川求食。",
        "朝廷说：「遣还。」",
        "流民说：「回去是死。」"
      ],
      options: [
        { text: "跟着流民走", hint: "身体 −8；粮 −4", effects: [{ k: "body", v: -8 }, { k: "grain", v: -4 }], gamble: { deathChance: 0.1, cause: "饥" }, then: "你跟着走了。十万人在路上，前后看不到头。走一天，歇一天。" },
        { text: "留在本地，看着他们过去", hint: "粮 −6；或有掠", effects: [{ k: "grain", v: -6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "流民过境时抢了村。你被打了一顿，粮被搬走。" }, then: "你站在村口看。他们走了三天三夜。最后一天，有个女人把孩子放在了树下。" },
        { text: "去给流民指路", hint: "声望 +6；或有牵连", effects: [{ k: "fame", v: 6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }], loseNote: "官军来驱赶流民。你被当成向导抓了，关了五天。" }, then: "你告诉他们往南三十里有水。他们谢了你，有人塞给你一块干粮。" }
      ]
    }
  ]);

  /* ══════════ 东晋 ══════════ */
  B.eraEvents.ejin = (B.eraEvents.ejin || []).concat([

    {
      id: "ej7.huanxuan", cat: "世变", title: "桓玄", age: [16, 60], weight: 13, once: true,
      years: [402, 404],
      text: [
        "{{桓玄|402 年起兵入建康，403 年篡位，404 年败死}}。兵过我们郡，征粮三万斛。",
        "郡里摊到各家，一亩三斗。",
        "不缴的，烧屋。"
      ],
      options: [
        { text: "缴", hint: "粮 −12", effects: [{ k: "grain", v: -12 }], then: "你缴了。兵走的时候，把村口的树也砍了当柴。" },
        { text: "把粮藏进山里", hint: "粮 −4；或有搜", effects: [{ k: "grain", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "搜山搜出来了。屋烧了，人被打了一顿。" }, then: "你把粮挑进山，埋在三棵松树之间。回来时天亮了。" },
        { text: "投刘裕的兵", hint: "身体 −8；或有功", effects: [{ k: "body", v: -8 }, { k: "martial", v: 6 }, { k: "troops", v: 3 }], gamble: { deathChance: 0.14, cause: "战阵" }, then: "你投了刘裕。他说：「跟我打回去，粮随便吃。」" }
      ]
    },
    {
      id: "ej7.jiyi", cat: "天灾", title: "侨饥", age: [12, 60], weight: 13,
      years: [330, 420],
      text: [
        "南来的侨民，没有田，没有籍，住在江边的草棚里。",
        "今年江水大涨，草棚冲了一半。",
        "官府说：「侨人归侨郡管，本县不管。」"
      ],
      options: [
        { text: "去侨郡讨赈", hint: "身体 −6；或有粮", effects: [{ k: "body", v: -6 }], gamble: { winChance: 0.4, win: [{ k: "grain", v: 4 }], lose: [{ k: "body", v: -4 }], loseNote: "侨郡的官说：「本郡也没有粮。」" }, then: "你在侨郡的衙门外站了两天。第三天，发了半升米，一人。" },
        { text: "去给本地大族做佃客", hint: "田 +3；失白籍", effects: [{ k: "field_wet", v: 3 }, { k: "fame", v: -4 }], then: "你去了顾家。顾家给你三亩坡地，租六成。你的名字，从白籍上划掉了。" },
        { text: "沿江往上，另找地方", hint: "身体 −8；粮 −4", effects: [{ k: "body", v: -8 }, { k: "grain", v: -4 }], then: "你带着一家往上游走。走了十天，在一个没人的河湾停下来。" }
      ]
    }
  ]);

  /* ══════════ 南北朝 ══════════ */
  B.eraEvents.ns = (B.eraEvents.ns || []).concat([

    {
      id: "ns7.liuzhen", cat: "世变", title: "六镇", age: [16, 55], weight: 15, once: true,
      years: [523, 530],
      text: [
        "{{六镇之乱|523 年北魏北边六镇兵民起事，历四年}}。",
        "六镇的人，本来是守着边墙的兵。迁都洛阳以后，他们成了没人管的。",
        "今年，他们反了。"
      ],
      options: [
        { text: "跟着反", hint: "身体 −8；银钱 +4；从此是乱军", effects: [{ k: "body", v: -8 }, { k: "silver", v: 4 }, { k: "troops", v: 6 }, { k: "fame", v: -6 }], gamble: { deathChance: 0.16, cause: "战阵" }, then: "你跟着破了武川镇。镇里的仓打开了，人涌进去，像水一样。" },
        { text: "往南逃", hint: "身体 −10；田弃", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: -6 }], then: "你往南走了。走了半个月，遇见了南下的另一批人，他们说南边也在打。" },
        { text: "守着家，哪边来都交粮", hint: "粮 −10；保命", effects: [{ k: "grain", v: -10 }], then: "乱军来了你交粮，官军来了你也交粮。交了两年，家里只剩一口锅。" }
      ]
    },
    {
      id: "ns7.yi", cat: "天灾", title: "大疫", age: [8, 60], weight: 13,
      years: [500, 589],
      text: [
        "南北都在疫。",
        "军中也疫。攻城的、守城的，一样地死。",
        "有人说，是死人埋得太浅。"
      ],
      options: [
        { text: "深埋村外的尸首", hint: "身体 −8；声望 +8", effects: [{ k: "body", v: -8 }, { k: "fame", v: 8 }], gamble: { deathChance: 0.1, cause: "疫" }, then: "你带人挖了三个深坑，埋了九十多具。埋完，你在坑边烧了纸。" },
        { text: "闭门，谁也不见", hint: "粮 −8；身体 −3", effects: [{ k: "grain", v: -8 }, { k: "body", v: -3 }], then: "你把门关上。两个月里，只有一次开门，是去挑水。" },
        { text: "去寺里求药", hint: "银钱 −1；或有济", effects: [{ k: "silver", v: -1 }, { k: "luck", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }], loseNote: "寺里也没有药了。你在寺里躺了十天，靠粥活下来。" }, then: "寺里的僧人熬了大锅药汤，一人一碗。药是苦的，喝完出汗。" }
      ]
    }
  ]);

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = (B.eraEvents.sui || []).concat([

    {
      id: "su7.shuida", cat: "天灾", title: "山东大水", age: [12, 60], weight: 15, once: true,
      years: [594, 596],
      text: [
        "{{开皇大水|开皇十四年，关中大旱，山东河南大水，人多饥乏}}。",
        "水退了，田里一层沙。沙上什么也不长。",
        "县里的仓开了，一天一人一升。"
      ],
      options: [
        { text: "领赈粮，等田能种", hint: "粮 +6；身体 −6", effects: [{ k: "grain", v: 6 }, { k: "body", v: -6 }], then: "你领了一个月的赈。沙地要挑走，一亩挑三天。挑完了，种下去，出苗三成。" },
        { text: "举家往西，去关中", hint: "身体 −12；或有存", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.12, cause: "饥" }, then: "你往西走。走到潼关，听说关中也旱。" },
        { text: "去修渠，换口粮", hint: "身体 −10；粮 +6", effects: [{ k: "body", v: -10 }, { k: "grain", v: 6 }], then: "你在渠上做了四个月。一天两升米，管住。回来时，手上的茧揭下来像一层皮。" }
      ]
    },
    {
      id: "su7.zhengliao", cat: "军旅", title: "征辽", age: [16, 45], weight: 16, sex: "male",
      years: [612, 614],
      text: [
        "{{征辽|大业八年至十年，三征高丽，役夫数百万，死者相枕}}。今年发民夫运粮，往辽东。",
        "一人推一车，车装米三石。路上自己吃，走到辽东，车上剩一半就不错。",
        "队正说：「推不到的，斩。」"
      ],
      options: [
        { text: "推车去辽东", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.2, cause: "征辽" }, then: "你推了四十天。到辽东时，车上的米剩了一石二斗。" },
        { text: "半路把粮卖了，逃回家", hint: "银钱 +4；或有捕", effects: [{ k: "silver", v: 4 }, { k: "fame", v: -8 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -10 }], loseNote: "被查出来。逃兵依律斩，纳钱赎死，改徒三年。" }, then: "你在半路把米卖给了一个商人。回家的路上，你把车烧了。" },
        { text: "装病掉队", hint: "身体 −6；或有查", effects: [{ k: "body", v: -6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }], loseNote: "队正回头找你，你还躺在沟里。被拖起来打了一顿，还得推。" }, then: "你躺在路边，等人走远。躺了半天，起来往回走。" }
      ]
    }
  ]);

  /* ══════════ 唐 ══════════ */
  B.eraEvents.tang = (B.eraEvents.tang || []).concat([

    {
      id: "t7.anshi", cat: "世变", title: "潼关", age: [14, 65], weight: 18, once: true,
      years: [755, 763],
      text: [
        "{{安史之乱|755 年起，历八年，天下户口减半}}。潼关破了。",
        "关中的百姓往南跑，往西跑，往山里跑。",
        "路上有人说：「长安也保不住了。」"
      ],
      options: [
        { text: "往南逃，去襄阳", hint: "身体 −12；银钱 −6", effects: [{ k: "body", v: -12 }, { k: "silver", v: -6 }], gamble: { deathChance: 0.14, cause: "乱兵" }, then: "你走了两个月，到襄阳。路上把田契烧了，因为带着也没用。" },
        { text: "躲进终南山", hint: "身体 −10；粮 −8", effects: [{ k: "body", v: -10 }, { k: "grain", v: -8 }], gamble: { deathChance: 0.1, cause: "饥寒" }, then: "你在山里住了八个月，吃的是橡子和野菜。下山那天，头发全白了。" },
        { text: "留下，等官军收复", hint: "身体 −14；家产或尽", effects: [{ k: "body", v: -14 }, { k: "silver", v: -8 }], then: "你留了下来。兵过了三拨，官军又来了一拨。等安静下来，村里只剩九户。" }
      ]
    },
    {
      id: "t7.huangchao", cat: "世变", title: "长安", age: [14, 65], weight: 16, once: true,
      years: [880, 884],
      text: [
        "{{黄巢入长安|880 年起义军破长安，884 年败}}。城破那日，街上的人往两边躲。",
        "有人在喊：「黄王起兵，本为百姓。」",
        "米价一斗三十千。"
      ],
      options: [
        { text: "留在城里", hint: "身体 −12；粮 −10", effects: [{ k: "body", v: -12 }, { k: "grain", v: -10 }], gamble: { deathChance: 0.18, cause: "兵祸" }, then: "你在城里待了两年。城里的树被砍光了，屋梁也被拆了当柴。" },
        { text: "往南走，去江淮", hint: "身体 −10；银钱 −5", effects: [{ k: "body", v: -10 }, { k: "silver", v: -5 }], then: "你往南走了四十天。走到江淮，听说那边也不太平。" },
        { text: "投军，不管哪一边", hint: "身体 −8；银钱 +5", effects: [{ k: "body", v: -8 }, { k: "silver", v: 5 }, { k: "martial", v: 6 }], gamble: { deathChance: 0.16, cause: "战阵" }, then: "你投了军。队里没人问你是谁，只问你能拿得动刀吗。" }
      ]
    },
    {
      id: "t7.han", cat: "天灾", title: "关中大旱", age: [12, 65], weight: 14,
      years: [785, 787],
      text: [
        "关中大旱，蝗。斗米千钱。",
        "太仓出粟赈民，粮车排在街上，一天放三百石。",
        "队伍从仓门口排到城门外。"
      ],
      options: [
        { text: "排队", hint: "身体 −6；粮 +4", effects: [{ k: "body", v: -6 }, { k: "grain", v: 4 }], then: "你排了一天一夜。领到三升粟，回家熬了粥，一家人喝了两天。" },
        { text: "去城外挖野菜", hint: "身体 −8；粮 +2", effects: [{ k: "body", v: -8 }, { k: "grain", v: 2 }], then: "城外的野菜早被挖光了。你走了十里，挖了半筐。" },
        { text: "把家里的书卖了", hint: "银钱 +3；学识 −6", effects: [{ k: "silver", v: 3 }, { k: "knowledge", v: -6 }], then: "你把祖父留下的二十卷书卖了，换了两斗米。买书的人说：「这年头，书最不值钱。」" }
      ]
    }
  ]);

})(window.PACK_BASE);
