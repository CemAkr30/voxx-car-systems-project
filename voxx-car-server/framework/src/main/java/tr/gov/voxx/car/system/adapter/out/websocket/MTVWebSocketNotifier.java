package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.MTVCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MTVDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MTVUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MTVWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyMTVCreated(MTVCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/mtv",
                Map.of("type", "CREATED", "id", event.aracFiloId()));
    }

    public void notifyMTVUpdated(MTVUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/mtv",
                Map.of("type", "UPDATED", "id", event.aracFiloId()));
    }

    public void notifyMTVDeleted(MTVDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/mtv",
                Map.of("type", "DELETED", "id", event.aracFiloId()));
    }
}
