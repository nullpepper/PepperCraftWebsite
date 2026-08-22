<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFullPageStore } from '../stores/fullpage'
import AppIcon from './AppIcon.vue'

const fpStore = useFullPageStore()

/** 窄屏下 fullpage 退化为普通滚动，此时才有真实的 scrollY */
const pageScrolled = ref(false)

/** fullpage 用 transform 翻页，scrollY 恒为 0，因此还要看当前屏 */
const visible = computed(() => pageScrolled.value || fpStore.hasLeftFirstScreen)

function onScroll() {
  pageScrolled.value = window.scrollY > 600
}

function toTop() {
  fpStore.goToId('hero')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="fade">
    <button v-if="visible" class="back-top" aria-label="返回顶部" @click="toTop">
      <AppIcon name="arrow-up" :size="20" />
    </button>
  </transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 26px;
  bottom: 30px;
  z-index: 90;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--accent);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: var(--shadow-md);
}
.back-top:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
