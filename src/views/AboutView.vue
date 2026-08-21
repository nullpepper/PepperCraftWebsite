<script setup lang="ts">
import { SITE } from '../data/site'
import Reveal from '../components/Reveal.vue'
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">关于服务器</h1>
        <p class="page-sub">{{ SITE.description }}</p>
      </div>
    </section>

    <!-- 初心 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">初心</span>
            <h2 class="section-title">为什么有 PepperCraft？</h2>
          </div>
        </Reveal>
        <Reveal :delay="100">
          <div class="about-text">
            <p>
              PepperCraft 是一个由 Minecraft 爱好者发起的
              <strong style="color: var(--text-1)">高版本纯净生存公益服</strong>，
              致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。
            </p>
            <p>
              与那些塞满充值入口、花哨礼包、复杂副本的商业服不同，这里坚持
              <strong style="color: var(--amber)">“基于原版，忠于原版”</strong>：
              用原版的机制、原版的平衡、原版的乐趣，构建一个能长久居住的方块世界。
            </p>
            <div class="promise-banner">
              📢 {{ SITE.archivePromise }}
              <br />
              存档长久保障，欢迎入驻！
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- 技术保障 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">技术保障</span>
            <h2 class="section-title">🛠️ 安心游玩</h2>
          </div>
        </Reveal>
        <div class="tech-grid">
          <Reveal v-for="(t, i) in [
            { icon: '💾', k: '双重备份', v: '本地 + 异地双重备份，存档无忧' },
            { icon: '🛡️', k: '混合反作弊', v: '付费级反作弊（Matrix），公平竞技' },
            { icon: '🔑', k: '正版验证', v: '强制正版验证，完全遵守官方 EULA' },
            { icon: '🧑‍💻', k: '专业开发', v: '腐竹 3 年以上开发经验，自研率 18.5%+' },
          ]" :key="t.k" :delay="i * 80">
            <div class="tech-cell">
              <span class="tech-icon">{{ t.icon }}</span>
              <h3>{{ t.k }}</h3>
              <p>{{ t.v }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 大事记 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">大事记</span>
            <h2 class="section-title">一路走来</h2>
          </div>
        </Reveal>
        <div class="timeline">
          <Reveal v-for="(e, i) in [
            { date: '2023-02-20', title: 'PepperCraft 开服', desc: '高版本纯净生存公益服正式上线。', icon: '🚀' },
            { date: '2025-01', title: '3 年存档承诺', desc: '郑重决定：3 年内不再清除存档内容。', icon: '📜' },
            { date: '2025-07', title: '官方文档开放', desc: 'docs.pepper.ltd 上线：联盟、领地、经济一册通览。', icon: '📚' },
          ]" :key="e.date" :delay="i * 90">
            <div class="tl-item">
              <span class="tl-icon">{{ e.icon }}</span>
              <div class="tl-body">
                <span class="tl-date">{{ e.date }}</span>
                <h4>{{ e.title }}</h4>
                <p>{{ e.desc }}</p>
              </div>
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
    url('/assets/img/bg-signup.jpg') center/cover;
}
.page-title {
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
}
.page-sub {
  color: var(--text-2);
  max-width: 620px;
  margin: 12px auto 0;
  font-size: 16px;
}
.about-text {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 15.5px;
  color: var(--text-2);
  line-height: 2;
}
.promise-banner {
  padding: 20px 26px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.4);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.1), transparent);
  color: var(--amber);
  font-weight: 700;
  font-size: 16px;
  text-align: center;
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  max-width: 980px;
  margin: 0 auto;
}
.tech-cell {
  text-align: center;
  padding: 26px 20px;
  border-radius: var(--radius);
  background: var(--bg-2);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.tech-cell:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
.tech-icon {
  font-size: 30px;
  display: block;
  margin-bottom: 10px;
}
.tech-cell h3 {
  font-size: 16px;
  margin-bottom: 6px;
}
.tech-cell p {
  color: var(--text-3);
  font-size: 13px;
  line-height: 1.7;
}
.timeline {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 27px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(180deg, var(--accent), transparent);
  opacity: 0.35;
}
.tl-item {
  display: flex;
  gap: 22px;
  padding: 14px 0;
  position: relative;
}
.tl-icon {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  font-size: 22px;
  border-radius: 50%;
  background: var(--bg-2);
  border: 2px solid var(--border);
  z-index: 1;
}
.tl-item:hover .tl-icon {
  border-color: var(--accent);
  box-shadow: 0 0 18px rgba(88, 193, 105, 0.3);
}
.tl-date {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--accent);
  letter-spacing: 0.06em;
}
.tl-body h4 {
  font-size: 17px;
  margin: 2px 0 4px;
}
.tl-body p {
  color: var(--text-2);
  font-size: 14px;
}
@media (max-width: 900px) {
  .tech-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 520px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
