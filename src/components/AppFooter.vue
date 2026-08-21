<script setup lang="ts">
import { SITE } from '../data/site'

const year = new Date().getFullYear()

function go(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const navs = [
  { id: 'about', label: '关于' },
  { id: 'features', label: '特色玩法' },
  { id: 'join', label: '加入我们' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <h4 style="font-size: 18px">⛏ Pepper Craft</h4>
          <p>
            {{ SITE.slogan }} · {{ SITE.tagline }}<br />
            服务器 IP：<strong style="color: var(--accent)">{{ SITE.ip }}</strong>
            （强制正版验证）
          </p>
        </div>
        <div class="footer-links">
          <div>
            <h5>导航</h5>
            <a v-for="n in navs" :key="n.id" @click.prevent="go(n.id)">{{ n.label }}</a>
            <a @click.prevent="go('top')">返回顶部</a>
          </div>
          <div>
            <h5>联系</h5>
            <a :href="SITE.qqGroupUrl" target="_blank" rel="noopener">交流群 {{ SITE.qqGroup }}</a>
            <a :href="SITE.docsUrl" target="_blank" rel="noopener">官方文档 {{ SITE.docsDomain }}</a>
            <a :href="SITE.github" target="_blank" rel="noopener">GitHub 开源</a>
          </div>
          <div>
            <h5>服务器</h5>
            <span style="color: var(--text-3); font-size: 13.5px; display: block">开服于 {{ SITE.serverStart }}</span>
            <span style="color: var(--text-3); font-size: 13.5px; display: block">高版本纯净生存公益服</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        Copyright &copy; Pepper Craft 2023-{{ year }} · 非官方 Minecraft 项目，与 Mojang 无关 · 完全遵守 EULA
      </div>
    </div>
  </footer>
</template>
