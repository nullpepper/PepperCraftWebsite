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
    <div class="unit">
      <span class="num">{{ String(h).padStart(2, '0') }}</span>
      <span class="label">时</span>
    </div>
    <div class="unit">
      <span class="num">{{ String(m).padStart(2, '0') }}</span>
      <span class="label">分</span>
    </div>
    <div class="unit">
      <span class="num">{{ String(s).padStart(2, '0') }}</span>
      <span class="label">秒</span>
    </div>
  </div>
</template>

<style scoped>
/* 用于「运行状态」屏文案区的运行时长卡片内（原叠图，后按用户反馈下移）
   桌面/移动统一为 4 列等宽网格：数字位数不同（如 1279 vs 13）时盒子仍对齐 */
.uptime {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
  padding: 11px 8px;
  min-width: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 12px 30px -10px rgba(0, 0, 0, 0.8);
}
.num {
  font-size: clamp(28px, 3vw, 40px);
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

/* 低端设备无 backdrop-filter：回退实心底色 */
@supports not ((backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))) {
  .unit {
    background: rgba(10, 14, 12, 0.92);
  }
}

@media (max-width: 520px) {
  .uptime {
    gap: 7px;
  }
  .unit {
    padding: 8px 4px;
    border-radius: 6px;
  }
  .num {
    font-size: 22px;
  }
}

/* 矮桌面视口（≤899px 高）：收紧时长数字尺寸 */
@media (min-width: 901px) and (max-height: 899px) {
  .unit {
    padding: 8px 6px;
  }
  .num {
    font-size: clamp(26px, 3.2vw, 32px);
  }
  .label {
    font-size: 10px;
  }
}

/* 超高分辨率（≥2880px）：运行时长数字同比放大 */
@media (min-width: 2880px) {
  .unit {
    padding: 16px 12px;
  }
  .num {
    font-size: clamp(40px, 1.6vw, 64px);
  }
  .label {
    font-size: 14px;
  }
}
</style>
