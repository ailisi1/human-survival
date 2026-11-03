/* 如果当时 · 岔路题 追加卷十一（照护·做下去的那几年）
 * 6 道（q133–q138），接在 pack-more10.js 之后。
 *
 * 前 126 道里照护只有四道（q115–q118），都停在"做决定的那一瞬间"。
 * 缺的是做下去的那几年：钱怎么摊、人怎么轮、护工换了七个、
 * 老人想回家、钱被保姆拿走了、你自己也撑不住了。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q133 护理费 ══════════════ */

  {
    id: "q133",
    title: "爸住进护理院，一个月七千八，三兄妹怎么摊",
    scene: "大哥在外地，一年回来一次。二姐家两个孩子都在上学。你在本地，离得最近。护理院的单据每月五号出，前面三个月都是你垫的。",
    options: [
      {
        key: "A",
        title: "三家平分，每月转账",
        gain: "账立清楚了，谁也不欠谁。",
        lose: "二姐在家族群里发了一句「我这个月先欠着」，此后每月都欠。",
        effects: { money: -8, social: 5, happy: 3 },
        trigger: { unlock: "care", regret: "家族群里那句「先欠着」" },
        follow: {
          id: "q133-A",
          title: "分账以后",
          beats: [
            {
              scene: "你做了个表，三家每月各二千六。大哥按时转，二姐转三次欠两次。到年底，账上差了七千多。",
              choice: {
                A: { title: "不再提", text: "一家人，算太清难看。" },
                B: { title: "当面说清", text: "账就是账。" }
              }
            },
            {
              scene: "第二年护理院涨价，涨到九千一。你在群里说了，半天没人回。晚上大哥私聊你：我这边多出五百。",
              choice: {
                A: { title: "谢他", text: "知道他也不宽裕。" },
                B: { title: "心里不平", text: "凭什么差的那部分总是我补。" }
              }
            }
          ],
          regret: "那张逐年拉大的分账表"
        }
      },
      {
        key: "B",
        title: "我一个人出，不求他们",
        gain: "不用看任何人的脸色，也不用等谁的转账。",
        lose: "你的存款从六位数变成四位数，只用了两年。",
        effects: { money: -14, social: -6, happy: 5 },
        trigger: { unlock: "care", regret: "那张变成四位数的存折" },
        follow: {
          id: "q133-B",
          title: "一个人出",
          beats: [
            {
              scene: "你在群里说这钱我出，你们不用管。大哥回了个「辛苦」，二姐回了个流泪的表情。之后两年，没人再问过。",
              choice: {
                A: { title: "也好", text: "图个清静。" },
                B: { title: "有点凉", text: "连一句「多少钱」都没人问。" }
              }
            },
            {
              scene: "第三年你自己也病了，住院十二天。护理院的费用停了一次，护理院打给了大哥。大哥打给你，第一句话是：怎么停了。",
              choice: {
                A: { title: "说了实话", text: "我没钱了。" },
                B: { title: "说在办手续", text: "不想让他们知道我撑不住。" }
              }
            }
          ],
          regret: "那两年没人问过的那句「多少钱」"
        }
      }
    ]
  },

  /* ══════════════ q134 护工（多选 2） ══════════════ */

  {
    id: "q134",
    title: "半年换了七个护工，这次挑哪两个",
    scene: "第一个手脚重，第二个爱打电话，第三个干了三天就走了，第四个要涨钱，第五个被老人骂哭了，第六个偷拿了抽屉里的钱，第七个是老乡，干得还行，但她说下个月要回去带孙子。",
    type: "multi",
    pickCount: 2,
    items: [
      { key: "young", name: "年轻没经验的", tag: "好教", desc: "手脚生，但肯听、肯学、不油", effects: { money: -6, happy: 5 } },
      { key: "old", name: "干了二十年的老护工", tag: "专业", desc: "会翻身、会拍背、看得出疼在哪", effects: { money: -9, happy: 8 } },
      { key: "same", name: "同乡", tag: "好说话", desc: "口音一样，老人愿意开口", effects: { money: -7, happy: 6, social: 4 } },
      { key: "cheap", name: "要价最低那个", tag: "省钱", desc: "一个月五千五，比市价低两千", effects: { money: 4, happy: -6 } },
      { key: "live", name: "住家的", tag: "省心", desc: "二十四小时在，贵，但夜里有人", effects: { money: -12, happy: 7, health: 3 } },
      { key: "man", name: "男护工", tag: "力气", desc: "翻身抱人不用两个人，老人别扭但认了", effects: { money: -8, happy: 4 } },
      { key: "relative", name: "远房亲戚", tag: "人情", desc: "钱不好谈，但不会偷懒", effects: { money: -5, social: -5, happy: 2 } },
      { key: "camera", name: "装摄像头再挑", tag: "盯住", desc: "先装三个，谁经得住就留谁", effects: { money: -3, happy: 3, social: -4 } }
    ],
    follow: {
      id: "q134",
      title: "挑定以后",
      beats: [
        {
          scene: "新人来了三天，还是不会给老人翻身。你在旁边看着，忍不住伸手，说：这样，胳膊垫在下面。她学得很认真。",
          choice: {
            A: { title: "慢慢教", text: "谁都是从头学的。" },
            B: { title: "换人", text: "没时间教。" }
          }
        },
        {
          scene: "半年后你发现，老人只认她。她休假那两天，老人不吃饭。",
          choice: {
            A: { title: "给她涨钱，留住", text: "这样的人不好找。" },
            B: { title: "提醒自己别依赖", text: "她总会走的。" }
          }
        }
      ],
      regret: "前面那七个名字"
    }
  },

  /* ══════════════ q135 想回家 ══════════════ */

  {
    id: "q135",
    title: "他天天说要回家，可家里没人",
    scene: "护理院里他一天问八遍：什么时候回去。他说的那个家已经拆了，原址上是个停车场。医生说这是正常的，别跟他争。",
    options: [
      {
        key: "A",
        title: "骗他：下周就回",
        gain: "他安静下来，吃饭也多了。",
        lose: "每周五他都会把行李收拾好，坐在门口等。",
        effects: { happy: 5, social: 3, money: -2 },
        trigger: { unlock: "care", regret: "门口那个收拾好的包袱" },
        follow: {
          id: "q135-A",
          title: "下周就回",
          beats: [
            {
              scene: "周五他真的把东西收好了：一个包袱，两件旧衣裳，一双鞋。他坐在大厅的椅子上，从中午坐到天黑。",
              choice: {
                A: { title: "带他出去转一圈", text: "就说路上堵。" },
                B: { title: "让护工劝他回去", text: "我实在没法面对。" }
              }
            },
            {
              scene: "后来他不问了。也不收拾包袱了。医生说，这是退了一步。你反而难受——他连家都不问了。",
              choice: {
                A: { title: "主动跟他讲家", text: "讲那条街，讲门口那棵树。" },
                B: { title: "什么都不提", text: "提了他更难受。" }
              }
            }
          ],
          regret: "大厅椅子上那个包袱"
        }
      },
      {
        key: "B",
        title: "老实说：家没了",
        gain: "你说完心里轻了一点。",
        lose: "他哭了一场，此后三天不吃饭。",
        effects: { happy: -8, social: -3, money: -1 },
        trigger: { unlock: "care", regret: "他哭的那一场" },
        follow: {
          id: "q135-B",
          title: "家没了",
          beats: [
            {
              scene: "他听完坐在床边，手在被子上一遍一遍摸，说：那棵树呢。你说树也没了。他就不说话了。",
              choice: {
                A: { title: "陪着他坐", text: "什么都不说。" },
                B: { title: "找话岔开", text: "说说今天吃了什么。" }
              }
            },
            {
              scene: "一个星期后，他跟护工说：我儿子跟我说了实话。护工后来告诉你，他说这话的时候，语气是平静的。",
              choice: {
                A: { title: "觉得自己做对了", text: "他有权知道。" },
                B: { title: "后悔", text: "骗他也许更好受。" }
              }
            }
          ],
          regret: "他摸被子的那只手"
        }
      }
    ]
  },

  /* ══════════════ q136 钱给了保姆（多选 2） ══════════════ */

  {
    id: "q136",
    title: "老人把二十万给了保姆",
    scene: "存折是他自己去银行取的，签了字，按了手印，还录了一段视频说「我是自愿的」。保姆在他家做了四年。你翻遍了他的抽屉，只剩一张取款凭条。",
    type: "multi",
    pickCount: 2,
    items: [
      { key: "sue", name: "起诉保姆，把钱要回来", tag: "法律", desc: "律师说有戏，但得证明他当时不清醒", effects: { money: -8, social: -6, happy: 4 } },
      { key: "ask", name: "先找保姆谈", tag: "留余地", desc: "问问她怎么想的，也问问这四年", effects: { money: -2, social: 3, happy: 5 } },
      { key: "accept", name: "认了，这是他自己的钱", tag: "尊重", desc: "他签字的时候是清醒的，你陪他去过医院", effects: { money: -14, happy: 7, social: -4 } },
      { key: "report", name: "报警说她诈骗", tag: "翻脸", desc: "警察来了两趟，最后一句话是「家庭纠纷」", effects: { money: -4, social: -12, happy: -6 } },
      { key: "fire", name: "马上辞退她", tag: "止损", desc: "钱先不管，人不能再留", effects: { money: -6, social: -2, health: -3 } },
      { key: "watch", name: "装监控，先看三个月", tag: "观察", desc: "她到底怎么待他，看了才知道", effects: { money: -3, happy: 3 } },
      { key: "askwhy", name: "问老人为什么", tag: "当面", desc: "他也许说得出来，也许说不出来", effects: { social: 4, happy: -5 } }
    ],
    follow: {
      id: "q136",
      title: "后来",
      beats: [
        {
          scene: "保姆走的那天，老人在门口站了很久。你问他：她对你很好吗。他说：她给我剪指甲，剪得很慢。",
          choice: {
            A: { title: "心里一沉", text: "这些事我们没做。" },
            B: { title: "不服", text: "剪指甲值二十万？" }
          }
        },
        {
          scene: "半年后老人不再提她。有次你给他剪指甲，剪到一半他忽然说：你剪得太快了。",
          choice: {
            A: { title: "慢下来", text: "一点一点剪。" },
            B: { title: "鼻子发酸", text: "他记得那个速度。" }
          }
        }
      ],
      regret: "那二十万，和那四年"
    }
  },

  /* ══════════════ q137 叫亲戚帮忙 ══════════════ */

  {
    id: "q137",
    title: "一个人扛不住了，要不要开口求人",
    scene: "母亲卧床第三年。你已经三年没出去玩过，朋友的婚礼推了四个。姑妈上次打电话说：有事你说话。你知道那句话有多轻，也有多重。",
    options: [
      {
        key: "A",
        title: "开口，请姑妈每周来两天",
        gain: "你终于能睡一个整觉，周末能出门半天。",
        lose: "姑妈来了三次，第四次说腰不好。此后家族里传你不孝顺。",
        effects: { money: -3, social: -6, happy: 6 },
        trigger: { unlock: "care", regret: "姑妈那句「腰不好」" },
        follow: {
          id: "q137-A",
          title: "开了口",
          beats: [
            {
              scene: "电话里姑妈一口答应。第一次来带了炖汤，第二次给母亲洗了头，第三次坐了半小时就说要走。",
              choice: {
                A: { title: "再问一次", text: "说清楚我真撑不住了。" },
                B: { title: "不问了", text: "人家有人家的日子。" }
              }
            },
            {
              scene: "后来有个远房表姐听说了，主动打电话来，说她可以每周来一天，一天一百五。你愣了一下，说好。",
              choice: {
                A: { title: "如释重负", text: "花钱买来的帮忙最靠得住。" },
                B: { title: "有点难受", text: "原来亲戚之间要先谈钱。" }
              }
            }
          ],
          regret: "那通没人接的电话"
        }
      },
      {
        key: "B",
        title: "不开口，自己扛",
        gain: "没人知道你的日子有多难，也没人有资格评价。",
        lose: "第四年你在厨房里站着睡着了，额头磕在橱柜上。",
        effects: { money: -2, health: -10, happy: -6 },
        trigger: { unlock: "care", regret: "厨房橱柜上那个磕痕" },
        follow: {
          id: "q137-B",
          title: "自己扛",
          beats: [
            {
              scene: "你在厨房站着睡着，额头磕在橱柜角上，醒过来的时候地上有一小摊血。你擦了擦，接着热饭。",
              choice: {
                A: { title: "去医院看看", text: "缝三针。" },
                B: { title: "自己按一会儿", text: "家里走不开。" }
              }
            },
            {
              scene: "有天朋友硬拉着你出去吃饭。两个小时后你回到家，母亲在哭，说以为你不要她了。",
              choice: {
                A: { title: "抱住她", text: "说不会。" },
                B: { title: "站在门口没动", text: "那一刻真想把门关上走掉。" }
              }
            }
          ],
          regret: "那顿只吃了两小时的饭"
        }
      }
    ]
  },

  /* ══════════════ q138 你打了他 ══════════════ */

  {
    id: "q138",
    title: "你打了他一巴掌",
    scene: "他把粥吐在你脸上，第三次。你已经两天没睡整觉。巴掌出去的时候你自己也愣了。他捂着脸看你，眼睛里的东西你从来没见过。",
    options: [
      {
        key: "A",
        title: "立刻道歉，抱着他哭",
        gain: "他后来没提过这件事，你也没有。",
        lose: "此后每次喂饭，你都会想起那一巴掌。",
        effects: { happy: -7, health: -3, social: 4 },
        trigger: { unlock: "care", regret: "他捂着脸看你的那一眼" },
        follow: {
          id: "q138-A",
          title: "那一巴掌以后",
          beats: [
            {
              scene: "你跪在床边说对不起，说了一遍又一遍。他伸手摸了摸你的头，说：不哭。他大概已经不记得刚才的事了。",
              choice: {
                A: { title: "更难受", text: "他连记都不记得。" },
                B: { title: "松一点", text: "他原谅我了。" }
              }
            },
            {
              scene: "从那以后你定了个规矩：喂饭之前先出去站十分钟。有几次你站在楼道里，什么也没想，就是站着。",
              choice: {
                A: { title: "一直这么做", text: "十分钟，管用。" },
                B: { title: "后来忙起来就忘了", text: "又有过两次。" }
              }
            }
          ],
          regret: "那十分钟站着的楼道"
        }
      },
      {
        key: "B",
        title: "什么都不说，去请人",
        gain: "第二天来了个护工，此后喂饭不全是你的事了。",
        lose: "你把这一巴掌咽了下去，谁也没告诉。",
        effects: { money: -9, health: -2, happy: -5 },
        trigger: { unlock: "care", regret: "咽下去的那一巴掌" },
        follow: {
          id: "q138-B",
          title: "请了人",
          beats: [
            {
              scene: "护工来的第一天，你在旁边看她喂饭。她很有耐心，一勺一勺。你看了十分钟，走出去，在楼下站了很久。",
              choice: {
                A: { title: "觉得被替代了", text: "他认她了。" },
                B: { title: "松了口气", text: "终于有人接一下。" }
              }
            },
            {
              scene: "两年后他跟护工说：我儿子小时候特别怕黑。护工告诉了你。你想了想，这件事你自己都忘了。",
              choice: {
                A: { title: "问他还说了什么", text: "想知道他记着什么。" },
                B: { title: "没问", text: "听不下去。" }
              }
            }
          ],
          regret: "楼下站的那很久"
        }
      }
    ]
  }

]);
