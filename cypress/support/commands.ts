// cypress/support/commands.ts

Cypress.Commands.add("loginUI", (email:string, password:string) => {
  cy.intercept('POST', 'http://localhost:3000/api/auth/callback/credentials').as('loginRequest');
  cy.visit("http://localhost:3000/api/auth/signin");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  
  cy.wait('@loginRequest')
  cy.url().should("not.include", "http://localhost:3000/api/auth/signin");
});
