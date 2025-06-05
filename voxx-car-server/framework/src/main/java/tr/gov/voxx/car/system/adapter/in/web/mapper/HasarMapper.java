package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.HasarRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.HasarResponse;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

@UtilityClass
public class HasarMapper {
    public static HasarResponse toResponse(Hasar hasar) {
        return HasarResponse.builder()
                .id(hasar.getId().getValue())
                .aracFiloId(hasar.getAracFiloId().getValue())
                .hasarliParca(hasar.getHasarliParca())
                .hasarTipi(hasar.getHasarTipi())
                .createdAt(hasar.getCreatedAt())
                .updatedAt(hasar.getUpdatedAt())
                .build();
    }

    public static Hasar toHasar(HasarRequest request) {
        return Hasar.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .hasarliParca(request.getHasarliParca())
                .hasarTipi(request.getHasar().getHasarTipi())
                .build();
    }


    public static List<HasarResponse> toResponseList(List<Hasar> hasarList) {
        return hasarList.stream()
                .map(HasarMapper::toResponse)
                .toList();
    }
}

