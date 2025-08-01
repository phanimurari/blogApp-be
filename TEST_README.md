# Authentication Testing Plan

This document outlines the steps to test the `httpOnly` cookie-based authentication flow using a tool like [Postman](https://www.postman.com/) or any other API client that supports cookies.

## Prerequisites

1.  **Running Server:** Ensure the Express server is running (`npm start` or `nodemon server.js`).
2.  **API Client:** Have Postman or a similar tool installed.
3.  **.env File:** Make sure your `.env` file is correctly configured with `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_URL`, and your Google OAuth credentials.
4.  **Enable Cookies in Postman:** Postman automatically stores and sends cookies with subsequent requests, which is perfect for this testing. No special configuration is needed.

---

## Test Cases

### 1. User Registration (`/api/auth/register`)

-   **Objective:** Verify that a new user can register and that `accessToken` and `refreshToken` cookies are set correctly.
-   **Method:** `POST`
-   **URL:** `http://localhost:5000/api/auth/register`
-   **Body (raw, JSON):**
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Expected Result:**
    -   **Status Code:** `201 Created`
    -   **Response Body:** A JSON object containing the user's details (without the password).
    -   **Cookies:** In Postman, check the "Cookies" tab for the response. You should see `accessToken` and `refreshToken` cookies set with the `HttpOnly` flag.

### 2. User Login (`/api/auth/login`)

-   **Objective:** Verify that a registered user can log in and receive new authentication cookies.
-   **Method:** `POST`
-   **URL:** `http://localhost:5000/api/auth/login`
-   **Body (raw, JSON):**
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** A JSON object with a success message and user details.
    -   **Cookies:** New `accessToken` and `refreshToken` cookies should be set.

### 3. Accessing a Protected Route (`/api/auth/me`)

-   **Objective:** Verify that the `accessToken` cookie is automatically sent and validated by the `auth` middleware.
-   **Prerequisite:** You must have successfully logged in or registered in a previous step.
-   **Method:** `GET`
-   **URL:** `http://localhost:5000/api/auth/me`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** A JSON object containing the authenticated user's profile information. Postman will automatically include the cookies from the previous login/register request.

### 4. Refreshing the Access Token (`/api/auth/refresh-token`)

-   **Objective:** Verify that a new `accessToken` can be obtained using the `refreshToken`.
-   **Prerequisite:** You must have successfully logged in or registered.
-   **Method:** `POST`
-   **URL:** `http://localhost:5000/api/auth/refresh-token`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** A JSON object with a success message.
    -   **Cookies:** A new `accessToken` cookie should be set in the response. The `refreshToken` remains unchanged.

### 5. Google Authentication Flow

-   **Objective:** Verify the Google OAuth2 flow sets cookies and redirects correctly. This must be tested in a browser.
-   **Steps:**
    1.  Open your browser and navigate to `http://localhost:5000/api/auth/google`.
    2.  You will be redirected to the Google login page. Log in with a valid Google account.
    3.  After successful authentication, Google will redirect you back to the server, which will then redirect you to your frontend at the `CLIENT_URL` you specified (e.g., `http://localhost:3000/dashboard`).
    4.  Open your browser's Developer Tools (`F12` or `Ctrl+Shift+I`).
    5.  Go to the "Application" (in Chrome) or "Storage" (in Firefox) tab.
    6.  Under "Cookies", select your frontend URL (`http://localhost:3000`). You should see the `accessToken` and `refreshToken` cookies set.

### 6. User Logout (`/api/auth/logout`)

-   **Objective:** Verify that the logout process clears the authentication cookies.
-   **Prerequisite:** You must be logged in.
-   **Method:** `POST`
-   **URL:** `http://localhost:5000/api/auth/logout`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** `{ "success": true, "message": "Logged out successfully" }`
    -   **Cookies:** The response headers will contain `Set-Cookie` directives that expire the `accessToken` and `refreshToken` cookies immediately. In Postman, you will see the cookies have been removed. Any subsequent requests to protected routes should fail with a `401 Unauthorized` error.
