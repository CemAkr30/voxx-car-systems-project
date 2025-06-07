package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AracFiloWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyAracFiloCreated(AracFiloCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracFilo",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyAracFiloUpdated(AracFiloUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracFilo",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyAracFiloDeleted(AracFiloDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracFilo",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
