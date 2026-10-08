import { useState } from "react";
import EditBookForm from "./EditBookForm";
import { deleteBook } from "../../api/bookApi";


function BookList({ books, onBookUpdated }) {


    const [editingBook, setEditingBook] = useState(null);



    async function handleDelete(bookId) {


        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );


        if(!confirmed) return;


        try {

            await deleteBook(bookId);

            onBookUpdated();

        }
        catch(error){

            alert(error.message);

        }

    }



    return (

        <div className="book-list">


            {
                books.length === 0 ?

                (
                    <p className="empty-state">
                        No books added yet.
                    </p>
                )

                :

                books.map(book => (

                    <article
                        className="book-card"
                        key={book.bookId}
                    >

                    {
                        editingBook?.bookId === book.bookId ?

                        (

                            <EditBookForm

                                book={book}

                                onBookUpdated={() => {

                                    setEditingBook(null);
                                    onBookUpdated();

                                }}

                                onCancel={() =>
                                    setEditingBook(null)
                                }

                            />

                        )

                        :

                        (

                        <>

                            <h3>
                                {book.title}
                            </h3>


                            <p className="book-author">
                                {book.author}
                            </p>


                            <span className="book-tag">
                                {book.status}
                            </span>


                            <p>
                                {book.genre}
                            </p>


                            <div className="book-actions">


                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        setEditingBook(book)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    className="danger-button"
                                    onClick={() =>
                                        handleDelete(book.bookId)
                                    }
                                >
                                    Delete
                                </button>


                            </div>

                        </>

                        )

                    }


                    </article>

                ))

            }


        </div>

    );

}

export default BookList;