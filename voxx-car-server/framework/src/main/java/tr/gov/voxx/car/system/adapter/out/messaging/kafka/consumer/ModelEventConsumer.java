package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.ModelJpaMapper;
import tr.gov.voxx.car.system.application.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.ModelCreatedEvent;
import tr.gov.voxx.car.system.domain.event.ModelDeletedEvent;
import tr.gov.voxx.car.system.domain.event.ModelUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class ModelEventConsumer {

    private final ModelPersistenceJpaPort modelPersistenceJpaPort;

    @CacheEvict(value = "model", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.model-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(ModelCreatedEvent event) {
        log.info("Model Created Event Received: {}", event.id());
        modelPersistenceJpaPort.persist(
                ModelJpaMapper.toModelFromModelCreatedEvent(event));
    }

    @CacheEvict(value = "model", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.model-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(ModelUpdatedEvent event) {
        log.info("Model Updated Event Received: {}", event.id());
        modelPersistenceJpaPort.merge(
                ModelJpaMapper.toModelFromModelUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "model", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.model-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(ModelDeletedEvent event) {
        log.info("Model Deleted Event Received: {}", event.id());
        modelPersistenceJpaPort.deleteById(event.id());
    }
}
