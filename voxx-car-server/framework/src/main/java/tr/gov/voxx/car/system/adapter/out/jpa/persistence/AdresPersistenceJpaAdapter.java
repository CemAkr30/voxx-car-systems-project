package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AdresEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AdresJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AdresJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AdresPersistenceJpaAdapter implements AdresPersistenceJpaPort {
    private final AdresJpaRepository adresJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Adres findById(AdresId adresId) {
        Optional<AdresEntity> entity = adresJpaRepository.findById(adresId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Adres not found: " + adresId.getValue());
        }
        return AdresJpaMapper.toAdres(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Adres entity) {
        AdresEntity adresEntity = AdresJpaMapper.toEntity(entity);
        adresJpaRepository.save(adresEntity);
    }

    @Override
    @Transactional
    public void merge(Adres entity) {
        AdresEntity adresEntity = AdresJpaMapper.toEntity(entity);
        adresJpaRepository.save(adresEntity);
    }

    @Override
    @Transactional
    public void deleteById(AdresId adresId) {
        Optional<AdresEntity> entity = adresJpaRepository.findById(adresId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    adresJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Adres> findAll() {
        return AdresJpaMapper.toAdresList(
                adresJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<Adres> findFirmaIdGetAll(String firmaId) {
        return AdresJpaMapper.toAdresList(
                adresJpaRepository.findByFirmaId(firmaId)
        );
    }
}
