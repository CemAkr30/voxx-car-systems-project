package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record BakimUpdatedEvent(
        BakimId id,
        AracFiloId aracFiloId,
        String bakimNedeni,
        String parca,
        Double parcaTutari,
        Double iscilikTutari,
        Double toplamTutar,
        String faturaNo,
        String fatura,
        String notlar,
        FirmaId odeyenFirmaId
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public BakimUpdatedEvent(
            @JsonProperty("id") BakimId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("bakimNedeni") String bakimNedeni,
            @JsonProperty("parca") String parca,
            @JsonProperty("parcaTutari") Double parcaTutari,
            @JsonProperty("iscilikTutari") Double iscilikTutari,
            @JsonProperty("toplamTutar") Double toplamTutar,
            @JsonProperty("faturaNo") String faturaNo,
            @JsonProperty("fatura") String fatura,
            @JsonProperty("notlar") String notlar,
            @JsonProperty("odeyenFirmaId") FirmaId odeyenFirmaId
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.bakimNedeni = bakimNedeni;
        this.parca = parca;
        this.parcaTutari = parcaTutari;
        this.iscilikTutari = iscilikTutari;
        this.toplamTutar = toplamTutar;
        this.faturaNo = faturaNo;
        this.fatura = fatura;
        this.notlar = notlar;
        this.odeyenFirmaId = odeyenFirmaId;
    }
}
