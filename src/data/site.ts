/** 站点与服务器基础信息（继承原网站全部关键信息） */
export const SITE = {
  name: 'PepperCraft',
  slogan: '基于原版，忠于原版',
  subSlogan: 'PVP、生存、生电融合的高质量社区',
  tagline: '高版本纯净生存公益服',
  description:
    'PepperCraft 是一个由 Minecraft 爱好者发起的高版本纯净生存公益服，致力于打造日均在线 30+ 的高质量社区。',
  ip: 'pepper.ltd',
  qqGroup: '754966689',
  /** QQ 群分享卡片直链（群主生成，点击直达群聊页；qun.qq.com 首页需手动搜群号） */
  qqGroupUrl:
    'https://qun.qq.com/universal-share/share?ac=1&authKey=Uvy%2FwCNH6jghAKvofJE3uKqEEIM0Y0O8h9IBC0JEX%2BafERX1SdaJDD0XEZjZD33y&busi_data=eyJncm91cENvZGUiOiI3NTQ5NjY2ODkiLCJ0b2tlbiI6IitYODc1bXVpWEYycmh0V1FFL0NhNWVvaVdLS3NnU3lzZlZiZVMwNG90Y3lSQm53MzFLOUY3b1VkcXF0SExEcW8iLCJ1aW4iOiIyNzQ3Nzg5OTE5In0%3D&data=vMps1YS2bG4O5dfL8kc8n-XRUWMUo9FCnVjoUjDwSU_YI41N5_ddwC4WgypLXjf00z_-STGjlgI4ndCxDfggRQ&svctype=4&tempid=h5_group_info',
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
  version: '最新高版本（跨版本支持）',
  difficulty: '困难（Hard）',
  gameMode: '生存（Survival）',
  maxPlayers: 2333,
  motd: 'Pepper❤Craft | 26.1.2 基于原版,忠于原版',
  auth: '强制正版验证',
  eula: '完全遵守官方 EULA',
} as const
