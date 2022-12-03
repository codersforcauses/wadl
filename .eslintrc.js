module.exports = {
  root: true,
  extends: [
    "standard-with-typescript",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-standard-with-typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "vue/multi-word-component-names": 0,
  },
};
