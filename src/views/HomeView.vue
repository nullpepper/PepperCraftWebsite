<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import fullpage from 'fullpage.js'
import 'fullpage.js/dist/fullpage.css'
import { SITE } from '../data/site'
import { CORE_FEATURES } from '../data/features'
import { FAQS } from '../data/faq'
import { useFullPageStore, SCREENS } from '../stores/fullpage'
import UptimeCounter from '../components/UptimeCounter.vue'
import CopyButton from '../components/CopyButton.vue'
import ServerStatusCard from '../components/ServerStatusCard.vue'

const fpStore = useFullPageStore()
const faqOpen = ref<number | null>(0)
const fpReady = ref(false)

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

let fpInstance: fullpage | null = null

function scrollTo(id: string) {
  fpStore.goToId(id)
}

onMounted(() => {
  fpInstance = new fullpage('#fullpage', {
    licenseKey: 'GPLv3',
    // 视觉
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: SCREENS.map((s) => s.label),
    showActiveTooltip: true,
    // 行为
    keyboardScrolling: true,
    fitToSection: true,
    easing: 'easeInOutCubic',
    easingcss3: 'cubic-bezier(0.7, 0, 0.3, 1)',
    // 不与 vue-router hash 冲突
    lockAnchors: true,
    // 回调
    afterLoad: (_origin, destination) => {
      fpStore.setCurrent(destination.index)
    },
  })
  fpStore.setApi(fpInstance)
  fpReady.value = true
})

onBeforeUnmount(() => {
  fpInstance?.destroy('all')
  fpInstance = null
})
</script>

<template>
  <div id="fullpage">
    <!-- ============ 屏1 HERO ============ -->
    <section class="section fp-screen hero-screen">
      <div class="hero-bg" />
      <div class="hero-inner">
        <div class="hero-badge">
          <span class="dot dot-online" /> {{ SITE.tagline }}
        </div>
        <h1 class="hero-title">
          Pepper<span class="hero-accent"> Craft</span>
        </h1>
        <p class="hero-slogan">
          “{{ SITE.slogan }}” · {{ SITE.subSlogan }}
        </p>
        <div class="hero-ip">
          <span class="ip-text mono">{{ SITE.ip }}</span>
          <CopyButton :text="SITE.ip" label="复制 IP" />
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollTo('join')">立即加入</button>
          <button class="btn btn-ghost" @click="scrollTo('about')">了解更多</button>
        </div>
        <div class="hero-hint">
          <span>滚动或点击导航浏览 ▾</span>
        </div>
      </div>
    </section>

    <!-- ============ 屏2 运行状态 ============ -->
    <section class="section fp-screen">
      <div class="screen-inner">
        <div class="section-head">
          <span class="section-eyebrow">运行状态</span>
          <h2 class="section-title">稳定运行中</h2>
          <p class="section-sub">自 {{ SITE.serverStart }} 开服 · 实时在线人数与运行时长</p>
        </div>
        <div class="status-layout">
          <ServerStatusCard />
          <div class="card uptime-card">
            <h3>⏳ 运行时长</h3>
            <UptimeCounter />
            <p class="uptime-note">本地 + 异地双重备份 · 3 年存档承诺（2025-01 起）</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 屏3 关于 ============ -->
    <section class="section fp-screen alt">
      <div class="screen-inner">
        <div class="section-head">
          <span class="section-eyebrow">关于我们</span>
          <h2 class="section-title">初心与承诺</h2>
        </div>
        <p class="about-lead">
          PepperCraft 是一个由 Minecraft 爱好者发起的
          <strong style="color: var(--text-1)">高版本纯净生存公益服</strong>，
          致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。坚持
          <strong style="color: var(--amber)">“基于原版，忠于原版”</strong>，
          用原版的机制与乐趣，构建一个能长久居住的方块世界。
        </p>
        <div class="promise-card">
          <span class="promise-icon">📢</span>
          <div>
            <h3>3 年存档承诺</h3>
            <p>{{ SITE.archivePromise }} 存档长久保障，欢迎入驻！</p>
          </div>
        </div>
        <div class="tech-strip">
          <span v-for="t in techList" :key="t" class="tech-chip">✔ {{ t }}</span>
        </div>
      </div>
    </section>

    <!-- ============ 屏4 特色玩法 ============ -->
    <section class="section fp-screen">
      <div class="screen-inner">
        <div class="section-head">
          <span class="section-eyebrow">特色玩法</span>
          <h2 class="section-title">⭐ 服务器特色</h2>
        </div>
        <div class="feature-grid">
          <div v-for="f in CORE_FEATURES" :key="f.title" class="card feature-card">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
        <div class="extra-strip">
          <span v-for="f in extraFeatures" :key="f.title" class="extra-pill">
            {{ f.icon }} {{ f.title }}
          </span>
        </div>
      </div>
    </section>

    <!-- ============ 屏5 加入我们 ============ -->
    <section class="section fp-screen alt">
      <div class="screen-inner">
        <div class="section-head">
          <span class="section-eyebrow">加入我们</span>
          <h2 class="section-title">立即加入 Pepper Craft</h2>
        </div>
        <div class="join-card">
          <div class="join-ip">
            <span class="join-ip-label">服务器地址</span>
            <span class="join-ip-value mono">{{ SITE.ip }}</span>
            <span class="join-ip-note">（{{ SITE.auth }}进服）</span>
            <CopyButton :text="SITE.ip" label="复制 IP" />
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
            🎉 不定期主题活动，发放限定奖励与特殊称号。欢迎"养老"玩家领奖。
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 屏6 FAQ ============ -->
    <section class="section fp-screen">
      <div class="screen-inner">
        <div class="section-head">
          <span class="section-eyebrow">FAQ</span>
          <h2 class="section-title">常见问题</h2>
        </div>
        <div class="faq-list">
          <div
            v-for="(f, i) in FAQS.slice(0, 4)"
            :key="f.q"
            class="faq-item"
            :class="{ open: faqOpen === i }"
          >
            <button class="faq-q" @click="faqOpen = faqOpen === i ? null : i">
              <span>{{ f.q }}</span>
              <span class="faq-toggle">{{ faqOpen === i ? '−' : '+' }}</span>
            </button>
            <div v-show="faqOpen === i" class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* fullpage 每屏占满一屏 */
#fullpage :deep(.fp-screen) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.screen-inner {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-height: 92vh;
  overflow-y: auto;
}

/* ---- hero ---- */
.hero-screen {
  position: relative;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.62) 65%, rgba(0, 0, 0, 0.82) 100%),
    url('/assets/img/bg.png') center/cover no-repeat;
  z-index: -1;
}
.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  padding: 0 24px;
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
  font-size: clamp(44px, 8vw, 88px);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
}
.hero-accent {
  color: var(--accent);
  text-shadow: 0 0 30px rgba(88, 193, 105, 0.55);
}
.hero-slogan {
  font-size: clamp(16px, 2.4vw, 21px);
  color: var(--text-2);
  font-weight: 300;
}
.hero-ip {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
  padding: 10px 12px 10px 24px;
  border-radius: 999px;
  background: rgba(12, 17, 12, 0.8);
  border: 1px solid rgba(88, 193, 105, 0.4);
  backdrop-filter: blur(8px);
}
.ip-text {
  font-size: 21px;
  font-weight: 700;
  color: var(--amber);
  letter-spacing: 0.06em;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-hint {
  margin-top: 22px;
  color: var(--text-3);
  font-size: 13px;
  letter-spacing: 0.1em;
  animation: float 2.2s ease-in-out infinite;
}

/* ---- section head ---- */
.section-head {
  margin-bottom: 34px;
}
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-head);
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-eyebrow::before,
.section-eyebrow::after {
  content: '';
  width: 28px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
}
.section-eyebrow::after {
  background: linear-gradient(90deg, var(--accent), transparent);
}
.section-title {
  font-size: clamp(24px, 3.6vw, 36px);
  font-weight: 800;
  margin-bottom: 10px;
}
.section-sub {
  color: var(--text-2);
  font-size: 14.5px;
}

/* ---- status ---- */
.status-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 22px;
  width: 100%;
  max-width: 900px;
  align-items: stretch;
}
.uptime-card h3 {
  margin-bottom: 14px;
  font-size: 17px;
}
.uptime-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-3);
}

/* ---- about ---- */
.alt {
  background: var(--bg-1);
}
.about-lead {
  max-width: 720px;
  font-size: 15.5px;
  color: var(--text-2);
  line-height: 2;
  margin-bottom: 26px;
}
.promise-card {
  display: flex;
  align-items: center;
  gap: 18px;
  max-width: 700px;
  padding: 18px 26px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.4);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.1), rgba(244, 208, 63, 0.03));
  text-align: left;
  margin-bottom: 26px;
}
.promise-icon {
  font-size: 30px;
}
.promise-card h3 {
  color: var(--amber);
  font-size: 17px;
  margin-bottom: 4px;
}
.promise-card p {
  color: var(--text-2);
  font-size: 14px;
}
.tech-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 820px;
}
.tech-chip {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  font-size: 13.5px;
  font-weight: 600;
  transition: all 0.25s;
}
.tech-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* ---- features ---- */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 980px;
  margin-bottom: 26px;
}
.feature-card {
  height: 100%;
  text-align: left;
}
.feature-icon {
  font-size: 30px;
  display: block;
  margin-bottom: 10px;
}
.feature-title {
  font-size: 17px;
  margin-bottom: 8px;
}
.feature-desc {
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.8;
}
.extra-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.extra-pill {
  padding: 7px 16px;
  border-radius: 999px;
  background: var(--accent-dim);
  border: 1px solid rgba(88, 193, 105, 0.3);
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
}

/* ---- join ---- */
.join-card {
  width: 100%;
  max-width: 840px;
  padding: 30px 34px 24px;
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
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 22px;
  padding-bottom: 20px;
  border-bottom: 1px dashed var(--border);
}
.join-ip-label {
  font-family: var(--font-head);
  font-size: 12.5px;
  letter-spacing: 0.16em;
  color: var(--text-3);
}
.join-ip-value {
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 800;
  color: var(--amber);
  letter-spacing: 0.05em;
}
.join-ip-note {
  color: var(--text-3);
  font-size: 12.5px;
}
.join-contacts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.contact-card {
  text-align: center;
  padding: 16px;
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
  font-size: 24px;
  margin-bottom: 6px;
  display: block;
}
.contact-card h4 {
  font-size: 14.5px;
  margin-bottom: 5px;
}
.contact-value {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--accent);
}
.activity-note {
  text-align: center;
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.7;
  padding: 12px 18px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.3);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.07), transparent);
}

/* ---- faq ---- */
.faq-list {
  width: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
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
  padding: 15px 20px;
  background: none;
  border: none;
  color: var(--text-1);
  font-size: 14.5px;
  font-weight: 700;
  font-family: var(--font-body);
  cursor: pointer;
  text-align: left;
}
.faq-toggle {
  font-size: 18px;
  color: var(--accent);
  font-weight: 700;
}
.faq-a {
  padding: 0 20px 14px;
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.8;
}

/* ---- responsive ---- */
@media (max-width: 900px) {
  .status-layout {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
  .feature-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    gap: 14px;
  }
  .join-contacts {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto 16px;
  }
}
@media (max-width: 600px) {
  .hero-ip {
    flex-direction: column;
    padding: 12px 16px;
    gap: 8px;
  }
  .promise-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
