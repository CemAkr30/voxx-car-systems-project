package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AdresEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AdresJpaMapper;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdresPersistenceJpaAdapter implements AdresPersistenceJpaPort {
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public Adres findById(AdresId adresId) {
        AdresEntity entity = entityManager.find(AdresEntity.class, adresId.getValue());
        if (entity == null) {
            throw new EntityNotFoundException("Adres not found: " + adresId.getValue());
        }
        return AdresJpaMapper.toAdres(entity);
    }

    @Override
    @Transactional
    public void persist(Adres entity) {
        AdresEntity adresEntity = AdresJpaMapper.toEntity(entity);
        entityManager.persist(adresEntity);
    }

    @Override
    @Transactional
    public void merge(Adres entity) {
        AdresEntity adresEntity = AdresJpaMapper.toEntity(entity);
        entityManager.merge(adresEntity);
    }

    @Override
    @Transactional
    public void deleteById(AdresId adresId) {
        AdresEntity entity = entityManager.find(AdresEntity.class, adresId.getValue());
        if (entity != null) {
            entityManager.remove(entity);
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Adres> findAll() {
        return AdresJpaMapper.toAdresList(
                entityManager.createQuery("select m from AdresEntity m", AdresEntity.class)
                        .getResultList()
        );
    }
}
