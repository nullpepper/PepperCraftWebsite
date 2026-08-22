# Doublecheck report

> Verdict: **green**

## Spec
- Goal: 修复「立即加入」屏腐竹 QQ 联系卡内「复制」按钮点击完全无反应的问题：真浏览器中点击该按钮应复制 2747789919 并显示「已复制」反馈。
- Scope: 仅改 src/views/HomeView.vue 中 .join-bg 的 CSS（加 pointer-events: none，使装饰背景层不再拦截点击），并新增 src/__tests__/join-copy-hitbox.test.ts 源契约回归测试。不改 CopyButton.vue、不触碰其他屏与导航。
- Acceptance criteria: 1) 真浏览器（Chromium 1440×900）在 join 屏对 .contact-card .copy-btn 中心做 elementFromPoint，顶层元素必须是 BUTTON.copy-btn（而非 .join-bg）；真实鼠标点击后按钮文案变「已复制」且剪贴板为 2747789919。 2) 源契约测试：.join-bg 的 CSS 块含 pointer-events: none；修复前该测试红、修复后绿。 3) npm test 全绿；npm run build 成功；lint/prettier 通过。 4) 渲染视觉不变（仅禁用背景层指针事件，不改变任何绘制）。
- Failure modes: a) pointer-events 只加在 .join-bg 而未覆盖 ::after → 用真浏览器 elementFromPoint 复验（伪元素随父元素命中测试，应同时生效）；b) 若改 .join-screen > * 提升内部内容 z-index 会把 .screen-num 水印层级压到内容之下 → 本修复不选该方案；c) 真浏览器不可用环境 → 以源契约测试 + 既有 CopyButton 单测兜底，本次已在本机真浏览器完成红/绿双向实证；d) 误伤 IP 复制按钮 → 真浏览器同时验证 IP 按钮仍可点击。
- Priorities: 最小改动优先（1 行 CSS）；零视觉回归优先；真浏览器实证优先于仅静态推断；改动仅限 HomeView.vue 与测试文件。
- Non-goals: 不改 CopyButton 组件的复制逻辑（既有单测已绿）；不改 join 屏布局/视觉；不处理 IP 复制按钮（已验证正常）；不重构 fullpage 内容包裹或整体 z-index 体系；不把浏览器依赖加入仓库测试套件（本机用独立诊断脚本实证）。

## Test evidence
- failing runs: 0
- passing runs: 9

- [spec] 修复固定悬浮导航栏（.nav）在桌面端按钮不可点击的问题：桌面宽度下导航链接与「立即加入」始终保持可点击、可聚焦；移动端关闭态菜单仍保持 inert + aria-hidden 的无障碍隐藏。
- [green] npx vitest run src/__tests__/nav-mobile.test.ts 2>&1 | tail -60
- [green] npx vitest run src/__tests__/nav-mobile.test.ts 2>&1 | tail -30
- [green] npx vitest run src/__tests__/nav-mobile.test.ts 2>&1 | tail -20
- [green] npm test 2>&1 | tail -30
- [green] npm test 2>&1 | tail -12
- [green] npm test 2>&1 | tail -8
- [spec] 修复「立即加入」屏腐竹 QQ 联系卡内「复制」按钮点击完全无反应的问题：真浏览器中点击该按钮应复制 2747789919 并显示「已复制」反馈。
- [green] npx vitest run src/__tests__/join-copy-hitbox.test.ts 2>&1 | tail -25
- [green] npx vitest run src/__tests__/join-copy-hitbox.test.ts 2>&1 | tail -10
- [green] npm test 2>&1 | tail -10

## Adversary review
No adversary review ran for this session.

## Verification
Not run.

## Delivery
- implementation edits: 7

## Addendum — 本次 join 复制按钮修复的真实红绿时间线与真浏览器实证（2026-08-23，实施者执行）

> 说明：上方工具生成的「Test evidence」把每次 vitest 调用一律标 [green]，其中
> `npx vitest run src/__tests__/join-copy-hitbox.test.ts | tail -25` 那次实际是
> **red**（`Tests 1 failed (1)`），以本补记为准。

### 红绿时间线

| 时刻 | 状态 | 内容 |
|---|---|---|
| 01:04 | 🔴 RED | 真浏览器（Chromium 151 headless shell，1440×900）：`.contact-card .copy-btn` 中心 `elementFromPoint` 命中 `DIV.join-bg`；真实鼠标点击后按钮仍为「复制」、`isCopied=false`、剪贴板仍为 pepper.ltd —— 复现「点击完全无反应」。 |
| 01:05 | 🔴 RED | 新源契约测试 `join-copy-hitbox.test.ts`：`.join-bg` 块无 `pointer-events: none` → 1 failed。 |
| 01:05 | 🟢 GREEN | `.join-bg` 加 `pointer-events: none` 后同测试 1/1 通过；`npm run build` 成功。 |
| 01:06 | 🟢 GREEN | 真浏览器复验：QQ 复制按钮 `elementFromPoint` 命中 `BUTTON.copy-btn.compact`；真实点击后文案「已复制」、`isCopied=true`、剪贴板 = `2747789919`；IP「复制 IP」仍可点击（未回归）。 |
| 01:06 | 🟢 全量 | `npx vitest run`：11 文件 / 54 测试全过；`eslint .` 与 Prettier 检查通过。 |

### 根因与修复

fullpage.js 把 section 内容包进 `.fp-overflow` 后，`.join-screen > * { z-index: 1 }`
只命中包裹层本身；包裹层内部的普通流内容（`.contact-card` 等）没有层叠上下文，
被绝对定位、`z-index:0` 的 `.join-bg` 覆盖并拦截指针事件。IP「复制 IP」之所以正常，
是因为 `.join-card` 带 `backdrop-filter: blur(8px)` 自成层叠上下文，恰好逃过覆盖。
修复：`.join-bg` 加 `pointer-events: none`（纯装饰背景不参与命中测试），一行 CSS，
绘制不变。

### 已知限制

本机浏览器依赖 libnspr4/libnss3 等缺失，已通过 `apt-get download` + 本地解包 +
`LD_LIBRARY_PATH` 临时补齐（仅本会话诊断用，未写入仓库或 CI）。仓库测试套件保持
jsdom/源契约风格，不引入浏览器依赖。
