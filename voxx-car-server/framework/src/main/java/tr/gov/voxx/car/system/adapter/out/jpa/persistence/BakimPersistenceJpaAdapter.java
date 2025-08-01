package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.BakimEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.BakimJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.BakimJpaRepository;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BakimPersistenceJpaAdapter implements BakimPersistenceJpaPort {

    private final BakimJpaRepository bakimJpaRepository;

    @Override
    @Transactional
    public void persist(Bakim entity) {
        BakimEntity bakimEntity = BakimJpaMapper.toEntity(entity);
        bakimJpaRepository.save(bakimEntity);
    }

    @Override
    @Transactional
    public void merge(Bakim entity) {
        BakimEntity bakimEntity = BakimJpaMapper.toEntity(entity);
        bakimJpaRepository.save(bakimEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public Bakim findById(BakimId bakimId) {
        Optional<BakimEntity> entity = bakimJpaRepository.findById(bakimId.getValue());
        if (entity.isEmpty()) throw new EntityNotFoundException("Bakım not found" + bakimId.getValue());
        return BakimJpaMapper.toBakim(entity.orElse(null));
    }

    @Override
    @Transactional
    public void deleteById(BakimId bakimId) {
        Optional<BakimEntity> entity = bakimJpaRepository.findById(bakimId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    bakimJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Bakim> findAll() {
        return BakimJpaMapper.toBakimList(
                bakimJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<Bakim> findAracFiloIdGetAll(String aracFiloId) {
        return BakimJpaMapper.toBakimList(
                bakimJpaRepository.findByAracFiloId(aracFiloId)
        );
    }
}
