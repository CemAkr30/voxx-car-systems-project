package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracKullananApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracKullananPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.event.AracKullananCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

@Service
@RequiredArgsConstructor
public class AracKullananApplicationCommandUseCase implements AracKullananApplicationCommandPort {

    private final AracKullananPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(AracKullanan entity) {
        entity.initIdGenerator();
        domainEventPublisher.publish("arackullanan-created-topic", AracKullananCreatedEvent.builder()
                .id(entity.getId())
                .ad(entity.getAd())
                .email(entity.getEmail())
                .telefonNo(entity.getTelefonNo())
                .adres(entity.getTelefonNo())
                .telefonNo(entity.getTelefonNo())
                .adres(entity.getAdres())
                .ehliyetNo(entity.getEhliyetNo())
                .ehliyetTipi(entity.getEhliyetTipi())
                .ehliyetOn(entity.getEhliyetOn())
                .ehliyetArka(entity.getEhliyetArka())
                .ehliyetBitisTarihi(entity.getEhliyetBitisTarihi())
                .cinsiyetTipi(entity.getCinsiyetTipi())
                .soyad(entity.getSoyad())
                .firmaId(entity.getFirmaId())
                .build());
    }

    @Override
    public void put(AracKullanan entity) {
        AracKullanan existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("AracKullanan not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("arackullanan-updated-topic", AracKullananUpdatedEvent.builder()
                .id(entity.getId())
                .ad(entity.getAd())
                .email(entity.getEmail())
                .telefonNo(entity.getTelefonNo())
                .adres(entity.getTelefonNo())
                .telefonNo(entity.getTelefonNo())
                .adres(entity.getAdres())
                .ehliyetNo(entity.getEhliyetNo())
                .ehliyetTipi(entity.getEhliyetTipi())
                .ehliyetOn(entity.getEhliyetOn())
                .ehliyetArka(entity.getEhliyetArka())
                .ehliyetBitisTarihi(entity.getEhliyetBitisTarihi())
                .cinsiyetTipi(entity.getCinsiyetTipi())
                .soyad(entity.getSoyad())
                .firmaId(entity.getFirmaId())
                .build());
    }

    @Override
    public void deleteById(AracKullananId aracKullananId) {
        domainEventPublisher.publish("arackullanan-deleted-topic", AracKullananDeletedEvent.builder()
                .id(aracKullananId)
                .build());
    }
}


