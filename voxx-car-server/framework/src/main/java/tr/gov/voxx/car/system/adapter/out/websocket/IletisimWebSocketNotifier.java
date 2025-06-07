package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.IletisimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class IletisimWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyIletisimCreated(IletisimCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/iletisim",
                Map.of("type", "CREATED", "id", event.id()));
    }

    public void notifyIletisimUpdated(IletisimUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/iletisim",
                Map.of("type", "UPDATED", "id", event.id()));
    }

    public void notifyIletisimDeleted(IletisimDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/iletisim",
                Map.of("type", "DELETED", "id", event.id()));
    }
}
