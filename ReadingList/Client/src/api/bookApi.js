// Base URL for every book-related request.
// Every function in this file will build on this URL.
const API_URL = "http://localhost:8080/api/books";


// ------------------------------------------------------
// Helper Function
// ------------------------------------------------------
// Creates the HTTP headers used by every request.
//
// This avoids repeating the same code inside every fetch.
//
function getHeaders() {

    // Retrieve the JWT token that was saved
    // after a successful login.
    const token = localStorage.getItem("token");

    // Return an object containing request headers.
    return {

        // Tell Spring Boot the request body is JSON.
        "Content-Type": "application/json",

        // If a token exists...
        //
        // Add:
        //
        // Authorization: Bearer eyJhbGc...
        //
        // If no token exists, nothing is added.
        ...(token && {
            Authorization: `Bearer ${token}`
        })
    };
}



// ------------------------------------------------------
// GET ALL BOOKS
// ------------------------------------------------------
// Retrieves every book belonging to the logged-in user.
export async function getBooks() {

    const response = await fetch(API_URL, {

        // Include JWT token in the request.
        headers: getHeaders()

    });

    // If Spring returns an error
    // throw an Error to the component.
    if (!response.ok) {

        throw new Error("Unable to load books");

    }

    // Convert JSON response into a JavaScript array.
    return await response.json();

}



// ------------------------------------------------------
// ADD BOOK
// ------------------------------------------------------
// Sends a new book to the backend.
//
// book should look like:
//
// {
//     title,
//     author,
//     genre,
//     status,
//     notes
// }
export async function addBook(book) {

    const response = await fetch(API_URL, {

        // POST = Create
        method: "POST",

        headers: getHeaders(),

        // Convert JavaScript object
        // into JSON before sending.
        body: JSON.stringify(book)

    });

    if (!response.ok) {

        throw new Error("Unable to add book");

    }

    // Return the newly created book.
    return await response.json();

}



// ------------------------------------------------------
// UPDATE BOOK
// ------------------------------------------------------
// Updates an existing book.
//
// bookId identifies which book to update.
//
export async function updateBook(bookId, book) {

    const response = await fetch(`${API_URL}/${bookId}`, {

        // PUT = Update existing resource
        method: "PUT",

        headers: getHeaders(),

        body: JSON.stringify(book)

    });

    if (!response.ok) {

        throw new Error("Unable to update book");

    }

    // Return updated book.
    return await response.json();

}



// ------------------------------------------------------
// DELETE BOOK
// ------------------------------------------------------
// Deletes a book by its ID.
export async function deleteBook(bookId) {

    const response = await fetch(`${API_URL}/${bookId}`, {

        // DELETE request
        method: "DELETE",

        headers: getHeaders()

    });

    if (!response.ok) {

        throw new Error("Unable to delete book");

    }

    // Nothing is returned because the backend
    // only deletes the resource.
}



// ------------------------------------------------------
// GET SINGLE BOOK
// ------------------------------------------------------
// Retrieves one book by its ID.
//
export async function getBookById(bookId) {

    const response = await fetch(`${API_URL}/${bookId}`, {

        headers: getHeaders()

    });

    if (!response.ok) {

        throw new Error("Book not found");

    }

    // Convert JSON into JavaScript object.
    return await response.json();

}