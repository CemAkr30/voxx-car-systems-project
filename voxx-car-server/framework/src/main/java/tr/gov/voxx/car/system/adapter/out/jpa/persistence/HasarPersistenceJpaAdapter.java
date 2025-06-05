package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.HasarEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.HasarJpaMapper;
import tr.gov.voxx.car.system.application.port.out.HasarPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class HasarPersistenceJpaAdapter implements HasarPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Hasar findById(HasarId hasarId) {
        HasarEntity entity = entityManager.find(HasarEntity.class, hasarId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Hasar not found: " + hasarId.getValue());
        }
        return HasarJpaMapper.toHasar(entity);
    }

    @Override
    @Transactional
    public void persist(Hasar entity) {
        HasarEntity hasarEntity = HasarJpaMapper.toEntity(entity);
        entityManager.persist(hasarEntity);
    }

    @Override
    @Transactional
    public void merge(Hasar entity) {
        HasarEntity hasarEntity = HasarJpaMapper.toEntity(entity);
        entityManager.merge(hasarEntity);
    }

    @Override
    @Transactional
    public void deleteById(HasarId hasarId) {
        HasarEntity entity = entityManager.find(HasarEntity.class, hasarId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Hasar> findAll() {
        return HasarJpaMapper.toHasarList(
                entityManager.createQuery("select m from HasarEntity m", HasarEntity.class)
                        .getResultList()
        );
    }
}


