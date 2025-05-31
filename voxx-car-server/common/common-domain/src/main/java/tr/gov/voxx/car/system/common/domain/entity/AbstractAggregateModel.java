package tr.gov.voxx.car.system.common.domain.entity;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public abstract class AbstractAggregateModel<ID> extends BaseEntity<ID> {
}
