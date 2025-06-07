package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.MarkaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MarkaWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyMarkaCreated(MarkaCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/marka",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyMarkaUpdated(MarkaUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/marka",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyMarkaDeleted(MarkaDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/marka",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
