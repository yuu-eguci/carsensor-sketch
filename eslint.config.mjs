import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['docs/', 'dist/'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['src/**'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['tests/**'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
]
