package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaEntity;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.event.FirmaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FirmaUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class FirmaJpaMapper {
    public static Firma toFirma(FirmaEntity entity) {
        return Firma.builder()
                .id(new FirmaId(entity.getId()))
                .vergiNo(entity.getVergiNo())
                .email(entity.getEmail())
                .unvan(entity.getUnvan())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static FirmaEntity toEntity(Firma firma) {
        if (firma == null) {
            return null;
        }
        FirmaEntity entity = new FirmaEntity();
        entity.setId(firma.getId().getValue());
        entity.setEmail(firma.getEmail());
        entity.setUnvan(firma.getUnvan());
        entity.setVergiNo(firma.getVergiNo());
        return entity;
    }

    public static List<Firma> toFirmaList(List<FirmaEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(FirmaJpaMapper::toFirma)
                .collect(Collectors.toList());
    }


    public static Firma toFirmaFromFirmaCreatedEvent(FirmaCreatedEvent firmaCreatedEvent) {
        return Firma.builder()
                .id(firmaCreatedEvent.id())
                .email(firmaCreatedEvent.email())
                .unvan(firmaCreatedEvent.unvan())
                .vergiNo(firmaCreatedEvent.vergiNo())
                .build();
    }

    public static Firma toFirmaFromFirmaUpdatedEvent(FirmaUpdatedEvent firmaUpdatedEvent) {
        return Firma.builder()
                .id(firmaUpdatedEvent.id())
                .email(firmaUpdatedEvent.email())
                .unvan(firmaUpdatedEvent.unvan())
                .vergiNo(firmaUpdatedEvent.vergiNo())
                .build();
    }
}
