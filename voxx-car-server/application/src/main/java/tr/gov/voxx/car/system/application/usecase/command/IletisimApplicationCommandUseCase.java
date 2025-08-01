package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.IletisimApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.event.IletisimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimDeletedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

@Service
@RequiredArgsConstructor
public class IletisimApplicationCommandUseCase implements IletisimApplicationCommandPort {

    private final IletisimPersistenceJpaPort iletisimPersistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Iletisim entity) {
        entity.initIdGenerator();
        domainEventPublisher.publish("iletisim-created-topic", IletisimCreatedEvent.builder()
                .id(entity.getId())
                .firmaId(entity.getFirmaId())
                .numara(entity.getNumara())
                .tip(entity.getTip())
                .build());
    }

    @Override
    public void put(Iletisim entity) {
        Iletisim existing = iletisimPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Iletisim not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("iletisim-updated-topic", IletisimUpdatedEvent.builder()
                .id(entity.getId())
                .firmaId(entity.getFirmaId())
                .numara(entity.getNumara())
                .tip(entity.getTip())
                .build());
    }

    @Override
    public void deleteById(IletisimId iletisimId) {
        Iletisim existing = iletisimPersistenceJpaPort.findById(iletisimId);
        if (existing == null) {
            throw new NotFoundException("Iletisim not found with id: " + iletisimId);
        }
        
        domainEventPublisher.publish("iletisim-deleted-topic", IletisimDeletedEvent.builder()
                .id(iletisimId)
                .firmaId(existing.getFirmaId())
                .build());
    }
}

