/** 自研插件生态（来自 GitHub 公开仓库与服务器插件目录） */
export interface PluginItem {
  name: string
  desc: string
  github: string
  tags: string[]
  /** 是否已在服务器上运行 */
  live?: boolean
}

export const PLUGINS: PluginItem[] = [
  {
    name: 'PepperLib',
    desc: '全插件共享的基础库：自适应加载、API 兼容层，为整个 Pepper 插件家族提供统一的地基。',
    github: 'https://github.com/nullpepper/PepperLib',
    tags: ['基础库', 'API'],
    live: true,
  },
  {
    name: 'PepperClaim',
    desc: '基于区块的领地系统：自由开关的领地保护，为纯净生存提供恰到好处的安心感。',
    github: 'https://github.com/nullpepper/PepperClaim',
    tags: ['领地', '保护'],
    live: true,
  },
  {
    name: 'PepperUnion',
    desc: '可扩展的联盟（公会）系统：联盟领地、成员管理、金库经济，多人协作的社交核心。',
    github: 'https://github.com/nullpepper/PepperUnion',
    tags: ['联盟', '社交'],
  },
  {
    name: 'PepperBotCore',
    desc: '统一 NapCat / SnowLuma / onebots（OneBot v11）的 Java API，让 Minecraft 插件以一套接口对接 QQ 机器人。',
    github: 'https://github.com/nullpepper/PepperBotCore',
    tags: ['QQ 机器人', '框架'],
    live: true,
  },
  {
    name: 'PepperBotBindManager',
    desc: 'QQ ↔ Minecraft 玩家双向绑定服务：绑定即绑定身份，杜绝冒名顶替。',
    github: 'https://github.com/nullpepper/PepperBotBindManager',
    tags: ['QQ 绑定'],
    live: true,
  },
  {
    name: 'PepperBotChatSync',
    desc: '游戏 ↔ QQ 双向聊天桥：服务器内聊天实时同步到 QQ 群，群内消息也进游戏。',
    github: 'https://github.com/nullpepper/PepperBotChatSync',
    tags: ['聊天同步'],
    live: true,
  },
  {
    name: 'PepperBotCommandDispatcher',
    desc: '从 QQ 消息触发服务器命令，绑定玩家权限校验，安全可控的远程指令入口。',
    github: 'https://github.com/nullpepper/PepperBotCommandDispatcher',
    tags: ['指令转发'],
    live: true,
  },
  {
    name: 'PepperBotCustomMessage',
    desc: '基于规则的 QQ 自动回复：PAPI 变量 / 条件 / 权限 / 图片渲染，灵活的机器人话术引擎。',
    github: 'https://github.com/nullpepper/PepperBotCustomMessage',
    tags: ['自动回复'],
    live: true,
  },
  {
    name: 'PepperMinecart',
    desc: '让矿车真正有用的玩法插件：动力矿车、运输优化，机械党的福音。',
    github: 'https://github.com/nullpepper/PepperMinecart',
    tags: ['矿车', '机械'],
    live: true,
  },
  {
    name: 'PepperEject',
    desc: '乘坐与弹射机制增强：副手交互优化，为生电与交通玩法补齐细节。',
    github: 'https://github.com/nullpepper/PepperEject',
    tags: ['交互', '机制'],
    live: true,
  },
  {
    name: 'PepperDiamond',
    desc: '钻石银行：把原版钻石变成真正的实体货币，/bank 存取，纯净服的经济基石。',
    github: 'https://github.com/nullpepper/PepperDiamond',
    tags: ['经济', '银行'],
    live: true,
  },
  {
    name: 'PepperReply',
    desc: '轻量自动回复插件：关键词触发固定回复，社区问答自动应答。',
    github: 'https://github.com/nullpepper/PepperReply',
    tags: ['自动回复'],
  },
  {
    name: 'PepperTrashBin',
    desc: 'Paper/Folia 回收站插件：事件溯源 + 投影 + 链式路由，物品回收的正确姿势。',
    github: 'https://github.com/nullpepper/PepperTrashBin',
    tags: ['回收', '事件溯源'],
  },
]

/** 服务器主要第三方插件（来自容器插件目录） */
export const THIRD_PARTY_PLUGINS = [
  'HuskTowns 联盟领地',
  'HuskHomes 传送',
  'XConomy 经济',
  'Matrix 反作弊',
  'LuckPerms 权限',
  'WorldGuard 世界保护',
  'FastAsyncWorldEdit 创世神',
  'CoreProtect 方块审计',
  'TerraformGenerator 地形生成',
  'ViaVersion 跨版本',
  'Floodgate 基岩版',
  'GSit 动作系统',
  'DecentHolograms 浮空字',
  'PlayerKits2 礼包',
  'TrChat 聊天',
  'TAB 名牌',
  'Multiverse 多世界',
  'spark 性能分析',
  'Chunky 地形预加载',
  'SuperVanish 隐身',
] as const
