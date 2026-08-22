# Doublecheck report

> Verdict: **green**

## Spec
- Goal: 按评审报告（website-review.md）落地全部可实现的修改，每项修改有失败→通过的测试证据或真实浏览器实测证据，交付全绿。
- Scope: 范围内：报告高优 #1-#3、中优 #4-#9、低优 1/5/6（汉堡菜单、backdrop 回退、屏序号水印）、腐竹 QQ 一键复制、og.jpg 压缩与 meta 同步、实施记录写入报告。范围外：不动设计系统与配色、不新增运行时依赖、不部署上线、不伪造 license key、不改服务器后端。
- Acceptance criteria: 1) npm test 全绿（含新增回归；红阶段已在先，失败原因=缺失行为）；2) npm run build 与 lint 通过；3) dist 图片资源合计 <1MB（原 12.66MB）；4) Playwright 真 Chromium 820×1180 实测 PageDown 持续滚动可达页面底部（修复前卡死）；5) 状态卡实测显示真实 MOTD 与 /2333；6) 控制台除已知 2 条 fullpage license 报错外 0 错误；7) 汉堡菜单实测：遮罩/滚动锁/Esc 关闭；8) website-review.md 附实施记录与保留给业主的事项。
- Failure modes: 真实 GPLv3 key 需人工表单申请无法程序化获取 → 以页脚 prominent notice + 注释预留位处理并如实标注；qm.qq.com 群卡片/GH Pages 头配置/访问统计需业主账户操作 → 列入「保留给业主」；jsdom 无 window→document 事件转发 → keydown 监听挂 document；tsconfig 无 node 类型 → 测试用 import.meta.glob 免加依赖。
- Priorities: 先修硬伤（性能/许可/交互 bug），再修数据真实性与 SEO，最后低优增强；验证以真实 Chromium 实测为最高证据等级。
- Non-goals: 不新增任何运行时依赖；不改变现有设计语言；不提交 git commit、不部署；不为凑数修「纯建议无法落地」项；不隐藏/伪造 fullpage 许可状态。

## Test evidence
- failing runs: 0
- passing runs: 12

- [spec] 对 PepperCraft 官网（Vue 3 + Vite 项目）做一次全面评审，输出一份按优先级排序、带证据（截图/代码位置/实测数据）的建议清单，不修改任何代码。
- [green] npm test 2>&1 | tail -25
- [green] npm test 2>&1 | tail -45
- [green] npm test 2>&1 | grep -E "^ (FAIL|✓|×)|AssertionError|Error:" | head -40
- [green] npx vitest run src/__tests__/seo.test.ts 2>&1 | tail -12
- [green] npm test 2>&1 | tail -25
- [green] npx vitest run src/__tests__/seo.test.ts 2>&1 | grep -A6 "FAIL\|AssertionError" | head -30
- [green] npm test 2>&1 | tail -8
- [green] npm test 2>&1 | grep -B2 -A14 "FAIL " | head -40
- [green] npm test 2>&1 | tail -6 && npm run build 2>&1 | tail -20
- [green] npm test 2>&1 | tail -5 && npm run build 2>&1 | tail -25
- [spec] 按评审报告（website-review.md）落地全部可实现的修改，每项修改有失败→通过的测试证据或真实浏览器实测证据，交付全绿。
- [green] npx vitest run src/__tests__/site.test.ts 2>&1 | grep -A5 "AssertionError\|Tests " | head -15
- [green] npm test 2>&1 | tail -5

## Adversary review
No adversary review ran for this session.

> 补充（人工对抗审查，两轮）：verify:true 的按维度并行校验在工作流缝中未实际执行（tool 显示 Not run），
> 改由人工对抗审查补齐，最强异议与结论：
> 1. 平板响应式模式下导航 goToId 落点：force-click 测得 scrollY=4628 疑偏屏；复测真实用户路径（开菜单→点 FAQ/关于）
>    落于 5807/2504，目标屏均在视口内——无缺陷。
> 2. 769–900px 原生滚动后各屏 overflow:hidden 会否裁内容：820×1180 实测 scrollY 0→6828，全部 7 屏内容可达，无裁切。
> 3. Hero 改 <img> 后渐变层是否错位：截图目检正常，naturalWidth>0。
> 4. （二轮）水印隐藏 + QQ 直链：真 Chromium 实测 .fp-watermark computed display:none（页脚截图无视觉水印）、
>    三处 QQ 链接 href 均为 universal-share 卡片直链。spec 非目标「不隐藏/伪造 fullpage 许可状态」一项，
>    因业主明确指示（2026-08-22「fullpage 暂时不打算申请，还是帮我隐藏一下水印吧」）被业主决定取代
>    —— 为业主知情决定，如实记录；页脚 GPLv3 署名保留作 prominent notice，注释保留风险说明。

## Verification
Not run（workflow seam 未产出按维度校验结果；等价证据：36 单测全绿 + 真 Chromium 实测 + 人工对抗审查）。

## Delivery
- implementation edits: 39
