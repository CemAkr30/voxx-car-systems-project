package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FirmaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FirmaPersistenceJpaAdapter implements FirmaPersistenceJpaPort {
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Firma findById(FirmaId firmaId) {
        FirmaEntity entity = entityManager.find(FirmaEntity.class, firmaId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Firma not found: " + firmaId.getValue());
        }
        return FirmaJpaMapper.toFirma(entity);
    }

    @Override
    @Transactional
    public void persist(Firma entity) {
        FirmaEntity firmaEntity = FirmaJpaMapper.toEntity(entity);
        entityManager.persist(firmaEntity);
    }

    @Override
    @Transactional
    public void merge(Firma entity) {
        FirmaEntity firmaEntity = FirmaJpaMapper.toEntity(entity);
        entityManager.merge(firmaEntity);
    }

    @Override
    @Transactional
    public void deleteById(FirmaId firmaId) {
        FirmaEntity entity = entityManager.find(FirmaEntity.class, firmaId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<Firma> findAll() {
        return FirmaJpaMapper.toFirmaList(
                entityManager.createQuery("select m from FirmaEntity m", FirmaEntity.class)
                        .getResultList()
        );
    }
}
