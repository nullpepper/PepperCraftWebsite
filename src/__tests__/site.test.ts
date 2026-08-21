import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { formatUptime } from '../utils/format'
import HomeView from '../views/HomeView.vue'

// ===== 验收标准 1：运行时长计算（开服时间 2023-02-20） =====
describe('PepperCraft 网站核心行为', () => {
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
        stubs: { RouterLink: true, RouterView: true },
      },
    })
    const text = wrapper.text()
    expect(text).toContain('Pepper Craft')
    expect(text).toContain('pepper.ltd')
    expect(text).toContain('754966689')
    expect(text).toContain('2747789919')
    expect(text).toContain('docs.pepper.ltd')
    expect(text).toContain('2023-02-20')
    expect(text).toContain('3 年')
  })
})
