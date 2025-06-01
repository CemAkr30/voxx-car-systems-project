package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.BakimEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.BakimJpaMapper;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BakimPersistenceJpaAdapter implements BakimPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional
    public void persist(Bakim entity) {
        BakimEntity bakimEntity = BakimJpaMapper.toEntity(entity);
        entityManager.persist(bakimEntity);
    }

    @Override
    @Transactional
    public void merge(Bakim entity) {
        BakimEntity bakimEntity = BakimJpaMapper.toEntity(entity);
        entityManager.merge(bakimEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public Bakim findById(BakimId bakimId) {
        BakimEntity entity = entityManager.find(BakimEntity.class, bakimId.getValue());
        if (entity == null) throw new EntityNotFoundException("Bakım not found" + bakimId.getValue());
        return BakimJpaMapper.toBakim(entity);
    }

    @Override
    @Transactional
    public void deleteById(BakimId bakimId) {
        BakimEntity entity = entityManager.find(BakimEntity.class, bakimId.getValue());
        if (entity != null) entityManager.remove(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Bakim> findAll() {
        return BakimJpaMapper.toBakimList(
                entityManager.createQuery("select b from BakimEntity b", BakimEntity.class).getResultList()
        );
    }
}
