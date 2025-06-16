package tr.gov.voxx.car.system.config.security;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class UserContextHolder {
    private static final ThreadLocal<UserContext> currentUserContext = new ThreadLocal<>();

    private UserContextHolder() {
        // Private constructor to prevent instantiation
    }

    public static void setContextFromToken(String token) {
        SessionCache cache = SessionCache.getInstance();
        UserContext userContext = cache.getByToken(token);

        if (userContext != null && !userContext.isExpired()) {
            currentUserContext.set(userContext);
        } else {
            throw new SecurityException("Invalid or expired token");
        }
    }

    public static UserContext getCurrentContext() {
        UserContext context = currentUserContext.get();
        if (context == null) {
            throw new IllegalStateException("No user context available");
        }
        return context;
    }

    public static void clearContext() {
        currentUserContext.remove();
    }

    @SuppressWarnings("unchecked")
    public static void createAndSetContext(String token, Map<String, Object> claims) {
        Set<String> roles = new HashSet<>(((List<String>) claims.get("roles")));

        UserContext userContext = new UserContext(
                (String) claims.get("sub"),
                (String) claims.get("preferred_username"),
                (String) claims.get("name"),
                (String) claims.get("email"),
                roles,
                (String) claims.get("sid"),
                token,
                Long.parseLong(claims.get("exp").toString())
        );

        SessionCache.getInstance().put(userContext);
        currentUserContext.set(userContext);
    }

    public static boolean isAuthenticated() {
        return currentUserContext.get() != null;
    }

    public static boolean hasRole(String role) {
        if (!isAuthenticated()) return false;
        return getCurrentContext().hasRole(role);
    }
}