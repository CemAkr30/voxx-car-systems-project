package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

public interface KazaPersistenceJpaPort extends PersistenceJpaExecutor<Kaza, KazaId> {

}
