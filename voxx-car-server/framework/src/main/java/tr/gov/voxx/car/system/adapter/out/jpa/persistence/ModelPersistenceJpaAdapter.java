package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.ModelJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.ModelJpaRepository;
import tr.gov.voxx.car.system.application.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ModelPersistenceJpaAdapter implements ModelPersistenceJpaPort {

    private final ModelJpaRepository modelJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Model findById(ModelId modelId) {
        Optional<ModelEntity> entity = modelJpaRepository.findById(modelId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Model not found: " + modelId.getValue());
        }
        return ModelJpaMapper.toModel(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        modelJpaRepository.save(modelEntity);
    }

    @Override
    @Transactional
    public void merge(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        modelJpaRepository.save(modelEntity);
    }

    @Override
    @Transactional
    public void deleteById(ModelId modelId) {
        Optional<ModelEntity> entity = modelJpaRepository.findById(modelId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    modelJpaRepository.save(e);
                }
        );
    }


    @Override
    @Transactional(readOnly = true)
    public List<Model> findAll() {
        return ModelJpaMapper.toModelList(
                modelJpaRepository.findAll()
        );
    }

    @Override
    public Optional<Model> findByAdi(String adi) {
        List<ModelEntity> results = modelJpaRepository.findByAdi(adi);

        if (results.isEmpty()) {
            return Optional.empty();
        }

        Model model = ModelJpaMapper.toModel(results.get(0));
        return Optional.of(model);
    }

    @Override
    public List<Model> findMarkaIdGetAll(String markaId) {
        return ModelJpaMapper.toModelList(
                modelJpaRepository.findByMarkaId(markaId)
        );
    }
}
