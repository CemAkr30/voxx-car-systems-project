package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.io.Serializable;
import java.time.LocalDateTime;

@Builder
@Data
public class MuayeneCreatedEvent implements Serializable {
    private final MuayeneId id;
    private final AracFiloId aracFiloId;
    private final MuayeneTipi muayeneTipi;
    private final String makbuzNo;
    private final FirmaId odeyenFirmaId;
    private final LocalDateTime baslangicTarihi;
    private final LocalDateTime bitisTarihi;
    private final String gecikmeCezasi;
    private final String not;
    private final String yeri;
    private final Double miktar;
    private final OdemeTipi odemeTipi;
    private final Boolean odendi;
}

