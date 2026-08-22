# Doublecheck spec

## Goal
按评审报告（website-review.md）落地全部可实现的修改，每项修改有失败→通过的测试证据或真实浏览器实测证据，交付全绿。

## Scope
范围内：报告高优 #1-#3、中优 #4-#9、低优 1/5/6（汉堡菜单、backdrop 回退、屏序号水印）、腐竹 QQ 一键复制、og.jpg 压缩与 meta 同步、实施记录写入报告。范围外：不动设计系统与配色、不新增运行时依赖、不部署上线、不伪造 license key、不改服务器后端。

## Acceptance criteria
1) npm test 全绿（含新增回归；红阶段已在先，失败原因=缺失行为）；2) npm run build 与 lint 通过；3) dist 图片资源合计 <1MB（原 12.66MB）；4) Playwright 真 Chromium 820×1180 实测 PageDown 持续滚动可达页面底部（修复前卡死）；5) 状态卡实测显示真实 MOTD 与 /2333；6) 控制台除已知 2 条 fullpage license 报错外 0 错误；7) 汉堡菜单实测：遮罩/滚动锁/Esc 关闭；8) website-review.md 附实施记录与保留给业主的事项。

## Failure modes
真实 GPLv3 key 需人工表单申请无法程序化获取 → 以页脚 prominent notice + 注释预留位处理并如实标注；qm.qq.com 群卡片/GH Pages 头配置/访问统计需业主账户操作 → 列入「保留给业主」；jsdom 无 window→document 事件转发 → keydown 监听挂 document；tsconfig 无 node 类型 → 测试用 import.meta.glob 免加依赖。

## Priorities
先修硬伤（性能/许可/交互 bug），再修数据真实性与 SEO，最后低优增强；验证以真实 Chromium 实测为最高证据等级。

## Non-goals
不新增任何运行时依赖；不改变现有设计语言；不提交 git commit、不部署；不为凑数修「纯建议无法落地」项；不隐藏/伪造 fullpage 许可状态。
