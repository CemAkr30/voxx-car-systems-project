package tr.gov.voxx.car.system.entity;

import lombok.Getter;
import tr.gov.voxx.car.system.valueobject.FirmaId;

@Getter
public class Firma extends AbstractAggregateModel<FirmaId> {
    private String email;
    private String unvan;
    private String vergiNo;
}
