package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.IletisimEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.IletisimJpaMapper;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class IletisimPersistenceJpaAdapter implements IletisimPersistenceJpaPort {
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Iletisim findById(IletisimId iletisimId) {
        IletisimEntity entity = entityManager.find(IletisimEntity.class, iletisimId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Iletisim not found: " + iletisimId.getValue());
        }
        return IletisimJpaMapper.toIletisim(entity);
    }

    @Override
    @Transactional
    public void persist(Iletisim entity) {
        IletisimEntity iletisimEntity = IletisimJpaMapper.toEntity(entity);
        entityManager.persist(iletisimEntity);
    }

    @Override
    @Transactional
    public void merge(Iletisim entity) {
        IletisimEntity iletisimEntity = IletisimJpaMapper.toEntity(entity);
        entityManager.merge(iletisimEntity);
    }

    @Override
    @Transactional
    public void deleteById(IletisimId iletisimId) {
        IletisimEntity entity = entityManager.find(IletisimEntity.class, iletisimId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Iletisim> findAll() {
        return IletisimJpaMapper.toIletisimList(
                entityManager.createQuery("select m from IletisimEntity m", IletisimEntity.class)
                        .getResultList()
        );
    }
}
