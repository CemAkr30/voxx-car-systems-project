package tr.gov.voxx.car.system.adapter.out.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiUpdatedEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AlisFaturasiWebSocketNotifier {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyAlisFaturasiCreated(AlisFaturasiCreatedEvent event) {
        messagingTemplate.convertAndSend("/topic/alisFaturasi",
                Map.of("type", "CREATED", "id", event.aracFiloId()));
    }

    public void notifyAlisFaturasiUpdated(AlisFaturasiUpdatedEvent event) {
        messagingTemplate.convertAndSend("/topic/alisFaturasi",
                Map.of("type", "UPDATED", "id", event.aracFiloId()));
    }

    public void notifyAlisFaturasiDeleted(AlisFaturasiDeletedEvent event) {
        messagingTemplate.convertAndSend("/topic/alisFaturasi",
                Map.of("type", "DELETED", "id", event.aracFiloId()));
    }
}
