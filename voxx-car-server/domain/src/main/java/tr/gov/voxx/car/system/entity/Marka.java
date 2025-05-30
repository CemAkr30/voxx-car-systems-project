package tr.gov.voxx.car.system.entity;

import lombok.Getter;
import tr.gov.voxx.car.system.valueobject.MarkaId;

@Getter
public class Marka extends AbstractAggregateModel<MarkaId> {
    private String adi;
}
