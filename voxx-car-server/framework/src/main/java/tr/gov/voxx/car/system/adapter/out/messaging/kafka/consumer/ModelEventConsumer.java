package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

    @KafkaListener(topics = "${kafka.topic.model-created}", groupId = "voxx-model-group")
    public void consumeCreated(ModelCreatedEvent event) {
        log.info("📥 Created Event Received: " + event.getId());
        modelPersistenceJpaPort.persist(
                ModelJpaMapper.toModelFromModelCreatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.model-updated}", groupId = "voxx-model-group")
    public void consumeUpdated(ModelUpdatedEvent event) {
        log.info("📥 Updated Event Received: " + event.getId());
        modelPersistenceJpaPort.merge(
                ModelJpaMapper.toModelFromModelUpdatedEvent(event)
        );
    }

    @KafkaListener(topics = "${kafka.topic.model-deleted}", groupId = "voxx-model-group")
    public void consumeDeleted(ModelDeletedEvent event) {
        log.info("📥 Deleted Event Received: " + event.getId());
        modelPersistenceJpaPort.deleteById(event.getId());
    }
}
