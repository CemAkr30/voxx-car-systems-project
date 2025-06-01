package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

@Builder
@Data
public class IletisimDeletedEvent {
    private final IletisimId id;
}
