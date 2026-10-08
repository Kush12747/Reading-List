import { deleteBook } from "../../api/bookApi";


// This component is responsible only for deleting a book.
// It does not know about the book list.
// It only:
// 1. asks for confirmation
// 2. calls the API
// 3. tells the parent something changed
//
function DeleteBook({ bookId, onBookDeleted }) {



    async function handleDelete() {


        // Prevent accidental deletion.
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );


        // Stop if user cancels.
        if (!confirmed) {

            return;

        }



        try {


            // Send DELETE request:
            //
            // DELETE /api/books/{bookId}
            //
            await deleteBook(bookId);



            // Notify parent component:
            //
            // "The book was removed.
            // Refresh your data."
            //
            onBookDeleted();


        }


        catch(error) {


            // Display API error.
            alert(error.message);


        }

    }





    return (

        <button
            className="danger-button"
            onClick={handleDelete}
        >

            Delete

        </button>

    );

}


export default DeleteBook;