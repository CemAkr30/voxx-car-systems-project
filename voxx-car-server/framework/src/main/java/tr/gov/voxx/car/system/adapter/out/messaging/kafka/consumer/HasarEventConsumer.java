package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
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
    private final Gson gson = new Gson();

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-created}", groupId = "voxx-hasar-group")
    public void consumeCreated(String strEvent) {
        HasarCreatedEvent event = gson.fromJson(strEvent, HasarCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                HasarJpaMapper.toHasarFromHasarCreatedEvent(event));
    }

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-updated}", groupId = "voxx-hasar-group")
    public void consumeUpdated(String strEvent) {
        HasarUpdatedEvent event = gson.fromJson(strEvent, HasarUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                HasarJpaMapper.toHasarFromHasarUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "hasar", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.hasar-deleted}", groupId = "voxx-hasar-group")
    public void consumeDeleted(String strEvent) {
        HasarDeletedEvent event = gson.fromJson(strEvent, HasarDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}

