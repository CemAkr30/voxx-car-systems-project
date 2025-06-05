package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.HasarTipi;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.io.Serializable;

@Builder
@Data
public class HasarUpdatedEvent implements Serializable {
    private final HasarId id;
    private final AracFiloId aracFiloId;
    private final HasarliParca hasarliParca;
    private final HasarTipi hasarTipi;
}

