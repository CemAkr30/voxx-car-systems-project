package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;

public interface AdresApplicationQueryPort extends QueryExecutor<Adres, AdresId> {
    
    List<Adres> findFirmaIdGetAll(String firmaId);
}
