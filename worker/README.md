# 访问计数 Worker

门户页脚那个「已有 N 人到访」的数字，来自这里。

一个 Cloudflare Worker + 一个 KV 命名空间，二十来行逻辑，免费额度对个人站绰绰有余。

---

## 一、它做什么

| 接口 | 方法 | 返回 |
|---|---|---|
| `/hit` | POST | `{"ok":true,"total":12,"today":3}` 计数 +1 |
| `/stats` | GET | 同上，只读 |

存储只有一个 KV key（`stat`），值是：

```json
{ "n": 12, "d": "2026-11-01", "dn": 3 }
```

`n` 累计人数，`d` 今天日期，`dn` 今天人数（跨天自动归零）。每次上报只写一次 KV。

**为什么不用 Cloudflare Pages Functions**：Pages 的 Functions 要靠 git 构建或 Wrangler 上传才会编译，用「拖拽文件夹」上传的产物里放 `functions/` 是不生效的。独立 Worker 不受这个限制，也方便单独换。

---

## 二、部署（Dashboard 点选，不用装任何东西）

### 1. 建 KV 命名空间

Cloudflare 后台 → 左侧 **Storage & Databases** → **KV** → **Create instance**
- 名字：`renjian-hit`
- 建完记下它的名字就行，绑定的时候会选

### 2. 建 Worker

**Workers & Pages** → **Create application** → **Create Worker**
- 名字：`renjian-hit`
- 点 **Deploy**（先用默认代码）

### 3. 把代码贴进去

进去后点 **Edit code**，把本目录 `index.js` 的全部内容覆盖掉编辑器里的默认代码，**Deploy**。

### 4. 绑 KV

Worker 页面 → **Settings** → **Bindings** → **Add** → **KV namespace**
- Variable name：`HIT`（必须一字不差，代码里写的就是这个）
- KV namespace：选第 1 步建的 `renjian-hit`

### 5. 设允许来源

同一个 Settings 页的 **Variables and Secrets** → **Add**
- 名字：`ALLOW_HOSTS`
- 值：`你的域名`，例如 `renjian.pages.dev,renjian.example.com`

逗号分隔，不要写 `https://`，不要写路径。代码会自动放行它的子域（`abc.renjian.pages.dev` 这类预览域名也能用）。

**不设这一项等于谁都能调你的接口。** 本地调试可以先空着，正式上线务必填。

### 6. 拿到地址

Worker 页面顶部就是它的地址，形如：

```
https://renjian-hit.你的子域.workers.dev
```

---

## 三、部署完还要改两处

### 1. 填进前端

打开 `portal/hit.js`，改这一行（结尾不要斜杠）：

```js
var ENDPOINT =
  window.HUB_HIT_ENDPOINT || "https://renjian-hit.你的子域.workers.dev";
```

### 2. 重新打包

```bash
node portal/pack-deploy.js
```

然后按 README 的方式重新上传 `_deploy`。

刷新门户，页脚就会多出一行「已有 N 人到访」。第一次访问是 1。

---

## 四、命令行部署（可选）

```bash
cd worker
npx wrangler login
npx wrangler kv namespace create HIT
# 把打印出来的 id 填进 wrangler.toml 的 [[kv_namespaces]] id
# 顺便把 [vars] 里的 ALLOW_HOSTS 填好
npx wrangler deploy
```

改了 `wrangler.toml` 里的变量要重新 `deploy` 才生效。

---

## 五、本地自测

不需要 Cloudflare 账号，KV 用内存 Map 顶替。

```bash
node worker/test-local.mjs
```

覆盖 20 项：计数自增、跨天归零、存储损坏不报错、KV 写失败优雅降级、未知路径 404、方法错 405、OPTIONS 预检、来源白名单、子域放行、CORS 回填。

联调前端（看页面上那行字真的出来）：

```bash
node worker/dev-server.mjs            # 终端 1，假 Worker 在 8791
python -m http.server 8080            # 终端 2，在项目根
# 浏览器打开 http://localhost:8080/worker/test-page.html
```

`test-page.html` 里用 `window.HUB_HIT_ENDPOINT` 把地址指到本地，不用改 `hit.js`。

---

## 六、行为约定

**会静默什么都不做的三种情况**（元素保持隐藏，不报错、不留空行）：

- `portal/hit.js` 里还没填 ENDPOINT
- 用 `file://` 双击打开本地文件
- 请求失败（离线、Worker 挂了、额度用完）

也就是说，本地双击看站点的体验完全不受影响。

**去重**：同一浏览器同一天只上报一次（`localStorage` 记日期），之后只读不写。所以这个数接近「按日去重的到访人次」，不是 PV。

**不收集身份**：不记 IP、不写 cookie、不存 UA。只有一个自增的整数。

---

## 七、额度与上限

| 项目 | 免费额度 | 说明 |
|---|---|---|
| Worker 请求 | 10 万次/天 | 远够 |
| KV 读 | 10 万次/天 | 每次页面加载读 1 次 |
| **KV 写** | **1000 次/天** | 每个新到访写 1 次，**卡在这里** |

也就是说，一天最多记到约 1000 个新到访。超了不会报错——数字停在那儿不动，页面照常显示。

个人站基本碰不到。真碰上被转发爆了，两条路：

1. 换 **D1** 存（免费 10 万行写/天，SQL 原子自增，还不会有并发丢数）；
2. 直接看 Cloudflare 后台的 Web Analytics，它统计的访问量不受这个限制。

---

## 八、想看更细的数据

这个 Worker 只负责页面上那一个数字。来源、热门页面、地区、设备这些，去 Cloudflare 后台开 **Web Analytics**：

**Workers & Pages** → 选你的 Pages 项目 → **Metrics** / **Analytics** → 开启 Web Analytics

免费、不用改代码、不用 cookie（没有 Cookie 提示条的问题），数据保留 30 天。两边可以同时用，互不干扰。
