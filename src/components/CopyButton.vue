<script setup lang="ts">
import { ref } from 'vue'

/** 一键复制文本按钮 */
const props = defineProps<{ text: string; label?: string }>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = props.text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1800)
}
</script>

<template>
  <button class="copy-btn" :class="{ copied }" @click="copy">
    <span v-if="copied">✓ 已复制</span>
    <span v-else>{{ label ?? '复制' }}</span>
  </button>
</template>

<style scoped>
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  font-size: 13.5px;
  font-weight: 700;
  font-family: var(--font-head);
  cursor: pointer;
  transition: all 0.25s;
}
.copy-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.copy-btn.copied {
  border-color: var(--accent);
  background: var(--accent-dim);
  color: var(--accent);
}
</style>
