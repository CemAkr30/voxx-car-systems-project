package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.ModelApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.ModelPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.event.ModelCreatedEvent;
import tr.gov.voxx.car.system.domain.event.ModelDeletedEvent;
import tr.gov.voxx.car.system.domain.event.ModelUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.BusinessRuleException;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelApplicationCommandUseCase implements ModelApplicationCommandPort {

    private final ModelPersistenceJpaPort modelPersistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Model entity) {
        entity.initIdGenerator();
        Optional<Model> optModel = modelPersistenceJpaPort.findByAdi(entity.getAdi());
        if (optModel.isPresent()) {
            throw new BusinessRuleException("Model already exists");
        }
        domainEventPublisher.publish("model-created-topic", ModelCreatedEvent.builder()
                .id(entity.getId())
                .adi(entity.getAdi())
                .markaId(entity.getMarkaId())
                .build());
    }

    @Override
    public void put(Model entity) {
        Model existing = modelPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Model not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("model-updated-topic", ModelUpdatedEvent.builder()
                .id(entity.getId())
                .adi(entity.getAdi())
                .markaId(entity.getMarkaId())
                .build());
    }

    @Override
    public void deleteById(ModelId modelId) {
        domainEventPublisher.publish("model-deleted-topic", ModelDeletedEvent.builder()
                .id(modelId)
                .build());
    }
}

