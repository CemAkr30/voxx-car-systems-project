package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.IletisimRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.IletisimResponse;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class IletisimMapper {
    public static IletisimResponse toResponse(Iletisim iletisim) {
        return IletisimResponse.builder()
                .id(iletisim.getId().getValue())
                .firmaId(iletisim.getFirmaId().getValue())
                .numara(iletisim.getNumara())
                .tip(iletisim.getTip())
                .createdAt(iletisim.getCreatedAt())
                .updatedAt(iletisim.getUpdatedAt())
                .build();
    }

    public static Iletisim toIletisim(IletisimRequest request) {
        return Iletisim.builder()
                .firmaId(new FirmaId(request.getFirmaId()))
                .numara(request.getNumara())
                .tip(request.getTip())
                .build();
    }


    public static List<IletisimResponse> toResponseList(List<Iletisim> iletisimList) {
        return iletisimList.stream()
                .map(IletisimMapper::toResponse)
                .toList();
    }
}
