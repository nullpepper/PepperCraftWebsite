/** 站点与服务器基础信息（继承原网站全部关键信息） */
export const SITE = {
  name: 'Pepper Craft',
  slogan: '基于原版，忠于原版',
  subSlogan: 'PVP、生存、生电融合的高质量社区',
  tagline: '高版本纯净生存公益服',
  description:
    'PepperCraft 是一个由 Minecraft 爱好者发起的高版本纯净生存公益服，致力于打造日均在线 30+ 的高质量社区。',
  ip: 'pepper.ltd',
  ipPort: 'pepper.ltd',
  qqGroup: '754966689',
  /** QQ 群主页（群号搜索入口） */
  qqGroupUrl: 'https://qun.qq.com/',
  ownerQq: '2747789919',
  docsUrl: 'https://docs.pepper.ltd',
  docsDomain: 'docs.pepper.ltd',
  webDomain: 'web.pcraft.eu.org',
  github: 'https://github.com/nullpepper/PepperCraftWebsite',
  serverStart: '2023-02-20',
  /** 2025-01 郑重决定：3 年内不再清除存档内容 */
  archivePromise: '2025年1月郑重决定：3年内不再清除存档内容！',
  archivePromiseYears: 3,
  dailyOnline: '30+',
  version: 'Purpur 1.21+ / 最新版（跨版本支持）',
  difficulty: '困难（Hard）',
  gameMode: '生存（Survival）',
  maxPlayers: 1000,
  motd: 'PepperMC',
  auth: '强制正版验证',
  eula: '完全遵守官方 EULA',
  /** 数据快照抓取时间（从服务器容器提取） */
  snapshotTime: '2026-08-21',
} as const

/** 服务器技术档案（来自容器 server.properties / 插件清单） */
export const SERVER_PROFILE = {
  core: 'Purpur 26.1.2（MC 1.21+ 高版本）',
  difficulty: '困难',
  gamemode: '生存',
  simulationDistance: 10,
  viewDistance: 10,
  maxPlayers: 1000,
  redstone: '高频红石无限制',
  backup: '本地 + 异地双重备份',
  anticheat: '付费级混合反作弊（Matrix）',
  worldgen: 'TerraformGenerator 增强地形',
  crossVersion: 'ViaVersion / ViaBackwards 跨版本支持',
  bedrock: 'Floodgate + Hurricane 基岩版支持',
  proxy: 'Velocity 代理 + 强制正版验证',
} as const
