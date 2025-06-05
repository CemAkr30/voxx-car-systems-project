package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.Cinsiyet;
import tr.gov.voxx.car.system.domain.enumeration.EhliyetTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;

@Getter
@SuperBuilder(toBuilder = true)
public class AracKullanan extends AbstractAggregateModel<AracKullananId> {

    private String ad;
    private String soyad;
    private String email;
    private String telefonNo;
    private String adres;
    private String ehliyetNo;
    private EhliyetTipi ehliyetTipi;
    private String ehliyetOn;
    private String ehliyetArka;
    private Instant ehliyetBitisTarihi;
    private Cinsiyet cinsiyetTipi;
    private FirmaId firmaId;

    public void initIdGenerator() {
        super.setId(new AracKullananId(IdFactory.create()));
    }

    public void updateFrom(AracKullanan other) {
        this.ad = other.ad;
        this.soyad = other.soyad;
        this.email = other.email;
        this.telefonNo = other.telefonNo;
        this.adres = other.adres;
        this.ehliyetNo = other.ehliyetNo;
        this.ehliyetTipi = other.ehliyetTipi;
        this.ehliyetOn = other.ehliyetOn;
        this.ehliyetArka = other.ehliyetArka;
        this.ehliyetBitisTarihi = other.ehliyetBitisTarihi;
        this.cinsiyetTipi = other.cinsiyetTipi;
        this.firmaId = other.firmaId;
    }
}