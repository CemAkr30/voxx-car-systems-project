package tr.gov.voxx.car.system.domain.valueobject;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import tr.gov.voxx.car.system.common.domain.valueobject.BaseId;

public class AdresId extends BaseId<String> {

    @JsonCreator
    public AdresId(@JsonProperty("value") String value) {
        super(value);
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static AdresId fromString(String value) {
        return new AdresId(value);
    }
}