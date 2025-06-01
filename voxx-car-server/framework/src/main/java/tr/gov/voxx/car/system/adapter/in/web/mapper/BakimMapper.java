package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.BakimRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.BakimResponse;
import tr.gov.voxx.car.system.domain.entity.Bakim;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class BakimMapper {

    public static BakimResponse toResponse(Bakim entity) {
        return BakimResponse.builder()
                .id(entity.getId().getValue())
                .aracId(entity.getAracId())
                .bakimNedeni(entity.getBakimNedeni())
                .parca(entity.getParca())
                .parcaTutari(entity.getParcaTutari())
                .iscilikTutari(entity.getIscilikTutari())
                .toplamTutar(entity.getToplamTutar())
                .faturaNo(entity.getFaturaNo())
                .fatura(entity.getFatura())
                .notlar(entity.getNotlar())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static List<BakimResponse> toResponseList(List<Bakim> list) {
        return list.stream().map(BakimMapper::toResponse).collect(Collectors.toList());
    }

    public static Bakim toEntity(BakimRequest request) {
        return Bakim.builder()
                .aracId(request.getAracId())
                .bakimNedeni(request.getBakimNedeni())
                .parca(request.getParca())
                .parcaTutari(request.getParcaTutari())
                .iscilikTutari(request.getIscilikTutari())
                .toplamTutar(request.getToplamTutar())
                .faturaNo(request.getFaturaNo())
                .fatura(request.getFatura())
                .notlar(request.getNotlar())
                .odeyenFirmaId(request.getOdeyenFirmaId())
                .build();
    }
}
