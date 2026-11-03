/* 生在何朝 · 共同底本（六续）：婚配与宗族
 * 聘财、妆奁、媒钱、童养、换亲、守节、出妻、析产、立嗣、祠堂、修谱。
 * 这一卷写的不是「礼」，是礼底下那笔账：谁出钱，谁出力，谁被写进谱，谁没写。
 * 记事体。成亲不是喜事，是两家谈成的一笔交易，说清楚才好。
 * id 一律以 c6. 打头。
 */
(function (B) {
  "use strict";
  B.common = B.common || [];
  B.common.push(

    /* ══════════ 议 ══════════ */
    {
      id: "c6.wenming", cat: "家族", title: "问名", age: [13, 20], weight: 18, sex: "male",
      text: [
        "媒人来了，说东村某家有个女儿，十六岁，会织会炊，家里有田二十亩。",
        "母亲问的是生辰，父亲问的是聘财。两样都要问。"
      ],
      options: [
        { text: "应下，走六礼", hint: "银钱 −10；成家", effects: [{ k: "silver", v: -10 }, { k: "favor", v: 5 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 16 } }],
          then: "纳采、问名、纳吉、纳征、请期、亲迎。六礼走完，是三个月的事。" },
        { text: "再相看别家", hint: "无得失", effects: [{ k: "luck", v: 1 }] },
        { text: "先问一句她愿不愿意", hint: "或被笑", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 2 }],
          then: "媒人愣了一下，说：「相公这话，我没法回。」" }
      ]
    },

    {
      id: "c6.pincai", cat: "家族", title: "聘财", age: [14, 25], weight: 16,
      text: [
        "两家议定了，女方要聘财二十两，另加布四匹、酒两坛、鹅一对。",
        "你家拿得出十二两。差的那八两，要么借，要么去说。"
      ],
      options: [
        { text: "去借", hint: "银钱 +8；负债", effects: [{ k: "silver", v: 8 }, { k: "debt", v: { amt: 10, rate: 0.06, dueYears: 2 } }],
          then: "钱凑齐了。红纸包着抬过去，抬的人回来了，债主也记住了门。" },
        { text: "托媒人去减", hint: "或有成；或散", effects: [],
          gamble: { winChance: 0.55, win: [{ k: "favor", v: 4 }], lose: [{ k: "fame", v: -4 }, { k: "favor", v: -3 }],
            loseNote: "女方说：「既这样，就算了。」媒人来回跑了三趟，最后一趟没进门。" } },
        { text: "换一家不要聘财的", hint: "成家；门第低些", effects: [{ k: "fame", v: -3 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 18 } }],
          then: "那家不要聘财，只要人老实。你去了，她家在河那边，屋子比你家还旧。" }
      ]
    },

    {
      id: "c6.zhuanglian", cat: "家族", title: "妆奁", age: [14, 22], weight: 15, sex: "female",
      text: [
        "你要出嫁了。家里给你备的妆奁：两只箱子、两床被、一副银镯，还有田三亩作陪嫁。",
        "母亲说：「妆奁厚的，到了人家腰杆直。」"
      ],
      options: [
        { text: "把田留下给弟弟", hint: "娘家记恩；婆家轻看", effects: [{ k: "favor", v: 6 }, { k: "fame", v: -3 }],
          then: "你把那三亩田的契留在了家里。上轿时，母亲没敢看你。" },
        { text: "照数带走", hint: "腰杆直；弟弟有怨", effects: [{ k: "silver", v: 6 }, { k: "grudge", v: 5 }] },
        { text: "把银镯留给妹妹", hint: "姐妹情深；妆奁薄", effects: [{ k: "favor", v: 5 }, { k: "silver", v: -2 }] }
      ]
    },

    {
      id: "c6.meiqian", cat: "市井", title: "媒钱", age: [16, 60], weight: 12,
      text: [
        "你替两家说成了一门亲。按规矩，男家给媒钱二两，女家给一两，另有鞋钱、茶钱。",
        "男家说：「事成了自然有谢。」女家说：「我们没请你。」"
      ],
      options: [
        { text: "去要", hint: "银钱 +3；结怨", effects: [{ k: "silver", v: 3 }, { k: "grudge", v: 5 }, { k: "fame", v: -2 }] },
        { text: "不要，攒人情", hint: "交游广", effects: [{ k: "favor", v: 7 }],
          then: "两家后来都念你的好。往后你说话，比媒钱值钱。" },
        { text: "去要一半", hint: "银钱 +1；名声不坏", effects: [{ k: "silver", v: 1 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "c6.tongyang", cat: "家族", title: "童养", age: [8, 18], weight: 13,
      text: [
        "邻村有家抱了个女娃来养，说是将来给儿子做媳妇。今年女娃十二，儿子九岁。",
        "那家让人来问：你家女儿，愿不愿意也这样送去一家？"
      ],
      options: [
        { text: "送", hint: "少一张嘴；女儿不必归", effects: [{ k: "grain", v: 6 }, { k: "favor", v: -6 }],
          then: "她走那天，把一只草编的蚱蜢塞给你，说：「哥哥留着。」" },
        { text: "不送，自己养", hint: "粮紧；心不亏", effects: [{ k: "grain", v: -6 }, { k: "fame", v: 3 }] },
        { text: "送去但讲明：不做媳妇，只做工", hint: "或有争", effects: [{ k: "grain", v: 3 }],
          gamble: { winChance: 0.5, win: [{ k: "favor", v: 3 }], lose: [{ k: "grudge", v: 6 }, { k: "favor", v: -4 }],
            loseNote: "那家说：「既送来，就由我们。」" } }
      ]
    },

    {
      id: "c6.huanqin", cat: "家族", title: "换亲", age: [15, 25], weight: 12,
      text: [
        "两家都穷，都出不起聘财。有人来提：你妹妹嫁他家，他家女儿嫁你，两不花钱。",
        "妹妹在灶间听见了，一直没抬头。"
      ],
      options: [
        { text: "答应", hint: "成家；妹妹未必愿意", effects: [{ k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }, { k: "favor", v: -4 }],
          then: "两顶轿子同一天出门，一顶往东，一顶往西。妹妹上轿时没哭。" },
        { text: "不答应", hint: "仍无妻；妹妹记得", effects: [{ k: "favor", v: 5 }, { k: "fame", v: 2 }] },
        { text: "答应，但先去问妹妹", hint: "或有转", effects: [{ k: "favor", v: 3 }],
          gamble: { winChance: 0.45, win: [{ k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }], lose: [{ k: "favor", v: 2 }, { k: "fame", v: -1 }],
            loseNote: "妹妹说：「哥，我不去。」你就没再提。" } }
      ]
    },

    {
      id: "c6.chongxi", cat: "家族", title: "冲喜", age: [14, 30], weight: 10,
      text: [
        "家里老人病重，郎中说也就这几天。族里有人说：办一场喜事，冲一冲。",
        "新妇还没过门，日子本来定在明年。"
      ],
      options: [
        { text: "提前娶", hint: "银钱 −8；老人或有转", effects: [{ k: "silver", v: -8 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }],
          gamble: { winChance: 0.35, win: [{ k: "favor", v: 6 }, { k: "fame", v: 4 }], lose: [{ k: "favor", v: 2 }],
            loseNote: "喜事办完第三天，人还是走了。" } },
        { text: "不冲，照旧日子", hint: "无得失", effects: [{ k: "favor", v: -2 }] },
        { text: "只办一桌，不惊动邻里", hint: "银钱 −3；族里说不像", effects: [{ k: "silver", v: -3 }, { k: "fame", v: -2 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 17 } }] }
      ]
    },

    /* ══════════ 守与出 ══════════ */
    {
      id: "c6.shoujie", cat: "宗族", title: "守节", age: [18, 55], weight: 14, sex: "female",
      text: [
        "丈夫没了。你今年二十四，没有儿子，只有一间屋和两亩薄田。",
        "族里来说：「守着，族里给你立牌坊；再嫁，田归族中。」"
      ],
      options: [
        { text: "守", hint: "田保住；此后孤苦", effects: [{ k: "field_dry", v: 2 }, { k: "body", v: -4 }, { k: "fame", v: 8 }],
          then: "你在门内过了三十年。族谱上你的名字后面写「节」。就一个字。" },
        { text: "再嫁", hint: "田归族；有人可依", effects: [{ k: "field_dry", v: -4 }, { k: "fame", v: -6 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 34 } }],
          then: "你嫁到邻县。走的那天，族里的人在门口站着，没人说话。" },
        { text: "招夫上门", hint: "田保住；族里不容", effects: [{ k: "grudge", v: 8 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 30 } }],
          then: "人招进来了，姓不改，孩子随前夫的姓。族里为此开了三次祠堂。" }
      ]
    },

    {
      id: "c6.naqie", cat: "家族", title: "纳妾", age: [25, 60], weight: 11, sex: "male",
      text: [
        "你成家多年，只有一女。母亲说：「总要有个儿子。」",
        "有人来提：城南一户人家的女儿，十八岁，愿意做小，身价三十两。"
      ],
      options: [
        { text: "纳", hint: "银钱 −14；家里不平", effects: [{ k: "silver", v: -14 }, { k: "addPerson", v: { role: "concubine", rel: "妾", age: 18 } }, { k: "favor", v: -5 }],
          then: "她进门那天，正妻在灶间坐了一夜，没点灯。" },
        { text: "过继族中侄儿", hint: "银钱 −5；有后", effects: [{ k: "silver", v: -5 }, { k: "favor", v: 4 }, { k: "flag", v: "adopted_heir" }] },
        { text: "不纳，就一个女儿", hint: "族里议论", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 3 }],
          then: "母亲哭了一场，后来不说了。女儿五岁就会背《千字文》。" }
      ]
    },

    {
      id: "c6.chuqi", cat: "家族", title: "出妻", age: [20, 60], weight: 10, sex: "male",
      text: [
        "妻子嫁来五年，无子。母亲说她「不顺」，要你写休书。",
        "七出之条，无子为其一。但她也说过：三年无子才该出，如今才五年，看过郎中。"
      ],
      options: [
        { text: "写休书", hint: "母亲满意；名声两极", effects: [{ k: "favor", v: 3 }, { k: "fame", v: -4 }, { k: "grudge", v: 6 }],
          then: "休书四行字。她收好，回房把自己的东西打成一个小包。" },
        { text: "不写，顶着", hint: "母亲不悦；妻记恩", effects: [{ k: "favor", v: -4 }, { k: "fame", v: 4 }],
          then: "母亲三天没和你说话。妻子在灯下缝你的旧袄，缝到很晚。" },
        { text: "分居另住，两不写", hint: "银钱 −6；家不成家", effects: [{ k: "silver", v: -6 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "c6.jishi", cat: "家族", title: "继室", age: [30, 65], weight: 10,
      text: [
        "前头的妻子病故，留下两个孩子，一个七岁，一个四岁。",
        "有人来说亲：一个未嫁的姑娘，二十一岁，肯来；还有一个寡妇，三十岁，也肯来，带一个孩子。"
      ],
      options: [
        { text: "娶未嫁的", hint: "银钱 −10；新人难做后母", effects: [{ k: "silver", v: -10 }, { k: "addPerson", v: { role: "wife", rel: "继室", age: 21 } }],
          then: "她进门第一天，小的那个孩子不肯叫她。" },
        { text: "娶寡妇", hint: "银钱 −3；两个家并一个", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 3 }, { k: "addPerson", v: { role: "wife", rel: "继室", age: 30 } }] },
        { text: "不再娶，自己带", hint: "身体 −6；孩子亲", effects: [{ k: "body", v: -6 }, { k: "favor", v: 5 }] }
      ]
    },

    {
      id: "c6.taohun", cat: "家族", title: "逃婚", age: [14, 22], weight: 9, sex: "female",
      text: [
        "家里定了亲，男方大你二十岁，是个死了两任妻子的粮商。聘财已收了。",
        "迎亲的日子在下月初三。"
      ],
      options: [
        { text: "走", hint: "身体 −8；此后无家", effects: [{ k: "body", v: -8 }, { k: "favor", v: -8 }, { k: "flag", v: "runaway" }],
          then: "你带了两件衣裳，走了四十里。第三天在渡口被人认出来，你说是寡妇。" },
        { text: "认了", hint: "家里得钱；一生如此", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }, { k: "addPerson", v: { role: "husband", rel: "夫", age: 36 } }] },
        { text: "去求祖母", hint: "或有转", effects: [{ k: "favor", v: 2 }],
          gamble: { winChance: 0.4, win: [{ k: "favor", v: 5 }], lose: [{ k: "favor", v: -3 }],
            loseNote: "祖母说：「女子的命，都是这样。」" } }
      ]
    },

    /* ══════════ 分与继 ══════════ */
    {
      id: "c6.xichan", cat: "宗族", title: "析产", age: [22, 60], weight: 15,
      text: [
        "父母都不在了。兄弟三个，要分家。",
        "田二十八亩，屋两进，牛一头，债十二两。族长来做中人。"
      ],
      options: [
        { text: "均分", hint: "各得九亩；兄弟无怨", effects: [{ k: "field_dry", v: 4 }, { k: "favor", v: 6 }],
          then: "抓阄。你抓了东边那块，靠河，涝年吃亏。" },
        { text: "要田，不要屋", hint: "田多；住处难", effects: [{ k: "field_dry", v: 7 }, { k: "silver", v: -6 }, { k: "favor", v: -2 }] },
        { text: "让给弟弟，自己出门", hint: "名声好；一无所有", effects: [{ k: "fame", v: 8 }, { k: "field_dry", v: -3 }, { k: "silver", v: 3 }],
          then: "族长在分单上按了手印，说：「你是明白人。」你带着一个包袱出了门。" }
      ]
    },

    {
      id: "c6.zhengchan", cat: "宗族", title: "争产", age: [20, 65], weight: 12,
      text: [
        "哥哥把父母的田记在了自己名下，说：「长兄当家，田该我管。」",
        "契上原是父亲的名字，父亲没留下话。"
      ],
      options: [
        { text: "告官", hint: "银钱 −8；兄弟成仇", effects: [{ k: "silver", v: -8 }, { k: "grudge", v: 12 }],
          gamble: { winChance: 0.45, win: [{ k: "field_dry", v: 6 }], lose: [{ k: "silver", v: -6 }, { k: "fame", v: -4 }],
            loseNote: "官说：「兄弟争产，各打二十。」田还是哥哥管着。" } },
        { text: "请族长断", hint: "或有公论", effects: [{ k: "favor", v: 2 }],
          gamble: { winChance: 0.5, win: [{ k: "field_dry", v: 4 }], lose: [{ k: "favor", v: -4 }],
            loseNote: "族长说：「长兄如父。」" } },
        { text: "不要了", hint: "心冷；兄弟情薄", effects: [{ k: "fame", v: 3 }, { k: "field_dry", v: -2 }, { k: "luck", v: -1 }] }
      ]
    },

    {
      id: "c6.lisi", cat: "宗族", title: "立嗣", age: [30, 65], weight: 11,
      text: [
        "你没有儿子，族里要给你立嗣。按规矩，从同宗晚辈里挑一个，写进你这一支的谱。",
        "族长的意思是挑他外孙；你自己看中了堂兄家那个老实孩子。"
      ],
      options: [
        { text: "依族长", hint: "族里满意；心里不愿", effects: [{ k: "favor", v: 5 }, { k: "flag", v: "heir_clan" }] },
        { text: "挑堂兄家的", hint: "或起争执", effects: [{ k: "favor", v: -3 }],
          gamble: { winChance: 0.55, win: [{ k: "favor", v: 4 }], lose: [{ k: "grudge", v: 8 }, { k: "fame", v: -3 }],
            loseNote: "族长说：「谱是我修的。」他把名字写了别人。" } },
        { text: "不立，田捐给祠堂", hint: "名声好；无人送终", effects: [{ k: "fame", v: 7 }, { k: "field_dry", v: -3 }] }
      ]
    },

    {
      id: "c6.citang", cat: "宗族", title: "祠堂", age: [18, 65], weight: 13,
      text: [
        "祠堂的梁朽了，要修。族长按丁摊派：每丁三百文，不出钱的，清明不许入祠。",
        "你家三个丁。"
      ],
      options: [
        { text: "照出", hint: "银钱 −6；族里无话", effects: [{ k: "silver", v: -6 }, { k: "favor", v: 4 }] },
        { text: "多出一些，把名字刻在碑上", hint: "银钱 −12；名声好", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 7 }, { k: "favor", v: 5 }] },
        { text: "不出", hint: "省下钱；被逐出祠", effects: [{ k: "fame", v: -6 }, { k: "favor", v: -8 }, { k: "grudge", v: 5 }],
          then: "清明那天，你在祠堂门外站着。里头在念名字，没有你的。" }
      ]
    },

    {
      id: "c6.xiupu", cat: "文事", title: "修谱", age: [20, 65], weight: 10,
      text: [
        "族里要重修族谱，隔了四十年。修谱的人来问：你家这一支，往上三代的名字、生卒、葬处。",
        "祖父的名字你记得，曾祖的名字，你只记得一个字。"
      ],
      options: [
        { text: "照实说，不记得的留空", hint: "谱上有缺", effects: [{ k: "fame", v: 2 }, { k: "knowledge", v: 3 }] },
        { text: "编一个体面的", hint: "谱上好看；心里不安", effects: [{ k: "fame", v: 5 }, { k: "luck", v: -2 }],
          then: "你给曾祖编了个「处士」。修谱的人写得端端正正。" },
        { text: "出钱请人查", hint: "银钱 −6；查得实", effects: [{ k: "silver", v: -6 }, { k: "knowledge", v: 6 }, { k: "fame", v: 3 }] }
      ]
    },

    {
      id: "c6.zhuixu", cat: "家族", title: "赘婿", age: [18, 35], weight: 10, sex: "male",
      text: [
        "邻村有家只有一女，要招婿上门。条件：改姓，孩子随女方姓，将来养老送终。",
        "他家有田四十亩，比你家的十倍。"
      ],
      options: [
        { text: "去", hint: "田多；改姓", effects: [{ k: "field_dry", v: 8 }, { k: "fame", v: -6 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 18 } }],
          then: "上门的头一年，村里人还叫你原来的姓。第二年就不叫了。" },
        { text: "不去，守住本姓", hint: "穷；有骨气", effects: [{ k: "fame", v: 4 }, { k: "luck", v: 1 }] },
        { text: "去，但讲明孩子一个随父姓", hint: "或有争", effects: [{ k: "field_dry", v: 5 }],
          gamble: { winChance: 0.35, win: [{ k: "favor", v: 4 }], lose: [{ k: "fame", v: -4 }, { k: "favor", v: -3 }],
            loseNote: "他父亲说：「既上门，就别讲这个。」" } }
      ]
    },

    {
      id: "c6.zhifu", cat: "家族", title: "指腹", age: [6, 16], weight: 9, once: true,
      text: [
        "父亲与他的旧交曾有话：两家若生一男一女，便结为婚姻。",
        "如今那家生的是女儿，比你大三岁。他家家道已经中落。"
      ],
      options: [
        { text: "认这门亲", hint: "守信；门第不合", effects: [{ k: "fame", v: 4 }, { k: "favor", v: 3 }, { k: "addPerson", v: { role: "wife", rel: "妻", age: 19 } }] },
        { text: "推说八字不合", hint: "失信；免了这门亲", effects: [{ k: "fame", v: -4 }, { k: "grudge", v: 5 }] },
        { text: "认亲，但先送些粮过去", hint: "粮 −8；两家更近", effects: [{ k: "grain", v: -8 }, { k: "favor", v: 7 }] }
      ]
    },

    {
      id: "c6.yizi", cat: "家族", title: "义子", age: [16, 60], weight: 9,
      text: [
        "路上遇见一个孩子，八九岁，父母死于疫，一个人守着空屋。",
        "他跟着你走了半里路，不说话。"
      ],
      options: [
        { text: "带回家养", hint: "粮 −10；多一口人", effects: [{ k: "grain", v: -10 }, { k: "favor", v: 6 }, { k: "addPerson", v: { role: "child", rel: "义子", age: 9 } }],
          then: "他进门第一天，把带来的半块饼放在灶台上，说：「给家里。」" },
        { text: "给他找个去处", hint: "心不安；省粮", effects: [{ k: "favor", v: 2 }, { k: "grain", v: -2 }] },
        { text: "走开", hint: "无得失", effects: [{ k: "luck", v: -2 }],
          then: "你走出一里地，回头看了一眼。他还站在那儿。" }
      ]
    },

    {
      id: "c6.poxi", cat: "家族", title: "婆媳", age: [18, 55], weight: 12,
      text: [
        "母亲嫌你媳妇饭做得硬、话少、不会看眼色。今日为一件衣裳吵起来了。",
        "两个人都看着你。"
      ],
      options: [
        { text: "站在母亲这边", hint: "母亲满意；妻心冷", effects: [{ k: "favor", v: -6 }, { k: "fame", v: 3 }],
          then: "妻子回房，把门栓上了。夜里你敲门，她说：「睡了。」" },
        { text: "站在媳妇这边", hint: "妻记恩；母亲哭", effects: [{ k: "favor", v: 6 }, { k: "fame", v: -4 }] },
        { text: "分灶另住", hint: "银钱 −5；各过各的", effects: [{ k: "silver", v: -5 }, { k: "favor", v: 3 }],
          then: "院墙中间砌了一道矮墙。母亲从墙那边递过来一篮鸡蛋。" }
      ]
    },

    {
      id: "c6.zhouli", cat: "家族", title: "妯娌", age: [18, 60], weight: 9,
      text: [
        "嫂子说你家的鸡吃了她家的菜，说了三天。今天她把鸡打死了，扔在你门口。",
        "哥哥装作没看见。"
      ],
      options: [
        { text: "把鸡炖了，请他们吃", hint: "一顿饭化开", effects: [{ k: "favor", v: 5 }, { k: "silver", v: -2 }] },
        { text: "吵一场", hint: "出气；结怨", effects: [{ k: "grudge", v: 8 }, { k: "fame", v: -2 }],
          then: "你在院里骂了半个时辰。邻居都开了窗。" },
        { text: "把鸡埋了，不提", hint: "心里堵", effects: [{ k: "body", v: -2 }, { k: "fame", v: 3 }] }
      ]
    },

    {
      id: "c6.qianzang", cat: "方外", title: "迁葬", age: [25, 65], weight: 9,
      text: [
        "风水先生说：你家祖坟「气不聚」，所以这些年不顺。迁一处，要八两银子。",
        "父亲葬在那里二十年了。"
      ],
      options: [
        { text: "迁", hint: "银钱 −10；族里议论", effects: [{ k: "silver", v: -10 }, { k: "luck", v: 3 }, { k: "fame", v: -2 }],
          then: "开棺那天，土是干的。先生点头：「看，气是散的。」" },
        { text: "不迁", hint: "省下钱；心里不定", effects: [{ k: "luck", v: -1 }] },
        { text: "只修坟，不迁", hint: "银钱 −3；两头都过得去", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 2 }] }
      ]
    },

    {
      id: "c6.buji", cat: "家族", title: "不育", age: [22, 45], weight: 10,
      text: [
        "成亲六年，没有孩子。族里已经在议论，婆婆开始去庙里烧香。",
        "郎中说：「未必是女方的事。」"
      ],
      options: [
        { text: "去庙里求", hint: "银钱 −4；心里有寄", effects: [{ k: "silver", v: -4 }, { k: "luck", v: 2 }] },
        { text: "请郎中给两人都看", hint: "银钱 −6；或有验", effects: [{ k: "silver", v: -6 }],
          gamble: { winChance: 0.4, win: [{ k: "addPerson", v: { role: "child", rel: "子", age: 0 } }, { k: "favor", v: 5 }], lose: [{ k: "favor", v: -2 }],
            loseNote: "郎中开了半年的药，苦得很，也没什么用。" } },
        { text: "抱养一个", hint: "粮 −8；有后", effects: [{ k: "grain", v: -8 }, { k: "addPerson", v: { role: "child", rel: "养子", age: 1 } }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "c6.fenshi", cat: "宗族", title: "族议", age: [20, 70], weight: 11,
      text: [
        "族里有人在祠堂前打了他父亲，族长召集族议，要定罚。",
        "按族规：杖三十，罚谷十石；若不认，逐出族外。"
      ],
      options: [
        { text: "照族规定", hint: "族里服气；结怨于人", effects: [{ k: "favor", v: 5 }, { k: "grudge", v: 5 }] },
        { text: "替他说情", hint: "得他一家的恩", effects: [{ k: "favor", v: -3 }, { k: "grudge", v: -4 }],
          then: "族长看了你一眼：「你心软。」杖减到十，罚谷照旧。" },
        { text: "主张从重", hint: "立威；结深怨", effects: [{ k: "fame", v: 4 }, { k: "grudge", v: 12 }] }
      ]
    },

    {
      id: "c6.zhaofu", cat: "家族", title: "招夫", age: [25, 55], weight: 9, sex: "female",
      text: [
        "丈夫没了三年，田里的活你一个人做不下来。族里有个远房来说：他可以上门，帮着种，不改姓，孩子不随他。",
        "条件是：每年给他两石谷。"
      ],
      options: [
        { text: "应下", hint: "粮 −8；田有人种", effects: [{ k: "grain", v: -8 }, { k: "field_dry", v: 2 }, { k: "favor", v: -2 }] },
        { text: "不应，把田佃出去", hint: "田租薄；清静", effects: [{ k: "grain", v: 4 }, { k: "fame", v: 3 }] },
        { text: "卖了田，进城做工", hint: "银钱 +10；离乡", effects: [{ k: "silver", v: 10 }, { k: "field_dry", v: -4 }] }
      ]
    },

    {
      id: "c6.jiazi", cat: "家族", title: "嫁女", age: [30, 60], weight: 12,
      text: [
        "女儿十六了，有人来提亲。一家是镇上开铺的，聘财给得厚；一家是邻村的读书人，家里只有三间屋。",
        "女儿自己没说话，只是把你给她的一支笔收进了箱子里。"
      ],
      options: [
        { text: "许给开铺的", hint: "银钱 +12；女儿未必愿", effects: [{ k: "silver", v: 12 }, { k: "favor", v: -2 }],
          then: "嫁妆装了两车。她上车前回头看了一眼那支笔。" },
        { text: "许给读书人", hint: "银钱 +2；名声好", effects: [{ k: "silver", v: 2 }, { k: "fame", v: 6 }, { k: "favor", v: 4 }] },
        { text: "让她自己选", hint: "或被人笑", effects: [{ k: "fame", v: -2 }, { k: "favor", v: 6 }],
          then: "她想了三天，说：「听爹的。」你知道她不是没主意。" }
      ]
    },

    {
      id: "c6.yanglao", cat: "家族", title: "养老", age: [35, 70], weight: 11,
      text: [
        "父母老了，一个咳，一个眼睛看不清。三个儿子，你在中间。",
        "大哥说：「我在外头，出钱。」三弟说：「我穷，出力。」钱和力都在你身上。"
      ],
      options: [
        { text: "接到自己家", hint: "粮 −10；身体 −4", effects: [{ k: "grain", v: -10 }, { k: "body", v: -4 }, { k: "fame", v: 6 }] },
        { text: "三家轮养，一月一轮", hint: "各担一份；老人奔波", effects: [{ k: "grain", v: -4 }, { k: "favor", v: 3 }] },
        { text: "把大哥的钱要来，请人伺候", hint: "银钱 +5；族里说话", effects: [{ k: "silver", v: 5 }, { k: "favor", v: -4 }, { k: "fame", v: -3 }] }
      ]
    },

    {
      id: "c6.sizi", cat: "家族", title: "私蓄", age: [20, 60], weight: 9, sex: "female",
      text: [
        "你这些年做针线，攒了三百文，藏在箱底。",
        "婆婆要修屋，让各房出钱。丈夫说：「家里没有余钱。」"
      ],
      options: [
        { text: "拿出来", hint: "银钱 −4；婆婆改口", effects: [{ k: "silver", v: -4 }, { k: "favor", v: 6 }] },
        { text: "不说", hint: "攒下；心里不安", effects: [{ k: "silver", v: 1 }, { k: "luck", v: -1 }] },
        { text: "拿出来，但说是娘家给的", hint: "银钱 −3；两头好看", effects: [{ k: "silver", v: -3 }, { k: "favor", v: 4 }, { k: "fame", v: 2 }] }
      ]
    },

    {
      id: "c6.mieqin", cat: "宗族", title: "灭亲", age: [25, 65], weight: 8,
      text: [
        "族中有人偷了祠堂的祭器去卖，被抓住。按族规，沉塘。",
        "他家里还有一个瞎眼的母亲。他跪在祠堂前，一句话不说。"
      ],
      options: [
        { text: "依族规", hint: "族里无话；心里记着", effects: [{ k: "favor", v: 5 }, { k: "luck", v: -2 }],
          then: "那天下着小雨。塘边的水很平。他母亲在岸上，一直叫他的名字。" },
        { text: "替他求，改逐出族", hint: "族里不服；救一条命", effects: [{ k: "favor", v: -4 }, { k: "fame", v: -2 }, { k: "luck", v: 2 }] },
        { text: "替他把祭器赔上", hint: "银钱 −12；救一条命", effects: [{ k: "silver", v: -12 }, { k: "fame", v: 5 }, { k: "favor", v: 4 }] }
      ]
    }

  );

})(window.PACK_BASE);
