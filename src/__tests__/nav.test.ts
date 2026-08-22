import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AppFooter from '../components/AppFooter.vue'
import BackToTop from '../components/BackToTop.vue'
import { SCREENS, useFullPageStore } from '../stores/fullpage'

/**
 * 回归测试：fullpage 以 CSS transform 翻页，各屏没有 DOM id、window.scrollY 恒为 0。
 * 页脚导航曾用 getElementById 而点击无反应，返回顶部按钮曾永不出现。
 */
describe('全屏分页下的站内导航', () => {
  const indexOf = (id: string) => SCREENS.findIndex((s) => s.id === id) + 1

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('页脚导航通过 store 跳屏，而非查找 DOM id', async () => {
    const moveTo = vi.fn()
    useFullPageStore().setApi({ moveTo })

    const wrapper = mount(AppFooter)
    const links = wrapper.findAll('.footer-links button')
    const about = links.find((a) => a.text() === '关于')!
    const join = links.find((a) => a.text() === '加入我们')!
    const top = links.find((a) => a.text() === '返回顶部')!

    // 无障碍回归：站内跳转必须是可聚焦的 button（无 href 的 <a> 不进 Tab 键序）
    expect(about.element.tagName).toBe('BUTTON')
    expect(join.element.tagName).toBe('BUTTON')
    expect(top.element.tagName).toBe('BUTTON')

    await about.trigger('click')
    expect(moveTo).toHaveBeenLastCalledWith(indexOf('about'))

    await join.trigger('click')
    expect(moveTo).toHaveBeenLastCalledWith(indexOf('join'))

    await top.trigger('click')
    expect(moveTo).toHaveBeenLastCalledWith(indexOf('hero'))
  })

  it('返回顶部按钮：首屏隐藏，离开首屏后出现并跳回首屏', async () => {
    const moveTo = vi.fn()
    const store = useFullPageStore()
    store.setApi({ moveTo })

    const wrapper = mount(BackToTop)
    expect(wrapper.find('.back-top').exists()).toBe(false)

    store.setCurrent(2)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.back-top').exists()).toBe(true)

    await wrapper.find('.back-top').trigger('click')
    expect(moveTo).toHaveBeenCalledWith(indexOf('hero'))
  })
})
