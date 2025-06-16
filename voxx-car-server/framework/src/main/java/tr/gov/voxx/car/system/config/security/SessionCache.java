package tr.gov.voxx.car.system.config.security;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionCache {
    private static volatile SessionCache instance;
    private final Map<String, UserContext> tokenToUserContextMap;
    private final Map<String, UserContext> sessionIdToUserContextMap;

    private SessionCache() {
        tokenToUserContextMap = new ConcurrentHashMap<>();
        sessionIdToUserContextMap = new ConcurrentHashMap<>();
    }

    public static SessionCache getInstance() {
        if (instance == null) {
            synchronized (SessionCache.class) {
                if (instance == null) {
                    instance = new SessionCache();
                }
            }
        }
        return instance;
    }

    public void put(UserContext userContext) {
        tokenToUserContextMap.put(userContext.token(), userContext);
        sessionIdToUserContextMap.put(userContext.sessionId(), userContext);
    }

    public UserContext getByToken(String token) {
        return tokenToUserContextMap.get(token);
    }

    public UserContext getBySessionId(String sessionId) {
        return sessionIdToUserContextMap.get(sessionId);
    }

    public void removeByToken(String token) {
        UserContext userContext = tokenToUserContextMap.remove(token);
        if (userContext != null) {
            sessionIdToUserContextMap.remove(userContext.sessionId());
        }
    }

    public void removeBySessionId(String sessionId) {
        UserContext userContext = sessionIdToUserContextMap.remove(sessionId);
        if (userContext != null) {
            tokenToUserContextMap.remove(userContext.token());
        }
    }

    public void clear() {
        tokenToUserContextMap.clear();
        sessionIdToUserContextMap.clear();
    }
}