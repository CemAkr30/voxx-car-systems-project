package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.QueryExecutor;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;

public interface MTVApplicationQueryPort extends QueryExecutor<Mtv, MtvId> {
    List<Mtv> findAracIdGetAll(String aracId);

}