/* 如果当时 · 岔路题 追加卷三（多选限选）
 * 10 道多选（q86–q95），接在 pack-more2.js 之后。
 */
window.PACK_START = (window.PACK_START || []).concat([

  {
    id: "q86",
    title: "父亲的遗物，只能留三样",
    scene: "老屋要拆了。父亲走了两年，东西还都在原处：烟斗、旧手表、一柜子账本、那辆二八自行车、他的军大衣、写了一半的字帖。你只能带走三样。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "pipe", name: "那只烟斗", tag: "至亲", desc: "斗口被他咬出一个豁", effects: { happy: 6 } },
      { key: "watch", name: "那块旧手表", tag: "时间", desc: "上海牌，走一天慢七分钟", effects: { happy: 5, money: 2 } },
      { key: "books", name: "一柜子账本", tag: "现实", desc: "记了三十年，一分一厘", effects: { money: 4, happy: 3 } },
      { key: "bike", name: "那辆二八自行车", tag: "陪伴", desc: "后座上带过你整个童年", effects: { happy: 8, health: -2 } },
      { key: "coat", name: "他的军大衣", tag: "庇护", desc: "沉，压手，有樟脑味", effects: { happy: 5, health: 2 } },
      { key: "copy", name: "写了一半的字帖", tag: "遗憾", desc: "最后一页停在「永」字", effects: { happy: 7, social: 2 } },
      { key: "photo", name: "一张全家福", tag: "情感", desc: "你八岁，他还没白头发", effects: { happy: 9 } },
      { key: "tools", name: "他那套木工工具", tag: "手艺", desc: "刨子还锋利，柄磨得发亮", effects: { money: 3, happy: 4 } }
    ],
    follow: {
      id: "q86",
      title: "带走的三样",
      beats: [
        {
          scene: "搬完最后一件，屋子空了。你站在堂屋中间，才发现地上有一圈椅子腿压出来的印子，几十年了，擦不掉。",
          choice: {
            A: { title: "拍张照", text: "连那圈印子一起拍下来。" },
            B: { title: "关门就走", text: "看多了，走不动。" }
          }
        },
        {
          scene: "十年后你搬家，那三样东西还是最先装箱的。你妻子说：这些又不值钱。你说：嗯，不值钱。",
          choice: {
            A: { title: "跟她讲讲来历", text: "每样都有个故事。" },
            B: { title: "不说了", text: "说了她也不懂。" }
          }
        }
      ],
      regret: "留在老屋里的那些"
    }
  },

  {
    id: "q87",
    title: "人生最怕的三件事，你删哪三件",
    scene: "有人说，人的一生就是被几样东西牵着走。如果能把其中三样从你身上拿走，你拿走哪三样——不是没有，是不再怕。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "poor", name: "怕没钱", tag: "现实", desc: "怕到不敢辞职、不敢生病", effects: { money: -6, happy: 10 } },
      { key: "alone", name: "怕一个人", tag: "陪伴", desc: "怕饭桌上只有自己", effects: { social: -4, happy: 8 } },
      { key: "old", name: "怕老", tag: "时间", desc: "怕镜子，怕照片", effects: { health: -2, happy: 9 } },
      { key: "fail", name: "怕失败", tag: "成就", desc: "怕别人看见你搞砸", effects: { social: -6, happy: 12 } },
      { key: "judge", name: "怕被评价", tag: "自我", desc: "怕亲戚那句话，怕同事那个眼神", effects: { social: -8, happy: 14 } },
      { key: "death", name: "怕死", tag: "生命", desc: "半夜想到就睡不着", effects: { health: -4, happy: 11 } },
      { key: "regret", name: "怕后悔", tag: "遗憾", desc: "怕选错，所以不选", effects: { happy: 10, money: -4 } },
      { key: "burden", name: "怕拖累别人", tag: "至亲", desc: "怕成为那个要人照顾的人", effects: { social: 6, happy: 7 } }
    ],
    follow: {
      id: "q87",
      title: "拿走之后",
      beats: [
        {
          scene: "你拿走的那三样，空出来的地方很快被别的东西填上了。人好像不能真正地「不怕」，只能换个怕法。",
          choice: {
            A: { title: "那也值", text: "换个怕法，也是换了活法。" },
            B: { title: "有点失落", text: "以为能轻松点。" }
          }
        },
        {
          scene: "多年后你发现，你真正怕的那一样，从来不在这个名单上。",
          choice: {
            A: { title: "想知道是什么", text: "总得弄明白。" },
            B: { title: "算了吧", text: "知道了也改不了。" }
          }
        }
      ],
      regret: "那三样被拿走的东西"
    }
  },

  {
    id: "q88",
    title: "给父母的最后十年，你安排哪四件事",
    scene: "父亲七十三，母亲七十一。医生说，也就是这十年的事。你想趁他们还走得动，把该做的做了。只能选四件。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "trip", name: "带他们出一趟远门", tag: "陪伴", desc: "他们这辈子没坐过飞机", effects: { money: -14, happy: 16 } },
      { key: "photo", name: "拍一套正式的全家福", tag: "情感", desc: "上次拍是你结婚那年", effects: { money: -3, happy: 12, social: 4 } },
      { key: "record", name: "把他们的话录下来", tag: "时间", desc: "老家的说法、他们的年轻时候", effects: { happy: 10 } },
      { key: "house", name: "把老房子修一修", tag: "庇护", desc: "漏雨的屋顶，塌了的院墙", effects: { money: -12, happy: 8, social: 6 } },
      { key: "check", name: "每年两次全面体检", tag: "生命", desc: "早查一年，多几年", effects: { money: -10, health: 8, happy: 4 } },
      { key: "meal", name: "每周回去吃一顿饭", tag: "至亲", desc: "不谈钱，不谈工作", effects: { happy: 14, money: -4 } },
      { key: "debt", name: "把他们欠的人情还清", tag: "精神", desc: "红白事的账，他们记了一辈子", effects: { money: -8, social: 12, happy: 5 } },
      { key: "letter", name: "写一封给他们的信", tag: "表达", desc: "有些话，当面说不出来", effects: { happy: 11 } }
    ],
    follow: {
      id: "q88",
      title: "那十年",
      beats: [
        {
          scene: "你排好的四件事，做成了三件半。第四件总说「等明年」，明年他们的腿就不行了。",
          choice: {
            A: { title: "至少做了", text: "做过总比没做强。" },
            B: { title: "怪自己", text: "为什么不多挤一年。" }
          }
        },
        {
          scene: "母亲走前拉着你的手说：这些年，你费心了。你想说不是我费心，是你们等太久了。",
          choice: {
            A: { title: "说了", text: "她得听见。" },
            B: { title: "没说", text: "她那时候已经听不太清了。" }
          }
        }
      ],
      regret: "那件总说「等明年」的事"
    }
  },

  {
    id: "q89",
    title: "同学会只能带三样「人设」，你带什么",
    scene: "毕业二十年同学会。混得好的那几个早就在群里报了车和房。你翻了翻自己的衣柜和车钥匙，最后决定带三样东西去。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "car", name: "一把好车的钥匙", tag: "现实", desc: "放在桌上，角度要刚好", effects: { social: 8, money: -10 } },
      { key: "title", name: "一个新头衔", tag: "成就", desc: "名片上那个「总监」", effects: { social: 10, happy: -3 } },
      { key: "watch", name: "一块表", tag: "符号", desc: "不贵，但有人认得", effects: { social: 6, money: -8 } },
      { key: "stories", name: "几个见闻", tag: "表达", desc: "你去过的地方、见过的人", effects: { social: 7, happy: 2 } },
      { key: "honest", name: "一句实话", tag: "自我", desc: "「我现在就是个普通上班的」", effects: { social: -4, happy: 12 } },
      { key: "photos", name: "孩子的照片", tag: "至亲", desc: "你真正想给人看的东西", effects: { happy: 10, social: 3 } },
      { key: "quiet", name: "什么都不带", tag: "精神", desc: "只带自己", effects: { social: -6, happy: 9 } },
      { key: "gift", name: "给每人带份小礼", tag: "善意", desc: "不值钱，但用心", effects: { social: 11, money: -5, happy: 4 } }
    ],
    follow: {
      id: "q89",
      title: "一场同学会",
      beats: [
        {
          scene: "酒过三巡，桌上开始比。有人问你最近怎么样，你照着准备好的说了。他点点头，转头去问下一个人。",
          choice: {
            A: { title: "继续演", text: "都来了，就演完。" },
            B: { title: "松了口", text: "其实我也就那样。" }
          }
        },
        {
          scene: "散场时，当年坐你后排的那个同学走过来，说：你今天说的那句实话，我记住了。他混得比谁都好。",
          choice: {
            A: { title: "有点意外", text: "原来他也在演。" },
            B: { title: "什么都没说", text: "笑了笑，各自打车走了。" }
          }
        }
      ],
      regret: "那几个准备了一晚上的说法"
    }
  },

  {
    id: "q90",
    title: "孩子的毛病，只能改一个，改哪个",
    scene: "老师说孩子身上有几个问题，建议家里配合着改。可你知道，一个人的毛病是连着的，改一个，别的也会跟着动。只能先挑一个。",
    type: "multi",
    pickCount: 1,
    items: [
      { key: "delay", name: "拖拉", tag: "成长", desc: "作业能拖到十一点", effects: { happy: -4, social: 4 } },
      { key: "lie", name: "撒谎", tag: "精神", desc: "小事也编", effects: { happy: -6, social: 6 } },
      { key: "shy", name: "不敢说话", tag: "自我", desc: "被点名就脸红", effects: { social: 8, happy: 3 } },
      { key: "phone", name: "离不开手机", tag: "现实", desc: "吃饭也看", effects: { health: 6, happy: -3 } },
      { key: "quit", name: "遇难就退", tag: "成就", desc: "学什么都是三分钟", effects: { happy: 4, social: 5 } },
      { key: "anger", name: "一急就发火", tag: "情感", desc: "摔门、砸东西", effects: { social: 7, happy: -5 } },
      { key: "spend", name: "花钱没数", tag: "现实", desc: "压岁钱三天花完", effects: { money: 5, happy: -2 } },
      { key: "none", name: "一个都不改", tag: "善意", desc: "他就是他", effects: { happy: 10, social: -4 } }
    ],
    follow: {
      id: "q90",
      title: "改的那一个",
      beats: [
        {
          scene: "你盯了半年。那个毛病确实好些了，可另一个冒了出来，比原来那个还难弄。",
          choice: {
            A: { title: "接着改", text: "一个一个来。" },
            B: { title: "停手了", text: "改不完的。" }
          }
        },
        {
          scene: "很多年后他自己提起：小时候你老说我拖拉。他说这话时在笑，你却想起那些吵到半夜的晚上。",
          choice: {
            A: { title: "跟他道歉", text: "那时候我太急了。" },
            B: { title: "笑一笑", text: "都过去了。" }
          }
        }
      ],
      regret: "那些吵到半夜的晚上"
    }
  },

  {
    id: "q91",
    title: "婚礼只请十个人，请谁",
    scene: "你们决定不办酒席，只请十个人吃顿饭。双方父母占了四个位子，剩下六个，得你们两个一起定。",
    type: "multi",
    pickCount: 6,
    items: [
      { key: "grandma", name: "奶奶", tag: "至亲", desc: "八十六了，一直念叨要看你成家", effects: { happy: 12 } },
      { key: "bestman", name: "最好的朋友", tag: "陪伴", desc: "从初中到现在", effects: { happy: 10, social: 4 } },
      { key: "boss", name: "单位领导", tag: "现实", desc: "不请不好看", effects: { social: 8, happy: -6 } },
      { key: "aunt", name: "那位最会说话的姑", tag: "家族", desc: "她能替你在亲戚里说好话", effects: { social: 7, happy: -4 } },
      { key: "teacher", name: "高中的班主任", tag: "成长", desc: "当年你差点退学，他拦住了", effects: { happy: 8, social: 3 } },
      { key: "ex", name: "那个没走到最后的人", tag: "遗憾", desc: "现在只是朋友", effects: { happy: -8, social: -4 } },
      { key: "neighbor", name: "楼下的老两口", tag: "善意", desc: "你加班时帮你收过无数次快递", effects: { happy: 7, social: 5 } },
      { key: "alone", name: "留两个空位", tag: "留白", desc: "给那些来不了的人", effects: { happy: 9 } }
    ],
    follow: {
      id: "q91",
      title: "那顿饭",
      beats: [
        {
          scene: "十个人坐了一桌。菜上到一半，奶奶拉着新娘的手说了很久的话，声音很小，谁也没听清。",
          choice: {
            A: { title: "凑过去听", text: "想知道她说了什么。" },
            B: { title: "让他们说", text: "有些话不该被第三个人听见。" }
          }
        },
        {
          scene: "散场时天还没黑。没有车队、没有闹洞房，你俩走回家，路上买了两根冰棍。",
          choice: {
            A: { title: "这样挺好", text: "省下的钱够一年房租。" },
            B: { title: "有点空", text: "一辈子就一次。" }
          }
        }
      ],
      regret: "没请的那个人"
    }
  },

  {
    id: "q92",
    title: "葬礼上，你希望别人记住你哪三件事",
    scene: "参加了一场同龄人的葬礼，回来一夜没睡。你试着想：如果今天轮到你，站在那儿的几个人，会说哪三件事。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "kind", name: "这个人厚道", tag: "善意", desc: "没坑过谁", effects: { social: 10, happy: 6 } },
      { key: "capable", name: "这个人有本事", tag: "成就", desc: "事儿交给他放心", effects: { social: 8, money: 4 } },
      { key: "funny", name: "跟他在一起有意思", tag: "情感", desc: "他一开口，满桌都笑", effects: { social: 9, happy: 8 } },
      { key: "parent", name: "他把孩子教得好", tag: "至亲", desc: "孩子站得住", effects: { happy: 10, social: 4 } },
      { key: "tough", name: "他这辈子不容易", tag: "生命", desc: "扛过来了", effects: { happy: 7, health: -3 } },
      { key: "quiet", name: "他不给人添麻烦", tag: "自我", desc: "走的时候也一样", effects: { social: 5, happy: -2 } },
      { key: "loved", name: "有人真心爱过他", tag: "陪伴", desc: "不是凑合过的", effects: { happy: 12 } },
      { key: "free", name: "他活得像他自己", tag: "自由", desc: "没怎么委屈过", effects: { happy: 11, social: -4 } }
    ],
    follow: {
      id: "q92",
      title: "那三句话",
      beats: [
        {
          scene: "你把选的三件事写下来，发现它们跟你这些年拼命追的东西，几乎不重合。",
          choice: {
            A: { title: "改一改活法", text: "还来得及。" },
            B: { title: "先把日子过下去", text: "道理都懂。" }
          }
        },
        {
          scene: "三个月后，你又回到了原来的节奏。那张纸夹在书里，再没打开过。",
          choice: {
            A: { title: "偶尔翻到", text: "还是会停一下。" },
            B: { title: "扔了", text: "看着难受。" }
          }
        }
      ],
      regret: "那三件没做到的事"
    }
  },

  {
    id: "q93",
    title: "一年只能回一次家，那天做四件事",
    scene: "你在离家一千公里的地方，一年只有春节能回。路上两天，在家三天。三天里，你想做四件事。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "talk", name: "陪他们坐着说话", tag: "至亲", desc: "不玩手机，就听", effects: { happy: 14 } },
      { key: "cook", name: "给他们做一顿饭", tag: "陪伴", desc: "你学的第一道菜是他们教的", effects: { happy: 10, social: 3 } },
      { key: "fix", name: "把家里该修的都修了", tag: "现实", desc: "灯、水管、门轴", effects: { happy: 6, money: -3, social: 5 } },
      { key: "doctor", name: "带他们去医院", tag: "生命", desc: "他们自己舍不得去", effects: { money: -6, health: 6, happy: 8 } },
      { key: "visit", name: "去给祖坟上香", tag: "家族", desc: "他们年纪大了，怕以后没人去", effects: { social: 6, happy: 5 } },
      { key: "friend", name: "见见老同学", tag: "情感", desc: "一年就这一面", effects: { happy: 9, social: 5 } },
      { key: "sleep", name: "在家睡一整天", tag: "自我", desc: "在外头没睡好过", effects: { health: 8, happy: 4 } },
      { key: "photo", name: "拍一张全家福", tag: "时间", desc: "一年一张", effects: { happy: 11 } }
    ],
    follow: {
      id: "q93",
      title: "那三天",
      beats: [
        {
          scene: "三天过得像三个小时。走的那天早上，母亲五点起来煮了鸡蛋，装了一袋子，说路上吃。",
          choice: {
            A: { title: "都带上", text: "带回去，慢慢吃。" },
            B: { title: "留一半", text: "你们自己也得吃。" }
          }
        },
        {
          scene: "车开出村口，后视镜里他们还站在那儿。你不敢回头，也不敢看后视镜。",
          choice: {
            A: { title: "摇下车窗挥手", text: "让他们看见。" },
            B: { title: "装作看手机", text: "一回头，眼泪就下来了。" }
          }
        }
      ],
      regret: "那三天里没做的事"
    }
  },

  {
    id: "q94",
    title: "手上有五万块闲钱，花在哪三处",
    scene: "五万块，不多不少。存着也就是个数，花出去也许能改点什么。你列了几个念头，只能选三样。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "health", name: "做一次全面体检", tag: "生命", desc: "四十岁以后，该查了", effects: { money: -6, health: 14 } },
      { key: "course", name: "报一个一直想学的课", tag: "成长", desc: "拖了五年了", effects: { money: -8, happy: 10, social: 4 } },
      { key: "debt", name: "把利息最高的那笔还了", tag: "现实", desc: "每月少一笔扣款", effects: { money: 6, happy: 4 } },
      { key: "parents", name: "给父母换台新空调", tag: "至亲", desc: "那台用了十六年", effects: { money: -5, happy: 9, social: 3 } },
      { key: "trip", name: "一个人出去走一趟", tag: "自由", desc: "不用跟谁报备", effects: { money: -10, happy: 15, health: 3 } },
      { key: "fund", name: "存成应急钱", tag: "庇护", desc: "不动它，就是安全感", effects: { money: 8, happy: 3 } },
      { key: "kid", name: "给孩子存着", tag: "至亲", desc: "以后总要用的", effects: { money: -4, happy: 6, social: 4 } },
      { key: "give", name: "给一个需要的人", tag: "善意", desc: "不署名", effects: { money: -12, happy: 13 } }
    ],
    follow: {
      id: "q94",
      title: "五万块花完了",
      beats: [
        {
          scene: "半年后回头看，花掉的钱大多想不起花在哪了，只有一两样还留着痕迹。",
          choice: {
            A: { title: "那一两样就够了", text: "钱嘛，就是用来换东西的。" },
            B: { title: "有点心疼", text: "当时不花，现在能多五万。" }
          }
        },
        {
          scene: "那笔应急钱你一直没动。有一年突然失业，靠它撑了四个月。",
          choice: {
            A: { title: "幸好留了", text: "这就是安全感。" },
            B: { title: "还是不够", text: "四个月，太短了。" }
          }
        }
      ],
      regret: "那些花完就忘的钱"
    }
  },

  {
    id: "q95",
    title: "手机相册只能留三张照片",
    scene: "换手机，旧相册导不过来。几千张里，你只能带走三张。翻了一晚上，手指停在几张上面，反反复复。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "kid", name: "孩子第一次走路", tag: "至亲", desc: "糊了，但他正回头笑", effects: { happy: 12 } },
      { key: "wedding", name: "婚礼那天", tag: "情感", desc: "你俩都笑得有点傻", effects: { happy: 10, social: 3 } },
      { key: "parents", name: "父母的一张合影", tag: "时间", desc: "他们还没白头发", effects: { happy: 11 } },
      { key: "friend", name: "和那个人的最后一张", tag: "遗憾", desc: "后来再没合过影", effects: { happy: 6, social: 4 } },
      { key: "pet", name: "那只狗趴在窗台上", tag: "陪伴", desc: "它走了六年了", effects: { happy: 8 } },
      { key: "view", name: "一次旅行看到的山", tag: "自由", desc: "那天天很蓝", effects: { happy: 7 } },
      { key: "self", name: "一张自己的照片", tag: "自我", desc: "那年你二十五岁", effects: { happy: 9, health: -2 } },
      { key: "nothing", name: "一张都不留", tag: "留白", desc: "记在脑子里", effects: { happy: 4, social: -4 } }
    ],
    follow: {
      id: "q95",
      title: "留下的三张",
      beats: [
        {
          scene: "新手机只装着三张照片。翻起来很快，划两下就到头了。你反而看得比从前仔细。",
          choice: {
            A: { title: "这样也好", text: "少，才看得见。" },
            B: { title: "还是舍不得", text: "旧手机先不扔了。" }
          }
        },
        {
          scene: "几年后旧手机开不了机了。那三张还在，其余的，你再也没想起过。",
          choice: {
            A: { title: "果然", text: "留不下的，本来也不重要。" },
            B: { title: "有点慌", text: "万一哪天连这三张也想不起呢。" }
          }
        }
      ],
      regret: "那几千张里删掉的某一张"
    }
  }

]);
