package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

public interface FirmaDokumanDetayApplicationQueryPort extends QueryExecutor<FirmaDokumanDetay, FirmaDokumanDetayId> {

    List<FirmaDokumanDetay> findFirmaIdGetAll(String firmaId);
}
