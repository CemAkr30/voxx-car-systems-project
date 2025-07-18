package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneResponse;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class MuayeneMapper {
    public static MuayeneResponse toResponse(Muayene muayene) {
        return MuayeneResponse.builder()
                .id(muayene.getId().getValue())
                .aracFiloId(muayene.getAracFiloId().getValue())
                .muayeneTipi(muayene.getMuayeneTipi())
                .makbuzNo(muayene.getMakbuzNo())
                .miktar(muayene.getMiktar())
                .odemeTipi(muayene.getOdemeTipi())
                .odeyenFirmaId(muayene.getOdeyenFirmaId().getValue())
                .aciklama(muayene.getAciklama())
                .yeri(muayene.getYeri())
                .gecikmeCezasi(muayene.getGecikmeCezasi())
                .odendi(muayene.getOdendi())
                .createdAt(muayene.getCreatedAt())
                .updatedAt(muayene.getUpdatedAt())
                .build();
    }

    public static Muayene toMuayene(MuayeneRequest request) {
        return Muayene.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .muayeneTipi(request.getMuayeneTipi())
                .makbuzNo(request.getMakbuzNo())
                .miktar(request.getMiktar())
                .odemeTipi(request.getOdemeTipi())
                .odeyenFirmaId(new FirmaId(request.getOdeyenFirmaId()))
                .aciklama(request.getAciklama())
                .yeri(request.getYeri())
                .gecikmeCezasi(request.getGecikmeCezasi())
                .odendi(request.getOdendi())
                .build();
    }


    public static List<MuayeneResponse> toResponseList(List<Muayene> muayeneList) {
        return muayeneList.stream()
                .map(MuayeneMapper::toResponse)
                .toList();
    }
}

