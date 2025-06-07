package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.IletisimJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.IletisimWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.IletisimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class IletisimEventConsumer {
    private final IletisimPersistenceJpaPort iletisimPersistenceJpaPort;
    private final IletisimWebSocketNotifier iletisimWebSocketNotifier;

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(IletisimCreatedEvent event) {
        log.info("Iletisim Created Event Received: {}", event.id());
        iletisimPersistenceJpaPort.persist(
                IletisimJpaMapper.toIletisimFromIletisimCreatedEvent(event));
        iletisimWebSocketNotifier.notifyIletisimCreated(event);
    }

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(IletisimUpdatedEvent event) {
        log.info("Iletisim Updated Event Received: {}", event.id());
        iletisimPersistenceJpaPort.merge(
                IletisimJpaMapper.toIletisimFromIletisimUpdatedEvent(event)
        );
        iletisimWebSocketNotifier.notifyIletisimUpdated(event);
    }

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(IletisimDeletedEvent event) {
        log.info("Iletisim Deleted Event Received: {}", event.id());
        iletisimPersistenceJpaPort.deleteById(event.id());
        iletisimWebSocketNotifier.notifyIletisimDeleted(event);
    }
}
