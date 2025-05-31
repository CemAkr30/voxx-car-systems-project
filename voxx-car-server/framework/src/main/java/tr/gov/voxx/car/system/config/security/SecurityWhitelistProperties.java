package tr.gov.voxx.car.system.config.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "security.whitelist")
public class SecurityWhitelistProperties {
    private List<String> urls;
}

