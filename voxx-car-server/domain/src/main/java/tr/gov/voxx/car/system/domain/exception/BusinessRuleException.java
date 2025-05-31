package tr.gov.voxx.car.system.domain.exception;

import tr.gov.voxx.car.system.common.domain.exception.DomainException;

public class BusinessRuleException extends DomainException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
