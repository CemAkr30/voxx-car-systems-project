package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.IletisimTipi;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

@Builder
@Data
public class IletisimCreatedEvent {
    private final IletisimId id;
    private final String numara;
    private final IletisimTipi tip;
    private final FirmaId firmaId;
}
