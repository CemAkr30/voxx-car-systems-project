package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

public interface FirmaApplicationQueryPort extends QueryExecutor<Firma, FirmaId> {
}
