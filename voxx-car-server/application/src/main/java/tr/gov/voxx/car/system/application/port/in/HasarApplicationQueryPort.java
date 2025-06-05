package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

public interface HasarApplicationQueryPort extends QueryExecutor<Hasar, HasarId> {
}
