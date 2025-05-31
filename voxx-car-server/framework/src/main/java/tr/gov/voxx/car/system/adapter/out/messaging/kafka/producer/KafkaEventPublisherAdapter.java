package tr.gov.voxx.car.system.adapter.out.messaging.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;

@Component
@RequiredArgsConstructor
public class KafkaEventPublisherAdapter implements DomainEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    
    @Override
    public void publish(String topic, Object event) {
        kafkaTemplate.send(topic, event);
    }
}

