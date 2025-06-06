package tr.gov.voxx.car.system.container;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = {"tr.gov.voxx"})
@EntityScan(basePackages = {"tr.gov.voxx.car.system.adapter.out.jpa.entity"})
@EnableJpaRepositories(basePackages = {"tr.gov.voxx.car.system.adapter.out.jpa.repository"})
@EnableJpaAuditing
@EnableCaching
@EnableTransactionManagement
@EnableKafka
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
