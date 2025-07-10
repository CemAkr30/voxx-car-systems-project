package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;

public interface AlisFaturasiApplicationQueryPort extends QueryExecutor<AlisFaturasi, AlisFaturasiId> {
    List<AlisFaturasi> findAracFiloIdGetAll(String aracFiloId);
}
