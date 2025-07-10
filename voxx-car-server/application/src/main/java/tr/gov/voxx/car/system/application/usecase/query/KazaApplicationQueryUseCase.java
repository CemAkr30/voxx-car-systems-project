package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.KazaApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KazaApplicationQueryUseCase implements KazaApplicationQueryPort {

    private final KazaPersistenceJpaPort persistencePort;

    @Override
    @Cacheable(value = "kaza", key = "#kazaId")
    public Kaza get(KazaId kazaId) {
        return persistencePort.findById(kazaId);
    }

    @Override
    public List<Kaza> getAll() {
        return persistencePort.findAll();
    }

    @Override
    public List<Kaza> findAracIdGetAll(String aracId) {
        return persistencePort.findAracIdGetAll(aracId);
    }
}
