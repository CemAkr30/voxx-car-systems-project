package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record AlisFaturasiUpdatedEvent(
        AlisFaturasiId id,
        AracFiloId aracFiloId,
        Instant alisFaturasiTarihi,
        String alisFaturaNo,
        FirmaId saticiFirmaId,
        Double listeFiyati,
        Integer ekGaranti,
        Double malDegeri,
        Double iskonto,
        Double nakliyeBedeli,
        Double otvMatrah,
        Double otv,
        Double otvIndirimi,
        Double kdv,
        Double faturaToplam,
        ParaBirimi paraBirimi,
        String gecikmeCezasi,
        Double kur,
        Double faturaTry,
        String faturaYukle,
        String aciklama
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public AlisFaturasiUpdatedEvent(
            @JsonProperty("id") AlisFaturasiId id,
            @JsonProperty("aracFiloId") AracFiloId aracFiloId,
            @JsonProperty("alisFaturasiTarihi") Instant alisFaturasiTarihi,
            @JsonProperty("alisFaturaNo") String alisFaturaNo,
            @JsonProperty("saticiFirmaId") FirmaId saticiFirmaId,
            @JsonProperty("listeFiyati") Double listeFiyati,
            @JsonProperty("ekGaranti") Integer ekGaranti,
            @JsonProperty("malDegeri") Double malDegeri,
            @JsonProperty("iskonto") Double iskonto,
            @JsonProperty("nakliyeBedeli") Double nakliyeBedeli,
            @JsonProperty("otvMatrah") Double otvMatrah,
            @JsonProperty("otv") Double otv,
            @JsonProperty("otvIndirimi") Double otvIndirimi,
            @JsonProperty("kdv") Double kdv,
            @JsonProperty("faturaToplam") Double faturaToplam,
            @JsonProperty("paraBirimi") ParaBirimi paraBirimi,
            @JsonProperty("gecikmeCezasi") String gecikmeCezasi,
            @JsonProperty("kur") Double kur,
            @JsonProperty("faturaTry") Double faturaTry,
            @JsonProperty("faturaYukle") String faturaYukle,
            @JsonProperty("aciklama") String aciklama
    ) {
        this.id = id;
        this.aracFiloId = aracFiloId;
        this.alisFaturasiTarihi = alisFaturasiTarihi;
        this.alisFaturaNo = alisFaturaNo;
        this.saticiFirmaId = saticiFirmaId;
        this.listeFiyati = listeFiyati;
        this.ekGaranti = ekGaranti;
        this.malDegeri = malDegeri;
        this.iskonto = iskonto;
        this.nakliyeBedeli = nakliyeBedeli;
        this.otvMatrah = otvMatrah;
        this.otv = otv;
        this.otvIndirimi = otvIndirimi;
        this.kdv = kdv;
        this.faturaToplam = faturaToplam;
        this.paraBirimi = paraBirimi;
        this.gecikmeCezasi = gecikmeCezasi;
        this.kur = kur;
        this.faturaTry = faturaTry;
        this.faturaYukle = faturaYukle;
        this.aciklama = aciklama;
    }
}
