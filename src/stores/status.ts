import { defineStore } from 'pinia'
import { SITE } from '../data/site'

export type ServerStatus = 'loading' | 'online' | 'offline' | 'error'

export interface ServerStatusState {
  status: ServerStatus
  players: number | null
  maxPlayers: number
  version: string | null
  motd: string | null
  lastCheck: Date | null
  checking: boolean
}

/**
 * 服务器实时状态 store
 * 主 API：uapis.cn（原网站使用）；备用 API：mcstatus.io；全部失败 → error（状态暂不可用）
 */
export const useStatusStore = defineStore('status', {
  state: (): ServerStatusState => ({
    status: 'loading',
    players: null,
    // 初始值取站点配置（与服务器容量一致 2333），API 返回后以实时数据覆盖
    maxPlayers: SITE.maxPlayers,
    version: null,
    motd: null,
    lastCheck: null,
    checking: false,
  }),

  actions: {
    async fetchStatus() {
      if (this.checking) return
      this.checking = true
      // 注意：轮询刷新时不把 status 重置为 loading——
      // 每 60s 闪一次「正在获取…」且在线人数短暂变「—」会造成断线错觉。
      // 只有首次加载（初始 status 即 loading）才展示加载态。
      try {
        // 主 API：uapis.cn
        const r = await fetch(
          `https://uapis.cn/api/v1/game/minecraft/serverstatus?server=${SITE.ip}`,
          { signal: AbortSignal.timeout(8000) },
        )
        const data = await r.json()
        if (data && data.online === true) {
          this.status = 'online'
          this.players = toPlayerCount(data.players, this.players)
          // uapis.cn 真实字段是顶层 max_players（如 2333），主分支必须同时更新
          this.maxPlayers = toPlayerCount(data.max_players ?? data.players?.max, this.maxPlayers)
          this.version =
            data.version?.name ??
            data.version?.name_clean ??
            data.version ??
            data.protocol?.name ??
            null
          // uapis.cn 无 motd/description 字段，返回的是 motd_clean/motd_html
          this.motd = normalizeMotd(
            data.motd_clean ?? data.motd_html ?? data.motd ?? data.description,
          )
          this.lastCheck = new Date()
          return
        }
        if (data && data.online === false) {
          this.status = 'offline'
          this.lastCheck = new Date()
          return
        }
        throw new Error('unexpected payload')
      } catch {
        // 备用 API：mcstatus.io
        try {
          const r2 = await fetch(`https://api.mcstatus.io/v2/status/java/${SITE.ip}`, {
            signal: AbortSignal.timeout(8000),
          })
          const d2 = await r2.json()
          if (d2 && d2.online === true) {
            this.status = 'online'
            this.players = toPlayerCount(d2.players?.online, this.players)
            this.maxPlayers =
              typeof d2.players?.max === 'number' && Number.isFinite(d2.players.max)
                ? d2.players.max
                : this.maxPlayers
            this.version = d2.version?.name ?? d2.version?.name_clean ?? null
            this.motd = normalizeMotd(d2.motd)
            this.lastCheck = new Date()
            return
          }
          if (d2 && d2.online === false) {
            this.status = 'offline'
            this.lastCheck = new Date()
            return
          }
          throw new Error('unexpected payload')
        } catch {
          // 双 API 均失败：保留上一次成功检查时间与展示数据，
          // 只切换状态标记，避免把「状态查询失败」渲染成「服务器消失」。
          this.status = 'error'
        }
      } finally {
        this.checking = false
      }
    },
  },
})

/**
 * 归一化在线人数：接受 number / 数字字符串；非法值（对象、NaN 字符串）兜底为
 * 上一次有效值（fallback），首次加载无历史值时取 0。绝不向 UI 输出 NaN。
 */
function toPlayerCount(raw: unknown, fallback: number | null): number {
  if (typeof raw === 'number' && Number.isFinite(raw)) return Math.max(0, Math.floor(raw))
  if (typeof raw === 'string') {
    const n = Number.parseInt(raw, 10)
    if (!Number.isNaN(n)) return Math.max(0, n)
  }
  return fallback ?? 0
}

/**
 * 归一化 MOTD：兼容字符串、字符串数组，以及
 * { clean } / { raw } / { text } 形式的对象（两个 API 都可能返回其中任意一种）
 */
function normalizeMotd(value: unknown): string | null {
  if (Array.isArray(value))
    return value.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim() || null
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').trim() || null
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    for (const key of ['clean', 'raw', 'text'] as const) {
      const resolved = normalizeMotd(obj[key])
      if (resolved) return resolved
    }
  }
  return null
}
