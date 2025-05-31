package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelResponse;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;

@UtilityClass
public class ModelMapper {

    public static ModelResponse toResponse(Model model) {
        return ModelResponse.builder()
                .adi(model.getAdi())
                .id(model.getId().getValue())
                .markaId(model.getMarkaId().getValue())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }

    public static Model toModel(ModelRequest request) {
        return Model.builder()
                .markaId(new MarkaId(request.getMarkaId()))
                .adi(request.getAdi())
                .build();
    }


    public static List<ModelResponse> toResponseList(List<Model> models) {
        return models.stream()
                .map(ModelMapper::toResponse)
                .toList();
    }
}