/* 生在何朝 · 共同底本（三续）
 * 与 00-base.js、01-common-b.js 同一套跨朝通用事件，另立一卷为好改。
 * 这一卷补的是前两卷没写到的日常：乡里的纠纷、身体的小灾、宗族的事。
 * id 一律以 c3. 打头。
 * 文字规矩不变：浅近白话打底，关键处用当时词汇并加小注；记事体，不抒情。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 童幼 ══════════ */
    {
      id: "c3.child.dog", cat: "身体", title: "恶犬", age: [2, 9], weight: 16,
      text: [
        "邻家的狗挣了绳，扑上来咬住你的小腿。",
        "主人赶来按住狗，说这狗前年咬过一个货郎，那人后来死于{{风毒|伤口受风发毒，古时十死七八}}。"
      ],
      options: [
        { text: "去镇上寻医", need: { minSilver: 1 }, hint: "银钱 −0.8；身体 −3", effects: [{ k: "silver", v: -0.8 }, { k: "body", v: -3 }], then: "医者割开伤口，挤出淤血，敷上药膏。疤留了一辈子。" },
        { text: "抓一把灶灰按上", hint: "身体 −7；或落下病根", effects: [{ k: "body", v: -7 }], gamble: { deathChance: 0.1, cause: "风毒" }, then: "血止住了。半个月后伤口发黑，你烧了三天三夜。" },
        { text: "让家里去找狗主理论", hint: "声望 +2；银钱 +1", effects: [{ k: "silver", v: 1 }, { k: "fame", v: 2 }], then: "狗主赔了一斗米，当日把狗吊死在村口的树上。" }
      ]
    },
    {
      id: "c3.child.find", cat: "乡里", title: "河滩上", age: [5, 12], weight: 14,
      text: [
        "你在河滩上捡到一只布包，里头是三十来文钱，还有一张写了字的纸。",
        "纸上的字你不认得。"
      ],
      options: [
        { text: "交给里正", hint: "声望 +4", effects: [{ k: "fame", v: 4 }], then: "里正把布包挂在村口树上，挂了半年，没人来认。" },
        { text: "拿回家，藏在枕下", hint: "银钱 +3；日后或有麻烦", effects: [{ k: "silver", v: 3 }, { k: "fame", v: -2 }], schedule: [{ inYears: 2, effects: [{ k: "fame", v: -6 }], note: "有人寻到村里，说丢的是他母亲的药钱。" }], then: "你把铜钱藏进枕下，夜里翻来覆去，听见自己的心跳。" },
        { text: "照着纸上写的念出来", need: { minKnowledge: 15 }, hint: "学识 +3；声望 +2", effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: 2 }], then: "是一张药方。里正听见了，说这家的孩子还病着，钱怕是抓药去的。" }
      ]
    },
    {
      id: "c3.child.cane", cat: "学问", title: "戒尺", age: [6, 13], weight: 18, when: { minKnowledge: 5 },
      text: [
        "塾师姓周，背书背错一句，打十下。",
        "今天轮到你了。他手里那根{{戒尺|塾中责打学生的木尺，宽一寸，长一尺}}举着，没落下来。"
      ],
      options: [
        { text: "伸出手去", hint: "身体 −3；学识 +2", effects: [{ k: "body", v: -3 }, { k: "knowledge", v: 2 }], then: "十下打完，手心肿成一片。周先生说了句「还算老实」，叫你回去接着背。" },
        { text: "哭着不肯伸", hint: "身体 −1；学识 −2；声望 −2", effects: [{ k: "body", v: -1 }, { k: "knowledge", v: -2 }, { k: "fame", v: -2 }], then: "他抓过你的手打了二十下。同窗都看着，没有人说话。" },
        { text: "夜里把那本书塞进灶膛", hint: "学识 −6；免了这一顿", effects: [{ k: "knowledge", v: -6 }, { k: "fame", v: -1 }], then: "书烧了。第二天先生说，缺书的人家，就不必来了。" }
      ]
    },
    {
      id: "c3.child.step", cat: "家族", title: "继母", age: [4, 12], weight: 15, once: true, when: { flagNot: ["stepmother"] },
      text: [
        "母亲没了。第二年，父亲从邻县娶回来一个。",
        "她带来一个比你小两岁的男孩。进门那天，她给你做了一双新鞋，鞋底纳得很密。"
      ],
      options: [
        { text: "叫她娘", hint: "声望 +3；她带来的弟弟日后与你亲", effects: [{ k: "fame", v: 3 }, { k: "favor", v: 6 }], setFlag: ["stepmother"], then: "她应了一声，眼睛红了。那双鞋你穿了两年，穿到露脚趾还舍不得扔。" },
        { text: "一声不吭", hint: "声望 −2；家中不宁", effects: [{ k: "fame", v: -2 }, { k: "favor", v: -4 }], setFlag: ["stepmother"], then: "父亲抬手要打，被她拦住了。此后三年，你没跟她说过一句整话。" },
        { text: "跑去外婆家住", hint: "身体 −2；学识 −3；躲开了", effects: [{ k: "body", v: -2 }, { k: "knowledge", v: -3 }], setFlag: ["stepmother"], then: "外婆家也不宽裕。你在那里住了两年，回来时弟弟已经会叫哥哥了。" }
      ]
    },
    {
      id: "c3.child.pawn", cat: "世变", title: "抵债", age: [7, 14], weight: 10, when: { debtExists: true },
      text: [
        "父亲欠了冯家的钱，还不上。",
        "冯家来了两个人，在门槛上坐着，说把你领去做五年工，账就清一半。"
      ],
      options: [
        { text: "跟着去", hint: "身体 −8；债务减半", effects: [{ k: "body", v: -8 }, { k: "debt", v: { amt: -60, rate: 0.02, dueYears: 3 } }], setFlag: ["bond"], then: "冯家的活是磨面、挑水、看场。五年里你长高了一头，也学会了不抬头看人。" },
        { text: "夜里翻墙跑了", hint: "离家；声望 −8", effects: [{ k: "fame", v: -8 }, { k: "body", v: -5 }], setFlag: ["runaway"], then: "你跑到邻县，在一个砖窑上做了半年小工。家里后来赔了钱，才把事了了。" },
        { text: "去求族中长者", hint: "声望 −2；债务缓一年", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 4 }], then: "三叔公拄着杖去冯家说了半天。冯家答应缓一年，利息照算。" }
      ]
    },

    /* ══════════ 少年 ══════════ */
    {
      id: "c3.teen.guild", cat: "营生", title: "入行", age: [13, 20], weight: 15, when: { maxSilver: 24 },
      text: [
        "城里有行会。入行要交一份{{行银|入行会缴的银子，各行数目不等，木作约三五两}}，还要行内有人作保。",
        "没有行籍的人，只能在城外接零活，价钱由人压。"
      ],
      options: [
        { text: "凑钱入行", need: { minSilver: 4 }, hint: "银钱 −4；日后工价稳", effects: [{ k: "silver", v: -4 }, { k: "official", v: 3 }], setFlag: ["guild"], then: "行首收了银子，在簿上添了你的名字。此后接活，价钱按行规来，不与人争。" },
        { text: "不入行，在城外接零活", hint: "银钱 +2；工价被人压", effects: [{ k: "silver", v: 2 }, { k: "body", v: -3 }], then: "你什么活都接。旺季能挣几个钱，淡季就守在城门口等人叫。" },
        { text: "托人作保，先欠着行银", hint: "欠债；入行", effects: [{ k: "debt", v: { amt: 4, rate: 0.03, dueYears: 2 } }, { k: "official", v: 2 }], setFlag: ["guild"], then: "保人是隔壁的漆匠。他说，你要是赖账，他就得替你出。这句话你记了很多年。" }
      ]
    },
    {
      id: "c3.teen.exchange", cat: "家族", title: "换亲", age: [13, 19], weight: 12, sex: "female",
      text: [
        "两姓换了庚帖：你家的女儿嫁过去，他家的女儿嫁过来，两家都不出聘财。",
        "媒人说，这是最省事的一桩。"
      ],
      options: [
        { text: "应下", hint: "银钱 +2；终身定下", effects: [{ k: "silver", v: 2 }, { k: "fame", v: 3 }], setFlag: ["married"], then: "过门那天没有鼓乐。你娘把仅剩的一支银簪插在你头上，说往后好好过。" },
        { text: "说什么也不肯", hint: "声望 −6；家中生怨", effects: [{ k: "fame", v: -6 }, { k: "favor", v: -8 }], then: "你绝食两天。父亲最后退了庚帖，赔了对方一匹布，两家自此不来往。" },
        { text: "只肯嫁，不肯让弟弟娶他家的女儿", hint: "声望 −3；事成一半", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 3 }], setFlag: ["married"], then: "对方骂了一通，终究还是应了。你弟弟后来娶了别人家的女儿，聘财是借的。" }
      ]
    },
    {
      id: "c3.teen.river", cat: "乡里", title: "渠里", age: [9, 16], weight: 13,
      text: [
        "几个同村的孩子在渠里凫水。你不会水，站在岸上。",
        "阿沅一脚踩空，沉下去了。水面冒了两串泡，就没有动静了。"
      ],
      options: [
        { text: "跳下去", hint: "身体 −10；或救得上来", effects: [{ k: "body", v: -10 }], gamble: { winChance: 0.45, win: [{ k: "fame", v: 18 }], lose: [{ k: "body", v: -12 }], winNote: "你抓到了他的头发，两个人一起被岸上的人拉上来。", loseNote: "你灌了一肚子水，被人捞上来。阿沅没有。" }, then: "渠水比看上去深，底下是淤泥。" },
        { text: "跑去喊大人", hint: "声望 −2；救得慢", effects: [{ k: "fame", v: -2 }], then: "你跑了一里地。大人赶到时，阿沅已经浮上来了。" },
        { text: "愣在原地", hint: "声望 −8；此事记一辈子", effects: [{ k: "fame", v: -8 }, { k: "body", v: -3 }], then: "你没动。后来村里人说，你那天站在岸上，脸白得像纸。" }
      ]
    },
    {
      id: "c3.teen.temple", cat: "方外", title: "剃度", age: [10, 18], weight: 9,
      text: [
        "寺里收童子，管饭，剃了头就不还俗。",
        "知客僧说，今年只收三个，来问的有十几家。"
      ],
      options: [
        { text: "去", hint: "离家；温饱有着落", effects: [{ k: "body", v: 4 }, { k: "knowledge", v: 5 }, { k: "luck", v: 2 }], setFlag: ["monk"], then: "剃头那天下着小雨。师父给你取了个法名，你原来的名字，从此没人再叫。" },
        { text: "不去，留在家里种地", hint: "身体 −4；家中多一张嘴", effects: [{ k: "body", v: -4 }], then: "父亲没说什么。那年秋收不好，饭桌上多一个人，粥就稀一分。" },
        { text: "去，只做行者不剃度", hint: "温饱有着落；随时可还俗", effects: [{ k: "body", v: 2 }, { k: "knowledge", v: 3 }], setFlag: ["novice"], then: "你带发在寺里挑水劈柴。师父说，头发留着也好，人心不定的时候，总要有个退路。" }
      ]
    },
    {
      id: "c3.teen.father_debt", cat: "家族", title: "父债", age: [13, 22], weight: 14, once: true, when: { debtExists: true },
      text: [
        "父亲死的时候，簿上还欠着二十七两。",
        "债主来了，把算盘放在桌上，说父债子还，天经地义。"
      ],
      options: [
        { text: "认下这笔账", hint: "债务接手；声望 +6", effects: [{ k: "fame", v: 6 }], setFlag: ["debt_inherit"], then: "你在簿上按了手印。债主收好簿子，说了句「还算有种」，走了。" },
        { text: "不认，说人死了账就了了", hint: "声望 −12；家中不宁", effects: [{ k: "fame", v: -12 }, { k: "favor", v: -6 }], then: "债主去县里告了。官说你父亲借的，你既分了家产，就该还。" },
        { text: "折半还，一次付清", need: { minSilver: 12 }, hint: "银钱 −13；了断", effects: [{ k: "silver", v: -13 }, { k: "fame", v: 4 }], then: "你把田卖了一块，凑了十三两。债主点过银子，把簿子撕了。" }
      ]
    },

    /* ══════════ 成年 ══════════ */
    {
      id: "c3.adult.well", cat: "乡里", title: "掘井", age: [20, 55], weight: 13,
      text: [
        "村里那口井枯了。十几户凑钱另掘一口，按户摊。",
        "管事的说，出不上钱的，往后就不许来打水。"
      ],
      options: [
        { text: "出钱，也出工", need: { minSilver: 2 }, hint: "银钱 −2；身体 −4；声望 +8", effects: [{ k: "silver", v: -2 }, { k: "body", v: -4 }, { k: "fame", v: 8 }], then: "掘了十七天，见水那天，全村人都围在井口。你身上全是泥，坐在边上笑。" },
        { text: "只出钱，不出工", need: { minSilver: 3 }, hint: "银钱 −3；声望 +3", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 3 }], then: "钱交给了管事。此后打水，有人会多看您一眼。" },
        { text: "出不起，往后去邻村挑", hint: "身体 −6；声望 −4", effects: [{ k: "body", v: -6 }, { k: "fame", v: -4 }], then: "每天多走二里地。冬天路滑，摔过两次，水桶摔碎了。" }
      ]
    },
    {
      id: "c3.adult.feud", cat: "宗族", title: "械斗", age: [18, 50], weight: 12, sex: "male",
      text: [
        "两村为一条水渠争了三十年。今年开春，上游把水口堵了。",
        "族老在祠堂里说，明日去人，带上家伙。"
      ],
      options: [
        { text: "扛着锄头去", hint: "身体 −9；族中看得起", effects: [{ k: "body", v: -9 }, { k: "fame", v: 8 }, { k: "favor", v: 6 }], gamble: { deathChance: 0.14, cause: "械斗" }, then: "几十个人在渠边对峙了半个时辰，然后就不讲道理了。" },
        { text: "躲在家里", hint: "声望 −10；身体无损", effects: [{ k: "fame", v: -10 }, { k: "favor", v: -8 }], then: "打完那天，回来的路上没人跟你说话。此后再分水，你家排在最末。" },
        { text: "去两头劝", hint: "声望 +5；或两边不讨好", effects: [{ k: "fame", v: 5 }, { k: "body", v: -4 }], then: "你站在渠埂上喊了半日。有人推了你一把，你摔进泥里，两边都笑了，气倒消了些。" }
      ]
    },
    {
      id: "c3.adult.locust", cat: "世变", title: "蝗", age: [18, 60], weight: 14,
      text: [
        "蝗从北边来，日头都被遮住了。",
        "落下来的时候，田里的声音像下雨。半天工夫，麦子只剩秆。"
      ],
      options: [
        { text: "烧火、敲盆，整夜赶", hint: "身体 −6；或保住三成", effects: [{ k: "body", v: -6 }, { k: "grain", v: -3 }], gamble: { winChance: 0.45, win: [{ k: "grain", v: 4 }], lose: [{ k: "grain", v: -6 }] }, then: "你在田里烧了四堆火。蝗见火光就扑，烧焦的味道一里外都闻得见。" },
        { text: "挖沟，把蝗埋了", hint: "身体 −8；保住一半", effects: [{ k: "body", v: -8 }, { k: "grain", v: -4 }], then: "沟挖了三尺深，一筐一筐地埋。埋不完，但埋住的那几亩，还有穗。" },
        { text: "去庙里请神", hint: "银钱 −1；颗粒无收", effects: [{ k: "silver", v: -1 }, { k: "grain", v: -9 }], then: "庙里做了三天法事。蝗虫落在香案上，和尚一边念经一边拍。" }
      ]
    },
    {
      id: "c3.adult.bond", cat: "生计", title: "典身", age: [18, 45], weight: 11, when: { maxSilver: 3 },
      text: [
        "李家要人使唤。典身三年，给十二两，写契，中人作保。",
        "三年之内，身不由己；三年之后，人还是你的。"
      ],
      options: [
        { text: "典", hint: "银钱 +12；三年不自由", effects: [{ k: "silver", v: 12 }, { k: "body", v: -9 }, { k: "fame", v: -6 }], setFlag: ["bond"], then: "契上按了手印，中人念了一遍条款。你听懂了七成，剩下的没敢问。" },
        { text: "去借印子钱", hint: "银钱 +10；利重", effects: [{ k: "silver", v: 10 }, { k: "debt", v: { amt: 10, rate: 0.05, dueYears: 2 } }], then: "放债的是镇上的王二，月利五分。他说，不还也行，利滚利。" },
        { text: "卖一块地", hint: "田 −3；银钱 +9", effects: [{ k: "field_wet", v: -2 }, { k: "field_dry", v: -1 }, { k: "silver", v: 9 }], then: "地卖给了隔壁的富户。他还是那句话：价钱是行价，你不卖有人卖。" }
      ]
    },
    {
      id: "c3.adult.proxy", cat: "科举", title: "代考", age: [20, 40], weight: 9, when: { minKnowledge: 40 },
      text: [
        "有人出二十两，请你替他家儿子下场。",
        "他说，县试而已，不算什么大事，查出来也就是打一顿。"
      ],
      options: [
        { text: "应下", hint: "银钱 +20；若被查出，功名尽毁", effects: [{ k: "silver", v: 20 }, { k: "fame", v: -4 }], gamble: { winChance: 0.72, win: [], lose: [{ k: "fame", v: -30 }, { k: "body", v: -10 }], loseNote: "对册的时候，廪生认出了笔迹。你被枷在县前示众三日。" }, then: "你在号舍里坐了三天，写的是别人的名字。" },
        { text: "回绝", hint: "无得失；守住本分", effects: [{ k: "fame", v: 2 }], then: "你说你不做这个。他笑了笑，转头去找别人。" },
        { text: "应下，但要三十两", hint: "银钱 +30；风险同上", effects: [{ k: "silver", v: 30 }, { k: "fame", v: -6 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "fame", v: -32 }, { k: "body", v: -12 }], loseNote: "事情败露。你被打了一顿，主家却只罚了银子。" }, then: "他愣了一下，还是应了。你心里想，原来这种事也能讲价。" }
      ]
    },
    {
      id: "c3.adult.orphan", cat: "宗族", title: "孤儿", age: [25, 55], weight: 11, when: { minSilver: 6 },
      text: [
        "族里有个孩子，父母都死于去年的疫。",
        "他住在祠堂的偏屋里，靠各家轮着给饭。今年轮到你这一房，族老说，不如你领了去。"
      ],
      options: [
        { text: "领回家", hint: "银钱 −6；家中多一口人", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 12 }, { k: "favor", v: 8 }], setFlag: ["adopted"], then: "他来的第一晚不敢吃饭。你女人给他盛了一碗，他捧着碗，手抖得厉害。" },
        { text: "给口饭，不领", hint: "声望 +3；银钱 −1", effects: [{ k: "silver", v: -1 }, { k: "fame", v: 3 }], then: "你每日给他一碗粥。他吃完就回偏屋，从不说话。过了两年，他走了，不知去了哪里。" },
        { text: "推给别房", hint: "声望 −6", effects: [{ k: "fame", v: -6 }, { k: "favor", v: -5 }], then: "族老看了你一眼，没说话。那孩子后来跟了一个货郎，再没回来过。" }
      ]
    },
    {
      id: "c3.adult.slander", cat: "官府", title: "被诬", age: [18, 55], weight: 12,
      text: [
        "邻家丢了一只鸡，说看见你从墙下过去。",
        "他站在你家门口骂了半个时辰，围了二十来个人。"
      ],
      options: [
        { text: "赔他一只鸡，了事", need: { minSilver: 0.5 }, hint: "银钱 −0.5；声望 −3", effects: [{ k: "silver", v: -0.5 }, { k: "fame", v: -3 }], then: "你把鸡给了她。围观的人散了，但此后村里丢了东西，还有人会想起你。" },
        { text: "赌咒，说你没做", hint: "声望 +2；或结下怨", effects: [{ k: "fame", v: 2 }, { k: "grudge", v: 6 }], then: "你当着众人发了誓。她不敢再骂，走的时候啐了一口。" },
        { text: "去县里告她诬告", hint: "银钱 −2；官司缠身", effects: [{ k: "silver", v: -2 }, { k: "fame", v: 5 }, { k: "grudge", v: 10 }], then: "县官问了几句，判她赔你二百文。她赔了钱，两家的仇就此结下。" }
      ]
    },
    {
      id: "c3.adult.middleman", cat: "市井", title: "中人", age: [25, 60], weight: 10, when: { minFame: 8 },
      text: [
        "两家买田，价钱讲不拢，请你去做中人。",
        "中人要在契上签字画押，日后有争执，先找你。"
      ],
      options: [
        { text: "做，抽一成", hint: "银钱 +4；担着干系", effects: [{ k: "silver", v: 4 }, { k: "favor", v: 4 }], then: "契立了，你抽了一成。三年后两家为地界打架，第一个找的还是你。" },
        { text: "做，分文不取", hint: "声望 +6", effects: [{ k: "fame", v: 6 }, { k: "favor", v: 6 }], then: "你说这桩事不大，钱就免了。两家都记着这个人情，逢年过节送点东西来。" },
        { text: "不做，这桩事麻烦", hint: "无得失", effects: [], then: "你推了。后来果然打了官司，中人也吃了挂落。你听说时，庆幸了一阵。" }
      ]
    },

    /* ══════════ 老年 ══════════ */
    {
      id: "c3.old.eye", cat: "身体", title: "目翳", age: [52, 80], weight: 13, once: true,
      text: [
        "眼睛里长了一层白，看东西像隔着一层雾。",
        "起初是夜里看不清，后来白天也认不出人。"
      ],
      options: [
        { text: "请医者针拨", need: { minSilver: 4 }, hint: "银钱 −4；或能复明", effects: [{ k: "silver", v: -4 }], gamble: { winChance: 0.6, win: [{ k: "body", v: 2 }], lose: [{ k: "body", v: -6 }], winNote: "针拨下去，一层白膜被挑开。第二天你看见了窗棂上的光。", loseNote: "针下去，眼里出血。此后连光都看不见了。" }, then: "医者说，这法子十个人里成六个，剩下的就瞎了。" },
        { text: "忍着", hint: "身体 −5；往后看不见", effects: [{ k: "body", v: -5 }], then: "你慢慢学会了摸墙走路。孙子的脸，你只记得他三四岁时的样子。" },
        { text: "找巫祝来治", hint: "银钱 −1；身体 −8", effects: [{ k: "silver", v: -1 }, { k: "body", v: -8 }], then: "巫祝烧了符，把灰吹进你眼里。你疼了一夜，第二天更看不清了。" }
      ]
    },
    {
      id: "c3.old.grave", cat: "宗族", title: "祖坟", age: [45, 80], weight: 10,
      text: [
        "县里修渠，要过你家祖坟。",
        "差役说，迁坟的银子官上出，一户二两；不迁的，就按阻工办。"
      ],
      options: [
        { text: "迁", hint: "银钱 +2；族中有人骂", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -6 }, { k: "favor", v: -4 }], then: "起坟那天下了小雨。你把祖父的骨殖一块块拾进新罐，数了两遍。" },
        { text: "不迁，去县里告", hint: "银钱 −3；或保住坟", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 8 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "body", v: -6 }, { k: "silver", v: -2 }], loseNote: "官判你阻工，罚了银子，渠还是从坟上过去了。" }, then: "你写了一张状子，托人递进县衙。族里凑了三两银子给你打点。" },
        { text: "迁，但要求改道半丈", hint: "声望 +4；费些周折", effects: [{ k: "fame", v: 4 }, { k: "favor", v: 3 }], then: "你找了管工的吏，说了半天，又送了一坛酒。渠改了半丈，坟留下了一半。" }
      ]
    }

  );
})(window.PACK_BASE);
