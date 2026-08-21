/** 服务器大事记时间线（原网站 + 容器数据还原） */
export interface TimelineEvent {
  date: string
  title: string
  desc: string
  icon: string
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: '2023-02-20',
    title: 'PepperCraft 开服',
    desc: '高版本纯净生存公益服正式上线，秉持"基于原版，忠于原版"的初心。',
    icon: '🚀',
  },
  {
    date: '2023-06',
    title: '官网 1.0 上线',
    desc: '首个官网发布，宣告 Pepper Craft 的公益理念与特色玩法。',
    icon: '🌐',
  },
  {
    date: '2024-02',
    title: '社区持续壮大',
    desc: '日均在线 30+，玩家社区形成规模，联盟与生电文化蓬勃发展。',
    icon: '🏘️',
  },
  {
    date: '2025-01',
    title: '3 年存档承诺',
    desc: '郑重决定：3 年内不再清除存档内容！存档长久保障，欢迎入驻。',
    icon: '📜',
  },
  {
    date: '2025-07',
    title: '官方文档开放',
    desc: 'PepperServer-Document 上线 docs.pepper.ltd：联盟、领地、经济一册通览。',
    icon: '📚',
  },
  {
    date: '2026-01',
    title: '官网全新改版',
    desc: '以 Vue 3 现代化重构官网，继承全部信息并引入实时状态、联盟展示、插件画廊等新功能。',
    icon: '✨',
  },
]

/** 数据一览（快照：来自服务器容器真实数据） */
export const SNAPSHOT_STATS = {
  players: 205,
  totalHours: 14658,
  towns: 25,
  online: '30+',
  startDate: '2023-02-20',
}
