package com.kushgandhi.personal_reading_list.Controller;

import com.kushgandhi.personal_reading_list.Model.Book;
import com.kushgandhi.personal_reading_list.Service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooksForUser(Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(service.getBooksForUser(email).getpayload());
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable String bookId, @RequestParam String userId) {
        return ResponseEntity.ok(service.getBookById(userId, bookId).getpayload());
    }

    @PostMapping
    public ResponseEntity<Book> addBook(
            @RequestBody Book book,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                service.addBook(email, book).getpayload()
        );
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable String bookId, Authentication authentication, @RequestBody Book book) {
        String email = authentication.getName();
        return ResponseEntity.ok(service.updateBook(email, bookId, book).getpayload());
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId, Authentication authentication) {
        String email = authentication.getName();
        service.deleteBook(email, bookId);
        return ResponseEntity.noContent().build();
    }
}
