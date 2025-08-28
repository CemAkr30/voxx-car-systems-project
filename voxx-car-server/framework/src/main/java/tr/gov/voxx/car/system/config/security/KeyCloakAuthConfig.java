package tr.gov.voxx.car.system.config.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "keycloak")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeyCloakAuthConfig {
    private String clientId;
    private String clientSecret;
    private String grantType;
    private String authServerUrl;
}
