package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AlisFaturasiEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.AlisFaturasiJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.AlisFaturasiJpaRepository;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AlisFaturasiPersistenceJpaAdapter implements AlisFaturasiPersistenceJpaPort {

    private final AlisFaturasiJpaRepository alisFaturasiJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public AlisFaturasi findById(AlisFaturasiId alisFaturasiId) {
        Optional<AlisFaturasiEntity> entity = alisFaturasiJpaRepository.findById(alisFaturasiId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("AlisFaturasi not found: " + alisFaturasiId.getValue());
        }
        return AlisFaturasiJpaMapper.toAlisFaturasi(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(AlisFaturasi entity) {
        AlisFaturasiEntity alisFaturasiEntity = AlisFaturasiJpaMapper.toEntity(entity);
        alisFaturasiJpaRepository.save(alisFaturasiEntity);
    }

    @Override
    @Transactional
    public void merge(AlisFaturasi entity) {
        AlisFaturasiEntity alisFaturasiEntity = AlisFaturasiJpaMapper.toEntity(entity);
        alisFaturasiJpaRepository.save(alisFaturasiEntity);
    }

    @Override
    @Transactional
    public void deleteById(AlisFaturasiId alisFaturasiId) {
        Optional<AlisFaturasiEntity> entity = alisFaturasiJpaRepository.findById(alisFaturasiId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    alisFaturasiJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlisFaturasi> findAll() {
        return AlisFaturasiJpaMapper.toAlisFaturasiList(
                alisFaturasiJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<AlisFaturasi> findAracFiloIdGetAll(String aracFiloId) {
        return AlisFaturasiJpaMapper.toAlisFaturasiList(
                alisFaturasiJpaRepository.findByAracFiloId(aracFiloId)
        );
    }
}


