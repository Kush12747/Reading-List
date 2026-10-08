package com.kushgandhi.personal_reading_list.Repository;

import com.kushgandhi.personal_reading_list.Model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    boolean existsByUserIdAndTitle(String userId, String title);

    boolean existsByUserIdAndTitleAndBookIdNot(
            String userId,
            String title,
            String bookId
    );

    List<Book> findByUserId(String userId);
}