package com.kushgandhi.personal_reading_list.Service;

import com.kushgandhi.personal_reading_list.Model.Book;
import com.kushgandhi.personal_reading_list.Model.User;
import com.kushgandhi.personal_reading_list.Repository.BookRepository;
import com.kushgandhi.personal_reading_list.Repository.UserRepository;
import com.kushgandhi.personal_reading_list.Service.ENUMS.ResultType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repository;
    private final UserRepository userRepository;

    public BookService(BookRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public Result<Book> getBookById(String userId, String bookId) {
        Result<Book> result = new Result<>();

        Book book = repository.findById(bookId).orElse(null);

        if (book == null) {
            result.addErrorMessage("Book not found", ResultType.NOT_FOUND);
            return result;
        }

        if (!book.getUserId().equals(userId)) {
            result.addErrorMessage(
                    "You do not have permission to view this book",
                    ResultType.FORBIDDEN
            );
            return result;
        }

        if (book == null) {
            result.addErrorMessage("book not found", ResultType.NOT_FOUND);
            return result;
        }

        result.setpayload(book);
        return result;
    }

    public Result<Book> addBook(String email, Book book) {
        Result<Book> result = new Result<>();

        Optional<User> user = userRepository.findByEmail(email);

        if (book.getTitle() == null || book.getTitle().isBlank()) {
            result.addErrorMessage("Title is required", ResultType.INVALID);
            return result;
        }

        boolean exists = repository.existsByUserIdAndTitle(email, book.getTitle());

        if (exists)  {
            result.addErrorMessage("Book already exists in list", ResultType.INVALID);
            return result;
        }

        book.setUserId(user.get().getUserId());

        Book add = repository.save(book);
        result.setpayload(add);
        return result;
    }

    public Result<List<Book>> getBooksForUser(String email) {
        Result<List<Book>> result = new Result<>();

        Optional<User> user = userRepository.findByEmail(email);

        List<Book> books = repository.findByUserId(user.get().getUserId());

        result.setpayload(books);
        return result;
    }

    public Result<Book> updateBook(String email, String bookId, Book updatedBook) {
        Result<Book> result = new Result<>();

        Optional<User> user = userRepository.findByEmail(email);

        String userId = user.get().getUserId();

        Book existingBook = repository.findById(bookId).orElse(null);

        if (existingBook == null) {
            result.addErrorMessage("Book not Found", ResultType.NOT_FOUND);
            return result;
        }

        if (!existingBook.getUserId().equals(userId)) {
            result.addErrorMessage("You do not permission to update this book", ResultType.FORBIDDEN);
            return result;
        }

        if (updatedBook.getTitle() == null || updatedBook.getTitle().isBlank()) {
            result.addErrorMessage("Title is required", ResultType.INVALID);
            return result;
        }

        if (updatedBook.getAuthor() == null || updatedBook.getAuthor().isBlank()) {
            result.addErrorMessage("Author is required", ResultType.INVALID);
            return result;
        }

        // duplicates title
        boolean duplicateExists = repository.existsByUserIdAndTitleAndBookIdNot(userId, updatedBook.getTitle(), bookId);

        if (duplicateExists) {
            result.addErrorMessage("You already have a book with this title", ResultType.INVALID);
            return result;
        }

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setGenre(updatedBook.getGenre());
        existingBook.setNotes(updatedBook.getNotes());
        existingBook.setStatus(updatedBook.getStatus());

        Book saveBook = repository.save(existingBook);
        result.setpayload(saveBook);
        return result;
    }

    public Result<Void> deleteBook(String email, String bookId) {
        Result<Void> result = new Result<>();
        Optional<User> user = userRepository.findByEmail(email);

        String userId = user.get().getUserId();

        Book book = repository.findById(bookId).orElse(null);

        if (book == null) {
            result.addErrorMessage("You cannot delete this book", ResultType.FORBIDDEN);
            return result;
        }

        if (!book.getUserId().equals(userId)) {
            result.addErrorMessage(
                    "You do not have permission to delete this book",
                    ResultType.FORBIDDEN
            );
            return result;
        }

        repository.delete(book);

        return result;
    }
}