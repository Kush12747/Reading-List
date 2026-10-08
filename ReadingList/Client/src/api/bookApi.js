const API_URL = "http://localhost:8080/api/books";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`})
    };
}

export async function getBooks() {
    const response = await fetch(API_URL, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to load books");
    }

    return await response.json();
}

export async function addBook(book) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(book)
    });

    if (!response.ok) {
        throw new Error("Unable to add book");
    }

    return await response.json();
}

export async function updateBook(bookId, book) {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(book)
    });

    if (!response.ok) {
        throw new Error("Unable to update book");
    }

    return await response.json();

}

export async function deleteBook(bookId) {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to delete book");
    }
}

export async function getBookById(bookId) {
    const response = await fetch(`${API_URL}/${bookId}`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Book not found");
    }

    return await response.json();
}