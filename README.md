# API Documentation

This document serves as a comprehensive guide to the API endpoints available in your service. It includes sections for each endpoint, describing their functionality, request and response formats, and error handling. The document is structured as follows:

## Base URL

The base URL for all endpoints is:
`https://api.example.com`
Endpoints
1. Authentication
1.1. Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - **Error:** `401 Unauthorized`
    ```json
    {
      "error": "Invalid email or password"
    }
    ```
1.2. Register
- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- **Response:**
  - **Success:** `201 Created`
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - **Error:** `400 Bad Request`
    ```json
    {
      "error": "Email already exists"
    }
    ```
2. Users
2.1. Get User Profile
- **URL:** `/users/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the authenticated user.
- **Request Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```
  - **Error:** `401 Unauthorized`
    ```json
    {
      "error": "Unauthorized"
    }
    ```
2.2. Update User Profile
- **URL:** `/users/profile`
- **Method:** `PUT`
- **Description:** Updates the profile of the authenticated user.
- **Request Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```
  - **Error:** `400 Bad Request`
    ```json
    {
      "error": "Invalid input data"
    }
    ```
3. Posts
3.1. Get All Posts
- **URL:** `/posts`
- **Method:** `GET`
- **Description:** Retrieves all posts.
- **Response:**
  - **Success:** `200 OK`
    ```json
    [
      {
        "id": "1",
        "title": "First Post",
        "body": "This is the body of the first post.",
        "author": "John Doe",
        "createdAt": "2023-06-01T12:34:56.789Z"
      },
      ...
    ]
    ```
  - **Error:** `500 Internal Server Error`
    ```json
    {
      "error": "An error occurred"
    }
    ```
3.2. Create a Post
- **URL:** `/posts`
- **Method:** `POST`
- **Description:** Creates a new post.
- **Request Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "New Post",
  "body": "This is the body of the new post."
}
```
- **Response:**
  - **Success:** `201 Created`
    ```json
    {
      "message": "Post created successfully"
    }
    ```
  - **Error:** `400 Bad Request`
    ```json
    {
      "error": "Invalid input data"
    }
    ```
4. Comments
4.1. Get Comments for a Post
- **URL:** `/posts/{postId}/comments`
- **Method:** `GET`
- **Description:** Retrieves comments for a specific post.
- **Response:**
  - **Success:** `200 OK`
    ```json
    [
      {
        "id": "1",
        "postId": "1",
        "body": "This is a comment.",
        "author": "Jane Doe",
        "createdAt": "2023-06-01T12:34:56.789Z"
      },
      ...
    ]
    ```
  - **Error:** `404 Not Found`
    ```json
    {
      "error": "Post not found"
    }
    ```
Error Handling
Common error responses include:
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** Authentication required or failed.
- **404 Not Found:** Resource not found.


