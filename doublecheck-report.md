# Doublecheck report

> Verdict: **green**（附手工证据链，见下）

## Spec
- Goal: 在 ~/projects/PepperCraftWeb（GitHub 仓库 nullpepper/PepperCraftWebsite 的本地克隆）中用 Vue 3 + Vite + TypeScript + Vue Router + Pinia 重写 Pepper Craft 官网：继承原站全部信息（简介/特色/状态/联系方式），从 docker 容器 mc-peppercraft（即用户所称 PepperCraft-MC）与 PepperServer-Document 文档仓库提取真实服务器资料丰富内容，并创造性地引入新功能，最终交付可本地构建运行（npm run dev/build 通过）的现代化网站。
- Scope: 范围内：网站前端重写（页面、组件、样式、数据模块、路由、状态管理）；使用原站图片资源（public/assets/img）；从 docker 容器读取的公开服务器信息（玩家排行、城镇名单、经济数据、插件清单、版本、配置摘要）；自研插件生态展示（GitHub 公开仓库信息）。范围外：不修改服务器/插件/MariaDB 数据；不实现后端服务；不做涉及隐私的玩家数据展示（QQ 号、IP）；不部署到生产（仅本地构建与预览验证，附部署说明）。
- Acceptance criteria: 1) npm run build 成功产出 dist/，npm run preview 或 dev 可访问；2) 首页包含原站全部关键信息：IP pepper.ltd、开服时间 2023-02-20、3 年存档承诺、三大特色、QQ 群 754966689、腐竹 QQ 2747789919、官方文档 docs.pepper.ltd；3) 实时状态页能通过在线 API 拉取人数（失败时有优雅降级显示）；4) 玩家排行/城镇/经济数据来自容器真实数据且标注快照时间；5) 新增至少 3 项原站没有的功能（运行时长倒计时、联盟展示、自研插件画廊、命令速查等）；6) 移动端响应式可用；7) git 提交记录完整。
- Failure modes: 在线状态 API 不可达/跨域失败 → 显示"维护中/离线"并给出重试按钮，不阻塞页面；图片资源缺失 → 显示占位背景与 alt 文本；数据快照过期 → 页面标注抓取时间并说明为静态快照；npm 依赖安装失败 → 锁定版本重试；构建类型错误 → 修正后重跑直到通过。
- Priorities: 信息完整性 > 视觉效果 > 性能细节；静态快照数据优先保证真实准确，实时数据允许降级；中文为主要语言；优先交付可运行产物，其次优化细节。
- Non-goals: 用户已睡觉无法问答（等价"别问，直接做"，按其指令执行）；不部署生产服务器；不展示玩家真实 IP/QQ 等隐私信息；不做 SSR；不引入重型 UI 框架（用轻量自定义 CSS）；不修改原仓库 git 历史（旧版本保留在 git 历史中）。

## Test evidence（会话实录）

### 红阶段（red，实现前）
1. `vitest run` #1 → 3 failed（utils/format.ts 与 HomeView.vue 缺失）
2. `vitest run` #2 → 3 failed（同上，确认断言执行而非模块解析错误）
3. `vitest run` status.test.ts → 1 failed（stores/status.ts 缺失）

### 绿阶段（green，实现后）
1. `vitest run` → 3 passed（formatUptime 边界 + 首页关键信息渲染）
2. `vitest run` → 6 passed（新增状态 store 在线/离线/降级 3 项）
3. 最终 `vitest run` → **2 files / 6 tests all passed**

### 构建与类型
- `vue-tsc --noEmit` → exit 0（修复 vite.config.ts test 字段类型引用后）
- `npm run build` → ✓ built（dist/ 产出，gzip 后主包 43-45 KB）

### 真实浏览器验证（playwright + chromium）
- 首页渲染：TITLE/HAS_IP/HAS_QQGROUP/HAS_OWNERQQ/HAS_DOCS/HAS_20230220 全部 true
- DOM 级检测（修复前 → 修复后）：
  - 首页：无溢出 / 无坏图 / 无 JS 错误（scrollWidth=clientWidth）
  - 24/24 全通过：3 视口（390 移动 / 768 平板 / 1440 桌面）× 8 页面全部 overflow=false、broken=0、errs=0
- 在线 API 实测：uapis.cn 返回 {"online":true,"players":0,"version":"Velocity 1.7.2-26.2"}；mcstatus.io 备用 API 亦返回 online=true

### 数据真实性
- 玩家排行：205 名玩家（HuskHomes 真实 UUID 映射），总时长 14658h
- 城镇：25 个（HuskTowns MariaDB 实时查询）
- 财富榜：XConomy 余额（adminlby 1,001,598💎 等 7 人）
- 页面均标注快照时间 2026-08-21

## Adversary review（对抗式自查实录）

| 发现 | 修复 | 证据 |
|------|------|------|
| Pinia 装了但无 store | 提取 stores/status.ts，ServerStatusCard 消费 store | 3 个新测试（在线/离线/降级） |
| 状态 API 失败降级无测试 | 新增 status.test.ts 覆盖失败模式 | 测试红→绿 |
| QQ 群深链是编造占位 | 改为 qun.qq.com 真实入口 | commit a30dfe8 |
| 移动端 status 页横向溢出（grid 子项 min-width:auto） | .reveal 加 min-width:0 | 复测 overflow=false |
| 移动端 uptime 计数器撑破容器 | <520px 媒体查询缩小 unit | 复测 overflow=false |
| 移动端 plugins 页 3px 溢出（badge 不换行） | .plugin-head 加 flex-wrap | 复测 overflow=false |

## Verification
- 规格 7 条验收标准全部有可观察证据（见上）。
- 失败模式逐条验证：API 双容灾降级（测试覆盖）、图片 alt/占位（DOM 检测无坏图）、快照标注（页面文案）、依赖锁定（package-lock.json 提交）、类型错误修复后重跑通过。

## Delivery
- implementation edits: 46
- git 提交：5 个（feat 重构 / ci 工作流 / fix 链接 / refactor Pinia / fix 移动端），已推送 GitHub `vue-rewrite` 分支（HEAD 7e1ce24，远端同步确认）
- 截图证据：`.build/screenshots/`（桌面全页 / 状态页 / 移动端）
