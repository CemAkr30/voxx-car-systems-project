package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MarkaApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarkaApplicationQueryUseCase implements MarkaApplicationQueryPort {

    private final MarkaPersistenceJpaPort markaPersistenceJpaPort;

    @Override
    @Cacheable(value = "marka", key = "#markaId")
    public Marka get(MarkaId markaId) {
        return markaPersistenceJpaPort.findById(markaId);
    }

    @Override
    public List<Marka> getAll() {
        return markaPersistenceJpaPort.findAll();
    }
}
