package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

public interface KazaApplicationQueryPort extends QueryExecutor<Kaza, KazaId> {
}
