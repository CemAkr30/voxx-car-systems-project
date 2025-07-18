package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.MuayenePersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.event.MuayeneCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneDeletedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

@Service
@RequiredArgsConstructor
public class MuayeneApplicationCommandUseCase implements MuayeneApplicationCommandPort {

    private final MuayenePersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(Muayene entity) {
        entity.initIdGenerator();

        domainEventPublisher.publish("muayene-created-topic", MuayeneCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .muayeneTipi(entity.getMuayeneTipi())
                .makbuzNo(entity.getMakbuzNo())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .aciklama(entity.getAciklama())
                .yeri(entity.getYeri())
                .odemeTipi(entity.getOdemeTipi())
                .miktar(entity.getMiktar())
                .odendi(entity.getOdendi())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .build());
    }


    @Override
    public void put(Muayene entity) {
        Muayene existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Muayene not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("muayene-updated-topic", MuayeneUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .muayeneTipi(entity.getMuayeneTipi())
                .makbuzNo(entity.getMakbuzNo())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .aciklama(entity.getAciklama())
                .yeri(entity.getYeri())
                .odemeTipi(entity.getOdemeTipi())
                .miktar(entity.getMiktar())
                .odendi(entity.getOdendi())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .build());
    }

    @Override
    public void deleteById(MuayeneId muayeneId) {
        domainEventPublisher.publish("muayene-deleted-topic", MuayeneDeletedEvent.builder()
                .id(muayeneId)
                .build());
    }
}




