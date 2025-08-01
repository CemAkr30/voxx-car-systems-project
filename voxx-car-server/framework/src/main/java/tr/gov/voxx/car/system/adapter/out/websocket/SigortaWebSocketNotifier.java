package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.SigortaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class SigortaWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifySigortaCreated(SigortaCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/sigorta",
                Map.of("type", "CREATED", "id", event.aracFiloId()));
    }

    public void notifySigortaUpdated(SigortaUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/sigorta",
                Map.of("type", "UPDATED", "id", event.aracFiloId()));
    }

    public void notifySigortaDeleted(SigortaDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/sigorta",
                Map.of("type", "DELETED", "id", event.aracFiloId()));
    }
}
