package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

@Builder
@Data
public class MarkaDeletedEvent {
    private final MarkaId id;
}
