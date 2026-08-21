/** 城镇成就（来自 PepperServer-Document · HuskTowns 成就系统） */
export interface Achievement {
  name: string
  desc: string
  tier: '普通' | '目标' | '挑战'
}

export const TOWN_ACHIEVEMENTS: Achievement[] = [
  { name: '扎根', desc: '创建或加入一个城镇', tier: '普通' },
  { name: '你并不孤单', desc: '有另一个成员加入你的城镇', tier: '普通' },
  { name: '陨落的王国', desc: '至少有 15 个独特的玩家离开你的城镇', tier: '普通' },
  { name: '八人成众', desc: '你的城镇有 8 个成员', tier: '普通' },
  { name: '繁华社区', desc: '你的城镇有 16 个成员', tier: '普通' },
  { name: '城市社区', desc: '你的城镇有 32 个成员', tier: '挑战' },
  { name: '守卫更替', desc: '你的城镇所有权被转移', tier: '普通' },
  { name: '已建立', desc: '你的城镇至少存在一周', tier: '普通' },
  { name: '新视野', desc: '为你的城镇认领第一块土地', tier: '普通' },
  { name: '村庄扩展', desc: '为你的城镇认领 6 块土地', tier: '普通' },
  { name: '正式成为城镇', desc: '为你的城镇认领 18 块土地', tier: '目标' },
  { name: '城市居民', desc: '为你的城镇认领 40 块土地', tier: '普通' },
  { name: '帝国事业', desc: '为你的城镇认领 80 块土地', tier: '挑战' },
  { name: '城镇仍在移动', desc: '将城镇的生成位置移动到其他地方', tier: '普通' },
  { name: '路标清晰', desc: '设置欢迎和告别消息', tier: '普通' },
  { name: '升级', desc: '将你的城镇升级到 2 级', tier: '普通' },
  { name: '五人组', desc: '将你的城镇升级到 5 级', tier: '目标' },
  { name: '高额赌注', desc: '将你的城镇升级到 10 级', tier: '普通' },
  { name: '你有钱', desc: '将你的城镇升级到 15 级', tier: '普通' },
  { name: '现在你只是在炫耀', desc: '将你的城镇升级到 20 级', tier: '挑战' },
  { name: '简史', desc: '为你的城镇设置一个简介', tier: '普通' },
  { name: '为城镇涂上红、绿、蓝', desc: '改变你的城镇颜色', tier: '目标' },
  { name: '省下一分钱', desc: '向城镇银行存入 100', tier: '普通' },
  { name: '赚到一分钱', desc: '向城镇银行存入 5,000', tier: '普通' },
  { name: '无利息', desc: '向城镇银行存入 15,000', tier: '普通' },
  { name: '可抵税', desc: '有 10 个独特的玩家向城镇银行存款', tier: '普通' },
  { name: '你需要一个审计员', desc: '有 25 个独特的玩家向城镇银行存款', tier: '普通' },
]
