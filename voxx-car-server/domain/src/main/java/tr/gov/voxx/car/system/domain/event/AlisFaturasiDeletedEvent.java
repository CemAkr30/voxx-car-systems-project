package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

@Builder
@Data
public class AlisFaturasiDeletedEvent {
    private final AlisFaturasiId id;

}
