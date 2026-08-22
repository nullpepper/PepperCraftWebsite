# Doublecheck spec

## Goal
按已确认清单完成官网设计优化并重拍验证：P1 五项（加入屏无客户端三步引导替代下载方案、水印 02/05 节奏修复、FAQ 左右列顶部对齐、移动端 slogan 断行与 ghost 按钮、fullPage 徽章深色化保留署名）+ P2 三项（文案统一「服务器特色」、状态页右图顶部压暗、FAQ 按钮主次交换）+ P3 状态卡空态小提示；About 合影裁切经复查构图良好，撤销该条建议不改动。

## Scope
在 src/ 内：新增 src/data/joinSteps.ts + src/__tests__/join.test.ts；修改 HomeView.vue（模板+scoped CSS）、NavBar.vue、AppFooter.vue、ServerStatusCard.vue、src/styles/main.css。随后跑 vitest/eslint/prettier/build，vite preview + playwright-mcp 容器（挂载 CJK 字体）重拍 9 张截图，亲眼验证后经 snowluma 私聊发送 2747789919。

## Acceptance criteria
1) 测试套件全绿，join.test.ts 先红后绿；2) lint/format:check/build 通过；3) 桌面截图：加入屏出现三步引导条且不含「下载客户端」类文案、02/05 水印可见、FAQ 左右列顶部对齐、fullPage 徽章深色、导航与屏4标题一致为「服务器特色」、状态页右图顶部压暗后 02 水印可读、FAQ QQ 群按钮为主色；4) 移动端截图：slogan 断行改善、看看特色按钮有边框；5) 9 张重拍截图亲眼验证中文正常渲染（非豆腐块）；6) snowluma 日志确认 9 张图片 retcode=0 送达。

## Failure modes
截图环境无 CJK 字体→中文豆腐块（须挂载宿主 noto + fonts-local.conf + fc-cache -f，且用 fc-match 而非 fc-list 验证）；mobile-full.png >3.6MB 触发 OneBot 负载上限→改发 JPEG q80；join 屏加入三步条导致 900px 高度溢出→fullpage 会内部滚动，需检查首屏不破；preview 服务器端口占用→先杀旧进程。

## Priorities
P1 五项为核心必改；P2 按清单；About 合影不动作（复查撤回）；水印若与图片冲突则以「水印可读」优先；截图验证以亲眼检查为准，不依赖脚本退出码。

## Non-goals
不新增第三方依赖；不改状态 API 协议与部署流水线；不重做品牌视觉（配色/字体/布局骨架保持）；不做移动端全页长截图逐段设计评审；不发送本次改动前的旧图。
