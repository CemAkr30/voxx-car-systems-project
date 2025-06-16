package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

@Schema(description = "User information response")
public record UserInfoResponse(
        @Schema(description = "User ID", example = "8f6bfcbd-e9b5-463c-b944-8f4944a2b522")
        String userId,

        @Schema(description = "Username", example = "app_admin")
        String username,

        @Schema(description = "Full name", example = "App Admin")
        String name,

        @Schema(description = "Email address", example = "app_admin@example.com")
        String email,

        @Schema(description = "User roles", example = "[\"client_admin\"]")
        Set<String> roles,

        @Schema(description = "Session ID", example = "ccad3af8-a3bb-4799-919f-2886c300d09c")
        String sessionId,

        @Schema(description = "Token expiration time (Unix timestamp)", example = "1750106314")
        long expirationTime
) {
}