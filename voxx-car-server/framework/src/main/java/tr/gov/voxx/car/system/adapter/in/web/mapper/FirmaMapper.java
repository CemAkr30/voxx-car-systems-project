package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaResponse;
import tr.gov.voxx.car.system.domain.entity.Firma;

import java.util.List;

@UtilityClass
public class FirmaMapper {
    public static FirmaResponse toResponse(Firma firma) {
        return FirmaResponse.builder()
                .id(firma.getId().getValue())
                .unvan(firma.getUnvan())
                .email(firma.getEmail())
                .vergiNo(firma.getVergiNo())
                .createdAt(firma.getCreatedAt())
                .updatedAt(firma.getUpdatedAt())
                .build();
    }

    public static Firma toFirma(FirmaRequest request) {
        return Firma.builder()
                .unvan(request.getUnvan())
                .email(request.getEmail())
                .vergiNo(request.getVergiNo())
                .build();
    }


    public static List<FirmaResponse> toResponseList(List<Firma> firmaList) {
        return firmaList.stream()
                .map(FirmaMapper::toResponse)
                .toList();
    }
}
