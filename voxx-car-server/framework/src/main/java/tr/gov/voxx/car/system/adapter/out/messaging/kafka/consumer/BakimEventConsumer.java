package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.BakimJpaMapper;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class BakimEventConsumer {

    private final BakimPersistenceJpaPort persistencePort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-created}", groupId = "voxx-bakim-group")
    public void consumeCreated(String strEvent) {
        BakimCreatedEvent event = gson.fromJson(strEvent, BakimCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistencePort.persist(BakimJpaMapper.toBakimFromBakimCreatedEvent(event));
    }

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-updated}", groupId = "bakim-group")
    public void consumeUpdated(String message) {
        BakimUpdatedEvent event = gson.fromJson(message, BakimUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistencePort.merge(BakimJpaMapper.toBakimFromBakimUpdatedEvent(event));
    }

    @CacheEvict(value = "bakim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.bakim-deleted}", groupId = "bakim-group")
    public void consumeDeleted(String message) {
        BakimDeletedEvent event = gson.fromJson(message, BakimDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistencePort.deleteById(event.getId());
    }
}
