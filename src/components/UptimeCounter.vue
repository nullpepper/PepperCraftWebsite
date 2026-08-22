<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { formatUptime } from '../utils/format'

/** 自开服以来的运行时长实时倒计时 */
const d = ref(0)
const h = ref(0)
const m = ref(0)
const s = ref(0)

let timer: number | null = null

function tick() {
  const { days, hours, minutes, seconds } = formatUptime()
  d.value = days
  h.value = hours
  m.value = minutes
  s.value = seconds
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
  <div class="uptime">
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
/* 用于「运行状态」屏文案区的运行时长卡片内（原叠图，后按用户反馈下移） */
.uptime {
  display: inline-flex;
  align-items: stretch;
  gap: 8px;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
.unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: rgba(10, 14, 12, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  padding: 10px 14px;
  min-width: 74px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 12px 30px -10px rgba(0, 0, 0, 0.8);
}
.num {
  font-size: clamp(30px, 3.4vw, 44px);
  font-weight: 700;
  color: var(--text-1);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.label {
  font-size: 11px;
  color: var(--text-3);
  font-family: var(--font-sans);
  letter-spacing: 0.14em;
}
.sep {
  align-self: center;
  font-size: 24px;
  color: var(--text-3);
  font-weight: 700;
  opacity: 0.5;
}

@media (max-width: 520px) {
  .uptime {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
  }
  .unit {
    padding: 8px 4px;
    min-width: 0;
    border-radius: 6px;
  }
  .num {
    font-size: 22px;
  }
  .sep { display: none; }
}
</style>
