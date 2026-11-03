/* 生在何朝 · 各朝专有事件 卷廿一：西晋、东晋、南北朝、隋、唐（技艺与物产）
 * 这一卷写「南北之技」：北人南渡带来的手艺，南方原有的窑与茶，
 * 以及一个东西怎么从「贵人的玩物」变成「百姓日用的家伙」。
 * 前缀 wj9. / ej9. / ns9. / su9. / t8.。
 */
(function (B) {
  "use strict";
  B.eraEvents = B.eraEvents || {};

  /* ══════════ 西晋 ══════════ */
  B.eraEvents.wjin = (B.eraEvents.wjin || []).concat([

    {
      id: "wj9.papercity", cat: "文事", title: "洛阳纸贵", age: [16, 60], weight: 13,
      text: [
        "有人写了一篇赋，豪贵之家竞相传写，京城的纸一时贵了。",
        "你家里囤着两车麻纸。坊里的人来问，什么价。"
      ],
      options: [
        { text: "按常价卖", hint: "银钱 +4；人称厚道", effects: [{ k: "silver", v: 4 }, { k: "fame", v: 3 }] },
        { text: "翻倍卖", hint: "银钱 +11；落个刻薄名", effects: [{ k: "silver", v: 11 }, { k: "fame", v: -4 }] },
        { text: "不卖，趁机印抄", hint: "银钱 +8；知识 +5", effects: [{ k: "silver", v: 8 }, { k: "knowledge", v: 5 }] }
      ]
    },

    {
      id: "wj9.yuekiln", cat: "营生", title: "越窑", age: [16, 55], weight: 13,
      text: [
        "会稽的窑，烧青瓷。釉色青中带绿，像雨后的天。这种器皿，已经送到洛阳去了。",
        "窑主说：北边的人肯出价，一只要换十石米。"
      ],
      options: [
        { text: "专烧精品，运到北方卖", hint: "银钱 +11；路上碎一半", effects: [{ k: "silver", v: 11 }, { k: "body", v: -4 }] },
        { text: "烧粗器，卖与乡里", hint: "银钱 +5", effects: [{ k: "silver", v: 5 }] },
        { text: "把窑献给王府，求庇", hint: "银钱 −6；日后有靠", effects: [{ k: "silver", v: -6 }, { k: "official", v: 5 }] }
      ]
    },

    {
      id: "wj9.luxury", cat: "世变", title: "斗富", age: [20, 60], weight: 11, when: { minSilver: 30 },
      text: [
        "京里的风气，是比谁更阔。有人用蜡当柴，有人用锦做步障五十里。",
        "你被请去一家做客。主人问：你看我这堂上的器，比你家的如何。"
      ],
      options: [
        { text: "说不如", hint: "银钱 0；被看轻", effects: [{ k: "fame", v: -3 }, { k: "favor", v: 3 }] },
        { text: "回去也办一场", hint: "银钱 −18；扬名", effects: [{ k: "silver", v: -18 }, { k: "fame", v: 9 }] },
        { text: "推说家里简素，不敢比", hint: "声望 +2；不入流", effects: [{ k: "fame", v: 2 }, { k: "favor", v: -2 }] }
      ]
    },

    {
      id: "wj9.slaveweave", cat: "家业", title: "家伎", age: [18, 55], weight: 10, when: { minSilver: 20 },
      text: [
        "大族家里养伎，会弹会唱，也会织。伎是家产的一部分，可以送人，可以折价。",
        "有人要拿两个会织的婢，换你家城西那十亩地。"
      ],
      options: [
        { text: "换", hint: "田 −10；得两个织手", effects: [{ k: "field_dry", v: -10 }, { k: "silver", v: 6 }, { k: "fame", v: -3 }] },
        { text: "不换", hint: "无得失", effects: [{ k: "fame", v: 2 }] },
        { text: "只买一个，给钱", hint: "银钱 −12；多得一手", effects: [{ k: "silver", v: -12 }, { k: "favor", v: 2 }] }
      ]
    },

    {
      id: "wj9.iron", cat: "营生", title: "百炼", age: [18, 55], weight: 11,
      text: [
        "好刀要百炼：烧红、折打、再烧红。折一次，碳去一分，钢匀一分。",
        "有人出高价，要一把能断铁的刀。你打了三十次折，还差得远。"
      ],
      options: [
        { text: "再折二十次", hint: "银钱 −3；刀成", effects: [{ k: "silver", v: -3 }, { k: "fame", v: 7 }, { k: "martial", v: 4 }] },
        { text: "就这把，交了", hint: "银钱 +8；刃口一般", effects: [{ k: "silver", v: 8 }] },
        { text: "改打农具，卖得动", hint: "银钱 +5；无人知你", effects: [{ k: "silver", v: 5 }] }
      ]
    },

    {
      id: "wj9.granary", cat: "家业", title: "田庄", age: [25, 65], weight: 10, when: { minField: 20 },
      text: [
        "大族的田庄，坞堡围起来，庄里有磨、有井、有织机，有事时能聚数百人。",
        "你的田庄不算大，可也是一方。"
      ],
      options: [
        { text: "筑堡，聚佃客", hint: "银钱 −12；乱世有靠", effects: [{ k: "silver", v: -12 }, { k: "favor", v: 8 }, { k: "troops", v: 40 }] },
        { text: "只修水利", hint: "银钱 −6；田 +4", effects: [{ k: "silver", v: -6 }, { k: "field_wet", v: 4 }] },
        { text: "把田租出去", hint: "银钱 +8；人散", effects: [{ k: "silver", v: 8 }, { k: "favor", v: -4 }] }
      ]
    }
  ]);

  /* ══════════ 东晋 ══════════ */
  B.eraEvents.ejin = (B.eraEvents.ejin || []).concat([

    {
      id: "ej9.southsilk", cat: "营生", title: "蚕南来", age: [14, 55], weight: 14,
      text: [
        "北边来的人带来了蚕种和织法。南边原本不重蚕桑，如今河边也种起了桑。",
        "桑三年才成林。有人说：等三年，不如仍旧种稻。"
      ],
      options: [
        { text: "种桑三亩", hint: "银钱 −6；三年后得丝", effects: [{ k: "silver", v: -6 }, { k: "luck", v: 3 }] },
        { text: "照旧种稻", hint: "粮 +6", effects: [{ k: "grain", v: 6 }] },
        { text: "买现成的丝来织", hint: "银钱 +5；受制于人", effects: [{ k: "silver", v: 5 }] }
      ]
    },

    {
      id: "ej9.calligraphy", cat: "文事", title: "写字", age: [14, 60], weight: 12, when: { minKnowledge: 15 },
      text: [
        "南渡之后，士人好写帖。一张纸，几行字，写得好的，能换一斗米。",
        "你也写。写到夜里，手腕酸得抬不起来。"
      ],
      options: [
        { text: "苦练十年", hint: "知识 +8；银钱少", effects: [{ k: "knowledge", v: 8 }, { k: "fame", v: 4 }, { k: "body", v: -3 }] },
        { text: "替人抄经换钱", hint: "银钱 +6；知识 +2", effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 2 }] },
        { text: "替人写状纸", hint: "银钱 +8；得罪人", effects: [{ k: "silver", v: 8 }, { k: "grudge", v: 4 }] }
      ]
    },

    {
      id: "ej9.ship", cat: "营生", title: "江船", age: [16, 55], weight: 12,
      text: [
        "江上往来，全靠船。南渡的人多，船价一时涨了三倍。",
        "你有一手造船的本事，木料在山上，钉在铁铺。"
      ],
      options: [
        { text: "造大船，租与行旅", hint: "银钱 +10；压本", effects: [{ k: "silver", v: 10 }, { k: "body", v: -6 }] },
        { text: "造小船，自家撑", hint: "银钱 +5；自由", effects: [{ k: "silver", v: 5 }] },
        { text: "替官府修战船", hint: "银钱 +8；有差役", effects: [{ k: "silver", v: 8 }, { k: "official", v: 3 }] }
      ]
    },

    {
      id: "ej9.tea", cat: "营生", title: "茶", age: [16, 60], weight: 11,
      text: [
        "南人饮茶，先把叶子捣碎，煮成羹，加盐、加姜。北来的人喝不惯，说像药。",
        "山上有野茶，采了晒干，挑到市上。"
      ],
      options: [
        { text: "种一片茶园", hint: "银钱 −5；日后有产", effects: [{ k: "silver", v: -5 }, { k: "luck", v: 2 }] },
        { text: "采野茶卖", hint: "银钱 +4；身体 −4", effects: [{ k: "silver", v: 4 }, { k: "body", v: -4 }] },
        { text: "开个茶摊", hint: "银钱 +6；消息多", effects: [{ k: "silver", v: 6 }, { k: "favor", v: 5 }] }
      ]
    },

    {
      id: "ej9.tuntian", cat: "赋役", title: "白籍", age: [18, 60], weight: 11,
      text: [
        "北来的人入{{白籍|临时户籍，用白纸写，不纳税不服役}}，本地人入黄籍。白籍不税，黄籍有役。",
        "吏来查：你到底是白籍还是黄籍。"
      ],
      options: [
        { text: "报白籍", hint: "免役；本地人恨", effects: [{ k: "silver", v: 5 }, { k: "favor", v: -5 }] },
        { text: "报黄籍", hint: "有役；人称本分", effects: [{ k: "fame", v: 4 }, { k: "body", v: -4 }] },
        { text: "塞钱挂个白籍", hint: "银钱 −5；两头都占", effects: [{ k: "silver", v: -5 }, { k: "official", v: 4 }] }
      ]
    },

    {
      id: "ej9.tomb", cat: "营生", title: "造墓", age: [18, 60], weight: 10,
      text: [
        "南渡的士人，死了要葬在南边，可心里想着北边。墓志上写籍贯，还是旧郡。",
        "有人请你刻志。字要工，事要实。"
      ],
      options: [
        { text: "照实写", hint: "银钱 +5；名声正", effects: [{ k: "silver", v: 5 }, { k: "fame", v: 4 }] },
        { text: "照他子孙的意思写", hint: "银钱 +9；心里不服", effects: [{ k: "silver", v: 9 }, { k: "luck", v: -1 }] },
        { text: "不接这活", hint: "无得失", effects: [{ k: "body", v: 2 }] }
      ]
    }
  ]);

  /* ══════════ 南北朝 ══════════ */
  B.eraEvents.ns = (B.eraEvents.ns || []).concat([

    {
      id: "ns9.steel", cat: "营生", title: "灌钢", age: [18, 55], weight: 14,
      text: [
        "{{灌钢|把生铁液浇在熟铁上，合炼成钢}}之法：生铁易熔，熟铁难化，把熔了的生铁浇在熟铁上，一锻成钢。",
        "一炉出得好钢，能做十把刀。"
      ],
      options: [
        { text: "专造刀，卖与军中", hint: "银钱 +12；被征用", effects: [{ k: "silver", v: 12 }, { k: "official", v: 3 }] },
        { text: "造农具，卖与乡里", hint: "银钱 +7；乡里称便", effects: [{ k: "silver", v: 7 }, { k: "favor", v: 4 }] },
        { text: "把法子藏着，只传一子", hint: "家业稳；无人知", effects: [{ k: "silver", v: 6 }, { k: "fame", v: -2 }] }
      ]
    },

    {
      id: "ns9.temple", cat: "方外", title: "造像", age: [18, 60], weight: 13,
      text: [
        "山崖上要凿佛。施主出钱，石匠出力。一尊大像，凿二十年。",
        "你在崖下抬头看，石屑像雪一样落下来。"
      ],
      options: [
        { text: "做凿石匠", hint: "银钱 +6；身体 −8", effects: [{ k: "silver", v: 6 }, { k: "body", v: -8 }] },
        { text: "做供养人，出钱", hint: "银钱 −10；名声好", effects: [{ k: "silver", v: -10 }, { k: "fame", v: 7 }, { k: "luck", v: 2 }] },
        { text: "在寺里做杂役，换口饭", hint: "粮 +6；身体 −3", effects: [{ k: "grain", v: 6 }, { k: "body", v: -3 }] }
      ]
    },

    {
      id: "ns9.glass", cat: "市井", title: "琉璃", age: [18, 60], weight: 10,
      text: [
        "西来的商人带来琉璃碗，透明如水，一只值绢十匹。",
        "有人说，那不过是烧出来的石头。也有人说，烧不出来。"
      ],
      options: [
        { text: "买一只，献给上司", hint: "银钱 −8；官运通", effects: [{ k: "silver", v: -8 }, { k: "official", v: 7 }] },
        { text: "买一只，自己用", hint: "银钱 −8；见识长", effects: [{ k: "silver", v: -8 }, { k: "knowledge", v: 3 }, { k: "fame", v: 2 }] },
        { text: "不买", hint: "无得失", effects: [{ k: "silver", v: 2 }] }
      ]
    },

    {
      id: "ns9.mill", cat: "家业", title: "水碾", age: [20, 60], weight: 11, when: { minSilver: 10 },
      text: [
        "水碾碾谷，一日抵百人。可河渠是官修的，要用水，得先交钱。",
        "上游的大族把水截了，你的碾子转不动。"
      ],
      options: [
        { text: "去说理", hint: "声望 +3；或被打", effects: [{ k: "fame", v: 3 }, { k: "body", v: -5 }] },
        { text: "出钱买水", hint: "银钱 −8；碾子转起来", effects: [{ k: "silver", v: -8 }, { k: "silver", v: 10 }] },
        { text: "把碾子卖给上游", hint: "银钱 +12；从此无业", effects: [{ k: "silver", v: 12 }, { k: "favor", v: -3 }] }
      ]
    },

    {
      id: "ns9.dyke", cat: "乡里", title: "圩田", age: [20, 65], weight: 10,
      text: [
        "湖边筑堤，堤内成田，叫圩田。圩一成，三年不用看天。",
        "可圩一多，水就没处去，下游的人家要淹。"
      ],
      options: [
        { text: "跟着筑圩", hint: "田 +8；下游骂", effects: [{ k: "field_wet", v: 8 }, { k: "fame", v: -3 }] },
        { text: "不筑，怕报应", hint: "田 0；心安", effects: [{ k: "luck", v: 2 }] },
        { text: "出钱出力，替下游也修一道", hint: "银钱 −7；两村感念", effects: [{ k: "silver", v: -7 }, { k: "favor", v: 8 }, { k: "fame", v: 4 }] }
      ]
    },

    {
      id: "ns9.sutra", cat: "方外", title: "写经", age: [14, 60], weight: 10, when: { minKnowledge: 10 },
      text: [
        "寺里要写经，一字一拜，写错一字，全卷重来。写经人换的是米，也是功德。",
        "一卷三千字，写完要一个月。"
      ],
      options: [
        { text: "接这活", hint: "银钱 +5；知识 +3", effects: [{ k: "silver", v: 5 }, { k: "knowledge", v: 3 }, { k: "body", v: -3 }] },
        { text: "接活，但少写几行", hint: "银钱 +6；心里不安", effects: [{ k: "silver", v: 6 }, { k: "luck", v: -2 }] },
        { text: "出钱请别人写，自己署施主", hint: "银钱 −6；功德归你", effects: [{ k: "silver", v: -6 }, { k: "fame", v: 4 }] }
      ]
    }
  ]);

  /* ══════════ 隋 ══════════ */
  B.eraEvents.sui = (B.eraEvents.sui || []).concat([

    {
      id: "su9.canal", cat: "赋役", title: "开河", age: [16, 50], weight: 15,
      text: [
        "诏发民夫开河。百里一段，一段一万人。工食自带，役期不计。",
        "河底比人高。挑一担泥，从河底走到堤上，二百步。"
      ],
      options: [
        { text: "应役", hint: "身体 −12；家中田荒", effects: [{ k: "body", v: -12 }, { k: "field_dry", v: -2 }] },
        { text: "出钱雇人代役", hint: "银钱 −15；身体保住", effects: [{ k: "silver", v: -15 }] },
        { text: "逃", hint: "身体 −8；成逃户", effects: [{ k: "body", v: -8 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "su9.bridge", cat: "营生", title: "造桥", age: [18, 60], weight: 12,
      text: [
        "河上要造桥。石桥一孔，跨度三十七步，不用一柱。",
        "老匠人说：桥要能过车，也要能过水。石要选纹顺的，拱要收得住。"
      ],
      options: [
        { text: "接这活，从头到尾", hint: "银钱 +10；身体 −7", effects: [{ k: "silver", v: 10 }, { k: "body", v: -7 }, { k: "fame", v: 6 }] },
        { text: "只做石料", hint: "银钱 +5；稳", effects: [{ k: "silver", v: 5 }] },
        { text: "不接，怕塌了担不起", hint: "无得失", effects: [{ k: "luck", v: 1 }] }
      ]
    },

    {
      id: "su9.granary", cat: "官府", title: "义仓", age: [18, 65], weight: 11,
      text: [
        "{{义仓|地方储粮备荒的仓}}设了：按户等出粟，储在里中，荒年放。",
        "里正来收。你家出三石。可仓里的粮，去年放出去，今年还没收回来。"
      ],
      options: [
        { text: "照数出", hint: "粮 −8；荒年有靠", effects: [{ k: "grain", v: -8 }, { k: "luck", v: 2 }] },
        { text: "少报户等", hint: "粮 −4；有查", effects: [{ k: "grain", v: -4 }, { k: "luck", v: -2 }] },
        { text: "不出，说仓已空", hint: "粮 0；里正不悦", effects: [{ k: "favor", v: -4 }, { k: "fame", v: 2 }] }
      ]
    },

    {
      id: "su9.cave", cat: "营生", title: "凿窟", age: [18, 55], weight: 11,
      text: [
        "山壁上凿窟，窟里造像。一窟要十年。匠人住在崖下，吃的是施主舍的。",
        "凿到一半，石脉变了，裂。"
      ],
      options: [
        { text: "绕开石裂，改形制", hint: "银钱 +7；形制不如原样", effects: [{ k: "silver", v: 7 }, { k: "knowledge", v: 3 }] },
        { text: "从别处重开一窟", hint: "银钱 −8；工成", effects: [{ k: "silver", v: -8 }, { k: "fame", v: 6 }] },
        { text: "停了，另找活", hint: "银钱 +2；被人骂", effects: [{ k: "silver", v: 2 }, { k: "fame", v: -4 }] }
      ]
    },

    {
      id: "su9.silk", cat: "赋役", title: "调绢", age: [16, 60], weight: 11,
      text: [
        "{{租庸调|隋唐赋役：租出粟，调出绢绵，庸以绢代役}}：一家一年出绢二丈、绵三两。",
        "绢要够尺寸，织得要密。官吏拿尺量，短一寸，退回重织。"
      ],
      options: [
        { text: "织足尺寸", hint: "银钱 −4；不受刁难", effects: [{ k: "silver", v: -4 }] },
        { text: "织得刚好，边角做手脚", hint: "银钱 −2；被查出", effects: [{ k: "silver", v: -2 }, { k: "grudge", v: 3 }] },
        { text: "买绢来抵", hint: "银钱 −7；省工", effects: [{ k: "silver", v: -7 }, { k: "body", v: 2 }] }
      ]
    },

    {
      id: "su9.warehouse", cat: "市井", title: "邸店", age: [20, 60], weight: 10, when: { minSilver: 12 },
      text: [
        "运河边上，商旅往来。开一间{{邸店|存货、住人的栈房}}，收脚钱、收货钱。",
        "位置好的一年回本，位置差的三年空着。"
      ],
      options: [
        { text: "在码头边开一间", hint: "银钱 −12；日后厚利", effects: [{ k: "silver", v: -12 }, { k: "luck", v: 3 }] },
        { text: "只在自家院里腾两间", hint: "银钱 +5；人杂", effects: [{ k: "silver", v: 5 }, { k: "grudge", v: 2 }] },
        { text: "不开，改放贷", hint: "银钱 +8；有坏账", effects: [{ k: "silver", v: 8 }, { k: "luck", v: -2 }] }
      ]
    }
  ]);

  /* ══════════ 唐 ══════════ */
  B.eraEvents.tang = (B.eraEvents.tang || []).concat([

    {
      id: "t8.kiln", cat: "营生", title: "邢窑", age: [16, 55], weight: 14,
      text: [
        "{{邢窑|唐代白瓷名窑，在今河北内丘}}白瓷，色如雪；越窑青瓷，色如玉。南青北白，都是贡物。",
        "贡物有定额，余下的才能卖。定额一年比一年高。"
      ],
      options: [
        { text: "照额烧贡，余者自卖", hint: "银钱 +8；受制", effects: [{ k: "silver", v: 8 }, { k: "official", v: 3 }] },
        { text: "专做贡物，求个名", hint: "银钱 +5；名声高", effects: [{ k: "silver", v: 5 }, { k: "fame", v: 7 }] },
        { text: "烧民器，走量", hint: "银钱 +6；无人知", effects: [{ k: "silver", v: 6 }] }
      ]
    },

    {
      id: "t8.print", cat: "文事", title: "印历", age: [16, 60], weight: 13,
      text: [
        "每年末，官府颁历。坊里刻板印历卖，一纸三文，一年卖十万张。",
        "印错了日子，是大事——有人会照着历下种、嫁娶。"
      ],
      options: [
        { text: "细校三遍再印", hint: "银钱 +7；赶不上年关", effects: [{ k: "silver", v: 7 }, { k: "fame", v: 4 }] },
        { text: "赶年关先印", hint: "银钱 +11；或有错", effects: [{ k: "silver", v: 11 }, { k: "luck", v: -2 }] },
        { text: "改印佛经", hint: "银钱 +5；名声好", effects: [{ k: "silver", v: 5 }, { k: "fame", v: 3 }, { k: "luck", v: 1 }] }
      ]
    },

    {
      id: "t8.tea", cat: "市井", title: "煎茶", age: [16, 60], weight: 12,
      text: [
        "{{煎茶|唐人饮茶，碾末煮饮，加盐}}之法：碾成末，水三沸，一沸加盐，二沸投茶，三沸止。",
        "有人写了一部茶书，说水以山水为上，江水次之，井水最下。"
      ],
      options: [
        { text: "开茶肆，按书上做法", hint: "银钱 +8；本钱重", effects: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }] },
        { text: "挑担卖粗茶", hint: "银钱 +4；辛苦", effects: [{ k: "silver", v: 4 }, { k: "body", v: -3 }] },
        { text: "贩茶到北边", hint: "银钱 +12；路上有税", effects: [{ k: "silver", v: 12 }, { k: "body", v: -4 }] }
      ]
    },

    {
      id: "t8.tri", cat: "营生", title: "三彩", age: [16, 55], weight: 11,
      text: [
        "{{三彩|低温铅釉陶，多作明器}}：黄、绿、白三色，釉一烧就流，流得好看的是上品。",
        "这东西是给死人用的，可活人也爱摆在堂上。"
      ],
      options: [
        { text: "专烧明器，卖给丧家", hint: "银钱 +7；人嫌晦气", effects: [{ k: "silver", v: 7 }, { k: "fame", v: -2 }] },
        { text: "烧小件，卖与市人", hint: "银钱 +5；稳", effects: [{ k: "silver", v: 5 }] },
        { text: "接官府的大件", hint: "银钱 +10；烧坏赔", effects: [{ k: "silver", v: 10 }, { k: "luck", v: -2 }] }
      ]
    },

    {
      id: "t8.silver", cat: "营生", title: "金银器", age: [18, 60], weight: 11, when: { minSilver: 8 },
      text: [
        "长安的东西两市，金银铺一家挨一家。一只錾花的碗，工钱比料还贵。",
        "有胡商来订一批，样式是他们带来的，花纹是从没见过的葡萄和狮子。"
      ],
      options: [
        { text: "照他的样式做", hint: "银钱 +13；学新手艺", effects: [{ k: "silver", v: 13 }, { k: "knowledge", v: 4 }] },
        { text: "做本地的样式", hint: "银钱 +7；稳妥", effects: [{ k: "silver", v: 7 }] },
        { text: "偷工减料，掺铜", hint: "银钱 +11；日后露", effects: [{ k: "silver", v: 11 }, { k: "fame", v: -6 }] }
      ]
    },

    {
      id: "t8.jun", cat: "军旅", title: "作院", age: [18, 55], weight: 10,
      text: [
        "藩镇的作院里造甲、造刀、造箭。匠人有军籍，不得脱。",
        "院里的料，一半是上面拨的，一半是自己凑的。"
      ],
      options: [
        { text: "老实做，按军法", hint: "银钱 +5；身体 −4", effects: [{ k: "silver", v: 5 }, { k: "body", v: -4 }] },
        { text: "偷偷接私活", hint: "银钱 +10；军法重", effects: [{ k: "silver", v: 10 }, { k: "grudge", v: 6 }] },
        { text: "逃出作院", hint: "身体 −7；成逃人", effects: [{ k: "body", v: -7 }, { k: "luck", v: 2 }] }
      ]
    }
  ]);

})(window.PACK_BASE);
