package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MarkaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.MarkaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class MarkaEventConsumer {
    private final MarkaPersistenceJpaPort markaPersistenceJpaPort;
    private final Gson gson = new Gson();

    @KafkaListener(topics = "${kafka.topic.marka-created}", groupId = "voxx-marka-group")
    public void consumeCreated(String strEvent) {
        MarkaCreatedEvent event = gson.fromJson(strEvent, MarkaCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        markaPersistenceJpaPort.persist(
                MarkaJpaMapper.toMarkaFromMarkaCreatedEvent(event));
    }

    @KafkaListener(topics = "${kafka.topic.marka-updated}", groupId = "voxx-marka-group")
    public void consumeUpdated(String strEvent) {
        MarkaUpdatedEvent event = gson.fromJson(strEvent, MarkaUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        markaPersistenceJpaPort.merge(
                MarkaJpaMapper.toMarkaFromMarkaUpdatedEvent(event)
        );
    }

    @KafkaListener(topics = "${kafka.topic.marka-deleted}", groupId = "voxx-marka-group")
    public void consumeDeleted(String strEvent) {
        MarkaDeletedEvent event = gson.fromJson(strEvent, MarkaDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        markaPersistenceJpaPort.deleteById(event.getId());
    }
}
