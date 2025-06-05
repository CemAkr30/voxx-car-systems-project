package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.HasarTipi;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

@Getter
@SuperBuilder(toBuilder = true)
public class Hasar extends AbstractAggregateModel<HasarId> {

    private AracFiloId aracFiloId;
    private HasarliParca hasarliParca;
    private HasarTipi hasarTipi;


    public void initIdGenerator() {
        super.setId(new HasarId(IdFactory.create()));
    }

    public void updateFrom(Hasar other) {
        this.aracFiloId = other.aracFiloId;
        this.hasarliParca = other.hasarliParca;
        this.hasarTipi = other.hasarTipi;
    }
}

