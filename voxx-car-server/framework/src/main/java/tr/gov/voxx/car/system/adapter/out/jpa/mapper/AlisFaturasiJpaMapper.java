package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AlisFaturasiEntity;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiCreatedEvent;
import tr.gov.voxx.car.system.domain.event.AlisFaturasiUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class AlisFaturasiJpaMapper {
    public static AlisFaturasi toAlisFaturasi(AlisFaturasiEntity entity) {
        return AlisFaturasi.builder()
                .id(new AlisFaturasiId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .alisFaturasiTarihi(entity.getAlisFaturasiTarihi())
                .alisFaturaNo(entity.getAlisFaturaNo())
                .saticiFirmaId(new FirmaId(entity.getSaticiFirmaId()))
                .listeFiyati(entity.getListeFiyati())
                .ekGaranti(entity.getEkGaranti())
                .malDegeri(entity.getMalDegeri())
                .iskonto(entity.getIskonto())
                .nakliyeBedeli(entity.getNakliyeBedeli())
                .otvMatrah(entity.getOtvMatrah())
                .otv(entity.getOtv())
                .otvIndirimi(entity.getOtvIndirimi())
                .kdv(entity.getKdv())
                .faturaToplam(entity.getFaturaToplam())
                .paraBirimi(entity.getParaBirimi())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .kur(entity.getKur())
                .faturaTry(entity.getFaturaTry())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static AlisFaturasiEntity toEntity(AlisFaturasi alisFaturasi) {
        if (alisFaturasi == null) {
            return null;
        }
        AlisFaturasiEntity entity = new AlisFaturasiEntity();
        entity.setId(alisFaturasi.getId().getValue());
        entity.setAracFiloId(alisFaturasi.getAracFiloId().getValue());
        entity.setAlisFaturasiTarihi(alisFaturasi.getAlisFaturasiTarihi());
        entity.setAlisFaturaNo(alisFaturasi.getAlisFaturaNo());
        entity.setSaticiFirmaId(alisFaturasi.getSaticiFirmaId().getValue());
        entity.setListeFiyati(alisFaturasi.getListeFiyati());
        entity.setEkGaranti(alisFaturasi.getEkGaranti());
        entity.setMalDegeri(alisFaturasi.getMalDegeri());
        entity.setIskonto(alisFaturasi.getIskonto());
        entity.setNakliyeBedeli(alisFaturasi.getNakliyeBedeli());
        entity.setOtvMatrah(alisFaturasi.getOtvMatrah());
        entity.setOtv(alisFaturasi.getOtv());
        entity.setOtvIndirimi(alisFaturasi.getOtvIndirimi());
        entity.setKdv(alisFaturasi.getOtvIndirimi());
        entity.setFaturaToplam(alisFaturasi.getFaturaToplam());
        entity.setParaBirimi(alisFaturasi.getParaBirimi());
        entity.setGecikmeCezasi(alisFaturasi.getGecikmeCezasi());
        entity.setKur(alisFaturasi.getKur());
        entity.setFaturaTry(alisFaturasi.getFaturaTry());
        entity.setNot(alisFaturasi.getNot());
        return entity;
    }

    public static List<AlisFaturasi> toAlisFaturasiList(List<AlisFaturasiEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(AlisFaturasiJpaMapper::toAlisFaturasi)
                .collect(Collectors.toList());
    }


    public static AlisFaturasi toAlisFaturasiFromAlisFaturasiCreatedEvent(AlisFaturasiCreatedEvent alisFaturasiCreatedEvent) {
        return AlisFaturasi.builder()
                .id(alisFaturasiCreatedEvent.getId())
                .aracFiloId(alisFaturasiCreatedEvent.getAracFiloId())
                .alisFaturasiTarihi(alisFaturasiCreatedEvent.getAlisFaturasiTarihi())
                .alisFaturaNo(alisFaturasiCreatedEvent.getAlisFaturaNo())
                .saticiFirmaId(alisFaturasiCreatedEvent.getSaticiFirmaId())
                .listeFiyati(alisFaturasiCreatedEvent.getListeFiyati())
                .ekGaranti(alisFaturasiCreatedEvent.getEkGaranti())
                .malDegeri(alisFaturasiCreatedEvent.getMalDegeri())
                .iskonto(alisFaturasiCreatedEvent.getIskonto())
                .nakliyeBedeli(alisFaturasiCreatedEvent.getNakliyeBedeli())
                .otvMatrah(alisFaturasiCreatedEvent.getOtvMatrah())
                .otv(alisFaturasiCreatedEvent.getOtv())
                .otvIndirimi(alisFaturasiCreatedEvent.getOtvIndirimi())
                .kdv(alisFaturasiCreatedEvent.getKdv())
                .faturaToplam(alisFaturasiCreatedEvent.getFaturaToplam())
                .paraBirimi(alisFaturasiCreatedEvent.getParaBirimi())
                .gecikmeCezasi(alisFaturasiCreatedEvent.getGecikmeCezasi())
                .kur(alisFaturasiCreatedEvent.getKur())
                .faturaTry(alisFaturasiCreatedEvent.getFaturaTry())
                .faturaYukle(alisFaturasiCreatedEvent.getFaturaYukle())
                .not(alisFaturasiCreatedEvent.getNot())
                .build();
    }

    public static AlisFaturasi toAlisFaturasiFromAlisFaturasiUpdatedEvent(AlisFaturasiUpdatedEvent alisFaturasiUpdatedEvent) {
        return AlisFaturasi.builder()
                .id(alisFaturasiUpdatedEvent.getId())
                .aracFiloId(alisFaturasiUpdatedEvent.getAracFiloId())
                .alisFaturasiTarihi(alisFaturasiUpdatedEvent.getAlisFaturasiTarihi())
                .alisFaturaNo(alisFaturasiUpdatedEvent.getAlisFaturaNo())
                .saticiFirmaId(alisFaturasiUpdatedEvent.getSaticiFirmaId())
                .listeFiyati(alisFaturasiUpdatedEvent.getListeFiyati())
                .ekGaranti(alisFaturasiUpdatedEvent.getEkGaranti())
                .malDegeri(alisFaturasiUpdatedEvent.getMalDegeri())
                .iskonto(alisFaturasiUpdatedEvent.getIskonto())
                .nakliyeBedeli(alisFaturasiUpdatedEvent.getNakliyeBedeli())
                .otvMatrah(alisFaturasiUpdatedEvent.getOtvMatrah())
                .otv(alisFaturasiUpdatedEvent.getOtv())
                .otvIndirimi(alisFaturasiUpdatedEvent.getOtvIndirimi())
                .kdv(alisFaturasiUpdatedEvent.getKdv())
                .faturaToplam(alisFaturasiUpdatedEvent.getFaturaToplam())
                .paraBirimi(alisFaturasiUpdatedEvent.getParaBirimi())
                .gecikmeCezasi(alisFaturasiUpdatedEvent.getGecikmeCezasi())
                .kur(alisFaturasiUpdatedEvent.getKur())
                .faturaTry(alisFaturasiUpdatedEvent.getFaturaTry())
                .faturaYukle(alisFaturasiUpdatedEvent.getFaturaYukle())
                .not(alisFaturasiUpdatedEvent.getNot())
                .build();
    }
}



