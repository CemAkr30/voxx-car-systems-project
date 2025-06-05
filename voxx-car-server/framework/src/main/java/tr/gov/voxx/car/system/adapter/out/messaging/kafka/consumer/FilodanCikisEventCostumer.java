package tr.gov.voxx.car.system.adapter.out.messaging.kafka.consumer;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FilodanCikisJpaMapper;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.event.FilodanCikisCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisUpdatedEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class FilodanCikisEventCostumer {
    private final FilodanCikisPersistenceJpaPort persistenceJpaPort;
    private final Gson gson = new Gson();

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-created}", groupId = "voxx-filodancikis-group")
    public void consumeCreated(String strEvent) {
        FilodanCikisCreatedEvent event = gson.fromJson(strEvent, FilodanCikisCreatedEvent.class);
        log.info("📥 Created Event Received: " + event.getId());
        persistenceJpaPort.persist(
                FilodanCikisJpaMapper.toFilodanCikisFromFilodanCikisCreatedEvent(event));
    }

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-updated}", groupId = "voxx-filodancikis-group")
    public void consumeUpdated(String strEvent) {
        FilodanCikisUpdatedEvent event = gson.fromJson(strEvent, FilodanCikisUpdatedEvent.class);
        log.info("📥 Updated Event Received: " + event.getId());
        persistenceJpaPort.merge(
                FilodanCikisJpaMapper.toFilodanCikisFromFilodanCikisUpdatedEvent(event)
        );
    }

    @CacheEvict(value = "filodancikis", key = "#event.id")
    @KafkaListener(topics = "${kafka.topic.filodancikis-deleted}", groupId = "voxx-filodancikis-group")
    public void consumeDeleted(String strEvent) {
        FilodanCikisDeletedEvent event = gson.fromJson(strEvent, FilodanCikisDeletedEvent.class);
        log.info("📥 Deleted Event Received: " + event.getId());
        persistenceJpaPort.deleteById(event.getId());
    }
}

