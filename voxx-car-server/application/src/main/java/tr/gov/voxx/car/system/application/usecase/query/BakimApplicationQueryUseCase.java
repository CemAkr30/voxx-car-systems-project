package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
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
    @Cacheable(value = "bakim", key = "#bakimId")
    public Bakim get(BakimId bakimId) {
        return persistencePort.findById(bakimId);
    }

    @Override
    public List<Bakim> getAll() {
        return persistencePort.findAll();
    }

    @Override
    public List<Bakim> findAracIdGetAll(String aracId) {
        return persistencePort.findAracIdGetAll(aracId);
    }
}
