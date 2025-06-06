package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.KazaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.KazaPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.event.KazaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.KazaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.KazaUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

@Service
@RequiredArgsConstructor
public class KazaApplicationCommandUseCase implements KazaApplicationCommandPort {

    private final KazaPersistenceJpaPort persistencePort;
    private final DomainEventPublisher publisher;

    @Override
    public void post(Kaza entity) {
        entity.initIdGenerator();
        publisher.publish("kaza-created-topic", KazaCreatedEvent.builder()
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
                .build());
    }

    @Override
    public void put(Kaza entity) {
        Kaza existing = persistencePort.findById(entity.getId());
        if (existing == null)
            throw new NotFoundException("Kaza bulunamadı: " + entity.getId().getValue());

        persistencePort.merge(entity);
        publisher.publish("kaza-updated-topic", KazaUpdatedEvent.builder()
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
                .build());
    }

    @Override
    public void deleteById(KazaId id) {
        persistencePort.deleteById(id);
        publisher.publish("kaza-deleted", KazaDeletedEvent.builder().id(id).build());
    }
}
