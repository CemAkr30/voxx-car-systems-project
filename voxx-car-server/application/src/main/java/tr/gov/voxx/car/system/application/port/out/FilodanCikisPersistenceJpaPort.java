package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;

public interface FilodanCikisPersistenceJpaPort extends PersistenceJpaExecutor<FilodanCikis, FilodanCikisId> {
    List<FilodanCikis> findAracIdGetAll(String aracId);

}
