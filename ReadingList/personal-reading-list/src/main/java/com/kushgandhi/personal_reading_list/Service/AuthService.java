package com.kushgandhi.personal_reading_list.Service;

import com.kushgandhi.personal_reading_list.DTO.AuthResponse;
import com.kushgandhi.personal_reading_list.DTO.LoginRequest;
import com.kushgandhi.personal_reading_list.DTO.RegisterRequest;
import com.kushgandhi.personal_reading_list.Model.User;
import com.kushgandhi.personal_reading_list.Repository.UserRepository;
import com.kushgandhi.personal_reading_list.Security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(token, savedUser.getEmail(), savedUser.getName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid password.");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, user.getEmail(), user.getName());
    }
}
