import type { IconName } from '../components/icons'

export interface Feature {
  icon: IconName
  title: string
  desc: string
  points: string[]
  image?: string
}

/** 三大核心特色（继承原网站） */
export const CORE_FEATURES: Feature[] = [
  {
    icon: 'bolt',
    title: '优化原版 & 红石自由',
    desc: '扩展内容符合原版风格，跟随 Mojang 同步更新。生电玩家的乐园，拥有壮观的增强地形生成。',
    points: ['允许高频红石、刷铁机', '支持地毯 / TNT 等特性复制', '增强地形生成'],
    image: 'assets/img/Redstone.png',
  },
  {
    icon: 'shield',
    title: '拒绝冗余，回归纯净',
    desc: '没有臃肿的虚拟货币，没有复杂的地皮系统。只有最纯粹的方块世界和最纯正的生存挑战。',
    points: ['原版钻石实体货币', '家园 / 联盟双轨领地', '可扩展公会系统'],
    // 原为 Residence.png，画面偏灰暗、辨识度低，换成夜景木屋（能体现「能长久居住」）
    image: 'assets/img/Image-1.jpg',
  },
  {
    icon: 'wrench',
    title: '强大的技术保障',
    desc: '腐竹拥有 3 年以上专业开发经验，服内插件自研率超 18.5%。',
    points: ['本地 / 异地双重备份', '付费级混合反作弊', '强制正版验证，完全遵守官方 EULA'],
    // 原为 photo.png，该图移作「关于」屏满幅主视觉
    image: 'assets/img/Image-2.jpg',
  },
]

/** 进阶玩法标签（首页「特色玩法」屏底部） */
export interface FeatureTag {
  icon: IconName
  title: string
  desc: string
  /** technical 使用蓝色配色，默认绿色 */
  variant?: 'technical'
}

export const FEATURE_TAGS: FeatureTag[] = [
  {
    icon: 'castle',
    title: '联盟与领地',
    desc: '自研公会系统：职位权限、公会账户（崩溃不丢钱）、盟友 PvP 双门禁；区块级领地保护，服务器现有 25 个联盟。',
  },
  { icon: 'gem', title: '钻石经济', desc: '以原版钻石为硬通货，/bank 存取，没有膨胀的虚拟币。' },
  {
    icon: 'bot',
    title: 'QQ 机器人联动',
    desc: '自研 QQ 机器人：聊天同步、指令转发、自动回复。',
    variant: 'technical',
  },
  {
    icon: 'globe',
    title: '跨版本支持',
    desc: 'Java 版全版本 + 基岩版玩家均可进入。',
    variant: 'technical',
  },
]

/** 技术保障要点（首页「关于」屏） */
export const TECH_GUARANTEES: string[] = [
  '本地 + 异地双重备份',
  '付费级混合反作弊',
  '强制正版验证',
  '完全遵守官方 EULA',
  '腐竹 3 年+ 开发经验',
  '插件自研率超 18.5%',
]
