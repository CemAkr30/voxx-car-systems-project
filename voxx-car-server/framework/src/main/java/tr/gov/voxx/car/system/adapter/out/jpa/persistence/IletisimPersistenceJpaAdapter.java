package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.IletisimEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.IletisimJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.IletisimJpaRepository;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class IletisimPersistenceJpaAdapter implements IletisimPersistenceJpaPort {
    private final IletisimJpaRepository iletisimJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Iletisim findById(IletisimId iletisimId) {
        Optional<IletisimEntity> entity = iletisimJpaRepository.findById(iletisimId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Iletisim not found: " + iletisimId.getValue());
        }
        return IletisimJpaMapper.toIletisim(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Iletisim entity) {
        IletisimEntity iletisimEntity = IletisimJpaMapper.toEntity(entity);
        iletisimJpaRepository.save(iletisimEntity);
    }

    @Override
    @Transactional
    public void merge(Iletisim entity) {
        IletisimEntity iletisimEntity = IletisimJpaMapper.toEntity(entity);
        iletisimJpaRepository.save(iletisimEntity);
    }

    @Override
    @Transactional
    public void deleteById(IletisimId iletisimId) {
        Optional<IletisimEntity> entity = iletisimJpaRepository.findById(iletisimId.getValue());
        entity.ifPresent(iletisimJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Iletisim> findAll() {
        return IletisimJpaMapper.toIletisimList(
                iletisimJpaRepository.findAll()
        );
    }
}
