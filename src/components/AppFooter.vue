<script setup lang="ts">
import { SITE } from '../data/site'
import { useFullPageStore } from '../stores/fullpage'
import AppIcon from './AppIcon.vue'

const fpStore = useFullPageStore()
const year = new Date().getFullYear()

/**
 * 站内跳转统一走 fullpage store：各屏没有 DOM id，
 * 用 getElementById 找不到元素（曾导致页脚导航点击无反应）。
 */
function go(id: string) {
  fpStore.goToId(id)
}

const navs = [
  { id: 'about', label: '关于' },
  { id: 'features', label: '特色玩法' },
  { id: 'join', label: '加入我们' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <h4 class="footer-logo">
          <AppIcon name="cube" :size="26" />
          <span class="fl-pepper">Pepper</span><span class="fl-craft">Craft</span>
        </h4>
        <p class="footer-tag">{{ SITE.slogan }} · {{ SITE.tagline }}</p>
        <div class="footer-ip">
          <span class="footer-ip-k">服务器地址</span>
          <span class="footer-ip-v mono">{{ SITE.ip }}</span>
        </div>
        <p class="footer-note">{{ SITE.auth }} · {{ SITE.eula }}</p>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h5>导航</h5>
          <a v-for="n in navs" :key="n.id" @click.prevent="go(n.id)">{{ n.label }}</a>
          <a @click.prevent="go('hero')">返回顶部</a>
        </div>
        <div class="footer-col">
          <h5>联系</h5>
          <a :href="SITE.qqGroupUrl" target="_blank" rel="noopener">交流群 {{ SITE.qqGroup }}</a>
          <a :href="SITE.docsUrl" target="_blank" rel="noopener">官方文档 {{ SITE.docsDomain }}</a>
          <a :href="SITE.github" target="_blank" rel="noopener">GitHub 开源</a>
        </div>
        <div class="footer-col">
          <h5>服务器</h5>
          <span>开服于 <em class="mono">{{ SITE.serverStart }}</em></span>
          <span>{{ SITE.version }}</span>
          <span>{{ SITE.difficulty }} · {{ SITE.gameMode }}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="footer-bottom">
        <span>Copyright &copy; PepperCraft 2023-{{ year }}</span>
        <span>非官方 Minecraft 项目，与 Mojang 无关 · 完全遵守 EULA</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  padding-top: 56px;
}

/* 4 栏：品牌栏占一半，三组链接各占其余 */
.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.85fr);
  gap: 40px;
  padding-bottom: 40px;
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

/* ---- 品牌栏 ---- */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 27px;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  color: var(--accent);
}
.fl-pepper { color: var(--accent); }
.fl-craft { color: var(--blue); }
.footer-tag {
  color: var(--text-2);
  font-size: 14px;
  margin-bottom: 18px;
}
.footer-ip {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-soft);
  border-left: 2px solid var(--accent);
}
.footer-ip-k {
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.12em;
}
.footer-ip-v {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: 0.01em;
}
.footer-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--text-3);
}

/* ---- 链接栏 ---- */
.footer-col h5 {
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: 0.16em;
  margin-bottom: 14px;
  font-weight: 700;
}
.footer-col a,
.footer-col span {
  display: block;
  font-size: 13.5px;
  line-height: 1.5;
  margin-bottom: 11px;
}
.footer-col a {
  color: var(--text-2);
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}
.footer-col a:hover {
  color: var(--accent);
  transform: translateX(3px);
}
.footer-col span {
  color: var(--text-3);
}
.footer-col em {
  font-style: normal;
  color: var(--blue);
}

/* ---- 底栏 ---- */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding: 20px 0 26px;
  border-top: 1px solid var(--border-soft);
  color: var(--text-3);
  font-size: 12.5px;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
}
@media (max-width: 600px) {
  .site-footer { padding-top: 40px; }
  .footer-grid { padding-bottom: 28px; }
  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
  .footer-logo { font-size: 23px; }
  .footer-bottom { padding: 16px 0 22px; }
}
</style>
