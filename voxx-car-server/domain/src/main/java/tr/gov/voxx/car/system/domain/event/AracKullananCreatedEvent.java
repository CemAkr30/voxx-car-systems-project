package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.Cinsiyet;
import tr.gov.voxx.car.system.domain.enumeration.EhliyetTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Builder
public record AracKullananCreatedEvent(
        AracKullananId id,
        String ad,
        String soyad,
        String email,
        String telefonNo,
        String adres,
        String ehliyetNo,
        EhliyetTipi ehliyetTipi,
        String ehliyetOn,
        String ehliyetArka,
        Instant ehliyetBitisTarihi,
        Cinsiyet cinsiyetTipi,
        FirmaId firmaId
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public AracKullananCreatedEvent(
            @JsonProperty("id") AracKullananId id,
            @JsonProperty("ad") String ad,
            @JsonProperty("soyad") String soyad,
            @JsonProperty("email") String email,
            @JsonProperty("telefonNo") String telefonNo,
            @JsonProperty("adres") String adres,
            @JsonProperty("ehliyetNo") String ehliyetNo,
            @JsonProperty("ehliyetTipi") EhliyetTipi ehliyetTipi,
            @JsonProperty("ehliyetOn") String ehliyetOn,
            @JsonProperty("ehliyetArka") String ehliyetArka,
            @JsonProperty("ehliyetBitisTarihi") Instant ehliyetBitisTarihi,
            @JsonProperty("cinsiyetTipi") Cinsiyet cinsiyetTipi,
            @JsonProperty("firmaId") FirmaId firmaId
    ) {
        this.id = id;
        this.ad = ad;
        this.soyad = soyad;
        this.email = email;
        this.telefonNo = telefonNo;
        this.adres = adres;
        this.ehliyetNo = ehliyetNo;
        this.ehliyetTipi = ehliyetTipi;
        this.ehliyetOn = ehliyetOn;
        this.ehliyetArka = ehliyetArka;
        this.ehliyetBitisTarihi = ehliyetBitisTarihi;
        this.cinsiyetTipi = cinsiyetTipi;
        this.firmaId = firmaId;
    }
}


