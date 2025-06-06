package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.BakimJpaMapper;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class BakimEventConsumer {

    private final BakimPersistenceJpaPort persistencePort;

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(BakimCreatedEvent event) {
        log.info("Bakim Created Event Received: {}", event.id());
        persistencePort.persist(BakimJpaMapper.toBakimFromBakimCreatedEvent(event));
    }

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(BakimUpdatedEvent event) {
        log.info("Bakim Updated Event Received: {}", event.id());
        persistencePort.merge(BakimJpaMapper.toBakimFromBakimUpdatedEvent(event));
    }

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(BakimDeletedEvent event) {
        log.info("Bakim Deleted Event Received: {}", event.id());
        persistencePort.deleteById(event.id());
    }
}
