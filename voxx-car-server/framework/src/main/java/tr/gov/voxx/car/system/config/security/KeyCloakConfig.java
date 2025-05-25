package tr.gov.voxx.car.system.config.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class KeyCloakConfig {
    private String resourceId;
    private String principleAttribute;
}
