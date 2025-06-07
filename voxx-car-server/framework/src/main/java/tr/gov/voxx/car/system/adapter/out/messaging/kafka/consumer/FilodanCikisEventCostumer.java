package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FilodanCikisJpaMapper;
import tr.gov.voxx.car.system.adapter.out.websocket.FilodanCikisWebSocketNotifier;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.FilodanCikisCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class FilodanCikisEventCostumer {
    private final FilodanCikisPersistenceJpaPort persistenceJpaPort;
    private final FilodanCikisWebSocketNotifier filodanCikisWebSocketNotifier;

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeCreated(FilodanCikisCreatedEvent event) {
        log.info("Filodan Cikis Created Event Received: {}", event.id());
        persistenceJpaPort.persist(
                FilodanCikisJpaMapper.toFilodanCikisFromFilodanCikisCreatedEvent(event));
        filodanCikisWebSocketNotifier.notifyFilodanCikisCreated(event);
    }

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-updated}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeUpdated(FilodanCikisUpdatedEvent event) {
        log.info("Filodan Cikis Updated Event Received: {}", event.id());
        persistenceJpaPort.merge(
                FilodanCikisJpaMapper.toFilodanCikisFromFilodanCikisUpdatedEvent(event)
        );
        filodanCikisWebSocketNotifier.notifyFilodanCikisUpdated(event);
    }

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-deleted}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeleted(FilodanCikisDeletedEvent event) {
        log.info("Filodan Cikis Deleted Event Received: {}", event.id());
        persistenceJpaPort.deleteById(event.id());
        filodanCikisWebSocketNotifier.notifyFilodanCikisDeleted(event);
    }
}

