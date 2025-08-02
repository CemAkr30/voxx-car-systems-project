package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.entity.Mtv;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MTVDurumDetayMapper {

    public static MTVDurumDetayResponse toResponse(Mtv mtv, Map<String, AracFilo> aracFiloMap, Map<String, Firma> firmaMap) {
        AracFilo aracFilo = aracFiloMap.get(mtv.getAracFiloId().getValue());
        String plaka = aracFilo != null ? aracFilo.getPlaka() : "Bilinmiyor";

        // Firma bilgilerini al
        String odeyenFirmaUnvani = null;
        if (mtv.getOdeyenFirmaId() != null) {
            Firma firma = firmaMap.get(mtv.getOdeyenFirmaId().getValue());
            odeyenFirmaUnvani = firma != null ? firma.getUnvan() : null;
        }

        return new MTVDurumDetayResponse(
                plaka,
                mtv.getYil(),
                mtv.getTaksit(),
                mtv.getMakbuzNo(),
                mtv.getMiktar(),
                mtv.getOdemeTipi() != null ? mtv.getOdemeTipi().name() : null,
                odeyenFirmaUnvani,
                mtv.getAciklama(),
                mtv.getGecikmeCezasi(),
                mtv.getOdendi()
        );
    }

    public static List<MTVDurumDetayResponse> toResponseList(List<Mtv> mtvList, Map<String, AracFilo> aracFiloMap, Map<String, Firma> firmaMap) {
        return mtvList.stream()
                .map(mtv -> toResponse(mtv, aracFiloMap, firmaMap))
                .collect(Collectors.toList());
    }
} 