package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFirmaDetayJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AracFirmaDetayJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AracFirmaDetayPersistenceJpaAdapter implements AracFirmaDetayPersistenceJpaPort {

    private final AracFirmaDetayJpaRepository aracFirmaDetayJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public AracFirmaDetay findById(AracFirmaDetayId aracFirmaDetayId) {
        Optional<AracFirmaDetayEntity> entity = aracFirmaDetayJpaRepository.findById(aracFirmaDetayId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("aracfirmadetay not found: " + aracFirmaDetayId.getValue());
        }
        return AracFirmaDetayJpaMapper.toAracFirmaDetay(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(AracFirmaDetay entity) {
        AracFirmaDetayEntity aracFirmaDetayEntity = AracFirmaDetayJpaMapper.toEntity(entity);
        aracFirmaDetayJpaRepository.save(aracFirmaDetayEntity);
    }

    @Override
    @Transactional
    public void merge(AracFirmaDetay entity) {
        AracFirmaDetayEntity aracFirmaDetayEntity = AracFirmaDetayJpaMapper.toEntity(entity);
        aracFirmaDetayJpaRepository.save(aracFirmaDetayEntity);
    }

    @Override
    @Transactional
    public void deleteById(AracFirmaDetayId aracFirmaDetayId) {
        Optional<AracFirmaDetayEntity> entity = aracFirmaDetayJpaRepository.findById(aracFirmaDetayId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    aracFirmaDetayJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<AracFirmaDetay> findAll() {
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<AracFirmaDetay> kiralayanFirmalar(AracFiloId aracFiloId) {
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findByAracFiloId(aracFiloId.getValue())
        );
    }

    @Override
    public List<AracFirmaDetay> kiralananAraclar(FirmaId firmaId) {
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findByFirmaId(firmaId.getValue())
        );
    }

    @Override
    public List<AracFirmaDetay> kiralanabilirAraclar() {
        Instant now = Instant.now();
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findAllKiralanabilirAraclar(now)
        );
    }

    @Override
    public List<AracFirmaDetay> kiralananAraclarSirali() {
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findByDeletedFalseOrderBySozlesmeBitisTarihiAsc()
        );
    }

    @Override
    public List<AracFirmaDetay> tumDetaylar() {
        return AracFirmaDetayJpaMapper.toAracFirmaDetayList(
                aracFirmaDetayJpaRepository.findAllByDeletedFalse()
        );
    }
}
