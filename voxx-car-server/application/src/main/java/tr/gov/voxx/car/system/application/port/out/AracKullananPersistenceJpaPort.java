package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;

public interface AracKullananPersistenceJpaPort extends PersistenceJpaExecutor<AracKullanan, AracKullananId> {
    List<AracKullanan> findFirmaIdGetAll(String firmaId);
}
