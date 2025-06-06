package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.KazaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.KazaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.KazaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.KazaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class KazaEventConsumer {

    private final KazaPersistenceJpaPort persistencePort;

    @CacheEvict(value = "kaza", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.kaza-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(KazaCreatedEvent event) {
        log.info("Kaza Created Event Received: {}", event.id());
        persistencePort.persist(KazaJpaMapper.toKazaFromKazaCreatedEvent(event));
    }

    @CacheEvict(value = "kaza", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.kaza-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(KazaUpdatedEvent event) {
        log.info("Kaza Updated Event Received: {}", event.id());
        persistencePort.merge(KazaJpaMapper.toKazaFromKazaUpdatedEvent(event));
    }

    @CacheEvict(value = "kaza", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.kaza-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(KazaDeletedEvent event) {
        log.info("Kaza Deleted Event Received: {}", event.id());
        persistencePort.deleteById(event.id());
    }
}
