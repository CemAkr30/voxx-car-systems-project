package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.KazaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

@Slf4j
@Service
@RequiredArgsConstructor
public class KazaApplicationCommandUseCase implements KazaApplicationCommandPort {

    private final KazaPersistenceJpaPort persistencePort;
    //private final DomainEventPublisher publisher;

    @Override
    public void post(Kaza entity) {
        entity.initIdGenerator();
        /*publisher.publish("kaza-created-topic", KazaCreatedEvent.builder()
                .id(entity.getId())
                .aracId(entity.getAracFiloId())
                .firmaId(entity.getFirmaId())
                .musteriId(entity.getMusteriId())
                .kazaTarihi(entity.getKazaTarihi())
                .kazaIli(entity.getKazaIli())
                .kazaNedeni(entity.getKazaNedeni())
                .kazaTutanagi(entity.getKazaTutanagi())
                .onarimDurumu(entity.getOnarimDurumu())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .build());*/

        persistencePort.persist(entity);
        log.info("Persisted entity: {}", entity);
    }

    @Override
    public void put(Kaza entity) {
        Kaza existing = persistencePort.findById(entity.getId());
        if (existing == null)
            throw new NotFoundException("Kaza bulunamadı: " + entity.getId().getValue());

        existing.updateFrom(entity);
        /*publisher.publish("kaza-updated-topic", KazaUpdatedEvent.builder()
                .id(entity.getId())
                .aracId(entity.getAracFiloId())
                .firmaId(entity.getFirmaId())
                .musteriId(entity.getMusteriId())
                .kazaTarihi(entity.getKazaTarihi())
                .kazaIli(entity.getKazaIli())
                .kazaNedeni(entity.getKazaNedeni())
                .kazaTutanagi(entity.getKazaTutanagi())
                .onarimDurumu(entity.getOnarimDurumu())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .build());*/

        persistencePort.merge(existing);
        log.info("Merged entity: {}", existing);
    }

    @Override
    public void deleteById(KazaId id) {
        //publisher.publish("kaza-deleted", KazaDeletedEvent.builder().id(id).build());
        persistencePort.deleteById(id);
        log.info("Deleted entity: {}", id);
    }
}
