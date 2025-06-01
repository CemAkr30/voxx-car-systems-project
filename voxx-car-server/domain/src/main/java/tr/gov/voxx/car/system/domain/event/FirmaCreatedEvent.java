package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Builder
@Data
public class FirmaCreatedEvent {
    private final FirmaId id;
    private final String email;
    private final String unvan;
    private final String vergiNo;
}
