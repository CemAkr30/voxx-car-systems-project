package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.io.Serializable;

@Builder
@Data
public class SigortaDeletedEvent implements Serializable {
    private final SigortaId id;
}
