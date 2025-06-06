package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record MarkaUpdatedEvent(
        MarkaId id,
        String adi
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public MarkaUpdatedEvent(
            @JsonProperty("id") MarkaId id,
            @JsonProperty("adi") String adi
    ) {
        this.id = id;
        this.adi = adi;
    }
}
