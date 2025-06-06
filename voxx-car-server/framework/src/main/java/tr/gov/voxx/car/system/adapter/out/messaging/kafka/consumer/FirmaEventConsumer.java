package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FirmaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.FirmaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class FirmaEventConsumer {
    private final FirmaPersistenceJpaPort firmaPersistenceJpaPort;

    @CacheEvict(value = "firma", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.firma-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(FirmaCreatedEvent event) {
        log.info("Firma Created Event Received: {}", event.id());
        firmaPersistenceJpaPort.persist(
                FirmaJpaMapper.toFirmaFromFirmaCreatedEvent(event));
    }

    @CacheEvict(value = "firma", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.firma-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(FirmaUpdatedEvent event) {
        log.info("Firma Updated Event Received: {}", event.id());
        firmaPersistenceJpaPort.merge(
                FirmaJpaMapper.toFirmaFromFirmaUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "firma", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.firma-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(FirmaDeletedEvent event) {
        log.info("Firma Deleted Event Received: {}", event.id());
        firmaPersistenceJpaPort.deleteById(event.id());
    }
}
