package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.KazaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.KazaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.KazaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.KazaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class KazaEventConsumer {

    private final KazaPersistenceJpaPort persistencePort;
    private final Gson gson = new Gson();

    @KafkaListener(topics = "${kafka.topic.kaza-created}", groupId = "voxx-kaza-group")
    public void consumeCreated(String strEvent) {
        KazaCreatedEvent event = gson.fromJson(strEvent, KazaCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistencePort.persist(KazaJpaMapper.toKazaFromKazaCreatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.kaza-updated}", groupId = "voxx-kaza-group")
    public void consumeUpdated(String strEvent) {
        KazaUpdatedEvent event = gson.fromJson(strEvent, KazaUpdatedEvent.class);
        log.info(" Updated Event Received: " + event.getId());
        persistencePort.merge(KazaJpaMapper.toKazaFromKazaUpdatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.kaza-deleted}", groupId = "voxx-kaza-group")
    public void consumeDeleted(String strEvent) {
        KazaDeletedEvent event = gson.fromJson(strEvent, KazaDeletedEvent.class);
        log.info("🗑📥 Deleted Event Received: " + event.getId());
        persistencePort.deleteById(event.getId());
    }
}
