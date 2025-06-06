package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AdresJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AdresCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AdresDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AdresUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AdresEventConsumer {
    private final AdresPersistenceJpaPort adresPersistenceJpaPort;

    @CacheEvict(value = "adres", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.adres-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(AdresCreatedEvent event) {
        log.info("Adres Created Event Received: {}", event.id());
        adresPersistenceJpaPort.persist(
                AdresJpaMapper.toAdresFromAdresCreatedEvent(event));
    }

    @CacheEvict(value = "adres", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.adres-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(AdresUpdatedEvent event) {
        log.info("Adres Updated Event Received: {}", event.id());
        adresPersistenceJpaPort.merge(
                AdresJpaMapper.toAdresFromAdresUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "adres", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.adres-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(AdresDeletedEvent event) {
        log.info("Adres Deleted Event Received: {}", event.id());
        adresPersistenceJpaPort.deleteById(event.id());
    }
}
