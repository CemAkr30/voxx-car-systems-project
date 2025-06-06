package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MarkaEntity;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.event.MarkaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MarkaUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class MarkaJpaMapper {
    public static Marka toMarka(MarkaEntity entity) {
        return Marka.builder()
                .adi(entity.getAdi())
                .id(new MarkaId(entity.getId()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static MarkaEntity toEntity(Marka marka) {
        if (marka == null) {
            return null;
        }
        MarkaEntity entity = new MarkaEntity();
        entity.setId(marka.getId().getValue());
        entity.setAdi(marka.getAdi());
        return entity;
    }

    public static List<Marka> toMarkaList(List<MarkaEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(MarkaJpaMapper::toMarka)
                .collect(Collectors.toList());
    }


    public static Marka toMarkaFromMarkaCreatedEvent(MarkaCreatedEvent markaCreatedEvent) {
        return Marka.builder()
                .id(markaCreatedEvent.id())
                .adi(markaCreatedEvent.adi())
                .build();
    }

    public static Marka toMarkaFromMarkaUpdatedEvent(MarkaUpdatedEvent markaUpdatedEvent) {
        return Marka.builder()
                .id(markaUpdatedEvent.id())
                .adi(markaUpdatedEvent.adi())
                .build();
    }
}
