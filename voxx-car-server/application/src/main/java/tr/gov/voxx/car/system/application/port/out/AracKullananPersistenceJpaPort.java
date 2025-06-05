package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

public interface AracKullananPersistenceJpaPort extends PersistenceJpaExecutor<AracKullanan, AracKullananId> {
}
