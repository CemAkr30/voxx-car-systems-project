package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AlisFaturasiJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.AlisFaturasiWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AlisFaturasiEventConsumer {
    private final AlisFaturasiPersistenceJpaPort persistenceJpaPort;
    private final AlisFaturasiWebSocketNotifier alisFaturasiWebSocketNotifier;

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(AlisFaturasiCreatedEvent event) {
        log.info("Alis Faturasi Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                AlisFaturasiJpaMapper.toAlisFaturasiFromAlisFaturasiCreatedEvent(event));
        alisFaturasiWebSocketNotifier.notifyAlisFaturasiCreated(event);
    }

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(AlisFaturasiUpdatedEvent event) {
        log.info("Alis Faturasi Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                AlisFaturasiJpaMapper.toAlisFaturasiFromAlisFaturasiUpdatedEvent(event)
        );
        alisFaturasiWebSocketNotifier.notifyAlisFaturasiUpdated(event);
    }

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(AlisFaturasiDeletedEvent event) {
        log.info("Alis Faturasi Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
        alisFaturasiWebSocketNotifier.notifyAlisFaturasiDeleted(event);
    }
}

