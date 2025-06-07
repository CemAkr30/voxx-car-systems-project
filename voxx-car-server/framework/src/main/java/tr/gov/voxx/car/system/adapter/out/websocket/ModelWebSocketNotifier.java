package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.ModelCreatedEvent;
import tr.gov.voxx.car.system.domain.event.ModelDeletedEvent;
import tr.gov.voxx.car.system.domain.event.ModelUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ModelWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyModelCreated(ModelCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/model",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyModelUpdated(ModelUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/model",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyModelDeleted(ModelDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/model",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
