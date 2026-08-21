<script setup lang="ts">
import { ICON_PATHS, type IconName } from './icons'

/** 统一的内联 SVG 图标。颜色继承父级 currentColor，尺寸由 size 决定。 */
const props = withDefaults(defineProps<{ name: IconName; size?: number | string }>(), {
  size: 24,
})
</script>

<template>
  <svg
    class="icon"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in ICON_PATHS[props.name]" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.icon {
  display: block;
  flex: none;
}
</style>
