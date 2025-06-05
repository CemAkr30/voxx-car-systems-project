package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracKullananEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracKullananJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AracKullananPersistenceJpaAdapter implements AracKullananPersistenceJpaPort {
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public AracKullanan findById(AracKullananId aracKullananId) {
        AracKullananEntity entity = entityManager.find(AracKullananEntity.class, aracKullananId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("AracKullanan not found: " + aracKullananId.getValue());
        }
        return AracKullananJpaMapper.toAracKullanan(entity);
    }

    @Override
    @Transactional
    public void persist(AracKullanan entity) {
        AracKullananEntity aracKullananEntity = AracKullananJpaMapper.toEntity(entity);
        entityManager.persist(aracKullananEntity);
    }

    @Override
    @Transactional
    public void merge(AracKullanan entity) {
        AracKullananEntity aracKullananEntity = AracKullananJpaMapper.toEntity(entity);
        entityManager.merge(aracKullananEntity);
    }

    @Override
    @Transactional
    public void deleteById(AracKullananId aracKullananId) {
        AracKullananEntity entity = entityManager.find(AracKullananEntity.class, aracKullananId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<AracKullanan> findAll() {
        return AracKullananJpaMapper.toAracKullananList(
                entityManager.createQuery("select m from AracKullananEntity m", AracKullananEntity.class)
                        .getResultList()
        );
    }
}

