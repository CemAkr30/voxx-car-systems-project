package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;

public interface HasarApplicationQueryPort extends QueryExecutor<Hasar, HasarId> {
    List<Hasar> findAracIdGetAll(String aracId);
}
