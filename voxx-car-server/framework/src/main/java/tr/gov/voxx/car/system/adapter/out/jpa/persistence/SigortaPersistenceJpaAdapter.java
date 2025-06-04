package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.SigortaKaskoEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.SigortaKaskoJpaMapper;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SigortaPersistenceJpaAdapter implements SigortaKaskoPersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public SigortaKasko findById(SigortaId sigortaId) {
        SigortaKaskoEntity entity = entityManager.find(SigortaKaskoEntity.class, sigortaId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Sigorta not found: " + sigortaId.getValue());
        }
        return SigortaKaskoJpaMapper.toSigorta(entity);
    }

    @Override
    @Transactional
    public void persist(SigortaKasko entity) {
        SigortaKaskoEntity sigortaEntity = SigortaKaskoJpaMapper.toEntity(entity);
        entityManager.persist(sigortaEntity);
    }

    @Override
    @Transactional
    public void merge(SigortaKasko entity) {
        SigortaKaskoEntity sigortaEntity = SigortaKaskoJpaMapper.toEntity(entity);
        entityManager.merge(sigortaEntity);
    }

    @Override
    @Transactional
    public void deleteById(SigortaId sigortaId) {
        SigortaKaskoEntity entity = entityManager.find(SigortaKaskoEntity.class, sigortaId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<SigortaKasko> findAll() {
        return SigortaKaskoJpaMapper.toSigortaList(
                entityManager.createQuery("select m from SigortaKaskoEntity m", SigortaKaskoEntity.class)
                        .getResultList()
        );
    }
}
