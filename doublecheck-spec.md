# Doublecheck spec

## Goal
让网站第 4 页（特色玩法）与第 5 页（加入我们）的内容块在宽屏下整体水平居中、收进 1180px 容器，格式与内部排版不变。

## Scope
仅改 src/views/HomeView.vue 中 .features-screen 与 .join-screen 的水平 padding：由不对称（左 24px 固定、右侧 max((100% - 容器)/2, 24px)）改为左右等宽 max((100% - 容器)/2, 24px)。不改 DOM 结构、不改其他屏（1/2/3/6/7）、不改移动端与平板断点（≤900px 区间该 padding 本就对称，行为不变）、不动 .screen-num 水印与任何内部样式（网格列数/字号/颜色/圆角/卡内对齐）。

## Acceptance criteria
1) 视口宽 >1228px（如 1920）时，两屏内容块左右边距相等、内容宽度 = min(--container, 100%)、块中心与视口中心对齐（数学误差 ≤1px）；2) 内部排版零改动：feature-grid 3 列、tag-grid 4 列、contact-row/join-steps/recruit-grid 3 列、字号/颜色/圆角/卡内布局均未修改；3) 视口 ≤1228px 时渲染结果与改动前一致（max() 两侧原本就相等，仅 24px 兜底）；4) npm run build 成功；5) npx vitest run 全绿；6) git diff 仅含两处 padding 声明（各加注释），无其他文件变化。

## Failure modes
a) 只改一屏漏改另一屏 → diff 必须同时覆盖 .features-screen 与 .join-screen；b) 卡片收窄后内容溢出/换行崩坏 → 网格为 1fr 流式自适应，381px 卡宽下文本正常换行，不出现水平溢出；c) ≤1228px 或移动端回归 → 该区间两侧 padding 原本即相等（max 兜底 24px），改动前后渲染一致；d) 构建/测试失败 → 回退两处 padding 还原，不发布。

## Priorities
视觉统一（与其他屏共享 --container 网格基准）优先于卡片绝对宽度；宽屏居中优先，窄屏零回归次之；改动必须最小化（纯 CSS padding，不动 DOM 与 JS）。

## Non-goals
不把标题文字改为居中排版（用户确认保持内部左对齐）；不动屏 2/3 左右分栏与屏 6 FAQ 的现有布局；不改卡片内容、图片挡位或悬挂效果；不重排 .screen-num 水印位置；不涉及 fullpage 许可/其他功能改动。
