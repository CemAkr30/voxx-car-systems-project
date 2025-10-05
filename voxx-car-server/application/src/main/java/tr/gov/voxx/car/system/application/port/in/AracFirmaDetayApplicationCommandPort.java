package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;

public interface AracFirmaDetayApplicationCommandPort extends UseCaseExecutor<AracFirmaDetay, AracFirmaDetayId> {
}
