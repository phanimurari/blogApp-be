# Authentication Testing Plan (Postman)

This document outlines the steps to test the `httpOnly` cookie-based authentication flow using [Postman](https://www.postman.com/).

**Note:** The server is expected to be running on port `8005`.

## Prerequisites

1.  **Running Server:** Ensure the Express server is running on port `8005`.
2.  **Postman:** Have the Postman application installed.
3.  **.env File:** Make sure your `.env` file is correctly configured with your secrets and `CLIENT_URL`.

**Important:** Postman automatically handles cookies. When you log in or register, it will save the cookies from the response and automatically include them in all subsequent requests to the same domain, making testing seamless.

---

## Test Cases

### 1. User Registration (`/api/auth/register`)

-   **Objective:** Verify that a new user can register and that `accessToken` and `refreshToken` cookies are set correctly.
-   **Method:** `POST`
-   **URL:** `http://localhost:8005/api/auth/register`
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
    -   **Response Body:** A JSON object containing the user's details.
    -   **Cookies:** In Postman, click the "Cookies" link below the "Send" button after receiving the response. You should see `accessToken` and `refreshToken` cookies have been set for `localhost`.

### 2. User Login (`/api/auth/login`)

-   **Objective:** Verify that a registered user can log in and receive new authentication cookies.
-   **Method:** `POST`
-   **URL:** `http://localhost:8005/api/auth/login`
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
    -   **Cookies:** New `accessToken` and `refreshToken` cookies should be set, replacing any previous ones.

### 3. Accessing a Protected Route (`/api/auth/me`)

-   **Objective:** Verify that the `accessToken` cookie is automatically sent and validated.
-   **Prerequisite:** You must have successfully logged in or registered in a previous step.
-   **Method:** `GET`
-   **URL:** `http://localhost:8005/api/auth/me`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** A JSON object containing the authenticated user's profile information. Postman automatically includes the cookies from the previous request.

### 4. Refreshing the Access Token (`/api/auth/refresh-token`)

-   **Objective:** Verify that a new `accessToken` can be obtained using the `refreshToken`.
-   **Prerequisite:** You must have successfully logged in or registered.
-   **Method:** `POST`
-   **URL:** `http://localhost:8005/api/auth/refresh-token`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** A JSON object with a success message.
    -   **Cookies:** A new `accessToken` cookie should be set in the response.

### 5. Google Authentication Flow

-   **Objective:** Verify the Google OAuth2 flow sets cookies and redirects correctly. This must be tested in a browser.
-   **Steps:**
    1.  Open your browser and navigate to `http://localhost:8005/api/auth/google`.
    2.  You will be redirected to the Google login page. Log in with a valid Google account.
    3.  After successful authentication, Google will redirect you back to the server, which will then redirect you to your frontend at the `CLIENT_URL` you specified (e.g., `http://localhost:3000/dashboard`).
    4.  Open your browser's Developer Tools (`F12` or `Ctrl+Shift+I`).
    5.  Go to the "Application" (in Chrome) or "Storage" (in Firefox) tab.
    6.  Under "Cookies", select your frontend URL. You should see the `accessToken` and `refreshToken` cookies set.

### 6. User Logout (`/api/auth/logout`)

-   **Objective:** Verify that the logout process clears the authentication cookies.
-   **Prerequisite:** You must be logged in.
-   **Method:** `POST`
-   **URL:** `http://localhost:8005/api/auth/logout`
-   **Expected Result:**
    -   **Status Code:** `200 OK`
    -   **Response Body:** `{ "success": true, "message": "Logged out successfully" }`
    -   **Cookies:** The cookies will be cleared from Postman's cookie jar. Any subsequent requests to protected routes should fail with a `401 Unauthorized` error.
