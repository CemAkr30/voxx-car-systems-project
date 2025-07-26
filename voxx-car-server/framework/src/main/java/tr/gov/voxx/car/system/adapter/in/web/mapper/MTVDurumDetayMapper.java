package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.Mtv;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MTVDurumDetayMapper {

    public static MTVDurumDetayResponse toResponse(Mtv mtv, Map<String, AracFilo> aracFiloMap) {
        AracFilo aracFilo = aracFiloMap.get(mtv.getAracFiloId().getValue());
        String plaka = aracFilo != null ? aracFilo.getPlaka() : "Bilinmiyor";

        return new MTVDurumDetayResponse(
                mtv.getId().getValue(),
                mtv.getAracFiloId().getValue(),
                plaka,
                mtv.getYil(),
                mtv.getTaksit(),
                mtv.getMakbuzNo(),
                mtv.getMiktar(),
                mtv.getOdemeTipi() != null ? mtv.getOdemeTipi().name() : null,
                mtv.getOdeyenFirmaId() != null ? mtv.getOdeyenFirmaId().getValue() : null,
                mtv.getAciklama(),
                mtv.getGecikmeCezasi(),
                mtv.getOdendi()
        );
    }

    public static List<MTVDurumDetayResponse> toResponseList(List<Mtv> mtvList, Map<String, AracFilo> aracFiloMap) {
        return mtvList.stream()
                .map(mtv -> toResponse(mtv, aracFiloMap))
                .collect(Collectors.toList());
    }
} 