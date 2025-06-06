package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record KazaUpdatedEvent(
        KazaId id,
        AracFiloId aracId,
        FirmaId firmaId,
        String musteriId,
        Instant kazaTarihi,
        String kazaIli,
        String kazaNedeni,
        String kazaTutanagi,
        String onarimDurumu,
        FirmaId odeyenFirmaId
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public KazaUpdatedEvent(
            @JsonProperty("id") KazaId id,
            @JsonProperty("aracId") AracFiloId aracId,
            @JsonProperty("firmaId") FirmaId firmaId,
            @JsonProperty("musteriId") String musteriId,
            @JsonProperty("kazaTarihi") Instant kazaTarihi,
            @JsonProperty("kazaIli") String kazaIli,
            @JsonProperty("kazaNedeni") String kazaNedeni,
            @JsonProperty("kazaTutanagi") String kazaTutanagi,
            @JsonProperty("onarimDurumu") String onarimDurumu,
            @JsonProperty("odeyenFirmaId") FirmaId odeyenFirmaId
    ) {
        this.id = id;
        this.aracId = aracId;
        this.firmaId = firmaId;
        this.musteriId = musteriId;
        this.kazaTarihi = kazaTarihi;
        this.kazaIli = kazaIli;
        this.kazaNedeni = kazaNedeni;
        this.kazaTutanagi = kazaTutanagi;
        this.onarimDurumu = onarimDurumu;
        this.odeyenFirmaId = odeyenFirmaId;
    }
}

