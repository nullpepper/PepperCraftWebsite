import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // hash 模式：静态托管（GitHub Pages / 任意静态服务器）无需服务端配置
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/status', name: 'status', component: () => import('../views/StatusView.vue') },
    { path: '/features', name: 'features', component: () => import('../views/FeaturesView.vue') },
    { path: '/towns', name: 'towns', component: () => import('../views/TownsView.vue') },
    { path: '/plugins', name: 'plugins', component: () => import('../views/PluginsView.vue') },
    { path: '/docs', name: 'docs', component: () => import('../views/DocsView.vue') },
    { path: '/join', name: 'join', component: () => import('../views/JoinView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
