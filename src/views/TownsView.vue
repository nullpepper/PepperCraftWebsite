<script setup lang="ts">
import { TOWNS } from '../data/server'
import { TOWN_ACHIEVEMENTS } from '../data/achievements'
import Reveal from '../components/Reveal.vue'

const tierClass: Record<string, string> = {
  普通: 'badge',
  目标: 'badge badge-accent',
  挑战: 'badge badge-amber',
}
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">联盟与领地</h1>
        <p class="page-sub">
          区块级领地保护 · 联盟农场 · 城镇金库 —— 服务器现存
          <strong style="color: var(--accent)">{{ TOWNS.length }} 个联盟</strong>
        </p>
      </div>
    </section>

    <!-- 玩法介绍 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">玩法介绍</span>
            <h2 class="section-title">🏰 联盟系统（HuskTowns）</h2>
          </div>
        </Reveal>
        <div class="intro-grid">
          <Reveal v-for="(item, i) in [
            { icon: '🛡️', title: '区块级领地', desc: '使用 /town claim 认领脚下的区块，建筑与物资即刻受到保护。三种领地类型：常规领地、联盟农场、成员地块。' },
            { icon: '🌱', title: '联盟农场', desc: '将领地转为农场后，作物随联盟等级加速生长，怪物生成器效率提升，所有成员都能耕作。' },
            { icon: '🏦', title: '城镇金库', desc: '联盟拥有独立金库：成员可存款（/town deposit），管理者可投资升级（/town level），等级越高特权越多。' },
            { icon: '👥', title: '角色体系', desc: '联盟长、管理员、成员三级角色，权限继承制：晋升、驱逐、改名、改色、设出生点，各司其职。' },
          ]" :key="item.title" :delay="i * 100">
            <div class="card intro-card">
              <span class="intro-icon">{{ item.icon }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 城镇名单 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">现存联盟</span>
            <h2 class="section-title">🌍 {{ TOWNS.length }} 个联盟</h2>
            <p class="section-sub">以下为服务器存档快照中的联盟名单（{{ new Date().toISOString().slice(0, 10) }}）</p>
          </div>
        </Reveal>
        <div class="town-grid">
          <Reveal v-for="(t, i) in TOWNS" :key="t.id" :delay="(i % 5) * 70">
            <div class="town-card">
              <span class="town-idx">#{{ String(t.id).padStart(2, '0') }}</span>
              <span class="town-name">{{ t.name }}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- 成就 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">联盟成就</span>
            <h2 class="section-title">🏅 成就系统</h2>
            <p class="section-sub">通过完成联盟任务解锁成就，边玩边学会领地系统的全部姿势。</p>
          </div>
        </Reveal>
        <div class="ach-grid">
          <Reveal v-for="(a, i) in TOWN_ACHIEVEMENTS" :key="a.name" :delay="(i % 4) * 60">
            <div class="ach-card">
              <div class="ach-head">
                <span class="ach-name">{{ a.name }}</span>
                <span :class="tierClass[a.tier]">{{ a.tier }}</span>
              </div>
              <p class="ach-desc">{{ a.desc }}</p>
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
    url('/assets/img/Image-3.jpg') center/cover;
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
.intro-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.intro-card {
  height: 100%;
}
.intro-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 12px;
}
.intro-card h3 {
  font-size: 17px;
  margin-bottom: 8px;
}
.intro-card p {
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.8;
}
.town-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}
.town-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: var(--radius);
  background: var(--bg-2);
  border: 1px solid var(--border);
  transition: all 0.25s;
}
.town-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.town-idx {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-3);
}
.town-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--text-1);
}
.ach-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.ach-card {
  padding: 18px 20px;
  border-radius: var(--radius-sm);
  background: var(--bg-2);
  border: 1px solid var(--border-soft);
  transition: all 0.25s;
}
.ach-card:hover {
  border-color: rgba(88, 193, 105, 0.4);
}
.ach-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}
.ach-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--text-1);
}
.ach-desc {
  color: var(--text-3);
  font-size: 13.5px;
}
@media (max-width: 960px) {
  .intro-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 620px) {
  .intro-grid, .ach-grid {
    grid-template-columns: 1fr;
  }
}
</style>
