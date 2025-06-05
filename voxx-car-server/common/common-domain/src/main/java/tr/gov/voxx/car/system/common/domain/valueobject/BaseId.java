package tr.gov.voxx.car.system.common.domain.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.io.Serializable;

@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class BaseId<T> implements Serializable {
    @EqualsAndHashCode.Include
    private final T value;

    protected BaseId(T value) {
        this.value = value;
    }
}
