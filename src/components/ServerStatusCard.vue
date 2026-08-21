<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useStatusStore } from '../stores/status'
import { SITE } from '../data/site'
import AppIcon from './AppIcon.vue'

const store = useStatusStore()
const { status, players, maxPlayers, version, motd, lastCheck, checking } = storeToRefs(store)

let timer: number | null = null

const statusText = computed(() => {
  switch (status.value) {
    case 'loading':
      return '正在获取…'
    case 'online':
      return '在线'
    case 'offline':
      return '离线'
    case 'error':
      return '维护中'
  }
})

onMounted(() => {
  store.fetchStatus()
  timer = window.setInterval(() => store.fetchStatus(), 60000)
})
onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <div class="status-card">
    <div class="status-row">
      <span
        class="dot"
        :class="status === 'online' ? 'dot-online' : status === 'offline' ? 'dot-offline' : ''"
      />
      <span class="status-text">{{ statusText }}</span>
      <span class="status-motd mono">{{ motd || version || '等待服务器返回' }}</span>
    </div>

    <!-- 在线人数是本屏最该被看见的数字，因此提为 mono 巨号主读数 -->
    <div class="status-headline">
      <span class="status-num mono">{{ status === 'online' ? (players ?? '?') : '—' }}</span>
      <span class="status-slash mono">/ {{ maxPlayers }}</span>
      <span class="status-num-label">当前在线玩家</span>
    </div>

    <div class="status-body">
      <div class="status-item">
        <span class="k">服务器 IP</span>
        <span class="v mono link">{{ SITE.ip }}</span>
      </div>
      <div class="status-item">
        <span class="k">游戏难度 / 模式</span>
        <span class="v">{{ SITE.difficulty }} · {{ SITE.gameMode }}</span>
      </div>
      <div class="status-item">
        <span class="k">验证方式</span>
        <span class="v">{{ SITE.auth }}</span>
      </div>
      <div class="status-item">
        <span class="k">最后检查</span>
        <span class="v mono">{{ lastCheck ? lastCheck.toLocaleTimeString('zh-CN') : '—' }}</span>
      </div>
    </div>

    <button class="btn btn-ghost retry" :disabled="checking" @click="store.fetchStatus">
      <AppIcon name="refresh" :size="16" />
      <span>{{ checking ? '检查中…' : '重新检查' }}</span>
    </button>
  </div>
</template>

<style scoped>
.status-card {
  background: var(--card-face);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 30px 32px;
  box-shadow: var(--card-lift);
}
.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-sans);
  font-size: 17px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border-soft);
}
.status-text {
  font-weight: 800;
  letter-spacing: -0.02em;
}
/* MOTD 是服务器回传的机器字符串 → mono */
.status-motd {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 46%;
}

.status-headline {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 10px;
  padding: 22px 0 24px;
}
.status-num {
  font-size: clamp(52px, 6vw, 76px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--text-1);
}
.status-slash {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-3);
}
.status-num-label {
  margin-left: auto;
  font-size: 13px;
  color: var(--text-3);
  letter-spacing: 0.1em;
}

.status-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 22px;
}
.status-item {
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}
.status-item .k {
  display: block;
  font-size: 11.5px;
  color: var(--text-3);
  margin-bottom: 4px;
  letter-spacing: 0.08em;
}
.status-item .v {
  font-size: 14.5px;
  color: var(--text-1);
  font-weight: 600;
}
/* 小号 mono 数据用蓝（信息色）；巨号主读数保持 text-1，避免与绿色主行动争夺注意力 */
.status-item .v.link {
  color: var(--blue);
  letter-spacing: 0.02em;
}
.retry {
  width: 100%;
  justify-content: center;
}
@media (max-width: 900px) {
  .status-card { padding: 24px; }
  .status-num { font-size: 52px; }
}
@media (max-width: 560px) {
  .status-card { padding: 20px; border-radius: 8px; }
  .status-row { flex-wrap: wrap; gap: 8px; }
  .status-motd { margin-left: 0; max-width: 100%; }
  .status-headline { padding: 16px 0 18px; }
  .status-num { font-size: 46px; }
  .status-num-label { margin-left: 0; width: 100%; }
  .status-body {
    grid-template-columns: 1fr;
    gap: 9px;
  }
  .status-item { padding: 10px 13px; }
  .retry { padding: 10px 16px; }
}
</style>
