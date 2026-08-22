import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NavBar from '../components/NavBar.vue'
import { useFullPageStore } from '../stores/fullpage'

/** jsdom 不实现 matchMedia；用可替换的 innerWidth 模拟视口断点（<=960 为移动端） */
function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    writable: true,
    configurable: true,
  })
}

describe('导航移动端菜单：Esc 关闭 / 滚动锁 / 遮罩', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useFullPageStore().setApi({ moveTo: vi.fn() })
    // 本组用例默认模拟移动视口；桌面用例自行删除该 shadow 属性恢复默认 1024
    setViewportWidth(375)
  })
  afterEach(() => {
    document.body.style.overflow = ''
    delete (window as unknown as { innerWidth?: number }).innerWidth
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

  it('桌面视口下 nav-links 不带 inert / aria-hidden，导航按钮可点击（修复：悬浮导航曾整栏 inert 不可点）', async () => {
    delete (window as unknown as { innerWidth?: number }).innerWidth // 恢复 jsdom 默认 1024（桌面）
    const moveTo = vi.fn()
    useFullPageStore().setApi({ moveTo })

    const wrapper = mount(NavBar)

    const nav = wrapper.find('.nav-links')
    expect(nav.attributes('inert')).toBeUndefined()
    expect(nav.attributes('aria-hidden')).not.toBe('true')

    await wrapper.find('.nav-brand').trigger('click')
    expect(moveTo).toHaveBeenCalledWith(1) // goToId('hero') -> fullpage moveTo(1)

    // 链接按钮与「立即加入」同样可点击
    const about = wrapper.findAll('.nav-link').find((b) => b.text() === '关于')!
    await about.trigger('click')
    expect(moveTo).toHaveBeenLastCalledWith(3) // about 是 SCREENS[2]，moveTo 从 1 开始
  })

  it('resize 同步 isMobile：切到移动视口补上 inert，切回桌面移除', async () => {
    delete (window as unknown as { innerWidth?: number }).innerWidth
    const wrapper = mount(NavBar)
    expect(wrapper.find('.nav-links').attributes('inert')).toBeUndefined()

    setViewportWidth(375)
    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.nav-links').attributes('inert')).toBeDefined()

    setViewportWidth(1280)
    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.nav-links').attributes('inert')).toBeUndefined()
  })
})
