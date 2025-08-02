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
                .isDeleted(entity.isDeleted())
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
                .id(aracKullananCreatedEvent.id())
                .ad(aracKullananCreatedEvent.ad())
                .soyad(aracKullananCreatedEvent.soyad())
                .email(aracKullananCreatedEvent.email())
                .telefonNo(aracKullananCreatedEvent.telefonNo())
                .adres(aracKullananCreatedEvent.adres())
                .ehliyetNo(aracKullananCreatedEvent.ehliyetNo())
                .ehliyetOn(aracKullananCreatedEvent.ehliyetOn())
                .ehliyetArka(aracKullananCreatedEvent.ehliyetArka())
                .ehliyetBitisTarihi(aracKullananCreatedEvent.ehliyetBitisTarihi())
                .cinsiyetTipi(aracKullananCreatedEvent.cinsiyetTipi())
                .ehliyetTipi(aracKullananCreatedEvent.ehliyetTipi())
                .firmaId(aracKullananCreatedEvent.firmaId())
                .build();
    }

    public static AracKullanan toAracKullananFromAracKullananUpdatedEvent(AracKullananUpdatedEvent aracKullananUpdatedEvent) {
        return AracKullanan.builder()
                .id(aracKullananUpdatedEvent.id())
                .ad(aracKullananUpdatedEvent.ad())
                .soyad(aracKullananUpdatedEvent.soyad())
                .email(aracKullananUpdatedEvent.email())
                .telefonNo(aracKullananUpdatedEvent.telefonNo())
                .adres(aracKullananUpdatedEvent.adres())
                .ehliyetNo(aracKullananUpdatedEvent.ehliyetNo())
                .ehliyetOn(aracKullananUpdatedEvent.ehliyetOn())
                .ehliyetArka(aracKullananUpdatedEvent.ehliyetArka())
                .ehliyetBitisTarihi(aracKullananUpdatedEvent.ehliyetBitisTarihi())
                .cinsiyetTipi(aracKullananUpdatedEvent.cinsiyetTipi())
                .ehliyetTipi(aracKullananUpdatedEvent.ehliyetTipi())
                .firmaId(aracKullananUpdatedEvent.firmaId())
                .build();
    }
}


