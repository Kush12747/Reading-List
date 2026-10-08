import { useState } from "react";
import { updateBook } from "../../api/bookApi";

function EditBookForm({ book, onBookUpdated, onCancel }) {

    const [bookData, setBookData] = useState({
        title: book.title,
        author: book.author,
        genre: book.genre,
        status: book.status,
        notes: book.notes
    });

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

            await updateBook(book.bookId, bookData);

            onBookUpdated();

        } catch(error) {

            setError(error.message);

        } finally {

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