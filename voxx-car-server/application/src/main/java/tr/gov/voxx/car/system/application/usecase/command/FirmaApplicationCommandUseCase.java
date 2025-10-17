package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.FirmaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.FirmaPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmaApplicationCommandUseCase implements FirmaApplicationCommandPort {

    private final FirmaPersistenceJpaPort firmaPersistenceJpaPort;
    //private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Firma entity) {
        entity.initIdGenerator();
        /*domainEventPublisher.publish("firma-created-topic", FirmaCreatedEvent.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .unvan(entity.getUnvan())
                .vergiNo(entity.getVergiNo())
                .build());*/

        firmaPersistenceJpaPort.persist(entity);
        log.info("Persisted entity: {}", entity);
    }

    @Override
    public void put(Firma entity) {
        Firma existing = firmaPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Firma not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        /*domainEventPublisher.publish("firma-updated-topic", FirmaUpdatedEvent.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .unvan(entity.getUnvan())
                .vergiNo(entity.getVergiNo())
                .build());*/

        firmaPersistenceJpaPort.merge(existing);
        log.info("Updated entity: {}", entity);
    }

    @Override
    public void deleteById(FirmaId firmaId) {
        /*domainEventPublisher.publish("firma-deleted-topic", FirmaDeletedEvent.builder()
                .id(firmaId)
                .build());*/
        firmaPersistenceJpaPort.deleteById(firmaId);
    }
}

