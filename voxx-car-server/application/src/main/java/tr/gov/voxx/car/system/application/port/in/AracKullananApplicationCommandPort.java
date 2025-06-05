package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

public interface AracKullananApplicationCommandPort extends UseCaseExecutor<AracKullanan, AracKullananId> {
}
