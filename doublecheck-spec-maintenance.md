# Doublecheck spec

## Goal
用 snowluma（QQ 机器人 BukkitOwO 的 OneBot HTTP 接口）把当前维护后网站的最后效果图（桌面 7 屏 + 移动端首屏/整页，共 9 张）私聊发送给用户 QQ 2747789919。

## Scope
范围内：本地 vite preview 服务 dist/ 产物；playwright-core headless chromium 截图脚本（.build/shoot.mjs）与产物（.build/screenshots/final/）；snowluma OneBot HTTP 私聊发送。范围外：图片内容审核、压缩、PS 处理。

## Acceptance criteria
1) 产出 9 张效果图：desktop-{hero,status,about,features,join,faq,footer}.png（1440×900）+ mobile-hero.png + mobile-full.png（390px 视口，内容为当前维护后代码构建产物渲染）；2) 图片非空白/非豆腐块（中文字体正常），至少目检 hero 与 status 两张；3) 通过 snowluma OneBot HTTP（port 3000，Bearer token）向 2747789919 私聊发送成功，收到 retcode 0；4) 不发送到任何群；5) 发送前服务器与脚本均本地运行，不留后台进程（preview 关闭）。

## Failure modes
preview 端口占用 → --strictPort 报错则换端口；fullpage_api 未暴露 → 超时后回退为键盘 PageDown 翻页；单张图片 base64 过大导致 OneBot 请求失败 → 拆为逐张发送并检查 retcode；QQ 风控拒收 → 报告错误不重试轰炸；截图豆腐块 → 检查系统字体后重拍。

## Priorities
图片真实反映当前构建 > 发送成功（retcode 0）> 逐张可读（不拼长图）> 清理后台进程；任何一步失败如实报告，不伪造发送成功。

## Non-goals
不发送到任何 QQ 群；不改网站代码；不做图片压缩/拼接海报；不部署；不动 snowluma 配置（仅读取 token）；不处理上一轮未提交的 git 变更。
