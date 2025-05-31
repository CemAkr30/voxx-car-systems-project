package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

public interface ModelPersistenceJpaPort extends PersistenceJpaExecutor<Model, ModelId> {
}
