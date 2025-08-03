# Blogs API Test CURLs

This file contains the cURL commands to test the blogs API endpoints.

**Note:** Replace `YOUR_AUTH_TOKEN` with a valid JWT token for authenticated requests. Replace `:id` with an actual blog ID.

---

### 1. Get All Blogs

This endpoint retrieves a list of all blogs. It supports filtering by `title` and `category`, and sorting by `latest` or `oldest`.

**URL:** `/blogs`
**Method:** `GET`
**Access:** Public

**cURL Command:**
```bash
# Get all blogs
curl http://localhost:8005/api/blogs

# Get blogs with title containing "Node"
curl http://localhost:8005/api/blogs?title=Node

# Get blogs in the "Technology" category
curl http://localhost:8005/api/blogs?category=Technology

# Get all blogs sorted by latest
curl http://localhost:8005/api/blogs?sortby=latest
```

---

### 2. Get a Single Blog by ID

This endpoint retrieves a single blog by its ID.

**URL:** `/blogs/:id`
**Method:** `GET`
**Access:** Public

**cURL Command:**
```bash
# Get a single blog with a specific ID
curl http://localhost:8005/api/blogs/60d21b4667d0d8992e610c85
```

---

### 3. Create a New Blog

This endpoint creates a new blog. This is a protected route and requires an admin-level JWT token.

**URL:** `/blogs`
**Method:** `POST`
**Access:** Private (Admin)

**cURL Command:**
```bash
curl -X POST http://localhost:8005/api/blogs \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_AUTH_TOKEN" \
-d '{
  "title": "My New Blog Post",
  "content": "This is the content of my new blog post.",
  "image": "http://example.com/image.jpg",
  "category": "Technology",
  "slug": "my-new-blog-post"
}'
