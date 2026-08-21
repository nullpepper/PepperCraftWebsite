import type { Component } from 'vue'

export interface Feature {
  icon: string
  title: string
  desc: string
  points: string[]
  image?: string
}

/** 三大核心特色（继承原网站） */
export const CORE_FEATURES: Feature[] = [
  {
    icon: '⚡',
    title: '优化原版 & 红石自由',
    desc: '扩展内容符合原版风格，跟随 Mojang 同步更新。生电玩家的乐园，拥有壮观的增强地形生成。',
    points: ['允许高频红石、刷铁机', '支持地毯 / TNT 等特性复制', '增强地形生成（TerraformGenerator）'],
    image: 'assets/img/Redstone.png',
  },
  {
    icon: '🛡️',
    title: '拒绝冗余，回归纯净',
    desc: '没有臃肿的虚拟货币，没有复杂的地皮系统。只有最纯粹的方块世界和最纯正的生存挑战。',
    points: ['原版钻石实体货币', '自由开关的领地保护', '基于区块的领地系统（联盟）'],
    image: 'assets/img/Residence.png',
  },
  {
    icon: '🛠️',
    title: '强大的技术保障',
    desc: '腐竹拥有 3 年以上专业开发经验，服内插件自研率超 18.5%。',
    points: ['本地 / 异地双重备份', '付费级混合反作弊（Matrix）', '强制正版验证，完全遵守官方 EULA'],
    image: 'assets/img/photo.png',
  },
]

/** 进阶玩法（从文档与服务器数据提炼） */
export const EXTRA_FEATURES: Feature[] = [
  {
    icon: '🏰',
    title: '联盟与领地',
    desc: 'HuskTowns 驱动的联盟系统：创建联盟、认领区块、农场与地块，规则自由开关。服务器现有 25 个联盟。',
    points: ['区块级领地保护', '联盟农场作物加速', '联盟成就与升级体系'],
  },
  {
    icon: '💎',
    title: '钻石银行经济',
    desc: '以原版钻石为硬通货：/bank 存入取出，城镇金库、联盟经济一脉相承。没有通货膨胀的虚拟币。',
    points: ['/bank gui 图形化管理', '钻石实体货币', '联盟金库存款'],
  },
  {
    icon: '🤖',
    title: 'QQ 机器人联动',
    desc: '自研 PepperBot 家族：QQ 聊天同步、指令转发、自动回复、玩家绑定，游戏内外无缝沟通。',
    points: ['双向聊天同步', 'QQ 指令触发服务器命令', '自动回复与自定义消息'],
  },
  {
    icon: '🌍',
    title: '多世界与跨版本',
    desc: 'ViaVersion / ViaBackwards 支持 1.8+ 全版本进入；Floodgate + Hurricane 原生支持基岩版玩家。',
    points: ['Java 版全版本兼容', '基岩版手机玩家支持', '主世界 / 下界 / 末地 + 独立出生世界'],
  },
  {
    icon: '🎯',
    title: 'PvP 与生存并重',
    desc: '困难模式 + 自由 PvP 开关：既满足生电玩家的稳定生产，又保留 PvP 玩家的竞技空间。',
    points: ['困难模式原汁原味', '领地内 PvP 可自定义', '高频红石稳定不卡服'],
  },
  {
    icon: '🎉',
    title: '主题活动与养老',
    desc: '服务器不定期举行主题活动，发放限定奖励与特殊称号。欢迎平时精力有限的玩家前来"养老"领奖。',
    points: ['限定奖励与特殊称号', '节日主题活动', '养老友好：不强制在线'],
  },
]
