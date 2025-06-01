package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

@Data
@Builder
public class BakimDeletedEvent {
    private final BakimId id;
}
