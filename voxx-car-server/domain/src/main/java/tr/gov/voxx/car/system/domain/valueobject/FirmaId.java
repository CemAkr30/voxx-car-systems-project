package tr.gov.voxx.car.system.domain.valueobject;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import tr.gov.voxx.car.system.common.domain.valueobject.BaseId;

public class FirmaId extends BaseId<String> {

    @JsonCreator
    public FirmaId(@JsonProperty("value") String value) {
        super(value);
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static FirmaId fromString(String value) {
        return new FirmaId(value);
    }
}