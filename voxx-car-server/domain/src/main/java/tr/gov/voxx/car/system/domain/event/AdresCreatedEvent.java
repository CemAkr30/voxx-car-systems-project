package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record AdresCreatedEvent(AdresId id, String aciklama, AdresTipi tip, FirmaId firmaId) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public AdresCreatedEvent(
            @JsonProperty("id") AdresId id,
            @JsonProperty("aciklama") String aciklama,
            @JsonProperty("tip") AdresTipi tip,
            @JsonProperty("firmaId") FirmaId firmaId) {
        this.id = id;
        this.aciklama = aciklama;
        this.tip = tip;
        this.firmaId = firmaId;
    }
}

