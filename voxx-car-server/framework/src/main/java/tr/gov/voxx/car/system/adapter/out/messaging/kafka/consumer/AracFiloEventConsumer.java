package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFiloJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class AracFiloEventConsumer {

    private final AracFiloPersistenceJpaPort aracFiloPersistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-created}", groupId = "voxx-arac-filo-group")
    public void consumeCreated(String strEvent) {
        AracFiloCreatedEvent event = gson.fromJson(strEvent, AracFiloCreatedEvent.class);
        log.info("📥 AracFilo created event received: " + event.getId());
        aracFiloPersistenceJpaPort.persist(
                AracFiloJpaMapper.toAracFiloFromAracFiloCreatedEvent(event));
    }

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-updated}", groupId = "voxx-arac-filo-group")
    public void consumeUpdated(String strEvent) {
        AracFiloUpdatedEvent event = gson.fromJson(strEvent, AracFiloUpdatedEvent.class);
        log.info("📥 AracFilo updated event received: " + event.getId());
        aracFiloPersistenceJpaPort.merge(
                AracFiloJpaMapper.toAracFiloFromAracFiloUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "aracFilo", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.arac-filo-deleted}", groupId = "voxx-arac-filo-group")
    public void consumeDeleted(String strEvent) {
        AracFiloDeletedEvent event = gson.fromJson(strEvent, AracFiloDeletedEvent.class);
        log.info("📥 AracFilo deleted event received: " + event.getId());
        aracFiloPersistenceJpaPort.deleteById(event.getId());
    }
}
