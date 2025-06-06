package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MTVEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MTVJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.MtvJpaRepository;
import tr.gov.voxx.car.system.application.port.out.MTVPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MTVPersistenceJpaAdapter implements MTVPersistenceJpaPort {

    private final MtvJpaRepository mtvJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Mtv findById(MtvId mtvId) {
        Optional<MTVEntity> entity = mtvJpaRepository.findById(mtvId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("MTV not found: " + mtvId.getValue());
        }
        return MTVJpaMapper.toMtv(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Mtv entity) {
        MTVEntity mtvEntity = MTVJpaMapper.toEntity(entity);
        mtvJpaRepository.save(mtvEntity);
    }

    @Override
    @Transactional
    public void merge(Mtv entity) {
        MTVEntity mtvEntity = MTVJpaMapper.toEntity(entity);
        mtvJpaRepository.save(mtvEntity);
    }

    @Override
    @Transactional
    public void deleteById(MtvId mtvId) {
        Optional<MTVEntity> entity = mtvJpaRepository.findById(mtvId.getValue());
        entity.ifPresent(mtvJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mtv> findAll() {
        return MTVJpaMapper.toMtvList(
                mtvJpaRepository.findAll()
        );
    }
}

