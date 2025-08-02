package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.AracKullananCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AracKullananWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyAracKullananCreated(AracKullananCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracKullanan",
                Map.of("type", "CREATED", "id", event.firmaId()));
    }

    public void notifyAracKullananUpdated(AracKullananUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracKullanan",
                Map.of("type", "UPDATED", "id", event.firmaId()));
    }

    public void notifyAracKullananDeleted(AracKullananDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/aracKullanan",
                Map.of("type", "DELETED", "id", event.firmaId()));
    }
}
