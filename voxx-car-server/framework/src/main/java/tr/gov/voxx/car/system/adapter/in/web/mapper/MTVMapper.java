package tr.gov.voxx.car.system.adapter.in.web.mapper;


import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVResponse;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class MTVMapper {
    public static MTVResponse toResponse(Mtv mtv) {
        return MTVResponse.builder()
                .id(mtv.getId().getValue())
                .aracFiloId(mtv.getAracFiloId().getValue())
                .yil(mtv.getYil())
                .taksit(mtv.getTaksit())
                .makbuzNo(mtv.getMakbuzNo())
                .miktar(mtv.getMiktar())
                .odemeTipi(mtv.getOdemeTipi())
                .odeyenFirmaId(mtv.getOdeyenFirmaId().getValue())
                .aciklama(mtv.getAciklama())
                .gecikmeCezasi(mtv.getGecikmeCezasi())
                .odendi(mtv.getOdendi())
                .createdAt(mtv.getCreatedAt())
                .updatedAt(mtv.getUpdatedAt())
                .build();
    }

    public static Mtv toMtv(MTVRequest request) {
        return Mtv.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .yil(request.getYil())
                .taksit(request.getTaksit())
                .makbuzNo(request.getMakbuzNo())
                .miktar(request.getMiktar())
                .odemeTipi(request.getOdemeTipi())
                .odeyenFirmaId(new FirmaId(request.getOdeyenFirmaId()))
                .aciklama(request.getAciklama())
                .gecikmeCezasi(request.getGecikmeCezasi())
                .odendi(request.getOdendi())
                .build();
    }


    public static List<MTVResponse> toResponseList(List<Mtv> mtvList) {
        return mtvList.stream()
                .map(MTVMapper::toResponse)
                .toList();
    }
}

