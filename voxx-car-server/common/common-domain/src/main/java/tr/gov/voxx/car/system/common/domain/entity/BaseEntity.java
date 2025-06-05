package tr.gov.voxx.car.system.common.domain.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@SuperBuilder(toBuilder = true)
public abstract class BaseEntity<ID> implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @EqualsAndHashCode.Include
    private ID id;
    private boolean isDeleted;
    private Instant createdAt;
    private Instant updatedAt;
}
