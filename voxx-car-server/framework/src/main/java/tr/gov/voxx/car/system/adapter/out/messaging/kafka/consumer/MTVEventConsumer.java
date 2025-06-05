package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
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
    private final Gson gson = new Gson();

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-created}", groupId = "voxx-mtv-group")
    public void consumeCreated(String strEvent) {
        MTVCreatedEvent event = gson.fromJson(strEvent, MTVCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                MTVJpaMapper.toMtvFromMtvCreatedEvent(event));
    }

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-updated}", groupId = "voxx-mtv-group")
    public void consumeUpdated(String strEvent) {
        MTVUpdatedEvent event = gson.fromJson(strEvent, MTVUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                MTVJpaMapper.toMtvFromMtvUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "mtv", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.mtv-deleted}", groupId = "voxx-mtv-group")
    public void consumeDeleted(String strEvent) {
        MTVDeletedEvent event = gson.fromJson(strEvent, MTVDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}
