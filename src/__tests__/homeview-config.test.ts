import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomeView from '../views/HomeView.vue'

let lastOptions: Record<string, unknown> | null = null

// mock fullpage.js：捕获构造参数以断言配置；不在 jsdom 中初始化真实分页
vi.mock('fullpage.js', () => {
  return {
    default: class FullPageMock {
      moveTo = vi.fn()
      destroy = vi.fn()
      constructor(_selector: string, opts: Record<string, unknown>) {
        lastOptions = opts
      }
    },
  }
})

describe('HomeView：评审修复（平板断点 / 首屏图片 / 卡头取景）', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    lastOptions = null
    // 避免单测真实请求状态 API
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline in tests')))
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('responsiveWidth 与 CSS 断点对齐为 900（修复：769–900px 全屏分页卡死）', () => {
    mount(HomeView, { global: { plugins: [createPinia()] } })
    expect(lastOptions?.responsiveWidth).toBe(900)
  })

  it('Hero 背景以 <img> 渲染（fetchpriority=high），浏览器尽早发现并下载', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
    const img = wrapper.find('.hero-photo')
    expect(img.exists()).toBe(true)
    expect(img.attributes('fetchpriority')).toBe('high')
    expect(img.attributes('alt')).toBe('')
  })

  it('Hero 背景提供三档 srcset（1920/2560/3840w）+ sizes=100vw，高分屏按需取档不拉伸', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
    const img = wrapper.find('.hero-photo')
    const srcset = img.attributes('srcset') ?? ''
    expect(srcset).toContain('1920w')
    expect(srcset).toContain('2560w')
    expect(srcset).toContain('3840w')
    expect(img.attributes('sizes')).toBe('100vw')
  })

  it('分屏大图（状态/关于）同样带三档 srcset，且 sizes 按 42vw 取档', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
    const imgs = wrapper.findAll('.split-media img')
    expect(imgs.length).toBe(2)
    for (const img of imgs) {
      const srcset = img.attributes('srcset') ?? ''
      expect(srcset).toContain('3840w')
      expect(img.attributes('sizes')).toBe('(max-width: 900px) 100vw, 42vw')
    }
  })

  it('首张特色卡头对齐图片底部，避免裁到灰白天空带', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
    const first = wrapper.findAll('.feature-media img')[0]
    expect(first.attributes('style') ?? '').toContain('bottom')
  })

  it('每个 FAQ 按钮的 aria-controls 指向常驻存在的元素（修复：答案 v-if 时折叠项悬空引用）', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
    const buttons = wrapper.findAll('.faq-q')
    expect(buttons.length).toBeGreaterThan(1)
    for (const btn of buttons) {
      const id = btn.attributes('aria-controls')
      expect(id).toBeTruthy()
      expect(wrapper.element.querySelector('#' + id)).not.toBeNull()
    }
  })
})
