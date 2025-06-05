package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.io.Serializable;

@Builder
@Data
public class MTVCreatedEvent implements Serializable {
    private final MtvId id;
    private final AracFiloId aracFiloId;
    private final String yil;
    private final String taksit;
    private final String makbuzNo;
    private final Double miktar;
    private final OdemeTipi odemeTipi;
    private final FirmaId odeyenFirmaId;
    private final String not;
    private final String gecikmeCezasi;
    private final Boolean odendi;

}
