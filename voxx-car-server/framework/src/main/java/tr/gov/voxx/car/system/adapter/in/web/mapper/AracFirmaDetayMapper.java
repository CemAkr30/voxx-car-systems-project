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
                .sozlesmeBaslangicTarihi(aracFirmaDetay.getSozlesmeBaslangicTarihi())
                .sozlesmeBitisTarihi(aracFirmaDetay.getSozlesmeBitisTarihi())
                .teslimatTutanagi(aracFirmaDetay.getTeslimatTutanagi())
                .sozlesme(aracFirmaDetay.getSozlesme())
                .odemeVadesi(aracFirmaDetay.getOdemeVadesi())
                .aylikFatura(aracFirmaDetay.getAylikFatura())
                .kapora(aracFirmaDetay.getKapora())
                .sozlesmeTutari(aracFirmaDetay.getSozlesmeTutari())
                .createdAt(aracFirmaDetay.getCreatedAt())
                .updatedAt(aracFirmaDetay.getUpdatedAt())
                .isDeleted(aracFirmaDetay.isDeleted())
                .build();
    }

    public static AracFirmaDetay toAracFirmaDetay(AracFirmaDetayRequest request) {
        return AracFirmaDetay.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .firmaId(new FirmaId(request.getFirmaId()))
                .sozlesmeBaslangicTarihi(request.getSozlesmeBaslangicTarihi())
                .sozlesmeBitisTarihi(request.getSozlesmeBitisTarihi())
                .teslimatTutanagi(request.getTeslimatTutanagi())
                .sozlesme(request.getSozlesme())
                .odemeVadesi(request.getOdemeVadesi())
                .aylikFatura(request.getAylikFatura())
                .kapora(request.getKapora())
                .sozlesmeTutari(request.getSozlesmeTutari())
                .build();
    }


    public static List<AracFirmaDetayResponse> toResponseList(List<AracFirmaDetay> aracFirmaDetayList) {
        return aracFirmaDetayList.stream()
                .map(AracFirmaDetayMapper::toResponse)
                .toList();
    }
}
