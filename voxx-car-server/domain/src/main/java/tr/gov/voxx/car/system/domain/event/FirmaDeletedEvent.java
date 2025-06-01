package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Builder
@Data
public class FirmaDeletedEvent {
    private final FirmaId id;
}
