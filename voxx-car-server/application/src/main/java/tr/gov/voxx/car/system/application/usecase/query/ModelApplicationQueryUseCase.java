package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.ModelApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelApplicationQueryUseCase implements ModelApplicationQueryPort {

    private final ModelPersistenceJpaPort modelPersistenceJpaPort;

    @Override
    public Model get(ModelId modelId) {
        return modelPersistenceJpaPort.findById(modelId);
    }

    @Override
    public List<Model> getAll() {
        return modelPersistenceJpaPort.findAll();
    }
}

