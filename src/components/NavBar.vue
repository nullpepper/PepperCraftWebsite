<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFullPageStore } from '../stores/fullpage'

const fpStore = useFullPageStore()

const links = [
  { id: 'hero', label: '首页' },
  { id: 'status', label: '运行状态' },
  { id: 'about', label: '关于' },
  { id: 'features', label: '特色玩法' },
  { id: 'faq', label: 'FAQ' },
]

/** 窄屏下 fullpage 退化为普通滚动，此时才有真实的 scrollY */
const pageScrolled = ref(false)
const open = ref(false)

const active = computed(() => fpStore.currentScreen.id)
/** fullpage 用 transform 翻页，scrollY 恒为 0，因此还要看当前屏 */
const scrolled = computed(() => pageScrolled.value || fpStore.hasLeftFirstScreen)

function onScroll() {
  pageScrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function go(id: string) {
  open.value = false
  fpStore.goToId(id)
}
</script>

<template>
  <header class="nav" :class="{ 'nav-scrolled': scrolled }">
    <div class="container nav-inner">
      <button class="nav-brand" @click="go('hero')">
        <span class="brand-text"><span class="brand-pepper">Pepper</span><span class="brand-craft">Craft</span></span>
      </button>

      <nav class="nav-links" :class="{ open }">
        <a
          v-for="l in links"
          :key="l.id"
          :class="{ active: active === l.id }"
          @click.prevent="go(l.id)"
        >
          {{ l.label }}
        </a>
        <a class="nav-join-btn" @click.prevent="go('join')">立即加入</a>
      </nav>

      <button class="nav-toggle" :class="{ open }" aria-label="菜单" @click="open = !open">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  background: rgba(16, 19, 19, 0.76);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}
.nav-scrolled {
  background: rgba(16, 19, 19, 0.96);
  border-bottom-color: var(--border);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
}
.brand-text {
  font-size: 19px;
  font-weight: 800;
  color: var(--text-1);
  letter-spacing: -0.01em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-links a {
  padding: 8px 16px;
  border-radius: 3px;
  color: var(--text-2);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-links a:hover {
  color: var(--text-1);
  background: var(--bg-3);
}
.nav-links a.active {
  color: var(--accent);
  background: var(--accent-dim);
}
.nav-join-btn {
  margin-left: 10px;
  padding: 9px 18px !important;
  /* 与 .btn-primary 同一条绿色渐变，避免导航出现第二种绿 */
  background: linear-gradient(135deg, #9ad86e, #63a647) !important;
  color: #08150b !important;
  border-radius: 3px !important;
  font-family: var(--font-sans);
  font-weight: 700;
}
.nav-join-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(99, 166, 71, 0.4);
}
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.nav-toggle span {
  width: 24px;
  height: 2px;
  background: var(--text-1);
  border-radius: 2px;
  transition: all 0.3s;
}
.nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { opacity: 0; }
.nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 960px) {
  .nav-toggle {
    display: flex;
  }
  .nav-links {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: rgba(9, 13, 9, 0.98);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px 20px;
    gap: 2px;
    transform: translateY(-120%);
    transition: transform 0.3s;
    max-height: calc(100vh - var(--nav-h));
    overflow-y: auto;
  }
  .nav-links.open {
    transform: none;
  }
  .nav-links a {
    padding: 12px 14px;
    font-size: 15.5px;
  }
  .nav-join-btn {
    margin: 8px 0 0;
    text-align: center;
  }
}
.brand-pepper { color: var(--accent); }
.brand-craft { color: var(--blue); }
@media (max-width: 600px) {
  .nav-inner { padding: 0 16px; }
  .brand-text { font-size: 17px; }
  .nav-links { padding: 10px 16px 16px; }
  .nav-links a { padding: 11px 12px; }
}
</style>
