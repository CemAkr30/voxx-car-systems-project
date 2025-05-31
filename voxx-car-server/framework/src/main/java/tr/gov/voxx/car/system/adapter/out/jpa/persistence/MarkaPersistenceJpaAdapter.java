package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MarkaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MarkaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MarkaPersistenceJpaAdapter implements MarkaPersistenceJpaPort {
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Marka findById(MarkaId markaId) {
        MarkaEntity entity = entityManager.find(MarkaEntity.class, markaId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Marka not found: " + markaId.getValue());
        }
        return MarkaJpaMapper.toMarka(entity);
    }

    @Override
    @Transactional
    public void  persist(Marka entity) {
        MarkaEntity markaEntity = MarkaJpaMapper.toEntity(entity);
        entityManager.persist(markaEntity);
    }

    @Override
    @Transactional
    public void  merge(Marka entity) {
        MarkaEntity markaEntity = MarkaJpaMapper.toEntity(entity);
        entityManager.merge(markaEntity);
    }

    @Override
    @Transactional
    public void deleteById(MarkaId markaId) {
        MarkaEntity entity = entityManager.find(MarkaEntity.class, markaId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<Marka> findAll() {
        return MarkaJpaMapper.toMarkaList(
                entityManager.createQuery("select m from MarkaEntity m", MarkaEntity.class)
                        .getResultList()
        );
    }

    @Override
    public Optional<Marka> findByAdi(String adi) {
        Marka marka = MarkaJpaMapper.toMarka(entityManager.createQuery("select m from MarkaEntity m where m.adi = :adi", MarkaEntity.class)
                .setParameter("adi", adi)
                .getSingleResult());
        return Optional.ofNullable(marka);
    }
}
