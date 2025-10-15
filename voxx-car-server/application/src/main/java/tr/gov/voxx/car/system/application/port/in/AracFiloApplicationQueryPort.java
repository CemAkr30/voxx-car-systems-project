package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

public interface AracFiloApplicationQueryPort extends QueryExecutor<AracFilo, AracFiloId> {
    List<AracFilo> findByAktiflikDurumu(boolean isAktif);
}
