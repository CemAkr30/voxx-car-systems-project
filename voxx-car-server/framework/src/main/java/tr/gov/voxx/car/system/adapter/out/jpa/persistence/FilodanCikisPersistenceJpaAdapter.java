package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FilodanCikisEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.FilodanCikisJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.FilodanCikisJpaRepository;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FilodanCikisPersistenceJpaAdapter implements FilodanCikisPersistenceJpaPort {

    private final FilodanCikisJpaRepository filodanCikisJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public FilodanCikis findById(FilodanCikisId filodanCikisId) {
        Optional<FilodanCikisEntity> entity = filodanCikisJpaRepository.findById(filodanCikisId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("FilodanCikis not found: " + filodanCikisId.getValue());
        }
        return FilodanCikisJpaMapper.toFilodanCikis(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(FilodanCikis entity) {
        FilodanCikisEntity filodanCikisEntity = FilodanCikisJpaMapper.toEntity(entity);
        filodanCikisJpaRepository.save(filodanCikisEntity);
    }

    @Override
    @Transactional
    public void merge(FilodanCikis entity) {
        FilodanCikisEntity filodanCikisEntity = FilodanCikisJpaMapper.toEntity(entity);
        filodanCikisJpaRepository.save(filodanCikisEntity);
    }

    @Override
    @Transactional
    public void deleteById(FilodanCikisId filodanCikisId) {
        Optional<FilodanCikisEntity> entity = filodanCikisJpaRepository.findById(filodanCikisId.getValue());
        entity.ifPresent(filodanCikisJpaRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FilodanCikis> findAll() {
        return FilodanCikisJpaMapper.toFilodanCikisList(
                filodanCikisJpaRepository.findAll()
        );
    }

    @Override
    public List<FilodanCikis> findAracIdGetAll(String aracId) {
        return FilodanCikisJpaMapper.toFilodanCikisList(
                filodanCikisJpaRepository.findByAracId(aracId)
        );
    }
}

