import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CopyButton from '../components/CopyButton.vue'

describe('CopyButton 无障碍反馈', () => {
  it('提供 role=status（隐含 aria-live=polite）状态区，复制结果可被读屏播报', () => {
    const wrapper = mount(CopyButton, { props: { text: 'pepper.ltd', label: '复制 IP' } })
    // role="status" 等价于 aria-live="polite" aria-atomic="true"
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })
})
