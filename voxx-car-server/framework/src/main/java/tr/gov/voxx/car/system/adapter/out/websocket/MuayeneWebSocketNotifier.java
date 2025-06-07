package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.MuayeneCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MuayeneWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyMuayeneCreated(MuayeneCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/muayene",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyMuayeneUpdated(MuayeneUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/muayene",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyMuayeneDeleted(MuayeneDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/muayene",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
