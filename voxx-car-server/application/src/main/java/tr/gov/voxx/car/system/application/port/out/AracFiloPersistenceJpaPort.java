package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.common.application.port.out.jpa.PersistenceJpaExecutor;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

public interface AracFiloPersistenceJpaPort extends PersistenceJpaExecutor<AracFilo, AracFiloId> {
    List<AracFilo> findByAktiflikDurumu(boolean isAktif);

    void updateFiloDurum(String aracFiloId, Integer durum);
}
