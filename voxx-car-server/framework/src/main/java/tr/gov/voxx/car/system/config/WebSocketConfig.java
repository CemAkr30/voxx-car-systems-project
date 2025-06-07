package tr.gov.voxx.car.system.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.StompWebSocketEndpointRegistration;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import static tr.gov.voxx.car.server.constant.CorsConstant.PREFIX_COMMA;
import static tr.gov.voxx.car.server.constant.CorsConstant.PREFIX_STAR;

@Configuration
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${app.cors.allowed.origins}")
    private String corsAllowedOrigins;


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        StompWebSocketEndpointRegistration registration = registry.addEndpoint("/ws");

        if (PREFIX_STAR.equals(corsAllowedOrigins)) {
            registration.setAllowedOriginPatterns(PREFIX_STAR);
        } else {
            String[] origins = corsAllowedOrigins.split(PREFIX_COMMA);
            // Trim whitespace from origins
            for (int i = 0; i < origins.length; i++) {
                origins[i] = origins[i].trim();
            }
            registration.setAllowedOrigins(origins);
        }

        registration.withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }
}

