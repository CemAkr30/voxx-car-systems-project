package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFiloJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class AracFiloEventConsumer {

    private final AracFiloPersistenceJpaPort aracFiloPersistenceJpaPort;

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(AracFiloCreatedEvent event) {
        log.info("AracFilo created event received: {}", event.id());
        aracFiloPersistenceJpaPort.persist(
                AracFiloJpaMapper.toAracFiloFromAracFiloCreatedEvent(event));
    }

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(AracFiloUpdatedEvent event) {
        log.info("AracFilo updated event received: {}", event.id());
        aracFiloPersistenceJpaPort.merge(
                AracFiloJpaMapper.toAracFiloFromAracFiloUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(AracFiloDeletedEvent event) {
        log.info("AracFilo deleted event received: {}", event.id());
        aracFiloPersistenceJpaPort.deleteById(event.id());
    }
}
