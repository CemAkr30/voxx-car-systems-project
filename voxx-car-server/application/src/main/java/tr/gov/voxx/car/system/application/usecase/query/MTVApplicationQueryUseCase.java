package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.MTVPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MTVApplicationQueryUseCase implements MTVApplicationQueryPort {

    private final MTVPersistenceJpaPort persistenceJpaPort;

    @Override
    @Cacheable(value = "mtv", key = "#mtvId")
    public Mtv get(MtvId mtvId) {
        return persistenceJpaPort.findById(mtvId);
    }

    @Override
    public List<Mtv> getAll() {
        return persistenceJpaPort.findAll();
    }

    @Override
    public List<Mtv> findAracIdGetAll(String aracId) {
        return persistenceJpaPort.findAracIdGetAll(aracId);
    }
}