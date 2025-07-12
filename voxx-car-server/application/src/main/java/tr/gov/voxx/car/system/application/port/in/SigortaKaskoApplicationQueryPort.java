package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;

public interface SigortaKaskoApplicationQueryPort extends QueryExecutor<SigortaKasko, SigortaId> {
    List<SigortaKasko> findAracFiloIdGetAll(String aracFiloId);

}
