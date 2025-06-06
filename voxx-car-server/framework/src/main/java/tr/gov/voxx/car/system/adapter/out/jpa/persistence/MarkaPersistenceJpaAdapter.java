package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MarkaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MarkaJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.MarkaJpaRepository;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MarkaPersistenceJpaAdapter implements MarkaPersistenceJpaPort {
    private final MarkaJpaRepository markaJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Marka findById(MarkaId markaId) {
        Optional<MarkaEntity> entity = markaJpaRepository.findById(markaId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Marka not found: " + markaId.getValue());
        }
        return MarkaJpaMapper.toMarka(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Marka entity) {
        MarkaEntity markaEntity = MarkaJpaMapper.toEntity(entity);
        markaJpaRepository.save(markaEntity);
    }

    @Override
    @Transactional
    public void merge(Marka entity) {
        MarkaEntity markaEntity = MarkaJpaMapper.toEntity(entity);
        markaJpaRepository.save(markaEntity);
    }

    @Override
    @Transactional
    public void deleteById(MarkaId markaId) {
        Optional<MarkaEntity> entity = markaJpaRepository.findById(markaId.getValue());
        entity.ifPresent(markaJpaRepository::delete);
    }


    @Override
    @Transactional(readOnly = true)
    public List<Marka> findAll() {
        return MarkaJpaMapper.toMarkaList(
                markaJpaRepository.findAll()
        );
    }

    @Override
    public Optional<Marka> findByAdi(String adi) {
        List<MarkaEntity> results = markaJpaRepository.findByAdi(adi);

        if (results.isEmpty()) {
            return Optional.empty();
        }

        Marka marka = MarkaJpaMapper.toMarka(results.get(0));
        return Optional.of(marka);
    }
}
