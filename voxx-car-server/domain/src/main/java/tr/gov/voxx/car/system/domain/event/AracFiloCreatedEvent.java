package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.time.LocalDateTime;

@Data
@Builder
public class AracFiloCreatedEvent {
    private final AracFiloId id;
    private final String plaka;
    private final String markaId;
    private final String modelId;
    private final String modelYili;
    private final String aracTipi;
    private final String segment;
    private final String motorNo;
    private final String sasiNo;
    private final String renk;
    private final String kasaTipi;
    private final String lastikTipi;
    private final LocalDateTime filoyaGirisTarihi;
    private final String filoyaGirisKm;
    private final LocalDateTime tescilTarihi;
    private final LocalDateTime trafigeCikisTarihi;
    private final boolean garantisiVarMi;
    private final LocalDateTime garantiBitisTarihi;
    private final String garantiSuresiYil;
    private final String garantiKm;
    private final boolean tramer;
    private final Double tramerTutari;
    private final LocalDateTime sonKmTarihi;
    private final String sonKm;
    private final String sonYakitMiktari;
    private final boolean kiralandiMi;
    private final LocalDateTime kiralandigiTarih;
    private final String kontratSuresi;
    private final LocalDateTime kiralikBitisTarihi;
    private final String kiralayanFirmaId;
    private final Integer filoDurum;
}
