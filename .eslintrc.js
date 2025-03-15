module.exports = {
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/multi-word-component-names": "warn",
    "vue/no-unused-vars": "warn",
    "no-unused-vars": "warn",
  },
};
