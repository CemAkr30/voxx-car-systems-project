package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;

public interface KazaPersistenceJpaPort extends PersistenceJpaExecutor<Kaza, KazaId> {
    List<Kaza> findAracIdGetAll(String aracId);

}
