package com.kushgandhi.personal_reading_list.Security;

import com.kushgandhi.personal_reading_list.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user) {

        return Jwts.builder()

                .subject(user.getEmail())

                .claim("userId", user.getUserId())

                .claim("role", user.getRole())

                .issuedAt(new Date())

                .expiration(new Date(System.currentTimeMillis() + expiration))

                .signWith(getSigningKey(), SignatureAlgorithm.HS256)

                .compact();
    }

    public Claims extractClaims(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }

    public boolean isTokenValid(String token) {

        try {

            return extractClaims(token)
                    .getExpiration()
                    .after(new Date());

        } catch (Exception ex) {

            return false;

        }

    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }
}
