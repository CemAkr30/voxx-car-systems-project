package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FilodanCikisEntity;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.event.FilodanCikisCreatedEvent;
import tr.gov.voxx.car.system.domain.event.FilodanCikisUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class FilodanCikisJpaMapper {
    public static FilodanCikis toFilodanCikis(FilodanCikisEntity entity) {
        return FilodanCikis.builder()
                .id(new FilodanCikisId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .filodanCikisNedeni(entity.getFilodanCikisNedeni())
                .filodanCikisTarihi(entity.getFilodanCikisTarihi())
                .alici(entity.getAlici())
                .anahtarTeslimFiyati(entity.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(entity.getAracDevirGiderleri())
                .faturaYukle(entity.getFaturaYukle())
                .not(entity.getNot())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static FilodanCikisEntity toEntity(FilodanCikis filodanCikis) {
        if (filodanCikis == null) {
            return null;
        }
        FilodanCikisEntity entity = new FilodanCikisEntity();
        entity.setId(filodanCikis.getId().getValue());
        entity.setAracFiloId(filodanCikis.getAracFiloId().getValue());
        entity.setFilodanCikisNedeni(filodanCikis.getFilodanCikisNedeni());
        entity.setFilodanCikisTarihi(filodanCikis.getFilodanCikisTarihi());
        entity.setAlici(filodanCikis.getAlici());
        entity.setAnahtarTeslimFiyati(filodanCikis.getAnahtarTeslimFiyati());
        entity.setAracDevirGiderleri(filodanCikis.getAracDevirGiderleri());
        entity.setFaturaYukle(filodanCikis.getFaturaYukle());
        entity.setNot(filodanCikis.getNot());
        return entity;
    }

    public static List<FilodanCikis> toFilodanCikisList(List<FilodanCikisEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(FilodanCikisJpaMapper::toFilodanCikis)
                .collect(Collectors.toList());
    }


    public static FilodanCikis toFilodanCikisFromFilodanCikisCreatedEvent(FilodanCikisCreatedEvent filodanCikisCreatedEvent) {
        return FilodanCikis.builder()
                .id(filodanCikisCreatedEvent.getId())
                .aracFiloId(filodanCikisCreatedEvent.getAracFiloId())
                .filodanCikisNedeni(filodanCikisCreatedEvent.getFilodanCikisNedeni())
                .filodanCikisTarihi(filodanCikisCreatedEvent.getFilodanCikisTarihi())
                .alici(filodanCikisCreatedEvent.getAlici())
                .anahtarTeslimFiyati(filodanCikisCreatedEvent.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(filodanCikisCreatedEvent.getAracDevirGiderleri())
                .faturaYukle(filodanCikisCreatedEvent.getFaturaYukle())
                .not(filodanCikisCreatedEvent.getNot())
                .build();
    }

    public static FilodanCikis toFilodanCikisFromFilodanCikisUpdatedEvent(FilodanCikisUpdatedEvent filodanCikisUpdatedEvent) {
        return FilodanCikis.builder()
                .id(filodanCikisUpdatedEvent.getId())
                .aracFiloId(filodanCikisUpdatedEvent.getAracFiloId())
                .filodanCikisNedeni(filodanCikisUpdatedEvent.getFilodanCikisNedeni())
                .filodanCikisTarihi(filodanCikisUpdatedEvent.getFilodanCikisTarihi())
                .alici(filodanCikisUpdatedEvent.getAlici())
                .anahtarTeslimFiyati(filodanCikisUpdatedEvent.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(filodanCikisUpdatedEvent.getAracDevirGiderleri())
                .faturaYukle(filodanCikisUpdatedEvent.getFaturaYukle())
                .not(filodanCikisUpdatedEvent.getNot())
                .build();
    }
}

