import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NavBar from '../components/NavBar.vue'
import { useFullPageStore } from '../stores/fullpage'

describe('导航移动端菜单：Esc 关闭 / 滚动锁 / 遮罩', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useFullPageStore().setApi({ moveTo: vi.fn() })
  })
  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('打开菜单时锁定页面滚动', async () => {
    const wrapper = mount(NavBar)
    await wrapper.find('.nav-toggle').trigger('click')

    expect(wrapper.find('.nav-links').classes()).toContain('open')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('按 Esc 关闭菜单并释放滚动锁', async () => {
    const wrapper = mount(NavBar)
    await wrapper.find('.nav-toggle').trigger('click')
    expect(wrapper.find('.nav-links').classes()).toContain('open')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.nav-links').classes()).not.toContain('open')
    expect(document.body.style.overflow).toBe('')
  })

  it('提供遮罩层，点击遮罩关闭菜单', async () => {
    const wrapper = mount(NavBar)
    await wrapper.find('.nav-toggle').trigger('click')

    const backdrop = wrapper.find('.nav-backdrop')
    expect(backdrop.exists()).toBe(true)

    await backdrop.trigger('click')
    expect(wrapper.find('.nav-links').classes()).not.toContain('open')
  })
})
