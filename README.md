## Bookmark Feature & Testing

### Bookmark Feature

- Authenticated users can **bookmark/unbookmark** job positions directly on each job card.
- Bookmark actions communicate with the backend API:
  - `GET /bookmarks` to retrieve saved bookmarks.
  - `POST /bookmarks/:eventID` to add a bookmark.
  - `DELETE /bookmarks/:eventID` to remove a bookmark.
- The bookmark button reflects the current bookmark state instantly.
- Bookmarking is **restricted to logged-in users**; non-authenticated users cannot bookmark jobs.
- Includes error handling to alert users if bookmark operations fail.

---

### Unit Testing with Jest

- Unit tests are written using **Jest** and **React Testing Library**.
- Tests cover:
  - Proper rendering of job cards and job details.
  - Rendering the bookmark toggle only for authenticated users.
  - Bookmark toggle button click updates the bookmark state correctly.
  - Mocking NextAuth session to simulate authentication state.
- Run tests with:

  ```bash
  npm run test

End-to-End Testing with Cypress

    E2E tests simulate real user flows in a browser, including login and bookmarking.

    Tests verify:

        User login via UI.

        Bookmark button visibility after login.

        Toggling bookmarks and persisting bookmark state after reload.

        Access restrictions for unauthenticated users.

    Run Cypress tests by:

        Starting the dev server:

npm run dev

Opening Cypress test runner:

    npx cypress open

    Running the bookmark.cy.ts test suite.

Custom Cypress commands include:

    cy.loginUI(email, password) — automates user login through the UI.
