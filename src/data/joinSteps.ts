/**
 * 加入三步引导（屏5）。
 *
 * 服务器无自研客户端：玩家用 Mojang 官方启动器即可进入，
 * 因此引导不出现「下载客户端」类承诺，只讲官方路径。
 */
export interface JoinStep {
  title: string
  desc: string
}

export const JOIN_STEPS: JoinStep[] = [
  {
    title: '打开官方客户端',
    desc: 'Java 版（含旧版本）或基岩版皆可，直接用 Mojang 官方启动器，不需要任何额外程序。',
  },
  {
    title: '添加服务器',
    desc: '游戏内进入「多人游戏 → 添加服务器」，地址填写 pepper.ltd，使用 Mojang 账号登录即可（强制正版验证）。',
  },
  {
    title: '加入开玩',
    desc: '双击服务器即可进入世界，开启你的方块之旅——碰到问题随时到交流群提问。',
  },
]
