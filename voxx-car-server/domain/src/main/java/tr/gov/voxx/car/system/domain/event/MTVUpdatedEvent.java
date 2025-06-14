package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record MTVUpdatedEvent(
        MtvId id,
        AracFiloId aracFiloId,
        String yil,
        String taksit,
        String makbuzNo,
        Double miktar,
        OdemeTipi odemeTipi,
        FirmaId odeyenFirmaId,
        String not,
        String gecikmeCezasi,
        Boolean odendi
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public MTVUpdatedEvent(
            @JsonProperty("id") MtvId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("yil") String yil,
            @JsonProperty("taksit") String taksit,
            @JsonProperty("makbuzNo") String makbuzNo,
            @JsonProperty("miktar") Double miktar,
            @JsonProperty("odemeTipi") OdemeTipi odemeTipi,
            @JsonProperty("odeyenFirmaId") FirmaId odeyenFirmaId,
            @JsonProperty("not") String not,
            @JsonProperty("gecikmeCezasi") String gecikmeCezasi,
            @JsonProperty("odendi") Boolean odendi
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.yil = yil;
        this.taksit = taksit;
        this.makbuzNo = makbuzNo;
        this.miktar = miktar;
        this.odemeTipi = odemeTipi;
        this.odeyenFirmaId = odeyenFirmaId;
        this.not = not;
        this.gecikmeCezasi = gecikmeCezasi;
        this.odendi = odendi;
    }
}

