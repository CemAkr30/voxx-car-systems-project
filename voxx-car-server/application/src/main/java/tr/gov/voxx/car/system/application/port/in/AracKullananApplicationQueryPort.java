package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;

public interface AracKullananApplicationQueryPort extends QueryExecutor<AracKullanan, AracKullananId> {
    List<AracKullanan> findFirmaIdGetAll(String firmaId);
}
