package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

public interface SigortaKaskoPersistenceJpaPort extends PersistenceJpaExecutor<SigortaKasko, SigortaId> {

    //Optional<SigortaKasko> findByAdi(String adi);
}
