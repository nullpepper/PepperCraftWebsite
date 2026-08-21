/** 命令速查（来自 PepperServer-Document 文档仓库） */

export interface CommandGroup {
  title: string
  icon: string
  desc: string
  commands: { cmd: string; desc: string }[]
}

export const COMMAND_GROUPS: CommandGroup[] = [
  {
    title: '联盟系统 · /town',
    icon: '🏰',
    desc: 'HuskTowns 联盟系统：创建、管理、升级你的联盟。',
    commands: [
      { cmd: '/town create <名称>', desc: '创建一个联盟' },
      { cmd: '/town invite <玩家>', desc: '邀请玩家加入联盟' },
      { cmd: '/town claim', desc: '认领当前区块为领地' },
      { cmd: '/town unclaim', desc: '移除领地认领' },
      { cmd: '/town map', desc: '查看附近领地分布地图' },
      { cmd: '/town autoclaim', desc: '切换自动认领区块' },
      { cmd: '/town list', desc: '查看服务器联盟列表' },
      { cmd: '/town about <名称>', desc: '查看联盟信息' },
      { cmd: '/town spawn', desc: '传送到联盟重生点' },
      { cmd: '/town setspawn', desc: '设置联盟重生点' },
      { cmd: '/town promote / demote', desc: '提升 / 降低成员角色' },
      { cmd: '/town evict <成员>', desc: '驱逐联盟成员' },
      { cmd: '/town leave', desc: '离开联盟' },
      { cmd: '/town deposit / withdraw', desc: '存入 / 取出联盟金库' },
      { cmd: '/town level', desc: '支付钻石升级联盟' },
      { cmd: '/town farm', desc: '将领地转为联盟农场' },
      { cmd: '/town plot', desc: '将领地转为地块并管理' },
      { cmd: '/town rules', desc: '编辑领地规则（PvP/爆炸等）' },
      { cmd: '/town color <#rgb>', desc: '修改联盟地图颜色' },
      { cmd: '/town chat <消息>', desc: '发送联盟内部消息' },
      { cmd: '/town census', desc: '查看成员角色列表' },
      { cmd: '/town deeds', desc: '查看联盟领地清单' },
      { cmd: '/town transfer', desc: '转移联盟所有权' },
      { cmd: '/town disband', desc: '解散联盟' },
    ],
  },
  {
    title: '钻石银行 · /bank',
    icon: '💎',
    desc: '以原版钻石为硬通货的银行系统，存得放心，用得安心。',
    commands: [
      { cmd: '/bank gui', desc: '打开 GUI 管理界面（存取钻石）' },
      { cmd: '/bank save <数额>', desc: '将背包钻石存入银行' },
      { cmd: '/bank withdraw <数额>', desc: '从银行取出钻石' },
    ],
  },
  {
    title: '常用功能',
    icon: '🧭',
    desc: '日常高频指令，一页速查。',
    commands: [
      { cmd: '/sethome / home', desc: '设置家 / 传送回家' },
      { cmd: '/tpa <玩家>', desc: '请求传送到玩家处' },
      { cmd: '/spawn', desc: '返回出生点' },
      { cmd: '/kit', desc: '领取新手礼包' },
      { cmd: '/sit / lay', desc: '坐下 / 躺下（GSit）' },
    ],
  },
]
