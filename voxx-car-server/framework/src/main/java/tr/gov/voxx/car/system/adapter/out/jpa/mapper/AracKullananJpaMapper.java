package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracKullananEntity;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.event.AracKullananCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AracKullananUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class AracKullananJpaMapper {
    public static AracKullanan toAracKullanan(AracKullananEntity entity) {
        return AracKullanan.builder()
                .id(new AracKullananId(entity.getId()))
                .ad(entity.getAd())
                .soyad(entity.getSoyad())
                .email(entity.getEmail())
                .telefonNo(entity.getTelefonNo())
                .adres(entity.getAdres())
                .ehliyetNo(entity.getEhliyetNo())
                .ehliyetOn(entity.getEhliyetOn())
                .ehliyetArka(entity.getEhliyetArka())
                .ehliyetBitisTarihi(entity.getEhliyetBitisTarihi())
                .cinsiyetTipi(entity.getCinsiyetTipi())
                .ehliyetTipi(entity.getEhliyetTipi())
                .firmaId(new FirmaId(entity.getFirmaId()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static AracKullananEntity toEntity(AracKullanan aracKullanan) {
        if (aracKullanan == null) {
            return null;
        }
        AracKullananEntity entity = new AracKullananEntity();
        entity.setId(aracKullanan.getId().getValue());
        entity.setAd(aracKullanan.getAd());
        entity.setSoyad(aracKullanan.getSoyad());
        entity.setEmail(aracKullanan.getEmail());
        entity.setTelefonNo(aracKullanan.getTelefonNo());
        entity.setAdres(aracKullanan.getAdres());
        entity.setEhliyetNo(aracKullanan.getEhliyetNo());
        entity.setEhliyetOn(aracKullanan.getEhliyetOn());
        entity.setEhliyetArka(aracKullanan.getEhliyetArka());
        entity.setEhliyetBitisTarihi(aracKullanan.getEhliyetBitisTarihi());
        entity.setEhliyetTipi(aracKullanan.getEhliyetTipi());
        entity.setCinsiyetTipi(aracKullanan.getCinsiyetTipi());
        entity.setFirmaId(aracKullanan.getFirmaId().getValue());
        return entity;
    }

    public static List<AracKullanan> toAracKullananList(List<AracKullananEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(AracKullananJpaMapper::toAracKullanan)
                .collect(Collectors.toList());
    }


    public static AracKullanan toAracKullananFromAracKullananCreatedEvent(AracKullananCreatedEvent aracKullananCreatedEvent) {
        return AracKullanan.builder()
                .id(aracKullananCreatedEvent.getId())
                .ad(aracKullananCreatedEvent.getAd())
                .soyad(aracKullananCreatedEvent.getSoyad())
                .email(aracKullananCreatedEvent.getEmail())
                .telefonNo(aracKullananCreatedEvent.getTelefonNo())
                .adres(aracKullananCreatedEvent.getAdres())
                .ehliyetNo(aracKullananCreatedEvent.getEhliyetNo())
                .ehliyetOn(aracKullananCreatedEvent.getEhliyetOn())
                .ehliyetArka(aracKullananCreatedEvent.getEhliyetArka())
                .ehliyetBitisTarihi(aracKullananCreatedEvent.getEhliyetBitisTarihi())
                .cinsiyetTipi(aracKullananCreatedEvent.getCinsiyetTipi())
                .ehliyetTipi(aracKullananCreatedEvent.getEhliyetTipi())
                .firmaId(aracKullananCreatedEvent.getFirmaId())
                .build();
    }

    public static AracKullanan toAracKullananFromAracKullananUpdatedEvent(AracKullananUpdatedEvent aracKullananUpdatedEvent) {
        return AracKullanan.builder()
                .id(aracKullananUpdatedEvent.getId())
                .ad(aracKullananUpdatedEvent.getAd())
                .soyad(aracKullananUpdatedEvent.getSoyad())
                .email(aracKullananUpdatedEvent.getEmail())
                .telefonNo(aracKullananUpdatedEvent.getTelefonNo())
                .adres(aracKullananUpdatedEvent.getAdres())
                .ehliyetNo(aracKullananUpdatedEvent.getEhliyetNo())
                .ehliyetOn(aracKullananUpdatedEvent.getEhliyetOn())
                .ehliyetArka(aracKullananUpdatedEvent.getEhliyetArka())
                .ehliyetBitisTarihi(aracKullananUpdatedEvent.getEhliyetBitisTarihi())
                .cinsiyetTipi(aracKullananUpdatedEvent.getCinsiyetTipi())
                .ehliyetTipi(aracKullananUpdatedEvent.getEhliyetTipi())
                .firmaId(aracKullananUpdatedEvent.getFirmaId())
                .build();
    }
}


