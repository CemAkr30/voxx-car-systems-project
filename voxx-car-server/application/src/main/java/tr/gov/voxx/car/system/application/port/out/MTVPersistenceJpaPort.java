package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;

public interface MTVPersistenceJpaPort extends PersistenceJpaExecutor<Mtv, MtvId> {
    List<Mtv> findAracFiloIdGetAll(String aracFiloId);

}
