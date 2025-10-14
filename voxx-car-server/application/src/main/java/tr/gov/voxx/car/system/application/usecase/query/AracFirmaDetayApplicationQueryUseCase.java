package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFirmaDetayApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AracFirmaDetayApplicationQueryUseCase implements AracFirmaDetayApplicationQueryPort {

    private final AracFirmaDetayPersistenceJpaPort aracFirmaDetayPersistenceJpaPort;

    @Override
    public AracFirmaDetay get(AracFirmaDetayId aracFirmaDetayId) {
        return aracFirmaDetayPersistenceJpaPort.findById(aracFirmaDetayId);
    }

    @Override
    public List<AracFirmaDetay> getAll() {
        return aracFirmaDetayPersistenceJpaPort.findAll();
    }

    @Override
    public List<AracFirmaDetay> kiralayanFirmalar(AracFiloId aracFiloId) {
        return aracFirmaDetayPersistenceJpaPort.kiralayanFirmalar(aracFiloId);
    }

    @Override
    public List<AracFirmaDetay> kiralananAraclar(FirmaId firmaId) {
        return aracFirmaDetayPersistenceJpaPort.kiralananAraclar(firmaId);
    }

    @Override
    public List<AracFirmaDetay> kiralanabilirAraclar() {
        return aracFirmaDetayPersistenceJpaPort.kiralanabilirAraclar();
    }
}
