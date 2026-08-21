<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { SITE } from '../data/site'

type Status = 'loading' | 'online' | 'offline' | 'error'

const status = ref<Status>('loading')
const players = ref<number | null>(null)
const maxPlayers = ref(1000)
const version = ref<string | null>(null)
const motd = ref<string | null>(null)
const lastCheck = ref<Date | null>(null)
const checking = ref(false)

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

async function fetchStatus() {
  if (checking.value) return
  checking.value = true
  status.value = 'loading'
  try {
    // 主 API：原网站使用的 uapis.cn
    const r = await fetch(
      `https://uapis.cn/api/v1/game/minecraft/serverstatus?server=${SITE.ip}`,
      { signal: AbortSignal.timeout(8000) }
    )
    const data = await r.json()
    if (data && data.online === true) {
      status.value = 'online'
      players.value = typeof data.players === 'number' ? data.players : parseInt(data.players || '0', 10)
      version.value = data.version?.name ?? null
      lastCheck.value = new Date()
      return
    }
    if (data && data.online === false) {
      status.value = 'offline'
      lastCheck.value = new Date()
      return
    }
    throw new Error('unexpected payload')
  } catch {
    // 备用 API：mcstatus.io
    try {
      const r2 = await fetch(`https://api.mcstatus.io/v2/status/java/${SITE.ip}`, {
        signal: AbortSignal.timeout(8000),
      })
      const d2 = await r2.json()
      if (d2 && d2.online === true) {
        status.value = 'online'
        players.value = d2.players?.online ?? 0
        maxPlayers.value = d2.players?.max ?? 1000
        version.value = d2.version?.name ?? null
        motd.value = Array.isArray(d2.motd?.clean) ? d2.motd.clean.join(' ') : d2.motd?.clean
        lastCheck.value = new Date()
        return
      }
      if (d2 && d2.online === false) {
        status.value = 'offline'
        lastCheck.value = new Date()
        return
      }
      throw new Error('unexpected payload')
    } catch {
      status.value = 'error'
      lastCheck.value = null
    }
  } finally {
    checking.value = false
  }
}

onMounted(() => {
  fetchStatus()
  timer = window.setInterval(fetchStatus, 60000)
})
onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <div class="status-card">
    <div class="status-row">
      <span class="dot" :class="`dot-${status === 'online' ? 'online' : status === 'offline' ? 'offline' : ''}`" />
      <span class="status-text">{{ statusText }}</span>
      <span v-if="status === 'online'" class="players">
        {{ players ?? '?' }} / {{ maxPlayers }} 人在线
      </span>
    </div>

    <div class="status-body">
      <div class="status-item">
        <span class="k">服务器 IP</span>
        <span class="v mono">{{ SITE.ip }}</span>
      </div>
      <div class="status-item">
        <span class="k">游戏版本</span>
        <span class="v">{{ version || '最新高版本（跨版本支持）' }}</span>
      </div>
      <div class="status-item">
        <span class="k">验证方式</span>
        <span class="v">{{ SITE.auth }}</span>
      </div>
      <div class="status-item">
        <span class="k">最后检查</span>
        <span class="v">{{ lastCheck ? lastCheck.toLocaleTimeString('zh-CN') : '—' }}</span>
      </div>
    </div>

    <button class="btn btn-ghost retry" :disabled="checking" @click="fetchStatus">
      <span v-if="checking">检查中…</span>
      <span v-else>⟳ 重新检查</span>
    </button>
  </div>
</template>

<style scoped>
.status-card {
  background: linear-gradient(160deg, var(--card), var(--bg-2));
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  box-shadow: var(--shadow-md);
}
.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-head);
  font-size: 19px;
  margin-bottom: 20px;
}
.status-text {
  font-weight: 800;
}
.players {
  margin-left: auto;
  font-size: 14px;
  color: var(--text-2);
  background: var(--bg-0);
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
}
.status-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 20px;
}
.status-item {
  background: var(--bg-0);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}
.status-item .k {
  display: block;
  font-size: 12px;
  color: var(--text-3);
  margin-bottom: 4px;
  letter-spacing: 0.06em;
}
.status-item .v {
  font-size: 14.5px;
  color: var(--text-1);
  font-weight: 600;
}
.mono {
  font-family: var(--font-mono);
  color: var(--accent);
}
.retry {
  width: 100%;
  justify-content: center;
}
@media (max-width: 560px) {
  .status-body {
    grid-template-columns: 1fr;
  }
}
</style>
