package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FirmaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.FirmaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class FirmaEventConsumer {
    private final FirmaPersistenceJpaPort firmaPersistenceJpaPort;
    private final Gson gson = new Gson();

    @KafkaListener(topics = "${kafka.topic.firma-created}", groupId = "voxx-firma-group")
    public void consumeCreated(String strEvent) {
        FirmaCreatedEvent event = gson.fromJson(strEvent, FirmaCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        firmaPersistenceJpaPort.persist(
                FirmaJpaMapper.toFirmaFromFirmaCreatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.firma-updated}", groupId = "voxx-firma-group")
    public void consumeUpdated(String strEvent) {
        FirmaUpdatedEvent event = gson.fromJson(strEvent, FirmaUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        firmaPersistenceJpaPort.merge(
                FirmaJpaMapper.toFirmaFromFirmaUpdatedEvent(event)
        );
    }

    @KafkaListener(topics = "${kafka.topic.firma-deleted}", groupId = "voxx-firma-group")
    public void consumeDeleted(String strEvent) {
        FirmaDeletedEvent event = gson.fromJson(strEvent, FirmaDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        firmaPersistenceJpaPort.deleteById(event.getId());
    }
}
