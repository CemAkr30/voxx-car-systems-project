package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.FilodanCikisApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilodanCikisApplicationQueryUseCase implements FilodanCikisApplicationQueryPort {

    private final FilodanCikisPersistenceJpaPort persistenceJpaPort;

    @Override
    @Cacheable(value = "filodancikis", key = "#filodanCikisId")
    public FilodanCikis get(FilodanCikisId filodanCikisId) {
        return persistenceJpaPort.findById(filodanCikisId);
    }

    @Override
    public List<FilodanCikis> getAll() {
        return persistenceJpaPort.findAll();
    }
}
