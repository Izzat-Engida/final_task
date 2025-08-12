describe("Bookmark Functionality", () => {
  beforeEach(() => {
    cy.loginUI("izzat.engida@a2sv.org", "123456789"); 
    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: { data: [] },
    });
    cy.intercept("POST", /\/bookmarks\/.*/, { statusCode: 200 });
    cy.intercept("DELETE", /\/bookmarks\/.*/, { statusCode: 200 });
    cy.visit("/");
  });

  it("toggles bookmark state on click", () => {
    cy.get("[data-testid=bookmark-btn]").as("bookmarkBtn");

    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "false");
    cy.get("@bookmarkBtn").click();
    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "true");
    cy.get("@bookmarkBtn").click();
    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "false");
  });
});
