package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.SigortaTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record SigortaUpdatedEvent(
        SigortaId id,
        AracFiloId aracFiloId,
        SigortaTipi tip,
        String sigortaSirketi,
        String acente,
        String policeNo,
        Instant baslangicTarihi,
        Instant bitisTarihi
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public SigortaUpdatedEvent(
            @JsonProperty("id") SigortaId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("tip") SigortaTipi tip,
            @JsonProperty("sigortaSirketi") String sigortaSirketi,
            @JsonProperty("acente") String acente,
            @JsonProperty("policeNo") String policeNo,
            @JsonProperty("baslangicTarihi") Instant baslangicTarihi,
            @JsonProperty("bitisTarihi") Instant bitisTarihi
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.tip = tip;
        this.sigortaSirketi = sigortaSirketi;
        this.acente = acente;
        this.policeNo = policeNo;
        this.baslangicTarihi = baslangicTarihi;
        this.bitisTarihi = bitisTarihi;
    }
}

