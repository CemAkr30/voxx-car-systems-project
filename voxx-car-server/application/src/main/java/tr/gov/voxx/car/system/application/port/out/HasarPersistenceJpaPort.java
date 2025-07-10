package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;

public interface HasarPersistenceJpaPort extends PersistenceJpaExecutor<Hasar, HasarId> {
    List<Hasar> findAracIdGetAll(String aracId);

}
