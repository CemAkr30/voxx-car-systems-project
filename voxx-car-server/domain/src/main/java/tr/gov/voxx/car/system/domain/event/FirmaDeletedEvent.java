package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record FirmaDeletedEvent(FirmaId id) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public FirmaDeletedEvent(
            @JsonProperty("id") FirmaId id) {
        this.id = id;
    }
}
