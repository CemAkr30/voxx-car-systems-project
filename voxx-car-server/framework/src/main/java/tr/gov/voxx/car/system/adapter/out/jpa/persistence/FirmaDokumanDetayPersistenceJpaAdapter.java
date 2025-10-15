package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaDokumanDetayEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFirmaDetayJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FirmaDokumanDetayJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AracFirmaDetayJpaRepository;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.FirmaDokumanDetayJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.application.port.out.FirmaDokumanDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FirmaDokumanDetayPersistenceJpaAdapter implements FirmaDokumanDetayPersistenceJpaPort {

    private final FirmaDokumanDetayJpaRepository firmaDokumanDetayJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public FirmaDokumanDetay findById(FirmaDokumanDetayId firmaDokumanDetayId) {
        Optional<FirmaDokumanDetayEntity> entity = firmaDokumanDetayJpaRepository.findById(firmaDokumanDetayId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("firmadokumandetayentity not found: " + firmaDokumanDetayId.getValue());
        }
        return FirmaDokumanDetayJpaMapper.toFirmaDokumanDetay(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(FirmaDokumanDetay entity) {
        FirmaDokumanDetayEntity firmaDokumanDetayEntity = FirmaDokumanDetayJpaMapper.toEntity(entity);
        firmaDokumanDetayJpaRepository.save(firmaDokumanDetayEntity);
    }

    @Override
    @Transactional
    public void merge(FirmaDokumanDetay entity) {
        FirmaDokumanDetayEntity firmaDokumanDetayEntity = FirmaDokumanDetayJpaMapper.toEntity(entity);
        firmaDokumanDetayJpaRepository.save(firmaDokumanDetayEntity);
    }

    @Override
    @Transactional
    public void deleteById(FirmaDokumanDetayId firmaDokumanDetayId) {
        Optional<FirmaDokumanDetayEntity> entity = firmaDokumanDetayJpaRepository.findById(firmaDokumanDetayId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    firmaDokumanDetayJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<FirmaDokumanDetay> findAll() {
        return FirmaDokumanDetayJpaMapper.toFirmaDokumanDetayList(
                firmaDokumanDetayJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<FirmaDokumanDetay> findByFirmaId(FirmaId firmaId) {
        return FirmaDokumanDetayJpaMapper.toFirmaDokumanDetayList(
                firmaDokumanDetayJpaRepository.findByIsDeletedFalse().stream().filter(e -> e.getFirmaId().equals(firmaId.getValue())).toList()
        );
    }
}
