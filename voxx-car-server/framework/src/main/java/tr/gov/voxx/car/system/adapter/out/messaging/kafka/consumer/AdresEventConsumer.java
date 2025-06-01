package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AdresJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AdresCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AdresDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AdresUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AdresEventConsumer {
    private final AdresPersistenceJpaPort adresPersistenceJpaPort;
    private final Gson gson = new Gson();

    @KafkaListener(topics = "${kafka.topic.adres-created}", groupId = "voxx-adres-group")
    public void consumeCreated(String strEvent) {
        AdresCreatedEvent event = gson.fromJson(strEvent, AdresCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        adresPersistenceJpaPort.persist(
                AdresJpaMapper.toAdresFromAdresCreatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.adres-updated}", groupId = "voxx-adres-group")
    public void consumeUpdated(String strEvent) {
        AdresUpdatedEvent event = gson.fromJson(strEvent, AdresUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        adresPersistenceJpaPort.merge(
                AdresJpaMapper.toAdresFromAdresUpdatedEvent(event)
        );
    }

    @KafkaListener(topics = "${kafka.topic.adres-deleted}", groupId = "voxx-adres-group")
    public void consumeDeleted(String strEvent) {
        AdresDeletedEvent event = gson.fromJson(strEvent, AdresDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        adresPersistenceJpaPort.deleteById(event.getId());
    }
}
