# Doublecheck spec

## Goal
修复固定悬浮导航栏（.nav）在桌面端按钮不可点击的问题：桌面宽度下导航链接与「立即加入」始终保持可点击、可聚焦；移动端关闭态菜单仍保持 inert + aria-hidden 的无障碍隐藏。

## Scope
仅修改 src/components/NavBar.vue 中的 isMobile 视口检测与 nav-links 的 inert/aria-hidden 绑定，并配套更新/新增 src/__tests__/nav-mobile.test.ts 覆盖桌面与移动两种场景。不改导航视觉与布局、不动 fullpage 与其他组件。

## Acceptance criteria
1) 桌面视口（innerWidth>960）挂载 NavBar 且菜单关闭：.nav-links 无 inert 属性，aria-hidden 不为 'true'；点击导航链接仍调用 fpStore.goToId。 2) 移动视口（≤960）挂载：关闭态 .nav-links 带 inert 且 aria-hidden='true'，打开态两者移除（现有行为不回归）。 3) npm test 全绿；npm run build 成功。 4) 改动仅限 NavBar.vue 与测试文件。

## Failure modes
a) 桌面仍带 inert（修复不彻底）→ 桌面回归测试红；b) 移动端关闭态不再隐藏或打开后残留 inert → 移动测试红；c) jsdom 缺 matchMedia → 用可配置的 window.innerWidth + defineProperty 而非 matchMedia；d) resize 后 isMobile 不同步 → onResize 必须同步刷新 isMobile。

## Priorities
桌面可点击优先于移动端隐藏语义；改动最小化；遵循先红后绿：先写失败测试，再改实现。

## Non-goals
不改导航栏视觉与布局；不引入 matchMedia polyfill；不处理 BackToTop 或页面内其它按钮；不重写菜单交互（Esc/遮罩/滚动锁保持原样）。
