package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MuayeneEntity;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.event.MuayeneCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MuayeneUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class MuayeneJpaMapper {
    public static Muayene toMuayene(MuayeneEntity entity) {
        return Muayene.builder()
                .id(new MuayeneId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .muayeneTipi(entity.getMuayeneTipi())
                .makbuzNo(entity.getMakbuzNo())
                .odeyenFirmaId(new FirmaId(entity.getOdeyenFirmaId()))
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .aciklama(entity.getAciklama())
                .yeri(entity.getYeri())
                .odemeTipi(entity.getOdemeTipi())
                .miktar(entity.getMiktar())
                .odendi(entity.getOdendi())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static MuayeneEntity toEntity(Muayene muayene) {
        if (muayene == null) {
            return null;
        }
        MuayeneEntity entity = new MuayeneEntity();
        entity.setId(muayene.getId().getValue());
        entity.setAracFiloId(muayene.getAracFiloId().getValue());
        entity.setMuayeneTipi(muayene.getMuayeneTipi());
        entity.setMakbuzNo(muayene.getMakbuzNo());
        entity.setOdeyenFirmaId(muayene.getOdeyenFirmaId().getValue());
        entity.setGecikmeCezasi(muayene.getGecikmeCezasi());
        entity.setAciklama(muayene.getAciklama());
        entity.setYeri(muayene.getYeri());
        entity.setOdemeTipi(muayene.getOdemeTipi());
        entity.setMiktar(muayene.getMiktar());
        entity.setOdendi(muayene.getOdendi());
        entity.setBaslangicTarihi(muayene.getBaslangicTarihi());
        entity.setBitisTarihi(muayene.getBitisTarihi());
        return entity;
    }

    public static List<Muayene> toMuayeneList(List<MuayeneEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(MuayeneJpaMapper::toMuayene)
                .collect(Collectors.toList());
    }


    public static Muayene toMuayeneFromMuayeneCreatedEvent(MuayeneCreatedEvent muayeneCreatedEvent) {
        return Muayene.builder()
                .id(muayeneCreatedEvent.id())
                .aracFiloId(muayeneCreatedEvent.aracFiloId())
                .muayeneTipi(muayeneCreatedEvent.muayeneTipi())
                .makbuzNo(muayeneCreatedEvent.makbuzNo())
                .odeyenFirmaId(muayeneCreatedEvent.odeyenFirmaId())
                .gecikmeCezasi(muayeneCreatedEvent.gecikmeCezasi())
                .aciklama(muayeneCreatedEvent.aciklama())
                .yeri(muayeneCreatedEvent.yeri())
                .odemeTipi(muayeneCreatedEvent.odemeTipi())
                .miktar(muayeneCreatedEvent.miktar())
                .odendi(muayeneCreatedEvent.odendi())
                .baslangicTarihi(muayeneCreatedEvent.baslangicTarihi())
                .bitisTarihi(muayeneCreatedEvent.bitisTarihi())
                .build();
    }

    public static Muayene toMuayeneFromMuayeneUpdatedEvent(MuayeneUpdatedEvent muayeneUpdatedEvent) {
        return Muayene.builder()
                .id(muayeneUpdatedEvent.id())
                .aracFiloId(muayeneUpdatedEvent.aracFiloId())
                .muayeneTipi(muayeneUpdatedEvent.muayeneTipi())
                .makbuzNo(muayeneUpdatedEvent.makbuzNo())
                .odeyenFirmaId(muayeneUpdatedEvent.odeyenFirmaId())
                .gecikmeCezasi(muayeneUpdatedEvent.gecikmeCezasi())
                .aciklama(muayeneUpdatedEvent.aciklama())
                .yeri(muayeneUpdatedEvent.yeri())
                .odemeTipi(muayeneUpdatedEvent.odemeTipi())
                .miktar(muayeneUpdatedEvent.miktar())
                .odendi(muayeneUpdatedEvent.odendi())
                .baslangicTarihi(muayeneUpdatedEvent.baslangicTarihi())
                .bitisTarihi(muayeneUpdatedEvent.bitisTarihi())
                .build();
    }
}


