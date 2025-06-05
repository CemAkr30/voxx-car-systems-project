package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.FilodanCikisApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.FilodanCikisPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.event.FilodanCikisCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisDeletedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

@Service
@RequiredArgsConstructor
public class FilodanCikisApplicationCommandUseCase implements FilodanCikisApplicationCommandPort {

    private final FilodanCikisPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(FilodanCikis entity) {
        entity.initIdGenerator();

        domainEventPublisher.publish("filodancikis-created-topic", FilodanCikisCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .filodanCikisNedeni(entity.getFilodanCikisNedeni())
                .filodanCikisTarihi(entity.getFilodanCikisTarihi())
                .alici(entity.getAlici())
                .anahtarTeslimFiyati(entity.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(entity.getAracDevirGiderleri())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .build());
    }


    @Override
    public void put(FilodanCikis entity) {
        FilodanCikis existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("FilodanCikis not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("filodancikis-updated-topic", FilodanCikisUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .filodanCikisNedeni(entity.getFilodanCikisNedeni())
                .filodanCikisTarihi(entity.getFilodanCikisTarihi())
                .alici(entity.getAlici())
                .anahtarTeslimFiyati(entity.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(entity.getAracDevirGiderleri())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .build());
    }

    @Override
    public void deleteById(FilodanCikisId filodanCikisId) {
        domainEventPublisher.publish("filodancikis-deleted-topic", FilodanCikisDeletedEvent.builder()
                .id(filodanCikisId)
                .build());
    }
}
