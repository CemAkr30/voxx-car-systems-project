package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MuayeneEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.MuayeneJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.MuayeneJpaRepository;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MuayenePersistenceJpaAdapter implements MuayenePersistenceJpaPort {

    private final MuayeneJpaRepository muayeneJpaRepository;

    @Override
    @Transactional(readOnly = true)
    public Muayene findById(MuayeneId muayeneId) {
        Optional<MuayeneEntity> entity = muayeneJpaRepository.findById(muayeneId.getValue());
        if (entity.isEmpty()) {
            throw new EntityNotFoundException("Muayene not found: " + muayeneId.getValue());
        }
        return MuayeneJpaMapper.toMuayene(entity.orElse(null));
    }

    @Override
    @Transactional
    public void persist(Muayene entity) {
        MuayeneEntity muayeneEntity = MuayeneJpaMapper.toEntity(entity);
        muayeneJpaRepository.save(muayeneEntity);
    }

    @Override
    @Transactional
    public void merge(Muayene entity) {
        MuayeneEntity muayeneEntity = MuayeneJpaMapper.toEntity(entity);
        muayeneJpaRepository.save(muayeneEntity);
    }

    @Override
    @Transactional
    public void deleteById(MuayeneId muayeneId) {
        Optional<MuayeneEntity> entity = muayeneJpaRepository.findById(muayeneId.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    muayeneJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Muayene> findAll() {
        return MuayeneJpaMapper.toMuayeneList(
                muayeneJpaRepository.findAll()
        );
    }

    @Override
    public List<Muayene> findAracFiloIdGetAll(String aracFiloId) {
        return MuayeneJpaMapper.toMuayeneList(
                muayeneJpaRepository.findByAracFiloId(aracFiloId)
        );
    }
}

