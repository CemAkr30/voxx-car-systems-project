package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Getter
@SuperBuilder(toBuilder = true)
public class Adres extends AbstractAggregateModel<AdresId> {

    private String aciklama;
    private AdresTipi tip;
    private FirmaId firmaId;

    public void initIdGenerator() {
        super.setId(new AdresId(IdFactory.create()));
    }

    public void updateFrom(Adres other) {
        this.aciklama = other.aciklama;
        this.tip = other.tip;
        this.firmaId = other.firmaId;
    }
}
