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
]

/**
 * 全屏分页状态：维护当前屏、屏幕列表与跳屏动作。
 * fullpage 实例由 HomeView 注入（avoid circular dep）。
 */
export const useFullPageStore = defineStore('fullpage', {
  state: () => ({
    currentIndex: 0,
    screens: SCREENS,
  }),

  getters: {
    currentScreen(state): FullPageScreen {
      return state.screens[state.currentIndex] ?? state.screens[0]
    },
  },

  actions: {
    /** fullpage 实例（由 HomeView 初始化时注入） */
    setApi(api: unknown) {
      ;(this as any).api = api
    },

    /** 跳转到指定屏（index 从 0 开始） */
    goTo(index: number) {
      const api = (this as any).api as { moveTo: (i: number) => void } | null
      if (api) {
        api.moveTo(index + 1) // fullpage.js 的 section 索引从 1 开始
      }
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
