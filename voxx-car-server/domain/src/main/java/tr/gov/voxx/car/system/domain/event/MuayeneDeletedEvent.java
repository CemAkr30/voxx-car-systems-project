package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.io.Serializable;

@Builder
@Data
public class MuayeneDeletedEvent implements Serializable {
    private final MuayeneId id;
}
