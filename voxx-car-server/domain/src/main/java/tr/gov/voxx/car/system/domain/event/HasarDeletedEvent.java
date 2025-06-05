package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.io.Serializable;

@Builder
@Data
public class HasarDeletedEvent implements Serializable {
    private final HasarId id;
}
