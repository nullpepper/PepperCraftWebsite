import { createRouter, createWebHashHistory } from 'vue-router'

// 单页面结构：全站内容聚合在首页，导航通过区块锚点滚动定位
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
