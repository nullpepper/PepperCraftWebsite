import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { formatUptime } from '../utils/format'
import { SCREENS } from '../stores/fullpage'
import HomeView from '../views/HomeView.vue'

// mock fullpage.js：jsdom 中不需要真实滚动分页，只需验证结构
vi.mock('fullpage.js', () => {
  return {
    default: class FullPageMock {
      moveTo = vi.fn()
      destroy = vi.fn()
    },
  }
})

// ===== 验收标准 1：运行时长计算（开服时间 2023-02-20） =====
describe('PepperCraft 网站核心行为', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('运行时长计算：从 2023-02-20 起正确累计天数', () => {
    const now = new Date('2024-02-20T00:00:00+08:00')
    const uptime = formatUptime(now)
    expect(uptime.days).toBe(365)
    expect(uptime.hours).toBe(0)
  })

  it('运行时长计算：早于开服时间不出现负数', () => {
    const uptime = formatUptime(new Date('2020-01-01T00:00:00+08:00'))
    expect(uptime.days).toBe(0)
    expect(uptime.seconds).toBe(0)
  })

  it('首页渲染原站全部关键信息', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: { RouterView: true },
      },
    })
    const text = wrapper.text()
    expect(text).toContain('PepperCraft')
    expect(text).toContain('pepper.ltd')
    expect(text).toContain('754966689')
    expect(text).toContain('2747789919')
    expect(text).toContain('docs.pepper.ltd')
    expect(text).toContain('2023-02-20')
    expect(text).toContain('3 年')
  })

  it('全屏分页结构：DOM 屏数与 SCREENS 定义一致', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: { RouterView: true },
      },
    })
    // 断言绑定 SCREENS，避免增删屏后测试与导航指示点脱节
    expect(wrapper.findAll('.fp-screen').length).toBe(SCREENS.length)
    // 屏内容关键词抽查
    const text = wrapper.text()
    expect(text).toContain('红石自由')
    expect(text).toContain('拒绝冗余')
    expect(text).toContain('技术保障')
    expect(text).toContain('常见问题')
    expect(text).toContain('立即加入')
  })

  it('fullpage store 初始状态定位在首屏', async () => {
    const { useFullPageStore } = await import('../stores/fullpage')
    const store = useFullPageStore()
    expect(store.screens).toEqual(SCREENS)
    expect(store.currentScreen.id).toBe('hero')
    expect(store.hasLeftFirstScreen).toBe(false)
  })

  it('goToId 通过注入的 fullpage 实例跳屏（section 索引从 1 开始）', async () => {
    const { useFullPageStore } = await import('../stores/fullpage')
    const store = useFullPageStore()
    const moveTo = vi.fn()
    store.setApi({ moveTo })

    store.goToId('join')
    expect(moveTo).toHaveBeenCalledWith(SCREENS.findIndex((s) => s.id === 'join') + 1)

    // 未知 id 不应触发跳转
    moveTo.mockClear()
    store.goToId('nope')
    expect(moveTo).not.toHaveBeenCalled()

    store.setApi(null)
  })

  it('离开首屏后 hasLeftFirstScreen 置真（导航栏/返回顶部据此显示）', async () => {
    const { useFullPageStore } = await import('../stores/fullpage')
    const store = useFullPageStore()
    store.setCurrent(2)
    expect(store.hasLeftFirstScreen).toBe(true)
    expect(store.currentScreen.id).toBe('about')
  })
})
