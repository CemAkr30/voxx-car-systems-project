package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracFiloPersistenceJpaPort;
import tr.gov.voxx.car.system.common.application.port.out.event.DomainEventPublisher;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloDeletedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

@Service
@RequiredArgsConstructor
public class AracFiloApplicationCommandUseCase implements AracFiloApplicationCommandPort {

    private final AracFiloPersistenceJpaPort persistencePort;
    private final DomainEventPublisher eventPublisher;

    @Override
    public void post(AracFilo entity) {
        entity.initIdGenerator();

        eventPublisher.publish("arac-filo-created", AracFiloCreatedEvent.builder()
                .id(entity.getId())
                .plaka(entity.getPlaka())
                .markaId(entity.getMarkaId())
                .modelId(entity.getModelId())
                .modelYili(entity.getModelYili())
                .aracTipi(entity.getAracTipi())
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
                .build());
    }

    @Override
    public void put(AracFilo entity) {
        AracFilo existing = persistencePort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("Araç bulunamadı: " + entity.getId().getValue());
        }

        eventPublisher.publish("arac-filo-updated", AracFiloUpdatedEvent.builder()
                .id(entity.getId())
                .plaka(entity.getPlaka())
                .markaId(entity.getMarkaId())
                .modelId(entity.getModelId())
                .modelYili(entity.getModelYili())
                .aracTipi(entity.getAracTipi())
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
                .build());
    }

    @Override
    public void deleteById(AracFiloId id) {
        eventPublisher.publish("arac-filo-deleted", AracFiloDeletedEvent.builder().id(id).build());
    }
}
