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
import tr.gov.voxx.car.system.application.port.out.AuthWebServicePort;
import tr.gov.voxx.car.system.config.security.KeyCloakAuthConfig;

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
}
