package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.KazaEntity;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.event.KazaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.KazaUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class KazaJpaMapper {

    public static Kaza toKaza(KazaEntity entity) {
        if (entity == null) return null;

        return Kaza.builder()
                .id(new KazaId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .firmaId(new FirmaId(entity.getFirmaId()))
                .musteriId(entity.getMusteriId())
                .kazaTarihi(entity.getKazaTarihi())
                .kazaIli(entity.getKazaIli())
                .kazaNedeni(entity.getKazaNedeni())
                .kazaTutanagi(entity.getKazaTutanagi())
                .onarimDurumu(entity.getOnarimDurumu())
                .odeyenFirmaId(new FirmaId(entity.getOdeyenFirmaId()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static KazaEntity toEntity(Kaza kaza) {
        if (kaza == null) return null;

        KazaEntity entity = new KazaEntity();
        entity.setId(kaza.getId().getValue());
        entity.setAracFiloId(kaza.getAracFiloId().getValue());
        entity.setFirmaId(kaza.getFirmaId().getValue());
        entity.setMusteriId(kaza.getMusteriId());
        entity.setKazaTarihi(kaza.getKazaTarihi());
        entity.setKazaIli(kaza.getKazaIli());
        entity.setKazaNedeni(kaza.getKazaNedeni());
        entity.setKazaTutanagi(kaza.getKazaTutanagi());
        entity.setOnarimDurumu(kaza.getOnarimDurumu());
        entity.setOdeyenFirmaId(kaza.getOdeyenFirmaId().getValue());
        return entity;
    }

    public static List<Kaza> toKazaList(List<KazaEntity> entities) {
        if (entities == null) return List.of();
        return entities.stream().map(KazaJpaMapper::toKaza).collect(Collectors.toList());
    }

    public static Kaza toKazaFromKazaCreatedEvent(KazaCreatedEvent event) {
        return Kaza.builder()
                .id(event.id())
                .aracFiloId(event.aracId())
                .firmaId(event.firmaId())
                .musteriId(event.musteriId())
                .kazaTarihi(event.kazaTarihi())
                .kazaIli(event.kazaIli())
                .kazaNedeni(event.kazaNedeni())
                .kazaTutanagi(event.kazaTutanagi())
                .onarimDurumu(event.onarimDurumu())
                .odeyenFirmaId(event.odeyenFirmaId())
                .build();
    }

    public static Kaza toKazaFromKazaUpdatedEvent(KazaUpdatedEvent event) {
        return Kaza.builder()
                .id(event.id())
                .aracFiloId(event.aracId())
                .firmaId(event.firmaId())
                .musteriId(event.musteriId())
                .kazaTarihi(event.kazaTarihi())
                .kazaIli(event.kazaIli())
                .kazaNedeni(event.kazaNedeni())
                .kazaTutanagi(event.kazaTutanagi())
                .onarimDurumu(event.onarimDurumu())
                .odeyenFirmaId(event.odeyenFirmaId())
                .build();
    }
}
