package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.HasarApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.HasarPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.event.HasarCreatedEvent;
import tr.gov.voxx.car.system.domain.event.HasarDeletedEvent;
import tr.gov.voxx.car.system.domain.event.HasarUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

@Service
@RequiredArgsConstructor
public class HasarApplicationCommandUseCase implements HasarApplicationCommandPort {

    private final HasarPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Hasar entity) {
        entity.initIdGenerator();

        domainEventPublisher.publish("hasar-created-topic", HasarCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .hasarliParca(entity.getHasarliParca())
                .hasarTipi(entity.getHasarTipi())
                .build());
    }

    @Override
    public void put(Hasar entity) {
        Hasar existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Hasar not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("Hasar-updated-topic", HasarUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .hasarliParca(entity.getHasarliParca())
                .hasarTipi(entity.getHasarTipi())
                .build());
    }

    @Override
    public void deleteById(HasarId hasarId) {
        domainEventPublisher.publish("Hasar-deleted-topic", HasarDeletedEvent.builder()
                .id(hasarId)
                .build());
    }
}



