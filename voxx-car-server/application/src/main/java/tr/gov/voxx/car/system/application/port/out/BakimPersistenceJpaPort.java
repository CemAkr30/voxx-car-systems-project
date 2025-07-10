package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;

public interface BakimPersistenceJpaPort extends PersistenceJpaExecutor<Bakim, BakimId> {
    List<Bakim> findAracIdGetAll(String aracId);
}
