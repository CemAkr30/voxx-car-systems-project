package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.FirmaApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FirmaApplicationQueryUseCase implements FirmaApplicationQueryPort {

    private final FirmaPersistenceJpaPort firmaPersistenceJpaPort;

    @Override
    public Firma get(FirmaId firmaId) {
        return firmaPersistenceJpaPort.findById(firmaId);
    }

    @Override
    public List<Firma> getAll() {
        return firmaPersistenceJpaPort.findAll();
    }
}
