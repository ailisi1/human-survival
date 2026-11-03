/* 生在何朝 · 各朝专有事件 卷十六：新、西夏、元、明、清
 * 这五朝各有一个「把人重新编一遍」的动作：
 * 新改王田私属，西夏分番汉，元分诸色户计，明编里甲黄册，清摊丁入亩。
 * 每一次重编，都有一批人从册上消失，也有一批人忽然要多缴。
 * 前缀 x8. / xx9. / y8. / m8. / qi8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = (B.eraEvents.xin || []).concat([

    {
      id: "x8.wangtian", cat: "赋役", title: "王田", age: [18, 60], weight: 17, once: true,
      years: [9, 12],
      text: [
        "{{王田|王莽改制，尽收天下田为「王田」，禁买卖，一家男口不满八而田过一井者，分余田与族邻}}。",
        "你家六口，田三十亩。按新法，超过的都要交出去。",
        "县里的吏说：「不交的，依律论罪。」"
      ],
      options: [
        { text: "交出去", hint: "田 −12；声望 +3", effects: [{ k: "field_wet", v: -12 }, { k: "fame", v: 3 }], then: "你交了十二亩。分到田的是邻村两户，一户是寡妇，一户是流民。" },
        { text: "把田记在族人名下", hint: "或有查", effects: [], gamble: { winChance: 0.45, win: [], lose: [{ k: "body", v: -10 }, { k: "field_wet", v: -10 }], loseNote: "查出匿田。田入官，人被下狱三个月。" }, then: "你把十二亩分记在三个族人名下。他们的名字，写在你的田契上。" },
        { text: "把田卖了，换成银钱", hint: "银钱 +8；田 −12", effects: [{ k: "silver", v: 8 }, { k: "field_wet", v: -12 }], then: "你把田贱卖了。买主是县里的一个大户，他知道田要入官，压了价。" }
      ]
    },
    {
      id: "x8.sishu", cat: "家族", title: "私属", age: [16, 60], weight: 15,
      years: [9, 23],
      text: [
        "{{私属|王莽改奴婢为「私属」，禁买卖}}。诏下：凡奴婢，皆称私属，不得买卖。",
        "你家有一个婢，是父亲用三石米换来的。",
        "邻家正在卖婢，说是「送养」——文书上写「养女」。"
      ],
      options: [
        { text: "把她改称养女，留在家里", hint: "声望 +4；家中多一口", effects: [{ k: "fame", v: 4 }, { k: "grain", v: -4 }], then: "你把她改作了养女。她那年十三，从此叫你叔。" },
        { text: "放她走", hint: "声望 +6；家中少一人", effects: [{ k: "fame", v: 6 }, { k: "favor", v: 4 }], then: "你给了她一斗米、一件旧衣。她走了三里路，回头磕了个头。" },
        { text: "照旧，只是文书上改个字", hint: "或有查", effects: [], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -8 }, { k: "fame", v: -8 }], loseNote: "查出来「名为养女，实为奴婢」。罚了钱，人被带走。" }, then: "你在文书上把「婢」改成了「养女」，其余一字未动。" }
      ]
    },
    {
      id: "x8.liuguan", cat: "官府", title: "六筦", age: [18, 60], weight: 14,
      years: [10, 23],
      text: [
        "{{六筦|王莽官营盐、铁、酒、铸钱、名山大泽、五均赊贷}}。连山上的柴、泽里的鱼，都要纳钱。",
        "你在泽边打了三担鱼，市吏来收税：一担十文。",
        "他说：「泽是官家的。」"
      ],
      options: [
        { text: "纳钱", hint: "银钱 −0.3", effects: [{ k: "silver", v: -0.3 }], then: "你缴了三十文。市吏在簿上写了「泽课」。" },
        { text: "夜里去捕", hint: "银钱 +2；或有查", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -3 }], loseNote: "夜里被巡泽的抓住。鱼没收，人被打了一顿。" }, then: "你夜里下网。天亮前收网回家，鱼还在跳。" },
        { text: "不捕了，改去种地", hint: "无得无失", effects: [], then: "你没再去泽边。那年冬天，泽里的鱼多得跳上岸。" }
      ]
    },
    {
      id: "x8.fuming", cat: "世变", title: "符命", age: [16, 60], weight: 12,
      years: [9, 23],
      text: [
        "{{符命|王莽时伪造天命符瑞以证其受命，献者得官}}。县里有人献了一块石头，上头有红字。",
        "献石的人，做了郎官。",
        "有人说：「我也能造一块。」"
      ],
      options: [
        { text: "也去献一块", hint: "官位 +6；或有罪", effects: [{ k: "official", v: 6 }], gamble: { winChance: 0.35, win: [], lose: [{ k: "fame", v: -12 }, { k: "body", v: -8 }], loseNote: "后来符命案发，献者皆下狱。你被打了三十板，罚作苦役。" }, then: "你在石头上刻了八个字，涂了朱砂。献上去，得了个郎官。" },
        { text: "不参与", hint: "无得无失", effects: [], then: "你没参与。那块石头后来被砸了。" },
        { text: "劝人别造", hint: "声望 +3；或有祸", effects: [{ k: "fame", v: 3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -6 }, { k: "body", v: -4 }], loseNote: "被人告了「非议符命」。挨了打。" }, then: "你劝了邻家的两个后生。他们没造，后来也没事。" }
      ]
    },
    {
      id: "x8.liumin", cat: "世变", title: "入关", age: [14, 60], weight: 15,
      years: [18, 23],
      text: [
        "关东大饥，流民入关的有几十万。",
        "关中的仓也空了。",
        "有人说：「到了关中，就有饭吃。」"
      ],
      options: [
        { text: "跟着入关", hint: "身体 −12；或有存", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.16, cause: "饥" }, then: "你跟着人流进了关。关中的路上，躺着的人比走着的多。" },
        { text: "留在本地", hint: "粮 −8；身体 −6", effects: [{ k: "grain", v: -8 }, { k: "body", v: -6 }], then: "你留下了。本地也饥，但山上还有草根。" },
        { text: "入山结寨", hint: "身体 −8；声望 +5", effects: [{ k: "body", v: -8 }, { k: "fame", v: 5 }, { k: "troops", v: 3 }], then: "你在山里结了个寨，聚了一百多户。寨子靠一口泉活着。" }
      ]
    },
    {
      id: "x8.gengshi", cat: "世变", title: "更始", age: [16, 60], weight: 15, once: true,
      years: [23, 25],
      text: [
        "{{更始|23 年绿林军立刘玄为帝，建元更始，两年后亡}}。兵进了长安，城里换了旗。",
        "新朝的官跑了，更始的官还没来。",
        "街上有人抢东西。"
      ],
      options: [
        { text: "闭门守着", hint: "粮 −6；或有掠", effects: [{ k: "grain", v: -6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "silver", v: -8 }], loseNote: "乱兵破了门。粮被搬空，你被打断了肋骨。" }, then: "你把门堵死。外面喊了两天，第三天安静了。" },
        { text: "去投更始军", hint: "身体 −8；银钱 +4", effects: [{ k: "body", v: -8 }, { k: "silver", v: 4 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.14, cause: "战阵" }, then: "你投了军。队里的人头上裹绿布，说是绿林。" },
        { text: "举家往南逃", hint: "身体 −10；田弃", effects: [{ k: "body", v: -10 }, { k: "field_wet", v: -6 }], then: "你往南走。走了半个月，在一个没人认识你的村子住下。" }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx9.fanhan", cat: "官府", title: "番汉", age: [18, 55], weight: 14, when: { minKnowledge: 25 },
      years: [1050, 1227],
      text: [
        "西夏官分番汉：番官管番事，汉官管汉事。两套衙门，两套文书。",
        "你在汉官衙门做书吏，管汉户的讼。",
        "番官衙门来要一份户册，说是「共事」。"
      ],
      options: [
        { text: "照给", hint: "官位 +4；声望 −2", effects: [{ k: "official", v: 4 }, { k: "fame", v: -2 }], then: "你把册子给了。番官衙门回了一张条子，写的是蕃文，你只认得自己的名字。" },
        { text: "只给一半", hint: "或有争", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "official", v: -6 }, { k: "body", v: -4 }], loseNote: "番官告到中书。你被打了十板，册子还是给了。" }, then: "你给了上半册。下半册说「尚未造齐」。" },
        { text: "两边都不得罪，抄一份假的", hint: "或有查", effects: [{ k: "official", v: 2 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "official", v: -10 }, { k: "body", v: -8 }], loseNote: "两册对不上，查出来了。革职，杖二十。" }, then: "你抄了一份，把三十多户的名字改了。" }
      ]
    },
    {
      id: "xx9.seng", cat: "方外", title: "僧人", age: [16, 60], weight: 13,
      years: [1050, 1227],
      text: [
        "西夏崇佛。全国有寺三百余所，僧尼数千。",
        "出家有度牒，免赋役。",
        "寺里的僧人大多是番人，也有汉人。"
      ],
      options: [
        { text: "出家", hint: "免赋役；离俗", effects: [{ k: "luck", v: 5 }, { k: "favor", v: -5 }, { k: "silver", v: 2 }], setFlag: ["seng"], then: "你剃了度，学番文经。头一年只做一件事：抄经。" },
        { text: "把儿子送去做行者", hint: "银钱 +2；家中少一人", effects: [{ k: "silver", v: 2 }, { k: "favor", v: -5 }], then: "儿子去了寺里。三年后回来一次，会说蕃话了。" },
        { text: "不出家，缴赋役", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你没出家。赋照缴，役照服。" }
      ]
    },
    {
      id: "xx9.makeui", cat: "军旅", title: "麻魁", age: [16, 40], weight: 12, sex: "female",
      years: [1050, 1227],
      text: [
        "{{麻魁|西夏女兵之称}}。西夏出兵，女兵另编一队，管运粮、守寨。",
        "点兵的人说：「女子也能上阵，一人给一张弓。」",
        "你今年十八。"
      ],
      options: [
        { text: "应募", hint: "身体 −6；martial +6", effects: [{ k: "body", v: -6 }, { k: "martial", v: 6 }, { k: "silver", v: 2 }], gamble: { deathChance: 0.1, cause: "战阵" }, then: "你入了麻魁队。队里六十多人，最大的四十岁，最小的十五。" },
        { text: "不去，家里有老母", hint: "无得无失", effects: [], then: "你没去。点兵的人说：「有老母的，免。」" },
        { text: "去，但只做运粮", hint: "身体 −8；粮 +3", effects: [{ k: "body", v: -8 }, { k: "grain", v: 3 }], then: "你运了半年的粮。一天走三十里，背三十斤。" }
      ]
    },
    {
      id: "xx9.yao", cat: "营生", title: "窑", age: [18, 55], weight: 12,
      years: [1100, 1227],
      text: [
        "灵武的窑，烧一种白瓷，胎薄，釉亮。",
        "窑主招工，管饭，一天给十五文。",
        "窑里热，一天要喝五斤水。"
      ],
      options: [
        { text: "去窑上做工", hint: "身体 −8；银钱 +3", effects: [{ k: "body", v: -8 }, { k: "silver", v: 3 }], then: "你在窑上做了两年。看火、上釉、装匣。釉料的味道，一辈子忘不掉。" },
        { text: "自己烧一窑", need: { minSilver: 5 }, hint: "银钱 −5；或有获", effects: [{ k: "silver", v: -5 }, { k: "knowledge", v: 4 }], gamble: { winChance: 0.45, win: [{ k: "silver", v: 10 }], lose: [{ k: "silver", v: -3 }], loseNote: "火候过了，一窑全裂。" }, then: "你借了窑，烧了一窑碗。开了窑，取出四十只，成了十九只。" },
        { text: "贩瓷器到宋界", hint: "银钱 +5；或有夺", effects: [{ k: "silver", v: 5 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -6 }], loseNote: "路上遇了劫。瓷器全碎，人被砍了一刀。" }, then: "你驮了八十只碗过界。宋人喜欢这种薄胎，一只卖四十文。" }
      ]
    },
    {
      id: "xx9.lvedi", cat: "世变", title: "掠边", age: [16, 55], weight: 13,
      years: [1080, 1227],
      text: [
        "夏宋交兵，边上互相掠人。",
        "今年夏军出去，掠回来三百多口人，都是宋境的百姓。",
        "军府说：「分给有功的。」"
      ],
      options: [
        { text: "领两个人回来", hint: "粮 −4；声望 −6", effects: [{ k: "grain", v: -4 }, { k: "fame", v: -6 }, { k: "favor", v: 3 }], then: "你领了一对父子。他们不说话，吃饭的时候，父亲把碗推到儿子面前。" },
        { text: "不去领", hint: "无得无失", effects: [], then: "你没去领。那些人被分到各处，后来有的留下，有的跑了。" },
        { text: "领回来，放了", hint: "声望 +8；或有罪", effects: [{ k: "fame", v: 8 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "被人告发私放人口。打了三十板，罚了钱。" }, then: "你领了两个人，夜里放他们往南走。给了他们一斗米。" }
      ]
    },
    {
      id: "xx9.yidao", cat: "官府", title: "驿道", age: [18, 55], weight: 11,
      years: [1100, 1227],
      text: [
        "西夏的驿道，从兴庆府通到各州。一站六十里，站有马、有夫。",
        "站户免赋，但要供马、供食。",
        "上一户站户，三年赔光了家产。"
      ],
      options: [
        { text: "当站户", hint: "免赋；银钱 −5", effects: [{ k: "silver", v: -5 }, { k: "martial", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -10 }], loseNote: "一年过了九拨使者，马死了三匹。" }, then: "你当了站户。站里有四匹马，两间屋，一口井。" },
        { text: "出钱求免", need: { minSilver: 4 }, hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你把四两银子送给驿官。他说：「另找人。」" },
        { text: "逃到别州", hint: "身体 −8；田弃", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -6 }], then: "你带着家人逃到别州。三年后，官府还是找到了你的名字。" }
      ]
    }
  ]);

  /* ══════════ 元 ══════════ */
  B.eraEvents.yuan = (B.eraEvents.yuan || []).concat([

    {
      id: "y8.zhongtong", cat: "市井", title: "中统钞", age: [18, 65], weight: 16,
      years: [1287, 1368],
      text: [
        "{{中统钞|元代纸币，初行时银钞相权，后滥发贬值}}。一贯钞，作银一两。",
        "今年又印了一批。米价从一石五贯，涨到一石十二贯。",
        "你手里有三十贯钞。"
      ],
      options: [
        { text: "换成银", hint: "银钱 −3；保值", effects: [{ k: "silver", v: -3 }, { k: "grain", v: 4 }], then: "你去银铺换，三十贯换了二两八钱。铺主说：「钞还要跌。」" },
        { text: "全买粮", hint: "粮 +14", effects: [{ k: "grain", v: 14 }], then: "你买了十二石。米价后来又涨了三倍。" },
        { text: "留着", hint: "或有折", effects: [], gamble: { winChance: 0.25, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "三年后钞法大坏。三十贯，买不到两石米。" }, then: "你把钞收在匣子里。你不信纸会变成废纸。" }
      ]
    },
    {
      id: "y8.haidao", cat: "营生", title: "海船", age: [18, 50], weight: 13,
      years: [1280, 1368],
      text: [
        "{{海运|元代漕粮由海道北运，自刘家港至直沽}}。一条海船，装粮三千石。",
        "船户招水手，一年给钞二十贯，管饭。",
        "出海一次，来回三个月。"
      ],
      options: [
        { text: "上船做水手", hint: "身体 −10；银钱 +6", effects: [{ k: "body", v: -10 }, { k: "silver", v: 6 }], gamble: { deathChance: 0.12, cause: "海难" }, then: "你上了船。出港那天，船上有四百多人，回来的少一些。" },
        { text: "在港口卸粮", hint: "身体 −6；银钱 +3", effects: [{ k: "body", v: -6 }, { k: "silver", v: 3 }], then: "你在直沽卸粮。一袋一百二十斤，一天卸八十袋。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。那年有七条船没回来，报的是「遭风」。", }
      ]
    },
    {
      id: "y8.wotuo", cat: "生计", title: "斡脱钱", age: [20, 60], weight: 13,
      years: [1271, 1368],
      text: [
        "{{斡脱钱|元代回回商人放的高利贷，由官府代为追征}}。借一两，一年还一两八钱。",
        "放钱的是个回回商人，姓哈桑。",
        "他说：「不还，我去找达鲁花赤。」"
      ],
      options: [
        { text: "借来周转", hint: "银钱 +6；债重", effects: [{ k: "silver", v: 6 }, { k: "debt", v: { amt: 18, rate: 0.05, dueYear: 1 } }], then: "你借了十两。契是用两种文字写的，你只认得汉字那一半。" },
        { text: "不借，卖东西", hint: "田 −4；银钱 +4", effects: [{ k: "field_wet", v: -4 }, { k: "silver", v: 4 }], then: "你卖了三亩田。哈桑来问过一次，你说不借。" },
        { text: "替他做事抵债", hint: "身体 −8；银钱 +3", effects: [{ k: "body", v: -8 }, { k: "silver", v: 3 }], then: "你替他跑了半年的腿，收账、送信。见了不少不想见的事。" }
      ]
    },
    {
      id: "y8.rangtian", cat: "赋役", title: "赐田", age: [18, 60], weight: 12,
      years: [1271, 1368],
      text: [
        "朝廷把一片田赐给了蒙古贵族。田上有十七户汉人。",
        "赐田之后，这十七户成了他的佃户。",
        "管事的说：「租四成，另外每户一年出一只羊。」"
      ],
      options: [
        { text: "认了", hint: "粮 −8；银钱 −3", effects: [{ k: "grain", v: -8 }, { k: "silver", v: -3 }], then: "你认了。租四成，羊一只。那年冬天，你把家里的羊牵走了一只。" },
        { text: "去路总管府告", hint: "声望 +5；或有祸", effects: [{ k: "fame", v: 5 }], gamble: { winChance: 0.2, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -6 }], loseNote: "总管府的达鲁花赤是蒙古人。判你「抗租」，打了二十板。" }, then: "你写了状子。总管府收了，说：「这是赐田，不问。」" },
        { text: "把田退了，去做佃户", hint: "田 −6；粮 −4", effects: [{ k: "field_wet", v: -6 }, { k: "grain", v: -4 }], then: "你把田退了，去给别家做佃户。换了个主家，租还是一样。" }
      ]
    },
    {
      id: "y8.she", cat: "乡里", title: "社长", age: [25, 65], weight: 12,
      years: [1278, 1368],
      text: [
        "社里推你做社长。",
        "社长管劝农、管水利、管婚丧、管斗殴，一年到头没有工钱。",
        "上一任社长做了六年，最后是被人骂走的。"
      ],
      options: [
        { text: "接", hint: "声望 +6；身体 −4", effects: [{ k: "fame", v: 6 }, { k: "body", v: -4 }], then: "你接了。头一件事是劝三家把荒了的田重新种上。" },
        { text: "推掉", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "你推了。社里选了个七十岁的老汉，他做了两年就死了。" },
        { text: "接，但先立几条规矩", hint: "声望 +8；或有争", effects: [{ k: "fame", v: 8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "规矩立了，没人认。社里照旧吵架。" }, then: "你在社仓前立了三条：不赌、不偷水、不弃婴。刻在木牌上。" }
      ]
    },
    {
      id: "y8.rulin", cat: "学问", title: "儒户", age: [16, 45], weight: 12, when: { minKnowledge: 30 },
      years: [1271, 1368],
      text: [
        "{{儒户|元代诸色户计之一，免赋役，须应岁贡与科举}}。你家是儒户，免赋役。",
        "但每年要考一次，考不过就革。",
        "今年考的是《四书》。"
      ],
      options: [
        { text: "认真备考", hint: "学识 +6；免赋役", effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: 2 }], then: "你考了第三等。儒户保住了，赋役不用缴。" },
        { text: "花钱打点考官", need: { minSilver: 3 }, hint: "银钱 −3；保住户", effects: [{ k: "silver", v: -3 }, { k: "official", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -8 }, { k: "silver", v: -4 }], loseNote: "考官收了钱，还是把你列在下等。钱白花了。" }, then: "你把三两银子包在书里递过去。考官翻了翻书，说：「文章尚可。」" },
        { text: "不考了，改入民户", hint: "赋役加重；自由", effects: [{ k: "silver", v: -4 }], then: "你改了民户。从此缴赋、当差，但不用每年应考。" }
      ]
    }
  ]);

  /* ══════════ 明 ══════════ */
  B.eraEvents.ming = (B.eraEvents.ming || []).concat([

    {
      id: "m8.chaoguan", cat: "市井", title: "钞关", age: [20, 60], weight: 14,
      years: [1450, 1644],
      text: [
        "{{钞关|明代设于运河要冲，对过往商货征税}}。船过闸，要验单，要纳钞。",
        "一船布，纳钞三百贯。",
        "关吏说：「不给，就把船扣在这儿。」"
      ],
      options: [
        { text: "照纳", hint: "银钱 −4", effects: [{ k: "silver", v: -4 }], then: "你纳了三百贯钞。关吏在单子上盖了印，说：「过。」" },
        { text: "给关吏塞钱，少纳", hint: "银钱 −2；或有查", effects: [{ k: "silver", v: -2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -6 }], loseNote: "被巡按查出。船扣了十天，还罚了钱。" }, then: "你塞了五钱银子。关吏在单子上写了个小字。" },
        { text: "绕道走小路", hint: "身体 −6；或有劫", effects: [{ k: "body", v: -6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "小路上遇见劫道的。货丢了一半。" }, then: "你绕了六十里小路。路窄，船底刮了三次。" }
      ]
    },
    {
      id: "m8.shexue", cat: "学问", title: "社学", age: [8, 20], weight: 13,
      years: [1400, 1644],
      text: [
        "{{社学|明代设于乡里的初等学校，教子弟识字与《大诰》}}。村里立了一所，先生是落第的秀才。",
        "束脩一年三斗米。",
        "先生说：「读书不为做官，先为识字。识了字，就不会被人骗。」"
      ],
      options: [
        { text: "去读", hint: "学识 +5；粮 −3", effects: [{ k: "knowledge", v: 5 }, { k: "grain", v: -3 }], then: "你读了三年。认得两千多字，会写契、会算账。" },
        { text: "不去，家里要人", hint: "粮 +2；学识 −2", effects: [{ k: "grain", v: 2 }, { k: "knowledge", v: -2 }], then: "你没去。那年秋天，你跟着父亲割了二十天的稻。" },
        { text: "农闲去听", hint: "学识 +3；身体 −3", effects: [{ k: "knowledge", v: 3 }, { k: "body", v: -3 }], then: "你农闲去听。听了三个冬天，认了一千多字。" }
      ]
    },
    {
      id: "m8.zonglu", cat: "家族", title: "宗禄", age: [16, 60], weight: 12,
      years: [1450, 1644],
      text: [
        "{{宗禄|明代宗室按爵给禄米，日久成为天下大患}}。本县的宗室有三百多口，一年禄米十万石。",
        "禄米从税粮里出。",
        "里正说：「今年的禄米，加派二成。」"
      ],
      options: [
        { text: "照缴", hint: "粮 −10", effects: [{ k: "grain", v: -10 }], then: "你缴了。宗室的人来领米，一车一车地拉走。" },
        { text: "跟村里一起去府里诉苦", hint: "身体 −5；或有减", effects: [{ k: "body", v: -5 }], gamble: { winChance: 0.3, win: [{ k: "grain", v: 4 }], lose: [{ k: "body", v: -6 }, { k: "fame", v: -4 }], loseNote: "府里说「宗禄不可减」。为首的三个被关了三日。" }, then: "村里去了四十多人。知府出来看了一次，说：「我上奏。」" },
        { text: "把田挂到宗室名下", hint: "免加派；或有查", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "silver", v: -8 }, { k: "fame", v: -6 }], loseNote: "查出「诡寄田亩」，依律罚粮，田入官。" }, then: "你把八亩田挂在一个宗室的名下，每年给他两石米。加派就免了。" }
      ]
    },
    {
      id: "m8.yandi", cat: "官府", title: "驿递", age: [18, 50], weight: 13,
      years: [1500, 1644],
      text: [
        "{{驿递|明代驿站，供公差往来，马夫自备}}。你在驿站做马夫。",
        "今年朝廷裁驿，减了三分之一的银。",
        "驿丞说：「裁了银，马还是要喂。」"
      ],
      options: [
        { text: "留下，减俸", hint: "银钱 −3；身体 −6", effects: [{ k: "silver", v: -3 }, { k: "body", v: -6 }], then: "你留下了。一个月少了三钱银，活还是一样多。" },
        { text: "辞了，回家种田", hint: "银钱 −2；田 +3", effects: [{ k: "silver", v: -2 }, { k: "field_wet", v: 3 }], then: "你辞了。回家开了三亩荒。那年秋天，收得不多，但是自己的。" },
        { text: "走驿路，去做私盐贩子", hint: "银钱 +5；或有死", effects: [{ k: "silver", v: 5 }], gamble: { deathChance: 0.1, cause: "盐法" }, then: "你熟悉驿路，知道哪一段没人查。第一趟就挣了二两。" }
      ]
    },
    {
      id: "m8.haijin", cat: "营生", title: "海禁", age: [18, 55], weight: 13,
      years: [1400, 1567],
      text: [
        "{{海禁|明代禁民出海贸易，片板不许下海}}。但海边的人，世代以海为生。",
        "官军来查船，烧了十七条。",
        "有人说：「不让做买卖，就做别的。」"
      ],
      options: [
        { text: "跟着走私", hint: "银钱 +8；或有死", effects: [{ k: "silver", v: 8 }], gamble: { deathChance: 0.14, cause: "海禁" }, then: "你把货藏在鱼舱底下。跑了三趟，挣了二十四两。" },
        { text: "上岸种田", hint: "田 +4；银钱 −3", effects: [{ k: "field_wet", v: 4 }, { k: "silver", v: -3 }], then: "你把船卖了，开了四亩田。海边的地咸，种了三年才出苗。" },
        { text: "去做渔户，不出海", hint: "粮 +3；身体 −4", effects: [{ k: "grain", v: 3 }, { k: "body", v: -4 }], then: "你在近海打鱼。一天出去两次，一次三里。" }
      ]
    },
    {
      id: "m8.juntun", cat: "军旅", title: "军屯", age: [18, 55], weight: 13, sex: "male",
      years: [1400, 1600],
      text: [
        "{{军屯|明代卫所兵七分屯种、三分守城}}。你在卫所，分到屯田二十亩。",
        "屯田的粮，要缴卫所。一亩三斗。",
        "同所的人说：「缴了，自己剩的就不够吃。」"
      ],
      options: [
        { text: "照缴", hint: "粮 −14；军籍稳", effects: [{ k: "grain", v: -14 }], then: "你缴了六石。剩下的四石，够吃到开春。" },
        { text: "少报田数", hint: "粮 −8；或有查", effects: [{ k: "grain", v: -8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -6 }], loseNote: "卫所查屯，量出隐田。打了二十棍，粮补缴。" }, then: "你报了十二亩。剩下的八亩，种的是自己的口粮。" },
        { text: "把田佃给别人种", hint: "银钱 +3；粮 −4", effects: [{ k: "silver", v: 3 }, { k: "grain", v: -4 }], then: "你把田佃给了所外的一户，租五成。自己去城里做短工。" }
      ]
    }
  ]);

  /* ══════════ 清 ══════════ */
  B.eraEvents.qing = (B.eraEvents.qing || []).concat([

    {
      id: "qi8.caoyun", cat: "赋役", title: "漕粮", age: [18, 60], weight: 15,
      years: [1650, 1900],
      text: [
        "{{漕粮|清代由江南八省经运河运京的税粮，共四百万石}}。你家的田在漕区，缴的是米，不是银。",
        "一亩缴一斗三升。路上损耗，另加二成。",
        "运丁说：「不缴，就折银。一石折一两二钱。」"
      ],
      options: [
        { text: "缴米", hint: "粮 −12", effects: [{ k: "grain", v: -12 }], then: "你把米挑到码头。验米的人抓了一把，看了看，说：「潮。」扣了二成。" },
        { text: "折银", hint: "银钱 −5", effects: [{ k: "silver", v: -5 }], then: "你折了银。市价一石米八钱，折银要一两二钱。" },
        { text: "和运丁讲价", hint: "银钱 −4；或有争", effects: [{ k: "silver", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -2 }, { k: "fame", v: -4 }], loseNote: "运丁叫了人来，说你「抗漕」。米还是照缴，多罚了两斗。" }, then: "你和运丁说了半天，折价降到一两。他临走说：「下不为例。」" }
      ]
    },
    {
      id: "qi8.wenzhi", cat: "文事", title: "文字", age: [20, 60], weight: 12, when: { minKnowledge: 40 },
      years: [1700, 1800],
      text: [
        "{{文字狱|清代因文字获罪的案子，康雍乾三朝最烈}}。邻县一位教书先生，因诗里有「清风不识字」一句，被拿了。",
        "他的书，都烧了。",
        "你家里也有几本旧书。"
      ],
      options: [
        { text: "把旧书烧了", hint: "学识 −8；保平安", effects: [{ k: "knowledge", v: -8 }], then: "你把书烧了，烧了半夜。有一本是你祖父抄的。" },
        { text: "把书藏进夹墙", hint: "或有搜", effects: [{ k: "knowledge", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -10 }], loseNote: "邻人告发。查出藏书，以「收藏违碍」论，下狱一年。" }, then: "你在夹墙里挖了个洞，把书封进去，外面抹了泥。" },
        { text: "只留经史，其余烧掉", hint: "学识 −3", effects: [{ k: "knowledge", v: -3 }, { k: "fame", v: 3 }], then: "你留了《四书》《史记》，其余的都烧了。文集、诗稿，一个字没留。" }
      ]
    },
    {
      id: "qi8.shisanhang", cat: "营生", title: "十三行", age: [18, 50], weight: 12,
      years: [1760, 1840],
      text: [
        "{{十三行|广州经营对外贸易的商行，官府指定，独揽洋货}}。行里的商人，个个家资百万。",
        "洋船到港，要经行商买卖。",
        "行商招伙计，要识字、会算、不怕洋人。"
      ],
      options: [
        { text: "去行里做伙计", hint: "学识 +3；银钱 +5", effects: [{ k: "knowledge", v: 3 }, { k: "silver", v: 5 }], then: "你进了行里。头一年只做一件事：记账。账上有两种文字。" },
        { text: "自己贩货到口岸", hint: "银钱 +4；或有亏", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }], loseNote: "茶价跌了。你的货压在仓里，赔了三成。" }, then: "你把茶挑到广州。行商压价，你还是卖了。" },
        { text: "不去，怕惹事", hint: "无得无失", effects: [], then: "你没去。那年行商赔了三家，有一家投了江。" }
      ]
    },
    {
      id: "qi8.yixue", cat: "学问", title: "义学", age: [8, 22], weight: 13,
      years: [1700, 1900],
      text: [
        "{{义学|清代地方所设免费学校，收贫家子弟}}。县里的义学靠学田和捐输，一年可收二十人。",
        "束脩免，管一顿饭。",
        "先生说：「读了书，未必能做官。但能不做睁眼瞎。」"
      ],
      options: [
        { text: "去读", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], then: "你读了五年。读完了《四书》，会写八股，也会算账。" },
        { text: "不去，去做学徒", hint: "银钱 +4；学识 −2", effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: -2 }], then: "你去了药铺做学徒。三年出师，会抓三百多个方子。" },
        { text: "白天做工，晚上去义学", hint: "身体 −6；学识 +4", effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 4 }], then: "你白天在码头扛包，晚上去义学。先生说你是他见过最困的学生。" }
      ]
    },
    {
      id: "qi8.tuanlian", cat: "军旅", title: "团练", age: [18, 50], weight: 13, sex: "male",
      years: [1850, 1900],
      text: [
        "{{团练|清代地方自办武装，由士绅主持，就地筹饷}}。县里的士绅要办团练。",
        "一亩摊一百文，一丁出一月两操。",
        "办团练的人说：「办起来，土匪就不敢来。」"
      ],
      options: [
        { text: "出钱出人", hint: "银钱 −3；身体 −5；声望 +5", effects: [{ k: "silver", v: -3 }, { k: "body", v: -5 }, { k: "fame", v: 5 }], then: "你出了一份钱，自己去操了两个月。团练一共三百人，用的是鸟枪和竹矛。" },
        { text: "只出钱", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你出了钱。操练的时候，你站在边上看。" },
        { text: "都不出", hint: "声望 −6；或有掠", effects: [{ k: "fame", v: -6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "grain", v: -10 }, { k: "body", v: -6 }], loseNote: "土匪来了，团练没挡住。你家被抢了一遍。" }, then: "你没出。士绅记了一笔，说：「这家人不能用。」" }
      ]
    },
    {
      id: "qi8.guizi", cat: "官府", title: "规费", age: [20, 60], weight: 12,
      years: [1700, 1900],
      text: [
        "你去县衙递状子，门房说要「挂号钱」二百文。",
        "状子递进去，书吏说要「抄写钱」三百文。",
        "承发房说：「案子要排期，排前面的，另说。」"
      ],
      options: [
        { text: "一样一样都给", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你花了八百文，案子排在下个月。" },
        { text: "不给，自己写状子递上去", hint: "或有拖", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "silver", v: -1 }, { k: "body", v: -4 }], loseNote: "状子被压了三个月。你去问，被打了出来。" }, then: "你自己写了状子，从门缝塞进去。三天后，书吏来找你，说：「你这不合式。」" },
        { text: "找讼师代办", hint: "银钱 −3；或有成", effects: [{ k: "silver", v: -3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -2 }], loseNote: "讼师收了钱，案子还是拖着。" }, then: "你找了镇上的讼师。他写了状子，当天就递进去了。" }
      ]
    }
  ]);

})(window.PACK_BASE);
