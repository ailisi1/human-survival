/* 生在何朝 · 共同底本
 * 一、五个时段的阶层、家世、物价
 * 二、跨朝通用的家事、身体、灾荒事件（不涉一朝制度，故十九朝皆可用）
 * 三、各朝专有事件在 10–40 号文件里追加
 */
window.PACK_BASE = { periods: {}, common: [] };
(function (P) {
  "use strict";

  /* ══════════ 阶层 ══════════ */
  function C(id, name, w, init, note) {
    return { id: id, name: name, weight: w, init: init, note: note };
  }
  const I = function (b, s, fw, fd, g, k, f) {
    return { body: b, silver: s, field_wet: fw, field_dry: fd, grain: g, knowledge: k, fame: f };
  };

  P.periods.qinhan = {
    money: { label: "钱", note: "秦汉用半两、五铢钱。此处折为银两计，便于前后相较。" },
    prices: { unit: "两", rice_per_shi: 0.7, rice_per_shi_crisis: 5, field_wet_per_mu: 12, field_dry_per_mu: 2.5, tuition_year: 2, labor_year: 3, labor_day: 0.025, silver_to_cash: 700, cash_to_rmb: 0.9, jinshi_bribe: 120, coffin: 2, doctor_visit: 0.3, might_div: 2000 },
    classes: [
      C("royal", "封君", 1, I(78, 900, 60, 40, 250, 25, 45), "宗室、列侯，食邑收租。有爵而无治民之权，一得罪则国除"),
      C("noble", "军功爵", 1, I(76, 420, 80, 50, 180, 15, 40), "斩首授爵，爵高者得田宅、臣妾。爵至五大夫，可役使庶人"),
      C("official_mid", "吏家", 1, I(75, 130, 30, 20, 60, 45, 30), "父兄为郡县掾史，通律令、能书计。刀笔吏之子，仍为刀笔吏"),
      C("gentry", "经生", 1, I(74, 100, 40, 20, 70, 50, 35), "受经于师，通一经可为博士弟子，或为郡国文学"),
      C("merchant", "商贾", 1, I(74, 520, 10, 5, 40, 20, 12), "列于市籍，不得为吏，不得衣丝乘车。然钱能通神"),
      C("farmer", "编户农", 1, I(75, 6, 10, 15, 14, 0, 8), "名在版籍，田租、口赋、更卒，岁岁输之"),
      C("tenant", "佃作", 1, I(72, 2, 0, 0, 4, 0, 4), "佃豪家之田，耕其半而输其半。遇荒年，先饿的是佃户"),
      C("base", "赘婿罪徒", 1, I(68, 1, 0, 0, 2, 0, 0), "赘婿、罪人之后、官奴婢，不得为吏，不得立户，子孙相袭")
    ],
    classText: {
      royal: "宗室或列侯之家，食邑收租，生而富贵，然一犯法即国除为庶人",
      noble: "军功之家，父兄以首级换来的爵位，田宅臣妾皆在其中",
      official_mid: "吏家，父兄在郡县为掾史，通律令，能书计",
      gentry: "经生之家，有书数箧，指望子弟通经入仕",
      merchant: "商贾之家，列于市籍，有钱而无地位",
      farmer: "编户农家，田不过数十亩，赋役皆由此出",
      tenant: "佃作之家，租人之田，秋后分租",
      base: "赘婿罪徒之家，不得为吏，不得立户"
    },
    estate: {
      royal: { rank: ["彻侯", "关内侯", "大庶长", "驷车庶长"], post: ["宗正属吏", "奉常属吏", "无职（就国）"], rel: ["宗室有旧", "与郡守通家"], house: ["列侯甲第", "五进大宅"], servants: [15, 50], books: [50, 300], troops: [20, 80] },
      noble: { rank: ["五大夫", "左庶长", "右庶长", "公乘", "不更"], post: ["亭长", "县尉", "候骑长"], rel: ["军中有旧部", "父执为校尉"], house: ["砖瓦院落"], servants: [3, 12], books: [0, 20], troops: [6, 30] },
      official_mid: { rank: [], post: ["县丞", "狱掾", "令史", "厩驺", "仓曹"], rel: ["座主为郡守", "舅家在廷尉"], house: ["三进院落"], servants: [1, 5], books: [20, 120], troops: [0, 6] },
      gentry: { rank: [], post: ["博士弟子", "郡文学", "私塾师", "无职（治经）"], rel: ["师门有旧", "与县令相识"], house: ["瓦房五间"], servants: [0, 3], books: [50, 300], troops: [0, 4] },
      merchant: { rank: [], post: ["盐贾", "铁冶贾", "贩马", "酒肆"], rel: ["与关中列侯有旧", "姻亲在少府"], house: ["砖瓦大院"], servants: [2, 10], books: [0, 30], troops: [2, 12] },
      farmer: { rank: [], post: ["本户", "里正", "田啬夫"], rel: ["族中无显者", "邻里有亭长"], house: ["土坯草房五间"], servants: [0, 0], books: [0, 2], troops: [0, 0] },
      tenant: { rank: [], post: ["佃户", "庸工"], rel: ["主家姓李"], house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0] },
      base: { rank: [], post: ["官奴婢", "赘婿", "城旦之后"], rel: ["主家姓赵"], house: ["窝棚一间"], servants: [0, 0], books: [0, 0], troops: [0, 0] }
    },
    events: []
  };

  P.periods.weijin = {
    money: { label: "钱", note: "魏晋南北朝钱帛杂用，此处折为银两计。" },
    prices: { unit: "两", rice_per_shi: 1.1, rice_per_shi_crisis: 8, field_wet_per_mu: 14, field_dry_per_mu: 3, tuition_year: 2.5, labor_year: 3, labor_day: 0.03, silver_to_cash: 700, cash_to_rmb: 0.9, jinshi_bribe: 150, coffin: 2.5, doctor_visit: 0.4, might_div: 2000 },
    classes: [
      C("royal", "宗室", 1, I(78, 800, 55, 35, 220, 28, 46), "司马氏或诸王之后，封国食租。然八王之后，宗室之名几成祸端"),
      C("noble", "门阀", 2, I(77, 600, 100, 50, 260, 45, 50), "王谢庾桓之流，谱牒分明，平流进取，坐至公卿。寒门虽贵，婚犹不通"),
      C("official_mid", "官户", 1, I(75, 180, 35, 20, 70, 40, 30), "父为州郡佐吏，或为军府参军。能书计，通仪注"),
      C("gentry", "士人", 1, I(74, 120, 30, 20, 65, 48, 32), "读经谈玄，待时而动。侨居江南者，多有田墅、部曲"),
      C("merchant", "商贾", 1, I(74, 480, 10, 5, 40, 22, 12), "市籍之家。南北互市、江海贩运，钱帛流转皆经其手"),
      C("farmer", "编户", 1, I(74, 8, 12, 14, 15, 0, 8), "名在黄籍，租调之外，尚有杂役。北魏行均田，授田有差"),
      C("tenant", "部曲佃客", 1, I(71, 3, 0, 0, 5, 0, 4), "豪家之部曲、佃客，附于主户，不隶州县，主人得役使之"),
      C("base", "奴婢", 1, I(67, 1, 0, 0, 2, 0, 0), "身系于主，卖买由之。生子曰家生奴，世世不得脱")
    ],
    classText: {
      royal: "宗室之家，封国食租，而宗室之祸，往往先及自身",
      noble: "门阀之家，谱牒分明，婚姻、仕宦皆不与他族同",
      official_mid: "官户之家，父兄为州郡佐吏或军府参军",
      gentry: "士人之家，读经谈玄，有田墅，亦有部曲",
      merchant: "商贾之家，南北互市，钱帛流转经其手",
      farmer: "编户之家，名在黄籍，租调杂役皆出其中",
      tenant: "部曲佃客之家，附于主户，不隶州县",
      base: "奴婢之家，身系于主，世世不得脱"
    },
    estate: {
      royal: { rank: ["亲王", "郡王", "县公", "乡侯"], post: ["王国郎中令", "无职（就国）"], rel: ["宗室有旧", "与领军将军通家"], house: ["王府别院", "五进大宅"], servants: [15, 45], books: [150, 800], troops: [15, 60] },
      noble: { rank: ["公", "侯", "伯", "子", "男"], post: ["尚书郎", "中书舍人", "州主簿"], rel: ["与王氏有旧", "姻亲在门下省"], house: ["四进宅院"], servants: [8, 30], books: [200, 900], troops: [10, 50] },
      official_mid: { rank: [], post: ["县令", "州别驾", "参军", "典签"], rel: ["府主相知", "座主为刺史"], house: ["三进院落"], servants: [2, 8], books: [60, 300], troops: [0, 10] },
      gentry: { rank: [], post: ["国子生", "秀才", "记室", "隐士"], rel: ["师门有旧", "与郡守相识"], house: ["瓦房七八间"], servants: [1, 5], books: [80, 400], troops: [0, 8] },
      merchant: { rank: [], post: ["盐商", "船户", "邸店主人"], rel: ["姻亲在关津", "与僧寺有旧"], house: ["砖瓦大院"], servants: [3, 12], books: [10, 60], troops: [2, 14] },
      farmer: { rank: [], post: ["本户", "三长", "里正"], rel: ["族中无显者"], house: ["土坯草房四间"], servants: [0, 0], books: [0, 2], troops: [0, 0] },
      tenant: { rank: [], post: ["佃客", "部曲"], rel: ["主家姓王"], house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0] },
      base: { rank: [], post: ["奴婢", "家生奴", "乐户"], rel: ["主家姓谢"], house: ["耳房一间"], servants: [0, 0], books: [0, 0], troops: [0, 0] }
    },
    events: []
  };

  P.periods.suitang = {
    money: { label: "文", note: "隋唐行五铢、开元通宝。此处折为银两计。" },
    prices: { unit: "两", rice_per_shi: 0.55, rice_per_shi_crisis: 4, field_wet_per_mu: 13, field_dry_per_mu: 2.8, tuition_year: 3, labor_year: 4, labor_day: 0.03, silver_to_cash: 700, cash_to_rmb: 0.9, jinshi_bribe: 200, coffin: 3, doctor_visit: 0.5, might_div: 2000 },
    classes: [
      C("royal", "宗室", 1, I(78, 900, 60, 40, 250, 30, 46), "李唐宗室，封王食邑。然宗室数千，多不及爵，散居州县"),
      C("noble", "勋贵", 1, I(77, 750, 80, 40, 230, 30, 48), "国公、郡公之后，以门荫入仕。关陇旧族，婚姻相结"),
      C("official_mid", "官宦", 1, I(76, 260, 40, 25, 90, 48, 36), "父为五品上下的官，家中有敕牒、告身，子弟以门荫或科举入仕"),
      C("gentry", "士族", 1, I(75, 160, 45, 25, 90, 55, 38), "崔卢李郑，或江南侨姓，以门第相高，虽科举不能尽抑"),
      C("merchant", "商贾", 1, I(74, 700, 12, 6, 50, 22, 14), "长安西市、扬州、广州，胡商汉贾，邸店林立"),
      C("farmer", "均田农户", 1, I(75, 10, 20, 15, 20, 0, 8), "受田百亩，其中二十亩为永业。租庸调之外，尚有杂徭"),
      C("tenant", "客户佃户", 1, I(71, 3, 0, 0, 5, 0, 4), "浮客、佃户，佃人之田，或依附豪家为庄客"),
      C("base", "贱民", 1, I(67, 1, 0, 0, 2, 0, 0), "部曲、奴婢、官户、杂户，身系于主或系于官，良贱不婚")
    ],
    classText: {
      royal: "宗室之家，封王食邑，然宗室数千，多不及爵",
      noble: "勋贵之家，以门荫入仕，关陇婚姻相结",
      official_mid: "官宦之家，父为五品官，家有告身，子弟以门荫或科举入仕",
      gentry: "士族之家，以门第相高，虽科举不能尽抑",
      merchant: "商贾之家，长安西市、扬州、广州，邸店林立",
      farmer: "均田农户，受田百亩，租庸调皆由此出",
      tenant: "客户佃户，佃人之田，或依附豪家为庄客",
      base: "贱民之家，部曲奴婢，良贱不婚"
    },
    estate: {
      royal: { rank: ["亲王", "郡王", "国公", "县公"], post: ["宗正卿", "王府长史", "无职（奉朝请）"], house: ["王府", "五进大宅"], rel: ["宗室有旧", "与宰相通家"], servants: [20, 60], books: [200, 1000], troops: [15, 70] },
      noble: { rank: ["国公", "郡公", "县侯", "县伯"], post: ["千牛备身", "尚舍奉御", "州刺史"], house: ["四进宅院"], rel: ["父执在兵部", "与公主家为姻"], servants: [8, 25], books: [150, 700], troops: [10, 40] },
      official_mid: { rank: [], post: ["县令", "县尉", "主簿", "监察御史"], house: ["三进院落"], rel: ["座主为侍郎", "舅家在尚书省"], servants: [2, 10], books: [100, 500], troops: [0, 10] },
      gentry: { rank: [], post: ["进士", "明经", "校书郎", "私塾师"], house: ["瓦房七八间"], rel: ["师门为宰相", "与崔氏联宗"], servants: [1, 6], books: [150, 800], troops: [0, 8] },
      merchant: { rank: [], post: ["胡商", "盐商", "船主", "邸店主人"], house: ["砖瓦大院"], rel: ["姻亲在少府", "与市署相识"], servants: [4, 15], books: [10, 80], troops: [2, 16] },
      farmer: { rank: [], post: ["本户", "里正", "村正"], house: ["土坯草房五间"], servants: [0, 0], books: [0, 2], troops: [0, 0] },
      tenant: { rank: [], post: ["佃户", "庄客", "庸工"], house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0] },
      base: { rank: [], post: ["部曲", "奴婢", "官户"], house: ["耳房一间"], servants: [0, 0], books: [0, 0], troops: [0, 0] }
    },
    events: []
  };

  P.periods.song = {
    money: { label: "贯", note: "宋以钱陌计，一贯约千文。此处折为银两计。" },
    prices: { unit: "两", rice_per_shi: 0.9, rice_per_shi_crisis: 6, field_wet_per_mu: 20, field_dry_per_mu: 4, tuition_year: 4, labor_year: 5, labor_day: 0.04, silver_to_cash: 700, cash_to_rmb: 0.9, jinshi_bribe: 300, coffin: 4, doctor_visit: 0.6, might_div: 2000 },
    classes: [
      C("royal", "宗室", 1, I(77, 1000, 60, 40, 260, 35, 46), "赵宋宗室，聚居京师，岁给廪禄。宗室不得任事，唯享富贵"),
      C("noble", "将门", 1, I(76, 600, 70, 40, 200, 30, 44), "折氏、种氏、杨氏之流，世为将帅。位高而权轻，受制于枢密"),
      C("official_mid", "官户", 1, I(76, 320, 50, 30, 110, 55, 40), "父为朝官或州县官，家有敕命，免差役。子弟以恩荫或科举入仕"),
      C("gentry", "士人", 1, I(75, 200, 50, 30, 100, 60, 40), "读书应举之家，书院、乡塾、程文，皆为此辈所聚"),
      C("merchant", "行商", 1, I(74, 900, 15, 8, 60, 25, 16), "交子、会子、市舶、榷场。东京七十二正店，昼夜不绝"),
      C("farmer", "主户", 1, I(74, 12, 15, 15, 18, 0, 8), "有五等户，上户有田，下户无田而佃。差役之轻重，视户等而定"),
      C("tenant", "客户", 1, I(71, 4, 0, 0, 6, 0, 4), "无田之民，佃人之田，或为人佣工。客户不入主户之籍"),
      C("base", "杂户役人", 1, I(68, 2, 0, 0, 3, 0, 0), "州县役人、厢军兵士、奴婢。身有籍，役有定，不得自由")
    ],
    classText: {
      royal: "宗室之家，岁给廪禄，聚居于京，然不得任事",
      noble: "将门之家，世为将帅，位高而权轻",
      official_mid: "官户之家，父为朝官或州县官，免差役",
      gentry: "士人之家，读书应举，书院乡塾皆其所聚",
      merchant: "行商之家，交子会子、市舶榷场，利通四海",
      farmer: "主户之家，有五等户，上户有田，下户佃作",
      tenant: "客户之家，无田而佃，不入主户之籍",
      base: "杂户役人之家，身有籍，役有定"
    },
    estate: {
      royal: { rank: ["亲王", "郡王", "国公", "郡公"], post: ["宗正寺丞", "无职（奉朝请）"], house: ["王府", "五进大宅"], rel: ["宗室有旧", "与宰执通家"], servants: [15, 50], books: [300, 1200], troops: [10, 50] },
      noble: { rank: ["节度使之后", "观察使之后", "世袭都指挥使"], post: ["殿前都虞候", "州都监", "路分都监"], house: ["四进宅院"], rel: ["父执在枢密院"], servants: [6, 20], books: [80, 400], troops: [12, 60] },
      official_mid: { rank: [], post: ["知县", "通判", "主簿", "教授"], house: ["三进院落"], rel: ["座主为侍从", "姻亲在转运司"], servants: [2, 10], books: [150, 700], troops: [0, 8] },
      gentry: { rank: [], post: ["举人", "太学生", "书院山长", "私塾师"], house: ["瓦房七八间"], rel: ["师门为馆阁", "与州学教授有旧"], servants: [1, 5], books: [200, 1000], troops: [0, 6] },
      merchant: { rank: [], post: ["交子铺", "海商", "榷场牙人", "邸店"], house: ["砖瓦大院"], rel: ["姻亲在市舶司"], servants: [4, 16], books: [10, 80], troops: [2, 20] },
      farmer: { rank: [], post: ["上户", "里正", "户长"], house: ["土坯瓦房五间"], servants: [0, 2], books: [0, 2], troops: [0, 0] },
      tenant: { rank: [], post: ["客户", "佣工"], house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0] },
      base: { rank: [], post: ["厢军", "州县役人", "奴婢"], house: ["营房一间"], servants: [0, 0], books: [0, 0], troops: [0, 0] }
    },
    events: []
  };

  P.periods.yuanmingqing = {
    money: { label: "两", note: "" },
    prices: { unit: "两", rice_per_shi: 0.9, rice_per_shi_crisis: 6, field_wet_per_mu: 14, field_dry_per_mu: 3, tuition_year: 3.5, labor_year: 4.5, labor_day: 0.035, silver_to_cash: 700, cash_to_rmb: 0.9, jinshi_bribe: 260, coffin: 3, doctor_visit: 0.5, might_div: 2000 },
    classes: [
      C("royal", "宗室", 1, I(78, 900, 55, 35, 240, 30, 46), "天潢贵胄，岁给宗禄。明之宗室不得出仕经商，清之宗室列于八旗"),
      C("noble", "勋贵", 1, I(77, 800, 70, 40, 220, 28, 48), "公侯伯、世职、佐领。以军功或戚畹得之，世世承袭"),
      C("official_mid", "官宦", 1, I(76, 300, 40, 25, 100, 50, 38), "父为州县官或京官，家有房舍、奴仆，子弟以科举或捐纳入仕"),
      C("gentry", "士绅", 1, I(75, 200, 40, 20, 90, 52, 40), "生员以上，或退职家居。免丁免差，包揽钱粮，乡里之权在其手"),
      C("merchant", "商贾", 1, I(74, 800, 12, 6, 50, 22, 14), "盐、茶、布、典当、票号。北有晋商，南有徽商，口岸则有行商"),
      C("farmer", "自耕农", 1, I(75, 8, 10, 14, 15, 0, 8), "有田二三十亩，赋役的直接承担者。清行摊丁入亩，丁银并入田赋"),
      C("tenant", "佃农", 1, I(72, 2, 0, 0, 4, 0, 4), "佃人之田，岁输其半。亦有永佃之田，可转顶于人"),
      C("base", "贱籍", 1, I(68, 1, 0, 0, 2, 0, 0), "军户、匠户、灶户、乐户、丐户。世代不得脱籍，不得应举")
    ],
    classText: {
      royal: "宗室之家，岁给宗禄，然不得出仕经商，也不得擅离封地",
      noble: "勋贵之家，以军功或戚畹得爵，世世承袭",
      official_mid: "官宦之家，父为州县官或京官，家有房舍奴仆",
      gentry: "士绅之家，生员以上，免丁免差，乡里之权在其手",
      merchant: "商贾之家，盐茶布当，票号行商",
      farmer: "自耕农之家，有田二三十亩，赋役皆由此出",
      tenant: "佃农之家，佃人之田，岁输其半",
      base: "贱籍之家，军匠灶乐，世代不得脱籍"
    },
    estate: {
      royal: { rank: ["亲王世子", "郡王", "镇国将军", "辅国将军", "奉国中尉"], post: ["宗人府仪宾", "无职（宗禁）"], rel: ["宗人府有旧", "王府长史是远亲"], house: ["王府别院", "五进大宅"], servants: [12, 40], books: [300, 1200], troops: [8, 30] },
      noble: { rank: ["世袭指挥使", "世袭千户", "世袭百户", "伯爵之后"], post: ["京营把总", "卫指挥佥事", "佐领"], rel: ["父执在兵部", "与国公家有旧"], house: ["四进宅院"], servants: [6, 20], books: [80, 400], troops: [12, 60] },
      official_mid: { rank: [], post: ["知县", "县丞", "教谕", "典史", "笔帖式"], house: ["三进院落"], rel: ["座主为御史", "舅家在府衙当差"], servants: [2, 8], books: [100, 500], troops: [0, 6] },
      gentry: { rank: [], post: ["生员", "举人", "退职知县", "府学训导"], house: ["三进院落"], rel: ["族中有举人", "与知县有旧"], servants: [1, 6], books: [120, 600], troops: [0, 8] },
      merchant: { rank: [], post: ["盐商", "布商", "典当掌柜", "票号伙计"], house: ["砖瓦大院"], rel: ["姻亲在钞关", "与牙行相熟"], servants: [3, 12], books: [20, 120], troops: [2, 14] },
      farmer: { rank: [], post: ["本户", "里长", "粮长"], rel: ["族中无显者", "邻村有表亲"], house: ["土坯草房五间"], servants: [0, 0], books: [0, 3], troops: [0, 0] },
      tenant: { rank: [], post: ["佃户", "长工"], rel: ["族中无显者"], house: ["草房两间"], servants: [0, 0], books: [0, 0], troops: [0, 0] },
      base: { rank: [], post: ["军户余丁", "匠户", "灶户", "乐户", "包衣"], rel: ["世代当差", "主家姓周"], house: ["营房一间"], servants: [0, 0], books: [0, 0], troops: [0, 0] }
    },
    events: []
  };

  /* ══════════ 通用事件 ══════════
   * 不涉一朝制度，只写人身与家常。十九朝皆可用，故不带 era 字段。
   */
  P.common = [
    {
      id: "c.birth.name", cat: "家族", title: "起名", age: [0, 0], weight: 100, once: true,
      text: [
        "{reign}，你生在{place}。",
        "接生的是邻村的稳婆。父亲翻了几夜书，还是没定下名字。"
      ],
      options: [
        { text: "按族谱排行", hint: "声望 +4；族中长辈记下了你这一房", effects: [{ k: "fame", v: 4 }], then: "名字写进了族谱，占了一行。" },
        { text: "取个贱名", hint: "身体 +4；乡里叫得顺口，也叫得轻贱", effects: [{ k: "body", v: 4 }, { k: "fame", v: -2 }], then: "村口的人从此都喊你这个名字。" },
        { text: "取个文气的", hint: "学识 +2；多花几文请人看过字", effects: [{ k: "knowledge", v: 2 }, { k: "silver", v: -0.05 }], then: "父亲把这两个字念了三遍，念得很慢。" }
      ]
    },
    {
      id: "c.child.pox", cat: "身体", title: "出痘", age: [1, 6], weight: 25, once: true,
      text: [
        "村里开始有人出痘{{出痘|天花。幼儿多不能免，是幼年夭折的首要死因}}。先东头一家，三天后，你身上也起了红点。",
        "母亲用艾草熏了屋子，父亲去镇上请郎中，诊金另算。"
      ],
      options: [
        { text: "请郎中，抓药", hint: "银钱 −0.5；身体 +8", effects: [{ k: "silver", v: -0.5 }, { k: "body", v: 8 }], then: "七天后热退了。你脸上留了两个麻点。" },
        { text: "不请郎中，求神", hint: "银钱 −0.05；身体 −6，赌的是命", effects: [{ k: "silver", v: -0.05 }, { k: "body", v: -6 }], then: "母亲在神像前跪了一夜。你活下来了，瘦得只剩一把骨头。", gamble: { deathChance: 0.16, cause: "痘疹" } },
        { text: "送去柴房隔开", hint: "身体 −3；家中少一张嘴", effects: [{ k: "body", v: -3 }, { k: "fame", v: 2 }], then: "十二天里，只有母亲每天来送一碗粥，隔着门。" }
      ]
    },
    {
      id: "c.child.school", cat: "家族", title: "蒙馆", age: [6, 9], weight: 34, once: true,
      class: ["farmer", "tenant", "gentry", "merchant", "official_mid"],
      text: [
        "今年收成只有往年的七成。父亲蹲在门槛上，母亲在灶间数着口袋里的谷子。",
        "村东的先生是个落第的{{童生|未考取生员的读书人}}，在自家厢房开了间{{蒙馆|私塾}}。",
        "一年{{束脩|学费}}要三斗米。"
      ],
      options: [
        { text: "送去识字", hint: "存粮 −3 石；学识 +6", effects: [{ k: "grain", v: -3 }, { k: "knowledge", v: 6 }], setFlag: ["literate"], then: "先生给你起了个学名。你第一次知道自己的名字可以写成两个字。" },
        { text: "跟着下地", hint: "身体 +4；父亲松了口气", effects: [{ k: "body", v: 4 }, { k: "fame", v: 3 }], then: "七岁那年你学会了扶犁。父亲说你比他有出息。" },
        { text: "去集上看摊", hint: "银钱 +0.5；声望 −3", effects: [{ k: "silver", v: 0.5 }, { k: "fame", v: -3 }, { k: "body", v: 2 }], then: "你学会了看斗、看秤，也学会了在斗底垫一层谷壳。" }
      ]
    },
    {
      id: "c.child.herd", cat: "家族", title: "拾柴", age: [6, 11], weight: 20, once: true,
      class: ["farmer", "tenant", "base"],
      text: [
        "天不亮就得出门。拾一捆柴，割一筐草，回来才有一碗稀粥。",
        "你的手在冬天裂开，夏天又被草叶划得满是口子。"
      ],
      options: [
        { text: "日日如此，练出一身力气", hint: "身体 +7", effects: [{ k: "body", v: 7 }], then: "十二岁时你能挑起百斤担子，走十里不歇。" },
        { text: "偷空去听先生念书", hint: "学识 +4；身体 −2", effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -2 }], then: "你蹲在窗下，把《千字文》背下了半本，字却认不全。" },
        { text: "跟猎户学下套", hint: "身体 +3；银钱 +0.3", effects: [{ k: "body", v: 3 }, { k: "silver", v: 0.3 }], then: "你套住过一只野兔，母亲煮了，一家人吃了三天。" }
      ]
    },
    {
      id: "c.child.sister", cat: "世变", title: "卖姊", age: [4, 12], weight: 8, once: true,
      class: ["farmer", "tenant", "base"],
      text: [
        "媒婆来了三趟。邻县一户人家要个使女，出价五两银子。",
        "姐姐十一岁。母亲替她梳了头，把仅有的一根银簪插上。"
      ],
      options: [
        { text: "让她去", hint: "银钱 +5；声望 −4", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -4 }], then: "她走的那天没哭。你追到村口，她回头看了你一眼。" },
        { text: "不放", hint: "存粮 −4 石；家中多一张嘴", effects: [{ k: "grain", v: -4 }, { k: "fame", v: 3 }], then: "那一年冬天很冷。姐姐后来常说，是你把她留下的。" }
      ]
    },
    {
      id: "c.child.martial", cat: "身体", title: "弄枪棒", age: [8, 14], weight: 16, once: true,
      sex: "male",
      text: [
        "村口来了个走江湖的拳师，在庙前教了半个月，收两斗米一个徒弟。",
        "你天天去看，看到第五天，拳师说：这孩子有骨头。"
      ],
      options: [
        { text: "拜师，学艺", hint: "存粮 −2 石；武艺 +12，身体 +4", effects: [{ k: "grain", v: -2 }, { k: "martial", v: 12 }, { k: "body", v: 4 }], then: "扎马步扎到腿抖，师父一脚踢在你膝弯上，说：站住。" },
        { text: "只看看", hint: "身体 +2", effects: [{ k: "body", v: 2 }], then: "拳师走的时候，你在村口看到他的背影，很久没动。" },
        { text: "跟他走", hint: "武艺 +16；离家，声望 −5", effects: [{ k: "martial", v: 16 }, { k: "fame", v: -5 }, { k: "knowledge", v: -2 }], then: "你跟着他走了三个县，睡过庙，也睡过草垛。回家时已经十四岁。" }
      ]
    },
    {
      id: "c.teen.marry_m", cat: "家族", title: "说亲", age: [15, 20], weight: 40, once: true, sex: "male",
      text: [
        "媒人上门，说的是邻村一家。女方十六，会织布，脚大，能挑水。",
        "父亲问你的意思。母亲在灶间没说话，耳朵一直听着。"
      ],
      options: [
        { text: "应下这门亲", hint: "银钱 −8（聘礼）；成家，声望 +5", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 5 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }], setFlag: ["married"], then: "成亲那天摆了三桌。她进门时低着头，你也没敢看。" },
        { text: "娶个识字的，聘礼要厚", hint: "银钱 −20；学识 +3，声望 +8", need: { minSilver: 20 }, effects: [{ k: "silver", v: -20 }, { k: "knowledge", v: 3 }, { k: "fame", v: 8 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], setFlag: ["married"], then: "她带来一箱书。晚上她念给你听，你听着听着就睡着了。" },
        { text: "再等几年", hint: "不娶。父亲叹了口气", effects: [{ k: "fame", v: -3 }], then: "那家的女儿第二年嫁去了县里。父亲此后很少提这件事。" }
      ]
    },
    {
      id: "c.teen.marry_f", cat: "家族", title: "议嫁", age: [14, 19], weight: 40, once: true, sex: "female",
      text: [
        "媒人来了两趟。一家是镇上的，一家是邻村的。",
        "母亲说：嫁得近，受了委屈还能回来。父亲说：嫁得远，才有出息。"
      ],
      options: [
        { text: "嫁邻村", hint: "成家；离家近，声望 +4", effects: [{ k: "fame", v: 4 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 19 } }], setFlag: ["married"], then: "婆家离娘家八里。你每月能回来一次，带一包糖。" },
        { text: "嫁镇上", hint: "成家；银钱 +6，日后少回娘家", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 2 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 22 } }], setFlag: ["married"], then: "镇上人多，规矩也多。你学会了在灶前站着吃饭。" },
        { text: "不嫁，留在家中", hint: "声望 −6；家中多一个劳力", effects: [{ k: "fame", v: -6 }, { k: "body", v: 3 }], then: "村里人说了几年闲话。你照旧下地，照旧挑水。" }
      ]
    },
    {
      id: "c.teen.gamble", cat: "市井", title: "赌摊", age: [16, 26], weight: 10, sex: "male",
      text: [
        "腊月里，集上支起一张破桌，三枚铜钱，猜正反。",
        "你身上有二两银子，是这一年攒下的。"
      ],
      options: [
        { text: "押一把", hint: "押的是运", gamble: { winChance: 0.42, win: [{ k: "silver", v: 6 }], lose: [{ k: "silver", v: -4 }], winNote: "你赢了六两。那一夜你没敢跟家里说。", loseNote: "天亮时你身上一文不剩。回家路上你把手在雪里按了很久。" }, hint2: "" },
        { text: "看看就走", hint: "什么也没变", effects: [], then: "你在旁边看了一个时辰，看三个人输光了才走。" }
      ]
    },
    {
      id: "c.adult.famine", cat: "世变", title: "荒年", age: [7, 70], weight: 15,
      text: [
        "自三月不雨，至六月。禾苗尽枯，河渠见底。",
        "先是挖草根、剥树皮，后来有人卖儿卖女，再后来，路边的死人没人收了。"
      ],
      options: [
        { text: "举家逃荒", hint: "身体 −8；离家，田产折损", effects: [{ k: "body", v: -8 }, { k: "fame", v: -3 }, { k: "field_wet", v: -2 }], then: "你们走了二十天，走到有粥棚的县城。母亲把一个妹妹送了人。" },
        { text: "守着不走", hint: "存粮 −8 石；身体 −5", effects: [{ k: "grain", v: -8 }, { k: "body", v: -5 }], then: "吃完了粮，吃完了种，最后把耕牛也杀了。牛死的时候，父亲蹲在旁边哭。" },
        { text: "开仓放粮（家有积谷）", hint: "存粮 −15 石；声望 +12", need: { minSilver: 5 }, effects: [{ k: "grain", v: -15 }, { k: "fame", v: 12 }, { k: "body", v: 2 }], then: "你在祠堂前支起大锅。后来县里给你立了一块匾，写着「义」。", gamble: { deathChance: 0.08, cause: "疫病" } }
      ]
    },
    {
      id: "c.adult.plague", cat: "身体", title: "疫", age: [5, 70], weight: 11,
      text: [
        "先是几户人家死了人，十天之内，一条巷子空了半边。",
        "官府的差役在巷口撒石灰，不许人出入。"
      ],
      options: [
        { text: "闭门不出，烧艾", hint: "存粮 −2 石；身体 −3", effects: [{ k: "grain", v: -2 }, { k: "body", v: -3 }], then: "你在屋里待了四十天。出门时，邻居家的门已经贴了封条。" },
        { text: "出门照应邻里", hint: "身体 −10；声望 +10", effects: [{ k: "body", v: -10 }, { k: "fame", v: 10 }], then: "你抬过七具尸首。有人叫你名字，你没敢应。", gamble: { deathChance: 0.12, cause: "疫病" } },
        { text: "带着家人往山里躲", hint: "身体 −5；银钱 −3；家中平安", effects: [{ k: "body", v: -5 }, { k: "silver", v: -3 }], then: "山里冷，但没人。你们在山洞住了两个月，靠野菜过活。" }
      ]
    },
    {
      id: "c.adult.flood", cat: "世变", title: "大水", age: [5, 70], weight: 8,
      text: [
        "连雨十日，河堤决了口。水是从半夜来的，先到脚踝，再到腰。",
        "屋顶上蹲着一家人，看着自家的田变成一片黄汤。"
      ],
      options: [
        { text: "先救家人", hint: "田产折损；身体 −4，声望 +6", effects: [{ k: "field_wet", v: -3 }, { k: "body", v: -4 }, { k: "fame", v: 6 }], then: "你背着母亲走了三里。回头时，房子已经塌了半边。" },
        { text: "抢运粮食", hint: "存粮 +4 石；身体 −8", effects: [{ k: "grain", v: 4 }, { k: "body", v: -8 }], then: "你在水里泡了一夜，抢出四石粮。后来这四石粮救了全家。" },
        { text: "上房顶等官府", hint: "银钱 −2；身体 −2", effects: [{ k: "silver", v: -2 }, { k: "body", v: -2 }], then: "第三天才有船来。粥是稀的，但排队的人都很安静。" }
      ]
    },
    {
      id: "c.adult.bandit", cat: "世变", title: "过路", age: [14, 70], weight: 10,
      text: [
        "十几个人的一伙，头裹布巾，拿着锄头、柴刀，也有两杆真枪。",
        "他们不进村，只要粮。里正让大家凑。"
      ],
      options: [
        { text: "凑粮送出去", hint: "存粮 −5 石", effects: [{ k: "grain", v: -5 }], then: "他们抬着粮走了，临走时头目拱了拱手，说：明年还来。" },
        { text: "召集乡勇抵抗", hint: "身体 −8；声望 +10，可能死人", effects: [{ k: "body", v: -8 }, { k: "fame", v: 10 }, { k: "martial", v: 4 }], then: "你们在村口打了一场。对方死了两个，你们死了四个。此后三年没人再来。", gamble: { deathChance: 0.14, cause: "械斗" } },
        { text: "举家躲进县城", hint: "银钱 −4；田里无人照看", effects: [{ k: "silver", v: -4 }, { k: "field_dry", v: -1 }], then: "城里房租贵，住了一个月，钱花光了。回来时庄稼被踩平了。" }
      ]
    },
    {
      id: "c.adult.debt", cat: "家族", title: "债主", age: [18, 70], weight: 22,
      when: { debtExists: true },
      text: [
        "债主带了两个人来，坐在堂屋里不走。",
        "他说：本钱可以再宽限，利钱总得先给。"
      ],
      options: [
        { text: "卖田还债", hint: "田 −5 亩；债务清", effects: [{ k: "field_wet", v: -5 }, { k: "silver", v: 60 }, { k: "fame", v: -4 }], then: "五亩水田，卖了个贱价。文书按了手印，你按了两次才按正。" },
        { text: "再求宽限", hint: "声望 −6；债务滚利", effects: [{ k: "fame", v: -6 }, { k: "debt", v: { amt: 12, rate: 0.05, dueYears: 2 } }], then: "他走了，临走时说：明年这时候，可就不是这个数了。" },
        { text: "赖着不还", hint: "声望 −12；可能吃官司", effects: [{ k: "fame", v: -12 }, { k: "grudge", v: 10 }], then: "他告到县里。你在堂上跪了半日，挨了十板，钱还是得还。" }
      ]
    },
    {
      id: "c.adult.split", cat: "家族", title: "分家", age: [19, 36], weight: 20, once: true,
      when: { flagHas: ["married"] },
      text: [
        "兄弟几个都成了家，一口锅里搅不下。族中长辈来做中人。",
        "田、房、耕牛、债，一样一样摆到桌上。"
      ],
      options: [
        { text: "平分，各立门户", hint: "田分其半；自立", effects: [{ k: "field_wet", v: -3 }, { k: "field_dry", v: -3 }, { k: "silver", v: 12 }], then: "你分到三亩水田、两间半房。分家那天，母亲在灶间哭了很久。" },
        { text: "让出田产，只要老屋", hint: "田 −6 亩；声望 +10", effects: [{ k: "field_wet", v: -6 }, { k: "fame", v: 10 }], then: "族里都说你厚道。厚道的人，日子过得紧。" },
        { text: "不分，硬撑着", hint: "声望 −4；家中口角不断", effects: [{ k: "fame", v: -4 }, { k: "body", v: -2 }], then: "一个锅里吃了十年。妯娌之间，谁也不跟谁说话。" }
      ]
    },
    {
      id: "c.adult.lawsuit", cat: "官府", title: "讼", age: [18, 65], weight: 12,
      text: [
        "为一条田埂，两家打了三年。今年对方递了状子。",
        "按规矩，先得给书吏送钱，不然状子递不进去。"
      ],
      options: [
        { text: "花钱打点", hint: "银钱 −6；赢面大", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 3 }], then: "县太爷判你胜。对方在堂下骂了一句，被拖出去打了二十板。" },
        { text: "据理力争", hint: "声望 +6；可能输", gamble: { winChance: 0.45, win: [{ k: "fame", v: 6 }, { k: "field_dry", v: 1 }], lose: [{ k: "fame", v: -6 }, { k: "silver", v: -2 }], winNote: "你自己写的状子，居然被准了。县太爷说：这状子写得明白。", loseNote: "你被判诬告，杖二十，田埂归了对方。" } },
        { text: "让了", hint: "田 −1 亩；声望 −2", effects: [{ k: "field_dry", v: -1 }, { k: "fame", v: -2 }], then: "你让人把界石挪了三尺。此后二十年，那家人没再找过麻烦。" }
      ]
    },
    {
      id: "c.adult.fire", cat: "世变", title: "火", age: [6, 70], weight: 6,
      text: [
        "半夜，隔壁的柴房先着了。风大，火苗顺着屋檐一路过来。",
        "有人喊，有人抱着孩子往外跑，有人抢东西。"
      ],
      options: [
        { text: "先救人", hint: "身体 −6；声望 +8；家产折损", effects: [{ k: "body", v: -6 }, { k: "fame", v: 8 }, { k: "silver", v: -4 }], then: "你从火里背出一个老太太。她说：我的箱子。你说：命要紧。" },
        { text: "抢出钱箱", hint: "银钱保住；声望 −6", effects: [{ k: "fame", v: -6 }, { k: "silver", v: -1 }], then: "钱箱抢出来了，房子没了。邻居说：这人心里只有钱。" }
      ]
    },
    {
      id: "c.adult.sick", cat: "身体", title: "病了", age: [20, 75], weight: 14,
      text: [
        "起先只是发热，后来咳，咳到夜里睡不着。",
        "郎中来看过，说是劳损伤了肺，开了方子，要吃三个月。"
      ],
      options: [
        { text: "抓药吃足三个月", hint: "银钱 −4；身体 +12", effects: [{ k: "silver", v: -4 }, { k: "body", v: 12 }], then: "药很苦。三个月后你能下地了，只是阴天还咳。" },
        { text: "只抓三副，省着", hint: "银钱 −0.8；身体 +3", effects: [{ k: "silver", v: -0.8 }, { k: "body", v: 3 }], then: "三副药吃完，热退了，咳没断根。这病跟了你一辈子。" },
        { text: "不治，硬扛", hint: "身体 −12", effects: [{ k: "body", v: -12 }], then: "你扛了两个月。人瘦了一圈，居然活下来了。", gamble: { deathChance: 0.1, cause: "劳损" } }
      ]
    },
    {
      id: "c.adult.buyland", cat: "家业", title: "买田", age: [22, 65], weight: 14,
      when: { minSilver: 25 },
      text: [
        "邻村一户要迁走，急卖十亩水田，价钱比市面低两成。",
        "中人催得紧，说过了这村没这店。"
      ],
      options: [
        { text: "买下", hint: "银钱 −24；水田 +10", effects: [{ k: "silver", v: -24 }, { k: "field_wet", v: 10 }, { k: "fame", v: 4 }], then: "田契过了户。你在地头站了很久，抓了一把土。" },
        { text: "只买五亩", hint: "银钱 −13；水田 +5", effects: [{ k: "silver", v: -13 }, { k: "field_wet", v: 5 }], then: "五亩也是田。你把界石重新埋了一遍。" },
        { text: "不买，留着钱", hint: "什么也没变", effects: [], then: "第二年那户人家的田被别人买去，转手就涨了三成。" }
      ]
    },
    {
      id: "c.adult.sellland", cat: "家业", title: "卖田", age: [20, 70], weight: 10,
      when: { maxSilver: 20 },
      text: [
        "青黄不接，家里已经断粮三天。",
        "中人来说，有人要买地，价钱压得很低。"
      ],
      options: [
        { text: "卖五亩救急", hint: "田 −5 亩；银钱 +18", effects: [{ k: "field_wet", v: -5 }, { k: "silver", v: 18 }, { k: "fame", v: -4 }], then: "按手印的时候，你的手在抖。中人说：都是这样过来的。" },
        { text: "卖旱地", hint: "旱地 −8 亩；银钱 +12", effects: [{ k: "field_dry", v: -8 }, { k: "silver", v: 12 }], then: "旱地不值钱，但保住了水田。你知道哪一样更不能丢。" },
        { text: "不卖，去借", hint: "借债 10 两；声望 −2", effects: [{ k: "debt", v: { amt: 10, rate: 0.04, dueYears: 2 } }, { k: "fame", v: -2 }], then: "借据上写着：月息四分。你认得那几个字。" }
      ]
    },
    {
      id: "c.adult.trade", cat: "市井", title: "行商", age: [18, 55], weight: 12,
      class: ["merchant", "farmer", "gentry"],
      text: [
        "有个同乡从外地回来，说那边的布价比本地低一半，走一趟能翻倍。",
        "本钱要十两，路上要走两个月，也可能遇上匪。"
      ],
      options: [
        { text: "凑本钱走一趟", hint: "银钱 −10；成败看天", gamble: { winChance: 0.6, win: [{ k: "silver", v: 22 }, { k: "knowledge", v: 4 }], lose: [{ k: "silver", v: -4 }, { k: "body", v: -6 }], winNote: "回来时你带了两车布。这一趟赚的，够买三亩田。", loseNote: "货在半路被抽了税，又遇上雨，布霉了一半。" } },
        { text: "只出本钱，不随行", hint: "银钱 −5；分利", gamble: { winChance: 0.55, win: [{ k: "silver", v: 9 }], lose: [{ k: "silver", v: -5 }], winNote: "年底他送来了分红，还带了一包南边的糖。", loseNote: "他说路上折了本，双手一摊。你也没法说什么。" } },
        { text: "不去", hint: "什么也没变", effects: [], then: "他走了。第二年回来时，已经在县城买了房。" }
      ]
    },
    {
      id: "c.adult.widow", cat: "家族", title: "寡居", age: [24, 55], weight: 20, sex: "female",
      when: { flagHas: ["married"] },
      text: [
        "丈夫死了。族中长辈来商量后事，也商量你往后的日子。",
        "有人说：守着孩子过。有人说：还年轻，再走一步。"
      ],
      options: [
        { text: "守节，把孩子拉扯大", hint: "声望 +12；日子艰难", effects: [{ k: "fame", v: 12 }, { k: "silver", v: -4 }, { k: "body", v: -4 }], then: "族里给你立了牌坊的许诺。你每天纺线到半夜，手指关节都变了形。" },
        { text: "再嫁", hint: "声望 −10；家中添丁", effects: [{ k: "fame", v: -10 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 34 } }], then: "族里把你的名字从族谱上划了。你走的那天，没人送。" },
        { text: "回娘家", hint: "田产归族；声望 −4", effects: [{ k: "fame", v: -4 }, { k: "field_wet", v: -2 }], then: "嫂子脸色不好看。你在娘家住了三年，后来自己租了间屋。" }
      ]
    },
    {
      id: "c.old.child", cat: "家族", title: "添丁", age: [24, 45], weight: 30, sex: "male",
      when: { flagHas: ["married"] },
      text: [
        "产房里折腾了一夜。天亮时，稳婆出来说：恭喜，是个儿子。",
        "你在院里站了一夜，脚都麻了。"
      ],
      options: [
        { text: "取名，记入族谱", hint: "家中添丁；声望 +4", effects: [{ k: "fame", v: 4 }, { k: "addPerson", v: { role: "child", rel: "子", age: 0 } }], then: "名字是按辈分排的。你抱着他，不敢用力。" },
        { text: "请先生看八字", hint: "银钱 −1；声望 +6", effects: [{ k: "silver", v: -1 }, { k: "fame", v: 6 }, { k: "addPerson", v: { role: "child", rel: "子", age: 0 } }], then: "先生说他命里缺水。于是名字里带了个「泽」字。" }
      ]
    },
    {
      id: "c.old.daughter", cat: "家族", title: "生女", age: [22, 42], weight: 24,
      when: { flagHas: ["married"] },
      text: [
        "又是个女儿。婆婆在门外站了一会儿，转身进了屋。",
        "母亲说：女儿也是骨肉。"
      ],
      options: [
        { text: "好好养着", hint: "家中添丁；声望 +3", effects: [{ k: "fame", v: 3 }, { k: "addPerson", v: { role: "child", rel: "女", age: 0 } }], then: "你给她取名时，用了自己最喜欢的一个字。" },
        { text: "送人", hint: "银钱 +1；声望 −8", effects: [{ k: "silver", v: 1 }, { k: "fame", v: -8 }], then: "抱走的人家姓什么，你没问。那天你没有出门。" }
      ]
    },
    {
      id: "c.adult.rob", cat: "世变", title: "遇盗", age: [16, 70], weight: 9,
      text: [
        "你从集上回来，走到半路，林子里出来三个人。",
        "他们要钱，也要你身上的衣服。"
      ],
      options: [
        { text: "给了", hint: "银钱 −3", effects: [{ k: "silver", v: -3 }], then: "他们拿了钱就走。你光着一只脚走回家，一路没回头。" },
        { text: "拼命", hint: "身体 −10；可能死", effects: [{ k: "body", v: -10 }, { k: "fame", v: 4 }], then: "你打断了一个人的胳膊，自己的头也被开了口子。", gamble: { deathChance: 0.12, cause: "盗杀" } },
        { text: "认得其中一人", hint: "声望 +2；日后有麻烦", effects: [{ k: "fame", v: 2 }, { k: "grudge", v: 8 }], then: "你说：你是东村的。他愣了一下，让你走了。这事没完。" }
      ]
    },
    {
      id: "c.adult.conscript", cat: "官府", title: "点丁", age: [16, 45], weight: 15, sex: "male",
      text: [
        "官府的差役拿着册子来点丁。册上有你的名字。",
        "里正说：去也可，不去也可，看你怎么想。"
      ],
      options: [
        { text: "应点", hint: "私兵 +?；离家数年", effects: [{ k: "body", v: 4 }, { k: "martial", v: 6 }, { k: "fame", v: 3 }], then: "你被编进队伍，发了一杆枪。枪比你想的重。" },
        { text: "出钱免役", hint: "银钱 −6", effects: [{ k: "silver", v: -6 }], then: "钱交上去，册子上的名字被划掉了。划得很轻，像怕人看见。" },
        { text: "逃", hint: "声望 −8；成了逃户", effects: [{ k: "fame", v: -8 }, { k: "body", v: -4 }], then: "你逃进山里，靠给猎户帮工过活。三年不敢回家。" }
      ]
    },
    {
      id: "c.adult.refugee", cat: "世变", title: "逃难", age: [8, 70], weight: 10,
      text: [
        "兵从北边来，说是要守城，先要把城外的房子烧了，免得资敌。",
        "全村人往南走，路上遇到另一群往北走的人。"
      ],
      options: [
        { text: "跟着人流往南", hint: "身体 −6；家产折损", effects: [{ k: "body", v: -6 }, { k: "silver", v: -4 }, { k: "field_dry", v: -2 }], then: "走了半个月。路上你看见一队人被另一队人截住，后来就再没见过他们。" },
        { text: "躲进山里", hint: "存粮 −5 石；身体 −4", effects: [{ k: "grain", v: -5 }, { k: "body", v: -4 }], then: "你们在山里搭了窝棚。冬天冻死了两个孩子，都是邻家的。" },
        { text: "留下看家", hint: "兵过如篦，损失难料", effects: [{ k: "silver", v: -8 }, { k: "body", v: -6 }], then: "兵住了三天。走的时候，鸡鸭、被褥、门板都没了。", gamble: { deathChance: 0.1, cause: "兵祸" } }
      ]
    },
    {
      id: "c.adult.teach", cat: "乡里", title: "塾师", age: [30, 65], weight: 10,
      when: { minKnowledge: 25 },
      text: [
        "村里要请一位塾师，一年束脩十二两，管一顿饭。",
        "族老来问你愿不愿意。"
      ],
      options: [
        { text: "应下", hint: "银钱 +12/年；声望 +8", effects: [{ k: "silver", v: 12 }, { k: "fame", v: 8 }, { k: "knowledge", v: 3 }], then: "十几个孩子，从《三字经》教起。有人叫你先生，你听着不习惯。" },
        { text: "推辞", hint: "声望 −2", effects: [{ k: "fame", v: -2 }], then: "你说自己学问不够。族老说：够不够，教了才知道。" }
      ]
    },
    {
      id: "c.old.grandchild", cat: "家族", title: "孙", age: [44, 72], weight: 16,
      when: { flagHas: ["married"] },
      text: [
        "儿子成亲三年，今年添了个孩子。",
        "你抱着他，忽然想起自己这么大的时候，父亲是什么样子。"
      ],
      options: [
        { text: "亲自教他识字", hint: "学识 +2；声望 +5", effects: [{ k: "fame", v: 5 }, { k: "knowledge", v: 2 }], then: "他学得慢，你也不急。你有的是时间。" },
        { text: "把家业交代给儿子", hint: "声望 +3；从此不问事", effects: [{ k: "fame", v: 3 }, { k: "body", v: 3 }], then: "田契、账本、人情往来，一样一样交出去。交完那天你睡了很久。" }
      ]
    },
    {
      id: "c.old.illness", cat: "身体", title: "老病", age: [58, 85], weight: 22,
      text: [
        "入冬以后，腿脚不听使唤。夜里起夜三次，白天坐在门口晒太阳。",
        "儿子请了郎中。郎中说：年纪到了，吃药也只是拖着。"
      ],
      options: [
        { text: "吃药，拖一天是一天", hint: "银钱 −5；身体 +8", effects: [{ k: "silver", v: -5 }, { k: "body", v: 8 }], then: "药一碗一碗地喝。你又熬过了两个冬天。" },
        { text: "不吃了，省下钱", hint: "身体 −6；银钱留给子孙", effects: [{ k: "body", v: -6 }, { k: "fame", v: 4 }], then: "你把药钱塞给了孙子。他拿着钱，站在门口没动。" },
        { text: "把族中子弟叫来交代后事", hint: "声望 +8", effects: [{ k: "fame", v: 8 }, { k: "body", v: -3 }], then: "你说得很慢。说到一半，忘记要说什么了。他们都等着。" }
      ]
    },
    {
      id: "c.rebel.after1", cat: "大事", title: "三 年", age: [0, 110], weight: 1, hidden: true,
      text: [
        "三年了。当年的旧部，如今都是开府的将军。",
        "他们聚在殿上，说的不是天下，是封赏、是田宅、是谁的功劳大。"
      ],
      options: [
        { text: "封侯，收其兵", hint: "私兵 +800，官军 +2000；人心稍安", effects: [{ k: "troops", v: 800 }, { k: "command", v: 2000 }, { k: "fame", v: 8 }], then: "你封了七个侯，把兵符都收在宫里。有人交得痛快，有人交的时候手在抖。" },
        { text: "厚赏，不问兵", hint: "军心 +12；日后难制", effects: [{ k: "morale", v: 12 }, { k: "troops", v: 1500 }], then: "你让他们各领一军，镇守四方。夜里你偶尔会想：他们会不会也听见那句话。" },
        { text: "杀几个为首的", hint: "军心 −20；威望 +", effects: [{ k: "morale", v: -20 }, { k: "fame", v: 6 }, { k: "troops", v: -400 }], then: "你在殿上拿下了三个人。血擦干净之后，剩下的人跪得更低了。" }
      ]
    },
    {
      id: "c.rebel.after2", cat: "大事", title: "九 年", age: [0, 110], weight: 1, hidden: true,
      text: [
        "九年了。天下初定，府库渐实。",
        "群臣三次上表，请立太子。你看着自己的儿子们，想起当年在{place}的那个夜晚。"
      ],
      options: [
        { text: "立长子", hint: "名分早定；声望 +10", effects: [{ k: "fame", v: 10 }], then: "长子被立为太子。你亲手把册文交给他，说：这天下，不好坐。" },
        { text: "立有才的幼子", hint: "朝议汹汹；日后有变", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 10 }], then: "朝臣争了三个月。你压下去了。你知道，这口气没有消。" },
        { text: "不立，说自己还撑得住", hint: "声望 −6；隐患深埋", effects: [{ k: "fame", v: -6 }], then: "你把奏表留中。此后每次朝会，都有人在看你的脸色。" }
      ]
    }
  ];
})(window.PACK_BASE);
