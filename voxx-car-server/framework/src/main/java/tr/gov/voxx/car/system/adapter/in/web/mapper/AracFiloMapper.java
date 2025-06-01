package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFiloRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFiloResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class AracFiloMapper {

    public static AracFiloResponse toResponse(AracFilo entity) {
        return AracFiloResponse.builder()
                .id(entity.getId().getValue())
                .plaka(entity.getPlaka())
                .markaId(entity.getMarkaId().getValue())
                .modelId(entity.getModelId().getValue())
                .modelYili(entity.getModelYili())
                .aracTipi(entity.getAracTipi())
                .segment(entity.getSegment())
                .motorNo(entity.getMotorNo())
                .sasiNo(entity.getSasiNo())
                .renk(entity.getRenk())
                .kasaTipi(entity.getKasaTipi())
                .lastikTipi(entity.getLastikTipi())
                .filoyaGirisTarihi(entity.getFiloyaGirisTarihi())
                .filoyaGirisKm(entity.getFiloyaGirisKm())
                .tescilTarihi(entity.getTescilTarihi())
                .trafigeCikisTarihi(entity.getTrafigeCikisTarihi())
                .garantisiVarMi(entity.isGarantisiVarMi())
                .garantiBitisTarihi(entity.getGarantiBitisTarihi())
                .garantiSuresiYil(entity.getGarantiSuresiYil())
                .garantiKm(entity.getGarantiKm())
                .tramer(entity.isTramer())
                .tramerTutari(entity.getTramerTutari())
                .sonKmTarihi(entity.getSonKmTarihi())
                .sonKm(entity.getSonKm())
                .sonYakitMiktari(entity.getSonYakitMiktari())
                .kiralandiMi(entity.isKiralandiMi())
                .kiralandigiTarih(entity.getKiralandigiTarih())
                .kontratSuresi(entity.getKontratSuresi())
                .kiralikBitisTarihi(entity.getKiralikBitisTarihi())
                .kiralayanFirmaId(entity.getKiralayanFirmaId().getValue())
                .filoDurum(entity.getFiloDurum())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static List<AracFiloResponse> toResponseList(List<AracFilo> list) {
        return list.stream().map(AracFiloMapper::toResponse).collect(Collectors.toList());
    }

    public static AracFilo toAracFilo(AracFiloRequest request) {
        return AracFilo.builder()
                .plaka(request.getPlaka())
                .markaId(new MarkaId(request.getMarkaId()))
                .modelId(new ModelId(request.getModelId()))
                .modelYili(request.getModelYili())
                .aracTipi(request.getAracTipi())
                .segment(request.getSegment())
                .motorNo(request.getMotorNo())
                .sasiNo(request.getSasiNo())
                .renk(request.getRenk())
                .kasaTipi(request.getKasaTipi())
                .lastikTipi(request.getLastikTipi())
                .filoyaGirisTarihi(request.getFiloyaGirisTarihi())
                .filoyaGirisKm(request.getFiloyaGirisKm())
                .tescilTarihi(request.getTescilTarihi())
                .trafigeCikisTarihi(request.getTrafigeCikisTarihi())
                .garantisiVarMi(request.isGarantisiVarMi())
                .garantiBitisTarihi(request.getGarantiBitisTarihi())
                .garantiSuresiYil(request.getGarantiSuresiYil())
                .garantiKm(request.getGarantiKm())
                .tramer(request.isTramer())
                .tramerTutari(request.getTramerTutari())
                .sonKmTarihi(request.getSonKmTarihi())
                .sonKm(request.getSonKm())
                .sonYakitMiktari(request.getSonYakitMiktari())
                .kiralandiMi(request.isKiralandiMi())
                .kiralandigiTarih(request.getKiralandigiTarih())
                .kontratSuresi(request.getKontratSuresi())
                .kiralikBitisTarihi(request.getKiralikBitisTarihi())
                .kiralayanFirmaId(new FirmaId(request.getKiralayanFirmaId()))
                .filoDurum(request.getFiloDurum())
                .build();
    }
}
