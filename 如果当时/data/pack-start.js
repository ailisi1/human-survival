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
