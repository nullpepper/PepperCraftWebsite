import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// 验收标准 3：实时状态 API 失败时优雅降级（显示"维护中"等）
describe('服务器状态 store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('主 API 返回 online 时记录在线人数', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ online: true, players: 17 }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('online')
    expect(store.players).toBe(17)
  })

  it('主 API 失败且备用 API 也失败时，降级为"维护中"状态', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'))

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('error')
  })

  it('服务器明确离线时进入 offline 状态', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ online: false }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('offline')
  })
})
