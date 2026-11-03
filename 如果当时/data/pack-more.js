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
