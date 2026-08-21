<script setup lang="ts">
import { SITE, SERVER_PROFILE } from '../data/site'
import { PLAYERS, WEALTH, TOTAL_HOURS, PLAYER_COUNT } from '../data/server'
import ServerStatusCard from '../components/ServerStatusCard.vue'
import UptimeCounter from '../components/UptimeCounter.vue'
import Reveal from '../components/Reveal.vue'
import { formatBalance, formatNumber } from '../utils/format'
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">运行状态</h1>
        <p class="page-sub">实时在线状态 · 服务器档案 · 玩家数据（快照 {{ SITE.snapshotTime }}）</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="status-layout">
          <Reveal>
            <ServerStatusCard />
          </Reveal>
          <Reveal :delay="100">
            <div class="card uptime-card">
              <h3>⏳ 稳定运行时长</h3>
              <p class="muted">服务器自 {{ SITE.serverStart }} 开启</p>
              <UptimeCounter />
              <p class="muted small" style="margin-top: 14px">
                本地 + 异地双重备份 · 3 年存档承诺（2025-01 起）
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">服务器档案</span>
            <h2 class="section-title">⚙️ 配置一览</h2>
          </div>
        </Reveal>
        <Reveal :delay="80">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>配置</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, k) in SERVER_PROFILE" :key="k">
                  <td style="color: var(--text-1); font-weight: 600">{{ k }}</td>
                  <td>{{ v }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">玩家数据</span>
            <h2 class="section-title">🏆 在线时长排行</h2>
            <p class="section-sub">
              共 {{ PLAYER_COUNT }} 名玩家 · 累计游戏 {{ formatNumber(Math.round(TOTAL_HOURS)) }} 小时
              · 数据为服务器存档快照
            </p>
          </div>
        </Reveal>

        <Reveal :delay="80">
          <div class="table-wrap">
            <table class="data-table leaderboard">
              <thead>
                <tr>
                  <th>#</th>
                  <th>玩家</th>
                  <th>游戏时长</th>
                  <th>死亡</th>
                  <th>击杀</th>
                  <th>行走距离</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, i) in PLAYERS.slice(0, 30)" :key="p.name + i">
                  <td>
                    <span class="rank-badge" :class="{ top: i < 3 }">{{ i + 1 }}</span>
                  </td>
                  <td style="color: var(--text-1); font-weight: 600">{{ p.name }}</td>
                  <td class="mono">{{ p.hours.toLocaleString('zh-CN') }} 小时</td>
                  <td>{{ p.deaths }}</td>
                  <td>{{ p.kills }}</td>
                  <td>{{ p.walk_km ? p.walk_km.toLocaleString('zh-CN') + ' km' : '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">经济</span>
            <h2 class="section-title">💎 钻石财富榜</h2>
            <p class="section-sub">以原版钻石为货币 · 快照数据 · 全部为银行账户余额</p>
          </div>
        </Reveal>
        <Reveal :delay="80">
          <div class="wealth-grid">
            <div v-for="(w, i) in WEALTH" :key="w.name" class="wealth-card">
              <span class="wealth-rank">{{ i + 1 }}</span>
              <span class="wealth-name">{{ w.name }}</span>
              <span class="wealth-bal">💎 {{ formatBalance(w.balance) }}</span>
            </div>
            <div v-if="WEALTH.length === 0" class="wealth-empty">暂无数据</div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  padding: calc(var(--nav-h) + 70px) 0 50px;
  text-align: center;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(7, 10, 7, 0.9)),
    url('/assets/img/bg-masthead.jpg') center/cover;
}
.page-title {
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
}
.page-sub {
  color: var(--text-2);
  margin-top: 12px;
  font-size: 15.5px;
}
.status-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 22px;
  align-items: start;
}
.uptime-card h3 {
  margin-bottom: 6px;
  font-size: 18px;
}
.muted {
  color: var(--text-3);
  font-size: 13.5px;
}
.muted.small {
  font-size: 12.5px;
}
.rank-badge {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 13px;
  color: var(--text-2);
}
.rank-badge.top {
  color: var(--amber);
  border-color: rgba(244, 208, 63, 0.45);
  background: var(--amber-dim);
}
.mono {
  font-family: var(--font-mono);
  color: var(--accent);
}
.wealth-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.wealth-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius);
  background: var(--bg-2);
  border: 1px solid var(--border);
  transition: all 0.25s;
}
.wealth-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.wealth-rank {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: var(--amber-dim);
  border: 1px solid rgba(244, 208, 63, 0.4);
  color: var(--amber);
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 13px;
}
.wealth-name {
  color: var(--text-1);
  font-weight: 700;
  font-size: 15px;
}
.wealth-bal {
  margin-left: auto;
  color: var(--accent);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 14.5px;
}
.wealth-empty {
  color: var(--text-3);
  text-align: center;
  padding: 30px;
}
@media (max-width: 860px) {
  .status-layout {
    grid-template-columns: 1fr;
  }
}
</style>
