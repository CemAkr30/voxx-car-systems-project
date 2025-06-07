package tr.gov.voxx.car.system.container;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@SpringBootApplication(scanBasePackages = {"tr.gov.voxx"})
@EntityScan(basePackages = {"tr.gov.voxx.car.system.adapter.out.jpa.entity"})
@EnableJpaRepositories(basePackages = {"tr.gov.voxx.car.system.adapter.out.jpa.repository"})
@EnableJpaAuditing
@EnableCaching
@EnableTransactionManagement
@EnableKafka
@EnableWebSocketMessageBroker
@EnableWebSecurity
@EnableMethodSecurity
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
