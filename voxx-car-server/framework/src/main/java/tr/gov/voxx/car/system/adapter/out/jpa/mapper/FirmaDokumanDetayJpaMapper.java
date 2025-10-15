
package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaDokumanDetayEntity;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.stream.Collectors;


@UtilityClass
public class FirmaDokumanDetayJpaMapper {

    public static FirmaDokumanDetay toFirmaDokumanDetay(FirmaDokumanDetayEntity entity) {
        return FirmaDokumanDetay.builder()
                .id(new FirmaDokumanDetayId(entity.getId()))
                .firmaId(new FirmaId(entity.getFirmaId()))
                .sozlesme(entity.getSozlesme())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static FirmaDokumanDetayEntity toEntity(FirmaDokumanDetay firmaDokumanDetay) {
        if (firmaDokumanDetay == null) {
            return null;
        }
        FirmaDokumanDetayEntity entity = new FirmaDokumanDetayEntity();
        entity.setId(firmaDokumanDetay.getId().getValue());
        entity.setFirmaId(firmaDokumanDetay.getFirmaId().getValue());
        entity.setSozlesme(firmaDokumanDetay.getSozlesme());
        return entity;
    }

    public static List<FirmaDokumanDetay> toFirmaDokumanDetayList(List<FirmaDokumanDetayEntity> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(FirmaDokumanDetayJpaMapper::toFirmaDokumanDetay)
                .collect(Collectors.toList());
    }
}
