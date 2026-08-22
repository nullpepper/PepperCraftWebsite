import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFullPageStore } from '../stores/fullpage'

describe('fullpage 响应式检测（body.fp-responsive 是 fullpage.js 真实挂载位置）', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.classList.remove('fp-responsive')
    document.body.innerHTML =
      '<div id="fullpage"><section class="fp-section"></section><section class="fp-section"></section><section class="fp-section"></section></div>'
    // jsdom 无 scrollIntoView：打桩以断言调用
    window.Element.prototype.scrollIntoView = vi.fn()
  })

  it('body 带 fp-responsive 时 goTo 走 scrollIntoView，而非 moveTo', () => {
    const store = useFullPageStore()
    const moveTo = vi.fn()
    store.setApi({ moveTo })
    document.body.classList.add('fp-responsive') // fullpage.js dist:2796 addClass($body, RESPONSIVE)

    store.goTo(1)

    expect(window.Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
    expect(moveTo).not.toHaveBeenCalled()
  })

  it('非响应式（无 body 类 / 无 matchMedia / 高度>620）时仍走 moveTo', () => {
    const store = useFullPageStore()
    const moveTo = vi.fn()
    store.setApi({ moveTo })

    store.goTo(1)

    expect(moveTo).toHaveBeenCalledWith(2) // fullpage section 索引从 1 开始
    expect(window.Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })
})
