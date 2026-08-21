# Pepper Craft 官网（Vue 3 重构版）

> PepperCraft Minecraft Survial Server · 忠于原版的高版本生存

基于 **Vue 3 + Vite + TypeScript + Vue Router + Pinia** 的现代化官网重构，
完整继承原网站全部信息，并从服务器本体（Docker 容器）提取真实数据丰富内容。

## ✨ 功能

| 页面 | 内容 |
|------|------|
| `/` 首页 | Hero 大屏、实时运行时长、数据一览、初心与承诺、特色预览、联盟云、插件预览、时间线、CTA |
| `/about` 关于 | 初心、数据一览、技术档案、服务器大事记时间线 |
| `/status` 状态 | **实时在线人数**（双 API 容灾）、服务器配置档案、玩家游戏时长 TOP30、钻石财富榜 |
| `/features` 特色 | 三大核心特色（原版优化 / 纯净回归 / 技术保障）+ 六种进阶玩法 |
| `/towns` 联盟 | 联盟系统玩法介绍、**25 个现存联盟**、联盟成就表 |
| `/plugins` 插件 | **13 个自研开源插件**（Pepper 家族）+ 60+ 第三方插件底座 |
| `/docs` 文档 | 钻石银行经济系统、**可搜索命令速查表** |
| `/join` 加入 | IP 一键复制、三步进服指南、联系方式、活动公告、FAQ |

## 🆕 新功能（原站没有的）

- 🔴 **实时服务器状态**：60 秒自动轮询（uapis.cn 主 API + mcstatus.io 备用 API，双容灾降级）
- ⏳ **运行时长实时倒计时**：精确到秒（开服 2023-02-20）
- 📊 **玩家数据榜**：205 名玩家真实游戏时长 / 死亡 / 击杀排行 + 钻石财富榜（服务器存档快照）
- 🏰 **联盟展示**：25 个现存联盟名单（HuskTowns 数据库快照）
- 🧩 **自研插件画廊**：PepperLib / PepperClaim / PepperUnion / PepperBot 家族等，直连 GitHub
- ⌨️ **命令速查**：联盟 24 条 + 银行 + 常用指令，支持关键词实时检索
- 🤔 **FAQ 手风琴**：8 条常见问题
- 📱 响应式设计（移动端汉堡菜单）、暗色 Minecraft 主题、滚动渐入动画、返回顶部

## 🚀 开发

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（http://localhost:5173）
npm test           # 单元测试（vitest）
npm run build      # 类型检查 + 生产构建 → dist/
npm run preview    # 预览构建产物
```

## 📦 部署

构建产物 `dist/` 为纯静态文件，可部署到任意静态托管：

- **GitHub Pages / Cloudflare Pages / Vercel**：直接上传 dist/ 即可（已启用 hash 路由，无需额外配置）
- **Nginx / Caddy**：将站点根目录指向 dist/ 即可
- 原 CNAME `web.pcraft.eu.org` 保留在仓库，可继续用于 GitHub Pages 自定义域名

## 🔄 数据更新

服务器数据（玩家排行 / 城镇 / 财富榜）为**静态快照**，存放于 `src/data/*.json`。
需要刷新时在服务器本机执行：

```bash
npm run data:extract
```

脚本从 `/opt/docker/minecraft/mc/data` 与 MariaDB 容器重新提取并覆盖快照数据。

## 🧪 测试

```bash
npm test
```

- 运行时长计算（开服时间边界）
- 首页关键信息渲染（IP / QQ 群 / 腐竹 QQ / 文档域名 / 存档承诺）

## 📄 技术栈

Vue 3.5 · Vite 6 · TypeScript 5 · Vue Router 4 · Pinia 3 · Vitest 4 · 无重型 UI 框架（自研设计系统）

## 📜 许可

非官方 Minecraft 项目，与 Mojang 无关，完全遵守官方 EULA。
Copyright © Pepper Craft 2023-2026
