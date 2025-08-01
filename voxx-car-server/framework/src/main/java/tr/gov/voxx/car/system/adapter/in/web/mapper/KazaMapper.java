package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.KazaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.KazaResponse;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class KazaMapper {

    public static KazaResponse toResponse(Kaza entity) {
        return KazaResponse.builder()
                .id(entity.getId().getValue())
                .aracFiloId(entity.getAracFiloId().getValue())
                .firmaId(entity.getFirmaId().getValue())
                .musteriId(entity.getMusteriId())
                .kazaTarihi(entity.getKazaTarihi())
                .kazaIli(entity.getKazaIli())
                .kazaNedeni(entity.getKazaNedeni())
                .kazaTutanagi(entity.getKazaTutanagi())
                .onarimDurumu(entity.getOnarimDurumu())
                .odeyenFirmaId(entity.getOdeyenFirmaId().getValue())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static List<KazaResponse> toResponseList(List<Kaza> list) {
        return list.stream().map(KazaMapper::toResponse).collect(Collectors.toList());
    }

    public static Kaza toKaza(KazaRequest request) {
        return Kaza.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .firmaId(new FirmaId(request.getFirmaId()))
                .musteriId(request.getMusteriId())
                .kazaTarihi(request.getKazaTarihi())
                .kazaIli(request.getKazaIli())
                .kazaNedeni(request.getKazaNedeni())
                .kazaTutanagi(request.getKazaTutanagi())
                .onarimDurumu(request.getOnarimDurumu())
                .odeyenFirmaId(new FirmaId(request.getOdeyenFirmaId()))
                .build();
    }
}
