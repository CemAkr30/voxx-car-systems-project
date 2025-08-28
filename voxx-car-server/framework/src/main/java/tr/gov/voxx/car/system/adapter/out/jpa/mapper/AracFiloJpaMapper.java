package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFiloEntity;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class AracFiloJpaMapper {

    public static AracFilo toAracFilo(AracFiloEntity entity) {
        if (entity == null) {
            return null;
        }

        return AracFilo.builder()
                .id(new AracFiloId(entity.getId()))
                .plaka(entity.getPlaka())
                .markaId(new MarkaId(entity.getMarkaId()))
                .modelId(new ModelId(entity.getModelId()))
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
                .kiralayanFirmaId(new FirmaId(entity.getKiralayanFirmaId()))
                .filoDurum(entity.getFiloDurum())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static AracFiloEntity toEntity(AracFilo aracFilo) {
        if (aracFilo == null) {
            return null;
        }

        AracFiloEntity entity = new AracFiloEntity();
        entity.setId(aracFilo.getId().getValue());
        entity.setPlaka(aracFilo.getPlaka());
        entity.setMarkaId(aracFilo.getMarkaId().getValue());
        entity.setModelId(aracFilo.getModelId().getValue());
        entity.setModelYili(aracFilo.getModelYili());
        entity.setAracTipi(aracFilo.getAracTipi());
        entity.setSegment(aracFilo.getSegment());
        entity.setMotorNo(aracFilo.getMotorNo());
        entity.setSasiNo(aracFilo.getSasiNo());
        entity.setRenk(aracFilo.getRenk());
        entity.setKasaTipi(aracFilo.getKasaTipi());
        entity.setLastikTipi(aracFilo.getLastikTipi());
        entity.setFiloyaGirisTarihi(aracFilo.getFiloyaGirisTarihi());
        entity.setFiloyaGirisKm(aracFilo.getFiloyaGirisKm());
        entity.setTescilTarihi(aracFilo.getTescilTarihi());
        entity.setTrafigeCikisTarihi(aracFilo.getTrafigeCikisTarihi());
        entity.setGarantisiVarMi(aracFilo.isGarantisiVarMi());
        entity.setGarantiBitisTarihi(aracFilo.getGarantiBitisTarihi());
        entity.setGarantiSuresiYil(aracFilo.getGarantiSuresiYil());
        entity.setGarantiKm(aracFilo.getGarantiKm());
        entity.setTramer(aracFilo.isTramer());
        entity.setTramerTutari(aracFilo.getTramerTutari());
        entity.setSonKmTarihi(aracFilo.getSonKmTarihi());
        entity.setSonKm(aracFilo.getSonKm());
        entity.setSonYakitMiktari(aracFilo.getSonYakitMiktari());
        entity.setKiralandiMi(aracFilo.isKiralandiMi());
        entity.setKiralandigiTarih(aracFilo.getKiralandigiTarih());
        entity.setKontratSuresi(aracFilo.getKontratSuresi());
        entity.setKiralikBitisTarihi(aracFilo.getKiralikBitisTarihi());
        entity.setKiralayanFirmaId(aracFilo.getKiralayanFirmaId().getValue());
        entity.setFiloDurum(aracFilo.getFiloDurum());
        return entity;
    }

    public static List<AracFilo> toAracFiloList(List<AracFiloEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(AracFiloJpaMapper::toAracFilo)
                .collect(Collectors.toList());
    }

    public static AracFilo toAracFiloFromAracFiloCreatedEvent(AracFiloCreatedEvent event) {
        return AracFilo.builder()
                .id(event.id())
                .plaka(event.plaka())
                .markaId(event.markaId())
                .modelId(event.modelId())
                .modelYili(event.modelYili())
                .aracTipi(event.aracTipi())
                .segment(event.segment())
                .motorNo(event.motorNo())
                .sasiNo(event.sasiNo())
                .renk(event.renk())
                .kasaTipi(event.kasaTipi())
                .lastikTipi(event.lastikTipi())
                .filoyaGirisTarihi(event.filoyaGirisTarihi())
                .filoyaGirisKm(event.filoyaGirisKm())
                .tescilTarihi(event.tescilTarihi())
                .trafigeCikisTarihi(event.trafigeCikisTarihi())
                .garantisiVarMi(event.garantisiVarMi())
                .garantiBitisTarihi(event.garantiBitisTarihi())
                .garantiSuresiYil(event.garantiSuresiYil())
                .garantiKm(event.garantiKm())
                .tramer(event.tramer())
                .tramerTutari(event.tramerTutari())
                .sonKmTarihi(event.sonKmTarihi())
                .sonKm(event.sonKm())
                .sonYakitMiktari(event.sonYakitMiktari())
                .kiralandiMi(event.kiralandiMi())
                .kiralandigiTarih(event.kiralandigiTarih())
                .kontratSuresi(event.kontratSuresi())
                .kiralikBitisTarihi(event.kiralikBitisTarihi())
                .kiralayanFirmaId(event.kiralayanFirmaId())
                .filoDurum(event.filoDurum())
                .build();
    }

    public static AracFilo toAracFiloFromAracFiloUpdatedEvent(AracFiloUpdatedEvent event) {
        return AracFilo.builder()
                .id(event.id())
                .plaka(event.plaka())
                .markaId(event.markaId())
                .modelId(event.modelId())
                .modelYili(event.modelYili())
                .aracTipi(event.aracTipi())
                .segment(event.segment())
                .motorNo(event.motorNo())
                .sasiNo(event.sasiNo())
                .renk(event.renk())
                .kasaTipi(event.kasaTipi())
                .lastikTipi(event.lastikTipi())
                .filoyaGirisTarihi(event.filoyaGirisTarihi())
                .filoyaGirisKm(event.filoyaGirisKm())
                .tescilTarihi(event.tescilTarihi())
                .trafigeCikisTarihi(event.trafigeCikisTarihi())
                .garantisiVarMi(event.garantisiVarMi())
                .garantiBitisTarihi(event.garantiBitisTarihi())
                .garantiSuresiYil(event.garantiSuresiYil())
                .garantiKm(event.garantiKm())
                .tramer(event.tramer())
                .tramerTutari(event.tramerTutari())
                .sonKmTarihi(event.sonKmTarihi())
                .sonKm(event.sonKm())
                .sonYakitMiktari(event.sonYakitMiktari())
                .kiralandiMi(event.kiralandiMi())
                .kiralandigiTarih(event.kiralandigiTarih())
                .kontratSuresi(event.kontratSuresi())
                .kiralikBitisTarihi(event.kiralikBitisTarihi())
                .kiralayanFirmaId(event.kiralayanFirmaId())
                .filoDurum(event.filoDurum())
                .build();
    }
}
