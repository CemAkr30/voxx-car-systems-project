package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;

public interface FilodanCikisApplicationQueryPort extends QueryExecutor<FilodanCikis, FilodanCikisId> {
    List<FilodanCikis> findAracIdGetAll(String aracId);
}
