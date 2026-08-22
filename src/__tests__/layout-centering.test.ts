import { describe, it, expect } from 'vitest'
// Vite ?raw：把 SFC 源码以字符串导入（jsdom/vitest 环境，避免 node fs/path 依赖与类型声明缺失）
import viewSource from '../views/HomeView.vue?raw'

/**
 * 验收标准：屏4（特色玩法）与屏5（加入我们）的内容块水平居中、收进 --container，
 * 格式与内部排版不变（doublecheck-spec，2026-08-22）。
 * jsdom 不做布局计算，此处钉住两个可观察契约：
 *   1. 水平 padding 使用左右对称公式 max(calc((100% - var(--container)) / 2), 24px)；
 *   2. padding 为三值简写（T R B，CSS 语义 left = right），而非四值显式左 24px。
 * 原实现（四值、左 24px）不满足 → 本测试为红；对称三值实现 → 绿。
 */
const source = viewSource

/** 取出指定选择器块内的 padding 声明（规范化空白） */
function paddingOf(selector: string): string | null {
  const block = source.match(new RegExp(`\\.${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? ''
  const decl = block.match(/padding:\s*([^;]+);/)?.[1] ?? null
  return decl === null ? null : decl.replace(/\s+/g, ' ').trim()
}

const SYMMETRIC = (top: string, bottom: string) =>
  new RegExp(
    `^calc\\(var\\(--nav-h\\) \\+ ${top}\\) ` +
      `max\\(calc\\(\\(100% - var\\(--container\\)\\) \\/ 2\\), 24px\\) ${bottom}$`,
  )

describe('屏4/屏5 内容块水平居中（对称 padding）', () => {
  it('.features-screen：三值简写，左右 = max((100%-容器)/2, 24px)，无显式左 24px', () => {
    const p = paddingOf('features-screen')
    expect(p).toBeTruthy()
    expect(p).toMatch(SYMMETRIC('28px', '30px'))
    // 明确拒绝旧实现：四值、左固定 24px
    expect(p).not.toMatch(/max\(calc\(\(100% - var\(--container\)\) \/ 2\), 24px\) \d+px 24px$/)
  })

  it('.join-screen：三值简写，左右 = max((100%-容器)/2, 24px)，无显式左 24px', () => {
    const p = paddingOf('join-screen')
    expect(p).toBeTruthy()
    expect(p).toMatch(SYMMETRIC('26px', '26px'))
    expect(p).not.toMatch(/max\(calc\(\(100% - var\(--container\)\) \/ 2\), 24px\) \d+px 24px$/)
  })
})
