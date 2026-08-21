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

/** 千分位格式化数字 */
export function formatNumber(n: number, fractionDigits = 0): string {
  return n.toLocaleString('zh-CN', {
    maximumFractionDigits: fractionDigits,
  })
}

/** 钻石余额格式化（千分位，保留最多 2 位小数） */
export function formatBalance(n: number): string {
  return n.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
}

/** 格式化日期为 YYYY-MM-DD */
export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
