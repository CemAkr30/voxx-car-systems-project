package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MuayeneApplicationQueryUseCase implements MuayeneApplicationQueryPort {

    private final MuayenePersistenceJpaPort persistenceJpaPort;

    @Override
    public Muayene get(MuayeneId muayeneId) {
        return persistenceJpaPort.findById(muayeneId);
    }

    @Override
    public List<Muayene> getAll() {
        return persistenceJpaPort.findAll();
    }
}
