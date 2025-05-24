package tr.gov.voxx.car.system.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
public abstract class BaseEntity<ID> {
    private ID id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity<?> that = (BaseEntity<?>) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
