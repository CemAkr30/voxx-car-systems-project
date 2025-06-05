package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

public interface AlisFaturasiPersistenceJpaPort extends PersistenceJpaExecutor<AlisFaturasi, AlisFaturasiId> {

}
