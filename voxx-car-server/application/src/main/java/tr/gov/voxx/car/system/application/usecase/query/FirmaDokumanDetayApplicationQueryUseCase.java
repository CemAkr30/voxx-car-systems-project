package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFirmaDetayApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.FirmaDokumanDetayApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.application.port.out.FirmaDokumanDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FirmaDokumanDetayApplicationQueryUseCase implements FirmaDokumanDetayApplicationQueryPort {

    private final FirmaDokumanDetayPersistenceJpaPort firmaDokumanDetayPersistenceJpaPort;

    @Override
    public FirmaDokumanDetay get(FirmaDokumanDetayId firmaDokumanDetayId) {
        return firmaDokumanDetayPersistenceJpaPort.findById(firmaDokumanDetayId);
    }

    @Override
    public List<FirmaDokumanDetay> getAll() {
        return firmaDokumanDetayPersistenceJpaPort.findAll();
    }

    @Override
    public List<FirmaDokumanDetay> findFirmaIdGetAll(String firmaId) {
        return firmaDokumanDetayPersistenceJpaPort.findByFirmaId(new FirmaId(firmaId));
    }
}
