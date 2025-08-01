package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.FilodanCikisCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class FilodanCikisWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyFilodanCikisCreated(FilodanCikisCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/filodanCikis",
                Map.of("type", "CREATED", "id", event.aracFiloId()));
    }

    public void notifyFilodanCikisUpdated(FilodanCikisUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/filodanCikis",
                Map.of("type", "UPDATED", "id", event.aracFiloId()));
    }

    public void notifyFilodanCikisDeleted(FilodanCikisDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/filodanCikis",
                Map.of("type", "DELETED", "id", event.aracFiloId()));
    }
}
