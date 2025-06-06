package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.event.ModelCreatedEvent;
import tr.gov.voxx.car.system.domain.event.ModelUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;
import java.util.stream.Collectors;


@UtilityClass
public class ModelJpaMapper {

    public static Model toModel(ModelEntity entity) {
        return Model.builder()
                .adi(entity.getAdi())
                .id(new ModelId(entity.getId()))
                .markaId(new MarkaId(entity.getMarkaId()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static ModelEntity toEntity(Model model) {
        if (model == null) {
            return null;
        }
        ModelEntity entity = new ModelEntity();
        entity.setId(model.getId().getValue());
        entity.setAdi(model.getAdi());
        entity.setMarkaId(model.getMarkaId().getValue());
        return entity;
    }

    public static List<Model> toModelList(List<ModelEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(ModelJpaMapper::toModel)
                .collect(Collectors.toList());
    }


    public static Model toModelFromModelCreatedEvent(ModelCreatedEvent modelCreatedEvent) {
        return Model.builder()
                .id(modelCreatedEvent.id())
                .markaId(modelCreatedEvent.markaId())
                .adi(modelCreatedEvent.adi())
                .build();
    }

    public static Model toModelFromModelUpdatedEvent(ModelUpdatedEvent modelUpdatedEvent) {
        return Model.builder()
                .id(modelUpdatedEvent.id())
                .markaId(modelUpdatedEvent.markaId())
                .adi(modelUpdatedEvent.adi())
                .build();
    }
}
