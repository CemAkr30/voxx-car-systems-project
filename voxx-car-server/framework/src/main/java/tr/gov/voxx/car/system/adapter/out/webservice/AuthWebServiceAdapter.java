package tr.gov.voxx.car.system.adapter.out.webservice;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;
import tr.gov.voxx.car.system.application.dto.webservice.UserInfoDto;
import tr.gov.voxx.car.system.application.port.out.AuthWebServicePort;
import tr.gov.voxx.car.system.config.security.KeyCloakAuthConfig;
import tr.gov.voxx.car.system.config.security.SessionCache;
import tr.gov.voxx.car.system.config.security.UserContext;

@Component
@RequiredArgsConstructor
public class AuthWebServiceAdapter implements AuthWebServicePort {

    private final RestTemplate restTemplate = new RestTemplate();
    private final KeyCloakAuthConfig keyCloakAuthConfig;

    @Override
    public AuthWebServiceDto login(String username, String password) {

        String authUrl = keyCloakAuthConfig.getAuthServerUrl() + "/protocol/openid-connect/token";

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", keyCloakAuthConfig.getGrantType());
        form.add("client_id", keyCloakAuthConfig.getClientId());
        form.add("client_secret", keyCloakAuthConfig.getClientSecret());
        form.add("username", username);
        form.add("password", password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(form, headers);

        ResponseEntity<AuthWebServiceDto> response = restTemplate.postForEntity(
                authUrl, entity, AuthWebServiceDto.class);

        return response.getBody();
    }

    @Override
    public UserInfoDto userInfo(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid authorization header");
        }

        String token = authorizationHeader.substring(7);
        UserContext userContext = SessionCache.getInstance().getByToken(token);

        if (userContext == null || userContext.isExpired()) {
            throw new SecurityException("Invalid or expired token");
        }

        return new UserInfoDto(
                userContext.userId(),
                userContext.username(),
                userContext.name(),
                userContext.email(),
                userContext.roles(),
                userContext.sessionId(),
                userContext.expirationTime()
        );
    }
}
