# Doublecheck spec

## Goal
在 ~/projects/PepperCraftWeb（GitHub 仓库 nullpepper/PepperCraftWebsite 的本地克隆）中用 Vue 3 + Vite + TypeScript + Vue Router + Pinia 重写 Pepper Craft 官网：继承原站全部信息（简介/特色/状态/联系方式），从 docker 容器 mc-peppercraft（即用户所称 PepperCraft-MC）与 PepperServer-Document 文档仓库提取真实服务器资料丰富内容，并创造性地引入新功能，最终交付可本地构建运行（npm run dev/build 通过）的现代化网站。

## Scope
范围内：网站前端重写（页面、组件、样式、数据模块、路由、状态管理）；使用原站图片资源（public/assets/img）；从 docker 容器读取的公开服务器信息（玩家排行、城镇名单、经济数据、插件清单、版本、配置摘要）；自研插件生态展示（GitHub 公开仓库信息）。范围外：不修改服务器/插件/MariaDB 数据；不实现后端服务；不做涉及隐私的玩家数据展示（QQ 号、IP）；不部署到生产（仅本地构建与预览验证，附部署说明）。

## Acceptance criteria
1) npm run build 成功产出 dist/，npm run preview 或 dev 可访问；2) 首页包含原站全部关键信息：IP pepper.ltd、开服时间 2023-02-20、3 年存档承诺、三大特色、QQ 群 754966689、腐竹 QQ 2747789919、官方文档 docs.pepper.ltd；3) 实时状态页能通过在线 API 拉取人数（失败时有优雅降级显示）；4) 玩家排行/城镇/经济数据来自容器真实数据且标注快照时间；5) 新增至少 3 项原站没有的功能（运行时长倒计时、联盟展示、自研插件画廊、命令速查等）；6) 移动端响应式可用；7) git 提交记录完整。

## Failure modes
在线状态 API 不可达/跨域失败 → 显示"维护中/离线"并给出重试按钮，不阻塞页面；图片资源缺失 → 显示占位背景与 alt 文本；数据快照过期 → 页面标注抓取时间并说明为静态快照；npm 依赖安装失败 → 锁定版本重试；构建类型错误 → 修正后重跑直到通过。

## Priorities
信息完整性 > 视觉效果 > 性能细节；静态快照数据优先保证真实准确，实时数据允许降级；中文为主要语言；优先交付可运行产物，其次优化细节。

## Non-goals
用户已睡觉无法问答（等价"别问，直接做"，按其指令执行）；不部署生产服务器；不展示玩家真实 IP/QQ 等隐私信息；不做 SSR；不引入重型 UI 框架（用轻量自定义 CSS）；不修改原仓库 git 历史（旧版本保留在 git 历史中）。
