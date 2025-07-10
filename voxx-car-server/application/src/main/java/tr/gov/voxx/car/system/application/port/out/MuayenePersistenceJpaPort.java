package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;

public interface MuayenePersistenceJpaPort extends PersistenceJpaExecutor<Muayene, MuayeneId> {
    List<Muayene> findAracIdGetAll(String aracId);

}
