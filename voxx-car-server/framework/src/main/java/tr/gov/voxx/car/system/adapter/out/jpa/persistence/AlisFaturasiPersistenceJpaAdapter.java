package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AlisFaturasiEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AlisFaturasiJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AlisFaturasiPersistenceJpaAdapter implements AlisFaturasiPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public AlisFaturasi findById(AlisFaturasiId alisFaturasiId) {
        AlisFaturasiEntity entity = entityManager.find(AlisFaturasiEntity.class, alisFaturasiId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("AlisFaturasi not found: " + alisFaturasiId.getValue());
        }
        return AlisFaturasiJpaMapper.toAlisFaturasi(entity);
    }

    @Override
    @Transactional
    public void persist(AlisFaturasi entity) {
        AlisFaturasiEntity alisFaturasiEntity = AlisFaturasiJpaMapper.toEntity(entity);
        entityManager.persist(alisFaturasiEntity);
    }

    @Override
    @Transactional
    public void merge(AlisFaturasi entity) {
        AlisFaturasiEntity alisFaturasiEntity = AlisFaturasiJpaMapper.toEntity(entity);
        entityManager.merge(alisFaturasiEntity);
    }

    @Override
    @Transactional
    public void deleteById(AlisFaturasiId alisFaturasiId) {
        AlisFaturasiEntity entity = entityManager.find(AlisFaturasiEntity.class, alisFaturasiId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlisFaturasi> findAll() {
        return AlisFaturasiJpaMapper.toAlisFaturasiList(
                entityManager.createQuery("select m from AlisFaturasiEntity m", AlisFaturasiEntity.class)
                        .getResultList()
        );
    }
}


