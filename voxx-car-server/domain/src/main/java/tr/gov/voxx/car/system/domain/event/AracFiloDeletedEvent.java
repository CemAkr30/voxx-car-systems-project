package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.io.Serializable;

@Builder
@Data
public class AracFiloDeletedEvent implements Serializable {
    private final AracFiloId id;
}
