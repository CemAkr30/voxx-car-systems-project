package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracKullananJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AracKullananCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AracKullananEventConsumer {
    private final AracKullananPersistenceJpaPort persistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-created}", groupId = "voxx-arackullanan-group")
    public void consumeCreated(String strEvent) {
        AracKullananCreatedEvent event = gson.fromJson(strEvent, AracKullananCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                AracKullananJpaMapper.toAracKullananFromAracKullananCreatedEvent(event));
    }

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-updated}", groupId = "voxx-arackullanan-group")
    public void consumeUpdated(String strEvent) {
        AracKullananUpdatedEvent event = gson.fromJson(strEvent, AracKullananUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                AracKullananJpaMapper.toAracKullananFromAracKullananUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "arackullanan", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arackullanan-deleted}", groupId = "voxx-arackullanan-group")
    public void consumeDeleted(String strEvent) {
        AracKullananDeletedEvent event = gson.fromJson(strEvent, AracKullananDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}


