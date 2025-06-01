package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.BakimApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BakimApplicationQueryUseCase implements BakimApplicationQueryPort {

    private final BakimPersistenceJpaPort persistencePort;

    @Override
    public Bakim get(BakimId id) {
        return persistencePort.findById(id);
    }

    @Override
    public List<Bakim> getAll() {
        return persistencePort.findAll();
    }
}
