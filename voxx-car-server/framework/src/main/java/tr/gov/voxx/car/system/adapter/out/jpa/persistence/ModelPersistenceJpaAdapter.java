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
import java.util.Optional;

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
    public void persist(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        entityManager.persist(modelEntity);
    }

    @Override
    @Transactional
    public void merge(Model entity) {
        ModelEntity modelEntity = ModelJpaMapper.toEntity(entity);
        entityManager.merge(modelEntity);
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

    @Override
    public Optional<Model> findByAdi(String adi) {
        List<ModelEntity> results = entityManager.createQuery(
                        "select m from ModelEntity m where m.adi = :adi", ModelEntity.class)
                .setParameter("adi", adi)
                .getResultList();

        if (results.isEmpty()) {
            return Optional.empty();
        }

        Model model = ModelJpaMapper.toModel(results.get(0));
        return Optional.of(model);
    }
}
