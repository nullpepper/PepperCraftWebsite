<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import fullpage from 'fullpage.js'
import 'fullpage.js/dist/fullpage.css'
import { SITE } from '../data/site'
import { CORE_FEATURES, FEATURE_TAGS, TECH_GUARANTEES } from '../data/features'
import { FAQS } from '../data/faq'
import { JOIN_STEPS } from '../data/joinSteps'
import { useFullPageStore } from '../stores/fullpage'
import UptimeCounter from '../components/UptimeCounter.vue'
import CopyButton from '../components/CopyButton.vue'
import ServerStatusCard from '../components/ServerStatusCard.vue'
import AppFooter from '../components/AppFooter.vue'
import AppIcon from '../components/AppIcon.vue'
// 图片经 Vite 打包：内容 hash 破缓存 + base 路径自动适配（子路径部署不 404）
// 高分辨率适配：每张大幅图提供 1920/2560/3840 三档 srcset，浏览器按「目标 CSS 尺寸 × DPR」取档，
// 4K/Retina 屏不再 2 倍拉伸发糊，1080p 仍只下载 1920 档（体积不涨）
import heroBg from '../assets/img/bg.webp'
import heroBg2560 from '../assets/img/bg-2560.webp'
import heroBg3840 from '../assets/img/bg-3840.webp'
import redstoneImg from '../assets/img/Redstone.webp'
import redstone2560 from '../assets/img/Redstone-2560.webp'
import redstone3840 from '../assets/img/Redstone-3840.webp'
import photoImg from '../assets/img/photo.webp'
import photo2560 from '../assets/img/photo-2560.webp'
import photo3840 from '../assets/img/photo-3840.webp'
import joinBg from '../assets/img/Residence.webp'

// srcset 文本（w 描述符 + sizes 让浏览器按需取档）
const heroSrcset = `${heroBg} 1920w, ${heroBg2560} 2560w, ${heroBg3840} 3840w`
const splitSrcset = (a: string, b: string, c: string) => `${a} 1920w, ${b} 2560w, ${c} 3840w`

const fpStore = useFullPageStore()
const faqOpen = ref<number | null>(0)

let fpInstance: fullpage | null = null

function scrollTo(id: string) {
  fpStore.goToId(id)
}

onMounted(() => {
  fpInstance = new fullpage('#fullpage', {
    // GPLv3 免费 key 申请（开源项目表单）：https://alvarotrigo.com/fullPage/extensions/requestKey.html
    // 填入真实 key 后：① 控制台 2 条 license 报错消失 ② 可设 credits.enabled: false 关闭署名水印
    licenseKey: 'GPLv3',
    // 视觉
    navigation: false,
    // 行为
    keyboardScrolling: true,
    fitToSection: true,
    // 与 main.css 的 900px 断点对齐：<900px 退化原生滚动，
    // 修复 769–900px 区间全屏分页 + 移动布局冲突导致的翻页卡死
    responsiveWidth: 900,
    responsiveHeight: 620,
    easing: 'easeInOutCubic',
    easingcss3: 'cubic-bezier(0.7, 0, 0.3, 1)',
    // 不与 vue-router hash 冲突
    lockAnchors: true,
    // 回调
    // onLeave 在翻页动画开始时触发：导航高亮立即跟上，
    // 不等 afterLoad（动画结束 ~700ms 后才来，肉眼可见滞后）
    onLeave: (_origin, destination) => {
      fpStore.setCurrent(destination.index)
    },
    afterLoad: (_origin, destination) => {
      fpStore.setCurrent(destination.index)
    },
  })
  fpStore.setApi(fpInstance)
})

onBeforeUnmount(() => {
  fpInstance?.destroy('all')
  fpInstance = null
  fpStore.setApi(null)
})
</script>

<template>
  <div id="fullpage">
    <!-- ============ 屏1 HERO ============ -->
    <section class="section fp-screen hero-screen">
      <!-- Hero 背景用 <img>：解析 HTML 即发起下载（CSS 背景要等 CSSOM），
           fetchpriority=high 加固 LCP 优先级；图片本体由 .hero-photo 承载，
           .hero-bg 只叠光效渐变（DOM 顺序保证渐变压在图上层） -->
      <img
        class="hero-photo"
        :src="heroBg"
        :srcset="heroSrcset"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-bg" />
      <span class="screen-num" aria-hidden="true">01</span>
      <div class="hero-inner">
        <p class="hero-badge">
          <span class="dot dot-online" />
          {{ SITE.tagline }}
        </p>
        <h1 class="hero-title">
          <span class="t-pepper">Pepper</span>
          <span class="t-craft">Craft</span>
        </h1>
        <p class="hero-slogan">
          “{{ SITE.slogan }}”<br class="slogan-br" aria-hidden="true" />
          —— {{ SITE.subSlogan }}
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollTo('join')">立即加入</button>
          <button class="btn btn-ghost" @click="scrollTo('features')">看看特色</button>
        </div>
      </div>
      <!-- 贴底通栏事实条 -->
      <div class="hero-facts" aria-label="服务器特点">
        <div class="fact">
          <strong class="mono">{{ SITE.dailyOnline }}</strong>
          <span>日均在线</span>
        </div>
        <div class="fact">
          <strong>{{ SITE.archivePromiseYears }} 年</strong>
          <span>存档承诺</span>
        </div>
        <div class="fact">
          <strong>Java + 基岩</strong>
          <span>跨端支持</span>
        </div>
        <div class="fact">
          <strong class="mono">{{ SITE.serverStart }}</strong>
          <span>开服至今</span>
        </div>
      </div>
    </section>

    <!-- ============ 屏2 运行状态 ============ -->
    <section class="section fp-screen split-screen status-screen">
      <span class="screen-num" aria-hidden="true">02</span>
      <div class="split-copy">
        <header class="screen-head">
          <p class="screen-kicker">运行状态 / STATUS</p>
          <h2 class="screen-title">稳定运行中</h2>
          <p class="screen-sub">自 {{ SITE.serverStart }} 开服 · 实时在线人数与运行时长</p>
        </header>
        <ServerStatusCard />
        <section class="uptime-card">
          <p class="uptime-label mono">UPTIME · 自 {{ SITE.serverStart }}</p>
          <UptimeCounter />
        </section>
      </div>
      <figure class="split-media">
        <img
          :src="redstoneImg"
          :srcset="splitSrcset(redstoneImg, redstone2560, redstone3840)"
          sizes="(max-width: 900px) 100vw, 42vw"
          alt="红石机械夜景"
          loading="lazy"
        />
        <div class="media-scrim" />
      </figure>
    </section>

    <!-- ============ 屏3 关于 ============ -->
    <section class="section fp-screen split-screen about-screen alt">
      <span class="screen-num" aria-hidden="true">03</span>
      <div class="split-copy">
        <header class="screen-head">
          <p class="screen-kicker">关于我们 / ABOUT</p>
          <h2 class="screen-title">初心与承诺</h2>
        </header>
        <!-- prettier-ignore -->
        <p class="about-lead">
          PepperCraft 是一个由 Minecraft 爱好者发起的高版本纯净生存公益服，
          致力于打造日均在线 {{ SITE.dailyOnline }} 的高质量社区。
          坚持<strong class="lead-strong">“基于原版，忠于原版”</strong>，
          用原版的机制与乐趣，构建一个能长久居住的方块世界。
        </p>
        <!-- 上方 prettier-ignore：中文行内排版（坚持<strong>…</strong>，）不容格式化器插空格 -->
        <div class="promise-card">
          <span class="promise-icon"><AppIcon name="megaphone" :size="24" /></span>
          <div>
            <h3>3 年存档承诺</h3>
            <p>{{ SITE.archivePromise }} 存档长久保障，欢迎入驻！</p>
          </div>
        </div>
        <ul class="tech-strip">
          <li v-for="t in TECH_GUARANTEES" :key="t" class="tech-chip">
            <AppIcon name="check" :size="13" />
            {{ t }}
          </li>
        </ul>
      </div>
      <figure class="split-media">
        <img
          :src="photoImg"
          :srcset="splitSrcset(photoImg, photo2560, photo3840)"
          sizes="(max-width: 900px) 100vw, 42vw"
          alt="玩家合影"
          loading="lazy"
        />
        <div class="media-scrim" />
      </figure>
    </section>

    <!-- ============ 屏4 特色玩法 ============ -->
    <section class="section fp-screen features-screen">
      <span class="screen-num" aria-hidden="true">04</span>
      <header class="screen-head features-head">
        <p class="screen-kicker">玩法特色 / FEATURES</p>
        <h2 class="screen-title">服务器特色</h2>
      </header>
      <div class="feature-grid">
        <article v-for="f in CORE_FEATURES" :key="f.title" class="feature-card">
          <div class="feature-media">
            <img
              :src="f.image"
              :alt="f.title"
              loading="lazy"
              :style="{ objectPosition: f.imagePosition }"
            />
          </div>
          <div class="feature-body">
            <h3 class="feature-title">
              <span class="feature-icon"><AppIcon :name="f.icon" :size="20" /></span>
              {{ f.title }}
            </h3>
            <p class="feature-desc">{{ f.desc }}</p>
            <ul class="feature-points">
              <li v-for="p in f.points" :key="p">
                <AppIcon name="check" :size="13" />
                {{ p }}
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="tag-grid">
        <div
          v-for="t in FEATURE_TAGS"
          :key="t.title"
          class="tag-card"
          :class="{ technical: t.variant === 'technical' }"
        >
          <span class="tag-icon"><AppIcon :name="t.icon" :size="18" /></span>
          <div class="tag-copy">
            <h4>{{ t.title }}</h4>
            <p>{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 屏5 加入我们 ============ -->
    <section class="section fp-screen join-screen alt">
      <div class="join-bg" :style="{ '--join-img': `url(${joinBg})` }" />
      <span class="screen-num" aria-hidden="true">05</span>
      <header class="screen-head join-head">
        <p class="screen-kicker">加入我们 / JOIN</p>
        <h2 class="screen-title">立即加入 PepperCraft</h2>
      </header>
      <div class="join-card">
        <div class="join-kicker mono">JAVA / BEDROCK · {{ SITE.auth }}</div>
        <div class="join-ip">
          <span class="join-ip-value mono">{{ SITE.ip }}</span>
          <CopyButton :text="SITE.ip" label="复制 IP" />
        </div>
        <p class="join-summary">
          {{ SITE.slogan }}。高版本纯净生存，欢迎建筑、生电和养老玩家入驻。
        </p>
      </div>
      <div class="contact-row">
        <a class="contact-card" :href="SITE.qqGroupUrl" target="_blank" rel="noopener">
          <span class="contact-icon"><AppIcon name="users" :size="20" /></span>
          <div>
            <h4>交流群</h4>
            <p class="contact-value mono">{{ SITE.qqGroup }}</p>
          </div>
        </a>
        <a class="contact-card contact-docs" :href="SITE.docsUrl" target="_blank" rel="noopener">
          <span class="contact-icon"><AppIcon name="docs" :size="20" /></span>
          <div>
            <h4>官方文档</h4>
            <p class="contact-value mono">{{ SITE.docsDomain }}</p>
          </div>
        </a>
        <div class="contact-card">
          <span class="contact-icon"><AppIcon name="crown" :size="20" /></span>
          <div>
            <h4>腐竹 QQ</h4>
            <p class="contact-value mono">{{ SITE.ownerQq }}</p>
          </div>
          <CopyButton :text="SITE.ownerQq" label="复制" />
        </div>
      </div>
      <!-- 三步加入：服务器无自研客户端，玩家走 Mojang 官方启动器路径 -->
      <div class="join-steps" aria-label="加入步骤">
        <div v-for="(s, i) in JOIN_STEPS" :key="s.title" class="join-step">
          <span class="join-step-num mono" aria-hidden="true">{{
            String(i + 1).padStart(2, '0')
          }}</span>
          <div class="join-step-copy">
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
      <div class="recruit-panel">
        <div class="recruit-heading">
          <span class="recruit-kicker">招募说明</span>
          <span class="recruit-rule">不定期活动 · 限定奖励</span>
        </div>
        <div class="recruit-grid">
          <div>
            <strong>新玩家</strong>
            <p>活跃参与可获得钻石、称号等奖励。</p>
          </div>
          <div>
            <strong>建筑玩家</strong>
            <p>提供建材支持，参与主城维护与扩建。</p>
          </div>
          <div>
            <strong>老玩家回归</strong>
            <p>满足历史贡献、建筑或事件记忆等条件，可申请回归补偿。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 屏6 FAQ ============ -->
    <section class="section fp-screen faq-screen">
      <span class="screen-num" aria-hidden="true">06</span>
      <div class="faq-layout">
        <div class="faq-copy">
          <header class="screen-head">
            <p class="screen-kicker">FAQ</p>
            <h2 class="screen-title">常见问题</h2>
          </header>
          <p class="faq-more">没找到答案？加交流群直接问，或在文档站检索。</p>
          <div class="faq-actions">
            <a class="btn btn-primary" :href="SITE.qqGroupUrl" target="_blank" rel="noopener">
              QQ 群
              <span class="mono">{{ SITE.qqGroup }}</span>
            </a>
            <a class="btn btn-ghost" :href="SITE.docsUrl" target="_blank" rel="noopener">
              文档站入口
            </a>
          </div>
        </div>
        <div class="faq-list">
          <div v-for="(f, i) in FAQS" :key="f.q" class="faq-item" :class="{ open: faqOpen === i }">
            <button
              class="faq-q"
              :id="'faq-q-' + i"
              :aria-expanded="faqOpen === i"
              :aria-controls="'faq-a-' + i"
              @click="faqOpen = faqOpen === i ? null : i"
            >
              <span class="faq-q-text">
                <span class="faq-index mono">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ f.q }}
              </span>
              <span class="faq-toggle" :class="{ open: faqOpen === i }" aria-hidden="true">+</span>
            </button>
            <Transition name="faq-expand">
              <div
                v-if="faqOpen === i"
                class="faq-a-shell"
                :id="'faq-a-' + i"
                role="region"
                :aria-labelledby="'faq-q-' + i"
              >
                <div class="faq-a">
                  <p>{{ f.a }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 屏7 页尾（fp-auto-height） ============ -->
    <section class="section fp-screen fp-auto-height footer-screen">
      <AppFooter />
    </section>
  </div>
</template>

<style scoped>
/* ============================================================
   基础：每屏独立布局，不再有统一的居中 .screen-inner
   ============================================================ */
#fullpage :deep(.fp-screen) {
  overflow: hidden;
}

#fullpage :deep(.footer-screen) {
  padding: 0;
  display: block;
}
#fullpage :deep(.footer-screen > .site-footer) {
  width: 100%;
  margin-top: 0;
}

.alt {
  background:
    linear-gradient(
      180deg,
      var(--bg-1),
      rgba(20, 24, 23, 0.4) 30%,
      rgba(20, 24, 23, 0.4) 70%,
      var(--bg-1)
    ),
    var(--bg-0);
}

/* 屏序号水印：提供缺失的不对称与尺度对比 */
.screen-num {
  position: absolute;
  top: calc(var(--nav-h) + 6px);
  right: 34px;
  font-family: var(--font-mono);
  font-size: clamp(72px, 11vw, 140px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
  color: rgba(255, 255, 255, 0.08);
  /* 提到图片层之上：状态屏右图、加入屏背景图不得再盖住 02/05 */
  z-index: 2;
  pointer-events: none;
  user-select: none;
}

/* 左对齐 mono 眉标 + 绿色小方块 */
.screen-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 14px;
}
.screen-kicker::before {
  content: '';
  width: 10px;
  height: 10px;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent-glow);
}

.screen-head {
  margin-bottom: 26px;
}
.screen-title {
  font-size: clamp(26px, 3.4vw, 40px);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.screen-sub {
  margin-top: 8px;
  color: var(--text-2);
  font-size: 14.5px;
}

/* ============================================================
   屏1 HERO：左侧内容栏，字标放大，事实条贴底通栏
   ============================================================ */
.hero-screen {
  position: relative;
  display: flex;
  align-items: center;
}
/* Hero 背景图：<img> 承载（解析 HTML 即发现，配合 fetchpriority=high 抢 LCP） */
.hero-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* 兜底色：若下方 background 整条声明失效（极端降级），页面仍有底色而非空白 */
  background-color: var(--bg-0);
  background:
    /* 暖光只作为图片上的光效叠加 */
    radial-gradient(ellipse 60% 50% at 78% 38%, var(--warm-glow), transparent 65%),
    linear-gradient(
      90deg,
      rgba(8, 11, 10, 0.82) 0%,
      rgba(8, 11, 10, 0.55) 46%,
      rgba(8, 11, 10, 0.18) 100%
    );
}
.hero-inner {
  position: relative;
  z-index: 1;
  width: min(var(--container), 100%);
  margin: 0 auto;
  padding: calc(var(--nav-h) + 40px) 24px 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: rgba(12, 17, 12, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-2);
}
.hero-title {
  font-size: clamp(56px, 9vw, 120px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  text-shadow: 0 10px 44px rgba(0, 0, 0, 0.55);
}
.t-pepper {
  color: var(--accent);
}
.t-craft {
  color: var(--blue);
}
.hero-slogan {
  font-size: clamp(16px, 2.2vw, 21px);
  color: var(--text-2);
  font-weight: 300;
  letter-spacing: 0.01em;
  /* 中文短句按语义断行，避免「生电 / 融合」被孤字拆分 */
  text-wrap: balance;
}
/* 移动端专属断行点：桌面单行隐藏，窄屏把「—— 说明」另起一行 */
.slogan-br {
  display: none;
}
.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.hero-facts {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 11, 10, 0.62);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.fact {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 16px 34px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}
.fact:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
.fact strong {
  color: var(--text-1);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.fact span {
  color: var(--text-3);
  font-size: 12.5px;
  letter-spacing: 0.08em;
}

/* fullpage 默认给 .fp-overflow 加 fp-table（flex 列 + justify-content: center）。
   内容高于视口时，居中溢出会把顶端推出画面且无法滚回（flex 居中溢出的「死区」，
   Windows 常见视口 700–880px 下状态/关于屏标题就是这样被裁掉的）。
   safe center：溢出时自动回退为顶部对齐，标题永远可见，多余部分屏内滚动。
   不支持该关键字的老浏览器整条失效 → 保持默认 center，行为与以前一致。 */
#fullpage :deep(.fp-overflow) {
  justify-content: safe center;
}

/* ============================================================
   屏2 运行状态 / 屏3 关于：左右分栏 + 右侧图片满幅出血
   ============================================================ */
#fullpage .split-screen {
  position: relative;
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch;
}
/* fullpage 将 section 内容包裹进 .fp-overflow；这里恢复左右分栏布局 */
#fullpage .split-screen :deep(.fp-overflow) {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch;
  width: 100%;
}
/* 屏3 关于页：图片在左、文案在右，与屏2 形成左右交替节奏（仅桌面；<=900 已翻转为上下堆叠） */
@media (min-width: 901px) {
  #fullpage .about-screen.alt :deep(.fp-overflow) {
    flex-direction: row-reverse !important;
  }
  .about-screen.alt .split-copy {
    margin-left: auto;
    margin-right: max(calc((100% - var(--container)) / 2), 24px);
    padding: calc(var(--nav-h) + 36px) 24px 40px 40px;
  }
  /* 暗角渐变跟着文案换边：从左侧压暗改为右侧压暗 */
  .about-screen.alt .media-scrim {
    background:
      linear-gradient(270deg, var(--bg-0) 0%, rgba(13, 16, 16, 0.25) 22%, transparent 45%),
      linear-gradient(to top, rgba(8, 11, 10, 0.85), transparent 42%);
  }
}
.split-copy {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  min-width: 0;
  width: min(640px, 56%);
  margin-left: max(calc((100% - var(--container)) / 2), 24px);
  /* 垂直内边距用 vh 流式：1080 高 ≈ 原 36/40px，矮视口自动收紧（配合下方紧凑模式） */
  padding: calc(var(--nav-h) + 3.5vh) 40px max(2.5vh, 18px) 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* safe center：内容超高时改顶部对齐，标题不会被居中溢出推出画面 */
  justify-content: safe center;
}
.split-media {
  position: relative;
  flex: 0 0 42%;
  overflow: hidden;
}
.split-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--bg-0) 0%, rgba(13, 16, 16, 0.25) 22%, transparent 45%),
    linear-gradient(to top, rgba(8, 11, 10, 0.85), transparent 42%);
}
/* 状态屏右图：天空过亮导致视觉重心上浮，顶部叠压暗（同时让 02 水印可读） */
.status-screen .media-scrim {
  background:
    linear-gradient(to bottom, rgba(8, 11, 10, 0.55), transparent 32%),
    linear-gradient(90deg, var(--bg-0) 0%, rgba(13, 16, 16, 0.25) 22%, transparent 45%),
    linear-gradient(to top, rgba(8, 11, 10, 0.85), transparent 42%);
}
.about-screen .split-media img {
  filter: saturate(1.05) brightness(1.02);
}
/* UPTIME 从配图上挪到文案区：作为「运行时长」卡片排在状态卡下方 */
.uptime-card {
  margin-top: 14px;
  padding: 20px 24px;
  background: var(--card-face);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--card-lift);
}
.uptime-label {
  font-size: 11.5px;
  letter-spacing: 0.16em;
  color: var(--text-3);
  margin-bottom: 14px;
}

/* 关于屏内容 */
.about-lead {
  font-size: 15.5px;
  line-height: 2;
  color: var(--text-2);
  margin-bottom: 22px;
}
.lead-strong {
  color: var(--text-1);
  font-weight: 800;
}
.promise-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 22px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--accent-glow);
  background: var(--accent-dim);
  text-align: left;
  margin-bottom: 20px;
}
.promise-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: rgba(141, 204, 98, 0.16);
  color: var(--accent);
}
.promise-card h3 {
  font-size: 16px;
  margin-bottom: 2px;
}
.promise-card p {
  color: var(--text-2);
  font-size: 13.5px;
}
.tech-strip {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.25s;
}
.tech-chip:hover {
  border-color: var(--blue);
  color: var(--blue);
  transform: translateY(-2px);
}
.tech-chip svg {
  color: var(--ok);
}

/* ============================================================
   屏4 特色玩法：高卡带图片头 + 要点；底部标签卡渲染说明
   ============================================================ */
.features-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(var(--nav-h) + 28px) max(calc((100% - var(--container)) / 2), 24px) 30px 24px;
}
.features-head {
  margin-bottom: 22px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 18px;
}
.feature-card {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  /* 矮视口下收缩卡片高度，避免整屏内容超出视口 */
  min-height: min(400px, 50vh);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--card-face);
  box-shadow: var(--card-lift);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-glow);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22px 48px -14px rgba(0, 0, 0, 0.75),
    0 0 0 1px var(--accent-glow);
}
.feature-media {
  position: relative;
  height: 132px;
  flex: 0 0 auto;
  overflow: hidden;
}
.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.feature-card:hover .feature-media img {
  transform: scale(1.05);
}
.feature-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(27, 33, 31, 0.92));
}
.feature-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 16px 20px 20px;
  flex: 1 1 auto;
}
.feature-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16.5px;
}
.feature-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--accent-dim);
  color: var(--accent);
}
.feature-desc {
  color: var(--text-2);
  font-size: 13px;
  line-height: 1.75;
}
.feature-points {
  list-style: none;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid var(--border-soft);
}
.feature-points li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-2);
  font-size: 12.5px;
}
.feature-points svg {
  flex: 0 0 auto;
  color: var(--ok);
}

.tag-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.tag-card {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft);
  background: rgba(27, 33, 31, 0.72);
  transition:
    border-color 0.25s,
    transform 0.25s;
}
.tag-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-glow);
}
.tag-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--accent-dim);
  color: var(--accent);
}
.tag-card h4 {
  font-size: 14px;
  margin-bottom: 3px;
}
.tag-card p {
  color: var(--text-3);
  font-size: 12px;
  line-height: 1.65;
}
.tag-card.technical .tag-icon {
  background: var(--blue-dim);
  color: var(--blue);
}
.tag-card.technical:hover {
  border-color: var(--blue-glow);
}

/* ============================================================
   屏5 加入我们：IP 巨号绿框 + 联系卡一行 + 招募通栏贴底
   ============================================================ */
.join-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: calc(var(--nav-h) + 26px) max(calc((100% - var(--container)) / 2), 24px) 26px 24px;
}
.join-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* 兜底色：--join-img 缺失时仍保留区块底色 */
  background-color: var(--bg-0);
  background: var(--join-img) center/cover no-repeat;
  opacity: 0.07;
  filter: grayscale(0.35);
}
.join-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--bg-0) 0%,
    transparent 30%,
    transparent 68%,
    var(--bg-0) 100%
  );
}
.join-screen > * {
  position: relative;
  z-index: 1;
}
.join-head {
  margin-bottom: 2px;
}
.join-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 22px 30px;
  border: 1px solid var(--accent-glow);
  border-radius: var(--radius-sm);
  background: rgba(13, 16, 16, 0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.join-kicker {
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--text-3);
}
.join-ip {
  display: flex;
  align-items: center;
  gap: 18px;
}
.join-ip-value {
  font-size: clamp(34px, 4.6vw, 54px);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-1);
  white-space: nowrap;
}
.join-summary {
  flex-basis: 100%;
  color: var(--text-3);
  font-size: 13px;
}
.contact-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: rgba(20, 24, 23, 0.85);
  color: var(--text-1);
  transition: all 0.25s;
}
a.contact-card:hover {
  transform: translateY(-2px);
  border-color: var(--blue-glow);
}
.contact-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--bg-3);
  border: 1px solid var(--border-soft);
  color: var(--text-2);
}
.contact-card h4 {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-3);
}
.contact-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-1);
}
.contact-docs .contact-value {
  color: var(--blue);
}
/* 腐竹 QQ 卡内的一键复制按钮贴右 */
.contact-card :deep(.copy-btn) {
  margin-left: auto;
}
.recruit-panel {
  padding: 16px 22px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(20, 24, 23, 0.88);
}
.recruit-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.recruit-kicker {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--text-1);
  letter-spacing: 0.02em;
}
.recruit-rule {
  color: var(--blue);
  font-size: 12px;
}
.recruit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: left;
}
.recruit-grid strong {
  color: var(--text-1);
  font-size: 13.5px;
}
.recruit-grid p {
  color: var(--text-3);
  font-size: 12px;
  line-height: 1.7;
  margin-top: 3px;
}

/* 三步加入引导：无自研客户端，走官方启动器路径的步骤条 */
.join-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.join-step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft);
  background: rgba(20, 24, 23, 0.88);
}
.join-step-num {
  flex: 0 0 auto;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  padding-top: 2px;
  color: rgba(141, 204, 98, 0.45);
}
.join-step-copy h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 4px;
}
.join-step-copy p {
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-3);
}

/* ============================================================
   屏6 FAQ：左标题右风琴，8 条全量渲染
   ============================================================ */
.faq-screen {
  position: relative;
  display: flex;
  align-items: stretch;
}
.faq-layout {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) 1.35fr;
  gap: 48px;
  width: min(var(--container), 100%);
  margin: 0 auto;
  padding: calc(var(--nav-h) + 40px) 24px 40px;
}
.faq-copy {
  display: flex;
  flex-direction: column;
  /* 顶部对齐而非居中：右列表高（~480px）远大于左列内容（~210px），
     两列各自居中会让左列标题外悬在列表中部以下，视觉错位 */
  justify-content: flex-start;
  align-items: flex-start;
}
.faq-more {
  color: var(--text-2);
  font-size: 14.5px;
  line-height: 1.9;
  margin-bottom: 20px;
}
.faq-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
/* 按钮内群号：mono 行盒（~1.7em）远高于 sans 文字（~1.4em），
   直接混排会让数字上下各凸出 2~3px 显得「没对齐」；收紧字号与行高贴合文字盒 */
.faq-actions .btn .mono {
  font-size: 13.5px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  text-align: left;
  overflow-y: auto;
  max-height: calc(100vh - var(--nav-h) - 64px);
  padding: 4px 6px 4px 2px;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.faq-item {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  background: var(--bg-2);
  overflow: hidden;
  transition: border-color 0.25s;
}
.faq-item.open {
  border-color: var(--accent-glow);
}
.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 18px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
.faq-q-text {
  display: flex;
  align-items: baseline;
  gap: 12px;
  color: var(--text-1);
  font-size: 14px;
  font-weight: 700;
}
.faq-index {
  color: var(--text-3);
  font-size: 11.5px;
}
.faq-item.open .faq-index {
  color: var(--accent);
}
.faq-toggle {
  font-size: 18px;
  font-weight: 700;
  color: var(--blue);
  transition: transform 0.28s ease;
}
.faq-toggle.open {
  transform: rotate(45deg);
}
.faq-a-shell {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
}
.faq-a {
  min-height: 0;
  overflow: hidden;
}
.faq-a p {
  padding: 0 18px 14px 47px;
  color: var(--text-2);
  font-size: 13px;
  line-height: 1.85;
}
.faq-expand-enter-active,
.faq-expand-leave-active {
  overflow: hidden;
  transition:
    grid-template-rows 0.24s ease,
    opacity 0.2s ease;
}
.faq-expand-enter-from,
.faq-expand-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
.faq-expand-enter-to,
.faq-expand-leave-from {
  grid-template-rows: 1fr;
  opacity: 1;
}

/* ============================================================
   响应式
   ============================================================ */
@media (max-width: 1100px) {
  .tag-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .fact {
    padding: 14px 22px;
  }
}

@media (max-width: 900px) {
  .screen-num {
    font-size: 84px;
    right: 20px;
  }
  /* fullpage 运行时把 section 内容包进 .fp-overflow，
     必须翻转它而不是 .split-screen（section 本身只包着 fp-overflow） */
  #fullpage .split-screen :deep(.fp-overflow) {
    flex-direction: column-reverse !important;
  }
  .split-copy {
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    padding: 28px 20px 34px;
  }
  .split-media {
    flex: 0 0 38vh;
  }
  .about-screen .split-media {
    flex-basis: 30vh;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .feature-card {
    min-height: 0;
  }
  .features-screen {
    justify-content: flex-start;
    padding-right: 20px;
  }
  .contact-row {
    grid-template-columns: 1fr;
  }
  .join-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .join-ip {
    width: 100%;
    justify-content: space-between;
  }
  .recruit-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .join-steps {
    grid-template-columns: 1fr;
  }
  .faq-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .faq-list {
    max-height: none;
    overflow: visible;
  }
  .faq-a p {
    padding-left: 18px;
  }
}

@media (max-width: 600px) {
  #fullpage :deep(.fp-screen) {
    min-height: auto !important;
    height: auto !important;
    overflow: visible;
  }
  #fullpage :deep(.fp-overflow) {
    max-height: none;
    overflow: visible;
  }
  #fullpage :deep(.hero-screen) {
    min-height: 100svh !important;
  }
  .hero-inner {
    padding: calc(var(--nav-h) + 48px) 20px 130px;
  }
  .hero-title {
    /* 390px 下 15vw=58.5px 会溢出边界，收紧到视口 11vw */
    font-size: clamp(40px, 11vw, 64px);
    max-width: 100%;
  }
  .hero-facts {
    flex-wrap: wrap;
    row-gap: 0;
  }
  .fact {
    flex: 1 1 50%;
    padding: 10px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  /* 关键数据不换行：避免「Java + 基岩」竖排成两行 */
  .fact strong {
    font-size: 15px;
    white-space: nowrap;
  }
  .fact span {
    font-size: 11px;
    letter-spacing: 0.04em;
  }
  .fact:nth-child(odd) {
    border-left: none;
  }
  .split-media {
    flex-basis: 30vh;
  }
  .split-copy {
    padding-bottom: 26px;
  }
  .features-screen,
  .join-screen {
    /* 保留 nav-h：窄屏 fallback 滚动时标题不被固定导航裁切 */
    padding: calc(var(--nav-h) + 20px) 20px 30px;
  }
  .tag-grid {
    grid-template-columns: 1fr;
  }
  .feature-body {
    padding: 14px 16px 16px;
  }
  .join-ip-value {
    font-size: clamp(28px, 8vw, 40px);
  }
  .join-summary {
    order: 3;
  }
  .recruit-panel {
    padding: 14px 16px;
  }
  .faq-layout {
    padding: calc(var(--nav-h) + 20px) 20px 34px;
  }
  .faq-q {
    padding: 13px 14px;
  }
  .faq-a p {
    padding: 0 14px 13px 43px;
  }
  .screen-num {
    top: 12px;
  }
  .slogan-br {
    display: inline;
  }
}

/* 低端设备无 backdrop-filter：回退为更实心的底色，避免毛玻璃失效后文字叠在透出内容上 */
@supports not ((backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))) {
  .hero-badge {
    background: rgba(12, 17, 12, 0.95);
  }
  .hero-facts {
    background: rgba(8, 11, 10, 0.94);
  }
  .join-card {
    background: rgba(13, 16, 16, 0.97);
  }
}

/* ============================================================
   矮桌面视口（≤899px 高：1080p 带浏览器栏、125%/150% 缩放下的高分屏等）
   收紧纵向预算，让每屏内容完整放进视口 —— 否则 fullpage 会启用
   屏内滚动，并因居中溢出把屏幕标题推出画面（死区不可滚回）
   ============================================================ */
@media (min-width: 901px) and (max-height: 899px) {
  .screen-kicker {
    margin-bottom: 10px;
  }
  .screen-title {
    font-size: clamp(24px, 3vw, 34px);
  }
  .screen-sub {
    font-size: 13.5px;
    margin-top: 6px;
  }
  .uptime-card {
    margin-top: 10px;
    padding: 14px 20px;
  }
  .uptime-label {
    font-size: 10.5px;
    margin-bottom: 10px;
  }
  .features-screen {
    padding-top: calc(var(--nav-h) + 20px);
    padding-bottom: 22px;
  }
  .join-screen {
    padding-top: calc(var(--nav-h) + 18px);
    padding-bottom: 18px;
  }
  .faq-layout {
    padding-top: calc(var(--nav-h) + 18px);
    padding-bottom: 22px;
  }
}

/* ============================================================
   超高分辨率适配（≥2880px 逻辑宽：4K 原生 100% 缩放 / 5K 等）
   设计按 ~1080p 视口定稿，固定 px 文本在 4K 上会显得「缩在屏中央」；
   此处等比放大最显眼的文本与留白，设计语言不变。
   图片清晰度由 srcset 档位负责（3840w 档只在高分屏才下载）
   ============================================================ */
@media (min-width: 2880px) {
  .hero-badge {
    font-size: 20px;
    padding: 12px 26px;
    gap: 12px;
  }
  .hero-title {
    font-size: clamp(96px, 5.4vw, 210px);
  }
  .hero-slogan {
    font-size: clamp(24px, 1vw, 32px);
  }
  .hero-actions {
    gap: 20px;
    margin-top: 10px;
  }
  .fact {
    padding: 22px 46px;
    gap: 14px;
  }
  .fact strong {
    font-size: 24px;
  }
  .fact span {
    font-size: 17px;
  }
  .screen-num {
    font-size: clamp(140px, 7vw, 260px);
  }
  .screen-kicker {
    font-size: 17px;
    margin-bottom: 20px;
  }
  .screen-kicker::before {
    width: 14px;
    height: 14px;
  }
  .screen-title {
    font-size: clamp(52px, 2.4vw, 88px);
  }
  .screen-sub {
    font-size: 20px;
    margin-top: 12px;
  }
  .split-copy {
    width: min(880px, 52%);
    padding: calc(var(--nav-h) + 48px) 56px 52px 32px;
  }
  .about-lead {
    font-size: 20px;
  }
  .promise-card {
    gap: 22px;
    padding: 22px 30px;
  }
  .promise-icon {
    width: 60px;
    height: 60px;
  }
  .promise-card h3 {
    font-size: 21px;
  }
  .promise-card p {
    font-size: 18px;
  }
  .feature-body {
    padding: 22px 26px 26px;
  }
  .feature-title {
    font-size: 21px;
    gap: 13px;
  }
  .feature-icon {
    width: 40px;
    height: 40px;
  }
  .feature-desc {
    font-size: 16.5px;
  }
  .feature-points li {
    font-size: 16px;
    gap: 10px;
  }
  .join-card {
    padding: 30px 42px;
    gap: 32px;
  }
  .join-kicker {
    font-size: 16px;
  }
  .join-ip-value {
    font-size: clamp(56px, 3.2vw, 96px);
  }
  .join-summary {
    font-size: 18px;
  }
  .contact-row {
    gap: 20px;
  }
  .contact-card {
    padding: 22px 28px;
    gap: 18px;
    font-size: 18px;
  }
  .faq-q {
    padding: 18px 26px;
  }
  .faq-q-text {
    font-size: 19px;
    gap: 16px;
  }
  .faq-index {
    font-size: 15px;
  }
  .faq-toggle {
    font-size: 24px;
  }
  .faq-a p {
    padding: 0 26px 20px 63px;
    font-size: 17px;
  }
}
</style>
