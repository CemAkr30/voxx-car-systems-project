package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MTVEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MTVJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MTVPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MTVPersistenceJpaAdapter implements MTVPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Mtv findById(MtvId mtvId) {
        MTVEntity entity = entityManager.find(MTVEntity.class, mtvId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("MTV not found: " + mtvId.getValue());
        }
        return MTVJpaMapper.toMtv(entity);
    }

    @Override
    @Transactional
    public void persist(Mtv entity) {
        MTVEntity mtvEntity = MTVJpaMapper.toEntity(entity);
        entityManager.persist(mtvEntity);
    }

    @Override
    @Transactional
    public void merge(Mtv entity) {
        MTVEntity mtvEntity = MTVJpaMapper.toEntity(entity);
        entityManager.merge(mtvEntity);
    }

    @Override
    @Transactional
    public void deleteById(MtvId mtvId) {
        MTVEntity entity = entityManager.find(MTVEntity.class, mtvId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mtv> findAll() {
        return MTVJpaMapper.toMtvList(
                entityManager.createQuery("select m from MTVEntity m", MTVEntity.class)
                        .getResultList()
        );
    }
}

