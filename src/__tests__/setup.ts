// 测试环境 polyfill：jsdom 缺少 IntersectionObserver
class IntersectionObserverMock {
  callback: IntersectionObserverCallback
  elements = new Set<Element>()

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }

  observe(el: Element) {
    this.elements.add(el)
    // 立即触发一次回调，模拟元素已在视口内（让 reveal 内容直接可见）
    this.callback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  unobserve(el: Element) {
    this.elements.delete(el)
  }

  disconnect() {
    this.elements.clear()
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  root = null
  rootMargin = ''
  thresholds = [0]
}

;(globalThis as any).IntersectionObserver = IntersectionObserverMock
