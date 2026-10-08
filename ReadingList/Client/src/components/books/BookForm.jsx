import { useState } from "react";
import { addBook } from "../../api/bookApi";

function BookForm({ onBookAdded }) {

    const initialState = {
        title: "",
        author: "",
        genre: "",
        status: "WANT_TO_READ",
        notes: ""
    };

    const [bookData, setBookData] = useState(initialState);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    function handleChange(event) {

        setBookData({
            ...bookData,
            [event.target.name]: event.target.value
        });

    }


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!bookData.title.trim() || !bookData.author.trim()) {

            setError("Title and author are required.");
            return;

        }


        setIsLoading(true);


        try {

            await addBook(bookData);

            setBookData(initialState);

            onBookAdded();

        } 
        catch(error) {

            setError(error.message);

        }
        finally {

            setIsLoading(false);

        }

    }


    return (

        <form
            className="book-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>Title</label>

                <input
                    className="form-input"
                    name="title"
                    placeholder="Book title"
                    value={bookData.title}
                    onChange={handleChange}
                />

            </div>


            <div className="form-group">

                <label>Author</label>

                <input
                    className="form-input"
                    name="author"
                    placeholder="Author name"
                    value={bookData.author}
                    onChange={handleChange}
                />

            </div>


            <div className="form-group">

                <label>Genre</label>

                <input
                    className="form-input"
                    name="genre"
                    placeholder="Fantasy, Sci-Fi..."
                    value={bookData.genre}
                    onChange={handleChange}
                />

            </div>


            <div className="form-group">

                <label>Status</label>

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

                <label>Notes</label>

                <textarea
                    className="form-input"
                    name="notes"
                    placeholder="Thoughts about this book..."
                    value={bookData.notes}
                    onChange={handleChange}
                />

            </div>


            {error &&
                <p className="form-error">
                    {error}
                </p>
            }


            <button
                className="primary-button"
                disabled={isLoading}
            >

                {isLoading
                    ? "Adding..."
                    : "Add Book"
                }

            </button>


        </form>

    );

}

export default BookForm;