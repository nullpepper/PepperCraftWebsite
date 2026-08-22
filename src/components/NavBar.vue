<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useFullPageStore } from '../stores/fullpage'

const fpStore = useFullPageStore()

const links = [
  { id: 'hero', label: '首页' },
  { id: 'status', label: '运行状态' },
  { id: 'about', label: '关于' },
  { id: 'features', label: '服务器特色' },
  { id: 'faq', label: 'FAQ' },
]

/** 窄屏下 fullpage 退化为普通滚动，此时才有真实的 scrollY */
const pageScrolled = ref(false)
const open = ref(false)

/** 移动断点（<=960 与 CSS 对齐）：只有移动端关闭态才需要隐藏菜单面板。
    初始化即读视口，避免首帧（onMounted 之前）桌面导航短暂带上 inert */
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth <= 960 : false)

const active = computed(() => fpStore.currentScreen.id)
/** fullpage 用 transform 翻页，scrollY 恒为 0，因此还要看当前屏 */
const scrolled = computed(() => pageScrolled.value || fpStore.hasLeftFirstScreen)

/** 移动端且菜单关闭：把面板移出 Tab 序与读屏（桌面导航始终可见，绝不能 inert） */
const menuCollapsed = computed(() => isMobile.value && !open.value)

/** 菜单打开时锁定页面滚动（移动端原生滚动模式下防止背后页面滚动） */
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function onScroll() {
  pageScrolled.value = window.scrollY > 24
}

function syncViewport() {
  isMobile.value = window.innerWidth <= 960
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

function onResize() {
  syncViewport()
  // 回到桌面断点后菜单不可见：同步关闭并释放滚动锁
  if (!isMobile.value && open.value) open.value = false
}

onMounted(() => {
  onScroll()
  syncViewport()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function go(id: string) {
  open.value = false
  fpStore.goToId(id)
}
</script>

<template>
  <!-- 遮罩：点菜单外区域即关闭。必须与 header 平级——.nav 带 backdrop-filter
       （blur(14px)），会把 fixed 后代的包含块约束到 header 内，
       使遮罩 top/bottom 相对 64px 高的 header 坍缩为 0 高度而无法点击。 -->
  <div v-if="open" class="nav-backdrop" aria-hidden="true" @click="open = false" />
  <header class="nav" :class="{ 'nav-scrolled': scrolled }">
    <div class="container nav-inner">
      <button class="nav-brand" @click="go('hero')">
        <span class="brand-text">
          <span class="brand-pepper">Pepper</span>
          <span class="brand-craft">Craft</span>
        </span>
      </button>

      <nav
        class="nav-links"
        :class="{ open }"
        id="nav-links"
        :inert="menuCollapsed || undefined"
        :aria-hidden="menuCollapsed ? 'true' : 'false'"
      >
        <button
          v-for="l in links"
          :key="l.id"
          type="button"
          class="nav-link"
          :class="{ active: active === l.id }"
          @click="go(l.id)"
        >
          {{ l.label }}
        </button>
        <button type="button" class="nav-join-btn" @click="go('join')">立即加入</button>
      </nav>

      <button
        class="nav-toggle"
        :class="{ open }"
        aria-label="菜单"
        :aria-expanded="open"
        aria-controls="nav-links"
        @click="open = !open"
      >
        <span></span>
        <span></span>
        <span></span>
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
/* 站内跳转是按钮（无 href 的 <a> 不进 Tab 键序），样式沿用原链接外观 */
.nav-links button {
  padding: 8px 16px;
  border-radius: 3px;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.nav-links button:hover {
  color: var(--text-1);
  background: var(--bg-3);
}
.nav-links button.active {
  color: var(--accent);
  background: var(--accent-dim);
}
.nav-links button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
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
.nav-toggle.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-toggle.open span:nth-child(2) {
  opacity: 0;
}
.nav-toggle.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

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
    /* 关闭态移出 Tab 序与读屏（配合模板 inert/aria-hidden）：
       visibility 可过渡，关闭动画期间仍可见，结束后彻底隐藏 */
    visibility: hidden;
    transition:
      transform 0.3s,
      visibility 0.3s;
    max-height: calc(100vh - var(--nav-h));
    overflow-y: auto;
  }
  .nav-links.open {
    transform: none;
    visibility: visible;
  }
  .nav-links button {
    padding: 12px 14px;
    font-size: 15.5px;
  }
  .nav-join-btn {
    margin: 8px 0 0;
    text-align: center;
  }
  /* 遮罩盖住导航以下全屏：菜单面板（header 内、更靠后）绘制在其上。
     z-index: 95 —— 低于 header(100)，高于页面内容与返回顶部(90)，
     防止遮罩与内容层叠顺序不确定导致按钮穿透遮罩 */
  .nav-backdrop {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 95;
    background: rgba(5, 8, 7, 0.55);
  }
}
@media (min-width: 961px) {
  .nav-backdrop {
    display: none;
  }
}
/* 低端设备无 backdrop-filter：回退实心底色，避免菜单/导航文字叠在透出内容上 */
@supports not ((backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))) {
  .nav {
    background: rgba(16, 19, 19, 0.97);
  }
  .nav-scrolled {
    background: #101313;
  }
}
.brand-pepper {
  color: var(--accent);
}
.brand-craft {
  color: var(--blue);
}
@media (max-width: 600px) {
  .nav-inner {
    padding: 0 16px;
  }
  .brand-text {
    font-size: 17px;
  }
  .nav-links {
    padding: 10px 16px 16px;
  }
  .nav-links button {
    padding: 11px 12px;
  }
}

/* 超高分辨率（≥2880px）：导航文本等比放大（--nav-h 由 main.css 同步加高到 80px） */
@media (min-width: 2880px) {
  .brand-text {
    font-size: 24px;
  }
  .nav-links button {
    padding: 10px 20px;
    font-size: 18px;
  }
}
</style>
