package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Builder
@Data
public class AdresCreatedEvent {
    private final AdresId id;
    private final String aciklama;
    private final AdresTipi tip;
    private final FirmaId firmaId;
}
