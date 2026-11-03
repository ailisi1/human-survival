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
