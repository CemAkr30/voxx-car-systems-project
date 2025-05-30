package tr.gov.voxx.car.system.entity;

import lombok.Getter;
import tr.gov.voxx.car.system.valueobject.AracId;
import tr.gov.voxx.car.system.valueobject.FirmaId;
import tr.gov.voxx.car.system.valueobject.MarkaId;
import tr.gov.voxx.car.system.valueobject.ModelId;

import java.time.LocalDateTime;

@Getter
public class AracFilo extends AbstractAggregateModel<AracId> {
    private String plaka;
    private MarkaId markaId;
    private ModelId modelId;
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
    private LocalDateTime sonKmTarihi;
    private String sonKm;
    private String sonYakitMiktari;
    private boolean kiralandiMi;
    private LocalDateTime kiralandigiTarih;
    private String kontratSuresi;
    private LocalDateTime kiralikBitisTarihi;
    private FirmaId kiralayanFirmaId;
    private int filoDurum;
}
