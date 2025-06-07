package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.HasarCreatedEvent;
import tr.gov.voxx.car.system.domain.event.HasarDeletedEvent;
import tr.gov.voxx.car.system.domain.event.HasarUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class HasarWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyHasarCreated(HasarCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/hasar",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyHasarUpdated(HasarUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/hasar",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyHasarDeleted(HasarDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/hasar",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
