package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record AracFiloCreatedEvent(
        AracFiloId id,
        String plaka,
        MarkaId markaId,
        ModelId modelId,
        String modelYili,
        String aracTipi,
        String segment,
        String motorNo,
        String sasiNo,
        String renk,
        String kasaTipi,
        String lastikTipi,
        Instant filoyaGirisTarihi,
        String filoyaGirisKm,
        Instant tescilTarihi,
        Instant trafigeCikisTarihi,
        boolean garantisiVarMi,
        Instant garantiBitisTarihi,
        String garantiSuresiYil,
        String garantiKm,
        boolean tramer,
        Double tramerTutari,
        Instant sonKmTarihi,
        String sonKm,
        String sonYakitMiktari,
        boolean kiralandiMi,
        Instant kiralandigiTarih,
        String kontratSuresi,
        Instant kiralikBitisTarihi,
        FirmaId kiralayanFirmaId,
        Integer filoDurum
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public AracFiloCreatedEvent(
            @JsonProperty("id") AracFiloId id,
            @JsonProperty("plaka") String plaka,
            @JsonProperty("markaId") MarkaId markaId,
            @JsonProperty("modelId") ModelId modelId,
            @JsonProperty("modelYili") String modelYili,
            @JsonProperty("aracTipi") String aracTipi,
            @JsonProperty("segment") String segment,
            @JsonProperty("motorNo") String motorNo,
            @JsonProperty("sasiNo") String sasiNo,
            @JsonProperty("renk") String renk,
            @JsonProperty("kasaTipi") String kasaTipi,
            @JsonProperty("lastikTipi") String lastikTipi,
            @JsonProperty("filoyaGirisTarihi") Instant filoyaGirisTarihi,
            @JsonProperty("filoyaGirisKm") String filoyaGirisKm,
            @JsonProperty("tescilTarihi") Instant tescilTarihi,
            @JsonProperty("trafigeCikisTarihi") Instant trafigeCikisTarihi,
            @JsonProperty("garantisiVarMi") boolean garantisiVarMi,
            @JsonProperty("garantiBitisTarihi") Instant garantiBitisTarihi,
            @JsonProperty("garantiSuresiYil") String garantiSuresiYil,
            @JsonProperty("garantiKm") String garantiKm,
            @JsonProperty("tramer") boolean tramer,
            @JsonProperty("tramerTutari") Double tramerTutari,
            @JsonProperty("sonKmTarihi") Instant sonKmTarihi,
            @JsonProperty("sonKm") String sonKm,
            @JsonProperty("sonYakitMiktari") String sonYakitMiktari,
            @JsonProperty("kiralandiMi") boolean kiralandiMi,
            @JsonProperty("kiralandigiTarih") Instant kiralandigiTarih,
            @JsonProperty("kontratSuresi") String kontratSuresi,
            @JsonProperty("kiralikBitisTarihi") Instant kiralikBitisTarihi,
            @JsonProperty("kiralayanFirmaId") FirmaId kiralayanFirmaId,
            @JsonProperty("filoDurum") Integer filoDurum
    ) {
        this.id = id;
        this.plaka = plaka;
        this.markaId = markaId;
        this.modelId = modelId;
        this.modelYili = modelYili;
        this.aracTipi = aracTipi;
        this.segment = segment;
        this.motorNo = motorNo;
        this.sasiNo = sasiNo;
        this.renk = renk;
        this.kasaTipi = kasaTipi;
        this.lastikTipi = lastikTipi;
        this.filoyaGirisTarihi = filoyaGirisTarihi;
        this.filoyaGirisKm = filoyaGirisKm;
        this.tescilTarihi = tescilTarihi;
        this.trafigeCikisTarihi = trafigeCikisTarihi;
        this.garantisiVarMi = garantisiVarMi;
        this.garantiBitisTarihi = garantiBitisTarihi;
        this.garantiSuresiYil = garantiSuresiYil;
        this.garantiKm = garantiKm;
        this.tramer = tramer;
        this.tramerTutari = tramerTutari;
        this.sonKmTarihi = sonKmTarihi;
        this.sonKm = sonKm;
        this.sonYakitMiktari = sonYakitMiktari;
        this.kiralandiMi = kiralandiMi;
        this.kiralandigiTarih = kiralandigiTarih;
        this.kontratSuresi = kontratSuresi;
        this.kiralikBitisTarihi = kiralikBitisTarihi;
        this.kiralayanFirmaId = kiralayanFirmaId;
        this.filoDurum = filoDurum;
    }
}

