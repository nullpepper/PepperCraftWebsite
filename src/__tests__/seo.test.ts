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
})
