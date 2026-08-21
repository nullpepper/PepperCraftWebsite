<script setup lang="ts">
import { CORE_FEATURES, EXTRA_FEATURES } from '../data/features'
import Reveal from '../components/Reveal.vue'
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">特色玩法</h1>
        <p class="page-sub">优化原版 · 纯净生存 · 技术保障 —— 三种核心特色，六种进阶玩法</p>
      </div>
    </section>

    <!-- 核心特色：图文交错 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">核心特色</span>
            <h2 class="section-title">⭐ 服务器特色</h2>
          </div>
        </Reveal>

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

    <!-- 进阶玩法 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">进阶玩法</span>
            <h2 class="section-title">不止于生存</h2>
            <p class="section-sub">联盟、经济、机器人联动……在原版之上，一切皆有可能。</p>
          </div>
        </Reveal>
        <div class="extra-grid">
          <Reveal v-for="(f, i) in EXTRA_FEATURES" :key="f.title" :delay="(i % 3) * 100">
            <div class="card extra-card">
              <span class="extra-icon">{{ f.icon }}</span>
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
              <ul>
                <li v-for="p in f.points" :key="p">{{ p }}</li>
              </ul>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.extra-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.extra-card p {
  color: var(--text-2);
  font-size: 14px;
  margin-bottom: 14px;
  line-height: 1.8;
}
.extra-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.extra-card li {
  font-size: 13.5px;
  color: var(--text-2);
  padding-left: 20px;
  position: relative;
}
.extra-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent);
}
.extra-icon {
  font-size: 30px;
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
  .extra-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .extra-grid {
    grid-template-columns: 1fr;
  }
}
</style>
