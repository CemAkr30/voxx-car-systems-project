package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;
import java.util.Optional;

public interface ModelPersistenceJpaPort extends PersistenceJpaExecutor<Model, ModelId> {

    Optional<Model> findByAdi(String adi);

    List<Model> findMarkaIdGetAll(String markaId);
}
