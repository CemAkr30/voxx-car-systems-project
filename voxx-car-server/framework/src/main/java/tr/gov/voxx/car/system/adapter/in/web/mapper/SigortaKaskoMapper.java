package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaKaskoRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaKaskoResponse;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

@UtilityClass
public class SigortaKaskoMapper {
    public static SigortaKaskoResponse toResponse(SigortaKasko sigortaKasko) {
        return SigortaKaskoResponse.builder()
                .id(sigortaKasko.getId().getValue())
                .aracFiloId(sigortaKasko.getAracFiloId().getValue())
                .tip(sigortaKasko.getTip())
                .sigortaSirketi(sigortaKasko.getSigortaSirketi())
                .acente(sigortaKasko.getAcente())
                .policeNo(sigortaKasko.getPoliceNo())
                .baslangicTarihi(sigortaKasko.getBaslangicTarihi())
                .bitisTarihi(sigortaKasko.getBitisTarihi())
                .createdAt(sigortaKasko.getCreatedAt())
                .updatedAt(sigortaKasko.getUpdatedAt())
                .build();
    }

    public static SigortaKasko toSigortaKasko(SigortaKaskoRequest request) {
        return SigortaKasko.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .tip(request.getTip())
                .sigortaSirketi(request.getSigortaSirketi())
                .acente(request.getAcente())
                .policeNo(request.getPoliceNo())
                .baslangicTarihi(request.getBaslangicTarihi())
                .bitisTarihi(request.getBitisTarihi())
                .build();
    }


    public static List<SigortaKaskoResponse> toResponseList(List<SigortaKasko> sigortaKaskoList) {
        return sigortaKaskoList.stream()
                .map(SigortaKaskoMapper::toResponse)
                .toList();
    }
}
