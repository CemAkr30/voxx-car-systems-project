package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AracKullananRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracKullananResponse;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class AracKullananMapper {
    public static AracKullananResponse toResponse(AracKullanan aracKullanan) {
        return AracKullananResponse.builder()
                .id(aracKullanan.getId().getValue())
                .ad(aracKullanan.getAd())
                .soyad(aracKullanan.getSoyad())
                .email(aracKullanan.getEmail())
                .telefonNo(aracKullanan.getTelefonNo())
                .adres(aracKullanan.getAdres())
                .ehliyetNo(aracKullanan.getEhliyetNo())
                .ehliyetTipi(aracKullanan.getEhliyetTipi())
                .ehliyetOn(aracKullanan.getEhliyetOn())
                .ehliyetArka(aracKullanan.getEhliyetArka())
                .ehliyetBitisTarihi(aracKullanan.getEhliyetBitisTarihi())
                .cinsiyetTipi(aracKullanan.getCinsiyetTipi())
                .firmaId(aracKullanan.getFirmaId().getValue())
                .createdAt(aracKullanan.getCreatedAt())
                .updatedAt(aracKullanan.getUpdatedAt())
                .build();
    }

    public static AracKullanan toAracKullanan(AracKullananRequest request) {
        return AracKullanan.builder()
                .ad(request.getAd())
                .soyad(request.getSoyad())
                .email(request.getEmail())
                .telefonNo(request.getTelefonNo())
                .adres(request.getAdres())
                .ehliyetNo(request.getEhliyetNo())
                .ehliyetTipi(request.getEhliyetTipi())
                .ehliyetOn(request.getEhliyetOn())
                .ehliyetArka(request.getEhliyetArka())
                .ehliyetBitisTarihi(request.getEhliyetBitisTarihi())
                .cinsiyetTipi(request.getCinsiyetTipi())
                .firmaId(new FirmaId(request.getFirmaId()))
                .build();
    }


    public static List<AracKullananResponse> toResponseList(List<AracKullanan> aracKullananList) {
        return aracKullananList.stream()
                .map(AracKullananMapper::toResponse)
                .toList();
    }
}
