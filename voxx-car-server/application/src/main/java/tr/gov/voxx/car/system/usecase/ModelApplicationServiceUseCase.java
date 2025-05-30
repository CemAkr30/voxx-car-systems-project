package tr.gov.voxx.car.system.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.entity.Model;
import tr.gov.voxx.car.system.port.in.ModelApplicationServicePort;
import tr.gov.voxx.car.system.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.valueobject.ModelId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelApplicationServiceUseCase implements ModelApplicationServicePort {

    private final ModelPersistenceJpaPort modelPersistenceJpaPort;

    @Override
    public Model get(ModelId modelId) {
        return modelPersistenceJpaPort.findById(modelId);
    }

    @Override
    public Model post(Model entity) {
        entity.init();
        return modelPersistenceJpaPort.create(entity);
    }

    @Override
    public Model put(Model entity) {
        entity.modifiedToDomain(entity);
        return modelPersistenceJpaPort.merge(entity);
    }

    @Override
    public void deleteById(ModelId modelId) {
         modelPersistenceJpaPort.remove(
                modelId
        );
    }

    @Override
    public List<Model> getAll() {
        return modelPersistenceJpaPort.findAll();
    }
}
