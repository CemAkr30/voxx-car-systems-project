package tr.gov.voxx.car.system.config.security;

import java.util.Set;

public record UserContext(String userId, String username, String name, String email, Set<String> roles,
                          String sessionId, String token, long expirationTime) {
    public UserContext(String userId, String username, String name, String email,
                       Set<String> roles, String sessionId, String token, long expirationTime) {
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.email = email;
        this.roles = Set.copyOf(roles);
        this.sessionId = sessionId;
        this.token = token;
        this.expirationTime = expirationTime;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() / 1000 > expirationTime;
    }

    public boolean hasRole(String role) {
        return roles.contains(role);
    }
}