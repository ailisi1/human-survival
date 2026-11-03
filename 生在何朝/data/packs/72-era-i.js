/* 生在何朝 · 各朝专有事件 卷九：西晋、东晋、南北朝
 * 这三朝的制度是连着的：占田与荫客之下，人往大族家里跑；
 * 跑了要土断，断不干净就成白籍；北边又用均田三长把人从荫户里拽回来。
 * 一律从「一个具体的人被制度按在什么位置上」写，不写制度史。
 * 前缀 wj6. / ej6. / ns6.，与既有 wj2–wj5、ej2–ej5、ns2–ns5 不撞。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 西晋 ══════════ */
  B.eraEvents.wjin = (B.eraEvents.wjin || []).concat([

    {
      id: "wj6.zhantian", cat: "赋役", title: "占田", age: [17, 58], weight: 16, sex: "male",
      years: [280, 316],
      text: [
        "诏下{{户调式|晋武帝平吴后颁行的田赋之法}}：男子一人占田七十亩，女子三十亩；丁男课田五十亩，丁女二十亩。",
        "里正拿着簿子挨户问：「你家几口？占得几亩？」",
        "你家簿上写着五口，实际在种的，是十二亩。"
      ],
      options: [
        { text: "照实说，只十二亩", hint: "赋役照五十亩起征；银钱 −3", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }], then: "里正在簿上画了个圈。课田五十亩的租，你一粒也不能少缴。" },
        { text: "报足口分，把荒坡算进去", hint: "免了一时之责；日后加征", effects: [{ k: "fame", v: 3 }, { k: "grudge", v: 4 }], schedule: [{ inYears: 3, effects: [{ k: "silver", v: -5 }], note: "荒坡计入了课田，租要照缴。" }], then: "你把村后那片石头坡报成了田。里正去看了看，没说话。" },
        { text: "多报两口人，多占田", hint: "田 +6；或有查验", effects: [{ k: "field_dry", v: 6 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -8 }, { k: "silver", v: -4 }], loseNote: "查户口，多出来的两口查无其人。田收了回去，还罚了钱。" }, then: "你报了七口。多的两口是早夭的兄长和远嫁的姐姐。" }
      ]
    },
    {
      id: "wj6.yinke", cat: "家族", title: "投客", age: [15, 50], weight: 15,
      text: [
        "{{荫客|品官按品级可庇荫佃客、衣食客，免其赋役}}。县令家荫了三十户，刺史家荫了五十户。",
        "邻村赵家已经搬过去了，一家六口，从此不缴户调。",
        "赵家的老二回来说：「那边叫佃客，不叫奴。有屋住，有田种，就是名字不在官簿上了。」"
      ],
      options: [
        { text: "也去投", hint: "免赋役；终身不是编户", effects: [{ k: "fame", v: -6 }, { k: "silver", v: 4 }, { k: "flag", v: 1 }], setFlag: ["kehu"], then: "你带着一家老小过了河。主家给了一间土屋、二十亩坡地。当年秋天，官差来村里点户，点到你家，跳了过去。" },
        { text: "留下来自己扛", hint: "银钱 −4；身体 −3", effects: [{ k: "silver", v: -4 }, { k: "body", v: -3 }], then: "你缴了全年的户调，绢三匹、绵三斤。缴完，缸里只剩半斗粟。" },
        { text: "把次子送去，家里留人", hint: "银钱 +3；少一劳力", effects: [{ k: "silver", v: 3 }, { k: "favor", v: -4 }], then: "次子那年十四。走的时候没回头。三年后捎回来一句话，说那边吃得饱。" }
      ]
    },
    {
      id: "wj6.zhongzheng", cat: "官府", title: "定品", age: [14, 30], weight: 14, once: true,
      text: [
        "州里{{中正|掌州郡人物品评之官，定九品，为选官依据}}来了。凡未仕者，皆须定品。",
        "你父亲在门前站了半日，把家里的旧信、旧名刺都翻了出来。",
        "他说：「我们家上三代没有做过二千石的。你去了，别多说话。」"
      ],
      options: [
        { text: "去，把家中旧事都说一遍", hint: "学识 +3；品第仍低", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: -2 }], then: "中正听完，在册上写了「寒素」二字。你的品，定了下下。" },
        { text: "托人递一份厚礼", need: { minSilver: 6 }, hint: "银钱 −6；品第上移一等", effects: [{ k: "silver", v: -6 }, { k: "official", v: 8 }, { k: "fame", v: 4 }], then: "礼是两匹绢、一方砚。半个月后，册上改成了中中。" },
        { text: "不去", hint: "声望 −5；此后无由入仕", effects: [{ k: "fame", v: -5 }], then: "你没去。父亲把那堆旧信又收回箱底，一句话没说。" }
      ]
    },
    {
      id: "wj6.hudiao", cat: "赋役", title: "户调", age: [18, 60], weight: 15,
      years: [280, 316],
      text: [
        "户调之式：丁男之户，岁输绢三匹、绵三斤；女及次丁男为户者半输。",
        "你家织的绢不够三匹。织机上一个冬天，只出了两匹半。",
        "里正说：「差的半匹，折钱也行。一匹三百。」"
      ],
      options: [
        { text: "折钱补上", need: { minSilver: 1 }, hint: "银钱 −1.5", effects: [{ k: "silver", v: -1.5 }], then: "你数了一百五十文给里正。他把钱串在腰上，走了。" },
        { text: "把织机上的经线拆下来凑", hint: "身体 −5；银钱 −0.5", effects: [{ k: "body", v: -5 }, { k: "silver", v: -0.5 }], then: "拆了经线，凑够三匹。开春要重上机，又得一个月。" },
        { text: "拖到秋后", hint: "或有催征", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -2 }], loseNote: "县里遣人催调，抓你去县仓前跪了一日，还加了二成。" }, then: "你说绢还没下机。里正说：「秋后我来。」" }
      ]
    },
    {
      id: "wj6.bazhou", cat: "世变", title: "罢兵", age: [16, 55], weight: 13,
      years: [280, 300],
      text: [
        "诏罢州郡兵。大郡置武吏百人，小郡五十人。",
        "你原是郡里的兵，吃了六年粮。今日交刀。",
        "校尉把刀收进库里，说：「回去种田吧。天下太平了。」"
      ],
      options: [
        { text: "回家种田", hint: "身体 +2；兵籍除名", effects: [{ k: "body", v: 2 }, { k: "martial", v: -4 }], then: "你把甲片卖了三十文。回到家，屋后的田已经荒了两年。" },
        { text: "投大族做部曲", hint: "银钱 +3；从此是私兵", effects: [{ k: "silver", v: 3 }, { k: "troops", v: 2 }, { k: "fame", v: -3 }], setFlag: ["buqu"], then: "你去了城西的荀家。荀家有三顷田、两百部曲，还养着三十匹好马。" },
        { text: "留在郡城，做武吏", hint: "银钱 +2；郡兵只剩百人", effects: [{ k: "silver", v: 2 }, { k: "official", v: 4 }], then: "你留下做了武吏，管十个人。郡里从此只剩一百个拿刀的。" }
      ]
    },
    {
      id: "wj6.bawang", cat: "世变", title: "诸王", age: [15, 60], weight: 16, once: true,
      years: [291, 306],
      text: [
        "{{八王之乱|291–306 年，晋宗室八王相继起兵}}。先是楚王杀汝南王，后是赵王杀贾后，再后来，谁杀谁已经数不清了。",
        "今日过境的是成都王的兵。他们要粮，要夫，要马。",
        "带队的是个二十来岁的都伯，他说：「给了，就是自己人；不给，也是自己人。」"
      ],
      options: [
        { text: "把粮都交出去", hint: "粮 −8；保住人", effects: [{ k: "grain", v: -8 }, { k: "fame", v: 2 }], then: "兵丁把谷子装上车。都伯临走摸了摸你家小孩的头，说：「这年头，活着就好。」" },
        { text: "藏起一半，交一半", hint: "粮 −4；或有搜检", effects: [{ k: "grain", v: -4 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -8 }, { k: "grain", v: -6 }], loseNote: "兵丁翻出了地窖。你被抽了二十鞭，粮一粒没剩。" }, then: "你把一半谷子埋进灶后的地里。兵丁装走了另一半，走得很急。" },
        { text: "举家往山里躲", hint: "身体 −6；田荒", effects: [{ k: "body", v: -6 }, { k: "field_wet", v: -2 }], then: "你在山里住了四十天，靠野菜和树皮。回家时，门板被拆走了，田里长满了草。" }
      ]
    },
    {
      id: "wj6.turong", cat: "天下", title: "关中", age: [20, 55], weight: 12,
      years: [290, 316],
      text: [
        "关中之民，半是氐羌。他们住在这里已经三代，说着官话，也说着自己的话。",
        "今年大旱，有人说：「这些胡人，本就不该在关内。」",
        "县里贴出告示，要「徙戎还本」。"
      ],
      options: [
        { text: "跟着说该迁", hint: "声望 +4；乡里结仇", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 6 }], then: "你说得很大声。街对面的那家氐人正在收摊，听见了，低头把布卷起来。" },
        { text: "不吭声", hint: "无得无失", effects: [], then: "告示贴了三天，被人撕了。没人知道是谁撕的。" },
        { text: "去给邻家报信", hint: "声望 −3；日后有报", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 8 }], schedule: [{ inYears: 4, effects: [{ k: "silver", v: 5 }], note: "邻家迁走前，把三亩水田过给了你。" }], then: "你连夜敲了邻家的门。他们收拾了一夜，天没亮就走了。" }
      ]
    },
    {
      id: "wj6.yongjia", cat: "世变", title: "永嘉", age: [12, 65], weight: 18, once: true,
      years: [311, 316],
      text: [
        "{{永嘉之乱|311 年匈奴刘曜攻破洛阳，怀帝被掳}}。洛阳的火烧了七天，据说连洛水都烫。",
        "逃过来的人一批一批，都说要往南。",
        "渡口的船，一人要五两银子。"
      ],
      options: [
        { text: "凑钱上船", need: { minSilver: 5 }, hint: "银钱 −5；身家全弃", effects: [{ k: "silver", v: -5 }, { k: "body", v: -4 }], then: "你把田契、房契都塞给了船家。船到江心，回头看北岸，什么也看不见。" },
        { text: "往山里走", hint: "身体 −10；或死于道", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.18, cause: "乱兵" }, then: "你带着一家往南边的山里走。走了二十天，路上见到的死人比活人多。" },
        { text: "留下，等事情过去", hint: "身体 −6；家产或尽", effects: [{ k: "body", v: -6 }, { k: "silver", v: -6 }], then: "你留了下来。兵过去以后，屋还在，粮没了，邻家三口没了。" }
      ]
    }
  ]);

  /* ══════════ 东晋 ══════════ */
  B.eraEvents.ejin = (B.eraEvents.ejin || []).concat([

    {
      id: "ej6.qiaozhi", cat: "官府", title: "白籍", age: [16, 60], weight: 15,
      years: [317, 420],
      text: [
        "南来的北人，都另立{{白籍|侨置郡县的户口，用白纸登记，与土著黄籍有别}}。白籍不纳租，不服役。",
        "你家的册子上，写的是「司州弘农郡」。那是你爷爷的郡，如今在胡人手里。",
        "本县的里正说：「白籍也有数。今日要点一点。」"
      ],
      options: [
        { text: "照白籍报，说祖籍弘农", hint: "免租役；日后被土断", effects: [{ k: "silver", v: 4 }], setFlag: ["baiji"], then: "里正在白册上记了你的名字。这一年，你没缴一粒租。" },
        { text: "报成本县黄籍", hint: "要纳租；安稳", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 3 }], then: "你报成了本县黄籍。里正多看了你一眼，说：「这样好，省事。」" },
        { text: "两头都报", hint: "银钱 +6；或有罪", effects: [{ k: "silver", v: 6 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "fame", v: -10 }, { k: "silver", v: -8 }], loseNote: "两册对不上，查出来了。罚了两年的租，还挨了杖。" }, then: "白册上有你，黄册上也有你。两头都不缴全。" }
      ]
    },
    {
      id: "ej6.tuduan", cat: "赋役", title: "土断", age: [18, 65], weight: 16, once: true,
      years: [341, 413],
      text: [
        "{{土断|撤销侨置郡县，白籍一律改入所在郡县黄籍}}。诏下：凡白籍者，以现居地为籍，纳租服役。",
        "你家在白籍上待了二十六年。",
        "里正拿着新册子来，说：「把旧籍交出来，我给你换新的。」"
      ],
      options: [
        { text: "交出旧籍，换黄籍", hint: "银钱 −5；从此纳税", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 3 }], then: "旧的白纸被收走，换回来一张黄纸。你把它贴在墙上，看了很久。" },
        { text: "把旧籍烧了，说是丢了", hint: "或有查究", effects: [{ k: "fame", v: -2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "查旧籍的底册，你祖上三代都在册。补缴了六年租，还被罚了役。" }, then: "你把旧籍塞进灶膛。火光里，爷爷的名字烧得最快。" },
        { text: "托人办成{{僮仆|投靠大族为私属，不入官籍}}", need: { minSilver: 4 }, hint: "银钱 −4；从此不仕", effects: [{ k: "silver", v: -4 }, { k: "fame", v: -6 }], setFlag: ["kehu"], then: "你把自己的名字，从官册上抹了，加进了顾家的私簿。" }
      ]
    },
    {
      id: "ej6.geike", cat: "家族", title: "给客", age: [16, 55], weight: 14,
      text: [
        "{{给客制|官品高下各给佃客，多者数十户，少者五户}}。王家一品，给客四十户。",
        "王家来人说：「你家那五亩坡地，卖给王家，人还住着。田租不用缴，只给我家送六成。」",
        "你算了算：缴官租是七成，还得服役。"
      ],
      options: [
        { text: "卖田投王家", hint: "田 −5；银钱 +6；免役", effects: [{ k: "field_dry", v: -5 }, { k: "silver", v: 6 }, { k: "fame", v: -4 }], then: "契上写的是「永卖」。你按了手印。此后三十年，你家每年往王家送六成。" },
        { text: "不卖", hint: "无得无失；田还是你的", effects: [], then: "你说这是祖田。来人笑了笑，说：「那你自己扛着。」" },
        { text: "只卖两亩，留三亩", hint: "田 −2；银钱 +2", effects: [{ k: "field_dry", v: -2 }, { k: "silver", v: 2 }], then: "你卖了两亩最远的。王家来人量地时，把界石往这边挪了三尺，你没吭声。" }
      ]
    },
    {
      id: "ej6.beifu", cat: "军旅", title: "北府", age: [18, 40], weight: 14, sex: "male",
      years: [377, 420],
      text: [
        "{{北府兵|谢玄镇广陵，募骁勇为北府兵，淝水之战主力}}募兵，驻京口。",
        "募兵的人说：「来者给口粮，战功授官。逃者斩，怯者斩。」",
        "队里已经有七十多个人，多是南来的流民。"
      ],
      options: [
        { text: "应募", hint: "身体 −6；或得官", effects: [{ k: "body", v: -6 }, { k: "martial", v: 8 }, { k: "troops", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }], loseNote: "第一次上阵，箭从肩上穿过。你在营里躺了两个月。" }, then: "你领了一杆长槊、一副皮甲，还有一双不合脚的靴。" },
        { text: "不去，缴代役钱", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你缴了三两。募兵的人看了一眼，把钱收了，没说话。" },
        { text: "把弟弟送去", hint: "声望 −4；家中少一人", effects: [{ k: "fame", v: -4 }, { k: "favor", v: -6 }], then: "弟弟那年十九。他走的时候，你在门口站着，一直站到看不见。" }
      ]
    },
    {
      id: "ej6.menfa", cat: "家族", title: "门第", age: [14, 26], weight: 14, once: true,
      text: [
        "{{王与马，共天下|王氏与司马氏共掌朝政，时语}}。上门提亲的，先问的不是人品，是郡望。",
        "你家郡望是次等。隔壁村李家是上等，家里藏书三千卷。",
        "李家的媒人来了，说的是他家庶出的三女。"
      ],
      options: [
        { text: "答应这门亲", hint: "声望 +6；日后受气", effects: [{ k: "fame", v: 6 }, { k: "favor", v: -3 }], setFlag: ["married"], then: "婚事办得很体面。婚后第三年，她的母亲来住，说你家「到底是次等门第」。" },
        { text: "回绝，另娶同等的", hint: "声望 −2；心里踏实", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 4 }], setFlag: ["married"], then: "你娶了邻村织户的女儿。她很会织，一年能出六匹绢。" },
        { text: "先去李家做门客", hint: "学识 +6；银钱 −2", effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -2 }], then: "你在李家抄了两年书，抄完了半部《汉书》。李家的三女，你只见过一次。" }
      ]
    },
    {
      id: "ej6.koushui", cat: "赋役", title: "口税", age: [20, 65], weight: 15,
      years: [376, 420],
      text: [
        "{{口税|东晋太元二年改为按口收税，每人三斛，后增至五石}}。一户五口，纳十五斛。",
        "你家五口，去岁收了四十斛。纳完税，剩下二十五斛。",
        "今年县里说，加到五石一口。"
      ],
      options: [
        { text: "照数纳", hint: "粮 −25；家无余粟", effects: [{ k: "grain", v: -25 }, { k: "fame", v: 4 }], then: "二十五斛谷子装上车。你搬完最后一袋，坐在门槛上，觉得腿是空的。" },
        { text: "报少两口，说孩子夭了", hint: "粮 −15；或有验", effects: [{ k: "grain", v: -15 }, { k: "fame", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -10 }, { k: "grain", v: -8 }], loseNote: "里正来点人，孩子正从门后探头。多罚了三年口税。" }, then: "你报了三个人的口。孩子在屋里不敢出声，饿了三天。" },
        { text: "投到寺院名下", hint: "粮 −8；从此不是编户", effects: [{ k: "grain", v: -8 }, { k: "fame", v: -5 }, { k: "luck", v: 3 }], setFlag: ["sengke"], then: "寺里给你一块地种，收成一半归常住。你的名字，从此不在县里的册上。" }
      ]
    },
    {
      id: "ej6.feishui", cat: "世变", title: "淝水", age: [15, 60], weight: 16, once: true,
      years: [383, 384],
      text: [
        "{{苻坚|前秦君主，383 年率众南下}}号称百万，至淝水。京师戒严，男子十五以上皆充兵。",
        "你被编进了民壮，发一根竹枪，一件纸甲。",
        "队正在河边喊：「过了河就是敌人，退一步者斩。」"
      ],
      options: [
        { text: "跟着过河", hint: "身体 −10；或有战功", effects: [{ k: "body", v: -10 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -10 }, { k: "martial", v: -4 }], loseNote: "阵没破，你先倒了。醒来时躺在草堆上，身上压着别人的一条腿。" }, then: "河水很凉。对面的人比想象中多，也比想象中乱。" },
        { text: "躲在民夫队里搬粮", hint: "身体 −4；避了锋刃", effects: [{ k: "body", v: -4 }, { k: "fame", v: -3 }], then: "你在后队搬了整夜的粮。前边喊杀声一阵一阵，天亮时停了。" },
        { text: "夜里逃走", hint: "身体 −6；家中受牵连", effects: [{ k: "body", v: -6 }, { k: "fame", v: -8 }], gamble: { deathChance: 0.08, cause: "逃兵" }, then: "你趁夜往西走。走了三十里，听见后面有马蹄声，就往稻田里趴下去。" }
      ]
    },
    {
      id: "ej6.sunen", cat: "世变", title: "海岛", age: [16, 60], weight: 13, once: true,
      years: [399, 402],
      text: [
        "{{孙恩|五斗米道首领，399 年起兵于海岛}}自海上登陆，八郡响应，旬日之中众数十万。",
        "县里的官仓被打开，米撒了一地。有人在喊：「天师道，均贫富！」",
        "你手里握着一把锄头。"
      ],
      options: [
        { text: "跟着去", hint: "银钱 +5；日后被清算", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -4 }, { k: "grudge", v: 6 }], schedule: [{ inYears: 3, effects: [{ k: "body", v: -12 }], note: "官军收复郡城，从众者皆被追究。" }], then: "你跟着队伍去了县仓，装了两斗米。人群里有人在唱经，声音很大。" },
        { text: "关门闭户，谁也不见", hint: "粮 −4；保住自己", effects: [{ k: "grain", v: -4 }], then: "你把门从里头用石磨顶住，三天没出门。第四天，街上安静了。" },
        { text: "带着家人往会稽去", hint: "身体 −5；钱财散尽", effects: [{ k: "body", v: -5 }, { k: "silver", v: -3 }], then: "你连夜走。路上都是往同一个方向走的人，谁也不看谁。" }
      ]
    }
  ]);

  /* ══════════ 南北朝 ══════════ */
  B.eraEvents.ns = (B.eraEvents.ns || []).concat([

    {
      id: "ns6.juntian", cat: "赋役", title: "均田", age: [18, 60], weight: 17, sex: "male",
      years: [485, 589],
      text: [
        "诏行{{均田|北魏太和九年颁，按丁口授田}}：男夫十五以上，受露田四十亩、桑田二十亩；妇人二十亩。露田身死还官，桑田为世业。",
        "里正拿着绳子来量地。量到最后，说：「你家应受六十亩，实有九亩。」",
        "「剩下的，往北边荒地里补。补不补得上，看上头拨不拨。」"
      ],
      options: [
        { text: "要足额，往北边领荒田", hint: "田 +40；要开荒", effects: [{ k: "field_wet", v: 8 }, { k: "body", v: -6 }], then: "北边那片地离村二十里，全是草根和石头。你带着全家开了三年。" },
        { text: "只种现有的，不领荒田", hint: "田不变；省力", effects: [{ k: "fame", v: -2 }], then: "你说荒田太远。里正把名字划掉了，说：「那你这辈子就九亩。」" },
        { text: "把桑田多报二十亩", hint: "田 +20；或有丈量", effects: [{ k: "field_dry", v: 20 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -8 }], loseNote: "三年后重造户籍，丈量出多报之数。田退回，罚绢十匹。" }, then: "你把河滩那片沙地报成了桑田。桑苗栽下去，活了四成。" }
      ]
    },
    {
      id: "ns6.sanzhang", cat: "官府", title: "三长", age: [20, 60], weight: 15, once: true,
      years: [486, 589],
      text: [
        "{{三长制|北魏废宗主督护，立邻长、里长、党长，直隶州郡}}。五家为邻，五邻为里，五里为党。",
        "旧时村里的事，都由宗主赵家说了算。赵家荫着三百多户，不缴租。",
        "新的里长来点户，赵家把门关上了。里长站在门外，回头看你。"
      ],
      options: [
        { text: "报出实有丁口", hint: "赋役照实；赵家要报复", effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 8 }], then: "你把家里的丁口一一报清：成丁二人，幼子三人。里长记下了。赵家的门，那天一直没开。" },
        { text: "少报一丁", hint: "银钱 +3；日后有查", effects: [{ k: "silver", v: 3 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -8 }], loseNote: "三年后大括户口，隐丁查出，补缴并罚。" }, then: "你报了成丁一人。弟弟躲在柴房里，躲了两年。" },
        { text: "去劝赵家开门", hint: "学识 +2；声望 +4", effects: [{ k: "knowledge", v: 2 }, { k: "fame", v: 4 }], then: "你在赵家门外站了半天。门开了条缝，赵家的老管事说：「我们报，但不报全。」" }
      ]
    },
    {
      id: "ns6.dianqian", cat: "官府", title: "典签", age: [20, 50], weight: 12, once: true,
      years: [450, 589],
      text: [
        "{{典签|南朝以寒人任典签，监临方镇，实权在刺史之上}}到了州里。一个二十几岁的年轻人，带着两个随从。",
        "刺史设宴，坐了上座；典签坐下座。席间，典签一句话没说。",
        "宴后，刺史把你叫去：「往后州里的文书，先送他看。」"
      ],
      options: [
        { text: "照办，事事先送", hint: "声望 −3；保住官位", effects: [{ k: "fame", v: -3 }, { k: "official", v: 4 }], then: "你此后每份文书都抄一份送到典签的院子。他从不答复，也从不退回。" },
        { text: "密报刺史的私事", hint: "官位 +8；结怨", effects: [{ k: "official", v: 8 }, { k: "grudge", v: 8 }], schedule: [{ inYears: 2, effects: [{ k: "body", v: -8 }], note: "刺史被征还都，途中病死。他的旧部找上了你。" }], then: "你在夜里去了典签的院子，说了半个时辰。出来时，天快亮了。" },
        { text: "称病不出", hint: "身体 −3；官位不保", effects: [{ k: "body", v: -3 }, { k: "official", v: -6 }], then: "你在家躺了两个月。等你回去，那个位子已经有人坐了。" }
      ]
    },
    {
      id: "ns6.hanren", cat: "科举", title: "寒人", age: [16, 35], weight: 13, when: { minKnowledge: 30 },
      text: [
        "{{寒人掌机要|南朝皇帝用寒门出身者掌中书通事舍人，夺门阀之权}}。中书省里，如今坐着几个没有郡望的人。",
        "有人荐你去中书省做书吏。",
        "荐书的人说：「进去了，一辈子让人看不起；出来了，一辈子是寒人。」"
      ],
      options: [
        { text: "去", hint: "学识 +5；声望 −6；官位 +10", effects: [{ k: "knowledge", v: 5 }, { k: "fame", v: -6 }, { k: "official", v: 10 }], then: "你在中书省抄了三年诏书。抄得又快又准，从没错过一个字。门阀出身的人从你桌边过，从不看你。" },
        { text: "不去，回家教书", hint: "声望 +3；学识 +4", effects: [{ k: "fame", v: 3 }, { k: "knowledge", v: 4 }], then: "你回村开了个学馆，收了七个学生。束脩一年一石米。" },
        { text: "去，同时结交士族", hint: "学识 +3；或两头不讨好", effects: [{ k: "knowledge", v: 3 }, { k: "official", v: 4 }], gamble: { winChance: 0.45, win: [], lose: [{ k: "fame", v: -10 }], loseNote: "士族嫌你钻营，寒人骂你谄媚。两头都没落下好。" }, then: "你白天抄诏书，晚上替人写行状。两头都认识了一些人。" }
      ]
    },
    {
      id: "ns6.fubing", cat: "军旅", title: "军籍", age: [16, 45], weight: 14, sex: "male",
      years: [540, 589],
      text: [
        "{{府兵|西魏宇文泰立府兵制，兵农分离，府兵另立军籍}}。凡入籍者，免租调，不随县里点丁，世代为兵。",
        "你家被点了名。",
        "来的人说：「入了军籍，马和刀自己备。没有马的，做步卒。」"
      ],
      options: [
        { text: "入军籍，自备马刀", need: { minSilver: 5 }, hint: "银钱 −5；免租调；世代为兵", effects: [{ k: "silver", v: -5 }, { k: "martial", v: 6 }, { k: "command", v: 80 }], setFlag: ["fubing"], then: "你买了一匹四岁的栗色马，四十两。卖家说这马认人，你要每天喂它。" },
        { text: "入军籍，做步卒", hint: "身体 −6；免租调", effects: [{ k: "body", v: -6 }, { k: "martial", v: 4 }], setFlag: ["fubing"], then: "你领了一杆枪、一张弓、三十支箭。箭是自己削的。" },
        { text: "出钱免籍", need: { minSilver: 8 }, hint: "银钱 −8；仍要缴租调", effects: [{ k: "silver", v: -8 }], then: "八两银子换回一张纸，上头写「免」。你把纸收进柜底，每年还是得缴租调。" }
      ]
    },
    {
      id: "ns6.sengzhi", cat: "方外", title: "僧祇户", age: [18, 60], weight: 13,
      years: [470, 589],
      text: [
        "{{僧祇户|北魏寺院所属人户，岁纳僧祇粟六十斛，免官役}}。寺里有一千二百户。",
        "寺主说：「入我寺籍，官差不到你门上。每年纳粟六十斛就行。」",
        "你算了算：六十斛，是四十亩田的收成。"
      ],
      options: [
        { text: "入寺籍", hint: "免官役；每年纳粟", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -3 }, { k: "luck", v: 2 }], setFlag: ["sengke"], then: "你入寺籍那天，寺里给你念了一段经。回家路上，你觉得脚步轻了些。" },
        { text: "不入，照旧当差", hint: "身体 −5；缴租调", effects: [{ k: "body", v: -5 }, { k: "silver", v: -2 }], then: "你照旧缴租、照旧服役。那年冬天修渠，你在冰水里站了十天。" },
        { text: "只把两亩田捐给寺里", hint: "田 −2；声望 +4", effects: [{ k: "field_wet", v: -2 }, { k: "fame", v: 4 }], then: "你捐了两亩。寺里在石碑上刻了你父亲的名字，刻得比你的名字大。" }
      ]
    },
    {
      id: "ns6.houjing", cat: "世变", title: "台城", age: [14, 65], weight: 18, once: true,
      years: [548, 552],
      text: [
        "{{侯景之乱|548 年侯景围建康，台城陷，江南大残}}。城围了一百三十天。",
        "城里先是吃马，后是吃鼠，再后来，街上有人换了孩子。",
        "你在城里，或是在城外，都一样。"
      ],
      options: [
        { text: "在城里守着", hint: "身体 −12；或有存粮", effects: [{ k: "body", v: -12 }, { k: "grain", v: -10 }], gamble: { deathChance: 0.22, cause: "围城" }, then: "你守着自家那间屋。第四十天，屋后的井里捞上来两个人。" },
        { text: "往城外逃", hint: "身体 −10；家产尽弃", effects: [{ k: "body", v: -10 }, { k: "silver", v: -8 }], gamble: { deathChance: 0.15, cause: "乱兵" }, then: "你从水门爬出去。城外也是一样，田里没有人，狗都很瘦。" },
        { text: "躲进寺里", hint: "粮 −6；或有庇护", effects: [{ k: "grain", v: -6 }, { k: "luck", v: 4 }], then: "寺里挤了三百多人。和尚每日施一次粥，一人一勺，稀得能照见人。" }
      ]
    },
    {
      id: "ns6.zubi", cat: "赋役", title: "租调", age: [18, 60], weight: 14,
      years: [490, 589],
      text: [
        "{{租调|一夫一妇纳帛一匹、粟二石；未婚丁男减半}}。今年又加了「调外」一项：每亩加丝二两。",
        "你家有田十四亩。",
        "里正说：「这是上头的意思，我也没法。」"
      ],
      options: [
        { text: "照缴", hint: "银钱 −3；粮 −4", effects: [{ k: "silver", v: -3 }, { k: "grain", v: -4 }], then: "你把丝称了又称，称了三遍，多出一钱也放了进去。" },
        { text: "把丝换成次等的", hint: "银钱 −1；或有验", effects: [{ k: "silver", v: -1 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -5 }, { k: "fame", v: -6 }], loseNote: "验丝时被挑出来，说是「恶丝」。罚了双倍。" }, then: "你把好丝留着，掺了半斤旧丝缴上去。里正捏了捏，没细看。" },
        { text: "去求里正宽限", hint: "声望 −3；缓了两个月", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 4 }], then: "里正说：「宽你两个月，秋后一起缴。」你谢了他，他摆摆手。" }
      ]
    }
  ]);

})(window.PACK_BASE);
