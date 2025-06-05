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
                .not(entity.getNot())
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
        entity.setNot(mtv.getNot());
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
                .id(mtvCreatedEvent.getId())
                .aracFiloId(mtvCreatedEvent.getAracFiloId())
                .yil(mtvCreatedEvent.getYil())
                .taksit(mtvCreatedEvent.getTaksit())
                .makbuzNo(mtvCreatedEvent.getMakbuzNo())
                .miktar(mtvCreatedEvent.getMiktar())
                .odemeTipi(mtvCreatedEvent.getOdemeTipi())
                .odeyenFirmaId(mtvCreatedEvent.getOdeyenFirmaId())
                .not(mtvCreatedEvent.getNot())
                .gecikmeCezasi(mtvCreatedEvent.getGecikmeCezasi())
                .odendi(mtvCreatedEvent.getOdendi())
                .build();
    }

    public static Mtv toMtvFromMtvUpdatedEvent(MTVUpdatedEvent mtvUpdatedEvent) {
        return Mtv.builder()
                .id(mtvUpdatedEvent.getId())
                .aracFiloId(mtvUpdatedEvent.getAracFiloId())
                .yil(mtvUpdatedEvent.getYil())
                .taksit(mtvUpdatedEvent.getTaksit())
                .makbuzNo(mtvUpdatedEvent.getMakbuzNo())
                .miktar(mtvUpdatedEvent.getMiktar())
                .odemeTipi(mtvUpdatedEvent.getOdemeTipi())
                .odeyenFirmaId(mtvUpdatedEvent.getOdeyenFirmaId())
                .not(mtvUpdatedEvent.getNot())
                .gecikmeCezasi(mtvUpdatedEvent.getGecikmeCezasi())
                .odendi(mtvUpdatedEvent.getOdendi())
                .build();
    }
}

