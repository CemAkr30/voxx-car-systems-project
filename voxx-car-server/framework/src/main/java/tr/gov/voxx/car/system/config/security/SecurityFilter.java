package tr.gov.voxx.car.system.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityFilter {

    private final JwtAuthConverter jwtAuthConverter;
    private final SecurityWhitelistProperties whitelistProperties;

    public SecurityFilter(JwtAuthConverter jwtAuthConverter, SecurityWhitelistProperties whitelistProperties) {
        this.jwtAuthConverter = jwtAuthConverter;
        this.whitelistProperties = whitelistProperties;
    }

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        List<String> whitelistUrls = whitelistProperties.getUrls();

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    whitelistUrls.forEach(url -> auth.requestMatchers(url).permitAll());
                    auth.anyRequest().authenticated();
                })
                .oauth2ResourceServer(oAuth2 -> oAuth2
                        .jwt(jwtConfigurer -> jwtConfigurer
                                .jwtAuthenticationConverter(jwtAuthConverter)
                        )
                )
                .sessionManagement(sessionManagementConfigurer -> sessionManagementConfigurer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }

}
