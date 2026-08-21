/** 服务器开服时间（原站声明：2023-02-20） */
export const SERVER_START = new Date('2023-02-20T00:00:00+08:00')

export interface Uptime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/** 计算自开服以来的运行时长，早于开服时间返回全 0 */
export function formatUptime(now: Date = new Date()): Uptime {
  const diff = Math.max(0, now.getTime() - SERVER_START.getTime())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}
