package tr.gov.voxx.car.system.application.dto.webservice;

import java.util.Set;

public record UserInfoDto(
        String userId,
        String username,
        String name,
        String email,
        Set<String> roles,
        String sessionId,
        long expirationTime
) {
}
