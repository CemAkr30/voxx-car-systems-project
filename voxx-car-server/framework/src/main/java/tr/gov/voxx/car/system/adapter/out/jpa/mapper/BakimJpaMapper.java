package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.BakimEntity;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class BakimJpaMapper {

    public static Bakim toBakim(BakimEntity entity) {
        if (entity == null) return null;

        return Bakim.builder()
                .id(new BakimId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .bakimNedeni(entity.getBakimNedeni())
                .parca(entity.getParca())
                .parcaTutari(entity.getParcaTutari())
                .iscilikTutari(entity.getIscilikTutari())
                .toplamTutar(entity.getToplamTutar())
                .faturaNo(entity.getFaturaNo())
                .fatura(entity.getFatura())
                .notlar(entity.getNotlar())
                .odeyenFirmaId(new FirmaId(entity.getOdeyenFirmaId()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static BakimEntity toEntity(Bakim bakim) {
        if (bakim == null) return null;

        BakimEntity entity = new BakimEntity();
        entity.setId(bakim.getId().getValue());
        entity.setAracFiloId(bakim.getAracFiloId().getValue());
        entity.setBakimNedeni(bakim.getBakimNedeni());
        entity.setParca(bakim.getParca());
        entity.setParcaTutari(bakim.getParcaTutari());
        entity.setIscilikTutari(bakim.getIscilikTutari());
        entity.setToplamTutar(bakim.getToplamTutar());
        entity.setFaturaNo(bakim.getFaturaNo());
        entity.setFatura(bakim.getFatura());
        entity.setNotlar(bakim.getNotlar());
        entity.setOdeyenFirmaId(bakim.getOdeyenFirmaId().getValue());
        return entity;
    }

    public static List<Bakim> toBakimList(List<BakimEntity> entities) {
        if (entities == null) return List.of();
        return entities.stream().map(BakimJpaMapper::toBakim).collect(Collectors.toList());
    }

    public static Bakim toBakimFromBakimCreatedEvent(BakimCreatedEvent event) {
        return Bakim.builder()
                .id(event.id())
                .aracFiloId(event.aracFiloId())
                .bakimNedeni(event.bakimNedeni())
                .parca(event.parca())
                .parcaTutari(event.parcaTutari())
                .iscilikTutari(event.iscilikTutari())
                .toplamTutar(event.toplamTutar())
                .faturaNo(event.faturaNo())
                .fatura(event.fatura())
                .notlar(event.notlar())
                .odeyenFirmaId(event.odeyenFirmaId())
                .build();
    }

    public static Bakim toBakimFromBakimUpdatedEvent(BakimUpdatedEvent event) {
        return Bakim.builder()
                .id(event.id())
                .aracFiloId(event.aracFiloId())
                .bakimNedeni(event.bakimNedeni())
                .parca(event.parca())
                .parcaTutari(event.parcaTutari())
                .iscilikTutari(event.iscilikTutari())
                .toplamTutar(event.toplamTutar())
                .faturaNo(event.faturaNo())
                .fatura(event.fatura())
                .notlar(event.notlar())
                .odeyenFirmaId(event.odeyenFirmaId())
                .build();
    }
}
