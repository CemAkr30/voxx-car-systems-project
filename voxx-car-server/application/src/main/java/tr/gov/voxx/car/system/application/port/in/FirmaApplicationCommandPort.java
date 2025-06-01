package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

public interface FirmaApplicationCommandPort extends UseCaseExecutor<Firma, FirmaId> {
}
