package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.MTVPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.event.MTVCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MTVDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MTVUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

@Service
@RequiredArgsConstructor
public class MTVApplicationCommandUseCase implements MTVApplicationCommandPort {

    private final MTVPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Mtv entity) {
        entity.initIdGenerator();
        domainEventPublisher.publish("mtv-created-topic", MTVCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .yil(entity.getYil())
                .taksit(entity.getTaksit())
                .makbuzNo(entity.getMakbuzNo())
                .miktar(entity.getMiktar())
                .odemeTipi(entity.getOdemeTipi())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .aciklama(entity.getAciklama())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .odendi(entity.getOdendi())
                .build());
    }

    @Override
    public void put(Mtv entity) {
        Mtv existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Mtv not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);
        domainEventPublisher.publish("mtv-updated-topic", MTVUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .yil(entity.getYil())
                .taksit(entity.getTaksit())
                .makbuzNo(entity.getMakbuzNo())
                .miktar(entity.getMiktar())
                .odemeTipi(entity.getOdemeTipi())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .aciklama(entity.getAciklama())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .odendi(entity.getOdendi())
                .build());
    }

    @Override
    public void deleteById(MtvId mtvId) {
        domainEventPublisher.publish("mtv-deleted-topic", MTVDeletedEvent.builder()
                .id(mtvId)
                .build());
    }
}


