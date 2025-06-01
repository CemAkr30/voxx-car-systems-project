package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

public interface FirmaPersistenceJpaPort extends PersistenceJpaExecutor<Firma, FirmaId> {

}
