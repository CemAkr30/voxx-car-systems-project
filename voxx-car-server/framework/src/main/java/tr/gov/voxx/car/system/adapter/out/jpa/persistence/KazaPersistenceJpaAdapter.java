package tr.gov.voxx.car.system.adapter.out.jpa.persistence;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.KazaEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.mapper.KazaJpaMapper;
import tr.gov.voxx.car.system.adapter.out.jpa.repository.KazaJpaRepository;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class KazaPersistenceJpaAdapter implements KazaPersistenceJpaPort {

    private final KazaJpaRepository kazaJpaRepository;

    @Override
    @Transactional
    public void persist(Kaza kaza) {
        kazaJpaRepository.save(KazaJpaMapper.toEntity(kaza));
    }

    @Override
    @Transactional
    public void merge(Kaza kaza) {
        kazaJpaRepository.save(KazaJpaMapper.toEntity(kaza));
    }

    @Override
    @Transactional(readOnly = true)
    public Kaza findById(KazaId id) {
        Optional<KazaEntity> entity = kazaJpaRepository.findById(id.getValue());
        if (entity.isEmpty()) throw new EntityNotFoundException("Kaza bulunamadı");
        return KazaJpaMapper.toKaza(entity.orElse(null));
    }

    @Override
    @Transactional
    public void deleteById(KazaId id) {
        Optional<KazaEntity> entity = kazaJpaRepository.findById(id.getValue());
        entity.ifPresent(e -> {
                    e.setDeleted(true);
                    kazaJpaRepository.save(e);
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Kaza> findAll() {
        return KazaJpaMapper.toKazaList(
                kazaJpaRepository.findByIsDeletedFalse()
        );
    }

    @Override
    public List<Kaza> findAracFiloIdGetAll(String aracFiloId) {
        return KazaJpaMapper.toKazaList(
                kazaJpaRepository.findByAracFiloId(aracFiloId)
        );
    }
}
