package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record FilodanCikisDeletedEvent(FilodanCikisId id, AracFiloId aracFiloId) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public FilodanCikisDeletedEvent(
            @JsonProperty("id") FilodanCikisId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId) {
        this.id = id;
        this.aracFiloId = aracFiloId;
    }
}
