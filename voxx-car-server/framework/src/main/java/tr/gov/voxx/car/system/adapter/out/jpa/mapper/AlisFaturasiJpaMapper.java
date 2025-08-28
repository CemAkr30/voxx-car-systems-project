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
                .aciklama(entity.getAciklama())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
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
        entity.setAciklama(alisFaturasi.getAciklama());
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
                .id(alisFaturasiCreatedEvent.id())
                .aracFiloId(alisFaturasiCreatedEvent.aracFiloId())
                .alisFaturasiTarihi(alisFaturasiCreatedEvent.alisFaturasiTarihi())
                .alisFaturaNo(alisFaturasiCreatedEvent.alisFaturaNo())
                .saticiFirmaId(alisFaturasiCreatedEvent.saticiFirmaId())
                .listeFiyati(alisFaturasiCreatedEvent.listeFiyati())
                .ekGaranti(alisFaturasiCreatedEvent.ekGaranti())
                .malDegeri(alisFaturasiCreatedEvent.malDegeri())
                .iskonto(alisFaturasiCreatedEvent.iskonto())
                .nakliyeBedeli(alisFaturasiCreatedEvent.nakliyeBedeli())
                .otvMatrah(alisFaturasiCreatedEvent.otvMatrah())
                .otv(alisFaturasiCreatedEvent.otv())
                .otvIndirimi(alisFaturasiCreatedEvent.otvIndirimi())
                .kdv(alisFaturasiCreatedEvent.kdv())
                .faturaToplam(alisFaturasiCreatedEvent.faturaToplam())
                .paraBirimi(alisFaturasiCreatedEvent.paraBirimi())
                .gecikmeCezasi(alisFaturasiCreatedEvent.gecikmeCezasi())
                .kur(alisFaturasiCreatedEvent.kur())
                .faturaTry(alisFaturasiCreatedEvent.faturaTry())
                .faturaYukle(alisFaturasiCreatedEvent.faturaYukle())
                .aciklama(alisFaturasiCreatedEvent.aciklama())
                .build();
    }

    public static AlisFaturasi toAlisFaturasiFromAlisFaturasiUpdatedEvent(AlisFaturasiUpdatedEvent alisFaturasiUpdatedEvent) {
        return AlisFaturasi.builder()
                .id(alisFaturasiUpdatedEvent.id())
                .aracFiloId(alisFaturasiUpdatedEvent.aracFiloId())
                .alisFaturasiTarihi(alisFaturasiUpdatedEvent.alisFaturasiTarihi())
                .alisFaturaNo(alisFaturasiUpdatedEvent.alisFaturaNo())
                .saticiFirmaId(alisFaturasiUpdatedEvent.saticiFirmaId())
                .listeFiyati(alisFaturasiUpdatedEvent.listeFiyati())
                .ekGaranti(alisFaturasiUpdatedEvent.ekGaranti())
                .malDegeri(alisFaturasiUpdatedEvent.malDegeri())
                .iskonto(alisFaturasiUpdatedEvent.iskonto())
                .nakliyeBedeli(alisFaturasiUpdatedEvent.nakliyeBedeli())
                .otvMatrah(alisFaturasiUpdatedEvent.otvMatrah())
                .otv(alisFaturasiUpdatedEvent.otv())
                .otvIndirimi(alisFaturasiUpdatedEvent.otvIndirimi())
                .kdv(alisFaturasiUpdatedEvent.kdv())
                .faturaToplam(alisFaturasiUpdatedEvent.faturaToplam())
                .paraBirimi(alisFaturasiUpdatedEvent.paraBirimi())
                .gecikmeCezasi(alisFaturasiUpdatedEvent.gecikmeCezasi())
                .kur(alisFaturasiUpdatedEvent.kur())
                .faturaTry(alisFaturasiUpdatedEvent.faturaTry())
                .faturaYukle(alisFaturasiUpdatedEvent.faturaYukle())
                .aciklama(alisFaturasiUpdatedEvent.aciklama())
                .build();
    }
}



