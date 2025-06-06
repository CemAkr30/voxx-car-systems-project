package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FirmaJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.FirmaJpaRepository;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FirmaPersistenceJpaAdapter implements FirmaPersistenceJpaPort {
    private final FirmaJpaRepository firmaJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Firma findById(FirmaId firmaId) {
        Optional<FirmaEntity> entity = firmaJpaRepository.findById(firmaId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Firma not found: " + firmaId.getValue());
        }
        return FirmaJpaMapper.toFirma(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Firma entity) {
        FirmaEntity firmaEntity = FirmaJpaMapper.toEntity(entity);
        firmaJpaRepository.save(firmaEntity);
    }

    @Override
    @Transactional
    public void merge(Firma entity) {
        FirmaEntity firmaEntity = FirmaJpaMapper.toEntity(entity);
        firmaJpaRepository.save(firmaEntity);
    }

    @Override
    @Transactional
    public void deleteById(FirmaId firmaId) {
        Optional<FirmaEntity> entity = firmaJpaRepository.findById(firmaId.getValue());
        entity.ifPresent(firmaJpaRepository::delete);
    }


    @Override
    @Transactional(readOnly = true)
    public List<Firma> findAll() {
        return FirmaJpaMapper.toFirmaList(
                firmaJpaRepository.findAll()
        );
    }
}
