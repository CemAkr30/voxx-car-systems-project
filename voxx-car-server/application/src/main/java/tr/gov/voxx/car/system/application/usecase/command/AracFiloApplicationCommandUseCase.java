package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

@Slf4j
@Service
@RequiredArgsConstructor
public class AracFiloApplicationCommandUseCase implements AracFiloApplicationCommandPort {

    private final AracFiloPersistenceJpaPort persistencePort;
    //private final DomainEventPublisher eventPublisher;

    @Override
    public void post(AracFilo entity) {
        entity.initIdGenerator();

        /*eventPublisher.publish("arac-filo-created-topic", AracFiloCreatedEvent.builder()
                .id(entity.getId())
                .plaka(entity.getPlaka())
                .markaId(entity.getMarkaId())
                .modelId(entity.getModelId())
                .modelYili(entity.getModelYili())
                .segment(entity.getSegment())
                .motorNo(entity.getMotorNo())
                .sasiNo(entity.getSasiNo())
                .renk(entity.getRenk())
                .kasaTipi(entity.getKasaTipi())
                .lastikTipi(entity.getLastikTipi())
                .filoyaGirisTarihi(entity.getFiloyaGirisTarihi())
                .filoyaGirisKm(entity.getFiloyaGirisKm())
                .tescilTarihi(entity.getTescilTarihi())
                .trafigeCikisTarihi(entity.getTrafigeCikisTarihi())
                .garantisiVarMi(entity.isGarantisiVarMi())
                .garantiBitisTarihi(entity.getGarantiBitisTarihi())
                .garantiSuresiYil(entity.getGarantiSuresiYil())
                .garantiKm(entity.getGarantiKm())
                .tramer(entity.isTramer())
                .tramerTutari(entity.getTramerTutari())
                .sonKmTarihi(entity.getSonKmTarihi())
                .sonKm(entity.getSonKm())
                .sonYakitMiktari(entity.getSonYakitMiktari())
                .kiralandiMi(entity.isKiralandiMi())
                .kiralandigiTarih(entity.getKiralandigiTarih())
                .kontratSuresi(entity.getKontratSuresi())
                .kiralikBitisTarihi(entity.getKiralikBitisTarihi())
                .kiralayanFirmaId(entity.getKiralayanFirmaId())
                .filoDurum(entity.getFiloDurum())
                .build());*/
        persistencePort.persist(entity);
        log.info("Persisted entity: {}", entity);
    }

    @Override
    public void put(AracFilo entity) {
        AracFilo existing = persistencePort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Araç bulunamadı: " + entity.getId().getValue());
        }

        /*eventPublisher.publish("arac-filo-updated-topic", AracFiloUpdatedEvent.builder()
                .id(entity.getId())
                .plaka(entity.getPlaka())
                .markaId(entity.getMarkaId())
                .modelId(entity.getModelId())
                .modelYili(entity.getModelYili())
                .segment(entity.getSegment())
                .motorNo(entity.getMotorNo())
                .sasiNo(entity.getSasiNo())
                .renk(entity.getRenk())
                .kasaTipi(entity.getKasaTipi())
                .lastikTipi(entity.getLastikTipi())
                .filoyaGirisTarihi(entity.getFiloyaGirisTarihi())
                .filoyaGirisKm(entity.getFiloyaGirisKm())
                .tescilTarihi(entity.getTescilTarihi())
                .trafigeCikisTarihi(entity.getTrafigeCikisTarihi())
                .garantisiVarMi(entity.isGarantisiVarMi())
                .garantiBitisTarihi(entity.getGarantiBitisTarihi())
                .garantiSuresiYil(entity.getGarantiSuresiYil())
                .garantiKm(entity.getGarantiKm())
                .tramer(entity.isTramer())
                .tramerTutari(entity.getTramerTutari())
                .sonKmTarihi(entity.getSonKmTarihi())
                .sonKm(entity.getSonKm())
                .sonYakitMiktari(entity.getSonYakitMiktari())
                .kiralandiMi(entity.isKiralandiMi())
                .kiralandigiTarih(entity.getKiralandigiTarih())
                .kontratSuresi(entity.getKontratSuresi())
                .kiralikBitisTarihi(entity.getKiralikBitisTarihi())
                .kiralayanFirmaId(entity.getKiralayanFirmaId())
                .filoDurum(entity.getFiloDurum())
                .build());*/

        persistencePort.merge(entity);
        log.info("Merged entity: {}", entity);
    }

    @Override
    public void deleteById(AracFiloId id) {
        //eventPublisher.publish("arac-filo-deleted-topic", AracFiloDeletedEvent.builder().id(id).build());
        persistencePort.deleteById(id);
        log.info("Deleted entity: {}", id);
    }
}
