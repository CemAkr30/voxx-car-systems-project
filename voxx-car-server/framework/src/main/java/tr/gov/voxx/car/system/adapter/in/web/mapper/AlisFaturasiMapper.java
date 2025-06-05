package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.AlisFaturasiRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AlisFaturasiResponse;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

@UtilityClass
public class AlisFaturasiMapper {
    public static AlisFaturasiResponse toResponse(AlisFaturasi alisFaturasi) {
        return AlisFaturasiResponse.builder()
                .id(alisFaturasi.getId().getValue())
                .aracFiloId(alisFaturasi.getAracFiloId().getValue())
                .alisFaturasiTarihi(alisFaturasi.getAlisFaturasiTarihi())
                .alisFaturaNo(alisFaturasi.getAlisFaturaNo())
                .saticiFirmaId(alisFaturasi.getSaticiFirmaId().getValue())
                .listeFiyati(alisFaturasi.getListeFiyati())
                .ekGaranti(alisFaturasi.getEkGaranti())
                .malDegeri(alisFaturasi.getMalDegeri())
                .iskonto(alisFaturasi.getIskonto())
                .nakliyeBedeli(alisFaturasi.getNakliyeBedeli())
                .otvMatrah(alisFaturasi.getOtvMatrah())
                .otv(alisFaturasi.getOtv())
                .otvIndirimi(alisFaturasi.getOtvIndirimi())
                .kdv(alisFaturasi.getKdv())
                .faturaToplam(alisFaturasi.getFaturaToplam())
                .paraBirimi(alisFaturasi.getParaBirimi())
                .gecikmeCezasi(alisFaturasi.getGecikmeCezasi())
                .kur(alisFaturasi.getKur())
                .faturaTry(alisFaturasi.getFaturaTry())
                .faturaYukle(alisFaturasi.getFaturaYukle())
                .not(alisFaturasi.getNot())
                .createdAt(alisFaturasi.getCreatedAt())
                .updatedAt(alisFaturasi.getUpdatedAt())
                .build();
    }

    public static AlisFaturasi toAlisFaturasi(AlisFaturasiRequest request) {
        return AlisFaturasi.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .alisFaturasiTarihi(request.getAlisFaturasiTarihi())
                .alisFaturaNo(request.getAlisFaturaNo())
                .saticiFirmaId(new FirmaId(request.getSaticiFirmaId()))
                .listeFiyati(request.getListeFiyati())
                .ekGaranti(request.getEkGaranti())
                .malDegeri(request.getMalDegeri())
                .iskonto(request.getIskonto())
                .nakliyeBedeli(request.getNakliyeBedeli())
                .otvMatrah(request.getOtvMatrah())
                .otv(request.getOtv())
                .otvIndirimi(request.getOtvIndirimi())
                .kdv(request.getKdv())
                .faturaToplam(request.getFaturaToplam())
                .paraBirimi(request.getParaBirimi())
                .gecikmeCezasi(request.getGecikmeCezasi())
                .kur(request.getKur())
                .faturaTry(request.getFaturaTry())
                .faturaYukle(request.getFaturaYukle())
                .not(request.getNot())
                .build();
    }


    public static List<AlisFaturasiResponse> toResponseList(List<AlisFaturasi> alisFaturasiList) {
        return alisFaturasiList.stream()
                .map(AlisFaturasiMapper::toResponse)
                .toList();
    }
}



