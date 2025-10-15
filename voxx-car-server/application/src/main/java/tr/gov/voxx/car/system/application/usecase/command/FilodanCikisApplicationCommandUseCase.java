package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.FilodanCikisApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilodanCikisApplicationCommandUseCase implements FilodanCikisApplicationCommandPort {

    private final FilodanCikisPersistenceJpaPort persistenceJpaPort;
    private final AracFiloPersistenceJpaPort aracFiloPersistenceJpaPort;

    @Override
    public void post(FilodanCikis entity) {
        entity.initIdGenerator();
        persistenceJpaPort.persist(entity);

        // Araç çıkışı yapılınca filoDurum = 1 yap
        aracFiloPersistenceJpaPort.updateFiloDurum(entity.getAracFiloId().getValue(), 1);

        log.info("Persisted FilodanCikis entity: {} and updated AracFilo filoDurum to 1", entity);
    }

    @Override
    public void put(FilodanCikis entity) {
        FilodanCikis existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("FilodanCikis not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);
        persistenceJpaPort.merge(existing);
        log.info("Updated FilodanCikis entity: {}", entity);
    }

    @Override
    public void deleteById(FilodanCikisId filodanCikisId) {
        FilodanCikis existing = persistenceJpaPort.findById(filodanCikisId);
        if (existing == null) {
            throw new NotFoundException("FilodanCikis not found with id: " + filodanCikisId);
        }

        persistenceJpaPort.deleteById(filodanCikisId);
        log.info("Deleted FilodanCikis entity: {}", existing);

        AracFiloId aracFiloId = existing.getAracFiloId();
        String aracFiloIdStr = aracFiloId.getValue();
        int aktifCikisSayisi = persistenceJpaPort.countByAracFiloIdAndIsDeletedFalse(aracFiloIdStr);

        if (aktifCikisSayisi == 0) {
            // Aktif çıkış kalmadıysa filoDurum = 0 yap
            aracFiloPersistenceJpaPort.updateFiloDurum(aracFiloIdStr, 0);
            log.info("Updated AracFilo {} filoDurum to 0 as no active FilodanCikis remains", aracFiloId);
        }
    }
}

