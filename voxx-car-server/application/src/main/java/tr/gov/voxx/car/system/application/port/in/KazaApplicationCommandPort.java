package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

public interface KazaApplicationCommandPort extends UseCaseExecutor<Kaza, KazaId> {
}
