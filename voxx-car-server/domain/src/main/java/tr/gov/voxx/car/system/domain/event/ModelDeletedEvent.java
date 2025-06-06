package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record ModelDeletedEvent(ModelId id) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public ModelDeletedEvent(
            @JsonProperty("id") ModelId id) {
        this.id = id;
    }
}
