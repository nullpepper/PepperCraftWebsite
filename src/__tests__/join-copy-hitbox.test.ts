import { describe, it, expect } from 'vitest'
// Vite ?raw：把 SFC 源码以字符串导入（jsdom/vitest 环境，避免 node fs 依赖）
import viewSource from '../views/HomeView.vue?raw'

/**
 * 回归测试：fullpage.js 会把 section 内容包进 .fp-overflow（真浏览器实测确认），
 * 原 .join-screen > * { position: relative; z-index: 1 } 在包裹后只命中 .fp-overflow 本身，
 * 内部普通流内容（.contact-card 等）没有自己的层叠上下文，会被绝对定位、z-index:0 的
 * .join-bg 覆盖并拦截指针事件 → 腐竹 QQ 卡「复制」按钮点击无反应（IP 按钮因 .join-card
 * 带 backdrop-filter 自成层叠上下文而不受影响）。
 * 契约：装饰背景层不得参与命中测试，必须带 pointer-events: none。
 */
describe('join 屏背景层不拦截复制按钮点击', () => {
  it('.join-bg 带 pointer-events: none（真浏览器 elementFromPoint 命中 .join-bg 曾导致点击无反应）', () => {
    const block = viewSource.match(/\.join-bg\s*\{([^}]*)\}/)?.[1] ?? ''
    expect(block).toMatch(/pointer-events:\s*none/)
  })
})
