package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.io.Serializable;

@Builder
@Data
public class MTVDeletedEvent implements Serializable {
    private final MtvId id;
}
