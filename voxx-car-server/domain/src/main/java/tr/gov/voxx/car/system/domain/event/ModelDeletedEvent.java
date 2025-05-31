package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

@Builder
@Data
public class ModelDeletedEvent {
    private final ModelId id;
}
