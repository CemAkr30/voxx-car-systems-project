package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AlisFaturasiApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AlisFaturasiPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlisFaturasiApplicationCommandUseCase implements AlisFaturasiApplicationCommandPort {

    private final AlisFaturasiPersistenceJpaPort persistenceJpaPort;
    //private final DomainEventPublisher domainEventPublisher;

    @Override
    public void post(AlisFaturasi entity) {
        entity.initIdGenerator();

        /*domainEventPublisher.publish("alisfaturasi-created-topic", AlisFaturasiCreatedEvent.builder()
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
                .aciklama(entity.getAciklama())
                .build());*/

        persistenceJpaPort.persist(entity);
        log.info("Persisted entity: {}", entity);
    }

    @Override
    public void put(AlisFaturasi entity) {
        AlisFaturasi existing = persistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("AlisFaturasi not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);

        /*domainEventPublisher.publish("alisfaturasi-updated-topic", AlisFaturasiUpdatedEvent.builder()
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
                .aciklama(entity.getAciklama())
                .build());*/
        persistenceJpaPort.merge(existing);
        log.info("Updated entity: {}", entity);
    }

    @Override
    public void deleteById(AlisFaturasiId alisFaturasiId) {
        AlisFaturasi existing = persistenceJpaPort.findById(alisFaturasiId);
        if (existing == null) {
            throw new NotFoundException("AlisFaturasi not found with id: " + alisFaturasiId);
        }
        
        /*domainEventPublisher.publish("alisfaturasi-deleted-topic", AlisFaturasiDeletedEvent.builder()
                .id(alisFaturasiId)
                .aracFiloId(existing.getAracFiloId())
                .build());*/
        persistenceJpaPort.deleteById(alisFaturasiId);
        log.info("Deleted entity: {}", alisFaturasiId);
    }
}