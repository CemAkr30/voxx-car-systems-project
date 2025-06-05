package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

@Data
@Builder
public class FilodanCikisDeletedEvent {
    private final FilodanCikisId id;
}
