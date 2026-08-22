import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['dist/**', '.build/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      // .vue 不在 tseslint 覆盖的 .ts 文件列表里，基础 no-undef 需要手动声明浏览器全局
      globals: globals.browser,
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      // script setup 的变量会被模板引用，基础 no-unused-vars 感知不到模板 → 交给 TS 规则
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    rules: {
      // fullpage.d.ts 的接口签名与测试 polyfill 有意使用 any（fullpage.js 无官方类型）
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
)
