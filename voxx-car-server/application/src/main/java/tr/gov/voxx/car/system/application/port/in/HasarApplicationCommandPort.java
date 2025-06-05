package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

public interface HasarApplicationCommandPort extends UseCaseExecutor<Hasar, HasarId> {
}
