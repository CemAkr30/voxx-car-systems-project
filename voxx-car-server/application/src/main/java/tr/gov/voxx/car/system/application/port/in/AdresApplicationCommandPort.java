package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

public interface AdresApplicationCommandPort extends UseCaseExecutor<Adres, AdresId> {
}
