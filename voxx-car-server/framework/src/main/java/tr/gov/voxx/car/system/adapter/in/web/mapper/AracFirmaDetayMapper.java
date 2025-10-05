package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFirmaDetayRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFirmaDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class AracFirmaDetayMapper {

    public static AracFirmaDetayResponse toResponse(AracFirmaDetay aracFirmaDetay) {
        return AracFirmaDetayResponse.builder()
                .id(aracFirmaDetay.getId().getValue())
                .aracFiloId(aracFirmaDetay.getAracFiloId().getValue())
                .firmaId(aracFirmaDetay.getFirmaId().getValue())
                .baslangicTarihi(aracFirmaDetay.getBaslangicTarihi())
                .bitisTarihi(aracFirmaDetay.getBitisTarihi())
                .sozlesmeTutari(aracFirmaDetay.getSozlesmeTutari())
                .aylikFaturaTutari(aracFirmaDetay.getAylikFaturaTutari())
                .kapora(aracFirmaDetay.getKapora())
                .createdAt(aracFirmaDetay.getCreatedAt())
                .updatedAt(aracFirmaDetay.getUpdatedAt())
                .build();
    }

    public static AracFirmaDetay toAracFirmaDetay(AracFirmaDetayRequest request) {
        return AracFirmaDetay.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .firmaId(new FirmaId(request.getFirmaId()))
                .baslangicTarihi(request.getBaslangicTarihi())
                .bitisTarihi(request.getBitisTarihi())
                .sozlesmeTutari(request.getSozlesmeTutari())
                .aylikFaturaTutari(request.getKapora())
                .kapora(request.getKapora())
                .build();
    }


    public static List<AracFirmaDetayResponse> toResponseList(List<AracFirmaDetay> aracFirmaDetayList) {
        return aracFirmaDetayList.stream()
                .map(AracFirmaDetayMapper::toResponse)
                .toList();
    }
}
