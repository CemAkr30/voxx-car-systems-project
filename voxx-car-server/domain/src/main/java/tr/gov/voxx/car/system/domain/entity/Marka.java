package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

@Getter
@SuperBuilder(toBuilder = true)
public class Marka extends AbstractAggregateModel<MarkaId> {

    private String adi;

    public void initIdGenerator() {
        super.setId(new MarkaId(IdFactory.create()));
    }

    public void updateFrom(Marka other) {
        this.adi = other.getAdi();
    }
}
