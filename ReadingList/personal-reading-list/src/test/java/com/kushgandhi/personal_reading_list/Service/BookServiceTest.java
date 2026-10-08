package com.kushgandhi.personal_reading_list.Service;

import com.kushgandhi.personal_reading_list.Model.Book;
import com.kushgandhi.personal_reading_list.Model.User;
import com.kushgandhi.personal_reading_list.Repository.BookRepository;
import com.kushgandhi.personal_reading_list.Repository.UserRepository;
import com.kushgandhi.personal_reading_list.Service.ENUMS.ResultType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    BookRepository bookRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    BookService service;

    private User makeUser() {
        User user = new User();

        user.setUserId("user-123");
        user.setEmail("test@test.com");
        user.setName("Kush");

        return user;
    }

    private Book makeBook() {
        Book book = new Book();

        book.setBookId("book-1");
        book.setUserId("user-123");
        book.setTitle("Dune");
        book.setAuthor("Frank Herbert");
        book.setGenre("Sci-Fi");
        book.setNotes("Great book");

        return book;
    }

    private Book makeBook(String title) {

        Book book = makeBook();

        book.setTitle(title);

        return book;
    }

    @Test
    void getBookById() {
    }

    @Test
    void shouldAddBook() {

        User user = makeUser();
        Book book = makeBook();

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.existsByUserIdAndTitle(
                user.getEmail(),
                book.getTitle()))
                .thenReturn(false);

        when(bookRepository.save(any(Book.class)))
                .thenReturn(book);

        Result<Book> result =
                service.addBook(user.getEmail(), book);

        assertTrue(result.isSuccess());

        assertEquals("Dune", result.getpayload().getTitle());

        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void shouldNotAddWithoutTitle() {

        User user = makeUser();

        Book book = makeBook();

        book.setTitle("");

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        Result<Book> result =
                service.addBook(user.getEmail(), book);

        assertFalse(result.isSuccess());

        assertEquals(ResultType.INVALID, result.getResultType());

        verify(bookRepository, never()).save(any());
    }

    @Test
    void shouldNotAddDuplicateBook() {

        User user = makeUser();

        Book book = makeBook();

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.existsByUserIdAndTitle(
                user.getEmail(),
                book.getTitle()))
                .thenReturn(true);

        Result<Book> result =
                service.addBook(user.getEmail(), book);

        assertFalse(result.isSuccess());

        verify(bookRepository, never())
                .save(any());
    }

    @Test
    void shouldReturnBooksForUser() {

        User user = makeUser();

        List<Book> books = List.of(
                makeBook("Dune"),
                makeBook("The Hobbit")
        );

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.findByUserId(user.getUserId()))
                .thenReturn(books);

        Result<List<Book>> result =
                service.getBooksForUser(user.getEmail());

        assertTrue(result.isSuccess());

        assertEquals(2, result.getpayload().size());
    }

    @Test
    void shouldUpdateBook() {

        User user = makeUser();

        Book existing = makeBook();

        Book updated = makeBook();

        updated.setTitle("Updated");

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.findById(existing.getBookId()))
                .thenReturn(Optional.of(existing));

        when(bookRepository.existsByUserIdAndTitleAndBookIdNot(
                any(),
                any(),
                any()))
                .thenReturn(false);

        when(bookRepository.save(any()))
                .thenAnswer(i -> i.getArgument(0));

        Result<Book> result =
                service.updateBook(
                        user.getEmail(),
                        existing.getBookId(),
                        updated);

        assertTrue(result.isSuccess());

        assertEquals(
                "Updated",
                result.getpayload().getTitle());
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingMissingBook() {

        User user = makeUser();

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.findById(any()))
                .thenReturn(Optional.empty());

        Result<Book> result =
                service.updateBook(
                        user.getEmail(),
                        "missing",
                        makeBook());

        assertFalse(result.isSuccess());

        assertEquals(
                ResultType.NOT_FOUND,
                result.getResultType());
    }

    @Test
    void shouldDeleteBook() {

        User user = makeUser();

        Book book = makeBook();

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.findById(book.getBookId()))
                .thenReturn(Optional.of(book));

        Result<Void> result =
                service.deleteBook(
                        user.getEmail(),
                        book.getBookId());

        assertTrue(result.isSuccess());

        verify(bookRepository).delete(book);
    }

    @Test
    void shouldNotDeleteAnotherUsersBook() {

        User user = makeUser();

        Book book = makeBook();

        book.setUserId("someone-else");

        when(userRepository.findByEmail(user.getEmail()))
                .thenReturn(Optional.of(user));

        when(bookRepository.findById(book.getBookId()))
                .thenReturn(Optional.of(book));

        Result<Void> result =
                service.deleteBook(
                        user.getEmail(),
                        book.getBookId());

        assertFalse(result.isSuccess());

        verify(bookRepository, never()).delete(any());
    }
}