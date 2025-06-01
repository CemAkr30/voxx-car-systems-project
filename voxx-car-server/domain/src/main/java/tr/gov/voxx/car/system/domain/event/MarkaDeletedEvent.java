package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.io.Serializable;

@Builder
@Data
public class MarkaDeletedEvent implements Serializable {
    private final MarkaId id;
}
