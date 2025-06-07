package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.SigortaKaskoJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.SigortaWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.SigortaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class SigortaEventConsumer {
    private final SigortaKaskoPersistenceJpaPort kaskoPersistenceJpaPort;
    private final SigortaWebSocketNotifier sigortaWebSocketNotifier;

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(SigortaCreatedEvent event) {
        log.info("Sigorta Kasko Created Event Received: {}", event.id());
        kaskoPersistenceJpaPort.persist(
                SigortaKaskoJpaMapper.toSigortaFromSigortaCreatedEvent(event));
        sigortaWebSocketNotifier.notifySigortaCreated(event);
    }

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(SigortaUpdatedEvent event) {
        log.info("Sigorta Kasko Updated Event Received: {}", event.id());
        kaskoPersistenceJpaPort.merge(
                SigortaKaskoJpaMapper.toSigortaFromSigortaUpdatedEvent(event)
        );
        sigortaWebSocketNotifier.notifySigortaUpdated(event);
    }

    @CacheEvict(value = "sigortaKasko", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.sigorta-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(SigortaDeletedEvent event) {
        log.info("Sigorta Kasko Deleted Event Received: {}", event.id());
        kaskoPersistenceJpaPort.deleteById(event.id());
        sigortaWebSocketNotifier.notifySigortaDeleted(event);
    }
}
