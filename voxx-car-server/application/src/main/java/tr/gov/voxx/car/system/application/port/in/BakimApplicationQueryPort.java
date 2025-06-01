package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

public interface BakimApplicationQueryPort extends QueryExecutor<Bakim, BakimId> {
}
