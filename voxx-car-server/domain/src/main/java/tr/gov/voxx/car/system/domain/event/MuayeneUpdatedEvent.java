package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record MuayeneUpdatedEvent(
        MuayeneId id,
        AracFiloId aracFiloId,
        MuayeneTipi muayeneTipi,
        String makbuzNo,
        FirmaId odeyenFirmaId,
        Instant baslangicTarihi,
        Instant bitisTarihi,
        String gecikmeCezasi,
        String not,
        String yeri,
        Double miktar,
        OdemeTipi odemeTipi,
        Boolean odendi
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public MuayeneUpdatedEvent(
            @JsonProperty("id") MuayeneId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("muayeneTipi") MuayeneTipi muayeneTipi,
            @JsonProperty("makbuzNo") String makbuzNo,
            @JsonProperty("odeyenFirmaId") FirmaId odeyenFirmaId,
            @JsonProperty("baslangicTarihi") Instant baslangicTarihi,
            @JsonProperty("bitisTarihi") Instant bitisTarihi,
            @JsonProperty("gecikmeCezasi") String gecikmeCezasi,
            @JsonProperty("not") String not,
            @JsonProperty("yeri") String yeri,
            @JsonProperty("miktar") Double miktar,
            @JsonProperty("odemeTipi") OdemeTipi odemeTipi,
            @JsonProperty("odendi") Boolean odendi
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.muayeneTipi = muayeneTipi;
        this.makbuzNo = makbuzNo;
        this.odeyenFirmaId = odeyenFirmaId;
        this.baslangicTarihi = baslangicTarihi;
        this.bitisTarihi = bitisTarihi;
        this.gecikmeCezasi = gecikmeCezasi;
        this.not = not;
        this.yeri = yeri;
        this.miktar = miktar;
        this.odemeTipi = odemeTipi;
        this.odendi = odendi;
    }
}

