package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;

public interface SigortaKaskoPersistenceJpaPort extends PersistenceJpaExecutor<SigortaKasko, SigortaId> {
    List<SigortaKasko> findAracFiloIdGetAll(String aracFiloId);
    List<SigortaKasko> findByBitisTarihiBefore(java.time.Instant bitis);

    //Optional<SigortaKasko> findByAdi(String adi);
}
