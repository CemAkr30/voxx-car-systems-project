package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MuayeneJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.MuayeneWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.MuayeneCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class MuayeneEventConsumer {
    private final MuayenePersistenceJpaPort persistenceJpaPort;
    private final MuayeneWebSocketNotifier muayeneWebSocketNotifier;

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(MuayeneCreatedEvent event) {
        log.info("Muayene Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                MuayeneJpaMapper.toMuayeneFromMuayeneCreatedEvent(event));
        muayeneWebSocketNotifier.notifyMuayeneCreated(event);
    }

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(MuayeneUpdatedEvent event) {
        log.info("Muayene Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                MuayeneJpaMapper.toMuayeneFromMuayeneUpdatedEvent(event)
        );
        muayeneWebSocketNotifier.notifyMuayeneUpdated(event);
    }

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(MuayeneDeletedEvent event) {
        log.info("Muayene Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
        muayeneWebSocketNotifier.notifyMuayeneDeleted(event);
    }
}
