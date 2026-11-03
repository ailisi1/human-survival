/* 生在何朝 · 科举补卷
 * 19 条（c12.*），挂给「隋唐 / 宋 / 元明清」三个时段，秦汉魏晋抽不到。
 *
 * 为什么补：科举原只有 31 条，命中占 1.3%，倍数 0.64 —— 写了却见不着。
 * 缺的不是「中不中」，是那一整套过程：县试、院试、岁考、号舍、
 * 搜检、誊录、荐卷、副榜、落第之后靠什么活着。
 *
 * 挂法：一份定义挂三个时段。引擎按 PERIOD_OF[era] 取包，
 * 所以秦汉（qinhan）、魏晋（weijin）的池子里根本不会有这些。
 */
(function (B) {
  "use strict";
  B.periods = B.periods || {};

  var KEJU = [

    /* ══════════ 一、考 ══════════ */

    {
      id: "c12.xianshi", cat: "科举", title: "县试", age: [12, 50], weight: 18, once: true,
      when: { minKnowledge: 8 },
      text: [
        "县里{{县试|科举第一关，由知县主持，考四场或五场，取者方可应府试}}要开考了。报名要具结，还要两个{{廪生|领官府粮米的生员，可为童生作保}}作保。",
        "你父亲托了三个人，才请到两个。"
      ],
      options: [
        {
          text: "去考",
          hint: "学识 +5；银钱 −2；身体 −4",
          effects: [{ k: "knowledge", v: 5 }, { k: "silver", v: -2 }, { k: "body", v: -4 }],
          then: "考了五场，最后一场出来，天已经黑透。你扶着墙走了半条街，才知道自己饿了三天没好好吃东西。榜上第四十一名。"
        },
        {
          text: "再念一年，明年考",
          hint: "学识 +8；错过一年",
          effects: [{ k: "knowledge", v: 8 }, { k: "silver", v: -1 }],
          then: "你把书又翻了一遍。先生说你火候不够。第二年你去考，取在第十九名。"
        },
        {
          text: "不考了，回家种地",
          hint: "身体 +4；学识 −2",
          effects: [{ k: "body", v: 4 }, { k: "knowledge", v: -2 }],
          then: "你把笔洗了，插回笔筒。父亲什么都没说，第二天就把你带去地里。"
        }
      ]
    },
    {
      id: "c12.yuanshi", cat: "科举", title: "院试", age: [14, 55], weight: 16, once: true,
      when: { minKnowledge: 20 },
      text: [
        "{{院试|由学政主持，取中者为生员，俗称秀才，从此有几分体面}}在本府考棚。取中就是{{生员|俗称秀才。见官不跪，免差役，可开馆教书}}。",
        "考棚外头贴着一张纸：此次取四十名，应考六百余人。"
      ],
      options: [
        {
          text: "考，中不中看命",
          hint: "学识 +6；银钱 −3；成败看天",
          gamble: {
            winChance: 0.14,
            win: [{ k: "fame", v: 18 }, { k: "knowledge", v: 6 }, { k: "silver", v: 2 }],
            lose: [{ k: "body", v: -5 }, { k: "fame", v: -2 }],
            winNote: "取在第三十七名。报子敲着锣进村，你母亲把家里最后一只鸡杀了。",
            loseNote: "榜上从头看到尾，没有你的名字。你在墙根下站了很久，直到人都散了。"
          }
        },
        {
          text: "花钱请人代笔",
          hint: "银钱 −10；被抓则终身不许应考",
          effects: [{ k: "silver", v: -10 }],
          then: "那人是个落第的老童生，字写得极好。你进场只坐着。榜上有你的名字，你却不觉得是自己的。",
          gamble: { winChance: 0.75, win: [{ k: "fame", v: 14 }], lose: [{ k: "fame", v: -20 }, { k: "body", v: -8 }], winNote: "没人查出来。你在祠堂磕了头，磕得比谁都重。", loseNote: "对笔迹的时候露了。学政判：终身不许应考，枷号一个月。" }
        },
        {
          text: "不考，去做账房",
          hint: "银钱 +5；断了一条路",
          effects: [{ k: "silver", v: 5 }, { k: "fame", v: -2 }],
          then: "你算盘打得快，一年能挣八两。此后二十年，每逢放榜你都要去县门口站一会儿。"
        }
      ]
    },
    {
      id: "c12.suikao", cat: "科举", title: "岁考", age: [16, 60], weight: 14,
      when: { minKnowledge: 25 },
      text: [
        "{{岁考|学政每三年到任，对生员考试，分六等。四等以下要受责，五等降级，六等革退}}。",
        "你这三年没怎么翻书——先是母亲病了，后来是自己懒。"
      ],
      options: [
        {
          text: "考前突击，硬撑",
          hint: "学识 +4；身体 −5",
          effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -5 }],
          then: "你连熬了十九夜。考在三等，不赏不罚。学政的批语是四个字：尚须勉力。"
        },
        {
          text: "花钱打点，求个三等",
          hint: "银钱 −6；保住功名",
          effects: [{ k: "silver", v: -6 }, { k: "fame", v: 2 }],
          then: "钱是托人送进去的。你仍是三等。此后每回考试，你都先想这一条路。"
        },
        {
          text: "不理，考成什么样算什么样",
          hint: "可能被革；心里松快",
          effects: [{ k: "body", v: 3 }],
          gamble: { winChance: 0.6, win: [{ k: "fame", v: 2 }], lose: [{ k: "fame", v: -14 }, { k: "silver", v: -4 }], winNote: "考了四等，挨了十板，功名还在。", loseNote: "考了六等，革去生员。你走出考棚的时候，觉得身上轻了，又觉得空。" }
        }
      ]
    },
    {
      id: "c12.haoshe", cat: "科举", title: "号舍", age: [16, 60], weight: 12,
      when: { minKnowledge: 25 },
      text: [
        "{{号舍|贡院里一人一间的小考房，宽三尺、深四尺，白天答卷，夜里把木板拼起来当床}}。",
        "你抽到的是「屎号」——紧挨着厕房的那一排。九月里还热。"
      ],
      options: [
        {
          text: "忍着，把三天考完",
          hint: "身体 −9；学识 +5",
          effects: [{ k: "body", v: -9 }, { k: "knowledge", v: 5 }],
          then: "三天里你吐过两回。第三场写完最后一个字，手抖得握不住笔。出考场时有人抬着你走。"
        },
        {
          text: "花钱换个号",
          hint: "银钱 −5；身体 −3",
          effects: [{ k: "silver", v: -5 }, { k: "body", v: -3 }],
          then: "换到第十二排，靠墙，背风。那年你考得不错，中在榜末。"
        },
        {
          text: "进场就病，第二天弃考",
          hint: "身体 −5；白费一年",
          effects: [{ k: "body", v: -5 }, { k: "fame", v: -3 }],
          then: "你半夜发起烧，喊了巡场。出去的时候，卷子上只写了半篇。"
        }
      ]
    },
    {
      id: "c12.soujian", cat: "科举", title: "搜检", age: [16, 60], weight: 11,
      when: { minKnowledge: 20 },
      text: [
        "进场要{{搜检|解衣脱鞋、查夹带。清代尤严，甚至开襟解袜}}。",
        "前面那个人被查出袖子里缝了二十几篇范文，当场枷起来。轮到你，差役说：把衣裳解开。"
      ],
      options: [
        {
          text: "老老实实解开",
          hint: "无碍；心里发凉",
          effects: [{ k: "fame", v: 2 }],
          then: "你脱了外衣、解了鞋。差役摸了一遍，挥手让你进。你回头看那个人，他还跪在地上。"
        },
        {
          text: "塞了钱，少摸两下",
          hint: "银钱 −2；带进去一本小抄",
          effects: [{ k: "silver", v: -2 }, { k: "knowledge", v: 3 }, { k: "fame", v: -3 }],
          then: "小抄缝在裤腰里，只有指甲盖大。整场你没敢看。考完出门，你把它扔进了河里。"
        },
        {
          text: "自己把小抄扔了再进",
          hint: "学识 +2；心里踏实",
          effects: [{ k: "knowledge", v: 2 }, { k: "fame", v: 3 }],
          then: "你在墙角把纸撕碎，撒进沟里。那一年你考得不如上一年，回家路上脚步倒是稳的。"
        }
      ]
    },
    {
      id: "c12.tenglu", cat: "科举", title: "誊录", age: [18, 60], weight: 10,
      when: { minKnowledge: 18 },
      text: [
        "考场里有一批人专管抄卷：把考生的{{墨卷|考生亲笔写的原卷}}用朱笔抄成{{朱卷|誊录后的红笔卷，专供考官阅，以防认出笔迹}}。",
        "有人来找你，说这份差事一年能挣六两，问你去不去。"
      ],
      options: [
        {
          text: "去，抄卷换钱",
          hint: "银钱 +6；身体 −4；学识 +3",
          effects: [{ k: "silver", v: 6 }, { k: "body", v: -4 }, { k: "knowledge", v: 3 }],
          then: "一天抄八千字，手腕肿了三回。抄了两年，你把天下文章的套数看熟了——什么样的开头能中，什么样的必落。"
        },
        {
          text: "去，顺便记下好文章",
          hint: "银钱 +4；学识 +6",
          effects: [{ k: "silver", v: 4 }, { k: "knowledge", v: 6 }],
          then: "你把看中的几篇默了出来，夜里对着揣摩。第二年你自己下场，用的就是那一路笔法。"
        },
        {
          text: "不去，抄卷伤眼",
          hint: "身体 +2；少一笔进项",
          effects: [{ k: "body", v: 2 }],
          then: "你说眼睛不行。那人走了，后来找了个更穷的。你听说他四十岁上就瞎了一只眼。"
        }
      ]
    },
    {
      id: "c12.jianjuan", cat: "科举", title: "荐卷", age: [20, 60], weight: 11,
      when: { minKnowledge: 30 },
      text: [
        "你的卷子分在一位{{房官|分房阅卷的考官，先从落卷中挑出好的荐给主考}}手里。他挑不挑得中，全看一念。",
        "有人递话：那位先生喜欢《礼记》，你若能扯上两句，他必荐。"
      ],
      options: [
        {
          text: "照他说的改笔法",
          hint: "学识 +3；可能中",
          effects: [{ k: "knowledge", v: 3 }],
          gamble: { winChance: 0.45, win: [{ k: "fame", v: 16 }, { k: "silver", v: 3 }], lose: [{ k: "fame", v: -4 }], winNote: "他荐了。主考看了一遍，说：此子有根柢。", loseNote: "他荐了，主考刷了。批语两个字：浮泛。" }
        },
        {
          text: "照自己的写",
          hint: "学识 +6；不迎合",
          effects: [{ k: "knowledge", v: 6 }, { k: "fame", v: 2 }],
          then: "你写自己顺手的。卷子落到{{落卷|未被荐出、不予录取的卷子}}堆里，再没人看过。你不后悔，只是有一年没说话。"
        },
        {
          text: "托人去说项",
          hint: "银钱 −8；名声有损",
          effects: [{ k: "silver", v: -8 }, { k: "favor", v: 5 }, { k: "fame", v: -4 }],
          then: "钱送进去了，卷子从落卷堆里拣了出来。名次不高，够用。此后你每次见那位房官，都要先欠一欠身。"
        }
      ]
    },
    {
      id: "c12.fubang", cat: "科举", title: "副榜", age: [20, 60], weight: 10,
      when: { minKnowledge: 30 },
      text: [
        "正榜没有你，{{副榜|正榜之外另列的名单，不算中式，但可入国子监或授教职}}上有你的名字。",
        "副榜不算举人，可也算个出身。"
      ],
      options: [
        {
          text: "认了，去国子监",
          hint: "学识 +6；银钱 −6",
          effects: [{ k: "knowledge", v: 6 }, { k: "silver", v: -6 }, { k: "fame", v: 5 }],
          then: "你进了监，做了{{贡生|由地方选送入国子监的生员，有岁贡、恩贡、副贡等名目}}。监里的日子清苦，书多。你在那儿读了四年。"
        },
        {
          text: "不要，明年再考正榜",
          hint: "学识 +4；再等一年",
          effects: [{ k: "knowledge", v: 4 }, { k: "body", v: -3 }],
          then: "你把副榜的文书收进箱底。第二年再考，正榜第七名。你翻出那张旧文书，看了一眼，烧了。"
        },
        {
          text: "接着教书，不折腾了",
          hint: "银钱 +4；一辈子童生",
          effects: [{ k: "silver", v: 4 }, { k: "fame", v: 2 }],
          then: "你在镇上开了个馆，一年收八个学生。教了三十年，出了两个举人，都不是你的儿子。"
        }
      ]
    },
    {
      id: "c12.luodi", cat: "科举", title: "落第", age: [18, 60], weight: 16,
      when: { minKnowledge: 15 },
      text: [
        "榜贴在贡院门口。你从上往下看，看到最后一个名字，都不是你。",
        "同来的三个人中了两个，正在人群里被人拍肩膀。"
      ],
      options: [
        {
          text: "一个人走回去，二十里",
          hint: "身体 −5；心里结实了",
          effects: [{ k: "body", v: -5 }, { k: "fame", v: 2 }, { k: "knowledge", v: 3 }],
          then: "你走了四个时辰，路上没吃东西。到家门口坐了一会儿才进去。母亲问：中了没有。你说：没有。她说：吃饭吧。"
        },
        {
          text: "留下来，等下科",
          hint: "银钱 −7；学识 +8",
          effects: [{ k: "silver", v: -7 }, { k: "knowledge", v: 8 }],
          then: "你在城南租了一间小屋，一年二两。屋里只有一桌一床，墙上贴满了自己写的字。"
        },
        {
          text: "不考了，去做幕",
          hint: "银钱 +6；另开一条路",
          effects: [{ k: "silver", v: 6 }, { k: "knowledge", v: 4 }, { k: "fame", v: -2 }],
          then: "你跟着一位县官做了师爷。刀笔之事，比八股实在。三年后你写的状子，县里没人挑得出错。"
        }
      ]
    },
    {
      id: "c12.zuoguan", cat: "科举", title: "坐馆", age: [20, 65], weight: 12,
      when: { minKnowledge: 20, maxKnowledge: 45 },
      text: [
        "屡试不中，总得吃饭。有人请你去做{{西席|家塾教师，也称西宾}}，教他家的两个儿子。",
        "一年束脩十二两，管吃住，年节另有礼。"
      ],
      options: [
        {
          text: "去，认真教",
          hint: "银钱 +8；声望 +4",
          effects: [{ k: "silver", v: 8 }, { k: "fame", v: 4 }, { k: "knowledge", v: 3 }],
          then: "东家待你还算客气。教了七年，大儿子中了秀才，东家在祠堂给你立了个长生位。"
        },
        {
          text: "去，但只当差事",
          hint: "银钱 +8；学生恨你",
          effects: [{ k: "silver", v: 8 }, { k: "fame", v: -3 }],
          then: "你每日点卯，讲完就走。学生背不出书，你打手心，打完就回家。他们长大以后见了你不叫先生。"
        },
        {
          text: "不去，宁可摆摊代写书信",
          hint: "银钱 +3；自在",
          effects: [{ k: "silver", v: 3 }, { k: "fame", v: 2 }, { k: "body", v: -2 }],
          then: "你在县门口支了张桌子，代写书信、写对联、写状子。一天挣二三十文，看尽了人家的事。"
        }
      ]
    },
    {
      id: "c12.muliao", cat: "科举", title: "入幕", age: [22, 60], weight: 11,
      when: { minKnowledge: 35 },
      text: [
        "有个同乡在外做知县，来信问你可愿意去做{{幕友|官员私人聘请的顾问，掌刑名、钱谷，不算官}}。",
        "一年八十两，管吃住，但要跟着他走，他调任你也走。"
      ],
      options: [
        {
          text: "去，做刑名师爷",
          hint: "银钱 +12；学识 +6；离家",
          effects: [{ k: "silver", v: 12 }, { k: "knowledge", v: 6 }, { k: "favor", v: -4 }],
          then: "你管刑名，一天看六份案卷。有个案子你改了四个字，救了一个人的命。那人的名字你记了一辈子。"
        },
        {
          text: "去，做钱谷师爷",
          hint: "银钱 +14；声望 −3",
          effects: [{ k: "silver", v: 14 }, { k: "fame", v: -3 }],
          then: "你管钱粮，知道每一笔{{耗羡|正赋之外加收的损耗折银，多为地方公用乃至私分}}去了哪里。这些事不能写，只能记在心里。"
        },
        {
          text: "不去，留在家里",
          hint: "银钱 −2；守着父母",
          effects: [{ k: "silver", v: -2 }, { k: "favor", v: 8 }],
          then: "你回信说家里走不开。他后来升了知府，再没来信。你在家守了父母二十年。"
        }
      ]
    },
    {
      id: "c12.maoji", cat: "科举", title: "冒籍", age: [16, 55], weight: 9,
      when: { minKnowledge: 25 },
      text: [
        "本府名额少，邻府名额多。有人来说：可以把籍贯挂到那边去，花六两银子。",
        "这叫{{冒籍|假冒他处籍贯应考。被查出则革除功名，保人一并治罪}}。"
      ],
      options: [
        {
          text: "花钱改籍",
          hint: "银钱 −6；风险在身",
          effects: [{ k: "silver", v: -6 }, { k: "knowledge", v: 2 }],
          gamble: { winChance: 0.7, win: [{ k: "fame", v: 14 }], lose: [{ k: "fame", v: -18 }, { k: "silver", v: -6 }], winNote: "那边取中了。你把籍贯改回去的时候，手心全是汗。", loseNote: "被同乡告了。学政判：革去功名，保人枷号。你在县门口跪了三天。" }
        },
        {
          text: "不冒，就在本府考",
          hint: "学识 +3；路窄",
          effects: [{ k: "knowledge", v: 3 }, { k: "fame", v: 2 }],
          then: "你在本府考了四回。四回都没中。那个冒籍的同乡，第二年中在邻府第三名。"
        },
        {
          text: "告发那个卖籍贯的",
          hint: "声望 +6；得罪一帮人",
          effects: [{ k: "fame", v: 6 }, { k: "grudge", v: 10 }],
          then: "你写了呈子。那人被枷了半个月。此后三年，你在本县没有一家愿意请你教书。"
        }
      ]
    },
    {
      id: "c12.nanbeibang", cat: "科举", title: "南北榜", age: [20, 60], weight: 8,
      when: { minKnowledge: 30 },
      text: [
        "这一科取中的全是南边人，北边的举子炸了锅，把贡院的门砸了。",
        "朝廷要重考，另出一榜，按南北分额。"
      ],
      options: [
        {
          text: "你是南边的，认了重考",
          hint: "学识 +4；胜算变小",
          effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: -2 }],
          then: "重考那场你名次掉了三十几位，还在榜上。同乡有人掉了出去，从此不再应考。"
        },
        {
          text: "你是北边的，跟着闹",
          hint: "声望 +5；可能吃罪",
          effects: [{ k: "fame", v: 5 }, { k: "grudge", v: 6 }],
          then: "你跟着砸了门。分榜之后你中了，可你总觉得这一榜不是自己考出来的。"
        },
        {
          text: "不参与，回家读书",
          hint: "学识 +6；错过一科",
          effects: [{ k: "knowledge", v: 6 }],
          then: "你收拾行李走了。三年后再来，考得比这回好。同乡说：那年你走得对。"
        }
      ]
    },
    {
      id: "c12.panchan", cat: "科举", title: "盘缠", age: [16, 60], weight: 12,
      when: { minKnowledge: 20 },
      text: [
        "要去省城应{{乡试|每三年一科，在省城举行，取中者为举人}}，来回四百里，加上住店、吃饭、拜客，要八两银子。",
        "家里凑了五两。"
      ],
      options: [
        {
          text: "借三两，去考",
          hint: "银钱 −3；借债 3 两",
          effects: [{ k: "silver", v: -3 }, { k: "debt", v: { amt: 3, rate: 0.03, dueYears: 2 } }],
          then: "借据是族里一个堂叔写的，利息不高。你走的那天，母亲把三个煮鸡蛋塞进你包袱。"
        },
        {
          text: "一路帮人抄写换饭",
          hint: "身体 −6；学识 +4",
          effects: [{ k: "body", v: -6 }, { k: "knowledge", v: 4 }, { k: "fame", v: 3 }],
          then: "你在客栈门口摆了张桌子，代写书信。三天挣了二百文，够住两晚。到省城时你瘦了一圈。"
        },
        {
          text: "不去了，等下科",
          hint: "省下银子；错过三年",
          effects: [{ k: "silver", v: 2 }],
          then: "你把包袱解开，把书放回架上。下一科是三年后。三年里你娶了妻，生了子，书翻得少了。"
        }
      ]
    },
    {
      id: "c12.baolu", cat: "科举", title: "报录", age: [18, 60], weight: 12,
      when: { minKnowledge: 25 },
      text: [
        "中了。报子半夜敲门，举着一张红纸，喊：恭喜老爷中了！",
        "按规矩要给赏钱。带头那个开口要八两。"
      ],
      options: [
        {
          text: "给八两，图个热闹",
          hint: "银钱 −8；声望 +8",
          effects: [{ k: "silver", v: -8 }, { k: "fame", v: 8 }, { k: "favor", v: 5 }],
          then: "报子在院里敲锣，全村都起来了。你母亲把家里所有的鸡蛋都煮了。第二天算账，一共花了十一两。"
        },
        {
          text: "给二两，多的没有",
          hint: "银钱 −2；报子脸色难看",
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: 3 }, { k: "grudge", v: 3 }],
          then: "报子接了钱，锣敲得敷衍。走的时候说：老爷倒是会过日子。"
        },
        {
          text: "不给，让他们滚",
          hint: "省下银子；村里有话说",
          effects: [{ k: "fame", v: -5 }, { k: "grudge", v: 6 }],
          then: "报子在门口骂了半个时辰。第二天全村都知道新中的举人小气。你母亲出门都不敢抬头。"
        }
      ]
    },
    {
      id: "c12.tongnian", cat: "科举", title: "同年", age: [20, 65], weight: 10,
      when: { minKnowledge: 30 },
      text: [
        "同榜中的人互称{{同年|同榜取中者的互称，日后互为援引，是官场上最硬的一层关系}}。有人张罗着要刻一本《同年录》。",
        "刻一本要摊二两，还要赴三场宴。"
      ],
      options: [
        {
          text: "出钱，一场不落",
          hint: "银钱 −6；交游 +10",
          effects: [{ k: "silver", v: -6 }, { k: "favor", v: 10 }, { k: "fame", v: 4 }],
          then: "三场宴你都去了。二十年后你被参了一本，替你说话的是当年坐在你下首的那个人。"
        },
        {
          text: "只出钱，人不去",
          hint: "银钱 −2；名字仍在录上",
          effects: [{ k: "silver", v: -2 }, { k: "fame", v: 2 }],
          then: "《同年录》上有你的名字。此后二十年，没有人找过你，你也没有找过别人。"
        },
        {
          text: "不去，也不出钱",
          hint: "银钱 0；一个人走",
          effects: [{ k: "fame", v: -3 }],
          then: "你说家里穷。他们就不叫你了。后来同榜的人一个个做了官，你还在县里教书。"
        }
      ]
    },
    {
      id: "c12.youmian", cat: "科举", title: "优免", age: [16, 65], weight: 10,
      when: { minKnowledge: 22 },
      text: [
        "中了秀才，家里可以免两个人的{{差役|官府征发的无偿劳役，修河、运粮、守城，一年数十日}}。",
        "族里有人来求：把我家那口子挂在你名下，一年给你一两。"
      ],
      options: [
        {
          text: "答应，收这一两",
          hint: "银钱 +4；日后可能被查",
          effects: [{ k: "silver", v: 4 }, { k: "favor", v: 5 }],
          then: "你把名字报了上去。此后每年他家送一两来，放在门口就走。有一年查得严，你把这名字划了。"
        },
        {
          text: "答应，不收钱",
          hint: "声望 +6；族里记你情",
          effects: [{ k: "fame", v: 6 }, { k: "favor", v: 10 }],
          then: "你说挂就挂吧。此后族里议事，你的座位往前挪了两排。"
        },
        {
          text: "不答应，怕惹事",
          hint: "什么也没变",
          effects: [{ k: "fame", v: -2 }],
          then: "他走了以后，在村口说：读了书就不认人。这话传了三年。"
        }
      ]
    },
    {
      id: "c12.chugong", cat: "科举", title: "出恭", age: [16, 60], weight: 9,
      when: { minKnowledge: 20 },
      text: [
        "考场里要上厕所，得领一块{{出恭入敬|考场里表示如厕的木牌，领牌方能离座}}的牌子。",
        "全号舍几百人，只有两块。你腹中绞得厉害。"
      ],
      options: [
        {
          text: "等牌子，硬憋",
          hint: "身体 −7；没误事",
          effects: [{ k: "body", v: -7 }],
          then: "你等了两个时辰。牌子到手的时候，你已经出了一身冷汗。回来卷子上洇了一小片水。"
        },
        {
          text: "花钱买牌子，先给自己",
          hint: "银钱 −2；身体 −2",
          effects: [{ k: "silver", v: -2 }, { k: "body", v: -2 }],
          then: "差役收了钱，把牌子先递给你。后面有人骂了一句，你没回头。"
        },
        {
          text: "忍不住，就地解决",
          hint: "身体 −4；声望 −8",
          effects: [{ k: "body", v: -4 }, { k: "fame", v: -8 }],
          then: "同号舍的人捂着鼻子考完了三天。后来这一科的人提起你，都说「屎号那个」。"
        }
      ]
    },
    {
      id: "c12.mofan", cat: "科举", title: "程墨", age: [16, 60], weight: 11,
      when: { minKnowledge: 18 },
      text: [
        "书坊里卖{{程墨|主考选刻的中式范文，供士子揣摩，也叫闱墨}}，一本三百文，收录近年取中的卷子。",
        "先生说不许看，看了就只会套。可同窗人人都在背。"
      ],
      options: [
        {
          text: "买来背熟",
          hint: "银钱 −1；学识 +5",
          effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 5 }],
          then: "你背了六十篇。考场上题目一落，脑子里先浮出三篇现成的。你的卷子很漂亮，也很像别人。"
        },
        {
          text: "买来，只看结构不背",
          hint: "银钱 −1；学识 +8",
          effects: [{ k: "silver", v: -1 }, { k: "knowledge", v: 8 }],
          then: "你把每一篇的起承转合拆开看，看它怎么破题、怎么收束。这一手你用了三十年。"
        },
        {
          text: "不买，自己写",
          hint: "学识 +4；笔下生涩",
          effects: [{ k: "knowledge", v: 4 }, { k: "fame", v: 2 }],
          then: "你写的句子生，考官看了两行就放下了。可十年后你的文章有人抄，抄的人不知道你落过第。"
        }
      ]
    }

  ];

  ["suitang", "song", "yuanmingqing"].forEach(function (p) {
    if (!B.periods[p]) return;
    B.periods[p].events = (B.periods[p].events || []).concat(KEJU);
  });

})(window.PACK_BASE);
