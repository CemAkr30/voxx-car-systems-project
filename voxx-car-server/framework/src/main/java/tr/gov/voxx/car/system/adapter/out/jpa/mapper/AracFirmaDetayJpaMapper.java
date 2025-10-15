package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;


@UtilityClass
public class AracFirmaDetayJpaMapper {

    public static AracFirmaDetay toAracFirmaDetay(AracFirmaDetayEntity entity) {
        return AracFirmaDetay.builder()
                .id(new AracFirmaDetayId(entity.getId()))
                .aracFiloId(new AracFiloId(entity.getAracFiloId()))
                .firmaId(new FirmaId(entity.getFirmaId()))
                .baslangicTarihi(entity.getBaslangicTarihi())
                .bitisTarihi(entity.getBitisTarihi())
                .sozlesmeTutari(entity.getSozlesmeTutari())
                .aylikFaturaTutari(entity.getAylikFaturaTutari())
                .kapora(entity.getKapora())
                .sozlesmeBaslangicTarihi(entity.getSozlesmeBaslangicTarihi())
                .sozlesmeBitisTarihi(entity.getSozlesmeBitisTarihi())
                .teslimatTutanagi(entity.getTeslimatTutanagi())
                .sozlesme(entity.getSozlesme())
                .odemeVadesi(entity.getOdemeVadesi())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static AracFirmaDetayEntity toEntity(AracFirmaDetay aracFirmaDetay) {
        if (aracFirmaDetay == null) {
            return null;
        }
        AracFirmaDetayEntity entity = new AracFirmaDetayEntity();
        entity.setId(aracFirmaDetay.getId().getValue());
        entity.setAracFiloId(aracFirmaDetay.getAracFiloId().getValue());
        entity.setFirmaId(aracFirmaDetay.getFirmaId().getValue());
        entity.setBaslangicTarihi(aracFirmaDetay.getBaslangicTarihi());
        entity.setBitisTarihi(aracFirmaDetay.getBitisTarihi());
        entity.setSozlesmeTutari(aracFirmaDetay.getSozlesmeTutari());
        entity.setAylikFaturaTutari(aracFirmaDetay.getKapora());
        entity.setKapora(aracFirmaDetay.getKapora());
        entity.setSozlesmeBaslangicTarihi(aracFirmaDetay.getSozlesmeBaslangicTarihi());
        entity.setSozlesmeBitisTarihi(aracFirmaDetay.getSozlesmeBitisTarihi());
        entity.setTeslimatTutanagi(aracFirmaDetay.getTeslimatTutanagi());
        entity.setSozlesme(aracFirmaDetay.getSozlesme());
        entity.setOdemeVadesi(aracFirmaDetay.getOdemeVadesi());
        return entity;
    }

    public static List<AracFirmaDetay> toAracFirmaDetayList(List<AracFirmaDetayEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(AracFirmaDetayJpaMapper::toAracFirmaDetay)
                .collect(Collectors.toList());
    }
}
