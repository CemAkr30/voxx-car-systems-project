package tr.gov.voxx.car.system.common.domain.valueobject;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class BaseId<T> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @EqualsAndHashCode.Include
    @JsonValue
    private final T value;

    protected BaseId(T value) {
        this.value = value;
    }
}
