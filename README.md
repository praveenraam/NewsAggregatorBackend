# 🛠️ Backend API Documentation
**Base URL**: `http://localhost:3000/apiAuthentication`
---
**Authentication**: Use JWT token for all protected routes. After login or registration, store the token and pass it in the `Authorization` header:
After login or registration, store the token and pass it in the Authorization header:

```
Authorization: Bearer <your_token_here>
```
---
```
📘 Table of Contents
Category	Endpoint	        Method	Description
Auth	    /auth/register	    POST	Register new user
Auth	    /auth/login	        POST	Login and receive JWT
Auth	    /auth/profile	    GET	    Get logged-in user profile
User	    /user/interests	    POST	Set/update interests
User	    /user/interests	    GET	    Get user’s current interests
News	    /news/general	    GET	    Get general news
News	    /news/fetch	        GET	    Get personalized news
News	    /news/summarize	    POST	Summarize & analyze sentiment
Article	    /articles/save	    POST	Save article
Article	    /articles/saved	    GET	    Get saved articles
Article	    /articles/:id/read	PATCH	Mark article as read
Article	    /articles/:id	    DELETE	Delete saved article
```

## 📁 Folder Structure
```
📁 Backend
│ ── 📁 config
│   ├── db.js→ Connection to Atlas MangoDB
│   └── jwt.js→ JWT secret and expiration config
│
│ ── 📁 controllers
│   ├── articleController.js→ Save, fetch, delete, mark-read articles
│   ├── authController.js→ Register, login, profile APIs
│   ├── newsController.js→ Fetch news, summarize with AI, sentiment
│   └── userController.js→ Add and retrieve user interests
│
│ ── 📁 middlewares
│   └── authMiddleware.js→ JWT authentication middleware
│
│ ── 📁 models
│   ├── article.js→ Article Mongoose schema
│   └── user.js→ User Mongoose schema
│
│ ── 📁 routes
│   ├── articleRoutes.js → Routes for saved articles
│   ├── authRoutes.js→ Routes for register/login/profile
│   ├── newsRoutes.js→ Routes for general, interested news & summarization
│   └── userRoutes.js→ Routes to handle interests
│
│ ── 📁 utils
│   └── geminiService.js→ Gemini API integration for summarization
│
│ ── .env→ Environment variables (Mongo URI, API keys)
│ ── .gitignore→ Files to exclude from Git
│ ── index.js→ Main Express server entry point
```
## 📝 API Documentation

### 🔐 Auth Endpoints

#### Register a New User
    POST /auth/register

**Request:**

```
{
  "username": "praveen",
  "email": "praveen@demo.com",
  "password": "secret123"
}
```
**Response:**
```
{
  "message": "success"
}
```
---
#### Login
    POST /auth/login

**Request:**
```
{
  "email": "praveen@demo.com",
  "password": "secret123"
}
```

**Response:**

```
{
  "token": "<JWT_TOKEN>"
}
```
---
**Get Profile**

    GET /api/user/

Headers:
```
Authorization: Bearer <token>
```
**Response:**
```
{
  "email": "john@example.com",
  "username": "john"
}
```
---
#### User Interests

**Update Interests**

    POST /user/interests

Request:
```
{
  "interests": ["technology", "sports", "health"]
}
```
Acceptable Categories:
- business
- entertainment
- general
- health
- science
- sports
- technology

**Response:**

```
{
  "message": "Interests updated",
  "interests": ["technology", "sports", "health"]
}
```
---
**Get Interests**
    
    GET /user/interests

**Response:**
```
{
  "interests": ["technology", "sports", "health"]
}
```
---
#### News
**General News**

    GET /news/general

**Response:**
```
{
  "category": "general",
  "articles": [ /* array of news articles */ ]
}
```
---
**Personalized News**

    GET /news/fetch

**Response:**

```
{
  "categories": ["technology", "sports"],
  "articles": [ /* array of relevant articles */ ]
}
```
---
#### Summarize & Analyze News

    POST /news/summarize

**Request:**
```
{
  "author": "...",
  "content": "...",
  "description": "...",
  "publishedAt": "DATE TIME",
  "source": {
    "id": "...",
    "name": "..."
  },
  "title": "...",
  "url": "...",
  "urlToImage": "..."
}
```

**Response:**
```
{
  "summary": [
    "Point 1...",
    "Point 2...",
    "Point 3..."
  ],
  "sentiment": "Neutral" // or "Positive" or "Negative"
}
```
---
#### Articles

**Save Article**

    POST /articles/save

**Request:**

```
{
  "title": "...",
  "description": "...",
  "content": "...",
  "url": "...",
  "urlToImage": "...",
  "publishedAt": "...",
  "source": {
    "id": null,
    "name": "BBC News"
  }
}
```

**Response:**
```
{
  "message": "Article saved"
}
```
---
**Get Saved Articles**

    GET /articles/saved

**Response:**
```
[
  {
    "_id": "...",
    "title": "...",
    "content": "...",
    "isRead": false,
    "userId": "..."
  }
]
```
---
**Mark Article as Read**

    PATCH /articles/:id/read

**Response:**

```
{
  "message": "Article marked as read"
}
```
---
**Delete Saved Article**

    DELETE /articles/:id

**Response:**
```
{
  "message": "Article deleted"
}
```
---