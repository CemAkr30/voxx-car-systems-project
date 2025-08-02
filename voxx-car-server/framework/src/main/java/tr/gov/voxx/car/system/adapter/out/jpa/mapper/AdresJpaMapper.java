package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AdresEntity;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.event.AdresCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AdresUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;


@UtilityClass
public class AdresJpaMapper {

    public static Adres toAdres(AdresEntity entity) {
        return Adres.builder()
                .id(new AdresId(entity.getId()))
                .firmaId(new FirmaId(entity.getFirmaId()))
                .aciklama(entity.getAciklama())
                .tip(entity.getTip())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static AdresEntity toEntity(Adres adres) {
        if (adres == null) {
            return null;
        }
        AdresEntity entity = new AdresEntity();
        entity.setId(adres.getId().getValue());
        entity.setFirmaId(adres.getFirmaId().getValue());
        entity.setAciklama(adres.getAciklama());
        entity.setTip(adres.getTip());
        return entity;
    }

    public static List<Adres> toAdresList(List<AdresEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(AdresJpaMapper::toAdres)
                .collect(Collectors.toList());
    }


    public static Adres toAdresFromAdresCreatedEvent(AdresCreatedEvent adresCreatedEvent) {
        return Adres.builder()
                .id(adresCreatedEvent.id())
                .firmaId(adresCreatedEvent.firmaId())
                .aciklama(adresCreatedEvent.aciklama())
                .tip(adresCreatedEvent.tip())
                .build();
    }

    public static Adres toAdresFromAdresUpdatedEvent(AdresUpdatedEvent adresUpdatedEvent) {
        return Adres.builder()
                .id(adresUpdatedEvent.id())
                .firmaId(adresUpdatedEvent.firmaId())
                .aciklama(adresUpdatedEvent.aciklama())
                .tip(adresUpdatedEvent.tip())
                .build();
    }
}
