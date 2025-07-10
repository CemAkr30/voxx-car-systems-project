package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;

public interface AlisFaturasiPersistenceJpaPort extends PersistenceJpaExecutor<AlisFaturasi, AlisFaturasiId> {
    List<AlisFaturasi> findAracFiloIdGetAll(String aracFiloId);

}
