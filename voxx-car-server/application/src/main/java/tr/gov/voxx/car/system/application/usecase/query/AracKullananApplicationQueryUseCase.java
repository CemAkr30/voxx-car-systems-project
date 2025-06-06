package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracKullananApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AracKullananApplicationQueryUseCase implements AracKullananApplicationQueryPort {

    private final AracKullananPersistenceJpaPort aracKullananPersistenceJpaPort;


    @Override
    @Cacheable(value = "aracKullanan", key = "#aracKullananId")
    public AracKullanan get(AracKullananId aracKullananId) {
        return aracKullananPersistenceJpaPort.findById(aracKullananId);
    }

    @Override
    public List<AracKullanan> getAll() {
        return aracKullananPersistenceJpaPort.findAll();
    }
}
