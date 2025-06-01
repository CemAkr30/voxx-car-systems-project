package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AdresRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AdresResponse;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class AdresMapper {
    public static AdresResponse toResponse(Adres adres) {
        return AdresResponse.builder()
                .id(adres.getId().getValue())
                .firmaId(adres.getFirmaId().getValue())
                .aciklama(adres.getAciklama())
                .tip(adres.getTip())
                .createdAt(adres.getCreatedAt())
                .updatedAt(adres.getUpdatedAt())
                .build();
    }

    public static Adres toAdres(AdresRequest request) {
        return Adres.builder()
                .firmaId(new FirmaId(request.getFirmaId()))
                .aciklama(request.getAciklama())
                .tip(request.getTip())
                .build();
    }


    public static List<AdresResponse> toResponseList(List<Adres> adresList) {
        return adresList.stream()
                .map(AdresMapper::toResponse)
                .toList();
    }
}
