# Doublecheck report

> Verdict: **green**

## Spec
- Goal: 让网站第 4 页（特色玩法）与第 5 页（加入我们）的内容块在宽屏下整体水平居中、收进 1180px 容器，格式与内部排版不变。
- Scope: 仅改 src/views/HomeView.vue 中 .features-screen 与 .join-screen 的水平 padding：由不对称（左 24px 固定、右侧 max((100% - 容器)/2, 24px)）改为左右等宽 max((100% - 容器)/2, 24px)。不改 DOM 结构、不改其他屏（1/2/3/6/7）、不改移动端与平板断点（≤900px 区间该 padding 本就对称，行为不变）、不动 .screen-num 水印与任何内部样式（网格列数/字号/颜色/圆角/卡内对齐）。
- Acceptance criteria: 1) 视口宽 >1228px（如 1920）时，两屏内容块左右边距相等、内容宽度 = min(--container, 100%)、块中心与视口中心对齐（数学误差 ≤1px）；2) 内部排版零改动：feature-grid 3 列、tag-grid 4 列、contact-row/join-steps/recruit-grid 3 列、字号/颜色/圆角/卡内布局均未修改；3) 视口 ≤1228px 时渲染结果与改动前一致（max() 两侧原本就相等，仅 24px 兜底）；4) npm run build 成功；5) npx vitest run 全绿；6) git diff 仅含两处 padding 声明（各加注释），无其他文件变化。
- Failure modes: a) 只改一屏漏改另一屏 → diff 必须同时覆盖 .features-screen 与 .join-screen；b) 卡片收窄后内容溢出/换行崩坏 → 网格为 1fr 流式自适应，381px 卡宽下文本正常换行，不出现水平溢出；c) ≤1228px 或移动端回归 → 该区间两侧 padding 原本即相等（max 兜底 24px），改动前后渲染一致；d) 构建/测试失败 → 回退两处 padding 还原，不发布。
- Priorities: 视觉统一（与其他屏共享 --container 网格基准）优先于卡片绝对宽度；宽屏居中优先，窄屏零回归次之；改动必须最小化（纯 CSS padding，不动 DOM 与 JS）。
- Non-goals: 不把标题文字改为居中排版（用户确认保持内部左对齐）；不动屏 2/3 左右分栏与屏 6 FAQ 的现有布局；不改卡片内容、图片挡位或悬挂效果；不重排 .screen-num 水印位置；不涉及 fullpage 许可/其他功能改动。

## Test evidence
- failing runs: 0
- passing runs: 7

- [spec] 让网站第 4 页（特色玩法）与第 5 页（加入我们）的内容块在宽屏下整体水平居中、收进 1180px 容器，格式与内部排版不变。
- [green] npx vitest run 2>&1 | tail -15
- [green] npx vitest run src/__tests__/layout-centering.test.ts 2>&1 | tail -12
- [green] npx vitest run src/__tests__/layout-centering.test.ts 2>&1 | head -30
- [green] npx vitest run src/__tests__/layout-centering.test.ts 2>&1 | tail -20
- [green] npx vitest run src/__tests__/layout-centering.test.ts 2>&1 | tail -8
- [green] npx vitest run 2>&1 | tail -6
- [green] npx vitest run src/__tests__/layout-centering.test.ts 2>&1 | tail -6 && npx vitest run 2>&1 | tail -4

## Adversary review
No adversary review ran for this session.

## Verification
Not run.

## Delivery
- implementation edits: 7

## Addendum — 真实红绿时间线与逐维核查（2026-08-22，实施者执行）

> 说明：① 上方案工具生成的「Test evidence」把每次 vitest 调用一律标 [green]，其中
> 23:01:24 那次实际是 **red**（`Tests 2 failed (2)`），以本补记为准。② 本会话无
> workflow 编排链（两次 verify: true 均返回 "Verification: Not run"），逐维核查为
> 会话内人工执行，如实记录。

### 红绿时间线（red-green-tdd）

| 时刻 | 状态 | 内容 |
|---|---|---|
| 23:01:24 | 🔴 RED | 新测试 `layout-centering.test.ts`（2 用例）对抗**还原后的原实现**：2 failed。失败原因为缺失行为：收到四值 `... max(..., 24px) 26px 24px`（左 24px），不匹配「三值对称」契约（输出 "Received: ...26px 24px"） |
| 23:01:36 | 🟢 GREEN | 重新应用对称 padding 后同测试 2/2 通过 |
| 23:01:43 | 🟢 全量 | `npx vitest run`：10 文件 / 51 测试全过；`npm run build` 成功；编译产物确认 `padding:...max(calc((100% - var(--container)) / 2),24px) 30px`（三值） |
| 23:02:07–08 | 🟢 复验 | 测试改 `?raw` 导入（消除 node 内置模块依赖，规避 @types/node 缺失导致的 vue-tsc 报错）后：单测 2/2、全量 51/51、构建 ✅ |

测试文件（始终可编辑）：`src/__tests__/layout-centering.test.ts` —— 钉住两个可观察契约：
① 水平 padding 为对称公式 `max(calc((100% - var(--container)) / 2), 24px)`；
② 三值简写（CSS 语义 left = right），并显式断言 `not.toMatch(... 24px$)` 拒绝旧四值实现。

### 对手审查（delivery-review，6 条反对意见与答复）

1. **反对：验收标准 6 字面不成立** —— `git diff src/views/HomeView.vue` 显示 27 行变化。
   答复：属实，但许可证注释块与 FAQ aria-controls/id 改动在本会话开始前已存在于工作区
   （会话首次读取文件时即已包含）。按会话基线计，本次交付增量 = 仅 2 处 padding + 2 行
   注释 + 1 个测试文件；验收 6 按「会话增量」口径成立。
2. **反对：居中后 1280px 下 .screen-num 水印与内容重叠？**
   答复：内容右缘由右侧 padding `(100%−容器)/2` 决定，本次未变 → 几何关系前后一致；
   可见字形在重叠区左侧；水印为装饰（rgba .08）。无新增重叠。
3. **反对：卡宽收窄至 ~381px 后溢出？** 答复：文本均为中文（任意断行）；唯一 nowrap 令牌
   pepper.ltd（≤54px mono ≈324px）+ 复制按钮在 1120px join-card 内余量充足；网格均 1fr 流式。
4. **反对：≤1228px 回归？** 答复：`max()` 该区间两侧原值即 24px 相等，字节级一致。
5. **失败模式 a/d**：a）两屏均有修改（测试双断言覆盖）；d）回滚 = 还原 2 行。
6. **范围/非目标**：无 DOM/JS/其他屏改动；标题保持左对齐（用户选择）；水印、屏 2/3/6 未动。

### 人工逐维核查

| 维度 | 结论 | 证据 |
|---|---|---|
| Goal | ✅ | 编译产物两条规则左右等宽；块宽 = min(--container, 100%)；等边距 ⇒ 中心对齐（1920 各 370px，误差 0） |
| Acceptance | ✅（1 项按增量口径） | ① 数学 0px；② 增量 diff 仅 padding+注释；③ max() 区间行为不变；④ build 退出 0；⑤ 51/51 测试；⑥ 见对手意见 1 |
| Failure modes | ✅ | a–d 全部覆盖，均未触发 |
| Scope / Non-goals | ✅ | 增量闭环，无越界 |
| Priorities | ✅ | 卡宽换一致性，用户二选一明确批准 |

### 已知限制

无可用无头浏览器（缺 libnspr4、无 sudo），无像素级截图；布局以「CSS 确定性解析 +
编译产物验证 + 回归测试（红绿双证据）」覆盖。
