package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Getter
@SuperBuilder(toBuilder = true)
public class Firma extends AbstractAggregateModel<FirmaId> {

    private String email;
    private String unvan;
    private String vergiNo;

    public void initIdGenerator() {
        super.setId(new FirmaId(IdFactory.create()));
    }

    public void updateFrom(Firma other) {
        this.email = other.getEmail();
        this.unvan = other.getUnvan();
        this.vergiNo = other.getVergiNo();
    }
}
