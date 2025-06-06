package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.FilodanCikisNedeni;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record FilodanCikisCreatedEvent(
        FilodanCikisId id,
        AracFiloId aracFiloId,
        FilodanCikisNedeni filodanCikisNedeni,
        Instant filodanCikisTarihi,
        String alici,
        Double anahtarTeslimFiyati,
        Double aracDevirGiderleri,
        String faturaYukle,
        String not
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public FilodanCikisCreatedEvent(
            @JsonProperty("id") FilodanCikisId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("filodanCikisNedeni") FilodanCikisNedeni filodanCikisNedeni,
            @JsonProperty("filodanCikisTarihi") Instant filodanCikisTarihi,
            @JsonProperty("alici") String alici,
            @JsonProperty("anahtarTeslimFiyati") Double anahtarTeslimFiyati,
            @JsonProperty("aracDevirGiderleri") Double aracDevirGiderleri,
            @JsonProperty("faturaYukle") String faturaYukle,
            @JsonProperty("not") String not
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.filodanCikisNedeni = filodanCikisNedeni;
        this.filodanCikisTarihi = filodanCikisTarihi;
        this.alici = alici;
        this.anahtarTeslimFiyati = anahtarTeslimFiyati;
        this.aracDevirGiderleri = aracDevirGiderleri;
        this.faturaYukle = faturaYukle;
        this.not = not;
    }
}

