package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

public interface AracFirmaDetayPersistenceJpaPort extends PersistenceJpaExecutor<AracFirmaDetay, AracFirmaDetayId> {

    List<AracFirmaDetay> kiralayanFirmalar(AracFiloId aracFiloId);

    List<AracFirmaDetay> kiralananAraclar(FirmaId firmaId);

    List<AracFirmaDetay> kiralanabilirAraclar();

    List<AracFirmaDetay> kiralananAraclarSirali();

    List<AracFirmaDetay> tumDetaylar();
}
