import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "", 
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      // ...
    },
  },
});
