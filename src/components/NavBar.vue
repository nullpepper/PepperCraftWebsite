<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const links = [
  { id: 'top', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'features', label: '特色玩法' },
  { id: 'join', label: '加入我们' },
]

const scrolled = ref(false)
const open = ref(false)
const active = ref('top')

function onScroll() {
  scrolled.value = window.scrollY > 24
  // 高亮当前区块
  const pos = window.scrollY + 120
  let current = 'top'
  for (const l of [...links].reverse()) {
    const el = document.getElementById(l.id)
    if (el && el.offsetTop <= pos) {
      current = l.id
      break
    }
  }
  active.value = current
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function go(id: string) {
  open.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="nav" :class="{ 'nav-scrolled': scrolled }">
    <div class="container nav-inner">
      <button class="nav-brand" @click="go('top')">
        <span class="brand-block">⛏</span>
        <span class="brand-text">Pepper Craft</span>
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
  background: rgba(7, 10, 7, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}
.nav-scrolled {
  background: rgba(9, 13, 9, 0.92);
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
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-head);
}
.brand-block {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #06130a;
  font-size: 18px;
  border-radius: 9px;
  box-shadow: 0 4px 14px rgba(58, 170, 82, 0.4);
}
.brand-text {
  font-size: 19px;
  font-weight: 800;
  color: var(--text-1);
  letter-spacing: 0.03em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-links a {
  padding: 8px 16px;
  border-radius: 8px;
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
  background: linear-gradient(135deg, #4cbb5e, #2e9b43) !important;
  color: #06130a !important;
  border-radius: 9px !important;
  font-family: var(--font-head);
  font-weight: 700;
}
.nav-join-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(58, 170, 82, 0.4);
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
</style>
