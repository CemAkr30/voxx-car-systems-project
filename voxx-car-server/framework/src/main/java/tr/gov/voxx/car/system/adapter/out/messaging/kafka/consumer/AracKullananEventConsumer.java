package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracKullananJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.AracKullananWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AracKullananCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AracKullananEventConsumer {
    private final AracKullananPersistenceJpaPort persistenceJpaPort;
    private final AracKullananWebSocketNotifier aracKullananWebSocketNotifier;

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(AracKullananCreatedEvent event) {
        log.info("Arac Kullanan Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                AracKullananJpaMapper.toAracKullananFromAracKullananCreatedEvent(event));
        aracKullananWebSocketNotifier.notifyAracKullananCreated(event);
    }

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(AracKullananUpdatedEvent event) {
        log.info("Arac Kullanan Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                AracKullananJpaMapper.toAracKullananFromAracKullananUpdatedEvent(event)
        );
        aracKullananWebSocketNotifier.notifyAracKullananUpdated(event);
    }

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(AracKullananDeletedEvent event) {
        log.info("Arac Kullanan Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
        aracKullananWebSocketNotifier.notifyAracKullananDeleted(event);
    }
}


