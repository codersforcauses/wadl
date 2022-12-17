const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalStudio: true,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
