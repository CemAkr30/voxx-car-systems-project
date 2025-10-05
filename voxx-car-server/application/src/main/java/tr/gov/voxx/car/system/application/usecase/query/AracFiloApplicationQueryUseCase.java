package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AracFiloApplicationQueryUseCase implements AracFiloApplicationQueryPort {

    private final AracFiloPersistenceJpaPort aracFiloPersistenceJpaPort;

    @Override
    public AracFilo get(AracFiloId aracFiloId) {
        return aracFiloPersistenceJpaPort.findById(aracFiloId);
    }

    @Override
    public List<AracFilo> getAll() {
        return aracFiloPersistenceJpaPort.findAll();
    }
}
