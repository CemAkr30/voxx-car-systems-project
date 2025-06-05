package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.SigortaKaskoJpaMapper;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.SigortaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class SigortaEventConsumer {
    private final SigortaKaskoPersistenceJpaPort kaskoPersistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-created}", groupId = "voxx-sigorta-group")
    public void consumeCreated(String strEvent) {
        SigortaCreatedEvent event = gson.fromJson(strEvent, SigortaCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        kaskoPersistenceJpaPort.persist(
                SigortaKaskoJpaMapper.toSigortaFromSigortaCreatedEvent(event));
    }

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-updated}", groupId = "voxx-sigorta-group")
    public void consumeUpdated(String strEvent) {
        SigortaUpdatedEvent event = gson.fromJson(strEvent, SigortaUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        kaskoPersistenceJpaPort.merge(
                SigortaKaskoJpaMapper.toSigortaFromSigortaUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-deleted}", groupId = "voxx-sigorta-group")
    public void consumeDeleted(String strEvent) {
        SigortaDeletedEvent event = gson.fromJson(strEvent, SigortaDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        kaskoPersistenceJpaPort.deleteById(event.getId());
    }
}
