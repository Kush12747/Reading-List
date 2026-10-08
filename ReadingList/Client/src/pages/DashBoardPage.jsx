import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import BookForm from "../components/books/BookForm";
import BookList from "../components/books/BookList";
import { getBooks } from "../api/bookApi";

import "../styles/Dashboard.css";

function DashboardPage() {

    const [books, setBooks] = useState([]);

    async function loadBooks() {

        try {

            const data = await getBooks();

            setBooks(data);

        } catch (error) {

            console.log(error.message);

        }

    }

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <>

            <Navbar />

            <main className="dashboard">

                <div className="dashboard-bg glow-one"></div>
                <div className="dashboard-bg glow-two"></div>

                <section className="dashboard-header">

                    <div>

                        <h1>My Reading Library</h1>

                        <p>
                            Keep track of books you've read, are currently
                            reading, and plan to read next.
                        </p>

                    </div>

                    <div className="dashboard-stats">

                        <div className="stat-card">

                            <h2>{books.length}</h2>

                            <span>Total Books</span>

                        </div>

                    </div>

                </section>

                <section className="dashboard-content">

                    <div className="dashboard-panel">

                        <h2>Add New Book</h2>

                        <BookForm onBookAdded={loadBooks} />

                    </div>

                    <div className="dashboard-panel">

                        <h2>Your Collection</h2>

                        <BookList
                            books={books}
                            onBookUpdated={loadBooks}
                        />

                    </div>

                </section>

            </main>

        </>
    );
}

export default DashboardPage;