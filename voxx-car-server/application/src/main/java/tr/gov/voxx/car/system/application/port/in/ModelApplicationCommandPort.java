package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

public interface ModelApplicationCommandPort extends UseCaseExecutor<Model, ModelId> {
}
