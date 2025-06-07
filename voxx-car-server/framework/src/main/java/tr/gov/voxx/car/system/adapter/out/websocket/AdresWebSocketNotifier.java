package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.AdresCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AdresDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AdresUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AdresWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyAdresCreated(AdresCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/adres",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyAdresUpdated(AdresUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/adres",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyAdresDeleted(AdresDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/adres",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
