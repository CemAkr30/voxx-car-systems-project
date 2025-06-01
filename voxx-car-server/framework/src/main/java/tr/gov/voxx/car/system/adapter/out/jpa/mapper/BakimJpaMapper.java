package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.BakimEntity;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.event.BakimCreatedEvent;
import tr.gov.voxx.car.system.domain.event.BakimUpdatedEvent;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class BakimJpaMapper {

    public static Bakim toBakim(BakimEntity entity) {
        if (entity == null) return null;

        return Bakim.builder()
                .id(new BakimId(entity.getId()))
                .aracId(entity.getAracId())
                .bakimNedeni(entity.getBakimNedeni())
                .parca(entity.getParca())
                .parcaTutari(entity.getParcaTutari())
                .iscilikTutari(entity.getIscilikTutari())
                .toplamTutar(entity.getToplamTutar())
                .faturaNo(entity.getFaturaNo())
                .fatura(entity.getFatura())
                .notlar(entity.getNotlar())
                .odeyenFirmaId(entity.getOdeyenFirmaId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static BakimEntity toEntity(Bakim domain) {
        if (domain == null) return null;

        BakimEntity entity = new BakimEntity();
        entity.setId(domain.getId().getValue());
        entity.setAracId(domain.getAracId());
        entity.setBakimNedeni(domain.getBakimNedeni());
        entity.setParca(domain.getParca());
        entity.setParcaTutari(domain.getParcaTutari());
        entity.setIscilikTutari(domain.getIscilikTutari());
        entity.setToplamTutar(domain.getToplamTutar());
        entity.setFaturaNo(domain.getFaturaNo());
        entity.setFatura(domain.getFatura());
        entity.setNotlar(domain.getNotlar());
        entity.setOdeyenFirmaId(domain.getOdeyenFirmaId());
        return entity;
    }

    public static List<Bakim> toBakimList(List<BakimEntity> entities) {
        if (entities == null) return List.of();
        return entities.stream().map(BakimJpaMapper::toBakim).collect(Collectors.toList());
    }

    public static Bakim toBakimFromBakimCreatedEvent(BakimCreatedEvent event) {
        return Bakim.builder()
                .id(event.getId())
                .aracId(event.getAracId())
                .bakimNedeni(event.getBakimNedeni())
                .parca(event.getParca())
                .parcaTutari(event.getParcaTutari())
                .iscilikTutari(event.getIscilikTutari())
                .toplamTutar(event.getToplamTutar())
                .faturaNo(event.getFaturaNo())
                .fatura(event.getFatura())
                .notlar(event.getNotlar())
                .odeyenFirmaId(event.getOdeyenFirmaId())
                .build();
    }

    public static Bakim toBakimFromBakimUpdatedEvent(BakimUpdatedEvent event) {
        return Bakim.builder()
                .id(event.getId())
                .aracId(event.getAracId())
                .bakimNedeni(event.getBakimNedeni())
                .parca(event.getParca())
                .parcaTutari(event.getParcaTutari())
                .iscilikTutari(event.getIscilikTutari())
                .toplamTutar(event.getToplamTutar())
                .faturaNo(event.getFaturaNo())
                .fatura(event.getFatura())
                .notlar(event.getNotlar())
                .odeyenFirmaId(event.getOdeyenFirmaId())
                .build();
    }
}
