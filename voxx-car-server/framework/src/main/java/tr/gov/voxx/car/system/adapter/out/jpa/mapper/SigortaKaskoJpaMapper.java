package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.SigortaKaskoEntity;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.event.SigortaCreatedEvent;
import tr.gov.voxx.car.system.domain.event.SigortaUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class SigortaKaskoJpaMapper {
    public static SigortaKasko toSigorta(SigortaKaskoEntity entity) {
        return SigortaKasko.builder()
                .id(new SigortaId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .tip(entity.getTip())
                .sigortaSirketi(entity.getSigortaSirketi())
                .acente(entity.getAcente())
                .policeNo(entity.getPoliceNo())
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static SigortaKaskoEntity toEntity(SigortaKasko sigortaKasko) {
        if (sigortaKasko == null) {
            return null;
        }
        SigortaKaskoEntity entity = new SigortaKaskoEntity();
        entity.setId(sigortaKasko.getId().getValue());
        entity.setAracFiloId(sigortaKasko.getAracFiloId().getValue());
        entity.setTip(sigortaKasko.getTip());
        entity.setSigortaSirketi(sigortaKasko.getSigortaSirketi());
        entity.setAcente(sigortaKasko.getAcente());
        entity.setPoliceNo(sigortaKasko.getPoliceNo());
        entity.setBaslangicTarihi(sigortaKasko.getBaslangicTarihi());
        entity.setBitisTarihi(sigortaKasko.getBitisTarihi());
        return entity;
    }

    public static List<SigortaKasko> toSigortaList(List<SigortaKaskoEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(SigortaKaskoJpaMapper::toSigorta)
                .collect(Collectors.toList());
    }


    public static SigortaKasko toSigortaFromSigortaCreatedEvent(SigortaCreatedEvent sigortaCreatedEvent) {
        return SigortaKasko.builder()
                .id(sigortaCreatedEvent.getId())
                .aracFiloId(sigortaCreatedEvent.getAracFiloId())
                .tip(sigortaCreatedEvent.getTip())
                .sigortaSirketi(sigortaCreatedEvent.getSigortaSirketi())
                .acente(sigortaCreatedEvent.getAcente())
                .policeNo(sigortaCreatedEvent.getPoliceNo())
                .baslangicTarihi(sigortaCreatedEvent.getBaslangicTarihi())
                .bitisTarihi(sigortaCreatedEvent.getBitisTarihi())
                .build();
    }

    public static SigortaKasko toSigortaFromSigortaUpdatedEvent(SigortaUpdatedEvent sigortaUpdatedEvent) {
        return SigortaKasko.builder()
                .id(sigortaUpdatedEvent.getId())
                .aracFiloId(sigortaUpdatedEvent.getAracFiloId())
                .tip(sigortaUpdatedEvent.getTip())
                .sigortaSirketi(sigortaUpdatedEvent.getSigortaSirketi())
                .acente(sigortaUpdatedEvent.getAcente())
                .policeNo(sigortaUpdatedEvent.getPoliceNo())
                .baslangicTarihi(sigortaUpdatedEvent.getBaslangicTarihi())
                .bitisTarihi(sigortaUpdatedEvent.getBitisTarihi())
                .build();
    }
}
