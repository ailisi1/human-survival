/* 生在何朝 · 宗族卷
 * ────────────────────────────────────────────────
 * 为什么单立一卷：
 *   全库 cat:"宗族" 只有 38 条，且多集中在「分家」一处。
 *   但一个人的田、婚、葬、讼、名声，几乎都从宗族里来——
 *   族田、义庄、修谱、械斗、出继、招赘、立嗣、族规，这些不是背景，
 *   是那个年月真正管着你的东西。县官三年一换，族长一辈子不换。
 *
 * 男女皆可抽（除注明 sex 者）。分阶层用 classIn。
 * id 一律 c98. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 族产 ══════════ */

    {
      id: "c98.zutian", cat: "宗族", title: "族田", age: [26, 64], weight: 12, once: true,
      classIn: ["royal", "noble", "official_mid", "gentry", "merchant"],
      text: [
        "族长来了，带了一壶酒。",
        "他说族里要置一处祭田，收的租子供春秋两祭、助学、济贫。",
        "「你有余力，该出一份。」他没说多少，只看着你。"
      ],
      options: [
        { text: "捐十亩", hint: "田 −10；声望 +10", effects: [{ k: "field_wet", v: -10 }, { k: "fame", v: 10 }], then: "契纸写好，刻在祠堂的石上。此后族中议事，你坐第三把椅子。" },
        { text: "捐三亩，意思到了", hint: "田 −3；声望 +3", effects: [{ k: "field_wet", v: -3 }, { k: "fame", v: 3 }], then: "族长收下了，说了句「有心」。石上也刻了你的名字，刻得比别人的浅。" },
        { text: "推说今年歉收", hint: "声望 −5；田保住", effects: [{ k: "fame", v: -5 }], then: "族长把酒喝了，没再提。第二年族里分胙肉，你家那份薄了一片。" }
      ]
    },
    {
      id: "c98.yizhuang", cat: "宗族", title: "义庄", age: [32, 66], weight: 8, once: true,
      classIn: ["royal", "noble", "official_mid", "gentry", "merchant"],
      when: { minSilver: 40 },
      text: [
        "族中穷人多。年年冬天有人来借粮，借了不还，也不好讨。",
        "有人提起前朝范氏的做法：置田千亩，名为义庄，租入赡族——婚丧有给，孤寡有养。",
        "族人看着你。{{义庄|北宋范仲淹于皇祐二年置苏州范氏义庄，赡族千年，为后世宗族仿效}}"
      ],
      options: [
        { text: "拿出大半家产办义庄", hint: "银钱 −30；声望 +16", effects: [{ k: "silver", v: -30 }, { k: "fame", v: 16 }], then: "义庄立了规矩，刻在木榜上：嫁女给五贯，娶妇给三贯，丧葬有差。你死以后，这规矩还在。" },
        { text: "每年冬施一次粥", hint: "银钱 −6；声望 +5", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 5 }], then: "腊月里在祠堂门口支两口锅，一人一碗。来的人排队，从门口排到田埂上。" },
        { text: "不办，自家的日子要紧", hint: "声望 −4", effects: [{ k: "fame", v: -4 }], then: "你什么也没办。那年冬天特别冷，族里没了一个老人，是冻死的。" }
      ]
    },
    {
      id: "c98.jisi", cat: "宗族", title: "祭田的租", age: [30, 68], weight: 9, once: true,
      text: [
        "族中祭田三十亩，每年收租四十石，用来办春秋两祭。",
        "你算了一下账：祭品用去十二石，剩下的二十八石，不知去向。",
        "管账的是族长的儿子。"
      ],
      options: [
        { text: "在祠堂当众问", hint: "声望 +4；或有祸", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.45, win: [{ k: "silver", v: 6 }], lose: [{ k: "fame", v: -8 }], loseNote: "族长说：「你在族中算什么。」那年族里的差事，一件也不派给你。" }, then: "你把账念了一遍。祠堂里很静。族长说：「明年换个管账的。」" },
        { text: "私下跟族长说", hint: "声望 +2；或有分润", effects: [{ k: "fame", v: 2 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 4 }], lose: [], loseNote: "族长说：「知道了。」此后没有下文，只是见你时点一下头。" }, then: "族长听完，说：「你是个明白人。」年底送了二石米到你家门口。" },
        { text: "不管", hint: "无得失", effects: [], then: "你什么也没说。第二年祭祖，供桌上的鱼比往年少了一尾。" }
      ]
    },
    {
      id: "c98.fenshan", cat: "宗族", title: "坟山", age: [26, 72], weight: 9, once: true,
      text: [
        "族里的坟山在村北，葬了七代。",
        "山脚下那户人家在上面开了一片地，种了红薯，说这山是他家的。",
        "族中老人说：「动坟山，是要拼命的。」"
      ],
      options: [
        { text: "告官", hint: "银钱 −6；或有转机", effects: [{ k: "silver", v: -6 }], gamble: { winChance: 0.5, win: [{ k: "fame", v: 8 }], lose: [{ k: "silver", v: -3 }, { k: "fame", v: -4 }], loseNote: "县官说：「山界无凭。」让他种完了那一季。" }, then: "你带了族中六个人上堂。县官查了鱼鳞图册，判还坟山，罚他赔谷五石。" },
        { text: "夜里带人把地翻了", hint: "身体 −6；声望 +6", effects: [{ k: "body", v: -6 }, { k: "fame", v: 6 }], gamble: { deathChance: 0.06, cause: "械斗" }, then: "二十几个人，扛着锄头上了山。红薯苗翻了一地。第二天那家来看了，没敢作声。" },
        { text: "让出一块，换他不再往上开", hint: "声望 −6；免了争执", effects: [{ k: "fame", v: -6 }], then: "你跟他立了字据：山下那块归他，山上不许再动。族人骂你软弱，可也没人再去闹。" }
      ]
    },

    /* ══════════ 族内 ══════════ */

    {
      id: "c98.xupu", cat: "宗族", title: "修谱", age: [24, 68], weight: 11, once: true,
      text: [
        "族里要重修族谱，三十年一修。",
        "修谱要钱：刻版、纸墨、请人纂写，摊到各房，一房三两。",
        "族长说：「谱上有名字的，才算这一族的人。」"
      ],
      options: [
        { text: "出钱，多出一份", hint: "银钱 −5；声望 +7", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 7 }], then: "谱修成，你这一支写在第十三卷。你的名字下头，注了「某某之子，娶某氏」。" },
        { text: "出钱，只出该出的", hint: "银钱 −3；声望 +2", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }], then: "谱上有你。翻到那一页，你的名字和兄弟挤在一行里。" },
        { text: "出不起", hint: "声望 −6；或仍录入", effects: [{ k: "fame", v: -6 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -4 }], loseNote: "谱成之后，你查了三遍，这一支只写了一个「某」字，下面注「失考」。" }, then: "族长说：「那就记一笔「外出」罢。」谱上留了你的位置，只写了姓。" }
      ]
    },
    {
      id: "c98.chuji", cat: "宗族", title: "出继", age: [4, 13], weight: 9, once: true,
      text: [
        "伯父没有儿子。族中议了三天，定下把你过继过去。",
        "过继要改口，叫伯父「爹」，叫生父「伯」。",
        "生母在灶间抹眼泪，说：「还是一家人，就是换了个屋。」"
      ],
      options: [
        { text: "过去", hint: "银钱 +6；换一支香火", effects: [{ k: "silver", v: 6 }, { k: "flag", v: "adopted" }], then: "你搬进了伯父家。他家的屋比你家大三间，饭也稠些。你管生父叫了二十年「伯」。" },
        { text: "哭闹着不肯", hint: "声望 −4；身体 −4", effects: [{ k: "fame", v: -4 }, { k: "body", v: -4 }], then: "你在地上滚了半个时辰。族中长辈说：「这孩子认生，另议罢。」最后过继的是堂弟。" },
        { text: "过去，但要生父家留一份田给你", hint: "学识 +2；或有争", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.5, win: [{ k: "field_wet", v: 4 }], lose: [{ k: "fame", v: -5 }], loseNote: "生父说：「过继出去的人，还来分田？」族中人都笑，话传了很多年。" }, then: "字据上写明：日后分家，你仍得三亩。族中长辈按了手印。" }
      ]
    },
    {
      id: "c98.zhaozhui", cat: "宗族", title: "入赘", age: [17, 32], weight: 8, once: true,
      sex: "male", classIn: ["farmer", "tenant", "base"],
      text: [
        "家里兄弟四个，田只有八亩。分到你头上，二亩。",
        "邻村一户人家只有一个女儿，要招一个上门女婿。",
        "媒人说：「去了就是他家的人。生了儿子，姓他家的姓。」{{入赘|秦汉称「赘婿」，地位近于奴婢，不得为吏；明清犹为人轻}}"
      ],
      options: [
        { text: "去", hint: "银钱 +5；改姓", effects: [{ k: "silver", v: 5 }, { k: "fame", v: -6 }, { k: "flag", v: "uxorilocal" }], then: "你进了那家门，改了姓。村里孩子叫你「倒插门的」。你儿子姓他娘的姓。" },
        { text: "不去，出去做长工", hint: "银钱 +2；身体 −6", effects: [{ k: "silver", v: 2 }, { k: "body", v: -6 }], then: "你给镇上粮行扛了五年包，一包一百八十斤。攒下的钱，后来娶了一个寡妇。" },
        { text: "去，但讲明第二个儿子随本姓", hint: "学识 +3；或谈不成", effects: [{ k: "knowledge", v: 3 }], gamble: { winChance: 0.45, win: [{ k: "fame", v: 2 }], lose: [{ k: "fame", v: -4 }], loseNote: "那家老人说：「既要人，又要姓，天底下没有这样的事。」亲事作罢。" }, then: "字据上添了一行：「次子归宗。」你父亲听说后，把家里那只老母鸡杀了。" }
      ]
    },
    {
      id: "c98.juesi", cat: "宗族", title: "立嗣", age: [38, 70], weight: 10, once: true,
      text: [
        "你四十多了，没有儿子。",
        "族中已经有人在打算：你这一房的田，日后归谁。",
        "族长来问：「要不要从族中挑一个孩子养着？」"
      ],
      options: [
        { text: "从兄弟家过继一个", hint: "银钱 −5；声望 +6", effects: [{ k: "silver", v: -5 }, { k: "fame", v: 6 }], then: "过继的是三弟的次子，六岁。他叫你「爹」的那天，你在祠堂里坐了很久。" },
        { text: "收养一个外姓孩子", hint: "声望 −8；有人养老", effects: [{ k: "fame", v: -8 }, { k: "flag", v: "foreignHeir" }], then: "你从逃荒的人手里领了一个男孩。族中说：「异姓乱宗。」你说：「我这一支，总得有人上坟。」" },
        { text: "不立嗣，田捐给族里", hint: "田 −8；声望 +10", effects: [{ k: "field_wet", v: -8 }, { k: "fame", v: 10 }], then: "你把田写进祭田册。族中给你立了一块碑。碑上写「义捐」，没写你为什么没有儿子。" }
      ]
    },
    {
      id: "c98.zugui", cat: "宗族", title: "族规", age: [13, 62], weight: 10, once: true,
      text: [
        "族规写在祠堂的木榜上：不孝、盗窃、奸淫、赌博，各有罚。",
        "你犯了其中一条。族中开祠堂，叫你去。",
        "族长坐在上首，两边的长辈都不看你。"
      ],
      options: [
        { text: "认罚，跪着受", hint: "身体 −10；声望 +3", effects: [{ k: "body", v: -10 }, { k: "fame", v: 3 }], then: "打了二十板，跪了两个时辰。散的时候，族长说：「改了就好。」" },
        { text: "辩一句", hint: "声望 −5；身体 −4", effects: [{ k: "fame", v: -5 }, { k: "body", v: -4 }], then: "你说了一半，族长一拍桌子：「祠堂里没有你说话的份。」板子加了十下。" },
        { text: "请族中长辈替你说情", hint: "银钱 −4；或从轻", effects: [{ k: "silver", v: -4 }], gamble: { winChance: 0.55, win: [{ k: "body", v: -4 }], lose: [{ k: "fame", v: -6 }], loseNote: "求的那位长辈说：「这事我不好开口。」你到底还是挨了板子，又多背了一个「钻营」的名。" }, then: "长辈替你说了话。罚减一半，另罚在祠堂前跪一夜。" }
      ]
    },
    {
      id: "c98.citang", cat: "宗族", title: "祠堂议事", age: [22, 66], weight: 11, once: true,
      text: [
        "族中议事：邻村要修一条渠，从族里的田中间过。",
        "有人说让，能换几年的水；有人说不让，田是祖上传下来的。",
        "轮到你说话。屋里二十几双眼睛。"
      ],
      options: [
        { text: "主张让，换水", hint: "声望 +6；或有后患", effects: [{ k: "fame", v: 6 }], gamble: { winChance: 0.55, win: [{ k: "field_wet", v: 3 }], lose: [{ k: "field_wet", v: -5 }], loseNote: "渠修好了，水却先流邻村的田。族里的田在下游，还是旱。" }, then: "渠从田中间过，占了四分地。此后三年，族里的田没再旱过。" },
        { text: "主张不让", hint: "声望 +4；或有争", effects: [{ k: "fame", v: 4 }], gamble: { winChance: 0.5, win: [], lose: [{ k: "body", v: -8 }], loseNote: "邻村夜里带人来挖，族里人去看，打了一场，伤了四个。" }, then: "你说：「祖上的田，一寸也不能让。」族中老人点头。渠改了道，从山脚绕过去。" },
        { text: "不表态", hint: "声望 −3", effects: [{ k: "fame", v: -3 }], then: "你说了句「听长辈的」。散会时没人跟你说话。" }
      ]
    },
    {
      id: "c98.zuxue", cat: "学问", title: "族塾", age: [8, 20], weight: 10, once: true,
      text: [
        "族里有一处族塾，用祭田的租子请先生。",
        "族中子弟都能去，束脩免了，只管一顿午饭。",
        "先生姓陈，是落第的举人，讲书时爱拍桌子。"
      ],
      options: [
        { text: "认真读", hint: "学识 +8；身体 −3", effects: [{ k: "knowledge", v: 8 }, { k: "body", v: -3 }], then: "你在族塾读了六年。陈先生说你「笔下有骨」，把你的文章贴在墙上。" },
        { text: "读两年，回家干活", hint: "银钱 +2；学识 +3", effects: [{ k: "silver", v: 2 }, { k: "knowledge", v: 3 }], then: "你认得两千字，会记账，会写契。族中后来收租、写分书，都找你。" },
        { text: "不去，跟着匠人学手艺", hint: "身体 +2；银钱 +3", effects: [{ k: "body", v: 2 }, { k: "silver", v: 3 }], then: "你跟木匠学了三年。族塾那面墙上，从来没贴过你的名字。" }
      ]
    },
    {
      id: "c98.qianju", cat: "宗族", title: "迁", age: [22, 54], weight: 8, once: true,
      text: [
        "族中一支要迁走。地方是三百里外，听说那里地多，人少。",
        "族长不拦，只说：「迁出去的，清明还是要回来上坟。」",
        "你这一房人少田薄，去与不去，都在两可之间。"
      ],
      options: [
        { text: "迁", hint: "田 +6；声望 −5", effects: [{ k: "field_wet", v: 6 }, { k: "fame", v: -5 }], gamble: { deathChance: 0.08, cause: "道途" }, then: "走了十七天，路上埋了一个小的。到了地方，插草为界，开了十二亩荒地。" },
        { text: "留下", hint: "声望 +4；田 −2", effects: [{ k: "fame", v: 4 }, { k: "field_wet", v: -2 }], then: "你留下了。族里重新分了田，你家少了两亩，说是「人少了，用不着那么多」。" },
        { text: "先让长子去，自己留一年看看", hint: "学识 +2；两下兼顾", effects: [{ k: "knowledge", v: 2 }], gamble: { winChance: 0.5, win: [{ k: "silver", v: 3 }], lose: [{ k: "fame", v: -4 }], loseNote: "长子去了半年，写信回来说那里也不好。他回来时瘦了一圈，路上丢了行李。" }, then: "长子带了三个人先去。半年后捎信回来，说那边能种，就是水远。" }
      ]
    },

    /* ══════════ 名分 ══════════ */

    {
      id: "c98.yixing", cat: "宗族", title: "异姓", age: [24, 64], weight: 7, once: true,
      text: [
        "你养了一个孩子，是逃荒人家丢下的，不知姓什么。",
        "养了六年，跟自己生的没两样。",
        "今年修谱，族中说：「异姓不得入谱。」"
      ],
      options: [
        { text: "求族长通融，写进谱里", hint: "银钱 −4；或有转机", effects: [{ k: "silver", v: -4 }], gamble: { winChance: 0.35, win: [{ k: "fame", v: 6 }], lose: [{ k: "fame", v: -5 }], loseNote: "族长说：「谱是给血脉留的，不是给恩情留的。」孩子的名字到底没上去。" }, then: "族长破了一回例，在谱末附了一行：「养子某，附记。」附记不算正支，但总算有了名字。" },
        { text: "不写谱，自己给他立一份产业", hint: "银钱 −6；孩子有靠", effects: [{ k: "silver", v: -6 }], then: "你把三亩田写在他名下，请中人立了契。族中有人不服，你把契纸拍在桌上。" },
        { text: "送回本族去", hint: "声望 +3；心里空", effects: [{ k: "fame", v: 3 }], then: "打听到了他的本家，是邻县一个村子。送走那天，他一路没回头。" }
      ]
    },
    {
      id: "c98.zuzhang", cat: "宗族", title: "推为族长", age: [46, 72], weight: 6, once: true,
      when: { minFame: 30 },
      text: [
        "老族长死了。族中议了三天，推你接。",
        "当族长没有俸禄，只管三件事：祭祖、断事、对外。",
        "断事最麻烦：分家、争产、通奸、不孝，都到你这里为止，不上县衙。"
      ],
      options: [
        { text: "接", hint: "声望 +12；银钱 −4", effects: [{ k: "fame", v: 12 }, { k: "silver", v: -4 }], then: "你坐了祠堂上首那把椅子。此后十年，族中大小事，最后一句都是你说的。" },
        { text: "推给年长的族兄", hint: "声望 −3；清闲", effects: [{ k: "fame", v: -3 }], then: "族兄接了。他断事偏软，三年后族里分成两派，见面对骂。" },
        { text: "接，但要求族中先立几条明白规矩", hint: "学识 +4；声望 +8", effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 8 }], gamble: { winChance: 0.6, win: [], lose: [{ k: "fame", v: -5 }], loseNote: "长辈说：「祖宗没这样办过。」规矩没立成，你也没接。" }, then: "你写了十二条，刻在木榜上，念给全族听。此后再断事，你只说一句：「榜上写着。」" }
      ]
    },
    {
      id: "c98.guizong", cat: "宗族", title: "归宗", age: [32, 70], weight: 6, once: true,
      text: [
        "你祖父那一辈迁出去的，如今这一支在外头已经三代。",
        "你回来了，带着族谱的抄本、祖父的牌位。",
        "族长看了半天，说：「谱上有你祖父的名字。」"
      ],
      options: [
        { text: "认祖归宗，置一份祭田", hint: "银钱 −8；声望 +8", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 8 }], then: "族人领你上坟。祖父的坟在第七排，草长得高。你跪下磕了头，草叶割了脸。" },
        { text: "只把祖父的牌位送进祠堂", hint: "银钱 −3；声望 +4", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 4 }], then: "牌位搁在左厢第三层。你每年回来一次，上一炷香就走。" },
        { text: "看看就走", hint: "无得失", effects: [], then: "你在坟前站了一刻钟，没烧纸。族中人说：「外面的人，心是凉的。」" }
      ]
    },
    {
      id: "c98.xiedou", cat: "宗族", title: "械斗", age: [18, 52], weight: 8, once: true, sex: "male",
      text: [
        "两族为一条水渠争了三十年。今年大旱，水只够浇一头的田。",
        "族长敲了祠堂的锣。男人都去，带上锄头、扁担、鸟铳。",
        "你娘拉着你的袖子，你爹说：「不去，往后在族里抬不起头。」"
      ],
      options: [
        { text: "去", hint: "声望 +10；或有死", effects: [{ k: "fame", v: 10 }, { k: "body", v: -8 }], gamble: { deathChance: 0.14, cause: "械斗" }, then: "两百多人在渠边打了半日。你头上挨了一扁担，缝了七针。水，对半分。" },
        { text: "装病不去", hint: "声望 −12；身体 +2", effects: [{ k: "fame", v: -12 }, { k: "body", v: 2 }], then: "你在床上躺了三天。伤的人回来，族里摆酒，没人叫你。此后十年，族中议事没你的位置。" },
        { text: "去，但只站在后头", hint: "声望 +3；身体 −2", effects: [{ k: "fame", v: 3 }, { k: "body", v: -2 }], then: "你站在最后头，手里攥着扁担没抡出去。回来族长看了你一眼，什么也没说。" }
      ]
    }
  );
})(window.PACK_BASE);
