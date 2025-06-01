package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
public class AracFilo extends AbstractAggregateModel<AracFiloId> {

    private String plaka;
    private String markaId;
    private String modelId;
    private String modelYili;
    private String aracTipi;
    private String segment;
    private String motorNo;
    private String sasiNo;
    private String renk;
    private String kasaTipi;
    private String lastikTipi;
    private LocalDateTime filoyaGirisTarihi;
    private String filoyaGirisKm;
    private LocalDateTime tescilTarihi;
    private LocalDateTime trafigeCikisTarihi;
    private boolean garantisiVarMi;
    private LocalDateTime garantiBitisTarihi;
    private String garantiSuresiYil;
    private String garantiKm;
    private boolean tramer;
    private Double tramerTutari;
    private LocalDateTime sonKmTarihi;
    private String sonKm;
    private String sonYakitMiktari;
    private boolean kiralandiMi;
    private LocalDateTime kiralandigiTarih;
    private String kontratSuresi;
    private LocalDateTime kiralikBitisTarihi;
    private String kiralayanFirmaId;
    private Integer filoDurum;

    public void initIdGenerator() {
        super.setId(new AracFiloId(IdFactory.create()));
    }

    public void updateFrom(AracFilo other) {
        this.plaka = other.plaka;
        this.markaId = other.markaId;
        this.modelId = other.modelId;
        this.modelYili = other.modelYili;
        this.aracTipi = other.aracTipi;
        this.segment = other.segment;
        this.motorNo = other.motorNo;
        this.sasiNo = other.sasiNo;
        this.renk = other.renk;
        this.kasaTipi = other.kasaTipi;
        this.lastikTipi = other.lastikTipi;
        this.filoyaGirisTarihi = other.filoyaGirisTarihi;
        this.filoyaGirisKm = other.filoyaGirisKm;
        this.tescilTarihi = other.tescilTarihi;
        this.trafigeCikisTarihi = other.trafigeCikisTarihi;
        this.garantisiVarMi = other.garantisiVarMi;
        this.garantiBitisTarihi = other.garantiBitisTarihi;
        this.garantiSuresiYil = other.garantiSuresiYil;
        this.garantiKm = other.garantiKm;
        this.tramer = other.tramer;
        this.tramerTutari = other.tramerTutari;
        this.sonKmTarihi = other.sonKmTarihi;
        this.sonKm = other.sonKm;
        this.sonYakitMiktari = other.sonYakitMiktari;
        this.kiralandiMi = other.kiralandiMi;
        this.kiralandigiTarih = other.kiralandigiTarih;
        this.kontratSuresi = other.kontratSuresi;
        this.kiralikBitisTarihi = other.kiralikBitisTarihi;
        this.kiralayanFirmaId = other.kiralayanFirmaId;
        this.filoDurum = other.filoDurum;
    }
}
