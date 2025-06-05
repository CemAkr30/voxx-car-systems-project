package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.Cinsiyet;
import tr.gov.voxx.car.system.domain.enumeration.EhliyetTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;

@Data
@Builder
public class AracKullananUpdatedEvent {
    private final AracKullananId id;
    private final String ad;
    private final String soyad;
    private final String email;
    private final String telefonNo;
    private final String adres;
    private final String ehliyetNo;
    private final EhliyetTipi ehliyetTipi;
    private final String ehliyetOn;
    private final String ehliyetArka;
    private final Instant ehliyetBitisTarihi;
    private final Cinsiyet cinsiyetTipi;
    private final FirmaId firmaId;
}
