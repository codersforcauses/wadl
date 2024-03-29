module.exports = {
  root: true,
  extends: [
    "standard",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-standard",
    "plugin:prettier/recommended",
  ],
  rules: {
    "vue/multi-word-component-names": 0,
  },
  overrides: [
    {
      files: ["**.js", "**.cjs", "**.mjs", "**.vue"],
    },
  ],
  globals: {
    $fetch: false,
  },
};
