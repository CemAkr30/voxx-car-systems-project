package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MTVEntity;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.event.MTVCreatedEvent;
import tr.gov.voxx.car.system.domain.event.MTVUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class MTVJpaMapper {
    public static Mtv toMtv(MTVEntity entity) {
        return Mtv.builder()
                .id(new MtvId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .yil(entity.getYil())
                .taksit(entity.getTaksit())
                .makbuzNo(entity.getMakbuzNo())
                .miktar(entity.getMiktar())
                .odemeTipi(entity.getOdemeTipi())
                .odeyenFirmaId(new FirmaId(entity.getOdeyenFirmaId()))
                .aciklama(entity.getAciklama())
                .gecikmeCezasi(entity.getGecikmeCezasi())
                .odendi(entity.getOdendi())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static MTVEntity toEntity(Mtv mtv) {
        if (mtv == null) {
            return null;
        }
        MTVEntity entity = new MTVEntity();
        entity.setId(mtv.getId().getValue());
        entity.setAracFiloId(mtv.getAracFiloId().getValue());
        entity.setYil(mtv.getYil());
        entity.setTaksit(mtv.getTaksit());
        entity.setMakbuzNo(mtv.getMakbuzNo());
        entity.setMiktar(mtv.getMiktar());
        entity.setOdemeTipi(mtv.getOdemeTipi());
        entity.setOdeyenFirmaId(mtv.getOdeyenFirmaId().getValue());
        entity.setAciklama(mtv.getAciklama());
        entity.setGecikmeCezasi(mtv.getGecikmeCezasi());
        entity.setOdendi(mtv.getOdendi());
        return entity;
    }

    public static List<Mtv> toMtvList(List<MTVEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(MTVJpaMapper::toMtv)
                .collect(Collectors.toList());
    }


    public static Mtv toMtvFromMtvCreatedEvent(MTVCreatedEvent mtvCreatedEvent) {
        return Mtv.builder()
                .id(mtvCreatedEvent.id())
                .aracFiloId(mtvCreatedEvent.aracFiloId())
                .yil(mtvCreatedEvent.yil())
                .taksit(mtvCreatedEvent.taksit())
                .makbuzNo(mtvCreatedEvent.makbuzNo())
                .miktar(mtvCreatedEvent.miktar())
                .odemeTipi(mtvCreatedEvent.odemeTipi())
                .odeyenFirmaId(mtvCreatedEvent.odeyenFirmaId())
                .aciklama(mtvCreatedEvent.aciklama())
                .gecikmeCezasi(mtvCreatedEvent.gecikmeCezasi())
                .odendi(mtvCreatedEvent.odendi())
                .build();
    }

    public static Mtv toMtvFromMtvUpdatedEvent(MTVUpdatedEvent mtvUpdatedEvent) {
        return Mtv.builder()
                .id(mtvUpdatedEvent.id())
                .aracFiloId(mtvUpdatedEvent.aracFiloId())
                .yil(mtvUpdatedEvent.yil())
                .taksit(mtvUpdatedEvent.taksit())
                .makbuzNo(mtvUpdatedEvent.makbuzNo())
                .miktar(mtvUpdatedEvent.miktar())
                .odemeTipi(mtvUpdatedEvent.odemeTipi())
                .odeyenFirmaId(mtvUpdatedEvent.odeyenFirmaId())
                .aciklama(mtvUpdatedEvent.aciklama())
                .gecikmeCezasi(mtvUpdatedEvent.gecikmeCezasi())
                .odendi(mtvUpdatedEvent.odendi())
                .build();
    }
}

