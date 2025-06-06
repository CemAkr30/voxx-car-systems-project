package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.HasarTipi;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record HasarCreatedEvent(
        HasarId id,
        AracFiloId aracFiloId,
        HasarliParca hasarliParca,
        HasarTipi hasarTipi
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public HasarCreatedEvent(
            @JsonProperty("id") HasarId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("hasarliParca") HasarliParca hasarliParca,
            @JsonProperty("hasarTipi") HasarTipi hasarTipi
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.hasarliParca = hasarliParca;
        this.hasarTipi = hasarTipi;
    }
}


