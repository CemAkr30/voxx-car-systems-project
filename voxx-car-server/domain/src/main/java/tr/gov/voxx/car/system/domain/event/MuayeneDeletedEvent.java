package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record MuayeneDeletedEvent(MuayeneId id) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public MuayeneDeletedEvent(
            @JsonProperty("id") MuayeneId id) {
        this.id = id;
    }
}
