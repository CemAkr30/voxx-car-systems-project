package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record ModelUpdatedEvent(
        ModelId id,
        String adi,
        MarkaId markaId
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public ModelUpdatedEvent(
            @JsonProperty("id") ModelId id,
            @JsonProperty("adi") String adi,
            @JsonProperty("markaId") MarkaId markaId
    ) {
        this.id = id;
        this.adi = adi;
        this.markaId = markaId;
    }
}

