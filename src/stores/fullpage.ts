import { defineStore } from 'pinia'

/** 全屏分页屏幕定义 */
export interface FullPageScreen {
  id: string
  label: string
}

export const SCREENS: FullPageScreen[] = [
  { id: 'hero', label: '首页' },
  { id: 'status', label: '运行状态' },
  { id: 'about', label: '关于' },
  { id: 'features', label: '特色玩法' },
  { id: 'join', label: '加入我们' },
  { id: 'faq', label: 'FAQ' },
  { id: 'footer', label: '页尾' },
]

/** fullpage.js 实例的最小接口（只用到跳屏） */
interface FullPageApi {
  moveTo: (section: number | string, slide?: number) => void
}

/**
 * fullpage 实例存放在模块作用域而非 store state：
 * 它持有大量 DOM 引用，放进 state 会被 Pinia 深度响应式代理。
 * 由 HomeView 在挂载时注入（避免 store → 视图的循环依赖）。
 */
let api: FullPageApi | null = null

/** 全屏分页状态：维护当前屏、屏幕列表与跳屏动作。 */
export const useFullPageStore = defineStore('fullpage', {
  state: () => ({
    currentIndex: 0,
    screens: SCREENS,
  }),

  getters: {
    currentScreen(state): FullPageScreen {
      return state.screens[state.currentIndex] ?? state.screens[0]
    },

    /**
     * 是否已离开首屏。fullpage 用 CSS transform 翻页，window.scrollY 恒为 0，
     * 因此导航栏与返回顶部按钮的「已滚动」判断需要基于当前屏。
     */
    hasLeftFirstScreen(state): boolean {
      return state.currentIndex > 0
    },
  },

  actions: {
    /** 注入 fullpage 实例（HomeView 初始化时调用） */
    setApi(instance: FullPageApi | null) {
      api = instance
    },

    /** 跳转到指定屏（index 从 0 开始） */
    goTo(index: number) {
      api?.moveTo(index + 1) // fullpage.js 的 section 索引从 1 开始
    },

    /** 按屏幕 id 跳转 */
    goToId(id: string) {
      const idx = this.screens.findIndex((s) => s.id === id)
      if (idx >= 0) this.goTo(idx)
    },

    setCurrent(index: number) {
      this.currentIndex = index
    },
  },
})
