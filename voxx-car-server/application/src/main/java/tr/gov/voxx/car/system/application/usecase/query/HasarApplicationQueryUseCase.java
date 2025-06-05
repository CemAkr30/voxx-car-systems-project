package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.HasarApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.HasarPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HasarApplicationQueryUseCase implements HasarApplicationQueryPort {

    private final HasarPersistenceJpaPort hasarPersistenceJpaPort;

    @Override
    @Cacheable(value = "hasar", key = "#hasarId")
    public Hasar get(HasarId hasarId) {
        return hasarPersistenceJpaPort.findById(hasarId);
    }

    @Override
    public List<Hasar> getAll() {
        return hasarPersistenceJpaPort.findAll();
    }
}
