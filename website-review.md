# PepperCraft 官网评审报告

> 评审对象：PepperCraft 官网（Vue 3 + Vite + fullpage.js），本地 dev server + 生产构建 + 线上 `web.pcraft.eu.org` 三重核查
> 评审日期：2026-08-22 · 产出：仅建议报告，未改任何代码
> 截图证据：`/tmp/desk-{0..6}.png`（桌面 1440×900）、`/tmp/tab-{0..4}.png`（平板 820×1180）、`/tmp/mob-{0..6}.png`（移动 390×844）

---

## 结论速览

整体质量很高：设计系统克制统一、配色对比度全部达标、双 API 容灾、响应式断点细致、文案讲究、CI 全绿（测试 + 构建）。问题集中在 **4 个高优先级项**，其中两个是数据/许可类硬伤，一个是真实的平板端交互 bug，一个能把首屏体积砍掉 90%+。

---

## 🔴 高优先级

### 1. 页面图片总重 12.66 MB —— 首屏就要 1.9 MB，最大的性能问题

**证据（构建产物 `dist/assets/` + sharp 实测压缩率）：**

| 文件 | 用途 | 当前 | WebP(q80) | AVIF(q50) |
|---|---|---|---|---|
| bg.png 1920×1080 | 屏1 Hero 背景（CSS 背景，**立即加载**） | 1 954 KB | **171 KB** | 93 KB |
| Redstone.png 1920×1080 | 屏2 右侧主视觉 | 4 442 KB | 95 KB | 59 KB |
| Residence.png 1920×1312 | 屏5 背景（**opacity: 0.07**，几乎不可见） | 3 355 KB | 129 KB | 87 KB |
| photo.png 1920×1298 | 屏3 主视觉 | 2 943 KB | 108 KB | 71 KB |
| Image-1.jpg 2560×1340 | 特色卡头（显示区约 350×132 px） | 236 KB | 125 KB | 82 KB |
| Image-2.jpg 1333×750 | 特色卡头 | 133 KB | 81 KB | 51 KB |
| **合计** | | **≈ 12.7 MB** | **≈ 709 KB** | ≈ 443 KB |

线上实传验证一致（curl 实测 12.66 MB / HTML 1.4 KB / JS 73 KB gz / CSS 8.6 KB gz）。

**影响：**
- 首屏 LCP 依赖 1.9 MB 的 bg.png（hero 是 CSS `background`，天然无法 `loading="lazy"`，页面解析即下载）。4G 下首屏白等 2–4 秒；12.7 MB 完整浏览 ≈ 20 秒+。
- Residence.png（3.3 MB）只在屏5 以 **7% 透明度** 做气氛底——投入产出严重失衡。

**建议（按收益排序）：**
1. 四张 PNG → WebP/AVIF（`vite-plugin-image-optimizer`/`sharp` 一行接入即可，-90% 以上）；`<picture>` 里 AVIF 优先、WebP 兜底。
2. Image-1.jpg 从 2560×1340 缩到 800 宽再转 WebP（显示区才 350×132）。
3. Hero 背景在 `<link rel="preload" as="image">` 预加载（若转 WebP 后可考虑 `image-set()` 按视网膜密度分档）。
4. Residence.png 直接砍掉或换 200 KB 内的扁平低糊图（7% 透明度下没人看得出细节）。

---

### 2. fullpage.js License：`licenseKey: 'GPLv3'` 在 v4 无效 + 隐藏署名有合规风险

**证据：**
- 控制台（桌面、移动均复现，每次加载 2 条）：
  ```
  fullPage: Incorrect `licenseKey`. Get one for fullPage.js version 4 here:
  fullPage: https://alvarotrigo.com/fullPage/pricing
  ```
- 安装的 fullpage.js 4.0.41 源码 `isOK()` 会校验 key；`'GPLv3'` 是 **v3 时代的写法**，v4 不认。
- `src/styles/main.css:315-320` 隐藏了官方 credits 水印（`.fp-watermark { display: none !important }`），README 注释写「GPLv3 下无需保留署名」——但 fullpage.js README（node_modules 第 717 行）明确：GPLv3 许可下**必须**提供 prominent notice，官方推荐保留 `credits.enabled`。
- 仓库 `package.json` 依赖是 `fullpage.js: ^4.0.41`（v4）。

**影响：** 所有访客控制台报错（低危但极显眼）；`licenseKey` 无效时水印逻辑回退，目前肉眼看不见水印只是 CSS 强隐；若服务器涉及任何商业行为（赞助/付费），GPLv3「非商业用途」条款边界需小心，v4 付费许可更稳妥。

**建议：**
1. 去 fullpage.js 官网用开源项目身份[申请免费 GPL license key](https://alvarotrigo.com/fullPage/extensions/requestKey.html)，替换 `licenseKey: 'GPLv3'` → 控制台错误消失。
2. 拿到有效 key 后，要么保留 credits 水印（官方推荐），要么 `credits.enabled: false` + 在页脚显著位置标注「本站使用基于 GPLv3 许可的 fullPage.js」。
3. 如未来商业化（哪怕赞助），改用付费商用许可。

---

### 3. 平板宽度（≈769–900px）滚轮/键盘翻页卡死在「运行状态」屏

**证据（Playwright 真实 Chromium，820×1180 视口稳定复现）：**
- PageDown / 滚轮滚到屏2 后：`.fp-section.active` 停在「稳定运行中」，wrapper transform 不再变化，**永远无法继续**；
- 该屏被 fullpage 标记 `fp-is-overflow fp-completely`（判定有内部溢出），但实测 `.fp-overflow` 的 `scrollHeight == clientHeight`（**假溢出**——初始化时量出溢出，内容随后收缩，内部滚动成为空操作，键盘/滚轮事件被吞）；
- 同尺寸下点导航「关于」可正常跳转（store 的 `goToId` 不受影响）；
- 桌面 1440×900、移动 390×844 均正常。
- 根因倾向：CSS 断点在 ≤900px 就把分栏翻转为上下堆叠，而 fullpage 的 `responsiveWidth: 768` 让 769–900px 区间 **仍处全屏分页模式**——两个断点不一致。

**影响：** iPad 竖屏/窄窗用户 50% 概率撞上：翻到状态屏后滚轮、PageDown 全部失灵，只能点导航。属于会真实发生的交互性故障。（同区间「特色玩法」屏是真溢出：内部可滚但需多按一次才换屏，属次优体验而非故障。）

**建议：**
1. 首选：`responsiveWidth` 从 768 提到 **900**，与 CSS 断点对齐——769–900px 直接退化为原生滚动（CSS `@media (max-width: 900px)` 已按原生滚动写好，`goTo` 也已有 responsive 分支），一行解决；
2. 或 `scrollOverflow: false` + 保证该区间内容必然放得下（需逐一验证各屏高度，风险高）。

---

## 🟡 中优先级

### 4. 状态卡 MOTD 在主 API 路径上永远取不到（实际显示的是代理版本号）

`src/stores/status.ts:54` 取 `data.motd ?? data.description`，但 uapis.cn 实测返回字段是 **`motd_clean` / `motd_html`**（无 `motd`、无 `description`）→ `normalizeMotd(undefined)` 恒为 `null` → UI 落回 `motd || version`，显示 **"Velocity 1.7.2-26.2"**（见 `/tmp/desk-1.png`）。服务器真实 MOTD 是「Pepper❤Craft | 26.1.2 简洁,创新」却没有展示——主广告位被一个玩家看不懂的代理版本号顶替。
**建议：** `data.motd_clean ?? data.motd_html` 优先取 `motd_clean`（当前备用 API 分支没这个问题）。

### 5. 最大人数 `maxPlayers` 只从备用 API 更新 → 常显 "/ 1000"（实际 2333）

`status.ts:45-57` 主 API 分支不更新 `maxPlayers`，只有 `mcstatus` 分支（74-77 行）更新；uapis 在线期间 maxPlayers 永远是初始值 1000（实测 `/tmp/desk-1.png` 显示 "0 / 1000"，两个 API 均报告 max=2333）。`SITE.maxPlayers = 1000` 也过期。
**建议：** 主 API 分支同样读 `data.max_players`；顺带把 `SITE.maxPlayers` 改为 2333 或删除该常量（有单测引用时同步）。

### 6. 首个特色卡头图裁到「雾天白空」带，视觉发白无信息

Redstone.png 作卡头（132px 高，`object-fit: cover` 默认 center），裁到图片中部的高亮雾天天空（`/tmp/desk-3.png` 第一张卡顶部近乎灰白）。同图在屏2 整幅使用时观感尚可，卡头版本则几乎丢失内容。
**建议：** 该卡头 `object-position: bottom`（建筑集中在画面下半）或换成 Image-1/Image-2 同类夜景图。

### 7. 版本文案与服务器现状不一致

站点多处写「1.21+ / 最新版（跨版本支持）」「运行最新高版本」，而服务器 MOTD 显示 **26.1.2**（新版命名规则），状态屏则展示代理名 "Velocity 1.7.2-26.2"。玩家会把三者混读。
**建议：** 版本号改为从 API 读到后才展示（状态屏已有 `version` 字段），静态文案改为「最新高版本」+ 以状态卡为准；或至少同步 `SITE.version`。

### 8. SEO 基础项补齐

已有：`description` / `og:*` / `theme-color` / robots.txt / sitemap.xml / favicon / hash 路由（GitHub Pages 友好）✓。
缺失：
- `<link rel="canonical">`；
- JSON-LD 结构化数据（`GameServer`/`VideoGame` 类型，可带 ip/players/version/难度）——Minecraft 服务器站做 SERP 展示的通行做法；
- `twitter:title` / `twitter:description`（现在只声明了 card）；
- `og.jpg` 231 KB 可压到 ~60 KB（分享场景才用，非首屏）。

### 9. CopyButton 无读屏反馈

`src/components/CopyButton.vue` 复制后仅按钮文字变化，「已复制」无 `aria-live`，读屏用户大概率无感知。一行修复：按钮加 `role="status"` 或外层 `aria-live="polite"`。

---

## 🟢 低优先级 / 锦上添花

1. **移动端汉堡菜单**：缺 Esc 关闭、打开时背景滚动锁定、点击遮罩关闭（`NavBar.vue`，约 3 行 JS）。
2. **QQ 群外链**是 `qun.qq.com` 首页，用户要手动搜群号；群主可生成 `qm.qq.com` 群卡片直链。腐竹 QQ 卡片是纯文本，可加「一键复制」。
3. **GitHub Pages 静态资源缓存**默认 `max-age=600`，但文件名带内容 hash——若在意可加 `_headers` 或迁 Cloudflare Pages（Cloudflare 前置已部分缓解，纯提升项）。
4. **无访问统计**：若接受第三方，隐私友好的 Umami/Plausible 加一行即可；公益服运营可据此看「立即加入」点击归因。
5. **backdrop-filter 多处使用**（导航/事实条/加入卡/uptime 卡），低端安卓可能掉帧——可选优化。
6. 屏序号水印 `01/05/…` 在部分大图上近乎不可见（0.05 白），建议配合图片加深后微调，纯审美。

---

## ✅ 做得好的地方（值得保留）

- **配色系统**：绿=主行动、蓝=信息、暖色只做光效，职责分明；实测全站文字对比度最低 5.3:1（text-3 on bg-2），**全部达标 WCAG AA**，大部分 AAA。
- **系统字体策略**（main.css 注释详尽）：不用 Google Fonts、不塞 1–2 MB 字体文件，用 PingFang/YaHei + Consolas 拿家族对比——对大陆用户是正确取舍。
- **状态容灾**：双 API + `AbortSignal.timeout(8000)` + 降级时**保留上次数据**、只标记「状态暂不可用」，不误报「服务器消失」；「等待玩家上线」的文案也细心。
- **可访问性基础**：`aria-expanded/aria-controls/aria-live/aria-label`、`focus-visible` 描边、`prefers-reduced-motion` 全量处理、语义化标题层级。
- **工程**：CI 跑测试+构建、hash 路由避免 GitHub Pages 404、`base: './'` 支持子路径、`loading="lazy"` 已用在非首屏 `<img>`。

---

## 最值得先做的 3 件事

1. **图片转 WebP/AVIF（约半天）**：12.7 MB → ~0.7 MB，首屏 2–4 秒 → <0.5 秒，顺带把 Residence.png 砍掉。性价比全场最高。
2. **修状态卡两个数据问题（约 1 小时）**：`motd_clean` 字段 + `maxPlayers` 主备分支更新——让「运行状态」屏的数据名副其实，替换掉误导性的 "Velocity 1.7.2-26.2"。
3. **`responsiveWidth: 768 → 900`（一行改动）**：消除平板 769–900px 的翻页卡死；同时申请 fullpage.js GPL key 消掉控制台报错（算同一波许可收尾）。

---

## 实施记录（2026-08-22 · 按用户指示全部落地）

### ✅ 已修改并验证

| # | 问题 | 修改 |
|---|---|---|
| 1 | 图片重量 12.66 MB | 6 张图全部转 WebP（sharp q80；Residence 缩 1200w q70）、og.jpg 缩 1200w q75（49KB）；删除原 PNG/JPG；Hero 背景改 `<img fetchpriority="high">`（HTML 解析即下载，优于 CSS 背景等 CSSOM）；**dist 合计 ~490KB（-96%）** |
| 2 | fullpage 许可 | 页脚加「基于 fullPage.js（GPLv3）构建」prominent notice；licenseKey 注释写明申请路径。~~撤掉 `.fp-watermark` 强隐~~ → **2026-08-22 业主决定暂不申请 key：按业主决定再次隐藏水印**（`body .fp-watermark { display:none !important }`，注释中保留 GPLv3 风险说明；若未来商用/赞助，请购买商用许可） |
| 3 | 平板 769–900px 翻页卡死 | `responsiveWidth: 768 → 900`，与 CSS 断点对齐；**Playwright 820×1180 实测 PageDown 连续滚动至底（scrollY 6828 = maxScroll）** |
| 4 | MOTD 恒为 null | 主分支改 `motd_clean ?? motd_html ?? motd ?? description`；实测状态卡显示「Pepper❤Craft \| 26.1.2 简洁,创新」 |
| 5 | maxPlayers 恒 1000 | 主分支读 `max_players`；默认值改 `SITE.maxPlayers = 2333`；实测「2 / 2333」 |
| 6 | 卡头裁到天空带 | Redstone 卡头 `object-position: center bottom`（实测显示红石机械内容） |
| 7 | 版本文案过时 | `SITE.version` →「最新高版本（跨版本支持）」；`SITE.motd` 同步真实 MOTD |
| 8 | SEO | + canonical / twitter:title / twitter:description / GameServer JSON-LD；og:image 尺寸声明同步 1200×628 |
| 9 | CopyButton 读屏 | 按钮内加 `role="status"`（隐含 aria-live=polite）播报位 |
| 10 | 低优先级 | 汉堡菜单：Esc 关闭 + 打开时 body 滚动锁 + 遮罩点击关闭（≤960px）+ 回桌面自动收起；腐竹 QQ 卡加一键复制；backdrop-filter 无支持时 @supports 实心底回退（导航/hero-badge/hero-facts/join-card/uptime 单元）；屏序号水印 0.05→0.08 |
| 11 | 图片质量（业主反馈"有点差"） | 6 张图从 sharp q80/q70 + 4:2:0 色度抽样提升为 **q88–q90 + 4:4:4**（Residence 1200w→1600w；bg/photo/Redstone 保持 1920w 原分辨率；Image-1/2 800w），og.jpg q75→q85 1200×628；肉眼对比：hero 天空/AI 云更饱和无灰蒙、合影紫青肤色与灯笼光更实、Redstone 雾气细节更清晰；dist 图片合计 ~756KB（原 ~490KB，增幅在 GH Pages 可接受范围） |
| 12 | 高分辨率表现（业主反馈"不尽人意"） | ① **srcset 三档适配**：bg/photo/Redstone 各增 2560w/3840w 版本（lanczos3 放大 + 轻锐化，webp 4:4:4），hero `sizes=100vw`、分屏图 `sizes=(max-width:900px) 100vw, 42vw`——实测 4K 取 3840w 档（1:1 无拉伸）、retina 2x 取 3840w、1080p 仍只下载 1920w（237KB，成本不变）；② **≥2880px 超高屏设计缩放块**（HomeView/main.css/NavBar/状态卡/时长卡同步）：导航 64→80px、按钮 15→19px、hero 标题上限 120→210px、屏标题上限 40→88px、状态数 76→110px 等，只放大不改设计语言 |
| 13 | 矮视口整屏裁切（业主截图：标题被推出画面、每屏要滚两次） | 根因：fullpage 默认把内容垂直居中（fp-table），内容高于视口时居中溢出把**顶端推出画面且不可滚回**（flex 居中「死区」）。修复三层：① `#fullpage .fp-overflow { justify-content: safe center }` 全局兜底（溢出自动顶部对齐，标题永远可见）；② `.split-copy` 垂直内边距改 vh 流式（1080 高≈原值，矮视口自动收紧）；③ `@media (min-width:901px) and (max-height:899px)` 紧凑模式（状态卡/时长卡/标题/特色卡收缩）。真浏览器滚轮实测 **1920×935 / 1536×864 / 1366×768 / 1920×1080 四档全部 clipTop=clipBottom=0**：每屏一次滚轮直达、无屏内滚动、无裁切；移动端 390×844 无横向溢出回归；4K 档不受影响 |

**验证**：`npm test` **38/38 绿**（新增 11 个红绿回归测试：status 真实字段、fullpage 配置、Hero img、卡头取景、SITE 版本契约、CopyButton、NavBar 菜单交互、SEO 元信息）；`npm run build` 通过；`npm run lint` 通过；Playwright 真 Chromium 三档视口实测（平板滚动到底、桌面翻屏、移动菜单交互全部正常，控制台除 2 条已知 license 报错外 **0 错误**）；截图 `/tmp/{hero,status,features,desk,tab,mob}-fix*.png`。

### ⏳ 无法纯代码完成，保留给业主（各 2 分钟）

- **fullpage.js 免费 GPLv3 key**（**业主已决定暂不申请**）：水印已按决定隐藏（页脚署名保留）；若将来想消掉控制台 2 条 license 报错或涉及商用，再走 https://alvarotrigo.com/fullPage/extensions/requestKey.html 或购买商用许可。
- **GitHub Pages 缓存/头配置**：GH Pages 不支持 `_headers`，需在 Cloudflare 前置的控制台加 Cache Rules（纯提升项）。
- **访问统计**：Umami/Plausible 需注册/自托管（若接受第三方）。
- MOTD 第二行被 `max-width: 46%` 省略号截断：如想完整展示可改截断策略（纯审美）。

> 2026-08-22 追加：QQ 群链接已由 `qun.qq.com` 首页换成**群分享卡片直链**（`qun.qq.com/universal-share/...`），联系卡/FAQ/页脚三处同步；对应低优先级第 2 条（原 qm.qq.com 建议）已闭环。

---

## 附：评审规格（本报告对应的交付契约）

- 目标：全面评审 PepperCraft 官网（视觉/UX、技术/性能、SEO/可访问性、内容转化），输出带证据的优先级建议清单，不修改代码。
- 验收：本报告含优先级分组、每条含问题/影响/证据/建议改法；已覆盖桌面 1440×900、平板 820×1180、移动 390×844 实机截图；已做生产构建与线上资源实测；末尾给出 Top 3。
- 例外说明：状态 API 数据为评审时刻抓取（服务器在线 0/2333，双源一致）；「无访问统计」「换托管」等建议项超出「不改代码」范围，仅作建议。
