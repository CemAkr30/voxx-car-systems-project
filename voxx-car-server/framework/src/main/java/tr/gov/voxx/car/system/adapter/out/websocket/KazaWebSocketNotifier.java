package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.KazaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.KazaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.KazaUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class KazaWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyKazaCreated(KazaCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/kaza",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyKazaUpdated(KazaUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/kaza",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyKazaDeleted(KazaDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/kaza",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
