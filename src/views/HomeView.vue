<script setup lang="ts">
import { SITE, SERVER_PROFILE } from '../data/site'
import { CORE_FEATURES } from '../data/features'
import Reveal from '../components/Reveal.vue'
import UptimeCounter from '../components/UptimeCounter.vue'
import CopyButton from '../components/CopyButton.vue'
import ServerStatusCard from '../components/ServerStatusCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="container hero-inner">
        <div class="hero-badge fade-up" style="animation-delay: 0.05s">
          <span class="dot dot-online" /> {{ SITE.tagline }}
        </div>
        <h1 class="hero-title fade-up" style="animation-delay: 0.15s">
          Pepper<span class="hero-accent"> Craft</span>
        </h1>
        <p class="hero-slogan fade-up" style="animation-delay: 0.25s">
          “{{ SITE.slogan }}” · {{ SITE.subSlogan }}
        </p>

        <div class="hero-ip fade-up" style="animation-delay: 0.35s">
          <span class="ip-text mono">{{ SITE.ip }}</span>
          <CopyButton :text="SITE.ip" label="复制 IP" />
        </div>

        <div class="hero-actions fade-up" style="animation-delay: 0.45s">
          <button class="btn btn-primary" @click="router.push('/join')">立即加入</button>
          <button class="btn btn-ghost" @click="router.push('/about')">了解更多</button>
        </div>
      </div>
      <div class="hero-scroll fade-up" style="animation-delay: 0.6s">
        <span>▾</span>
      </div>
    </section>

    <!-- ============ 实时状态 ============ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">运行状态</span>
            <h2 class="section-title">稳定运行中</h2>
            <p class="section-sub">
              自 {{ SITE.serverStart }} 开服 · 已稳定运行
            </p>
          </div>
        </Reveal>
        <div class="status-layout">
          <Reveal :delay="80">
            <ServerStatusCard />
          </Reveal>
          <Reveal :delay="160">
            <div class="card uptime-card">
              <h3>⏳ 运行时长</h3>
              <UptimeCounter />
              <p class="uptime-note">本地 + 异地双重备份 · 3 年存档承诺（2025-01 起）</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ============ 初心与承诺 ============ -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">关于我们</span>
            <h2 class="section-title">初心与承诺</h2>
            <p class="section-sub">
              PepperCraft 是一个由 Minecraft 爱好者发起的
              <strong style="color: var(--text-1)">高版本纯净生存公益服</strong>，
              致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。
            </p>
          </div>
        </Reveal>

        <Reveal :delay="100">
          <div class="promise-card">
            <span class="promise-icon">📢</span>
            <div>
              <h3>3 年存档承诺</h3>
              <p>{{ SITE.archivePromise }} 存档长久保障，欢迎入驻！</p>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="150">
          <div class="about-img-wrap">
            <img src="/assets/img/ipad.png" alt="PepperCraft 服务器截图" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>

    <!-- ============ 三大特色 ============ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">特色玩法</span>
            <h2 class="section-title">⭐ 服务器特色</h2>
          </div>
        </Reveal>

        <div class="feature-grid">
          <Reveal v-for="(f, i) in CORE_FEATURES" :key="f.title" :delay="i * 120">
            <div class="card feature-card">
              <span class="feature-icon">{{ f.icon }}</span>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ============ 技术保障 ============ -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">技术保障</span>
            <h2 class="section-title">🛠️ 安心游玩</h2>
          </div>
        </Reveal>
        <div class="tech-strip">
          <Reveal v-for="(t, i) in [
            '本地 + 异地双重备份',
            '付费级混合反作弊',
            '强制正版验证',
            '完全遵守官方 EULA',
            '腐竹 3 年+ 开发经验',
            '插件自研率超 18.5%',
          ]" :key="t" :delay="i * 60">
            <span class="tech-chip">✔ {{ t }}</span>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="cta-card">
            <h2>立即加入 Pepper Craft</h2>
            <p class="cta-ip mono">{{ SITE.ip }}</p>
            <p class="cta-note">（{{ SITE.auth }}进服）</p>
            <div class="cta-actions">
              <button class="btn btn-amber" @click="router.push('/join')">查看加入方式</button>
              <CopyButton :text="SITE.ip" label="复制服务器 IP" />
            </div>
            <div class="cta-cards">
              <a class="mini-card" :href="SITE.qqGroupUrl" target="_blank" rel="noopener">
                <span>🎈 交流群</span>
                <strong>{{ SITE.qqGroup }}</strong>
              </a>
              <a class="mini-card" :href="SITE.docsUrl" target="_blank" rel="noopener">
                <span>🌍 官方文档</span>
                <strong>{{ SITE.docsDomain }}</strong>
              </a>
              <div class="mini-card">
                <span>👔 腐竹 QQ</span>
                <strong>{{ SITE.ownerQq }}</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---- hero ---- */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: calc(var(--nav-h) + 40px) 0 80px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.62) 65%, var(--bg-0) 100%),
    url('/assets/img/bg.png') center/cover no-repeat;
  z-index: -1;
}
.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(12, 17, 12, 0.75);
  backdrop-filter: blur(8px);
  font-size: 13.5px;
  color: var(--text-2);
  font-weight: 600;
}
.hero-title {
  font-size: clamp(48px, 9vw, 92px);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
}
.hero-accent {
  color: var(--accent);
  text-shadow: 0 0 30px rgba(88, 193, 105, 0.55);
}
.hero-slogan {
  font-size: clamp(17px, 2.6vw, 23px);
  color: var(--text-2);
  font-weight: 300;
}
.hero-ip {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
  padding: 10px 12px 10px 24px;
  border-radius: 999px;
  background: rgba(12, 17, 12, 0.8);
  border: 1px solid rgba(88, 193, 105, 0.4);
  backdrop-filter: blur(8px);
}
.ip-text {
  font-size: 22px;
  font-weight: 700;
  color: var(--amber);
  letter-spacing: 0.06em;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-scroll {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-3);
  font-size: 22px;
  animation: float 2.2s ease-in-out infinite;
}

/* ---- status ---- */
.status-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 22px;
  align-items: start;
  max-width: 980px;
  margin: 0 auto;
}
.uptime-card h3 {
  margin-bottom: 16px;
  font-size: 18px;
}
.uptime-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--text-3);
}

/* ---- promise ---- */
.promise-card {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 760px;
  margin: 0 auto 40px;
  padding: 22px 28px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.4);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.1), rgba(244, 208, 63, 0.03));
}
.promise-icon {
  font-size: 34px;
}
.promise-card h3 {
  color: var(--amber);
  font-size: 18px;
  margin-bottom: 4px;
}
.promise-card p {
  color: var(--text-2);
  font-size: 14.5px;
}
.about-img-wrap {
  max-width: 880px;
  margin: 0 auto;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
}
.about-img-wrap img {
  width: 100%;
  transition: transform 0.6s;
}
.about-img-wrap:hover img {
  transform: scale(1.02);
}

/* ---- features ---- */
.section-alt {
  background: var(--bg-1);
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  max-width: 980px;
  margin: 0 auto;
}
.feature-card {
  height: 100%;
}
.feature-icon {
  font-size: 34px;
  display: block;
  margin-bottom: 12px;
}
.feature-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.feature-desc {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.8;
}

/* ---- tech ---- */
.tech-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 860px;
  margin: 0 auto;
}
.tech-chip {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s;
}
.tech-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* ---- CTA ---- */
.cta-card {
  text-align: center;
  padding: 56px 30px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background:
    linear-gradient(160deg, rgba(88, 193, 105, 0.08), transparent 55%),
    var(--bg-1);
  box-shadow: var(--shadow-lg);
}
.cta-card h2 {
  font-size: clamp(26px, 4vw, 38px);
  margin-bottom: 18px;
}
.cta-ip {
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
  color: var(--amber);
  letter-spacing: 0.05em;
}
.cta-note {
  color: var(--text-3);
  font-size: 13.5px;
  margin: 6px 0 24px;
}
.cta-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 36px;
}
.cta-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;
}
.mini-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: var(--radius);
  background: var(--bg-0);
  border: 1px solid var(--border);
  color: var(--text-1);
  transition: all 0.25s;
}
a.mini-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.mini-card span {
  font-size: 13px;
  color: var(--text-3);
}
.mini-card strong {
  font-size: 16px;
  color: var(--text-1);
  font-family: var(--font-mono);
}

/* ---- responsive ---- */
@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .status-layout {
    grid-template-columns: 1fr;
  }
  .cta-cards {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .hero-ip {
    flex-direction: column;
    padding: 14px 18px;
  }
}
</style>
