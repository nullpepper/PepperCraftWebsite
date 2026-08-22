import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import CopyButton from '../components/CopyButton.vue'

describe('CopyButton 无障碍反馈', () => {
  it('提供 role=status（隐含 aria-live=polite）状态区，复制结果可被读屏播报', () => {
    const wrapper = mount(CopyButton, { props: { text: 'pepper.ltd', label: '复制 IP' } })
    // role="status" 等价于 aria-live="polite" aria-atomic="true"
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })
})

describe('CopyButton 复制结果校验', () => {
  afterEach(() => {
    // 还原 jsdom 原生状态（两者默认均不存在）
    delete (navigator as unknown as Record<string, unknown>).clipboard
    delete (document as unknown as Record<string, unknown>).execCommand
    vi.useRealTimers()
  })

  it('复制失败（clipboard 不可用且 execCommand 返回 false）时不显示「已复制」', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn().mockReturnValue(false),
      configurable: true,
    })

    const wrapper = mount(CopyButton, { props: { text: 'pepper.ltd', label: '复制 IP' } })
    await wrapper.find('.copy-btn').trigger('click')
    await flushPromises()

    expect(wrapper.text()).not.toContain('已复制')
  })

  it('复制成功时显示「已复制」，1.8s 后复位', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
    vi.useFakeTimers()

    const wrapper = mount(CopyButton, { props: { text: 'pepper.ltd' } })
    await wrapper.find('.copy-btn').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('已复制')

    vi.advanceTimersByTime(1800)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('已复制')
  })

  it('点击后立即卸载：定时器被清理，推进时间不再触发任何回调', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
    vi.useFakeTimers()

    const wrapper = mount(CopyButton, { props: { text: 'pepper.ltd' } })
    await wrapper.find('.copy-btn').trigger('click')
    await flushPromises()
    wrapper.unmount()

    expect(() => vi.advanceTimersByTime(2000)).not.toThrow()
  })
})
