package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

@Data
@Builder
public class AracKullananDeletedEvent {
    private final AracKullananId id;

}
