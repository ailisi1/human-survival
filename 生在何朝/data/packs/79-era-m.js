/* 生在何朝 · 各朝专有事件 卷十三：五代、辽、西夏
 * 这三处是同一段时间里的三种活法：
 * 五代是军镇说了算，辽是草原来的和汉地的两套人，西夏夹在中间靠渠和榷场。
 * 补的是制度落在小户身上的样子，不是朝廷的事。
 * 前缀 wd8. / l8. / xx8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 五代 ══════════ */
  B.eraEvents.wudai = (B.eraEvents.wudai || []).concat([

    {
      id: "wd8.yingtian", cat: "赋役", title: "营田", age: [18, 60], weight: 15, sex: "male",
      years: [907, 960],
      text: [
        "{{营田|五代军府以荒地募民耕种，官给牛种，收成官民分}}。军府贴出告示：来种者，给牛、给种，秋后官取六成。",
        "地是荒地，在城北二十里，长满荆棘。",
        "管营田的军校说：「种得多，分得多。种不出来，牛要还。」"
      ],
      options: [
        { text: "领牛开荒", hint: "田 +10；粮 −6", effects: [{ k: "field_wet", v: 10 }, { k: "grain", v: -6 }], then: "你领了一头牛、十亩荒。开了两年，第一年只收了三成，第二年收了七成。" },
        { text: "少领，只开四亩", hint: "田 +4；粮 −2", effects: [{ k: "field_wet", v: 4 }, { k: "grain", v: -2 }], then: "你只开了四亩。军校在册上写「胆小」，但没为难你。" },
        { text: "不领，去给人做长工", hint: "银钱 +3；无田", effects: [{ k: "silver", v: 3 }], then: "你去了镇上的李家做长工。一年三贯，管饭，年底给一双鞋。" }
      ]
    },
    {
      id: "wd8.siyan", cat: "市井", title: "私盐", age: [18, 55], weight: 14,
      years: [907, 960],
      text: [
        "官盐一斤四十文，私盐一斤十二文。",
        "贩私盐的，抓住要处死。",
        "村里的老周贩了三年，去年没回来。"
      ],
      options: [
        { text: "贩一趟", hint: "银钱 +6；或有死", effects: [{ k: "silver", v: 6 }], gamble: { deathChance: 0.14, cause: "盐法" }, then: "你挑了两筐，走了七十里。路上遇见两拨查盐的，都躲过去了。" },
        { text: "买私盐自己吃", hint: "银钱 −1；或有查", effects: [{ k: "silver", v: -1 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "silver", v: -6 }, { k: "body", v: -6 }], loseNote: "巡盐的搜出私盐。罚了钱，还挨了十板。" }, then: "你买了五斤私盐，藏在米缸底下。" },
        { text: "规规矩矩买官盐", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你买官盐。一斤四十文，一个月的盐钱，够买两斗米。" }
      ]
    },
    {
      id: "wd8.guoma", cat: "赋役", title: "括马", age: [18, 60], weight: 15,
      years: [920, 960],
      text: [
        "{{括马|五代军镇征发民间马匹充军}}。军府下令：凡民家有马，皆入官，给价三成。",
        "你家有一头骡子。骡子算不算马，没人说得清。",
        "来括马的兵说：「骡子也是四条腿。」"
      ],
      options: [
        { text: "交出去", hint: "银钱 +2；失一骡", effects: [{ k: "silver", v: 2 }, { k: "field_wet", v: -2 }], then: "兵把骡子牵走了，给了六百文。市价该是两千。" },
        { text: "把骡子藏进山里", hint: "或有搜", effects: [], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -4 }], loseNote: "搜山搜出来了。骡子没收，你被打了二十鞭。" }, then: "你把骡子牵到山里，托给看林的老汉。回来时报了「病死」。" },
        { text: "说是邻家的", hint: "或有查", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -6 }], loseNote: "邻家不认。查出谎报，罚了两千文。" }, then: "你说这骡子是借来的。兵看了看，走了。" }
      ]
    },
    {
      id: "wd8.mufu", cat: "官府", title: "辟署", age: [20, 45], weight: 12, when: { minKnowledge: 28 },
      years: [907, 960],
      text: [
        "{{辟署|五代藩镇自行征辟幕职，不由吏部}}。节度使的幕府缺一个掌书记。",
        "有人荐了你。",
        "幕府的人说：「来了就是自己人。将来府主出事，你也跟着。」"
      ],
      options: [
        { text: "去", hint: "银钱 +5；官位 +8", effects: [{ k: "silver", v: 5 }, { k: "official", v: 8 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "府主被部下所杀。幕职一并下狱，关了半年。" }, then: "你去了。幕府里八个人，四个是府主的乡人。" },
        { text: "不去，在家教书", hint: "学识 +4；声望 +3", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 3 }], then: "你在家开了个学馆，收了五个学生。一个学生后来做了县尉。" },
        { text: "去，但只做文书，不问事", hint: "学识 +3；官位 +4", effects: [{ k: "knowledge", v: 3 }, { k: "official", v: 4 }], then: "你只管抄写。府里议事，你坐在末座，记完了就走。" }
      ]
    },
    {
      id: "wd8.fo", cat: "方外", title: "毁佛", age: [16, 60], weight: 13, once: true,
      years: [955, 958],
      text: [
        "{{后周世宗毁佛|955 年诏毁天下寺院，铜像铸钱}}。县里的寺院，只留一座。",
        "其余的，佛像熔了铸钱，僧人还俗。",
        "寺里的老僧，在你家门口站了半天。"
      ],
      options: [
        { text: "收留他一晚", hint: "粮 −2；声望 +4", effects: [{ k: "grain", v: -2 }, { k: "fame", v: 4 }], then: "他吃了一碗粥，说了半夜的话。天亮时走了，留下一串念珠。" },
        { text: "关门", hint: "无得无失", effects: [], then: "你把门关了。第二天早上，门口没有人。" },
        { text: "去寺里帮着搬佛像", hint: "银钱 +3；声望 −4", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -4 }], then: "你和六个人抬了一尊铜佛。熔的时候，铜水流出来，是亮的。" }
      ]
    },
    {
      id: "wd8.fangshi", cat: "市井", title: "坊墙", age: [18, 60], weight: 12,
      years: [907, 960],
      text: [
        "旧的坊墙塌了半边，没人修。",
        "有人在墙根下搭了棚，卖汤饼。夜里也不收。",
        "巡街的军士来赶过两回。第三次，他自己也坐下吃了一碗。"
      ],
      options: [
        { text: "也在墙根搭个棚", hint: "银钱 +4；或有赶", effects: [{ k: "silver", v: 4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -3 }], loseNote: "军府下令清理。棚子被拆了，锅也砸了。" }, then: "你搭了个棚，卖胡饼。一夜能卖四十个。" },
        { text: "把自家临街的墙拆了，开店", hint: "银钱 +6；或有争", effects: [{ k: "silver", v: 6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }], loseNote: "邻居告你侵占街面。罚了钱，墙还得砌回去。" }, then: "你把墙拆了一段，摆了三张桌。生意比墙根下好。" },
        { text: "什么也不做", hint: "无得无失", effects: [], then: "你看着别人做。一年后，那条街成了市。" }
      ]
    },
    {
      id: "wd8.zang", cat: "宗族", title: "丧葬", age: [20, 65], weight: 12,
      years: [907, 960],
      text: [
        "父亲死了。",
        "请僧道、做道场、买棺、砌坟，一样一样都要钱。",
        "族老说：「丧事办薄了，族里要说话。」"
      ],
      options: [
        { text: "按规矩办，借钱也要办", hint: "银钱 −10；声望 +8；欠债", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 8 }, { k: "debt", v: { amt: 15, rate: 0.03, dueYear: 2 } }], then: "你办了七天。僧道各三人，来吊的二百多。账是赊的。" },
        { text: "简办", hint: "银钱 −2；声望 −6", effects: [{ k: "silver", v: -2 }, { k: "fame", v: -6 }], then: "三天出殡，没有僧道。族老在灵前站了一会儿，没说话就走了。" },
        { text: "卖一亩田办", hint: "田 −2；声望 +5", effects: [{ k: "field_wet", v: -2 }, { k: "fame", v: 5 }], then: "你卖了一亩。棺是柏木的，坟前立了碑，刻了父亲的名字。" }
      ]
    },
    {
      id: "wd8.huang", cat: "天灾", title: "蝗", age: [10, 65], weight: 13,
      years: [920, 960],
      text: [
        "蝗自东北来，蔽天。",
        "县里的官说：「捕蝗一斗，换粟一斗。」",
        "全村的人都下了地。"
      ],
      options: [
        { text: "去捕蝗换粟", hint: "身体 −8；粮 +6", effects: [{ k: "body", v: -8 }, { k: "grain", v: 6 }], then: "你捕了十二斗。换粮的时候，仓吏数了数，说：「有土。」扣了一半。" },
        { text: "在地头烧火", hint: "身体 −8；粮 −4", effects: [{ k: "body", v: -8 }, { k: "grain", v: -4 }], then: "你在地头点了一排火。蝗扑过来，烧得噼啪响，一股焦味。" },
        { text: "守着自家的地，不换粟", hint: "粮 −8", effects: [{ k: "grain", v: -8 }], then: "你没去捕。别人家的地捕干净了，蝗全落到你家。" }
      ]
    },
    {
      id: "wd8.zhihu", cat: "官府", title: "指挥使", age: [20, 50], weight: 12, sex: "male",
      years: [930, 960],
      text: [
        "{{指挥使|五代军职，一指挥约五百人}}过村，要住你家。",
        "他有四十个兵，七匹马。",
        "他说：「住三天。吃了的，算你的。」"
      ],
      options: [
        { text: "好好招待", hint: "粮 −8；或有赏", effects: [{ k: "grain", v: -8 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 4 }], lose: [], loseNote: "住了七天，走时一句话也没留。" }, then: "你杀了家里唯一的一只鸡。指挥使吃了，说：「你这人有心。」" },
        { text: "推说家里没地方", hint: "声望 −4；或有强占", effects: [{ k: "fame", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -6 }], loseNote: "兵自己占了。你被推到院子里，屋里的东西被搬走了一半。" }, then: "你说屋子漏雨。指挥使看了你一眼，去了邻家。" },
        { text: "把女儿藏起来", hint: "或有失", effects: [], gamble: { winChance: 0.6, win: [], lose: [{ k: "favor", v: -10 }, { k: "fame", v: -8 }], loseNote: "兵在柴房里找到了她。第二天，她不见了。" }, then: "你把女儿送到姑母家。三天里，你一直站在门口。" }
      ]
    },
    {
      id: "wd8.liangjia", cat: "市井", title: "粮价", age: [18, 65], weight: 13,
      years: [907, 960],
      text: [
        "兵事一起，粮价一天三变。",
        "春天一斗八十文，秋天一斗三百文。",
        "你手里有六贯钱，是去年卖布挣的。"
      ],
      options: [
        { text: "全买了粮囤着", hint: "银钱 −6；粮 +14", effects: [{ k: "silver", v: -6 }, { k: "grain", v: 14 }], then: "你买了十八斗，堆在床底下。夜里翻身，能听见粮在动。" },
        { text: "买一半，留一半钱", hint: "银钱 −3；粮 +7", effects: [{ k: "silver", v: -3 }, { k: "grain", v: 7 }], then: "你买了九斗，留了三贯。后来粮价涨了，那三贯不够买四斗。" },
        { text: "把钱放出去，收息", hint: "银钱 +2；或有失", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "silver", v: -6 }], loseNote: "借钱的人跑了。你找了一个月，没找到。" }, then: "你把钱借给了镇上的布商，月息五分。他按期还了两个月，第三个月没还。" }
      ]
    }
  ]);

  /* ══════════ 辽 ══════════ */
  B.eraEvents.liao = (B.eraEvents.liao || []).concat([

    {
      id: "l8.fenshui", cat: "官府", title: "分水", age: [18, 60], weight: 14,
      years: [950, 1125],
      text: [
        "汉人村在上游，契丹营在下游。",
        "今年旱，上游把水截了。",
        "下游的契丹人来讨水，带着弓。"
      ],
      options: [
        { text: "跟着村里截水", hint: "粮 +4；结仇", effects: [{ k: "grain", v: 4 }, { k: "grudge", v: 8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }, { k: "grain", v: -6 }], loseNote: "契丹人夜里来扒了口子，还射伤了两个人。" }, then: "你跟着村里把水截了。那一年，你家的地浇透了。" },
        { text: "劝村里分一半", hint: "声望 +6；粮 −4", effects: [{ k: "fame", v: 6 }, { k: "grain", v: -4 }], then: "你在祠堂里说了半个时辰。族长最后说：「分一半。」" },
        { text: "夜里偷偷去开口子", hint: "粮 +2；或有祸", effects: [{ k: "grain", v: 2 }], gamble: { deathChance: 0.08, cause: "械斗" }, then: "你半夜去把水口挖开一道缝。天亮时，下游的水涨了半尺。" }
      ]
    },
    {
      id: "l8.yishi", cat: "科举", title: "汉人进士", age: [17, 38], weight: 13, when: { minKnowledge: 35 },
      years: [990, 1125],
      text: [
        "辽也有科举，只对汉人。",
        "三年一次，取人不过二三十。",
        "先生说：「中了，能做南面官；不中，一辈子教书。」"
      ],
      options: [
        { text: "去考", hint: "学识 +6", effects: [{ k: "knowledge", v: 6 }], gamble: { winChance: 0.18, win: [], lose: [{ k: "fame", v: -3 }, { k: "silver", v: -3 }], loseNote: "落第。应考的三百多，取二十。" }, then: "你考了三场。题目是《论语》和时务策。" },
        { text: "不考，去南面官的衙门做书吏", hint: "银钱 +3；官位 +4", effects: [{ k: "silver", v: 3 }, { k: "official", v: 4 }], then: "你做了书吏。每月俸钱两贯，管一顿饭。" },
        { text: "去给契丹贵族做汉文教师", hint: "银钱 +5；学识 +3", effects: [{ k: "silver", v: 5 }, { k: "knowledge", v: 3 }], then: "你教三个契丹子弟读汉文。他们学得很快，写的字比你还好。" }
      ]
    },
    {
      id: "l8.yanshang", cat: "营生", title: "盐池", age: [18, 60], weight: 13,
      years: [950, 1125],
      text: [
        "辽有盐池，盐贱。一斗盐换一斗粟。",
        "盐池归官府，私煮者死。",
        "池边的村子，家家都私煮。"
      ],
      options: [
        { text: "也去私煮", hint: "银钱 +5；或有死", effects: [{ k: "silver", v: 5 }], gamble: { deathChance: 0.1, cause: "盐法" }, then: "你在池边挖了个坑，煮了两天，出了一斗盐。" },
        { text: "买官盐", hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你买官盐。官盐贵三倍，但是不用怕。" },
        { text: "给盐官做工", hint: "银钱 +3；身体 −6", effects: [{ k: "silver", v: 3 }, { k: "body", v: -6 }], then: "你在盐池上做了两个月。脚被盐水泡烂了，走路一瘸一拐。" }
      ]
    },
    {
      id: "l8.zhengfa", cat: "军旅", title: "签汉军", age: [18, 50], weight: 14, sex: "male",
      years: [1000, 1125],
      text: [
        "辽用兵，汉人出{{汉军|辽代汉人签发的军队，多为步卒}}。",
        "一村出三十人。",
        "你家两个男丁，抽一个。"
      ],
      options: [
        { text: "自己去", hint: "身体 −10；或有功", effects: [{ k: "body", v: -10 }, { k: "martial", v: 5 }], gamble: { deathChance: 0.14, cause: "战阵" }, then: "你去了。汉军走在契丹骑兵后面，吃土。" },
        { text: "花钱雇人", need: { minSilver: 3 }, hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你雇了一个流民。他去了，三个月后逃回来了，瘦得认不出。" },
        { text: "逃到别处去", hint: "身体 −8；田弃", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -10 }], loseNote: "被勾回来，打了三十棍，还是去了。" }, then: "你带着家人往东走。走了十天，在一个没人认识你的村子里住下。" }
      ]
    },
    {
      id: "l8.pijia", cat: "营生", title: "皮货", age: [16, 60], weight: 13,
      years: [950, 1125],
      text: [
        "契丹人拿皮子来换布、换铁、换茶。",
        "一张好貂皮，换三匹布。",
        "你的布是自己织的，一年出十二匹。"
      ],
      options: [
        { text: "换皮子，再拿去南边卖", hint: "银钱 +6；或有劫", effects: [{ k: "silver", v: 6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -5 }, { k: "body", v: -6 }], loseNote: "路上遇见劫道的。皮子没了，人被砍了一刀。" }, then: "你用六匹布换了四张貂皮、两张狐皮。南边的价是三倍。" },
        { text: "换皮子自己穿", hint: "身体 +4；银钱 −2", effects: [{ k: "body", v: 4 }, { k: "silver", v: -2 }], then: "你用两匹布换了一张羊皮，缝了件袄。那个冬天不冷了。" },
        { text: "不换，布留着自己穿", hint: "银钱 −1", effects: [{ k: "silver", v: -1 }], then: "你没换。那年冬天，一家人挤在一床被子里。" }
      ]
    },
    {
      id: "l8.zhengshui", cat: "赋役", title: "头下税", age: [18, 60], weight: 15,
      years: [950, 1125],
      text: [
        "你住的地方，属{{头下州|辽代贵族私属的州，赋税归领主}}。",
        "今年领主加税：从三成加到五成。",
        "管事的说：「不愿意，可以走。走了，地留下。」"
      ],
      options: [
        { text: "缴五成", hint: "粮 −12", effects: [{ k: "grain", v: -12 }], then: "你缴了五成。剩下的五成，够吃到开春。" },
        { text: "走", hint: "身体 −8；田弃", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: -8 }], then: "你走了。走出三十里，回头看了看那块地，已经有人在犁了。" },
        { text: "去求南面官", hint: "声望 +4；或有拖", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.3, win: [{ k: "grain", v: 4 }], lose: [{ k: "silver", v: -4 }], loseNote: "南面官说：「头下的事，我管不着。」你还花了盘缠。" }, then: "你走了两天到南面官的衙门。递了状子，等了半个月。" }
      ]
    },
    {
      id: "l8.donglie", cat: "乡里", title: "冬猎", age: [14, 55], weight: 12, sex: "male",
      years: [950, 1125],
      text: [
        "冬猎，契丹人的规矩。凡在猎场的，都要出人出马。",
        "你没有马。",
        "队里说：「没有马，就赶兽。」"
      ],
      options: [
        { text: "去赶兽", hint: "身体 −8；肉 +4", effects: [{ k: "body", v: -8 }, { k: "grain", v: 4 }], then: "你跟着赶了十天。围住了一群黄羊，分到一条后腿。" },
        { text: "不去", hint: "声望 −5；或有罚", effects: [{ k: "fame", v: -5 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "被查出来，罚了羊两只。" }, then: "你说腿疼。队里记了一笔。" },
        { text: "帮着剥皮、分肉", hint: "身体 −4；肉 +5", effects: [{ k: "body", v: -4 }, { k: "grain", v: 5 }], then: "你剥了三十多张皮。手冻裂了，分到的肉比别人多一点。" }
      ]
    },
    {
      id: "l8.hanqi", cat: "家族", title: "通婚", age: [16, 30], weight: 12,
      years: [950, 1125],
      text: [
        "契丹人与汉人通婚，辽法不禁。",
        "邻家的契丹姑娘，会说汉话，会织布。",
        "你母亲说：「娶了她，族里要说闲话。」"
      ],
      options: [
        { text: "娶", hint: "声望 −4；家中得力", effects: [{ k: "fame", v: -4 }, { k: "favor", v: 8 }, { k: "silver", v: 2 }], setFlag: ["married"], then: "你娶了她。族里三个月没人来你家。第四个月，她给族里每家送了一匹布。" },
        { text: "不娶，另找汉人家的", hint: "声望 +3", effects: [{ k: "fame", v: 3 }], setFlag: ["married"], then: "你娶了邻村汉人家的女儿。母亲很满意。" },
        { text: "娶，搬到她家的营里去", hint: "田弃；学识 +3", effects: [{ k: "field_wet", v: -4 }, { k: "knowledge", v: 3 }], setFlag: ["married"], then: "你搬到了她家的营里。学会了骑马，也学会了契丹话。" }
      ]
    },
    {
      id: "l8.shui", cat: "赋役", title: "差发", age: [20, 60], weight: 13,
      years: [1000, 1125],
      text: [
        "{{差发|辽代对属部征发的马、牛、皮、毡等物}}。今年要皮张，一户三张。",
        "你家没有猎户。",
        "里正说：「买也要买来。」"
      ],
      options: [
        { text: "买皮子缴", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "你去镇上买了三张羊皮，六百文。买的时候，价已经涨了。" },
        { text: "自己上山猎", hint: "身体 −8；或有得", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "silver", v: -2 }], loseNote: "上山七天，只打到两只兔。皮不够，还是得买。" }, then: "你上山猎了七天。打了两只狐、一只獾。" },
        { text: "拖到年底", hint: "或有催", effects: [{ k: "fame", v: -3 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -4 }], loseNote: "里正带人来催，牵走了一只羊。" }, then: "你拖到腊月。里正来催了两次，第二次带了人。" }
      ]
    },
    {
      id: "l8.hanqu", cat: "天灾", title: "河淤", age: [16, 65], weight: 12,
      years: [1000, 1125],
      text: [
        "河改了道。原来的河床成了沙地，新的河道冲了三顷田。",
        "官府不管。",
        "村里说：「淤出来的地，谁开是谁的。」"
      ],
      options: [
        { text: "去开淤地", hint: "田 +6；身体 −8", effects: [{ k: "field_wet", v: 6 }, { k: "body", v: -8 }], then: "你在淤地上开了六亩。土是肥的，第一年收成很好。" },
        { text: "不去，怕日后争", hint: "无得无失", effects: [], then: "你没去。两年后，那六亩成了村里最肥的地，为它打了三场架。" },
        { text: "去开，同时报官立契", hint: "银钱 −2；田 +5", effects: [{ k: "silver", v: -2 }, { k: "field_wet", v: 5 }], then: "你花了二百文，让县里立了契。契上写着四至，还画了图。" }
      ]
    }
  ]);

  /* ══════════ 西夏 ══════════ */
  B.eraEvents.xxia = (B.eraEvents.xxia || []).concat([

    {
      id: "xx8.qu", cat: "官府", title: "渠工", age: [18, 60], weight: 15, sex: "male",
      years: [1038, 1227],
      text: [
        "西夏靠渠。{{昊王渠|西夏所开灌溉渠，传说始于李元昊}}一年一修，一渠管几千顷。",
        "修渠的夫，按亩出。你家二十亩，出两个夫，做二十天。",
        "渠头说：「渠不通，谁也别想浇。」"
      ],
      options: [
        { text: "出夫去修", hint: "身体 −8；田 +3", effects: [{ k: "body", v: -8 }, { k: "field_wet", v: 3 }], then: "你在渠里挖了二十天泥。渠通水那天，水头一直冲到最下游。" },
        { text: "出钱雇人", need: { minSilver: 2 }, hint: "银钱 −2", effects: [{ k: "silver", v: -2 }], then: "你雇了邻村一个闲汉。他去了二十天，回来时晒黑了一层。" },
        { text: "不去", hint: "田 −4；声望 −6", effects: [{ k: "field_wet", v: -4 }, { k: "fame", v: -6 }], then: "你没去。那年浇水，你家排在最后，只浇了半边。" }
      ]
    },
    {
      id: "xx8.fanwen", cat: "学问", title: "蕃汉合璧", age: [12, 35], weight: 12, when: { minKnowledge: 25 },
      years: [1100, 1227],
      text: [
        "衙门里的文书，蕃文汉文各一份。两份对不上，就以蕃文为准。",
        "你替人写状子，写汉文一份，再照着翻成蕃文。",
        "差役说：「翻错一个字，退回来重写。」"
      ],
      options: [
        { text: "仔细翻", hint: "学识 +4；银钱 +3", effects: [{ k: "knowledge", v: 4 }, { k: "silver", v: 3 }], then: "你翻得很慢，一份要写两天。没人退过你的状子。" },
        { text: "只写汉文，让衙门自己翻", hint: "银钱 +2；或有退", effects: [{ k: "silver", v: 2 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "衙门退回，说「不合式」。告状的人白花了钱。" }, then: "你只写汉文。交上去，有的收了，有的退了。" },
        { text: "去考蕃文译史", hint: "学识 +5；官位 +6", effects: [{ k: "knowledge", v: 5 }, { k: "official", v: 6 }], then: "你考上了译史。每月俸钱三贯，坐在衙门的西厢。" }
      ]
    },
    {
      id: "xx8.xing", cat: "官府", title: "断罪", age: [18, 60], weight: 12,
      years: [1050, 1227],
      text: [
        "西夏的律，偷一匹马，死。",
        "邻家的少年偷了半袋粮，被抓了。",
        "他父亲来求你去说情。"
      ],
      options: [
        { text: "去说情", hint: "声望 +5；或有牵连", effects: [{ k: "fame", v: 5 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "silver", v: -4 }, { k: "body", v: -4 }], loseNote: "断事官说你「干预公事」，打了十板。" }, then: "你去了。断事官听完，说：「半袋粮，不是马。」判了三十杖。" },
        { text: "不去", hint: "无得无失", effects: [], then: "你没去。那少年被打了三十杖，抬回来的时候还能说话。" },
        { text: "替他赔粮", hint: "粮 −2；声望 +6", effects: [{ k: "grain", v: -2 }, { k: "fame", v: 6 }], then: "你赔了半袋粮。断事官说：「赔了，还是要打。」打了十杖。" }
      ]
    },
    {
      id: "xx8.liangshi", cat: "营生", title: "炒粮", age: [18, 60], weight: 12,
      years: [1050, 1227],
      text: [
        "军前进兵，要{{炒面|炒熟的米麦磨粉，行军干粮}}。",
        "军中收炒面，一斗给一百二十文，比市价高四成。",
        "要得急，七天交三百斗。"
      ],
      options: [
        { text: "接这活", hint: "银钱 +6；身体 −10", effects: [{ k: "silver", v: 6 }, { k: "body", v: -10 }], then: "你家三口人炒了七天。锅烧穿了一口，眼睛熏得睁不开。" },
        { text: "接一半", hint: "银钱 +3；身体 −5", effects: [{ k: "silver", v: 3 }, { k: "body", v: -5 }], then: "你交了一百五十斗。军中的人说：「剩下的，别人交。」" },
        { text: "不接", hint: "无得无失", effects: [], then: "你没接。村东的几户接了，一冬没闲着。" }
      ]
    },
    {
      id: "xx8.touxiang", cat: "世变", title: "投降", age: [16, 60], weight: 13,
      years: [1205, 1227],
      text: [
        "蒙古兵到了城外。守将说：「降者不杀。」",
        "城里的官，一半跑了，一半在等。",
        "你站在城门口，看见门洞里有人在卸门闩。"
      ],
      options: [
        { text: "跟着出城投降", hint: "声望 −8；保命", effects: [{ k: "fame", v: -8 }], then: "你跟着人群出了城。蒙古兵把人分成三队：匠人、丁壮、其余。你在第三队。" },
        { text: "回城，守住自家", hint: "身体 −12；或有死", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.24, cause: "城破" }, then: "你回了城，把门堵死。城破那天，你听见街上有马蹄声，一直响到天黑。" },
        { text: "带着家人往西跑", hint: "身体 −14；或有死", effects: [{ k: "body", v: -14 }], gamble: { deathChance: 0.2, cause: "兵祸" }, then: "你往西跑。跑了三天，跑进沙漠。沙漠里没有兵，也没有水。" }
      ]
    },
    {
      id: "xx8.huoshi", cat: "市井", title: "火耗", age: [18, 60], weight: 11,
      years: [1100, 1227],
      text: [
        "夏人用银，也用钱。银要验成色。",
        "官府的库吏说：「碎银入库，要折耗。一两作九钱。」",
        "你有五两碎银。"
      ],
      options: [
        { text: "认了折耗", hint: "银钱 −0.5", effects: [{ k: "silver", v: -0.5 }], then: "五两作四两五钱。库吏在簿上写了，盖了印。" },
        { text: "去银铺铸成锭", hint: "银钱 −0.2；或有假", effects: [{ k: "silver", v: -0.2 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "silver", v: -1 }], loseNote: "银铺在锭里掺了铅。库吏验出来了，整锭退回。" }, then: "银铺收了二百文，铸成一锭。锭上有戳记。" },
        { text: "用银去买粮，不缴库", hint: "粮 +6", effects: [{ k: "grain", v: 6 }], then: "你没缴库，直接去买了粮。粮商收碎银，只肯按八折。" }
      ]
    }
  ]);

})(window.PACK_BASE);
