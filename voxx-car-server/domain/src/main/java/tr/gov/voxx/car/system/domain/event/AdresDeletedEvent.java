package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

@Builder
@Data
public class AdresDeletedEvent {
    private final AdresId id;
}
