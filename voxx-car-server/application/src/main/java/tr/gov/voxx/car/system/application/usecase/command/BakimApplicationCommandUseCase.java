package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.BakimApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.BakimPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

@Service
@RequiredArgsConstructor
public class BakimApplicationCommandUseCase implements BakimApplicationCommandPort {

    private final BakimPersistenceJpaPort persistencePort;
    private final DomainEventPublisher publisher;

    @Override
    public void post(Bakim entity) {
        entity.initIdGenerator();
        publisher.publish("bakim-created-topic", BakimCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .bakimNedeni(entity.getBakimNedeni())
                .parca(entity.getParca())
                .parcaTutari(entity.getParcaTutari())
                .iscilikTutari(entity.getIscilikTutari())
                .toplamTutar(entity.getToplamTutar())
                .faturaNo(entity.getFaturaNo())
                .fatura(entity.getFatura())
                .aciklama(entity.getAciklama())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .build());
    }

    @Override
    public void put(Bakim entity) {
        Bakim existing = persistencePort.findById(entity.getId());
        if (existing == null)
            throw new NotFoundException("Bakim not found with id:" + entity.getId());

        existing.updateFrom(entity);

        publisher.publish("bakim-updated-topic", BakimUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .bakimNedeni(entity.getBakimNedeni())
                .parca(entity.getParca())
                .parcaTutari(entity.getParcaTutari())
                .iscilikTutari(entity.getIscilikTutari())
                .toplamTutar(entity.getToplamTutar())
                .faturaNo(entity.getFaturaNo())
                .fatura(entity.getFatura())
                .aciklama(entity.getAciklama())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .build());
    }

    @Override
    public void deleteById(BakimId id) {
        publisher.publish("bakim-deleted-topic", BakimDeletedEvent.builder().id(id).build());
    }
}
