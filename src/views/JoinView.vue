<script setup lang="ts">
import { SITE } from '../data/site'
import { FAQS } from '../data/faq'
import Reveal from '../components/Reveal.vue'
import CopyButton from '../components/CopyButton.vue'
import { ref } from 'vue'

const openIdx = ref<number | null>(0)
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">加入我们</h1>
        <p class="page-sub">一个 IP，一份初心 —— 欢迎来到 Pepper Craft</p>
      </div>
    </section>

    <!-- IP -->
    <section class="section">
      <div class="container">
        <Reveal>
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
          </div>
        </Reveal>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">联系方式</span>
            <h2 class="section-title">找到我们</h2>
          </div>
        </Reveal>
        <div class="contact-grid">
          <Reveal :delay="0">
            <a class="card contact-card" :href="SITE.qqGroupUrl" target="_blank" rel="noopener">
              <span class="contact-icon">🎈</span>
              <h3>交流群</h3>
              <p class="contact-value mono">{{ SITE.qqGroup }}</p>
              <p class="contact-desc">群内聊天同步、活动通知、新人答疑</p>
            </a>
          </Reveal>
          <Reveal :delay="100">
            <a class="card contact-card" :href="SITE.docsUrl" target="_blank" rel="noopener">
              <span class="contact-icon">🌍</span>
              <h3>官方文档</h3>
              <p class="contact-value mono">{{ SITE.docsDomain }}</p>
              <p class="contact-desc">联盟、领地、经济系统完整指南</p>
            </a>
          </Reveal>
          <Reveal :delay="200">
            <div class="card contact-card">
              <span class="contact-icon">👔</span>
              <h3>腐竹 QQ</h3>
              <p class="contact-value mono">{{ SITE.ownerQq }}</p>
              <p class="contact-desc">服务器问题反馈与建议直达</p>
            </div>
          </Reveal>
        </div>

        <Reveal :delay="150">
          <div class="activity-banner">
            <span class="activity-icon">🎉</span>
            <p>
              服务器会不定期举行主题活动，发放<strong style="color: var(--amber)">限定奖励与特殊称号</strong>。
              欢迎各位有意向但平时精力有限的玩家前来"养老"领奖。
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">FAQ</span>
            <h2 class="section-title">常见问题</h2>
          </div>
        </Reveal>
        <div class="faq-list">
          <Reveal v-for="(f, i) in FAQS.slice(0, 4)" :key="f.q" :delay="(i % 4) * 60">
            <div class="faq-item" :class="{ open: openIdx === i }">
              <button class="faq-q" @click="openIdx = openIdx === i ? null : i">
                <span>{{ f.q }}</span>
                <span class="faq-toggle">{{ openIdx === i ? '−' : '+' }}</span>
              </button>
              <div v-show="openIdx === i" class="faq-a">
                <p>{{ f.a }}</p>
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
  margin-top: 12px;
  font-size: 15.5px;
}
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
  margin-bottom: 36px;
  padding-bottom: 30px;
  border-bottom: 1px dashed var(--border);
}
.join-ip-label {
  font-family: var(--font-head);
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--text-3);
}
.join-ip-value {
  font-size: clamp(30px, 5vw, 46px);
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
  width: 34px;
  height: 34px;
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
  font-size: 15.5px;
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
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  max-width: 900px;
  margin: 0 auto;
}
.contact-card {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-1);
}
.contact-icon {
  font-size: 30px;
  margin-bottom: 10px;
}
.contact-card h3 {
  font-size: 17px;
  margin-bottom: 6px;
}
.contact-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
}
.contact-desc {
  color: var(--text-3);
  font-size: 12.5px;
  margin-top: 6px;
}
.activity-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  max-width: 760px;
  margin: 40px auto 0;
  padding: 22px 28px;
  border-radius: var(--radius);
  border: 1px solid rgba(244, 208, 63, 0.35);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.09), transparent);
  text-align: center;
}
.activity-icon {
  font-size: 30px;
}
.activity-banner p {
  color: var(--text-2);
  font-size: 14.5px;
  line-height: 1.8;
}
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
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
  .join-steps {
    grid-template-columns: 1fr;
  }
}
</style>
