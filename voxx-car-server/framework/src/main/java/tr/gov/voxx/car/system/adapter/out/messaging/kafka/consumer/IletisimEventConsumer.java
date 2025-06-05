package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.IletisimJpaMapper;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.IletisimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class IletisimEventConsumer {
    private final IletisimPersistenceJpaPort iletisimPersistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-created}", groupId = "voxx-iletisim-group")
    public void consumeCreated(String strEvent) {
        IletisimCreatedEvent event = gson.fromJson(strEvent, IletisimCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        iletisimPersistenceJpaPort.persist(
                IletisimJpaMapper.toIletisimFromIletisimCreatedEvent(event));
    }

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-updated}", groupId = "voxx-iletisim-group")
    public void consumeUpdated(String strEvent) {
        IletisimUpdatedEvent event = gson.fromJson(strEvent, IletisimUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        iletisimPersistenceJpaPort.merge(
                IletisimJpaMapper.toIletisimFromIletisimUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "iletisim", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.iletisim-deleted}", groupId = "voxx-iletisim-group")
    public void consumeDeleted(String strEvent) {
        IletisimDeletedEvent event = gson.fromJson(strEvent, IletisimDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        iletisimPersistenceJpaPort.deleteById(event.getId());
    }
}
