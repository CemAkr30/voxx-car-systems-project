package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.KazaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.KazaJpaMapper;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class KazaPersistenceJpaAdapter implements KazaPersistenceJpaPort {

    private final EntityManager em;

    @Override
    @Transactional
    public void persist(Kaza kaza) {
        em.persist(KazaJpaMapper.toEntity(kaza));
    }

    @Override
    @Transactional
    public void merge(Kaza kaza) {
        em.merge(KazaJpaMapper.toEntity(kaza));
    }

    @Override
    @Transactional(readOnly = true)
    public Kaza findById(KazaId id) {
        KazaEntity entity = em.find(KazaEntity.class, id.getValue());
        if (entity == null) throw new EntityNotFoundException("Kaza bulunamadı");
        return KazaJpaMapper.toKaza(entity);
    }

    @Override
    @Transactional
    public void deleteById(KazaId id) {
        KazaEntity entity = em.find(KazaEntity.class, id.getValue());
        if (entity != null) em.remove(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Kaza> findAll() {
        return KazaJpaMapper.toKazaList(
                em.createQuery("select k from KazaEntity k", KazaEntity.class).getResultList()
        );
    }
}
