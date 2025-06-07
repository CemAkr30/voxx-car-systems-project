package tr.gov.voxx.car.system.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static tr.gov.voxx.car.server.constant.CorsConstant.PREFIX_COMMA;
import static tr.gov.voxx.car.server.constant.CorsConstant.PREFIX_STAR;

@Configuration
@RequiredArgsConstructor
public class SecurityFilter {

    private final JwtAuthConverter jwtAuthConverter;
    private final SecurityWhitelistProperties whitelistProperties;
    
    @Value("${app.cors.allowed.origins}")
    private String corsAllowedOrigins;

    @Value("${app.cors.allowed.methods}")
    private String corsAllowedMethods;

    @Value("${app.cors.allowed.headers}")
    private String corsAllowedHeaders;

    @Value("${app.cors.allowed.credentials}")
    private Boolean corsAllowedCredentials;


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        if (PREFIX_STAR.equals(corsAllowedOrigins)) {
            configuration.setAllowedOriginPatterns(List.of(PREFIX_STAR));
        } else {
            configuration.setAllowedOrigins(Arrays.asList(corsAllowedOrigins.split(PREFIX_COMMA)));
        }

        configuration.setAllowedMethods(List.of(corsAllowedMethods));
        configuration.setAllowedHeaders(List.of(corsAllowedHeaders));
        configuration.setAllowCredentials(corsAllowedCredentials);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        List<String> whitelistUrls = whitelistProperties.getUrls();

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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
