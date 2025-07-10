package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;

public interface IletisimApplicationQueryPort extends QueryExecutor<Iletisim, IletisimId> {
    List<Iletisim> findFirmaIdGetAll(String firmaId);
}
