package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serializable;

@Builder
@Data
public class FirmaDeletedEvent implements Serializable {
    private final FirmaId id;
}
