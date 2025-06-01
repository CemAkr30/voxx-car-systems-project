package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.IletisimTipi;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

@Getter
@SuperBuilder(toBuilder = true)
public class Iletisim extends AbstractAggregateModel<IletisimId> {

    private String numara;
    private IletisimTipi tip;
    private FirmaId firmaId;

    public void initIdGenerator() {
        super.setId(new IletisimId(IdFactory.create()));
    }

    public void updateFrom(Iletisim other) {
        this.numara = other.numara;
        this.tip = other.tip;
        this.firmaId = other.firmaId;
    }
}
