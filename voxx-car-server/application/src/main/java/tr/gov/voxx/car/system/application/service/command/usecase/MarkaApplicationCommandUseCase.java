package tr.gov.voxx.car.system.application.service.command.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MarkaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.MarkaPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.event.*;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

@Service
@RequiredArgsConstructor
public class MarkaApplicationCommandUseCase implements MarkaApplicationCommandPort {

    private final MarkaPersistenceJpaPort markaPersistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Marka entity) {
        entity.initIdGenerator();
        domainEventPublisher.publish("marka-created", MarkaCreatedEvent.builder()
                .id(entity.getId())
                .adi(entity.getAdi())
                .build());
    }

    @Override
    public void put(Marka entity) {
        Marka existing = markaPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new RuntimeException("Marka not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("marka-updated", MarkaUpdatedEvent.builder()
                .id(entity.getId())
                .adi(entity.getAdi())
                .build());
    }

    @Override
    public void deleteById(MarkaId markaId) {
        domainEventPublisher.publish("marka-deleted", MarkaDeletedEvent.builder()
                .id(markaId)
                .build());
        markaPersistenceJpaPort.deleteById(markaId);
    }
}

