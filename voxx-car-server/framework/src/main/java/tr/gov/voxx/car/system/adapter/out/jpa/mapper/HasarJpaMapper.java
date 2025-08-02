package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.HasarEntity;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.event.HasarCreatedEvent;
import tr.gov.voxx.car.system.domain.event.HasarUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class HasarJpaMapper {
    public static Hasar toHasar(HasarEntity entity) {
        return Hasar.builder()
                .id(new HasarId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .hasarliParca(entity.getHasarliParca())
                .hasarTipi(entity.getHasarTipi())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static HasarEntity toEntity(Hasar hasar) {
        if (hasar == null) {
            return null;
        }
        HasarEntity entity = new HasarEntity();
        entity.setId(hasar.getId().getValue());
        entity.setAracFiloId(hasar.getAracFiloId().getValue());
        entity.setHasarliParca(hasar.getHasarliParca());
        entity.setHasarTipi(hasar.getHasarTipi());

        return entity;
    }

    public static List<Hasar> toHasarList(List<HasarEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(HasarJpaMapper::toHasar)
                .collect(Collectors.toList());
    }


    public static Hasar toHasarFromHasarCreatedEvent(HasarCreatedEvent hasarCreatedEvent) {
        return Hasar.builder()
                .id(hasarCreatedEvent.id())
                .aracFiloId(hasarCreatedEvent.aracFiloId())
                .hasarliParca(hasarCreatedEvent.hasarliParca())
                .hasarTipi(hasarCreatedEvent.hasarTipi())
                .build();
    }

    public static Hasar toHasarFromHasarUpdatedEvent(HasarUpdatedEvent hasarUpdatedEvent) {
        return Hasar.builder()
                .id(hasarUpdatedEvent.id())
                .aracFiloId(hasarUpdatedEvent.aracFiloId())
                .hasarliParca(hasarUpdatedEvent.hasarliParca())
                .hasarTipi(hasarUpdatedEvent.hasarTipi())
                .build();
    }
}


