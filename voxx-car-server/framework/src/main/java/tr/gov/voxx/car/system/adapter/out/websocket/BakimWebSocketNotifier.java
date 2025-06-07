package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class BakimWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyBakimCreated(BakimCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/bakim",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyBakimUpdated(BakimUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/bakim",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyBakimDeleted(BakimDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/bakim",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
