package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.ModelJpaMapper;
import tr.gov.voxx.car.system.application.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ModelPersistenceJpaAdapter implements ModelPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Model findById(ModelId modelId) {
        ModelEntity entity = entityManager.find(ModelEntity.class, modelId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Model not found: " + modelId.getValue());
        }
        return ModelJpaMapper.toModel(entity);
    }

    @Override
    @Transactional
    public Model persist(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        entityManager.persist(modelEntity);
        return ModelJpaMapper.toModel(modelEntity);
    }

    @Override
    @Transactional
    public Model merge(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        entityManager.merge(modelEntity);
        return ModelJpaMapper.toModel(modelEntity);
    }

    @Override
    @Transactional
    public void deleteById(ModelId modelId) {
        ModelEntity entity = entityManager.find(ModelEntity.class, modelId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<Model> findAll() {
        return ModelJpaMapper.toModelList(
                entityManager.createQuery("select m from ModelEntity m", ModelEntity.class)
                        .getResultList()
        );
    }
}
