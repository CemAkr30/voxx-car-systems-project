package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.ModelJpaMapper;
import tr.gov.voxx.car.system.entity.Model;
import tr.gov.voxx.car.system.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.valueobject.ModelId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ModelPersistenceJpaAdapter implements ModelPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    public Model findById(ModelId modelId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ModelEntity> cq = cb.createQuery(ModelEntity.class);
        Root<ModelEntity> root = cq.from(ModelEntity.class);
        cq.where(cb.equal(root.get("id"), modelId.getValue()));

        cq.select(root);

        return ModelJpaMapper.INSTANCE.toModel(
                entityManager.createQuery(cq).getSingleResult()
        );
    }

    @Override
    public Model create(Model entity) {
        entityManager.persist(
                ModelJpaMapper.INSTANCE.toEntity(entity)
        );
        return entity;
    }

    @Override
    public Model merge(Model entity) {
        return ModelJpaMapper.INSTANCE.toModel(
                entityManager.merge(
                        ModelJpaMapper.INSTANCE.toEntity(entity)
                )
        );
    }

    @Override
    public void remove(ModelId modelId) {
        entityManager.remove(
                findById(modelId)
        );
    }

    @Override
    public List<Model> findAll() {
        return ModelJpaMapper.INSTANCE.toModelList(
                entityManager.createQuery("select m from ModelEntity m", ModelEntity.class)
                        .getResultList()
        );
    }
}
