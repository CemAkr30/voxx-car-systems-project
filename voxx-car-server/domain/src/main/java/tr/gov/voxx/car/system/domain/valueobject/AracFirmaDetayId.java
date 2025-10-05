package tr.gov.voxx.car.system.domain.valueobject;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import tr.gov.voxx.car.system.common.domain.valueobject.BaseId;

public class AracFirmaDetayId extends BaseId<String> {
    @JsonCreator
    public AracFirmaDetayId(@JsonProperty("value") String value) {
        super(value);
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static AracFirmaDetayId fromString(String value) {
        return new AracFirmaDetayId(value);
    }
}


