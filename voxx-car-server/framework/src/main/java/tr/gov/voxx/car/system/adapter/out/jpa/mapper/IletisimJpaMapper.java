package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.IletisimEntity;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.event.IletisimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.IletisimUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;
import java.util.stream.Collectors;


@UtilityClass
public class IletisimJpaMapper {

    public static Iletisim toIletisim(IletisimEntity entity) {
        return Iletisim.builder()
                .id(new IletisimId(entity.getId()))
                .firmaId(new FirmaId(entity.getFirmaId()))
                .numara(entity.getNumara())
                .tip(entity.getTip())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static IletisimEntity toEntity(Iletisim iletisim) {
        if (iletisim == null) {
            return null;
        }
        IletisimEntity entity = new IletisimEntity();
        entity.setId(iletisim.getId().getValue());
        entity.setFirmaId(iletisim.getFirmaId().getValue());
        entity.setNumara(iletisim.getNumara());
        entity.setTip(iletisim.getTip());
        return entity;
    }

    public static List<Iletisim> toIletisimList(List<IletisimEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(IletisimJpaMapper::toIletisim)
                .collect(Collectors.toList());
    }


    public static Iletisim toIletisimFromIletisimCreatedEvent(IletisimCreatedEvent iletisimCreatedEvent) {
        return Iletisim.builder()
                .id(iletisimCreatedEvent.id())
                .firmaId(iletisimCreatedEvent.firmaId())
                .numara(iletisimCreatedEvent.numara())
                .tip(iletisimCreatedEvent.tip())
                .build();
    }

    public static Iletisim toIletisimFromIletisimUpdatedEvent(IletisimUpdatedEvent iletisimUpdatedEvent) {
        return Iletisim.builder()
                .id(iletisimUpdatedEvent.id())
                .firmaId(iletisimUpdatedEvent.firmaId())
                .numara(iletisimUpdatedEvent.numara())
                .tip(iletisimUpdatedEvent.tip())
                .build();
    }
}
