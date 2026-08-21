<script setup lang="ts">
import { SITE } from '../data/site'
import { CORE_FEATURES } from '../data/features'
import { TIMELINE, SNAPSHOT_STATS } from '../data/timeline'
import { TOWNS } from '../data/server'
import { PLUGINS } from '../data/plugins'
import Reveal from '../components/Reveal.vue'
import UptimeCounter from '../components/UptimeCounter.vue'
import CopyButton from '../components/CopyButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const topPlayers = [
  { name: 'May_30th', hours: 2375 },
  { name: 'qianggeyu', hours: 1918 },
  { name: 'GD_SHANG', hours: 1363 },
  { name: '.hongyuanzi154', hours: 1064 },
  { name: 'Aiko_mk', hours: 692 },
]
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="container hero-inner">
        <div class="hero-badge fade-up" style="animation-delay: 0.05s">
          <span class="dot dot-online" /> {{ SITE.tagline }} · 日均在线 {{ SITE.dailyOnline }}
        </div>
        <h1 class="hero-title fade-up" style="animation-delay: 0.15s">
          Pepper<span class="hero-accent"> Craft</span>
        </h1>
        <p class="hero-slogan fade-up" style="animation-delay: 0.25s">
          “{{ SITE.slogan }}”<br />
          {{ SITE.subSlogan }}
        </p>

        <div class="hero-ip fade-up" style="animation-delay: 0.35s">
          <span class="ip-text mono">{{ SITE.ip }}</span>
          <CopyButton :text="SITE.ip" label="复制 IP" />
        </div>

        <div class="hero-actions fade-up" style="animation-delay: 0.45s">
          <button class="btn btn-primary" @click="router.push('/join')">立即加入</button>
          <button class="btn btn-ghost" @click="router.push('/about')">了解更多</button>
        </div>

        <div class="hero-uptime fade-up" style="animation-delay: 0.55s">
          <span class="uptime-label">⏳ 已稳定运行</span>
          <UptimeCounter compact />
        </div>
      </div>
      <div class="hero-scroll fade-up" style="animation-delay: 0.7s">
        <span>向下滚动</span>
        <span class="chevron">▾</span>
      </div>
    </section>

    <!-- ============ 数据一览 ============ -->
    <section class="section stats-strip">
      <div class="container">
        <Reveal>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-num">2023-02-20</span>
              <span class="stat-label">开服时间</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ SNAPSHOT_STATS.towns }}+</span>
              <span class="stat-label">联盟数量</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ SNAPSHOT_STATS.players }}+</span>
              <span class="stat-label">累计玩家</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ Math.round(SNAPSHOT_STATS.totalHours / 24) }}+</span>
              <span class="stat-label">累计游玩天数</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ SITE.dailyOnline }}</span>
              <span class="stat-label">日均在线</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- ============ 初心与承诺 ============ -->
    <section class="section" id="about">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">关于我们</span>
            <h2 class="section-title">初心与承诺</h2>
            <p class="section-sub">
              PepperCraft 是一个由 Minecraft 爱好者发起的
              <strong style="color: var(--text-1)">高版本纯净生存公益服</strong>，
              我们致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。
            </p>
          </div>
        </Reveal>

        <Reveal :delay="100">
          <div class="promise-card">
            <span class="promise-icon">📢</span>
            <div>
              <h3>3 年存档承诺</h3>
              <p>
                {{ SITE.archivePromise }}<br />
                存档长久保障，欢迎入驻！
              </p>
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

    <!-- ============ 特色预览 ============ -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">特色玩法</span>
            <h2 class="section-title">⭐ 服务器特色</h2>
            <p class="section-sub">没有臃肿的虚拟货币，没有复杂的地皮系统，只有最纯粹的方块世界。</p>
          </div>
        </Reveal>

        <div class="feature-grid">
          <Reveal v-for="(f, i) in CORE_FEATURES" :key="f.title" :delay="i * 120">
            <div class="card feature-card" @click="router.push('/features')">
              <span class="feature-icon">{{ f.icon }}</span>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
              <ul class="feature-points">
                <li v-for="p in f.points" :key="p">{{ p }}</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ============ 实时状态预览 ============ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">运行状态</span>
            <h2 class="section-title">稳定运行 {{ Math.floor((Date.now() - new Date('2023-02-20T00:00:00+08:00').getTime()) / 86400000) }} 天</h2>
            <p class="section-sub">服务器自 {{ SITE.serverStart }} 开启，本地/异地双重备份，值得信赖。</p>
          </div>
        </Reveal>

        <Reveal :delay="100">
          <div class="status-preview" @click="router.push('/status')">
            <div class="status-preview-text">
              <h3>🌐 实时在线状态</h3>
              <p>当前在线人数、游戏版本、服务器 IP 一键查看 →</p>
            </div>
            <div class="status-preview-chips">
              <span class="badge badge-accent"><span class="dot dot-online" /> 实时检测</span>
              <span class="badge">Purpur 高版本</span>
              <span class="badge">60 秒自动刷新</span>
            </div>
          </div>
        </Reveal>

        <div class="home-uptime">
          <Reveal :delay="150">
            <div class="card uptime-card">
              <h4>⏳ 服务器运行时长</h4>
              <UptimeCounter />
              <p class="uptime-note">开服于 {{ SITE.serverStart }} · 2025年1月起承诺 3 年内不清理存档</p>
            </div>
          </Reveal>
          <Reveal :delay="200">
            <div class="card uptime-card">
              <h4>🏆 在线时长 TOP 5</h4>
              <ol class="top-list">
                <li v-for="(p, i) in topPlayers" :key="p.name">
                  <span class="rank">{{ i + 1 }}</span>
                  <span class="pname">{{ p.name }}</span>
                  <span class="phours">{{ p.hours }} 小时</span>
                </li>
              </ol>
              <button class="btn btn-ghost btn-sm" @click="router.push('/status')">查看完整排行 →</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ============ 联盟预览 ============ -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">联盟领地</span>
            <h2 class="section-title">🏰 25 个联盟百花齐放</h2>
            <p class="section-sub">区块级领地保护、联盟农场、城镇金库——HuskTowns 驱动的高质量社区形态。</p>
          </div>
        </Reveal>

        <Reveal :delay="100">
          <div class="town-cloud">
            <span v-for="t in TOWNS" :key="t.id" class="town-chip">{{ t.name }}</span>
          </div>
        </Reveal>

        <Reveal :delay="150">
          <div class="center-cta">
            <button class="btn btn-ghost" @click="router.push('/towns')">探索联盟系统 →</button>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- ============ 自研插件预览 ============ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">技术实力</span>
            <h2 class="section-title">🛠️ 自研插件生态</h2>
            <p class="section-sub">腐竹 3 年以上开发经验，服内插件自研率超 18.5%，全部开源在 GitHub。</p>
          </div>
        </Reveal>

        <div class="plugin-strip">
          <Reveal v-for="(p, i) in PLUGINS.slice(0, 6)" :key="p.name" :delay="i * 80">
            <a class="plugin-pill" :href="p.github" target="_blank" rel="noopener">
              <span class="plugin-dot" /> {{ p.name }}
            </a>
          </Reveal>
        </div>

        <Reveal :delay="120">
          <div class="center-cta">
            <button class="btn btn-ghost" @click="router.push('/plugins')">查看全部插件 →</button>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- ============ 时间线 ============ -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">服务器大事记</span>
            <h2 class="section-title">一路走来的足迹</h2>
          </div>
        </Reveal>
        <div class="timeline">
          <Reveal v-for="(e, i) in TIMELINE" :key="e.date" :delay="i * 90">
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

    <!-- ============ CTA ============ -->
    <section class="section cta-section">
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
              <div class="mini-card">
                <span>🎈 交流群</span>
                <strong>{{ SITE.qqGroup }}</strong>
              </div>
              <div class="mini-card">
                <span>🌍 官方文档</span>
                <strong>{{ SITE.docsDomain }}</strong>
              </div>
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
  min-height: 100vh;
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
.hero-uptime {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.uptime-label {
  font-size: 13px;
  color: var(--text-3);
  letter-spacing: 0.14em;
}
.hero-scroll {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-3);
  font-size: 12.5px;
  letter-spacing: 0.2em;
}
.chevron {
  font-size: 18px;
  animation: float 2.2s ease-in-out infinite;
}

/* ---- stats strip ---- */
.stats-strip {
  padding: 34px 0;
  background: linear-gradient(180deg, transparent, rgba(88, 193, 105, 0.04), transparent);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  text-align: center;
}
.stat-item {
  padding: 18px 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-1);
}
.stat-num {
  display: block;
  font-family: var(--font-head);
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 800;
  color: var(--accent);
}
.stat-label {
  display: block;
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--text-3);
  letter-spacing: 0.1em;
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
}
.feature-card {
  cursor: pointer;
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
  margin-bottom: 14px;
}
.feature-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.feature-points li {
  font-size: 13.5px;
  color: var(--text-2);
  padding-left: 20px;
  position: relative;
}
.feature-points li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent);
}

/* ---- status preview ---- */
.status-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 24px 30px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(120deg, var(--bg-2), var(--card));
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 34px;
}
.status-preview:hover {
  border-color: rgba(88, 193, 105, 0.5);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.status-preview-text h3 {
  font-size: 19px;
  margin-bottom: 4px;
}
.status-preview-text p {
  color: var(--text-2);
  font-size: 14px;
}
.status-preview-chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.home-uptime {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.uptime-card {
  height: 100%;
}
.uptime-card h4 {
  margin-bottom: 18px;
  font-size: 16.5px;
}
.uptime-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--text-3);
}
.top-list {
  list-style: none;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.top-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14.5px;
}
.rank {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--bg-0);
  border: 1px solid var(--border);
  font-family: var(--font-head);
  font-size: 12.5px;
  color: var(--amber);
  font-weight: 800;
}
.pname {
  color: var(--text-1);
  font-weight: 600;
}
.phours {
  margin-left: auto;
  color: var(--text-3);
  font-size: 13px;
  font-family: var(--font-mono);
}
.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

/* ---- towns ---- */
.town-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto 30px;
}
.town-chip {
  padding: 9px 20px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s;
  cursor: default;
}
.town-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
  transform: translateY(-2px);
}
.center-cta {
  text-align: center;
  margin-top: 26px;
}

/* ---- plugins ---- */
.plugin-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  max-width: 860px;
  margin: 0 auto;
}
.plugin-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 11px 22px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-1);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 14.5px;
  transition: all 0.25s;
}
.plugin-pill:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(58, 170, 82, 0.2);
  color: var(--accent);
}
.plugin-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

/* ---- timeline ---- */
.timeline {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
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

/* ---- CTA ---- */
.cta-section {
  padding-bottom: 100px;
}
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
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .home-uptime {
    grid-template-columns: 1fr;
  }
  .cta-cards {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .hero-ip {
    flex-direction: column;
    padding: 14px 18px;
  }
}
</style>
