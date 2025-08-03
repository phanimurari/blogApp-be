# Blogs App API

This document provides instructions and examples for using the Blogs App API.

## Base URL

`https://blogapp-be-veby.onrender.com`

---

## Authentication Routes

### Register a New User

Registers a new user in the system.

-   **URL:** `/api/auth/register`
-   **Method:** `POST`
-   **Body:**

    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123",
      "role": "user"
    }
    ```

-   **cURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }' https://blogapp-be-veby.onrender.com/api/auth/register
    ```

### Login User

Authenticates a user and returns a JWT token.

-   **URL:** `/api/auth/login`
-   **Method:** `POST`
-   **Body:**

    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

-   **cURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "email": "test@example.com",
      "password": "password123"
    }' https://blogapp-be-veby.onrender.com/api/auth/login
    ```

### Get Current User

Retrieves the profile of the currently authenticated user.

-   **URL:** `/api/auth/me`
-   **Method:** `GET`
-   **Headers:**
    -   `Authorization: Bearer <YOUR_JWT_TOKEN>`

-   **cURL Example:**

    ```bash
    curl -X GET -H "Authorization: Bearer <YOUR_JWT_TOKEN>" https://blogapp-be-veby.onrender.com/api/auth/me
    ```

### Get User Profile

Retrieves the profile details of the authenticated user.

-   **URL:** `/api/auth/profile`
-   **Method:** `GET`
-   **Headers:**
    -   `Authorization: Bearer <YOUR_JWT_TOKEN>`

-   **cURL Example:**

    ```bash
    curl -X GET -H "Authorization: Bearer <YOUR_JWT_TOKEN>" https://blogapp-be-veby.onrender.com/api/auth/profile
    ```

---

### Google Authentication

Google authentication uses an OAuth 2.0 flow that requires a browser. You cannot test it directly with a cURL command.

1.  **Initiate Authentication:**
    Open the following URL in your browser to start the Google login process:

    ```
    https://blogapp-be-veby.onrender.com/api/auth/google
    ```

2.  **Callback:**
    After successful authentication, Google will redirect you to the callback URL specified in your Google Developer Console. The server will handle the callback, create a user if one does not exist, and then redirect to the client URL with the JWT token and refresh token in the query parameters.

    Example redirect URL:
    ```
    https://blogapp-be-veby.onrender.com/?token=<YOUR_JWT_TOKEN>&refreshToken=<YOUR_REFRESH_TOKEN>
    ```

---