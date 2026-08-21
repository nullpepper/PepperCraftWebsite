<script setup lang="ts">
import { SITE } from '../data/site'
import { CORE_FEATURES } from '../data/features'
import { FAQS } from '../data/faq'
import Reveal from '../components/Reveal.vue'
import UptimeCounter from '../components/UptimeCounter.vue'
import CopyButton from '../components/CopyButton.vue'
import ServerStatusCard from '../components/ServerStatusCard.vue'
import { ref } from 'vue'

const faqOpen = ref<number | null>(0)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const extraFeatures = [
  { icon: '🏰', title: '联盟与领地', desc: '区块级领地保护、联盟农场、城镇金库，服务器现有 25 个联盟。' },
  { icon: '💎', title: '钻石经济', desc: '以原版钻石为硬通货，/bank 存取，没有膨胀的虚拟币。' },
  { icon: '🤖', title: 'QQ 机器人联动', desc: '自研 PepperBot 家族：聊天同步、指令转发、自动回复。' },
  { icon: '🌍', title: '跨版本支持', desc: 'Java 版全版本 + 基岩版玩家均可进入。' },
]

const techList = [
  '本地 + 异地双重备份',
  '付费级混合反作弊',
  '强制正版验证',
  '完全遵守官方 EULA',
  '腐竹 3 年+ 开发经验',
  '插件自研率超 18.5%',
]

const timeline = [
  { date: '2023-02-20', title: 'PepperCraft 开服', desc: '高版本纯净生存公益服正式上线。', icon: '🚀' },
  { date: '2025-01', title: '3 年存档承诺', desc: '郑重决定：3 年内不再清除存档内容。', icon: '📜' },
  { date: '2025-07', title: '官方文档开放', desc: 'docs.pepper.ltd 上线：联盟、领地、经济一册通览。', icon: '📚' },
]
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="hero" id="top">
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
        <button class="btn btn-primary" @click="scrollTo('join')">立即加入</button>
        <button class="btn btn-ghost" @click="scrollTo('about')">了解更多</button>
      </div>
    </div>
    <div class="hero-scroll fade-up" style="animation-delay: 0.6s">
      <span>▾</span>
    </div>
  </section>

  <!-- ============ 实时状态 ============ -->
  <section class="section" id="status">
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

  <!-- ============ 关于 / 初心 ============ -->
  <section class="section section-alt" id="about">
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
        <div class="about-text">
          <p>
            与那些塞满充值入口、花哨礼包、复杂副本的商业服不同，这里坚持
            <strong style="color: var(--amber)">“基于原版，忠于原版”</strong>：
            用原版的机制、原版的平衡、原版的乐趣，构建一个能长久居住的方块世界。
          </p>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- ============ 特色玩法 ============ -->
  <section class="section" id="features">
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
            <ul class="feature-points">
              <li v-for="p in f.points" :key="p">{{ p }}</li>
            </ul>
          </div>
        </Reveal>
      </div>

      <!-- 更多玩法 -->
      <div class="extra-block">
        <Reveal :delay="80">
          <h3 class="extra-title">更多玩法</h3>
        </Reveal>
        <div class="extra-grid">
          <Reveal v-for="(f, i) in extraFeatures" :key="f.title" :delay="(i % 2) * 100">
            <div class="card extra-card">
              <span class="extra-icon">{{ f.icon }}</span>
              <h4>{{ f.title }}</h4>
              <p>{{ f.desc }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 技术保障 ============ -->
  <section class="section section-alt" id="tech">
    <div class="container">
      <Reveal>
        <div class="section-head">
          <span class="section-eyebrow">技术保障</span>
          <h2 class="section-title">🛠️ 安心游玩</h2>
        </div>
      </Reveal>
      <div class="tech-strip">
        <Reveal v-for="(t, i) in techList" :key="t" :delay="i * 60">
          <span class="tech-chip">✔ {{ t }}</span>
        </Reveal>
      </div>

      <Reveal :delay="120">
        <div class="timeline">
          <div v-for="(e, i) in timeline" :key="e.date" class="tl-item">
            <span class="tl-icon">{{ e.icon }}</span>
            <div class="tl-body">
              <span class="tl-date">{{ e.date }}</span>
              <h4>{{ e.title }}</h4>
              <p>{{ e.desc }}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- ============ 加入我们 ============ -->
  <section class="section" id="join">
    <div class="container">
      <Reveal>
        <div class="section-head">
          <span class="section-eyebrow">加入我们</span>
          <h2 class="section-title">立即加入 Pepper Craft</h2>
          <p class="section-sub">一个 IP，一份初心 —— 欢迎回来冒险。</p>
        </div>
      </Reveal>

      <Reveal :delay="80">
        <div class="join-card">
          <div class="join-ip">
            <span class="join-ip-label">服务器地址</span>
            <span class="join-ip-value mono">{{ SITE.ip }}</span>
            <span class="join-ip-note">（{{ SITE.auth }}进服）</span>
            <CopyButton :text="SITE.ip" label="复制 IP" />
          </div>
          <div class="join-steps">
            <div class="step">
              <span class="step-num">1</span>
              <div>
                <h4>启动游戏</h4>
                <p>使用正版 Minecraft Java 版（支持跨版本进入）</p>
              </div>
            </div>
            <div class="step">
              <span class="step-num">2</span>
              <div>
                <h4>添加服务器</h4>
                <p>多人游戏 → 添加服务器 → 地址填 <code class="mono-inline">pepper.ltd</code></p>
              </div>
            </div>
            <div class="step">
              <span class="step-num">3</span>
              <div>
                <h4>开始冒险</h4>
                <p>加入交流群领取新人指南，寻找联盟安家！</p>
              </div>
            </div>
          </div>

          <div class="join-contacts">
            <a class="contact-card" :href="SITE.qqGroupUrl" target="_blank" rel="noopener">
              <span class="contact-icon">🎈</span>
              <h4>交流群</h4>
              <p class="contact-value mono">{{ SITE.qqGroup }}</p>
            </a>
            <a class="contact-card" :href="SITE.docsUrl" target="_blank" rel="noopener">
              <span class="contact-icon">🌍</span>
              <h4>官方文档</h4>
              <p class="contact-value mono">{{ SITE.docsDomain }}</p>
            </a>
            <div class="contact-card">
              <span class="contact-icon">👔</span>
              <h4>腐竹 QQ</h4>
              <p class="contact-value mono">{{ SITE.ownerQq }}</p>
            </div>
          </div>

          <div class="activity-note">
            🎉 服务器会不定期举行主题活动，发放<strong style="color: var(--amber)">限定奖励与特殊称号</strong>。
            欢迎平时精力有限的玩家前来"养老"领奖。
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- ============ FAQ ============ -->
  <section class="section section-alt" id="faq">
    <div class="container">
      <Reveal>
        <div class="section-head">
          <span class="section-eyebrow">FAQ</span>
          <h2 class="section-title">常见问题</h2>
        </div>
      </Reveal>
      <div class="faq-list">
        <Reveal v-for="(f, i) in FAQS.slice(0, 4)" :key="f.q" :delay="i * 60">
          <div class="faq-item" :class="{ open: faqOpen === i }">
            <button class="faq-q" @click="faqOpen = faqOpen === i ? null : i">
              <span>{{ f.q }}</span>
              <span class="faq-toggle">{{ faqOpen === i ? '−' : '+' }}</span>
            </button>
            <div v-show="faqOpen === i" class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- hero ---- */
.hero {
  position: relative;
  min-height: 88vh;
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

/* ---- 通用区块 ---- */
.section-alt {
  background: var(--bg-1);
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
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

/* ---- about ---- */
.promise-card {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 760px;
  margin: 0 auto 34px;
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
.about-text {
  max-width: 720px;
  margin: 0 auto;
  font-size: 15.5px;
  color: var(--text-2);
  line-height: 2;
  text-align: center;
}

/* ---- features ---- */
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

/* ---- extra ---- */
.extra-block {
  margin-top: 56px;
}
.extra-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 24px;
  color: var(--text-1);
}
.extra-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  max-width: 980px;
  margin: 0 auto;
}
.extra-card h4 {
  font-size: 16px;
  margin-bottom: 8px;
}
.extra-card p {
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.8;
}
.extra-icon {
  font-size: 26px;
  display: block;
  margin-bottom: 10px;
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

/* ---- timeline ---- */
.timeline {
  max-width: 540px;
  margin: 50px auto 0;
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
  padding: 12px 0;
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

/* ---- join ---- */
.join-card {
  max-width: 860px;
  margin: 0 auto;
  padding: 44px 34px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background:
    radial-gradient(ellipse at top, rgba(88, 193, 105, 0.12), transparent 60%),
    var(--bg-1);
  box-shadow: var(--shadow-lg);
}
.join-ip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding-bottom: 26px;
  border-bottom: 1px dashed var(--border);
}
.join-ip-label {
  font-family: var(--font-head);
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--text-3);
}
.join-ip-value {
  font-size: clamp(28px, 4.5vw, 42px);
  font-weight: 800;
  color: var(--amber);
  letter-spacing: 0.05em;
}
.join-ip-note {
  color: var(--text-3);
  font-size: 13px;
}
.join-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: left;
}
.step {
  display: flex;
  gap: 14px;
}
.step-num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--accent-dim);
  border: 1px solid rgba(88, 193, 105, 0.35);
  color: var(--accent);
  font-family: var(--font-head);
  font-weight: 800;
}
.step h4 {
  font-size: 15px;
  margin-bottom: 4px;
}
.step p {
  color: var(--text-3);
  font-size: 13px;
  line-height: 1.6;
}
.mono-inline {
  font-family: var(--font-mono);
  color: var(--accent);
  background: var(--bg-0);
  padding: 1px 7px;
  border-radius: 5px;
}
.join-contacts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 28px 0 22px;
}
.contact-card {
  text-align: center;
  padding: 18px;
  border-radius: var(--radius);
  background: var(--bg-0);
  border: 1px solid var(--border);
  color: var(--text-1);
  transition: all 0.25s;
}
a.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.contact-icon {
  font-size: 26px;
  margin-bottom: 8px;
  display: block;
}
.contact-card h4 {
  font-size: 15px;
  margin-bottom: 6px;
}
.contact-value {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
}
.activity-note {
  text-align: center;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.8;
  padding: 14px 20px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.3);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.07), transparent);
}

/* ---- faq ---- */
.faq-list {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-2);
  overflow: hidden;
  transition: border-color 0.25s;
}
.faq-item.open {
  border-color: rgba(88, 193, 105, 0.45);
}
.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 17px 22px;
  background: none;
  border: none;
  color: var(--text-1);
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font-body);
  cursor: pointer;
  text-align: left;
}
.faq-toggle {
  font-size: 20px;
  color: var(--accent);
  font-weight: 700;
}
.faq-a {
  padding: 0 22px 18px;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.9;
}

/* ---- responsive ---- */
@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .extra-grid {
    grid-template-columns: 1fr 1fr;
  }
  .status-layout {
    grid-template-columns: 1fr;
  }
  .join-steps {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .extra-grid {
    grid-template-columns: 1fr;
  }
  .join-contacts {
    grid-template-columns: 1fr;
  }
  .hero-ip {
    flex-direction: column;
    padding: 14px 18px;
  }
}
</style>
