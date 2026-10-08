package com.kushgandhi.personal_reading_list.Repository;

import com.kushgandhi.personal_reading_list.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // login
    Optional<User> findByEmail(String email);

    //prevent duplicates accounts
    boolean existsByEmail(String email);
}
