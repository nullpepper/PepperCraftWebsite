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
 * 主 API：uapis.cn（原网站使用）；备用 API：mcstatus.io；全部失败 → error（维护中）
 */
export const useStatusStore = defineStore('status', {
  state: (): ServerStatusState => ({
    status: 'loading',
    players: null,
    maxPlayers: 1000,
    version: null,
    motd: null,
    lastCheck: null,
    checking: false,
  }),

  actions: {
    async fetchStatus() {
      if (this.checking) return
      this.checking = true
      this.status = 'loading'
      try {
        // 主 API：uapis.cn
        const r = await fetch(
          `https://uapis.cn/api/v1/game/minecraft/serverstatus?server=${SITE.ip}`,
          { signal: AbortSignal.timeout(8000) }
        )
        const data = await r.json()
        if (data && data.online === true) {
          this.status = 'online'
          this.players = typeof data.players === 'number' ? data.players : parseInt(data.players || '0', 10)
          this.version =
            data.version?.name ?? data.version?.name_clean ?? data.version ?? data.protocol?.name ?? null
          this.motd = normalizeMotd(data.motd ?? data.description)
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
            this.players = d2.players?.online ?? 0
            this.maxPlayers = d2.players?.max ?? 1000
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
          this.status = 'error'
          this.lastCheck = null
        }
      } finally {
        this.checking = false
      }
    },
  },
})

/**
 * 归一化 MOTD：兼容字符串、字符串数组，以及
 * { clean } / { raw } / { text } 形式的对象（两个 API 都可能返回其中任意一种）
 */
function normalizeMotd(value: unknown): string | null {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim() || null
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
