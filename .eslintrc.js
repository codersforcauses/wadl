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
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
