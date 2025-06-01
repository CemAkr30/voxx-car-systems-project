package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

@Data
@Builder
public class KazaDeletedEvent {
    private final KazaId id;
}
