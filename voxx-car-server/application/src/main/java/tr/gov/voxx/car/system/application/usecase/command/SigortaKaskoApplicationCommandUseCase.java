package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.SigortaKaskoApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.event.SigortaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaDeletedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

@Service
@RequiredArgsConstructor
public class SigortaKaskoApplicationCommandUseCase implements SigortaKaskoApplicationCommandPort {

    private final SigortaKaskoPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(SigortaKasko entity) {
        entity.initIdGenerator();

        domainEventPublisher.publish("sigorta-created-topic", SigortaCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .tip(entity.getTip())
                .sigortaSirketi(entity.getSigortaSirketi())
                .acente(entity.getAcente())
                .policeNo(entity.getPoliceNo())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .build());
    }

    @Override
    public void put(SigortaKasko entity) {
        SigortaKasko existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Sigorta not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("sigorta-updated-topic", SigortaUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .tip(entity.getTip())
                .sigortaSirketi(entity.getSigortaSirketi())
                .acente(entity.getAcente())
                .policeNo(entity.getPoliceNo())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .build());
    }

    @Override
    public void deleteById(SigortaId sigortaId) {
        domainEventPublisher.publish("sigorta-deleted-topic", SigortaDeletedEvent.builder()
                .id(sigortaId)
                .build());
    }
}

