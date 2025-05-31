package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.io.Serializable;

@Builder
@Data
public class ModelDeletedEvent implements Serializable {
    private final ModelId id;
}
