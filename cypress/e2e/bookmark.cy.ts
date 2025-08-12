describe("Bookmark Functionality", () => {
  beforeEach(() => {
    // Setup intercepts first
    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: { data: [] },
    }).as('getBookmarks');

    cy.intercept("POST", /\/bookmarks\/.*/, { statusCode: 200 }).as('postBookmark');
    cy.intercept("DELETE", /\/bookmarks\/.*/, { statusCode: 200 }).as('deleteBookmark');

    // Login user - make sure this command waits for login completion
    cy.loginUI("izzat.engida@a2sv.org", "123456789");

    // Visit after login and intercepts set
    cy.visit("http://localhost:3000/");

    // Optional: wait for bookmarks API to finish
    cy.wait('@getBookmarks');
  });

  it("toggles bookmark state on click", () => {
    cy.get("[data-testid=bookmark-btn]").as("bookmarkBtn");

    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "false");

    cy.get("@bookmarkBtn").first().click();


    
    cy.wait('@postBookmark');

    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "true");

    cy.get("@bookmarkBtn").first().click();

    // Wait for DELETE request triggered by unbookmarking
    cy.wait('@deleteBookmark');

    cy.get("@bookmarkBtn").should("have.attr", "aria-pressed", "false");
  });
});
