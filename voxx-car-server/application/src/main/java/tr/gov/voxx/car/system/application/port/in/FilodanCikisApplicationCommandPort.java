package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.common.application.port.in.UseCaseExecutor;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

public interface FilodanCikisApplicationCommandPort extends UseCaseExecutor<FilodanCikis, FilodanCikisId> {
}
