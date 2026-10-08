import { useState } from "react";

// API function responsible for sending
// POST request to create a new book.
import { addBook } from "../../api/bookApi";


function BookForm({ onBookAdded }) {


    // -----------------------------------------
    // Initial Form State
    // -----------------------------------------
    //
    // Keeping this object separate allows us to:
    //
    // 1. Create the initial state
    // 2. Reset the form after submitting
    //
    const initialState = {

        title: "",

        author: "",

        genre: "",

        status: "WANT_TO_READ",

        notes: ""

    };



    // Stores the current values typed by the user.
    //
    // React controls the form inputs through this state.
    const [bookData, setBookData] = useState(initialState);



    // Stores validation/API error messages.
    const [error, setError] = useState("");



    // Tracks whether the request is currently running.
    //
    // Used to:
    // - disable button
    // - change button text
    const [isLoading, setIsLoading] = useState(false);





    // -----------------------------------------
    // Handle Input Changes
    // -----------------------------------------
    //
    // Runs every time an input changes.
    //
    // Example:
    //
    // User types:
    // "Harry Potter"
    //
    // event.target.name = "title"
    //
    // event.target.value = "Harry Potter"
    //
    // Updates:
    //
    // {
    //    title: "Harry Potter",
    //    author: "",
    //    genre: ""
    // }
    //
    function handleChange(event) {


        setBookData({

            // Keep existing fields.
            ...bookData,


            // Update only the field that changed.
            [event.target.name]: event.target.value

        });

    }





    // -----------------------------------------
    // Submit Form
    // -----------------------------------------
    async function handleSubmit(event) {


        // Prevent page refresh.
        event.preventDefault();



        // Remove previous errors.
        setError("");



        // Client-side validation.
        //
        // Books require title and author.
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


            // Send book object to backend.
            //
            // This calls:
            //
            // POST /api/books
            //
            // Example body:
            //
            // {
            //    title:"Dune",
            //    author:"Frank Herbert"
            // }
            //
            await addBook(bookData);




            // Reset form after successful creation.
            //
            // Changes:
            //
            // {
            //    title:"",
            //    author:"",
            //    genre:"",
            //    status:"WANT_TO_READ"
            // }
            //
            setBookData(initialState);




            // Tell parent component:
            //
            // "A new book was added."
            //
            // Parent can refresh the book list.
            onBookAdded();


        }


        catch(error) {


            // Display backend/API errors.
            setError(error.message);


        }


        finally {


            // Stop loading state whether
            // request succeeded or failed.
            setIsLoading(false);


        }

    }





    return (


        <form

            className="book-form"

            onSubmit={handleSubmit}

        >



            <div className="form-group">


                <label>

                    Title

                </label>



                <input

                    className="form-input"


                    // Used by handleChange()
                    name="title"


                    placeholder="Book title"


                    // Controlled input:
                    // value comes from React state.
                    value={bookData.title}


                    // Updates React state.
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

                    placeholder="Author name"


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

                    placeholder="Fantasy, Sci-Fi..."


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


                    placeholder="Thoughts about this book..."


                    value={bookData.notes}


                    onChange={handleChange}

                />


            </div>





            {/* 
                Conditional rendering.

                If error exists:
                    display message

                If error is empty:
                    display nothing
            */}
            {error &&

                <p className="form-error">

                    {error}

                </p>

            }





            <button

                className="primary-button"

                disabled={isLoading}

            >

                {
                    isLoading

                    ? "Adding..."

                    : "Add Book"
                }


            </button>



        </form>


    );

}


export default BookForm;