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
<img width="1795" height="819" alt="Screenshot 2025-08-12 104721" src="https://github.com/user-attachments/assets/5ed2f417-6be8-4482-aa5f-698f8e740961" />
<img width="1817" height="826" alt="Screenshot 2025-08-12 104751" src="https://github.com/user-attachments/assets/1b7129ea-6158-4351-802b-ea74fbcebff3" />
<img width="1625" height="776" alt="Screenshot 2025-08-12 104812" src="https://github.com/user-attachments/assets/648cd92d-6992-4877-bb81-2cdf81debded" />

---

### Unit Testing with Jest

- Unit tests are written using **Jest** and **React Testing Library**.
- Tests cover:
  - Proper rendering of job cards and job details.
  - Rendering the bookmark toggle only for authenticated users.
  - Bookmark toggle button click updates the bookmark state correctly.
  - Mocking NextAuth session to simulate authentication state.
<img width="1128" height="647" alt="Screenshot 2025-08-12 104638" src="https://github.com/user-attachments/assets/482dc81d-60fd-4aa4-b29b-1e7f46024552" />

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
        
  <img width="1713" height="706" alt="Screenshot 2025-08-12 110910" src="https://github.com/user-attachments/assets/ca7b1d4b-c116-4bac-bc50-af87d7c1a055" />
  <img width="1817" height="859" alt="Screenshot 2025-08-12 110803" src="https://github.com/user-attachments/assets/cd3ec609-24cd-413e-bda3-888a71f706dc" />



    Run Cypress tests by:

        Starting the dev server:

npm run dev

Opening Cypress test runner:

    npx cypress open

    Running the bookmark.cy.ts test suite.

Custom Cypress commands include:

    cy.loginUI(email, password) — automates user login through the UI.
