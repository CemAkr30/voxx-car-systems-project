package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FilodanCikisEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FilodanCikisJpaMapper;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FilodanCikisPersistenceJpaAdapter implements FilodanCikisPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public FilodanCikis findById(FilodanCikisId filodanCikisId) {
        FilodanCikisEntity entity = entityManager.find(FilodanCikisEntity.class, filodanCikisId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("FilodanCikis not found: " + filodanCikisId.getValue());
        }
        return FilodanCikisJpaMapper.toFilodanCikis(entity);
    }

    @Override
    @Transactional
    public void persist(FilodanCikis entity) {
        FilodanCikisEntity filodanCikisEntity = FilodanCikisJpaMapper.toEntity(entity);
        entityManager.persist(filodanCikisEntity);
    }

    @Override
    @Transactional
    public void merge(FilodanCikis entity) {
        FilodanCikisEntity filodanCikisEntity = FilodanCikisJpaMapper.toEntity(entity);
        entityManager.merge(filodanCikisEntity);
    }

    @Override
    @Transactional
    public void deleteById(FilodanCikisId filodanCikisId) {
        FilodanCikisEntity entity = entityManager.find(FilodanCikisEntity.class, filodanCikisId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<FilodanCikis> findAll() {
        return FilodanCikisJpaMapper.toFilodanCikisList(
                entityManager.createQuery("select m from FilodanCikisEntity m", FilodanCikisEntity.class)
                        .getResultList()
        );
    }
}

