package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MTVJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MTVPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.MTVCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MTVDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MTVUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class MTVEventConsumer {

    private final MTVPersistenceJpaPort persistenceJpaPort;

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(MTVCreatedEvent event) {
        log.info("Mtv Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                MTVJpaMapper.toMtvFromMtvCreatedEvent(event));
    }

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(MTVUpdatedEvent event) {
        log.info("Mtv Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                MTVJpaMapper.toMtvFromMtvUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(MTVDeletedEvent event) {
        log.info("Mtv Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
    }
}
