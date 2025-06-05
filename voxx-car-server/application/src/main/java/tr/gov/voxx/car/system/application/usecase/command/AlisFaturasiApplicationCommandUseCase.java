package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AlisFaturasiApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

@Service
@RequiredArgsConstructor
public class AlisFaturasiApplicationCommandUseCase implements AlisFaturasiApplicationCommandPort {

    private final AlisFaturasiPersistenceJpaPort persistenceJpaPort;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(AlisFaturasi entity) {
        entity.initIdGenerator();

        domainEventPublisher.publish("alisfaturasi-created-topic", AlisFaturasiCreatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .alisFaturasiTarihi(entity.getAlisFaturasiTarihi())
                .alisFaturaNo(entity.getAlisFaturaNo())
                .saticiFirmaId(entity.getSaticiFirmaId())
                .listeFiyati(entity.getListeFiyati())
                .ekGaranti(entity.getEkGaranti())
                .malDegeri(entity.getMalDegeri())
                .iskonto(entity.getIskonto())
                .nakliyeBedeli(entity.getNakliyeBedeli())
                .otvMatrah(entity.getOtvMatrah())
                .otv(entity.getOtv())
                .otvIndirimi(entity.getOtvIndirimi())
                .kdv(entity.getKdv())
                .faturaToplam(entity.getFaturaToplam())
                .paraBirimi(entity.getParaBirimi())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .kur(entity.getKur())
                .faturaTry(entity.getFaturaTry())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .build());
    }

    @Override
    public void put(AlisFaturasi entity) {
        AlisFaturasi existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("AlisFaturasi not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        domainEventPublisher.publish("alisfaturasi-updated-topic", AlisFaturasiUpdatedEvent.builder()
                .id(entity.getId())
                .aracFiloId(entity.getAracFiloId())
                .alisFaturasiTarihi(entity.getAlisFaturasiTarihi())
                .alisFaturaNo(entity.getAlisFaturaNo())
                .saticiFirmaId(entity.getSaticiFirmaId())
                .listeFiyati(entity.getListeFiyati())
                .ekGaranti(entity.getEkGaranti())
                .malDegeri(entity.getMalDegeri())
                .iskonto(entity.getIskonto())
                .nakliyeBedeli(entity.getNakliyeBedeli())
                .otvMatrah(entity.getOtvMatrah())
                .otv(entity.getOtv())
                .otvIndirimi(entity.getOtvIndirimi())
                .kdv(entity.getKdv())
                .faturaToplam(entity.getFaturaToplam())
                .paraBirimi(entity.getParaBirimi())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .kur(entity.getKur())
                .faturaTry(entity.getFaturaTry())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .build());
    }

    @Override
    public void deleteById(AlisFaturasiId alisFaturasiId) {
        domainEventPublisher.publish("alisfaturasi-deleted-topic", AlisFaturasiDeletedEvent.builder()
                .id(alisFaturasiId)
                .build());
    }
}