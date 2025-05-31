package tr.gov.voxx.car.system.domain.exception;

import tr.gov.voxx.car.system.common.domain.exception.DomainException;

public class NotFoundException extends DomainException {
    public NotFoundException(String message) {
        super(message);
    }
}
