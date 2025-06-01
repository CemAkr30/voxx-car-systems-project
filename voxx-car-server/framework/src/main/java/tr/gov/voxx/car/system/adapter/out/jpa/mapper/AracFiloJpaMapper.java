package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFiloEntity;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.event.AracFiloCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracFiloUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

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
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static AracFiloEntity toEntity(AracFilo domain) {
        if (domain == null) {
            return null;
        }

        AracFiloEntity entity = new AracFiloEntity();
        entity.setId(domain.getId().getValue());
        entity.setPlaka(domain.getPlaka());
        entity.setMarkaId(domain.getMarkaId());
        entity.setModelId(domain.getModelId());
        entity.setModelYili(domain.getModelYili());
        entity.setAracTipi(domain.getAracTipi());
        entity.setSegment(domain.getSegment());
        entity.setMotorNo(domain.getMotorNo());
        entity.setSasiNo(domain.getSasiNo());
        entity.setRenk(domain.getRenk());
        entity.setKasaTipi(domain.getKasaTipi());
        entity.setLastikTipi(domain.getLastikTipi());
        entity.setFiloyaGirisTarihi(domain.getFiloyaGirisTarihi());
        entity.setFiloyaGirisKm(domain.getFiloyaGirisKm());
        entity.setTescilTarihi(domain.getTescilTarihi());
        entity.setTrafigeCikisTarihi(domain.getTrafigeCikisTarihi());
        entity.setGarantisiVarMi(domain.isGarantisiVarMi());
        entity.setGarantiBitisTarihi(domain.getGarantiBitisTarihi());
        entity.setGarantiSuresiYil(domain.getGarantiSuresiYil());
        entity.setGarantiKm(domain.getGarantiKm());
        entity.setTramer(domain.isTramer());
        entity.setTramerTutari(domain.getTramerTutari());
        entity.setSonKmTarihi(domain.getSonKmTarihi());
        entity.setSonKm(domain.getSonKm());
        entity.setSonYakitMiktari(domain.getSonYakitMiktari());
        entity.setKiralandiMi(domain.isKiralandiMi());
        entity.setKiralandigiTarih(domain.getKiralandigiTarih());
        entity.setKontratSuresi(domain.getKontratSuresi());
        entity.setKiralikBitisTarihi(domain.getKiralikBitisTarihi());
        entity.setKiralayanFirmaId(domain.getKiralayanFirmaId());
        entity.setFiloDurum(domain.getFiloDurum());
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
                .id(event.getId())
                .plaka(event.getPlaka())
                .markaId(event.getMarkaId())
                .modelId(event.getModelId())
                .modelYili(event.getModelYili())
                .aracTipi(event.getAracTipi())
                .segment(event.getSegment())
                .motorNo(event.getMotorNo())
                .sasiNo(event.getSasiNo())
                .renk(event.getRenk())
                .kasaTipi(event.getKasaTipi())
                .lastikTipi(event.getLastikTipi())
                .filoyaGirisTarihi(event.getFiloyaGirisTarihi())
                .filoyaGirisKm(event.getFiloyaGirisKm())
                .tescilTarihi(event.getTescilTarihi())
                .trafigeCikisTarihi(event.getTrafigeCikisTarihi())
                .garantisiVarMi(event.isGarantisiVarMi())
                .garantiBitisTarihi(event.getGarantiBitisTarihi())
                .garantiSuresiYil(event.getGarantiSuresiYil())
                .garantiKm(event.getGarantiKm())
                .tramer(event.isTramer())
                .tramerTutari(event.getTramerTutari())
                .sonKmTarihi(event.getSonKmTarihi())
                .sonKm(event.getSonKm())
                .sonYakitMiktari(event.getSonYakitMiktari())
                .kiralandiMi(event.isKiralandiMi())
                .kiralandigiTarih(event.getKiralandigiTarih())
                .kontratSuresi(event.getKontratSuresi())
                .kiralikBitisTarihi(event.getKiralikBitisTarihi())
                .kiralayanFirmaId(event.getKiralayanFirmaId())
                .filoDurum(event.getFiloDurum())
                .build();
    }

    public static AracFilo toAracFiloFromAracFiloUpdatedEvent(AracFiloUpdatedEvent event) {
        return AracFilo.builder()
                .id(event.getId())
                .plaka(event.getPlaka())
                .markaId(event.getMarkaId())
                .modelId(event.getModelId())
                .modelYili(event.getModelYili())
                .aracTipi(event.getAracTipi())
                .segment(event.getSegment())
                .motorNo(event.getMotorNo())
                .sasiNo(event.getSasiNo())
                .renk(event.getRenk())
                .kasaTipi(event.getKasaTipi())
                .lastikTipi(event.getLastikTipi())
                .filoyaGirisTarihi(event.getFiloyaGirisTarihi())
                .filoyaGirisKm(event.getFiloyaGirisKm())
                .tescilTarihi(event.getTescilTarihi())
                .trafigeCikisTarihi(event.getTrafigeCikisTarihi())
                .garantisiVarMi(event.isGarantisiVarMi())
                .garantiBitisTarihi(event.getGarantiBitisTarihi())
                .garantiSuresiYil(event.getGarantiSuresiYil())
                .garantiKm(event.getGarantiKm())
                .tramer(event.isTramer())
                .tramerTutari(event.getTramerTutari())
                .sonKmTarihi(event.getSonKmTarihi())
                .sonKm(event.getSonKm())
                .sonYakitMiktari(event.getSonYakitMiktari())
                .kiralandiMi(event.isKiralandiMi())
                .kiralandigiTarih(event.getKiralandigiTarih())
                .kontratSuresi(event.getKontratSuresi())
                .kiralikBitisTarihi(event.getKiralikBitisTarihi())
                .kiralayanFirmaId(event.getKiralayanFirmaId())
                .filoDurum(event.getFiloDurum())
                .build();
    }
}
