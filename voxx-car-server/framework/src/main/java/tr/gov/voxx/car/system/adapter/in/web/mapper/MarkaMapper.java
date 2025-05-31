package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.MarkaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MarkaResponse;
import tr.gov.voxx.car.system.domain.entity.Marka;

import java.util.List;

@UtilityClass
public class MarkaMapper {
    public static MarkaResponse toResponse(Marka marka) {
        return MarkaResponse.builder()
                .adi(marka.getAdi())
                .id(marka.getId().getValue())
                .createdAt(marka.getCreatedAt())
                .updatedAt(marka.getUpdatedAt())
                .build();
    }

    public static Marka toMarka(MarkaRequest request) {
        return Marka.builder()
                .adi(request.getAdi())
                .build();
    }


    public static List<MarkaResponse> toResponseList(List<Marka> markas) {
        return markas.stream()
                .map(MarkaMapper::toResponse)
                .toList();
    }
}
