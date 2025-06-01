package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

public interface IletisimApplicationCommandPort extends UseCaseExecutor<Iletisim, IletisimId> {
}
