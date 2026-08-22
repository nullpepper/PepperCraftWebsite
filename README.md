# Pepper Craft 官网（Vue 3 重构版）

> PepperCraft Minecraft Survial Server · 忠于原版的高版本生存

基于 **Vue 3 + Vite + TypeScript + Vue Router + Pinia** 的现代化官网重构，
完整继承原网站全部信息。

## ✨ 结构

全屏分页式布局（一屏一节，参考 et001.com 首页）：基于 fullpage.js（GPLv3 非商业使用），
滚轮 / 触摸 / 键盘翻页，顶部导航跳屏：

| 屏         | 内容                                            |
| ---------- | ----------------------------------------------- |
| 1 Hero     | 品牌、标语、IP 一键复制、加入按钮               |
| 2 运行状态 | **实时在线人数**（双 API 容灾）、运行时长倒计时 |
| 3 关于     | 初心与承诺、3 年存档承诺、技术保障要点          |
| 4 特色玩法 | 三大核心特色 + 更多玩法标签                     |
| 5 加入我们 | IP、联系方式（QQ群 / 文档 / 腐竹 QQ）、活动     |
| 6 FAQ      | 常见问题手风琴                                  |
| 7 页尾     | 站内导航、联系方式、版权                        |

站内跳转统一走 `stores/fullpage.ts`：各屏没有 DOM 锚点 id，导航栏、Hero 按钮、
页脚链接与返回顶部都调用 `goToId()` → `fullpage.moveTo()`。

## 🆕 新功能（原站没有的）

- 🔴 **实时服务器状态**：60 秒自动轮询（uapis.cn 主 API + mcstatus.io 备用 API，双容灾降级）
- ⏳ **运行时长实时倒计时**：精确到秒（开服 2023-02-20）
- 📋 **一键复制 IP**
- 🤔 **FAQ 手风琴**
- 📱 响应式设计（移动端汉堡菜单）、暗色 Minecraft 主题、返回顶部

## 🚀 开发

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（http://localhost:5173）
npm test           # 单元测试（vitest）
npm run build      # 类型检查 + 生产构建 → dist/
npm run preview    # 预览构建产物
npm run lint       # ESLint 检查
npm run format     # Prettier 格式化（format:check 只检查）
```

> 图片资源在 `src/assets/img/`，经 Vite 打包（内容 hash + 子路径安全），
> 勿放回 `public/` 用绝对路径引用。`public/` 只放不参与打包的静态文件
> （favicon、og.jpg、robots.txt、sitemap.xml）。

## 📦 部署

构建产物 `dist/` 为纯静态文件，可部署到任意静态托管：

- **GitHub Pages / Cloudflare Pages / Vercel**：直接上传 dist/ 即可（已启用 hash 路由，无需额外配置）
- **Nginx / Caddy**：将站点根目录指向 dist/ 即可
- 原 CNAME `web.pcraft.eu.org` 保留在仓库，可继续用于 GitHub Pages 自定义域名

## 🧪 测试

```bash
npm test          # 单次运行
npm run test:watch
npm run coverage
```

- 运行时长计算（开服时间边界）
- 首页关键信息渲染（IP / QQ 群 / 腐竹 QQ / 文档域名 / 存档承诺）
- 全屏分页结构与 `SCREENS` 定义保持一致
- 站内跳屏：页脚导航与返回顶部（回归测试）
- 状态 API：主/备切换、MOTD 解析、双失败降级为「状态暂不可用」

## 📄 技术栈

Vue 3.5 · Vite 6 · TypeScript 5 · Vue Router 4 · Pinia 3 · Vitest 4 · fullpage.js（全屏分页）· 自研设计系统

## 📜 许可

非官方 Minecraft 项目，与 Mojang 无关，完全遵守官方 EULA。
Copyright © Pepper Craft 2023-2026
