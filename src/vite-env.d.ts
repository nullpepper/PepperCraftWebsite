/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // Vue 官方 .vue shim 惯例使用 {} 泛型，豁免 empty-object-type 检查
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}
