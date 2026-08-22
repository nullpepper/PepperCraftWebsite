# Doublecheck spec

## Goal
修复「立即加入」屏腐竹 QQ 联系卡内「复制」按钮点击完全无反应的问题：真浏览器中点击该按钮应复制 2747789919 并显示「已复制」反馈。

## Scope
仅改 src/views/HomeView.vue 中 .join-bg 的 CSS（加 pointer-events: none，使装饰背景层不再拦截点击），并新增 src/__tests__/join-copy-hitbox.test.ts 源契约回归测试。不改 CopyButton.vue、不触碰其他屏与导航。

## Acceptance criteria
1) 真浏览器（Chromium 1440×900）在 join 屏对 .contact-card .copy-btn 中心做 elementFromPoint，顶层元素必须是 BUTTON.copy-btn（而非 .join-bg）；真实鼠标点击后按钮文案变「已复制」且剪贴板为 2747789919。 2) 源契约测试：.join-bg 的 CSS 块含 pointer-events: none；修复前该测试红、修复后绿。 3) npm test 全绿；npm run build 成功；lint/prettier 通过。 4) 渲染视觉不变（仅禁用背景层指针事件，不改变任何绘制）。

## Failure modes
a) pointer-events 只加在 .join-bg 而未覆盖 ::after → 用真浏览器 elementFromPoint 复验（伪元素随父元素命中测试，应同时生效）；b) 若改 .join-screen > * 提升内部内容 z-index 会把 .screen-num 水印层级压到内容之下 → 本修复不选该方案；c) 真浏览器不可用环境 → 以源契约测试 + 既有 CopyButton 单测兜底，本次已在本机真浏览器完成红/绿双向实证；d) 误伤 IP 复制按钮 → 真浏览器同时验证 IP 按钮仍可点击。

## Priorities
最小改动优先（1 行 CSS）；零视觉回归优先；真浏览器实证优先于仅静态推断；改动仅限 HomeView.vue 与测试文件。

## Non-goals
不改 CopyButton 组件的复制逻辑（既有单测已绿）；不改 join 屏布局/视觉；不处理 IP 复制按钮（已验证正常）；不重构 fullpage 内容包裹或整体 z-index 体系；不把浏览器依赖加入仓库测试套件（本机用独立诊断脚本实证）。
