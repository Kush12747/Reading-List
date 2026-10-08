Personal Reading List 📚

A full-stack personal reading management application that allows users to create an account, log in, and manage their personal book collection.

Users can add books they want to read, track reading progress, update book details, and remove books from their collection through a clean and responsive dashboard.

The frontend is built with React and communicates with a backend API to handle authentication and book management.

Features
Authentication
User registration
User login
JWT token-based authentication
Protected dashboard access
Logout functionality
Book Management

Users can:

Add new books
View their personal book collection
Edit existing books
Delete books
Track reading status

Supported reading statuses:

Want To Read
Reading
Completed
Dashboard

The dashboard provides:

Navigation bar
Book creation form
Book collection display
Book editing interface
Reading library overview
Screenshots

(Add screenshots here)

Example:

/screenshots
    login.png
    dashboard.png
    book-edit.png
Tech Stack
Frontend
React
React Router
JavaScript (ES6+)
CSS3
Fetch API
Local Storage
Backend

API communication layer:

REST API
JWT Authentication
Development Tools
npm
Git
VS Code
Project Structure
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
Application Flow
Authentication Flow
User
 |
 |
Register
 |
 |
Backend creates account
 |
 |
Login
 |
 |
JWT Token Returned
 |
 |
Token stored in Local Storage
 |
 |
Dashboard Access
Book Management Flow
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
Components Overview
AuthPage

Controls switching between:

Login form
Registration form

Uses React state:

const [showLogin, setShowLogin] = useState(true);

to determine which authentication component is displayed.

Login Component

Responsible for:

Managing login form state
Validating user input
Sending login requests
Saving JWT token
Redirecting users to dashboard

Example flow:

const data = await login(loginData);

localStorage.setItem(
    "token",
    data.token
);

navigate("/dashboard");
Register Component

Handles:

New user creation
Registration validation
Returning users to login after successful registration
DashboardPage

Main authenticated page.

Responsibilities:

Fetch user's books
Display book form
Display book list

Uses:

useEffect(() => {
    loadBooks();
}, []);

to load books when the page opens.

BookForm

Allows users to create books.

Book information:

{
    title,
    author,
    genre,
    status,
    notes
}
BookList

Displays the user's collection.

Features:

Rendering books
Opening edit mode
Deleting books
EditBookForm

Allows users to update existing books.

Uses the book ID:

updateBook(
    book.bookId,
    bookData
);

to update the selected record.

Navbar

Provides:

Dashboard navigation
Logout functionality

Logout removes the stored JWT:

localStorage.removeItem("token");
Installation

Clone the repository:

git clone https://github.com/yourusername/personal-reading-list.git

Navigate into the project:

cd personal-reading-list

Install dependencies:

npm install

Run the development server:

npm run dev
Environment Variables

Create a .env file:

VITE_API_URL=http://localhost:8080/api

Example API usage:

VITE_API_URL/api/books
API Endpoints
Authentication
Register
POST /api/auth/register

Request:

{
    "name": "John Doe",
    "email": "john@email.com",
    "password": "password123"
}
Login
POST /api/auth/login

Request:

{
    "email": "john@email.com",
    "password": "password123"
}

Response:

{
    "token": "jwt-token"
}
Books
Get Books
GET /api/books
Add Book
POST /api/books

Example:

{
    "title":"Dune",
    "author":"Frank Herbert",
    "genre":"Sci-Fi",
    "status":"READING",
    "notes":"Great world building"
}
Update Book
PUT /api/books/{id}
Delete Book
DELETE /api/books/{id}
UI Design

The application uses a modern neon-inspired interface.

Design concepts:

Dark background
Neon gradients
Glassmorphism cards
Animated background lighting
Responsive layouts
Minimal visual clutter

Color palette:

Purple
#A855F7

Blue
#22D3EE

Green
#9CFF2F

Dark Background
#070B17
Future Improvements

Potential features:

Book cover images
Search books
Filter by reading status
Reading statistics dashboard
Favorites list
Goodreads API integration
User profiles
Dark/light theme toggle
Pagination
Reviews and ratings
Author

Created by Kush Gandhi
