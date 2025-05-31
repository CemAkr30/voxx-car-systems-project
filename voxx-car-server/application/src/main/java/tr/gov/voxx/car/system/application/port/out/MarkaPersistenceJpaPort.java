package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.Optional;

public interface MarkaPersistenceJpaPort extends PersistenceJpaExecutor<Marka, MarkaId> {

    Optional<Marka> findByAdi(String adi);

}
