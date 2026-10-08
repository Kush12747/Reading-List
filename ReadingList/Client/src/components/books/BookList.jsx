import { useState } from "react";

// Child component used when a book is being edited.
import EditBookForm from "./EditBookForm";

// API function that sends DELETE request.
import { deleteBook } from "../../api/bookApi";



function BookList({ books, onBookUpdated }) {


    // -----------------------------------------
    // Editing State
    // -----------------------------------------
    //
    // Stores the book currently being edited.
    //
    // Default:
    //
    // null = no book is being edited
    //
    // Example:
    //
    // {
    //    bookId: "123",
    //    title: "Dune"
    // }
    //
    const [editingBook, setEditingBook] = useState(null);





    // -----------------------------------------
    // Delete Book
    // -----------------------------------------
    async function handleDelete(bookId) {


        // Ask user for confirmation before deleting.
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );



        // If user clicks cancel,
        // stop the function.
        if (!confirmed) return;




        try {


            // Send DELETE request to backend.
            //
            // DELETE /api/books/{bookId}
            //
            await deleteBook(bookId);




            // Tell parent component:
            //
            // "Data changed, refresh books."
            //
            onBookUpdated();


        }


        catch(error) {


            // Display API error.
            alert(error.message);


        }

    }





    return (


        <div className="book-list">


            {
                /*
                    Conditional rendering:

                    If there are no books:
                        show empty message

                    Otherwise:
                        display books
                */
                books.length === 0 ?


                (

                    <p className="empty-state">

                        No books added yet.

                    </p>

                )


                :


                /*
                    .map() loops through the books array.

                    Each book becomes its own card.

                    Example:

                    books = [
                        {title:"Dune"},
                        {title:"Harry Potter"}
                    ]

                    Creates:

                    <article>Dune</article>

                    <article>Harry Potter</article>
                */
                books.map(book => (


                    <article

                        className="book-card"

                        // React needs a unique key
                        // when rendering lists.
                        key={book.bookId}

                    >



                    {
                        /*
                            Conditional rendering:

                            Is this book currently being edited?

                            YES:
                                show EditBookForm

                            NO:
                                show normal book display
                        */


                        editingBook?.bookId === book.bookId ?



                        (

                            <EditBookForm


                                // Send selected book
                                // to edit form.
                                book={book}




                                // Runs after successful update.
                                onBookUpdated={() => {


                                    // Close edit mode.
                                    setEditingBook(null);



                                    // Refresh book list.
                                    onBookUpdated();


                                }}





                                // Cancel editing.
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





                            {/* Displays current reading status */}
                            <span className="book-tag">

                                {book.status}

                            </span>





                            <p>

                                {book.genre}

                            </p>





                            <div className="book-actions">





                                <button

                                    className="secondary-button"

                                    // Store selected book
                                    // as the editing book.
                                    onClick={() =>

                                        setEditingBook(book)

                                    }

                                >

                                    Edit

                                </button>






                                <button

                                    className="danger-button"

                                    // Pass this specific
                                    // book ID to delete.
                                    onClick={() =>

                                        handleDelete(
                                            book.bookId
                                        )

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