import { deleteBook } from "../../api/bookApi";

function DeleteBook() {
    
    async function handleDelete(bookId) {

        const confirmed = window.confirm("Are you sure you want to delete this book?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteBook(bookId);
            onBookUpdated();
        } catch (error) {
            alert(error.message);
        }
    }
}

export default DeleteBook;