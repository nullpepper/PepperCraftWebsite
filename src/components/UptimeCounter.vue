<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/** 自开服以来的运行时长实时倒计时 */
const props = withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

const d = ref(0)
const h = ref(0)
const m = ref(0)
const s = ref(0)

let timer: number | null = null

function tick() {
  const target = new Date('2023-02-20T00:00:00+08:00')
  const diff = Math.max(0, Date.now() - target.getTime())
  d.value = Math.floor(diff / 86400000)
  h.value = Math.floor((diff % 86400000) / 3600000)
  m.value = Math.floor((diff % 3600000) / 60000)
  s.value = Math.floor((diff % 60000) / 1000)
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 1000)
})
onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <div class="uptime" :class="{ compact }">
    <div class="unit">
      <span class="num">{{ String(d).padStart(2, '0') }}</span>
      <span class="label">天</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="num">{{ String(h).padStart(2, '0') }}</span>
      <span class="label">时</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="num">{{ String(m).padStart(2, '0') }}</span>
      <span class="label">分</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="num">{{ String(s).padStart(2, '0') }}</span>
      <span class="label">秒</span>
    </div>
  </div>
</template>

<style scoped>
.uptime {
  display: inline-flex;
  align-items: stretch;
  gap: 10px;
  font-family: var(--font-mono);
}
.unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  min-width: 62px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4);
}
.num {
  font-size: 26px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
}
.label {
  font-size: 11px;
  color: var(--text-3);
  font-family: var(--font-body);
}
.sep {
  align-self: center;
  font-size: 22px;
  color: var(--text-3);
  font-weight: 700;
}
.compact .num {
  font-size: 20px;
}
.compact .unit {
  padding: 5px 9px;
  min-width: 52px;
}
</style>
