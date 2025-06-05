package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

public interface MuayeneApplicationCommandPort extends UseCaseExecutor<Muayene, MuayeneId> {
}
