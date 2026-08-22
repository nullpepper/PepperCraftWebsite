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

  it('遮罩与导航栏平级：不受 .nav backdrop-filter 包含块影响（修复：fixed 后代会以 header 为包含块，高度坍缩为 0）', async () => {
    const wrapper = mount(NavBar)
    await wrapper.find('.nav-toggle').trigger('click')

    const backdrop = wrapper.find('.nav-backdrop')
    expect(backdrop.exists()).toBe(true)
    // .nav 有 backdrop-filter（blur(14px)），fixed 子元素会以其为包含块；
    // 遮罩必须不在 header 内，才能以视口为包含块覆盖全屏
    expect(backdrop.element.parentElement?.tagName).not.toBe('HEADER')
  })

  it('菜单关闭时 nav-links 带 inert 与 aria-hidden；打开后移除（不残留于 Tab 序/读屏）', async () => {
    const wrapper = mount(NavBar)

    const closed = wrapper.find('.nav-links')
    expect(closed.attributes('inert')).toBeDefined()
    expect(closed.attributes('aria-hidden')).toBe('true')

    await wrapper.find('.nav-toggle').trigger('click')
    await wrapper.vm.$nextTick()

    const opened = wrapper.find('.nav-links')
    expect(opened.attributes('inert')).toBeUndefined()
    expect(opened.attributes('aria-hidden')).toBe('false')
  })
})
