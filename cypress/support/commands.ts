// cypress/support/commands.ts

Cypress.Commands.add("loginUI", (email:string, password:string) => {
  cy.visit("/auth/signin");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("not.include", "/api/auth/sigin");
});
