package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AdresApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.event.AdresCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AdresDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AdresUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

@Service
@RequiredArgsConstructor
public class AdresApplicationCommandUseCase implements AdresApplicationCommandPort {

    private final AdresPersistenceJpaPort adresPersistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Adres entity) {
        entity.initIdGenerator();
        domainEventPublisher.publish("adres-created-topic", AdresCreatedEvent.builder()
                .id(entity.getId())
                .tip(entity.getTip())
                .aciklama(entity.getAciklama())
                .firmaId(entity.getFirmaId())
                .build());
    }

    @Override
    public void put(Adres entity) {
        Adres existing = adresPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Adres not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("adres-updated-topic", AdresUpdatedEvent.builder()
                .id(entity.getId())
                .tip(entity.getTip())
                .aciklama(entity.getAciklama())
                .firmaId(entity.getFirmaId())
                .build());
    }

    @Override
    public void deleteById(AdresId adresId) {
        Adres existing = adresPersistenceJpaPort.findById(adresId);
        if (existing == null) {
            throw new NotFoundException("Adres not found with id: " + adresId);
        }
        
        domainEventPublisher.publish("adres-deleted-topic", AdresDeletedEvent.builder()
                .id(adresId)
                .firmaId(existing.getFirmaId())
                .build());
    }
}

