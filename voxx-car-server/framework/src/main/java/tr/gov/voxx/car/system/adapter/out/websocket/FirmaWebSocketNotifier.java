package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.FirmaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class FirmaWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyFirmaCreated(FirmaCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/firma",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyFirmaUpdated(FirmaUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/firma",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyFirmaDeleted(FirmaDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/firma",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
