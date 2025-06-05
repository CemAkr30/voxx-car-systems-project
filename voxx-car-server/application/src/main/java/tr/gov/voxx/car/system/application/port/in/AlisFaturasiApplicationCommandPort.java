package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

public interface AlisFaturasiApplicationCommandPort extends UseCaseExecutor<AlisFaturasi, AlisFaturasiId> {
}
