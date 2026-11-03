/* 自动生成，勿手改。源：如果当时/data/pack-*.js（按 index.html 顺序）
   重新生成：node 如果当时/tools/build-mini.js */
var window = {};

/* ===== data/pack-start.js ===== */
/* 如果当时 · 开局题库（热议人生选择题）
 * 结构：window.PACK_START = [ 开局题, ... ]
 *
 * 两类题型：
 *
 * 【一】二选一（type 缺省）
 * {
 *   id: "q01",
 *   title: "五百万元，还是清华大学？",   // 传播用的标题
 *   scene: "...",                        // 情境描写（把玩家代入）
 *   options: [
 *     {
 *       key: "A",
 *       title: "拿五百万",              // 选项短标题
 *       gain: "...",                     // 眼前得到什么
 *       lose: "...",                     // 未来放弃什么（翻旧账的伏笔）
 *       follow: {                        // 连锁剧情段（选完这道后走 2 拍）
 *         id: "q01-A",
 *         title: "...",
 *         beats: [                       // 剧情节拍，每拍一个小抉择
 *           { scene: "...", choice: {A:{title,text}, B:{title,text}} }
 *         ],
 *         regret: "清华的一纸通知书"     // 结算时记入"放弃清单"
 *       }
 *     },
 *     { key:"B", ... }
 *   ]
 * }
 *
 * 【二】多选限选（type: "multi"）
 * {
 *   id: "q07",
 *   type: "multi",
 *   title: "荒漠求生，10 样物资只能带 4 样",  // 传播标题
 *   scene: "...",                             // 情境（代入感）
 *   pickCount: 4,                             // 必须勾选几个
 *   items: [                                  // 候选清单
 *     { key: "water", name: "一壶水", tag: "生存", desc: "..." },
 *     ...
 *   ],
 *   follow: {                                 // 确认后走的连锁剧情（同二选一）
 *     id: "q07", title: "...", beats: [ ... ],
 *     regret: "……"                            // 被划掉的项，结算时逐条记入放弃清单
 *   }
 * }
 *
 * 多选题玩法：勾选 pickCount 个 → 确认。被划掉（未勾选）的项记入放弃清单；
 * 每个 item 带 tag，选完按 tag 组合推算出 dream/love 数值倾向（测底型开局人设）。
 *
 * 条件、随机都用结构化对象，不用 eval；随机种子可复现。
 */
window.PACK_START = [
  {
    id: "q01",
    title: "五百万元，还是清华大学？",
    scene: "你创业失败，欠下一身债。母亲病重，急需一笔钱。就在这个当口，两份东西同时摆在了你面前：一张五百万元的支票，和一份清华的录取通知书。",
    options: [
      {
        key: "A",
        title: "拿五百万",
        gain: "今天就能还清债务，救回母亲。",
        lose: "那扇通往另一种人生的门，永远关上了。",
        effects: { money: 40, happy: 15, health: -5 },
        trigger: { unlock: "dream", regret: "清华的那扇门" },
        follow: {
          id: "q01-A",
          title: "守住了家",
          beats: [
            {
              scene: "你用那笔钱救了母亲，也在老家开了间小店。十年过去，日子平稳，只是偶尔刷到清华同学的朋友圈，会多看两眼。",
              choice: {
                A: { title: "关掉朋友圈", text: "不再看，也不多想。" },
                B: { title: "主动联系", text: "试着打听，那个圈子现在什么样。" }
              }
            },
            {
              scene: "四十五岁那年，你收到一封老同学婚礼的请柬。请柬上那个名字，是你当年本该同窗的人。",
              choice: {
                A: { title: "赴约", text: "去看看那条没走的路。" },
                B: { title: "婉拒", text: "有些路，不回头了。" }
              }
            }
          ],
          regret: "清华的一纸通知书"
        }
      },
      {
        key: "B",
        title: "去清华",
        gain: "四年清贫，换来一个更大的世界。",
        lose: "母亲的病，也许等不到你毕业。",
        effects: { money: -20, social: 15, happy: 5 },
        trigger: { unlock: "family", regret: "母亲最后的几年" },
        follow: {
          id: "q01-B",
          title: "追上了梦",
          beats: [
            {
              scene: "你进了清华，白天上课，晚上打工。母亲的药费压得你喘不过气，但你撑下来了。",
              choice: {
                A: { title: "咬牙读完", text: "再难也不退学。" },
                B: { title: "休学赚钱", text: "先救急，读书可以缓一缓。" }
              }
            },
            {
              scene: "四十五岁那年，你在一份投资名单上，看到了一个五百万项目的名字。那个项目，正是当年你放弃的那笔钱。",
              choice: {
                A: { title: "投进去", text: "用现在的你，补上当年的遗憾。" },
                B: { title: "一笑了之", text: "钱是钱，路是路。" }
              }
            }
          ],
          regret: "母亲最后的那几年"
        }
      }
    ]
  },

  {
    id: "q02",
    title: "卖掉老房子，送孩子出国，值吗？",
    scene: "孩子成绩不错，拿到了国外一所名校的录取。可学费加上生活费，你算了算，得卖掉这套住了二十年的老房子。妻子舍不得，孩子眼里全是期待。",
    options: [
      {
        key: "A",
        title: "卖房供读",
        gain: "孩子有了更开阔的视野和未来。",
        lose: "你们老了，没了自己的窝。",
        follow: {
          id: "q02-A",
          title: "托举",
          beats: [
            {
              scene: "房子卖了，你们搬进租来的小屋。孩子在异国他乡，电话里总说一切都好。",
              choice: {
                A: { title: "多打钱", text: "宁可自己紧一点，也别让孩子受委屈。" },
                B: { title: "量力而行", text: "该给的给，该省的省。" }
              }
            },
            {
              scene: "几年后，孩子毕业留在了国外，一年也回不来一次。你和妻子守着那间出租屋，墙上还挂着旧家的照片。",
              choice: {
                A: { title: "欣慰", text: "孩子好，就都值了。" },
                B: { title: "失落", text: "有时候，会想念那个回不去的家。" }
              }
            }
          ],
          regret: "住了二十年的老房子"
        }
      },
      {
        key: "B",
        title: "留下房子",
        gain: "守住了家，也守住了安稳的晚年。",
        lose: "孩子心里，也许会记一辈子。",
        follow: {
          id: "q02-B",
          title: "留下",
          beats: [
            {
              scene: "你拒绝卖房。孩子沉默了很久，最后留在国内读了一所普通大学。",
              choice: {
                A: { title: "补偿他", text: "把攒下的钱都给他，作为没能出国的弥补。" },
                B: { title: "讲清道理", text: "家是一个家，不是一笔钱。" }
              }
            },
            {
              scene: "多年后，孩子在国内扎下根，成家立业，就住在离你不远的地方。你们经常一起吃晚饭。",
              choice: {
                A: { title: "庆幸", text: "一家人整整齐齐，比什么都强。" },
                B: { title: "存疑", text: "偶尔会想，如果当年放他走会怎样。" }
              }
            }
          ],
          regret: "孩子本该更远的人生"
        }
      }
    ]
  },

  {
    id: "q03",
    title: "高薪但内卷，还是低薪但自由？",
    scene: "你在大厂拿着高薪，但每天工作到凌晨，身体已经亮起红灯。猎头递来一份 offer：钱少一半，但朝九晚五，有真正属于自己的生活。",
    options: [
      {
        key: "A",
        title: "留在大厂",
        gain: "更高的收入，更多的机会。",
        lose: "你的健康和那些没来得及过的日子。",
        effects: { money: 15, health: -12, happy: -8, social: 3 },
        trigger: { unlock: "health", regret: "那些被加班透支的日子" },
        follow: {
          id: "q03-A",
          title: "卷下去",
          beats: [
            {
              scene: "你继续卷，职级和薪资一路走高。直到体检报告出来，医生盯着你看。",
              choice: {
                A: { title: "继续拼", text: "再拼几年就退休。" },
                B: { title: "开始惜命", text: "钱是挣不完的，命只有一条。" }
              }
            },
            {
              scene: "四十岁那年，你买下了更大的房子，却发现自己很久没有好好睡一觉、没有陪家人吃顿饭。",
              choice: {
                A: { title: "停下来", text: "该回头看看生活了。" },
                B: { title: "继续向上", text: "爬得越高，才能越早自由。" }
              }
            }
          ],
          regret: "那些本可以慢慢过的日子"
        }
      },
      {
        key: "B",
        title: "换份轻松的",
        gain: "终于有了生活，有了时间陪家人。",
        lose: "收入减半，很多事要重新打算。",
        effects: { money: -15, health: 15, happy: 12 },
        follow: {
          id: "q03-B",
          title: "慢下来",
          beats: [
            {
              scene: "你换到新工作，每天六点下班。下班路上，你第一次看见了这座城市傍晚的天空。",
              choice: {
                A: { title: "好好生活", text: "把时间还给家人和自己。" },
                B: { title: "搞副业", text: "闲着也是闲着，再找点事做。" }
              }
            },
            {
              scene: "几年后，老同事聚会。当初留下的那些人，有的升了总监，有的已经住院。你举杯，心里很平静。",
              choice: {
                A: { title: "不后悔", text: "钱是赚不完的，日子是自己的。" },
                B: { title: "有点慌", text: "看着别人的生活，偶尔也会焦虑。" }
              }
            }
          ],
          regret: "错过的那一拨财富浪潮"
        }
      }
    ]
  },

  {
    id: "q04",
    title: "在大城市漂着，还是回老家安稳？",
    scene: "你在北上广漂了五年，租着十几平的小房间，存款微薄。家里给你在老家安排了一份稳定的工作，母亲天天催你回去。",
    options: [
      {
        key: "A",
        title: "留在大城市",
        gain: "更大的舞台，更多可能。",
        lose: "可能很多年后，依然一无所有。",
        follow: {
          id: "q04-A",
          title: "漂",
          beats: [
            {
              scene: "你咬咬牙留下，换了一份更有前景的工作。房价高得让人绝望，但你还是想再试试。",
              choice: {
                A: { title: "咬牙攒首付", text: "再难也要有个落脚的地方。" },
                B: { title: "先租房", text: "不确定的未来，不该背那么重的债。" }
              }
            },
            {
              scene: "三十岁那年，你依然没攒下多少钱。老家的朋友已经结婚生子，而你在深夜的地铁里，看着车窗里自己的脸。",
              choice: {
                A: { title: "继续坚持", text: "再给自己几年。" },
                B: { title: "开始动摇", text: "也许，是时候回去了。" }
              }
            }
          ],
          regret: "老家那些安稳的、热气腾腾的日子"
        }
      },
      {
        key: "B",
        title: "回老家",
        gain: "稳定的工作，父母的陪伴。",
        lose: "那个更大的世界，和你没做完的梦。",
        follow: {
          id: "q04-B",
          title: "归",
          beats: [
            {
              scene: "你回到老家，进了稳定的单位。日子安稳，只是夜深人静时，会想起那座城市的霓虹。",
              choice: {
                A: { title: "安心过日子", text: "安稳也是一种幸福。" },
                B: { title: "留个念想", text: "心里始终给远方留个位置。" }
              }
            },
            {
              scene: "几年后，老同学从大城市回来，讲起那些你未曾经历的故事。你听着，笑着，心里有羡慕，也有踏实。",
              choice: {
                A: { title: "庆幸", text: "守着家人，就是最大的安稳。" },
                B: { title: "遗憾", text: "如果当年留下，会不会不一样。" }
              }
            }
          ],
          regret: "那些没敢去闯的远方"
        }
      }
    ]
  },

  {
    id: "q05",
    title: "为爱情放弃前途，值吗？",
    scene: "你拿到了一个绝佳的机会，要去另一座城市发展。可另一半的工作、家人都在这边，走了，这段感情大概率就散了。",
    options: [
      {
        key: "A",
        title: "为前途走",
        gain: "抓住机会，事业再上一个台阶。",
        lose: "那个陪你很久的人，渐渐走远。",
        effects: { money: 15, social: 8, happy: -12 },
        trigger: { unlock: "family", regret: "那段本该白头的人" },
        follow: {
          id: "q05-A",
          title: "向前",
          beats: [
            {
              scene: "你去了新城市，事业蒸蒸日上。只是每次路过熟悉的街角，都会想起那个人。",
              choice: {
                A: { title: "忙起来", text: "用工作填满所有空闲。" },
                B: { title: "偶尔联系", text: "保持一份淡淡的联络。" }
              }
            },
            {
              scene: "多年后，你在朋友圈看到对方结婚的消息。你点了赞，然后关掉了手机。",
              choice: {
                A: { title: "释然", text: "彼此都好，就够了。" },
                B: { title: "怅然", text: "如果当年留下，现在会不会是另一种人生。" }
              }
            }
          ],
          regret: "那段本该白头的人"
        }
      },
      {
        key: "B",
        title: "为爱情留",
        gain: "守住了最爱的人。",
        lose: "那个错过就再难有的机会。",
        effects: { happy: 15, social: 8, money: -10 },
        follow: {
          id: "q05-B",
          title: "相守",
          beats: [
            {
              scene: "你留下，和他/她结了婚。日子平淡而温暖，只是偶尔想起那个机会，会有点不甘。",
              choice: {
                A: { title: "珍惜当下", text: "有爱人在旁，就是最好的选择。" },
                B: { title: "心里留刺", text: "总忍不住想，如果走了会怎样。" }
              }
            },
            {
              scene: "多年后，你们有了自己的家。某个傍晚，你们一起散步，你忽然觉得，这条路走对了。",
              choice: {
                A: { title: "笃定", text: "千金不换眼前人。" },
                B: { title: "平淡", text: "爱情落进了柴米油盐。" }
              }
            }
          ],
          regret: "那个错过就再难有的机会"
        }
      }
    ]
  },

  /* ===== 多选限选题（type: "multi"） ===== */

  {
    id: "q07",
    type: "multi",
    title: "荒漠求生，10 样物资只能带 4 样",
    scene: "一场意外，你被孤身抛在荒漠边缘。救援要七天后才可能到。面前摊着十样物资，你只能带走四样。剩下的，就永远留在沙地里了。",
    pickCount: 4,
    items: [
      { key: "water", name: "一壶水", tag: "生存", desc: "能多撑两天的命", effects: { health: 8 } },
      { key: "knife", name: "一把刀", tag: "生存", desc: "开路、防身、割绳", effects: { health: 5, money: 3 } },
      { key: "rope", name: "一捆绳", tag: "工具", desc: "攀爬、固定、做陷阱", effects: { health: 4 } },
      { key: "fire", name: "火种", tag: "生存", desc: "夜里的温暖与信号", effects: { health: 5, happy: 3 } },
      { key: "compass", name: "指南针", tag: "方向", desc: "不让自己迷失", effects: { social: 5 } },
      { key: "tent", name: "帐篷", tag: "庇护", desc: "挡风沙的安身之处", effects: { health: 6, happy: 2 } },
      { key: "med", name: "急救包", tag: "生命", desc: "受伤时能救命", effects: { health: 10 } },
      { key: "mirror", name: "信号镜", tag: "希望", desc: "向远方求救", effects: { happy: 8 } },
      { key: "salt", name: "一袋盐", tag: "生存", desc: "维持体力与电解质", effects: { health: 4 } },
      { key: "coat", name: "保暖衣", tag: "庇护", desc: "熬过荒漠的寒夜", effects: { health: 6 } }
    ],
    follow: {
      id: "q07",
      title: "荒漠七日",
      beats: [
        {
          scene: "你背起行囊走进黄沙。第一天夜里，风裹着沙拍打你，你终于明白，带走的每一样，都可能决定你能不能看到下一个日出。",
          choice: {
            A: { title: "往前走", text: "与其等，不如自己找生路。" },
            B: { title: "原地等待", text: "不乱走，也许救援会先找到我。" }
          }
        },
        {
          scene: "第七天傍晚，远处的地平线上出现了人影。你站起来的瞬间，忽然想起那些留在沙地里的东西——原来取舍，从来不是一件轻松的事。",
          choice: {
            A: { title: "感恩", text: "能活下来，就都值了。" },
            B: { title: "后怕", text: "如果当初选错了，就回不来了。" }
          }
        }
      ],
      regret: "沙地里没能带走的那六样"
    }
  },

  {
    id: "q08",
    type: "multi",
    title: "孤岛余生，只能带 3 样",
    scene: "船难，你漂到一座无人岛。岸边散落着打捞上来的物资，你只能带走三样，然后要在这岛上活过不知道多久。",
    pickCount: 3,
    items: [
      { key: "axe", name: "一把斧头", tag: "生存", desc: "砍树、劈柴、造庇护所" },
      { key: "fishing", name: "渔具", tag: "生存", desc: "解决最要命的吃" },
      { key: "pot", name: "一口锅", tag: "工具", desc: "煮水、煮食、存水" },
      { key: "bible", name: "一本书", tag: "精神", desc: "漫长的孤独里，不疯掉" },
      { key: "photo", name: "一张全家福", tag: "情感", desc: "提醒自己为什么活下去" },
      { key: "radio", name: "一台收音机", tag: "希望", desc: "听听外面的世界，等救援" },
      { key: "flint", name: "打火石", tag: "生存", desc: "火是文明的开始" },
      { key: "seed", name: "一包种子", tag: "希望", desc: "种下明天" }
    ],
    follow: {
      id: "q08",
      title: "孤岛岁月",
      beats: [
        {
          scene: "你在岛上搭起栖身之所。日子一天天过去，你开始明白，孤独比饥饿更熬人。",
          choice: {
            A: { title: "规律生活", text: "给自己定作息，别垮掉。" },
            B: { title: "不断求生", text: "每天找离开的办法。" }
          }
        },
        {
          scene: "不知道第多少天，一艘船出现在海面上。你点燃了篝火，也点燃了回家的路。",
          choice: {
            A: { title: "带走教训", text: "这一课，记一辈子。" },
            B: { title: "只想回家", text: "什么都不想了，只想回家。" }
          }
        }
      ],
      regret: "孤岛上没能带走的那几样"
    }
  },

  {
    id: "q09",
    type: "multi",
    title: "人生只能保留 5 样，你留什么",
    scene: "如果命运要你做一次极简，把人生压缩到只剩五样东西——健康、财富、爱情、自由、事业、尊严、家庭、梦想——你留下哪五样？划掉的那些，就永远不在了。",
    pickCount: 5,
    items: [
      { key: "health", name: "健康", tag: "生命", desc: "没有它，一切都是零", effects: { health: 12 } },
      { key: "wealth", name: "财富", tag: "现实", desc: "钱不是万能，但能换很多自由", effects: { money: 12 } },
      { key: "love", name: "爱情", tag: "情感", desc: "有人爱你，人生才不冷", effects: { happy: 10 } },
      { key: "freedom", name: "自由", tag: "自我", desc: "不为任何人、任何事所困", effects: { happy: 8 } },
      { key: "career", name: "事业", tag: "野心", desc: "做出一番成就，被记住", effects: { money: 8, social: 5 } },
      { key: "dignity", name: "尊严", tag: "自我", desc: "挺直腰杆活一辈子", effects: { happy: 5, social: 3 } },
      { key: "family", name: "家庭", tag: "情感", desc: "亲情是最后的退路", effects: { happy: 8, social: 5 } },
      { key: "dream", name: "梦想", tag: "野心", desc: "人活着，总得有个奔头", effects: { happy: 6, money: 4 } }
    ],
    follow: {
      id: "q09",
      title: "极简人生",
      beats: [
        {
          scene: "你划掉了那些选项，手有点抖。原来要亲手放弃一样东西，比想象中难得多。",
          choice: {
            A: { title: "坦然", text: "留下的，就是我的答案。" },
            B: { title: "反复", text: "划掉之后，又开始舍不得。" }
          }
        },
        {
          scene: "多年后回头看，你会发现，当年选了什么，往往就活成了什么样。",
          choice: {
            A: { title: "不悔", text: "我选的，我认。" },
            B: { title: "感慨", text: "人生啊，真是一道选择题。" }
          }
        }
      ],
      regret: "人生清单里被划掉的那三样"
    }
  },

  {
    id: "q10",
    type: "multi",
    title: "荒年囤货，10 种只能囤 3 种",
    scene: "传闻要变天了，物价飞涨，道路可能要断。你手头有限，只能囤三种东西。囤错了，一家人熬不过去；囤对了，就是全家人的命。",
    pickCount: 3,
    items: [
      { key: "rice", name: "大米", tag: "生存", desc: "最扛饿的主粮" },
      { key: "salt", name: "盐", tag: "生存", desc: "没盐，人撑不久" },
      { key: "med", name: "药品", tag: "生命", desc: "病起来比饿更致命" },
      { key: "fuel", name: "燃料", tag: "生存", desc: "做饭、取暖都靠它" },
      { key: "water", name: "净水", tag: "生存", desc: "水是生命的底线" },
      { key: "seeds", name: "种子", tag: "希望", desc: "熬过这一季，还能再种" },
      { key: "cash", name: "现金", tag: "现实", desc: "关键时候能换命" },
      { key: "gold", name: "金条", tag: "现实", desc: "保值，但也可能一文不值" },
      { key: "canned", name: "罐头", tag: "生存", desc: "即食、耐放" },
      { key: "battery", name: "电池与收音机", tag: "信息", desc: "知道外面发生了什么" }
    ],
    follow: {
      id: "q10",
      title: "荒年",
      beats: [
        {
          scene: "你把东西搬回家，锁好门。外面的世界开始变得陌生，你第一次觉得，安稳是件奢侈的事。",
          choice: {
            A: { title: "守好家", text: "一家人在一起，就是底气。" },
            B: { title: "多打听", text: "多知道一点，就多一点活路。" }
          }
        },
        {
          scene: "风头过去，你打开那扇门。囤的东西有的用上了，有的用不上。你忽然懂了，人这一生，囤什么都不如囤一份心安。",
          choice: {
            A: { title: "释然", text: "熬过来了，就好。" },
            B: { title: "后怕", text: "要是当初囤错了……" }
          }
        }
      ],
      regret: "荒年里没囤到的那几样"
    }
  },

  {
    id: "q11",
    type: "multi",
    title: "临死前，只能见 3 个人",
    scene: "你躺在病床上，医生告诉你时间不多了。你有机会最后见三个人，说最后的话。名单很长，但名额只有三个。",
    pickCount: 3,
    items: [
      { key: "mother", name: "母亲", tag: "情感", desc: "生我养我的人" },
      { key: "father", name: "父亲", tag: "情感", desc: "沉默却扛起一切的人" },
      { key: "spouse", name: "爱人", tag: "情感", desc: "陪我走过半生的人" },
      { key: "child", name: "孩子", tag: "情感", desc: "我最放不下的牵挂" },
      { key: "friend", name: "老友", tag: "情感", desc: "一起疯过、哭过的人" },
      { key: "mentor", name: "恩师", tag: "感恩", desc: "改变我命运的人" },
      { key: "firstlove", name: "初恋", tag: "遗憾", desc: "那个没走到最后的人" },
      { key: "enemy", name: "旧怨", tag: "和解", desc: "那个亏欠或恨过的人" }
    ],
    follow: {
      id: "q11",
      title: "最后的告别",
      beats: [
        {
          scene: "病房的门一次次被推开。你看着那些熟悉的脸，才发现，原来告别也需要勇气。",
          choice: {
            A: { title: "好好道别", text: "把没说的话，都说出来。" },
            B: { title: "笑着离开", text: "不想让他们哭着记住我。" }
          }
        },
        {
          scene: "最后一个人离开后，你望向窗外。这一生值不值，也许就藏在你选了谁、没选谁里。",
          choice: {
            A: { title: "知足", text: "见过想见的人，够了。" },
            B: { title: "不舍", text: "还有好多人，没来得及见。" }
          }
        }
      ],
      regret: "临终前没能见上的那些人"
    }
  },

  {
    id: "q12",
    type: "multi",
    title: "一辈子只能吃 5 种食物",
    scene: "从今往后，你的世界里只剩五种食物，其他的味道会彻底从你记忆里消失。你会留下哪五样，让这一生不至于寡淡？",
    pickCount: 5,
    items: [
      { key: "rice", name: "米饭", tag: "基础", desc: "南方人的命，北方人的主食之一" },
      { key: "noodle", name: "面条", tag: "基础", desc: "一碗热汤面，暖胃暖心" },
      { key: "meat", name: "肉", tag: "满足", desc: "大口吃肉的快乐" },
      { key: "seafood", name: "海鲜", tag: "满足", desc: "鲜掉眉毛的滋味" },
      { key: "vegetable", name: "蔬菜", tag: "健康", desc: "没有它，身体会垮" },
      { key: "fruit", name: "水果", tag: "甜蜜", desc: "一口清甜，像小时候" },
      { key: "chocolate", name: "巧克力", tag: "甜蜜", desc: "难过时的救赎" },
      { key: "chili", name: "辣椒", tag: "刺激", desc: "无辣不欢的快乐" },
      { key: "coffee", name: "咖啡", tag: "精神", desc: "撑起每一个清晨" },
      { key: "hotpot", name: "火锅", tag: "热闹", desc: "吃的是烟火气" }
    ],
    follow: {
      id: "q12",
      title: "五味人生",
      beats: [
        {
          scene: "你对着清单划掉一样又一样，才发现，原来那些不起眼的食物，都曾是你生活的一部分。",
          choice: {
            A: { title: "精选", text: "留下的，都是我真正离不开的。" },
            B: { title: "凑合", text: "能饱就行，哪有那么多讲究。" }
          }
        },
        {
          scene: "很多年后，你在饭桌上看着那五样食物。平淡也好，珍贵也好，能天天吃到的，就是幸福。",
          choice: {
            A: { title: "知足", text: "人间至味，不过寻常。" },
            B: { title: "怀念", text: "偶尔会想念那些再也吃不到的味道。" }
          }
        }
      ],
      regret: "这辈子再也尝不到的那些味道"
    }
  },

  {
    id: "q13",
    type: "multi",
    title: "记忆只能留 4 段",
    scene: "一场意外后，你只能保留四段记忆，其余的一生将被永久清空。你翻遍脑海，要亲手选出那四段最舍不得的。",
    pickCount: 4,
    items: [
      { key: "childhood", name: "童年", tag: "纯真", desc: "那个回不去的夏天" },
      { key: "youth", name: "青春", tag: "炽热", desc: "懵懂又勇敢的年纪" },
      { key: "college", name: "大学", tag: "成长", desc: "第一次离家、第一次独立" },
      { key: "firstjob", name: "第一份工作", tag: "打拼", desc: "第一次为生活低头或抬头" },
      { key: "marriage", name: "婚礼", tag: "幸福", desc: "人生最高光的时刻之一" },
      { key: "birth", name: "孩子出生", tag: "幸福", desc: "第一次当父母的那天" },
      { key: "trip", name: "一场远行", tag: "自由", desc: "看过世界的那次旅行" },
      { key: "lastwords", name: "亲人的告别", tag: "遗憾", desc: "那些没说够的话" }
    ],
    follow: {
      id: "q13",
      title: "记忆的重组",
      beats: [
        {
          scene: "你在空白中一点点拼回那四段记忆。其余的，像沙一样从指缝流走。",
          choice: {
            A: { title: "紧握", text: "留住的，就要记得清清楚楚。" },
            B: { title: "随缘", text: "能记得多少，就多少吧。" }
          }
        },
        {
          scene: "多年后，你成了一个只拥有四段记忆的人。可奇怪的是，你活得反而更清楚——你知道什么对自己最重要。",
          choice: {
            A: { title: "释然", text: "少，反而更清楚。" },
            B: { title: "遗憾", text: "忘记的，才是真正舍不得的。" }
          }
        }
      ],
      regret: "被清空的那一整段人生"
    }
  },

  {
    id: "q14",
    type: "multi",
    title: "如果重来一次，你选哪 4 段人生",
    scene: "给你一次重来的机会，但只能重走人生里的四段。你会把这次机会，押在哪四段上？",
    pickCount: 4,
    items: [
      { key: "birth", name: "出生的家庭", tag: "起点", desc: "换一个更好的起跑线" },
      { key: "study", name: "读书那几年", tag: "成长", desc: "把书读好，少走弯路" },
      { key: "choice", name: "某个关键抉择", tag: "转折", desc: "那次选错了，想改" },
      { key: "love", name: "一段感情", tag: "情感", desc: "好好珍惜那个人" },
      { key: "career", name: "一次事业机会", tag: "野心", desc: "抓住那个风口" },
      { key: "family", name: "陪伴家人的时光", tag: "情感", desc: "少留一点遗憾" },
      { key: "health", name: "爱惜身体", tag: "生命", desc: "别再透支健康" },
      { key: "dream", name: "追一次梦", tag: "自我", desc: "做一件真正想做的事" }
    ],
    follow: {
      id: "q14",
      title: "重来",
      beats: [
        {
          scene: "你站在时间的岔口，四段人生像四张牌摊在眼前。你深吸一口气，做出选择。",
          choice: {
            A: { title: "改变", text: "重来，就是为了不一样的结局。" },
            B: { title: "重温", text: "只是想把美好的，再走一遍。" }
          }
        },
        {
          scene: "重走一遍后你发现，有些遗憾补上了，有些新的遗憾又长了出来。人生，好像永远不完美。",
          choice: {
            A: { title: "放下", text: "不完美，才是人生。" },
            B: { title: "继续追", text: "总想再改一次。" }
          }
        }
      ],
      regret: "这次没能重走的那几段"
    }
  },

  {
    id: "q15",
    type: "multi",
    title: "末日方舟，只能带 6 个人",
    scene: "世界即将倾覆，你登上了一艘能容纳少数人的方舟。你可以选择带六个人上船，其余人将留在岸上，面对未知。",
    pickCount: 6,
    items: [
      { key: "mother", name: "母亲", tag: "至亲", desc: "血浓于水" },
      { key: "father", name: "父亲", tag: "至亲", desc: "沉默的靠山" },
      { key: "spouse", name: "爱人", tag: "至亲", desc: "生死与共的人" },
      { key: "child", name: "孩子", tag: "至亲", desc: "希望的火种" },
      { key: "doctor", name: "一位医生", tag: "价值", desc: "船上的人需要他" },
      { key: "engineer", name: "一位工程师", tag: "价值", desc: "重建文明需要他" },
      { key: "farmer", name: "一位农人", tag: "价值", desc: "有粮，才有人" },
      { key: "child2", name: "别人家的孩子", tag: "善意", desc: "把生的机会让给未来" },
      { key: "oldfriend", name: "多年挚友", tag: "情感", desc: "知己难求" },
      { key: "stranger", name: "一个陌生人", tag: "善意", desc: "陌生人的命，也是命" }
    ],
    follow: {
      id: "q15",
      title: "方舟之上",
      beats: [
        {
          scene: "舱门缓缓关闭，岸上的人越来越远。你攥紧拳头，不敢回头。",
          choice: {
            A: { title: "担起责任", text: "既然选了，就要带他们活下去。" },
            B: { title: "陷入自责", text: "留下的那些，我拿什么偿还。" }
          }
        },
        {
          scene: "洪水退去，你们重见天日。你终于明白，所谓选择，就是背负另一些人的命运。",
          choice: {
            A: { title: "问心", text: "我问心无愧。" },
            B: { title: "沉重", text: "这个选择，会跟我一辈子。" }
          }
        }
      ],
      regret: "没能带上船的那些人"
    }
  },

  {
    id: "q16",
    type: "multi",
    title: "删掉人生的 5 个烦恼",
    scene: "有个机会，能让你永久删掉人生里的五种烦恼，从此再也不会被它们困扰。你会删掉哪五个？",
    pickCount: 5,
    items: [
      { key: "poverty", name: "贫穷", tag: "现实", desc: "再也不用为钱发愁" },
      { key: "sickness", name: "疾病", tag: "生命", desc: "健康地活到老" },
      { key: "loneliness", name: "孤独", tag: "情感", desc: "总有人陪在身旁" },
      { key: "anxiety", name: "焦虑", tag: "精神", desc: "不再内耗、不再失眠" },
      { key: "fear", name: "恐惧", tag: "精神", desc: "天塌下来也不慌" },
      { key: "regret", name: "后悔", tag: "精神", desc: "做过的事，不再耿耿于怀" },
      { key: "boredom", name: "无聊", tag: "精神", desc: "生活永远有趣" },
      { key: "failure", name: "失败", tag: "现实", desc: "做什么都能成" }
    ],
    follow: {
      id: "q16",
      title: "无烦恼人生",
      beats: [
        {
          scene: "烦恼被一个个删掉，你忽然觉得浑身轻松。可心里，好像也空了一块。",
          choice: {
            A: { title: "享受", text: "无债一身轻，真好。" },
            B: { title: "疑惑", text: "没有烦恼，还是我吗？" }
          }
        },
        {
          scene: "很久以后你才明白，那些被你删掉的烦恼，其实也是你活过的证据。",
          choice: {
            A: { title: "接受", text: "烦恼是人生的底色。" },
            B: { title: "不悔", text: "能轻松一点，就轻松一点。" }
          }
        }
      ],
      regret: "被删掉的那些「烦恼」"
    }
  },

  {
    id: "q17",
    type: "multi",
    title: "只留 4 样，带走你的青春",
    scene: "你要去一个很远的地方，行李只能装下四样东西，来代表你的整个青春。你会带走哪四样？",
    pickCount: 4,
    items: [
      { key: "diary", name: "一本日记", tag: "记忆", desc: "写满了少年心事" },
      { key: "photo", name: "一张合照", tag: "情感", desc: "那些一起疯过的朋友" },
      { key: "letter", name: "一封信", tag: "遗憾", desc: "没敢寄出的告白" },
      { key: "trophy", name: "一座奖杯", tag: "成就", desc: "证明自己曾经拼过" },
      { key: "ticket", name: "一张车票", tag: "自由", desc: "第一次独自远行" },
      { key: "guitar", name: "一把吉他", tag: "热爱", desc: "唱过的歌，爱过的梦" },
      { key: "phone", name: "一部旧手机", tag: "记忆", desc: "存着舍不得删的东西" },
      { key: "uniform", name: "一件校服", tag: "纯真", desc: "回不去的教室和夏天" }
    ],
    follow: {
      id: "q17",
      title: "青春的行囊",
      beats: [
        {
          scene: "你把四样东西塞进行李，忽然有点想哭。原来青春那么重，重到只能装下四样。",
          choice: {
            A: { title: "珍藏", text: "把它们收好，别弄丢了。" },
            B: { title: "前行", text: "青春是用来告别的。" }
          }
        },
        {
          scene: "多年后，你打开那个行囊。里面装着的，其实是你一直没舍得放下的自己。",
          choice: {
            A: { title: "怀念", text: "谢谢你，我的青春。" },
            B: { title: "释怀", text: "该放下的，就放下吧。" }
          }
        }
      ],
      regret: "没能带走的那半段青春"
    }
  },

  {
    id: "q18",
    type: "multi",
    title: "荒岛图书馆，只能留 5 本书",
    scene: "你被困在一座孤岛，岛上有个图书馆，但只能留下五本书陪你。你会留下哪五本，熬过漫长的孤独？",
    pickCount: 5,
    items: [
      { key: "bible", name: "一本宗教/哲学书", tag: "精神", desc: "安放灵魂" },
      { key: "novel", name: "一本小说", tag: "慰藉", desc: "在别人的故事里活一次" },
      { key: "survival", name: "一本求生手册", tag: "生存", desc: "教你活下去" },
      { key: "poetry", name: "一本诗集", tag: "慰藉", desc: "孤独时的光" },
      { key: "history", name: "一本历史书", tag: "见识", desc: "看人类走过的路" },
      { key: "diary", name: "一本空白的本子", tag: "表达", desc: "写下自己的故事" },
      { key: "dictionary", name: "一本字典", tag: "工具", desc: "语言的根基" },
      { key: "cookbook", name: "一本食谱", tag: "生存", desc: "把日子过出滋味" }
    ],
    follow: {
      id: "q18",
      title: "孤岛书斋",
      beats: [
        {
          scene: "你抚过那些书脊，最终留下五本。剩下的，你甚至不敢多看一眼。",
          choice: {
            A: { title: "反复读", text: "五本书，读到能背。" },
            B: { title: "省着读", text: "一天一点，怕读完了。" }
          }
        },
        {
          scene: "很多年后，那五本书已经被你翻烂。可你心里明白，真正陪你熬过来的，从来不只是书。",
          choice: {
            A: { title: "感恩", text: "书是船，渡我过海。" },
            B: { title: "释然", text: "孤独教会我的，比书多。" }
          }
        }
      ],
      regret: "没机会再翻开的那几本书"
    }
  },

  {
    id: "q06",
    title: "先结婚生子，还是先拼事业？",
    scene: "你已经到了谈婚论嫁的年纪。家里催得紧，对象也想安定下来。可你的事业正在上升期，一旦结婚生子，势必要慢下来。",
    options: [
      {
        key: "A",
        title: "先成家",
        gain: "安稳的家庭，和一条确定的轨道。",
        lose: "事业的黄金期，可能就这么过去了。",
        follow: {
          id: "q06-A",
          title: "成家",
          beats: [
            {
              scene: "你结了婚，很快有了孩子。生活围着尿布和奶粉打转，事业暂时按下了暂停键。",
              choice: {
                A: { title: "全心顾家", text: "孩子需要你，家也需要你。" },
                B: { title: "两边兼顾", text: "再难，也要给自己留点东西。" }
              }
            },
            {
              scene: "几年后，孩子上学了。你重新回到职场，发现身边都是更年轻、更有冲劲的人。",
              choice: {
                A: { title: "重新出发", text: "慢一点没关系，路还在。" },
                B: { title: "安于现状", text: "就这样，也挺好。" }
              }
            }
          ],
          regret: "事业本该再上一层的那几年"
        }
      },
      {
        key: "B",
        title: "先拼事业",
        gain: "抓住黄金期，给自己挣一个更好的未来。",
        lose: "也许，就错过了那个合适的人。",
        follow: {
          id: "q06-B",
          title: "立业",
          beats: [
            {
              scene: "你把精力都投进事业，一路高歌猛进。只是逢年过节，总是一个人。",
              choice: {
                A: { title: "享受单身", text: "自由也是一种选择。" },
                B: { title: "开始相亲", text: "年纪到了，该找个人了。" }
              }
            },
            {
              scene: "几年后，你事业有成。可看着同龄人朋友圈里的一家三口，心里偶尔会空落落的。",
              choice: {
                A: { title: "顺其自然", text: "对的人，总会来的。" },
                B: { title: "有些后悔", text: "也许当年，不该那么拼。" }
              }
            }
          ],
          regret: "错过的最佳生育年龄和那个人"
        }
      }
    ]
  },

  /* ===== 二选一 · 更多热议题（q19–q30） ===== */

  {
    id: "q19",
    title: "体制内铁饭碗，还是私企高薪？",
    scene: "你同时拿到了两份 offer：一份是体制内的稳定工作，工资不高但旱涝保收；一份是私企的高薪，钱多但随时可能被裁。",
    options: [
      {
        key: "A",
        title: "进体制",
        gain: "一辈子的安稳，和确定的未来。",
        lose: "那些靠拼可能换来的机会和钱。",
        follow: {
          id: "q19-A",
          title: "安稳",
          beats: [
            { scene: "你在体制内按部就班，日子一眼望到头，却踏实。只是同学会上，看着创业的同学，偶尔会走神。", choice: { A: { title: "知足", text: "安稳是福。" }, B: { title: "躁动", text: "偶尔想出去闯闯。" } } },
            { scene: "多年后，你临近退休，有房有车有医保。而那些当年的高薪同学，有的财富自由，有的已经失业。", choice: { A: { title: "庆幸", text: "选择比努力重要。" }, B: { title: "坦然", text: "各有各的活法。" } } }
          ],
          regret: "那些没敢去闯的无限可能"
        }
      },
      {
        key: "B",
        title: "进私企",
        gain: "更高的薪水和更大的成长。",
        lose: "随时可能失去的安全感。",
        follow: {
          id: "q19-B",
          title: "闯荡",
          beats: [
            { scene: "你在私企一路打拼，钱越挣越多，人却越来越累。半夜加班，你偶尔会羡慕那些朝九晚五的人。", choice: { A: { title: "拼下去", text: "趁年轻多挣点。" }, B: { title: "求平衡", text: "钱和身体都要。" } } },
            { scene: "几年后，行业寒冬，你第一次尝到了被裁的滋味。但兜里的积蓄，让你有底气重新开始。", choice: { A: { title: "庆幸攒钱", text: "有钱才有选择权。" }, B: { title: "后悔", text: "早知道不如求个安稳。" } } }
          ],
          regret: "那份触手可及的安稳"
        }
      }
    ]
  },

  {
    id: "q20",
    title: "大城市首付，还是老家全款？",
    scene: "你攒了这些年的钱，够在老家全款买一套大房子，却只够在大城市付个首付、背上三十年房贷。",
    options: [
      {
        key: "A",
        title: "老家全款",
        gain: "无债一身轻，住得宽敞。",
        lose: "大城市的机会和孩子的教育。",
        follow: {
          id: "q20-A",
          title: "安居",
          beats: [
            { scene: "你在老家买了房，全款付清，剩下的钱还能存起来。日子慢下来，只是夜深时会想，如果留在大城市会怎样。", choice: { A: { title: "安心", text: "无债就是自由。" }, B: { title: "不甘", text: "总觉得自己还能再拼。" } } },
            { scene: "多年后，孩子要上学了。老家的教育资源，到底比不上一线城市。你开始重新掂量当年的选择。", choice: { A: { title: "认命", text: "各有各的命。" }, B: { title: "弥补", text: "砸钱给孩子更好的教育。" } } }
          ],
          regret: "那套大城市房子背后的机会"
        }
      },
      {
        key: "B",
        title: "大城市首付",
        gain: "留在大城市，资产也在增值。",
        lose: "三十年房贷，和不敢生病的生活。",
        follow: {
          id: "q20-B",
          title: "背债",
          beats: [
            { scene: "你咬牙付了首付，从此每月工资大半进了银行。你不敢失业，不敢生病，活得战战兢兢。", choice: { A: { title: "咬牙供", text: "熬过最难的几年。" }, B: { title: "及时止损", text: "不行就卖了回老家。" } } },
            { scene: "十年后，房价翻了一倍。你那套小房子，成了你人生的第一桶金。", choice: { A: { title: "庆幸", text: "当年的债，值了。" }, B: { title: "后怕", text: "这十年，太不容易。" } } }
          ],
          regret: "那些年被房贷压着过的日子"
        }
      }
    ]
  },

  {
    id: "q21",
    title: "丁克，还是生个孩子？",
    scene: "你到了该考虑生育的年纪。身边同龄人纷纷晒娃，可你更享受现在自由自在、说走就走的生活。",
    options: [
      {
        key: "A",
        title: "丁克",
        gain: "一辈子的自由和轻松。",
        lose: "老了之后，也许无人依靠。",
        follow: {
          id: "q21-A",
          title: "自由",
          beats: [
            { scene: "你和伴侣决定不要孩子，把时间和钱都花在自己身上。旅行、兴趣、事业，日子过得潇洒。", choice: { A: { title: "享受", text: "这就是我想要的生活。" }, B: { title: "偶尔羡慕", text: "看到别人的孩子会心软。" } } },
            { scene: "多年后，你们渐渐老去。看着别人家儿孙绕膝，你们相视一笑，各有各的圆满。", choice: { A: { title: "笃定", text: "我们选的路，我们认。" }, B: { title: "后悔", text: "当初是不是该要一个。" } } }
          ],
          regret: "那个没能来到这个世界的孩子"
        }
      },
      {
        key: "B",
        title: "生个孩子",
        gain: "生命的延续，和晚年的陪伴。",
        lose: "自己的时间、精力和大把金钱。",
        follow: {
          id: "q21-B",
          title: "为人父母",
          beats: [
            { scene: "孩子出生，你的人生从此翻天覆地。屎尿屁、辅导作业、家长会，你累并幸福着。", choice: { A: { title: "乐在其中", text: "累是累，但值得。" }, B: { title: "偶尔崩溃", text: "太累了，想喘口气。" } } },
            { scene: "多年后，孩子长大成人，有了自己的家。逢年过节，一家人围坐一桌，你忽然觉得，一切都值了。", choice: { A: { title: "欣慰", text: "这就是家的意义。" }, B: { title: "疲惫", text: "这一路，太不容易。" } } }
          ],
          regret: "那些再也没能拥有的自由时光"
        }
      }
    ]
  },

  {
    id: "q22",
    title: "35 岁被裁拿赔偿，还是继续熬？",
    scene: "公司裁员，你正好 35 岁。摆在你面前两条路：拿一笔赔偿金走人，从头再来；或者接受降职降薪，继续熬下去。",
    options: [
      {
        key: "A",
        title: "拿赔偿走人",
        gain: "一笔钱，和一次重新开始的机会。",
        lose: "35 岁再就业的艰难。",
        effects: { money: 10, happy: -8, social: -5 },
        trigger: { unlock: "debt", regret: "那份原本以为能到老的工作" },
        follow: {
          id: "q22-A",
          title: "重启",
          beats: [
            { scene: "你拿了赔偿金，开始找工作。可 35 岁的简历投出去，石沉大海。你第一次体会到年龄的残酷。", choice: { A: { title: "咬牙转型", text: "学新东西，重新来过。" }, B: { title: "降级求稳", text: "先有份工作再说。" } } },
            { scene: "一年后，你终于找到一条新路。虽然收入不如从前，但你发现，人生原来还有别的活法。", choice: { A: { title: "庆幸", text: "被迫改变，反而是转机。" }, B: { title: "艰难", text: "这一年，太苦了。" } } }
          ],
          regret: "那份原本以为能到老的工作"
        }
      },
      {
        key: "B",
        title: "继续熬",
        gain: "保住饭碗，和那份熟悉的安全感。",
        lose: "降职降薪，尊严和前途都受损。",
        follow: {
          id: "q22-B",
          title: "硬撑",
          beats: [
            { scene: "你接受了降职降薪，心里不是滋味。可看着还贷的账单，你只能咬牙坚持。", choice: { A: { title: "卧薪尝胆", text: "先苟着，找机会翻身。" }, B: { title: "得过且过", text: "混一天是一天。" } } },
            { scene: "几年后，公司缓了过来。可你发现，那些没被裁的人，都升了职，而你的位置已经很难再往上走。", choice: { A: { title: "释然", text: "安稳就好。" }, B: { title: "悔恨", text: "当初就该拿钱走人。" } } }
          ],
          regret: "那笔赔偿金和重新开始的机会"
        }
      }
    ]
  },

  {
    id: "q23",
    title: "裸辞追梦，还是苟着攒钱？",
    scene: "你有一件一直想做的事，也许是写作、也许是开咖啡馆、也许是创业。可现在的工资虽然不喜欢，却稳定地供着你的房贷和生活。",
    options: [
      {
        key: "A",
        title: "裸辞追梦",
        gain: "全力去搏一次梦想。",
        lose: "稳定的收入，和可能失败的风险。",
        follow: {
          id: "q23-A",
          title: "追梦",
          beats: [
            { scene: "你递了辞职信，全身心投入梦想。起初热血沸腾，很快就被现实泼了冷水——钱花得比想象中快。", choice: { A: { title: "坚持", text: "再难也要撑到有结果。" }, B: { title: "边做边谋生", text: "找个兼职先养着梦想。" } } },
            { scene: "几年后，你的梦想或成或败。但你不后悔，因为你终于为自己活过一次。", choice: { A: { title: "无悔", text: "试过，就不遗憾。" }, B: { title: "释然", text: "至少我努力过了。" } } }
          ],
          regret: "那些年本可以攒下的积蓄"
        }
      },
      {
        key: "B",
        title: "苟着攒钱",
        gain: "稳定的生活，和一笔存款。",
        lose: "那个可能再也追不回的梦想。",
        follow: {
          id: "q23-B",
          title: "苟着",
          beats: [
            { scene: "你继续上班，把梦想放在心底。偶尔在深夜，你会翻出那些半途而废的计划，叹一口气。", choice: { A: { title: "攒钱等时机", text: "攒够了再去做。" }, B: { title: "放弃", text: "算了吧，就这样吧。" } } },
            { scene: "多年后，你攒下了一笔钱，可当初的那股心气，已经凉了。你发现，梦想这东西，过了年纪就过期了。", choice: { A: { title: "遗憾", text: "当年要是勇敢一点……" }, B: { title: "释然", text: "安稳也是种选择。" } } }
          ],
          regret: "那个被搁置了一辈子的梦想"
        }
      }
    ]
  },

  {
    id: "q24",
    title: "相亲结婚，还是等真爱？",
    scene: "你已过而立之年，家里催婚催得紧。相亲对象条件不错，但谈不上心动；而你心里，还在等一个可能永远等不到的人。",
    options: [
      {
        key: "A",
        title: "相亲结婚",
        gain: "安稳的家庭，和世俗的圆满。",
        lose: "那份心动的、热烈的爱情。",
        follow: {
          id: "q24-A",
          title: "将就",
          beats: [
            { scene: "你和相亲对象结了婚，日子平淡却踏实。只是深夜，你偶尔会想起那个没等到的人。", choice: { A: { title: "经营婚姻", text: "感情是处出来的。" }, B: { title: "怀念从前", text: "心里总有个位置空着。" } } },
            { scene: "多年后，你们也有了一双儿女，成了别人眼中的圆满家庭。你渐渐明白，婚姻不是爱情，是责任和陪伴。", choice: { A: { title: "知足", text: "平平淡淡才是真。" }, B: { title: "遗憾", text: "终究少了点心动。" } } }
          ],
          regret: "那份可能存在的真爱"
        }
      },
      {
        key: "B",
        title: "等真爱",
        gain: "忠于内心，不将就。",
        lose: "可能等到最后，孤身一人。",
        follow: {
          id: "q24-B",
          title: "等待",
          beats: [
            { scene: "你拒绝了一次次相亲，坚守着内心的标准。身边人一个个结婚，你开始怀疑自己是不是错了。", choice: { A: { title: "继续等", text: "宁缺毋滥。" }, B: { title: "开始动摇", text: "要不，将就一下？" } } },
            { scene: "多年后，你也许等到了，也许没有。但你始终是自由的，忠于自己的。", choice: { A: { title: "无悔", text: "等一个值得的人，不亏。" }, B: { title: "释然", text: "一个人，也能过得很好。" } } }
          ],
          regret: "那些本可以安稳相守的岁月"
        }
      }
    ]
  },

  {
    id: "q25",
    title: "加班换钱，还是健康第一？",
    scene: "你的工作强度极大，加班是家常便饭，但回报丰厚。你的身体已经发出了警告，医生也劝你注意休息。",
    options: [
      {
        key: "A",
        title: "继续加班",
        gain: "更高的收入，更快的晋升。",
        lose: "健康，和陪伴家人的时间。",
        follow: {
          id: "q25-A",
          title: "拼命",
          beats: [
            { scene: "你继续没日没夜地干，职位和收入一路上涨。直到有一天，你在工位上眼前一黑。", choice: { A: { title: "停下来休整", text: "命比钱重要。" }, B: { title: "继续硬扛", text: "再撑一撑就到了。" } } },
            { scene: "病床上，你看着窗外的天空，忽然觉得，那些熬过的夜，到底值不值得。", choice: { A: { title: "悔悟", text: "健康没了，什么都没了。" }, B: { title: "不甘", text: "可我不拼，又能怎么办。" } } }
          ],
          regret: "被透支掉的健康和陪伴"
        }
      },
      {
        key: "B",
        title: "健康第一",
        gain: "健康的身体，和真正的生活。",
        lose: "晋升的机会，和更高的收入。",
        follow: {
          id: "q25-B",
          title: "惜命",
          beats: [
            { scene: "你开始拒绝无意义的加班，按时下班、规律作息。收入涨得慢了，但你重新找回了生活的节奏。", choice: { A: { title: "享受生活", text: "这才叫活着。" }, B: { title: "偶尔焦虑", text: "看着同事升职会慌。" } } },
            { scene: "多年后，你身体硬朗，而那些拼命的前同事，有的已经疾病缠身。你庆幸当初的选择。", choice: { A: { title: "庆幸", text: "健康是最大的财富。" }, B: { title: "遗憾", text: "钱到底是少了些。" } } }
          ],
          regret: "错过的那一拨晋升和财富"
        }
      }
    ]
  },

  {
    id: "q26",
    title: "赡养父母，还是追逐远方？",
    scene: "你在外地发展得不错，可父母年纪越来越大，身体也大不如前。是留在大城市打拼，还是回到父母身边尽孝？",
    options: [
      {
        key: "A",
        title: "追逐远方",
        gain: "事业和更广阔的人生。",
        lose: "陪伴父母的时光，错过了就没了。",
        follow: {
          id: "q26-A",
          title: "远方",
          beats: [
            { scene: "你继续在外打拼，父母在电话里总说「别担心，我们很好」。你信了，也心安了。", choice: { A: { title: "多打电话", text: "常联系，常回家。" }, B: { title: "专心事业", text: "等我出息了，再好好孝顺。" } } },
            { scene: "多年后，你事业有成，终于有时间回家了。可父母的白发，已经藏不住了。", choice: { A: { title: "弥补", text: "把亏欠的陪伴补回来。" }, B: { title: "遗憾", text: "子欲养而亲不待。" } } }
          ],
          regret: "那些没能陪在父母身边的日子"
        }
      },
      {
        key: "B",
        title: "回到父母身边",
        gain: "尽孝，不留遗憾。",
        lose: "那个更大的世界，和事业的上限。",
        follow: {
          id: "q26-B",
          title: "尽孝",
          beats: [
            { scene: "你回到父母身边，找了份安稳的工作。日子平淡，但一家人整整齐齐，你心里踏实。", choice: { A: { title: "安心", text: "陪在父母身边，值。" }, B: { title: "不甘", text: "偶尔会想，外面是不是更好。" } } },
            { scene: "多年后，父母安详地离去。你守在床边，握着他们的手，心里没有遗憾。", choice: { A: { title: "无憾", text: "该做的，我都做了。" }, B: { title: "释然", text: "人生总有取舍。" } } }
          ],
          regret: "那个没能去闯的远方"
        }
      }
    ]
  },

  {
    id: "q27",
    title: "买房背贷，还是租房自由？",
    scene: "到了该安家的年纪。买房意味着背上几十年房贷、被绑在一个城市；租房则灵活自由，但永远没有归属感。",
    options: [
      {
        key: "A",
        title: "买房背贷",
        gain: "一个真正属于自己的家。",
        lose: "几十年的还贷压力，和选择自由。",
        follow: {
          id: "q27-A",
          title: "安家",
          beats: [
            { scene: "你签下购房合同，从此有了自己的家。虽然每月还贷心疼，但推开家门的那一刻，你觉得自己终于扎下了根。", choice: { A: { title: "安心", text: "有房，就有根。" }, B: { title: "焦虑", text: "房贷压得人喘不过气。" } } },
            { scene: "多年后，房贷还清，房子也升了值。你坐在自己的客厅里，觉得当年的决定是对的。", choice: { A: { title: "庆幸", text: "幸亏当年买了。" }, B: { title: "释然", text: "房子终究是身外物。" } } }
          ],
          regret: "那些被房贷束缚住的自由"
        }
      },
      {
        key: "B",
        title: "租房自由",
        gain: "自由迁徙，不被房贷绑架。",
        lose: "永远没有属于自己的家。",
        follow: {
          id: "q27-B",
          title: "漂泊",
          beats: [
            { scene: "你选择租房，想去哪座城市就去哪座。可每到搬家，看着一箱箱行李，你也会渴望一个真正的家。", choice: { A: { title: "享受自由", text: "此心安处是吾乡。" }, B: { title: "渴望安定", text: "漂泊久了，想停下来了。" } } },
            { scene: "多年后，房价早已高不可攀。你租了半辈子房，偶尔会想，当年要是买了，会不会不一样。", choice: { A: { title: "释然", text: "各有各的活法。" }, B: { title: "后悔", text: "终究是错过了。" } } }
          ],
          regret: "那个错过的、属于自己的家"
        }
      }
    ]
  },

  {
    id: "q28",
    title: "要不要生二胎？",
    scene: "你们已经有了一个孩子，生活刚刚走上正轨。可两边老人都在劝「趁年轻再生一个」，你们却担心精力和经济都不够。",
    options: [
      {
        key: "A",
        title: "生二胎",
        gain: "孩子有个伴，家里更热闹。",
        lose: "更多的精力和经济压力。",
        follow: {
          id: "q28-A",
          title: "再添一口",
          beats: [
            { scene: "二胎出生，家里鸡飞狗跳。你和大娃一样，重新经历了一遍手忙脚乱，钱包也迅速瘪下去。", choice: { A: { title: "咬牙坚持", text: "熬过这几年就好了。" }, B: { title: "请人帮忙", text: "能花钱解决的事，别硬扛。" } } },
            { scene: "多年后，两个孩子一起长大、互相扶持。看着他们打闹的身影，你觉得一切都值了。", choice: { A: { title: "欣慰", text: "有伴的童年，真好。" }, B: { title: "疲惫", text: "这一路，太累了。" } } }
          ],
          regret: "那些本可以轻松一点的时光"
        }
      },
      {
        key: "B",
        title: "只要一个",
        gain: "把所有的爱和资源，都给一个孩子。",
        lose: "孩子将来，可能没有兄弟姐妹。",
        follow: {
          id: "q28-B",
          title: "独生子女",
          beats: [
            { scene: "你们坚持只要一个，把最好的都给了他。孩子在一个不缺爱的环境里长大。", choice: { A: { title: "全力培养", text: "一个孩子，更要好好培养。" }, B: { title: "顺其自然", text: "健康快乐就好。" } } },
            { scene: "多年后，孩子长大成人。他偶尔会羡慕有兄弟姐妹的朋友，而你也会想，当初是不是该再要一个。", choice: { A: { title: "坚定", text: "一个孩子，也能很圆满。" }, B: { title: "遗憾", text: "也许，他该有个伴的。" } } }
          ],
          regret: "那个没能来到这个世界的第二个孩子"
        }
      }
    ]
  },

  {
    id: "q29",
    title: "稳定但无聊的工作，还是冒险但有激情的事业？",
    scene: "你现在的工作稳定、清闲，但一眼望到头，毫无激情。另一边，是一个风险高、但让你热血沸腾的创业机会。",
    options: [
      {
        key: "A",
        title: "守住稳定",
        gain: "安稳的生活，和确定的未来。",
        lose: "那些可能让你热血沸腾的可能。",
        follow: {
          id: "q29-A",
          title: "守成",
          beats: [
            { scene: "你继续做着稳定的工作，日子平淡如水。只是夜深人静，你偶尔会问自己：这一生，就这样了吗？", choice: { A: { title: "安于现状", text: "平凡也是福。" }, B: { title: "蠢蠢欲动", text: "总想搞点事情。" } } },
            { scene: "多年后，你安稳退休。而那些当年去创业的人，有的成了，有的败了。你泡着茶，心里说不清是什么滋味。", choice: { A: { title: "知足", text: "安稳一生，也是赢。" }, B: { title: "遗憾", text: "这一生，未免太平淡。" } } }
          ],
          regret: "那些从未尝试过的激情和可能"
        }
      },
      {
        key: "B",
        title: "选择冒险",
        gain: "为热爱燃烧一次的可能。",
        lose: "安稳的生活，和可能血本无归的风险。",
        follow: {
          id: "q29-B",
          title: "创业",
          beats: [
            { scene: "你辞掉工作，投身创业。起早贪黑、四处碰壁，你第一次体会到什么叫「把命押上去」。", choice: { A: { title: "死磕到底", text: "不成功，便成仁。" }, B: { title: "及时调整", text: "方向错了，就换个方向。" } } },
            { scene: "几年后，你的项目或成或败。但你不再焦虑，因为你终于为自己真正活过、拼过。", choice: { A: { title: "无悔", text: "拼过，就不留遗憾。" }, B: { title: "释然", text: "至少我试过了。" } } }
          ],
          regret: "那段本可以安稳度过的日子"
        }
      }
    ]
  },

  {
    id: "q30",
    title: "嫁/娶喜欢的人，还是合适的人？",
    scene: "一边是你深爱但未来不确定的人，一边是条件合适、门当户对但没那么心动的人。婚姻这道题，你选哪个？",
    options: [
      {
        key: "A",
        title: "嫁给喜欢",
        gain: "嫁给爱情，此生无憾。",
        lose: "未来可能要为柴米油盐发愁。",
        follow: {
          id: "q30-A",
          title: "为爱",
          beats: [
            { scene: "你和爱的人走进婚姻。起初甜蜜，很快被现实打磨——钱、房子、琐事，爱情似乎没那么坚固了。", choice: { A: { title: "共同面对", text: "一起扛，感情更牢。" }, B: { title: "开始动摇", text: "原来爱不能当饭吃。" } } },
            { scene: "多年后，你们熬过了最难的阶段，感情在磨砺中愈发深厚。你握着对方的手，庆幸当初的选择。", choice: { A: { title: "无悔", text: "爱，就是一起扛。" }, B: { title: "感慨", text: "这一路，不容易。" } } }
          ],
          regret: "那份更安稳、更轻松的生活"
        }
      },
      {
        key: "B",
        title: "嫁给合适",
        gain: "门当户对，日子安稳踏实。",
        lose: "那份刻骨铭心的心动。",
        follow: {
          id: "q30-B",
          title: "合适",
          beats: [
            { scene: "你和合适的人结婚，生活按部就班、波澜不惊。对方很好，可你总觉得少了点什么。", choice: { A: { title: "用心经营", text: "感情可以慢慢培养。" }, B: { title: "怀念从前", text: "总想起那个让你心动的人。" } } },
            { scene: "多年后，你们相敬如宾，把日子过得红红火火。你渐渐明白，婚姻里，合适或许比心动更长久。", choice: { A: { title: "释然", text: "合适，也是一种圆满。" }, B: { title: "遗憾", text: "这一生，终究没心动过。" } } }
          ],
          regret: "那份错过的心动与热烈"
        }
      }
    ]
  },
  {
    id: "q31",
    title: "毕业就失业，回小城考编，还是留大城市闯荡？",
    scene: "你刚毕业，投了上百份简历石沉大海。父母催你回家考公务员，说稳定是一辈子的保障；可你又舍不得大城市的灯火和可能性。",
    options: [
      {
        key: "A",
        title: "回小城考编",
        gain: "一份旱涝保收的铁饭碗，父母的安心。",
        lose: "那个还没开始闯的大世界，和无限的可能性。",
        trigger: { unlock: "hometown", regret: "那个未曾踏足的大城市" },
        follow: {
          id: "q31-A",
          title: "安稳",
          beats: [
            { scene: "你回到小城，考上编制。日子安稳，可每到深夜刷到同学在大城市的朋友圈，心里总有一丝说不清的痒。", choice: { A: { title: "认命", text: "稳定就是最大的福气。" }, B: { title: "不甘", text: "要是当初闯一闯，会不会不一样？" } } },
            { scene: "多年后，你成了小城里受人尊敬的人。那些闯荡的同学有的发达了，有的落魄了。你忽然觉得，安稳也是一种选择。", choice: { A: { title: "释然", text: "各有各的活法。" }, B: { title: "释怀", text: "没有哪一种人生更高级。" } } }
          ],
          regret: "那个未曾踏足的大城市"
        }
      },
      {
        key: "B",
        title: "留大城市闯",
        gain: "无限的可能，和一颗不肯服输的心。",
        lose: "那份唾手可得的安稳，和父母的陪伴。",
        trigger: { unlock: "hometown", regret: "那份安稳与父母的陪伴" },
        follow: {
          id: "q31-B",
          title: "闯荡",
          beats: [
            { scene: "你在大城市租下十平米的小屋，挤地铁、熬大夜、被现实反复捶打。有时深夜你会想，是不是该回家了。", choice: { A: { title: "咬牙坚持", text: "再难，也要看到结果。" }, B: { title: "开始动摇", text: "安稳，好像也没那么差。" } } },
            { scene: "几年后，你终于在城市站稳了脚跟。回头看，那些咬牙的日子，都成了你向上爬的阶梯。", choice: { A: { title: "值得", text: "不闯，怎么知道行不行。" }, B: { title: "感慨", text: "这一路，太不容易。" } } }
          ],
          regret: "那份安稳与父母的陪伴"
        }
      }
    ]
  },
  {
    id: "q32",
    title: "裸婚，还是先攒够钱再结婚？",
    scene: "你和相爱多年的恋人到了谈婚论嫁的年纪。可首付、彩礼、婚礼，一样都没着落。是先领证裸婚、一起打拼，还是再熬几年等条件成熟？",
    options: [
      {
        key: "A",
        title: "裸婚，一起拼",
        gain: "早一步把爱人变成家人，共同进退。",
        lose: "一份体面的婚礼，和不必为钱发愁的起点。",
        follow: {
          id: "q32-A",
          title: "裸婚",
          beats: [
            { scene: "你们没房没车，只扯了张证。日子苦，但两个人劲儿往一处使，反而把苦熬出了甜。", choice: { A: { title: "同甘共苦", text: "一起扛，才有意义。" }, B: { title: "偶尔委屈", text: "别人有的，我们为什么没有。" } } },
            { scene: "几年后，你们终于攒下首付，补办了一场迟到的婚礼。你看着对方，觉得这一切都值了。", choice: { A: { title: "无憾", text: "苦尽甘来。" }, B: { title: "庆幸", text: "幸好没放开彼此的手。" } } }
          ],
          regret: "那场盛大的婚礼和更轻松的起点"
        }
      },
      {
        key: "B",
        title: "攒够钱再结",
        gain: "一个体面、无后顾之忧的开始。",
        lose: "几年青春，和可能等不起的爱人。",
        follow: {
          id: "q32-B",
          title: "再等等",
          beats: [
            { scene: "你们为攒钱拼了命加班，见面的次数越来越少。钱在变多，感情却在悄悄变淡。", choice: { A: { title: "守住感情", text: "别让钱毁了爱。" }, B: { title: "继续拼", text: "再熬一熬，马上就好了。" } } },
            { scene: "终于，你们有了一切，却在那场筹备中的婚礼前夕，因为一句「太累了」分了手。", choice: { A: { title: "遗憾", text: "原来爱，等不起。" }, B: { title: "释怀", text: "或许这就是命。" } } }
          ],
          regret: "那段被等待耗尽的爱情"
        }
      }
    ]
  },
  {
    id: "q33",
    title: "创业，还是继续打工？",
    scene: "你在公司干了几年，攒了些本钱，也攒了一肚子想法。是辞职去创业、赌一个未来，还是继续打工、拿那份看得见的薪水？",
    options: [
      {
        key: "A",
        title: "辞职创业",
        gain: "可能翻身的未来，和做自己事业的机会。",
        lose: "那份稳定的收入，和几年攒下的积蓄。",
        follow: {
          id: "q33-A",
          title: "创业",
          beats: [
            { scene: "你租了间小办公室，招了几个伙伴。头几个月，入不敷出，你夜夜焦虑得睡不着。", choice: { A: { title: "死撑", text: "创业就是九死一生。" }, B: { title: "想放弃", text: "要不，回去上班吧。" } } },
            { scene: "熬过最难的一年，公司终于跑通了。虽然远没到大富大贵，但你第一次觉得，人生握在自己手里。", choice: { A: { title: "无悔", text: "拼过，才不遗憾。" }, B: { title: "后怕", text: "要是当初没撑住……" } } }
          ],
          regret: "那份安稳的薪水和睡眠"
        }
      },
      {
        key: "B",
        title: "继续打工",
        gain: "稳定的收入，和不那么焦虑的日子。",
        lose: "那个可能改变命运的创业机会。",
        follow: {
          id: "q33-B",
          title: "打工",
          beats: [
            { scene: "你继续朝九晚五，日子平稳。可看到当年一起想创业的伙伴做起来了，你心里会泛起一阵酸。", choice: { A: { title: "羡慕", text: "他赶上了风口。" }, B: { title: "知足", text: "安稳，也是一种选择。" } } },
            { scene: "多年后，你成了公司里资历最老的员工，日子不差，只是偶尔会想：如果当初赌一把呢？", choice: { A: { title: "淡然", text: "各有各的命。" }, B: { title: "一丝遗憾", text: "那个没敢赌的自己。" } } }
          ],
          regret: "那个没敢去赌的创业梦"
        }
      }
    ]
  },
  {
    id: "q34",
    title: "要不要辞职去读研/深造？",
    scene: "工作几年，你感到瓶颈，心里一直想再深造。可辞职去读书，意味着断掉收入、赌上几年时间，还不一定换来更好的出路。",
    options: [
      {
        key: "A",
        title: "辞职深造",
        gain: "更高的学历，和一次重新选择赛道的可能。",
        lose: "几年的收入，和职场上积累的位置。",
        follow: {
          id: "q34-A",
          title: "深造",
          beats: [
            { scene: "你回到校园，重拾书本。看着比你还年轻的同学，你既羡慕又焦虑：这笔时间和金钱的账，真的能算回来吗？", choice: { A: { title: "全力以赴", text: "既然选了，就做到最好。" }, B: { title: "时常怀疑", text: "这会不会是场豪赌？" } } },
            { scene: "毕业后，你凭新学历和新视野，拿到了一份过去够不着的 offer。你终于相信，投资自己没错。", choice: { A: { title: "值得", text: "人生没有白走的路。" }, B: { title: "庆幸", text: "当初顶住了压力。" } } }
          ],
          regret: "那几年断掉的收入和上升期"
        }
      },
      {
        key: "B",
        title: "留在职场",
        gain: "不中断的收入和上升通道。",
        lose: "那份更高的学历，和换赛道的机会。",
        follow: {
          id: "q34-B",
          title: "留下",
          beats: [
            { scene: "你放弃了深造，继续在职场打拼。几年后，你卡在了学历的门槛上，晋升无望。", choice: { A: { title: "后悔", text: "当初该去读的。" }, B: { title: "另找出路", text: "学历不是唯一的路。" } } },
            { scene: "你凭经验和人脉，跳槽到了一家更好的公司。学历的短板，被你的能力补上了。", choice: { A: { title: "释然", text: "条条大路通罗马。" }, B: { title: "暗自庆幸", text: "没白熬这几年。" } } }
          ],
          regret: "那个错过的深造机会"
        }
      }
    ]
  },
  {
    id: "q35",
    title: "要不要把父母接来同住？",
    scene: "父母年事渐高，身体也不如从前。把他们接来身边，可以尽孝，却要牺牲自己的空间和生活节奏；让他们留在老家，又放不下心。",
    options: [
      {
        key: "A",
        title: "接来同住",
        gain: "朝夕陪伴，不留「子欲养而亲不待」的遗憾。",
        lose: "自己的空间、自由，和两代人生活方式的磨合。",
        follow: {
          id: "q35-A",
          title: "同住",
          beats: [
            { scene: "父母搬来后，饭有人做、屋有人暖，可两代人的生活习惯冲突不断，你夹在中间，疲惫又委屈。", choice: { A: { title: "耐心磨合", text: "亲情，就是要互相将就。" }, B: { title: "怀念独处", text: "原来自由这么珍贵。" } } },
            { scene: "多年后，父亲卧病，你守在床边，心里没有一丝遗憾。那些磨合的辛苦，都值了。", choice: { A: { title: "无憾", text: "尽了孝，才安心。" }, B: { title: "感慨", text: "陪伴，是最长情的告白。" } } }
          ],
          regret: "那份独处的自由与空间"
        }
      },
      {
        key: "B",
        title: "留在老家",
        gain: "保住自己的生活节奏和空间。",
        lose: "与父母朝夕相处的日子，和随时尽孝的机会。",
        follow: {
          id: "q35-B",
          title: "远孝",
          beats: [
            { scene: "你每月寄钱、频繁视频，可隔着屏幕，你总觉得缺了点什么。父母报喜不报忧，你无从知晓。", choice: { A: { title: "常回家看看", text: "多跑几趟，比什么都强。" }, B: { title: "心存愧疚", text: "陪伴，还是太少了。" } } },
            { scene: "父亲生病住院，你才从电话里知道。那一刻你狂奔回家，心里翻江倒海：如果早点接他们过来……", choice: { A: { title: "下定决心", text: "再难也要接过来。" }, B: { title: "深深自责", text: "我欠他们的，太多。" } } }
          ],
          regret: "那些没陪在父母身边的日子"
        }
      }
    ]
  },
  {
    id: "q36",
    title: "先买房，还是先买车？",
    scene: "攒了几年钱，你终于有了一笔可观的积蓄。是先买房，把自己绑在几十年的房贷上；还是先买车，享受当下的便利和体面？",
    options: [
      {
        key: "A",
        title: "先买房",
        gain: "一个属于自己的家，和城市的入场券。",
        lose: "几十年的房贷，和因此被压缩的生活品质。",
        follow: {
          id: "q36-A",
          title: "买房",
          beats: [
            { scene: "你背上了三十年房贷，每月工资大半交给银行。日子紧巴巴，可每次回到自己的小窝，又觉得踏实。", choice: { A: { title: "咬牙供", text: "有房，才有根。" }, B: { title: "有点喘", text: "这房，压得人好累。" } } },
            { scene: "几年后，房价涨了，你的房子升值不少。当初的咬牙，如今看来是笔不错的投资。", choice: { A: { title: "庆幸", text: "幸好上车早。" }, B: { title: "淡然", text: "房住不炒，安稳就好。" } } }
          ],
          regret: "那几年被房贷压住的生活"
        }
      },
      {
        key: "B",
        title: "先买车",
        gain: "出行的自由，和当下的体面。",
        lose: "错过的买房时机，和可能上涨的房价。",
        follow: {
          id: "q36-B",
          title: "买车",
          beats: [
            { scene: "你开着新车，接送家人、自驾出游，日子惬意。可眼看着房价一路涨，你心里越来越慌。", choice: { A: { title: "赶紧凑首付", text: "不能再拖了。" }, B: { title: "继续观望", text: "说不定会跌。" } } },
            { scene: "房价最终涨到了你够不着的高度。你望着车，又望着租的房子，叹了口气。", choice: { A: { title: "后悔", text: "当初该先买房的。" }, B: { title: "释然", text: "车也带来了不少快乐。" } } }
          ],
          regret: "那个错过的上车机会"
        }
      }
    ]
  },
  {
    id: "q37",
    title: "多选限选 · 如果突然获得 1 个亿，你要怎么花？",
    scene: "命运开了个玩笑，你突然拥有了一亿元。但有个规则：你只能把钱花在四件事上，其余的，会原封不动地消失。你怎么选？",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "family", name: "给家人买最好的", tag: "情感", desc: "让爱你的人过上好日子" },
      { key: "house", name: "买豪宅", tag: "现实", desc: "一个住得心安的家" },
      { key: "travel", name: "环游世界", tag: "自由", desc: "看遍世间风景" },
      { key: "donate", name: "捐给需要的人", tag: "善意", desc: "让这钱帮到更多人" },
      { key: "invest", name: "投资钱生钱", tag: "野心", desc: "让一亿变两亿" },
      { key: "dream", name: "实现自己的梦", tag: "梦想", desc: "做那件一直想做没敢做的事" },
      { key: "secure", name: "存起来吃利息", tag: "现实", desc: "一辈子衣食无忧" },
      { key: "freedom", name: "从此不再上班", tag: "自由", desc: "赎回自己的时间" }
    ],
    follow: {
      id: "q37-follow",
      title: "横财之后",
      beats: [
        { scene: "一亿元花完，你发现有些东西是钱买不来的——比如内心的安宁，比如那些无法用钱衡量的关系。", choice: { A: { title: "知足", text: "钱花在刀刃上，值了。" }, B: { title: "怅然", text: "原来钱，也不是万能的。" } } },
        { scene: "多年后，你回望这笔横财，庆幸自己没有挥霍。它改变了很多，却没能改变你最想改变的那件事。", choice: { A: { title: "感恩", text: "这笔钱，帮到了对的人。" }, B: { title: "释然", text: "钱没了，人还在。" } } }
      ],
      regret: "那些没能用钱买回的东西"
    }
  },
  {
    id: "q38",
    title: "多选限选 · 荒岛求生，只能带 5 样东西",
    scene: "一场海难，你流落荒岛。救援遥遥无期，你只能从十二样东西里挑五样，剩下的就沉进海里。",
    type: "multi",
    pickCount: 5,
    items: [
      { key: "water", name: "净水器", tag: "生存", desc: "干净的水，是活下去的根本" },
      { key: "knife", name: "一把刀", tag: "生存", desc: "开路、防身、生火" },
      { key: "fire", name: "打火机", tag: "生存", desc: "火能取暖、驱兽、求救" },
      { key: "net", name: "渔网", tag: "生存", desc: "填饱肚子靠它" },
      { key: "tent", name: "帐篷", tag: "庇护", desc: "遮风挡雨的安身之处" },
      { key: "med", name: "急救包", tag: "生命", desc: "受伤时能救命" },
      { key: "mirror", name: "信号镜", tag: "希望", desc: "向远方求救" },
      { key: "rope", name: "绳索", tag: "工具", desc: "攀爬、搭建、设陷阱" },
      { key: "book", name: "一本日记本", tag: "精神", desc: "记录与排遣孤独" },
      { key: "radio", name: "收音机", tag: "希望", desc: "了解外界、寻找救援" },
      { key: "seeds", name: "一包种子", tag: "生存", desc: "荒岛也能种出吃的" },
      { key: "photo", name: "一张家人的照片", tag: "情感", desc: "在最绝望时给你力量" }
    ],
    follow: {
      id: "q38-follow",
      title: "荒岛余生",
      beats: [
        { scene: "你靠着带的东西，一天天熬了下来。孤独是最难熬的，尤其是夜里，你会想起那张没能带上的照片。", choice: { A: { title: "硬撑", text: "撑住，就能等到救援。" }, B: { title: "崩溃", text: "太孤独了，快撑不住了。" } } },
        { scene: "不知过了多久，远处终于出现了船。你被救起，回望荒岛，恍如隔世。", choice: { A: { title: "重生", text: "活着，真好。" }, B: { title: "感恩", text: "谢谢那个没放弃的自己。" } } }
      ],
      regret: "那些没能带上的东西"
    }
  },
  {
    id: "q39",
    title: "多选限选 · 人生重启，你只能保留 3 段记忆",
    scene: "某天，你被告知人生要重新来过，但只能保留三段记忆带到下一世。其余的，将永远遗忘。你会留住哪三段？",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "childhood", name: "童年最快乐的一天", tag: "纯真", desc: "无忧无虑的笑声" },
      { key: "firstlove", name: "初恋的心动", tag: "炽热", desc: "第一次为一个人小鹿乱撞" },
      { key: "family", name: "家人的一个拥抱", tag: "至亲", desc: "血脉相连的温暖" },
      { key: "success", name: "最成功的一刻", tag: "成就", desc: "被认可的高光时刻" },
      { key: "friend", name: "与挚友的彻夜长谈", tag: "陪伴", desc: "懂你的人，千金不换" },
      { key: "birth", name: "孩子降生的瞬间", tag: "至亲", desc: "生命延续的震撼" },
      { key: "travel", name: "最美的风景", tag: "自由", desc: "天地辽阔，心也开阔" },
      { key: "lesson", name: "最痛的一次教训", tag: "成长", desc: "痛过，才真正长大" }
    ],
    follow: {
      id: "q39-follow",
      title: "重启",
      beats: [
        { scene: "带着三段记忆，你重启了人生。那些被遗忘的，偶尔会在梦里浮现，却再也想不起细节。", choice: { A: { title: "珍惜当下", text: "记住的，才最重要。" }, B: { title: "怅然若失", text: "有些忘了的，是不是很珍贵？" } } },
        { scene: "新的一生里，你靠着三段记忆，少走了很多弯路，也格外珍惜每一个当下。", choice: { A: { title: "通透", text: "活在当下，就是答案。" }, B: { title: "感恩", text: "记得，就足够。" } } }
      ],
      regret: "那些被永久遗忘的记忆"
    }
  },
  {
    id: "q40",
    title: "多选限选 · 如果世界末日，方舟只能再上 4 个人",
    scene: "末日方舟上只剩 4 个位置，你手握决定权。面前站着形形色色的人，你只能选 4 个登船。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "doctor", name: "一名医生", tag: "善意", desc: "能救很多人的命" },
      { key: "scientist", name: "一名科学家", tag: "成就", desc: "可能重启人类文明" },
      { key: "child", name: "一个孩子", tag: "纯真", desc: "人类的未来与希望" },
      { key: "farmer", name: "一名农夫", tag: "生存", desc: "会种粮，能养活人" },
      { key: "engineer", name: "一名工程师", tag: "成就", desc: "能建起新的家园" },
      { key: "mother", name: "一位母亲", tag: "至亲", desc: "养育与爱的力量" },
      { key: "leader", name: "一名领袖", tag: "野心", desc: "能组织起幸存者" },
      { key: "artist", name: "一名艺术家", tag: "精神", desc: "守住人类的精神火种" }
    ],
    follow: {
      id: "q40-follow",
      title: "方舟",
      beats: [
        { scene: "方舟启航，你望着被留下的那些人，心里翻江倒海。选择的重量，压得你喘不过气。", choice: { A: { title: "坚定", text: "为了更多人的未来。" }, B: { title: "愧疚", text: "我凭什么决定别人的生死？" } } },
        { scene: "多年后，新世界建立。你看着眼前的生机，才慢慢原谅了当初那个做决定的自己。", choice: { A: { title: "释然", text: "总要有人做这个决定。" }, B: { title: "沉重", text: "这份重量，我会带一辈子。" } } }
      ],
      regret: "那些没能登上方舟的人"
    }
  },
  {
    id: "q41",
    title: "多选限选 · 删掉人生的 4 个烦恼",
    scene: "上帝给了你一个特权：可以永久删除人生的四个烦恼。你会先删掉哪些？",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "money", name: "缺钱的烦恼", tag: "现实", desc: "再也不用为钱发愁" },
      { key: "sick", name: "生病的烦恼", tag: "生命", desc: "永远健健康康" },
      { key: "lonely", name: "孤独的烦恼", tag: "情感", desc: "永远有人陪伴" },
      { key: "compare", name: "攀比的烦恼", tag: "自我", desc: "不再活在别人眼里" },
      { key: "worry", name: "焦虑的烦恼", tag: "自我", desc: "内心永远平静" },
      { key: "old", name: "衰老的烦恼", tag: "生命", desc: "青春永驻" },
      { key: "fail", name: "失败的烦恼", tag: "成长", desc: "做什么都一帆风顺" },
      { key: "death", name: "失去亲人的烦恼", tag: "至亲", desc: "爱的人都长长久久" }
    ],
    follow: {
      id: "q41-follow",
      title: "删烦恼",
      beats: [
        { scene: "烦恼一个个消失，你的生活变得前所未有地轻松。可你渐渐发现，有些「烦恼」，其实是人生的滋味。", choice: { A: { title: "享受轻松", text: "难得清静。" }, B: { title: "开始怀念", text: "没了烦恼，快乐也变淡了。" } } },
        { scene: "多年后，你明白了一个道理：人生因不完美而真实，因烦恼而丰盈。", choice: { A: { title: "顿悟", text: "酸甜苦辣，才是人生。" }, B: { title: "感慨", text: "原来我删掉的，是人生的味道。" } } }
      ],
      regret: "那些被删掉的人生滋味"
    }
  },
  {
    id: "q42",
    title: "多选限选 · 创业要选 3 个合伙人，你选谁？",
    scene: "你决心创业，面前有八位各有所长的候选人，但你只能选三个做合伙人。选错，可能满盘皆输。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "tech", name: "技术大牛", tag: "成就", desc: "产品靠他撑起来" },
      { key: "money", name: "有钱的投资人", tag: "现实", desc: "能带来资金" },
      { key: "sales", name: "销售天才", tag: "成就", desc: "能把东西卖出去" },
      { key: "friend", name: "多年的老友", tag: "情感", desc: "最值得信任的人" },
      { key: "dreamer", name: "有远见的梦想家", tag: "梦想", desc: "能看穿未来方向" },
      { key: "executor", name: "执行力强的实干家", tag: "成长", desc: "能把想法落地" },
      { key: "network", name: "人脉广的人", tag: "现实", desc: "能打开局面" },
      { key: "balance", name: "善于协调的人", tag: "陪伴", desc: "能稳住团队" }
    ],
    follow: {
      id: "q42-follow",
      title: "合伙",
      beats: [
        { scene: "公司起步，合伙人们各显神通，也难免摩擦。你发现，选合伙人，选的不只是能力，更是人品和格局。", choice: { A: { title: "磨合", text: "一起把事做成。" }, B: { title: "警惕", text: "合伙最怕离心。" } } },
        { scene: "公司几经波折，最终做大。你庆幸当初选对了人，也明白了一个道理：创业路上，团队比项目更重要。", choice: { A: { title: "庆幸", text: "选对了人，事半功倍。" }, B: { title: "感恩", text: "谢谢一起拼过的伙伴。" } } }
      ],
      regret: "那些没能一起共事的人"
    }
  },
  {
    id: "q43",
    title: "要不要为了孩子，牺牲自己的事业？",
    scene: "孩子出生后，家里必须有一个人退下来照顾。是你的上升期事业重要，还是孩子的成长陪伴重要？",
    options: [
      {
        key: "A",
        title: "为事业拼",
        gain: "更好的收入和事业，给孩子更好的物质条件。",
        lose: "孩子最需要陪伴的那几年。",
        follow: {
          id: "q43-A",
          title: "拼事业",
          beats: [
            { scene: "你把孩子交给老人带，自己早出晚归。每次视频，孩子都怯怯地喊你，让你心里不是滋味。", choice: { A: { title: "多抽时间", text: "再忙也要陪孩子。" }, B: { title: "自我安慰", text: "我拼，是为了他。" } } },
            { scene: "孩子渐渐长大，成绩优异、懂事独立，却和你之间隔着一层客气。你才明白，有些陪伴，错过了就补不回来。", choice: { A: { title: "弥补", text: "从现在开始多陪他。" }, B: { title: "遗憾", text: "我错过了他最需要我的时候。" } } }
          ],
          regret: "孩子那几年最需要的陪伴"
        }
      },
      {
        key: "B",
        title: "为家庭退",
        gain: "亲自陪孩子长大，见证每一个第一次。",
        lose: "自己的事业上升期，和一份独立的收入。",
        follow: {
          id: "q43-B",
          title: "退下来",
          beats: [
            { scene: "你辞掉工作，全职带娃。孩子黏你、依赖你，可夜深人静时，你也会怀疑自己的价值。", choice: { A: { title: "甘之如饴", text: "孩子的笑，就是我的成就。" }, B: { title: "怅然", text: "我也曾是职场上的谁。" } } },
            { scene: "孩子上了学，你终于能喘口气。看到孩子健康开朗，你忽然觉得，那些牺牲都值得。", choice: { A: { title: "值得", text: "陪伴，是最好的礼物。" }, B: { title: "释然", text: "每个人都有他的路。" } } }
          ],
          regret: "那段被搁置的事业和独立"
        }
      }
    ]
  },
  {
    id: "q44",
    title: "要不要原谅那个伤害过你的人？",
    scene: "有个人曾深深伤害过你，如今他老了、落魄了，来求你原谅。放下，是放过自己还是背叛过去？",
    options: [
      {
        key: "A",
        title: "选择原谅",
        gain: "卸下心里的包袱，获得内心的平静。",
        lose: "那个「凭什么」的执念，和过去的自己。",
        follow: {
          id: "q44-A",
          title: "原谅",
          beats: [
            { scene: "你说出「我原谅你了」的那一刻，没有想象中伟大，反而像卸下了一块压了多年的石头。", choice: { A: { title: "轻松", text: "原来放下，是放过自己。" }, B: { title: "复杂", text: "原谅，真的值得吗？" } } },
            { scene: "多年后，你发现原谅并没有让伤害消失，却让你不再被它困住。你终于能往前走了。", choice: { A: { title: "释然", text: "放下，才能走远。" }, B: { title: "平静", text: "过去，就让它过去吧。" } } }
          ],
          regret: "那个被伤害后迟迟不肯放下的自己"
        }
      },
      {
        key: "B",
        title: "拒绝原谅",
        gain: "守住自己的底线和尊严。",
        lose: "可能一辈子背着这份怨气。",
        follow: {
          id: "q44-B",
          title: "不原谅",
          beats: [
            { scene: "你拒绝了他。看着他失落的背影，你心里有一丝快意，也有一丝空落落的疲惫。", choice: { A: { title: "解气", text: "伤害我的人，凭什么被原谅。" }, B: { title: "疲惫", text: "恨一个人，其实很累。" } } },
            { scene: "多年后，他去世了。你站在灵前，忽然说不出心里是什么滋味——原来恨，也没能让你好过。", choice: { A: { title: "放下", text: "人都不在了，还恨什么。" }, B: { title: "怅然", text: "这口气，我赌了一辈子。" } } }
          ],
          regret: "被恨意困住的那些年"
        }
      }
    ]
  },
  {
    id: "q45",
    title: "要不要举报那个潜规则/舞弊的人？",
    scene: "你无意间发现一个身边人靠不正当手段上位。举报，可能得罪人、惹麻烦；沉默，又违背良心。",
    options: [
      {
        key: "A",
        title: "站出来举报",
        gain: "守住良知和正义。",
        lose: "可能招来的报复和麻烦，以及平静的生活。",
        follow: {
          id: "q45-A",
          title: "举报",
          beats: [
            { scene: "你鼓起勇气举报。过程艰难，有人劝你别多管闲事，也有人暗中支持你。", choice: { A: { title: "坚持到底", text: "正义，需要人站出来。" }, B: { title: "有些动摇", text: "我是不是太冲动了？" } } },
            { scene: "事情最终得到处理。你可能没得到什么好处，却赢得了内心的坦荡，和一些人的尊重。", choice: { A: { title: "无悔", text: "对得起自己的良心。" }, B: { title: "平静", text: "问心无愧，就够了。" } } }
          ],
          regret: "那段被卷入是非的平静日子"
        }
      },
      {
        key: "B",
        title: "选择沉默",
        gain: "保住自己的安稳和关系。",
        lose: "内心的不安，和那份正义感。",
        follow: {
          id: "q45-B",
          title: "沉默",
          beats: [
            { scene: "你选择了沉默。日子照旧，可每次看到那个人得意，你心里就像有根刺。", choice: { A: { title: "麻木", text: "算了，多一事不如少一事。" }, B: { title: "煎熬", text: "我是不是太懦弱了？" } } },
            { scene: "多年后，同样的事落到你头上，却没人替你说话。你才明白，沉默也是一种纵容。", choice: { A: { title: "后悔", text: "当初我该站出来的。" }, B: { title: "释然", text: "人性如此，罢了。" } } }
          ],
          regret: "那份没敢坚守的良知"
        }
      }
    ]
  },
  {
    id: "q46",
    title: "多选限选 · 一辈子只能从事 3 种工作，你选？",
    scene: "命运规定，你这一生只能从事三种职业，其余的永远不会属于你。你会怎么选？",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "doctor", name: "医生", tag: "善意", desc: "救死扶伤，受人敬重" },
      { key: "teacher", name: "老师", tag: "成长", desc: "传道授业，桃李满天下" },
      { key: "artist", name: "艺术家", tag: "表达", desc: "用作品表达灵魂" },
      { key: "entrepreneur", name: "创业者", tag: "野心", desc: "创造属于自己的事业" },
      { key: "coder", name: "程序员", tag: "成就", desc: "用代码改变世界" },
      { key: "writer", name: "作家", tag: "精神", desc: "用文字记录与思考" },
      { key: "chef", name: "厨师", tag: "幸福", desc: "用美食治愈人心" },
      { key: "farmer", name: "农夫", tag: "生存", desc: "耕耘土地，自给自足" }
    ],
    follow: {
      id: "q46-follow",
      title: "职业",
      beats: [
        { scene: "你在三种职业间流转，渐渐找到了自己的热爱和擅长。原来，工作不只是谋生，也是一种自我实现。", choice: { A: { title: "投入", text: "把工作做成热爱。" }, B: { title: "平常心", text: "工作而已，别太当真。" } } },
        { scene: "回望一生，你没有大富大贵，却把每一份工作都做得踏实而有意义。", choice: { A: { title: "满足", text: "这一生，没白干。" }, B: { title: "感恩", text: "能做喜欢的事，很幸运。" } } }
      ],
      regret: "那些没能从事的职业"
    }
  },
  {
    id: "q47",
    title: "要不要告诉朋友那个残酷的真相？",
    scene: "你知道了一个关于好友的残酷真相——他深爱的人背叛了他。说出来，他会痛彻心扉；不说，他活在谎言里。",
    options: [
      {
        key: "A",
        title: "告诉他真相",
        gain: "让他看清现实，不再被欺骗。",
        lose: "可能失去他的信任，甚至这段友谊。",
        follow: {
          id: "q47-A",
          title: "说出真相",
          beats: [
            { scene: "你鼓起勇气告诉他。他先是不信，继而崩溃。他质问你「为什么不早点说」，你百口莫辩。", choice: { A: { title: "坚持", text: "真相再痛，也好过被骗。" }, B: { title: "后悔", text: "或许我不该多嘴。" } } },
            { scene: "时间过去，他渐渐走出伤痛，也理解了你的苦心。你们的友谊，经此一役反而更牢。", choice: { A: { title: "欣慰", text: "他挺过来了。" }, B: { title: "释然", text: "问心无愧，就好。" } } }
          ],
          regret: "那段因此受损的友谊时光"
        }
      },
      {
        key: "B",
        title: "替他保守秘密",
        gain: "保住这段友谊和他的平静。",
        lose: "看着他活在谎言里，心里的煎熬。",
        follow: {
          id: "q47-B",
          title: "保守秘密",
          beats: [
            { scene: "你选择沉默，看好友依旧幸福地活在谎言里。你每次见到他，心里都堵得慌。", choice: { A: { title: "煎熬", text: "我到底该不该说？" }, B: { title: "自我说服", text: "让他幸福，也是一种善意。" } } },
            { scene: "谎言终有揭穿的一天。真相大白时，好友怪你「你早就知道，为什么不告诉我」，你百口莫辩。", choice: { A: { title: "后悔", text: "早知道，不如早点说。" }, B: { title: "无奈", text: "说与不说，都是错。" } } }
          ],
          regret: "那个想说又不敢说的秘密"
        }
      }
    ]
  },
  {
    id: "q48",
    title: "多选限选 · 只能保留 4 项生活习惯",
    scene: "如果你的人生只能保留四个生活习惯，其余全部舍弃，你会留下哪四个？",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "sleep", name: "规律睡眠", tag: "生命", desc: "身体的本钱" },
      { key: "exercise", name: "坚持运动", tag: "生命", desc: "健康的保障" },
      { key: "read", name: "每天读书", tag: "精神", desc: "充实头脑" },
      { key: "cook", name: "自己做饭", tag: "幸福", desc: "健康的饮食" },
      { key: "write", name: "记录生活", tag: "表达", desc: "留住时间与思考" },
      { key: "social", name: "与朋友相聚", tag: "陪伴", desc: "维持珍贵的关系" },
      { key: "learn", name: "学点新东西", tag: "成长", desc: "保持进步" },
      { key: "relax", name: "定期放松", tag: "自由", desc: "给心灵放个假" }
    ],
    follow: {
      id: "q48-follow",
      title: "习惯",
      beats: [
        { scene: "你保留了四个习惯，日子变得简单而有序。你发现，好习惯真的能塑造一个人。", choice: { A: { title: "坚持", text: "自律给我自由。" }, B: { title: "随性", text: "别太较真，开心就好。" } } },
        { scene: "多年后，这些习惯让你受益匪浅——健康的身体、充实的头脑、温暖的友情。", choice: { A: { title: "庆幸", text: "好习惯，是一生的财富。" }, B: { title: "感恩", text: "谢谢当年坚持的自己。" } } }
      ],
      regret: "那些被舍弃的生活习惯"
    }
  },
  {
    id: "q49",
    title: "要不要接受一个「钱多但违背良心」的机会？",
    scene: "一个能让你快速暴富的机会摆在眼前，但它游走在灰色地带，甚至可能伤害到无辜的人。做，还是不做？",
    options: [
      {
        key: "A",
        title: "昧着良心做",
        gain: "一笔可能改变命运的财富。",
        lose: "内心的安宁，和可能随之而来的法律风险。",
        trigger: { unlock: "conscience", regret: "那份被财富吞噬的良心与安宁" },
        follow: {
          id: "q49-A",
          title: "昧良心",
          beats: [
            { scene: "你做了。钱来得又快又猛，可你夜夜难眠，总怕东窗事发，也怕那些被伤害的人的眼神。", choice: { A: { title: "侥幸", text: "先赚了再说。" }, B: { title: "惶恐", text: "这钱，烫手。" } } },
            { scene: "事情最终还是败露了。你失去了一切，甚至更多。坐在那里，你才明白，有些钱是不能赚的。", choice: { A: { title: "悔恨", text: "当初真不该伸手。" }, B: { title: "认命", text: "出来混，迟早要还。" } } }
          ],
          regret: "那份被财富吞噬的良心与安宁"
        }
      },
      {
        key: "B",
        title: "守住底线拒绝",
        gain: "问心无愧，睡得安稳。",
        lose: "那个能让你快速翻身的机会。",
        follow: {
          id: "q49-B",
          title: "守住底线",
          beats: [
            { scene: "你拒绝了。眼看别人靠这个机会赚得盆满钵满，你心里也犯过嘀咕。", choice: { A: { title: "坚定", text: "有些钱，赚了心里不安。" }, B: { title: "动摇", text: "是不是我太清高了？" } } },
            { scene: "几年后，那个暴富的人锒铛入狱。你庆幸当初的坚持，也终于相信，走正道，走得慢，但走得远。", choice: { A: { title: "庆幸", text: "守住底线，是对的。" }, B: { title: "踏实", text: "心安，才是最大的财富。" } } }
          ],
          regret: "那个错过的暴富机会"
        }
      }
    ]
  },
  {
    id: "q50",
    title: "多选限选 · 如果只能对 3 个人好，你选谁？",
    scene: "人的精力有限。如果这一生你只能对三个人倾尽所有地好，你会把这份好留给谁？",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "mom", name: "母亲", tag: "至亲", desc: "生我养我的人" },
      { key: "dad", name: "父亲", tag: "至亲", desc: "沉默而深沉的依靠" },
      { key: "lover", name: "爱人", tag: "炽热", desc: "携手一生的人" },
      { key: "child", name: "孩子", tag: "至亲", desc: "生命的延续" },
      { key: "bestfriend", name: "挚友", tag: "陪伴", desc: "懂你悲欢的人" },
      { key: "myself", name: "自己", tag: "自我", desc: "最不该辜负的人" },
      { key: "teacher", name: "恩师", tag: "感恩", desc: "指路明灯" },
      { key: "stranger", name: "需要帮助的陌生人", tag: "善意", desc: "把善意留给世界" }
    ],
    follow: {
      id: "q50-follow",
      title: "倾尽所有",
      beats: [
        { scene: "你把有限的精力，全给了选中的三个人。看着他们因你而幸福，你觉得一切都值了。", choice: { A: { title: "无悔", text: "爱，就是要给值得的人。" }, B: { title: "遗憾", text: "那其他的人呢？" } } },
        { scene: "多年后，你发现，被你爱着的人，也把同样的爱回馈给了你。爱，原来是会流动的。", choice: { A: { title: "圆满", text: "爱的付出，终有回响。" }, B: { title: "感恩", text: "谢谢那些也爱着我的人。" } } }
      ],
      regret: "那些没能顾及的人"
    }
  }
];

/* ===== data/pack-events.js ===== */
/* 如果当时 · 随机事件池 + 连锁专属局
 * 注入：window.PACK_EVENTS（随机事件）、window.PACK_CHAINS（连锁专属局）
 *
 * 随机事件结构：
 * {
 *   id, title, scene,
 *   condition: { stat:"health", op:"lt", value:30 }  // 可选，满足才触发
 *   options: [ { key, title, text, effects:{...}, regret } ]
 * }
 *
 * 连锁专属局结构：
 * {
 *   id, unlock:"debt",          // 对应选项 trigger.unlock
 *   title, scene,               // 专属局的标题与情境
 *   condition: {...},           // 可选，额外数值门槛
 *   options: [ { key, title, text, effects, regret } ]
 * }
 *
 * effects 四维：money/health/social/happy，扣加限制在 0~100。
 */

/* ===== 随机事件池 ===== */
window.PACK_EVENTS = [
  {
    id: "ev-lottery",
    title: "中了一张彩票",
    scene: "你随手买的一张彩票，居然中了个不大不小的奖。这笔意外之财，来得突然。",
    options: [
      { key: "A", title: "存起来", text: "留作后路，细水长流。", effects: { money: 12, happy: 3 } },
      { key: "B", title: "挥霍一把", text: "难得有钱，痛快花一次。", effects: { money: -2, happy: 15 } }
    ]
  },
  {
    id: "ev-sick",
    title: "一场大病",
    scene: "体检报告出来，医生神色凝重。这些年，你把身体熬得太狠了。",
    condition: { stat: "health", op: "lt", value: 60 },
    options: [
      { key: "A", title: "安心治疗", text: "花钱续命，别硬扛。", effects: { money: -18, health: 22, happy: -3 } },
      { key: "B", title: "咬牙硬扛", text: "工作不能停，扛一扛就过去了。", effects: { health: -15, money: 5 } }
    ]
  },
  {
    id: "ev-fired",
    title: "突然被裁",
    scene: "公司一夜之间收缩业务，你的名字出现在了裁员名单上。",
    condition: { stat: "money", op: "lt", value: 60 },
    options: [
      { key: "A", title: "拿赔偿另谋出路", text: "体面地走，重新开始。", effects: { money: 8, happy: -8, social: -3 } },
      { key: "B", title: "求领导留下", text: "拉下脸，先保住饭碗。", effects: { money: 3, social: -6, happy: -5 } }
    ]
  },
  {
    id: "ev-reunion",
    title: "一场老同学聚会",
    scene: "毕业多年的同学会，你犹豫要不要去。那些当年同一起跑线的人，如今境遇天差地别。",
    options: [
      { key: "A", title: "去", text: "看看大家，也看看自己。", effects: { social: 8, happy: 2, money: 0 } },
      { key: "B", title: "不去", text: "怕对比，也怕尴尬。", effects: { social: -5, happy: -3 } }
    ]
  },
  {
    id: "ev-raise",
    title: "一次跳槽的机会",
    scene: "猎头递来一份 offer，薪资翻倍，但要离开熟悉的环境，去一个陌生的城市重新开始。",
    options: [
      { key: "A", title: "接下 offer", text: "趁年轻，搏一把。", effects: { money: 15, social: -4, happy: -2 } },
      { key: "B", title: "婉拒", text: "安稳最重要，不折腾。", effects: { happy: 3, social: 2 } }
    ]
  },
  {
    id: "ev-parent",
    title: "父母病了",
    scene: "电话那头，母亲的声音虚弱。父亲住院了，你既担心人，也担心钱。",
    condition: { stat: "social", op: "gt", value: 30 },
    options: [
      { key: "A", title: "请假回家", text: "人比什么都重要。", effects: { money: -8, happy: 6, health: 2, social: 3 } },
      { key: "B", title: "寄钱回去", text: "人在外，只能尽力。", effects: { money: -12, happy: -4, social: 2 } }
    ]
  },
  {
    id: "ev-friend",
    title: "一个朋友开口借钱",
    scene: "多年的老朋友突然开口，想借一笔不小的钱。你心里清楚，这钱大概率有去无回。",
    condition: { stat: "money", op: "gt", value: 40 },
    options: [
      { key: "A", title: "借", text: "朋友有难，该帮就帮。", effects: { money: -10, social: 8, happy: 2 } },
      { key: "B", title: "婉拒", text: "救急不救穷，不能心软。", effects: { social: -6, happy: -2, money: 0 } }
    ]
  },
  {
    id: "ev-insomnia",
    title: "整夜失眠",
    scene: "连续几周，你夜里翻来覆去睡不着。白天的你，像个被抽干的人。",
    condition: { stat: "happy", op: "lt", value: 55 },
    options: [
      { key: "A", title: "去看医生", text: "身体不会骗人。", effects: { health: 6, happy: 5, money: -4 } },
      { key: "B", title: "硬撑着", text: "熬过这阵就好了。", effects: { health: -8, happy: -5 } }
    ]
  },
  {
    id: "ev-bonus",
    title: "一笔意外的年终奖",
    scene: "公司效益不错，你拿到了一笔比预期丰厚得多的年终奖。这笔钱，你想怎么用？",
    condition: { stat: "money", op: "gt", value: 35 },
    options: [
      { key: "A", title: "犒劳自己和家人", text: "辛苦一年，该享受一下。", effects: { money: -6, happy: 12, social: 3 } },
      { key: "B", title: "存起来", text: "落袋为安，未雨绸缪。", effects: { money: 12, happy: 2 } }
    ]
  },
  {
    id: "ev-review",
    title: "一次升职答辩",
    scene: "公司给了你一次晋升答辩的机会。过了，就是管理层；不过，可能还要再熬几年。",
    condition: { stat: "social", op: "gt", value: 45 },
    options: [
      { key: "A", title: "全力准备", text: "拼一次，搏个前程。", effects: { money: 15, social: 8, happy: 3 } },
      { key: "B", title: "顺其自然", text: "是你的跑不掉。", effects: { happy: 4, money: 2 } }
    ]
  },
  {
    id: "ev-friend2",
    title: "老友突然来借钱",
    scene: "一个许久不联系的老同学，突然开口借一笔钱。你心里清楚，这钱借出去，可能就收不回来了。",
    condition: { stat: "money", op: "gt", value: 50 },
    options: [
      { key: "A", title: "借给他", text: "念及旧情，能帮就帮。", effects: { money: -12, social: 8, happy: 2 } },
      { key: "B", title: "婉拒", text: "久不联系就借钱，不靠谱。", effects: { social: -6, happy: -1 } }
    ]
  },
  {
    id: "ev-hobby",
    title: "一个兴趣的召唤",
    scene: "你偶然接触到一个新的爱好，竟意外地着迷。可它既花时间，也花点钱。",
    options: [
      { key: "A", title: "投入进去", text: "生活需要点热爱。", effects: { happy: 10, money: -5, social: 3 } },
      { key: "B", title: "浅尝辄止", text: "别耽误正事。", effects: { happy: -2, money: 2 } }
    ]
  },
  {
    id: "ev-accident",
    title: "一场小意外",
    scene: "你在路上出了点小意外，受了点伤，也耽误了些事。",
    options: [
      { key: "A", title: "安心休养", text: "身体要紧，别硬扛。", effects: { health: 6, money: -4, happy: -2 } },
      { key: "B", title: "带伤继续", text: "这点小伤，不碍事。", effects: { health: -6, happy: -2 } }
    ]
  }
];

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = [
  {
    id: "chain-debt",
    unlock: "debt",
    title: "债务危机",
    scene: "当年那个选择欠下的债，终于追到了眼前。债主上门，催得你喘不过气。",
    options: [
      { key: "A", title: "拆东墙补西墙", text: "先还眼前的，后面的再说。", effects: { money: -15, happy: -10 }, regret: "那些被债务吞噬的日子" },
      { key: "B", title: "咬牙还清", text: "省吃俭用，一点点补上。", effects: { money: -20, happy: -5, health: -5 }, regret: "为还债熬掉的健康" }
    ]
  },
  {
    id: "chain-dream",
    unlock: "dream",
    title: "梦想的召唤",
    scene: "那个被你搁置已久的梦想，忽然又冒了出来。这一次，它近得几乎触手可及。",
    options: [
      { key: "A", title: "再搏一次", text: "不为别的，就为不留遗憾。", effects: { happy: 15, money: -10 }, regret: "又一次押上安稳去赌" },
      { key: "B", title: "埋进心底", text: "现实一点，别折腾了。", effects: { happy: -8, money: 5 }, regret: "那个再也没能实现的梦" }
    ]
  },
  {
    id: "chain-family",
    unlock: "family",
    title: "亲情的债",
    scene: "多年后你才明白，有些陪伴一旦错过，就再也补不回来。父母老了，而你远在天边。",
    options: [
      { key: "A", title: "放下一切回家", text: "有些事，现在不做就晚了。", effects: { happy: 12, money: -8, social: 5 }, regret: "那些没陪在身边的年" },
      { key: "B", title: "继续打拼", text: "等我出人头地，再好好孝顺。", effects: { money: 8, happy: -10 }, regret: "亏欠父母的时光" }
    ]
  },
  {
    id: "chain-health",
    unlock: "health",
    title: "身体的账单",
    scene: "你终于尝到了透支身体的苦果。躺在病床上，你才开始想，这一切到底值不值。",
    options: [
      { key: "A", title: "彻底休养", text: "命只有一条，钱可以再挣。", effects: { health: 25, money: -12 }, regret: "那些本该好好休息的日子" },
      { key: "B", title: "边治边扛", text: "放不下工作，也放不下钱。", effects: { health: 5, money: 3, happy: -5 }, regret: "被工作绑架的身体" }
    ]
  },
  {
    id: "chain-conscience",
    unlock: "conscience",
    title: "良心的拷问",
    scene: "当年那个让你动摇的机会，如今像一块石头压在心上。夜深人静时，它会回来问你：这钱，你花得安心吗？",
    options: [
      { key: "A", title: "坦白与弥补", text: "还债，才能睡得安稳。", effects: { happy: 15, money: -12 }, regret: "那段被良心折磨的日子" },
      { key: "B", title: "继续埋藏", text: "过去的事，就让它过去吧。", effects: { happy: -10, money: 5 }, regret: "那个永远无法坦然面对的自己" }
    ]
  },
  {
    id: "chain-hometown",
    unlock: "hometown",
    title: "家乡的回望",
    scene: "多年后，你站在人生的路口，回望那个曾经离开（或留下）的家乡。那里的灯火，还亮着吗？",
    options: [
      { key: "A", title: "回望与释然", text: "无论走或留，都是我的选择。", effects: { happy: 12, social: 5 }, regret: "那段关于去留的纠结" },
      { key: "B", title: "怅然若失", text: "如果当年选了另一条路……", effects: { happy: -8, money: 3 }, regret: "那条没走成的路" }
    ]
  }
];

/* ===== data/pack-more.js ===== */
/* 如果当时 · 题量扩充（第一辑）
 * 追加到已有的 PACK_START / PACK_EVENTS / PACK_CHAINS，不覆盖原数据。
 * 25 道岔路（15 二选一 + 10 多选限选）、7 个随机事件、3 个连锁专属局。
 *
 * 三道新连锁局的解锁钥匙：roots（祖宅）/ child（孩子）/ silence（没说出口的真相）
 */

/* ===== 岔路题 ===== */
window.PACK_START = (window.PACK_START || []).concat([

  {
    id: "q51",
    title: "拆迁款：一次拿钱，还是要房子？",
    scene: "老宅在拆迁范围里。一边是一次到手的补偿款，数字够你在城里买两套；一边是原地回迁的安置房，要等四年，但那是你从小长大的位置。",
    options: [
      {
        key: "A",
        title: "拿钱走人",
        gain: "手里立刻有了活钱，想在哪安家都行。",
        lose: "那个巷口、那棵树，从此只剩照片。",
        effects: { money: 30, happy: -8, social: -5 },
        trigger: { unlock: "roots", regret: "老宅门口那棵槐树" },
        follow: {
          id: "q51-A",
          title: "换了地方，也换了根",
          beats: [
            {
              scene: "你签了字，钱到账那天，全家去吃了顿好的。搬家那天，母亲在空院子里站了很久，谁也没催她。",
              choice: {
                A: { title: "往前看", text: "日子是往前过的，人在哪，家就在哪。" },
                B: { title: "常回去看看", text: "哪怕只剩一片工地，也想站一站。" }
              }
            },
            {
              scene: "四年后，回迁房交钥匙了。你路过那片新小区，楼很整齐，认不出原来哪户是哪户。",
              choice: {
                A: { title: "不后悔", text: "当年的钱，帮我渡过了最难的时候。" },
                B: { title: "有点空", text: "新房子很好，就是找不到门。" }
              }
            }
          ],
          regret: "那片拆掉的老院子"
        }
      },
      {
        key: "B",
        title: "等安置房",
        gain: "四年后还在这条街上，邻居还是那些人。",
        lose: "四年租房漂泊，还得先垫一笔钱。",
        effects: { money: -12, happy: 8, social: 8 },
        trigger: { unlock: "roots", regret: "那笔本可以立刻到手的钱" },
        follow: {
          id: "q51-B",
          title: "守住了那条街",
          beats: [
            {
              scene: "这四年你们搬了两次家，租金一年比一年高。母亲总念叨：忍忍，等回去就好了。",
              choice: {
                A: { title: "咬牙等", text: "四年换一辈子，值。" },
                B: { title: "中途动摇", text: "有时候会想，当初拿钱是不是更痛快。" }
              }
            },
            {
              scene: "回迁那天，你在楼下遇见了小时候的邻居。他说：还是咱们这儿好。你点点头，忽然觉得这四年没白熬。",
              choice: {
                A: { title: "踏实", text: "根还在，人就散不了。" },
                B: { title: "感慨", text: "同一条街，已经不是同一群人了。" }
              }
            }
          ],
          regret: "那四年寄人篱下的日子"
        }
      }
    ]
  },

  {
    id: "q52",
    title: "祖宅卖了换钱，还是留着守个根？",
    scene: "老家的房子空了七八年，一年回去不到一次。有人开价，够你在现在的城市换个大点的房子。可那是爷爷一砖一瓦盖的。",
    options: [
      {
        key: "A",
        title: "卖了",
        gain: "一笔实在的钱，解决眼前的大事。",
        lose: "以后再说「回老家」，就没有具体的地方了。",
        effects: { money: 22, happy: -10, social: -6 },
        trigger: { unlock: "roots", regret: "爷爷亲手盖的那间堂屋" },
        follow: {
          id: "q52-A",
          title: "卖掉的不是房",
          beats: [
            {
              scene: "过户那天，你在屋里转了一圈。墙上还有你小时候量身高的铅笔印，你拍了张照，然后锁上了门。",
              choice: {
                A: { title: "不回头", text: "房子是给人住的，不是给念想住的。" },
                B: { title: "留一件东西", text: "把爷爷的旧凳子搬走。" }
              }
            },
            {
              scene: "后来每逢过年，亲戚问「今年回不回去」，你答不上来。回去住哪呢？",
              choice: {
                A: { title: "也就这样", text: "人散了吧，各自过好就是了。" },
                B: { title: "心里发空", text: "原来卖掉的是那条退路。" }
              }
            }
          ],
          regret: "那条随时能回去的路"
        }
      },
      {
        key: "B",
        title: "留着",
        gain: "心里始终有个能回去的地方。",
        lose: "每年白交着维护钱，房子一天天旧下去。",
        effects: { money: -8, happy: 10, social: 5 },
        trigger: { unlock: "roots", regret: "那笔本可以救急的钱" },
        follow: {
          id: "q52-B",
          title: "留了一盏灯",
          beats: [
            {
              scene: "你托邻居每年帮忙开开窗、通通风。房子旧得很快，可每次回去推开门，那股老木头的味道还在。",
              choice: {
                A: { title: "值得", text: "花这点钱，买一个「能回去」。" },
                B: { title: "开始犹豫", text: "一年住三天，值不值这份开销。" }
              }
            },
            {
              scene: "多年后你带着孩子回去，指着院子说：这是我小时候爬过的树。孩子仰头看了看，没什么感觉。",
              choice: {
                A: { title: "还是会带他来", text: "他不需要懂，我懂就行。" },
                B: { title: "忽然明白", text: "根这东西，到我这代大概就断了。" }
              }
            }
          ],
          regret: "那些本可以换成钱的东西"
        }
      }
    ]
  },

  {
    id: "q53",
    title: "日子过不下去了：为了孩子凑合，还是分开？",
    scene: "你们已经很久没有好好说过话。孩子八岁，成绩不错，也很敏感。离婚这两个字，在嘴边转了很多次。",
    options: [
      {
        key: "A",
        title: "凑合到他成年",
        gain: "孩子有一个完整的家，哪怕只是表面。",
        lose: "你自己的人生，往后推了十年。",
        effects: { happy: -18, health: -8, social: 5 },
        trigger: { unlock: "child", regret: "那十年本该属于自己的人生" },
        follow: {
          id: "q53-A",
          title: "一个屋檐下的两个人",
          beats: [
            {
              scene: "你们默契地把话咽了回去。饭桌上聊孩子的功课，关了灯各睡一间屋。孩子有时候会问：你们是不是不高兴。",
              choice: {
                A: { title: "骗过去", text: "大人没事，你只管念书。" },
                B: { title: "说实话", text: "爸爸妈妈有点问题，但都爱你。" }
              }
            },
            {
              scene: "孩子十八岁那年，考上了外地的大学。临走前他说：你们其实早就可以离的，我早就知道了。",
              choice: {
                A: { title: "心里一沉", text: "原来忍了十年，他全看在眼里。" },
                B: { title: "松一口气", text: "至少他平安长大了。" }
              }
            }
          ],
          regret: "本该早点做的决定"
        }
      },
      {
        key: "B",
        title: "分开",
        gain: "两个人都能重新开始。",
        lose: "孩子要在两个家之间来回，同学会问起。",
        effects: { happy: 12, health: 5, social: -10, money: -10 },
        trigger: { unlock: "child", regret: "孩子那个完整的家" },
        follow: {
          id: "q53-B",
          title: "两个家，一个孩子",
          beats: [
            {
              scene: "办手续那天很平静。最难的是跟孩子开口，你说了三遍，他才问：那我以后住哪儿。",
              choice: {
                A: { title: "把话说透", text: "住哪儿都行，两边都有你的房间。" },
                B: { title: "轻轻带过", text: "等你长大就懂了。" }
              }
            },
            {
              scene: "几年过去，孩子在两个家之间来回，反而跟你们都更亲了。只是每次换地方，他都要带同一个旧书包。",
              choice: {
                A: { title: "庆幸", text: "分开，也许是当时最好的选择。" },
                B: { title: "心疼", text: "他比同龄人懂事得太早。" }
              }
            }
          ],
          regret: "孩子不用懂事的那几年"
        }
      }
    ]
  },

  {
    id: "q54",
    title: "配偶要去的城市，你去不去？",
    scene: "另一半拿到了外地一个很好的机会，一去至少五年。你在现在的城市有编制、有熟人、有父母要照顾。对方问你：一起走吗？",
    options: [
      {
        key: "A",
        title: "跟着走",
        gain: "一家人不分开，孩子的童年有两个人。",
        lose: "你要从头再来，编制、关系、父母都留在原地。",
        effects: { social: -12, money: -8, happy: 12, health: 3 },
        trigger: { unlock: "family", regret: "那份干了十年的编制" },
        follow: {
          id: "q54-A",
          title: "重新扎根",
          beats: [
            {
              scene: "你辞了职，跟着去了。新城市很大，你谁都不认识，投了三个月的简历，才找到一份普通的工作。",
              choice: {
                A: { title: "慢慢来", text: "换城市的人都得熬这么一段。" },
                B: { title: "忍不住怨", text: "这些牺牲，对方真的看得见吗。" }
              }
            },
            {
              scene: "五年后，对方的项目做成了。你们在那座城市买了房，孩子说的是当地的方言。",
              choice: {
                A: { title: "值了", text: "一家人在哪儿，哪儿就是家。" },
                B: { title: "想家", text: "父母老了，视频里越来越瘦。" }
              }
            }
          ],
          regret: "留在原地的父母和那份工作"
        }
      },
      {
        key: "B",
        title: "留下",
        gain: "保住自己的事业和生活，父母有人照应。",
        lose: "两地分居，感情要靠电话撑着。",
        effects: { social: 8, money: 5, happy: -14 },
        trigger: { unlock: "family", regret: "那些分居的年头" },
        follow: {
          id: "q54-B",
          title: "隔着一千公里",
          beats: [
            {
              scene: "你们约定每个月见一次。头一年还很认真地数日子，第三年开始，视频通话越来越短。",
              choice: {
                A: { title: "主动维系", text: "再忙，也要坐下来好好说一小时。" },
                B: { title: "各忙各的", text: "反正都懂，不用天天说。" }
              }
            },
            {
              scene: "五年过去，对方调回来了，可你们之间像隔着层玻璃。吃饭时，各自刷着手机。",
              choice: {
                A: { title: "重新认识", text: "人回来了，感情也能重新长。" },
                B: { title: "承认疏远", text: "有些距离，一旦有了就去不掉。" }
              }
            }
          ],
          regret: "那五年没有一起过的日子"
        }
      }
    ]
  },

  {
    id: "q55",
    title: "孩子成绩一直上不去，砸钱补，还是认了？",
    scene: "孩子四年级，班里中游偏下。同事的孩子都在补习，一节六百。你们的收入，供两门就见底了。",
    options: [
      {
        key: "A",
        title: "砸钱补",
        gain: "至少尽了力，也许能冲上去。",
        lose: "钱花光了，孩子的周末也没了。",
        effects: { money: -16, happy: -8, social: 5 },
        trigger: { unlock: "child", regret: "孩子的那些周末" },
        follow: {
          id: "q55-A",
          title: "一周七天",
          beats: [
            {
              scene: "周末排满了课，你带着孩子在地铁里赶场。有一回他在车上睡着了，头磕在玻璃上，醒了也没哭。",
              choice: {
                A: { title: "咬牙坚持", text: "现在苦一点，将来轻松一点。" },
                B: { title: "停掉一门", text: "留点喘气的时间。" }
              }
            },
            {
              scene: "期末，成绩往上挪了十几名。孩子拿着卷子给你看，笑得很轻，像不太敢高兴。",
              choice: {
                A: { title: "欣慰", text: "补还是有用的。" },
                B: { title: "心里发酸", text: "他高兴，是因为我高兴。" }
              }
            }
          ],
          regret: "孩子本该撒野的周末"
        }
      },
      {
        key: "B",
        title: "认了，换个活法",
        gain: "省下钱和周末，家里松快下来。",
        lose: "亲戚聚会上，你得听那些比较的话。",
        effects: { money: 8, happy: 10, social: -8 },
        trigger: { unlock: "child", regret: "孩子可能错过的那个机会" },
        follow: {
          id: "q55-B",
          title: "中游也挺好",
          beats: [
            {
              scene: "你把课都退了，周末带他去打球、钓鱼。孩子的话变多了，饭桌上会讲学校里的事。",
              choice: {
                A: { title: "安心", text: "人这一辈子，不是只有分数。" },
                B: { title: "还是会慌", text: "别人都在跑，我们停下了。" }
              }
            },
            {
              scene: "中考那年，孩子考了所普通高中。放榜那天他反倒安慰你：我知道自己几斤几两。",
              choice: {
                A: { title: "踏实", text: "知道自己要什么，比分数重要。" },
                B: { title: "遗憾", text: "如果当年再逼一逼呢。" }
              }
            }
          ],
          regret: "也许能被逼出来的那部分天分"
        }
      }
    ]
  },

  {
    id: "q56",
    title: "医生说还有半年：抢救到底，还是让他走？",
    scene: "父亲查出晚期，医生说积极治疗还能撑半年，但大部分时间要在病床上，插着管子。他自己签过一份意愿书：不要过度抢救。",
    options: [
      {
        key: "A",
        title: "有一线希望就治",
        gain: "多半年，也许能等到一个转机。",
        lose: "这半年，他要在管子里过。",
        effects: { money: -18, health: -5, happy: -12, social: 5 },
        trigger: { unlock: "family", regret: "父亲最后那半年的体面" },
        follow: {
          id: "q56-A",
          title: "多出来的半年",
          beats: [
            {
              scene: "化疗到第三轮，他瘦得脱了形，说话要凑很近才听得清。有一次他扯掉氧气管，你按住他的手。",
              choice: {
                A: { title: "劝他忍", text: "再坚持一下，医生说还有办法。" },
                B: { title: "问他意思", text: "爸，你到底想不想治。" }
              }
            },
            {
              scene: "他走的那天凌晨，病房很静。你握着他的手，忽然想起他签意愿书时说的话：别让我受罪。",
              choice: {
                A: { title: "不后悔", text: "我尽力了，问心无愧。" },
                B: { title: "后悔", text: "我留住的是他的命，不是他。" }
              }
            }
          ],
          regret: "父亲本该有的那点体面"
        }
      },
      {
        key: "B",
        title: "按他的意思，回家",
        gain: "他能在自己床上，清醒地过完最后一段。",
        lose: "亲戚会说你不孝，你自己的心也过不去。",
        effects: { money: 5, happy: 8, health: -3, social: -10 },
        trigger: { unlock: "family", regret: "那个也许存在的转机" },
        follow: {
          id: "q56-B",
          title: "回家",
          beats: [
            {
              scene: "你把他接回了家。院子里阳光很好，他让人把躺椅搬到槐树下，说这样舒服。亲戚来看他，话里带着刺。",
              choice: {
                A: { title: "不解释", text: "这是我们父子的事。" },
                B: { title: "解释清楚", text: "把意愿书拿给他们看。" }
              }
            },
            {
              scene: "最后那几天，他清醒的时候会跟你聊些旧事，讲他年轻时怎么追的母亲。走的时候，他是在睡梦里。",
              choice: {
                A: { title: "心安", text: "他走得像个活人，不像个病人。" },
                B: { title: "还是会想", text: "如果当时再治一治呢。" }
              }
            }
          ],
          regret: "那半年也许能等到的奇迹"
        }
      }
    ]
  },

  {
    id: "q57",
    title: "四十五岁被优化：开个小店，还是再找份工？",
    scene: "公司结构优化，你在名单里。赔偿金够撑两年。投了三十份简历，回音寥寥，HR 看见年龄就没了下文。",
    options: [
      {
        key: "A",
        title: "开个小店",
        gain: "给自己打工，不用再看年龄。",
        lose: "赔偿金可能一年就填进去。",
        effects: { money: -14, happy: 10, health: -5, social: 5 },
        trigger: { unlock: "dream", regret: "那笔本该保命的赔偿金" },
        follow: {
          id: "q57-A",
          title: "一间小店",
          beats: [
            {
              scene: "你在小区门口盘下一间十几平的铺子，卖早餐。凌晨三点起，忙到上午十点，一天能歇半天。",
              choice: {
                A: { title: "稳扎稳打", text: "不扩张，够吃就行。" },
                B: { title: "再开一家", text: "趁着手感好，多铺一个点。" }
              }
            },
            {
              scene: "第二年，对街开了家连锁店，价格比你低两成。老顾客还是来，但流水少了一半。",
              choice: {
                A: { title: "守住老客", text: "他们吃的是我这个人。" },
                B: { title: "转身做别的", text: "这行不赚钱了，别再耗。" }
              }
            }
          ],
          regret: "那份本想干到退休的安稳"
        }
      },
      {
        key: "B",
        title: "降薪再就业",
        gain: "有份正经收入，社保不断。",
        lose: "薪水砍掉四成，还要跟年轻人一起从头做。",
        effects: { money: 10, happy: -10, social: 3 },
        trigger: { unlock: "dream", regret: "那个一直没敢开的店" },
        follow: {
          id: "q57-B",
          title: "回去了",
          beats: [
            {
              scene: "你去了一家小公司，做回最基础的活。比你小十岁的组长，开会时会说：这个我们年轻人来就行。",
              choice: {
                A: { title: "低下头干", text: "先把饭碗端稳。" },
                B: { title: "摆出经验", text: "这行我干了二十年，你们听我说。" }
              }
            },
            {
              scene: "三年后，你成了公司里最靠得住的人。没人再提年龄，但你知道，天花板就在那儿。",
              choice: {
                A: { title: "接受", text: "安稳比野心重要。" },
                B: { title: "不甘", text: "有时候会想，那间店现在什么样。" }
              }
            }
          ],
          regret: "那间没开成的小店"
        }
      }
    ]
  },

  {
    id: "q58",
    title: "为了学区，背上一身债，值吗？",
    scene: "孩子明年上小学。对口的学校一般，好学校得买学区房，首付要借、月供占掉收入七成，一背就是三十年。",
    options: [
      {
        key: "A",
        title: "借钱也买",
        gain: "孩子进了那所学校，路宽一点。",
        lose: "全家未来三十年，都要为这个决定喘不上气。",
        effects: { money: -16, health: -8, happy: -6, social: 6 },
        trigger: { unlock: "child", regret: "全家三十年的松快日子" },
        follow: {
          id: "q58-A",
          title: "一套房，两代人",
          beats: [
            {
              scene: "房子很小，六十平，客厅放不下一张完整的餐桌。每月还完贷，卡里只剩几百块。",
              choice: {
                A: { title: "精打细算", text: "熬几年，收入总会涨。" },
                B: { title: "开始透支", text: "先刷信用卡，别让孩子看出来。" }
              }
            },
            {
              scene: "孩子在那所学校读到毕业，成绩中等。有一天他说：妈，其实我不喜欢这儿，同学家里都很有钱。",
              choice: {
                A: { title: "值得", text: "至少我给了他最好的。" },
                B: { title: "哑口无言", text: "我们拼了命换来的，不是他要的。" }
              }
            }
          ],
          regret: "一家人本该有的从容"
        }
      },
      {
        key: "B",
        title: "不背这个债",
        gain: "手里有余钱，家里有笑声。",
        lose: "孩子上的学校普通，你得接受这件事。",
        effects: { money: 12, happy: 10, social: -8 },
        trigger: { unlock: "child", regret: "孩子可能错过的那个起点" },
        follow: {
          id: "q58-B",
          title: "普通学校，普通日子",
          beats: [
            {
              scene: "孩子进了家门口的小学。班上什么人都有，菜市场老板的儿子、修车师傅的女儿。",
              choice: {
                A: { title: "教他读书", text: "学校一般，家里不能一般。" },
                B: { title: "由着他长", text: "他自己会找到路。" }
              }
            },
            {
              scene: "很多年后，孩子说起小学同学：现在我们还有联系，什么样的人都有。你听着，忽然觉得当年没买房也不算错。",
              choice: {
                A: { title: "庆幸", text: "他见过真实的世界。" },
                B: { title: "仍会想", text: "如果当年买了呢。" }
              }
            }
          ],
          regret: "那条更宽一点的路"
        }
      }
    ]
  },

  {
    id: "q59",
    title: "亲戚求你在单位走个后门，帮不帮？",
    scene: "表弟的孩子要进你们单位，笔试差了几分。表弟拎着东西上门，说：你一句话的事，帮帮忙。",
    options: [
      {
        key: "A",
        title: "帮",
        gain: "亲戚记你一辈子情，家里关系处得顺。",
        lose: "这事一旦被翻出来，你的饭碗就悬了。",
        effects: { social: 12, happy: 3, money: 3 },
        trigger: { unlock: "silence", regret: "那份清清白白的履历" },
        follow: {
          id: "q59-A",
          title: "一句话的事",
          beats: [
            {
              scene: "你打了两个电话，事办成了。过年时表弟一家提着东西来，席间一口一个「全靠你」。",
              choice: {
                A: { title: "受着", text: "人情社会，都这么过。" },
                B: { title: "心里不安", text: "那两个电话，越想起越沉。" }
              }
            },
            {
              scene: "两年后单位巡视，有人匿名反映招人有问题。名单上那个名字，你看了很久。",
              choice: {
                A: { title: "扛下来", text: "是我做的，我认。" },
                B: { title: "想办法撇清", text: "先保住自己，别的以后再说。" }
              }
            }
          ],
          regret: "那份可以摊在桌上的干净"
        }
      },
      {
        key: "B",
        title: "不帮",
        gain: "底线还在，晚上睡得着。",
        lose: "表弟一家从此不登门，亲戚间会传你「当了官就不认人」。",
        effects: { social: -14, happy: 5, money: 2 },
        trigger: { unlock: "silence", regret: "那门断掉的亲戚" },
        follow: {
          id: "q59-B",
          title: "把东西退回去",
          beats: [
            {
              scene: "你把东西原样送回，说明年可以再考。表弟脸沉下来，拎着东西走了，一句话没说。",
              choice: {
                A: { title: "解释一次", text: "把规则讲清楚，听不听在他。" },
                B: { title: "不再多话", text: "该说的说了，剩下的随他。" }
              }
            },
            {
              scene: "过年走亲戚，表弟一家没来。母亲叹气：都是一家人。你低头扒饭，没接话。",
              choice: {
                A: { title: "认了", text: "有些关系，保不住就保不住。" },
                B: { title: "有点后悔", text: "一个电话而已，真的不能打吗。" }
              }
            }
          ],
          regret: "那门不再来往的亲戚"
        }
      }
    ]
  },

  {
    id: "q60",
    title: "账上多打了三个月工资，你说不说？",
    scene: "离职当月，公司财务出错，多打了三个月工资，六万多。没人提。你正要交新房的首付。",
    options: [
      {
        key: "A",
        title: "不说",
        gain: "首付的缺口一下补上了。",
        lose: "这笔钱，以后每次想起都会硌一下。",
        effects: { money: 18, happy: -8 },
        trigger: { unlock: "conscience", regret: "那点能挺直腰杆的底气" },
        follow: {
          id: "q60-A",
          title: "一笔没名分的钱",
          beats: [
            {
              scene: "钱躺在卡里，你反复看流水，越看越心慌。财务那边一直没动静。",
              choice: {
                A: { title: "装作不知道", text: "是他们算错的，不怪我。" },
                B: { title: "打个电话", text: "问一句，也许心里能松点。" }
              }
            },
            {
              scene: "一年后，公司审计翻旧账，前同事发消息问你：当年那笔钱，你退了吗。",
              choice: {
                A: { title: "承认没退", text: "钱花了，退不出来了。" },
                B: { title: "补上", text: "现在还，还来得及。" }
              }
            }
          ],
          regret: "那种不用躲着人走的踏实"
        }
      },
      {
        key: "B",
        title: "主动说明",
        gain: "心里干净，也留了个好名声。",
        lose: "首付又要东拼西凑。",
        effects: { money: -6, happy: 8, social: 6 },
        trigger: { unlock: "conscience", regret: "那笔本可以解燃眉之急的钱" },
        follow: {
          id: "q60-B",
          title: "退回去",
          beats: [
            {
              scene: "财务很意外，说很少有人主动提。她把钱划回去，末了说了句：谢谢你。",
              choice: {
                A: { title: "轻松了", text: "钱少点，觉睡得着。" },
                B: { title: "有点肉疼", text: "六万块，够装修一间房了。" }
              }
            },
            {
              scene: "两年后你换工作，背调电话打到前公司。老领导说了一句：这人靠得住。",
              choice: {
                A: { title: "原来有用", text: "有些东西，是慢慢兑的。" },
                B: { title: "并不在意", text: "当时只是过不去自己那关。" }
              }
            }
          ],
          regret: "首付里缺的那六万"
        }
      }
    ]
  },

  {
    id: "q61",
    title: "功劳被同事抢了，撕破脸还是忍？",
    scene: "那个方案是你熬了三周做的，汇报时组长只提了自己。大领导当场表扬了他，还说要给他加担子。",
    options: [
      {
        key: "A",
        title: "当场说清",
        gain: "把功劳拿回来，也让所有人知道你不是软柿子。",
        lose: "从此和组长结了梁子，日子不好过。",
        effects: { social: -10, happy: 8, money: 3 },
        trigger: { unlock: "silence", regret: "那份表面上的和气" },
        follow: {
          id: "q61-A",
          title: "把话摆上桌",
          beats: [
            {
              scene: "会上你补了一句：这个方案的初稿和数据，是我做的。会议室安静了几秒，大领导看了你一眼。",
              choice: {
                A: { title: "继续说", text: "把过程、时间、文件都摆出来。" },
                B: { title: "点到为止", text: "说一句，剩下的让大家想。" }
              }
            },
            {
              scene: "后来那份功劳分回来了，可组里再没人叫你一起吃饭。",
              choice: {
                A: { title: "不后悔", text: "我争的是事实，不是人缘。" },
                B: { title: "有点孤单", text: "赢了道理，输了处境。" }
              }
            }
          ],
          regret: "那份能一起吃饭的和气"
        }
      },
      {
        key: "B",
        title: "忍下来",
        gain: "表面无事，往后还有合作。",
        lose: "这口气咽下去，会记很久。",
        effects: { social: 6, happy: -12 },
        trigger: { unlock: "silence", regret: "那次没为自己说的话" },
        follow: {
          id: "q61-B",
          title: "咽下去",
          beats: [
            {
              scene: "散会后你在楼道站了一会儿。组长路过，拍拍你的肩：年轻人，机会多的是。",
              choice: {
                A: { title: "笑着应", text: "好，我多学着点。" },
                B: { title: "不接话", text: "只是点了点头。" }
              }
            },
            {
              scene: "半年后，他升了经理。新项目还是交给你做，署名还是他。",
              choice: {
                A: { title: "继续做", text: "活总有人干，也总有人看得见。" },
                B: { title: "开始留证据", text: "以后每份文件，都留时间戳。" }
              }
            }
          ],
          regret: "那次本该为自己说的话"
        }
      }
    ]
  },

  {
    id: "q62",
    title: "这个秘密，说出来还是带进土里？",
    scene: "父亲去世后，你整理他的遗物，发现一封没寄出的信。信里写着他年轻时做错过一件事，害了一个人一辈子。那个人，现在还活着。",
    options: [
      {
        key: "A",
        title: "去找那个人",
        gain: "真相说出来，至少有人能等到一句道歉。",
        lose: "父亲在所有人记忆里的样子，会碎掉。",
        effects: { happy: 10, social: -8, health: -5 },
        trigger: { unlock: "silence", regret: "父亲那个一直被记住的好名声" },
        follow: {
          id: "q62-A",
          title: "迟到的一封信",
          beats: [
            {
              scene: "你按地址找了很久，才找到那户人家。开门的是个老太太，听完愣了很久，说：我等这句话，等了四十年。",
              choice: {
                A: { title: "替他道歉", text: "人走了，话我替他带到。" },
                B: { title: "把信给她", text: "他自己的字，比我说的重。" }
              }
            },
            {
              scene: "回程的车上，你忽然不知道该用什么表情想起父亲。他做过坏事，也养大了你。",
              choice: {
                A: { title: "接受", text: "人本来就是两面的。" },
                B: { title: "难受", text: "有些事，知道了就回不去了。" }
              }
            }
          ],
          regret: "父亲在我心里的那个样子"
        }
      },
      {
        key: "B",
        title: "烧了",
        gain: "父亲的形象保住了，家里也少一场风波。",
        lose: "那个人到死都等不到一句道歉。",
        effects: { social: 5, happy: -8 },
        trigger: { unlock: "conscience", regret: "那句本该被说出口的道歉" },
        follow: {
          id: "q62-B",
          title: "一封没寄的信",
          beats: [
            {
              scene: "你把信放进铁盆，火苗舔上来的时候，你看见最后一行写着：我这辈子没敢当面说。",
              choice: {
                A: { title: "烧完", text: "上一辈的事，到此为止。" },
                B: { title: "留下一角", text: "把落款那半页收起来。" }
              }
            },
            {
              scene: "几年后你路过那个城市，忽然想起那户人家。你不知道他们过得怎么样，也不敢知道。",
              choice: {
                A: { title: "不再想", text: "我选择了，就不回头。" },
                B: { title: "一直记着", text: "这件事，成了我自己的秘密。" }
              }
            }
          ],
          regret: "那个人的四十年"
        }
      }
    ]
  },

  {
    id: "q63",
    title: "老同学拉你入伙，投不投？",
    scene: "多年没联系的同学突然找到你，说有个稳赚不赔的项目，缺一笔启动资金，拉你入伙，还差二十万。",
    options: [
      {
        key: "A",
        title: "投",
        gain: "万一成了，这辈子不用再上班。",
        lose: "二十万可能是你全部的积蓄。",
        effects: { money: -15, social: 6, happy: 5 },
        trigger: { unlock: "debt", regret: "那二十万本可以留着救急" },
        follow: {
          id: "q63-A",
          title: "一场豪赌",
          beats: [
            {
              scene: "钱打过去三个月，项目迟迟没动静。你问他，他说在等一个批文。",
              choice: {
                A: { title: "再等等", text: "做事都有个过程。" },
                B: { title: "要账目", text: "投了钱，总得看看账。" }
              }
            },
            {
              scene: "半年后，他电话打不通了。共同的朋友说，他欠了一屁股债，人也躲起来了。",
              choice: {
                A: { title: "认栽", text: "钱没了，人还得过。" },
                B: { title: "去要", text: "哪怕撕破脸，也要问个明白。" }
              }
            }
          ],
          regret: "那二十万和那个老同学"
        }
      },
      {
        key: "B",
        title: "不投",
        gain: "钱在手里，日子照常。",
        lose: "同学说你不够意思，往后不再来往。",
        effects: { money: 3, social: -8, happy: 3 },
        trigger: { unlock: "debt", regret: "那个可能翻身的机会" },
        follow: {
          id: "q63-B",
          title: "没上这条船",
          beats: [
            {
              scene: "你婉拒了。他在电话里沉默了几秒，说：行，我懂了。",
              choice: {
                A: { title: "解释", text: "不是不信你，是我输不起。" },
                B: { title: "不解释", text: "懂的人自然懂。" }
              }
            },
            {
              scene: "一年后听说那个项目黄了，几个投钱的都在追债。你看着手机，心里说不清是什么滋味。",
              choice: {
                A: { title: "庆幸", text: "守住了自己的底线。" },
                B: { title: "不轻松", text: "他当年也许真的只是想做成一件事。" }
              }
            }
          ],
          regret: "当年没敢押上的那一把"
        }
      }
    ]
  },

  {
    id: "q64",
    title: "体面这件事，要不要借钱撑着？",
    scene: "同学聚会定在一家很贵的餐厅，人均五百。你最近手头紧，可不想被人看出来。",
    options: [
      {
        key: "A",
        title: "撑住",
        gain: "面上过得去，没人会议论你。",
        lose: "为这一晚，下个月得省出来。",
        effects: { money: -8, social: 8, happy: -5 },
        trigger: { unlock: "silence", regret: "那些为面子花掉的实在钱" },
        follow: {
          id: "q64-A",
          title: "一场体面",
          beats: [
            {
              scene: "你换了身新衣服，饭后抢着买了单。有人拍你肩膀：还是你大气。回家路上你算了算账。",
              choice: {
                A: { title: "觉得值", text: "人活一张脸。" },
                B: { title: "觉得空", text: "这顿饭，够孩子上两个月兴趣班。" }
              }
            },
            {
              scene: "下一次聚会，大家都默认你会买单。你提前一个月开始攒这笔钱。",
              choice: {
                A: { title: "继续撑", text: "已经这样了，不能掉下来。" },
                B: { title: "坦白", text: "下次换个便宜的地方吧。" }
              }
            }
          ],
          regret: "那些为面子花掉的实在钱"
        }
      },
      {
        key: "B",
        title: "说实话",
        gain: "省下钱，也不用演。",
        lose: "当场会有一点难堪。",
        effects: { money: 6, social: -6, happy: 8 },
        trigger: { unlock: "silence", regret: "那个别人眼里的体面" },
        follow: {
          id: "q64-B",
          title: "不演了",
          beats: [
            {
              scene: "你说最近手头紧，换个地方吧，我请吃面。有人笑了一声，也有人跟着说：面好，我正想吃面。",
              choice: {
                A: { title: "心里一暖", text: "真朋友不会因为一顿饭变。" },
                B: { title: "有点尴尬", text: "那一声笑，还是扎耳朵。" }
              }
            },
            {
              scene: "那顿饭吃得很热闹，人均三十。散场时有人说：下次还去那家。",
              choice: {
                A: { title: "轻松", text: "原来不用撑，也能有场子。" },
                B: { title: "没底", text: "总觉得自己在这个圈子里矮了一截。" }
              }
            }
          ],
          regret: "那个别人眼里的体面"
        }
      }
    ]
  },

  {
    id: "q65",
    title: "手术有一半风险，做还是不做？",
    scene: "体检查出一个问题，医生说可以观察，也可以手术。手术能根治，但有一半的概率留下后遗症。",
    options: [
      {
        key: "A",
        title: "做手术",
        gain: "赌一把，赌赢了就彻底好了。",
        lose: "输了，往后的日子都要带着它。",
        effects: { health: -12, happy: 5, money: -10 },
        trigger: { unlock: "health", regret: "那副一直好用的身体" },
        follow: {
          id: "q65-A",
          title: "上手术台",
          beats: [
            {
              scene: "推进手术室前，你盯着天花板。麻醉师问你怕不怕，你说还好，其实手心全是汗。",
              choice: {
                A: { title: "交给医生", text: "到这一步了，想也没用。" },
                B: { title: "交代后事", text: "进去前，把该说的都说了。" }
              }
            },
            {
              scene: "手术顺利。恢复期比想象中长，爬两层楼就喘。医生说：慢慢来，会好的。",
              choice: {
                A: { title: "耐心养", text: "身体这东西，急不得。" },
                B: { title: "急着回去", text: "工作堆着，躺不住。" }
              }
            }
          ],
          regret: "手术前那副想用就用的身体"
        }
      },
      {
        key: "B",
        title: "先观察",
        gain: "不动刀，日子照常过。",
        lose: "每次复查，都要等一个结果。",
        effects: { health: 3, happy: -8, money: 3 },
        trigger: { unlock: "health", regret: "那个也许能一劳永逸的机会" },
        follow: {
          id: "q65-B",
          title: "与它共处",
          beats: [
            {
              scene: "你把复查日期记在手机里，每半年一次。前几次很紧张，后来慢慢习惯了。",
              choice: {
                A: { title: "认真随访", text: "该查就查，不拖。" },
                B: { title: "不想管了", text: "查出来又能怎样，不如糊涂点。" }
              }
            },
            {
              scene: "第五年复查，医生说没变化，可以放心。你走出医院，在门口站了很久。",
              choice: {
                A: { title: "庆幸", text: "当年没挨那一刀，是对的。" },
                B: { title: "后怕", text: "这五年，我一直在等一个消息。" }
              }
            }
          ],
          regret: "那五年悬着的心"
        }
      }
    ]
  },

  {
    id: "q66",
    title: "你只有四个晚上，分给谁？",
    scene: "一周里真正能自己支配的，只有四个晚上。父母的电话、伴侣的沉默、孩子的作业、自己的身体，都在等你。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "parent", name: "回一趟父母家", tag: "至亲", desc: "他们越来越老，话越来越少", effects: { happy: 6, health: 2 } },
      { key: "partner", name: "好好陪伴侣", tag: "陪伴", desc: "不提孩子，不提钱，只说你们俩", effects: { happy: 6, social: 3 } },
      { key: "child", name: "陪孩子写作业", tag: "情感", desc: "他现在还需要你", effects: { happy: 4, health: -3 } },
      { key: "friend", name: "见一个老朋友", tag: "善意", desc: "见一面少一面", effects: { social: 8, happy: 3 } },
      { key: "self", name: "留一个晚上给自己", tag: "自我", desc: "什么都不干，也不行吗", effects: { happy: 7, health: 4 } },
      { key: "work", name: "把活干完", tag: "成就", desc: "明天的自己会感谢今晚", effects: { money: 10, health: -6, happy: -4 } },
      { key: "body", name: "去跑步", tag: "成长", desc: "身体是唯一不能换的东西", effects: { health: 12, happy: 2 } }
    ],
    follow: {
      id: "q66",
      title: "四个晚上",
      beats: [
        {
          scene: "第一个晚上结束，你发现自己很久没有这么完整地过完几个小时。剩下的三个，你还是得选。",
          choice: {
            A: { title: "按计划走", text: "排好了就照着做。" },
            B: { title: "临时改主意", text: "谁需要我，我就去哪儿。" }
          }
        },
        {
          scene: "一周过去，被划掉的那几项还在原地。父母又打来电话，说没事，就是问问。",
          choice: {
            A: { title: "下周补上", text: "总有下周。" },
            B: { title: "心里发紧", text: "下周、下周，说了多少年了。" }
          }
        }
      ],
      regret: "那些永远排在下一周的人和事"
    }
  },

  {
    id: "q67",
    title: "给孩子留什么？只能留三样",
    scene: "你开始认真地想，如果有一天不在了，能留给孩子的是什么。钱、房、关系、手艺，你只能留下三样。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "money", name: "一笔存款", tag: "成就", desc: "他至少不用为钱低一次头", effects: { money: 12 } },
      { key: "house", name: "一套房子", tag: "庇护", desc: "不管怎样，有个落脚的地方", effects: { money: 8, happy: 3 } },
      { key: "edu", name: "最好的教育", tag: "成长", desc: "他能自己走路", effects: { money: -8, happy: 4 } },
      { key: "craft", name: "一门手艺", tag: "成就", desc: "到哪儿都能吃饭", effects: { money: 6, happy: 2 } },
      { key: "people", name: "几个靠得住的人", tag: "善意", desc: "遇事有人能搭把手", effects: { social: 12 } },
      { key: "health", name: "一个好身体", tag: "成长", desc: "从小养成的习惯", effects: { health: 12, happy: 2 } },
      { key: "name", name: "一个好名声", tag: "精神", desc: "别人提起这个姓，会点头", effects: { social: 6, happy: 4 } },
      { key: "letters", name: "一箱写给他的信", tag: "情感", desc: "他四十岁那年才有用", effects: { happy: 8 } }
    ],
    follow: {
      id: "q67",
      title: "留下来的三样",
      beats: [
        {
          scene: "你把选中的三样写下来，忽然发现每一样背后都藏着你的遗憾——你留什么，往往是因为你缺什么。",
          choice: {
            A: { title: "承认这点", text: "我留的，是我没得到的。" },
            B: { title: "重新选", text: "那不该由我的遗憾决定。" }
          }
        },
        {
          scene: "很多年后，孩子说起你，提的不是钱，也不是房。他说：我爸教过我一句话。",
          choice: {
            A: { title: "欣慰", text: "原来真能留下点什么。" },
            B: { title: "怅然", text: "我能留下的，只有一句话吗。" }
          }
        }
      ],
      regret: "那些没能留给他的东西"
    }
  },

  {
    id: "q68",
    title: "四十岁重新开始，你带走哪四样？",
    scene: "四十岁，你要把过去清零，去一个没人认识你的地方重新开始。行李有限，只能带走四样。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "money", name: "一笔积蓄", tag: "起点", desc: "能撑一年不慌", effects: { money: 12 } },
      { key: "skill", name: "吃饭的本事", tag: "成就", desc: "到哪儿都用得上", effects: { money: 8, happy: 3 } },
      { key: "body", name: "一副好身体", tag: "成长", desc: "重新开始最费的其实是体力", effects: { health: 12 } },
      { key: "family", name: "家人的支持", tag: "至亲", desc: "有人等你回去吃饭", effects: { happy: 7, social: 4 } },
      { key: "friends", name: "几个真朋友", tag: "善意", desc: "关键时刻能借到钱的那种", effects: { social: 10 } },
      { key: "degree", name: "一张文凭", tag: "转折", desc: "敲门的时候用得上", effects: { money: 4, social: 4 } },
      { key: "hobby", name: "一个爱好", tag: "自由", desc: "撑住那些难熬的夜", effects: { happy: 7 } },
      { key: "repute", name: "过去的名声", tag: "精神", desc: "在新地方，也可能是包袱", effects: { social: 6, happy: -3 } }
    ],
    follow: {
      id: "q68",
      title: "四十岁的行李",
      beats: [
        {
          scene: "收拾行李时你才发现，真正舍不得带走的，都是些不值钱的东西。可你只能带四样。",
          choice: {
            A: { title: "按理智选", text: "活下去最要紧。" },
            B: { title: "按心选", text: "这一次，我想带点没用的。" }
          }
        },
        {
          scene: "到了新地方的第一晚，房间很空。你把带来的东西摆开，忽然知道接下来要靠什么活着。",
          choice: {
            A: { title: "有底了", text: "带对了。" },
            B: { title: "还是缺", text: "少的那样，原来是最要紧的。" }
          }
        }
      ],
      regret: "留在原地的四样"
    }
  },

  {
    id: "q69",
    title: "换一座城市定居，四个条件选哪四个？",
    scene: "你可以自由选一座城市住上十年。它不是旅游，是过日子：上班、买菜、看病、养孩子。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "price", name: "房价能承受", tag: "起点", desc: "不用背三十年", effects: { money: 12 } },
      { key: "commute", name: "通勤半小时内", tag: "自由", desc: "每天多出两小时给自己", effects: { happy: 7, health: 4 } },
      { key: "school", name: "学校不错", tag: "成长", desc: "孩子的事，总是第一位", effects: { happy: 3 } },
      { key: "air", name: "空气和天气好", tag: "成长", desc: "身体会替你记住", effects: { health: 12 } },
      { key: "friends", name: "有几个熟人", tag: "善意", desc: "出事时能打个电话", effects: { social: 12 } },
      { key: "job", name: "工作机会多", tag: "成就", desc: "不用怕失业", effects: { money: 10 } },
      { key: "parents", name: "离父母近", tag: "至亲", desc: "他们老了，跑一趟不容易", effects: { happy: 6, social: 4 } },
      { key: "quiet", name: "安静、人少", tag: "自我", desc: "不用应付太多人", effects: { happy: 6, social: -3 } }
    ],
    follow: {
      id: "q69",
      title: "十年，一座城",
      beats: [
        {
          scene: "你选的城市没有一样是完美的。搬进去的第一周，你就在后悔和庆幸之间来回。",
          choice: {
            A: { title: "先住满一年", text: "别急着下结论。" },
            B: { title: "马上换", text: "第一感觉往往是对的。" }
          }
        },
        {
          scene: "十年后，你在这座城市有了一条固定的散步路线，和两个能随时敲门的人。",
          choice: {
            A: { title: "这里就是家", text: "选对了。" },
            B: { title: "还是想别处", text: "另一些条件，一直在心里发痒。" }
          }
        }
      ],
      regret: "没选的那四个条件"
    }
  },

  {
    id: "q70",
    title: "手机里只能留四个应用",
    scene: "手机坏了，只装得下四个应用。剩下的一概没有：不能临时再下，只能用这四个过完这一年。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "chat", name: "聊天软件", tag: "情感", desc: "所有人都在里面", effects: { social: 10 } },
      { key: "work", name: "办公软件", tag: "成就", desc: "不上就丢饭碗", effects: { money: 10, happy: -4 } },
      { key: "pay", name: "支付软件", tag: "起点", desc: "没钱寸步难行", effects: { money: 6, social: 3 } },
      { key: "video", name: "短视频", tag: "慰藉", desc: "睡前那半小时", effects: { happy: 6, health: -4 } },
      { key: "map", name: "地图导航", tag: "方向", desc: "不至于迷路", effects: { health: 2, social: 4 } },
      { key: "learn", name: "学习软件", tag: "成长", desc: "每天二十分钟", effects: { happy: 3, money: 4 } },
      { key: "shop", name: "购物软件", tag: "庇护", desc: "生活用品总得买", effects: { money: -4, happy: 3 } },
      { key: "camera", name: "相机", tag: "表达", desc: "留住一些瞬间", effects: { happy: 7 } }
    ],
    follow: {
      id: "q70",
      title: "四个应用的一年",
      beats: [
        {
          scene: "第一个月最难熬。手指总是习惯性地去找那个不存在的图标。",
          choice: {
            A: { title: "忍过去", text: "习惯是养出来的。" },
            B: { title: "偷偷装回来", text: "少一个，应该没人知道。" }
          }
        },
        {
          scene: "一年后你发现，被删掉的那个，其实也没那么重要。真正让你空落落的，是别的东西。",
          choice: {
            A: { title: "清爽", text: "原来我需要的这么少。" },
            B: { title: "有点慌", text: "删得掉应用，删不掉那种空。" }
          }
        }
      ],
      regret: "那一年没能刷到的东西"
    }
  },

  {
    id: "q71",
    title: "团队只剩五个人，你留谁？",
    scene: "项目缩编，预算只够养五个人。你手里有八份档案，得亲手划掉三个。",
    type: "multi",
    pickCount: 5,
    items: [
      { key: "tech", name: "技术最强的", tag: "成就", desc: "离了他项目会停", effects: { money: 8 } },
      { key: "sale", name: "最能拿单的", tag: "成就", desc: "钱是他带回来的", effects: { money: 10 } },
      { key: "old", name: "跟了十年的老人", tag: "情感", desc: "他知道所有来龙去脉", effects: { social: 6, happy: 4 } },
      { key: "young", name: "最有冲劲的新人", tag: "转折", desc: "三年后能顶上半边天", effects: { happy: 4 } },
      { key: "steady", name: "最稳的那个人", tag: "陪伴", desc: "从不添乱，交给他就放心", effects: { social: 6, happy: 3 } },
      { key: "relation", name: "上面打过招呼的", tag: "庇护", desc: "留下他，明年预算好谈", effects: { money: 6, social: -4 } },
      { key: "friend", name: "跟你最久的兄弟", tag: "至亲", desc: "当年一起熬过来的", effects: { happy: 7, money: -4 } },
      { key: "me", name: "你自己", tag: "自我", desc: "也可以把自己划掉", effects: { happy: 6, money: -10 } }
    ],
    follow: {
      id: "q71",
      title: "五个名字",
      beats: [
        {
          scene: "名单交上去那天，被划掉的一个人来找你。他没吵，只是问：是我哪里做得不好吗。",
          choice: {
            A: { title: "说实话", text: "不是你的问题，是钱不够。" },
            B: { title: "找个理由", text: "说些不伤人的场面话。" }
          }
        },
        {
          scene: "一年后，留下的五个人把项目做成了。庆功宴上，有人提起了走的那三个。",
          choice: {
            A: { title: "敬一杯", text: "这个项目里有他们的份。" },
            B: { title: "岔开话题", text: "过去的事，不提了。" }
          }
        }
      ],
      regret: "被划掉的那三个名字"
    }
  },

  {
    id: "q72",
    title: "一年二十天假，怎么花？",
    scene: "你有一年二十天年假，可以自由安排。攒着换钱、出去玩、回家躺着，都行，但只有二十天。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "home", name: "回老家陪父母", tag: "至亲", desc: "一年见两次，见一次少一次", effects: { happy: 7, social: 5 } },
      { key: "travel", name: "去一个没去过的地方", tag: "自由", desc: "趁还走得动", effects: { happy: 8, money: -10 } },
      { key: "sleep", name: "什么都不干", tag: "慰藉", desc: "把欠的觉补回来", effects: { health: 12, happy: 3 } },
      { key: "learn", name: "学一样新东西", tag: "成长", desc: "也许能换条路走", effects: { money: 6, happy: 3 } },
      { key: "kid", name: "带孩子出去玩", tag: "情感", desc: "他记得住的那几年不多了", effects: { happy: 7, money: -8 } },
      { key: "money", name: "换成加班费", tag: "成就", desc: "二十天，是一笔不小的钱", effects: { money: 14, health: -6 } },
      { key: "alone", name: "一个人待着", tag: "自我", desc: "不用跟任何人说话", effects: { happy: 6, social: -4 } }
    ],
    follow: {
      id: "q72",
      title: "二十天",
      beats: [
        {
          scene: "假期排好了，可临到跟前，总有事情插进来。第一个想放弃的，往往是自己那一项。",
          choice: {
            A: { title: "守住自己的", text: "这一年，至少留几天给自己。" },
            B: { title: "让出去", text: "家里事大，我的可以往后放。" }
          }
        },
        {
          scene: "年底翻相册，二十天里真正记住的，只有三四天。",
          choice: {
            A: { title: "够了", text: "一年有四天值得记，不算白过。" },
            B: { title: "不够", text: "剩下那些天，都去哪儿了。" }
          }
        }
      ],
      regret: "那二十天里没用上的部分"
    }
  },

  {
    id: "q73",
    title: "最后三个月，做哪四件事？",
    scene: "医生说你还有三个月。不疼，清醒，能走动。你可以列出四件一定要做的事。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "farewell", name: "跟每个人好好告别", tag: "情感", desc: "把该说的都说了", effects: { happy: 8 } },
      { key: "place", name: "回一趟小时候的地方", tag: "起点", desc: "看看那棵树还在不在", effects: { happy: 7 } },
      { key: "letter", name: "写一封信给孩子", tag: "至亲", desc: "等他四十岁再看", effects: { happy: 7, social: 4 } },
      { key: "debt", name: "把欠的都还清", tag: "成就", desc: "不欠人，也不欠自己", effects: { money: -8, happy: 6 } },
      { key: "fun", name: "痛痛快快玩一场", tag: "自由", desc: "想吃什么吃什么", effects: { happy: 8, health: -6 } },
      { key: "work", name: "把手上的事做完", tag: "精神", desc: "有点不甘心", effects: { money: 6, happy: -4 } },
      { key: "forgive", name: "原谅一个人", tag: "和解", desc: "包括原谅自己", effects: { happy: 10 } },
      { key: "quiet", name: "什么都不做，就晒太阳", tag: "慰藉", desc: "三个月，也可以只是活着", effects: { health: 4, happy: 7 } }
    ],
    follow: {
      id: "q73",
      title: "倒数的日子",
      beats: [
        {
          scene: "第一个月，你把四件事排得满满的，像在赶一场永远赶不完的工。",
          choice: {
            A: { title: "慢下来", text: "不是任务，是最后的日子。" },
            B: { title: "抓紧做", text: "时间不等人。" }
          }
        },
        {
          scene: "最后一周，你发现清单上还剩一件没做。可你已经不慌了。",
          choice: {
            A: { title: "放下它", text: "做不完就算了。" },
            B: { title: "撑起来做", text: "哪怕只做一半。" }
          }
        }
      ],
      regret: "那三个月里没做成的事"
    }
  },

  {
    id: "q74",
    title: "四十平米的房子，只能留五件旧物",
    scene: "你搬进一间四十平米的小屋。老家的东西只能带五件，其余的要么送人，要么扔掉。",
    type: "multi",
    pickCount: 5,
    items: [
      { key: "photo", name: "一盒老照片", tag: "情感", desc: "父母的年轻时候", effects: { happy: 7 } },
      { key: "stool", name: "爷爷的旧木凳", tag: "至亲", desc: "坐上去会响", effects: { happy: 6, social: 2 } },
      { key: "letter", name: "一封没寄出的信", tag: "遗憾", desc: "不知道该不该再看", effects: { happy: -4, social: 4 } },
      { key: "watch", name: "父亲的手表", tag: "陪伴", desc: "早就不走了", effects: { happy: 4 } },
      { key: "book", name: "一本翻烂的书", tag: "精神", desc: "十七岁那年读的", effects: { happy: 6 } },
      { key: "quilt", name: "母亲缝的被子", tag: "慰藉", desc: "还有她身上的味道", effects: { health: 4, happy: 7 } },
      { key: "tool", name: "一套旧工具", tag: "成就", desc: "修过家里所有东西", effects: { money: 4, happy: 4 } },
      { key: "nothing", name: "什么都不带", tag: "自由", desc: "重新开始，就要干净", effects: { happy: 3, social: -6 } }
    ],
    follow: {
      id: "q74",
      title: "五件旧物",
      beats: [
        {
          scene: "收拾的时候，你在一件旧衣服口袋里摸到一张纸条，是很多年前的字。你坐在地上看了很久。",
          choice: {
            A: { title: "留下来", text: "这件也带上，别的少带一件。" },
            B: { title: "拍照就好", text: "记住的方式不止一种。" }
          }
        },
        {
          scene: "新家摆好东西，屋子还是空。可那五件旧物一放上去，就有了点人味。",
          choice: {
            A: { title: "安心", text: "家在东西上，也在人身上。" },
            B: { title: "还是想家", text: "五件太少，剩下的那些没人要了。" }
          }
        }
      ],
      regret: "留在老屋里的那些东西"
    }
  },

  {
    id: "q75",
    title: "如果能改一件事，你改哪一件？",
    scene: "有人给你一次机会，只能改人生里的一件事。改完，后面的一切都会跟着变。",
    type: "multi",
    pickCount: 1,
    items: [
      { key: "study", name: "那年没去念的书", tag: "转折", desc: "一次考试，一条岔路", effects: { money: 8, happy: 4 } },
      { key: "love", name: "那个没有挽留的人", tag: "情感", desc: "当时以为还有很多时间", effects: { happy: 8, social: 4 } },
      { key: "city", name: "那次没敢去的城市", tag: "方向", desc: "车票已经买好了", effects: { happy: 6, money: 4 } },
      { key: "parent", name: "那个没陪父母过的年", tag: "至亲", desc: "后来再没有那样的年", effects: { happy: 7, social: 5 } },
      { key: "job", name: "那份没接的工作", tag: "成就", desc: "后来听说做得很大", effects: { money: 12 } },
      { key: "sorry", name: "那句没说出口的道歉", tag: "和解", desc: "现在说，还来得及吗", effects: { happy: 7, social: 6 } },
      { key: "health", name: "那些熬掉的夜", tag: "成长", desc: "身体已经记账了", effects: { health: 14 } },
      { key: "none", name: "不改", tag: "自我", desc: "改了，就不是我的人生了", effects: { happy: 6 } }
    ],
    follow: {
      id: "q75",
      title: "改与不改",
      beats: [
        {
          scene: "你选中的那件事被改了。醒来时，人生的其他部分也跟着变了——有些变好了，有些变坏了。",
          choice: {
            A: { title: "接受", text: "这就是代价。" },
            B: { title: "想改回去", text: "原来那件事，牵着的太多了。" }
          }
        },
        {
          scene: "你忽然明白，能被你记住的那件事，其实早就成了你的一部分。",
          choice: {
            A: { title: "释然", text: "不完美的那个我，也是我。" },
            B: { title: "仍会想", text: "如果真能重来一次呢。" }
          }
        }
      ],
      regret: "那件最终没改的事"
    }
  }

]);

/* ===== 随机事件 ===== */
window.PACK_EVENTS = (window.PACK_EVENTS || []).concat([
  {
    id: "ev-landlord",
    title: "房东要卖房",
    scene: "住了五年，房东突然说要卖房，给你两个月搬走。中介已经带人来看过两次了。",
    condition: { stat: "money", op: "lt", value: 65 },
    options: [
      { key: "A", title: "赶紧找房", text: "早搬早安心。", effects: { money: -8, happy: -6, health: -3 } },
      { key: "B", title: "跟房东谈", text: "问能不能续租半年。", effects: { social: 4, happy: 2, money: -2 } }
    ]
  },
  {
    id: "ev-school",
    title: "孩子在学校被欺负",
    scene: "孩子回家时袖子是脏的，问你：如果我不还手，是不是很没用。",
    condition: { stat: "social", op: "gt", value: 30 },
    options: [
      { key: "A", title: "去学校讨说法", text: "这事不能忍。", effects: { social: -4, happy: 5, health: -2 } },
      { key: "B", title: "先教他怎么应对", text: "打回去不是唯一的办法。", effects: { happy: 8, social: 3 } }
    ]
  },
  {
    id: "ev-marry",
    title: "父母又开始催了",
    scene: "过年回家，饭桌上第七次被问：什么时候的事。亲戚们笑着看你，母亲的筷子停在半空。",
    condition: { stat: "social", op: "gt", value: 35 },
    options: [
      { key: "A", title: "顶回去", text: "我的事我自己决定。", effects: { happy: 6, social: -8 } },
      { key: "B", title: "笑着敷衍", text: "快了快了，别急。", effects: { social: 5, happy: -6 } }
    ]
  },
  {
    id: "ev-nodule",
    title: "体检查出一个小结节",
    scene: "报告上写着建议复查。医生说八成是良性的，但也可能不是。",
    condition: { stat: "health", op: "lt", value: 70 },
    options: [
      { key: "A", title: "立刻复查", text: "花钱买个安心。", effects: { money: -8, health: 10, happy: -4 } },
      { key: "B", title: "先放一放", text: "八成是良性，八成。", effects: { health: -8, happy: -6 } }
    ]
  },
  {
    id: "ev-overtime",
    title: "一份自愿加班协议",
    scene: "公司让全员签一份协议：自愿放弃加班费。HR 说，签了大家都好过。",
    condition: { stat: "money", op: "lt", value: 60 },
    options: [
      { key: "A", title: "签", text: "保住工作要紧。", effects: { money: 6, happy: -8, health: -5 } },
      { key: "B", title: "不签", text: "该给的钱，得给。", effects: { money: -6, social: 4, happy: 5 } }
    ]
  },
  {
    id: "ev-review2",
    title: "网上有人骂你",
    scene: "你随手发的一条动态被人截图挂了出来，评论区吵成一片，有人翻出了你的工作单位。",
    condition: { stat: "happy", op: "lt", value: 60 },
    options: [
      { key: "A", title: "回击", text: "把话说清楚。", effects: { happy: -4, social: 6 } },
      { key: "B", title: "删掉不理", text: "跟陌生人吵架，没有意义。", effects: { happy: -6, health: 3 } }
    ]
  },
  {
    id: "ev-lost",
    title: "路上捡到一个钱包",
    scene: "钱包里有几千块现金、一张身份证和一张医院的缴费单。",
    options: [
      { key: "A", title: "交给警察", text: "不是我的，不能要。", effects: { happy: 6, social: 3 } },
      { key: "B", title: "按地址送回去", text: "缴费单上应该有急事。", effects: { happy: 10, social: 6, money: -2 } }
    ]
  }
]);

/* ===== 连锁专属局（新增三局） ===== */
window.PACK_CHAINS = (window.PACK_CHAINS || []).concat([
  {
    id: "chain-roots",
    unlock: "roots",
    title: "老家的门",
    scene: "很多年后，你站在老家的路口。那条街拆了一半，剩下的几户也搬走了。你忽然说不清，自己是从哪儿来的。",
    options: [
      { key: "A", title: "回去看看", text: "哪怕只剩一片空地。", effects: { happy: 12, money: -3 }, regret: "那段再也回不去的来处" },
      { key: "B", title: "转身就走", text: "过去的事，别翻了。", effects: { happy: -8, money: 4 }, regret: "那个没敢再看一眼的老家" }
    ]
  },
  {
    id: "chain-child",
    unlock: "child",
    title: "孩子的账",
    scene: "孩子长大了，有一天他问你：当年那些决定，你是为我好，还是为你自己安心？",
    options: [
      { key: "A", title: "说实话", text: "都有。我不敢骗你。", effects: { happy: 12, social: 4 }, regret: "那些替他做主的年头" },
      { key: "B", title: "说是为你", text: "天下父母都这样。", effects: { happy: -6, social: -4 }, regret: "那句没说出口的实话" }
    ]
  },
  {
    id: "chain-silence",
    unlock: "silence",
    title: "没说出口的那句话",
    scene: "很多年过去了，那件事还在。没人再提，但它一直在你心里那块地方，长成了一根刺。",
    options: [
      { key: "A", title: "说出来", text: "晚是晚了，但还来得及。", effects: { happy: 15, social: -6 }, regret: "那些被这件事压住的年" },
      { key: "B", title: "带进土里", text: "有些事，说出来只会更糟。", effects: { happy: -10, social: 3 }, regret: "那个始终没能坦白的自己" }
    ]
  }
]);

/* ===== data/pack-more2.js ===== */
/* 如果当时 · 岔路题 追加卷二
 * 追加到已有的 PACK_START，不覆盖原数据。
 * 10 道二选一（q76–q85）+ 10 道多选限选（q86–q95）。
 *
 * 选题原则：只写前 75 道没有的角度 ——
 *   手足、身世、告别、旧债、体检的恐惧、中年重来、
 *   遗物、葬礼、同学会、独居的邻居。
 * 三道新连锁局的钥匙：brother（房本）/ origin（身世）/ funeral（没去的那场）。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ 一、二选一 ══════════════ */

  {
    id: "q76",
    title: "老友借的钱，催还是不催？",
    scene: "五年前他开口借了八万，说半年就还。如今他换了车，孩子上了私立。你这边房贷压着，妻子提过三次。他从没主动提起那笔钱。",
    options: [
      {
        key: "A",
        title: "开口催",
        gain: "八万要回来了，家里那口气顺了。",
        lose: "二十年的交情，从这天起有了价钱。",
        effects: { money: 18, social: -10, happy: -6 },
        trigger: { unlock: "debt", regret: "那个再也没打来的电话" },
        follow: {
          id: "q76-A",
          title: "要回来了，也散了",
          beats: [
            {
              scene: "你在饭桌上提了。他愣了一下，说忘了，第二天就转了账。转账备注写着「借款已清」。四个字，很客气。",
              choice: {
                A: { title: "问心无愧", text: "借是情分，还是本分。" },
                B: { title: "心里发堵", text: "那四个字，比不还钱还难受。" }
              }
            },
            {
              scene: "过年他照例发来祝福，群发的那种。你回了个表情。此后再没单独说过话。",
              choice: {
                A: { title: "就这样吧", text: "钱回来了，人也看清了。" },
                B: { title: "有时会想", text: "八万块，买断二十年，划算吗。" }
              }
            }
          ],
          regret: "那顿没吃成的饭"
        }
      },
      {
        key: "B",
        title: "不提了",
        gain: "饭还照吃，酒还照喝，什么都不用说破。",
        lose: "每次见面，你都会先看到他新换的那辆车。",
        effects: { money: -8, social: 6, happy: -4 },
        trigger: { unlock: "debt", regret: "那笔从没开口的钱" },
        follow: {
          id: "q76-B",
          title: "钱没提，话也少了",
          beats: [
            {
              scene: "你又去了他的饭局。他敬酒，说这辈子最信得过的就是你。你笑着喝了，酒有点苦。",
              choice: {
                A: { title: "认了", text: "就当他有难处。" },
                B: { title: "记账了", text: "没说出口，但心里有一本账。" }
              }
            },
            {
              scene: "妻子又提了一次。你说算了。她看了你一眼，没再说话，那晚背对着你睡的。",
              choice: {
                A: { title: "跟她解释", text: "有些事，比钱重要。" },
                B: { title: "什么也没说", text: "解释不清，也懒得解释。" }
              }
            }
          ],
          regret: "那八万，和那点体面"
        }
      }
    ]
  },

  {
    id: "q77",
    title: "父母失能了，送不送养老院？",
    scene: "父亲中风后卧床，母亲一个人撑了八个月，腰也弯了。你在外地，一个月回去一次。请护工每月六千，养老院八千。家里的账，怎么算都不够。",
    options: [
      {
        key: "A",
        title: "送去养老院",
        gain: "有人二十四小时看着，母亲能睡个整觉。",
        lose: "他清醒的时候会问：是不是不要我了。",
        effects: { money: -6, health: 6, happy: -12, social: -4 },
        trigger: { unlock: "family", regret: "养老院走廊里那股消毒水味" },
        follow: {
          id: "q77-A",
          title: "把他送走了",
          beats: [
            {
              scene: "养老院很干净，护工很客气。你走的时候，他抓着床栏没松手，也没说话。",
              choice: {
                A: { title: "每周都去", text: "去了，至少他在等。" },
                B: { title: "一个月去一次", text: "去一次，回来的路上都要缓很久。" }
              }
            },
            {
              scene: "半年后他不认得你了。护工说他总对着门口喊一个人的名字，不是你的。",
              choice: {
                A: { title: "那就这样吧", text: "不认得，也就不难过了。" },
                B: { title: "想知道那是谁", text: "他等的，是他自己的父亲吗。" }
              }
            }
          ],
          regret: "那个没说出口的「不是不要你」"
        }
      },
      {
        key: "B",
        title: "接回家，自己扛",
        gain: "他每天都能看见家里人。",
        lose: "你的工作、睡眠、婚姻，一样一样往下沉。",
        effects: { money: -1, health: -16, happy: -6, social: 8 },
        trigger: { unlock: "family", regret: "那两年熬掉的自己" },
        follow: {
          id: "q77-B",
          title: "把他接回来了",
          beats: [
            {
              scene: "你把工作换成了能远程的，工资少了三成。夜里要起来两次翻身。第三个月，你在卫生间哭了一次。",
              choice: {
                A: { title: "撑下去", text: "他养我小，我养他老。" },
                B: { title: "开始算账", text: "还要撑多久。" }
              }
            },
            {
              scene: "他走的那天很安静。你处理完后事，回到家，第一次觉得屋子太大。",
              choice: {
                A: { title: "不后悔", text: "我陪他走完了。" },
                B: { title: "心里空的", text: "陪完了，然后呢。" }
              }
            }
          ],
          regret: "那两年没睡过的整觉"
        }
      }
    ]
  },

  {
    id: "q78",
    title: "孩子说不想读书了，逼不逼？",
    scene: "高二，成绩中上。一天晚上他把书包扔在地上，说：我读不下去了，每天坐在那儿像坐牢。他说想去做西点。你看着他的眼睛，知道他不是赌气。",
    options: [
      {
        key: "A",
        title: "逼他读完",
        gain: "他考上了大学，路宽了些。",
        lose: "此后十年，他提起高中都会沉默一下。",
        effects: { money: 6, happy: -8, social: 6 },
        trigger: { unlock: "child", regret: "他扔掉书包那晚的样子" },
        follow: {
          id: "q78-A",
          title: "他读完了",
          beats: [
            {
              scene: "你收了他的手机，请了家教，每天陪到十一点。他不再反抗，也不再多话，成绩慢慢上去了。",
              choice: {
                A: { title: "这是为他好", text: "他以后会懂。" },
                B: { title: "有点心慌", text: "他不吵了，才更让人怕。" }
              }
            },
            {
              scene: "他大学毕业，进了一家不错的公司。有一年过年喝多了，他说：爸，我到现在做梦还在考场。",
              choice: {
                A: { title: "笑一笑", text: "都过去了。" },
                B: { title: "没接话", text: "有些话，接不了。" }
              }
            }
          ],
          regret: "他那句「像坐牢」"
        }
      },
      {
        key: "B",
        title: "让他去学",
        gain: "他每天六点起床，眼睛是亮的。",
        lose: "亲戚问起，你答得越来越含糊。",
        effects: { money: -6, happy: 12, social: -6 },
        trigger: { unlock: "child", regret: "那张没交上去的报名表" },
        follow: {
          id: "q78-B",
          title: "他去了西点房",
          beats: [
            {
              scene: "他在一家店里当学徒，一个月两千八，手被烤箱烫得起泡。回来他跟你说，师傅夸他手稳。",
              choice: {
                A: { title: "支持他", text: "手稳的人，饿不死。" },
                B: { title: "留个后路", text: "万一行，还得有文凭。" }
              }
            },
            {
              scene: "七年后他自己开了家小店。你去帮忙，看见墙上挂着他第一张裱起来的配方，边角发黄。",
              choice: {
                A: { title: "值了", text: "他活得比我明白。" },
                B: { title: "还是会想", text: "要是当年读完了呢。" }
              }
            }
          ],
          regret: "那句没说出口的「随你」"
        }
      }
    ]
  },

  {
    id: "q79",
    title: "体检报告有个结节，查到底还是先放放？",
    scene: "四十二岁，第一次认真做体检。报告上写着「右肺见磨玻璃结节，建议随访」。医生说不一定有事，三个月复查。你查了一晚上资料，越查越冷。",
    options: [
      {
        key: "A",
        title: "立刻查到底",
        gain: "查清楚了，是良性。",
        lose: "那三个月的每一夜，你都提前死过一次。",
        effects: { money: -6, health: 10, happy: -14 },
        trigger: { unlock: "health", regret: "那三个月的每个凌晨三点" },
        follow: {
          id: "q79-A",
          title: "查了三个月",
          beats: [
            {
              scene: "你做了加强 CT、穿刺、两次会诊。等结果的那周，你把银行卡密码写在了纸上，压在书桌玻璃下。",
              choice: {
                A: { title: "不敢跟家里说", text: "没定的事，说了只是多个人怕。" },
                B: { title: "跟妻子说了", text: "她有权知道。" }
              }
            },
            {
              scene: "最后是良性。医生笑着说恭喜。你走出医院，站在台阶上抽了一根烟，手还在抖。",
              choice: {
                A: { title: "从此戒烟", text: "这条命，是捡回来的。" },
                B: { title: "抽完这根再说", text: "有些事，改不了。" }
              }
            }
          ],
          regret: "那三个月里想过的所有最坏的打算"
        }
      },
      {
        key: "B",
        title: "先放放",
        gain: "日子照过，没人知道，也没人多问。",
        lose: "每次咳嗽，你都会想起那张报告。",
        effects: { money: 1, health: -8, happy: -6 },
        trigger: { unlock: "health", regret: "那张压在抽屉底下的报告" },
        follow: {
          id: "q79-B",
          title: "没去复查",
          beats: [
            {
              scene: "三个月到了，你没去。半年，一年。报告还在抽屉最底下，压在保修卡下面。",
              choice: {
                A: { title: "不去想", text: "不查就是没有。" },
                B: { title: "偷偷查资料", text: "半夜一个人，越看越清醒。" }
              }
            },
            {
              scene: "两年后单位体检，医生问：这个结节随访过吗。你说随访过。他抬头看了你一眼，没再问。",
              choice: {
                A: { title: "松一口气", text: "还在，就说明没长。" },
                B: { title: "心里一沉", text: "他那个眼神，什么意思。" }
              }
            }
          ],
          regret: "那两年自己骗自己的日子"
        }
      }
    ]
  },

  {
    id: "q80",
    title: "创业欠了一屁股债，还债还是先保自己？",
    scene: "公司倒了，欠供应商四十七万，欠银行三十万。房子已经抵押。有人劝你：申请破产，从头再来；也有人说：那些小老板等着这笔钱发工资。",
    options: [
      {
        key: "A",
        title: "一分一分还",
        gain: "七年后，你把最后一笔转了出去。",
        lose: "这七年，你没买过一件新衣服。",
        effects: { money: -14, social: 16, happy: -10, health: -8 },
        trigger: { unlock: "debt", regret: "那七年不敢接的陌生号码" },
        follow: {
          id: "q80-A",
          title: "还了七年",
          beats: [
            {
              scene: "你去了一家小公司做业务，底薪四千。每个月发了工资先还账，剩下的才是生活费。妻子没走，也没说什么。",
              choice: {
                A: { title: "熬", text: "欠的钱，总得有人还。" },
                B: { title: "有时候想放弃", text: "凭什么是我。" }
              }
            },
            {
              scene: "最后一笔转完那天，你在楼下坐了很久。有个当年被你欠过钱的老板发来一条消息：收到了，你这个人，我认。",
              choice: {
                A: { title: "值了", text: "这七年，换回一句话。" },
                B: { title: "也没多高兴", text: "还完了，人也空了。" }
              }
            }
          ],
          regret: "那七年没能给家里的好日子"
        }
      },
      {
        key: "B",
        title: "先破产保命",
        gain: "债务清了，你能重新开始。",
        lose: "有几个小老板，因为这笔钱关了门。",
        effects: { money: 12, social: -18, happy: 4 },
        trigger: { unlock: "debt", regret: "那几个再也打不通的号码" },
        follow: {
          id: "q80-B",
          title: "重新开始了",
          beats: [
            {
              scene: "破产程序走完，你换了城市，找了份工作。没有人知道你的过去。第一年，你睡得比前三年都好。",
              choice: {
                A: { title: "这样也好", text: "人得先活着。" },
                B: { title: "总想起他们", text: "有个老板，孩子那年高考。" }
              }
            },
            {
              scene: "三年后你在街上遇到当年的一个供应商。他推着电动车，头发白了一半。他看见你，点了个头，走了。",
              choice: {
                A: { title: "想追上去", text: "至少说句对不起。" },
                B: { title: "站着没动", text: "说什么都没用了。" }
              }
            }
          ],
          regret: "那几个被我拖下水的人"
        }
      }
    ]
  },

  {
    id: "q81",
    title: "升职名额给了不如你的人，争还是走？",
    scene: "你在部门干了六年，这次主管的位子，所有人都以为是你。结果是刚来两年的小周——他是老板的远房亲戚，全公司都知道。老板拍你肩：再等等，下次一定。",
    options: [
      {
        key: "A",
        title: "争到底",
        gain: "你把六年的活摆到了桌面上，老板答应给你加薪和独立项目。",
        lose: "从这天起，你在这个公司再没有「下次」。",
        effects: { money: 10, social: -6, happy: -4 },
        trigger: { unlock: "conscience", regret: "那句「下次一定」" },
        follow: {
          id: "q81-A",
          title: "把话说了",
          beats: [
            {
              scene: "你约老板谈了四十分钟，把六年的项目清单念了一遍。他听完，说你说得对，是公司欠你的。",
              choice: {
                A: { title: "见好就收", text: "要到了，就行了。" },
                B: { title: "继续问", text: "那为什么不是我。" }
              }
            },
            {
              scene: "半年后小周升了总监。你带的项目做得很好，但再没有人跟你提过「下次」。",
              choice: {
                A: { title: "准备走", text: "这里的天花板，我看清了。" },
                B: { title: "留下", text: "钱给到位了，别的都是虚的。" }
              }
            }
          ],
          regret: "那天没说出口的「凭什么」"
        }
      },
      {
        key: "B",
        title: "递辞呈",
        gain: "你走得干脆，新公司给的title高了一级。",
        lose: "六年的积累，一个纸箱就装完了。",
        effects: { money: 6, social: -10, happy: 6 },
        trigger: { unlock: "conscience", regret: "那个装不满的纸箱" },
        follow: {
          id: "q81-B",
          title: "走了",
          beats: [
            {
              scene: "你当天就写了辞呈。老板挽留了两次，第三次他没再说话，签了字。清抽屉时你发现，六年只装满了一个纸箱。",
              choice: {
                A: { title: "不回头", text: "走都走了。" },
                B: { title: "有点恍惚", text: "六年，就这些？" }
              }
            },
            {
              scene: "新公司第一年很顺，第二年你听说原部门裁了一半人。小周升了副总，也走了。",
              choice: {
                A: { title: "庆幸", text: "走得早。" },
                B: { title: "没什么感觉", text: "那儿的事，跟我没关系了。" }
              }
            }
          ],
          regret: "那六年没被承认的日子"
        }
      }
    ]
  },

  {
    id: "q82",
    title: "发现自己不是亲生的，找不找？",
    scene: "母亲病重时，说漏了一句。你去查了出生证明，是真的：你是抱来的。生父母当年把你放在县医院门口，襁褓里有张纸条，写着生辰。母亲醒后什么都不肯再说。",
    options: [
      {
        key: "A",
        title: "去找",
        gain: "你想知道自己从哪儿来。",
        lose: "躺着的这个人，养了你四十年，现在不敢看你的眼睛。",
        effects: { social: 8, happy: -10, health: -4 },
        trigger: { unlock: "origin", regret: "母亲那句说漏的话" },
        follow: {
          id: "q82-A",
          title: "查了下去",
          beats: [
            {
              scene: "你托人查了当年的记录，找到一户人家，搬走了，据说去了南方。母亲那几天一直问你去哪儿了，你说加班。",
              choice: {
                A: { title: "继续查", text: "总得有个答案。" },
                B: { title: "先停下", text: "她还躺着，我不能走。" }
              }
            },
            {
              scene: "母亲走之前拉着你的手，说：我不是要瞒你，我是怕你走。你握着她的手，一句话也说不出来。",
              choice: {
                A: { title: "说「我不走」", text: "她等的就是这一句。" },
                B: { title: "什么也没说", text: "我不知道那算不算原谅。" }
              }
            }
          ],
          regret: "那张写着生辰的纸条"
        }
      },
      {
        key: "B",
        title: "不找了",
        gain: "家里什么都没变，她还是你妈。",
        lose: "有些夜里，你会想那个把你放在门口的人长什么样。",
        effects: { social: 6, happy: -4 },
        trigger: { unlock: "origin", regret: "那个从没见过的生母" },
        follow: {
          id: "q82-B",
          title: "没再提",
          beats: [
            {
              scene: "你把出生证明放回原处，再没提过。母亲出院后，你们照常吃饭、看电视，谁都不看谁。",
              choice: {
                A: { title: "就当没这事", text: "生恩不如养恩。" },
                B: { title: "有时会想", text: "不是想找，只是想知道。" }
              }
            },
            {
              scene: "她走后第三年，你在整理旧箱子时翻出那张纸条。字迹很生，只有八个字：「求好心人，善待她」。",
              choice: {
                A: { title: "收起来", text: "留个念想。" },
                B: { title: "哭了很久", text: "不知道是为谁哭。" }
              }
            }
          ],
          regret: "那句从没问出口的「为什么」"
        }
      }
    ]
  },

  {
    id: "q83",
    title: "老友病危，最后一面去不去？",
    scene: "大学最好的朋友，肝癌晚期。他在另一个城市，医生估计还有两周。你们三年前为了点小事闹过别扭，后来谁也没先低头。他妻子打来电话，说他想见你。",
    options: [
      {
        key: "A",
        title: "立刻去",
        gain: "你赶上了。他还能说话。",
        lose: "你看见了他瘦成什么样，这辈子都忘不掉。",
        effects: { money: -2, social: 14, happy: -8 },
        trigger: { unlock: "funeral", regret: "病房里那台一直响的机器" },
        follow: {
          id: "q83-A",
          title: "赶到了",
          beats: [
            {
              scene: "你连夜坐火车过去。他躺在病床上，认出你，笑了一下，说：你还挺快。你们没提那件小事。",
              choice: {
                A: { title: "什么都不提", text: "都到这一步了。" },
                B: { title: "说了句对不起", text: "憋了三年的话。" }
              }
            },
            {
              scene: "他走的那天，他妻子发消息给你。你在开会，看完把手机扣在桌上，继续讲完了 PPT。",
              choice: {
                A: { title: "开完会才哭", text: "有些事，只能等忙完。" },
                B: { title: "当场出去了", text: "管不了那么多。" }
              }
            }
          ],
          regret: "那三年谁都不肯先低头的日子"
        }
      },
      {
        key: "B",
        title: "没去",
        gain: "你记住了他健康时的样子。",
        lose: "有些话，从此只能对着空气说。",
        effects: { money: 0, social: -6, happy: -12 },
        trigger: { unlock: "funeral", regret: "那通没接的第二通电话" },
        follow: {
          id: "q83-B",
          title: "没去",
          beats: [
            {
              scene: "你说项目走不开，说过两周一定去。他妻子说好。第十二天，电话又来了，你没接。",
              choice: {
                A: { title: "回拨过去", text: "还是想听听。" },
                B: { title: "没回", text: "不敢听。" }
              }
            },
            {
              scene: "葬礼上你站在最后一排。他的照片是十年前的，笑得很响。你想起那件小事，突然记不起到底是为什么闹的。",
              choice: {
                A: { title: "鞠了三个躬", text: "该做的，还是得做。" },
                B: { title: "提前走了", text: "待不住。" }
              }
            }
          ],
          regret: "那件记不起原因的小事"
        }
      }
    ]
  },

  {
    id: "q84",
    title: "父母要你把房子过户给弟弟，让不让？",
    scene: "这套房是你和妻子还了十二年贷买下的。弟弟做生意赔了，房子被法拍，一家三口住回父母那儿。父亲开口：你那套房大，先过户给你弟，让他去抵押周转，都是一家人。",
    options: [
      {
        key: "A",
        title: "让",
        gain: "父亲说你懂事，弟弟在饭桌上给你敬了酒。",
        lose: "妻子的名字，从那以后很少出现在家里的对话里。",
        effects: { money: -12, social: -8, happy: -16 },
        trigger: { unlock: "brother", regret: "妻子那晚没关的灯" },
        follow: {
          id: "q84-A",
          title: "字签了",
          beats: [
            {
              scene: "过户那天你签了字。弟弟握着你的手说三年之内一定还回来。妻子没去，说要加班。",
              choice: {
                A: { title: "信他", text: "兄弟之间，总得有人先信。" },
                B: { title: "留了一手", text: "让他写了张欠条。" }
              }
            },
            {
              scene: "第三年，弟弟的生意又赔了。房子被二次抵押，你连门都进不去。父亲说：他也是没办法。",
              choice: {
                A: { title: "认了", text: "都是一家人。" },
                B: { title: "翻脸了", text: "从那天起，我不欠这个家了。" }
              }
            }
          ],
          regret: "那套房，和那顿没吃完的饭"
        }
      },
      {
        key: "B",
        title: "不让",
        gain: "你的家还在，妻子的灯还留着。",
        lose: "父亲半年没跟你说话，饭桌上你的碗是最后一个摆的。",
        effects: { money: 2, social: -14, happy: 8 },
        trigger: { unlock: "brother", regret: "父亲那句「你变了」" },
        follow: {
          id: "q84-B",
          title: "没签",
          beats: [
            {
              scene: "你说这房子有一半是你妻子的。父亲拍了桌子，说你翅膀硬了。弟弟低头吃饭，一句话没说。",
              choice: {
                A: { title: "解释清楚", text: "不是不帮，是不能这么帮。" },
                B: { title: "不解释", text: "说了也没人听。" }
              }
            },
            {
              scene: "两年后弟弟自己站起来了，开了个小店。他喝多了说：当初你不签，我恨过你。现在想想，你签了才是害我。",
              choice: {
                A: { title: "敬他一杯", text: "都过去了。" },
                B: { title: "没说话", text: "有些委屈，说不清。" }
              }
            }
          ],
          regret: "父亲半年没叫过我名字"
        }
      }
    ]
  },

  {
    id: "q85",
    title: "四十岁，辞工去学一门手艺，还是业余学？",
    scene: "你在公司干了十七年，闭着眼都能做完。去年开始学木工，周末泡在工作室，做出来的东西有人愿意花钱买。师傅问你：要不要来干这个。工资是现在的三分之一。",
    options: [
      {
        key: "A",
        title: "辞了，从头学",
        gain: "你第一次觉得，一天的时间是自己的。",
        lose: "孩子的补习费，从这学期开始由妻子一个人出。",
        effects: { money: -8, health: 8, happy: 16, social: -6 },
        trigger: { unlock: "dream", regret: "那间退掉的办公室" },
        follow: {
          id: "q85-A",
          title: "成了学徒",
          beats: [
            {
              scene: "第一天上班，你三十九岁，是工作室里最老的学徒。手上的口子一个接一个，晚上疼得睡不着。",
              choice: {
                A: { title: "咬牙学", text: "自己选的路。" },
                B: { title: "偷偷后悔", text: "每月房贷还在那儿。" }
              }
            },
            {
              scene: "第三年，你做的第一张椅子卖了出去。买家是个年轻人，说这把椅子能传给他儿子。",
              choice: {
                A: { title: "觉得值", text: "这才叫活着。" },
                B: { title: "算了算账", text: "三年，还没补回原来的工资。" }
              }
            }
          ],
          regret: "那十七年坐在格子间的日子"
        }
      },
      {
        key: "B",
        title: "业余搞",
        gain: "工资照拿，手上也有了活儿。",
        lose: "周末永远不够用，做出来的东西永远差一口气。",
        effects: { money: 8, happy: 6, health: -6 },
        trigger: { unlock: "dream", regret: "那些没做完的椅子" },
        follow: {
          id: "q85-B",
          title: "周末的木工房",
          beats: [
            {
              scene: "你每周六去工作室，周日下午回家。订单推了三单，因为做不完。师傅说：你这样，永远是票友。",
              choice: {
                A: { title: "认了", text: "票友也是友。" },
                B: { title: "不甘心", text: "他说得对。" }
              }
            },
            {
              scene: "五十岁那年你退休，把工作室盘了下来。第一件事，是把十年前做了一半的那张桌子做完。",
              choice: {
                A: { title: "终于做完了", text: "晚了十年，也算做完了。" },
                B: { title: "手已经不行了", text: "眼睛花，手也抖。" }
              }
            }
          ],
          regret: "那三单推掉的活"
        }
      }
    ]
  }

]);

/* ===== data/pack-more3.js ===== */
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

/* ===== data/pack-more4.js ===== */
/* 如果当时 · 随机事件 + 连锁专属局 追加卷
 * 6 个随机事件（ev2.*）、3 个连锁局（chain-brother / chain-origin / chain-funeral）。
 * 三道新连锁的钥匙分别来自 q84（房本）、q82（身世）、q83（最后一面）。
 */

/* ===== 随机事件 ===== */
window.PACK_EVENTS = (window.PACK_EVENTS || []).concat([

  {
    id: "ev2.colleague",
    title: "老同事走了",
    scene: "四十六岁，心梗。前一天他还在群里发孩子的录取通知书。追悼会上，他工位上的绿萝被同事分了，一人一枝。",
    condition: { stat: "health", op: "lt", value: 75 },
    options: [
      { key: "A", title: "回去就体检", text: "别等出事才想起身体。", effects: { money: -6, health: 12, happy: -3 }, regret: "他工位上那盆绿萝" },
      { key: "B", title: "把该干的干完", text: "人各有命，活着的人还得过。", effects: { money: 6, health: -4, happy: -6 }, regret: "那句「改天聚」" }
    ]
  },

  {
    id: "ev2.teacher",
    title: "班主任打来电话",
    scene: "老师说孩子最近上课总走神，作业也交不齐。她顿了顿，说：家里是不是有什么事。你握着电话，一时不知道怎么答。",
    options: [
      { key: "A", title: "请假回去一趟", text: "先把孩子的事弄清楚。", effects: { money: -8, happy: 8, social: 4 }, regret: "那段没陪他的日子" },
      { key: "B", title: "让老师多管管", text: "我这边实在走不开。", effects: { money: 4, happy: -8, social: -4 }, regret: "老师那句「家里是不是有事」" }
    ]
  },

  {
    id: "ev2.letter",
    title: "一封旧信",
    scene: "整理旧物时翻出一封没寄出的信，是二十年前写给一个人的。信里写了很多当年不敢说的话。那个人，你现在还能联系上。",
    condition: { stat: "happy", op: "lt", value: 60 },
    options: [
      { key: "A", title: "寄出去", text: "迟了二十年，也算寄了。", effects: { happy: 10, social: 6 }, regret: "那二十年" },
      { key: "B", title: "烧了", text: "有些话，说完就轻了。", effects: { happy: -4, social: -2 }, regret: "那封没寄出的信" },
      { key: "C", title: "收起来", text: "留着，不为什么。", effects: { happy: 3 }, regret: "那个名字" }
    ]
  },

  {
    id: "ev2.neighbor",
    title: "楼上的独居老人",
    scene: "楼上那位老人三天没出门了。你敲门，没人应。物业说，他子女在国外，一年回来一次。",
    options: [
      { key: "A", title: "报警开门", text: "宁可多事一次。", effects: { money: -2, social: 12, happy: 6 }, regret: "那三天没人敲过的门" },
      { key: "B", title: "等等再说", text: "也许只是出门了。", effects: { social: -4, happy: -8 }, regret: "那句「等等再说」" }
    ]
  },

  {
    id: "ev2.recheck",
    title: "医院的复查提醒",
    scene: "手机响了一声，是医院的短信：您有一项检查结果需复诊。你盯着那条短信，想起上一次也是这样开头的。",
    condition: { stat: "health", op: "lt", value: 70 },
    options: [
      { key: "A", title: "马上挂号", text: "早一天知道，早一天准备。", effects: { money: -8, health: 10, happy: -6 }, regret: "等结果的走廊" },
      { key: "B", title: "先拖一拖", text: "忙完这阵子再说。", effects: { health: -6, happy: -4 }, regret: "那条没回的消息" }
    ]
  },

  {
    id: "ev2.transfer",
    title: "公司要搬去外地",
    scene: "总部要迁到另一个城市，愿意去的人保留岗位，不去的人按 N+1 走。孩子在这儿上小学，父母也在这儿。你只有一周时间答复。",
    options: [
      { key: "A", title: "跟着去", text: "工作要紧，家可以慢慢搬。", effects: { money: 14, social: -10, happy: -8 }, regret: "孩子转学那天" },
      { key: "B", title: "拿钱走人", text: "这年纪，重新找也不容易，但家在。", effects: { money: -10, social: 6, happy: 6 }, regret: "那份干了十几年的事" }
    ]
  }

]);

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = (window.PACK_CHAINS || []).concat([

  {
    id: "chain-brother",
    unlock: "brother",
    title: "房本上那个名字",
    scene: "很多年后，父亲走了。整理遗物时，你在他的抽屉最底层发现一份文件：那套房子的过户存根，签名是你的。你盯着那个名字，手一直没抖。",
    options: [
      { key: "A", title: "去找弟弟", text: "该说清楚的，说清楚。", effects: { money: 12, social: -6, happy: 4 }, regret: "那顿没吃完的饭" },
      { key: "B", title: "就当没看见", text: "父亲都走了，翻这些还有什么用。", effects: { money: -6, social: 4, happy: -8 }, regret: "父亲抽屉里那张存根" }
    ]
  },

  {
    id: "chain-origin",
    unlock: "origin",
    title: "县医院门口",
    scene: "你回了一趟老家，站在县医院门口。四十多年前的冬天，有人在这儿放下一个襁褓。现在这里改成了停车场，门口那棵树还在。",
    options: [
      { key: "A", title: "站一会儿", text: "不说话，就站着。", effects: { happy: 8, social: 2 }, regret: "那个冬天的早晨" },
      { key: "B", title: "去查当年的档案", text: "总得有个答案。", effects: { money: -6, social: 6, happy: -4 }, regret: "档案室里那些灰尘" }
    ]
  },

  {
    id: "chain-funeral",
    unlock: "funeral",
    title: "没去的那场",
    scene: "很多年后，你也到了他走的那个年纪。有天夜里你梦见那间病房，他坐在床边，还是年轻时候的样子，问你：你怎么才来。",
    options: [
      { key: "A", title: "醒着把话说完", text: "哪怕对着空气。", effects: { happy: 10 }, regret: "那三年谁都不肯先低头" },
      { key: "B", title: "第二天照常上班", text: "梦就是梦。", effects: { happy: -6, money: 3 }, regret: "梦里那句「你怎么才来」" }
    ]
  }

]);

/* ===== data/pack-more5.js ===== */
/* 如果当时 · 岔路题 追加卷五（婚恋）
 * 8 道（q96–q103），接在 pack-more3.js 之后。
 *
 * 选题原则：前 95 道里婚恋只有「为爱情放弃前途」「相亲还是等真爱」
 * 「嫁喜欢的还是合适的」「裸婚」这类"选谁"的题，缺的是"选完以后"——
 * 彩礼怎么谈、账怎么算、前任回头、离婚时那套房归谁。
 *
 * 新连锁钥匙：divorce（离婚）——来自 q101。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q96 彩礼 ══════════════ */

  {
    id: "q96",
    title: "彩礼差八万，这婚还结不结？",
    scene: "谈了三年，两家第一次坐到一张桌上。她妈说，村里现在都是十八万八。你爸把烟盒捏扁了，说家里能拿出十万八，再多得去借。她坐在你旁边，一直没抬头。",
    options: [
      {
        key: "A",
        title: "借八万，把婚结了",
        gain: "日子定在十月，她妈在亲戚面前抬得起头。",
        lose: "你爸把准备看腰的那笔钱拿了出来。",
        effects: { money: -6, social: 8, happy: 6 },
        trigger: { unlock: "debt", regret: "那八万块的来路" },
        follow: {
          id: "q96-A",
          title: "八万块，凑齐了",
          beats: [
            {
              scene: "钱是用红纸包着的，一沓一沓码在桌上。她妈数得很慢，数完抬头笑了一下，说这孩子实诚。你爸在旁边搓手，没说话。",
              choice: {
                A: { title: "这钱花得值", text: "人娶回来了。" },
                B: { title: "心里堵", text: "那沓钱里有他攒了十年的。" }
              }
            },
            {
              scene: "婚后第三年，她弟弟要结婚，她妈打来电话，说家里手头紧。她接完电话，看了你一眼，什么也没说。",
              choice: {
                A: { title: "能帮就帮", text: "一家人，账算不清。" },
                B: { title: "这回不能再借", text: "我们自己也还着账。" }
              }
            }
          ],
          regret: "父亲那条没去拍的片子"
        }
      },
      {
        key: "B",
        title: "谈不拢，就散了",
        gain: "账上留着那十万八，父亲的腰也去看了。",
        lose: "她结婚那年，你从同学的朋友圈里看见的。",
        effects: { money: 4, social: -8, happy: -8 },
        trigger: { unlock: "silence", regret: "她那天一直没抬的头" },
        follow: {
          id: "q96-B",
          title: "散了以后",
          beats: [
            {
              scene: "她后来发过一条消息，说那天在饭桌上她想说话，被她妈在桌底下按住了膝盖。你看了很久，回了一个「嗯」。",
              choice: {
                A: { title: "约她见一面", text: "把话问清楚。" },
                B: { title: "不回了", text: "问了又能怎么样。" }
              }
            },
            {
              scene: "三十二岁那年你相亲，对方问上一段为什么分的。你说，家里条件不合适。她点点头，说哦。",
              choice: {
                A: { title: "说实话", text: "就是彩礼没谈成。" },
                B: { title: "就这么说", text: "说多了像抱怨。" }
              }
            }
          ],
          regret: "那句一直没问出口的话"
        }
      }
    ]
  },

  /* ══════════════ q97 婚前财产公证 ══════════════ */

  {
    id: "q97",
    title: "婚前那套房，做不做公证？",
    scene: "房子是你爸妈掏空积蓄买的，写你的名，贷款还有十九年。她提了一句：要不做个婚前财产公证，免得以后说不清。她说得很有礼貌，像在说别人的事。",
    options: [
      {
        key: "A",
        title: "去做",
        gain: "白纸黑字，往后谁也不欠谁的。",
        lose: "她说「好」的时候，脸上的表情一点没变。",
        effects: { money: 4, social: -6, happy: -3 },
        follow: {
          id: "q97-A",
          title: "签字那天",
          beats: [
            {
              scene: "公证处在一栋老楼的三层，走廊里有一股复印机的味道。她签得比你快，笔一搁，说：这样挺好，省得以后吵。",
              choice: {
                A: { title: "是挺好", text: "丑话说前头。" },
                B: { title: "觉得生分", text: "还没结就先想散了怎么办。" }
              }
            },
            {
              scene: "婚后第六年你们吵得最凶那次，她没提房子。第二天她自己提起来：你看，那纸还是有点用的。",
              choice: {
                A: { title: "有点心酸", text: "有用，是因为我们真的想过散。" },
                B: { title: "松一口气", text: "至少不用为这个撕。" }
              }
            }
          ],
          regret: "公证处走廊里那句「省得以后吵」"
        }
      },
      {
        key: "B",
        title: "不做，提都别提",
        gain: "她说：我就随口一问。那晚你们吃了火锅。",
        lose: "你妈知道这事以后，一直记着这个人。",
        effects: { money: -2, social: 8, happy: 5 },
        follow: {
          id: "q97-B",
          title: "没做的那张纸",
          beats: [
            {
              scene: "你妈在厨房里问：她怎么想起说这个。你说她没别的意思。你妈把火关小，说：我没别的意思，我就是问问。",
              choice: {
                A: { title: "替她解释", text: "她家条件也不差，犯不上图这个。" },
                B: { title: "不解释", text: "越解释越像有事。" }
              }
            },
            {
              scene: "很多年后房子卖了换大的，房产证上加了她的名字。她拿着新本子看了半天，说：其实当年那句话，是我妈让我问的。",
              choice: {
                A: { title: "笑出来", text: "都过去了。" },
                B: { title: "愣一下", text: "原来那时候她也在替别人说话。" }
              }
            }
          ],
          regret: "母亲那句「我就是问问」"
        }
      }
    ]
  },

  /* ══════════════ q98 异地 ══════════════ */

  {
    id: "q98",
    title: "异地三年，谁迁就谁？",
    scene: "高铁四小时，一个月见一次。她的工作刚有起色，你的编制调不动。第七次在站台分开，她进站之后没回头，你站在原地看着那趟车开走。",
    options: [
      {
        key: "A",
        title: "你辞职过去",
        gain: "终于能在同一个城市醒来，晚上有人一起吃饭。",
        lose: "你在那边投了四个月简历，最后进了一家小公司。",
        effects: { money: -8, social: 9, happy: 7 },
        follow: {
          id: "q98-A",
          title: "搬过去以后",
          beats: [
            {
              scene: "新公司二十几个人，做的东西你不太看得上。工资比原来少四成，但你六点能下班，能去地铁口接她。",
              choice: {
                A: { title: "值", text: "日子是给自己过的。" },
                B: { title: "偶尔后悔", text: "同学群里还在聊项目，你插不上话。" }
              }
            },
            {
              scene: "第二年她升了职，出差变多。有天你一个人吃了饭，洗了碗，忽然想起当年在站台上那个背影。",
              choice: {
                A: { title: "跟她说说", text: "不是抱怨，就是想说。" },
                B: { title: "自己消化", text: "她也累。" }
              }
            }
          ],
          regret: "那份干了六年的事"
        }
      },
      {
        key: "B",
        title: "让她过来",
        gain: "你不用动，房子、圈子、父母都在原地。",
        lose: "她来了，辞了那份刚有起色的工作，在家待了半年。",
        effects: { money: 5, social: -5, happy: -5 },
        follow: {
          id: "q98-B",
          title: "她搬来了",
          beats: [
            {
              scene: "她来了以后先在超市做了两个月，后来考了个证。有次她翻手机相册，停在前公司的年会上，划得很快。",
              choice: {
                A: { title: "问她后不后悔", text: "总得问一次。" },
                B: { title: "不问", text: "问了，她说不后悔，你也不信。" }
              }
            },
            {
              scene: "后来每次吵架，她都不提这件事。你反而更难受——她连提都不愿意提。",
              choice: {
                A: { title: "主动说开", text: "你要真觉得亏，就说出来。" },
                B: { title: "就这样", text: "有些账不提，才不会越算越多。" }
              }
            }
          ],
          regret: "她相册里那场年会"
        }
      }
    ]
  },

  /* ══════════════ q99 前任 ══════════════ */

  {
    id: "q99",
    title: "凌晨一点，前任发来一句「在吗」",
    scene: "分手六年，她结婚又离了。手机在床头亮了一下，就三个字。隔壁房间你妻子在给孩子冲奶粉，勺子碰在杯子上的声音，一下，一下。",
    options: [
      {
        key: "A",
        title: "回",
        gain: "那晚聊到四点，好像六年什么都没变。",
        lose: "第二天你看见她朋友圈那张全家福，觉得自己很脏。",
        effects: { money: -3, social: -9, happy: 6 },
        trigger: { unlock: "silence", regret: "凌晨四点那句「早点睡」" },
        follow: {
          id: "q99-A",
          title: "聊到四点",
          beats: [
            {
              scene: "她说这些年过得不好，说有时候会想起你。你打字打了删，删了打，最后发出去的是：你保重。她回了个笑脸。",
              choice: {
                A: { title: "删掉记录", text: "就当没发生。" },
                B: { title: "留着", text: "留着，也不看。" }
              }
            },
            {
              scene: "一个月后她又发来一次，说想见一面。你妻子那天正好带孩子回娘家。",
              choice: {
                A: { title: "不见", text: "到这儿就够了。" },
                B: { title: "见", text: "就见一面。" }
              }
            }
          ],
          regret: "那晚没关掉的手机"
        }
      },
      {
        key: "B",
        title: "删了，拉黑",
        gain: "第二天照常起床，什么都没发生。",
        lose: "你到现在都想知道，她那天到底想说什么。",
        effects: { money: 2, social: 5, happy: -4 },
        follow: {
          id: "q99-B",
          title: "没有回的那个「在吗」",
          beats: [
            {
              scene: "你把那条消息删了，顺手拉黑。做完这些你去给孩子冲了奶，水温试了两次，太烫。",
              choice: {
                A: { title: "踏实", text: "守住该守的。" },
                B: { title: "空了一下", text: "六年，就这么删了。" }
              }
            },
            {
              scene: "又过了两年，同学群里有人说她去了南方，做点小生意。你看了那条消息，把群设置成了免打扰。",
              choice: {
                A: { title: "祝她好", text: "各过各的。" },
                B: { title: "偶尔会想", text: "如果那天回了。" }
              }
            }
          ],
          regret: "那个没回的「在吗」"
        }
      }
    ]
  },

  /* ══════════════ q100 婚后 AA ══════════════ */

  {
    id: "q100",
    title: "结婚以后，钱各管各的行不行？",
    scene: "房贷一人一半，水电轮流交。她买的菜她不记，你买的奶粉你记。有天她翻着记账本问：上个月那笔三千，是什么。你说：修车。她说：哦。",
    options: [
      {
        key: "A",
        title: "继续 AA",
        gain: "两个人从没为钱红过脸，谁也不欠谁。",
        lose: "你妈住院那次，你转了两万，一直没告诉她。",
        effects: { money: 8, social: -7, happy: -4 },
        follow: {
          id: "q100-A",
          title: "各管各的",
          beats: [
            {
              scene: "那年你妈住院，你在医院走廊里转账，签字的笔是跟护士借的。回来她问你去哪了，你说加班。",
              choice: {
                A: { title: "告诉她自己垫了钱", text: "夫妻之间也不该瞒。" },
                B: { title: "还是不说", text: "说了，她大概会问那笔钱算谁的。" }
              }
            },
            {
              scene: "后来她怀孕辞了职，收入断了。她坐在床边算了一下，说：那这几个月我的那份怎么办。",
              choice: {
                A: { title: "这几个月我全出", text: "这时候还算什么。" },
                B: { title: "从共同账户里出", text: "规矩就是规矩。" }
              }
            }
          ],
          regret: "医院走廊里那支借来的笔"
        }
      },
      {
        key: "B",
        title: "合成一个账户",
        gain: "以后不用问那三千是什么了。",
        lose: "你也没法再偷偷给家里转钱了。",
        effects: { money: -3, social: 9, happy: 6 },
        follow: {
          id: "q100-B",
          title: "一个账户",
          beats: [
            {
              scene: "合账的第一个月，两个人坐在一起对了一遍支出。她说：你每个月给家里一千五，我知道，不用瞒。你愣了一下，说：我以为你不高兴。",
              choice: {
                A: { title: "早该这样", text: "省了多少猜。" },
                B: { title: "有点不习惯", text: "什么都摊开了，反而不自在。" }
              }
            },
            {
              scene: "第三年她想给她妈买个按摩椅，八千。她先问了你，你说买。她笑了一下，说：以前我得自己攒三个月。",
              choice: {
                A: { title: "心里暖", text: "这就是过日子的意思。" },
                B: { title: "想到那几年", text: "她一个人攒了多久。" }
              }
            }
          ],
          regret: "那本记了七年的账本"
        }
      }
    ]
  },

  /* ══════════════ q101 离婚 · 那套房 ══════════════ */

  {
    id: "q101",
    title: "离了，房子归谁？",
    scene: "首付她家出了三十万，贷款你还了七年。中介说现在能卖四百万。孩子八岁，判给谁还没定。她坐在沙发那头说：我不要钱，我要孩子。",
    options: [
      {
        key: "A",
        title: "房子给她，换抚养权",
        gain: "孩子跟你，户口不用迁，学校不用转。",
        lose: "你搬进一间一千八的出租屋，房产证上没你的名字了。",
        effects: { money: -12, social: 2, happy: 7 },
        trigger: { unlock: "divorce", regret: "那套住了七年的房子" },
        follow: {
          id: "q101-A",
          title: "搬出去那天",
          beats: [
            {
              scene: "搬家公司下午来。孩子上学去了，走之前问你：爸爸你晚上回来吗。你说回。他说哦，然后背上书包走了。",
              choice: {
                A: { title: "每周都来接他", text: "说好的就不能断。" },
                B: { title: "先安顿好自己", text: "总得先有个地方住。" }
              }
            },
            {
              scene: "出租屋在一栋老楼的六层，没有电梯。第一晚你把行李箱打开又合上，什么都没拿出来。",
              choice: {
                A: { title: "认了", text: "换孩子，值。" },
                B: { title: "半夜发了条朋友圈又删了", text: "不知道该给谁看。" }
              }
            }
          ],
          regret: "孩子那句「你晚上回来吗」"
        }
      },
      {
        key: "B",
        title: "按份分，孩子的事慢慢谈",
        gain: "你拿回一百八十万，在城东付了个小两居的首付。",
        lose: "孩子跟了她。你在家长群里，已经不是那个能去开家长会的人。",
        effects: { money: 10, social: -9, happy: -9 },
        trigger: { unlock: "divorce", regret: "家长群里那个被移出的名字" },
        follow: {
          id: "q101-B",
          title: "按份分完",
          beats: [
            {
              scene: "过户那天在中介的办公室，两家人各坐一排。她爸把文件推过来，说：签吧。你签了，笔尖把纸划破了一点。",
              choice: {
                A: { title: "松口气", text: "钱到手，事情算完了。" },
                B: { title: "手抖", text: "签完这一下，就真的没了。" }
              }
            },
            {
              scene: "孩子每周末来你这边住。他在新房子客厅里转了一圈，说：爸爸你家好小。你说：是小。他说：挺好的，离学校近。",
              choice: {
                A: { title: "笑一下", text: "他懂事得让人难受。" },
                B: { title: "别过头", text: "不敢让他看见。" }
              }
            }
          ],
          regret: "中介办公室里划破的那张纸"
        }
      }
    ]
  },

  /* ══════════════ q102 二婚带孩子 ══════════════ */

  {
    id: "q102",
    title: "她带着一个六岁的孩子，你还娶吗？",
    scene: "三十六岁，相亲认识的。人很实在，说话不绕弯。第三次见面她才开口：我有个女儿，六岁，前夫不给抚养费。说完她就低头搅咖啡，勺子碰着杯壁，一圈一圈。",
    options: [
      {
        key: "A",
        title: "娶",
        gain: "家里有小孩的声音了，过年不再只有你和电视。",
        lose: "开家长会的时候，老师介绍你是「孩子的叔叔」。",
        effects: { money: -7, social: 9, happy: 8 },
        trigger: { unlock: "family", regret: "那句「叔叔」" },
        follow: {
          id: "q102-A",
          title: "组起来的家",
          beats: [
            {
              scene: "孩子一开始不叫你。有一次她发烧，你半夜抱着她下楼打车，她烧得迷糊，抓住你的衣领叫了一声爸爸，第二天又不叫了。",
              choice: {
                A: { title: "慢慢来", text: "总会有一天。" },
                B: { title: "心里酸", text: "那一声，可能是烧糊涂了。" }
              }
            },
            {
              scene: "她前夫有一年来要孩子，在楼下吵了半小时。孩子躲在门后，你站在门口，不知道该以什么身份说话。",
              choice: {
                A: { title: "站出来", text: "孩子现在住这儿。" },
                B: { title: "让她去谈", text: "这是他们之间的事。" }
              }
            }
          ],
          regret: "那声只在发烧时叫过的爸爸"
        }
      },
      {
        key: "B",
        title: "算了",
        gain: "你还是一个人，日子简单，账也清楚。",
        lose: "她第二年再婚了，你去喝过一次满月酒，随了三百。",
        effects: { money: 3, social: -6, happy: -7 },
        follow: {
          id: "q102-B",
          title: "没开始的那一段",
          beats: [
            {
              scene: "你们还偶尔发消息，都是过年过节。有一年她发了张照片，孩子在台上跳舞，她站在旁边。你放大看了一会儿，退出来。",
              choice: {
                A: { title: "回个祝福", text: "你好就行。" },
                B: { title: "没回", text: "回了也不知道说什么。" }
              }
            },
            {
              scene: "四十岁那年你妈问你，是不是还想着那一个。你说没有。她说：那你为什么每次相亲都拿人家比。",
              choice: {
                A: { title: "承认", text: "是比了。" },
                B: { title: "不承认", text: "就是没遇上合适的。" }
              }
            }
          ],
          regret: "那张放大了看的照片"
        }
      }
    ]
  },

  /* ══════════════ q103 催婚的春节（多选限选 1） ══════════════ */

  {
    id: "q103",
    title: "年夜饭桌上，你只能回一句话",
    scene: "三姑问完二姨问，最后你妈把汤端上来，说：我也不催你，你自己心里有数。满桌的筷子都停了。",
    type: "multi",
    pickCount: 1,
    items: [
      { key: "nextyear", name: "「明年一定」", tag: "敷衍", desc: "桌上安静了三秒，然后有人夹菜", effects: { happy: -4, social: 5 } },
      { key: "fine", name: "「我过得挺好的」", tag: "自我", desc: "你妈把刚拿起的筷子放下了", effects: { happy: 8, social: -5 } },
      { key: "stop", name: "「你们别管了」", tag: "边界", desc: "碗里的饭还剩一半，你没吃完", effects: { happy: 6, social: -9 } },
      { key: "none", name: "「遇不到合适的」", tag: "实话", desc: "亲戚们互相看了一眼，没人接话", effects: { happy: -2, social: 3 } },
      { key: "study", name: "「我还想再读个书」", tag: "拖延", desc: "你爸笑了一声，说读吧读吧", effects: { money: -3, happy: 5 } },
      { key: "lie", name: "「有人了，过完年带回来」", tag: "谎话", desc: "初五你就走了", effects: { social: 7, happy: -7 } },
      { key: "dish", name: "「先吃菜，这个鱼凉了」", tag: "回避", desc: "你把整桌的话题夹给了那盘鱼", effects: { happy: 2, social: -2 } }
    ],
    follow: {
      id: "q103",
      title: "话说出去了",
      beats: [
        {
          scene: "那句话之后，桌上又热闹起来，说的是别人的事。你低头喝汤，汤有点咸。",
          choice: {
            A: { title: "吃完就走", text: "借口赶车。" },
            B: { title: "陪他们打完这圈牌", text: "一年也就这一回。" }
          }
        },
        {
          scene: "回城的车上，你妈发来一条语音，六十秒，说了一半卡住了，又发一条，只有五个字：妈不是催你。",
          choice: {
            A: { title: "回：我知道", text: "三个字，够了。" },
            B: { title: "打字说了一堆", text: "想把话说清楚。" }
          }
        }
      ],
      regret: "那碗没喝完的汤"
    }
  }

]);

/* ===== data/pack-more6.js ===== */
/* 如果当时 · 岔路题 追加卷六（朋友与人情）
 * 6 道（q104–q109），接在 pack-more5.js 之后。
 *
 * 前 95 道里"朋友"只有三道：借钱不还、拉你入伙、要不要说那个残酷真相。
 * 缺的是日常那一层——随礼、担保、伴郎、翻脸以后怎么见面。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q104 随礼 ══════════════ */

  {
    id: "q104",
    title: "同事结婚，随多少？",
    scene: "同一个部门，平时一起抽烟吃饭，不算深交。群里已经在接龙，别人都随八百。你卡里还剩三千二，房贷二十号扣。",
    options: [
      {
        key: "A",
        title: "随八百，人也去",
        gain: "酒席上和部门的人坐一桌，关系近了一层。",
        lose: "那个月的花呗，你分了六期。",
        effects: { money: -5, social: 8, happy: 2 },
        follow: {
          id: "q104-A",
          title: "那场酒席",
          beats: [
            {
              scene: "台上在放新人的成长视频，你坐在第七桌，和部门的人碰了三次杯。散场的时候有人拍你肩膀，说以后有事招呼。",
              choice: {
                A: { title: "这钱没白花", text: "人情就是这样攒的。" },
                B: { title: "有点荒诞", text: "八百块买了一句「有事招呼」。" }
              }
            },
            {
              scene: "半年后你家里出事，需要人搭把手。你在群里发了一句，第一个回你的是那天拍你肩膀的人。",
              choice: {
                A: { title: "值了", text: "人还是得走动。" },
                B: { title: "想多了", text: "他只是礼貌。" }
              }
            }
          ],
          regret: "那个分了六期的账单"
        }
      },
      {
        key: "B",
        title: "随两百，人不去",
        gain: "账上留了点余地，那个月没借钱。",
        lose: "第二天上班，茶水间里那几句话，你听见了。",
        effects: { money: -1, social: -8, happy: -3 },
        follow: {
          id: "q104-B",
          title: "两百块",
          beats: [
            {
              scene: "红包是通过微信转的，他回了个「谢谢哥」。你看见群里那张合影，第七桌坐得满满当当，你那个位置被另一个部门的人补上了。",
              choice: {
                A: { title: "不在意", text: "本来也不熟。" },
                B: { title: "有点失落", text: "原来我在这个位置上，是可以被补上的。" }
              }
            },
            {
              scene: "后来部门有什么好事，都是先在饭桌上说的。你总是最后一个知道。",
              choice: {
                A: { title: "下次随够", text: "学到了。" },
                B: { title: "就这样", text: "少几个饭局，也省心。" }
              }
            }
          ],
          regret: "那张合影里被补上的位置"
        }
      }
    ]
  },

  /* ══════════════ q105 合伙 ══════════════ */

  {
    id: "q105",
    title: "合伙开的店赚钱了，怎么分？",
    scene: "你出七成，他出三成，但店是他天天守着。第一年流水好起来，净赚四十万。他提了一句：要不五五分吧，我这一年没歇过一天。",
    options: [
      {
        key: "A",
        title: "按出资分，一分不让",
        gain: "二十八万到账，账目干干净净。",
        lose: "他第二个月就不来店里了，说身体不好。",
        effects: { money: 12, social: -11, happy: -4 },
        follow: {
          id: "q105-A",
          title: "账算清了",
          beats: [
            {
              scene: "你按股份给他分了十二万。他数完，说行，然后把店钥匙放在桌上，说这段时间辛苦了。钥匙上还挂着你送他的那个挂坠。",
              choice: {
                A: { title: "按规矩来没错", text: "当初说好的。" },
                B: { title: "想留他", text: "钱可以再谈。" }
              }
            },
            {
              scene: "店你雇了两个人看着，流水掉了一半。你坐在柜台后面，才发现他以前每天六点去市场挑货这件事，值多少钱。",
              choice: {
                A: { title: "打电话给他", text: "涨点，回来吧。" },
                B: { title: "自己扛", text: "求人的话，说不出口。" }
              }
            }
          ],
          regret: "那串放在桌上的钥匙"
        }
      },
      {
        key: "B",
        title: "改成五五",
        gain: "他还是每天六点到店，第二年开了第二家。",
        lose: "你算过，这一年你少拿了八万。",
        effects: { money: 6, social: 10, happy: 6 },
        follow: {
          id: "q105-B",
          title: "五五分",
          beats: [
            {
              scene: "你把协议改了，他愣了一下，说不用不用。你说就这么定。第二天他来得更早了，还带了两笼包子。",
              choice: {
                A: { title: "这八万值", text: "人比钱难找。" },
                B: { title: "心里有数", text: "这一年他值这个价。" }
              }
            },
            {
              scene: "第三年有人出价想收购。他问你怎么办，你说听你的。他说：那我跟着你干。",
              choice: {
                A: { title: "卖了分钱", text: "各拿一笔，都轻松。" },
                B: { title: "不卖，接着做", text: "这店不是钱的事。" }
              }
            }
          ],
          regret: "那份改过的协议"
        }
      }
    ]
  },

  /* ══════════════ q106 担保 ══════════════ */

  {
    id: "q106",
    title: "表哥贷款，让你做担保人",
    scene: "他要贷六十万接个工程，银行说必须有担保。他把材料摊在你家茶几上，一笔一笔给你讲回款周期。你姑在电话里说：都是一家人。",
    options: [
      {
        key: "A",
        title: "签",
        gain: "钱下来了，工程开了工，全家都念你的好。",
        lose: "半年后他电话打不通了，银行打到了你这里。",
        effects: { money: -9, social: 9, happy: -6 },
        trigger: { unlock: "debt", regret: "签字那天他递过来的那支笔" },
        follow: {
          id: "q106-A",
          title: "签了以后",
          beats: [
            {
              scene: "第一笔还款是按时到的。他在家族群里发了张工地的照片，说多亏了弟弟。你姑在群里连发了三个鼓掌。",
              choice: {
                A: { title: "踏实了", text: "他没让人失望。" },
                B: { title: "还是提着心", text: "担保这两个字，压在纸上也压在心上。" }
              }
            },
            {
              scene: "第五个月，还款晚了两周。他解释说甲方拖了款，你信了。第七个月，银行的电话打到了你手机上。",
              choice: {
                A: { title: "替他还上", text: "征信不能坏。" },
                B: { title: "先找他要说法", text: "这事得当面说。" }
              }
            }
          ],
          regret: "那张摊在茶几上的贷款合同"
        }
      },
      {
        key: "B",
        title: "不签",
        gain: "你什么都没欠，晚上睡得着。",
        lose: "过年回老家，你姑没给你夹菜。",
        effects: { money: 2, social: -10, happy: 3 },
        follow: {
          id: "q106-B",
          title: "没签的那个名字",
          beats: [
            {
              scene: "你说担保这事我做不了，别的能帮就帮。他收材料的动作慢了下来，一张一张叠好，说：行，我理解。走的时候鞋都没换好。",
              choice: {
                A: { title: "追出去给他两万", text: "担保不做，钱可以借。" },
                B: { title: "没追", text: "一追，这事就说不清了。" }
              }
            },
            {
              scene: "两年后听说他那个工程款没结回来，欠了一屁股。你姑在电话里说：当初幸亏你没签。语气很平静。",
              choice: {
                A: { title: "松一口气", text: "躲过一劫。" },
                B: { title: "高兴不起来", text: "那两年他一个人扛的。" }
              }
            }
          ],
          regret: "他叠材料时那双慢下来的手"
        }
      }
    ]
  },

  /* ══════════════ q107 伴郎 ══════════════ */

  {
    id: "q107",
    title: "他结婚，请你当伴郎",
    scene: "从初中认识到现在，二十年。他婚礼在你最忙的那个月，那天正好要出差。他在电话里说：就你一个，别人我都没叫。",
    options: [
      {
        key: "A",
        title: "推掉出差，去",
        gain: "婚礼上他喝多了，抱着你说这辈子值了。",
        lose: "那趟差是跟了大半年的项目，回来以后换人跟了。",
        effects: { money: -4, social: 10, happy: 8 },
        follow: {
          id: "q107-A",
          title: "当伴郎那天",
          beats: [
            {
              scene: "早上五点起来贴喜字，堵门，找鞋，替他挡了七杯酒。散场时他坐在台阶上，领带歪着，说：今天要是没你，我不知道怎么弄。",
              choice: {
                A: { title: "拍他肩膀", text: "废话少说。" },
                B: { title: "眼睛有点酸", text: "二十年了。" }
              }
            },
            {
              scene: "回公司以后，那个项目换了人，你被安排去做另一个。领导说：下次吧。语气很客气。",
              choice: {
                A: { title: "不后悔", text: "婚礼就一次。" },
                B: { title: "有点憋", text: "那半年我熬了多少夜。" }
              }
            }
          ],
          regret: "那趟没去的差"
        }
      },
      {
        key: "B",
        title: "不去，礼到了",
        gain: "项目拿下来了，年底多了一笔奖金。",
        lose: "他婚礼合影里，伴郎那个位置站着他的表弟。",
        effects: { money: 6, social: -9, happy: -6 },
        trigger: { unlock: "silence", regret: "合影里站着你位置的那个人" },
        follow: {
          id: "q107-B",
          title: "礼到了，人没到",
          beats: [
            {
              scene: "你转了两千，附了一句「百年好合」。他回：谢谢兄弟，理解。婚礼当天你在酒店房间里改方案，手机响了一晚上，都是群里的照片。",
              choice: {
                A: { title: "划过去不看", text: "看了心里不舒服。" },
                B: { title: "一张一张看完", text: "看看也好。" }
              }
            },
            {
              scene: "后来你们还是朋友，只是从每周一通电话，变成了过年一条。有一年他孩子满月，你是从别人那儿知道的。",
              choice: {
                A: { title: "主动约他", text: "把这条线接上。" },
                B: { title: "算了", text: "大家都忙。" }
              }
            }
          ],
          regret: "那晚手机里响了一夜的照片"
        }
      }
    ]
  },

  /* ══════════════ q108 老朋友来投奔 ══════════════ */

  {
    id: "q108",
    title: "你混出来了，老朋友来投奔",
    scene: "他在老家厂子倒了，四十岁，带着老婆孩子来你这个城市。电话里他说：不麻烦你，就是想让你指点指点。你知道「指点指点」是什么意思。",
    options: [
      {
        key: "A",
        title: "接进来，安排进自己公司",
        gain: "他有了活干，你也算还了当年他借你住的那半年。",
        lose: "他干不了这行，手下人开始有意见。",
        effects: { money: -4, social: 8, happy: 5 },
        follow: {
          id: "q108-A",
          title: "安排进来以后",
          beats: [
            {
              scene: "他在仓库做管理，每天来得比谁都早。但他不会用系统，出了两次错，主管来找你，话说得很委婉。",
              choice: {
                A: { title: "私下教他", text: "给他点时间。" },
                B: { title: "调到更简单的岗", text: "对谁都好。" }
              }
            },
            {
              scene: "半年后他自己提出来要走，说别为难你。走那天他把仓库的钥匙擦干净放在桌上，说：当年你住我那半年，我可没擦过桌子。",
              choice: {
                A: { title: "留他吃饭", text: "这跟那不一样。" },
                B: { title: "没留", text: "留了，反倒像施舍。" }
              }
            }
          ],
          regret: "他擦干净的那把仓库钥匙"
        }
      },
      {
        key: "B",
        title: "请他吃顿饭，帮他找别处",
        gain: "公司里没人说闲话，规矩没破。",
        lose: "饭桌上他一直笑，笑得你不敢看他的眼睛。",
        effects: { money: -2, social: -5, happy: -5 },
        follow: {
          id: "q108-B",
          title: "那顿饭",
          beats: [
            {
              scene: "你给他介绍了两个去处，都留了电话。他一笔一笔记在手机备忘录上，记得很认真。走的时候他说：已经够意思了。",
              choice: {
                A: { title: "心里不好受", text: "够意思这三个字，隔了一层。" },
                B: { title: "这样最好", text: "帮忙不揽事，才是长久之道。" }
              }
            },
            {
              scene: "他后来去做了保安，一直干到现在。有一年春节他给你发消息，说这份工作挺好，不用操心。",
              choice: {
                A: { title: "回一句真心的", text: "挺好就好。" },
                B: { title: "不知道说什么", text: "打字又删掉。" }
              }
            }
          ],
          regret: "他记在手机备忘录上的那两个电话"
        }
      }
    ]
  },

  /* ══════════════ q109 朋友抑郁 ══════════════ */

  {
    id: "q109",
    title: "最好的朋友不太对劲，你说不说破？",
    scene: "他半年没发过朋友圈，约了两次都说累。上周末你去找他，屋里没开灯，窗帘拉着，外卖盒摞在门口。他笑着说：就是最近有点困。",
    options: [
      {
        key: "A",
        title: "说破，硬把他拽出去",
        gain: "他去了医院，诊断书上是中度抑郁。",
        lose: "他有三个月没理你，说你把他当病人。",
        effects: { money: -3, social: 4, happy: 3 },
        trigger: { unlock: "health", regret: "那张诊断书上的日期" },
        follow: {
          id: "q109-A",
          title: "那句话",
          beats: [
            {
              scene: "你说：你不是困，你是病了。他先是笑，然后脸就垮了，说你别管我。第二天你还是把他拖去了医院。他坐在候诊区，一直低头看地砖。",
              choice: {
                A: { title: "陪着", text: "不说话，坐着就行。" },
                B: { title: "给他讲道理", text: "总得让他知道能好。" }
              }
            },
            {
              scene: "三个月后他忽然发消息：那天谢谢你。就四个字。你盯着屏幕，半天没回。",
              choice: {
                A: { title: "回：废话", text: "像以前那样。" },
                B: { title: "回一段长的", text: "把这三个月憋的话都写上。" }
              }
            }
          ],
          regret: "候诊区里他一直看着的那块地砖"
        }
      },
      {
        key: "B",
        title: "不说破，多陪陪他",
        gain: "他还是那个能开玩笑的朋友，你们照常吃饭。",
        lose: "那年冬天他的电话，打不通了。",
        effects: { money: -2, social: 2, happy: -9 },
        trigger: { unlock: "health", regret: "那句「就是最近有点困」" },
        follow: {
          id: "q109-B",
          title: "照常吃饭",
          beats: [
            {
              scene: "你们还是每周吃一次饭，他吃得很少。你几次想说点什么，他先把话题岔开了，你就顺着岔开了。",
              choice: {
                A: { title: "再等等", text: "等他自己愿意说。" },
                B: { title: "下次一定说", text: "不能再拖了。" }
              }
            },
            {
              scene: "那年冬天你打他电话，关机。你去了他家，门是从里面反锁的。",
              choice: {
                A: { title: "砸门", text: "快点。" },
                B: { title: "先报警", text: "别耽误时间。" }
              }
            }
          ],
          regret: "那些岔开话题的饭"
        }
      }
    ]
  }

]);

/* ===== data/pack-more7.js ===== */
/* 如果当时 · 岔路题 追加卷七（学业 · 照护）
 * 9 道（q110–q118），接在 pack-more6.js 之后。
 *
 * 学业：前 95 道写的是"孩子的成绩"，缺的是"自己的学业"——
 *       填志愿、考研二战、留学回不回、导师要挂一作。
 * 照护：整块空白。人老了以后那几年怎么过，题库里只有"送不送养老院"一道。
 *
 * 新连锁钥匙：care（照护）——来自 q115。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q110 填志愿 ══════════════ */

  {
    id: "q110",
    title: "填志愿：家里的，还是自己的？",
    scene: "分数出来了，够得着。你爸已经把招生简章翻烂了，报了三个师范、两个医科，说这些稳当。你想学的是那个不好找工作的专业，名字念出来，全家人都不说话。",
    options: [
      {
        key: "A",
        title: "填自己想的",
        gain: "大学四年，你每天都是自己想醒的。",
        lose: "毕业那年投了两百份简历，回音三个。",
        effects: { money: -6, social: -4, happy: 11 },
        trigger: { unlock: "dream", regret: "父亲翻烂的那本招生简章" },
        follow: {
          id: "q110-A",
          title: "自己填的那个",
          beats: [
            {
              scene: "录取通知书到的那天，你爸看了很久，说这个专业以后干什么。你说不知道。他把通知书放回信封里，说：那就读吧。",
              choice: {
                A: { title: "一定做出个样子", text: "证明给他看。" },
                B: { title: "心里发慌", text: "他问的那句，我也答不上来。" }
              }
            },
            {
              scene: "毕业那年，同学里一半转了行。你在一个小公司做助理，工资四千二。有次加班到夜里，你想起当年那个信封。",
              choice: {
                A: { title: "不后悔", text: "至少这四年是真的。" },
                B: { title: "动摇过", text: "如果当初选了师范。" }
              }
            }
          ],
          regret: "那句「这个专业以后干什么」"
        }
      },
      {
        key: "B",
        title: "听家里的",
        gain: "毕业就考上了编制，二十几岁就端稳了碗。",
        lose: "上课的时候你常常走神，看着窗外想那另一个专业。",
        effects: { money: 8, social: 7, happy: -8 },
        trigger: { unlock: "dream", regret: "那个没填的专业" },
        follow: {
          id: "q110-B",
          title: "稳当的那条路",
          beats: [
            {
              scene: "第一次站上讲台，你手心出汗。学生喊起立的时候，你忽然觉得这件事好像也不坏。",
              choice: {
                A: { title: "好好干", text: "既然选了，就做出个样子。" },
                B: { title: "还是想那个专业", text: "夜里会翻那几年的论坛。" }
              }
            },
            {
              scene: "工作第八年，你带的学生里有一个非要报那个专业，家里不同意。他来找你，问你该怎么办。",
              choice: {
                A: { title: "让他试试", text: "别像老师一样。" },
                B: { title: "劝他听家里的", text: "我走过的路，我知道。" }
              }
            }
          ],
          regret: "讲台上第一次走神的那几分钟"
        }
      }
    ]
  },

  /* ══════════════ q111 考研二战 ══════════════ */

  {
    id: "q111",
    title: "差三分，还考不考第二年？",
    scene: "分数出来，差三分。你已经二十四了，同学有的上班有的读研。家里说要不先工作吧，你自己攒的那点钱，够撑一年。",
    options: [
      {
        key: "A",
        title: "再考一年",
        gain: "第二年你考了专业第四，导师主动打了电话。",
        lose: "那一年你住在城中村，冬天的水管冻过两次。",
        effects: { money: -10, social: -5, happy: 9 },
        trigger: { unlock: "dream", regret: "城中村那个没有暖气的冬天" },
        follow: {
          id: "q111-A",
          title: "那一年",
          beats: [
            {
              scene: "每天早上六点半到自习室，占第三个位置。管理员后来认识你了，会给你留一盏灯。",
              choice: {
                A: { title: "习惯了", text: "日子简单得很。" },
                B: { title: "熬不住过", text: "有几次坐在楼梯上哭。" }
              }
            },
            {
              scene: "复试那天导师问你：这一年最难的是什么。你说：不知道明年这个时候，我是不是又要来一次。他笑了一下。",
              choice: {
                A: { title: "如实说", text: "怕，但还是要来。" },
                B: { title: "说点漂亮的", text: "说坚持就是胜利。" }
              }
            }
          ],
          regret: "自习室里那盏留了三百天的灯"
        }
      },
      {
        key: "B",
        title: "先工作",
        gain: "第一份工资四千八，你给家里寄了一千。",
        lose: "每年十二月，你还是会去看一眼考点门口的人。",
        effects: { money: 7, social: 6, happy: -5 },
        follow: {
          id: "q111-B",
          title: "先上班",
          beats: [
            {
              scene: "入职第三个月你就上手了，领导说你学得快。你把考研的书收进纸箱，塞在床底，没有封口。",
              choice: {
                A: { title: "过几年再考", text: "书还在。" },
                B: { title: "就这样了", text: "人总得往前走。" }
              }
            },
            {
              scene: "二十七岁那年你升了主管。有个新来的实习生说要辞职去考研，问你意见。你想了很久。",
              choice: {
                A: { title: "让他去", text: "年轻，试得起。" },
                B: { title: "劝他留下", text: "这条路我也走过，我知道后面是什么。" }
              }
            }
          ],
          regret: "床底那个没封口的纸箱"
        }
      }
    ]
  },

  /* ══════════════ q112 留学之后 ══════════════ */

  {
    id: "q112",
    title: "读完书，回国还是留下？",
    scene: "三年读完，导师愿意给你一个位置，薪水不高但稳定。国内那家公司也在催你答复，给的职级不低。你妈在视频里说：那边冷不冷，棉被够不够。",
    options: [
      {
        key: "A",
        title: "回国",
        gain: "落地那天你妈在出口举着牌子，牌子上写错了你的名字。",
        lose: "第一年你发现，那边学的东西在这儿要重新学一遍。",
        effects: { money: 5, social: 10, happy: 6 },
        trigger: { unlock: "hometown", regret: "机场出口那块写错名字的牌子" },
        follow: {
          id: "q112-A",
          title: "回来以后",
          beats: [
            {
              scene: "公司的做派和你想的不一样。开会的时候没人反驳，散会以后才互相说。你提了两次意见，第三次就不提了。",
              choice: {
                A: { title: "慢慢适应", text: "哪儿都得学。" },
                B: { title: "还是照自己的来", text: "改不了。" }
              }
            },
            {
              scene: "第二年有个项目，正好用得上你在外面学的那套。你做完以后，老板在全员会上说这是今年最像样的一件事。",
              choice: {
                A: { title: "值了", text: "回来是对的。" },
                B: { title: "想到那边", text: "如果留下，现在在做什么。" }
              }
            }
          ],
          regret: "那块写错名字的接机牌"
        }
      },
      {
        key: "B",
        title: "留下",
        gain: "签证续上了，实验室里那台仪器只有你会用。",
        lose: "你妈学会了用视频，但每次挂断前都要问一句：什么时候回来。",
        effects: { money: 11, social: -8, happy: 3 },
        trigger: { unlock: "roots", regret: "母亲每次挂断前那一句" },
        follow: {
          id: "q112-B",
          title: "留在那边",
          beats: [
            {
              scene: "第四年你拿到长期合同，买了辆二手车。冬天下午三点天就黑，你开着车回家，路上没什么人。",
              choice: {
                A: { title: "安心", text: "安静也是福气。" },
                B: { title: "空", text: "一个人吃饭，吃了四年。" }
              }
            },
            {
              scene: "有一年你爸住院，家里瞒了你半个月。你知道以后连夜订票，落地的时候他已经出院了。他在饭桌上说：看把你急的。",
              choice: {
                A: { title: "留下来照顾一段", text: "请个长假。" },
                B: { title: "待两周就走", text: "工作在那儿等着。" }
              }
            }
          ],
          regret: "被瞒了半个月的那场病"
        }
      }
    ]
  },

  /* ══════════════ q113 一作 ══════════════ */

  {
    id: "q113",
    title: "论文是你写的，一作写谁？",
    scene: "这篇文章从选题到数据到你一个人熬了七个月，导师改了两稿。投稿前他把作者顺序发过来，他第一，你第二。他附了一句：评职称用得上，你以后机会多。",
    options: [
      {
        key: "A",
        title: "争一次",
        gain: "你把自己的名字挪到了第一位，他退了一步。",
        lose: "此后三年，他再没让你进过那个项目。",
        effects: { money: 4, social: -8, happy: 7 },
        trigger: { unlock: "silence", regret: "他那句「你以后机会多」" },
        follow: {
          id: "q113-A",
          title: "争了那一次",
          beats: [
            {
              scene: "你把邮件改了又改，最后发出去只有六行字。他隔了两天才回，说：学术上你确实是主要贡献者，就按你说的。",
              choice: {
                A: { title: "松一口气", text: "讲道理的。" },
                B: { title: "心里不安", text: "他退得太干脆了。" }
              }
            },
            {
              scene: "那篇文章发在一个不错的刊物上。第二年组里分项目，名单里没有你。别人安慰你说：他还记着那件事呢。",
              choice: {
                A: { title: "不后悔", text: "这是我的东西。" },
                B: { title: "算过账", text: "一篇文章，换三年冷板凳。" }
              }
            }
          ],
          regret: "名单上那个空出来的位置"
        }
      },
      {
        key: "B",
        title: "认了，按他说的",
        gain: "关系还在，第二年他把你带进了最大的那个课题。",
        lose: "每次有人提那篇文章，你都要解释一句「我是二作」。",
        effects: { money: 7, social: 7, happy: -8 },
        follow: {
          id: "q113-B",
          title: "排第二",
          beats: [
            {
              scene: "文章见刊那天，他在群里发了个截图，说祝贺团队。你点了个赞。晚上一个人把 PDF 从头看到尾，作者那一行看了很久。",
              choice: {
                A: { title: "翻过去", text: "日子还长。" },
                B: { title: "存了一份", text: "留着自己知道。" }
              }
            },
            {
              scene: "三年后你自己带学生，有个学生做出很好的东西。他在致谢里把你写在第一个。你看了半天，把顺序改了。",
              choice: {
                A: { title: "改成学生在先", text: "当年那口气。" },
                B: { title: "就按他写的", text: "不用做给人看。" }
              }
            }
          ],
          regret: "作者那一行里的第二个名字"
        }
      }
    ]
  },

  /* ══════════════ q114 普高还是职校 ══════════════ */

  {
    id: "q114",
    title: "孩子中考差二十分，普高还是职校？",
    scene: "分数下来了，普高线差二十。花钱能进一所私立，一年三万八。孩子自己说想学汽修，说班里有个同学去了职校，看着挺高兴。他才十五。",
    options: [
      {
        key: "A",
        title: "花钱上私立",
        gain: "他还是个高中生，还有一次考大学的机会。",
        lose: "三年花了十几万，最后考了个专科。",
        effects: { money: -11, social: 4, happy: 3 },
        trigger: { unlock: "child", regret: "那三年他每天六点起" },
        follow: {
          id: "q114-A",
          title: "私立三年",
          beats: [
            {
              scene: "私立高中在城郊，两周放一次假。他成绩一直在中下游，有次月考进步了十二名，你在家长群里看到，晚上给他转了两百。",
              choice: {
                A: { title: "不逼他", text: "尽力就行。" },
                B: { title: "再push一把", text: "还有一年。" }
              }
            },
            {
              scene: "高考完那个下午，他走出考场，说：爸，我可能考不上。你说没事。他真的没考上，去了一个专科读机电。",
              choice: {
                A: { title: "这钱花得冤", text: "多花十几万，绕了一圈。" },
                B: { title: "不冤", text: "他多当了三年孩子。" }
              }
            }
          ],
          regret: "那三万八一年的学费单"
        }
      },
      {
        key: "B",
        title: "尊重他，去职校",
        gain: "他学得开心，二年级就在市里拿了奖。",
        lose: "亲戚问起来，你总要解释一句「他自己愿意的」。",
        effects: { money: 4, social: -6, happy: 6 },
        trigger: { unlock: "child", regret: "亲戚问起时那句解释" },
        follow: {
          id: "q114-B",
          title: "职校那条路",
          beats: [
            {
              scene: "第一次家长会，老师带你们参观车间。他穿着工作服站在车床边，手上有机油，抬头看见你就笑。",
              choice: {
                A: { title: "踏实了", text: "他高兴就行。" },
                B: { title: "心里一沉", text: "他还这么小。" }
              }
            },
            {
              scene: "毕业那年他十九岁，进了修理厂，一个月四千。同岁的孩子还在读大二。你妈问：他以后怎么办。",
              choice: {
                A: { title: "他自己会走", text: "手上有活，饿不着。" },
                B: { title: "让他去考大专", text: "学历还是得有。" }
              }
            }
          ],
          regret: "那身在车床边的工作服"
        }
      }
    ]
  },

  /* ══════════════ q115 护工还是辞职 ══════════════ */

  {
    id: "q115",
    title: "妈瘫了，请护工还是自己辞工？",
    scene: "出院那天医生说要人全天看着。护工一个月六千八，你工资一万二。你哥在外地，说钱他可以出，人回不来。你妈躺在病床上，眼睛睁着，看天花板。",
    options: [
      {
        key: "A",
        title: "请护工，你继续上班",
        gain: "工作保住了，房贷还能还。",
        lose: "有天你提前回家，看见她一个人在哭，护工在客厅刷手机。",
        effects: { money: -8, social: 3, happy: -7 },
        trigger: { unlock: "care", regret: "客厅里那个刷手机的背影" },
        follow: {
          id: "q115-A",
          title: "请了护工",
          beats: [
            {
              scene: "换了三个护工。第一个手脚重，第二个爱打电话，第三个还行，就是每周要休两天。那两天你请假。",
              choice: {
                A: { title: "装个摄像头", text: "图个心安。" },
                B: { title: "不装", text: "她要是知道，会觉得自己被看着。" }
              }
            },
            {
              scene: "有天她忽然清楚了一会儿，问你：是不是很花钱。你说不贵。她说：别为我花那么多。",
              choice: {
                A: { title: "说不贵", text: "她听了会安心。" },
                B: { title: "实话实说", text: "她有权知道。" }
              }
            }
          ],
          regret: "她清醒过的那几分钟"
        }
      },
      {
        key: "B",
        title: "辞工，自己照顾",
        gain: "她身上没长过一个褥疮，指甲一直剪得很整齐。",
        lose: "两年后你想回去上班，简历上那段空白解释不清。",
        effects: { money: -13, social: 6, happy: 5 },
        trigger: { unlock: "care", regret: "简历上那两年空白" },
        follow: {
          id: "q115-B",
          title: "自己照顾的那两年",
          beats: [
            {
              scene: "每天翻身、擦洗、喂饭、按摩。夜里两小时起一次。第一年你还称体重，第二年就不称了。",
              choice: {
                A: { title: "咬牙撑着", text: "她当年也是这么带我的。" },
                B: { title: "有几次想逃", text: "站在阳台上，就想走。" }
              }
            },
            {
              scene: "她走的那天早上，你给她擦完脸，她说了一句「辛苦你了」。那是她最后一句完整的话。",
              choice: {
                A: { title: "哭不出来", text: "两年，累得连难过都没力气。" },
                B: { title: "哭了一夜", text: "那两年，值。" }
              }
            }
          ],
          regret: "那句「辛苦你了」"
        }
      }
    ]
  },

  /* ══════════════ q116 阿尔茨海默 ══════════════ */

  {
    id: "q116",
    title: "她开始认不出你了",
    scene: "早上她问你：你是谁家的孩子。你说我是你儿子。她笑，说别逗了，我儿子在上班呢。然后她转身去给「儿子」热饭。",
    options: [
      {
        key: "A",
        title: "顺着她说",
        gain: "她每天都很高兴，饭也吃得多。",
        lose: "你成了她嘴里的「那个小伙子」，一天一天地听她讲自己的事。",
        effects: { happy: 7, social: 5, money: -2 },
        trigger: { unlock: "care", regret: "她嘴里的「那个小伙子」" },
        follow: {
          id: "q116-A",
          title: "那个小伙子",
          beats: [
            {
              scene: "她开始跟你讲她儿子小时候的事，讲得很细，讲他掉进河里那次。你听着，那些细节你一点印象都没有。",
              choice: {
                A: { title: "问下去", text: "多知道一点也好。" },
                B: { title: "听不下去", text: "那是我，可我听不懂。" }
              }
            },
            {
              scene: "有天她忽然抓住你的手说：你跟我儿子长得有点像。你说，是吗。她说：他也这么高。",
              choice: {
                A: { title: "说我就是", text: "认一次也好。" },
                B: { title: "什么也没说", text: "说了她会慌。" }
              }
            }
          ],
          regret: "她讲的那个掉进河里的小孩"
        }
      },
      {
        key: "B",
        title: "一遍一遍纠正她",
        gain: "偶尔她真的会想起来，说：哦，是你呀。",
        lose: "更多的时候她会生气，说你骗她，然后摔门进屋。",
        effects: { happy: -7, social: -3, money: -1 },
        trigger: { unlock: "care", regret: "她摔上的那扇门" },
        follow: {
          id: "q116-B",
          title: "一遍一遍",
          beats: [
            {
              scene: "你把相册翻出来，指着照片给她看。她看得很认真，然后抬头看你，眼神是陌生的。她说：这个人真像你。",
              choice: {
                A: { title: "再试一次", text: "总有一次能想起来。" },
                B: { title: "把相册合上", text: "不试了。" }
              }
            },
            {
              scene: "护工说，其实顺着她，她一天都开心。你说：可她要是连我都不认了，那我算什么。护工没接话。",
              choice: {
                A: { title: "改成顺着她", text: "她开心比较要紧。" },
                B: { title: "还是想让她记得", text: "自私就自私吧。" }
              }
            }
          ],
          regret: "那本翻到卷边的相册"
        }
      }
    ]
  },

  /* ══════════════ q117 不抢救 ══════════════ */

  {
    id: "q117",
    title: "那份「不抢救」同意书，你签不签？",
    scene: "他清醒的时候说过三次：真到那一步，别折腾我。现在医生把纸推过来，说你签了，我们就按这个办。你妈的意思想救，她说：万一呢。",
    options: [
      {
        key: "A",
        title: "签",
        gain: "他走得很安静，没有插管，没有按压，没有电击。",
        lose: "此后很多年，你妈那句话一直在你耳朵里：万一呢。",
        effects: { money: -2, social: -4, happy: 4 },
        trigger: { unlock: "funeral", regret: "母亲那句「万一呢」" },
        follow: {
          id: "q117-A",
          title: "签了",
          beats: [
            {
              scene: "签完字你在走廊坐了很久。护士过来问要不要进去，你说等一会儿。那扇门上的小窗，你不敢看。",
              choice: {
                A: { title: "进去握着她的手", text: "总得有人在。" },
                B: { title: "一直在走廊坐着", text: "进去了就真的要做决定。" }
              }
            },
            {
              scene: "后来你妈收拾他的东西，翻出一张纸条，是他自己写的：不抢救，不办酒，骨灰撒江里。字写得很正。",
              choice: {
                A: { title: "给她看", text: "这是他的意思。" },
                B: { title: "收起来", text: "她看了会更难受。" }
              }
            }
          ],
          regret: "那扇门上的小窗"
        }
      },
      {
        key: "B",
        title: "不签，能救就救",
        gain: "他又活了七个月，看见了孙子考上大学。",
        lose: "最后四十天在 ICU，全身插着管子，说不了话。",
        effects: { money: -14, social: 6, happy: -6 },
        trigger: { unlock: "funeral", regret: "ICU 里那四十天" },
        follow: {
          id: "q117-B",
          title: "救下来了",
          beats: [
            {
              scene: "抢救过来那天，他醒了一会儿，看见你，嘴动了动，什么也没说出来。医生说这是好现象。",
              choice: {
                A: { title: "觉得做对了", text: "多一天是一天。" },
                B: { title: "看见他的眼神", text: "那不是感谢。" }
              }
            },
            {
              scene: "最后那四十天，你每天下午三点进去看半小时。他多数时候是睡着的，手被绑在床边，怕他拔管。",
              choice: {
                A: { title: "每天都说说话", text: "他听得见。" },
                B: { title: "坐在旁边什么都不说", text: "说什么都像告别。" }
              }
            }
          ],
          regret: "他被绑在床边的那只手"
        }
      }
    ]
  },

  /* ══════════════ q118 失能之后（多选限选 3） ══════════════ */

  {
    id: "q118",
    title: "如果有一天你瘫在床上，只能保住三样",
    scene: "这不是假设。楼下那位老张，去年还能自己下楼买烟，今年坐在轮椅上，被推着晒太阳。人到了那一步，能自己做主的事就不多了。现在先想清楚：你要保住哪三样。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "home", name: "留在自己家里", tag: "体面", desc: "不去养老院，墙上还挂着自己的照片", effects: { money: -8, happy: 8 } },
      { key: "pain", name: "不疼", tag: "身体", desc: "止疼药管够，比多活两年要紧", effects: { health: 6, happy: 5 } },
      { key: "money", name: "钱在自己手上", tag: "底气", desc: "谁照顾我，我自己给钱", effects: { money: 6, happy: 4 } },
      { key: "visit", name: "每周有人来", tag: "陪伴", desc: "不是护工，是熟人", effects: { social: 8, happy: 6 } },
      { key: "clean", name: "每天能洗个澡", tag: "尊严", desc: "身上没有味道", effects: { money: -4, happy: 7 } },
      { key: "speak", name: "还能说话", tag: "表达", desc: "哪怕只是骂人", effects: { social: 4, happy: 5 } },
      { key: "mind", name: "脑子清楚", tag: "自我", desc: "不愿意活成别人嘴里的「老小孩」", effects: { happy: 9, health: -3 } },
      { key: "quick", name: "走得快一点", tag: "了断", desc: "不拖三年五年", effects: { happy: 6, social: -4 } }
    ],
    follow: {
      id: "q118",
      title: "想清楚以后",
      beats: [
        {
          scene: "你把这三样写在纸上，写完了发现，没有一样是钱能直接买到的。",
          choice: {
            A: { title: "从今天开始攒", text: "身体也是攒出来的。" },
            B: { title: "到时候再说", text: "想太远也没用。" }
          }
        },
        {
          scene: "回去看老张，他坐在轮椅上，看着小区门口。你问他想不想出去转转。他说：想。推了一百多米，他就说累了。",
          choice: {
            A: { title: "明天再来推", text: "能推一次是一次。" },
            B: { title: "心里发凉", text: "这就是以后。" }
          }
        }
      ],
      regret: "纸上那三样里没写下的"
    }
  }

]);

/* ===== data/pack-more8.js ===== */
/* 如果当时 · 岔路题 追加卷八（宠物 · 返乡 · 意义 · 中年）
 * 8 道（q119–q126），接在 pack-more7.js 之后。
 *
 * 这四片此前完全空白：
 *   宠物（0 道）、返乡种地（0 道）、信仰与意义（0 道）、中年的门（只有"45 岁被优化"一道）。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q119 猫 ══════════════ */

  {
    id: "q119",
    title: "猫病了，治下来三万",
    scene: "它今年十二岁。检查单上写着肾衰，医生说不算没救，一周两次输液，配合处方粮，能拖一到两年。三万，是这半年。它现在就趴在诊室的台子上，尾巴尖偶尔动一下。",
    options: [
      {
        key: "A",
        title: "治",
        gain: "它又陪了你十四个月，最后那个月还能自己跳上沙发。",
        lose: "那三万是你准备换车的钱，车又开了三年。",
        effects: { money: -11, happy: 9, social: 2 },
        follow: {
          id: "q119-A",
          title: "那十四个月",
          beats: [
            {
              scene: "每周二、周五去医院，把它装进那个旧航空箱。它一开始还叫，后来就不叫了，进箱子就趴下。",
              choice: {
                A: { title: "值得", text: "它知道我在。" },
                B: { title: "有时觉得它累了", text: "它叫都不叫了。" }
              }
            },
            {
              scene: "最后那天早上，它自己走到阳台晒太阳，趴了很久。下午你抱它去医院，医生说这次别治了。",
              choice: {
                A: { title: "抱着它坐到最后", text: "一直在说话。" },
                B: { title: "没敢看", text: "在门外站着。" }
              }
            }
          ],
          regret: "那个越来越安静的航空箱"
        }
      },
      {
        key: "B",
        title: "不治了，带它回家",
        gain: "它最后两个月在家里，还是睡它那个位置。",
        lose: "你有很长一段时间，进门还会先看一眼沙发上那块。",
        effects: { money: 4, happy: -10, social: -2 },
        follow: {
          id: "q119-B",
          title: "带回家",
          beats: [
            {
              scene: "医生说那开点止疼的，让它舒服些。你抱着箱子回家，路上它把头靠在箱壁上，很安静。",
              choice: {
                A: { title: "每天陪它", text: "剩下的时间不干别的。" },
                B: { title: "照常上班", text: "日子还是得过。" }
              }
            },
            {
              scene: "它走的那天是周三，你不在家。回来的时候它已经在它最喜欢的那块垫子上，身体还是软的。",
              choice: {
                A: { title: "后悔那天出门", text: "早知道就不去。" },
                B: { title: "它挑了个没人的时候", text: "猫都这样。" }
              }
            }
          ],
          regret: "那块还留着体温的垫子"
        }
      }
    ]
  },

  /* ══════════════ q120 安乐死 ══════════════ */

  {
    id: "q120",
    title: "医生说，可以考虑让它走了",
    scene: "十七岁，后腿已经站不起来，大小便失禁，眼睛也看不太清了。这两天它连最喜欢的罐头都不吃，只是喝水。你把它抱在腿上，它把头埋进你的胳膊弯，那是它小时候的习惯。",
    options: [
      {
        key: "A",
        title: "让它走",
        gain: "它没有疼到最后，走的时候还在你怀里。",
        lose: "你签了那张纸。签的时候手抖，字写得很难看。",
        effects: { money: -2, happy: -6, social: 2 },
        follow: {
          id: "q120-A",
          title: "那张纸",
          beats: [
            {
              scene: "医生问要不要再考虑一下。你说不用了。他推药之前说：你抱着它，别松手。针进去的时候，它抬头看了你一眼。",
              choice: {
                A: { title: "一直抱着", text: "直到它身体凉下来。" },
                B: { title: "放到台子上", text: "怕自己抖。" }
              }
            },
            {
              scene: "回家以后你把它的碗洗了，收进柜子最上面。那个碗一直没收起来，也没再用。",
              choice: {
                A: { title: "留着", text: "留着就留着吧。" },
                B: { title: "后来收进了储藏室", text: "看一次难受一次。" }
              }
            }
          ],
          regret: "它抬头看你的那一眼"
        }
      },
      {
        key: "B",
        title: "再陪它几天",
        gain: "它又活了十一天，有天早上还试着站起来。",
        lose: "第十天夜里它开始喘，你抱着它在客厅坐到天亮。",
        effects: { money: -1, happy: -3, social: 3 },
        follow: {
          id: "q120-B",
          title: "那十一天",
          beats: [
            {
              scene: "你请了假，每天给它擦身子、喂水。第七天它能吃下半罐罐头，你高兴得给朋友发了消息。",
              choice: {
                A: { title: "觉得还有希望", text: "说不定还能好一点。" },
                B: { title: "知道那是回光", text: "见过的人都说，这是要走了。" }
              }
            },
            {
              scene: "最后那天夜里它一直喘，你抱着它，一遍一遍说没事。凌晨四点它忽然安静了。",
              choice: {
                A: { title: "这样也好", text: "它是在家里走的。" },
                B: { title: "后悔没早点让它走", text: "那十一天，它疼了十一天。" }
              }
            }
          ],
          regret: "客厅里坐到天亮的那一夜"
        }
      }
    ]
  },

  /* ══════════════ q121 回村包地 ══════════════ */

  {
    id: "q121",
    title: "回村包三十亩地，干不干？",
    scene: "你在城里做运营，月薪一万四，房租四千。老家的地撂荒了几年，村里说连片承包便宜，一亩一年三百。你爸说，别回来，这活儿不是人干的。",
    options: [
      {
        key: "A",
        title: "回去干",
        gain: "第一年亏了两万，第二年挣了十一万，你瘦了十六斤。",
        lose: "同学群里聊融资、聊跳槽，你插不上话。",
        effects: { money: 7, health: -8, social: -6, happy: 8 },
        trigger: { unlock: "hometown", regret: "城里那个租了六年的房子" },
        follow: {
          id: "q121-A",
          title: "三十亩",
          beats: [
            {
              scene: "第一年种的是辣椒，赶上雨水多，烂在地里一半。收的时候你在地头坐了一下午，手里攥着一把烂掉的。",
              choice: {
                A: { title: "第二年换个种法", text: "不能这么干。" },
                B: { title: "想回城里", text: "这活儿真不是人干的。" }
              }
            },
            {
              scene: "第二年你搭了两个大棚，学了滴灌。收成好的那天，你爸来看，蹲在地头抽了半根烟，说：比你爷爷种得好。",
              choice: {
                A: { title: "笑", text: "就这一句，值。" },
                B: { title: "没说话", text: "他嘴上说别回来。" }
              }
            }
          ],
          regret: "地头那一把烂辣椒"
        }
      },
      {
        key: "B",
        title: "不回去",
        gain: "工资涨到一万八，年终奖发了三个月。",
        lose: "有一年清明回去上坟，你在地头站了一会儿，认不出哪块是自家的。",
        effects: { money: 9, health: -3, social: 5, happy: -5 },
        trigger: { unlock: "roots", regret: "认不出的那块地" },
        follow: {
          id: "q121-B",
          title: "没回去",
          beats: [
            {
              scene: "公司里你带了个小团队，每天开会到八点。有次加班到很晚，你在楼下便利店买了个饭团，坐在台阶上吃。",
              choice: {
                A: { title: "这样也行", text: "稳定，体面。" },
                B: { title: "忽然很累", text: "不知道在为什么忙。" }
              }
            },
            {
              scene: "村里搞合村并居，你家的老宅在拆迁范围里。你爸打电话问要不要留个院子。",
              choice: {
                A: { title: "留一个", text: "以后回去有地方住。" },
                B: { title: "都换成钱", text: "反正也不回去。" }
              }
            }
          ],
          regret: "便利店台阶上那个饭团"
        }
      }
    ]
  },

  /* ══════════════ q122 直播卖橙子 ══════════════ */

  {
    id: "q122",
    title: "家里的橙子卖不出去，你上不上镜？",
    scene: "今年收成好，收购价压到八毛一斤，还不够工钱。你妹说，试试直播吧，你普通话好。你从来没对着镜头说过话，厂里同事都刷短视频。",
    options: [
      {
        key: "A",
        title: "开播",
        gain: "第一个月卖了两千单，你爸开始学着打包。",
        lose: "同事刷到了，在群里发了个截图，配了一句「看不出来」。",
        effects: { money: 8, social: -5, happy: 6 },
        follow: {
          id: "q122-A",
          title: "第一次开播",
          beats: [
            {
              scene: "第一场七个人看，其中三个是你妹的小号。你对着镜头讲了四十分钟怎么挑橙子，讲得满头汗，卖出两单。",
              choice: {
                A: { title: "接着播", text: "两单也是单。" },
                B: { title: "想放弃", text: "太丢人了。" }
              }
            },
            {
              scene: "第三个月爆了一条视频，是你在果园里掰开一个橙子，汁水喷到镜头上。那条播放量三十多万。",
              choice: {
                A: { title: "趁热做", text: "机会就这一次。" },
                B: { title: "不敢做太大", text: "供不上货，砸口碑。" }
              }
            }
          ],
          regret: "第一场直播里那七个人"
        }
      },
      {
        key: "B",
        title: "不上镜，帮忙找别的渠道",
        gain: "你联系了三家社区团购，价格比收购价高两毛。",
        lose: "那年最后还有两万斤烂在树上，你爸没告诉你。",
        effects: { money: 3, social: 3, happy: -5 },
        follow: {
          id: "q122-B",
          title: "别的渠道",
          beats: [
            {
              scene: "团购的采购来看了货，说要大果，小果不要。你爸在旁边说，小果也甜。采购笑了笑，没说话。",
              choice: {
                A: { title: "再找几家", text: "总能卖出一些。" },
                B: { title: "算了", text: "这行的人不好打交道。" }
              }
            },
            {
              scene: "腊月你回家，看见后山那几棵树上还挂着果，冻得皱皮了。你问你爸怎么不摘。他说：摘了也没人要。",
              choice: {
                A: { title: "明年我来想办法", text: "不能再这样。" },
                B: { title: "什么也没说", text: "说什么都轻。" }
              }
            }
          ],
          regret: "后山那几棵冻皱的树"
        }
      }
    ]
  },

  /* ══════════════ q123 捐一半 ══════════════ */

  {
    id: "q123",
    title: "账上突然多了三百万，捐一半？",
    scene: "老房子拆迁，补偿款到账三百万。你在手机上刷到一所山区小学的照片，教室后墙裂了一道缝，孩子们在裂缝底下上课。转发区写着：一次性捐建，四十五万。",
    options: [
      {
        key: "A",
        title: "捐，捐掉一半",
        gain: "那所小学盖起来了，挂了一块牌子，上面有你的名字。",
        lose: "你妻子知道以后，跟你冷战了两个月。",
        effects: { money: -14, social: 8, happy: 7 },
        trigger: { unlock: "conscience", regret: "妻子冷战的那两个月" },
        follow: {
          id: "q123-A",
          title: "捐了以后",
          beats: [
            {
              scene: "她说的那句话你一直记着：你要做好人，凭什么用我们俩的钱。你没答上来。",
              choice: {
                A: { title: "道歉", text: "是该先商量。" },
                B: { title: "不道歉", text: "这钱是我家的老房子换的。" }
              }
            },
            {
              scene: "三年后学校请你去看看。孩子们在操场上跑，有个女孩问你：叔叔你为什么要给我们盖学校。你想了想说：因为我小时候的教室也漏雨。",
              choice: {
                A: { title: "这事做对了", text: "跟钱没关系。" },
                B: { title: "有点空", text: "盖完了，然后呢。" }
              }
            }
          ],
          regret: "她说的那句「凭什么」"
        }
      },
      {
        key: "B",
        title: "捐二十万，剩下的留着",
        gain: "房子换了大的，孩子上了好学校，家里没吵过一次。",
        lose: "那张照片你一直存着，隔几年会翻出来看一次。",
        effects: { money: 11, social: 4, happy: -3 },
        follow: {
          id: "q123-B",
          title: "捐了二十万",
          beats: [
            {
              scene: "捐款走的是正规渠道，给你开了张发票，还能抵税。你把发票夹在文件袋里，跟房产证放在一起。",
              choice: {
                A: { title: "挺好", text: "力所能及。" },
                B: { title: "有点不是滋味", text: "跟房产证放一块，怪怪的。" }
              }
            },
            {
              scene: "后来那所学校的照片更新过一次，裂缝补上了，墙刷成了黄色。你不知道是不是你那二十万，也没去问。",
              choice: {
                A: { title: "补上就好", text: "谁出的钱不重要。" },
                B: { title: "想去看看", text: "就远远看一眼。" }
              }
            }
          ],
          regret: "那张夹在房产证旁边的发票"
        }
      }
    ]
  },

  /* ══════════════ q124 支教两年 ══════════════ */

  {
    id: "q124",
    title: "四十二岁，辞职去支教两年，去不去？",
    scene: "孩子上大学了，房贷还剩六年。一个公益组织在招长期支教老师，去的是西南的山里，一个月补贴一千八。你教书的朋友说：那不是体验生活，是真待两年。",
    options: [
      {
        key: "A",
        title: "去",
        gain: "两年里你教会了二十六个孩子写完整的句子。",
        lose: "回来的时候，原来的位置没了。",
        effects: { money: -12, social: 6, health: -4, happy: 11 },
        trigger: { unlock: "dream", regret: "原来那个工位" },
        follow: {
          id: "q124-A",
          title: "山里那两年",
          beats: [
            {
              scene: "学校在山上，走上去四十分钟。第一晚停电，你躺在宿舍的木板床上，听见外面有虫子在叫，忽然笑了。",
              choice: {
                A: { title: "睡得很沉", text: "好多年没这么睡过。" },
                B: { title: "有点怕", text: "这地方，两年。" }
              }
            },
            {
              scene: "第二年有个孩子写了一篇作文，写的是山外面的样子，全是他自己想出来的。你在办公室看完，坐了很久。",
              choice: {
                A: { title: "给他寄了本书", text: "让他知道外面真有。" },
                B: { title: "什么也没做", text: "给了希望，也不一定好。" }
              }
            }
          ],
          regret: "走上去四十分钟的那条山路"
        }
      },
      {
        key: "B",
        title: "不去，改成每年捐钱",
        gain: "工作没断，房贷提前还了两年。",
        lose: "那个招人的页面你存了书签，一直没删。",
        effects: { money: 10, social: 3, happy: -4 },
        trigger: { unlock: "dream", regret: "那个一直没删的书签" },
        follow: {
          id: "q124-B",
          title: "没去",
          beats: [
            {
              scene: "你每月捐三百，捐了五年。收到过两封孩子写的感谢信，字歪歪扭扭，一封写着「谢谢叔叔的钱」。",
              choice: {
                A: { title: "回信", text: "总得有人回。" },
                B: { title: "没回", text: "不知道该写什么。" }
              }
            },
            {
              scene: "四十八岁那年公司裁员，你在名单上。收拾东西的时候，想起六年前那个页面。",
              choice: {
                A: { title: "现在去也不晚", text: "还有几年。" },
                B: { title: "早过了那个年纪", text: "人家也不要了。" }
              }
            }
          ],
          regret: "那两封歪歪扭扭的感谢信"
        }
      }
    ]
  },

  /* ══════════════ q125 年龄 ══════════════ */

  {
    id: "q125",
    title: "面试官问：你比我们主管还大两岁",
    scene: "三十六岁，面的是个基层岗。面试官看着简历抬头说：你这个年纪，我们这个团队 leader 才三十四，你能接受被比你小的人管吗。你简历上写的是三十二。",
    options: [
      {
        key: "A",
        title: "承认，把话讲透",
        gain: "他愣了一下，然后说：行，你敢说。",
        lose: "那家公司最后要了另一个二十八岁的。",
        effects: { money: -3, social: 6, happy: 4 },
        follow: {
          id: "q125-A",
          title: "那句实话",
          beats: [
            {
              scene: "你说：我改简历是因为不改连面试都拿不到。我这个年纪要的是一份能干的活，不是位置。他低头记了两笔。",
              choice: {
                A: { title: "觉得说对了", text: "憋着更难受。" },
                B: { title: "有点后悔", text: "太直了。" }
              }
            },
            {
              scene: "一周后收到拒信，措辞很客气。三个月后，那个面试官跳槽去了另一家公司，主动加你微信，问你要不要过去。",
              choice: {
                A: { title: "去", text: "他记得我那句话。" },
                B: { title: "再想想", text: "上次没要我。" }
              }
            }
          ],
          regret: "简历上那个改小的四岁"
        }
      },
      {
        key: "B",
        title: "绕过去，说能接受",
        gain: "进了二面，进了终面，最后拿到了 offer。",
        lose: "入职以后，那个比你小两岁的主管，处处防着你。",
        effects: { money: 9, social: -5, happy: -4 },
        follow: {
          id: "q125-B",
          title: "拿到 offer 以后",
          beats: [
            {
              scene: "他开会不太问你的意见，重要的活派给别人。有次你主动提了个方案，他说：这个我们再看看。然后再没看过。",
              choice: {
                A: { title: "忍，先把活做好", text: "时间长了会看见。" },
                B: { title: "找他谈一次", text: "把话说开。" }
              }
            },
            {
              scene: "一年后你成了组里最懂业务的人，述职的时候他在下面听。散会他说了一句：你确实比我强。语气不太好。",
              choice: {
                A: { title: "说没有", text: "别把关系弄僵。" },
                B: { title: "说谢谢", text: "认了就是认了。" }
              }
            }
          ],
          regret: "那句「这个我们再看看」"
        }
      }
    ]
  },

  /* ══════════════ q126 竞业 ══════════════ */

  {
    id: "q126",
    title: "竞业协议，签不签？",
    scene: "入职那天 HR 把一沓材料推过来，其中一页写着：离职后两年内不得从事同类业务，违约金是年薪的三倍。她指了个位置说，签这儿。你上家就是这么走的，赔偿一分没拿到。",
    options: [
      {
        key: "A",
        title: "签，先拿到工作",
        gain: "工作有了，工资涨了四成。",
        lose: "两年后你想跳去同行，对方律师看完协议说：这个不好办。",
        effects: { money: 8, social: 2, happy: -5 },
        follow: {
          id: "q126-A",
          title: "签了",
          beats: [
            {
              scene: "两年里你做得不错，但每次有猎头来，你都要先问一句：你们跟我们有竞业吗。有三个机会就这么没了。",
              choice: {
                A: { title: "忍到两年期满", text: "期满了就自由。" },
                B: { title: "找人问问能不能绕", text: "换个说法不行吗。" }
              }
            },
            {
              scene: "期满那年公司忽然说，不给补偿金了，协议作废。你算了算，那两年少挣的钱，比补偿金多得多。",
              choice: {
                A: { title: "去仲裁", text: "这口气得出。" },
                B: { title: "算了", text: "打官司，耗不起。" }
              }
            }
          ],
          regret: "那三个被问掉的机会"
        }
      },
      {
        key: "B",
        title: "要求改条款，不然不签",
        gain: "补偿金写进了合同，一个月工资的三成。",
        lose: "HR 说回去等通知，那个岗位给了别人。",
        effects: { money: -4, social: 5, happy: 5 },
        follow: {
          id: "q126-B",
          title: "没签的那一页",
          beats: [
            {
              scene: "HR 把材料收回去的时候脸色不太好，说我们这儿都这么签。你说我上家也这么说的，后来一分没给。她没接话。",
              choice: {
                A: { title: "不后悔", text: "这种东西签了就套住了。" },
                B: { title: "有点慌", text: "工作还没着落。" }
              }
            },
            {
              scene: "两个月后你进了另一家，规模小一点，工资少两千，但合同上那一条写得很清楚：按月给补偿。",
              choice: {
                A: { title: "踏实", text: "少两千，换个安心。" },
                B: { title: "还是惦记那个 offer", text: "钱差得不少。" }
              }
            }
          ],
          regret: "HR 收回去的那一沓材料"
        }
      }
    ]
  }

]);

/* ===== data/pack-more9.js ===== */
/* 如果当时 · 随机事件 + 连锁专属局 追加卷九
 * 4 个随机事件（ev3.*）、2 个连锁局（chain-divorce / chain-care）。
 * 两道新连锁的钥匙：divorce 来自 q101（离婚时那套房），care 来自 q115–q117（照护）。
 */

/* ===== 随机事件 ===== */
window.PACK_EVENTS = (window.PACK_EVENTS || []).concat([

  {
    id: "ev3.audit",
    title: "财务让你补个签字",
    scene: "一张对账单推到你面前，金额对得上，日期不对。财务说：就差你这一笔，月底要关账。她说话的时候，笔帽一直没盖上。",
    options: [
      { key: "A", title: "不签，让她说明白", text: "这一笔到底怎么来的。", effects: { money: -3, social: -4, happy: 6 }, regret: "月底那场没开的会" },
      { key: "B", title: "签了", text: "反正金额是对的。", effects: { money: 5, social: 4, happy: -7 }, regret: "那支没盖笔帽的笔" },
      { key: "C", title: "说回去想想", text: "拖两天再说。", effects: { money: -1, happy: 2 }, regret: "拖过去的那两天" }
    ]
  },

  {
    id: "ev3.oldphoto",
    title: "母亲塞给你一张旧照片",
    scene: "照片发黄，边角卷起来。上面是个二十来岁的姑娘，站在一台拖拉机旁边笑。背面用铅笔写着一个名字，不是她现在的名字。她把照片塞进你手里，说：别给你爸看见。",
    condition: { stat: "happy", op: "lt", value: 70 },
    options: [
      { key: "A", title: "问她这是谁", text: "她给你了，就是想说。", effects: { happy: 9, social: 5 }, regret: "照片背面那个名字" },
      { key: "B", title: "收起来，不问", text: "有些人一辈子不愿意提。", effects: { happy: -2, social: -2 }, regret: "她递照片时那只手" }
    ]
  },

  {
    id: "ev3.cough",
    title: "咳了三个月，纸上有点红",
    scene: "一开始是夜里咳，后来白天也咳。今天早上擤鼻子，纸上有血丝。你把它揉成团扔了，出门赶地铁。公司这周在过审。",
    condition: { stat: "health", op: "lt", value: 65 },
    options: [
      { key: "A", title: "这周就去查", text: "过审有别人，命只有一条。", effects: { money: -7, health: 11, happy: -4 }, regret: "CT 室门口那排椅子" },
      { key: "B", title: "过完这阵再说", text: "可能就是上火。", effects: { health: -9, money: 3, happy: -5 }, regret: "那个被揉掉的纸团" }
    ]
  },

  {
    id: "ev3.deposit",
    title: "十年前的房东打来电话",
    scene: "一个陌生号码，接起来是十年前那个房东。他说整理旧账，发现当年少退了你七百块押金。他现在腿脚不好，让儿子微信转给你。",
    options: [
      { key: "A", title: "收下，回个电话谢他", text: "七百块不多，十年了还记着。", effects: { money: 1, social: 8, happy: 6 }, regret: "那个记了十年的小本子" },
      { key: "B", title: "说不用了", text: "就七百块。", effects: { money: -1, social: 4, happy: 3 }, regret: "他说腿脚不好的那句" },
      { key: "C", title: "问他现在住哪，去看看", text: "顺路的事。", effects: { money: -3, social: 10, happy: 8 }, regret: "老楼里那间空了的屋子" }
    ]
  }

]);

/* ===== 连锁专属局 ===== */
window.PACK_CHAINS = (window.PACK_CHAINS || []).concat([

  {
    id: "chain-divorce",
    unlock: "divorce",
    title: "孩子婚礼上，你们坐在同一桌",
    scene: "二十多年过去，孩子结婚。司仪在台上说「请双方父母上台」，你和她在楼梯口碰上。她老了不少，头发染过，还是能看出发根那一截白。她说：你先上。",
    options: [
      { key: "A", title: "一起上", text: "孩子这辈子就这一次。", effects: { money: -4, social: 10, happy: 9 }, regret: "楼梯口那句「你先上」" },
      { key: "B", title: "让她先，你在后面跟着", text: "这么多年了，还是错开走。", effects: { social: -4, happy: -6 }, regret: "台上错开的那两步" }
    ]
  },

  {
    id: "chain-care",
    unlock: "care",
    title: "轮到你了",
    scene: "你也到了那个年纪。洗澡的时候脚下打滑，扶住墙才没摔。孩子在另一个城市，一周打一次电话，每次都说：要不你搬过来吧。你每次都说：这边挺好。",
    options: [
      { key: "A", title: "搬过去", text: "离得近，总有人搭把手。", effects: { money: -8, social: 9, happy: 4 }, regret: "老房子里那面扶惯了的墙" },
      { key: "B", title: "留在原地", text: "这屋子我熟。", effects: { money: 2, social: -7, happy: 5 }, regret: "孩子那句「这边挺好」" }
    ]
  }

]);

/* ===== data/pack-more10.js ===== */
/* 如果当时 · 岔路题 追加卷十（职场伦理）
 * 6 道（q127–q132），接在 pack-more9.js 之后。
 *
 * 前 126 道里职场只有「35 岁被裁」「裸辞追梦」「体制内还是私企」这类
 * "走不走"的题。缺的是走不了的时候怎么办：背锅、拟裁员名单、
 * 加班住院、举报、被推活、离职签保密。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q127 背锅 ══════════════ */

  {
    id: "q127",
    title: "项目出了事，领导让你认下来",
    scene: "合同里那个数字错了，赔了六十万。签字的是你，可那版数字是他在会上口头改的，没有纪要。他把你叫进办公室，关上门，说：这事你先担一下，年底我给你补。",
    options: [
      {
        key: "A",
        title: "认下来",
        gain: "年终奖没扣，第二年还升了半级。",
        lose: "公司系统里那份检讨，署名是你的，永久保存。",
        effects: { money: 8, social: 5, happy: -9 },
        trigger: { unlock: "silence", regret: "那份署你名的检讨" },
        follow: {
          id: "q127-A",
          title: "认了以后",
          beats: [
            {
              scene: "检讨写了三页，会上念了七分钟。他坐在第一排点头，散会时拍了拍你的肩，说：记住这份情。",
              choice: {
                A: { title: "记着就记着", text: "总比丢了工作强。" },
                B: { title: "有点恶心", text: "那句「记住这份情」。" }
              }
            },
            {
              scene: "年底他调走了，去了另一个大区。新来的领导翻旧档，看见了那份检讨，问：这是怎么回事。",
              choice: {
                A: { title: "照实说", text: "把当年的事讲一遍。" },
                B: { title: "说不清楚", text: "过去这么多年了。" }
              }
            }
          ],
          regret: "那句「记住这份情」"
        }
      },
      {
        key: "B",
        title: "不认，把事说清",
        gain: "会议记录调出来了，责任分了一半。",
        lose: "他从此在所有的会上，都不点你的名。",
        effects: { money: -6, social: -9, happy: 7 },
        trigger: { unlock: "conscience", regret: "此后所有会议上的沉默" },
        follow: {
          id: "q127-B",
          title: "说了以后",
          beats: [
            {
              scene: "你把邮件、会议通知、聊天记录都打印出来，一页一页摊在 HR 桌上。她看完说：这些我留下了。",
              choice: {
                A: { title: "踏实", text: "该做的做了。" },
                B: { title: "手在抖", text: "从没这么跟人对着干过。" }
              }
            },
            {
              scene: "处理结果是各打五十大板。他被通报，你被调去了一个不重要的组。组里三个人，管着一个没人用的系统。",
              choice: {
                A: { title: "认了", text: "至少名字是干净的。" },
                B: { title: "后悔", text: "代价比想的大。" }
              }
            }
          ],
          regret: "那个只有三个人的组"
        }
      }
    ]
  },

  /* ══════════════ q128 裁员名单（多选 3） ══════════════ */

  {
    id: "q128",
    title: "裁员名单让你拟，只能留三个",
    scene: "部门十一个人，上面给了三个名额。名单要你拟，理由也要你写。写完之后，那些理由会跟着每个人一辈子。",
    type: "multi",
    pickCount: 3,
    items: [
      { key: "new", name: "刚来半年的新人", tag: "成本", desc: "还没成家，赔偿最少，也最容易被说服", effects: { money: 6, social: -6 } },
      { key: "old", name: "干了十二年的老员工", tag: "成本", desc: "工资最高，一个人抵三个新人", effects: { money: 9, social: -10, happy: -8 } },
      { key: "preg", name: "刚怀孕的那个", tag: "风险", desc: "法律上不好动，但名单上写了也就写了", effects: { money: 4, social: -14, happy: -12 } },
      { key: "sick", name: "家里有病人那个", tag: "人情", desc: "他上个月请了十一天假，没瞒过谁", effects: { money: 5, social: -9, happy: -9 } },
      { key: "lazy", name: "天天摸鱼那个", tag: "公道", desc: "谁都知道他不干活，写他没人有意见", effects: { money: 3, social: 6, happy: 4 } },
      { key: "me", name: "我自己", tag: "了断", desc: "名单上写自己，是最干脆的一种", effects: { money: 4, social: 3, happy: 6 } },
      { key: "boss", name: "关系最硬那个", tag: "硬碰", desc: "他舅舅在总部，写他就是跟人翻脸", effects: { money: 2, social: -16, happy: 8 } },
      { key: "quiet", name: "最不爱说话那个", tag: "好办", desc: "他不会闹，也不会去找人", effects: { money: 5, social: -7, happy: -6 } }
    ],
    follow: {
      id: "q128",
      title: "名单交上去以后",
      beats: [
        {
          scene: "名单交了。三天后开始谈话，一天谈两个。被谈的人出来的时候，抱着一个纸箱，箱子里有那盆养了两年的绿萝。",
          choice: {
            A: { title: "去送一下", text: "送到电梯口。" },
            B: { title: "坐着不动", text: "抬头看一眼就够了。" }
          }
        },
        {
          scene: "有个被裁的人临走前过来跟你说：我知道这名单不是你一个人定的。他说完就走了，你反而更难受。",
          choice: {
            A: { title: "承认是我拟的", text: "该认就认。" },
            B: { title: "点头，不说话", text: "这句话说出口太轻了。" }
          }
        }
      ],
      regret: "那盆被抱走的绿萝"
    }
  },

  /* ══════════════ q129 加班住院 ══════════════ */

  {
    id: "q129",
    title: "在工位上倒下了",
    scene: "ICU 住了三天。医生说是心肌炎，再晚送来半小时不好说。手机里有四十七个未接，三十九个是工作群。领导发来一条：好好休息，不急。",
    options: [
      {
        key: "A",
        title: "回去就辞了",
        gain: "半年后你能一觉睡到天亮，肋骨不疼了。",
        lose: "房贷还剩十九年，存款够撑八个月。",
        effects: { money: -11, health: 13, happy: 9 },
        trigger: { unlock: "health", regret: "ICU 里那三天" },
        follow: {
          id: "q129-A",
          title: "辞了以后",
          beats: [
            {
              scene: "辞职那天你把工牌交了，走出大楼的时候是下午三点。街上人不多，太阳照在脸上，你有点不习惯。",
              choice: {
                A: { title: "轻松", text: "好几年没在白天出过门。" },
                B: { title: "空", text: "突然不知道自己是干什么的。" }
              }
            },
            {
              scene: "第六个月，存款见底。你开始接一些零散的活，钱不多，但能按时吃饭。有天面试，人家问：这半年空白怎么解释。",
              choice: {
                A: { title: "照实说", text: "病了一场，想清楚了。" },
                B: { title: "编个理由", text: "说在做自由职业。" }
              }
            }
          ],
          regret: "那三十九个工作群消息"
        }
      },
      {
        key: "B",
        title: "回去接着干，但慢一点",
        gain: "岗位还在，工资还涨了。",
        lose: "胸口偶尔还会闷一下，你不敢去医院查。",
        effects: { money: 7, health: -6, happy: -4 },
        trigger: { unlock: "health", regret: "那次没去查的胸闷" },
        follow: {
          id: "q129-B",
          title: "接着干",
          beats: [
            {
              scene: "出院第十天你就去上班了。同事给你买了个靠垫，说你腰不好。你把靠垫放在椅子上，每天坐十一个小时。",
              choice: {
                A: { title: "习惯了", text: "人总要过日子。" },
                B: { title: "夜里会怕", text: "睡着了会突然惊醒。" }
              }
            },
            {
              scene: "第二年体检，报告上写着「窦性心律不齐，建议复查」。你把那一页折起来，夹在文件夹里，没去。",
              choice: {
                A: { title: "去复查", text: "这次不能再拖。" },
                B: { title: "先忙完这季度", text: "忙完就去。" }
              }
            }
          ],
          regret: "那页折起来的体检报告"
        }
      }
    ]
  },

  /* ══════════════ q130 举报 ══════════════ */

  {
    id: "q130",
    title: "公司往河里排东西，你手里有照片",
    scene: "厂区后墙那根管子，晚上十点以后开始排。你值夜班，拍了七张，有时间戳，有坐标。举报电话贴在公告栏上，字被太阳晒得发白。",
    options: [
      {
        key: "A",
        title: "举报",
        gain: "厂子被罚，管子拆了，河下游那片稻田活了。",
        lose: "你第二年就没再进过这个行业。",
        effects: { money: -10, social: -7, happy: 11 },
        trigger: { unlock: "conscience", regret: "那七张照片的备份" },
        follow: {
          id: "q130-A",
          title: "举报以后",
          beats: [
            {
              scene: "举报信是匿名的，但照片是你拍的，厂里很快就知道是谁。主任找你谈话，说：你也是拿工资的。",
              choice: {
                A: { title: "我认", text: "这种事不能装看不见。" },
                B: { title: "我说不是我", text: "照片谁都可能拍。" }
              }
            },
            {
              scene: "年底续签，合同没给你。人事说得很客气：公司战略调整。你把工具箱交回去，里面那把用了六年的扳手没带走。",
              choice: {
                A: { title: "不后悔", text: "那片稻田比这份工作重要。" },
                B: { title: "夜里想过", text: "如果当初装看不见。" }
              }
            }
          ],
          regret: "那把没带走的扳手"
        }
      },
      {
        key: "B",
        title: "不举报，把照片删了",
        gain: "合同续上了，工资加了三百。",
        lose: "此后每次路过那条河，你都会闻一下。",
        effects: { money: 6, social: 4, happy: -9 },
        follow: {
          id: "q130-B",
          title: "删了以后",
          beats: [
            {
              scene: "照片删得很干净，回收站也清了。当天晚上你睡得不好，梦见那根管子在冒白沫。",
              choice: {
                A: { title: "算了", text: "我一个人也改变不了什么。" },
                B: { title: "留着底", text: "先不删，万一以后用得上。" }
              }
            },
            {
              scene: "三年后那条河上了本地新闻。下游一个村的井水不能喝了，村里人来厂门口拉横幅。你在人群外面站着。",
              choice: {
                A: { title: "把照片交出去", text: "现在还不晚。" },
                B: { title: "转身走开", text: "已经三年了。" }
              }
            }
          ],
          regret: "那条河的味道"
        }
      }
    ]
  },

  /* ══════════════ q131 活都推给你 ══════════════ */

  {
    id: "q131",
    title: "组里的活，最后都落到你这儿",
    scene: "三个人一个组。一个天天开会，一个天天请假，剩下的事都是你的。年底评优，三个人的名字一起报上去。领导说：你们组配合得好。",
    options: [
      {
        key: "A",
        title: "忍，把活干完",
        gain: "领导觉得你靠得住，明年有个项目让你牵头。",
        lose: "你成了那个「反正他做得完」的人。",
        effects: { money: 5, social: 6, happy: -7 },
        follow: {
          id: "q131-A",
          title: "忍下来",
          beats: [
            {
              scene: "第二年那个项目，还是你一个人做。领导在会上说：这个组很团结。你坐在那儿，笑了一下。",
              choice: {
                A: { title: "值", text: "至少有人看见。" },
                B: { title: "没意思", text: "看见的只是「他能干」。" }
              }
            },
            {
              scene: "第三年来了个新人，跟你当年一样。你看着他一个人加班到十点，忽然想起自己。",
              choice: {
                A: { title: "教他怎么推", text: "别走我这条路。" },
                B: { title: "什么都没说", text: "每个人都有自己的一关。" }
              }
            }
          ],
          regret: "那句「你们组配合得好」"
        }
      },
      {
        key: "B",
        title: "摊开说一次",
        gain: "活分清了，那两个人开始学着干活。",
        lose: "组里的气氛冷了下来，午饭没人叫你。",
        effects: { money: -2, social: -6, happy: 8 },
        follow: {
          id: "q131-B",
          title: "说了以后",
          beats: [
            {
              scene: "你在周会上把三个人的工作量列了出来，按项目排的。会议室里安静了半分钟。领导说：这个表挺好，以后每周发一次。",
              choice: {
                A: { title: "这样就对了", text: "早该摊开。" },
                B: { title: "有点后悔", text: "把关系弄僵了。" }
              }
            },
            {
              scene: "半年后那个天天开会的同事调走了。走之前他说：其实你说得对，我就是不愿意干。",
              choice: {
                A: { title: "笑一下", text: "承认了就好。" },
                B: { title: "没什么感觉", text: "他走不走，我的活都一样。" }
              }
            }
          ],
          regret: "那顿没人叫的午饭"
        }
      }
    ]
  },

  /* ══════════════ q132 保密协议 ══════════════ */

  {
    id: "q132",
    title: "离职时让你签一份保密协议",
    scene: "协议有九页，列了四十多项「不得披露」。里面包括你做过的那套算法的思路——那是三年里你自己想出来的。HR 说：签了才给离职证明。",
    options: [
      {
        key: "A",
        title: "签，先拿到证明",
        gain: "手续当天办完，下家等着入职。",
        lose: "新公司要你做类似的事，你翻出协议看了半天，不敢动。",
        effects: { money: 8, social: 2, happy: -6 },
        follow: {
          id: "q132-A",
          title: "签了以后",
          beats: [
            {
              scene: "新公司第一个项目就撞上了那套思路。你坐在工位上，把那份九页的协议从邮箱里翻出来，一页一页看。",
              choice: {
                A: { title: "换个做法", text: "绕开就是。" },
                B: { title: "私下用一点", text: "没人会知道。" }
              }
            },
            {
              scene: "两年后你在一个行业会上碰到前同事。他说：那套东西现在还在用，署名是别人的。",
              choice: {
                A: { title: "心里堵", text: "那三年。" },
                B: { title: "算了", text: "东西做出来就是给人用的。" }
              }
            }
          ],
          regret: "协议里那四十多项"
        }
      },
      {
        key: "B",
        title: "要求去掉算法那几条",
        gain: "删掉了十一条，剩下二十八条。",
        lose: "离职证明晚了二十天，下家差点撤回 offer。",
        effects: { money: -4, social: 4, happy: 7 },
        follow: {
          id: "q132-B",
          title: "谈下来以后",
          beats: [
            {
              scene: "HR 拿着改过的协议回来，脸不太好看，说这是她能给的最大让步。你一条一条看，看到第十四条，又划了一笔。",
              choice: {
                A: { title: "再争一条", text: "这条也不行。" },
                B: { title: "就这样签", text: "够了。" }
              }
            },
            {
              scene: "入职新公司那天，你把那套方法讲给团队听。有人问：这是你在上一家做的吗。你说：是我想的，但那边不是我的。",
              choice: {
                A: { title: "讲完整", text: "把来历说清楚。" },
                B: { title: "只讲方法", text: "来历不重要。" }
              }
            }
          ],
          regret: "那二十天等证明的日子"
        }
      }
    ]
  }

]);

/* ===== data/pack-more11.js ===== */
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

/* ===== data/pack-more12.js ===== */
/* 如果当时 · 岔路题 追加卷十二（钱的具体形状）
 * 8 道（q139–q146），接在 pack-more11.js 之后。
 *
 * 前 126 道里的「钱」很抽象，只有多和少：五百万、一个亿、首付、赔偿金。
 * 缺的是钱在人生活里的具体形状：提前还贷、被推销保险、亲戚借钱、
 * 给父母买医保、利息变少、基金亏了、老人买保健品、年终奖怎么分。
 */
window.PACK_START = (window.PACK_START || []).concat([

  /* ══════════════ q139 提前还贷 ══════════════ */

  {
    id: "q139",
    title: "手里有四十万，要不要提前还贷",
    scene: "房贷还剩一百二十万，二十五年，利率五点二。这四十万是你攒了八年的。银行 App 里那个「提前还款」的按钮，你点开过很多次，都没按下去。",
    options: [
      {
        key: "A",
        title: "还，一次性还四十万",
        gain: "月供少了三千一，二十五年省下的利息能买一辆车。",
        lose: "账上只剩两万，此后半年你不敢生病。",
        effects: { money: 6, health: -3, happy: 5 },
        follow: {
          id: "q139-A",
          title: "还了以后",
          beats: [
            {
              scene: "柜台办完，柜员说：省了不少利息。你看着那张回单，觉得心里空了一块，又觉得轻了一块。",
              choice: {
                A: { title: "轻", text: "每个月少还三千一。" },
                B: { title: "空", text: "那八年攒下的东西，一下没了。" }
              }
            },
            {
              scene: "第三个月，孩子发烧住院，交押金的时候你翻遍了三张卡。最后是刷的信用卡。",
              choice: {
                A: { title: "不后悔", text: "撑过去就好。" },
                B: { title: "想过要不要贷回来", text: "有些钱不该全还。" }
              }
            }
          ],
          regret: "那张只剩两万的余额截图"
        }
      },
      {
        key: "B",
        title: "不还，钱分开放",
        gain: "账上留着四十万，遇事不慌。",
        lose: "每年付出去的利息，够给孩子报三年班。",
        effects: { money: -5, health: 3, happy: 2 },
        follow: {
          id: "q139-B",
          title: "留着",
          beats: [
            {
              scene: "你把钱分成三份：二十万定期，十万活期，十万买了理财。每个月的利息，刚好够还一部分月供。",
              choice: {
                A: { title: "这样稳妥", text: "手上有钱才踏实。" },
                B: { title: "算过账", text: "理财收益跑不过房贷利率。" }
              }
            },
            {
              scene: "第二年公司裁员，你在名单边缘。HR 谈的时候你心里想的是：还好，账上有钱。",
              choice: {
                A: { title: "幸亏没还", text: "这四十万救了一回。" },
                B: { title: "还是想还", text: "利息白白给了银行两年。" }
              }
            }
          ],
          regret: "那八年攒下的四十万"
        }
      }
    ]
  },

  /* ══════════════ q140 保险 ══════════════ */

  {
    id: "q140",
    title: "同学来推销重疾险，一年一万二",
    scene: "十几年没联系的同学，忽然约你吃饭。饭吃到一半，她拿出一份计划书，说这个产品下个月停售。她说：我不是为了提成，我是真觉得你需要。",
    options: [
      {
        key: "A",
        title: "买，签二十年",
        gain: "第二年体检查出一个结节，理赔了八万。",
        lose: "此后每年交保费那天，你都会算一遍划不划算。",
        effects: { money: -8, health: 4, happy: 3 },
        follow: {
          id: "q140-A",
          title: "买了以后",
          beats: [
            {
              scene: "签单那天她很高兴，说这单她提成八百，请客算她的。第二年理赔下来，她比你更激动，说你要好好治。",
              choice: {
                A: { title: "觉得值", text: "买对了。" },
                B: { title: "有点复杂", text: "是她赚了提成，也是她救了我。" }
              }
            },
            {
              scene: "第五年你想退保，现金价值只有三万八，交了六万。客服说：退保就断了保障。",
              choice: {
                A: { title: "接着交", text: "断了更亏。" },
                B: { title: "退了", text: "这笔钱不如自己存。" }
              }
            }
          ],
          regret: "每年缴费那天算的账"
        }
      },
      {
        key: "B",
        title: "不买，饭钱我付",
        gain: "一年省一万二，你自己开了个账户存起来。",
        lose: "她在同学群里再没说过话。",
        effects: { money: 8, social: -5, happy: 2 },
        follow: {
          id: "q140-B",
          title: "没买",
          beats: [
            {
              scene: "你把饭钱付了，说再想想。她笑得还是很好看，说没关系，有需要随时找我。此后你们没再联系。",
              choice: {
                A: { title: "松一口气", text: "钱在自己手上。" },
                B: { title: "有点抱歉", text: "她也不容易。" }
              }
            },
            {
              scene: "第三年那个账户里有四万多。你母亲住院，你拿这笔钱交了押金，一分没借。",
              choice: {
                A: { title: "自己的保险自己上", text: "钱放对地方就是保险。" },
                B: { title: "还是后怕", text: "要是得的是大病呢。" }
              }
            }
          ],
          regret: "她那句「我真觉得你需要」"
        }
      }
    ]
  },

  /* ══════════════ q141 亲戚来借钱 ══════════════ */

  {
    id: "q141",
    title: "你妈打来电话：你表弟要借十万",
    scene: "表弟在外面做生意，亏了。你妈在电话里说：他跪在我面前了。你听得出她的为难——她既想帮他，又知道这钱多半回不来。",
    options: [
      {
        key: "A",
        title: "借，但要写借条",
        gain: "钱出去了，白纸黑字在。",
        lose: "你妈在电话里沉默了很久，说：一家人还写这个。",
        effects: { money: -10, social: -4, happy: -4 },
        trigger: { unlock: "debt", regret: "母亲那句「一家人还写这个」" },
        follow: {
          id: "q141-A",
          title: "借条",
          beats: [
            {
              scene: "借条是你妈送过去的，回来的时候她把纸放在桌上，说：他签了，签的时候手抖。",
              choice: {
                A: { title: "该这样", text: "丑话说前头。" },
                B: { title: "心里不是滋味", text: "我成了那个算账的人。" }
              }
            },
            {
              scene: "三年过去，一分没还。你把借条拿出来看过两次，都没去要。你妈问过一次：他还没还？你说：快了。",
              choice: {
                A: { title: "去要", text: "十万不是小数。" },
                B: { title: "不要了", text: "为了十万撕破脸不值。" }
              }
            }
          ],
          regret: "那张签了字却没兑现的纸"
        }
      },
      {
        key: "B",
        title: "借五万，说只有这些",
        gain: "五万他收了，你妈松了口气。",
        lose: "另外五万他后来从别人那儿借的，利息三分。",
        effects: { money: -6, social: 4, happy: 1 },
        follow: {
          id: "q141-B",
          title: "五万",
          beats: [
            {
              scene: "你把五万转过去，附了一句：先周转。他回了三个字：谢谢哥。这三个字后面跟着一个很长的省略号。",
              choice: {
                A: { title: "就当给了", text: "不指望还。" },
                B: { title: "还是盼着还", text: "他要是能站起来。" }
              }
            },
            {
              scene: "半年后你听说他从别人那儿借了高利，一个月利息一千五。你算了算，一年就是一万八。",
              choice: {
                A: { title: "再多给他一点", text: "把高利还了。" },
                B: { title: "不管了", text: "我也有我的日子。" }
              }
            }
          ],
          regret: "那句后面跟着省略号的「谢谢哥」"
        }
      }
    ]
  },

  /* ══════════════ q142 给父母买医保 ══════════════ */

  {
    id: "q142",
    title: "给父母买份商业医保，一年八千",
    scene: "两个人都六十多了，父亲有高血压。业务员说可以买，但要加费，而且既往症不赔。你妈在旁边说：别花这个钱，我们有医保。",
    options: [
      {
        key: "A",
        title: "买，两个人都买",
        gain: "第三年父亲做手术，报下来三万七。",
        lose: "那三年一共交了两万四，前两年你都在想这钱是不是白花。",
        effects: { money: -9, health: 5, happy: 6 },
        follow: {
          id: "q142-A",
          title: "买了",
          beats: [
            {
              scene: "第一年两人都做了体检，一堆小毛病，都不在赔付范围。你妈说：这不白交了。你说：就当买个安心。",
              choice: {
                A: { title: "继续交", text: "安心也是钱买的。" },
                B: { title: "动摇过", text: "两年一万六。" }
              }
            },
            {
              scene: "第三年父亲做手术，住院二十三天。报销窗口那个姑娘算了半天，说：报三万七。你在窗口前站了一会儿，没说话。",
              choice: {
                A: { title: "值了", text: "当初没听我妈的。" },
                B: { title: "想起两年白交的钱", text: "这种事没法算。" }
              }
            }
          ],
          regret: "头两年那些白交的保费"
        }
      },
      {
        key: "B",
        title: "不买，那笔钱自己存着",
        gain: "一年八千，五年四万，账上是实的。",
        lose: "父亲做手术那次，四万一分不少全是自己出。",
        effects: { money: 5, health: -2, happy: -3 },
        follow: {
          id: "q142-B",
          title: "自己存",
          beats: [
            {
              scene: "你开了个单独的账户，每月存七百。存到第三年，里面有两万五。你觉得这样挺好，看得见摸得着。",
              choice: {
                A: { title: "踏实", text: "钱在就是钱在。" },
                B: { title: "偶尔算", text: "要是得了大病，两万五够干什么。" }
              }
            },
            {
              scene: "父亲做手术，押金五万。你把那个账户里的钱全取了，又添了两万。取钱的时候柜台问：确定全取吗。",
              choice: {
                A: { title: "取完", text: "还有什么好犹豫的。" },
                B: { title: "取的时候手停了一下", text: "这钱攒了五年。" }
              }
            }
          ],
          regret: "那个每月存七百的账户"
        }
      }
    ]
  },

  /* ══════════════ q143 利息 ══════════════ */

  {
    id: "q143",
    title: "存款利息掉到一点几",
    scene: "三年前存的那笔定期到期了，一百万，利息从四厘降到一点八。柜台的人推荐理财，说年化能到四。她说得很客气，也说得很含糊。",
    options: [
      {
        key: "A",
        title: "还是存定期",
        gain: "一年一万八，稳稳当当，睡得好。",
        lose: "菜市场的排骨从二十八涨到三十四。",
        effects: { money: 4, happy: 2 },
        follow: {
          id: "q143-A",
          title: "还是定期",
          beats: [
            {
              scene: "存完三年定期，你拿着存单走出银行。太阳很大。你在门口算了一下，三年五万四，够家里一年的开销。",
              choice: {
                A: { title: "踏实", text: "不图多，图稳。" },
                B: { title: "有点闷", text: "三年前是十二万。" }
              }
            },
            {
              scene: "第二年物价又涨了一轮。你在超市里看价签，忽然明白「利息」这两个字在变小。",
              choice: {
                A: { title: "那就少花点", text: "日子总能过。" },
                B: { title: "还是得想办法", text: "光靠存款不行了。" }
              }
            }
          ],
          regret: "三年前那十二万利息"
        }
      },
      {
        key: "B",
        title: "拿一半买理财",
        gain: "第一年确实拿到四点多，多了一万二。",
        lose: "第二年净值跌了七个点，你把 App 删了三天。",
        effects: { money: 6, happy: -4, health: -2 },
        follow: {
          id: "q143-B",
          title: "买了一半",
          beats: [
            {
              scene: "五万买了理财，五万存了定期。第一年理财赚了一万一，你在饭桌上跟人说：还是要会理财。",
              choice: {
                A: { title: "尝到甜头", text: "要不要再多投点。" },
                B: { title: "见好就收", text: "赚了就好。" }
              }
            },
            {
              scene: "第二年那个产品净值一路往下。你把 App 删了三天，第四天又装回来，发现跌了七千。",
              choice: {
                A: { title: "拿着不动", text: "跌了总会涨回来。" },
                B: { title: "赎回来", text: "不玩了。" }
              }
            }
          ],
          regret: "删了又装回来的那个 App"
        }
      }
    ]
  },

  /* ══════════════ q144 亏了三成 ══════════════ */

  {
    id: "q144",
    title: "基金亏了三成，卖不卖",
    scene: "买的时候是三十万，现在二十一万。你老婆说：这叫学费。你每天晚上看一眼，白天不看。有个群里的人说：现在正是加仓的时候。",
    options: [
      {
        key: "A",
        title: "割了，认赔",
        gain: "钱回到手上，你晚上能睡着了。",
        lose: "半年后那几只涨回了三成，群里在晒收益。",
        effects: { money: -9, health: 4, happy: 3 },
        follow: {
          id: "q144-A",
          title: "割了",
          beats: [
            {
              scene: "赎回那天你在手机上按了三下确认。九万块，就是这三年。你把手机放下，去阳台抽了根烟。",
              choice: {
                A: { title: "轻松", text: "不看就没事了。" },
                B: { title: "难受", text: "九万是我一年半的工资。" }
              }
            },
            {
              scene: "半年后群里在晒收益，那几只都涨回去了。有人问你还在不在。你说早卖了。他说：可惜。",
              choice: {
                A: { title: "不可惜", text: "我睡得好。" },
                B: { title: "心里骂了一句", text: "当初不走就好了。" }
              }
            }
          ],
          regret: "那三年里每一个晚上"
        }
      },
      {
        key: "B",
        title: "不卖，也不加仓",
        gain: "两年后回本了，一分没赔。",
        lose: "那两年每次看账户，胃都会缩一下。",
        effects: { money: 2, health: -6, happy: -5 },
        follow: {
          id: "q144-B",
          title: "不动",
          beats: [
            {
              scene: "你把 App 的通知关掉了，每周只看一次。有几次忍不住，半夜打开，看完更睡不着。",
              choice: {
                A: { title: "干脆不看", text: "一个月看一次。" },
                B: { title: "天天看", text: "看不看都一样。" }
              }
            },
            {
              scene: "第二年回本那天你没什么感觉，只是在群里发了句「终于」。有人回：这才哪到哪。",
              choice: {
                A: { title: "就到此为止", text: "赎回来，不玩了。" },
                B: { title: "再拿一段", text: "说不定还能赚。" }
              }
            }
          ],
          regret: "那两年半夜打开的那个 App"
        }
      }
    ]
  },

  /* ══════════════ q145 保健品 ══════════════ */

  {
    id: "q145",
    title: "老人买了三万块的保健品",
    scene: "床底下堆了十七盒，包装上写着「调节免疫」。他自己去听讲座，每天早上六点，有车接送，还发鸡蛋。卖东西的小姑娘叫他「爷爷」。",
    options: [
      {
        key: "A",
        title: "把东西退了，跟老人吵一架",
        gain: "退回来两万四，剩下三盒已经拆了。",
        lose: "他一个月没跟你说话，讲座照去。",
        effects: { money: 5, social: -7, happy: -5 },
        follow: {
          id: "q145-A",
          title: "退了以后",
          beats: [
            {
              scene: "你带着十七盒东西去那个门店，店长很客气，说拆封的不退。你打了投诉电话，最后退了两万四。",
              choice: {
                A: { title: "继续投诉", text: "把这家店弄掉。" },
                B: { title: "退了就算", text: "别再折腾了。" }
              }
            },
            {
              scene: "老人一个月不理你。第二个月又开始去，只是不再买了。有次他回来说：人家那儿有人说话。",
              choice: {
                A: { title: "愣住", text: "原来他要的是这个。" },
                B: { title: "还是生气", text: "三万块买人说话。" }
              }
            }
          ],
          regret: "他那句「人家那儿有人说话」"
        }
      },
      {
        key: "B",
        title: "不吵，陪他去听一次",
        gain: "你见到了那些讲课的人，也见到了满屋子的老人。",
        lose: "你什么都没做，他后来又买了两次。",
        effects: { money: -7, social: 5, happy: 2 },
        follow: {
          id: "q145-B",
          title: "陪他听了一次",
          beats: [
            {
              scene: "讲座在一个酒店的会议室，一百多个老人，前面的人喊口号，后面的人跟着举手。你坐在最后一排，看见你爸的手也举起来了。",
              choice: {
                A: { title: "没打断他", text: "让他高兴完。" },
                B: { title: "当场把他拉走", text: "不能再听了。" }
              }
            },
            {
              scene: "回家路上他没说话。快到家的时候他说：我知道那些东西没什么用。你说那你还买。他说：我知道，可我在家一天没人说话。",
              choice: {
                A: { title: "此后每周去两次", text: "什么都补不了，只能补这个。" },
                B: { title: "说不出话", text: "这句比三万块重。" }
              }
            }
          ],
          regret: "会议室最后一排那个位置"
        }
      }
    ]
  },

  /* ══════════════ q146 年终奖（多选 4） ══════════════ */

  {
    id: "q146",
    title: "年终奖八万，只能分给四件事",
    scene: "八万块，一年就这一次。手机银行打开着，房贷、父亲的牙、孩子的学费、你自己的那张体检单，都在等着。",
    type: "multi",
    pickCount: 4,
    items: [
      { key: "loan", name: "还一部分房贷", tag: "减负", desc: "八万还进去，月供少六百", effects: { money: 6, happy: 3 } },
      { key: "teeth", name: "给父亲做那口牙", tag: "至亲", desc: "他嚼不动东西两年了，一直说不碍事", effects: { money: -5, happy: 8, social: 4 } },
      { key: "school", name: "孩子下学期的学费", tag: "本分", desc: "这笔钱本来就要花", effects: { money: -2, happy: 2 } },
      { key: "check", name: "自己去做次体检查", tag: "身体", desc: "拖了三年，一直没去", effects: { money: -3, health: 9 } },
      { key: "save", name: "存起来，一分不动", tag: "底气", desc: "账上有钱，人才敢说话", effects: { money: 7, happy: 2 } },
      { key: "trip", name: "带全家出去玩一趟", tag: "记忆", desc: "孩子十岁了，没一起出过远门", effects: { money: -6, happy: 11, social: 6 } },
      { key: "repair", name: "把家里那台冰箱换了", tag: "日子", desc: "它响了一年了，你忍着", effects: { money: -4, happy: 5, health: 2 } },
      { key: "parents", name: "给两边老人各包一个红包", tag: "孝顺", desc: "一年就这一次能让他们手里有钱", effects: { money: -5, social: 8, happy: 5 } },
      { key: "self", name: "给自己买件像样的东西", tag: "自己", desc: "你已经五年没给自己买过超过五百块的东西", effects: { money: -3, happy: 9 } }
    ],
    follow: {
      id: "q146",
      title: "分完以后",
      beats: [
        {
          scene: "清单列完，八万还剩一千二。你把这一千二留在卡里，没动。",
          choice: {
            A: { title: "挺好", text: "每一笔都有去处。" },
            B: { title: "有点空", text: "一分没剩给自己。" }
          }
        },
        {
          scene: "过年那天，你爸戴上新牙吃了第一口排骨，吃了很久。他抬头说：这个能嚼动。",
          choice: {
            A: { title: "笑", text: "那就值。" },
            B: { title: "别过头", text: "两年了，他一直说不碍事。" }
          }
        }
      ],
      regret: "那八万块里去不到的地方"
    }
  }

]);

module.exports = window;
