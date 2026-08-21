<script setup lang="ts">
import { CORE_FEATURES } from '../data/features'
import Reveal from '../components/Reveal.vue'
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">特色玩法</h1>
        <p class="page-sub">优化原版 · 纯净生存 · 技术保障</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-for="(f, idx) in CORE_FEATURES" :key="f.title">
          <Reveal :delay="idx * 60">
            <div class="core-row" :class="{ reverse: idx % 2 === 1 }">
              <div class="core-img">
                <img v-if="f.image" :src="f.image" :alt="f.title" loading="lazy" />
                <div v-else class="core-img-ph">
                  <span class="ph-icon">{{ f.icon }}</span>
                </div>
              </div>
              <div class="core-text">
                <span class="core-icon">{{ f.icon }}</span>
                <h3>{{ f.title }}</h3>
                <p class="core-desc">{{ f.desc }}</p>
                <ul class="core-points">
                  <li v-for="p in f.points" :key="p">{{ p }}</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 更多玩法 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">更多玩法</span>
            <h2 class="section-title">不止于生存</h2>
          </div>
        </Reveal>
        <div class="extra-grid">
          <Reveal v-for="(f, i) in [
            { icon: '🏰', title: '联盟与领地', desc: '区块级领地保护、联盟农场、城镇金库，服务器现有 25 个联盟。' },
            { icon: '💎', title: '钻石经济', desc: '以原版钻石为硬通货，/bank 存取，没有膨胀的虚拟币。' },
            { icon: '🤖', title: 'QQ 机器人联动', desc: '自研 PepperBot 家族：聊天同步、指令转发、自动回复。' },
            { icon: '🌍', title: '跨版本支持', desc: 'Java 版全版本 + 基岩版玩家均可进入。' },
          ]" :key="f.title" :delay="(i % 2) * 100">
            <div class="card extra-card">
              <span class="extra-icon">{{ f.icon }}</span>
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
            </div>
          </Reveal>
        </div>
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
    url('/assets/img/bg.png') center/cover;
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

.core-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 70px;
}
.core-img {
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  aspect-ratio: 16 / 9;
  background: var(--bg-2);
}
.core-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.core-img:hover img {
  transform: scale(1.04);
}
.core-img-ph {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.ph-icon {
  font-size: 64px;
}
.core-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 10px;
}
.core-text h3 {
  font-size: 25px;
  margin-bottom: 12px;
}
.core-desc {
  color: var(--text-2);
  font-size: 15px;
  margin-bottom: 16px;
  line-height: 1.9;
}
.core-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.core-points li {
  padding-left: 22px;
  position: relative;
  color: var(--text-2);
  font-size: 14.5px;
}
.core-points li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}
.reverse .core-text {
  order: -1;
}

.extra-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 860px;
  margin: 0 auto;
}
.extra-card h3 {
  font-size: 17px;
  margin-bottom: 8px;
}
.extra-card p {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.8;
}
.extra-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .core-row {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .reverse .core-text {
    order: 0;
  }
}
@media (max-width: 600px) {
  .extra-grid {
    grid-template-columns: 1fr;
  }
}
</style>
