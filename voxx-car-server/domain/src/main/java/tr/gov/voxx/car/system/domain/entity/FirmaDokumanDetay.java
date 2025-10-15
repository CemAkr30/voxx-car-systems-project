package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;

@Getter
@SuperBuilder(toBuilder = true)
public class FirmaDokumanDetay extends AbstractAggregateModel<FirmaDokumanDetayId> {
    private FirmaId firmaId;
    private String sozlesme;

    public void initIdGenerator() {
        this.setId(new FirmaDokumanDetayId(IdFactory.create()));
    }

    public void updateFrom(FirmaDokumanDetay other) {
        this.firmaId = other.getFirmaId();
        this.sozlesme = other.getSozlesme();
    }
}
