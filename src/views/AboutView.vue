<script setup lang="ts">
import { SITE, SERVER_PROFILE } from '../data/site'
import { TIMELINE, SNAPSHOT_STATS } from '../data/timeline'
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
              <strong style="color: var(--text-1)">高版本纯净生存公益服</strong>。
              我们致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。
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

    <!-- 数据一览 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">数据一览</span>
            <h2 class="section-title">用数字说话</h2>
            <p class="section-sub">以下数据为服务器存档快照（{{ SITE.snapshotTime }} 抓取），真实来自服务器本体。</p>
          </div>
        </Reveal>
        <div class="stat-grid">
          <Reveal v-for="(s, i) in [
            { n: SNAPSHOT_STATS.startDate, l: '开服时间' },
            { n: `${SNAPSHOT_STATS.players}`, l: '累计玩家' },
            { n: `${SNAPSHOT_STATS.totalHours.toLocaleString()}h`, l: '累计游戏时长' },
            { n: `${SNAPSHOT_STATS.towns}`, l: '现存联盟' },
            { n: SERVER_PROFILE.difficulty, l: '游戏难度' },
            { n: '60+', l: '运行插件' },
          ]" :key="s.l" :delay="i * 80">
            <div class="stat-cell">
              <span class="stat-big">{{ s.n }}</span>
              <span class="stat-small">{{ s.l }}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 技术档案 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">技术档案</span>
            <h2 class="section-title">🛠️ 强大的技术保障</h2>
          </div>
        </Reveal>
        <div class="tech-grid">
          <Reveal v-for="(v, k, i) in SERVER_PROFILE" :key="k" :delay="i * 60">
            <div class="tech-cell">
              <span class="tech-k">{{ k }}</span>
              <span class="tech-v">{{ v }}</span>
            </div>
          </Reveal>
        </div>
        <Reveal :delay="120">
          <p class="tech-note">
            腐竹拥有 3 年以上专业开发经验，服内插件自研率超 18.5%，
            配备本地/异地双重备份与付费级混合反作弊，强制正版验证，完全遵守官方 EULA。
          </p>
        </Reveal>
      </div>
    </section>

    <!-- 时间线 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">大事记</span>
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
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.stat-cell {
  text-align: center;
  padding: 30px 16px;
  border-radius: var(--radius);
  background: var(--bg-2);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.stat-cell:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
.stat-big {
  display: block;
  font-family: var(--font-head);
  font-size: clamp(22px, 3.4vw, 34px);
  font-weight: 800;
  color: var(--accent);
}
.stat-small {
  display: block;
  margin-top: 6px;
  color: var(--text-3);
  font-size: 13px;
  letter-spacing: 0.1em;
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.tech-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  border-radius: var(--radius-sm);
  background: var(--bg-2);
  border: 1px solid var(--border-soft);
}
.tech-k {
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.tech-v {
  font-size: 15px;
  color: var(--text-1);
  font-weight: 600;
}
.tech-note {
  max-width: 720px;
  margin: 30px auto 0;
  text-align: center;
  color: var(--text-2);
  font-size: 14.5px;
  line-height: 1.9;
}
.timeline {
  max-width: 720px;
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
@media (max-width: 800px) {
  .stat-grid, .tech-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 520px) {
  .stat-grid, .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
