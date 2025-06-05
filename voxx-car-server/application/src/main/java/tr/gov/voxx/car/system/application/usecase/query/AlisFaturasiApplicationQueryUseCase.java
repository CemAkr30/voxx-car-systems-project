package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AlisFaturasiApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlisFaturasiApplicationQueryUseCase implements AlisFaturasiApplicationQueryPort {

    private final AlisFaturasiPersistenceJpaPort persistenceJpaPort;

    @Override
    @Cacheable(value = "alisFaturasi", key = "#alisFaturasiId")
    public AlisFaturasi get(AlisFaturasiId alisFaturasiId) {
        return persistenceJpaPort.findById(alisFaturasiId);
    }

    @Override
    public List<AlisFaturasi> getAll() {
        return persistenceJpaPort.findAll();
    }
}
