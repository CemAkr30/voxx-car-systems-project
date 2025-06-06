package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.HasarEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.HasarJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.HasarJpaRepository;
import tr.gov.voxx.car.system.application.port.out.HasarPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HasarPersistenceJpaAdapter implements HasarPersistenceJpaPort {

    private final HasarJpaRepository hasarJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Hasar findById(HasarId hasarId) {
        Optional<HasarEntity> entity = hasarJpaRepository.findById(hasarId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Hasar not found: " + hasarId.getValue());
        }
        return HasarJpaMapper.toHasar(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Hasar entity) {
        HasarEntity hasarEntity = HasarJpaMapper.toEntity(entity);
        hasarJpaRepository.save(hasarEntity);
    }

    @Override
    @Transactional
    public void merge(Hasar entity) {
        HasarEntity hasarEntity = HasarJpaMapper.toEntity(entity);
        hasarJpaRepository.save(hasarEntity);
    }

    @Override
    @Transactional
    public void deleteById(HasarId hasarId) {
        Optional<HasarEntity> entity = hasarJpaRepository.findById(hasarId.getValue());
        entity.ifPresent(hasarJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Hasar> findAll() {
        return HasarJpaMapper.toHasarList(
                hasarJpaRepository.findAll()
        );
    }
}


