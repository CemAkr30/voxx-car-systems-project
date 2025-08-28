package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;

public interface AdresPersistenceJpaPort extends PersistenceJpaExecutor<Adres, AdresId> {

    List<Adres> findFirmaIdGetAll(String firmaId);
}
