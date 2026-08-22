import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import ServerStatusCard from '../components/ServerStatusCard.vue'

// 验收标准 3：实时状态 API 失败时优雅降级（显示「状态暂不可用」等）
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

  it('主 API 返回 MOTD 时将其作为真实服务器版本信息保存', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        online: true,
        players: 17,
        version: { name: 'Velocity' },
        motd: { clean: ['PepperCraft 1.21.8', '高版本纯净生存'] },
      }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.version).toBe('Velocity')
    expect(store.motd).toBe('PepperCraft 1.21.8 高版本纯净生存')
  })

  it('主 API 失败且备用 API 也失败时，降级为"维护中"状态', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'))

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('error')
  })

  it('主 API 异常时回退到备用 API，并解析其 MOTD 与人数上限', async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error('primary down'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          online: true,
          players: { online: 8, max: 200 },
          version: { name_clean: '1.21.8' },
          motd: { raw: '§aPepperMC  §7生存' },
        }),
      } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('online')
    expect(store.players).toBe(8)
    expect(store.maxPlayers).toBe(200)
    expect(store.version).toBe('1.21.8')
    expect(store.motd).toBe('§aPepperMC §7生存')
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

  it('轮询刷新时保留上一次状态，不闪回 loading', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ online: true, players: 17 }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()
    expect(store.status).toBe('online')

    // 第二次轮询：请求挂起期间，界面应继续展示上一次结果而不是「正在获取…」
    let resolveSecond!: (v: Response) => void
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          resolveSecond = resolve
        }),
    )
    const pending = store.fetchStatus()
    expect(store.status).toBe('online')
    expect(store.players).toBe(17)

    resolveSecond({ ok: true, json: async () => ({ online: true, players: 20 }) } as Response)
    await pending
    expect(store.players).toBe(20)
  })

  it('主 API players 为非法字符串时，players 兜底为 0 而不是 NaN', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ online: true, players: 'abc' }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()

    expect(store.status).toBe('online')
    expect(store.players).toBe(0)
    expect(Number.isNaN(store.players)).toBe(false)
  })

  it('双 API 失败进入 error 时，保留上次成功检查时间', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ online: true, players: 5 }),
    } as Response)

    const { useStatusStore } = await import('../stores/status')
    const store = useStatusStore()
    await store.fetchStatus()
    const lastCheck = store.lastCheck
    expect(lastCheck).toBeInstanceOf(Date)

    vi.mocked(fetch).mockRejectedValue(new Error('network down'))
    await store.fetchStatus()

    expect(store.status).toBe('error')
    expect(store.lastCheck).toBe(lastCheck)
  })

  it('双 API 失败时，状态卡文案显示「状态暂不可用」而非「维护中」', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'))

    const wrapper = mount(ServerStatusCard)
    await flushPromises()

    expect(wrapper.text()).toContain('状态暂不可用')
    expect(wrapper.text()).not.toContain('维护中')
  })
})
