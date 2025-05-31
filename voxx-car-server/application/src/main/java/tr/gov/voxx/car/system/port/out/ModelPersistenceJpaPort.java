package tr.gov.voxx.car.system.port.out;

import tr.gov.voxx.car.server.BasePersistenceJpaService;
import tr.gov.voxx.car.system.entity.Model;
import tr.gov.voxx.car.system.valueobject.ModelId;

public interface ModelPersistenceJpaPort extends BasePersistenceJpaService<Model, ModelId> {
}
