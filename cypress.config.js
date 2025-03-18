const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 40000,
    chromeWebSecurity: false,
    waitForAnimations: true,
    requestTimeout: 40000,
    responseTimeout: 40000,
    numTestsKeptInMemory: 0,
    screenshotsFolder: "mochawesome-report/assets",
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
