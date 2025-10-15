package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFirmaDetayRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFirmaDetayResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaDokumanDetayRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaDokumanDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class FirmaDokumanDetayMapper {

    public static FirmaDokumanDetayResponse toResponse(FirmaDokumanDetay firmaDokumanDetay) {
        return FirmaDokumanDetayResponse.builder()
                .id(firmaDokumanDetay.getId().getValue())
                .firmaId(firmaDokumanDetay.getFirmaId().getValue())
                .sozlesme(firmaDokumanDetay.getSozlesme())
                .createdAt(firmaDokumanDetay.getCreatedAt())
                .updatedAt(firmaDokumanDetay.getUpdatedAt())
                .build();
    }

    public static FirmaDokumanDetay toFirmaDokumanDetay(FirmaDokumanDetayRequest request) {
        return FirmaDokumanDetay.builder()
                .firmaId(new FirmaId(request.getFirmaId()))
                .sozlesme(request.getSozlesme())
                .build();
    }


    public static List<FirmaDokumanDetayResponse> toResponseList(List<FirmaDokumanDetay> firmaDokumanDetayList) {
        return firmaDokumanDetayList.stream()
                .map(FirmaDokumanDetayMapper::toResponse)
                .toList();
    }
}
