package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MuayeneJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.MuayeneCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class MuayeneEventConsumer {
    private final MuayenePersistenceJpaPort persistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-created}", groupId = "voxx-muayene-group")
    public void consumeCreated(String strEvent) {
        MuayeneCreatedEvent event = gson.fromJson(strEvent, MuayeneCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                MuayeneJpaMapper.toMuayeneFromMuayeneCreatedEvent(event));
    }

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-updated}", groupId = "voxx-muayene-group")
    public void consumeUpdated(String strEvent) {
        MuayeneUpdatedEvent event = gson.fromJson(strEvent, MuayeneUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                MuayeneJpaMapper.toMuayeneFromMuayeneUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "muayene", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.muayene-deleted}", groupId = "voxx-muayene-group")
    public void consumeDeleted(String strEvent) {
        MuayeneDeletedEvent event = gson.fromJson(strEvent, MuayeneDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}
