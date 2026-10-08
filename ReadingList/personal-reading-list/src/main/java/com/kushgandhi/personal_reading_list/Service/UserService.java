package com.kushgandhi.personal_reading_list.Service;

import com.kushgandhi.personal_reading_list.Model.User;
import com.kushgandhi.personal_reading_list.Repository.UserRepository;
import com.kushgandhi.personal_reading_list.Service.ENUMS.ResultType;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Result<User> updateUser(String id, User user) {
        Result<User> result = new Result<>();

        User existing = repository.findById(id).orElse(null);

        if (existing == null) {
            result.addErrorMessage("User not found", ResultType.NOT_FOUND);
            return result;
        }

        result.setpayload(user);
        return result;
    }

    public Result<User> getAUserById(String id) {
        Result<User> result = new Result<>();

        User user = repository.findById(id).orElse(null);

        if (user == null) {
            result.addErrorMessage("User not found", ResultType.NOT_FOUND);
            return result;
        }

        result.setpayload(user);
        return result;
    }

    public Result<Void> deleteUser(String id) {
        Result<Void> result = new Result<>();

        User user = repository.findById(id).orElse(null);

        if (user == null) {
            result.addErrorMessage("User not found", ResultType.NOT_FOUND);
            return result;
        }

        repository.delete(user);
        return result;
    }
}
