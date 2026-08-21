<script setup lang="ts">
import { PLUGINS, THIRD_PARTY_PLUGINS } from '../data/plugins'
import Reveal from '../components/Reveal.vue'
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">自研插件生态</h1>
        <p class="page-sub">
          腐竹 3 年以上开发经验 · 服内插件自研率超 18.5% · 全部开源在 GitHub
        </p>
      </div>
    </section>

    <!-- 自研插件 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">Pepper 家族</span>
            <h2 class="section-title">🧩 自研插件</h2>
            <p class="section-sub">
              从基础库到业务插件，一套围绕纯净生存打造的开源技术栈。点击卡片直达 GitHub 仓库。
            </p>
          </div>
        </Reveal>

        <div class="plugin-grid">
          <Reveal v-for="(p, i) in PLUGINS" :key="p.name" :delay="(i % 3) * 90">
            <a class="card plugin-card" :href="p.github" target="_blank" rel="noopener">
              <div class="plugin-head">
                <h3>{{ p.name }}</h3>
                <span v-if="p.live" class="badge badge-accent">
                  <span class="dot dot-online" /> 服内运行中
                </span>
              </div>
              <p class="plugin-desc">{{ p.desc }}</p>
              <div class="plugin-tags">
                <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
              </div>
              <span class="plugin-gh">GitHub ↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 第三方插件 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">技术底座</span>
            <h2 class="section-title">🔌 精选第三方插件</h2>
            <p class="section-sub">经过反复打磨的 60+ 插件阵容，只为稳定与纯净。</p>
          </div>
        </Reveal>
        <Reveal :delay="80">
          <div class="third-party">
            <span v-for="t in THIRD_PARTY_PLUGINS" :key="t" class="third-chip">{{ t }}</span>
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
    url('/assets/img/Image-1.jpg') center/cover;
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
.plugin-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.plugin-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--text-1);
}
.plugin-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.plugin-head h3 {
  font-size: 18px;
  font-family: var(--font-mono);
  letter-spacing: 0;
}
.plugin-desc {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.8;
  flex: 1;
}
.plugin-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 14px 0;
}
.tag {
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid rgba(88, 193, 105, 0.25);
  font-weight: 600;
}
.plugin-gh {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-3);
  transition: color 0.2s;
}
.plugin-card:hover .plugin-gh {
  color: var(--accent);
}
.third-party {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}
.third-chip {
  padding: 10px 20px;
  border-radius: 999px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  color: var(--text-2);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s;
}
.third-chip:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
}
@media (max-width: 960px) {
  .plugin-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 620px) {
  .plugin-grid {
    grid-template-columns: 1fr;
  }
}
</style>
