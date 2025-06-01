package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFiloEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFiloJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AracFiloPersistenceJpaAdapter implements AracFiloPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public AracFilo findById(AracFiloId aracFiloId) {
        AracFiloEntity entity = entityManager.find(AracFiloEntity.class, aracFiloId.getValue());
        if (entity == null) throw new EntityNotFoundException("Filo arac not found: " + aracFiloId.getValue());
        return AracFiloJpaMapper.toAracFilo(entity);
    }

    @Override
    @Transactional
    public void persist(AracFilo entity) {
        AracFiloEntity aracFiloEntity = AracFiloJpaMapper.toEntity(entity);
        entityManager.persist(aracFiloEntity);
    }

    @Override
    @Transactional
    public void merge(AracFilo entity) {
        AracFiloEntity aracFiloEntity = AracFiloJpaMapper.toEntity(entity);
        entityManager.merge(aracFiloEntity);
    }


    @Override
    @Transactional
    public void deleteById(AracFiloId aracFiloId) {
        AracFiloEntity entity = entityManager.find(AracFiloEntity.class, aracFiloId.getValue());
        if (entity != null)
            entityManager.remove(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AracFilo> findAll() {
        return AracFiloJpaMapper.toAracFiloList(
                entityManager.createQuery("select m from AracFiloEntity m", AracFiloEntity.class)
                        .getResultList()
        );
    }
}
