import { describe, expect, it } from 'vitest'
import { JOIN_STEPS } from '../data/joinSteps'

describe('joinSteps（加入屏三步引导）', () => {
  it('恰好三步，且标题/描述均非空', () => {
    expect(JOIN_STEPS).toHaveLength(3)
    for (const s of JOIN_STEPS) {
      expect(s.title.trim()).not.toBe('')
      expect(s.desc.trim()).not.toBe('')
    }
  })

  it('步骤顺序为：客户端 → 添加服务器 → 加入开玩', () => {
    expect(JOIN_STEPS[0].title).toContain('客户端')
    expect(JOIN_STEPS[1].title).toContain('添加服务器')
    expect(JOIN_STEPS[2].title).toContain('加入')
  })

  it('不引导下载任何客户端（服务器无自研客户端，使用官方启动器）', () => {
    const text = JOIN_STEPS.map((s) => s.title + s.desc).join('')
    expect(text).not.toMatch(/下载.{0,6}(客户端|启动器|安装包)/)
  })
})
