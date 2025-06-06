package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracKullananEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracKullananJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AracKullananJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AracKullananPersistenceJpaAdapter implements AracKullananPersistenceJpaPort {
    private final AracKullananJpaRepository aracKullananJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public AracKullanan findById(AracKullananId aracKullananId) {
        Optional<AracKullananEntity> entity = aracKullananJpaRepository.findById(aracKullananId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("AracKullanan not found: " + aracKullananId.getValue());
        }
        return AracKullananJpaMapper.toAracKullanan(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(AracKullanan entity) {
        AracKullananEntity aracKullananEntity = AracKullananJpaMapper.toEntity(entity);
        aracKullananJpaRepository.save(aracKullananEntity);
    }

    @Override
    @Transactional
    public void merge(AracKullanan entity) {
        AracKullananEntity aracKullananEntity = AracKullananJpaMapper.toEntity(entity);
        aracKullananJpaRepository.save(aracKullananEntity);
    }

    @Override
    @Transactional
    public void deleteById(AracKullananId aracKullananId) {
        Optional<AracKullananEntity> entity = aracKullananJpaRepository.findById(aracKullananId.getValue());
        entity.ifPresent(aracKullananJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AracKullanan> findAll() {
        return AracKullananJpaMapper.toAracKullananList(
                aracKullananJpaRepository.findAll()
        );
    }
}

