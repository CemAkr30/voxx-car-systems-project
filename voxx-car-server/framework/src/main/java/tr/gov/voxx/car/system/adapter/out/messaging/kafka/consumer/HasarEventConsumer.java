package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.HasarJpaMapper;
import tr.gov.voxx.car.system.application.port.out.HasarPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.HasarCreatedEvent;
import tr.gov.voxx.car.system.domain.event.HasarDeletedEvent;
import tr.gov.voxx.car.system.domain.event.HasarUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class HasarEventConsumer {
    private final HasarPersistenceJpaPort persistenceJpaPort;

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(HasarCreatedEvent event) {
        log.info("Hasar Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                HasarJpaMapper.toHasarFromHasarCreatedEvent(event));
    }

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(HasarUpdatedEvent event) {
        log.info("Hasar Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                HasarJpaMapper.toHasarFromHasarUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(HasarDeletedEvent event) {
        log.info("Hasar Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
    }
}

