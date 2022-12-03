module.exports = {
  env: {
    browser: true,
    node: true, // Allow __dirname & other Vite/Node.js variables
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "vue/multi-word-component-names": 0,
  }
}
