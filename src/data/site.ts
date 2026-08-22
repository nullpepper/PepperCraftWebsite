/** 站点与服务器基础信息（继承原网站全部关键信息） */
export const SITE = {
  name: 'PepperCraft',
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
  version: '1.21+ / 最新版（跨版本支持）',
  difficulty: '困难（Hard）',
  gameMode: '生存（Survival）',
  maxPlayers: 1000,
  motd: 'PepperMC',
  auth: '强制正版验证',
  eula: '完全遵守官方 EULA',
} as const
