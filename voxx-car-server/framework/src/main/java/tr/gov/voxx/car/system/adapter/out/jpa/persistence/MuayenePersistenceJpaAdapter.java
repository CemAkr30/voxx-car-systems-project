package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MuayeneEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MuayeneJpaMapper;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MuayenePersistenceJpaAdapter implements MuayenePersistenceJpaPort {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Muayene findById(MuayeneId muayeneId) {
        MuayeneEntity entity = entityManager.find(MuayeneEntity.class, muayeneId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Muayene not found: " + muayeneId.getValue());
        }
        return MuayeneJpaMapper.toMuayene(entity);
    }

    @Override
    @Transactional
    public void persist(Muayene entity) {
        MuayeneEntity muayeneEntity = MuayeneJpaMapper.toEntity(entity);
        entityManager.persist(muayeneEntity);
    }

    @Override
    @Transactional
    public void merge(Muayene entity) {
        MuayeneEntity muayeneEntity = MuayeneJpaMapper.toEntity(entity);
        entityManager.merge(muayeneEntity);
    }

    @Override
    @Transactional
    public void deleteById(MuayeneId muayeneId) {
        MuayeneEntity entity = entityManager.find(MuayeneEntity.class, muayeneId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Muayene> findAll() {
        return MuayeneJpaMapper.toMuayeneList(
                entityManager.createQuery("select m from MuayeneEntity m", MuayeneEntity.class)
                        .getResultList()
        );
    }
}

