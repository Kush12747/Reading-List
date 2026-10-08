# Personal Reading List 📚

A full-stack personal reading management application that allows users to create an account, authenticate securely, and manage their personal book collection.

Users can add books, update reading progress, edit book details, and remove books from their library through a responsive dashboard interface.

---

# Features

## Authentication

- User registration
- User login
- JWT token authentication
- Protected dashboard access
- Logout functionality

## Book Management

Users can:

- Add new books
- View their personal book collection
- Edit existing books
- Delete books
- Track reading status

Supported reading statuses:

- Want To Read
- Reading
- Completed

## Dashboard

The dashboard provides:

- Navigation bar
- Add book form
- Book collection display
- Edit book functionality
- Delete functionality
- Reading library overview

---

# Tech Stack

## Frontend

- React
- React Router
- JavaScript (ES6+)
- CSS3
- Fetch API
- Local Storage

## Backend

- REST API
- JWT Authentication
- Database persistence

## Development Tools

- npm
- Git
- VS Code

---

# Project Structure

```
src
│
├── api
│   ├── authApi.js
│   └── bookApi.js
│
├── components
│   │
│   ├── auth
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── books
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   └── EditBookForm.jsx
│   │
│   └── layout
│       └── Navbar.jsx
│
├── pages
│   │
│   ├── AuthPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── DashboardPage.jsx
│
└── App.jsx
```

---

# Application Flow

## Authentication Flow

```
User
 |
 |
Register
 |
 |
Account Created
 |
 |
Login
 |
 |
JWT Token Returned
 |
 |
Token Stored In Local Storage
 |
 |
Dashboard Access
```

---

## Book Management Flow

```
Dashboard

      |
      |
      +---- Add Book
      |
      |
      +---- View Books
      |
      |
      +---- Edit Book
      |
      |
      +---- Delete Book
```

---

# Components Overview

## AuthPage

Controls switching between:

- Login
- Register

Uses React state to determine which authentication form is displayed.

Example:

```javascript
const [showLogin, setShowLogin] = useState(true);
```

---

## Login Component

Responsible for:

- Managing login form state
- Validating user input
- Sending login requests
- Saving JWT token
- Redirecting users to the dashboard

Login flow:

```javascript
const data = await login(loginData);

localStorage.setItem(
    "token",
    data.token
);

navigate("/dashboard");
```

---

## Register Component

Handles:

- Creating new users
- Validating registration fields
- Sending registration requests
- Returning users to login after successful registration

---

## DashboardPage

The main authenticated page.

Responsibilities:

- Fetch user books
- Display book creation form
- Display book collection

Books are loaded when the page mounts:

```javascript
useEffect(() => {
    loadBooks();
}, []);
```

---

## BookForm

Allows users to create new books.

Book data:

```javascript
{
    title,
    author,
    genre,
    status,
    notes
}
```

---

## BookList

Displays the user's books.

Features:

- View books
- Open edit mode
- Delete books
- Refresh collection after updates

---

## EditBookForm

Allows users to update existing books.

Updates books using their unique ID:

```javascript
updateBook(
    book.bookId,
    bookData
);
```

---

## Navbar

Provides application navigation.

Features:

- Dashboard navigation
- Logout functionality

Logout removes the stored JWT token:

```javascript
localStorage.removeItem("token");
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/personal-reading-list.git
```

Navigate into the project:

```bash
cd personal-reading-list
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8080/api
```

Example usage:

```
VITE_API_URL/api/books
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

Example request:

```json
{
    "name": "John Doe",
    "email": "john@email.com",
    "password": "password123"
}
```

---

### Login

```
POST /api/auth/login
```

Example request:

```json
{
    "email": "john@email.com",
    "password": "password123"
}
```

Example response:

```json
{
    "token": "jwt-token"
}
```

---

# Books API

## Get Books

```
GET /api/books
```

---

## Add Book

```
POST /api/books
```

Example:

```json
{
    "title": "Dune",
    "author": "Frank Herbert",
    "genre": "Sci-Fi",
    "status": "READING",
    "notes": "Great world building"
}
```

---

## Update Book

```
PUT /api/books/{id}
```

---

## Delete Book

```
DELETE /api/books/{id}
```

---

# UI Design

The application uses a modern neon-inspired interface.

Design concepts:

- Dark background
- Neon gradients
- Glassmorphism cards
- Animated background effects
- Responsive layouts
- Clean user experience

Color palette:

```
Purple:
#A855F7

Blue:
#22D3EE

Green:
#9CFF2F

Dark Background:
#070B17
```

---

# Future Improvements

Possible future features:

- Book cover images
- Search functionality
- Filter by reading status
- Reading statistics
- Favorite books
- Goodreads API integration
- User profiles
- Theme switching
- Pagination
- Reviews and ratings

---

# Author

Created by Kush Gandhi
