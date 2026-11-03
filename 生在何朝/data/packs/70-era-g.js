/* 生在何朝 · 各朝专有事件 卷七：秦、西汉、新
 * 补的是 60-era-a.js 没写到的那一面：
 * 秦补法与役落到个人头上的样子，西汉补察举与盐铁，新补改制之下百姓怎么活。
 * 前缀 q6. / w6. / x6.，与既有 q2–q5、w2–w5、x2–x5 不撞。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 秦 ══════════ */
  B.eraEvents.qin = (B.eraEvents.qin || []).concat([

    {
      id: "q6.tongwen", cat: "学问", title: "书同文", age: [10, 40], weight: 14, once: true,
      years: [-221, -210],
      text: [
        "诏下：书同文。凡不用秦篆者，皆为非法。",
        "你原来的先生教的是六国古字，一个「马」字能写出四种样子。如今这四种都要忘掉。"
      ],
      options: [
        { text: "从头学秦篆", hint: "学识 +5；银钱 −1", effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -1 }], then: "你买了一卷{{仓颉篇|秦统一后颁行的字书，李斯作}}，一个字一个字地改。改到后来，原先的字倒记不清了。" },
        { text: "照旧写古文", hint: "学识 +2；或有官司", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "fame", v: -8 }, { k: "body", v: -4 }], loseNote: "县里查书，你写的简被挑出来。罚了三个月劳役。" }, then: "你偷偷用旧字记账。乡里人看得懂，吏看不懂。" },
        { text: "索性不再写字", hint: "学识 −6；省心", effects: [{ k: "knowledge", v: -6 }], then: "你把竹简收进箱底。此后多年，你只在看见官文书时，才想起自己认过字。" }
      ]
    },
    {
      id: "q6.chidao", cat: "官府", title: "驰道", age: [10, 55], weight: 16, sex: "male",
      years: [-220, -210],
      text: [
        "修驰道，东穷燕齐，南极吴楚。道广五十步，三丈而树。",
        "县里点夫，一户出一丁，去者自备干粮。"
      ],
      options: [
        { text: "自己去", hint: "身体 −12；银钱 −1", effects: [{ k: "body", v: -12 }, { k: "silver", v: -1 }], gamble: { deathChance: 0.1, cause: "劳役" }, then: "夯土、铺石、栽树。日头底下，人像蚂蚁一样排成一条线，从这头看不到那头。" },
        { text: "出钱雇人代役", need: { minSilver: 3 }, hint: "银钱 −3；身体无损", effects: [{ k: "silver", v: -3 }], then: "你雇了邻村一个没有田的汉子。他走的时候，你多给了一升米。" },
        { text: "报病不去", hint: "身体 −3；或有罪", effects: [{ k: "body", v: -3 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -10 }, { k: "fame", v: -6 }], loseNote: "里典来验，你装得不像。挨了一顿笞，还是去了。" }, then: "你躺在床上哼了三天。里典来看过一次，没说什么。" }
      ]
    },
    {
      id: "q6.lianzuo", cat: "官府", title: "连坐", age: [16, 65], weight: 15,
      text: [
        "{{什伍连坐|秦制，十家为什，五家为伍，一家有罪，同伍连坐}}。",
        "你同伍的那家，男人昨夜跑了。天亮时，亭卒来拍门。"
      ],
      options: [
        { text: "实说，他往北去了", hint: "声望 +2；邻里结怨", effects: [{ k: "fame", v: 2 }, { k: "grudge", v: 8 }], then: "亭卒追了两日，把人抓回来。那家的女人从此见了你就关门。" },
        { text: "说不知道", hint: "保了邻人；或受笞", effects: [{ k: "favor", v: 8 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }, { k: "silver", v: -2 }], loseNote: "查出来你说了谎。笞五十，罚盾一具。" }, then: "你说那夜睡死了，什么也没听见。亭卒看了你很久。" },
        { text: "塞钱给亭卒", need: { minSilver: 2 }, hint: "银钱 −2；事暂了", effects: [{ k: "silver", v: -2 }, { k: "official", v: 3 }], then: "亭卒收了钱，把簿子合上，说这家人许是走亲戚去了。" }
      ]
    },
    {
      id: "q6.yushi", cat: "官府", title: "按劾", age: [20, 60], weight: 12, when: { minKnowledge: 25 },
      text: [
        "御史下来按劾，查的是去年粮仓的账。",
        "你是经手人之一。账上短了三十石，谁也说不清去了哪里。"
      ],
      options: [
        { text: "照实说，账是仓曹做的", hint: "声望 +3；得罪上官", effects: [{ k: "fame", v: 3 }, { k: "grudge", v: 10 }], then: "御史记了下来。仓曹后来被免了，你也被调去看城门。" },
        { text: "认在自己名下", hint: "声望 −8；保住上官", effects: [{ k: "fame", v: -8 }, { k: "favor", v: 12 }, { k: "body", v: -6 }], then: "你挨了三十杖。仓曹托人送来两石粟，说日后必有回报。" },
        { text: "把三十石补上", need: { minSilver: 8 }, hint: "银钱 −8；事了", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 1 }], then: "你把家里的存粮折成钱补了进去。御史核过数，走了。" }
      ]
    },
    {
      id: "q6.shouxing", cat: "世变", title: "黥", age: [12, 60], weight: 13,
      text: [
        "县前立着木柱，绑着一个人。",
        "吏念完罪状，行刑的人在犯人脸上刻字，再撒上墨。那人一声没吭，血流到脖子里。"
      ],
      options: [
        { text: "看完", hint: "声望 −2；心里记住", effects: [{ k: "fame", v: -2 }, { k: "knowledge", v: 2 }], then: "刻的是「城旦」二字。此后你在街上再见他，脸上那两个字永远洗不掉。" },
        { text: "走开", hint: "无得失", effects: [], then: "你转身走了。身后有人叫好，也有人在吐。" },
        { text: "去给他一碗水", hint: "声望 +4；或惹麻烦", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -5 }], loseNote: "行刑的吏说你同情罪人，推了你一把，摔在石阶上。" }, then: "你端了一碗水过去。他抬头看你，眼睛肿得只剩一条缝。" }
      ]
    },
    {
      id: "q6.shiji", cat: "市井", title: "市籍", age: [18, 60], weight: 12, when: { classIn: ["merchant"] },
      text: [
        "{{市籍|商贾另立户籍，不得为吏，不得衣丝乘车，子孙同}}。",
        "你父亲想让你脱籍，托人问了几处，都说要花大钱。"
      ],
      options: [
        { text: "花钱脱籍", need: { minSilver: 40 }, hint: "银钱 −40；子孙可为吏", effects: [{ k: "silver", v: -40 }, { k: "official", v: 10 }], setFlag: ["off_register"], then: "钱送出去三个月，户籍改了。你父亲把那本旧籍烧了，说这下干净了。" },
        { text: "不脱，照做买卖", hint: "银钱 +8；子孙仍是市籍", effects: [{ k: "silver", v: 8 }], then: "你想，钱是实在的，籍是虚的。可后来儿子去应役，还是被挑出来单列一行。" },
        { text: "拿钱去买个爵位", hint: "银钱 −25；有爵免役", effects: [{ k: "silver", v: -25 }, { k: "fame", v: 6 }, { k: "official", v: 4 }], then: "爵是{{公士|秦爵二十等之最下，得一顷田、一宅、一庶子}}，最低的一等。但从此役册上少了你家的名字。" }
      ]
    },
    {
      id: "q6.tianzu", cat: "赋役", title: "半租", age: [18, 65], weight: 15,
      text: [
        "秦收田租，{{泰半之赋|收成三分取二，是秦末的横征}}。",
        "今年收成本就不济，里典拿着斗来量的时候，你女人站在门口，一句话没说。"
      ],
      options: [
        { text: "如数交", hint: "粮 −8；无祸", effects: [{ k: "grain", v: -8 }], then: "斗刮得很平。里典走后，米缸见了底。你把最后半斗藏在灶下。" },
        { text: "藏起两斗", hint: "粮 −5；或受罚", effects: [{ k: "grain", v: -5 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -9 }, { k: "grain", v: -4 }], loseNote: "里典掀了灶，把藏米刨出来。你被绑在树上打了一顿。" }, then: "你在灶台下挖了个坑，把米罐埋进去。夜里翻身都怕压着。" },
        { text: "求里典宽三日", hint: "声望 −3；粮 −6", effects: [{ k: "grain", v: -6 }, { k: "fame", v: -3 }, { k: "favor", v: 4 }], then: "里典看了你女人一眼，说三日就三日。三日后，你借了邻家的米交上。" }
      ]
    },
    {
      id: "q6.shubian", cat: "军旅", title: "戍期", age: [14, 45], weight: 18, sex: "male",
      years: [-212, -207],
      text: [
        "你被征戍渔阳，期限是今年九月。",
        "走到蕲县大泽乡，大雨把路冲断了。按秦法，{{失期，法皆斩|陈胜吴广起义的由头}}。"
      ],
      options: [
        { text: "跟着众人反了", hint: "身体 −10；从此是叛军", effects: [{ k: "body", v: -10 }, { k: "fame", v: -10 }, { k: "troops", v: 30 }], setFlag: ["rebel"], gamble: { deathChance: 0.22, cause: "战殁" }, then: "有人喊了一声，几百个人就动了。你手里那根木棍，是拆了车辕做的。" },
        { text: "逃", hint: "身体 −8；成为亡人", effects: [{ k: "body", v: -8 }, { k: "fame", v: -12 }], setFlag: ["runaway"], gamble: { deathChance: 0.14, cause: "饿殍" }, then: "你半夜钻进芦苇荡。走了七天，吃的是草根和生鱼。" },
        { text: "留下来等雨停", hint: "身体 −12；或仍被斩", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.3, cause: "斩" }, then: "雨下了半个月。等你们走到渔阳，已经过了期限二十七天。" }
      ]
    },
    {
      id: "q6.fangshi", cat: "方外", title: "求仙", age: [10, 60], weight: 10,
      years: [-219, -210],
      text: [
        "始皇帝遣方士入海求仙，县里也在选人。",
        "选上的，给一笔钱，随船出海，去者不归。"
      ],
      options: [
        { text: "应选", hint: "银钱 +15；多半回不来", effects: [{ k: "silver", v: 15 }], gamble: { deathChance: 0.4, cause: "溺" }, then: "船开了三日，看不见岸。同船有人开始哭，有人开始念经。" },
        { text: "不去", hint: "无得失", effects: [], then: "你在岸上看船开走。那年冬天，没有一条船回来。" },
        { text: "充作方士，去说海上有神山", hint: "银钱 +25；或有欺君之罪", effects: [{ k: "silver", v: 25 }, { k: "fame", v: 6 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -20 }, { k: "fame", v: -20 }], loseNote: "船回来了一半，神山自然没有。查出来是你编的，下狱。" }, then: "你编了一套话，说海中有三山，山上有不死药。听的人眼睛都亮了。" }
      ]
    },
    {
      id: "q6.liuwang", cat: "世变", title: "流亡", age: [15, 70], weight: 14, years: [-210, -206],
      text: [
        "关东乱了。县里的仓被抢过两次，第三次烧了。",
        "路上全是人，往南的、往西的，谁也说不清哪里安稳。"
      ],
      options: [
        { text: "往山里躲", hint: "身体 −8；粮 −5", effects: [{ k: "body", v: -8 }, { k: "grain", v: -5 }], then: "你在山里搭了个棚。冬天冻死过两个人，其中一个是个孩子，不知道是谁家的。" },
        { text: "跟着人群往关中走", hint: "身体 −10；或遇兵", effects: [{ k: "body", v: -10 }], gamble: { deathChance: 0.16, cause: "兵乱" }, then: "走了一个月。路上见过三次尸首，都没有人收。" },
        { text: "留在村里，守屋子", hint: "声望 +3；或有兵祸", effects: [{ k: "fame", v: 3 }], gamble: { deathChance: 0.2, cause: "兵乱" }, then: "你哪儿也没去。夜里听见马蹄声，就把灯吹了，坐在墙角等天亮。" }
      ]
    }

  ]);

  /* ══════════ 西汉 ══════════ */
  B.eraEvents.whan = (B.eraEvents.whan || []).concat([

    {
      id: "w6.chaju", cat: "科举", title: "孝廉", age: [20, 50], weight: 15, when: { minFame: 12 },
      years: [-140, -1],
      text: [
        "郡国岁举{{孝廉|汉制，郡国每年荐举孝子廉吏各一人，为入仕正途}}。今年郡里有一个名额。",
        "太守的门下掾来问过你家的事，也问过你父亲。"
      ],
      options: [
        { text: "备礼去见掾吏", need: { minSilver: 6 }, hint: "银钱 −6；或有名", effects: [{ k: "silver", v: -6 }, { k: "official", v: 8 }], setFlag: ["xiaolian"], then: "你带了两匹帛、一坛酒。掾吏收了，说今年名额紧，让你等明年。" },
        { text: "不求，只在家侍亲", hint: "声望 +5；无缘仕途", effects: [{ k: "fame", v: 5 }], then: "你每日给母亲煎药、洗脚。乡里都说你孝。孝名也是名，只是换不来官。" },
        { text: "托在京中的亲戚说话", need: { minSilver: 14 }, hint: "银钱 −14；成算大些", effects: [{ k: "silver", v: -14 }, { k: "official", v: 12 }], setFlag: ["xiaolian"], then: "亲戚在{{光禄勋|九卿之一，掌宫殿掖门及郎官}}属下做事，写了一封信。三个月后，郡里把你的名字报了上去。" }
      ]
    },
    {
      id: "w6.yantie", cat: "市井", title: "盐铁", age: [20, 60], weight: 14, years: [-119, -81],
      text: [
        "{{盐铁官营|汉武帝时收盐铁之利归官，私营者釱左趾，器物没官}}。",
        "你家那口煮盐的灶，如今要交出。官的价钱压得低，不交就是犯法。"
      ],
      options: [
        { text: "交官", hint: "银钱 +6；断了营生", effects: [{ k: "silver", v: 6 }, { k: "fame", v: 2 }], then: "灶交了，官给的钱不够买半年的米。你在灶边站了很久，土还是温的。" },
        { text: "偷偷煮，夜里出盐", hint: "银钱 +18；或受刑", effects: [{ k: "silver", v: 18 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "body", v: -14 }, { k: "silver", v: -20 }], loseNote: "盐官搜了出来。你被釱了左脚，铁钳一直戴到冬天。" }, then: "夜里点火，烟往低处压。一锅盐煮出来，天还没亮就得运走。" },
        { text: "改行做别的", hint: "银钱 +3；从头来", effects: [{ k: "silver", v: 3 }, { k: "body", v: -4 }], then: "你把灶拆了，砖卖给了邻家。此后挑担卖菜，一天走三十里。" }
      ]
    },
    {
      id: "w6.heqin", cat: "天下", title: "和亲", age: [14, 22], weight: 11, sex: "female",
      years: [-200, -60],
      text: [
        "匈奴来求亲。宗室女不够，要从民间选良家女，赐以公主之名，嫁过去。",
        "县里递了名册来，上头有你的名字。"
      ],
      options: [
        { text: "去", hint: "离家万里；家中得赏", effects: [{ k: "silver", v: 30 }, { k: "fame", v: 10 }, { k: "body", v: -6 }], gamble: { deathChance: 0.2, cause: "塞外" }, then: "走的那天，母亲一直送到城外十里。车马往北，越走越冷，后来连树也不见了。" },
        { text: "毁容避选", hint: "身体 −6；免于远嫁", effects: [{ k: "body", v: -6 }, { k: "fame", v: -8 }], then: "你用炭火烫了左颊。来验的人看了一眼，把名字划去了。" },
        { text: "求人换名", need: { minSilver: 10 }, hint: "银钱 −10；换了别人", effects: [{ k: "silver", v: -10 }, { k: "fame", v: -4 }], then: "里正收了钱，把一个寡婦的名字填了上去。那女人上车时，回头看了你一眼。" }
      ]
    },
    {
      id: "w6.tuien", cat: "天下", title: "推恩", age: [18, 60], weight: 12, years: [-127, -100],
      text: [
        "{{推恩令|令诸侯王分封子弟为侯，国自分析，以弱其势}}下。",
        "你是王国的庶子。按旧法，你分不到一寸地；按新法，你也能做一个侯。"
      ],
      options: [
        { text: "请封", hint: "田 +8；与嫡兄结怨", effects: [{ k: "field_wet", v: 5 }, { k: "field_dry", v: 3 }, { k: "grudge", v: 10 }], then: "诏书下来，你得了三县之地。嫡兄在府里砸了一套漆器。" },
        { text: "不请，宁可不要", hint: "声望 +6；无地", effects: [{ k: "fame", v: 6 }], then: "你说兄长承宗，我不与他争。父亲听了，多看了你一眼。" },
        { text: "请封，但把地让给兄长一半", hint: "田 +4；兄弟尚可", effects: [{ k: "field_wet", v: 3 }, { k: "fame", v: 4 }, { k: "favor", v: 6 }], then: "你把最远的那一县让了出去。兄长收下时，脸色才缓过来。" }
      ]
    },
    {
      id: "w6.wugu", cat: "世变", title: "巫蛊", age: [14, 70], weight: 13, once: true, years: [-92, -87],
      text: [
        "长安城里查{{巫蛊|埋木人诅咒，武帝晚年因此死者数万}}。",
        "有人在你家院墙下挖出一个桐木人，插着针。你不认得那东西。"
      ],
      options: [
        { text: "自己去廷尉处说清楚", hint: "或有生机", effects: [{ k: "body", v: -8 }], gamble: { winChance: 0.4, win: [], lose: [{ k: "fame", v: -20 }, { k: "body", v: -25 }], loseNote: "廷尉不听辩，判了腰斩。家人花了全部家产，才换成徙边。" }, then: "你走了三十里到廷尉府。门口排队的人，从台阶一直排到街上。" },
        { text: "连夜逃走", hint: "身体 −10；从此无籍", effects: [{ k: "body", v: -10 }, { k: "fame", v: -12 }], setFlag: ["runaway"], gamble: { deathChance: 0.18, cause: "兵乱" }, then: "你从后墙翻出去，什么都没带。走了三日，才知道全城都在查。" },
        { text: "花钱买通查案的人", need: { minSilver: 25 }, hint: "银钱 −25；事压下去", effects: [{ k: "silver", v: -25 }, { k: "official", v: 6 }], then: "钱送出去，木人被悄悄收走。三个月后，查案的那个人自己也被查了。" }
      ]
    },
    {
      id: "w6.maijue", cat: "官府", title: "卖爵", age: [18, 60], weight: 13, when: { minSilver: 18 },
      years: [-123, -80],
      text: [
        "朝廷用兵，{{卖爵|武帝时因军费卖武功爵，得爵者可免役}}。一级十七万钱。",
        "吏在乡里摆了一张案，写明：买爵者免役，犯罪可减。" 
      ],
      options: [
        { text: "买一级", hint: "银钱 −18；免役", effects: [{ k: "silver", v: -18 }, { k: "official", v: 6 }, { k: "fame", v: 4 }], then: "爵印是铜的，比指甲盖大一点。你把它缝在衣襟里，出门带着。" },
        { text: "不买，去服役", hint: "身体 −10；省钱", effects: [{ k: "body", v: -10 }], then: "你去了河堤。挑土三个月，肩膀磨破了两层皮。" },
        { text: "借钱买爵", hint: "银钱 +2 立债；免役", effects: [{ k: "silver", v: 2 }, { k: "debt", v: { amt: 18, rate: 0.03, dueYears: 3 } }, { k: "official", v: 4 }], then: "你借了邻家的钱。爵是有了，可这笔债，还了四年。" }
      ]
    },
    {
      id: "w6.tunbian", cat: "世变", title: "实边", age: [18, 55], weight: 12, sex: "male",
      years: [-120, -60],
      text: [
        "{{徙民实边|移民塞下，给田宅、农具，免几年租}}。愿去的，给田五十亩、宅一区。",
        "吏说，塞下有匈奴，但也有地。"
      ],
      options: [
        { text: "应募去", hint: "田 +10；离乡", effects: [{ k: "field_dry", v: 10 }, { k: "body", v: -6 }], gamble: { deathChance: 0.12, cause: "兵乱" }, then: "车走了二十天。塞下的地是黑的，抓一把能捏出水。风很大，一年里有半年在刮。" },
        { text: "不去", hint: "无得失", effects: [], then: "你留在了原籍。后来听说去的那些人，头三年过得很苦，第四年才收了第一茬麦。" },
        { text: "让次子去", hint: "田 +10；家中少一人", effects: [{ k: "field_dry", v: 10 }, { k: "favor", v: -4 }], then: "次子走的时候十八岁。你送到县外，他回头喊了一声爹，就再没回过头。" }
      ]
    },
    {
      id: "w6.jingyi", cat: "官府", title: "经义", age: [22, 55], weight: 11, when: { minKnowledge: 45 },
      years: [-100, 1],
      text: [
        "县里有疑狱：儿子为父报仇杀了人。",
        "{{春秋决狱|以《春秋》经义断案，汉代通行}}，说「父不受诛，子复仇可也」。可律上写的是杀人者死。"
      ],
      options: [
        { text: "引经义，主张减死", hint: "声望 +10；得罪法吏", effects: [{ k: "fame", v: 10 }, { k: "grudge", v: 8 }], then: "你引了三条经。县令听完，把那人的死刑减成了徙边。" },
        { text: "依律，杀人者死", hint: "声望 −4；守律", effects: [{ k: "fame", v: -4 }, { k: "official", v: 4 }], then: "你说律是律。那人秋后处决，行刑那天下着雪。" },
        { text: "不表态", hint: "无得失", effects: [], then: "你什么也没说。县令自己定了，减死一等。散衙时他看了你一眼。" }
      ]
    },
    {
      id: "w6.lingyi", cat: "家族", title: "徙陵", age: [20, 60], weight: 12,
      years: [-140, -50],
      text: [
        "朝廷要徙民实{{陵邑|为奉陵而设的县，徙富户实之，便于控制}}。家产满三百万的，都要迁。",
        "你家的田宅都在原籍。迁了，地要贱卖。"
      ],
      options: [
        { text: "迁", hint: "银钱 −20；京郊有宅", effects: [{ k: "silver", v: -20 }, { k: "fame", v: 6 }], then: "地贱卖了，宅子换成了陵邑里的一区小院。邻居都是各地迁来的富户，谁也不必看不起谁。" },
        { text: "分家，把家产拆到三百万以下", hint: "声望 −4；田 −4", effects: [{ k: "field_wet", v: -2 }, { k: "field_dry", v: -2 }, { k: "fame", v: -4 }, { k: "favor", v: 4 }], then: "你把田分给了两个弟弟，自己只留一半。吏来核过，说不够数，就走了。" },
        { text: "托人打点，留在原籍", need: { minSilver: 15 }, hint: "银钱 −15；留住田宅", effects: [{ k: "silver", v: -15 }, { k: "official", v: 4 }], then: "钱递上去，名册上你的名字被划了。同乡迁走那天，你去送，没人跟你说话。" }
      ]
    },
    {
      id: "w6.niuyi", cat: "生计", title: "牛", age: [18, 65], weight: 12,
      text: [
        "{{牛籍|汉律，盗牛者死；牛老病，须报官，不得私杀}}。",
        "你家那头牛，前腿折了，站不起来。"
      ],
      options: [
        { text: "报官，等官来处理", hint: "粮 −4；无祸", effects: [{ k: "grain", v: -4 }, { k: "official", v: 2 }], then: "吏来看了，说这牛还可养。养了两个月，牛死了，皮归官。" },
        { text: "私下杀了，分肉", hint: "粮 +6；或有罪", effects: [{ k: "grain", v: 6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "body", v: -12 }, { k: "fame", v: -10 }], loseNote: "有人告了。私杀耕牛，论死，减为城旦。" }, then: "夜里杀的。血接了半盆，肉分了给三家乡邻，都说将来还。" },
        { text: "请兽医来治", need: { minSilver: 3 }, hint: "银钱 −3；或有救", effects: [{ k: "silver", v: -3 }], gamble: { winChance: 0.5, win: [{ k: "grain", v: 4 }], lose: [], loseNote: "牛还是站不起来。" }, then: "兽医把腿骨接了，用木板夹住。牛躺了四十天，居然站起来了。" }
      ]
    }

  ]);

  /* ══════════ 新 ══════════ */
  B.eraEvents.xin = (B.eraEvents.xin || []).concat([

    {
      id: "x6.liuguan", cat: "市井", title: "六筦", age: [14, 65], weight: 15,
      years: [10, 23],
      text: [
        "{{六筦|王莽设六筦之令，盐、铁、酒、铸钱、名山大川、五均赊贷皆归官}}。",
        "连在山里砍柴、河里捕鱼，都要交钱。吏在渡口设了卡。"
      ],
      options: [
        { text: "照交", hint: "银钱 −4；无祸", effects: [{ k: "silver", v: -4 }], then: "每次过卡，交三文。你算过，一年下来是二百多文，够买一石米。" },
        { text: "绕山路走", hint: "身体 −6；省下钱", effects: [{ k: "body", v: -6 }, { k: "silver", v: 3 }], then: "多走十五里。山路上有蛇，也有别人的脚印。" },
        { text: "与卡上的吏分钱", hint: "银钱 +5；或被告", effects: [{ k: "silver", v: 5 }, { k: "official", v: 4 }], gamble: { winChance: 0.55, win: [], lose: [{ k: "fame", v: -10 }, { k: "silver", v: -12 }], loseNote: "上头来查，吏把你推了出去，说都是你出的主意。" }, then: "你每月给他二百文，他放你的货过去。这样过了两年。" }
      ]
    },
    {
      id: "x6.dahuang", cat: "世变", title: "大饥", age: [10, 70], weight: 20, once: true,
      years: [15, 23],
      text: [
        "关东大饥，人相食。",
        "你家的粮吃到三月就没了。村里开始有人吃树皮，后来树皮也没有了。"
      ],
      options: [
        { text: "往南逃荒", hint: "身体 −14；或能活", effects: [{ k: "body", v: -14 }, { k: "grain", v: -3 }], gamble: { deathChance: 0.2, cause: "饿殍" }, then: "走了二十天。路上见过一个母亲，把孩子的尸体放在路边，自己往前走了。" },
        { text: "留在村里等赈", hint: "身体 −16；或有粮到", effects: [{ k: "body", v: -16 }], gamble: { deathChance: 0.22, cause: "饿殍" }, then: "官仓开过两次。第一次每人三升，第二次没有开。" },
        { text: "把家里最后的地卖了换粮", hint: "田 −6；粮 +8", effects: [{ k: "field_wet", v: -3 }, { k: "field_dry", v: -3 }, { k: "grain", v: 8 }], then: "两亩水田换了八斗粟。买主是本村的富户，他说这价钱已经是行善了。" }
      ]
    },
    {
      id: "x6.zishu", cat: "生计", title: "自鬻", age: [12, 55], weight: 14, years: [15, 23],
      text: [
        "城门口有人卖自己。卖身为奴，得粮三石。",
        "你站在那里看了半天。旁边一个汉子已经把自己卖出去了，正在按手印。"
      ],
      options: [
        { text: "卖", hint: "粮 +3；从此为奴", effects: [{ k: "grain", v: 3 }, { k: "fame", v: -14 }, { k: "body", v: -4 }], setFlag: ["slave"], then: "手印按下去，你就是他家的人了。主人给了三石粟，你背回家，一路没抬头。" },
        { text: "不卖，去挖野菜", hint: "身体 −8；粮 +1", effects: [{ k: "body", v: -8 }, { k: "grain", v: 1 }], then: "挖了三天，挖到一小筐。煮出来是绿的，吃下去肚子疼。" },
        { text: "卖儿", need: { flagHas: ["married"] }, hint: "粮 +4；声望 −25", effects: [{ k: "grain", v: 4 }, { k: "fame", v: -25 }, { k: "grudge", v: 10 }], setFlag: ["sold_child"], then: "买主看了看孩子的牙口，像看一头小牲口。孩子没哭，只是抓着你的衣角。" }
      ]
    },
    {
      id: "x6.bishi", cat: "方外", title: "避世", age: [14, 60], weight: 11, when: { minKnowledge: 30 },
      years: [9, 23],
      text: [
        "天下改号，士人多有不应征召者。",
        "有人劝你入山：不仕新朝，也算留个名。"
      ],
      options: [
        { text: "入山", hint: "声望 +10；身体 −6", effects: [{ k: "fame", v: 10 }, { k: "body", v: -6 }, { k: "knowledge", v: 5 }], setFlag: ["hermit"], then: "你在山里结庐，种了二亩豆。有人来请，你都说不识时务。" },
        { text: "出仕新朝", hint: "官职 +6；声望 −8", effects: [{ k: "official", v: 6 }, { k: "fame", v: -8 }], then: "你受了印。回家那天，父亲把门关了，隔着门说了一句「你自己想清楚」。" },
        { text: "不仕不隐，在家教书", hint: "学识 +4；声望 +3", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 3 }, { k: "silver", v: 2 }], then: "你收了七个学生，教的是《论语》。束脩不多，够吃饭。" }
      ]
    },
    {
      id: "x6.gaibi", cat: "市井", title: "错刀", age: [14, 65], weight: 14,
      years: [7, 23],
      text: [
        "{{错刀|王莽所铸刀币，一刀值五千钱}}、契刀、大钱，一并行用。",
        "昨日还能买一石米的钱，今日只够买三升。"
      ],
      options: [
        { text: "把手里的钱都换成粮", hint: "银钱 −8；粮 +6", effects: [{ k: "silver", v: -8 }, { k: "grain", v: 6 }], then: "你把钱全买了粟，堆在屋里。两个月后，米价又涨了一倍。" },
        { text: "囤钱，等它涨", hint: "银钱 −5；或有损失", effects: [{ k: "silver", v: -5 }], gamble: { winChance: 0.3, win: [{ k: "silver", v: 12 }], lose: [], loseNote: "钱废了，一堆铜。" }, then: "你把钱罐埋在床下。埋的时候想，钱总是钱。" },
        { text: "以物易物，不用钱了", hint: "银钱 −2；粮 +3", effects: [{ k: "silver", v: -2 }, { k: "grain", v: 3 }, { k: "fame", v: 2 }], then: "你用一匹布换了三斗米，用一把锄头换了一只鸡。钱在手里，反倒没人要。" }
      ]
    },
    {
      id: "x6.lvlin", cat: "世变", title: "入伙", age: [14, 50], weight: 16, sex: "male",
      years: [17, 23],
      text: [
        "绿林兵过境，沿途招人。",
        "领头的说：跟着走，有饭吃；不跟，家里的粮反正也留不住。"
      ],
      options: [
        { text: "跟着走", hint: "兵 +40；身体 −8", effects: [{ k: "troops", v: 40 }, { k: "body", v: -8 }, { k: "fame", v: -6 }], setFlag: ["rebel"], gamble: { deathChance: 0.2, cause: "战殁" }, then: "你领了一把刀。刀是旧的，刃上有豁口，不知道杀过谁。" },
        { text: "躲进山里", hint: "身体 −7；粮 −4", effects: [{ k: "body", v: -7 }, { k: "grain", v: -4 }], then: "你带着全家躲了两个月。下山时，村子烧了一半，你家的房子还在。" },
        { text: "献粮，求他们过门不入", hint: "粮 −8；保住村子", effects: [{ k: "grain", v: -8 }, { k: "fame", v: 8 }, { k: "favor", v: 6 }], then: "你把家里存的粟都搬了出去。领头的人看了一眼，说：「这村子不用进了。」" }
      ]
    },
    {
      id: "x6.kunyang2", cat: "军旅", title: "昆阳后", age: [14, 55], weight: 15, sex: "male",
      years: [23, 24],
      text: [
        "昆阳一战，新军大溃。",
        "战场上留下的东西，比一个村子的人还多。"
      ],
      options: [
        { text: "去捡兵器甲胄", hint: "银钱 +12；或有兵来", effects: [{ k: "silver", v: 12 }, { k: "troops", v: 10 }], gamble: { deathChance: 0.12, cause: "兵乱" }, then: "你捡了两副甲、四把刀，用草席裹着背回去。路上遇见三拨人，都以为是逃兵。" },
        { text: "去掩埋尸体", hint: "声望 +10；身体 −6", effects: [{ k: "fame", v: 10 }, { k: "body", v: -6 }], then: "挖了七天的坑。埋不过来，后来就堆在一处，上面盖了土。" },
        { text: "回家，什么都不管", hint: "无得失", effects: [], then: "你绕了三十里路回家。家里人都还在，锅里的粥还热着。" }
      ]
    },
    {
      id: "x6.liangjin", cat: "世变", title: "粮尽", age: [14, 70], weight: 15, years: [23, 25],
      text: [
        "更始军入长安，城中粮尽。",
        "宫里的米吃完了，街上开始有人卖人肉，价钱比米便宜。"
      ],
      options: [
        { text: "跟着溃兵出城", hint: "身体 −12；或有生机", effects: [{ k: "body", v: -12 }], gamble: { deathChance: 0.2, cause: "兵乱" }, then: "出城那日，城门只开了一半。人挤人，有人被踩在下面。" },
        { text: "闭门不出，吃存粮", hint: "粮 −10；或撑过去", effects: [{ k: "grain", v: -10 }], gamble: { deathChance: 0.14, cause: "饿殍" }, then: "你把门用石磨顶住。窗外有人敲门，敲了三夜，后来就没声了。" },
        { text: "投靠有粮的大户", hint: "声望 −8；混口饭", effects: [{ k: "fame", v: -8 }, { k: "favor", v: 8 }], then: "你去了城东的李家。他家的墙比城墙还厚，门里堆着三年的粮。" }
      ]
    },
    {
      id: "x6.guiming", cat: "天下", title: "归汉", age: [16, 70], weight: 14, years: [25, 30],
      text: [
        "新朝亡了。各处都在归附，官吏改换印绶。",
        "你手里也有一方旧印。"
      ],
      options: [
        { text: "献印归汉", hint: "官职 +4；保住性命", effects: [{ k: "official", v: 4 }, { k: "fame", v: 3 }], then: "你把印交上去。收印的人看了一眼，说：「新朝的印，倒还新。」" },
        { text: "把印熔了，换成钱", hint: "银钱 +10；无官", effects: [{ k: "silver", v: 10 }], then: "铜印熔成一小块，卖了十两。你在心里跟自己说，这东西从来也不算你的。" },
        { text: "藏起来，谁也不说", hint: "或有后患", effects: [{ k: "luck", v: -4 }], setFlag: ["hid_seal"], then: "你把印埋在灶下。此后很多年，每逢有人来查籍，你都会想起灶下那块铜。" }
      ]
    },
    {
      id: "x6.zhongtian", cat: "生计", title: "荒田", age: [18, 60], weight: 13, years: [20, 30],
      text: [
        "乱后田荒，官上招人开垦：谁种归谁，三年不纳租。",
        "只是那些田，原先都是有主的。"
      ],
      options: [
        { text: "去开", hint: "田 +12；或有争", effects: [{ k: "field_wet", v: 6 }, { k: "field_dry", v: 6 }, { k: "body", v: -8 }], gamble: { winChance: 0.7, win: [], lose: [{ k: "fame", v: -8 }, { k: "silver", v: -6 }], loseNote: "原主回来了，带着族人。官上判你还田，种子钱不退。" }, then: "荒了五年的田，草长得比人高。你割了半个月，才看见土。" },
        { text: "不去，田是别人的", hint: "声望 +4；无田", effects: [{ k: "fame", v: 4 }], then: "你没去。后来去的人里，有一半和回来的原主打了官司。" },
        { text: "去开，但先找里正立字据", hint: "田 +8；花的钱多", effects: [{ k: "field_wet", v: 4 }, { k: "field_dry", v: 4 }, { k: "silver", v: -5 }], then: "字据上写明四至、原主、年限。里正押了印。三年后原主回来，看了字据，没话说。" }
      ]
    }

  ]);

})(window.PACK_BASE);
