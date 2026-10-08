import { useState } from "react";

// API function that sends PUT request
// to update an existing book.
import { updateBook } from "../../api/bookApi";

function EditBookForm({ book, onBookUpdated, onCancel }) {

    // -----------------------------------------
    // Form State
    // -----------------------------------------
    //
    // Initialize state using the existing book data.
    //
    // Example:
    //
    // User clicks Edit on:
    //
    // {
    //    title:"Dune",
    //    author:"Frank Herbert"
    // }
    //
    // The form starts with those values already filled.
    //
    const [bookData, setBookData] = useState({
        title: book.title,
        author: book.author,
        genre: book.genre,
        status: book.status,
        notes: book.notes
    });

    // Stores validation/API errors.
    const [error, setError] = useState("");

    // Tracks update request status.
    //
    // Used for:
    // - disabling button
    // - changing button text
    //
    const [isLoading, setIsLoading] = useState(false);


    // -----------------------------------------
    // Update Input State
    // -----------------------------------------
    //
    // Every time the user changes an input:
    //
    // 1. Get the input name
    // 2. Get the new value
    // 3. Update matching property
    //
    function handleChange(event) {

        setBookData({

            // Keep existing fields.
            ...bookData,

            // Update only changed field.
            [event.target.name]: event.target.value

        });

    }


    // -----------------------------------------
    // Submit Update
    // -----------------------------------------
    async function handleSubmit(event) {

        // Prevent browser refresh.
        event.preventDefault();

        // Clear previous errors.
        setError("");

        // Validate required fields.
        if (
            !bookData.title.trim() ||
            !bookData.author.trim()
        ) {


            setError(
                "Title and author are required."
            );


            return;

        }



        // Start loading state.
        setIsLoading(true);




        try {


            // Send updated information to backend.
            //
            // PUT /api/books/{bookId}
            //
            // Example:
            //
            // updateBook(
            //      "123",
            //      {
            //          title:"Updated Title"
            //      }
            // )
            //
            await updateBook(
                book.bookId,
                bookData
            );



            // Tell parent component:
            //
            // "Update succeeded."
            //
            // Parent can:
            // 1. Close edit mode
            // 2. Reload books
            //
            onBookUpdated();



        }


        catch(error) {


            // Display API error.
            setError(error.message);


        }


        finally {


            // Stop loading state.
            setIsLoading(false);


        }

    }






    return (


        <div className="edit-book-form">


            <h2 className="edit-title">

                Edit Book

            </h2>




            <form

                className="form"

                onSubmit={handleSubmit}

            >



                <div className="form-group">


                    <label>

                        Title

                    </label>



                    <input

                        className="form-input"

                        name="title"


                        // Controlled component.
                        // React controls the value.
                        value={bookData.title}


                        onChange={handleChange}

                    />


                </div>





                <div className="form-group">


                    <label>

                        Author

                    </label>



                    <input

                        className="form-input"

                        name="author"

                        value={bookData.author}

                        onChange={handleChange}

                    />


                </div>





                <div className="form-group">


                    <label>

                        Genre

                    </label>



                    <input

                        className="form-input"

                        name="genre"

                        value={bookData.genre}

                        onChange={handleChange}

                    />


                </div>





                <div className="form-group">


                    <label>

                        Status

                    </label>



                    <select

                        className="form-input"

                        name="status"

                        value={bookData.status}

                        onChange={handleChange}

                    >

                        <option value="WANT_TO_READ">

                            Want to Read

                        </option>


                        <option value="READING">

                            Reading

                        </option>


                        <option value="COMPLETED">

                            Completed

                        </option>


                    </select>


                </div>





                <div className="form-group">


                    <label>

                        Notes

                    </label>



                    <textarea

                        className="form-input"

                        name="notes"

                        value={bookData.notes}

                        onChange={handleChange}

                    />


                </div>






                {
                    /*
                        Only show error when one exists.
                    */
                }

                {error && (

                    <p className="form-error">

                        {error}

                    </p>

                )}







                <div className="edit-actions">



                    <button

                        className="primary-button"

                        type="submit"

                        disabled={isLoading}

                    >

                        {
                            isLoading

                            ? "Saving..."

                            : "Save Changes"
                        }
                    </button>

                    <button
                        className="cancel-button"
                        type="button"

                        // Does not submit form.
                        //
                        // Simply exits edit mode.
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}


export default EditBookForm;