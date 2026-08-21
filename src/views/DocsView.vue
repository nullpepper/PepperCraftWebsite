<script setup lang="ts">
import { ref, computed } from 'vue'
import { COMMAND_GROUPS } from '../data/commands'
import Reveal from '../components/Reveal.vue'

const keyword = ref('')

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return COMMAND_GROUPS
  return COMMAND_GROUPS.map((g) => ({
    ...g,
    commands: g.commands.filter(
      (c) => c.cmd.toLowerCase().includes(kw) || c.desc.includes(keyword.value.trim())
    ),
  })).filter((g) => g.commands.length > 0)
})
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">文档速查</h1>
        <p class="page-sub">
          经济系统与命令速查 · 完整文档见
          <a href="https://docs.pepper.ltd" target="_blank" rel="noopener" style="color: var(--accent)">docs.pepper.ltd</a>
        </p>
      </div>
    </section>

    <!-- 经济系统 -->
    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">经济系统</span>
            <h2 class="section-title">💎 钻石银行</h2>
            <p class="section-sub">
              PepperCraft 服务器采用<strong style="color: var(--amber)">钻石</strong>作为通用货币。
              当然，物品状态的钻石不能用作交易货币，你需要先将钻石存入银行。
            </p>
          </div>
        </Reveal>

        <Reveal :delay="80">
          <div class="bank-grid">
            <div class="card bank-card">
              <h3>🖥️ GUI 管理界面</h3>
              <p>通过可视化界面存储、取出钻石，一目了然。</p>
              <pre class="code-block">/bank gui</pre>
            </div>
            <div class="card bank-card">
              <h3>💾 存入钻石</h3>
              <p>将背包中一定数量的钻石存入银行，交易更安心。</p>
              <pre class="code-block">/bank save &lt;数额&gt;</pre>
            </div>
            <div class="card bank-card">
              <h3>🏧 取出钻石</h3>
              <p>随时将银行中的钻石取回背包。</p>
              <pre class="code-block">/bank withdraw &lt;数额&gt;</pre>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="120">
          <p class="bank-note">
            💡 小贴士：钻石银行与联盟金库一脉相承——联盟成员可向城镇金库存款
            （/town deposit），管理者可用金库资金为联盟升级（/town level）。
          </p>
        </Reveal>
      </div>
    </section>

    <!-- 命令速查 -->
    <section class="section section-alt">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <span class="section-eyebrow">命令速查</span>
            <h2 class="section-title">⌨️ 常用指令</h2>
            <p class="section-sub">输入关键词快速检索（如 "town"、"bank"、"家"）</p>
          </div>
        </Reveal>

        <Reveal :delay="60">
          <div class="search-box">
            <input
              v-model="keyword"
              type="search"
              placeholder="🔍 搜索命令，如 /town claim、金库、邀请…"
              class="search-input"
            />
          </div>
        </Reveal>

        <Reveal v-for="(g, gi) in filtered" :key="g.title" :delay="80 + gi * 60">
          <div class="cmd-group">
            <div class="cmd-head">
              <span class="cmd-icon">{{ g.icon }}</span>
              <div>
                <h3>{{ g.title }}</h3>
                <p>{{ g.desc }}</p>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width: 42%">命令</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in g.commands" :key="c.cmd">
                    <td><code>{{ c.cmd }}</code></td>
                    <td>{{ c.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="120">
          <p v-if="filtered.length === 0" class="no-result">没有找到匹配的命令 😢 换个关键词试试？</p>
        </Reveal>
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
    url('/assets/img/Image-2.jpg') center/cover;
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
.bank-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.bank-card h3 {
  font-size: 17px;
  margin-bottom: 8px;
}
.bank-card p {
  color: var(--text-2);
  font-size: 14px;
  margin-bottom: 14px;
}
.bank-note {
  max-width: 780px;
  margin: 26px auto 0;
  text-align: center;
  color: var(--text-3);
  font-size: 14px;
}
.search-box {
  max-width: 560px;
  margin: 0 auto 44px;
}
.search-input {
  width: 100%;
  padding: 15px 22px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-1);
  font-size: 15px;
  outline: none;
  transition: all 0.25s;
}
.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(88, 193, 105, 0.12);
}
.cmd-group {
  margin-bottom: 34px;
}
.cmd-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}
.cmd-icon {
  font-size: 30px;
}
.cmd-head h3 {
  font-size: 19px;
}
.cmd-head p {
  color: var(--text-3);
  font-size: 13px;
}
.no-result {
  text-align: center;
  color: var(--text-3);
  padding: 30px;
}
@media (max-width: 800px) {
  .bank-grid {
    grid-template-columns: 1fr;
  }
}
</style>
