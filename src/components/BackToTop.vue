<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 600
}

function toTop() {
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
    <button v-if="visible" class="back-top" aria-label="返回顶部" @click="toTop">↑</button>
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
  transition: opacity 0.25s, transform 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
