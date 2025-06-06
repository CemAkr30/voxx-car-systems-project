package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MarkaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.MarkaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class MarkaEventConsumer {
    private final MarkaPersistenceJpaPort markaPersistenceJpaPort;

    @CacheEvict(value = "marka", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.marka-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(MarkaCreatedEvent event) {
        log.info("Marka Created Event Received: {}", event.id());
        markaPersistenceJpaPort.persist(
                MarkaJpaMapper.toMarkaFromMarkaCreatedEvent(event));
    }

    @CacheEvict(value = "marka", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.marka-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(MarkaUpdatedEvent event) {
        log.info("Marka Updated Event Received: {}", event.id());
        markaPersistenceJpaPort.merge(
                MarkaJpaMapper.toMarkaFromMarkaUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "marka", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.marka-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(MarkaDeletedEvent event) {
        log.info("Marka Deleted Event Received: {}", event.id());
        markaPersistenceJpaPort.deleteById(event.id());
    }
}
