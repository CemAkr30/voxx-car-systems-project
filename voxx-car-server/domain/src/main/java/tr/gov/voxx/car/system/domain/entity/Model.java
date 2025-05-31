package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

@Getter
@SuperBuilder(toBuilder = true)
public class Model extends AbstractAggregateModel<ModelId> {

    private String adi;
    private MarkaId markaId;

    public void initIdGenerator() {
        super.setId(new ModelId(IdFactory.create()));
    }

    public void updateFrom(Model other) {
        this.adi = other.getAdi();
        this.markaId = other.getMarkaId();
    }
}

