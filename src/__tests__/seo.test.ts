import { describe, it, expect } from 'vitest'

// vitest 与 Vite 共用转换管线：glob ?raw 在运行期读取 index.html，
// 不引入 node:fs（tsconfig types 显式白名单，无 @types/node）
const html = Object.values(
  import.meta.glob('../../index.html', { query: '?raw', import: 'default', eager: true }),
)[0] as string

describe('SEO 基础元信息', () => {
  it('声明 canonical 链接，避免重复内容被分流', () => {
    expect(html).toContain('<link rel="canonical"')
  })

  it('补齐 twitter:title / twitter:description', () => {
    expect(html).toContain('name="twitter:title"')
    expect(html).toContain('name="twitter:description"')
  })

  it('输出 GameServer 结构化数据（JSON-LD）', () => {
    expect(html).toContain('application/ld+json')
    expect(html).toContain('"@type": "GameServer"')
  })

  it('初始 HTML 内嵌首屏关键文本（无 JS 爬虫/禁 JS 用户可见，修复：body 仅 <div id="app"> 空白）', () => {
    // 骨架放在 #app 内，Vue 挂载时整体替换，不会重复渲染
    const appStart = html.indexOf('<div id="app">')
    expect(appStart).toBeGreaterThan(-1)
    const appBlock = html.slice(appStart)
    // H1 是 Pepper<span>Craft</span>（双色字标），按 DOM 文本拆开断言
    expect(appBlock).toContain('Pepper')
    expect(appBlock).toContain('Craft')
    expect(appBlock).toContain('pepper.ltd')
    expect(appBlock).toContain('754966689') // QQ 群
    expect(appBlock).toContain('docs.pepper.ltd') // 文档域名
  })
})
