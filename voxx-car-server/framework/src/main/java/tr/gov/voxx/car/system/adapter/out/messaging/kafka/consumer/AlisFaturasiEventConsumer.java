package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AlisFaturasiJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class AlisFaturasiEventConsumer {
    private final AlisFaturasiPersistenceJpaPort persistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-created}", groupId = "voxx-alisfaturasi-group")
    public void consumeCreated(String strEvent) {
        AlisFaturasiCreatedEvent event = gson.fromJson(strEvent, AlisFaturasiCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                AlisFaturasiJpaMapper.toAlisFaturasiFromAlisFaturasiCreatedEvent(event));
    }

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-updated}", groupId = "voxx-alisfaturasi-group")
    public void consumeUpdated(String strEvent) {
        AlisFaturasiUpdatedEvent event = gson.fromJson(strEvent, AlisFaturasiUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                AlisFaturasiJpaMapper.toAlisFaturasiFromAlisFaturasiUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "alisFaturasi", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.alisfaturasi-deleted}", groupId = "voxx-alisfaturasi-group")
    public void consumeDeleted(String strEvent) {
        AlisFaturasiDeletedEvent event = gson.fromJson(strEvent, AlisFaturasiDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}

