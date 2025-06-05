package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.time.Instant;

@Data
@Builder
public class AracFiloCreatedEvent {
    private final AracFiloId id;
    private final String plaka;
    private final MarkaId markaId;
    private final ModelId modelId;
    private final String modelYili;
    private final String aracTipi;
    private final String segment;
    private final String motorNo;
    private final String sasiNo;
    private final String renk;
    private final String kasaTipi;
    private final String lastikTipi;
    private final Instant filoyaGirisTarihi;
    private final String filoyaGirisKm;
    private final Instant tescilTarihi;
    private final Instant trafigeCikisTarihi;
    private final boolean garantisiVarMi;
    private final Instant garantiBitisTarihi;
    private final String garantiSuresiYil;
    private final String garantiKm;
    private final boolean tramer;
    private final Double tramerTutari;
    private final Instant sonKmTarihi;
    private final String sonKm;
    private final String sonYakitMiktari;
    private final boolean kiralandiMi;
    private final Instant kiralandigiTarih;
    private final String kontratSuresi;
    private final Instant kiralikBitisTarihi;
    private final FirmaId kiralayanFirmaId;
    private final Integer filoDurum;
}
