package tr.gov.voxx.car.system.domain.valueobject;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import tr.gov.voxx.car.system.common.domain.valueobject.BaseId;

public class AlisFaturasiId extends BaseId<String> {
    @JsonCreator
    public AlisFaturasiId(@JsonProperty("value") String value) {
        super(value);
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static AlisFaturasiId fromString(String value) {
        return new AlisFaturasiId(value);
    }
}
