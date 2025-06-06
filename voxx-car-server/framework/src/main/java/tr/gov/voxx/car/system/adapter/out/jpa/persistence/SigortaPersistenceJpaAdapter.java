package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.SigortaKaskoEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.SigortaKaskoJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.SigortaJpaRepository;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SigortaPersistenceJpaAdapter implements SigortaKaskoPersistenceJpaPort {

    private final SigortaJpaRepository sigortaJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public SigortaKasko findById(SigortaId sigortaId) {
        Optional<SigortaKaskoEntity> entity = sigortaJpaRepository.findById(sigortaId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Sigorta not found: " + sigortaId.getValue());
        }
        return SigortaKaskoJpaMapper.toSigorta(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(SigortaKasko entity) {
        SigortaKaskoEntity sigortaEntity = SigortaKaskoJpaMapper.toEntity(entity);
        sigortaJpaRepository.save(sigortaEntity);
    }

    @Override
    @Transactional
    public void merge(SigortaKasko entity) {
        SigortaKaskoEntity sigortaEntity = SigortaKaskoJpaMapper.toEntity(entity);
        sigortaJpaRepository.save(sigortaEntity);
    }

    @Override
    @Transactional
    public void deleteById(SigortaId sigortaId) {
        Optional<SigortaKaskoEntity> entity = sigortaJpaRepository.findById(sigortaId.getValue());
        entity.ifPresent(sigortaJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SigortaKasko> findAll() {
        return SigortaKaskoJpaMapper.toSigortaList(
                sigortaJpaRepository.findAll()
        );
    }
}
