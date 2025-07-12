package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;

public interface IletisimPersistenceJpaPort extends PersistenceJpaExecutor<Iletisim, IletisimId> {
    List<Iletisim> findFirmaIdGetAll(String firmaId);

}
