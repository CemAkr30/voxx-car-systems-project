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
    //private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(FilodanCikis entity) {
        entity.initIdGenerator();

        /*domainEventPublisher.publish("filodancikis-created-topic", FilodanCikisCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .filodanCikisNedeni(entity.getFilodanCikisNedeni())
                .filodanCikisTarihi(entity.getFilodanCikisTarihi())
                .alici(entity.getAlici())
                .anahtarTeslimFiyati(entity.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(entity.getAracDevirGiderleri())
                .faturaYukle(entity.getFaturaYukle())
                .aciklama(entity.getAciklama())
                .build());*/
        persistenceJpaPort.persist(entity);
        AracFiloId aracFiloId = entity.getAracFiloId();
        String aracFiloIdStr = aracFiloId.getValue();
        aracFiloPersistenceJpaPort.updateFiloDurum(aracFiloIdStr, 1);
        log.info("Persisted entity: {}", entity);
    }


    @Override
    public void put(FilodanCikis entity) {
        FilodanCikis existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("FilodanCikis not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        /*domainEventPublisher.publish("filodancikis-updated-topic", FilodanCikisUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .filodanCikisNedeni(entity.getFilodanCikisNedeni())
                .filodanCikisTarihi(entity.getFilodanCikisTarihi())
                .alici(entity.getAlici())
                .anahtarTeslimFiyati(entity.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(entity.getAracDevirGiderleri())
                .faturaYukle(entity.getFaturaYukle())
                .aciklama(entity.getAciklama())
                .build());*/
        persistenceJpaPort.merge(existing);
        log.info("Updated entity: {}", entity);
    }

    @Override
    public void deleteById(FilodanCikisId filodanCikisId) {
        FilodanCikis existing = persistenceJpaPort.findById(filodanCikisId);
        if (existing == null) {
            throw new NotFoundException("FilodanCikis not found with id: " + filodanCikisId);
        }

        persistenceJpaPort.deleteById(filodanCikisId);
        log.info("Deleted entity: {}", existing);

        AracFiloId aracFiloId = existing.getAracFiloId();
        String aracFiloIdStr = aracFiloId.getValue();
        int aktifCikisSayisi = persistenceJpaPort.countByAracFiloIdAndIsDeletedFalse(aracFiloIdStr);

        if (aktifCikisSayisi == 0) {
            aracFiloPersistenceJpaPort.updateFiloDurum(aracFiloIdStr, 0);
            log.info("Updated AracFilo {} filoDurum to 0 because no active FilodanCikis remains", aracFiloId);
        }
    }
}
