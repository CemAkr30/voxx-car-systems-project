package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFiloEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AracFiloJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AracFiloJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AracFiloPersistenceJpaAdapter implements AracFiloPersistenceJpaPort {

    private final AracFiloJpaRepository aracFiloJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public AracFilo findById(AracFiloId aracFiloId) {
        Optional<AracFiloEntity> entity = aracFiloJpaRepository.findById(aracFiloId.getValue());
        if (entity.isEmpty()) throw new EntityNotFoundException("Filo arac not found: " + aracFiloId.getValue());
        return AracFiloJpaMapper.toAracFilo(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(AracFilo entity) {
        AracFiloEntity aracFiloEntity = AracFiloJpaMapper.toEntity(entity);
        aracFiloJpaRepository.save(aracFiloEntity);
    }

    @Override
    @Transactional
    public void merge(AracFilo entity) {
        AracFiloEntity aracFiloEntity = AracFiloJpaMapper.toEntity(entity);
        aracFiloJpaRepository.save(aracFiloEntity);
    }


    @Override
    @Transactional
    public void deleteById(AracFiloId aracFiloId) {
        Optional<AracFiloEntity> entity = aracFiloJpaRepository.findById(aracFiloId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    aracFiloJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<AracFilo> findAll() {
        return AracFiloJpaMapper.toAracFiloList(
                aracFiloJpaRepository.findAll()
        );
    }
}
