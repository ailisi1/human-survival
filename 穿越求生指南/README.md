# 穿越求生指南：从新石器时代到当代中国

一个**纯静态、零构建、双击即开**的多页面站点：目录页（index.html）+ **每个时代一个独立详情页**（era.html?id=xxx）。内容与渲染彻底分离，新增时代、新增主题、新增配方都只需要"加数据文件 + 在清单里加一行"，**永远不需要改渲染层**。

---

## 一、怎么打开

双击 `index.html` 即可。不需要 `npm install`，不需要本地服务器，不需要任何后端。

- 所有内容都是 `data/` 下的 JS 文件，通过 `<script>` 注入内存，浏览器直接渲染；
- 没有 `fetch`、没有 JSON 文件，因此不存在 `file://` 下的 CORS 问题；
- 没有数据库、没有 localStorage 持久化内容、没有登录与权限系统；
- 搜索、复制配方、目录高亮全部在浏览器内存中完成。

**页面结构**：`index.html` 是总目录（时代卡片 + 分组筛选 + 全站搜索）；点任意时代卡片进入 `era.html?id=xxx`——「恭喜你穿越到 X」详情页，包含该时代全部内容，固定六章：落地须知、**你是哪一种人**、政局与大事、能造什么、致命雷区、行动清单。

---

## 二、目录结构

```
穿越求生指南/
├── index.html                 # 目录页：时代卡片 + 分组筛选 + 全站搜索
├── era.html                   # 详情页模板：era.html?id=qin 显示秦朝
├── css/style.css              # 全部样式（纸墨风、浅色、响应式、打印样式）
├── js/
│   ├── registry.js            # ERAS 数组 + registerEra（同 id 合并）
│   ├── data-manifest.js       # 数据文件清单（★ 新增内容只改这一个清单）
│   ├── loader.js              # 按 manifest 顺序注入 <script>（document.write，file:// 可用）
│   ├── core.js                # 公共层：文本工具 / 块渲染 / 分章 / 复制 / 进度
│   ├── home.js                # 目录页渲染
│   └── era.js                 # 详情页渲染（入境卡 / 六章 / 上下站 / 目录高亮）
├── data/
│   ├── _template/             # 新时代模板：meta.js + content.js
│   ├── 10-neolithic/          # 新石器时代（meta/arrive/survival/technology/dangers）
│   ├── 20-shang/ … 150-qing/  # 一个朝代一个目录
│   │   └── 每朝通常四个文件：meta.js / arrive.js / opportunity.js / technology.js
│   └── 160-gaokao1977/ … 165-ai2022/   # 当代机遇（同样含 arrive.js）
└── README.md
```

目录名的数字前缀只为人眼排序与管理，**实际渲染顺序由 `order` 字段决定**。

每个时代文件的主题分工：

| 文件 | 写什么 |
| --- | --- |
| `meta.js` | 表头：id / order / group / name / intro / difficulty + 底层规则速览 |
| `arrive.js` | 落地：睁眼第一分钟、四种活法、头 30 天、最常见的三种死法 |
| `identity.js` | **身份：这个时代有哪几种人，各自怎么活**（「你是哪一种人」章，每朝一份） |
| `opportunity.js` | 政局：大事时间线、加入谁、提前投资谁、避坑、行动清单 |
| `technology.js` | 配方：以当时工艺与材料可复制的物品（肥皂、盐、铁、纸……） |
| `recipe-more.js` / `recipe-more2.js` | **配方补卷：同章追加的配方**（每份三则，部分朝已有第二份）。`registerEra` 会合并同一 id 的 blocks，所以补内容永远新开一个文件，不改原文件 |
| `politics-more.js` | **政局补块**（隋、元各一份）：原五卷没展开的制度问题，`cat: 机遇` 归「政局」章 |
| `more.js` | **当代六站补块**：每份 9 块——六块补原有四章 + 三块 `cat: 失效` 归「失效的东西」章 |
| `dangers2.js` | **雷区补卷**（21 朝各一份）：一张「N 种人，N 种死法」的清单，身份名与 `identity.js` **逐字一致**，加一段「伤、病、急症」——这个时代手上有什么、怎么用、哪些做法是送死 |
| `craft.js` | **当代六站专用：以当时的条件能"造"出什么**（配方章，不造器物而造产品与服务） |
| `survival.js` / `dangers.js` | （新石器示范用）生存要点 / 致命雷区，任意命名均可 |
| `epoch.js` | （新石器示范用）史前大事年表与"押哪个聚落"，补「政局」章 |

---

## 三、设计约束（为什么这样拆）

| 约束 | 实现方式 |
| --- | --- |
| 数据与渲染彻底分离 | `core.js / home.js / era.js` 只读取 `window.ERAS`，不含任何时代内容 |
| 两个页面共享同一份数据清单 | 数据路径只写在 `js/data-manifest.js` 一处，`loader.js` 用 `document.write` 按序注入（解析期同步执行，file:// 与 http:// 都成立） |
| 一个时代可拆多个文件 | 每个文件只负责一个主题，都调用 `registerEra({ id: '同一 id', ... })` |
| 支持增量合并 | `registry.js` 中同 id 多次调用会合并：元信息后写覆盖，`blocks` 追加 |
| 新增内容零改动渲染 | 新建数据文件 → 在 `js/data-manifest.js` 加一行路径 |
| 排序与加载顺序无关 | 所有文件加载完后，页面才按 `order` 升序排序 |

`registerEra` 的合并规则（见 `js/registry.js`）：

```js
// 第一次调用：创建
window.ERA_MAP[id] = { id: id, blocks: [] };

// 元信息：除 id/blocks 外的所有字段都合并，后写覆盖先写
// （name / years / group / difficulty / intro / fullName / greet / arriveTitle …均可）
Object.keys(patch).forEach(k => {
  if (k === 'id' || k === 'blocks') return;
  if (patch[k] !== undefined) era[k] = patch[k];
});

// 内容块：追加，不覆盖
if (Array.isArray(patch.blocks)) era.blocks = era.blocks.concat(patch.blocks);
```

因此 `blocks` 的最终顺序 = **manifest 里的文件顺序 + 文件内数组顺序**。想让某段内容排前，就把它所在文件的路径在 manifest 里放前面，或直接写进 `meta.js`。

---

## 四、新增一个时代（3 步）

1. 复制 `data/_template/` 为 `data/160-your-era/`，改 `meta.js` 的 `id`、`order`、`group`、`name`、`intro`、`difficulty`，建议同时补 `arrive.js`（fullName / greet / 落地四件套）；
2. 打开 `js/data-manifest.js`，加一行路径：

```js
  'data/160-your-era/meta.js',
  'data/160-your-era/arrive.js'
```

3. 刷新页面。目录页卡片、排序、全站搜索、统计数字、详情页上下站都会自动更新。

## 五、给已有时代新增一个主题（2 步）

1. 新建 `data/50-qin/clothing.js`：

```js
registerEra({
  id: 'qin',                 // 必须与 meta.js 一致
  blocks: [
    { type: 'text', title: '衣物与保暖', text: '……' },
    { type: 'recipe', title: '鞣制兽皮', tag: '衣物', time: '3 天',
      materials: ['兽皮', '脑浆或动物脂肪', '木烟', '刮刀'],
      steps: ['刮净肉膜……', '涂抹脂肪揉搓……', '烟熏……'],
      notes: ['第一道刮膜不彻底，整张皮会变硬。'] }
  ]
});
```

2. 在 `js/data-manifest.js` 该时代那一段加一行 `'data/50-qin/clothing.js'`。

渲染层不需要任何改动。详情页本页目录、六章分组、全站搜索都会自动收录。

---

## 六、内容块类型（数据模型）

所有块都支持可选 `title` 与可选 `section`（强制归入某一章：`land / role / power / craft / risk / plan`）。

| type | 字段 | 说明 |
| --- | --- | --- |
| `text` | `text` | 段落。空行分段，支持 `**加粗**` 与 `` `代码` `` |
| `list` | `items: string[] \| {t,d}[]` | 无序列表，`t` 为粗体前缀、`d` 为说明 |
| `steps` | `items: string[]` | 有序步骤，自带「复制步骤」按钮 |
| `recipe` | `materials` `steps` `notes` `tag` `time` `level` | 配方三段式，自带「复制配方」 |
| `table` | `head: string[]` `rows: string[][]` | 表格，窄屏横向滚动 |
| `callout` | `tone: danger\|warn\|info\|good` `text` `mark?` | 提示框，左侧色条 + 角标 |
| `checklist` | `items: string[]` | 可勾选清单，自带「复制清单」 |
| `timeline` | `items: {time,text}[]` | 时间线 |

块的 `cat` 字段决定它归入详情页的哪一章：

| 章 | 归入的 cat |
| --- | --- |
| 一 落地须知 | `落地` `要点` `提示` |
| 二 你是哪一种人 | `身份` |
| 三 政局 · 大事 · 站队 | `机遇` `时间线` `对照表` |
| 四 以当时的水平能造什么 | `配方` `步骤` |
| 五 致命雷区 | `避坑` |
| 六 失效的东西 | `失效`（只有当代六题有；古代题没有这一章，渲染时自动跳过不留白） |
| 七 行动清单 | `行动清单` |

未标注 `cat` 时按类型自动归类（recipe→配方、checklist→行动清单……）。勾选状态只存在于当前页面内存中，刷新即清空——这是刻意的：站点不存储任何用户数据。

---

## 七、交互功能

- **目录页**：时代卡片按分组排列；分组 chips 一键筛选；全站搜索匹配时代名、年代、导语与全部块文本；`/` 聚焦，`Esc` 清空；
- **详情页**：入境卡（恭喜你穿越到 X / 年代 / 难度 / 氛围句 / 数据）、左侧本页目录（滚动高亮自动跟随，窄屏变吸顶章节条）、上一站 / 下一站卡片；
- **键盘**：详情页按 `←` `→` 直接切上一站 / 下一站；
- **复制**：配方 / 步骤 / 清单一键复制为纯文本（Clipboard API 失败回退 `execCommand`，file:// 下可用）；
- **深链接**：`era.html?id=qin#qin-b3`、`era.html?id=qin#sec-craft` 直接定位到块或章节；
- **打印**：隐藏导航与按钮，内容分块避免截断。

---

## 八、内容说明

- 古代部分的配方以"在原始条件下可复现"为标准，温度、比例、时间均为常见实践经验值，**不保证一次成功**；
- 当代部分为历史复盘，**不构成任何投资建议**；文中已标注当年政策的真实门槛与风险（认购证、房改、股市相关章节均有标注）；
- 所有内容仅作科普与写作演示，请勿据此进行危险操作（尤其是烧灼伤口、采食野生菌等条目）。

---

## 九、后续可扩展方向

- 每个古代时代继续加主题文件（`clothing.js`、`medicine.js`、`money.js`……）；
- 新增时代：`155-minguo`、`85-newenergy2020` 等，只加数据文件 + manifest 一行；
- 新增块类型（如 `compare`、`quote`）：在 `core.js` 的 `RENDER` 表里加一个函数即可，旧数据不受影响；
- 若需要全文导出，可在浏览器控制台读取 `window.ERAS` 自行序列化——站点本身不提供下载功能。
